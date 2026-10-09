/* v0.9.3: Conservative SOC/time attribution: confirmed park, drive and charge intervals.
   No interpolation across unclassified time; no hidden extrapolation to "now". */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root)root.T10XSocModel=api;
})(typeof window!=='undefined'?window:undefined,function(){
  const msHour=3600000;
  const validSoc=v=>v!==''&&v!==null&&v!==undefined&&Number.isFinite(Number(v))&&Number(v)>=0&&Number(v)<=100;
  const validOdo=v=>v!==''&&v!==null&&v!==undefined&&Number.isFinite(Number(v))&&Number(v)>=0;
  const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
  function eventList(data){
    const events=[];
    const add=(date,soc,kind,odo,id,sessionId)=>{
      const t=new Date(date||'').getTime();
      if(!Number.isFinite(t)||!validSoc(soc))return;
      events.push({t,soc:Number(soc),odo:validOdo(odo)?Number(odo):null,kind,id:id||'',sessionId:sessionId||''});
    };
    const s=data.settings||{};
    if(s.ownershipStartDate&&validSoc(s.ownershipStartSoc))add(`${s.ownershipStartDate}T12:00:00`,s.ownershipStartSoc,'observation',s.ownershipStartOdo,'ownership');
    for(const c of data.charges||[]){
      if(c.scope==='previous_owner'||!validSoc(c.startSoc)||!validSoc(c.endSoc)||Number(c.endSoc)<=Number(c.startSoc)||!(Number(c.durationMin)>0))continue;
      const t=new Date(c.date||'').getTime();if(!Number.isFinite(t))continue;
      add(t,c.startSoc,'charge_start',c.odo,c.id+'-start',c.id);
      add(t+Number(c.durationMin)*60000,c.endSoc,'charge_end',c.odo,c.id+'-end',c.id);
    }
    for(const x of data.socSnapshots||[]){
      const allowed=['drive_start','drive_end','drive_end_unpaired','observation'];
      add(x.date,x.soc,allowed.includes(x.kind)?x.kind:'observation',x.odo,x.id,x.sessionId);
    }
    if(s.currentSocUpdatedAt&&validSoc(s.currentSoc)){
      const t=new Date(s.currentSocUpdatedAt).getTime();
      if(Number.isFinite(t)&&!events.some(x=>Math.abs(x.t-t)<1000&&x.soc===Number(s.currentSoc)))add(t,s.currentSoc,'observation',s.currentOdo,'current-settings');
    }
    // Distinct source events at the same time are retained; zero-time intervals are ignored.
    return events.sort((a,b)=>a.t-b.t||({drive_end:1,charge_end:1,observation:2,drive_start:3,charge_start:3}[a.kind]||2)-({drive_end:1,charge_end:1,observation:2,drive_start:3,charge_start:3}[b.kind]||2));
  }
  function durationOver(a,b,threshold){
    const h=(b.t-a.t)/msHour;
    if(h<=0)return 0;
    if(a.soc>threshold&&b.soc>threshold)return h;
    if(a.soc<=threshold&&b.soc<=threshold)return 0;
    if(a.soc===b.soc)return a.soc>threshold?h:0;
    return a.soc>threshold?h*clamp((a.soc-threshold)/(a.soc-b.soc),0,1):h*clamp((b.soc-threshold)/(b.soc-a.soc),0,1);
  }
  function classify(a,b){
    if(a.kind==='drive_start'&&b.kind==='drive_end'&&a.sessionId&&a.sessionId===b.sessionId)return 'drive';
    if(a.kind==='charge_start'&&b.kind==='charge_end'&&a.sessionId&&a.sessionId===b.sessionId)return 'charge';
    const startsPark=['drive_end','drive_end_unpaired','charge_end','observation'];
    const endsPark=['drive_start','charge_start','observation'];
    if(startsPark.includes(a.kind)&&endsPark.includes(b.kind)&&a.odo!==null&&b.odo!==null&&a.odo===b.odo&&Math.abs(a.soc-b.soc)<=3)return 'park';
    return 'unknown';
  }
  function exposure(data,{maxGapHours=72,startMs=null,endMs=null}={}){
    const points=eventList(data);
    const lo=Number.isFinite(startMs)?startMs:-Infinity,hi=Number.isFinite(endMs)?endMs:Infinity;
    let parkHours=0,driveHours=0,chargeHours=0,unknownHours=0,ignoredHours=0;
    let above80Hours=0,above90Hours=0,weightedSocHours=0,parkIntervals=0;
    const intervals=[];
    for(let i=1;i<points.length;i++){
      const a=points[i-1],b=points[i];if(!(b.t>a.t))continue;
      const from=Math.max(a.t,lo),to=Math.min(b.t,hi);if(to<=from)continue;
      const full=(b.t-a.t)/msHour,h=(to-from)/msHour;
      if(full>maxGapHours){ignoredHours+=h;intervals.push({kind:'ignored',hours:h,from,to});continue;}
      const kind=classify(a,b);
      const alpha=(from-a.t)/(b.t-a.t),beta=(to-a.t)/(b.t-a.t);
      const p={t:from,soc:a.soc+(b.soc-a.soc)*alpha};
      const q={t:to,soc:a.soc+(b.soc-a.soc)*beta};
      if(kind==='park'){
        parkHours+=h;weightedSocHours+=h*(p.soc+q.soc)/2;
        above80Hours+=durationOver(p,q,80);above90Hours+=durationOver(p,q,90);parkIntervals++;
      }else if(kind==='drive')driveHours+=h;
      else if(kind==='charge')chargeHours+=h;
      else unknownHours+=h;
      intervals.push({kind,hours:h,from,to,startSoc:p.soc,endSoc:q.soc});
    }
    const coveredHours=parkHours,avgSoc=parkHours?weightedSocHours/parkHours:null;
    const above80Share=parkHours?above80Hours/parkHours*100:null;
    const above90Share=parkHours?above90Hours/parkHours*100:null;
    const total=parkHours+driveHours+chargeHours+unknownHours+ignoredHours;
    const knownShare=total?(parkHours+driveHours+chargeHours)/total*100:0;
    const confidence=parkHours>=24&&knownShare>=65&&parkIntervals>=3?'Yüksek':parkHours>=8&&knownShare>=30?'Orta':'Düşük';
    const cls=confidence==='Yüksek'?'good':confidence==='Orta'?'info':'warn';
    return{points,intervals,coveredHours,parkHours,driveHours,chargeHours,unknownHours,ignoredHours,knownShare,parkIntervals,avgSoc,above80Hours,above90Hours,above80Share,above90Share,confidence,cls,maxGapHours};
  }
  return{eventList,exposure,classify};
});
