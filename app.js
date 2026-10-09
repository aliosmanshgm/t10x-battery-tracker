const STORAGE_KEY='t10xBatteryTracker_v11';
const LEGACY_KEYS=['t10xBatteryTracker_v10','t10xBatteryTracker_v9','t10xBatteryTracker_v8','t10xBatteryTracker_v6','t10xBatteryTracker_v5','t10xBatteryTracker_v4','t10xBatteryTracker_v3','t10xBatteryTracker_v2','t10xBatteryTracker_v1'];
const DEFAULT_PROVIDERS=[
  "ZES Şarj",
  "Trugo Şarj",
  "Eşarj",
  "Wat Mobilite Şarj",
  "Otopriz Şarj",
  "Voltrun Şarj",
  "Astor Şarj",
  "En Yakıt Şarj",
  "Oncharge Şarj",
  "Otojet Şarj",
  "Sharz.net",
  "5 Şarj",
  "D-Charge Şarj",
  "Zeplin Şarj",
  "Ovolt Şarj",
  "Tunçmatik Charge",
  "K-Şarj",
  "Shell Recharge",
  "OtoWATT Şarj",
  "Beefull Şarj",
  "AOS Technology",
  "Aksa Şarj",
  "MKS Şarj",
  "CV Charging",
  "Toger Şarj",
  "Power Şarj",
  "MigGo Şarj",
  "Neva Şarj",
  "Voltgo Şarj",
  "RHG Enertürk",
  "Varr Şarj",
  "Green Science Şarj",
  "Adze Şarj",
  "Smart Şarj",
  "Şarjon",
  "i-Şarj",
  "Pirim Şarj",
  "Solinved Şarj",
  "Acropol Şarj",
  "Lumicle Şarj",
  "Şarj Stop",
  "Öniz Şarj",
  "Biogreen Şarj",
  "e-Power EV",
  "Solar Şarj",
  "Onlife Charge",
  "RST ChargePoint",
  "Hızzlan Şarj",
  "efish Şarj",
  "MY Charge",
  "Geta Charge",
  "Wattarya Şarj",
  "Fix Charge",
  "EV Road Şarj",
  "Epsis Şarj",
  "RS Şarj",
  "Voltup Şarj",
  "Fast-Go",
  "Petroo",
  "Volti Şarj",
  "360° Enerji",
  "GIOEV",
  "ŞarjTak Şarj",
  "Arcona",
  "CheckPoint",
  "Electrise",
  "Monokon",
  "Solargize",
  "Sepaş Şarj",
  "Tora Şarj",
  "EVbee Şarj",
  "Plug&Drive",
  "Tesla Supercharge",
  "Ekos",
  "Geldol",
  "Autovolt Şarj",
  "Türk Şarj",
  "B-Charge",
  "GSM Charge",
  "CTG Şarj",
  "Estasyon",
  "Multi Force",
  "TEDY",
  "Royal",
  "E4 Şarj",
  "Doğuş",
  "Ecojet",
  "TÜVTURK",
  "VZX Şarj",
  "AKM Charge",
  "Ecobox",
  "Polestar Şarj",
  "Power EV Şarj",
  "ERC",
  "MEG Şarj",
  "Energy Enerjik",
  "Sky World",
  "Greenwatt Şarj",
  "Minus Energy",
  "Pleco Şarj",
  "Turuncu Şarj",
  "Şarj Plus",
  "EVC Charge",
  "Tripy Şarj",
  "Mithrapod",
  "My Power Şarj",
  "Best",
  "Kes Şarj",
  "Carbonage",
  "Pluginn",
  "Vale Şarj",
  "Magicline",
  "TR Charge",
  "U Şarj",
  "Doldur",
  "Çelikler",
  "Bladeco",
  "Elaris",
  "Şarjlan",
  "Eko",
  "Meis",
  "X",
  "Avrupa",
  "Şarj Start",
  "Şarjed",
  "G-Charge",
  "IN Charge",
  "Gezcar",
  "Wattreise Şarj",
  "d-rect",
  "GE-Charge",
  "Şarj Park",
  "AsPlus Şarj",
  "Rönesans",
  "EKA",
  "Interenergy",
  "Köfteci Yusuf",
  "Myzco",
  "Obi Şarj",
  "Econ",
  "Qopuz Şarj",
  "Acrobat",
  "Pilstop",
  "Sunlight",
  "Arsima Şarj",
  "Mercury Şarj",
  "B-Force",
  "E-Mod",
  "EVSolt",
  "3a Şarj",
  "Aktif Şarj",
  "KRN Şarj",
  "Fortis",
  "Odeon",
  "Porty",
  "Promaster",
  "Spectrum",
  "Foks Şarj",
  "FZY Şarj",
  "Ev / Kendi AC Şarjım"
];
const defaults={
  meta:{schemaVersion:11,updatedAt:''},
  settings:{
    vehicleName:'T10X Uzun Menzil',batteryChemistry:'NMC',ownershipStartOdo:32356,ownershipStartSoc:59,ownershipStartDate:'',trackingStartOdo:33537,currentOdo:33537,currentSoc:76,
    referenceCapacity:88.5,preferredMinSoc:20,preferredMaxSoc:80,
    stressWindow:12,plannerReserveSoc:15,plannerMarginPct:10,mgmCity:'ANKARA',currentSocUpdatedAt:''
  },
  providers:[...DEFAULT_PROVIDERS],
  charges:[],trips:[],consumptionSnapshots:[],sohTests:[],socSnapshots:[],driveSessions:[],activeDrive:null
};

let db=load();
const byId=id=>document.getElementById(id);
const domIds=[
  'chargeForm','chargeId','chargeDate','chargeOdo','chargeOdoUnknown','chargeStartSoc','chargeEndSoc','chargeType','chargeScope','chargePower','chargeEnergy','chargeDuration','chargeProvider','chargeCost','chargeTemp','chargeTempSource','chargeBatteryTemp','chargeParking','chargeParkHours','chargePreDriveMin','chargeWeatherBtn','chargeWeatherStatus','chargeLocation','chargeNotes','chargeReset',
  'consumptionForm','consumptionId','consumptionDate','consumptionOdo','consumptionSinceCharge','consumptionTotal','consumptionNotes','consumptionReset',
  'tripForm','tripId','tripDate','tripDistance','tripConsumption','tripStartSoc','tripEndSoc','tripTemp','tripRoute','tripNotes','tripReset',
  'sohForm','sohDate','sohStartSoc','sohEndSoc','sohEnergy','sohType','sohLoss','sohTemp','sohOdo','sohNotes',
  'plannerForm','plannerCurrentSoc','plannerDistance','plannerConsumption','plannerReserveSoc','plannerMargin','plannerDeparture','plannerChargeType','plannerPower','plannerAmbientTemp','plannerParking','plannerParkHours','plannerPreDriveMin','plannerWeatherBtn','plannerWeatherStatus','plannerResult','plannerBadge','plannerThermal','plannerWeatherDetail','plannerMgmLink',
  'crateForm','crateCapacity','cratePower','crateStartSoc','crateEndSoc','crateTemp',
  'settingsForm','vehicleName','batteryChemistry','ownershipStartOdo','ownershipStartSoc','ownershipStartDate','trackingStartOdo','currentOdo','currentSoc','referenceCapacity','preferredMinSoc','preferredMaxSoc','stressWindow','plannerReserveDefault','plannerMarginDefault','mgmCity','clearAllBtn',
  'quickStatusForm','quickCurrentOdo','quickCurrentSoc','quickDriveConsumption','quickDriveStartBtn','quickDriveEndBtn','driveStatusInfo','providerNew','providerAddBtn','providerResetBtn','providerManager',
  'exportJsonBtn','importJsonInput','exportChargesCsv','exportConsumptionCsv','exportTripsCsv','exportDriveSessionsCsv'
];
const D=Object.fromEntries(domIds.map(id=>[id,byId(id)]));

function migrate(obj){
  const out={...structuredClone(defaults),...(obj||{})};
  out.meta={...structuredClone(defaults.meta),...(obj?.meta||{}),schemaVersion:11};
  out.settings={...structuredClone(defaults.settings),...(obj?.settings||{})};
  delete out.settings.targetDcShare;delete out.settings.balanceWindow;
  if(obj?.settings&&obj.settings.ownershipStartSoc==null){
    if(Number(out.settings.ownershipStartOdo)===32000)out.settings.ownershipStartOdo=32356;
    if(Number(out.settings.trackingStartOdo)===33000)out.settings.trackingStartOdo=33537;
    out.settings.ownershipStartSoc=59;out.settings.currentOdo=33537;out.settings.currentSoc=76;
  }
  out.charges=(Array.isArray(obj?.charges)?obj.charges:[]).map(x=>({...x,scope:x.scope||'owner_current'}));
  out.trips=Array.isArray(obj?.trips)?obj.trips:[];
  out.consumptionSnapshots=Array.isArray(obj?.consumptionSnapshots)?obj.consumptionSnapshots:[];
  out.providers=Array.isArray(obj?.providers)&&obj.providers.length?[...new Set(obj.providers.filter(Boolean))]:[...DEFAULT_PROVIDERS];
  out.sohTests=Array.isArray(obj?.sohTests)?obj.sohTests:[];
  out.socSnapshots=Array.isArray(obj?.socSnapshots)?obj.socSnapshots:[];
  out.driveSessions=Array.isArray(obj?.driveSessions)?obj.driveSessions:[];
  out.activeDrive=(obj?.activeDrive&&Number.isFinite(new Date(obj.activeDrive.startAt).getTime()))?obj.activeDrive:null;
  return out;
}
function load(){
  try{
    let raw=localStorage.getItem(STORAGE_KEY);
    if(!raw){for(const key of LEGACY_KEYS){raw=localStorage.getItem(key);if(raw)break;}}
    return migrate(raw?JSON.parse(raw):{});
  }catch{return structuredClone(defaults)}
}
function persistLocal({emit=false}={}){localStorage.setItem(STORAGE_KEY,JSON.stringify(db));renderAll();if(emit)window.dispatchEvent(new CustomEvent('t10x:data-changed',{detail:{db:structuredClone(db)}}));}
function save(){db.meta={...(db.meta||{}),schemaVersion:11,updatedAt:new Date().toISOString()};persistLocal({emit:true})}

window.T10XApp={
  getData:()=>structuredClone(db),
  replaceData:(next,{emit=false}={})=>{db=migrate(next||{});persistLocal({emit});return structuredClone(db)},
  hasMeaningfulData:()=>Boolean(db.charges.length||db.trips.length||db.consumptionSnapshots.length||db.sohTests.length||db.socSnapshots.length||db.driveSessions.length||!!db.activeDrive||db.meta?.updatedAt),
  storageKey:STORAGE_KEY,
  schemaVersion:11
};

function uid(){return crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random())}
function fmt(n,d=1){return Number.isFinite(Number(n))?Number(n).toLocaleString('tr-TR',{minimumFractionDigits:d,maximumFractionDigits:d}):'-'}
function fmtDate(s){if(!s)return'-';return new Date(s).toLocaleString('tr-TR',{dateStyle:'short',timeStyle:String(s).includes('T')?'short':undefined})}
function sum(a){return a.reduce((x,y)=>x+(Number(y)||0),0)}
function avg(a){return a.length?sum(a)/a.length:null}
function median(a){if(!a.length)return null;const s=[...a].sort((x,y)=>x-y),m=Math.floor(s.length/2);return s.length%2?s[m]:(s[m-1]+s[m])/2}
function escapeHtml(s=''){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}

function hasSocValue(v){return v!==null&&v!==''&&v!==undefined&&Number.isFinite(Number(v));}
function hasSocPair(c){return hasSocValue(c.startSoc)&&hasSocValue(c.endSoc)&&Number(c.endSoc)>Number(c.startSoc)}
function socLabel(c){
  const a=hasSocValue(c.startSoc)?`${Number(c.startSoc)}%`:'—';
  const b=hasSocValue(c.endSoc)?`${Number(c.endSoc)}%`:'—';
  return `${a} → ${b}`;
}
function chargeCompliance(c){
  if(!hasSocPair(c))return{available:false,ratio:null,full:false,below:0,above:0};
  const a=Number(c.startSoc),b=Number(c.endSoc),min=Number(db.settings.preferredMinSoc),max=Number(db.settings.preferredMaxSoc);
  const overlap=Math.max(0,Math.min(b,max)-Math.max(a,min));
  const delta=b-a;
  return{available:true,ratio:overlap/delta,full:a>=min&&b<=max,below:Math.max(0,min-a),above:Math.max(0,b-max)};
}
function cRate(power,capacity=db.settings.referenceCapacity){return Number(power)>0&&Number(capacity)>0?Number(power)/Number(capacity):null}
function cRateClass(rate){
  if(rate==null)return{key:'unknown',label:'Veri yok',cls:'neutral'};
  if(rate<=0.5)return{key:'verylow',label:'Çok düşük stres',cls:'good'};
  if(rate<=1)return{key:'low',label:'Düşük / ılımlı',cls:'good'};
  if(rate<=2)return{key:'managed',label:'Yönetilebilir hızlı şarj',cls:'info'};
  if(rate<4)return{key:'elevated',label:'Yüksek dikkat',cls:'warn'};
  return{key:'high',label:'Yüksek stres',cls:'bad'};
}
function cRateAssessment(rate,temp,endSoc){
  const base=cRateClass(rate);let severity=base.key==='high'?4:base.key==='elevated'?3:base.key==='managed'?2:base.key==='low'?1:0;
  const notes=[];
  if(rate!=null){
    if(rate<=2)notes.push('2026 NMC/graphite hücre çalışmasında 2C’ye kadar >1.000 çevrim gözlendi.');
    if(rate>=4)notes.push('4C ve üzeri testlerde çevrim ömrü belirgin şekilde azaldı ve anotta lithium plating/empedans artışı öne çıktı.');
    else if(rate>2)notes.push('2C üzeri bölge, 2C’ye kıyasla daha yüksek hızlı şarj stresine girer.');
  }
  if(temp!==null&&temp!==''&&Number.isFinite(Number(temp))&&Number(temp)<=10&&rate>1){severity=Math.max(severity,3);notes.push('Düşük sıcaklık + yüksek C-rate lithium plating riskini artırabilir.');}
  if(temp!==null&&temp!==''&&Number.isFinite(Number(temp))&&Number(temp)>=35&&hasSocValue(endSoc)&&Number(endSoc)>80){severity=Math.max(severity,3);notes.push('Yüksek sıcaklık + yüksek SOC NMC takvim yaşlanması açısından elverişsizdir.');}
  if(hasSocValue(endSoc)&&Number(endSoc)>80){severity=Math.max(severity,2);notes.push('%80 üzeri gerekiyorsa kullanılabilir; uzun süre yüksek SOC’de bekletmemek daha koruyucudur.');}
  const labels=['Düşük','Düşük','Yönetilebilir','Dikkat','Yüksek'];
  const classes=['good','good','info','warn','bad'];
  return{...base,severity,label2:labels[severity],cls2:classes[severity],notes};
}
function chargeEnergyValue(c){
  if(Number(c.energy)>0)return Number(c.energy);
  if(!hasSocPair(c))return 0;
  const delta=Math.max(0,Number(c.endSoc)-Number(c.startSoc));
  return Number(db.settings.referenceCapacity)*delta/100;
}
function chargeAveragePower(c){
  const e=Number(c.energy),m=Number(c.durationMin);
  return e>0&&m>0?e/(m/60):null;
}
function chargeAverageCRate(c){const p=chargeAveragePower(c);return p!=null?cRate(p):null}
function chargePeakCRate(c){return cRate(c.power)}
function chargeCRate(c){return chargeAverageCRate(c)??chargePeakCRate(c)}
function chargeCRateSource(c){return chargeAverageCRate(c)!=null?'ortalama':chargePeakCRate(c)!=null?'maksimum':'yok'}

