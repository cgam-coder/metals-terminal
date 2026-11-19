# Metals Terminal V4 — Especificación cerrada de interfaz y datos

**Fecha:** 19 de noviembre de 2026. **Ámbito:** cinco indicadores adicionales para Oro-Plata V2. **Estado:** especificación para implementación, NO cambio funcional publicado. **Base contrastada:** `cgam-coder/metals-terminal`, HTML/SVG estático e histórico existente.

## 1. Decisiones y restricciones inamovibles

- Añadir exactamente cinco capacidades: (1) COT oro/plata, (2) Open Interest y volumen, (3) GVZ y VXSLV, (4) flujos de inversión ETF/ETP, (5) FedWatch.
- No sustituir GC/SI/HG/BZ por spot. No reabrir la integración intradía descartada (widgets TradingView o spot como sustituto).
- Mantener cabecera, siete tarjetas, comparativa y gráficos Treasury/TIPS/Fed/BCE, ratio, selector de diez intervalos, calendario custom, ampliación y UI táctil.
- **Coste incremental obligatorio 0 €**, sin suscripciones, nuevas infraestructuras o tareas periódicas. No activar extracción ni redistribución sin validar condiciones.
- Datos reales, fuente enlazada y fecha efectiva. Nunca suplir vacíos con cifras plausibles, interpolaciones o valores actuales para un rango histórico anterior.
- Los indicadores nuevos son contexto analítico; no generan por sí solos señales automáticas de compra/venta.

## 2. Composición y rejilla

**Escritorio ancho (>1280 CSS px):** preservar la rejilla principal. Convertir la antigua zona `policy` (columna derecha, filas centrales) en `rates-stack`: dos paneles apilados, arriba «Tipos oficiales de interés» y abajo «FedWatch · próxima decisión». Ancho idéntico al de esa columna; altura repartida aproximadamente 1:1, con la separación visual ya utilizada en el dashboard (10 px). No tapar ni comprimir el área del gráfico: ajustar subtítulos y leyendas. La columna y las otras tarjetas conservan sus áreas. FedWatch incluye información compacta, no un iframe de 1000 px.

**Fila nueva:** fuera de `main.dashboard`, antes del pie; `<section id="posicionamiento-expectativas">` y título «Posicionamiento y expectativas». Rejilla de cuatro columnas iguales, en este orden: COT | Open Interest y volumen | Volatilidad implícita | Flujos ETF/ETP. Los gráficos tienen la misma altura, padding, bordes navy y estilo del terminal; altura de referencia 260–310 CSS px (ajustable tras pruebas visuales).

**Tableta 881–1280 px:** no reducir la altura de tipos y FedWatch a 110 px. Asegurar una zona derecha de dos tarjetas con un mínimo de 190–220 px por tarjeta, o pasar `rates-stack` a sección completa si no hay espacio. Nueva fila a dos columnas (2x2).

**Móvil <=880 px:** flujo vertical sin scroll horizontal. Tipos oficiales seguido inmediatamente de FedWatch, después las demás tarjetas originales según su orden y finalmente COT, OI/volumen, volatilidad y flujos. Una tarjeta por fila para los cuatro indicadores nuevos, altura 225–280 px y controles táctiles >=36 px. Probar a 390 y 360 CSS px. No acoplar un widget de proveedor incompatible.

**Colores:** heredar `--bg`, `--panel`, `--stroke`, `--gold`, `--silver`, `--cyan`, `--purple`, `--red`; mismo tipo de eje y SVG nativo. El color indica la serie, no la validez o recomendación de una inversión.

Cada panel incluye cabecera, `Ampliar`, selector interno oro/plata cuando corresponda, última lectura con unidad, delta relevante, gráfico, línea de procedencia y la doble fecha `dato de mercado` / `publicación`. Si está pendiente la fuente, el panel debe mostrar «Fuente pendiente de verificación», NUNCA valores simulados.

## 3. Especificación indicador por indicador

### 3.1 COT — Managed Money neto (P1)

