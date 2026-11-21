/* Metals Terminal V4.6 · comparison of five stock-market indices.
   Official, attributed TradingView widget: no third-party prices copied,
   fabricated, republished or confused with funds/futures proxies.
   Note: TradingView uses its own market calendars and date-range controls. */
(function(){
 "use strict";
 const WIDGET_URL="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
 const SYMBOLS=Object.freeze([
  {symbol:"SP:SPX",label:"S&P 500"},
  {symbol:"NASDAQ:IXIC",label:"Nasdaq Composite"},
  {symbol:"DJ:DJI",label:"Dow Jones Industrial Average"},
  {symbol:"TVC:RUT",label:"Russell 2000 (referencia TradingView)"},
  {symbol:"TVC:SX5E",label:"EURO STOXX 50 (referencia TradingView)"}
 ]);
 const RANGES=Object.freeze({
  "1d":"1D","3d":"5D","5d":"5D","2w":"1M","1mo":"1M",
  "3mo":"3M","6mo":"6M","1y":"12M","2y":"24M",
  "5y":"60M","10y":"120M"
 });
 const STYLE_URL="https://www.tradingview.com/widget-docs/widgets/charts/advanced-chart/";
 let cardConfig=null,detailConfig=null,token=0,cardTimer=0;
 const esc=(s)=>String(s).replace(/[&<>"']/g,z=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[z]));
 const theme=()=>document.documentElement.dataset.theme==="day"?"light":"dark";
 function windowDescription(){
  const p=typeof nativePeriod==="string"?nativePeriod:"1mo";
  const label=typeof activePeriodLabel==="function"?activePeriodLabel():"1M";
  if(p==="custom")return {
   label:"Rango global "+label+" · no sincronizable exactamente con el gráfico externo",
   range:"1M",custom:true
  };
  const approximate=p==="3d"||p==="2w";
  return {
   label:"Periodo global "+label+(approximate?" · visualización externa aproximada":"")+
     " · la escala temporal la gestiona TradingView",
   range:RANGES[p]||"1M",custom:false
  };
 }
 function buildConfig(full){
  const window=windowDescription();
  const dark=theme()==="dark";
  return {
   autosize:true, symbol:SYMBOLS[0].symbol,
   interval:"D", range:window.range, timezone:"Etc/UTC",
   theme:dark?"dark":"light", style:"3",locale:"es",
   backgroundColor:dark?"#0c1f2c":"#f8faf8",
   gridColor:dark?"rgba(112,150,165,0.16)":"rgba(80,118,133,0.12)",
   allow_symbol_change:false,
   hide_side_toolbar:true,hide_top_toolbar:!full,hide_legend:false,
   hide_volume:true,details:false,hotlist:false,calendar:false,
   save_image:false,withdateranges:full,
   compareSymbols:SYMBOLS.slice(1).map(({symbol})=>({symbol,position:"SameScale"})),
   studies:[]
  };
 }
 function attribution(){
  const link=document.createElement("a");
  link.href="https://www.tradingview.com/markets/indices/";
  link.target="_blank";link.rel="noopener nofollow noreferrer";
  link.textContent="Gráfico de índices por TradingView";
  link.className="indices-tv-credit";
  return link;
 }
 function mount(host,full){
  if(!host)return;
  const win=windowDescription(),cfg=buildConfig(full);
  const signature=JSON.stringify({range:cfg.range,theme:cfg.theme,full});
  const previous=full?detailConfig:cardConfig;
  if(previous===signature&&host.querySelector(".indices-tv-embed"))return;
  const parent=document.createElement("div");
  parent.className="indices-tv-embed";
  const placeholder=document.createElement("div");
  placeholder.className="indices-tv-wait";placeholder.textContent="Cargando comparación de cinco índices con TradingView…";
  const body=document.createElement("div");
  body.className="tradingview-widget-container__widget";
  parent.append(body);
  const footer=attribution();
  parent.append(footer);
  host.replaceChildren(placeholder,parent);
  if(full)detailConfig=signature;else cardConfig=signature;
  const script=document.createElement("script");
  script.async=true;
  script.type="text/javascript";
  script.src=WIDGET_URL;
  script.textContent=JSON.stringify(cfg);
  script.onerror=()=>{
   if(!parent.isConnected)return;
   placeholder.textContent="El gráfico externo de TradingView no está disponible desde este navegador. No se sustituyen sus datos por cotizaciones simuladas.";
   placeholder.classList.add("indices-tv-error");
   if(full)detailConfig=null;else cardConfig=null;
  };
  // The documented embedding API reads its adjacent <script> configuration.
  // Never proxy, scrape or extract the protected TradingView price series.
  parent.append(script);
  // The frame is created asynchronously by the provider. If blocked, leave
  // the independently useful provider links and the explicit source notice.
  const myToken=++token;
  setTimeout(()=>{
   if(myToken!==token||!host.isConnected)return;
   if(parent.querySelector("iframe, tv-advanced-chart")){
    placeholder.hidden=true;
   }else{
    placeholder.textContent="TradingView sigue cargándose; si no aparece la gráfica, abre el proveedor mediante el enlace inferior.";
   }
  },2200);
  if(win.custom)host.setAttribute("data-calendar-warning","true");
  else host.removeAttribute("data-calendar-warning");
 }
 function renderCard(force=false){
  const host=document.getElementById("indices-comparison"),status=document.getElementById("indices-window");
  if(!host||!status)return;
  const period=windowDescription();
  status.textContent=period.label;
  const signature=JSON.stringify({range:period.range,theme:theme(),full:false});
  if(!force&&cardConfig===signature)return;
  mount(host,false);
 }
 function drawDetail(host,foot){
  if(!host)return;
  host.classList.remove("macro-focus-chart");
  host.classList.add("indices-detail-chart");
  const period=windowDescription();
  if(foot)foot.textContent="Cinco índices de precios · comparación en escala porcentual gestionada por TradingView. "+
   "S&P 500 (SP:SPX), Nasdaq Composite (NASDAQ:IXIC), Dow Jones (DJ:DJI), "+
   "Russell 2000 (TVC:RUT) y EURO STOXX 50 (TVC:SX5E). "+
   "El proveedor tiene calendarios bursátiles distintos para EE. UU. y Europa; no se interpolan series aquí. "+
   (period.custom?"El rango personalizado de Metals Terminal NO se reproduce exactamente en el widget; ajusta su calendario. ":"")+
   "Índices de precios, sin dividendos; la comparación no incluye conversión de moneda USD/EUR. "+
   "Los cierres diarios y sus derechos permanecen en TradingView, no se alojan en GitHub Pages.";
  mount(host,true);
 }
 function closeDetail(){detailConfig=null;/* Closing chart clears its host in main app. */}
 window.renderIndicesPanel=renderCard;
 window.drawIndicesDetail=drawDetail;
 window.openIndicesDetail=()=>{detailConfig=null;};
 window.closeIndicesDetail=closeDetail;
 window.METALS_INDICES_SYMBOLS=SYMBOLS.map(x=>x.symbol);
 window.METALS_INDICES_PROVIDER=WIDGET_URL;
 renderCard();
})();
