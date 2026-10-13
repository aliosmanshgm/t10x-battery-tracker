/* T10X v0.9.6 - Observed SOC-distance range and labelled consumption scenarios.
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
    if (!(km >= 20) || !validSoc(startSoc) || !validSoc(endSoc)) return null;
    const drop = start - end;
    if (drop < 4) return null; // Integer SOC steps distort short samples.
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
      if (segment) segments.push(segment);
    }
    return segments;
  }

  function observedManualSegments(trips = []) {
    const segments = [];
    for (const t of trips) {
      // Dashboard-generated trips are already counted in driveSessions.
      if (t.linkedDriveId) continue;
      const segment = eligibleSegment(t.distance, t.startSoc, t.endSoc);
      if (segment) segments.push(segment);
    }
    return segments;
  }

  function summarizeSegments(segments = []) {
    const km = segments.reduce((s, x) => s + x.km, 0);
    const drop = segments.reduce((s, x) => s + x.drop, 0);
    return { km, drop, count: segments.length, range: km > 0 && drop > 0 ? km * 100 / drop : null };
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
    let fullRange = null, method = 'none', label = 'Hesap için yeterli kayıt yok';
    let evidence = '';
    if (sample.count && sample.range) {
      fullRange = sample.range;
      method = source;
      label = source === 'tracked-drive' ? 'Sürüşün km ve SOC değişimi' : 'Elle girilmiş yolculuk km/SOC kayıtları';
      evidence = `${sample.count} yolculuk · ${sample.km.toFixed(0)} km · toplam %${sample.drop.toFixed(0)} SOC düşüşü`;
    } else if (consumption && batteryKwh > 0) {
      fullRange = batteryKwh * 100 / consumption.value;
      method = usable !== null && usable > 0 ? 'consumption-usable' : 'consumption-nominal';
      label = consumption.label;
      evidence = `${consumption.value.toFixed(1)} kWh/100 km · ${batteryKwh.toFixed(1)} kWh ${method === 'consumption-nominal' ? 'nominal referans (kullanılabilir kapasite değil)' : 'kullanılabilir kapasite girdisi'}`;
    }
    const soc = validSoc(currentSoc) ? Number(currentSoc) : null;
    const reserve = num(reserveSoc);
    const remainingToReserve = fullRange !== null && soc !== null && reserve !== null && reserve >= 0 && reserve <= 100
      ? fullRange * Math.max(0, soc - reserve) / 100 : null;
    const remainingToZero = fullRange !== null && soc !== null ? fullRange * soc / 100 : null;
    const band20to80 = fullRange !== null ? fullRange * 0.60 : null;
    const wltpDifference = fullRange !== null && wltp !== null && wltp > 0 ? (fullRange / wltp - 1) * 100 : null;
    const evidenceGrade = method === 'tracked-drive' || method === 'manual-trip'
      ? (sample.km >= 250 && sample.drop >= 40 ? 'Geniş örneklem' : sample.km >= 100 && sample.drop >= 15 ? 'Orta örneklem' : 'Sınırlı örneklem')
      : method === 'consumption-nominal' ? 'Nominal kapasite varsayımı' : method === 'consumption-usable' ? 'Kapasite ve tüketim varsayımı' : 'Veri eksik';
    return {
      fullRange, remainingToReserve, remainingToZero, band20to80, wltpDifference,
      wltpRangeKm: wltp, currentSoc: soc, reserveSoc: reserve,
      method, label, evidence, evidenceGrade, sample,
      tracked, manual, consumption, capacityKwh: batteryKwh,
      nominalAssumption: method === 'consumption-nominal',
      note: method === 'tracked-drive' || method === 'manual-trip'
        ? 'SOC farkı, gösterge yuvarlaması, sıcaklık, sürüş biçimi ve batarya yönetimi nedeniyle tahmindir. Bir şarj oturumu araya giren kayıtlı sürüşler dahil edilmez.'
        : method === 'consumption-nominal'
          ? '88,5 kWh nominal kapasitenin tamamı kullanılabilir kabul edilemez. Bu sonuç gerçek menzil ölçümü değildir; iyimser olabilir.'
          : method === 'consumption-usable'
            ? 'Kullanılabilir kapasite girdinizin doğruluğuna ve tüketimin temsil gücüne bağlı senaryo hesabıdır.'
            : 'Yeterli sürüş km/SOC kaydı veya tüketim ortalaması girin.'
    };
  }
  return { estimate, observedDriveSegments, observedManualSegments, summarizeSegments, consumptionReference };
});
