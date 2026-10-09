/* v0.9.4: Ownership energy-based consumption model. No invented consumption for unobserved kilometres. */
(function(root,factory){
  const api=factory();
  if(typeof module==='object' && module.exports)module.exports=api;
  if(root)root.T10XConsumption=api;
})(typeof window!=='undefined'?window:undefined,function(){
  const numeric=x=>(x===null||x===undefined||x==='')?null:(Number.isFinite(Number(x))?Number(x):null);
  const validDistance=x=>numeric(x)>0;
  const validRate=x=>numeric(x)>0&&numeric(x)<=100;
  function metrics({trips=[],driveSessions=[],charges=[],ownershipKm=null,referenceCapacity=88.5}={}){
    const data=[];
    const linkedIds=new Set();
    for(const t of trips){
      if(t.linkedDriveId)linkedIds.add(String(t.linkedDriveId));
      if(!validDistance(t.distance)||!validRate(t.consumption))continue;
      data.push({kind:'measured',distance:Number(t.distance),energy:Number(t.distance)*Number(t.consumption)/100});
    }
    const capacity=Number(referenceCapacity);
    for(const d of driveSessions){
      if(!d.complete||linkedIds.has(String(d.id))||!validDistance(d.distance))continue;
      const distance=Number(d.distance);
      if(validRate(d.consumption)){
        data.push({kind:'measured',distance,energy:distance*Number(d.consumption)/100});
        continue;
      }
      const soc0=numeric(d.startSoc),soc1=numeric(d.endSoc);
      if(soc0===null||soc1===null||soc0>100||soc0<0||soc1>100||soc1<0||!(soc0-soc1>=2)||!(capacity>0))continue;
      const start=Date.parse(d.startAt||''),end=Date.parse(d.endAt||'');
      if(!Number.isFinite(start)||!Number.isFinite(end)||end<=start)continue;
      // Unaccounted charging between observations invalidates SOC-based discharge estimation.
      const chargeDuring=(charges||[]).some(c=>{const at=Date.parse(c.date||'');return Number.isFinite(at)&&at>=start&&at<=end;});
      if(chargeDuring)continue;
      const energy=(soc0-soc1)/100*capacity;
      const rate=energy/distance*100;
      // Reject very short/implausible segments where integer SOC quantisation dominates.
      if(distance<5||rate<5||rate>60)continue;
      data.push({kind:'soc-estimate',distance,energy});
    }
    const distance=data.reduce((s,x)=>s+x.distance,0);
    const energy=data.reduce((s,x)=>s+x.energy,0);
    const measuredKm=data.filter(x=>x.kind==='measured').reduce((s,x)=>s+x.distance,0);
    const estimatedKm=distance-measuredKm;
    const owner=Number(ownershipKm);
    const coverage=(Number.isFinite(owner)&&owner>0)?Math.min(100,distance/owner*100):null;
    const overlaps=Number.isFinite(owner)&&owner>0&&distance>owner*1.01;
    return{
      average:distance>0?energy/distance*100:null,
      distance,energy,measuredKm,estimatedKm,
      totalKm:Number.isFinite(owner)&&owner>0?owner:null,
      coverage,overlaps,
      source:distance===0?'none':estimatedKm===0?'measured':measuredKm===0?'estimate':'mixed',
      segments:data.length
    };
  }
  /* Full-ownership approximate energy balance. Only eligible after affirmative
     confirmation of a complete charge ledger; partial data must not masquerade
     as a lifetime consumption measurement. */
  function energyBalance({charges=[],ownershipKm=null,startSoc=null,currentSoc=null,usableCapacity=88.5,ledgerComplete=false,acEfficiency=0.90,dcEfficiency=0.96}={}){
    const result={status:'unconfirmed',average:null,totalUsedKwh:null,netChargedKwh:null,batterySocDeltaKwh:null,stationEnergyKwh:null,acEnergyKwh:null,dcEnergyKwh:null,chargeCount:0,missingEnergyCount:0};
    if(!ledgerComplete)return result;
    const distance=numeric(ownershipKm),start=numeric(startSoc),end=numeric(currentSoc),capacity=numeric(usableCapacity);
    if(distance===null||!(distance>0)||start===null||end===null||start<0||start>100||end<0||end>100||capacity===null||capacity<=0){result.status='invalid-boundary';return result;}
    const acEff=numeric(acEfficiency),dcEff=numeric(dcEfficiency);
    if(acEff===null||dcEff===null||acEff<0.75||acEff>1||dcEff<0.75||dcEff>1){result.status='invalid-efficiency';return result;}
    const owner=charges.filter(x=>x.scope!=='previous_owner');
    result.chargeCount=owner.length;
    if(!owner.length){result.status='no-charges';return result;}
    const invalid=owner.filter(x=>numeric(x.energy)===null||!(numeric(x.energy)>0));
    result.missingEnergyCount=invalid.length;
    if(invalid.length){result.status='missing-energy';return result;}
    if(owner.some(x=>x.type!=='AC'&&x.type!=='DC')){result.status='unknown-type';return result;}
    const sum=arr=>arr.reduce((acc,x)=>acc+Number(x.energy),0);
    const ac=sum(owner.filter(x=>x.type==='AC'));
    const dc=sum(owner.filter(x=>x.type==='DC'));
    const net=ac*acEff+dc*dcEff;
    const socDelta=(start-end)/100*capacity;
    const totalUsed=net+socDelta;
    const rate=100*totalUsed/distance;
    Object.assign(result,{stationEnergyKwh:ac+dc,acEnergyKwh:ac,dcEnergyKwh:dc,netChargedKwh:net,batterySocDeltaKwh:socDelta,totalUsedKwh:totalUsed});
    if(!Number.isFinite(rate)||rate<5||rate>60){result.status='inconsistent';return result;}
    result.status='ok';result.average=rate;
    return result;
  }
  return{metrics,energyBalance};
});
