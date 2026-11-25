/* Metals Terminal V4.9 — explicit per-visit source status and review dates.
   Snapshot dates never imply that the latest official publication has been fetched. */
(function(){
 "use strict";
 const noFuture=(date)=>/^\d{4}-\d{2}-\d{2}$/.test(date||"")&&date<=new Date(Date.now()+86400000).toISOString().slice(0,10);
 const dateText=date=>noFuture(date)?date:"sin fecha acreditada";
 const statusSet=window.metalsQualityDone||new Set();
 const asOf=()=>typeof nativePeriod!=="undefined"&&nativePeriod==="custom";
 const getLast=(rows)=>rows?.at?.(-1)?.date||null;
 const days=(date)=>date?Math.max(0,Math.floor((Date.now()-Date.parse(date+"T12:00:00Z"))/86400000)):null;
 const stale=(date,frequency)=>{
   if(asOf()||!noFuture(date))return false;
   const d=days(date);
   if(frequency==="diario")return typeof businessDaysSince==="function"&&businessDaysSince(date)>3;
   if(frequency==="macro")return typeof businessDaysSince==="function"&&businessDaysSince(date)>4;
   if(frequency==="semanal")return d>15;
   if(frequency==="trimestral")return d>140;
   if(frequency==="mensual")return d>42;
   return false;
 };
 const earliest=dates=>dates.filter(noFuture).sort()[0]||null;
 function buildRows(){
   const rawFutures=FUTURE_KEYS.map(k=>getLast(futuresCache[k]));
   const lastFuture=rawFutures.every(Boolean)?earliest(rawFutures):null;
   const sourceText=FUTURE_KEYS.map(k=>futuresFreshness[k]||"").find(Boolean)||"";
   const futuresState=typeof futuresCheckState==="string"?futuresCheckState:"pending";
   const futureMethod=futuresState==="live"?"Consulta Yahoo Finance · vía CORS":futuresState==="live-alternate"?"Consulta Aethereal":
    futuresState==="fallback"?(longFuturesProvenance==="yahoo"?"Caché Yahoo · fallo al renovar":longFuturesProvenance==="aethereal"?"Caché Aethereal · fallo al renovar":"Respaldo local · fallo al renovar"):
    sourceText.includes("guardado local")?"Caché validada · comprobando":"Comprobando futuros";
   const markets=["gold","silver","dxy","eur"].map(k=>nativeData[k]?.points?.at?.(-1)?.t);
   const marketDates=markets.filter(Number.isFinite).map(t=>new Date(t*1000).toISOString().slice(0,10));
   const allXaus=marketDates.length===4;
   const latestVix=getLast(cboeHistory)||null;
   const macroDates=MACRO_SERIES.map(k=>getLast(macro?.series?.[k]));
   const fullMacro=macroDates.every(Boolean);
   const macroDirect=macroOfficialKeys.size;
   const goldCot=getLast(v4State.cot?.gold),silverCot=getLast(v4State.cot?.silver);
   const cotDate=goldCot&&silverCot?earliest([goldCot,silverCot]):null;
   const sec=v4State.secHoldings? v4ETFPairs(v4Window().end):[];
   const secLast=sec.at(-1)||null;
   const secPublished=secLast?[secLast.gld.filed,secLast.slv.filed].sort().at(-1):null;
   const gvzDate=getLast(v4State.gvz);
   const wgc=v4State.flows?.gold,slv=v4State.flows?.silver;
   const indexAudit=window.metalsIndicesAudit||{pending:true,ready:false,mode:"Consulta Yahoo en curso"};
   const macroRelay=typeof macroFetchRoutes!=="undefined"&&[...macroFetchRoutes.values()].includes("relay");
   const group=(id,label,date,mode,frequency,note,ready=true)=>{
     const pending=id==="indices"?!!indexAudit.pending:!statusSet.has(["cot","gvz","sec","wgc","slv"].includes(id)?"v4":id);
     return {id,label,date,mode,frequency,note,ready,pending,stale:stale(date,frequency)};
   };
   const groups=[
     group("futures","Futuros GC/SI/HG/BZ",lastFuture,futureMethod,"diario","Cierres diarios de futuros continuos; sesión en curso excluida, sin empalmar proveedores."+(futuresState==="fallback"?" Error: "+String(futuresCheckError||"fuente no disponible").slice(0,300):""),!!lastFuture),
     group("indices","Índices bursátiles + Bitcoin",indexAudit.date||null,indexAudit.mode||"Sin datos","diario",indexAudit.note||"Se consultan los cinco índices y BTC al abrir.",!!indexAudit.ready),
     group("xaus","DXY · EUR/USD · XAU/XAG",allXaus?earliest(marketDates):null,allXaus?"Consulta XAUS del periodo":"Consulta XAUS parcial o no disponible","diario","Referencias indicativas; la ratio se calcula con XAU y XAG en fechas comunes.",allXaus),
     group("vix","VIX",latestVix,cboeHistorySource||"Respaldo reciente","diario","Cierres Cboe; el archivo puede tener lagunas reconocidas.",!!latestVix),
     group("macro","Treasury · TIPS · Fed/BCE",fullMacro?earliest(macroDates):null,macroDirect===6?(macroRelay?"FRED oficial vía CORS 6/6":"FRED directo 6/6"):macroDirect?"FRED mixto "+macroDirect+"/6":"Archivo FRED / respaldo","macro","El dato mostrado puede tener distinta fecha para cada serie; archivos GitHub solo cambian por actualización manual.",fullMacro),
     group("cot","COT · interés abierto",cotDate,v4State.cotSource||"CFTC pendiente","semanal","Informe CFTC semanal; el volumen diario CME no está integrado.",!!cotDate),
     group("gvz","GVZ oro",gvzDate,v4State.gvzSource||"GVZ pendiente","diario","La serie VXSLV no se reutiliza sin permiso de redistribución acreditado.",!!gvzDate),
     group("sec","ETF GLD/SLV",secLast?.date||null,"Archivo trimestral SEC, actualización manual","trimestral",secPublished?"Último informe conjunto publicado desde "+secPublished+"; tenencias, no flujos.":"Informes SEC aún no validados.",!!secLast),
     group("wgc","WGC · flujo mensual de oro",wgc?.observation_date||null,"Publicación mensual · revisión manual","mensual","Último informe oficial contrastado "+(v4State.flows?.snapshot_at||"—")+". Se revisa el nuevo mes; no se estiman flujos.",!!wgc),
     group("slv","iShares SLV · existencias",slv?.observation_date||null,"Corte oficial · revisión manual","diario","Dato oficial de existencias, no flujo; el acceso automatizado al emisor está bloqueado. Revisión "+(v4State.flows?.snapshot_at||"—")+".",!!slv)
   ];
   const first=rows=>rows?.[0]?.date||null;
   const max=items=>items.filter(Boolean).sort().at(-1)||null;
   const xausFirst=k=>{const t=nativeData[k]?.points?.[0]?.t;return Number.isFinite(t)?new Date(t*1000).toISOString().slice(0,10):null;};
   const starts={
    futures:max(FUTURE_KEYS.map(k=>first(futuresCache[k]))),
    indices:indexAudit.from||null,
    xaus:max(["gold","silver","dxy","eur"].map(xausFirst)),
    vix:first(cboeHistory),
    macro:max(MACRO_SERIES.map(k=>first(macro?.series?.[k]))),
    cot:max([first(v4State.cot?.gold),first(v4State.cot?.silver)]),
    gvz:first(v4State.gvz),
    sec:sec[0]?.date||null
   };
   const interval=v4Window();
   const extended=nativePeriod==="10y"||(nativePeriod==="custom"&&(Date.parse(interval.end)-Date.parse(interval.start))>2*365*86400000);
   const deadline=Date.parse(interval.start+"T00:00:00Z")+90*86400000;
   for(const g of groups){
    g.from=starts[g.id]||null;
    g.singleFact=["wgc","slv"].includes(g.id);
    g.manual=["sec","wgc","slv"].includes(g.id);
    g.blocked=!g.pending&&((g.id==="futures"&&futuresState==="fallback")||
     (g.id==="macro"&&macroDirect<6)||(g.id==="vix"&&!/Cboe (directo|oficial)/.test(g.mode))||
     (g.id==="gvz"&&!/Consulta/.test(g.mode))||(g.id==="cot"&&!/consulta directa/i.test(g.mode)));
    g.partial=(g.id==="indices"&&!!indexAudit.partial)||(extended&&g.ready&&!g.singleFact&&(!g.from||Date.parse(g.from+"T00:00:00Z")>deadline));
   }
   for(const r of Object.values(window.metalsV5Audit||{})){
     groups.push({id:r.id,label:r.label,date:r.date||null,from:r.from||null,mode:r.mode||"Consultando",frequency:r.frequency,note:r.note||"",ready:!!r.ready,pending:!!r.pending,stale:stale(r.date,r.frequency),partial:!!r.partial,blocked:!!r.blocked,manual:false,singleFact:false});
   }
   return groups;

 }
 function badgeText(r){
  if(r.pending)return "Consultando";
  if(!r.ready)return "Sin dato";
  if(r.blocked)return "Respaldo · fallo";
  if(r.partial)return "Cobertura parcial";
  if(r.stale)return "Revisar fecha";
  if(r.manual)return "Revisión manual";
  if(r.singleFact&&nativePeriod==="10y")return "Dato puntual";
  if(asOf())return "Corte histórico";
  if(r.mode.startsWith("Caché"))return "Caché";
  if(r.mode.startsWith("FRED mixto"))return "Mixto";
  if(/direct|Consulta |FRED oficial|Cboe oficial/i.test(r.mode))return "Consultado";
  return "Archivo";
 }
 function badge(r){
  const el=document.createElement("span");
  el.className="source-quality "+(!r.ready?"missing":r.partial||r.stale||r.blocked?"delayed":r.pending?"pending":"available");
  el.textContent=badgeText(r);
  el.title=r.label+" · "+r.mode+" · cobertura "+(r.from?dateText(r.from)+" a ":"")+dateText(r.date)+" · "+r.note+(r.partial?" · cobertura o conjunto incompleto":"")+(r.pending?" · consulta todavía en curso":"");
  el.setAttribute("aria-label",el.title);
  el.dataset.qualityFor=r.id;
  return el;
 }
 function putBadge(target,r){
   if(!target)return;
   target.querySelectorAll(":scope > .source-quality").forEach(el=>el.remove());
   target.appendChild(badge(r));
 }
 function paintBadges(groups){
  const byId=Object.fromEntries(groups.map(r=>[r.id,r]));
  const cardBadge=(selector,key)=>{
    const card=document.querySelector(selector);
    if(!card)return;
    const caption=card.querySelector(".card-caption");
    if(!caption)return;
    if(!caption.querySelector(".caption-copy")){
      const copy=document.createElement("span");
      copy.className="caption-copy";copy.textContent=caption.textContent;
      caption.textContent="";caption.appendChild(copy);
    }
    putBadge(caption,byId[key]);
  };
  const putCard=(key,source)=>{
    const card=document.getElementById("q-"+key)?.closest(".ticker-card");
    const caption=card?.querySelector(".card-caption");
    if(!caption)return;
    if(!caption.querySelector(".caption-copy")){
      const wrap=document.createElement("span");wrap.className="caption-copy";
      wrap.textContent=caption.textContent.trim();caption.textContent="";caption.appendChild(wrap);
    }
    putBadge(caption,source);
  };
  for(const key of ["gold","silver","copper","brent"]){
    putCard(key,byId.futures);
  }
  for(const key of ["dxy","eur"]){
    putCard(key,byId.xaus);
  }
  putCard("vix",byId.vix);
  putBadge(document.querySelector("#comparativa .main-title-extra"),byId.futures);
  putBadge(document.querySelector(".ratio-panel .main-title-extra"),byId.xaus);
  putBadge(document.querySelector(".indices-panel .indices-subtitle"),byId.indices);
  for(const id of ["vixterm","nfci","inflation","comex"]){if(byId["v5-"+id])putBadge(document.getElementById("v5-"+id+"-dates"),byId["v5-"+id]);}
  putBadge(document.getElementById("curve-caption"),byId.macro);
  putBadge(document.getElementById("real-dates"),byId.macro);
  putBadge(document.getElementById("policy-dates"),byId.macro);
  for(const [id,key] of [["v4-cot-dates","cot"],["v4-oi-dates","cot"],["v4-volatility-dates","gvz"],["v4-flows-dates","sec"]]){
    putBadge(document.getElementById(id),byId[key]);
  }
 }
 let report=null;
 function htmlEscape(s){return String(s??"").replace(/[&<>"']/g,x=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[x]));}
 function rowTable(groups){
   return '<div class="source-audit-table" role="table" aria-label="Fuentes, modo de consulta y antigüedad">'+groups.map(r=>{
     const text=r.pending?"Consulta en curso":!r.ready?"Sin datos validados":r.blocked?"Fallo · respaldo":r.partial?"Cobertura parcial":r.stale?"Revisar publicación":r.manual?"Revisión manual":r.singleFact?"Hecho puntual":"Consultado";
     return '<div class="source-audit-row" role="row"><div class="source-audit-name">'+htmlEscape(r.label)+'</div><div class="source-audit-method">'+htmlEscape(r.mode)+'</div><div class="source-audit-date">'+htmlEscape((r.from?dateText(r.from)+" → ":"")+dateText(r.date))+'</div><div class="source-audit-state">'+htmlEscape(text)+'</div></div>';
   }).join("")+'</div>';
 }
 function paintReport(groups){
   const full=groups.filter(r=>r.ready).length,pending=groups.filter(r=>r.pending).length;
   const failures=groups.filter(r=>r.blocked||(!r.ready&&!r.pending)).length,manual=groups.filter(r=>r.manual).length;
   if(report){
     report.querySelector(".source-report-summary").textContent=(pending?pending+" grupos aún consultándose":"Consultas finalizadas")+" · "+full+"/"+groups.length+" grupos con registros · "+failures+" fallos o respaldos · "+manual+" de revisión manual · "+groups.filter(r=>r.stale).length+" con fecha a revisar.";
     report.querySelector(".source-report-table").innerHTML=rowTable(groups);
   }
   const inside=document.getElementById("source-audit-content");
   if(inside)inside.innerHTML=rowTable(groups);
 }
 let repaintScheduled=false;
 function paint(){
  repaintScheduled=false;
  try{const groups=buildRows();paintBadges(groups);paintReport(groups);}catch(e){console.warn("Informe de frescura no disponible",e);}
 }
 function queuePaint(){if(repaintScheduled)return;repaintScheduled=true;requestAnimationFrame(paint);}
 window.renderMetalsQuality=queuePaint;
 // Compact and accessible source details in the existing methodology dialog.
 const method=document.querySelector("#modal .method");
 if(method){
  const section=document.createElement("section");section.className="source-audit-method";
  section.innerHTML='<h3>Estado de las fuentes en esta consulta</h3><p>Fecha efectiva, resultado de la consulta y periodicidad. Se intenta renovar las fuentes de mercado y oficiales al abrir; «Consultado» no significa tiempo real. SEC, WGC e iShares son archivos revisados manualmente con enlace a su publicación. Las consultas fallidas conservan su respaldo, explícitamente etiquetado.</p><div id="source-audit-content"></div>';
  method.prepend(section);
 }
 if(typeof FORCE_MARKET_RECHECK!=="undefined"&&FORCE_MARKET_RECHECK){
   report=document.createElement("details");
   report.className="source-refresh-report";report.open=false;
   report.innerHTML='<summary>Resultado de «Actualizar todo» <span class="source-report-summary"></span></summary><div class="source-report-table"></div><p>Se intenta renovar la lectura desde las fuentes accesibles; consulta los estados finales antes de concluir que han respondido. Los archivos históricos publicados en GitHub se actualizan por separado y NO se modifican al pulsar este botón. El navegador puede bloquear algunas respuestas o el proveedor puede no haber publicado datos nuevos.</p>';
   document.querySelector(".header")?.insertAdjacentElement("afterend",report);
 }
 // Renders are the only source of data updates; no independent interval/polling.
 for(const key of ["renderV4","v4RenderFlows","renderMacro","renderCurve","renderReals","renderPolicy","renderFuturesCards","renderBrowserQuotes","renderVixCard","refreshVixViews"]){
   const original=window[key];
   if(typeof original!=="function")continue;
   window[key]=function(...args){const value=original.apply(this,args);queuePaint();return value;};
 }
 queuePaint();
})();
