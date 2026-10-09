/* v0.9.5: SOH evidence classification and capacity sensitivity, not a diagnostic. */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root)root.T10XSohModel=api;
})(typeof window!=='undefined'?window:undefined,function(){
  const num=v=>(v===null||v===undefined||v==='')?null:(Number.isFinite(Number(v))?Number(v):null);
  const isPercent=v=>num(v)!==null&&num(v)>=0&&num(v)<=100;
  const illustrativeLoss={AC:{min:5,max:15},DC:{min:2,max:12}};
  function compute(input={}){
    const method=input.method||'meter';
    if(method==='bms'){
      const soh=num(input.measuredSoh);
      if(soh===null||soh<=0||soh>120)return{valid:false,error:'BMS/servis SOH değerini girin (0–120%).'};
      return{valid:true,method,soh,sohRange:{min:soh,max:soh},level:'verified',basis:'BMS/servis tarafından raporlanan değer; araç verisi uygulama tarafından doğrulanmaz.'};
    }
    const start=num(input.startSoc),end=num(input.endSoc);
    if(!isPercent(start)||!isPercent(end)||!(end>start))return{valid:false,error:'Bitiş SOC başlangıçtan yüksek ve 0–100 aralığında olmalı.'};
    const delta=(end-start)/100;
    const ref=num(input.usableReference);
    if(ref!==null&&!(ref>0&&ref<=150))return{valid:false,error:'Referans kullanılabilir kapasite geçersiz.'};
    let capMin,capMax,netMin,netMax,lossRange=null,level,basis;
    if(method==='net'){
      const net=num(input.netEnergy);
      if(!(net>0))return{valid:false,error:'Gerçekten ölçülmüş net batarya enerjisi gerekli.'};
      netMin=netMax=net;capMin=capMax=net/delta;level=ref!==null?'measured-capacity':'net-no-reference';
      basis='Net batarya enerjisi ölçümü; SOC yüzdesi ve referans kapasite sınırlamaları devam eder.';
    }else if(method==='meter'){
      const meter=num(input.meterEnergy),type=input.type;
      if(!(meter>0))return{valid:false,error:'İstasyon/sayaç enerji değerini girin.'};
      if(!illustrativeLoss[type])return{valid:false,error:'AC veya DC şarj türünü seçin.'};
      const measuredLoss=num(input.measuredLoss);
      if(measuredLoss!==null&&(measuredLoss<0||measuredLoss>30))return{valid:false,error:'Ölçülmüş kayıp 0–30% aralığında olmalı.'};
      // The defaults are illustrative sensitivity hypotheses, not measured losses or calibrated CI bounds.
      lossRange=measuredLoss!==null?{min:measuredLoss,max:measuredLoss,kind:'measured'}:{...illustrativeLoss[type],kind:'illustrative'};
      netMin=meter*(1-lossRange.max/100);netMax=meter*(1-lossRange.min/100);
      capMin=netMin/delta;capMax=netMax/delta;
      level=measuredLoss!==null&&ref!==null?'meter-with-measured-loss':'scenario';
      basis=measuredLoss!==null?'Girilen ölçülmüş kayıp üzerinden hesaplanmış saha kapasite kestirimi.':'Şarj kaybı bilinmediğinden yalnızca varsayımsal duyarlılık senaryosu. SOH ölçümü değildir.';
    }else return{valid:false,error:'Bilinmeyen SOH test yöntemi.'};
    const sohRange=ref!==null?{min:capMin/ref*100,max:capMax/ref*100}:null;
    const representativeSoh=sohRange&&Math.abs(sohRange.max-sohRange.min)<0.00001?sohRange.min:null;
    return{valid:true,method,level,basis,deltaSoc:end-start,netRange:{min:netMin,max:netMax},capacityRange:{min:capMin,max:capMax},referenceCapacity:ref,sohRange,soh:representativeSoh,lossRange};
  }
  function normalizedRecord(x={}){
    // Legacy records carried an assumed 8%/4% loss and a synthetic SOH. Preserve for audit only.
    if(!x.method)return{...x,method:'legacy',evidence:'legacy-assumption'};
    return x;
  }
  function reference(tests=[]){
    const valid=tests.map(normalizedRecord).filter(x=>x.method==='bms'&&num(x.measuredSoh??x.soh)!==null&&num(x.measuredSoh??x.soh)>0&&num(x.measuredSoh??x.soh)<=120)
      .sort((a,b)=>String(b.date||'').localeCompare(String(a.date||'')));
    if(valid.length)return{soh:Number(valid[0].measuredSoh??valid[0].soh),mode:'Son girilen BMS/servis SOH değeri (kullanıcı beyanı)',date:valid[0].date,count:valid.length,method:'bms'};
    const measured=tests.map(normalizedRecord).filter(x=>x.method==='net'&&num(x.soh)!==null&&num(x.soh)>0&&num(x.soh)<=120&&num(x.referenceCapacity)>0)
      .sort((a,b)=>String(b.date||'').localeCompare(String(a.date||'')));
    if(measured.length)return{soh:Number(measured[0].soh),mode:'Net enerji ve referansla hesaplanan saha kestirimi',date:measured[0].date,count:measured.length,method:'net'};
    return null;
  }
  return{compute,reference,normalizedRecord,illustrativeLoss};
});