- Título: «COT · Posicionamiento especulativo». Subtítulo: «GC / SI · CFTC · desagregado, solo futuros»; selector [Oro] [Plata].
- KPI grande: posición neta Managed Money en contratos = largos - cortos. Segundo KPI: neto / `Open_Interest_All` x 100 en el MISMO informe y universo. Tercero: percentil del neto/OI dentro de cinco años, solo con número suficiente de informes.
- Gráfico: una línea real semanal para el neto/OI, eje cero y tooltip con fecha, largos, cortos, netos, interés abierto del informe, report date y release date. Filtro semanal sin rellenar semanas; alertar si falta el dato más reciente.
- Fuente prioritaria: CFTC Public Reporting Environment / Disaggregated Futures Only, dataset `72hh-3qpy`; alternativa archivos anuales CFTC. Identificar formalmente contratos GOLD/SILVER COMEX por código CFTC verificado, no por coincidencia de nombres; excluir el formato futures+options combinado.
- Frecuencia: posiciones martes, publicación habitualmente viernes. Mostrar ambas fechas y nunca etiquetarlo como posición del viernes.
- Fuentes: https://publicreporting.cftc.gov/stories/s/Disaggregated-Futures-Only/ubmb-6exi/ y https://www.cftc.gov/MarketReports/CommitmentsofTraders/HistoricalCompressed/index.htm

### 3.2 Open Interest y volumen (P1 condicionado a extracción)

- Título: «Interés abierto y volumen». Subtítulo «GC / SI · CME/COMEX · futuros»; selector [Oro] [Plata].
- Línea de interés abierto (contratos al final de sesión) y barras de volumen negociado (contratos por sesión), con ejes/unidades distinguibles. No dibujar ambos en un mismo eje engañoso.
- Universo constante: especificar `solo futuros`, contrato(s) y vencimientos sumados. Si la fuente agrupa todos los vencimientos, etiquetar «todos los vencimientos»; no yuxtaponer con el volumen de un único contrato sin nota.
- Indicadores derivados opcionales: delta OI diario y cambio porcentual respecto a una sesión comparable; nada de señales causales automáticas.
- Fuente: CME Volume & Open Interest / Daily Bulletin; datos diarios preliminares frente a definitivos. Descarga programática, historial mínimo y permiso de reproducción se deben verificar antes de activar el gráfico. Si no es compatible con HTML estático, importación manual de datos originales como contingencia, sin rellenar el gráfico.
- Fuente: https://www.cmegroup.com/market-data/volume-open-interest.html y https://www.cmegroup.com/market-data/daily-bulletin.html

### 3.3 Volatilidad implícita — GVZ y VXSLV (P2)

- Título: «Volatilidad implícita». Subtítulo «Opciones sobre GLD / SLV · índices Cboe»; dos cifras diferenciadas, y gráfico con líneas de ambos índices si se dispone de serie histórica vigente autorizada.
- GVZ: serie pública FRED `GVZCLS` de cierre diario. VXSLV: índice identificado por Cboe, PERO FRED `VXSLVCLS` está **discontinuado desde 2022** y no sirve como serie diaria actual.
- No introducir `VXSLVCLS` como histórico vigente, no extrapolar ni aproximar con el VIX. Con GVZ válido y VXSLV pendiente, presentar solo GVZ y texto «VXSLV: sin fuente histórica vigente verificada». La tarjeta existe, pero no finge tener la segunda serie.
- Unidades: nivel del índice de volatilidad implícita, no variación del precio del ETF ni volatilidad realizada de futuros. Deltas en puntos del índice.
- Fuentes: https://fred.stlouisfed.org/series/GVZCLS ; https://www.cboe.com/us/indices/benchmark_indices/ ; https://fred.stlouisfed.org/series/VXSLVCLS

### 3.4 Flujos ETF/ETP — inversión física (P2)

- Título: «Demanda de inversión · ETF/ETP». No representar gold y silver como una única serie de `flujo` si su dato no es equivalente.
- Dos vistas/tabulaciones [Oro · flujos globales] [Plata · SLV tenencias]. En oro: flujos NETOS reportados por WGC en USD o toneladas, con barras mensuales entradas/salidas y holdings, separados. En plata: onzas/toneladas en el trust SLV y variación de tenencias entre fechas comparables; **NO etiquetar el cambio de activos/tenencias como flujo neto de todos los ETF de plata**.
- Fuente oro: World Gold Council, excel mensual, con sitio semanal pero gráficos que pueden requerir acceso registrado. Fuente plata: iShares SLV, `Ounces in Trust` y fecha; SLV es solo un fondo, no el mercado total de plata.
- En calendario de 1D/3D/1S, no inventar una barra nueva a partir del último mes publicado. Mostrar la última lectura que existía hasta `to`, fecha y texto «sin publicación dentro del intervalo» cuando corresponda.
- Fuentes: https://www.gold.org/goldhub/data/gold-etfs-holdings-and-flows ; https://www.ishares.com/us/products/239855/ISHARES-SILVER-TRUST-FUND

