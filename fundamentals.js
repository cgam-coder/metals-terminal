/* V5.0: native supplemental charts, public data read on every entry.
   No cron, paid APIs, repository mirrors, synthetic prices, or access bypass.
   Cboe/FRED citation and visible MetalCharts credit preserved. */
(function(){
"use strict";
const FRED="https://fred.stlouisfed.org/graph/fredgraph.csv";
const METAL="https://metalcharts.org/data/comex-gold-silver-registered-eligible-weekly.csv";
const CREDIT="https://metalcharts.org/data#comex-gold-silver-registered-eligible-weekly";
const META={
 vixterm:{label:"Estructura temporal VIX",frequency:"diario",ids:["VIXCLS","VXVCLS"],names:["VIX 30D","VIX 3M"],colors:["#fb6571","#38c9e5"],unit:"%",note:"Cboe vía FRED · cierres diarios comunes · no futuros VIX."},
 nfci:{label:"Condiciones financieras NFCI / ANFCI",frequency:"semanal",ids:["NFCI","ANFCI"],names:["NFCI","ANFCI"],colors:["#38c9e5","#b88aff"],unit:"",note:"Federal Reserve Bank of Chicago vía FRED · índice semanal · cero = media."},
 inflation:{label:"Inflación de EE. UU.",frequency:"mensual",ids:["CPIAUCSL","CPILFESL","PCEPILFE"],names:["IPC general","IPC suby.","PCE suby."],colors:["#fb6571","#f4ba3c","#38c9e5"],unit:"%",note:"BLS / BEA vía FRED · interanual, índices desestacionalizados · fecha de referencia, no publicación."},
 comex:{label:"Inventarios físicos COMEX",frequency:"semanal",names:["Oro","Plata"],colors:["#f4ba3c","#a3c4e5"],unit:"%",note:"MetalCharts.org · informes CME, último disponible de cada semana ISO. No es stock mundial."}
};
const cachePrefix="metals-v5-data-v1-";
const datasets=new Map(),status=new Map();
const el=id=>document.getElementById(id),day=()=>new Date().toISOString().slice(0,10);
const validDay=d=>typeof d==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(d)&&Number.isFinite(Date.parse(d+"T00:00:00Z"))&&new Date(d+"T00:00:00Z").toISOString().slice(0,10)===d&&d<=day();
const ago=(date,years,months=0)=>{const d=new Date(date+"T12:00:00Z");d.setUTCFullYear(d.getUTCFullYear()-years);d.setUTCMonth(d.getUTCMonth()-months);return d.toISOString().slice(0,10);};
const fmtN=(n,d=2)=>new Intl.NumberFormat("es-ES",{maximumFractionDigits:d,minimumFractionDigits:d}).format(n);
const num=s=>s!==undefined&&String(s).trim()!==""&&String(s).trim()!=="."?Number(s):NaN;
const escape=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const sortRows=(rows)=>rows.sort((a,b)=>a.date.localeCompare(b.date));
const monthPrev=(date)=>{const y=Number(date.slice(0,4))-1;return y+date.slice(4);};
function fredRows(raw,id){
 const lines=raw.trim().replace(/^\uFEFF/,"").split(/\r?\n/),head=lines.shift()?.split(",");
 if(head?.length!==2||!["observation_date","DATE"].includes(head[0])||head[1]!==id)throw Error(id+": identidad CSV incorrecta");
 const rows=[],seen=new Set(),monthly=["CPIAUCSL","CPILFESL","PCEPILFE"].includes(id),weekly=["NFCI","ANFCI"].includes(id);
 for(const line of lines){
  const [date,str]=line.split(","),value=num(str);
  if(!Number.isFinite(value))continue;
  if(!validDay(date)||seen.has(date)||(monthly&&!date.endsWith("-01"))||(weekly?(value< -20||value>20):(value<=0||value>10000)))throw Error(id+": dato inválido o duplicado");
  seen.add(date);rows.push({date,value});
 }
 sortRows(rows);
 const min=monthly?125:weekly?500:2200;
 if(rows.length<min||rows[0].date>ago(day(),10,10))throw Error(id+": histórico insuficiente");
 if(!monthly)return rows;
 const m=new Map(rows.map(r=>[r.date,r.value]));
 return rows.filter(r=>m.has(monthPrev(r.date))).map(r=>({date:r.date,value:100*(r.value/m.get(monthPrev(r.date))-1)}));
}
function comexRows(raw){
 const lines=raw.trim().replace(/^\uFEFF/,"").split(/\r?\n/);
 if(lines.shift()!=="week_start,metal,report_date,registered_oz,eligible_oz,total_oz")throw Error("COMEX: cabecera incorrecta");
 const result={gold:[],silver:[]},seen=new Set();
 for(const line of lines){
  const [week,metal,date,r,e,t]=line.split(",");
  if(!Object.hasOwn(result,metal)||!validDay(week)||!validDay(date)||new Date(week+"T00:00:00Z").getUTCDay()!==1||
    date<week||Date.parse(date)-Date.parse(week)>6*86400000||seen.has(metal+"|"+week))throw Error("COMEX: fecha o metal incorrectos");
  const registered=num(r),eligible=num(e),total=num(t);
  if(![registered,eligible,total].every(Number.isFinite)||registered<0||eligible<0||total<=0||
      Math.abs(registered+eligible-total)>Math.max(.01,total*1e-8))throw Error("COMEX: totales incoherentes");
  seen.add(metal+"|"+week);result[metal].push({date,registered,eligible,total});
 }
 for(const metal of ["gold","silver"]){sortRows(result[metal]);if(result[metal].length<12)throw Error("COMEX: histórico insuficiente "+metal);}
 return [result.gold,result.silver];
}
function parse(id,raw){
 return id==="comex"?comexRows(raw[0]):META[id].ids.map((key,i)=>fredRows(raw[i],key));
}
function commonRows(series){
 if(!series?.length)return [];
 const maps=series.map(a=>new Map(a.map(r=>[r.date,r])));
 return series[0].filter(r=>maps.every(m=>m.has(r.date))).map(r=>({date:r.date,values:maps.map(m=>m.get(r.date))}));
}
function loadSaved(id){
 try{
  const saved=JSON.parse(localStorage.getItem(cachePrefix+id)||"null");
  if(!saved||!Array.isArray(saved.raw)||saved.raw.length!==(id==="comex"?1:META[id].ids.length)||saved.raw.some(s=>typeof s!=="string"||s.length>600000))return;
  const series=parse(id,saved.raw);if(commonRows(series).length<2)return;
  datasets.set(id,series);
 }catch(e){/* invalid or inaccessible local cache: keep no data */}
}
function save(id,raw){try{localStorage.setItem(cachePrefix+id,JSON.stringify({raw}));}catch(e){/* storage is optional */}}
function accept(id,raw){
 const series=parse(id,raw),shared=commonRows(series);
 if(shared.length<2)throw Error("No hay dos fechas comunes");
 const old=datasets.get(id);
 if(old&&series.some((s,i)=>s.at(-1).date<old[i].at(-1).date))throw Error("La respuesta retrocede frente al respaldo");
 datasets.set(id,series);save(id,raw);
}
async function metalCSV(){
 const request=url=>fetch(url,{mode:"cors",credentials:"omit",cache:"no-store",signal:AbortSignal.timeout(22000)});
 let res,via="direct";
 try{res=await request(METAL);}catch(e){res=await request("https://proxy.cors.dev/"+METAL);via="relay";}
 if(!res.ok)throw Error("MetalCharts HTTP "+res.status);
 const raw=await res.text();if(raw.length<100||raw.length>600000)throw Error("CSV COMEX incorrecto");
 return {raw,via};
}
async function refresh(id){
 try{
  const entries=id==="comex"?[await metalCSV()]:await Promise.all(META[id].ids.map(key=>fetchPublicOfficialCSV(FRED+"?"+new URLSearchParams({id:key,cosd:ago(day(),11,2)}))));
  accept(id,entries.map(x=>x.raw));
  status.set(id,{pending:false,blocked:false,mode:"Consulta "+(id==="comex"?"MetalCharts":"FRED")+(entries.some(x=>x.via==="relay")?" · vía CORS":" directa")});
 }catch(e){
  status.set(id,{pending:false,blocked:datasets.has(id),mode:datasets.has(id)?"Caché validada · fallo al renovar":"Consulta fallida",error:String(e?.message||e).slice(0,180)});
  console.warn("[V5] "+id,e);
 }
 renderOne(id);window.renderMetalsQuality?.();
 if(typeof detailKind==="string"&&detailKind==="v5-"+id&&!el("detail-overlay")?.hidden)drawDetail(detailKind,el("detail-chart"),el("detail-foot"));
}
let stock="registered";
const stockLabel=()=>({registered:"Registrado",eligible:"Elegible",total:"Total"}[stock]);
function describe(id,row){
 if(!row)return "Sin dato en el corte seleccionado";
 if(id==="comex")return "Oro "+fmtN(row.values[0][stock]/1e6,2)+" M oz · Plata "+fmtN(row.values[1][stock]/1e6,2)+" M oz · "+stockLabel();
 const m=META[id];
 return row.values.map((r,i)=>m.names[i]+" "+fmtN(r.value,id==="nfci"?3:2)+m.unit).join(" · ");
}
function periodRows(id){
 const all=commonRows(datasets.get(id)),w=v4Window();
 const available=all.filter(r=>r.date<=w.end),rows=available.filter(r=>r.date>=w.start),last=available.at(-1);
 return {all,rows,last,w};
}
function buildPlot(id,rows){
 const meta=META[id],dates=rows.map(r=>Date.parse(r.date+"T12:00:00Z")/1000);
 const lines=meta.names.map((name,i)=>{
  let points=rows.map(r=>id==="comex"?r.values[i][stock]:r.values[i].value);
  if(id==="comex"){const base=points[0];if(base<=0)throw Error("Base no positiva");points=points.map(v=>100*(v/base-1));}
  return {label:name,color:meta.colors[i],points};
 });
 const note=id==="comex"?"Variación desde la primera fecha común (base 0 %). <a href='"+CREDIT+"' target='_blank' rel='noopener noreferrer'>MetalCharts.org</a> · CME · semanal.":id==="vixterm"?"Cboe vía FRED (VIXCLS y VXVCLS), cierres diarios. © Cboe; cita requerida.":meta.note;
 return {lines,dates,unit:meta.unit,note,options:id==="nfci"||id==="comex"?{baseline:0}:{}};
}
function renderOne(id){
 const meta=META[id],h=el("v5-"+id+"-chart"),state=el("v5-"+id+"-state"),datesEl=el("v5-"+id+"-dates");if(!h||!state||!datesEl)return;
 const {all,rows,last,w}=periodRows(id),s=status.get(id)||{pending:true,mode:"Consultando"};
 const first=all[0]?.date||null,end=all.at(-1)?.date||null;
 // A series starting well after the selected interval is partial, not full 10A.
 const tolerance=meta.frequency==="mensual"?40:meta.frequency==="semanal"?12:5;
 const partial=!!(first&&Date.parse(first)-Date.parse(w.start)>tolerance*86400000);
 const stateCopy=last?(rows.length?describe(id,last):"Anterior al periodo · "+describe(id,last)):(s.pending?"Consultando fuente…":"Sin observaciones validadas");
 state.textContent=stateCopy+(s.blocked?" · respaldo":s.pending&&last?" · comprobando":"");
 datesEl.textContent=(last?(rows.length?"Último ":"Anterior ")+last.date:"Sin fecha")+(partial?" · cobertura parcial desde "+first:"")+(id==="comex"?" · semanal":"");
 datesEl.title=meta.note+" "+(s.error||"")+(first&&end?" · cobertura "+first+" a "+end:"");
 window.metalsV5Audit["v5-"+id]={id:"v5-"+id,label:meta.label,frequency:meta.frequency,ready:all.length>=2,pending:!!s.pending,blocked:!!s.blocked,partial,date:end,from:first,mode:s.mode,note:meta.note+(s.error?" · "+s.error:"")};
 marketChartCache.delete("v5-"+id+"-chart");
 if(rows.length<2||nativePeriod==="1d"){
  h.innerHTML='<div class="native-error">'+escape(s.pending&&!last?"Consultando…":nativePeriod==="1d"?"No hay datos intradía de esta serie; consulta un intervalo mayor.":rows.length===1?"Una observación real en el periodo. Selecciona un intervalo más amplio.":last?"No hay observaciones dentro del intervalo. Se muestra la última referencia anterior.":"Sin datos contrastados para este intervalo.")+'</div>';
 }else{
  try{const p=buildPlot(id,rows);nativeChart("v5-"+id+"-chart",p.lines,p.dates,p.unit,p.note,p.options);}
  catch(e){h.innerHTML='<div class="native-error">No se puede calcular la serie con los datos disponibles.</div>';}
 }
 window.renderMetalsQuality?.();
}
function drawDetail(kind,host,foot){
 const id=kind.slice(3),meta=META[id];if(!meta)return;
 host.classList.remove("macro-focus-chart","v4-etf-detail","indices-detail-chart");
 const {rows,last}=periodRows(id),plot=marketChartCache.get("v5-"+id+"-chart");
 if(!plot||rows.length<2||nativePeriod==="1d"){
  host.innerHTML='<div class="native-error">'+escape(last?describe(id,last)+" · "+last.date+". No hay dos observaciones dentro del periodo.":"Sin datos validados.")+'</div>';
 }else nativeChart("detail-chart",plot.lines,plot.dates,plot.unit,plot.sub,plot.options||{});
 foot.textContent=meta.note+(id==="comex"?" · "+stockLabel()+" · "+(last?describe(id,last):""):"")+" · "+activePeriodLabel()+" · "+(last?last.date:"Sin fecha");
}
window.metalsV5Audit={};
window.metalsV5Titles=Object.fromEntries(Object.entries(META).map(([k,v])=>["v5-"+k,v.label]));
window.renderMetalsV5=()=>Object.keys(META).forEach(renderOne);
window.drawMetalsV5Detail=drawDetail;
document.querySelectorAll("[data-v5-stock]").forEach(b=>b.addEventListener("click",()=>{
 stock=b.dataset.v5Stock;document.querySelectorAll("[data-v5-stock]").forEach(x=>x.setAttribute("aria-pressed",String(x===b)));
 renderOne("comex");if(detailKind==="v5-comex"&&!el("detail-overlay")?.hidden)drawDetail(detailKind,el("detail-chart"),el("detail-foot"));
}));
for(const id of Object.keys(META)){loadSaved(id);status.set(id,{pending:true,mode:"Comprobando fuente"});}
window.renderMetalsV5();
Promise.all(Object.keys(META).map(refresh)).finally(()=>{window.metalsQualitySignal?.("v5");window.renderMetalsQuality?.();});
})();