// v0.9.2: Display-only metrics. Stored charges and BSI/CSI formulas remain unchanged.
// An energy-weighted mean uses observed station kWh, not inferred SOC-based kWh
// and never treats an optional peak power as an average power.
function chargeHistoryCRateMetrics(charges){
  const candidateMax=(rateFn)=>{
    let best=null;
    for(const charge of charges){
      const rate=rateFn(charge);
      if(rate!=null&&Number.isFinite(rate)&&(best===null||rate>best.rate))best={charge,rate};
    }
    return best;
  };
  const knownEnergy=charges.filter(c=>Number.isFinite(Number(c.energy))&&Number(c.energy)>0);
  let coveredEnergy=0,weightedSum=0,coveredSessions=0;
  for(const c of knownEnergy){
    const rate=chargeAverageCRate(c);
    if(rate===null||!Number.isFinite(rate))continue;
    const energy=Number(c.energy);
    coveredEnergy+=energy;
    weightedSum+=energy*rate;
    coveredSessions++;
  }
  const totalKnownEnergy=sum(knownEnergy.map(c=>Number(c.energy)));
  return{
    maxAverage:candidateMax(chargeAverageCRate),
    maxPeak:candidateMax(chargePeakCRate),
    weightedAverage:coveredEnergy>0?weightedSum/coveredEnergy:null,
    coveredEnergy,totalKnownEnergy,coveredSessions,
    knownEnergySessions:knownEnergy.length,
    allSessions:charges.length
  };
}
function chargeCRateSessionDetail(candidate,{peak=false}={}){
  if(!candidate)return peak?'Maksimum güç girildiğinde':'Enerji ve şarj süresi girildiğinde';
  const c=candidate.charge;
  const power=peak?Number(c.power):chargeAveragePower(c);
  const parts=[`${fmt(power,1)} kW`,String(c.provider||'Sağlayıcı belirtilmedi'),c.date?fmtDate(c.date):'Tarih belirtilmedi'];
  return parts.map(escapeHtml).join(' · ');
}
function weightedCRateDetail(stats){
  if(stats.weightedAverage==null)return 'Enerji ve süre bilgisi olan şarj kaydı gerekli';
  const pct=stats.totalKnownEnergy>0?` · %${fmt(stats.coveredEnergy/stats.totalKnownEnergy*100,0)} kapsam`:'';
  return `${fmt(stats.coveredEnergy,1)} / ${fmt(stats.totalKnownEnergy,1)} kWh ölçülen enerji · ${stats.coveredSessions}/${stats.allSessions} oturum${pct}`;
}


function sohQuality(start,end,type,temp){
  const delta=Number(end)-Number(start);let score=0;const reasons=[];
  if(delta>=60){score+=2;reasons.push('geniş SOC aralığı');}
  else if(delta>=40){score+=1;reasons.push('orta SOC aralığı');}
  else reasons.push('dar SOC aralığı');
  if(type==='AC'){score+=1;reasons.push('AC ölçüm');}
  if(Number.isFinite(Number(temp))&&Number(temp)>=15&&Number(temp)<=30){score+=1;reasons.push('ılımlı sıcaklık');}
  const label=score>=4?'Yüksek':score>=2?'Orta':'Düşük';
  const cls=score>=4?'good':score>=2?'warn':'bad';
  return{score,label,cls,reasons};
}
function referenceSoh(){
  if(!db.sohTests.length)return null;
  const ordered=[...db.sohTests].sort((a,b)=>String(b.date).localeCompare(String(a.date)));
  const high=ordered.filter(x=>(x.qualityScore??sohQuality(x.startSoc,x.endSoc,x.type,x.temp).score)>=4).slice(0,3);
  const use=high.length?high:ordered.slice(0,3);
  return{soh:median(use.map(x=>Number(x.soh)).filter(Number.isFinite)),count:use.length,mode:high.length?'yüksek kaliteli test medyanı':'son testlerin medyanı'};
}
function latestOdo(){const vals=[Number(db.settings.currentOdo)||0,Number(db.settings.trackingStartOdo)||0,...db.charges.map(x=>+x.odo||0),...db.consumptionSnapshots.map(x=>+x.odo||0),...db.sohTests.map(x=>+x.odo||0)].filter(Boolean);return vals.length?Math.max(...vals):null}
function ownerCharges(){return db.charges.filter(x=>x.scope!=='previous_owner')}
function scopeLabel(scope){return scope==='previous_owner'?'Önceki sahip':scope==='owner_history'?'Benim · geçmiş':'Benim · güncel'}
function ownershipKm(){const start=Number(db.settings.ownershipStartOdo)||0,last=Number(latestOdo())||0;return start&&last>=start?last-start:null}
function latestConsumptionSnapshot(){return [...db.consumptionSnapshots].sort((a,b)=>String(b.date).localeCompare(String(a.date))||Number(b.odo)-Number(a.odo))[0]||null}
function weightedTripConsumption(){
  const valid=db.trips.filter(x=>Number(x.distance)>0&&Number(x.consumption)>0);
  const distance=sum(valid.map(x=>x.distance));
  return distance?sum(valid.map(x=>Number(x.distance)*Number(x.consumption)))/distance:null;
}
function costPer100Metrics(){
  const cons=latestConsumptionSnapshot();
  const consumption=cons&&Number(cons.total)>0?Number(cons.total):null;
  const priced=ownerCharges().filter(x=>chargeEnergyValue(x)>0&&x.cost!==null&&x.cost!==undefined&&x.cost!==''&&Number.isFinite(Number(x.cost)));
  const pricedEnergy=sum(priced.map(chargeEnergyValue));
  const pricedCost=sum(priced.map(x=>Number(x.cost)));
  const avgPrice=pricedEnergy>0?pricedCost/pricedEnergy:null;
  const costPer100=consumption!=null&&avgPrice!=null?consumption*avgPrice:null;
  return{consumption,avgPrice,costPer100,pricedEnergy,pricedCount:priced.length};
}
function updateCurrentState(odo,soc=null,at=null){
  const n=Number(odo),current=Number(db.settings.currentOdo)||0;
  const allowOdo=!Number.isFinite(n)||n<=0||n>=current;
  if(Number.isFinite(n)&&n>0&&n>=current)db.settings.currentOdo=n;
  if(soc!==null&&soc!==''&&Number.isFinite(Number(soc))&&allowOdo){
    db.settings.currentSoc=clamp(Number(soc),0,100);
    if(at){const ms=new Date(at).getTime();if(Number.isFinite(ms))db.settings.currentSocUpdatedAt=new Date(ms).toISOString();}
  }
}
function clamp(n,min=0,max=100){return Math.max(min,Math.min(max,n))}
function thermalStateFromTemp(t){
  if(!Number.isFinite(Number(t)))return{state:'Bilinmiyor',score:null};
  t=Number(t);
  if(t<0)return{state:'Çok soğuk',score:65};
  if(t<10)return{state:'Soğuk',score:38};
  if(t<15)return{state:'Serin',score:16};
  if(t<=30)return{state:'Ilımlı',score:0};
  if(t<35)return{state:'Sıcak',score:12};
  if(t<40)return{state:'Çok sıcak',score:34};
  return{state:'Aşırı sıcak',score:58};
}
function chargeThermalContext(c={}){
  const hasBattery=c.batteryTemp!==null&&c.batteryTemp!==''&&c.batteryTemp!==undefined&&Number.isFinite(Number(c.batteryTemp));
  const hasAmbient=c.temp!==null&&c.temp!==''&&c.temp!==undefined&&Number.isFinite(Number(c.temp));
  if(hasBattery){
    const t=Number(c.batteryTemp),base=thermalStateFromTemp(t);
    return{known:true,basis:'battery',state:base.state,confidence:'Yüksek',cls:'good',risk:base.score,temp:t,notes:[`Gerçek/diagnostik batarya sıcaklığı ${fmt(t,1)} °C esas alındı.`]};
  }
  if(!hasAmbient)return{known:false,basis:'none',state:'Bilinmiyor',confidence:'Düşük',cls:'warn',risk:null,temp:null,notes:['Ortam veya batarya sıcaklığı kaydı yok.']};
  const ambient=Number(c.temp),parking=c.parking||'unknown',parkHours=Number(c.parkHours)||0,pre=Number(c.preDriveMin)||0;
  const base=thermalStateFromTemp(ambient);let risk=base.score??0,state=base.state,confidence='Düşük',cls='warn';const notes=[`Ortam sıcaklığı ${fmt(ambient,1)} °C; gerçek pack sıcaklığı değildir.`];
  if(parkHours>=4&&(parking==='outdoor-shade'||parking==='outdoor-sun')){confidence='Orta';cls='info';notes.push(`${fmt(parkHours,1)} saat dış ortam parkı nedeniyle ambient proxy daha anlamlı.`)}
  if(parking==='garage'){notes.push('Kapalı otoparkta MGM/Open-Meteo dış sıcaklığı garaj sıcaklığını temsil etmeyebilir; güven düşürüldü.');}
  if(parking==='outdoor-sun'&&parkHours>=1&&ambient>=25){risk+=15;state=ambient>=35?'Aşırı sıcak olası':'Güneş yüküyle sıcak olası';notes.push('Açık hava + güneş maruziyeti termal riski yükseltti.');}
  if(pre>=20&&ambient<=10){risk=Math.max(0,risk-15);state=ambient<0?'Soğuk, sürüşle kısmen ısınmış olabilir':'Serin/ılımlı olabilir';notes.push(`${fmt(pre,0)} dk şarj öncesi sürüş soğukta uzun süre bekleme (cold-soak) riskini azaltan proxy olarak işlendi.`)}
  return{known:true,basis:'ambient-proxy',state,confidence,cls,risk:clamp(risk),temp:ambient,notes};
}
function chargeStressScore(c){
  const cr=cRateStressValue(c),th=thermalStressValue(c),soc=chargeSocStress(c),vals=[];
  if(cr!=null)vals.push({v:cr,w:.55});if(soc!=null)vals.push({v:soc,w:.25});if(th!=null)vals.push({v:th,w:.20});
  if(!vals.length)return 90; // AC/DC etiketi tek başına sağlık cezası üretmez.
  const w=sum(vals.map(x=>x.w));const stress=sum(vals.map(x=>x.v*x.w))/w;
  return clamp(100-stress);
}
function batteryHealthScore(){
  const c=ownerCharges(),soh=referenceSoh(),components=[];
  if(soh?.soh!=null)components.push({key:'soh',label:'SOH',score:clamp(soh.soh),weight:50,detail:`${fmt(soh.soh,1)}% · ${soh.mode}`});
  if(c.length){
    const exp=socExposureMetrics();
    const socStress=exp.coveredHours>=3?socTimeStressValue(exp):weightedStressMean(c,chargeSocStress);
    if(socStress!=null)components.push({key:'soc',label:exp.coveredHours>=3?'SOC × zaman profili':'SOC çalışma profili',score:clamp(100-socStress),weight:20,detail:exp.coveredHours>=3?`Ort. SOC %${fmt(exp.avgSoc,1)} · >80% ${fmt(exp.above80Hours,1)} saat`:'Yüksek-SOC şarj pencereleri üzerinden proxy'});
    const cyc=cycleStressIndexFor(c);
    if(cyc.score!=null)components.push({key:'cycle',label:'Cycle / charge profili',score:clamp(100-cyc.score),weight:20,detail:`CSI ${fmt(cyc.score,1)}/100 · düşük CSI daha iyi`});
    const thermal=weightedStressMean(c,thermalStressValue);
    if(thermal!=null)components.push({key:'thermal',label:'Termal bağlam',score:clamp(100-thermal),weight:10,detail:'Gerçek batarya sıcaklığı varsa öncelikli; aksi halde ambient proxy'});
  }
  if(!components.length)return{score:null,components:[],confidence:'Veri yok',confidenceClass:'neutral',summary:'Şarj veya SOH verisi ekleyin.'};
  const weight=sum(components.map(x=>x.weight)),score=sum(components.map(x=>x.score*x.weight))/weight;
  const highSoh=db.sohTests.filter(x=>(x.qualityScore??sohQuality(x.startSoc,x.endSoc,x.type,x.temp).score)>=4).length;
  const exp=socExposureMetrics();let confidence='Düşük',confidenceClass='warn';
  if(highSoh>=2&&c.length>=8&&exp.coveredHours>=24){confidence='Yüksek';confidenceClass='good';}
  else if((db.sohTests.length>=1&&c.length>=4)||c.length>=8||exp.coveredHours>=12){confidence='Orta';confidenceClass='info';}
  const summary=score>=90?'Kullanım profili çok iyi':score>=80?'Kullanım profili iyi':score>=70?'Bazı maruziyetler iyileştirilebilir':'Şarj/park maruziyetlerinde dikkat alanları var';
  return{score,components,confidence,confidenceClass,summary};
}

