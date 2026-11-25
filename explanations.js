/* Metals Terminal · Guías de interpretación de los gráficos ampliados.
   Contenido metodológico estático: no consulta el mercado, no construye señales
   ni cambia las series, las temporalidades ni sus cálculos. */
(function(){
 "use strict";
 const GUIDES={
  futures:{
   title:"Comparativa de futuros · oro, plata y cobre",
   intro:"Variación porcentual acumulada de los cierres de futuros GC, SI y HG desde la primera fecha común del periodo (base 0 %). No compara precios en dólares ni representa una rentabilidad invertible.",
   blocks:[
    ["Subidas y bajadas",
     '<p>Si una línea <strong>sube</strong>, el precio de ese futuro ha ganado valor porcentualmente desde la base elegida; si <strong>baja</strong>, lo ha perdido. El 0 % se recalcula al cambiar de periodo: un mismo metal puede parecer líder en 1M y rezagado en 10A.</p>'],
    ["Diferencias y cruces",
     '<p>Cuanto más se separan las líneas, mayor es la diferencia de rendimiento acumulado desde esa fecha común. Si oro marca +15 % y plata +5 %, la ventaja es de <strong>10 puntos porcentuales</strong>, no del 10 % del precio de la plata. Un cruce significa que cambia el líder porcentual del periodo, <strong>no</strong> que se igualen sus precios.</p>'],
    ["Cómo interpretar las divergencias",
     '<p><strong>Oro por delante de plata:</strong> compatible con preferencia defensiva o monetaria. <strong>Plata superando al oro:</strong> compatible con apetito por riesgo o expectativas industriales mejores. <strong>Cobre y plata subiendo juntos frente al oro:</strong> puede reflejar expectativas de actividad industrial. <strong>Oro subiendo y cobre/plata cayendo:</strong> posible búsqueda de refugio. No son asociaciones infalibles; hay factores específicos de oferta y demanda.</p>'],
    ["Cambios de tendencia y límites",
     '<p>Una línea que pasa de subir a bajar indica un giro <em>en ese horizonte</em>; conviene contrastarlo con la ratio oro/plata, los tipos reales y el posicionamiento COT/OI. Los futuros continuos pueden presentar efectos de renovación de contratos: la curva <strong>no incluye financiación, costes ni una metodología de rollover suficiente para equipararla a un rendimiento de inversión</strong>. Se emplean cierres fechados, no cotizaciones intradía.</p>']
   ],
   sources:[["Yahoo Finance · GC","https://finance.yahoo.com/quote/GC%3DF/history/"],["Yahoo Finance · SI","https://finance.yahoo.com/quote/SI%3DF/history/"],["Yahoo Finance · HG","https://finance.yahoo.com/quote/HG%3DF/history/"],["Aethereal · respaldo histórico","https://dataset.aethereal.top/datasets/commodity-prices"]]
  },
  indices:{
   title:"Comparativa de índices bursátiles y Bitcoin · EE. UU. y Europa",
   intro:"Cinco índices bursátiles de precios (S&P 500, Nasdaq Composite —no Nasdaq-100—, Dow Jones, Russell 2000 y EURO STOXX 50) junto a Bitcoin BTC/USD, todos expresados como variación acumulada porcentual desde la primera sesión común. Se utiliza el mismo motor SVG nativo que en futuros. Bitcoin es un criptoactivo, no un índice bursátil ni un ETF que lo represente.",
   blocks:[
    ["Qué comparan las seis curvas",
     '<p>Cada serie arranca en <strong>0 % en la primera sesión compartida</strong>. Un +4 % indica una subida del 4 % desde esa fecha, no necesariamente durante la última sesión. Los índices son de precios y no incluyen dividendos, comisiones ni ajustes de divisa; Bitcoin se representa mediante su cotización BTC/USD, sin apalancamiento.</p>'],
    ["BTC y apetito por riesgo: relación que hay que comprobar",
     '<p>Una subida simultánea de Bitcoin y Nasdaq puede ser compatible con mayor apetito por activos de riesgo; sin embargo, <strong>su correlación no es fija</strong> ni implica una relación causal. Bitcoin también responde a flujos de ETF, liquidez cripto, regulación y factores propios. Una divergencia con Russell 2000 o el S&P 500 es una pista para investigar, no una señal automática sobre oro, plata o renta variable.</p>'],
    ["Cruces, diferencias y sesiones no simultáneas",
     '<p>Si Bitcoin acumula +10 % y el S&P 500 +3 %, la diferencia es de <strong>7 puntos porcentuales</strong> desde el origen de comparación, no una rentabilidad futura. El cruce indica cambio de liderazgo relativo. Bitcoin cotiza <strong>24 horas, siete días</strong>; los índices solo en días de mercado. La comparación usa fechas bursátiles compartidas, omite los movimientos exclusivamente de fines de semana y <strong>no equipara la hora del cierre diario de BTC con la hora de cierre de las bolsas</strong>. No se interpolan festivos.</p>'],
    ["Disponibilidad, fuente y limitaciones",
     '<p>Se obtienen cierres diarios reales de Yahoo Finance mediante su endpoint gráfico no oficial y el proxy gratuito cors.dev. Si falla Bitcoin o su cobertura temporal, los índices siguen mostrándose y se advierte la ausencia; si faltan índices, se informa de la cobertura parcial. La vista 1D no ofrece curvas intradía. Datos externos consultados en el navegador, no alojados ni inventados en GitHub Pages: los servicios no garantizan estabilidad, exactitud futura ni derechos generales de redistribución.</p>']
   ],
   sources:[["Yahoo Finance · índices mundiales","https://finance.yahoo.com/markets/world-indices/"],["Bitcoin BTC/USD","https://finance.yahoo.com/quote/BTC-USD/"],["cors.dev · condiciones del intermediario","https://cors.dev/guides/yahoo-finance-api-cors"]]
  },
  ratio:{
   title:"Ratio oro/plata · XAU/XAG",
   intro:"Número de onzas de plata cuyo valor equivale a una onza de oro, calculado con referencias spot XAU y XAG de la misma fuente y fechas comparables. No es el cociente de los futuros GC/SI.",
   blocks:[
    ["Si la ratio sube",
     '<p><strong>El oro gana valor relativo frente a la plata.</strong> Puede subir porque el oro sube más, porque baja menos o porque la plata cae más. No implica necesariamente que el oro esté subiendo en dólares.</p>'],
    ["Si la ratio baja",
     '<p><strong>La plata gana valor relativo frente al oro.</strong> Por ejemplo, pasar de 85 a 75 significa que hacen falta menos onzas de plata para igualar una onza de oro. La ratio puede bajar incluso mientras ambos metales pierden valor.</p>'],
    ["Cambios de tendencia y comparación",
     '<p>Una ratio que deja de subir y empieza a bajar puede señalar recuperación relativa de la plata, pero hay que comprobar los precios de ambos metales. Si la plata supera al oro en la comparativa de futuros y la ratio spot desciende, son dos señales <em>compatibles</em> de liderazgo relativo de la plata, aunque se refieren a instrumentos distintos.</p><p><strong>Esta gráfica tiene una sola línea:</strong> no hay cruces entre dos series. Sus máximos y mínimos históricos pueden contextualizar el nivel, pero no ofrecen un umbral automático de compra ni garantizan reversión a la media.</p>'],
    ["Límites",
     '<p>La ratio mide <strong>precio relativo</strong>, no valoración fundamental, flujos de ETF ni demanda industrial. Una ratio extrema puede persistir durante mucho tiempo. Los datos XAUS son referencias indicativas, no precios ejecutables.</p>']
   ],
   sources:[["Fuente de referencias XAU/XAG","https://xaus.com/api/"]]
  },
  "macro-curve":{
   title:"Curva de rendimientos · Treasury 2Y / 10Y / 30Y",
   intro:"Rentabilidades nominales exigidas a la deuda pública estadounidense a dos, diez y treinta años. El terminal ofrece un histórico de las tres series y un modo de curva por vencimientos.",
   blocks:[
    ["Si suben o bajan las tres líneas",
     '<p>Una <strong>subida general</strong> supone mayores rendimientos exigidos: puede responder a crecimiento, inflación, política monetaria o primas por plazo. Una <strong>bajada general</strong> puede reflejar expectativas de recortes, menor crecimiento o demanda de bonos como refugio. No debe asignarse una sola causa sin mirar el resto de indicadores.</p>'],
    ["Cuando cambia la distancia entre plazos",
     '<p>Si el rendimiento a <strong>10 años aumenta más que el de 2 años</strong>, la curva 10Y–2Y se empina; puede deberse a expectativas de inflación, crecimiento o mayor prima por plazo. Si el de <strong>2 años sube más</strong>, se aplana. También puede empinarse porque el 2Y cae más que el 10Y: el movimiento absoluto importa.</p>'],
    ["Cruces e inversión",
     '<p>Si el <strong>2Y supera al 10Y</strong>, ese tramo está invertido. La inversión se ha asociado históricamente con riesgo de recesión, pero no predice su fecha ni la asegura. Si el 10Y vuelve a superar al 2Y, desaparece la inversión, <strong>no necesariamente el riesgo económico</strong>. Un cruce del 30Y con otro plazo también describe la forma de la curva, no una señal automática.</p>'],
    ["Relación con oro y plata",
     '<p>Una subida del rendimiento nominal puede proceder de un <strong>tipo real</strong> mayor, de una <strong>compensación inflacionaria</strong> mayor o de ambos. Sus efectos para el oro no son equivalentes. Conviene leer este panel junto al gráfico de TIPS reales y breakeven, y recordar que las curvas nominales no informan por sí mismas del coste real de oportunidad.</p>']
   ],
   sources:[["Tesoro de EE. UU. · tipos de interés","https://home.treasury.gov/resource-center/data-chart-center/interest-rates"],["FRED DGS10","https://fred.stlouisfed.org/series/DGS10"]]
  },
  "macro-reals":{
   title:"Tipo real TIPS 10Y e inflación implícita",
   intro:"Dos medidas diferentes expresadas en porcentaje: el rendimiento real aproximado de los TIPS a diez años y la compensación por inflación breakeven calculada como Treasury nominal 10Y menos TIPS real 10Y.",
   blocks:[
    ["Qué significa que suba o baje el tipo real",
     '<p>Cuando el <strong>tipo real sube</strong>, aumenta el coste de oportunidad relativo de mantener oro, que no paga intereses. En igualdad de condiciones suele ser un viento contrario para el metal. Cuando <strong>baja</strong>, ese coste disminuye y suele resultar relativamente favorable. La relación no es mecánica: también influyen el dólar, el riesgo y la demanda.</p>'],
    ["Qué significa la inflación implícita",
     '<p>Si el <strong>breakeven sube</strong>, aumenta la compensación inflacionaria incorporada a los bonos nominales frente a los TIPS; si <strong>baja</strong>, disminuye. No es una predicción pura del IPC: incorpora primas de riesgo, liquidez y particularidades de los instrumentos.</p>'],
    ["Divergencias: la clave para el oro",
     '<p><strong>Breakeven al alza con tipo real a la baja:</strong> combinación potencialmente favorable para el oro. <strong>Breakeven y tipo real ambos al alza:</strong> el oro puede sufrir aunque aumente la compensación inflacionaria, porque el tipo real domina su coste de oportunidad. <strong>Tipo real subiendo mientras el breakeven cae:</strong> combinación generalmente poco favorable, aunque debe contextualizarse.</p>'],
    ["Cruces, giros y límites",
     '<p>Si las líneas se cruzan, <strong>no hay un umbral económico especial</strong>: comparan conceptos distintos con las mismas unidades. Lo informativo es la dirección y magnitud de cada uno y su relación con la curva nominal. La inflación alta por sí sola <strong>no garantiza</strong> que suba el oro.</p>']
   ],
   sources:[["Treasury nominal · FRED DGS10","https://fred.stlouisfed.org/series/DGS10"],["TIPS real · FRED DFII10","https://fred.stlouisfed.org/series/DFII10"]]
  },
  "v4-cot":{
   title:"COT · posicionamiento Managed Money oro/plata",
   intro:"Posiciones largas menos cortas de Managed Money (gestores especulativos) en futuros GC/SI, divididas por el interés abierto propio de cada metal y expresadas en %. El informe refleja posiciones del martes, publicadas más tarde.",
   blocks:[
    ["Si la curva sube o baja",
     '<p>Si <strong>sube</strong>, el posicionamiento especulativo neto es más alcista en relación con el OI. Puede deberse a más posiciones largas, menos cortas o cambios del denominador. Si <strong>baja</strong>, se hace menos alcista o más bajista. Por debajo de cero, los cortos superan a los largos dentro de Managed Money.</p>'],
    ["Cruces y divergencias entre oro y plata",
     '<p>Si oro sube y plata baja, los gestores están inclinándose <strong>relativamente</strong> más hacia el oro. Si plata crece más, gana respaldo especulativo relativo. Cuando las líneas se cruzan, se igualan o invierten los <strong>porcentajes netos respecto al OI propio</strong>, no el número de contratos ni el tamaño monetario de los mercados.</p>'],
    ["Percentiles y cambios de tendencia",
     '<p>Un <strong>P95</strong> significa que el valor de posicionamiento relativo supera aproximadamente el 95 % de las observaciones del histórico utilizado; <strong>no significa</strong> una probabilidad del 95 % de caída. Un posicionamiento muy alcista puede acompañar una tendencia fuerte y, al mismo tiempo, aumentar la vulnerabilidad ante liquidaciones si la situación cambia.</p>'],
    ["Cómo combinarlo y límites",
     '<p>Plata subiendo en precio, con COT neto y OI crecientes, es compatible con una tendencia respaldada por más posicionamiento y contratos abiertos. No determina quién dominará después. La CFTC publica el COT semanalmente con retraso y el panel emplea Managed Money de <strong>Disaggregated Futures Only</strong>, no posiciones de todo el mercado ni flujos de ETF.</p>']
   ],
   sources:[["CFTC · informes Commitment of Traders","https://www.cftc.gov/MarketReports/CommitmentsofTraders/index.htm"],["CFTC · datos públicos GC/SI","https://publicreporting.cftc.gov/resource/72hh-3qpy.json"]]
  },
  "v4-oi":{
   title:"Interés abierto semanal · oro GC y plata SI",
   intro:"Número de contratos de futuros que permanecen abiertos en el informe CFTC semanal. Aquí las dos curvas se normalizan como cambio porcentual desde la primera fecha común (base 0 %): no comparan cantidades absolutas de contratos.",
   blocks:[
    ["Si sube o baja",
     '<p>Una <strong>subida</strong> indica más contratos abiertos respecto al inicio; una <strong>bajada</strong>, menos. Por cada contrato abierto existe una contraparte larga y otra corta. El interés abierto no revela, por sí solo, si la presión iniciadora es compradora o vendedora.</p>'],
    ["Precio frente a interés abierto",
     '<ul><li><strong>Precio ↑ · OI ↑:</strong> mayor participación acompañando la subida.</li><li><strong>Precio ↑ · OI ↓:</strong> compatible con cierre de posiciones cortas.</li><li><strong>Precio ↓ · OI ↑:</strong> mayor participación acompañando la bajada.</li><li><strong>Precio ↓ · OI ↓:</strong> compatible con liquidaciones y reducción de exposición.</li></ul><p>Son patrones orientativos: ninguno identifica sin ambigüedad las operaciones que están detrás.</p>'],
    ["Cruces, distancias y cambios de tendencia",
     '<p>Si el OI de plata aumenta porcentualmente más que el de oro, su mercado expande relativamente más sus contratos pendientes. Si las curvas <strong>se cruzan</strong>, cambia qué metal ha aumentado más su OI desde la fecha inicial. <strong>No</strong> significa que tengan el mismo número de contratos. Un giro bajista del OI puede señalar reducción de participación, pero no demuestra por sí solo agotamiento del precio.</p>'],
    ["Combinación y límites",
     '<p>Precio de la plata al alza + OI creciente + COT Managed Money más alcista es una combinación compatible con incorporación de posiciones especulativas; no garantiza continuidad. El panel utiliza <strong>OI semanal del COT de la CFTC</strong>, no volumen de negociación diario de CME.</p>']
   ],
   sources:[["CFTC · Commitment of Traders","https://www.cftc.gov/MarketReports/CommitmentsofTraders/index.htm"]]
  },
  "v4-volatility":{
   title:"Volatilidad implícita GVZ · oro",
   intro:"Índice de volatilidad implícita de opciones sobre el ETF de oro GLD, para un horizonte cercano a 30 días y expresado en términos anualizados. Mide magnitud esperada de movimientos, no su dirección.",
   blocks:[
    ["Si GVZ sube",
     '<p>Las opciones incorporan <strong>mayores oscilaciones esperadas</strong> y/o una mayor valoración de la incertidumbre. No implica que el oro tenga que caer: un repunte de GVZ puede acompañar tanto subidas como bajadas del metal.</p>'],
    ["Si GVZ baja",
     '<p>Las opciones descuentan movimientos potenciales menores, aunque siempre puede producirse una sorpresa. Un GVZ descendente durante una subida del oro describe un avance con menor volatilidad implícita, pero no certifica una tendencia sana ni elimina el riesgo.</p>'],
    ["Combinaciones con el precio del oro",
     '<ul><li><strong>Oro ↑ · GVZ ↑:</strong> subida acompañada de más incertidumbre o demanda de opciones.</li><li><strong>Oro ↓ · GVZ ↑:</strong> compatible con episodios de miedo y movimientos bruscos.</li><li><strong>Oro ↑ · GVZ ↓:</strong> avance con menor magnitud de movimiento descontada.</li><li><strong>Oro lateral · GVZ ↑:</strong> mercado de opciones esperando más movimiento, sin dirección definida.</li></ul>'],
    ["Cruces y límites",
     '<p>Un giro brusco del GVZ puede alertar sobre un cambio de régimen de volatilidad, no sobre la dirección del oro. <strong>Solo hay una línea GVZ:</strong> no existen cruces oro/plata en este gráfico. VXSLV, la volatilidad implícita comparable de plata, no está integrada por falta de derechos de reutilización acreditados.</p>']
   ],
   sources:[["FRED GVZCLS · Cboe (cita obligatoria)","https://fred.stlouisfed.org/series/GVZCLS"]]
  },
  "v4-flows":{
   title:"ETF físicos GLD frente a SLV · tenencias",
   intro:"Compara las existencias de metal declaradas por GLD (toneladas de oro) y SLV (millones de onzas troy de plata). Las líneas muestran variaciones porcentuales desde el primer trimestre común disponible dentro del intervalo.",
   blocks:[
    ["Subidas y bajadas",
     '<p>Si la curva de un fondo <strong>sube</strong>, ese vehículo mantiene más metal físico que al inicio del periodo representado; si <strong>baja</strong>, mantiene menos. Creaciones y reembolsos de participaciones influyen en las existencias; también afectan mecanismos operativos y gastos del fondo.</p>'],
    ["Cuando las curvas se separan o cruzan",
     '<p>Si GLD aumenta sus tenencias un 8 % y SLV un 20 %, <strong>las existencias de SLV han crecido más en porcentaje</strong> desde su base comparable. Si las curvas se cruzan, cambia qué fondo ha aumentado más sus existencias porcentualmente: no significa que los volúmenes físicos se igualen ni demuestra rotación global de inversores entre oro y plata.</p>'],
    ["Cambios de tendencia y demanda inversora",
     '<p>Una sucesión de trimestres con existencias al alza es compatible con acumulación en ese vehículo concreto; una caída sostenida puede reflejar reducciones netas de metal. <strong>No equivale a flujos monetarios en dólares</strong>, que además dependen del precio del metal. GLD y SLV no representan toda la demanda mundial de oro y plata.</p>'],
    ["Frecuencia y cobertura real",
     '<p>Las observaciones son <strong>trimestrales</strong>, con fecha de tenencia y de publicación SEC; los giros se detectan tarde y no sirven para explicar una sesión de mercado. En la versión actual, los informes comunes verificados comienzan en <strong>septiembre de 2021</strong>; si se selecciona 10A, la cobertura es parcial, no se reconstruyen 2016–2021 ni se interpolan puntos. «Contexto 2A» es opcional y se distingue del periodo global.</p>']
   ],
   sources:[["SEC EDGAR · informes de GLD y SLV","https://www.sec.gov/edgar/search/"],["World Gold Council · datos ETF oro","https://www.gold.org/goldhub/data/gold-etfs-holdings-and-flows"]]
  }
 };
 const toggle=document.getElementById("detail-explanation-toggle");
 const pane=document.getElementById("detail-explanation-pane");
 const heading=document.getElementById("detail-explanation-heading");
 const content=document.getElementById("detail-explanation-content");
 const closeButton=document.getElementById("detail-explanation-close");
 if(!toggle||!pane||!heading||!content||!closeButton)return;
 function close(restoreFocus){
  const wasOpen=!pane.hidden;
  pane.hidden=true;
  const chart=document.getElementById("detail-chart");
  if(chart){chart.inert=false;chart.style.display='';} // Restore embedded iframe and graph when guide closes.
  toggle.setAttribute("aria-expanded","false");
  toggle.classList.remove("is-active");
  if(wasOpen&&restoreFocus&&!toggle.hidden)toggle.focus({preventScroll:true});
 }
 function render(entry){
  heading.textContent=entry.title;
  content.replaceChildren();
  const intro=document.createElement("p");
  intro.className="detail-guide-intro";
  intro.textContent=entry.intro;
  content.appendChild(intro);
  const period=document.createElement("p");
  period.className="detail-guide-period";
  period.textContent="Periodo seleccionado: "+(typeof activePeriodLabel==="function"?activePeriodLabel():"—")+" · verifica la cobertura real en «Fuente, fechas y metodología».";
  content.appendChild(period);
  for(const [title,html] of entry.blocks){
   const section=document.createElement("section");
   section.className="detail-guide-section";
   const titleEl=document.createElement("h4");titleEl.textContent=title;
   const body=document.createElement("div");
   body.className="detail-guide-body";
   body.innerHTML=html; // All strings are first-party static instructional content.
   section.append(titleEl,body);
   content.appendChild(section);
  }
  const warning=document.createElement("p");
  warning.className="detail-guide-caution";
  warning.textContent="Lectura orientativa, no señal automática de compra o venta. Contrasta la fecha, el instrumento, la cobertura y el resto de indicadores.";
  content.appendChild(warning);
  const sources=document.createElement("div");
  sources.className="detail-guide-sources";
  const label=document.createElement("strong");label.textContent="Fuentes y metodología: ";
  sources.appendChild(label);
  entry.sources.forEach(([name,url],index)=>{
   if(index)sources.append(" · ");
   const a=document.createElement("a");
   a.href=url;a.textContent=name;a.target="_blank";a.rel="noopener noreferrer";
   sources.appendChild(a);
  });
  content.appendChild(sources);
 }
 function sync(kind){
  close(false);
  const entry=Object.prototype.hasOwnProperty.call(GUIDES,kind)?GUIDES[kind]:null;
  toggle.hidden=!entry;
  if(entry){
   toggle.setAttribute("aria-label","Explicación: "+entry.title);
   render(entry);
  }else{
   toggle.removeAttribute("aria-label");
   content.replaceChildren();
  }
 }
 function open(){
  const kind=typeof detailKind==="string"?detailKind:"";
  const entry=Object.prototype.hasOwnProperty.call(GUIDES,kind)?GUIDES[kind]:null;
  if(!entry)return;
  render(entry);
  // Prevent TradingView's cross-origin iframe from stealing keyboard focus
  // while the explanatory overlay is in use.
  const chart=document.getElementById("detail-chart");
  if(chart){chart.inert=true;chart.style.display='none';} // Hidden iframe cannot steal focus from the guide.
  pane.hidden=false;
  toggle.setAttribute("aria-expanded","true");
  toggle.classList.add("is-active");
  content.scrollTop=0;
  heading.focus({preventScroll:true});
 }
 toggle.addEventListener("click",()=>{
  if(pane.hidden)open();else close(true);
 });
 closeButton.addEventListener("click",()=>close(true));
 window.addEventListener("keydown",event=>{
  if(event.key!=="Escape"||pane.hidden)return;
  event.preventDefault();
  event.stopImmediatePropagation(); // Close the guide before the enclosing chart.
  close(true);
 },true);
 window.syncTerminalExplanation=sync;
 window.closeTerminalExplanation=close;
 window.METALS_EXPLANATION_KEYS=Object.freeze(Object.keys(GUIDES));
})();
