const STORAGE_KEY='t10xBatteryTracker_v9';
const LEGACY_KEYS=['t10xBatteryTracker_v8','t10xBatteryTracker_v6','t10xBatteryTracker_v5','t10xBatteryTracker_v4','t10xBatteryTracker_v3','t10xBatteryTracker_v2','t10xBatteryTracker_v1'];
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
  meta:{schemaVersion:9,updatedAt:''},
  settings:{
    vehicleName:'T10X Uzun Menzil',batteryChemistry:'NMC',ownershipStartOdo:32356,ownershipStartSoc:59,ownershipStartDate:'',trackingStartOdo:33537,currentOdo:33537,currentSoc:76,
    referenceCapacity:88.5,preferredMinSoc:20,preferredMaxSoc:80,
    targetDcShare:40,balanceWindow:10,stressWindow:12
  },
  providers:[...DEFAULT_PROVIDERS],
  charges:[],trips:[],consumptionSnapshots:[],sohTests:[]
};

let db=load();
const byId=id=>document.getElementById(id);
const domIds=[
  'chargeForm','chargeId','chargeDate','chargeOdo','chargeOdoUnknown','chargeStartSoc','chargeEndSoc','chargeType','chargeScope','chargePower','chargeEnergy','chargeDuration','chargeProvider','chargeCost','chargeTemp','chargeLocation','chargeNotes','chargeReset',
  'consumptionForm','consumptionId','consumptionDate','consumptionOdo','consumptionSinceCharge','consumptionTotal','consumptionNotes','consumptionReset',
  'tripForm','tripId','tripDate','tripDistance','tripConsumption','tripStartSoc','tripEndSoc','tripTemp','tripRoute','tripNotes','tripReset',
  'sohForm','sohDate','sohStartSoc','sohEndSoc','sohEnergy','sohType','sohLoss','sohTemp','sohOdo','sohNotes',
  'crateForm','crateCapacity','cratePower','crateStartSoc','crateEndSoc','crateTemp',
  'settingsForm','vehicleName','batteryChemistry','ownershipStartOdo','ownershipStartSoc','ownershipStartDate','trackingStartOdo','currentOdo','currentSoc','referenceCapacity','preferredMinSoc','preferredMaxSoc','targetDcShare','balanceWindow','stressWindow','clearAllBtn',
  'quickStatusForm','quickCurrentOdo','quickCurrentSoc','providerNew','providerAddBtn','providerResetBtn','providerManager',
  'exportJsonBtn','importJsonInput','exportChargesCsv','exportConsumptionCsv','exportTripsCsv'
];
const D=Object.fromEntries(domIds.map(id=>[id,byId(id)]));