function chargeSocBandFraction(c,low,high){
  if(!hasSocPair(c))return null;
  const a=Number(c.startSoc),b=Number(c.endSoc),delta=b-a;if(!(delta>0))return null;
  return Math.max(0,Math.min(b,high)-Math.max(a,low))/delta;
}
function chargeSocStress(c){
  if(!hasSocPair(c))return null;
  const fLow=chargeSocBandFraction(c,0,20)||0,f80=chargeSocBandFraction(c,80,90)||0,f90=chargeSocBandFraction(c,90,100)||0;
  return clamp(fLow*3+f80*45+f90*100);
}
function chargeDepthStress(c){
  if(!hasSocPair(c))return null;
  const d=Number(c.endSoc)-Number(c.startSoc);
  if(d<=20)return 5;if(d<=40)return 15;if(d<=60)return 30;if(d<=80)return 48;return 65;
}
function cRateStressValue(c){
  const ar=chargeAverageCRate(c),pr=chargePeakCRate(c),r=ar??pr;if(r==null)return null;let v;
  if(r<=0.5)v=0;else if(r<=1)v=(r-.5)/.5*15;else if(r<=2)v=15+(r-1)*25;else if(r<=4)v=40+(r-2)/2*45;else v=Math.min(100,85+(r-4)*7.5);
  if(ar!=null&&pr!=null&&pr>2)v+=Math.min(10,Math.max(0,pr-2)*5);return clamp(v);
}
function thermalStressValue(c){
  const ctx=chargeThermalContext(c);if(!ctx.known||ctx.risk==null)return null;
  const r=chargeCRate(c);let v=ctx.risk;
  const tActual=ctx.basis==='battery'?ctx.temp:null,ambient=ctx.basis==='ambient-proxy'?ctx.temp:null;
  const cold=(tActual!=null?tActual<=10:ambient!=null&&ambient<=10),hot=(tActual!=null?tActual>=35:ambient!=null&&ambient>=35)||(c.parking==='outdoor-sun'&&Number(c.temp)>=25);
  if(cold&&r!=null&&r>1)v+=Math.min(35,10+(r-1)*20);
  if(hot&&hasSocValue(c.endSoc)&&Number(c.endSoc)>80)v+=20;
  return clamp(v);
}
function weightedStressMean(charges,fn){
  const valid=charges.map(x=>({x,v:fn(x),e:chargeEnergyValue(x)})).filter(o=>o.v!=null&&Number.isFinite(o.v));if(!valid.length)return null;
  const e=sum(valid.map(o=>o.e));return e>0?sum(valid.map(o=>o.v*o.e))/e:avg(valid.map(o=>o.v));
}
function stressCoverageFor(charges){
  const total=sum(charges.map(chargeEnergyValue));
  const cov=pred=>{const e=sum(charges.filter(pred).map(chargeEnergyValue));return total>0?e/total*100:(charges.length?charges.filter(pred).length/charges.length*100:0)};
  const soc=cov(hasSocPair),crate=cov(x=>chargeCRate(x)!=null),temp=cov(x=>chargeThermalContext(x).known);
  const weighted=soc*.35+crate*.45+temp*.20,confidence=weighted>=80?'Yüksek':weighted>=50?'Orta':'Düşük',cls=weighted>=80?'good':weighted>=50?'info':'warn';
  return{soc,crate,temp,weighted,confidence,cls};
}
function cycleStressIndexFor(charges){
  if(!charges.length)return{score:null,components:[],coverage:stressCoverageFor([]),summary:'Cycle stress için şarj kaydı ekleyin.'};
  const components=[];
  const cr=weightedStressMean(charges,cRateStressValue);if(cr!=null)components.push({key:'crate',label:'C-rate maruziyeti',score:cr,weight:55,detail:'Ortalama C-rate esas; 50 kW DC ile 180 kW DC ayrı sınıflanır.'});
  const depth=weightedStressMean(charges,chargeDepthStress);if(depth!=null)components.push({key:'depth',label:'Şarj derinliği / ΔSOC',score:depth,weight:25,detail:'Sığ çevrimler daha düşük, çok geniş ΔSOC daha yüksek cycle-stress proxy üretir.'});
  const soc=weightedStressMean(charges,chargeSocStress);if(soc!=null)components.push({key:'soc',label:'SOC pencere konumu',score:soc,weight:20,detail:'Yüksek-SOC bölgeleri aynı ΔSOC için daha yüksek ağırlık alır.'});
  const w=sum(components.map(x=>x.weight)),score=w?sum(components.map(x=>x.score*x.weight))/w:null,coverage=stressCoverageFor(charges);
  const summary=score==null?'Veri yetersiz':score<20?'Düşük cycle/charge stresi':score<40?'Ilımlı cycle/charge stresi':score<60?'Orta cycle/charge stresi':score<80?'Yüksek cycle/charge stresi':'Çok yüksek cycle/charge stresi';
  return{score,components,coverage,summary};
}
function chargeEndMs(c){
  const start=new Date(c.date||'').getTime();if(!Number.isFinite(start))return null;
  return start+Math.max(1,Number(c.durationMin)||1)*60000;
}
function socTimelinePoints(){
  return window.T10XSocModel.eventList({...db,charges:ownerCharges()}).map(x=>({...x,source:x.kind,id:x.id}));
}
function socExposureMetrics(maxGapHours=72,startMs=null,endMs=null){
  return window.T10XSocModel.exposure({...db,charges:ownerCharges()},{maxGapHours,startMs,endMs});
}
function socTimeStressValue(exp=socExposureMetrics()){
  if(!(exp.coveredHours>0))return null;
  const avgPenalty=exp.avgSoc==null?0:clamp((exp.avgSoc-55)*1.2,0,30);
  return clamp((exp.above80Share||0)*.45+(exp.above90Share||0)*.35+avgPenalty);
}
function calendarStressIndex(charges=ownerCharges()){
  const starts=charges.map(x=>new Date(x.date||'').getTime()).filter(Number.isFinite),startMs=starts.length?Math.min(...starts):null;
  const timeline=socTimelinePoints(),timelineEnd=timeline.length?timeline[timeline.length-1].t:null;
  const exp=socExposureMetrics(72,startMs,timelineEnd),components=[];
  if(exp.coveredHours>=3){const s=socTimeStressValue(exp);components.push({key:'socTime',label:'SOC × zaman',score:s,weight:70,detail:`Kayda dayalı park ort. SOC %${fmt(exp.avgSoc,1)} · >80% ${fmt(exp.above80Hours,1)} saat · >90% ${fmt(exp.above90Hours,1)} saat`});}
  else{const hs=weightedStressMean(charges,chargeSocStress);if(hs!=null)components.push({key:'socProxy',label:'Yüksek-SOC proxy',score:hs,weight:60,detail:'SOC×zaman verisi yetersiz; şarj penceresi proxy olarak kullanıldı.'});}
  const th=weightedStressMean(charges,thermalStressValue);if(th!=null)components.push({key:'thermal',label:'Termal bağlam',score:th,weight:30,detail:'Gerçek batarya sıcaklığı varsa öncelikli; aksi halde ambient/park/ön sürüş proxy.'});
  const w=sum(components.map(x=>x.weight)),score=w?sum(components.map(x=>x.score*x.weight))/w:null;
  const confidence=exp.coveredHours>=24&&th!=null?'Yüksek':(exp.coveredHours>=3||th!=null)?'Orta':'Düşük',cls=confidence==='Yüksek'?'good':confidence==='Orta'?'info':'warn';
  const summary=score==null?'Veri yetersiz':score<20?'Düşük calendar stress':score<40?'Ilımlı calendar stress':score<60?'Orta calendar stress':score<80?'Yüksek calendar stress':'Çok yüksek calendar stress';
  return{score,components,summary,confidence,cls,exposure:exp};
}
function stressIndexFor(charges){
  if(!charges.length)return{score:null,components:[],coverage:stressCoverageFor([]),summary:'Stres hesabı için şarj kaydı ekleyin.',cycle:cycleStressIndexFor([]),calendar:calendarStressIndex([])};
  const cycle=cycleStressIndexFor(charges),calendar=calendarStressIndex(charges),components=[];
  if(cycle.score!=null)components.push({key:'cycle',label:'Cycle / Charge Stress',score:cycle.score,weight:65,detail:cycle.summary});
  if(calendar.score!=null)components.push({key:'calendar',label:'Takvim Stresi',score:calendar.score,weight:35,detail:calendar.summary});
  const w=sum(components.map(x=>x.weight)),score=w?sum(components.map(x=>x.score*x.weight))/w:null,coverage=stressCoverageFor(charges);
  const summary=score==null?'Veri yetersiz':score<20?'Düşük stresli kullanım profili':score<40?'Ilımlı stresli kullanım profili':score<60?'Orta-yüksek stres maruziyeti':score<80?'Yüksek stres maruziyeti':'Çok yüksek stres maruziyeti';
  return{score,components,coverage,summary,cycle,calendar};
}
function batteryStressIndex(){
  const ordered=[...ownerCharges()].sort((a,b)=>String(b.date).localeCompare(String(a.date))),n=Math.max(3,Number(db.settings.stressWindow)||12);
  return{recent:stressIndexFor(ordered.slice(0,n)),lifetime:stressIndexFor(ordered),window:n,recentCount:Math.min(n,ordered.length)};
}
function lifetimeExposureMetrics(){
  const c=ownerCharges(),cap=Number(db.settings.referenceCapacity)||88.5,total=sum(c.map(chargeEnergyValue));
  const weightedRateNumer=sum(c.map(x=>(chargeCRate(x)??0)*chargeEnergyValue(x))),rateEnergy=sum(c.filter(x=>chargeCRate(x)!=null).map(chargeEnergyValue));
  const highSocEnergy=sum(c.map(x=>{const f=chargeSocBandFraction(x,80,100);return f==null?0:chargeEnergyValue(x)*f}));
  const above90Energy=sum(c.map(x=>{const f=chargeSocBandFraction(x,90,100);return f==null?0:chargeEnergyValue(x)*f}));
  const lowSocEnergy=sum(c.map(x=>{const f=chargeSocBandFraction(x,0,20);return f==null?0:chargeEnergyValue(x)*f}));
  const fast05=sum(c.filter(x=>(chargeCRate(x)??0)>.5).map(chargeEnergyValue)),fast1=sum(c.filter(x=>(chargeCRate(x)??0)>1).map(chargeEnergyValue)),fast2=sum(c.filter(x=>(chargeCRate(x)??0)>2).map(chargeEnergyValue));
  const dc=sum(c.filter(x=>x.type==='DC').map(chargeEnergyValue));
  const thermalHigh=sum(c.filter(x=>(thermalStressValue(x)??0)>=50).map(chargeEnergyValue));
  const avgRates=c.map(chargeAverageCRate).filter(x=>x!=null),peakRates=c.map(chargePeakCRate).filter(x=>x!=null),socTime=socExposureMetrics();
  return{total,chargeEfc:cap>0?total/cap:null,dc,dcShare:total?dc/total*100:null,highSocEnergy,highSocShare:total?highSocEnergy/total*100:null,above90Energy,lowSocEnergy,fast05,fast05Share:total?fast05/total*100:null,fast1,fast1Share:total?fast1/total*100:null,fast2,fast2Share:total?fast2/total*100:null,thermalHigh,avgRate:rateEnergy?weightedRateNumer/rateEnergy:null,maxAvg:avgRates.length?Math.max(...avgRates):null,maxPeak:peakRates.length?Math.max(...peakRates):null,coverage:stressCoverageFor(c),socTime};
}
function socBandEnergy(charges){
  const bands=[['0–20%',0,20],['20–40%',20,40],['40–60%',40,60],['60–80%',60,80],['80–90%',80,90],['90–100%',90,100]],out={};
  for(const [label,a,b] of bands)out[label]=sum(charges.map(x=>{const f=chargeSocBandFraction(x,a,b);return f==null?0:chargeEnergyValue(x)*f}));return out;
}
function cRateBandEnergy(charges){
  const out={'≤0,5C':0,'0,5–1C':0,'1–2C':0,'2–4C':0,'≥4C':0,'C-rate bilinmiyor':0};
  for(const x of charges){const e=chargeEnergyValue(x),r=chargeCRate(x);if(r==null)out['C-rate bilinmiyor']+=e;else if(r<=.5)out['≤0,5C']+=e;else if(r<=1)out['0,5–1C']+=e;else if(r<=2)out['1–2C']+=e;else if(r<4)out['2–4C']+=e;else out['≥4C']+=e}return out;
}
function tempBandEnergy(charges){
  const out={'<0 °C':0,'0–10 °C':0,'10–15 °C':0,'15–30 °C':0,'30–35 °C':0,'35–40 °C':0,'≥40 °C':0,'Ambient bilinmiyor':0};
  for(const x of charges){const e=chargeEnergyValue(x);if(x.temp===null||x.temp===''||x.temp===undefined||!Number.isFinite(Number(x.temp))){out['Ambient bilinmiyor']+=e;continue}const t=Number(x.temp);if(t<0)out['<0 °C']+=e;else if(t<10)out['0–10 °C']+=e;else if(t<15)out['10–15 °C']+=e;else if(t<=30)out['15–30 °C']+=e;else if(t<35)out['30–35 °C']+=e;else if(t<40)out['35–40 °C']+=e;else out['≥40 °C']+=e}return out;
}
function acDcStats(charges=ownerCharges()){
  const total=sum(charges.map(chargeEnergyValue)),dc=sum(charges.filter(x=>x.type==='DC').map(chargeEnergyValue)),ac=sum(charges.filter(x=>x.type==='AC').map(chargeEnergyValue));
  const bands=cRateBandEnergy(charges);return{total,dc,ac,dcShare:total?dc/total*100:null,bands};
}
function recommendation(){
  const ordered=[...ownerCharges()].sort((a,b)=>String(b.date).localeCompare(String(a.date))),latest=ordered[0],current=Number(db.settings.currentSoc),exp=socExposureMetrics();
  if(!ordered.length)return{level:'info',title:'Kayıt ekleyerek başlayın',html:'Şarj geçmişi oluştukça C-rate, SOC penceresi ve termal bağlam birlikte değerlendirilerek öneri üretilecek.'};
  if(Number.isFinite(current)&&current>=90)return{level:'warn',title:'Yüksek SOC’de bekleme süresini azaltın',html:`Güncel SOC <strong>%${fmt(current,0)}</strong>. Yakın zamanda menzil ihtiyacı yoksa yüksek SOC’de uzun park etmek yerine kullanıma geçmek daha koruyucudur. Uzun yol için bu SOC gerekiyorsa sorun değildir; esas hedef bekleme süresini kısaltmaktır.`};
  if(latest){
    const r=chargeCRate(latest),thermal=chargeThermalContext(latest),a=cRateAssessment(r,thermal.basis==='battery'?thermal.temp:latest.temp,latest.endSoc);
    if((r??0)>2||a.severity>=4)return{level:'warn',title:'Son şarj yüksek hızlı/termal stresliydi',html:`Son kaydın C-rate'i <strong>${r!=null?fmt(r,2)+'C':'bilinmiyor'}</strong>. Bir sonraki şarjı zaman baskısı yoksa daha düşük C-rate ile yapmak ve ${thermal.state.toLocaleLowerCase('tr-TR')} termal bağlamı iyileştirmek maruziyeti azaltır. Bu öneri “DC yaptıysan AC zorunlu” kuralı değildir.`};
    if(thermal.known&&thermal.risk>=50)return{level:'warn',title:'Termal bağlamı iyileştirin',html:`Son şarjın termal proxy'si <strong>${escapeHtml(thermal.state)}</strong>. Özellikle yüksek C-rate planlanıyorsa park/sürüş koşullarını ve bataryanın ısınmasını/soğumasını dikkate alın.`};
  }
  if(Number.isFinite(current)&&current<20)return{level:'info',title:'Şarj planlamak mantıklı',html:`Güncel SOC <strong>%${fmt(current,0)}</strong>. Tam boşalmaya yaklaşmak yerine uygun olduğunda şarj edin; ancak sırf %20’ye ulaşmayı beklemek gerekmiyor. Hedef SOC’yi bir sonraki yol ihtiyacına göre Planlayıcı’dan hesaplayabilirsiniz.`};
  const lowPower=ordered.slice(0,5).filter(x=>(chargeCRate(x)??99)<=1).length;
  return{level:'good',title:'İhtiyaca göre şarj edin',html:`Son kayıtlarda belirgin yüksek-stres sinyali yok${lowPower?`; son 5 oturumun ${lowPower} tanesi ≤1C`:''}. AC veya düşük güçlü DC arasında batarya sağlığı açısından temel ayrım etiket değil C-rate’tir. %20’yi beklemek veya her seferinde %80’e çıkmak zorunda değilsiniz; ihtiyaç kadar sığ şarj uygundur.${exp.coveredHours>=3?` SOC×zaman proxy'nizde >80% maruziyet ${fmt(exp.above80Hours,1)} saat.`:''}`};
}

function group(arr,keyFn,valueKey){const m={};for(const x of arr){const k=keyFn(x);m[k]=(m[k]||0)+(valueKey?Number(x[valueKey])||0:1)}return m}
function renderBars(id,obj,suffix=''){const el=byId(id);const entries=Object.entries(obj).sort((a,b)=>b[1]-a[1]);if(!entries.length){el.innerHTML='<div class="empty">Veri yok.</div>';return}const max=Math.max(...entries.map(x=>x[1]),1);el.innerHTML=entries.slice(0,8).map(([k,v])=>`<div class="bar-row"><div class="bar-label"><span>${escapeHtml(k)}</span><strong>${fmt(v,1)}${suffix}</strong></div><div class="bar-track"><div class="bar-fill" style="width:${v/max*100}%"></div></div></div>`).join('')}
function renderBarsOrdered(id,obj,suffix=''){const el=byId(id),entries=Object.entries(obj);if(!entries.length){el.innerHTML='<div class="empty">Veri yok.</div>';return}const max=Math.max(...entries.map(x=>x[1]),1);el.innerHTML=entries.map(([k,v])=>`<div class="bar-row"><div class="bar-label"><span>${escapeHtml(k)}</span><strong>${fmt(v,1)}${suffix}</strong></div><div class="bar-track"><div class="bar-fill" style="width:${v/max*100}%"></div></div></div>`).join('')}

function renderDashboard(){
  const c=ownerCharges(),soh=referenceSoh(),cons=latestConsumptionSnapshot(),cost100=costPer100Metrics(),life=lifetimeExposureMetrics();
  const energyTotal=sum(c.map(chargeEnergyValue)),dcEnergy=sum(c.filter(x=>x.type==='DC').map(chargeEnergyValue));
  const socCharges=c.filter(hasSocPair),complianceWeighted=socCharges.length?avg(socCharges.map(x=>chargeCompliance(x).ratio))*100:null;
  const cRateHistory=chargeHistoryCRateMetrics(c);
  const cards=[
    ['Kilometre',latestOdo()?fmt(latestOdo(),0)+' km':'—','Son kayıt'],
    ['Sahiplik Mesafesi',ownershipKm()!=null?fmt(ownershipKm(),0)+' km':'—','32.356 km başlangıç'],
    ['Son Şarjdan Beri',cons?fmt(cons.sinceCharge,1)+' kWh/100 km':'—','Son tüketim sayaç kaydı'],
    ['100 km Tüketim',cost100.consumption!=null?fmt(cost100.consumption,1)+' kWh/100 km':'—','Sahiplik dönemi toplam ortalama'],
    ['100 km Maliyet',cost100.costPer100!=null?fmt(cost100.costPer100,2)+' ₺/100 km':'—',cost100.avgPrice!=null?fmt(cost100.avgPrice,2)+' ₺/kWh ortalama şarj maliyeti':'Maliyetli şarj kaydı gerekli'],
    ['Takip SOH',soh?fmt(soh.soh,1)+'%':'—',soh?soh.mode:'Kontrollü testlerden'],
    ['Şarj Kaydı',c.length,'Toplam oturum'],
    ['DC Enerji Payı',energyTotal?fmt(dcEnergy/energyTotal*100,1)+'%':'—','İstatistik; stres skoru değildir'],
    ['20–80 Bandı',complianceWeighted!==null?fmt(complianceWeighted,1)+'%':'—','Katı hedef değil; koruma bandı'],
    ['En Yüksek Şarj Ortalaması (C-rate)',cRateHistory.maxAverage?fmt(cRateHistory.maxAverage.rate,2)+'C':'—',chargeCRateSessionDetail(cRateHistory.maxAverage)],
    ['En Yüksek Anlık Şarj Hızı (C-rate)',cRateHistory.maxPeak?fmt(cRateHistory.maxPeak.rate,2)+'C':'—',chargeCRateSessionDetail(cRateHistory.maxPeak,{peak:true})],
    ['Enerji Ağırlıklı Ortalama C-rate',cRateHistory.weightedAverage!=null?fmt(cRateHistory.weightedAverage,2)+'C':'—',weightedCRateDetail(cRateHistory)]
  ];
  byId('dashboardCards').innerHTML=cards.map(x=>`<div class="metric"><div class="label">${x[0]}</div><div class="value">${x[1]}</div><div class="sub">${x[2]}</div></div>`).join('');

  const hs=batteryHealthScore();
  byId('healthScoreValue').textContent=hs.score==null?'—':fmt(hs.score,0);
  byId('healthConfidence').textContent=`Güven: ${hs.confidence}`;byId('healthConfidence').className=`badge ${hs.confidenceClass}`;
  byId('healthScoreSummary').innerHTML=`<strong>${hs.summary}</strong>${hs.score!=null?`<div class="muted">Toplam skor ${fmt(hs.score,1)}/100</div>`:''}`;
  byId('healthScoreGauge').style.setProperty('--score',hs.score==null?0:hs.score);
  byId('healthScoreComponents').innerHTML=hs.components.length?hs.components.map(x=>`<div class="score-component"><div class="bar-label"><span>${escapeHtml(x.label)}</span><strong>${fmt(x.score,0)}</strong></div><div class="bar-track"><div class="bar-fill" style="width:${x.score}%"></div></div><div class="component-detail">${escapeHtml(x.detail)}</div></div>`).join(''):'<div class="empty">Skor için veri ekleyin.</div>';

  const bsi=batteryStressIndex(),sr=bsi.recent;
  byId('stressScoreValue').textContent=sr.score==null?'—':fmt(sr.score,0);
  byId('stressConfidence').textContent=`Güven: ${sr.coverage.confidence}`;byId('stressConfidence').className=`badge ${sr.coverage.cls}`;
  byId('stressScoreSummary').innerHTML=`<strong>${sr.summary}</strong>${sr.score!=null?`<div class="muted">Son ${bsi.recentCount} şarj · ${fmt(sr.score,1)}/100 · düşük daha iyi</div>`:''}`;
  byId('stressScoreGauge').style.setProperty('--score',sr.score==null?0:sr.score);
  byId('stressScoreComponents').innerHTML=sr.components.length?sr.components.map(x=>`<div class="score-component"><div class="bar-label"><span>${escapeHtml(x.label)}</span><strong>${fmt(x.score,0)}</strong></div><div class="bar-track stress-track"><div class="bar-fill stress-fill" style="width:${x.score}%"></div></div><div class="component-detail">${escapeHtml(x.detail)}</div></div>`).join(''):'<div class="empty">Stres analizi için veri ekleyin.</div>';
  byId('lifetimeExposureSummary').innerHTML=`<div class="mini-list"><div class="mini-item"><span>Toplam şarj enerji geçişi</span><strong>${fmt(life.total,1)} kWh</strong></div><div class="mini-item"><span>Şarj tarafı EFC göstergesi</span><strong>${life.chargeEfc!=null?fmt(life.chargeEfc,1):'—'}</strong></div><div class="mini-item"><span>≤1C dışındaki enerji</span><strong>${fmt(life.fast1,1)} kWh${life.fast1Share!=null?' · %'+fmt(life.fast1Share,1):''}</strong></div><div class="mini-item"><span>>2C enerji</span><strong>${fmt(life.fast2,1)} kWh${life.fast2Share!=null?' · %'+fmt(life.fast2Share,1):''}</strong></div><div class="mini-item"><span>>80% SOC bandında eklenen enerji</span><strong>${fmt(life.highSocEnergy,1)} kWh</strong></div></div>`;

  const ownKm=ownershipKm(),ownerHistory=c.filter(x=>x.scope==='owner_history').length,prev=db.charges.filter(x=>x.scope==='previous_owner').length;
  byId('ownershipSummary').innerHTML=`<div class="mini-list"><div class="mini-item"><span>Sahiplik başlangıcı</span><strong>${db.settings.ownershipStartOdo?fmt(db.settings.ownershipStartOdo,0)+' km':'-'} · %${db.settings.ownershipStartSoc??'-'}${db.settings.ownershipStartDate?' · '+fmtDate(db.settings.ownershipStartDate):''}</strong></div><div class="mini-item"><span>Güncel durum</span><strong>${latestOdo()?fmt(latestOdo(),0)+' km':'-'} · %${db.settings.currentSoc??'-'}</strong></div><div class="mini-item"><span>Sizin dönemde izlenen mesafe</span><strong>${ownKm!=null?fmt(ownKm,0)+' km':'-'}</strong></div><div class="mini-item"><span>Sizin şarj kayıtlarınız</span><strong>${c.length}</strong></div><div class="mini-item"><span>Sonradan girilen geçmiş kayıt</span><strong>${ownerHistory}</strong></div>${prev?`<div class="mini-item"><span>Önceki sahip kaydı</span><strong>${prev}</strong></div>`:''}</div>`;
  const detailedAvg=weightedTripConsumption();
  byId('consumptionSummary').innerHTML=cons?`<div class="consumption-pair"><div><span>Son şarjdan beri</span><strong>${fmt(cons.sinceCharge,1)}</strong><small>kWh/100 km</small></div><div><span>Toplam</span><strong>${fmt(cons.total,1)}</strong><small>kWh/100 km</small></div></div><p class="muted">Son sayaç kaydı: ${fmtDate(cons.date)} · ${fmt(cons.odo,0)} km${detailedAvg!=null?` · Ayrıntılı sürüşlerden ağırlıklı ortalama: ${fmt(detailedAvg,1)} kWh/100 km`:''}</p>`:'<div class="empty">Henüz tüketim sayaç kaydı yok. Araç ekranındaki iki ortalamayı Tüketim / Sürüş bölümünden ekleyin.</div>';
  if(document.activeElement!==D.quickCurrentOdo)D.quickCurrentOdo.value=db.settings.currentOdo??latestOdo()??'';
  if(document.activeElement!==D.quickCurrentSoc)D.quickCurrentSoc.value=db.settings.currentSoc??'';
  const ad=db.activeDrive;
  byId('driveStatusInfo').innerHTML=ad
    ?`<strong>Sürüş devam ediyor.</strong> Başlangıç: ${fmtDate(ad.startAt)} · ${fmt(ad.startOdo,0)} km · %${fmt(ad.startSoc,0)} SOC. Bitirirken güncel km/SOC girin.`
    :'Sürüş başlamadı. İsterseniz sadece <strong>“Sürüşü Bitirdim”</strong> ile park başlangıcını işaretleyebilirsiniz; başlangıç bilinmiyorsa yolculuk süresi hesaplanmaz.';
  D.quickDriveStartBtn.disabled=!!ad;
  D.quickDriveEndBtn.textContent=ad?'Sürüşü Bitirdim':'Sürüşü Bitirdim (başlangıç yok)';

  const rec=recommendation();byId('smartRecommendation').innerHTML=`<p>${rec.html}</p><p class="muted">Karar motoru: C-rate + SOC penceresi + SOC×zaman + termal bağlam. AC/DC etiketi tek başına sağlık kararı üretmez.</p>`;byId('recommendationBadge').textContent=rec.title;byId('recommendationBadge').className=`badge ${rec.level}`;
  const recent=[...c].sort((a,b)=>String(b.date).localeCompare(String(a.date))).slice(0,5);
  byId('recentCharges').innerHTML=recent.length?`<div class="mini-list">${recent.map(x=>`<div class="mini-item"><span>${fmtDate(x.date)} · ${escapeHtml(x.provider||x.type)}</span><strong>${socLabel(x)}${chargeCRate(x)!=null?' · '+(chargeCRateSource(x)==='ortalama'?'Ort. ':'Tepe ')+fmt(chargeCRate(x),2)+'C':''}</strong></div>`).join('')}</div>`:'<div class="empty">Henüz şarj kaydı yok.</div>';
  const socKnown=c.filter(hasSocPair),full=socKnown.filter(x=>chargeCompliance(x).full).length,above=socKnown.filter(x=>chargeCompliance(x).above>0).length,below=socKnown.filter(x=>chargeCompliance(x).below>0).length;
  byId('complianceSummary').innerHTML=c.length?`<div class="mini-list"><div class="mini-item"><span>SOC verisi olan oturum</span><strong>${socKnown.length}/${c.length}</strong></div><div class="mini-item"><span>Tam koruma bandında kalan</span><strong>${socKnown.length?`${full}/${socKnown.length} (${fmt(full/socKnown.length*100,0)}%)`:'—'}</strong></div><div class="mini-item"><span>%80 üstüne çıkan</span><strong>${socKnown.length?above:'—'}</strong></div><div class="mini-item"><span>%20 altından başlayan</span><strong>${socKnown.length?below:'—'}</strong></div><p class="muted">%20’ye düşmeyi beklemek veya her seferinde %80’e çıkmak gerekli değildir; bu yalnızca tercih edilen koruma bandıdır.</p></div>`:'<div class="empty">Analiz için şarj kaydı ekleyin.</div>';

  const exp=socExposureMetrics();
  byId('socTimeDashboard').innerHTML=exp.coveredHours?`<div class="mini-list"><div class="mini-item"><span>Kayda dayalı park</span><strong>${fmt(exp.parkHours,1)} saat</strong></div><div class="mini-item"><span>Ortalama park SOC</span><strong>%${fmt(exp.avgSoc,1)}</strong></div><div class="mini-item"><span>Parkta >%80</span><strong>${fmt(exp.above80Hours,1)} saat</strong></div><div class="mini-item"><span>Parkta >%90</span><strong>${fmt(exp.above90Hours,1)} saat</strong></div><div class="mini-item"><span>Belirsiz / uzun boşluk</span><strong>${fmt(exp.unknownHours+exp.ignoredHours,1)} saat</strong></div></div><p class="muted">Güven: ${exp.confidence} · Zaman aralıklarının %${fmt(exp.knownShare,0)}'i sınıflanabildi. Devam eden park süresi teyit edilene kadar sayılmaz.</p>`:'<div class="empty">Kayda dayalı park aralığı henüz yok. Bir sürüş bitişi ve bir sonraki sürüş başlangıcı ya da aynı kilometrede iki SOC gözlemi oluşturun. Bilinmeyen süreler otomatik doldurulmaz.</div>';
  const totalCons=cons?.total||weightedTripConsumption();
  byId('plannerDashboard').innerHTML=`<div class="mini-list"><div class="mini-item"><span>Güncel SOC</span><strong>%${fmt(db.settings.currentSoc,0)}</strong></div><div class="mini-item"><span>Referans tüketim</span><strong>${totalCons?fmt(totalCons,1)+' kWh/100 km':'—'}</strong></div><div class="mini-item"><span>Varsayılan rezerv</span><strong>%${fmt(db.settings.plannerReserveSoc??15,0)}</strong></div></div><p class="muted">Mesafe ve hareket saatini girerek ihtiyaç kadar hedef SOC ile en geç şarj başlangıç zamanını hesaplayın.</p>`;

  renderBars('chargeTypeBars',Object.fromEntries(Object.entries(group(c,x=>x.type)).map(([k,v])=>[k,v])),' oturum');
  renderBars('providerBars',group(c,x=>x.provider||'Belirtilmedi','energy'),' kWh');
  const bands={};for(const x of c){const r=chargeCRate(x),b=cRateClass(r).label;bands[b]=(bands[b]||0)+1;}renderBars('crateSummary',bands,' kayıt');
}

function chargeBadge(c){const cp=chargeCompliance(c);if(!cp.available)return'<span class="badge neutral">SOC yok</span>';return cp.full?'<span class="badge good">Band içinde</span>':cp.above>0?'<span class="badge warn">%80+</span>':'<span class="badge info">%20 altı</span>'}
function crateBadgeForCharge(c){
  const ar=chargeAverageCRate(c),pr=chargePeakCRate(c),r=ar??pr;if(r==null)return'-';
  const th=chargeThermalContext(c),temp=th.basis==='battery'?th.temp:c.temp,a=cRateAssessment(r,temp,c.endSoc);let cls=a.cls2;
  if((th.risk??0)>=60)cls='bad';else if((th.risk??0)>=35&&cls==='good')cls='warn';
  const parts=[];if(ar!=null)parts.push(`Ort. ${fmt(ar,2)}C`);if(pr!=null)parts.push(`Maks. ${fmt(pr,2)}C`);
  return`<span class="badge ${cls}" title="${escapeHtml([...a.notes,...th.notes].join(' '))}">${parts.join(' · ')}</span>`;
}
function renderCharges(){
  const rows=[...db.charges].sort((a,b)=>String(b.date).localeCompare(String(a.date)));
  byId('chargesTable').innerHTML=rows.length?rows.map(x=>{const ap=chargeAveragePower(x),th=chargeThermalContext(x);return`<tr><td>${fmtDate(x.date)}</td><td>${x.odo?fmt(x.odo,0):'<span class="muted">Bilinmiyor</span>'}</td><td>${socLabel(x)}</td><td>${x.type}</td><td><span class="badge ${x.scope==='previous_owner'?'neutral':x.scope==='owner_history'?'info':'good'}">${scopeLabel(x.scope)}</span></td><td>${x.durationMin?fmt(x.durationMin,0)+' dk':'-'}</td><td>${ap!=null?fmt(ap,1)+' kW':'-'}</td><td>${x.power?fmt(x.power,1)+' kW':'-'}</td><td>${crateBadgeForCharge(x)}</td><td>${x.energy?fmt(x.energy,2)+' kWh':'-'}</td><td>${escapeHtml(x.provider||'-')}</td><td>${x.cost?fmt(x.cost,2):'-'}</td><td>${chargeBadge(x)}<div class="muted">${escapeHtml(th.state)}</div></td><td><button class="link-btn" onclick="editCharge('${x.id}')">Düzenle</button><button class="link-btn" onclick="deleteCharge('${x.id}')">Sil</button></td></tr>`}).join(''):'<tr><td colspan="14" class="empty">Henüz kayıt yok.</td></tr>';
}
function updateChargePreview(){
  const peak=+D.chargePower.value,energy=+D.chargeEnergy.value,duration=+D.chargeDuration.value,start=+D.chargeStartSoc.value,end=+D.chargeEndSoc.value;
  const avgPower=energy>0&&duration>0?energy/(duration/60):null,avgR=avgPower!=null?cRate(avgPower):null,peakR=peak>0?cRate(peak):null,r=avgR??peakR;
  const draft={temp:D.chargeTemp.value===''?null:+D.chargeTemp.value,batteryTemp:D.chargeBatteryTemp.value===''?null:+D.chargeBatteryTemp.value,parking:D.chargeParking.value,parkHours:+D.chargeParkHours.value||0,preDriveMin:+D.chargePreDriveMin.value||0,endSoc:D.chargeEndSoc.value===''?null:+D.chargeEndSoc.value,power:peak||null,energy:energy||null,durationMin:duration||null,type:D.chargeType.value};
  const th=chargeThermalContext(draft),lines=[];
  if(avgPower!=null)lines.push(`Ortalama güç: <strong>${fmt(avgPower,1)} kW</strong> · Ortalama C-rate: <strong>${fmt(avgR,2)}C</strong>`);
  if(peakR!=null)lines.push(`Maksimum görülen: <strong>${fmt(peak,1)} kW</strong> · Tepe C-rate: <strong>${fmt(peakR,2)}C</strong>`);
  if(r==null)lines.push('Enerji + süre girerseniz ortalama güç ve C-rate otomatik hesaplanır. Maksimum görülen güç opsiyoneldir.');
  const a=r!=null?cRateAssessment(r,th.basis==='battery'?th.temp:draft.temp,end):{cls2:'neutral',label2:'C-rate bekleniyor',notes:[]};
  const startKnown=D.chargeStartSoc.value!=='',endKnown=D.chargeEndSoc.value!=='';
  byId('chargePreview').innerHTML=`${lines.join('<br>')}<br><span class="badge ${a.cls2}">${a.label2}</span>${startKnown||endKnown?` · SOC: ${startKnown?start+'%':'—'} → ${endKnown?end+'%':'—'}`:' · SOC: bilinmiyor'}<br><span class="badge ${th.cls}">Termal proxy: ${escapeHtml(th.state)}</span> · Güven: ${th.confidence}<div class="preview-notes">${[...a.notes,...th.notes].map(n=>`• ${escapeHtml(n)}`).join('<br>')}<br>• AC/DC etiketi sağlık puanı üretmez; esas yük ortalama C-rate ve termal bağlamdır.</div>`;
}


function renderConsumptionSnapshots(){
  const rows=[...db.consumptionSnapshots].sort((a,b)=>String(b.date).localeCompare(String(a.date))||Number(b.odo)-Number(a.odo));
  byId('consumptionTable').innerHTML=rows.length?rows.map(x=>`<tr><td>${fmtDate(x.date)}</td><td>${fmt(x.odo,0)} km</td><td><strong>${fmt(x.sinceCharge,1)} kWh/100</strong></td><td><strong>${fmt(x.total,1)} kWh/100</strong></td><td>${escapeHtml(x.notes||'-')}</td><td><button class="link-btn" onclick="editConsumption('${x.id}')">Düzenle</button><button class="link-btn" onclick="deleteConsumption('${x.id}')">Sil</button></td></tr>`).join(''):'<tr><td colspan="6" class="empty">Henüz tüketim sayaç kaydı yok.</td></tr>';
}

function renderTrips(){const rows=[...db.trips].sort((a,b)=>String(b.date).localeCompare(String(a.date)));byId('tripsTable').innerHTML=rows.length?rows.map(x=>`<tr><td>${fmtDate(x.date)}</td><td>${fmt(x.distance,1)} km</td><td>${fmt(x.consumption,1)} kWh/100</td><td>${fmt(Number(x.distance)*Number(x.consumption)/100,1)} kWh</td><td>${x.startSoc!==''&&x.startSoc!=null?x.startSoc+'% → '+x.endSoc+'%':'-'}</td><td>${escapeHtml(x.route||'-')}</td><td><button class="link-btn" onclick="editTrip('${x.id}')">Düzenle</button><button class="link-btn" onclick="deleteTrip('${x.id}')">Sil</button></td></tr>`).join(''):'<tr><td colspan="7" class="empty">Henüz kayıt yok.</td></tr>'}

function calcSoh(){
  const a=+D.sohStartSoc.value,b=+D.sohEndSoc.value,e=+D.sohEnergy.value,loss=+D.sohLoss.value||0,ref=+db.settings.referenceCapacity;
  if(!(b>a&&e>0))return null;
  const net=e*(1-loss/100),cap=net/((b-a)/100),soh=cap/ref*100,q=sohQuality(a,b,D.sohType.value,D.sohTemp.value===''?null:+D.sohTemp.value);
  return{net,cap,soh,q};
}
function updateSohPreview(){const r=calcSoh();byId('sohPreview').innerHTML=r?`Net bataryaya giden enerji: <strong>${fmt(r.net,2)} kWh</strong> · Tahmini kapasite: <strong>${fmt(r.cap,2)} kWh</strong> · SOH: <strong>${fmt(r.soh,1)}%</strong> · Test kalitesi: <span class="badge ${r.q.cls}">${r.q.label}</span><div class="preview-notes">${r.q.reasons.join(' · ')}</div>`:'SOC ve enerji değerlerini girince tahmini sonuç burada görünecek.'}
function renderSoh(){const rows=[...db.sohTests].sort((a,b)=>String(b.date).localeCompare(String(a.date)));byId('sohTable').innerHTML=rows.length?rows.map(x=>{const q=sohQuality(x.startSoc,x.endSoc,x.type,x.temp);return`<tr><td>${fmtDate(x.date)}</td><td>${socLabel(x)}</td><td>${fmt(x.netEnergy,2)} kWh</td><td>${fmt(x.estimatedCapacity,2)} kWh</td><td><span class="badge ${x.soh>=95?'good':x.soh>=90?'warn':'bad'}">${fmt(x.soh,1)}%</span></td><td><span class="badge ${q.cls}">${q.label}</span></td><td>${x.odo?fmt(x.odo,0):'-'}</td><td><button class="link-btn" onclick="deleteSoh('${x.id}')">Sil</button></td></tr>`}).join(''):'<tr><td colspan="8" class="empty">Henüz SOH testi yok.</td></tr>'}

function renderCrate(){
  const cap=+D.crateCapacity.value,power=+D.cratePower.value,start=+D.crateStartSoc.value,end=+D.crateEndSoc.value,temp=+D.crateTemp.value;
  if(!(cap>0&&power>0)){byId('crateResult').innerHTML='<h2>Sonuç</h2><div class="empty">Kapasite ve güç girin.</div>';return;}
  const rate=cRate(power,cap),energy=Math.max(0,cap*(end-start)/100),mins=energy>0?energy/power*60:null,a=cRateAssessment(rate,temp,end);
  byId('crateResult').innerHTML=`<h2>Simülasyon Sonucu</h2><div class="crate-big">${fmt(rate,2)}C</div><p><span class="badge ${a.cls2}">${a.label2}</span></p><div class="mini-list"><div class="mini-item"><span>${start}% → ${end}% teorik enerji</span><strong>${fmt(energy,1)} kWh</strong></div><div class="mini-item"><span>Sabit ${fmt(power,0)} kW varsayımıyla teorik süre</span><strong>${mins!=null?fmt(mins,0)+' dk':'-'}</strong></div></div><div class="advice-box">${a.notes.map(n=>`<div>• ${escapeHtml(n)}</div>`).join('')}</div><p class="muted">Gerçekte BMS şarj eğrisini düşürür; bu süre ve C-rate sabit güç varsayımıdır.</p>`;
  const thresholds=[['≤0,5C','Çok düşük stres','AC ve düşük güçlü DC tipik bölgesi.'],['0,5–1C','Düşük / ılımlı','NMC için genel olarak nazik hızlı şarj bölgesi.'],['1–2C','Yönetilebilir','2026 çalışmasında 2C’de >1.000 çevrim; sıcaklık ve SOC yine önemlidir.'],['2–4C','Yüksek dikkat','2C referansının üstü; anodik stres ve plating eğilimi artabilir.'],['≥4C','Yüksek stres','Çalışmada 4C/6C’de çevrim ömrü <500; lithium plating ve empedans artışı belirgin.']];
  byId('crateThresholds').innerHTML=`<div class="mini-list">${thresholds.map(x=>`<div class="mini-item vertical"><strong>${x[0]} · ${x[1]}</strong><span>${x[2]}</span></div>`).join('')}</div>`;
}


let plannerForecast=null;
let plannerWeatherCurrent=null;

function plannerForecastPointAt(ms){
  if(!plannerForecast?.hourly?.length||!Number.isFinite(ms))return null;
  let best=null,dist=Infinity;for(const x of plannerForecast.hourly){const t=new Date(x.time).getTime(),d=Math.abs(t-ms);if(Number.isFinite(t)&&d<dist){best=x;dist=d;}}
  return best;
}
function plannerThermalContext(targetSoc=null){
  return chargeThermalContext({
    temp:D.plannerAmbientTemp.value===''?null:+D.plannerAmbientTemp.value,
    batteryTemp:null,parking:D.plannerParking.value||'unknown',parkHours:+D.plannerParkHours.value||0,preDriveMin:+D.plannerPreDriveMin.value||0,
    endSoc:targetSoc,type:D.plannerChargeType.value,power:+D.plannerPower.value||null
  });
}
function plannerTempPenalty(temp,rate,target,parking,atMs){
  if(!Number.isFinite(Number(temp)))return 25;
  const t=Number(temp);let p=0;
  if(t<0)p=45+(rate>1?25:5);else if(t<10)p=18+(rate>1?25:5);else if(t<15)p=7;else if(t<=25)p=0;else if(t<=30)p=5;else if(t<35)p=15+(target>80?8:0);else p=35+(target>80?20:0);
  if(parking==='outdoor-sun'&&Number.isFinite(atMs)){const h=new Date(atMs).getHours();if(h>=11&&h<=17&&t>=20)p+=15;}
  return p;
}
function plannerRecommendedStart(depMs,durationHours,latestStart,target,rate){
  if(!Number.isFinite(depMs)||!Number.isFinite(latestStart)||!(durationHours>0))return{start:latestStart,point:plannerForecastPointAt(latestStart),optimized:false};
  if(target>80||D.plannerParking.value==='garage'||!plannerForecast?.hourly?.length)return{start:latestStart,point:plannerForecastPointAt(latestStart),optimized:false};
  const now=Date.now(),earliest=Math.max(now,depMs-36*3600000),parking=D.plannerParking.value||'unknown';let best=null;
  for(const x of plannerForecast.hourly){
    const t=new Date(x.time).getTime();if(!Number.isFinite(t)||t<earliest||t>latestStart)continue;
    if(t+durationHours*3600000>depMs-15*60000)continue;
    const earlyHours=Math.max(0,(latestStart-t)/3600000),calendarPenalty=earlyHours*(target>=70?1.2:.45);
    const score=plannerTempPenalty(x.temperature,rate,target,parking,t)+calendarPenalty;
    if(!best||score<best.score-.01||(Math.abs(score-best.score)<.01&&t>best.start))best={start:t,point:x,score};
  }
  return best?{...best,optimized:Math.abs(best.start-latestStart)>30*60000}:{start:latestStart,point:plannerForecastPointAt(latestStart),optimized:false};
}
function calcPlanner(){
  const current=+D.plannerCurrentSoc.value,distance=+D.plannerDistance.value,consumption=+D.plannerConsumption.value,reserve=+D.plannerReserveSoc.value,margin=+D.plannerMargin.value,power=+D.plannerPower.value;
  if(!(current>=0&&current<=100&&distance>=0&&consumption>0&&reserve>=0&&reserve<=40&&margin>=0&&power>0))return null;
  const soh=referenceSoh()?.soh,cap=Number(db.settings.referenceCapacity)*(soh&&soh>50&&soh<110?soh/100:1);
  const tripEnergy=distance*consumption/100*(1+margin/100),requiredRaw=tripEnergy/cap*100+reserve;
  const target=Math.min(100,Math.max(0,Math.ceil(requiredRaw/5)*5)),needsRouteCharge=requiredRaw>100;
  const delta=Math.max(0,target-current),eff=D.plannerChargeType.value==='AC'?.90:.95,gridEnergy=delta/100*cap/eff,durationHours=gridEnergy/power;
  const depMs=D.plannerDeparture.value?new Date(D.plannerDeparture.value).getTime():null;
  const latestStart=Number.isFinite(depMs)&&delta>0?depMs-durationHours*3600000-15*60000:null;
  const rate=cRate(power),timing=plannerRecommendedStart(depMs,durationHours,latestStart,target,rate),recommendedStart=timing.start;
  const forecastAtStart=timing.point||plannerForecastPointAt(recommendedStart),forecastAtDeparture=plannerForecastPointAt(depMs);
  const ambientForPlan=forecastAtStart&&Number.isFinite(forecastAtStart.temperature)?forecastAtStart.temperature:(D.plannerAmbientTemp.value===''?null:+D.plannerAmbientTemp.value);
  const context=chargeThermalContext({temp:ambientForPlan,batteryTemp:null,parking:D.plannerParking.value||'unknown',parkHours:+D.plannerParkHours.value||0,preDriveMin:+D.plannerPreDriveMin.value||0,endSoc:target,type:D.plannerChargeType.value,power});
  const notes=[];
  if(delta<=0)notes.push('Mevcut SOC planlanan yol + rezerv için yeterli; zorunlu şarj görünmüyor.');
  else if(target<=80)notes.push(`İhtiyaç hesabı %${target} hedef SOC gösteriyor; sırf alışkanlık nedeniyle %80'e çıkmanız gerekmiyor.`);
  else notes.push(`Planlanan enerji ihtiyacı %80'in üzerinde hedef gerektiriyor (%${target}). Yüksek SOC'ye çıkmak burada menzil ihtiyacına dayalıdır.`);
  if(target>80&&Number.isFinite(depMs))notes.push('Yüksek SOC’de beklemeyi azaltmak için şarjın hareket saatine yakın tamamlanması önerilir.');
  if(timing.optimized&&Number.isFinite(recommendedStart)){const h=new Date(recommendedStart).getHours(),part=h<6?'gece/erken sabah':h<11?'sabah':h<17?'öğlen/öğleden sonra':h<22?'akşam':'gece';notes.push(`Saatlik hava tahmini ve yüksek-SOC bekleme dengesi, ${part} dönemindeki daha uygun termal pencereyi öne çıkarıyor.`);}
  if(D.plannerChargeType.value==='DC'&&rate>1&&context.risk!=null&&context.risk>=35)notes.push('Yüksek C-rate + soğuk/sıcak termal bağlam kombinasyonu nedeniyle DC öncesi termal koşulu iyileştirin; kışın sürüş/preconditioning, yazın gölge/kapalı park faydalıdır.');
  if(rate<=1)notes.push(`${fmt(power,0)} kW bu bataryada yaklaşık ${fmt(rate,2)}C; düşük/ılımlı charge-rate bölgesidir. AC olması şart değildir.`);
  if(rate>2)notes.push(`${fmt(rate,2)}C planlanan ortalama güç 2C üzerindedir; zaman baskısı yoksa daha düşük ortalama güç cycle stress'i azaltır.`);
  if(context.basis==='ambient-proxy'&&context.state.includes('sıcak')&&D.plannerParking.value==='outdoor-sun')notes.push('Açık güneş parkında sıcak saatler yerine gece/sabah veya kapalı/gölgeli konum daha iyi termal bağlam sağlar.');
  if(context.basis==='ambient-proxy'&&(context.state.includes('Soğuk')||context.state.includes('soğuk'))&&D.plannerChargeType.value==='DC'&&+D.plannerPreDriveMin.value<20)notes.push('Soğukta uzun süre bekleme (soğukta uzun süre bekleme (cold-soak)) olasılığında yüksek güçlü DC’yi ilk hareket olarak seçmek yerine en az 20–30 dk sürüş sonrası şarj daha iyi bir yaklaşık termal koşul sağlar.');
  return{current,distance,consumption,reserve,margin,power,rate,cap,tripEnergy,requiredRaw,target,needsRouteCharge,delta,gridEnergy,durationHours,depMs,latestStart,recommendedStart,timing,context,forecastAtStart,forecastAtDeparture,notes};
}
function renderPlanner(){
  if(!D.plannerForm)return;
  if(!D.plannerCurrentSoc.matches(':focus'))D.plannerCurrentSoc.value=db.settings.currentSoc??'';
  if(!D.plannerConsumption.matches(':focus')){const c=latestConsumptionSnapshot()?.total||weightedTripConsumption();if(c&&!D.plannerConsumption.value)D.plannerConsumption.value=Number(c).toFixed(1);}
  if(!D.plannerReserveSoc.matches(':focus')&&!D.plannerReserveSoc.value)D.plannerReserveSoc.value=db.settings.plannerReserveSoc??15;
  if(!D.plannerMargin.matches(':focus')&&!D.plannerMargin.value)D.plannerMargin.value=db.settings.plannerMarginPct??10;
  if(D.plannerMgmLink)D.plannerMgmLink.href=window.T10XWeather?.mgmReferenceUrl?.(db.settings.mgmCity||'ANKARA')||'https://www.mgm.gov.tr/tahmin/saatlik.aspx?m=ANKARA';
  const r=calcPlanner();if(!r)return;
  let badge='Uygun',cls='good';if(r.needsRouteCharge){badge='Yol üstü şarj gerekir';cls='warn'}else if(r.target>80){badge='Yüksek SOC gerekli';cls='info'}else if(r.delta<=0){badge='Şarj gerekmiyor';cls='good'}
  D.plannerBadge.textContent=badge;D.plannerBadge.className=`badge ${cls}`;
  const latestStart=r.latestStart!=null?new Date(r.latestStart).toLocaleString('tr-TR',{dateStyle:'short',timeStyle:'short'}):'—';
  const recommendedStart=r.recommendedStart!=null?new Date(r.recommendedStart).toLocaleString('tr-TR',{dateStyle:'short',timeStyle:'short'}):'—';
  const finish=r.depMs!=null?new Date(r.depMs-15*60000).toLocaleString('tr-TR',{dateStyle:'short',timeStyle:'short'}):'—';
  D.plannerResult.innerHTML=`<div class="planner-target">%${fmt(r.target,0)}</div><p><strong>Gereken minimum hareket SOC'si</strong></p><div class="mini-list"><div class="mini-item"><span>Yol enerjisi + pay</span><strong>${fmt(r.tripEnergy,1)} kWh</strong></div><div class="mini-item"><span>Kullanılan kapasite referansı</span><strong>${fmt(r.cap,1)} kWh</strong></div><div class="mini-item"><span>Şarj edilmesi gereken ΔSOC</span><strong>${fmt(r.delta,0)} puan</strong></div><div class="mini-item"><span>Şebekeden yaklaşık enerji</span><strong>${fmt(r.gridEnergy,1)} kWh</strong></div><div class="mini-item"><span>Yaklaşık şarj süresi</span><strong>${r.delta>0?fmt(r.durationHours*60,0)+' dk':'Şarj gerekmiyor'}</strong></div><div class="mini-item"><span>Önerilen şarja başlama</span><strong>${r.delta>0?recommendedStart:'Mevcut SOC yeterli'}</strong></div>${r.delta>0&&r.timing?.optimized?`<div class="mini-item"><span>Teknik en geç başlangıç</span><strong>${latestStart}</strong></div>`:''}${r.target>80&&r.depMs&&r.delta>0?`<div class="mini-item"><span>Hedef tamamlanma</span><strong>≈ ${finish}</strong></div>`:''}</div>${r.needsRouteCharge?'<div class="info-box danger-box"><strong>Tek şarjla hedef >%100.</strong> Yol üstü şarj planlaması gerekir.</div>':''}<div class="advice-box">${r.notes.map(n=>`<div>• ${escapeHtml(n)}</div>`).join('')}</div>`;
  D.plannerThermal.innerHTML=`<div class="mini-list"><div class="mini-item"><span>Termal durum proxy</span><strong>${escapeHtml(r.context.state)}</strong></div><div class="mini-item"><span>Güven</span><strong>${r.context.confidence}</strong></div><div class="mini-item"><span>Planlanan C-rate</span><strong>${fmt(r.rate,2)}C</strong></div><div class="mini-item"><span>Veri temeli</span><strong>${r.context.basis==='battery'?'Batarya sıcaklığı':r.context.basis==='ambient-proxy'?'Ortam/park proxy':'Veri yok'}</strong></div></div><p class="muted">${r.context.notes.map(escapeHtml).join(' ')}</p>`;
  if(plannerForecast?.hourly?.length){
    const before=r.depMs?plannerForecast.hourly.filter(x=>new Date(x.time).getTime()<=r.depMs):plannerForecast.hourly.slice(0,24),temps=before.map(x=>x.temperature).filter(Number.isFinite);
    D.plannerWeatherDetail.innerHTML=`<div class="mini-list"><div class="mini-item"><span>Kaynak</span><strong>${escapeHtml(plannerForecast.sourceLabel)}</strong></div><div class="mini-item"><span>Şarj başlangıcı civarı</span><strong>${r.forecastAtStart?fmt(r.forecastAtStart.temperature,1)+' °C':'—'}</strong></div><div class="mini-item"><span>Hareket saati civarı</span><strong>${r.forecastAtDeparture?fmt(r.forecastAtDeparture.temperature,1)+' °C':'—'}</strong></div>${temps.length?`<div class="mini-item"><span>Tahmin aralığı</span><strong>${fmt(Math.min(...temps),1)} – ${fmt(Math.max(...temps),1)} °C</strong></div>`:''}</div>`;
  }else if(plannerWeatherCurrent){D.plannerWeatherDetail.innerHTML=`<div class="mini-list"><div class="mini-item"><span>Kaynak</span><strong>${escapeHtml(plannerWeatherCurrent.sourceLabel)}</strong></div><div class="mini-item"><span>Anlık sıcaklık</span><strong>${fmt(plannerWeatherCurrent.temperature,1)} °C</strong></div><div class="mini-item"><span>Nem</span><strong>%${fmt(plannerWeatherCurrent.humidity,0)}</strong></div></div>`;}else D.plannerWeatherDetail.innerHTML='<div class="empty">Konumdan hava verisi alabilir veya sıcaklığı manuel girebilirsiniz.</div>';
}


function renderStress(){
  const c=ownerCharges(),bsi=batteryStressIndex(),r=bsi.recent,l=bsi.lifetime,e=lifetimeExposureMetrics(),exp=e.socTime,rateSummary=chargeHistoryCRateMetrics(c);
  const cards=[
    ['Son Dönem BSI',r.score!=null?fmt(r.score,1)+'/100':'—',`Son ${bsi.recentCount}/${bsi.window} şarj · düşük daha iyi`],
    ['Cycle / Charge Index',r.cycle?.score!=null?fmt(r.cycle.score,1)+'/100':'—','C-rate + ΔSOC + SOC penceresi'],
    ['Calendar Index',r.calendar?.score!=null?fmt(r.calendar.score,1)+'/100':'—','SOC×zaman + termal bağlam'],
    ['Charge-side EFC',e.chargeEfc!=null?fmt(e.chargeEfc,2):'—','Σ şarj kWh / referans kWh'],
    ['>0,5C Throughput',fmt(e.fast05,1)+' kWh',e.fast05Share!=null?'%'+fmt(e.fast05Share,1)+' toplam enerji':'—'],
    ['>1C Throughput',fmt(e.fast1,1)+' kWh',e.fast1Share!=null?'%'+fmt(e.fast1Share,1)+' toplam enerji':'—'],
    ['>2C Throughput',fmt(e.fast2,1)+' kWh',e.fast2Share!=null?'%'+fmt(e.fast2Share,1)+' toplam enerji':'—'],
    ['>80% SOC Zamanı',exp.coveredHours?fmt(exp.above80Hours,1)+' saat':'—',exp.coveredHours?`%${fmt(exp.above80Share,1)} kapsanan süre`:'SOC zaman verisi gerekli']
  ];
  byId('stressCards').innerHTML=cards.map(x=>`<div class="metric"><div class="label">${x[0]}</div><div class="value">${x[1]}</div><div class="sub">${x[2]}</div></div>`).join('');
  byId('stressPanelValue').textContent=r.score==null?'—':fmt(r.score,0);byId('stressPanelGauge').style.setProperty('--score',r.score==null?0:r.score);
  byId('stressPanelConfidence').textContent=`Güven: ${r.coverage.confidence}`;byId('stressPanelConfidence').className=`badge ${r.coverage.cls}`;
  byId('stressPanelSummary').innerHTML=`<strong>${r.summary}</strong>${r.score!=null?`<div class="muted">BSI ${fmt(r.score,1)}/100 · son ${bsi.recentCount} şarj</div>`:''}`;
  byId('stressPanelComponents').innerHTML=r.components.length?r.components.map(x=>`<div class="score-component"><div class="bar-label"><span>${escapeHtml(x.label)}</span><strong>${fmt(x.score,0)}</strong></div><div class="bar-track stress-track"><div class="bar-fill stress-fill" style="width:${x.score}%"></div></div><div class="component-detail">${escapeHtml(x.detail)}</div></div>`).join(''):'<div class="empty">Veri yok.</div>';

  const cyc=r.cycle,cal=r.calendar;
  byId('cycleStressBadge').textContent=cyc?.score==null?'Veri yok':`${fmt(cyc.score,0)}/100`;byId('cycleStressBadge').className=`badge ${cyc?.score==null?'neutral':cyc.score<40?'good':cyc.score<60?'info':cyc.score<80?'warn':'bad'}`;
  byId('cycleStressDetail').innerHTML=cyc?.components?.length?`<div class="mini-list">${cyc.components.map(x=>`<div class="mini-item vertical"><strong>${escapeHtml(x.label)} · ${fmt(x.score,0)}/100</strong><span>${escapeHtml(x.detail)}</span></div>`).join('')}</div><p class="muted">${escapeHtml(cyc.summary)}</p>`:'<div class="empty">C-rate/SOC verisi gerekli.</div>';
  byId('calendarStressBadge').textContent=cal?.score==null?'Veri yok':`${fmt(cal.score,0)}/100`;byId('calendarStressBadge').className=`badge ${cal?.score==null?'neutral':cal.score<40?'good':cal.score<60?'info':cal.score<80?'warn':'bad'}`;
  byId('calendarStressDetail').innerHTML=cal?.components?.length?`<div class="mini-list">${cal.components.map(x=>`<div class="mini-item vertical"><strong>${escapeHtml(x.label)} · ${fmt(x.score,0)}/100</strong><span>${escapeHtml(x.detail)}</span></div>`).join('')}</div><p class="muted">Güven: ${cal.confidence} · ${escapeHtml(cal.summary)}</p>`:'<div class="empty">SOC×zaman veya termal veri gerekli.</div>';

  byId('stressCoverage').innerHTML=`<div class="mini-list"><div class="mini-item"><span>SOC şarj verisi kapsamı</span><strong>%${fmt(e.coverage.soc,0)}</strong></div><div class="mini-item"><span>C-rate veri kapsamı</span><strong>%${fmt(e.coverage.crate,0)}</strong></div><div class="mini-item"><span>Termal bağlam kapsamı</span><strong>%${fmt(e.coverage.temp,0)}</strong></div><div class="mini-item"><span>SOC×zaman kapsanan süre</span><strong>${fmt(exp.coveredHours,1)} saat</strong></div><div class="mini-item"><span>Toplam güven göstergesi</span><strong><span class="badge ${e.coverage.cls}">${e.coverage.confidence}</span></strong></div></div><p class="muted">Eksik veri kötü kullanım sayılmaz. SOC×zaman yalnızca doğrulanan park aralıklarında hesaplanır; 72 saati aşan aralıklar güvenilir sayılmaz.</p>`;
  renderBarsOrdered('stressSocBands',socBandEnergy(c),' kWh');renderBarsOrdered('stressCRateBands',cRateBandEnergy(c),' kWh');renderBarsOrdered('stressTempBands',tempBandEnergy(c),' kWh');
  byId('stressThroughput').innerHTML=`<div class="mini-list"><div class="mini-item"><span>Toplam şarj enerjisi</span><strong>${fmt(e.total,1)} kWh</strong></div><div class="mini-item"><span>Şarj tarafı EFC göstergesi</span><strong>${e.chargeEfc!=null?fmt(e.chargeEfc,2):'—'}</strong></div><div class="mini-item"><span>%80–100 bandında eklenen enerji</span><strong>${fmt(e.highSocEnergy,1)} kWh</strong></div><div class="mini-item"><span>%90–100 bandında eklenen enerji</span><strong>${fmt(e.above90Energy,1)} kWh</strong></div><div class="mini-item"><span>Yüksek termal proxy (≥50/100) enerji</span><strong>${fmt(e.thermalHigh,1)} kWh</strong></div><div class="mini-item vertical"><strong>En Yüksek Şarj Ortalaması (C-rate): ${rateSummary.maxAverage?fmt(rateSummary.maxAverage.rate,2)+'C':'—'}</strong><span>${chargeCRateSessionDetail(rateSummary.maxAverage)}</span></div><div class="mini-item vertical"><strong>En Yüksek Anlık Şarj Hızı (C-rate): ${rateSummary.maxPeak?fmt(rateSummary.maxPeak.rate,2)+'C':'—'}</strong><span>${chargeCRateSessionDetail(rateSummary.maxPeak,{peak:true})}</span></div><div class="mini-item vertical"><strong>Enerji Ağırlıklı Ortalama C-rate: ${rateSummary.weightedAverage!=null?fmt(rateSummary.weightedAverage,2)+'C':'—'}</strong><span>${weightedCRateDetail(rateSummary)}</span></div></div>`;

  byId('socTimeStress').innerHTML=`<div class="mini-list"><div class="mini-item"><span>Kayda dayalı park süresi</span><strong>${fmt(exp.parkHours,1)} saat</strong></div><div class="mini-item"><span>Kayda dayalı sürüş</span><strong>${fmt(exp.driveHours,1)} saat</strong></div><div class="mini-item"><span>Kayıtlı şarj aralığı</span><strong>${fmt(exp.chargeHours,1)} saat</strong></div><div class="mini-item"><span>Parkta ortalama SOC</span><strong>${exp.avgSoc!=null?'%'+fmt(exp.avgSoc,1):'—'}</strong></div><div class="mini-item"><span>Parkta >%80</span><strong>${fmt(exp.above80Hours,1)} saat</strong></div><div class="mini-item"><span>Parkta >%90</span><strong>${fmt(exp.above90Hours,1)} saat</strong></div><div class="mini-item"><span>Sınıflandırılamayan aralık</span><strong>${fmt(exp.unknownHours,1)} saat</strong></div><div class="mini-item"><span>72 saati aşan veri boşluğu</span><strong>${fmt(exp.ignoredHours,1)} saat</strong></div><div class="mini-item"><span>Veri güveni</span><strong><span class="badge ${exp.cls}">${exp.confidence}</span></strong></div></div><p class="muted">CalSI için yalnızca başlangıcı ve bitişi gözlemlenmiş, kilometresi değişmeyen park aralıkları kullanılır. Sürüş ve şarj süreleri ayrıca raporlanır. Yetersiz veri varsa şarj-SOC penceresi yaklaşık gösterge olarak kullanılır. Bu süreler BMS ölçümü değildir.</p>`;
  const snaps=[...(db.socSnapshots||[])].sort((a,b)=>String(b.date).localeCompare(String(a.date))).slice(0,8);
  byId('socSnapshotList').innerHTML=snaps.length?`<div class="mini-list">${snaps.map(x=>`<div class="mini-item"><span>${fmtDate(x.date)} · ${escapeHtml({drive_start:'Sürüş başlangıcı',drive_end:'Sürüş bitişi',drive_end_unpaired:'Sürüş bitişi (başlangıç yok)',observation:'Durum gözlemi'}[x.kind]||'Durum gözlemi')}${x.odo!=null?' · '+fmt(x.odo,0)+' km':''}</span><strong>%${fmt(x.soc,0)} <button class="link-btn tiny" onclick="deleteSocSnapshot('${x.id}')">Sil</button></strong></div>`).join('')}</div>`:'<div class="empty">Henüz zaman damgalı SOC noktası yok.</div>';
  const sessions=[...db.driveSessions].sort((a,b)=>String(b.endAt||b.startAt).localeCompare(String(a.endAt||a.startAt))).slice(0,10);
  byId('driveSessionList').innerHTML=sessions.length?`<div class="mini-list">${sessions.map(x=>`<div class="mini-item vertical"><strong>${fmtDate(x.endAt)} · ${x.complete?'Tam sürüş':'Başlangıcı bilinmeyen bitiş'}</strong><span>${x.complete?fmt(x.distance,1)+' km · %'+fmt(x.startSoc,0)+' → %'+fmt(x.endSoc,0):fmt(x.endOdo,0)+' km · %'+fmt(x.endSoc,0)}${x.consumption!=null?' · '+fmt(x.consumption,1)+' kWh/100 km':''} <button class="link-btn tiny" onclick="deleteDriveSession('${x.id}')">Sil</button></span></div>`).join('')}</div>`:'<div class="empty">Henüz sürüş bitiş kaydı yok.</div>';

  const notes=[];if(r.cycle?.score!=null&&r.calendar?.score!=null){notes.push(r.cycle.score>r.calendar.score?'Son dönemde cycle/charge maruziyeti calendar maruziyetinden daha baskın.':'Son dönemde calendar maruziyeti cycle/charge maruziyeti kadar veya daha baskın.');}
  if(e.fast2Share!=null&&e.fast2Share>10)notes.push(`Şarj enerjisinin %${fmt(e.fast2Share,1)}'i 2C üzeri oturumlarda gerçekleşmiş.`);
  if(exp.above90Share!=null&&exp.above90Share>10)notes.push(`Kapsanan SOC×zamanın %${fmt(exp.above90Share,1)}'i %90 üzerinde.`);
  if(e.thermalHigh>0)notes.push(`${fmt(e.thermalHigh,1)} kWh şarj enerjisi yüksek termal-risk proxy'si olan oturumlarda kaydedilmiş.`);
  if(!notes.length)notes.push('Mevcut kayıtlarda belirgin yüksek-stres sinyali görünmüyor; veri kapsamı arttıkça yorum güçlenecek.');
  byId('stressInterpretation').innerHTML=`<div class="advice-box">${notes.map(x=>`<div>• ${x}</div>`).join('')}</div><p class="muted">BSI/CSI/CalSI kapasite kaybını yüzde olarak tahmin etmez; maruziyetleri görünür kılar.</p>`;
}

function renderAnalytics(){
  const c=ownerCharges(),t=db.trips,s=db.sohTests,cons=latestConsumptionSnapshot(),cost100=costPer100Metrics(),acd=acDcStats(c),life=lifetimeExposureMetrics();
  const totalCost=sum(c.map(x=>x.cost)),totalEnergy=sum(c.map(chargeEnergyValue)),socKnown=c.filter(hasSocPair),full=socKnown.filter(x=>chargeCompliance(x).full).length;
  const rateSummary=chargeHistoryCRateMetrics(c);
  const cards=[['Sahiplik Mesafesi',ownershipKm()!=null?fmt(ownershipKm(),0)+' km':'—'],['Son Şarjdan Beri',cons?fmt(cons.sinceCharge,1)+' kWh/100 km':'—'],['100 km Tüketim',cost100.consumption!=null?fmt(cost100.consumption,1)+' kWh/100 km':'—'],['100 km Maliyet',cost100.costPer100!=null?fmt(cost100.costPer100,2)+' ₺/100 km':'—'],['Toplam Şarj Enerjisi',fmt(totalEnergy,1)+' kWh'],['Toplam Şarj Maliyeti',fmt(totalCost,0)+' ₺'],['Ort. Enerji Maliyeti',cost100.avgPrice!=null?fmt(cost100.avgPrice,2)+' ₺/kWh':'—'],['DC Enerji Payı',acd.dcShare!=null?fmt(acd.dcShare,1)+'%':'—'],['Tam Koruma Bandı',socKnown.length?fmt(full/socKnown.length*100,0)+'%':'—'],['En Yüksek Şarj Ortalaması (C-rate)',rateSummary.maxAverage?fmt(rateSummary.maxAverage.rate,2)+'C':'—',chargeCRateSessionDetail(rateSummary.maxAverage)],['En Yüksek Anlık Şarj Hızı (C-rate)',rateSummary.maxPeak?fmt(rateSummary.maxPeak.rate,2)+'C':'—',chargeCRateSessionDetail(rateSummary.maxPeak,{peak:true})],['Enerji Ağırlıklı Ortalama C-rate',rateSummary.weightedAverage!=null?fmt(rateSummary.weightedAverage,2)+'C':'—',weightedCRateDetail(rateSummary)]];
  byId('analyticsCards').innerHTML=cards.map(x=>`<div class="metric"><div class="label">${x[0]}</div><div class="value">${x[1]}</div>${x[2]?`<div class="sub">${x[2]}</div>`:''}</div>`).join('');
  renderBars('monthlyConsumption',monthlyAvg(t,'consumption'),' kWh/100');renderBars('monthlyCharging',monthlySum(c,'energy'),' kWh');
  const trend=[...db.consumptionSnapshots].sort((a,b)=>String(b.date).localeCompare(String(a.date))).slice(0,12);
  byId('consumptionTrend').innerHTML=trend.length?`<div class="mini-list">${trend.map(x=>`<div class="mini-item"><span>${fmtDate(x.date)} · ${fmt(x.odo,0)} km</span><strong>${fmt(x.sinceCharge,1)} / ${fmt(x.total,1)} kWh/100</strong></div>`).join('')}</div><p class="muted">Gösterim: Son şarjdan beri / sahiplik dönemi toplam ortalama.</p>`:'<div class="empty">Tüketim sayaç kaydı ekleyin.</div>';
  const detailedAvg=weightedTripConsumption();
  byId('ownershipConsumption').innerHTML=`<div class="mini-list"><div class="mini-item"><span>Başlangıç</span><strong>${fmt(db.settings.ownershipStartOdo,0)} km · %${db.settings.ownershipStartSoc??'-'}</strong></div><div class="mini-item"><span>Güncel</span><strong>${fmt(latestOdo(),0)} km · %${db.settings.currentSoc??'-'}</strong></div><div class="mini-item"><span>Mesafe</span><strong>${ownershipKm()!=null?fmt(ownershipKm(),0)+' km':'-'}</strong></div><div class="mini-item"><span>Son kaydedilen toplam ortalama</span><strong>${cons?fmt(cons.total,1)+' kWh/100':'-'}</strong></div><div class="mini-item"><span>Ayrıntılı sürüşlerden ağırlıklı ortalama</span><strong>${detailedAvg!=null?fmt(detailedAvg,1)+' kWh/100':'-'}</strong></div></div>`;
  const ratios=socKnown.map(x=>chargeCompliance(x).ratio*100),above=sum(socKnown.map(x=>chargeCompliance(x).above)),below=sum(socKnown.map(x=>chargeCompliance(x).below));
  byId('complianceDetail').innerHTML=c.length?`<div class="mini-list"><div class="mini-item"><span>SOC verisi olan oturum</span><strong>${socKnown.length}/${c.length}</strong></div><div class="mini-item"><span>Ortalama bant içi şarj payı</span><strong>${socKnown.length?fmt(avg(ratios),1)+'%':'—'}</strong></div><div class="mini-item"><span>Toplam %80 üstü SOC puanı</span><strong>${socKnown.length?fmt(above,0):'—'}</strong></div><div class="mini-item"><span>Toplam %20 altı başlangıç puanı</span><strong>${socKnown.length?fmt(below,0):'—'}</strong></div></div><p class="muted">Alt sınır “şarj etmek için %20'yi bekle” anlamına gelmez; shallow cycling desteklenir.</p>`:'<div class="empty">Veri yok.</div>';
  if(s.length){const ordered=[...s].sort((a,b)=>String(a.date).localeCompare(String(b.date)));byId('sohTrend').innerHTML=`<div class="mini-list">${ordered.map(x=>`<div class="mini-item"><span>${fmtDate(x.date)}${x.odo?' · '+fmt(x.odo,0)+' km':''}</span><strong>${fmt(x.soh,1)}%</strong></div>`).join('')}</div>`}else byId('sohTrend').innerHTML='<div class="empty">SOH testi ekleyin.</div>';
  const rb=life.socTime;
  byId('balanceAnalysis').innerHTML=c.length?`<div class="mini-list"><div class="mini-item"><span>AC enerji</span><strong>${fmt(acd.ac,1)} kWh</strong></div><div class="mini-item"><span>DC enerji</span><strong>${fmt(acd.dc,1)} kWh · ${acd.dcShare!=null?'%'+fmt(acd.dcShare,1):'—'}</strong></div><div class="mini-item"><span>≤0,5C enerji</span><strong>${fmt(acd.bands['≤0,5C'],1)} kWh</strong></div><div class="mini-item"><span>0,5–1C enerji</span><strong>${fmt(acd.bands['0,5–1C'],1)} kWh</strong></div><div class="mini-item"><span>1–2C enerji</span><strong>${fmt(acd.bands['1–2C'],1)} kWh</strong></div><div class="mini-item"><span>>2C enerji</span><strong>${fmt((acd.bands['2–4C']||0)+(acd.bands['≥4C']||0),1)} kWh</strong></div><div class="mini-item"><span>SOC×zaman >80%</span><strong>${rb.coveredHours?fmt(rb.above80Hours,1)+' saat':'—'}</strong></div></div><p class="muted">AC/DC oranı yalnızca istatistiktir; sağlık motoru C-rate ve termal bağlam kullanır.</p>`:'<div class="empty">Veri yok.</div>';
  const exp={'≤0,5C':0,'0,5–1C':0,'1–2C':0,'2–4C':0,'≥4C':0};for(const x of c){const r=chargeCRate(x);if(r==null)continue;if(r<=.5)exp['≤0,5C']++;else if(r<=1)exp['0,5–1C']++;else if(r<=2)exp['1–2C']++;else if(r<4)exp['2–4C']++;else exp['≥4C']++;}renderBars('crateExposure',exp,' kayıt');
}

function monthKey(d){return String(d||'').slice(0,7)}
function monthlySum(arr,key){const m={};arr.forEach(x=>{const k=monthKey(x.date);if(k)m[k]=(m[k]||0)+(Number(x[key])||0)});return m}
function monthlyAvg(arr,key){const m={};arr.forEach(x=>{const k=monthKey(x.date);if(!k)return;(m[k]??=[]).push(Number(x[key])||0)});return Object.fromEntries(Object.entries(m).map(([k,v])=>[k,avg(v)]))}

function renderProviders(){
  const current=D.chargeProvider?.value||'';
  const providers=[...db.providers].sort((a,b)=>a.localeCompare(b,'tr'));
  const options=['<option value="">Sağlayıcı seçin…</option>',...providers.map(x=>`<option value="${escapeHtml(x)}">${escapeHtml(x)}</option>`)];
  if(current&&!providers.includes(current))options.push(`<option value="${escapeHtml(current)}">${escapeHtml(current)} (kayıtlı)</option>`);
  D.chargeProvider.innerHTML=options.join('');
  if(current)D.chargeProvider.value=current;
  D.providerManager.innerHTML=db.providers.length?db.providers.map((x,i)=>`<span class="provider-chip">${escapeHtml(x)}<button type="button" aria-label="${escapeHtml(x)} sağlayıcısını kaldır" onclick="removeProvider(${i})">×</button></span>`).join(''):'<div class="empty">Sağlayıcı listesi boş.</div>';
}
function renderSettings(){
  const s=db.settings;
  D.vehicleName.value=s.vehicleName;D.batteryChemistry.value=s.batteryChemistry;D.ownershipStartOdo.value=s.ownershipStartOdo??32356;D.ownershipStartSoc.value=s.ownershipStartSoc??59;D.ownershipStartDate.value=s.ownershipStartDate||'';D.trackingStartOdo.value=s.trackingStartOdo??33537;D.currentOdo.value=s.currentOdo??33537;D.currentSoc.value=s.currentSoc??76;D.referenceCapacity.value=s.referenceCapacity;D.preferredMinSoc.value=s.preferredMinSoc;D.preferredMaxSoc.value=s.preferredMaxSoc;D.stressWindow.value=s.stressWindow??12;D.plannerReserveDefault.value=s.plannerReserveSoc??15;D.plannerMarginDefault.value=s.plannerMarginPct??10;D.mgmCity.value=s.mgmCity||'ANKARA';if(!D.crateCapacity.matches(':focus'))D.crateCapacity.value=s.referenceCapacity;if(D.plannerReserveSoc&&!D.plannerReserveSoc.matches(':focus'))D.plannerReserveSoc.value=s.plannerReserveSoc??15;if(D.plannerMargin&&!D.plannerMargin.matches(':focus'))D.plannerMargin.value=s.plannerMarginPct??10;renderProviders();
}
function renderAll(){renderDashboard();renderCharges();renderConsumptionSnapshots();renderTrips();renderSoh();renderAnalytics();renderStress();renderSettings();updateSohPreview();updateChargePreview();renderCrate();renderPlanner()}

D.chargeForm.addEventListener('submit',e=>{
  e.preventDefault();const id=D.chargeId.value||uid(),odoUnknown=!!D.chargeOdoUnknown.checked;
  const startSoc=D.chargeStartSoc.value===''?null:+D.chargeStartSoc.value,endSoc=D.chargeEndSoc.value===''?null:+D.chargeEndSoc.value;
  const item={id,date:D.chargeDate.value,odo:odoUnknown?null:(D.chargeOdo.value?+D.chargeOdo.value:null),startSoc,endSoc,type:D.chargeType.value,scope:D.chargeScope.value||'owner_current',power:+D.chargePower.value||null,energy:+D.chargeEnergy.value||null,durationMin:+D.chargeDuration.value||null,provider:D.chargeProvider.value.trim(),cost:D.chargeCost.value===''?null:+D.chargeCost.value,
    temp:D.chargeTemp.value===''?null:+D.chargeTemp.value,tempSource:D.chargeTempSource.value||'manual',batteryTemp:D.chargeBatteryTemp.value===''?null:+D.chargeBatteryTemp.value,parking:D.chargeParking.value||'unknown',parkHours:D.chargeParkHours.value===''?null:+D.chargeParkHours.value,preDriveMin:D.chargePreDriveMin.value===''?null:+D.chargePreDriveMin.value,weatherObservedAt:D.chargeWeatherStatus?.dataset?.observedAt||'',
    location:D.chargeLocation.value.trim(),notes:D.chargeNotes.value.trim()};
  if(hasSocValue(item.startSoc)&&hasSocValue(item.endSoc)&&item.endSoc<=item.startSoc)return alert('Bitiş SOC, başlangıç SOC değerinden büyük olmalı.');
  if(item.scope==='owner_current'&&((item.odo&&item.odo<Number(db.settings.trackingStartOdo))||odoUnknown))item.scope='owner_history';
  const i=db.charges.findIndex(x=>x.id===id);i>=0?db.charges[i]=item:db.charges.push(item);
  if(item.scope==='owner_current'){
    const endMs=chargeEndMs(item),at=endMs?new Date(endMs).toISOString():item.date;
    updateCurrentState(item.odo,item.endSoc,at);
  }
  save();resetCharge();
});
function resetCharge(){
  D.chargeForm.reset();D.chargeId.value='';D.chargeType.value='AC';D.chargeScope.value='owner_current';D.chargeTempSource.value='manual';D.chargeParking.value='unknown';D.chargeOdo.disabled=false;D.chargeOdo.placeholder='Örn. 33537';if(D.chargeWeatherStatus){D.chargeWeatherStatus.textContent='Koordinat kaydedilmez.';D.chargeWeatherStatus.dataset.observedAt='';}setDefaultDateTimes();updateChargePreview();
}D.chargeReset.onclick=resetCharge;
window.editCharge=id=>{
  const x=db.charges.find(v=>v.id===id);if(!x)return;showTab('charges');D.chargeOdoUnknown.checked=(x.odo==null&&x.scope==='owner_history');D.chargeOdo.disabled=D.chargeOdoUnknown.checked;
  if(x.provider&&![...D.chargeProvider.options].some(o=>o.value===x.provider))D.chargeProvider.add(new Option(`${x.provider} (kayıtlı)`,x.provider));
  for(const [el,val] of [[D.chargeId,x.id],[D.chargeDate,x.date],[D.chargeOdo,x.odo],[D.chargeStartSoc,x.startSoc],[D.chargeEndSoc,x.endSoc],[D.chargeType,x.type],[D.chargeScope,x.scope||'owner_current'],[D.chargePower,x.power],[D.chargeEnergy,x.energy],[D.chargeDuration,x.durationMin],[D.chargeProvider,x.provider],[D.chargeCost,x.cost],[D.chargeTemp,x.temp],[D.chargeTempSource,x.tempSource||'manual'],[D.chargeBatteryTemp,x.batteryTemp],[D.chargeParking,x.parking||'unknown'],[D.chargeParkHours,x.parkHours],[D.chargePreDriveMin,x.preDriveMin],[D.chargeLocation,x.location],[D.chargeNotes,x.notes]])el.value=val??'';
  if(D.chargeWeatherStatus){D.chargeWeatherStatus.dataset.observedAt=x.weatherObservedAt||'';D.chargeWeatherStatus.textContent=x.tempSource==='open-meteo'?'Otomatik hava verisi kaydı':'Koordinat kaydedilmez.';}updateChargePreview();window.scrollTo({top:120,behavior:'smooth'});
};
window.deleteCharge=id=>{if(confirm('Bu şarj kaydı silinsin mi?')){db.charges=db.charges.filter(x=>x.id!==id);save()}};
['chargePower','chargeEnergy','chargeDuration','chargeStartSoc','chargeEndSoc','chargeTemp','chargeBatteryTemp','chargeParkHours','chargePreDriveMin','chargeType','chargeParking'].forEach(id=>byId(id)?.addEventListener('input',updateChargePreview));
D.chargeOdoUnknown.addEventListener('change',()=>{D.chargeOdo.disabled=D.chargeOdoUnknown.checked;if(D.chargeOdoUnknown.checked){D.chargeOdo.value='';if(D.chargeScope.value==='owner_current')D.chargeScope.value='owner_history';}D.chargeOdo.placeholder=D.chargeOdoUnknown.checked?'Geçmiş kayıt - bilinmiyor':'Örn. 33537';});
D.chargeTemp?.addEventListener('input',()=>{if(D.chargeTempSource)D.chargeTempSource.value='manual';if(D.chargeWeatherStatus){D.chargeWeatherStatus.dataset.observedAt='';D.chargeWeatherStatus.textContent='Manuel ortam sıcaklığı.';}});
D.chargeWeatherBtn?.addEventListener('click',async()=>{
  if(!window.T10XWeather)return alert('Hava modülü yüklenemedi.');
  D.chargeWeatherBtn.disabled=true;D.chargeWeatherStatus.textContent='Konum izni / hava verisi bekleniyor…';
  try{const w=await window.T10XWeather.currentFromLocation();D.chargeTemp.value=w.temperature.toFixed(1);D.chargeTempSource.value='open-meteo';D.chargeWeatherStatus.textContent=`${w.sourceLabel} · ${fmt(w.temperature,1)} °C · ${fmtDate(w.observedAt)}`;D.chargeWeatherStatus.dataset.observedAt=w.observedAt||new Date().toISOString();updateChargePreview();}
  catch(err){D.chargeWeatherStatus.textContent=`Otomatik hava verisi alınamadı: ${err.message}`;}
  finally{D.chargeWeatherBtn.disabled=false;}
});


D.consumptionForm.addEventListener('submit',e=>{
  e.preventDefault();const id=D.consumptionId.value||uid();
  const item={id,date:D.consumptionDate.value,odo:+D.consumptionOdo.value,sinceCharge:+D.consumptionSinceCharge.value,total:+D.consumptionTotal.value,notes:D.consumptionNotes.value.trim()};
  if(!(item.odo>0&&item.sinceCharge>0&&item.total>0))return alert('Kilometre ve iki tüketim değerini de girin.');
  const i=db.consumptionSnapshots.findIndex(x=>x.id===id);i>=0?db.consumptionSnapshots[i]=item:db.consumptionSnapshots.push(item);updateCurrentState(item.odo);save();resetConsumption();
});
function resetConsumption(){D.consumptionForm.reset();D.consumptionId.value='';setDefaultDateTimes();D.consumptionOdo.value=db.settings.currentOdo||latestOdo()||''}D.consumptionReset.onclick=resetConsumption;
window.editConsumption=id=>{const x=db.consumptionSnapshots.find(v=>v.id===id);if(!x)return;showTab('trips');for(const [el,val] of [[D.consumptionId,x.id],[D.consumptionDate,x.date],[D.consumptionOdo,x.odo],[D.consumptionSinceCharge,x.sinceCharge],[D.consumptionTotal,x.total],[D.consumptionNotes,x.notes]])el.value=val??'';window.scrollTo({top:120,behavior:'smooth'})};
window.deleteConsumption=id=>{if(confirm('Bu tüketim sayaç kaydı silinsin mi?')){db.consumptionSnapshots=db.consumptionSnapshots.filter(x=>x.id!==id);save()}};

D.tripForm.addEventListener('submit',e=>{e.preventDefault();const id=D.tripId.value||uid();const item={id,date:D.tripDate.value,distance:+D.tripDistance.value,consumption:+D.tripConsumption.value,startSoc:D.tripStartSoc.value===''?'':+D.tripStartSoc.value,endSoc:D.tripEndSoc.value===''?'':+D.tripEndSoc.value,temp:D.tripTemp.value===''?null:+D.tripTemp.value,route:D.tripRoute.value.trim(),notes:D.tripNotes.value.trim()};const i=db.trips.findIndex(x=>x.id===id);i>=0?db.trips[i]=item:db.trips.push(item);save();resetTrip()});
function resetTrip(){D.tripForm.reset();D.tripId.value='';D.tripDate.value=new Date().toISOString().slice(0,10)}D.tripReset.onclick=resetTrip;
window.editTrip=id=>{const x=db.trips.find(v=>v.id===id);if(!x)return;showTab('trips');for(const [el,val] of [[D.tripId,x.id],[D.tripDate,x.date],[D.tripDistance,x.distance],[D.tripConsumption,x.consumption],[D.tripStartSoc,x.startSoc],[D.tripEndSoc,x.endSoc],[D.tripTemp,x.temp],[D.tripRoute,x.route],[D.tripNotes,x.notes]])el.value=val??'';window.scrollTo({top:120,behavior:'smooth'})};
window.deleteTrip=id=>{if(confirm('Bu sürüş kaydı silinsin mi?')){db.trips=db.trips.filter(x=>x.id!==id);save()}};

['sohStartSoc','sohEndSoc','sohEnergy','sohLoss','sohTemp','sohType'].forEach(id=>byId(id).addEventListener('input',updateSohPreview));
D.sohType.onchange=()=>{D.sohLoss.value=D.sohType.value==='AC'?'8':'4';updateSohPreview()};
D.sohForm.addEventListener('submit',e=>{e.preventDefault();const r=calcSoh();if(!r)return alert('SOH hesabı için geçerli SOC ve enerji değerleri girin.');if(r.soh<50||r.soh>120){if(!confirm(`Hesaplanan SOH ${fmt(r.soh,1)}%. Değer olağandışı; yine de kaydedilsin mi?`))return}db.sohTests.push({id:uid(),date:D.sohDate.value,startSoc:+D.sohStartSoc.value,endSoc:+D.sohEndSoc.value,meterEnergy:+D.sohEnergy.value,type:D.sohType.value,loss:+D.sohLoss.value,temp:D.sohTemp.value===''?null:+D.sohTemp.value,odo:+D.sohOdo.value||null,notes:D.sohNotes.value.trim(),netEnergy:r.net,estimatedCapacity:r.cap,soh:r.soh,qualityScore:r.q.score});save();D.sohForm.reset();D.sohDate.value=new Date().toISOString().slice(0,10);D.sohType.value='AC';D.sohLoss.value='8';updateSohPreview()});
window.deleteSoh=id=>{if(confirm('Bu SOH testi silinsin mi?')){db.sohTests=db.sohTests.filter(x=>x.id!==id);save()}};

['crateCapacity','cratePower','crateStartSoc','crateEndSoc','crateTemp'].forEach(id=>byId(id).addEventListener('input',renderCrate));
document.querySelectorAll('[data-power]').forEach(b=>b.onclick=()=>{D.cratePower.value=b.dataset.power;renderCrate()});


D.plannerForm?.addEventListener('submit',e=>{e.preventDefault();renderPlanner();});
['plannerCurrentSoc','plannerDistance','plannerConsumption','plannerReserveSoc','plannerMargin','plannerDeparture','plannerPower','plannerAmbientTemp','plannerParking','plannerParkHours','plannerPreDriveMin'].forEach(id=>byId(id)?.addEventListener('input',renderPlanner));
D.plannerChargeType?.addEventListener('change',()=>{D.plannerPower.value=D.plannerChargeType.value==='AC'?'11':'50';renderPlanner();});
D.plannerAmbientTemp?.addEventListener('input',()=>{plannerForecast=null;plannerWeatherCurrent=null;if(D.plannerWeatherStatus)D.plannerWeatherStatus.textContent='Manuel ortam sıcaklığı kullanılıyor; önceki otomatik tahmin temizlendi.';renderPlanner();});
D.plannerWeatherBtn?.addEventListener('click',async()=>{
  if(!window.T10XWeather)return alert('Hava modülü yüklenemedi.');
  D.plannerWeatherBtn.disabled=true;D.plannerWeatherStatus.textContent='Konum izni / saatlik tahmin bekleniyor…';
  try{
    const pos=await window.T10XWeather.position();
    const [cur,fc]=await Promise.all([window.T10XWeather.openMeteoCurrent(pos.lat,pos.lon),window.T10XWeather.openMeteoForecast(pos.lat,pos.lon,7)]);
    plannerWeatherCurrent=cur;plannerForecast=fc;D.plannerAmbientTemp.value=cur.temperature.toFixed(1);
    D.plannerWeatherStatus.textContent=`${cur.sourceLabel} · ${fmt(cur.temperature,1)} °C · saatlik tahmin yüklendi. Koordinat kaydedilmedi.`;
    renderPlanner();
  }catch(err){D.plannerWeatherStatus.textContent=`Hava verisi alınamadı: ${err.message}`;}
  finally{D.plannerWeatherBtn.disabled=false;}
});
window.deleteSocSnapshot=id=>{
  const snap=db.socSnapshots.find(x=>x.id===id);if(!snap)return;
  if(!confirm('Bu SOC noktası silinsin mi? Bağlı sürüş aralıkları geçersizleşebilir.'))return;
  if(snap.sessionId){
    db.driveSessions=db.driveSessions.filter(x=>x.id!==snap.sessionId);
    db.trips=db.trips.filter(x=>x.linkedDriveId!==snap.sessionId);
    db.socSnapshots=db.socSnapshots.filter(x=>x.sessionId!==snap.sessionId);
    if(db.activeDrive?.id===snap.sessionId)db.activeDrive=null;
  }else db.socSnapshots=db.socSnapshots.filter(x=>x.id!==id);
  save();
};

D.settingsForm.addEventListener('submit',e=>{
  e.preventDefault();
  const next={vehicleName:D.vehicleName.value.trim(),batteryChemistry:D.batteryChemistry.value.trim(),ownershipStartOdo:+D.ownershipStartOdo.value||0,ownershipStartSoc:+D.ownershipStartSoc.value,ownershipStartDate:D.ownershipStartDate.value||'',trackingStartOdo:+D.trackingStartOdo.value||0,currentOdo:+D.currentOdo.value||0,currentSoc:+D.currentSoc.value,currentSocUpdatedAt:db.settings.currentSocUpdatedAt||'',referenceCapacity:+D.referenceCapacity.value,preferredMinSoc:+D.preferredMinSoc.value,preferredMaxSoc:+D.preferredMaxSoc.value,stressWindow:+D.stressWindow.value,plannerReserveSoc:+D.plannerReserveDefault.value,plannerMarginPct:+D.plannerMarginDefault.value,mgmCity:(D.mgmCity.value.trim()||'ANKARA').toLocaleUpperCase('tr-TR')};
  if(next.preferredMaxSoc<=next.preferredMinSoc)return alert('Üst SOC sınırı alt sınırdan büyük olmalı.');
  if(!(next.stressWindow>=3&&next.stressWindow<=100))return alert('Stres analizi penceresi 3–100 şarj arasında olmalı.');
  if(!(next.plannerReserveSoc>=0&&next.plannerReserveSoc<=40&&next.plannerMarginPct>=0&&next.plannerMarginPct<=50))return alert('Planlayıcı rezerv/güvenlik payı değerlerini kontrol edin.');
  if(!(next.ownershipStartSoc>=0&&next.ownershipStartSoc<=100&&next.currentSoc>=0&&next.currentSoc<=100))return alert('SOC değerleri %0–100 arasında olmalı.');
  db.settings=next;D.crateCapacity.value=next.referenceCapacity;if(D.plannerReserveSoc)D.plannerReserveSoc.value=next.plannerReserveSoc;if(D.plannerMargin)D.plannerMargin.value=next.plannerMarginPct;save();alert('Ayarlar kaydedildi.');
});
function quickReading(){
  const odo=Number(D.quickCurrentOdo.value),soc=Number(D.quickCurrentSoc.value);
  if(D.quickCurrentOdo.value===''||D.quickCurrentSoc.value===''||!(odo>0&&soc>=0&&soc<=100)){
    alert('Lütfen geçerli kilometre ve SOC girin.');return null;
  }
  if(Number(db.settings.currentOdo)>0&&odo<Number(db.settings.currentOdo)){
    alert('Kilometre, mevcut kayıttan düşük olamaz. Geçmiş bir veriyi düzeltmek için ilgili kaydı düzenleyin.');return null;
  }
  return{odo,soc};
}
function recordCurrent(odo,soc,kind='observation',extra={}){
  const now=new Date().toISOString();
  db.settings.currentOdo=odo;db.settings.currentSoc=soc;db.settings.currentSocUpdatedAt=now;
  db.socSnapshots??=[];
  db.socSnapshots.push({id:uid(),date:now,odo,soc,kind,source:'quick',sourceLabel:{drive_start:'Sürüş başlangıcı',drive_end:'Sürüş bitişi',drive_end_unpaired:'Sürüş bitişi (başlangıç yok)'}[kind]||'Güncel araç durumu',...extra});
  return now;
}
D.quickStatusForm.addEventListener('submit',e=>{
  e.preventDefault();const v=quickReading();if(!v)return;
  if(db.activeDrive&&!confirm('Devam eden sürüş sırasında manuel durum kaydı, sürüş süresini parçalara ayırır. Devam edilsin mi?'))return;
  recordCurrent(v.odo,v.soc);save();
});
D.quickDriveStartBtn.addEventListener('click',()=>{
  if(db.activeDrive)return alert('Devam eden sürüşü önce bitirin.');
  const v=quickReading();if(!v)return;
  const sessionId=uid(),startAt=recordCurrent(v.odo,v.soc,'drive_start',{sessionId});
  db.activeDrive={id:sessionId,startAt,startOdo:v.odo,startSoc:v.soc};
  save();
});
D.quickDriveEndBtn.addEventListener('click',()=>{
  const v=quickReading();if(!v)return;
  const start=db.activeDrive;
  const consumption=D.quickDriveConsumption.value===''?null:Number(D.quickDriveConsumption.value);
  if(consumption!==null&&(!(consumption>0)||consumption>100))return alert('Tüketim değerini kontrol edin (kWh/100 km).');
  if(start){
    if(v.odo<start.startOdo)return alert('Bitiş km, sürüş başlangıcından küçük olamaz.');
    const minutes=(Date.now()-new Date(start.startAt).getTime())/60000;
    if(minutes<0.1)return alert('Sürüş başlangıcı ile bitişi arasında yeterli süre yok.');
    if(minutes>72*60&&!confirm('Sürüş 72 saati aşmış görünüyor. Kaydı yine de tamamlamak ister misiniz?'))return;
    if(v.soc>start.startSoc+3&&!confirm('Bitiş SOC, başlangıçtan belirgin yüksek. Değerler doğru mu?'))return;
  }
  const newSessionId=start?.id||uid();
  const endAt=recordCurrent(v.odo,v.soc,start?'drive_end':'drive_end_unpaired',{sessionId:newSessionId});
  const drive={id:newSessionId,startAt:start?.startAt||null,endAt,startOdo:start?.startOdo??null,endOdo:v.odo,startSoc:start?.startSoc??null,endSoc:v.soc,distance:start?Math.max(0,v.odo-start.startOdo):null,consumption,complete:!!start};
  db.driveSessions.push(drive);
  if(start&&drive.distance>0&&consumption!=null){
    // Trip consumption is a trip metric, NOT the vehicle's "since last charge" counter.
    const ended=new Date(endAt),tripDay=new Date(ended.getTime()-ended.getTimezoneOffset()*60000).toISOString().slice(0,10);
    db.trips.push({id:uid(),date:tripDay,distance:drive.distance,consumption,startSoc:start.startSoc,endSoc:v.soc,temp:null,route:'Dashboard · Sürüş kaydı',notes:'Sürüş/park hızlı girişi',linkedDriveId:drive.id});
  }
  db.activeDrive=null;D.quickDriveConsumption.value='';save();
  if(!start)alert('Sürüş bitişi ve park başlangıcı kaydedildi. Başlangıç bilinmediğinden bu yolculuğun tüketimi/mesafesi hesaplanmadı.');
});
window.deleteDriveSession=id=>{
  if(!confirm('Bu sürüş kaydı ve buna bağlı SOC/sürüş noktaları silinsin mi?'))return;
  db.driveSessions=db.driveSessions.filter(x=>x.id!==id);
  db.socSnapshots=db.socSnapshots.filter(x=>x.sessionId!==id);
  db.trips=db.trips.filter(x=>x.linkedDriveId!==id);
  save();
};

function addProvider(name){const n=String(name||'').trim();if(!n)return;if(!db.providers.some(x=>x.toLocaleLowerCase('tr-TR')===n.toLocaleLowerCase('tr-TR')))db.providers.push(n);db.providers.sort((a,b)=>a.localeCompare(b,'tr'));save()}
D.providerAddBtn.onclick=()=>{addProvider(D.providerNew.value);D.providerNew.value=''};
D.providerNew.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();D.providerAddBtn.click()}});
window.removeProvider=index=>{const name=db.providers[Number(index)];if(name&&confirm(`${name} sağlayıcı listesinden kaldırılsın mı?`)){db.providers.splice(Number(index),1);save()}};
D.providerResetBtn.onclick=()=>{if(confirm('Sağlayıcı listesi varsayılan listeye döndürülsün mü? Kendi ekledikleriniz kaldırılır.')){db.providers=[...DEFAULT_PROVIDERS];save()}};
D.clearAllBtn.onclick=()=>{if(confirm('Tüm kayıtlar kalıcı olarak silinecek. Emin misiniz?')){db=structuredClone(defaults);save()}};