### 3.5 FedWatch — próxima reunión FOMC (P1 visual, P2 datos)

- Ubicación: bajo «Tipos oficiales de interés» dentro de su misma zona vertical, sin reducir ninguno a un panel ilegible. Título «FedWatch · próxima reunión». Subtítulo «Expectativas implícitas de futuros Fed Funds · CME».
- Contenido mínimo: fecha FOMC que corresponda, escenarios [recorte] [mantenimiento] [subida] con tres segmentos de probabilidad verificadas. Mostrar fuente, fecha y hora de la instantánea y pie «Mercado, no pronóstico de la Fed».
- Con probabilidad original por intervalo objetivo: agregar categorías respecto al rango objetivo actual; comprobar suma de probabilidades 100% dentro del redondeo y conservar el desglose disponible en ampliación. Si no hay probabilidades verificadas, mostrar enlace «Ver CME FedWatch» y «Datos no disponibles», NO un 50/50 ficticio.
- Fuente oficial web gratuita: CME FedWatch. La web anuncia FedWatch REST API vía portal de datos, pero **no se ha confirmado gratuidad/licencia o acceso automatizado a esa API**. No instalar servicio ni activar extracción hasta aclararlo.
- Gráfico histórico de probabilidades solo si existen snapshots históricos reales de cada fecha; con rango `custom` anterior, mostrar «No consta archivo de expectativas para el intervalo». No reconstruir probabilidades históricas a partir de la instantánea actual.
- Fuente: https://www.cmegroup.com/markets/interest-rates/cme-fedwatch-tool y https://www.cmegroup.com/market-data/market-data-api.html

## 4. Comportamiento global y fechas

- Los botones de periodo y el selector «Seleccionar periodo» siguen siendo los únicos controles globales, compartidos entre vista principal y modal. Cada nueva tarjeta recibe la misma ventana `from/to` y no introduce otra temporalidad artificial.
- Para COT/ETF/FedWatch la frecuencia propia prevalece sobre la etiqueta seleccionada: 1D o 3D no se reinterpretan como datos intradía. Si el rango no contiene publicaciones, no hay curva; ofrecer lectura última **a fecha `to`**, claramente identificada como anterior al intervalo, sin valores del futuro.
- En `Ampliar`: mismo modal, cabecera y controles existentes, con tooltip que incluya procedencia, unidades, timestamp real y frecuencia. El overlay no puede alterar la selección de una segunda tarjeta ni dejar marcas en otras.
- En FedWatch, la fecha de la próxima reunión depende de la fecha de consulta y no del rango histórico; si el usuario selecciona un intervalo pasado, su gráfico histórico debe estar desactivado sin archivo verificado.
- No introducir gráficos completamente vacíos: estado explícito `Cargando`, `No publicado aún`, `Histórico insuficiente`, `Acceso no verificado`, `Error de consulta` y `Último dato fecha X`. No esconder estas distinciones bajo una etiqueta genérica de «Sin datos».

## 5. Contrato de datos y actualización

Guardar las series nuevas separadas por proveedor y por instrumento. Esquema recomendado de cada observación (no implica que los proveedores proporcionen todos los campos):

```json
{
  "indicator": "cot_managed_money_net",
  "instrument": "GC",
  "value": null,
  "unit": "contracts",
  "observation_date": "YYYY-MM-DD",
  "publication_date": "YYYY-MM-DD",
  "retrieved_at": "ISO-8601",
  "source_name": "CFTC",
  "source_url": "https://www.cftc.gov/",
  "frequency": "weekly",
  "coverage": {"from": "YYYY-MM-DD", "to": "YYYY-MM-DD"},
  "status": "pending_validation",
  "notes": "No rellenar ni extrapolar"
}
```

- `null` no se muestra como precio y no se convierte en cero. Validar tipo, fecha, rango razonable y definición de contrato/fuente; conservar fuente original como prueba verificable.
- Cargar bajo demanda al abrir el terminal o pulsar «Actualizar todo». Reutilizar caché local validada cuando sea razonable, sin automatizaciones periódicas ni proveedores de pago. Si se emplea archivo propio, actualización manual y con fecha de corte; no mostrarlo como directo.
- Estados de frescura orientativos (a ajustar tras comprobar el calendario de cada proveedor): COT alerta si faltan dos publicaciones habituales; OI/volumen si faltan >3 días hábiles; GVZ >3 días hábiles; ETF mensual si falta el siguiente ciclo; FedWatch si no hay instantánea vigente. No equiparar `stale` a `error`.
- Prohibido combinar datasets no equivalentes: COT Futures Only vs Combined; OI todos vencimientos vs un contrato; oro WGC global vs plata SLV único; VXSLV discontinuado vs índice actual; probabilidad contemporánea vs historia no archivada.