function migrate(obj){
  const out={...structuredClone(defaults),...(obj||{})};
  out.meta={...structuredClone(defaults.meta),...(obj?.meta||{}),schemaVersion:9};
  out.settings={...structuredClone(defaults.settings),...(obj?.settings||{})};
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
function save(){db.meta={...(db.meta||{}),schemaVersion:9,updatedAt:new Date().toISOString()};persistLocal({emit:true})}

window.T10XApp={
  getData:()=>structuredClone(db),
  replaceData:(next,{emit=false}={})=>{db=migrate(next||{});persistLocal({emit});return structuredClone(db)},
  hasMeaningfulData:()=>Boolean(db.charges.length||db.trips.length||db.consumptionSnapshots.length||db.sohTests.length||db.meta?.updatedAt),
  storageKey:STORAGE_KEY,
  schemaVersion:9
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
function updateCurrentState(odo,soc=null){
  const n=Number(odo),current=Number(db.settings.currentOdo)||0;
  if(n>0&&n>=current)db.settings.currentOdo=n;
  if(soc!==null&&soc!==''&&Number.isFinite(Number(soc))&&n>=current)db.settings.currentSoc=clamp(Number(soc),0,100);
}
function clamp(n,min=0,max=100){return Math.max(min,Math.min(max,n))}
function chargeStressScore(c){
  const avgR=chargeAverageCRate(c),peakR=chargePeakCRate(c),r=avgR??peakR;let score;
  if(r==null)score=c.type==='AC'?100:75;
  else if(r<=0.5)score=100;else if(r<=1)score=96;else if(r<=2)score=86;else if(r<4)score=62;else score=30;
  // Ortalama C-rate seans yükünü temsil eder. Kısa tepe değerler ayrı, sınırlı bir ek ceza olarak tutulur.
  if(avgR!=null&&peakR!=null){if(peakR>=4)score-=10;else if(peakR>2)score-=4;}
  const hasTemp=c.temp!==null&&c.temp!==''&&c.temp!==undefined;const t=Number(c.temp);
  if(hasTemp&&Number.isFinite(t)&&t<=10&&r>1)score-=15;
  if(hasTemp&&Number.isFinite(t)&&t>=35&&hasSocValue(c.endSoc)&&Number(c.endSoc)>80)score-=15;
  if(hasSocValue(c.endSoc)&&Number(c.endSoc)>90)score-=12;else if(hasSocValue(c.endSoc)&&Number(c.endSoc)>80)score-=5;
  return clamp(score);
}
function batteryHealthScore(){
  const c=ownerCharges(),soh=referenceSoh();
  const components=[];
  if(soh?.soh!=null)components.push({key:'soh',label:'SOH',score:clamp(soh.soh),weight:45,detail:`${fmt(soh.soh,1)}% · ${soh.mode}`});
  if(c.length){
    const energies=c.map(chargeEnergyValue),total=sum(energies);
    const socCharges=c.filter(hasSocPair);
    if(socCharges.length){
      const socEnergies=socCharges.map(chargeEnergyValue),socTotal=sum(socEnergies);
      const soc=socTotal?sum(socCharges.map((x,i)=>chargeCompliance(x).ratio*socEnergies[i]))/socTotal*100:avg(socCharges.map(x=>chargeCompliance(x).ratio))*100;
      components.push({key:'soc',label:'20–80 SOC disiplini',score:clamp(soc),weight:25,detail:`Enerji ağırlıklı uyum %${fmt(soc,1)} · ${socCharges.length}/${c.length} kayıtta SOC var`});
    }
    const stress=total?sum(c.map((x,i)=>chargeStressScore(x)*energies[i]))/total:avg(c.map(chargeStressScore));
    components.push({key:'stress',label:'C-rate / şarj stresi',score:clamp(stress),weight:20,detail:`Kayıtlı şarj stresi puanı ${fmt(stress,0)}/100`});
    const b=balanceStats();
    const dcScore=b.dcShare<=b.target?100:clamp(100-(b.dcShare-b.target)*(100/Math.max(1,100-b.target)));
    components.push({key:'dc',label:'DC kullanım dengesi',score:dcScore,weight:10,detail:`DC enerji payı %${fmt(b.dcShare,1)} · hedef ≤%${fmt(b.target,0)}`});
  }
  if(!components.length)return{score:null,components:[],confidence:'Veri yok',confidenceClass:'neutral',summary:'Şarj veya SOH verisi ekleyin.'};
  const weight=sum(components.map(x=>x.weight));
  const score=sum(components.map(x=>x.score*x.weight))/weight;
  const highSoh=db.sohTests.filter(x=>(x.qualityScore??sohQuality(x.startSoc,x.endSoc,x.type,x.temp).score)>=4).length;
  let confidence='Düşük',confidenceClass='warn';
  if(highSoh>=2&&c.length>=8){confidence='Yüksek';confidenceClass='good';}
  else if((db.sohTests.length>=1&&c.length>=4)||c.length>=8){confidence='Orta';confidenceClass='info';}
  const summary=score>=90?'Kullanım profili çok iyi':score>=80?'Kullanım profili iyi':score>=70?'Bazı alışkanlıklar iyileştirilebilir':'Şarj alışkanlıklarında dikkat alanları var';
  return{score,components,confidence,confidenceClass,summary};
}


function chargeSocBandFraction(c,low,high){
  if(!hasSocPair(c))return null;
  const a=Number(c.startSoc),b=Number(c.endSoc),delta=b-a;
  if(!(delta>0))return null;
  return Math.max(0,Math.min(b,high)-Math.max(a,low))/delta;
}
function chargeSocStress(c){
  if(!hasSocPair(c))return null;
  const fLow=chargeSocBandFraction(c,0,20)||0;
  const f80=chargeSocBandFraction(c,80,90)||0;
  const f90=chargeSocBandFraction(c,90,100)||0;
  return clamp(fLow*8+f80*50+f90*100);
}
function cRateStressValue(c){
  const ar=chargeAverageCRate(c),pr=chargePeakCRate(c),r=ar??pr;
  if(r==null)return null;
  let v;
  if(r<=0.5)v=0;
  else if(r<=1)v=(r-.5)/.5*15;
  else if(r<=2)v=15+(r-1)*25;
  else if(r<=4)v=40+(r-2)/2*45;
  else v=Math.min(100,85+(r-4)*7.5);
  if(ar!=null&&pr!=null&&pr>2)v+=Math.min(10,Math.max(0,pr-2)*5);
  return clamp(v);
}
function tempStressValue(c){
  if(c.temp===null||c.temp===''||c.temp===undefined||!Number.isFinite(Number(c.temp)))return null;
  const t=Number(c.temp),r=chargeCRate(c);let v=0;
  if(t<0)v=65;else if(t<10)v=35;else if(t<15)v=15;else if(t<=30)v=0;else if(t<35)v=10;else if(t<40)v=30;else if(t<45)v=50;else v=70;
  if(t<=10&&r!=null&&r>1)v+=Math.min(35,10+(r-1)*20);
  if(t>=35&&hasSocValue(c.endSoc)&&Number(c.endSoc)>80)v+=20;
  return clamp(v);
}
function weightedStressMean(charges,fn){
  const valid=charges.map(x=>({x,v:fn(x),e:chargeEnergyValue(x)})).filter(o=>o.v!=null&&Number.isFinite(o.v));
  if(!valid.length)return null;
  const e=sum(valid.map(o=>o.e));
  return e>0?sum(valid.map(o=>o.v*o.e))/e:avg(valid.map(o=>o.v));
}
function stressCoverageFor(charges){
  const total=sum(charges.map(chargeEnergyValue));
  const cov=(pred)=>{const e=sum(charges.filter(pred).map(chargeEnergyValue));return total>0?e/total*100:(charges.length?charges.filter(pred).length/charges.length*100:0)};
  const soc=cov(hasSocPair),crate=cov(x=>chargeCRate(x)!=null),temp=cov(x=>x.temp!==null&&x.temp!==''&&x.temp!==undefined&&Number.isFinite(Number(x.temp)));
  const weighted=soc*.4+crate*.4+temp*.2;
  const confidence=weighted>=80?'Yüksek':weighted>=50?'Orta':'Düşük';
  const cls=weighted>=80?'good':weighted>=50?'info':'warn';
  return{soc,crate,temp,weighted,confidence,cls};
}
function stressIndexFor(charges){
  if(!charges.length)return{score:null,components:[],coverage:stressCoverageFor([]),summary:'Stres hesabı için şarj kaydı ekleyin.'};
  const components=[];
  const soc=weightedStressMean(charges,chargeSocStress);if(soc!=null)components.push({key:'soc',label:'Yüksek / düşük SOC maruziyeti',score:soc,weight:35,detail:'%80–90 orta, %90–100 daha yüksek ağırlık; %20 altı düşük ağırlık.'});
  const cr=weightedStressMean(charges,cRateStressValue);if(cr!=null)components.push({key:'crate',label:'C-rate maruziyeti',score:cr,weight:35,detail:'Ortalama C-rate esas; varsa tepe C-rate sınırlı ek stres.'});
  const ts=weightedStressMean(charges,tempStressValue);if(ts!=null)components.push({key:'temp',label:'Sıcaklık etkileşimi',score:ts,weight:20,detail:'Ortam sıcaklığı proxy; soğuk+hızlı ve sıcak+yüksek SOC ağırlaştırılır.'});
  const total=sum(charges.map(chargeEnergyValue)),dc=sum(charges.filter(x=>x.type==='DC').map(chargeEnergyValue));
  const dcShare=total>0?dc/total*100:(charges.length?charges.filter(x=>x.type==='DC').length/charges.length*100:0),target=Number(db.settings.targetDcShare)||40;
  const dcStress=dcShare<=target?0:clamp((dcShare-target)/Math.max(1,100-target)*100);
  components.push({key:'dc',label:'DC enerji dengesi',score:dcStress,weight:10,detail:`DC payı %${fmt(dcShare,1)} · kullanıcı hedefi ≤%${fmt(target,0)}; bilimsel zarar eşiği değildir.`});
  const w=sum(components.map(x=>x.weight)),score=w?sum(components.map(x=>x.score*x.weight))/w:null;
  const coverage=stressCoverageFor(charges);
  const summary=score==null?'Veri yetersiz':score<20?'Düşük stresli kullanım profili':score<40?'Ilımlı stresli kullanım profili':score<60?'Orta-yüksek stres maruziyeti':score<80?'Yüksek stres maruziyeti':'Çok yüksek stres maruziyeti';
  return{score,components,coverage,summary,dcShare};
}
function batteryStressIndex(){
  const ordered=[...ownerCharges()].sort((a,b)=>String(b.date).localeCompare(String(a.date)));
  const n=Math.max(3,Number(db.settings.stressWindow)||12);
  return{recent:stressIndexFor(ordered.slice(0,n)),lifetime:stressIndexFor(ordered),window:n,recentCount:Math.min(n,ordered.length)};
}
function lifetimeExposureMetrics(){
  const c=ownerCharges(),cap=Number(db.settings.referenceCapacity)||88.5,total=sum(c.map(chargeEnergyValue));
  const weightedRateNumer=sum(c.map(x=>(chargeCRate(x)??0)*chargeEnergyValue(x))),rateEnergy=sum(c.filter(x=>chargeCRate(x)!=null).map(chargeEnergyValue));
  const highSocEnergy=sum(c.map(x=>{const f=chargeSocBandFraction(x,80,100);return f==null?0:chargeEnergyValue(x)*f}));
  const above90Energy=sum(c.map(x=>{const f=chargeSocBandFraction(x,90,100);return f==null?0:chargeEnergyValue(x)*f}));
  const lowSocEnergy=sum(c.map(x=>{const f=chargeSocBandFraction(x,0,20);return f==null?0:chargeEnergyValue(x)*f}));
  const fast1=sum(c.filter(x=>(chargeCRate(x)??0)>1).map(chargeEnergyValue));
  const fast2=sum(c.filter(x=>(chargeCRate(x)??0)>2).map(chargeEnergyValue));
  const dc=sum(c.filter(x=>x.type==='DC').map(chargeEnergyValue));
  const coldFast=sum(c.filter(x=>Number.isFinite(Number(x.temp))&&Number(x.temp)<=10&&(chargeCRate(x)??0)>1).map(chargeEnergyValue));
  const hotHigh=sum(c.filter(x=>Number.isFinite(Number(x.temp))&&Number(x.temp)>=35&&hasSocValue(x.endSoc)&&Number(x.endSoc)>80).map(chargeEnergyValue));
  const avgRates=c.map(chargeAverageCRate).filter(x=>x!=null),peakRates=c.map(chargePeakCRate).filter(x=>x!=null);
  return{total,chargeEfc:cap>0?total/cap:null,dc,dcShare:total?dc/total*100:null,highSocEnergy,highSocShare:total?highSocEnergy/total*100:null,above90Energy,lowSocEnergy,fast1,fast1Share:total?fast1/total*100:null,fast2,fast2Share:total?fast2/total*100:null,coldFast,hotHigh,avgRate:rateEnergy?weightedRateNumer/rateEnergy:null,maxAvg:avgRates.length?Math.max(...avgRates):null,maxPeak:peakRates.length?Math.max(...peakRates):null,coverage:stressCoverageFor(c)};
}
function socBandEnergy(charges){
  const bands=[['0–20%',0,20],['20–40%',20,40],['40–60%',40,60],['60–80%',60,80],['80–90%',80,90],['90–100%',90,100]],out={};
  for(const [label,a,b] of bands){out[label]=sum(charges.map(x=>{const f=chargeSocBandFraction(x,a,b);return f==null?0:chargeEnergyValue(x)*f}))}return out;
}
function cRateBandEnergy(charges){
  const out={'≤0,5C':0,'0,5–1C':0,'1–2C':0,'2–4C':0,'≥4C':0,'C-rate bilinmiyor':0};
  for(const x of charges){const e=chargeEnergyValue(x),r=chargeCRate(x);if(r==null)out['C-rate bilinmiyor']+=e;else if(r<=.5)out['≤0,5C']+=e;else if(r<=1)out['0,5–1C']+=e;else if(r<=2)out['1–2C']+=e;else if(r<4)out['2–4C']+=e;else out['≥4C']+=e}return out;
}
function tempBandEnergy(charges){
  const out={'<0 °C':0,'0–10 °C':0,'10–15 °C':0,'15–30 °C':0,'30–35 °C':0,'35–40 °C':0,'≥40 °C':0,'Sıcaklık bilinmiyor':0};
  for(const x of charges){const e=chargeEnergyValue(x);if(x.temp===null||x.temp===''||x.temp===undefined||!Number.isFinite(Number(x.temp))){out['Sıcaklık bilinmiyor']+=e;continue}const t=Number(x.temp);if(t<0)out['<0 °C']+=e;else if(t<10)out['0–10 °C']+=e;else if(t<15)out['10–15 °C']+=e;else if(t<=30)out['15–30 °C']+=e;else if(t<35)out['30–35 °C']+=e;else if(t<40)out['35–40 °C']+=e;else out['≥40 °C']+=e}return out;
}

function balanceStats(){
  const win=Math.max(3,Number(db.settings.balanceWindow)||10);
  const owner=ownerCharges();
  const ordered=[...owner].sort((a,b)=>String(b.date).localeCompare(String(a.date))).slice(0,win);
  const dc=ordered.filter(x=>x.type==='DC');
  const totalEnergy=sum(ordered.map(chargeEnergyValue));
  const dcEnergy=sum(dc.map(chargeEnergyValue));
  const dcShare=totalEnergy?dcEnergy/totalEnergy*100:0;
  let consecutiveDc=0,consecutiveAc=0;
  for(const x of ordered){if(x.type==='DC'&&consecutiveAc===0)consecutiveDc++;else break;}
  for(const x of ordered){if(x.type==='AC'&&consecutiveDc===0)consecutiveAc++;else break;}
  const target=Math.max(1,Math.min(100,Number(db.settings.targetDcShare)||40));
  const requiredAc=Math.max(0,dcEnergy/(target/100)-totalEnergy);
  const acEnergies=owner.filter(x=>x.type==='AC').map(chargeEnergyValue).filter(x=>x>0);
  const typicalAc=acEnergies.length?avg(acEnergies):Number(db.settings.referenceCapacity)*0.60;
  const sessions=requiredAc>0&&typicalAc>0?Math.ceil(requiredAc/typicalAc):0;
  return{ordered,totalEnergy,dcEnergy,dcShare,consecutiveDc,consecutiveAc,target,requiredAc,typicalAc,sessions,window:win};
}
function recommendation(){
  const s=balanceStats();
  if(!s.ordered.length)return{level:'info',title:'Kayıt ekleyerek başlayın',html:'Şarj geçmişi oluştukça AC/DC enerji dengesi, SOC ve C-rate birlikte değerlendirilerek öneri üretilecek.'};
  const latest=s.ordered[0];
  const a=cRateAssessment(chargeCRate(latest),latest.temp,latest.endSoc);
  if(a.severity>=4)return{level:'bad',title:'Son şarj yüksek stresli görünüyor',html:`Son kaydın ${chargeCRateSource(latest)==='ortalama'?'ortalama':'kayıtlı tepe'} C-rate değeri <strong>${fmt(chargeCRate(latest),2)}C</strong>. Bir sonraki fırsatta düşük güçlü/AC şarj ve orta SOC aralığı tercih etmek daha koruyucu olur.`};
  if(s.dcShare>s.target||s.consecutiveDc>=2){
    const reason=s.consecutiveDc>=2?`Son ${s.consecutiveDc} şarj arka arkaya DC.`:`Son ${s.ordered.length} kayıtta DC enerji payı %${fmt(s.dcShare,0)}.`;
    return{level:'warn',title:'Şimdi AC tercih etmek mantıklı',html:`${reason} Hedefiniz ≤%${fmt(s.target,0)} DC enerji payı. Bu pencereyi hedefe indirmek için yaklaşık <strong>${fmt(s.requiredAc,0)} kWh AC</strong> gerekir${s.sessions?`; kendi geçmişinizdeki AC oturumlarına göre yaklaşık <strong>${s.sessions} AC şarj</strong>`:''}. Bu sayı bilimsel bir zorunluluk değil, seçtiğiniz denge hedefine dayalı matematiksel öneridir.`};
  }
  if(s.consecutiveAc>=3&&s.dcShare<=s.target){
    return{level:'good',title:'Gerekiyorsa DC kullanabilirsiniz',html:`Son ${s.consecutiveAc} şarj AC ve son ${s.ordered.length} kayıttaki DC enerji payınız %${fmt(s.dcShare,0)}. Uzun yol veya zaman ihtiyacı varsa DC hızlı şarjı kullanmanız denge hedefinizi bozmaz; mümkünse %20–80 bandında kalın.`};
  }
  return{level:'good',title:'Şarj dengesi uygun',html:`Son ${s.ordered.length} kayıttaki DC enerji payı <strong>%${fmt(s.dcShare,0)}</strong>; hedefiniz ≤%${fmt(s.target,0)}. AC/DC seçimini ihtiyaca göre yapabilirsiniz. NMC açısından yüksek SOC’de uzun bekleme ve soğuk bataryada yüksek C-rate daha önemli uyarı noktalarıdır.`};
}

function group(arr,keyFn,valueKey){const m={};for(const x of arr){const k=keyFn(x);m[k]=(m[k]||0)+(valueKey?Number(x[valueKey])||0:1)}return m}
function renderBars(id,obj,suffix=''){const el=byId(id);const entries=Object.entries(obj).sort((a,b)=>b[1]-a[1]);if(!entries.length){el.innerHTML='<div class="empty">Veri yok.</div>';return}const max=Math.max(...entries.map(x=>x[1]),1);el.innerHTML=entries.slice(0,8).map(([k,v])=>`<div class="bar-row"><div class="bar-label"><span>${escapeHtml(k)}</span><strong>${fmt(v,1)}${suffix}</strong></div><div class="bar-track"><div class="bar-fill" style="width:${v/max*100}%"></div></div></div>`).join('')}
function renderBarsOrdered(id,obj,suffix=''){const el=byId(id),entries=Object.entries(obj);if(!entries.length){el.innerHTML='<div class="empty">Veri yok.</div>';return}const max=Math.max(...entries.map(x=>x[1]),1);el.innerHTML=entries.map(([k,v])=>`<div class="bar-row"><div class="bar-label"><span>${escapeHtml(k)}</span><strong>${fmt(v,1)}${suffix}</strong></div><div class="bar-track"><div class="bar-fill" style="width:${v/max*100}%"></div></div></div>`).join('')}

function renderDashboard(){
  const c=ownerCharges(),t=db.trips,soh=referenceSoh(),cons=latestConsumptionSnapshot(),cost100=costPer100Metrics();
  const energyTotal=sum(c.map(chargeEnergyValue));const dcEnergy=sum(c.filter(x=>x.type==='DC').map(chargeEnergyValue));
  const socCharges=c.filter(hasSocPair);
  const complianceWeighted=socCharges.length?avg(socCharges.map(x=>chargeCompliance(x).ratio))*100:null;
  const rates=c.map(chargeCRate).filter(x=>x!=null);
  const avgRates=c.map(chargeAverageCRate).filter(x=>x!=null),peakRates=c.map(chargePeakCRate).filter(x=>x!=null);
  const cards=[
    ['Kilometre',latestOdo()?fmt(latestOdo(),0)+' km':'—','Son kayıt'],
    ['Sahiplik Mesafesi',ownershipKm()!=null?fmt(ownershipKm(),0)+' km':'—','32.356 km başlangıç'],
    ['Son Şarjdan Beri',cons?fmt(cons.sinceCharge,1)+' kWh/100 km':'—','Son tüketim sayaç kaydı'],
    ['100 km Tüketim',cost100.consumption!=null?fmt(cost100.consumption,1)+' kWh/100 km':'—','Sahiplik dönemi toplam ortalama'],
    ['100 km Maliyet',cost100.costPer100!=null?fmt(cost100.costPer100,2)+' ₺/100 km':'—',cost100.avgPrice!=null?fmt(cost100.avgPrice,2)+' ₺/kWh ortalama şarj maliyeti':'Maliyetli şarj kaydı gerekli'],
    ['Takip SOH',soh?fmt(soh.soh,1)+'%':'—',soh?soh.mode:'Kontrollü testlerden'],
    ['Şarj Kaydı',c.length,'Toplam oturum'],
    ['DC Enerji Payı',energyTotal?fmt(dcEnergy/energyTotal*100,1)+'%':'—',c.filter(x=>x.type==='DC').length+' DC oturumu'],
    ['20–80 Uyum',complianceWeighted!==null?fmt(complianceWeighted,1)+'%':'—','SOC artışının bant içi payı'],
    ['Maks. Ort. C-rate',avgRates.length?fmt(Math.max(...avgRates),2)+'C':'—',avgRates.length?'Enerji + süre hesabı':'Enerji + süre girildiğinde'],
    ['Maks. Tepe C-rate',peakRates.length?fmt(Math.max(...peakRates),2)+'C':'—','Opsiyonel maksimum güç kaydı']
  ];
  byId('dashboardCards').innerHTML=cards.map(x=>`<div class="metric"><div class="label">${x[0]}</div><div class="value">${x[1]}</div><div class="sub">${x[2]}</div></div>`).join('');
  const hs=batteryHealthScore();
  byId('healthScoreValue').textContent=hs.score==null?'—':fmt(hs.score,0);
  byId('healthConfidence').textContent=`Güven: ${hs.confidence}`;byId('healthConfidence').className=`badge ${hs.confidenceClass}`;
  byId('healthScoreSummary').innerHTML=`<strong>${hs.summary}</strong>${hs.score!=null?`<div class="muted">Toplam skor ${fmt(hs.score,1)}/100</div>`:''}`;
  byId('healthScoreGauge').style.setProperty('--score',hs.score==null?0:hs.score);
  byId('healthScoreComponents').innerHTML=hs.components.length?hs.components.map(x=>`<div class="score-component"><div class="bar-label"><span>${escapeHtml(x.label)}</span><strong>${fmt(x.score,0)}</strong></div><div class="bar-track"><div class="bar-fill" style="width:${x.score}%"></div></div><div class="component-detail">${escapeHtml(x.detail)}</div></div>`).join(''):'<div class="empty">Skor için veri ekleyin.</div>';
  const bsi=batteryStressIndex(),sr=bsi.recent,life=lifetimeExposureMetrics();
  byId('stressScoreValue').textContent=sr.score==null?'—':fmt(sr.score,0);
  byId('stressConfidence').textContent=`Güven: ${sr.coverage.confidence}`;byId('stressConfidence').className=`badge ${sr.coverage.cls}`;
  byId('stressScoreSummary').innerHTML=`<strong>${sr.summary}</strong>${sr.score!=null?`<div class="muted">Son ${bsi.recentCount} şarj · ${fmt(sr.score,1)}/100 · düşük daha iyi</div>`:''}`;
  byId('stressScoreGauge').style.setProperty('--score',sr.score==null?0:sr.score);
  byId('stressScoreComponents').innerHTML=sr.components.length?sr.components.map(x=>`<div class="score-component"><div class="bar-label"><span>${escapeHtml(x.label)}</span><strong>${fmt(x.score,0)}</strong></div><div class="bar-track stress-track"><div class="bar-fill stress-fill" style="width:${x.score}%"></div></div><div class="component-detail">${escapeHtml(x.detail)}</div></div>`).join(''):'<div class="empty">Stres analizi için veri ekleyin.</div>';
  byId('lifetimeExposureSummary').innerHTML=`<div class="mini-list"><div class="mini-item"><span>Toplam şarj throughput</span><strong>${fmt(life.total,1)} kWh</strong></div><div class="mini-item"><span>Charge-side EFC proxy</span><strong>${life.chargeEfc!=null?fmt(life.chargeEfc,1):'—'}</strong></div><div class="mini-item"><span>DC enerji</span><strong>${fmt(life.dc,1)} kWh${life.dcShare!=null?' · %'+fmt(life.dcShare,1):''}</strong></div><div class="mini-item"><span>>1C enerji</span><strong>${fmt(life.fast1,1)} kWh${life.fast1Share!=null?' · %'+fmt(life.fast1Share,1):''}</strong></div><div class="mini-item"><span>>80% SOC bandında eklenen enerji</span><strong>${fmt(life.highSocEnergy,1)} kWh${life.highSocShare!=null?' · %'+fmt(life.highSocShare,1):''}</strong></div></div>`;

  const ownKm=ownershipKm(),ownerHistory=c.filter(x=>x.scope==='owner_history').length,prev=db.charges.filter(x=>x.scope==='previous_owner').length;
  byId('ownershipSummary').innerHTML=`<div class="mini-list"><div class="mini-item"><span>Sahiplik başlangıcı</span><strong>${db.settings.ownershipStartOdo?fmt(db.settings.ownershipStartOdo,0)+' km':'-'} · %${db.settings.ownershipStartSoc??'-'}${db.settings.ownershipStartDate?' · '+fmtDate(db.settings.ownershipStartDate):''}</strong></div><div class="mini-item"><span>Güncel durum</span><strong>${latestOdo()?fmt(latestOdo(),0)+' km':'-'} · %${db.settings.currentSoc??'-'}</strong></div><div class="mini-item"><span>Sizin dönemde izlenen mesafe</span><strong>${ownKm!=null?fmt(ownKm,0)+' km':'-'}</strong></div><div class="mini-item"><span>Sizin şarj kayıtlarınız</span><strong>${c.length}</strong></div><div class="mini-item"><span>Sonradan girilen geçmiş kayıt</span><strong>${ownerHistory}</strong></div>${prev?`<div class="mini-item"><span>Önceki sahip kaydı</span><strong>${prev}</strong></div>`:''}</div>`;
  const detailedAvg=weightedTripConsumption();
  byId('consumptionSummary').innerHTML=cons?`<div class="consumption-pair"><div><span>Son şarjdan beri</span><strong>${fmt(cons.sinceCharge,1)}</strong><small>kWh/100 km</small></div><div><span>Toplam</span><strong>${fmt(cons.total,1)}</strong><small>kWh/100 km</small></div></div><p class="muted">Son sayaç kaydı: ${fmtDate(cons.date)} · ${fmt(cons.odo,0)} km${detailedAvg!=null?` · Ayrıntılı sürüşlerden ağırlıklı ortalama: ${fmt(detailedAvg,1)} kWh/100 km`:''}</p>`:'<div class="empty">Henüz tüketim sayaç kaydı yok. Araç ekranındaki iki ortalamayı Tüketim / Sürüş bölümünden ekleyin.</div>';
  D.quickCurrentOdo.value=db.settings.currentOdo??latestOdo()??'';D.quickCurrentSoc.value=db.settings.currentSoc??'';
  const rec=recommendation();byId('smartRecommendation').innerHTML=`<p>${rec.html}</p><p class="muted">Karar motoru: DC enerji payı + ardışık AC/DC + SOC + C-rate.</p>`;byId('recommendationBadge').textContent=rec.title;byId('recommendationBadge').className=`badge ${rec.level}`;
  const recent=[...c].sort((a,b)=>String(b.date).localeCompare(String(a.date))).slice(0,5);
  byId('recentCharges').innerHTML=recent.length?`<div class="mini-list">${recent.map(x=>`<div class="mini-item"><span>${fmtDate(x.date)} · ${escapeHtml(x.provider||x.type)}</span><strong>${socLabel(x)}${chargeCRate(x)!=null?' · '+(chargeCRateSource(x)==='ortalama'?'Ort. ':'Tepe ')+fmt(chargeCRate(x),2)+'C':''}</strong></div>`).join('')}</div>`:'<div class="empty">Henüz şarj kaydı yok.</div>';
  const socKnown=c.filter(hasSocPair),full=socKnown.filter(x=>chargeCompliance(x).full).length,above=socKnown.filter(x=>chargeCompliance(x).above>0).length,below=socKnown.filter(x=>chargeCompliance(x).below>0).length;
  byId('complianceSummary').innerHTML=c.length?`<div class="mini-list"><div class="mini-item"><span>SOC verisi olan oturum</span><strong>${socKnown.length}/${c.length}</strong></div><div class="mini-item"><span>Tam 20–80 uyumlu oturum</span><strong>${socKnown.length?`${full}/${socKnown.length} (${fmt(full/socKnown.length*100,0)}%)`:'—'}</strong></div><div class="mini-item"><span>%80 üstüne çıkan</span><strong>${socKnown.length?above:'—'}</strong></div><div class="mini-item"><span>%20 altından başlayan</span><strong>${socKnown.length?below:'—'}</strong></div></div>`:'<div class="empty">Analiz için şarj kaydı ekleyin.</div>';
  renderBars('chargeTypeBars',Object.fromEntries(Object.entries(group(c,x=>x.type)).map(([k,v])=>[k,v])),' oturum');
  renderBars('providerBars',group(c,x=>x.provider||'Belirtilmedi','energy'),' kWh');
  const bands={};for(const x of c){const r=chargeCRate(x),b=cRateClass(r).label;bands[b]=(bands[b]||0)+1;}renderBars('crateSummary',bands,' kayıt');
}

function chargeBadge(c){const cp=chargeCompliance(c);if(!cp.available)return'<span class="badge neutral">SOC yok</span>';return cp.full?'<span class="badge good">Uyumlu</span>':cp.above>0?'<span class="badge warn">%80+</span>':'<span class="badge warn">%20-</span>'}
function crateBadgeForCharge(c){
  const ar=chargeAverageCRate(c),pr=chargePeakCRate(c),r=ar??pr;if(r==null)return'-';
  const a=cRateAssessment(r,c.temp,c.endSoc);
  const parts=[];if(ar!=null)parts.push(`Ort. ${fmt(ar,2)}C`);if(pr!=null)parts.push(`Maks. ${fmt(pr,2)}C`);
  return`<span class="badge ${a.cls2}" title="${escapeHtml(a.notes.join(' '))}">${parts.join(' · ')} · ${a.label2}</span>`
}
function renderCharges(){
  const rows=[...db.charges].sort((a,b)=>String(b.date).localeCompare(String(a.date)));
  byId('chargesTable').innerHTML=rows.length?rows.map(x=>{const ap=chargeAveragePower(x);return`<tr><td>${fmtDate(x.date)}</td><td>${x.odo?fmt(x.odo,0):'<span class="muted">Bilinmiyor</span>'}</td><td>${socLabel(x)}</td><td>${x.type}</td><td><span class="badge ${x.scope==='previous_owner'?'neutral':x.scope==='owner_history'?'info':'good'}">${scopeLabel(x.scope)}</span></td><td>${x.durationMin?fmt(x.durationMin,0)+' dk':'-'}</td><td>${ap!=null?fmt(ap,1)+' kW':'-'}</td><td>${x.power?fmt(x.power,1)+' kW':'-'}</td><td>${crateBadgeForCharge(x)}</td><td>${x.energy?fmt(x.energy,2)+' kWh':'-'}</td><td>${escapeHtml(x.provider||'-')}</td><td>${x.cost?fmt(x.cost,2):'-'}</td><td>${chargeBadge(x)}</td><td><button class="link-btn" onclick="editCharge('${x.id}')">Düzenle</button><button class="link-btn" onclick="deleteCharge('${x.id}')">Sil</button></td></tr>`}).join(''):'<tr><td colspan="14" class="empty">Henüz kayıt yok.</td></tr>';
}
function updateChargePreview(){
  const peak=+D.chargePower.value,energy=+D.chargeEnergy.value,duration=+D.chargeDuration.value,start=+D.chargeStartSoc.value,end=+D.chargeEndSoc.value,temp=D.chargeTemp.value===''?null:+D.chargeTemp.value;
  const avgPower=energy>0&&duration>0?energy/(duration/60):null,avgR=avgPower!=null?cRate(avgPower):null,peakR=peak>0?cRate(peak):null,r=avgR??peakR;
  if(r==null){byId('chargePreview').innerHTML='Enerji + süre girerseniz ortalama güç ve C-rate otomatik hesaplanır. Maksimum görülen güç opsiyoneldir.';return;}
  const a=cRateAssessment(r,temp,end),lines=[];
  if(avgPower!=null)lines.push(`Ortalama güç: <strong>${fmt(avgPower,1)} kW</strong> · Ortalama C-rate: <strong>${fmt(avgR,2)}C</strong>`);
  if(peakR!=null)lines.push(`Maksimum görülen: <strong>${fmt(peak,1)} kW</strong> · Tepe C-rate: <strong>${fmt(peakR,2)}C</strong>`);
  const startKnown=D.chargeStartSoc.value!=='',endKnown=D.chargeEndSoc.value!=='';
  byId('chargePreview').innerHTML=`${lines.join('<br>')}<br><span class="badge ${a.cls2}">${a.label2}</span>${startKnown||endKnown?` · SOC: ${startKnown?start+'%':'—'} → ${endKnown?end+'%':'—'}`:' · SOC: bilinmiyor'}<div class="preview-notes">${a.notes.map(n=>`• ${escapeHtml(n)}`).join('<br>')}<br>• Sağlık skorunda seans yükü için ortalama C-rate esas alınır; maksimum değer varsa kısa süreli tepe maruziyeti ayrıca dikkate alınır.</div>`;
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


function renderStress(){
  const c=ownerCharges(),bsi=batteryStressIndex(),r=bsi.recent,l=bsi.lifetime,e=lifetimeExposureMetrics();
  const cards=[
    ['Son Dönem BSI',r.score!=null?fmt(r.score,1)+'/100':'—',`Son ${bsi.recentCount}/${bsi.window} şarj · düşük daha iyi`],
    ['Tüm Kayıt BSI',l.score!=null?fmt(l.score,1)+'/100':'—','Tüm sahiplik kayıtları'],
    ['Charge-side EFC',e.chargeEfc!=null?fmt(e.chargeEfc,1):'—','Σ şarj kWh / referans kWh'],
    ['DC Throughput',fmt(e.dc,1)+' kWh',e.dcShare!=null?'%'+fmt(e.dcShare,1)+' toplam enerji':'—'],
    ['>1C Throughput',fmt(e.fast1,1)+' kWh',e.fast1Share!=null?'%'+fmt(e.fast1Share,1)+' toplam enerji':'—'],
    ['>2C Throughput',fmt(e.fast2,1)+' kWh',e.fast2Share!=null?'%'+fmt(e.fast2Share,1)+' toplam enerji':'—'],
    ['>80% SOC Enerji',fmt(e.highSocEnergy,1)+' kWh',e.highSocShare!=null?'%'+fmt(e.highSocShare,1)+' kayıtlı şarj enerjisi':'SOC verisi gerekli'],
    ['Enerji-ağırlıklı C-rate',e.avgRate!=null?fmt(e.avgRate,2)+'C':'—','C-rate verisi olan oturumlar']
  ];
  byId('stressCards').innerHTML=cards.map(x=>`<div class="metric"><div class="label">${x[0]}</div><div class="value">${x[1]}</div><div class="sub">${x[2]}</div></div>`).join('');
  byId('stressPanelValue').textContent=r.score==null?'—':fmt(r.score,0);byId('stressPanelGauge').style.setProperty('--score',r.score==null?0:r.score);
  byId('stressPanelConfidence').textContent=`Güven: ${r.coverage.confidence}`;byId('stressPanelConfidence').className=`badge ${r.coverage.cls}`;
  byId('stressPanelSummary').innerHTML=`<strong>${r.summary}</strong>${r.score!=null?`<div class="muted">BSI ${fmt(r.score,1)}/100 · son ${bsi.recentCount} şarj</div>`:''}`;
  byId('stressPanelComponents').innerHTML=r.components.length?r.components.map(x=>`<div class="score-component"><div class="bar-label"><span>${escapeHtml(x.label)}</span><strong>${fmt(x.score,0)}</strong></div><div class="bar-track stress-track"><div class="bar-fill stress-fill" style="width:${x.score}%"></div></div><div class="component-detail">${escapeHtml(x.detail)}</div></div>`).join(''):'<div class="empty">Veri yok.</div>';
  byId('stressCoverage').innerHTML=`<div class="mini-list"><div class="mini-item"><span>SOC veri kapsamı</span><strong>%${fmt(e.coverage.soc,0)}</strong></div><div class="mini-item"><span>C-rate veri kapsamı</span><strong>%${fmt(e.coverage.crate,0)}</strong></div><div class="mini-item"><span>Sıcaklık veri kapsamı</span><strong>%${fmt(e.coverage.temp,0)}</strong></div><div class="mini-item"><span>Toplam güven göstergesi</span><strong><span class="badge ${e.coverage.cls}">${e.coverage.confidence}</span></strong></div></div><p class="muted">Kapsam enerji-ağırlıklı hesaplanır. Özellikle geçmiş SOC/sıcaklık eksikleri bilinmeyen kabul edilir; kötü kullanım sayılmaz.</p>`;
  renderBarsOrdered('stressSocBands',socBandEnergy(c),' kWh');
  renderBarsOrdered('stressCRateBands',cRateBandEnergy(c),' kWh');
  renderBarsOrdered('stressTempBands',tempBandEnergy(c),' kWh');
  byId('stressThroughput').innerHTML=`<div class="mini-list"><div class="mini-item"><span>Toplam enerji</span><strong>${fmt(e.total,1)} kWh</strong></div><div class="mini-item"><span>Charge-side EFC proxy</span><strong>${e.chargeEfc!=null?fmt(e.chargeEfc,2):'—'}</strong></div><div class="mini-item"><span>%80–100 bandında eklenen enerji</span><strong>${fmt(e.highSocEnergy,1)} kWh</strong></div><div class="mini-item"><span>%90–100 bandında eklenen enerji</span><strong>${fmt(e.above90Energy,1)} kWh</strong></div><div class="mini-item"><span>%0–20 bandında eklenen enerji</span><strong>${fmt(e.lowSocEnergy,1)} kWh</strong></div><div class="mini-item"><span>Soğuk + >1C enerji</span><strong>${fmt(e.coldFast,1)} kWh</strong></div><div class="mini-item"><span>Sıcak + >80% bitiş SOC enerjisi</span><strong>${fmt(e.hotHigh,1)} kWh</strong></div><div class="mini-item"><span>Maks. ortalama / tepe C-rate</span><strong>${e.maxAvg!=null?fmt(e.maxAvg,2)+'C':'—'} / ${e.maxPeak!=null?fmt(e.maxPeak,2)+'C':'—'}</strong></div></div>`;
  let strongest=r.components.length?[...r.components].sort((a,b)=>b.score-a.score)[0]:null;
  const notes=[];
  if(strongest)notes.push(`Son dönemde en baskın izlenen stres faktörü <strong>${escapeHtml(strongest.label)}</strong> (${fmt(strongest.score,0)}/100).`);
  if(e.highSocShare!=null&&e.highSocShare>20)notes.push(`Kayıtlı şarj enerjisinin %${fmt(e.highSocShare,1)}'i %80 üzerindeki SOC bandında eklenmiş.`);
  if(e.fast2Share!=null&&e.fast2Share>10)notes.push(`Şarj enerjisinin %${fmt(e.fast2Share,1)}'i 2C üzeri oturumlarda gerçekleşmiş; bu bölge NMC/graphite için daha yüksek dikkat gerektirir.`);
  if(e.coldFast>0)notes.push(`Soğuk (≤10 °C ortam) ve >1C kombinasyonunda ${fmt(e.coldFast,1)} kWh kayıtlı enerji var; gerçek hücre sıcaklığı bilinmediği için bu bir risk proxy'sidir.`);
  if(!notes.length)notes.push('Mevcut kayıtlarda belirgin yüksek-stres sinyali görünmüyor; veri kapsamı arttıkça yorum güçlenecek.');
  byId('stressInterpretation').innerHTML=`<div class="advice-box">${notes.map(x=>`<div>• ${x}</div>`).join('')}</div><p class="muted">Bu yorum kapasite kaybını yüzde olarak tahmin etmez. BSI, maruziyetleri görünür kılmak için tasarlanmıştır.</p>`;
}

function renderAnalytics(){
  const c=ownerCharges(),t=db.trips,s=db.sohTests,b=balanceStats(),cons=latestConsumptionSnapshot(),cost100=costPer100Metrics();
  const totalCost=sum(c.map(x=>x.cost)),totalEnergy=sum(c.map(chargeEnergyValue)),dcEnergy=sum(c.filter(x=>x.type==='DC').map(chargeEnergyValue));
  const socKnown=c.filter(hasSocPair);
  const full=socKnown.filter(x=>chargeCompliance(x).full).length;
  const rates=c.map(chargeCRate).filter(x=>x!=null);
  const avgRates=c.map(chargeAverageCRate).filter(x=>x!=null),peakRates=c.map(chargePeakCRate).filter(x=>x!=null);
  const cards=[['Sahiplik Mesafesi',ownershipKm()!=null?fmt(ownershipKm(),0)+' km':'—'],['Son Şarjdan Beri',cons?fmt(cons.sinceCharge,1)+' kWh/100 km':'—'],['100 km Tüketim',cost100.consumption!=null?fmt(cost100.consumption,1)+' kWh/100 km':'—'],['100 km Maliyet',cost100.costPer100!=null?fmt(cost100.costPer100,2)+' ₺/100 km':'—'],['Toplam Şarj Enerjisi',fmt(totalEnergy,1)+' kWh'],['Toplam Şarj Maliyeti',fmt(totalCost,0)+' ₺'],['Ort. Enerji Maliyeti',cost100.avgPrice!=null?fmt(cost100.avgPrice,2)+' ₺/kWh':'—'],['DC Enerji Payı',totalEnergy?fmt(dcEnergy/totalEnergy*100,1)+'%':'—'],['Tam Uyumlu Oturum',socKnown.length?fmt(full/socKnown.length*100,0)+'%':'—'],['Ort. Seans C-rate',avgRates.length?fmt(avg(avgRates),2)+'C':rates.length?fmt(avg(rates),2)+'C':'—'],['Maks. Tepe C-rate',peakRates.length?fmt(Math.max(...peakRates),2)+'C':'—']];
  byId('analyticsCards').innerHTML=cards.map(x=>`<div class="metric"><div class="label">${x[0]}</div><div class="value">${x[1]}</div></div>`).join('');
  renderBars('monthlyConsumption',monthlyAvg(t,'consumption'),' kWh/100');renderBars('monthlyCharging',monthlySum(c,'energy'),' kWh');
  const trend=[...db.consumptionSnapshots].sort((a,b)=>String(b.date).localeCompare(String(a.date))).slice(0,12);
  byId('consumptionTrend').innerHTML=trend.length?`<div class="mini-list">${trend.map(x=>`<div class="mini-item"><span>${fmtDate(x.date)} · ${fmt(x.odo,0)} km</span><strong>${fmt(x.sinceCharge,1)} / ${fmt(x.total,1)} kWh/100</strong></div>`).join('')}</div><p class="muted">Gösterim: Son şarjdan beri / sahiplik dönemi toplam ortalama.</p>`:'<div class="empty">Tüketim sayaç kaydı ekleyin.</div>';
  const detailedAvg=weightedTripConsumption();
  byId('ownershipConsumption').innerHTML=`<div class="mini-list"><div class="mini-item"><span>Başlangıç</span><strong>${fmt(db.settings.ownershipStartOdo,0)} km · %${db.settings.ownershipStartSoc??'-'}</strong></div><div class="mini-item"><span>Güncel</span><strong>${fmt(latestOdo(),0)} km · %${db.settings.currentSoc??'-'}</strong></div><div class="mini-item"><span>Mesafe</span><strong>${ownershipKm()!=null?fmt(ownershipKm(),0)+' km':'-'}</strong></div><div class="mini-item"><span>Son kaydedilen toplam ortalama</span><strong>${cons?fmt(cons.total,1)+' kWh/100':'-'}</strong></div><div class="mini-item"><span>Ayrıntılı sürüşlerden ağırlıklı ortalama</span><strong>${detailedAvg!=null?fmt(detailedAvg,1)+' kWh/100':'-'}</strong></div></div>`;
  const ratios=socKnown.map(x=>chargeCompliance(x).ratio*100),above=sum(socKnown.map(x=>chargeCompliance(x).above)),below=sum(socKnown.map(x=>chargeCompliance(x).below));
  byId('complianceDetail').innerHTML=c.length?`<div class="mini-list"><div class="mini-item"><span>SOC verisi olan oturum</span><strong>${socKnown.length}/${c.length}</strong></div><div class="mini-item"><span>Ortalama bant içi şarj payı</span><strong>${socKnown.length?fmt(avg(ratios),1)+'%':'—'}</strong></div><div class="mini-item"><span>Toplam %80 üstü SOC puanı</span><strong>${socKnown.length?fmt(above,0):'—'}</strong></div><div class="mini-item"><span>Toplam %20 altı başlangıç puanı</span><strong>${socKnown.length?fmt(below,0):'—'}</strong></div></div>`:'<div class="empty">Veri yok.</div>';
  if(s.length){const ordered=[...s].sort((a,b)=>String(a.date).localeCompare(String(b.date)));byId('sohTrend').innerHTML=`<div class="mini-list">${ordered.map(x=>`<div class="mini-item"><span>${fmtDate(x.date)}${x.odo?' · '+fmt(x.odo,0)+' km':''}</span><strong>${fmt(x.soh,1)}%</strong></div>`).join('')}</div>`}else byId('sohTrend').innerHTML='<div class="empty">SOH testi ekleyin.</div>';
  byId('balanceAnalysis').innerHTML=c.length?`<div class="mini-list"><div class="mini-item"><span>Analiz penceresi</span><strong>Son ${b.ordered.length}/${b.window} şarj</strong></div><div class="mini-item"><span>DC enerji payı</span><strong>%${fmt(b.dcShare,1)}</strong></div><div class="mini-item"><span>Hedef</span><strong>≤%${fmt(b.target,0)}</strong></div><div class="mini-item"><span>Hedefe dönüş için AC enerji</span><strong>${b.requiredAc?fmt(b.requiredAc,0)+' kWh':'Gerekmiyor'}</strong></div><div class="mini-item"><span>Tahmini AC oturumu</span><strong>${b.sessions||'—'}</strong></div></div>`:'<div class="empty">Veri yok.</div>';
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
  D.vehicleName.value=s.vehicleName;D.batteryChemistry.value=s.batteryChemistry;D.ownershipStartOdo.value=s.ownershipStartOdo??32356;D.ownershipStartSoc.value=s.ownershipStartSoc??59;D.ownershipStartDate.value=s.ownershipStartDate||'';D.trackingStartOdo.value=s.trackingStartOdo??33537;D.currentOdo.value=s.currentOdo??33537;D.currentSoc.value=s.currentSoc??76;D.referenceCapacity.value=s.referenceCapacity;D.preferredMinSoc.value=s.preferredMinSoc;D.preferredMaxSoc.value=s.preferredMaxSoc;D.targetDcShare.value=s.targetDcShare??40;D.balanceWindow.value=s.balanceWindow??10;D.stressWindow.value=s.stressWindow??12;if(!D.crateCapacity.matches(':focus'))D.crateCapacity.value=s.referenceCapacity;renderProviders();
}
function renderAll(){renderDashboard();renderCharges();renderConsumptionSnapshots();renderTrips();renderSoh();renderAnalytics();renderStress();renderSettings();updateSohPreview();updateChargePreview();renderCrate()}

D.chargeForm.addEventListener('submit',e=>{
  e.preventDefault();const id=D.chargeId.value||uid();
  const odoUnknown=!!D.chargeOdoUnknown.checked;
  const startSoc=D.chargeStartSoc.value===''?null:+D.chargeStartSoc.value,endSoc=D.chargeEndSoc.value===''?null:+D.chargeEndSoc.value;
  const item={id,date:D.chargeDate.value,odo:odoUnknown?null:(D.chargeOdo.value?+D.chargeOdo.value:null),startSoc,endSoc,type:D.chargeType.value,scope:D.chargeScope.value||'owner_current',power:+D.chargePower.value||null,energy:+D.chargeEnergy.value||null,durationMin:+D.chargeDuration.value||null,provider:D.chargeProvider.value.trim(),cost:D.chargeCost.value===''?null:+D.chargeCost.value,temp:D.chargeTemp.value===''?null:+D.chargeTemp.value,location:D.chargeLocation.value.trim(),notes:D.chargeNotes.value.trim()};
  if(hasSocValue(item.startSoc)&&hasSocValue(item.endSoc)&&item.endSoc<=item.startSoc)return alert('Bitiş SOC, başlangıç SOC değerinden büyük olmalı.');
  if(item.scope==='owner_current'&&((item.odo&&item.odo<Number(db.settings.trackingStartOdo))||odoUnknown))item.scope='owner_history';
  const i=db.charges.findIndex(x=>x.id===id);i>=0?db.charges[i]=item:db.charges.push(item);if(item.scope==='owner_current')updateCurrentState(item.odo,item.endSoc);save();resetCharge();
});
function resetCharge(){D.chargeForm.reset();D.chargeId.value='';D.chargeType.value='AC';D.chargeScope.value='owner_current';D.chargeOdo.disabled=false;D.chargeOdo.placeholder='Örn. 33537';setDefaultDateTimes();updateChargePreview()}D.chargeReset.onclick=resetCharge;
window.editCharge=id=>{const x=db.charges.find(v=>v.id===id);if(!x)return;showTab('charges');D.chargeOdoUnknown.checked=(x.odo==null&&x.scope==='owner_history');D.chargeOdo.disabled=D.chargeOdoUnknown.checked;if(x.provider&&![...D.chargeProvider.options].some(o=>o.value===x.provider))D.chargeProvider.add(new Option(`${x.provider} (kayıtlı)`,x.provider));for(const [el,val] of [[D.chargeId,x.id],[D.chargeDate,x.date],[D.chargeOdo,x.odo],[D.chargeStartSoc,x.startSoc],[D.chargeEndSoc,x.endSoc],[D.chargeType,x.type],[D.chargeScope,x.scope||'owner_current'],[D.chargePower,x.power],[D.chargeEnergy,x.energy],[D.chargeDuration,x.durationMin],[D.chargeProvider,x.provider],[D.chargeCost,x.cost],[D.chargeTemp,x.temp],[D.chargeLocation,x.location],[D.chargeNotes,x.notes]])el.value=val??'';updateChargePreview();window.scrollTo({top:120,behavior:'smooth'})};
window.deleteCharge=id=>{if(confirm('Bu şarj kaydı silinsin mi?')){db.charges=db.charges.filter(x=>x.id!==id);save()}};
['chargePower','chargeEnergy','chargeDuration','chargeStartSoc','chargeEndSoc','chargeTemp','chargeType'].forEach(id=>byId(id).addEventListener('input',updateChargePreview));
D.chargeOdoUnknown.addEventListener('change',()=>{D.chargeOdo.disabled=D.chargeOdoUnknown.checked;if(D.chargeOdoUnknown.checked){D.chargeOdo.value='';if(D.chargeScope.value==='owner_current')D.chargeScope.value='owner_history';}D.chargeOdo.placeholder=D.chargeOdoUnknown.checked?'Geçmiş kayıt - bilinmiyor':'Örn. 33537';});

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

D.settingsForm.addEventListener('submit',e=>{
  e.preventDefault();
  const next={vehicleName:D.vehicleName.value.trim(),batteryChemistry:D.batteryChemistry.value.trim(),ownershipStartOdo:+D.ownershipStartOdo.value||0,ownershipStartSoc:+D.ownershipStartSoc.value,ownershipStartDate:D.ownershipStartDate.value||'',trackingStartOdo:+D.trackingStartOdo.value||0,currentOdo:+D.currentOdo.value||0,currentSoc:+D.currentSoc.value,referenceCapacity:+D.referenceCapacity.value,preferredMinSoc:+D.preferredMinSoc.value,preferredMaxSoc:+D.preferredMaxSoc.value,targetDcShare:+D.targetDcShare.value,balanceWindow:+D.balanceWindow.value,stressWindow:+D.stressWindow.value};
  if(next.preferredMaxSoc<=next.preferredMinSoc)return alert('Üst SOC sınırı alt sınırdan büyük olmalı.');
  if(!(next.targetDcShare>0&&next.targetDcShare<=100))return alert('DC enerji payı hedefi %1–100 arasında olmalı.');
  if(!(next.stressWindow>=3&&next.stressWindow<=100))return alert('Stres analizi penceresi 3–100 şarj arasında olmalı.');
  if(!(next.ownershipStartSoc>=0&&next.ownershipStartSoc<=100&&next.currentSoc>=0&&next.currentSoc<=100))return alert('SOC değerleri %0–100 arasında olmalı.');
  db.settings=next;D.crateCapacity.value=next.referenceCapacity;save();alert('Ayarlar kaydedildi.');
});
D.quickStatusForm.addEventListener('submit',e=>{e.preventDefault();const odo=+D.quickCurrentOdo.value,soc=+D.quickCurrentSoc.value;if(!(odo>0&&soc>=0&&soc<=100))return alert('Geçerli kilometre ve SOC girin.');db.settings.currentOdo=odo;db.settings.currentSoc=soc;save();});

function addProvider(name){const n=String(name||'').trim();if(!n)return;if(!db.providers.some(x=>x.toLocaleLowerCase('tr-TR')===n.toLocaleLowerCase('tr-TR')))db.providers.push(n);db.providers.sort((a,b)=>a.localeCompare(b,'tr'));save()}
D.providerAddBtn.onclick=()=>{addProvider(D.providerNew.value);D.providerNew.value=''};
D.providerNew.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();D.providerAddBtn.click()}});
window.removeProvider=index=>{const name=db.providers[Number(index)];if(name&&confirm(`${name} sağlayıcı listesinden kaldırılsın mı?`)){db.providers.splice(Number(index),1);save()}};
D.providerResetBtn.onclick=()=>{if(confirm('Sağlayıcı listesi varsayılan listeye döndürülsün mü? Kendi ekledikleriniz kaldırılır.')){db.providers=[...DEFAULT_PROVIDERS];save()}};
D.clearAllBtn.onclick=()=>{if(confirm('Tüm kayıtlar kalıcı olarak silinecek. Emin misiniz?')){db=structuredClone(defaults);save()}};