function showTab(id){document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active',x.dataset.tab===id));document.querySelectorAll('.panel').forEach(x=>x.classList.toggle('active',x.id===id));if(id==='crate')renderCrate();if(id==='planner')renderPlanner()}
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>showTab(b.dataset.tab));document.querySelectorAll('[data-goto]').forEach(b=>b.onclick=()=>showTab(b.dataset.goto));

function download(name,text,type='text/plain'){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;a.click();URL.revokeObjectURL(a.href)}
D.exportJsonBtn.onclick=()=>download(`t10x_batarya_yedek_${new Date().toISOString().slice(0,10)}.json`,JSON.stringify(db,null,2),'application/json');
D.importJsonInput.onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const obj=JSON.parse(await f.text());if(!obj.settings||!Array.isArray(obj.charges)||!Array.isArray(obj.trips)||!Array.isArray(obj.sohTests))throw new Error();if(confirm('Mevcut veriler içe aktarılan yedekle değiştirilsin mi?')){db=migrate(obj);save()}}catch{alert('Geçersiz yedek dosyası.')}e.target.value=''};
function csvEscape(v){const s=String(v??'');return '"'+s.replaceAll('"','""')+'"'}
function exportCsv(name,headers,rows){const csv='\ufeff'+[headers,...rows].map(r=>r.map(csvEscape).join(';')).join('\n');download(name,csv,'text/csv;charset=utf-8')}
D.exportChargesCsv.onclick=()=>exportCsv('sarj_kayitlari.csv',['Tarih','Km','Baslangic SOC','Bitis SOC','Tur','Donem','Sure dk','Ortalama Guc kW','Maks Guc kW','Ortalama C-rate','Maks C-rate','Enerji kWh','Saglayici','Maliyet TL','Ortam Sicakligi','Sicaklik Kaynagi','Batarya Sicakligi','Park Ortami','Park Saati','Sarj Oncesi Surus dk','Konum','Not'],db.charges.map(x=>[x.date,x.odo,x.startSoc,x.endSoc,x.type,scopeLabel(x.scope),x.durationMin,chargeAveragePower(x),x.power,chargeAverageCRate(x),chargePeakCRate(x),x.energy,x.provider,x.cost,x.temp,x.tempSource,x.batteryTemp,x.parking,x.parkHours,x.preDriveMin,x.location,x.notes]));
D.exportConsumptionCsv.onclick=()=>exportCsv('tuketim_sayac_kayitlari.csv',['Tarih','Km','Son Sarjdan Beri kWh/100km','Sahiplik Toplam Ort kWh/100km','Not'],db.consumptionSnapshots.map(x=>[x.date,x.odo,x.sinceCharge,x.total,x.notes]));
D.exportTripsCsv.onclick=()=>exportCsv('surus_kayitlari.csv',['Tarih','Mesafe km','Tuketim kWh/100','Baslangic SOC','Bitis SOC','Sicaklik','Rota','Not'],db.trips.map(x=>[x.date,x.distance,x.consumption,x.startSoc,x.endSoc,x.temp,x.route,x.notes]));
D.exportDriveSessionsCsv.onclick=()=>exportCsv('surus_park_zaman_kayitlari.csv',['Baslangic','Bitis','Baslangic km','Bitis km','Baslangic SOC','Bitis SOC','Mesafe km','Tuketim kWh/100 km','Tam kayit'],db.driveSessions.map(x=>[x.startAt,x.endAt,x.startOdo,x.endOdo,x.startSoc,x.endSoc,x.distance,x.consumption,x.complete?'Evet':'Hayir']));

