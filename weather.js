(function(){
  'use strict';

  function position(options={}){
    return new Promise((resolve,reject)=>{
      if(!navigator.geolocation)return reject(new Error('Bu tarayıcı konum bilgisini desteklemiyor.'));
      navigator.geolocation.getCurrentPosition(
        p=>resolve({lat:p.coords.latitude,lon:p.coords.longitude,accuracy:p.coords.accuracy}),
        err=>reject(new Error(err.code===1?'Konum izni verilmedi.':err.code===2?'Konum belirlenemedi.':'Konum alınırken zaman aşımı oluştu.')),
        {enableHighAccuracy:false,timeout:10000,maximumAge:10*60*1000,...options}
      );
    });
  }

  async function fetchJson(url){
    const r=await fetch(url,{cache:'no-store'});
    if(!r.ok)throw new Error(`Hava servisi HTTP ${r.status}`);
    return r.json();
  }

  async function openMeteoCurrent(lat,lon){
    const q=new URLSearchParams({
      latitude:String(lat),longitude:String(lon),
      current:'temperature_2m,relative_humidity_2m,apparent_temperature,is_day',
      timezone:'auto'
    });
    const data=await fetchJson(`https://api.open-meteo.com/v1/forecast?${q}`);
    if(!data.current||!Number.isFinite(Number(data.current.temperature_2m)))throw new Error('Sıcaklık verisi alınamadı.');
    return{
      source:'open-meteo',sourceLabel:'Open-Meteo · cihaz konumu',
      temperature:Number(data.current.temperature_2m),
      apparentTemperature:Number(data.current.apparent_temperature),
      humidity:Number(data.current.relative_humidity_2m),
      observedAt:data.current.time||new Date().toISOString(),
      timezone:data.timezone||'',
      isDay:Boolean(data.current.is_day),
      // coordinates are returned only for transient calculations; caller must not persist them.
      _coords:{lat,lon}
    };
  }

  async function openMeteoForecast(lat,lon,days=7){
    const q=new URLSearchParams({
      latitude:String(lat),longitude:String(lon),
      hourly:'temperature_2m,relative_humidity_2m,apparent_temperature',
      forecast_days:String(Math.max(1,Math.min(16,days))),
      timezone:'auto'
    });
    const data=await fetchJson(`https://api.open-meteo.com/v1/forecast?${q}`);
    const time=data.hourly?.time||[],temp=data.hourly?.temperature_2m||[],app=data.hourly?.apparent_temperature||[],hum=data.hourly?.relative_humidity_2m||[];
    return{
      source:'open-meteo',sourceLabel:'Open-Meteo · cihaz konumu',timezone:data.timezone||'',
      hourly:time.map((t,i)=>({time:t,temperature:Number(temp[i]),apparentTemperature:Number(app[i]),humidity:Number(hum[i])})),
      _coords:{lat,lon}
    };
  }

  async function currentFromLocation(){
    const p=await position();
    return openMeteoCurrent(p.lat,p.lon);
  }

  async function forecastFromLocation(days=7){
    const p=await position();
    return openMeteoForecast(p.lat,p.lon,days);
  }

  function mgmReferenceUrl(city='ANKARA'){
    const clean=String(city||'ANKARA').trim().toLocaleUpperCase('tr-TR')
      .replaceAll('Ç','C').replaceAll('Ğ','G').replaceAll('İ','I').replaceAll('Ö','O').replaceAll('Ş','S').replaceAll('Ü','U').replace(/\s+/g,'');
    return `https://www.mgm.gov.tr/tahmin/saatlik.aspx?m=${encodeURIComponent(clean||'ANKARA')}`;
  }

  window.T10XWeather={position,currentFromLocation,forecastFromLocation,openMeteoCurrent,openMeteoForecast,mgmReferenceUrl};
})();