function showTab(id){document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active',x.dataset.tab===id));document.querySelectorAll('.panel').forEach(x=>x.classList.toggle('active',x.id===id));if(id==='crate')renderCrate()}
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>showTab(b.dataset.tab));document.querySelectorAll('[data-goto]').forEach(b=>b.onclick=()=>showTab(b.dataset.goto));

function download(name,text,type='text/plain'){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;a.click();URL.revokeObjectURL(a.href)}
D.exportJsonBtn.onclick=()=>download(`t10x_batarya_yedek_${new Date().toISOString().slice(0,10)}.json`,JSON.stringify(db,null,2),'application/json');
D.importJsonInput.onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const obj=JSON.parse(await f.text());if(!obj.settings||!Array.isArray(obj.charges)||!Array.isArray(obj.trips)||!Array.isArray(obj.sohTests))throw new Error();if(confirm('Mevcut veriler içe aktarılan yedekle değiştirilsin mi?')){db=migrate(obj);save()}}catch{alert('Geçersiz yedek dosyası.')}e.target.value=''};
function csvEscape(v){const s=String(v??'');return '"'+s.replaceAll('"','""')+'"'}
function exportCsv(name,headers,rows){const csv='\ufeff'+[headers,...rows].map(r=>r.map(csvEscape).join(';')).join('\n');download(name,csv,'text/csv;charset=utf-8')}
D.exportChargesCsv.onclick=()=>exportCsv('sarj_kayitlari.csv',['Tarih','Km','Baslangic SOC','Bitis SOC','Tur','Donem','Sure dk','Ortalama Guc kW','Maks Guc kW','Ortalama C-rate','Maks C-rate','Enerji kWh','Saglayici','Maliyet TL','Sicaklik','Konum','Not'],db.charges.map(x=>[x.date,x.odo,x.startSoc,x.endSoc,x.type,scopeLabel(x.scope),x.durationMin,chargeAveragePower(x),x.power,chargeAverageCRate(x),chargePeakCRate(x),x.energy,x.provider,x.cost,x.temp,x.location,x.notes]));
D.exportConsumptionCsv.onclick=()=>exportCsv('tuketim_sayac_kayitlari.csv',['Tarih','Km','Son Sarjdan Beri kWh/100km','Sahiplik Toplam Ort kWh/100km','Not'],db.consumptionSnapshots.map(x=>[x.date,x.odo,x.sinceCharge,x.total,x.notes]));
D.exportTripsCsv.onclick=()=>exportCsv('surus_kayitlari.csv',['Tarih','Mesafe km','Tuketim kWh/100','Baslangic SOC','Bitis SOC','Sicaklik','Rota','Not'],db.trips.map(x=>[x.date,x.distance,x.consumption,x.startSoc,x.endSoc,x.temp,x.route,x.notes]));

function setDefaultDateTimes(){const now=new Date();const local=new Date(now.getTime()-now.getTimezoneOffset()*60000).toISOString().slice(0,16);if(!D.chargeDate.value)D.chargeDate.value=local;if(!D.consumptionDate.value)D.consumptionDate.value=local;if(!D.tripDate.value)D.tripDate.value=now.toISOString().slice(0,10);if(!D.sohDate.value)D.sohDate.value=now.toISOString().slice(0,10)}
setDefaultDateTimes();if(!D.consumptionOdo.value)D.consumptionOdo.value=db.settings.currentOdo||'';renderAll();