function setDefaultDateTimes(){const now=new Date();const local=new Date(now.getTime()-now.getTimezoneOffset()*60000).toISOString().slice(0,16);if(!D.chargeDate.value)D.chargeDate.value=local;if(!D.consumptionDate.value)D.consumptionDate.value=local;if(!D.tripDate.value)D.tripDate.value=now.toISOString().slice(0,10);if(!D.sohDate.value)D.sohDate.value=now.toISOString().slice(0,10);if(D.plannerDeparture&&!D.plannerDeparture.value){const dep=new Date(now);dep.setDate(dep.getDate()+1);dep.setHours(7,30,0,0);D.plannerDeparture.value=new Date(dep.getTime()-dep.getTimezoneOffset()*60000).toISOString().slice(0,16)}}
setDefaultDateTimes();if(!D.consumptionOdo.value)D.consumptionOdo.value=db.settings.currentOdo||'';renderAll();


// v0.9.1 - glossary search/filter
const glossarySearch = document.getElementById('glossarySearch');
const glossaryCount = document.getElementById('glossaryCount');
function updateGlossaryFilter(){
  if(!glossarySearch) return;
  const q=(glossarySearch.value||'').trim().toLocaleLowerCase('tr-TR');
  const items=[...document.querySelectorAll('.glossary-item')];
  let visible=0;
  items.forEach(item=>{
    const hay=((item.dataset.terms||'')+' '+item.textContent).toLocaleLowerCase('tr-TR');
    const show=!q||hay.includes(q);
    item.hidden=!show;
    if(show) visible++;
  });
  document.querySelectorAll('.glossary-group').forEach(group=>{
    const has=[...group.querySelectorAll('.glossary-item')].some(x=>!x.hidden);
    group.hidden=!has;
  });
  if(glossaryCount) glossaryCount.textContent=q ? `${visible} terim bulundu` : `${items.length} terim`;
}
if(glossarySearch){glossarySearch.addEventListener('input',updateGlossaryFilter);updateGlossaryFilter();}