## 6. Requisitos de aceptación (PASS / HOLD)

**Layout:** A escritorio, columna derecha contiene Tipos y FedWatch en tarjetas legibles; bajo todo el dashboard aparecen exactamente las cuatro tarjetas nuevas en fila. B a tableta la fila se reagrupa 2x2 y ninguno de Tipos/FedWatch queda por debajo de altura legible. C en móvil una columna, sin scroll horizontal y controles >=36 px.

**Funcionales:** D cada panel abre «Ampliar» y respeta selector global/calendario; E cada punto y cada KPI trazado tiene fuente, unidad, fecha de observación y publicación; F falta de datos presenta estado explicativo sin placeholder numérico; G rango anterior no utiliza cifras posteriores; H contraste y área táctil equivalentes al diseño actual.

**Datos:** I COT calculado con archivos Futures Only verificados y códigos COMEX correctos; J OI y volumen declarados con mismo universo y con preliminar/final; K GVZ con FRED, VXSLV NO válido por el histórico FRED discontinuado; L WGC gold flows y SLV holdings con rótulos y unidades distintos; M FedWatch utiliza solo porcentajes oficiales o no presenta barras; N precio de futuros e histórico original intactos.

**Operación:** O cero cargos nuevos, cero cron, cero secretos en cliente y cero fuentes no autorizadas; P nuevos datos aislados de los actuales, sin introducir regresiones en el código principal; Q previsualización aislada y pruebas de escritorio/móvil previas a modificar la página pública; R rollback inmediato con commit de la versión previa.

**Criterio de liberación:** Puede aprobarse la estructura visual de las cinco tarjetas con los estados vacíos veraces. No se debe declarar `PASS integral de datos` hasta validar los cinco proveedores/series, especialmente VXSLV y la API de FedWatch. Datos inexistentes o sin licencia permanecen en HOLD, no se sustituyen por números ficticios.

## 7. Orden recomendado de implementación

1. Diseño CSS, estructura accesible, breakpoints y modales. Mantener fuente real o estado `pendiente`; sin datos de muestra en producción.
2. COT vía CFTC (prioridad por disponibilidad) y GVZ vía FRED; pruebas de fecha, parseo, percentil, deltas, sincronización.
3. OI/volumen CME y flujos WGC/SLV después de verificar acceso y cobertura reutilizable con coste 0. No inferir ingresos netos del fondo a partir de activos absolutos.
4. Cualificación específica del índice VXSLV actual y acceso a FedWatch; mientras falte prueba, dejar el subindicador y sus porcentajes inactivos con enlace oficial.
5. Integración a producción solo tras PASS visual, funcional y de datos. No cambiar la lógica de futuros GC/SI/HG/BZ ni incorporar intradía descartado.

## 8. Documentación oficial de referencia

- CFTC COT: https://www.cftc.gov/MarketReports/CommitmentsofTraders/index.htm
- CFTC histórico: https://www.cftc.gov/MarketReports/CommitmentsofTraders/HistoricalCompressed/index.htm
- CME VOI: https://www.cmegroup.com/market-data/volume-open-interest.html
- CME Daily Bulletin: https://www.cmegroup.com/market-data/daily-bulletin.html
- FRED GVZ: https://fred.stlouisfed.org/series/GVZCLS
- FRED VXSLV discontinuado: https://fred.stlouisfed.org/series/VXSLVCLS
- Cboe benchmarks: https://www.cboe.com/us/indices/benchmark_indices/
- World Gold Council ETF: https://www.gold.org/goldhub/data/gold-etfs-holdings-and-flows
- iShares SLV: https://www.ishares.com/us/products/239855/ISHARES-SILVER-TRUST-FUND
- CME FedWatch: https://www.cmegroup.com/markets/interest-rates/cme-fedwatch-tool
- CME Market Data API: https://www.cmegroup.com/market-data/market-data-api.html

**Decisión final de la especificación:** aprobar posición, jerarquía, UI y reglas de honestidad de las cinco tarjetas; no dar por autorizada todavía la automatización de todas sus fuentes.
