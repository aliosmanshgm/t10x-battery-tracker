/* T10X v0.9.7 - SOC/km + consumption range scenarios and transparent comparison.
   No odometer/SOC measurement is fabricated. Nominal capacity is not assumed usable. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.T10XRange = api;
})(typeof window !== 'undefined' ? window : undefined, function () {
  const num = v => v === null || v === undefined || v === '' || !Number.isFinite(Number(v)) ? null : Number(v);
  const validSoc = v => num(v) !== null && num(v) >= 0 && num(v) <= 100;
  const validConsumption = v => num(v) !== null && num(v) >= 5 && num(v) <= 60;

  function eligibleSegment(distance, startSoc, endSoc) {
    const km = num(distance), start = num(startSoc), end = num(endSoc);
    if (!(km >= 30) || !validSoc(startSoc) || !validSoc(endSoc)) return null;
    const drop = start - end;
    if (drop < 8) return null; // >=8 SOC points to limit integer-SOC quantization errors.
    const fullRange = 100 * km / drop;
    if (!(fullRange >= 100 && fullRange <= 1000)) return null;
    return { km, drop, fullRange };
  }

  function hasChargeInside(start, end, charges) {
    return charges.some(c => {
      const time = Date.parse(c.date || '');
      if (!Number.isFinite(time)) return false;
      const minutes = num(c.durationMin);
      const chargeEnd = time + (minutes !== null && minutes > 0 ? Math.min(minutes, 24*60) * 60000 : 0);
      return time <= end && chargeEnd >= start;
    });
  }

  function observedDriveSegments(driveSessions = [], charges = []) {
    const segments = [];
    for (const d of driveSessions) {
      if (!d.complete || !d.startAt || !d.endAt) continue;
      const start = Date.parse(d.startAt), end = Date.parse(d.endAt);
      if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start || end - start > 48 * 3600000) continue;
      const kmFromOdo = num(d.startOdo) !== null && num(d.endOdo) !== null ? num(d.endOdo) - num(d.startOdo) : null;
      const km = num(d.distance);
      if (kmFromOdo !== null && km !== null && Math.abs(kmFromOdo - km) > Math.max(3, km * 0.05)) continue;
      if (hasChargeInside(start, end, charges)) continue;
      const segment = eligibleSegment(kmFromOdo !== null ? kmFromOdo : km, d.startSoc, d.endSoc);
      if (segment) segments.push({ ...segment, observedAt:d.endAt, id:d.id, temp:d.temp??null });
    }
    return segments;
  }

  function observedManualSegments(trips = []) {
    const segments = [];
    for (const t of trips) {
      // Dashboard-generated trips are already counted in driveSessions.
      if (t.linkedDriveId) continue; // Other manual trips rely on user-entered start/end SOC; interim charging cannot be verified without timestamps.
      const segment = eligibleSegment(t.distance, t.startSoc, t.endSoc);
      if (segment) segments.push({ ...segment, observedAt:t.date||null, id:t.id, temp:t.temp??null });
    }
    return segments;
  }

  function summarizeSegments(segments = []) {
    const km = segments.reduce((s, x) => s + x.km, 0);
    const drop = segments.reduce((s, x) => s + x.drop, 0);
    const dated=segments.map(x=>Date.parse(x.observedAt||'')).filter(Number.isFinite);
    const latestAt=dated.length?new Date(Math.max(...dated)).toISOString():null;
    return { km, drop, count: segments.length, range: km > 0 && drop > 0 ? km * 100 / drop : null, latestAt };
  }

  function consumptionReference(consumptionMetrics, latestSnapshot) {
    const c = consumptionMetrics || {};
    const source = c.source;
    const sampleKm = num(c.sample?.distance) ?? num(c.distance) ?? 0;
    const measuredKm = num(c.sample?.measuredKm) ?? num(c.measuredKm) ?? 0;
    if (source === 'balance' && validConsumption(c.average)) return {
      value: Number(c.average), basis: 'balance', label: 'Sahiplik enerji dengesi (şarj verimi varsayımlı)', sampleKm: num(c.totalKm) ?? 0
    };
    if (validConsumption(c.average) && measuredKm >= 40 && source === 'measured' && !c.overlaps) return {
      value: Number(c.average), basis: 'measured', label: 'Kayıtlı sürüşlerin mesafe ağırlıklı tüketimi', sampleKm
    };
    if (validConsumption(latestSnapshot?.sinceCharge)) return {
      value: Number(latestSnapshot.sinceCharge), basis: 'recent', label: 'Araçtaki son şarjdan beri tüketim sayacı', sampleKm: 0,
      observedAt: latestSnapshot.date || ''
    };
    if (validConsumption(c.average)) return {
      value: Number(c.average), basis: source || 'estimate', label: 'Kayıtlı sürüşlerin tahmini tüketimi', sampleKm
    };
    return null;
  }

  function estimate({
    driveSessions = [], trips = [], charges = [], currentSoc = null, reserveSoc = 15,
    nominalCapacity = 88.5, usableCapacity = null, wltpRangeKm = 523,
    consumptionMetrics = null, latestSnapshot = null
  } = {}) {
    const tracked = summarizeSegments(observedDriveSegments(driveSessions, charges));
    const manual = summarizeSegments(observedManualSegments(trips));
    const sample = tracked.count ? tracked : manual;
    const source = tracked.count ? 'tracked-drive' : (manual.count ? 'manual-trip' : null);
    const consumption = consumptionReference(consumptionMetrics, latestSnapshot);
    const usable = num(usableCapacity), nominal = num(nominalCapacity), wltp = num(wltpRangeKm);
    const batteryKwh = usable !== null && usable > 0 ? usable : nominal;
    const socRange = sample.count && sample.range ? sample.range : null;
    const consumptionRange = consumption && batteryKwh > 0 ? batteryKwh * 100 / consumption.value : null;
    const consumptionBasis = usable !== null && usable > 0 ? 'usable' : 'nominal';
    const consumptionMethod = consumptionBasis === 'usable' ? 'consumption-usable' : 'consumption-nominal';
    let fullRange = null, method = 'none', label = 'Hesap için yeterli kayıt yok';
    let evidence = '', disagreement = false, combinedWeights = null;
    const socEvidence = sample.count ? `${sample.count} yolculuk · ${sample.km.toFixed(0)} km · %${sample.drop.toFixed(0)} SOC düşüşü` : '';
    const consumptionEvidence = consumption ? `${consumption.value.toFixed(1)} kWh/100 km · ${batteryKwh.toFixed(1)} kWh ${consumptionBasis === 'nominal' ? 'nominal kapasite varsayımı' : 'girilmiş kullanılabilir kapasite'}` : '';
    const socLabel = source === 'tracked-drive' ? 'Sürüş km/SOC kayıtları' : 'Elle girilmiş yolculuk km/SOC kayıtları';
    if (socRange !== null && consumptionRange !== null) {
      // These estimators can share source trips: a heuristic consensus is NOT an independent validation.
      const relativeGap = Math.abs(socRange - consumptionRange) / ((socRange + consumptionRange) / 2);
      disagreement = relativeGap > 0.25;
      if (disagreement) {
        fullRange = socRange;
        method = source;
        label = `${socLabel} (tüketim tahminiyle belirgin uyuşmazlık)`;
        evidence = socEvidence;
      } else {
        // Prefer direct SOC/distance observations. Nominal battery capacity is never treated as observed usable energy.
        const wSoc = Math.min(0.85, Math.max(0.65, 0.65 + Math.min(sample.km, 500) / 2500)) ;
        const socWeight = consumptionBasis === 'nominal' ? Math.max(0.80, wSoc) : wSoc;
        fullRange = socRange * socWeight + consumptionRange * (1 - socWeight);
        combinedWeights = { soc: socWeight, consumption: 1 - socWeight };
        method = 'combined';
        label = `${socLabel} + ${consumption.label} (yaklaşık uzlaşım)`;
        evidence = `${socEvidence} · ${consumptionEvidence}`;
      }
    } else if (socRange !== null) {
      fullRange = socRange;
      method = source;
      label = socLabel;
      evidence = socEvidence;
    } else if (consumptionRange !== null) {
      fullRange = consumptionRange;
      method = consumptionMethod;
      label = consumption.label;
      evidence = consumptionEvidence;
    }
    const soc = validSoc(currentSoc) ? Number(currentSoc) : null;
    const reserve = num(reserveSoc);
    const remainingToReserve = fullRange !== null && soc !== null && reserve !== null && reserve >= 0 && reserve <= 100
      ? fullRange * Math.max(0, soc - reserve) / 100 : null;
    const remainingToZero = fullRange !== null && soc !== null ? fullRange * soc / 100 : null;
    const band20to80 = fullRange !== null ? fullRange * 0.60 : null;
    const wltpDifference = fullRange !== null && wltp !== null && wltp > 0 ? (fullRange / wltp - 1) * 100 : null;
    const sampleGrade = sample.km >= 250 && sample.drop >= 40 ? 'Geniş SOC örneklemi' : sample.km >= 100 && sample.drop >= 15 ? 'Orta SOC örneklemi' : 'Sınırlı SOC örneklemi';
    const evidenceGrade = method === 'combined' ? sampleGrade + ' · senaryo birleşimi'
      : method === 'tracked-drive' || method === 'manual-trip' ? sampleGrade
      : method === 'consumption-nominal' ? 'Nominal kapasite varsayımı'
      : method === 'consumption-usable' ? 'Kapasite girdisine bağlı' : 'Veri eksik';
    return {
      fullRange, remainingToReserve, remainingToZero, band20to80, wltpDifference,
      wltpRangeKm: wltp, currentSoc: soc, reserveSoc: reserve,
      method, label, evidence, evidenceGrade, sample,
      tracked, manual, consumption, capacityKwh: batteryKwh,
      socRange, socEvidence, consumptionRange, consumptionEvidence, consumptionBasis,
      combinedWeights, disagreement,
      nominalAssumption: consumptionBasis === 'nominal' && consumptionRange !== null,
      note: disagreement
        ? 'SOC/km ve tüketim hesapları %25’ten fazla ayrışıyor. Yapay kesinlikten kaçınmak için SOC/km tahmini esas alındı; girişleri ve koşulları kontrol edin.'
        : method === 'combined'
          ? 'İki tahmin örtüşüyor; gösterilen uzlaşım ağırlıklı bir senaryodur, bağımsız doğrulama veya gerçek BMS menzil ölçümü değildir. Nominal kapasite bilinmeyen kullanılabilir kapasitenin yerine geçmez.'
          : method === 'tracked-drive' || method === 'manual-trip'
            ? 'SOC yüzdesi gösterge yuvarlamasına, hava, sürüş profili ve bataryanın termal durumuna duyarlıdır; %100’e şarj edilmiş menzil testi değildir. Manuel yolculuklarda arada şarj olmadığının kontrolü kullanıcıya aittir.'
            : method === 'consumption-nominal'
              ? '88,5 kWh nominal kapasitenin tamamı kullanılabilir değildir; sonuç kapasiteye bağlı kaba ve potansiyel olarak iyimser senaryodur.'
              : method === 'consumption-usable'
                ? 'Girdiğiniz kullanılabilir kapasiteye ve tüketim kaydının temsil gücüne bağlı senaryo hesabıdır.'
                : 'Km/SOC içeren sürüş veya kWh/100 km tüketim kaydı girin.'
    };
  }
  return { estimate, observedDriveSegments, observedManualSegments, summarizeSegments, consumptionReference };
});
