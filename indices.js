/* Metals Terminal V4.7 — five actual stock indices. Native SVG, no embedded widgets.
   Yahoo chart API is unofficial; CORS relay is free and may fail or change.
   Fetch in each visitor's browser; no local price archives or paid subscriptions. */
(function(){
 "use strict";
 const LIST=[
  {symbol:"^GSPC",name:"S&P 500",label:"S&P 500",color:"#42b8e5"},
  {symbol:"^IXIC",name:"Nasdaq Composite",label:"Nasdaq Comp.",color:"#e9ac45"},
  {symbol:"^DJI",name:"Dow Jones Industrial Average",label:"Dow Jones",color:"#b88df0"},
  {symbol:"^RUT",name:"Russell 2000",label:"Russell 2000",color:"#58ca91"},
  {symbol:"^STOXX50E",name:"EURO STOXX 50",label:"EURO STOXX 50",color:"#ed7d8a"}
 ];
 const SOURCE="https://finance.yahoo.com/markets/world-indices/";
 const PROXY="https://proxy.cors.dev/";
 const RANGES={"3d":"5d","5d":"5d","2w":"1mo","1mo":"1mo","3mo":"3mo","6mo":"6mo","1y":"1y","2y":"2y","5y":"5y","10y":"10y"};
 const cache=new Map();
 let activeKey="",generation=0,inflight=false,plot=null;
 const el=id=>document.getElementById(id);
 const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const currentPeriod=()=>typeof nativePeriod==="string"?nativePeriod:"1mo";
 const currentLabel=()=>typeof activePeriodLabel==="function"?activePeriodLabel():"1M";
 const dateWindow=()=>currentPeriod()==="custom"&&typeof customRange==="object"?customRange:null;
 const dateString=stamp=>new Date(stamp*1000).toISOString().slice(0,10);
 function providerRange(){
  const p=currentPeriod();
  if(p!=="custom")return RANGES[p]||"1mo";
  const first=dateWindow()?.from;
  if(!first)return "1mo";
  const age=(Date.now()-Date.parse(first+"T00:00:00Z"))/86400000;
  return age>1825?"10y":age>730?"5y":age>365?"2y":age>180?"1y":age>90?"6mo":age>31?"3mo":"1mo";
 }
 function parseData(raw,item){
  if(raw?.chart?.error)throw Error("fuente: "+String(raw.chart.error.description||"error"));
  const record=raw?.chart?.result?.[0];
  if(!record||String(record.meta?.symbol||"").toUpperCase()!==item.symbol.toUpperCase())
   throw Error("ticker discrepante");
  const t=record.timestamp,c=record.indicators?.quote?.[0]?.close;
  if(!Array.isArray(t)||!Array.isArray(c)||t.length!==c.length)throw Error("esquema histórico inválido");
  const map=new Map(),now=Date.now()/1000;
  for(let i=0;i<t.length;i++){
   const timestamp=Number(t[i]),close=c[i]===null?NaN:Number(c[i]);
   if(!Number.isFinite(timestamp)||timestamp<946684800||timestamp>now+86400||
      !Number.isFinite(close)||close<=0||close>1000000)continue;
   const date=dateString(timestamp);
   if(map.has(date))throw Error("fecha de cierre duplicada");
   map.set(date,{date,t:timestamp,c:close});
  }
  const points=[...map.values()].sort((a,b)=>a.date.localeCompare(b.date));
  if(points.length<2)throw Error("sin cierres diarios suficientes");
  return {item,points};
 }
 async function fetchIndex(item,range){
  const query="https://query1.finance.yahoo.com/v8/finance/chart/"+
   encodeURIComponent(item.symbol)+"?"+new URLSearchParams({range,interval:"1d"});
  const abort=new AbortController(),timer=setTimeout(()=>abort.abort(),24000);
  try{
   const response=await fetch(PROXY+query,{mode:"cors",credentials:"omit",cache:"default",signal:abort.signal});
   if(!response.ok)throw Error("HTTP "+response.status);
   return parseData(await response.json(),item);
  }finally{clearTimeout(timer);}
 }
 function empty(message,failed){
  plot=null;
  marketChartCache.delete("indices-comparison");
  const host=el("indices-comparison");
  if(host){host.innerHTML='<div class="native-error" role="status">'+escapeHTML(message)+'</div>';
   host.dataset.indicesState=failed?"unavailable":"insufficient";}
 }
 function draw(results){
  const foot=el("indices-window"),host=el("indices-comparison");
  if(!foot||!host)return;
  const available=results.filter(x=>x?.points?.length>=2);
  const missing=LIST.filter(item=>!available.some(a=>a.item.symbol===item.symbol));
  if(available.length<2){
   empty("No hay suficientes cierres reales de los índices. La consulta gratuita está bloqueada o no disponible.",true);
   foot.textContent=currentLabel()+" · datos no disponibles";return;
  }
  const maps=available.map(z=>new Map(z.points.map(p=>[p.date,p])));
  const common=[...maps[0].keys()].filter(d=>maps.slice(1).every(m=>m.has(d))).sort();
  if(common.length<2){
   empty("Los índices carecen de dos sesiones bursátiles coincidentes; no se interpolan festivos.",true);
   foot.textContent=currentLabel()+" · calendarios no coincidentes";return;
  }
  const p=currentPeriod(),range=dateWindow(),end=common.at(-1);
  const cutoff=p==="custom"&&range?Date.parse(range.from+"T00:00:00Z")/1000:
   periodCutoff(Date.parse(end+"T00:00:00Z")/1000,p);
  const days=common.filter(d=>Date.parse(d+"T00:00:00Z")/1000>=cutoff&&(!range||d<=range.to));
  if(days.length<2){
   empty("No hay dos cierres comunes en "+currentLabel()+". Selecciona un periodo mayor.",true);
   foot.textContent=currentLabel()+" · cobertura insuficiente";return;
  }
  const requestedStart=p==="custom"&&range?range.from:dateString(cutoff);
  const requestedDays=Math.max(1,(Date.parse(end+"T00:00:00Z")-Date.parse(requestedStart+"T00:00:00Z"))/86400000);
  const uncoveredDays=Math.max(0,(Date.parse(days[0]+"T00:00:00Z")-Date.parse(requestedStart+"T00:00:00Z"))/86400000);
  const shortCoverage=uncoveredDays>Math.max(4,requestedDays*.28);
  const stale=(Date.now()-Date.parse(days.at(-1)+"T00:00:00Z"))/86400000>14;
  const coverageNotice=(shortCoverage?" Histórico temporal incompleto para "+currentLabel()+".":"")+
   (stale?" Última observación antigua; comprobar frescura.":"");
  const dateTimes=days.map(d=>Date.parse(d+"T18:00:00Z")/1000);
  const lines=available.map((entry,i)=>{
   const map=maps[i],start=map.get(days[0]).c;
   return {label:entry.item.label,color:entry.item.color,
    points:days.map(d=>100*(map.get(d).c/start-1))};
  });
  const warning=missing.length?" Cobertura parcial, faltan "+missing.map(m=>m.name).join(", ")+".":"";
  const html='<span>Índices de precios · cierre diario · variación acumulada desde '+
   days[0]+' (base 0 %). '+days.length+' sesiones comunes, sin interpolaciones.'+
   escapeHTML(warning+coverageNotice)+' No incluye dividendos ni conversión de divisa. '+
   'Fuente: Yahoo Finance (API pública no oficial vía proxy cors.dev). '+
   '<a href="'+SOURCE+'" target="_blank" rel="noopener noreferrer">Consultar fuente</a>.</span>';
  plot={lines,dates:dateTimes,note:html,count:days.length,first:days[0],last:days.at(-1),missing};
  nativeChart("indices-comparison",lines,dateTimes,"%",html);
  host.dataset.indicesState=missing.length?"partial":"complete";
  host.dataset.indicesCount=String(available.length);
  host.dataset.indicesLast=days.at(-1);
  foot.textContent=currentLabel()+" · "+days.length+" cierres comunes · "+days[0]+" a "+days.at(-1)+
   " · "+available.length+"/5 índices"+(shortCoverage?" · histórico parcial":"")+(stale?" · revisar frescura":"");
  if(typeof detailKind!=="undefined"&&detailKind==="indices"&&el("detail-overlay")&&!el("detail-overlay").hidden)
   drawMarketDetail();
 }
 async function render(force=false){
  const host=el("indices-comparison"),foot=el("indices-window");
  if(!host||!foot)return;
  const p=currentPeriod(),r=dateWindow(),key=p+"|"+(r?r.from+"|"+r.to:"");
  foot.textContent="Periodo "+currentLabel()+" · cierres diarios";
  if(p==="1d"){
   activeKey=key;generation++;inflight=false;
   empty("La vista 1D requiere datos intradía que no ofrece esta comparación de cierres diarios. Selecciona 3D o un periodo superior.");
   return;
  }
  if(key===activeKey&&plot){
   if(force)draw(cache.get(providerRange())?.values||[]);
   else foot.textContent=currentLabel()+" · "+plot.count+" cierres comunes · "+plot.first+" a "+plot.last+
    " · "+(5-plot.missing.length)+"/5 índices";
   return;
  }
  if(key===activeKey&&inflight)return;
  activeKey=key;
  const range=providerRange(),cached=cache.get(range);
  if(cached&&Date.now()-cached.fetched<8*60000){draw(cached.values);return;}
  const token=++generation;
  inflight=true;
  empty("Consultando cierres diarios de los cinco índices…");
  const values=await Promise.all(LIST.map(item=>fetchIndex(item,range).catch(error=>{
   console.warn("[Índices] "+item.symbol+": "+String(error?.message||error));return null;
  })));
  if(token!==generation||key!==activeKey)return;
  inflight=false;
  if(values.filter(Boolean).length>=2)cache.set(range,{fetched:Date.now(),values});
  draw(values);
 }
 function showDetail(host,foot){
  if(!host)return;
  host.classList.remove("macro-focus-chart");
  host.classList.add("indices-detail-chart");
  if(plot){
   nativeChart("detail-chart",plot.lines,plot.dates,"%",plot.note);
   if(foot)foot.textContent="Yahoo Finance · "+(5-plot.missing.length)+"/5 índices · "+
    plot.count+" sesiones de cierre comunes · "+plot.first+" a "+plot.last+
    " · variación porcentual base 0 % · sin conversión de moneda ni dividendos.";
  }else{
   host.innerHTML='<div class="native-error">No hay comparación de índices contrastada para '+escapeHTML(currentLabel())+'.</div>';
   if(foot)foot.textContent="Solo datos de cierre; no se muestran series ficticias.";
  }
 }
 window.renderIndicesPanel=render;
 window.drawIndicesDetail=showDetail;
 window.openIndicesDetail=()=>{};
 window.closeIndicesDetail=()=>el("detail-chart")?.classList.remove("indices-detail-chart");
 window.METALS_INDICES_SYMBOLS=LIST.map(x=>x.symbol);
 window.METALS_INDICES_PROVIDER=SOURCE;
 render();
})();