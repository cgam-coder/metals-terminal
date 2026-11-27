# Metals Terminal V5.1 — expectativas, crédito, actividad y técnica

## V5.1 · sincronización visual de cotizaciones (27/11/2026)

Los cuatro gráficos individuales y sus ampliaciones incorporan la misma última cotización posterior al cierre que la cabecera, mediante una copia exclusiva de presentación. Tramo discontinuo y punto hueco, fecha y precio inspeccionables; mínimo, máximo y variación del periodo incluyen el punto indicativo. No se mezcla con otro proveedor, no se añade a la caché histórica, comparativa, RSI ni SMA. 1D no simula intradía y el rango personalizado sigue siendo de cierres. Sin nuevas peticiones ni coste.

## V5.1 · renovación de futuros (27/11/2026)

La auditoría del 27/11 confirma que Yahoo entrega una cotización del día junto al histórico diario, que no contiene el 26/11 (festivo sin liquidación CME). Las tarjetas muestran la cotización indicativa validada con hora de Madrid cuando es posterior al cierre histórico, sin introducirla en los gráficos históricos ni en RSI/SMA. Las descargas de cada futuro se aceptan independientemente; un fallo no impide renovar las demás. Se preserva el respaldo Yahoo por símbolo y no se mezclan proveedores en la comparativa. «Fuentes» diferencia fecha de observación y consulta; XAUS actualiza su estado al cambiar temporalidad. No se crean puntos de festivos ni se contratan servicios. Inflación: fechas propias y huecos explícitos; el PCE de octubre de 2026 se conserva aunque falte el IPC interanual de octubre por la ausencia de base de octubre de 2025 (BLS: https://www.bls.gov/cpi/notices/2026/12m-changes-202610.htm). Las alertas mensuales cuentan desde fin del mes de referencia. La última consulta de cotizaciones depende del proveedor y del momento de apertura.

## V5.1 · ajuste de distribución

El bloque de análisis técnico (RSI 14 y SMA 50/200) se sitúa entre el dashboard principal y Posicionamiento y expectativas. Se conservan las tarjetas, los cálculos, la temporalidad, las guías y las fuentes. El bloque de fundamentos complementarios mantiene las ocho tarjetas restantes.

## V5.1 · 25/11/2026

Se añaden seis tarjetas nativas en tres filas de dos columnas: expectativa de tipos cortos a un año (Kim–Wright, THREEFF1 − THREEFFTP1, frente a DFF y forward), diferencial GZ y EBP (Fed Board), confianza manufacturera EE. UU./China (OCDE, no PMI), solicitudes iniciales y media oficial de cuatro semanas (DOL/FRED), RSI 14 Wilder GC/SI y SMA 50/200 con selector de metal. Se añade al COT un modo percentil móvil de 52 informes; las cifras absolutas originales se conservan. Datos publicados, fecha efectiva, sin interpolación, consulta por apertura/recarga; cálculos locales, sin servicios ni suscripciones nuevos. Histórico objetivo de 10 años con precalentamiento previo cuando se verifica; el respaldo incompleto se etiqueta. Modelos Fed y balances OCDE son alternativas explícitas, no FedWatch, PMI ni AAII. No se integran contratos individuales de futuros, lease rates, VIX9D, VXSLV, LBMA, volumen CME, compras de bancos centrales o High Yield ICE sin acreditar 10 años, acceso renovable y derechos. Fuentes gratuitas sin SLA. 27 guías; límites de extensión previos mantenidos.

# Metals Terminal V5.0 — fundamentos complementarios

## V5.0 · revisión de guías (25/11/2026)

Se revisan las trece guías originales y se incorporan ocho nuevas (21 paneles ampliables en total). Cada guía describe la magnitud, unidades, ejes, lectura de curvas, ejemplos hipotéticos, relaciones y límites. Las guías originales se mantienen por debajo del doble tanto en palabras como en caracteres de texto visible. El botón «Explicación» y la interfaz existente se conservan. Sin nuevos datos, llamadas, suscripciones ni cambios en los cálculos.

## V5.0 · 25/11/2026

Dos nuevas filas de tarjetas nativas, sin widgets, de 300 px en escritorio (dos columnas; móvil una). VIX 30D/3M (Cboe vía FRED VIXCLS/VXVCLS, con atribución), NFCI/ANFCI, IPC general/subyacente y PCE subyacente interanuales, e inventarios semanales COMEX registrado/elegible/total (MetalCharts, crédito visible obligatorio, no espejo del CSV). Se consultan al abrir y al pulsar Actualizar todo; histórico local validado solo como respaldo por fallo. Periodos exactos y sin interpolación; fuente mensual o semanal puede tener menos de dos observaciones dentro del rango. Datos FRED revisados, no vintages de publicación. COMEX: cobertura común limitada desde febrero 2026; no se inventa 10A. VIX9D, AAII y comparativa PMI EE. UU./China quedan fuera: derechos/licencias o disponibilidad gratuita integral no acreditados. No se contratan servicios ni se crean tareas programadas. El diferencial Treasury 10Y−2Y se incorpora como cuarta línea histórica, en puntos porcentuales (no cambia la vista por vencimientos).

# Metals Terminal V4.9 — Renovación de fuentes al entrar

Web: https://cgam-coder.github.io/metals-terminal/


## V4.9 — Verificación de frescura (25/11/2026)

Tras la auditoría del 25/11, que confirmó los bloqueos CORS de FRED y Cboe y el fallo DNS de Aethereal, la renovación de mercado se ejecuta en cada apertura, también si existe una caché local. Se mantiene el último conjunto verificado visible mientras se consulta una nueva serie, pero no se considera que mostrar un respaldo equivalga a renovar los datos.

- Futuros: Yahoo Finance GC=F/SI=F/HG=F/BZ=F (futuros continuos en USD de COMEX/NYMEX); endpoint gráfico no oficial vía el relay público cors.dev. Validación de identidad, mercado, fechas, cobertura decenal y no regresión; promoción conjunta de las cuatro series, sin empalmar Aethereal, spot u otros proveedores. La vela del día de negociación en curso se excluye para no confundirla con un cierre. Peticiones Yahoo de futuros/índices/BTC escalonadas, un reintento acotado de HTTP 429 conforme a Retry-After. Si el proveedor falla se conserva el conjunto anterior con aviso, no se inventa el precio. No se publican sus cotizaciones en GitHub.
- FRED Treasury/TIPS/Fed/BCE y GVZ, Cboe VIX: consulta del CSV público oficial y relay CORS solo si falla el transporte directo, sin cambiar el origen del dato. Se verifica la fecha, identidad y amplitud del histórico antes de sustituir un respaldo. CFTC y XAUS mantienen sus consultas.
- Índices y BTC: los seis activos se comprueban al abrir, incluso en 1D para verificar sus últimos cierres (sin curva intradía). En el panel de fuentes se distinguen registros disponibles, retrasos, cobertura incompleta, consulta y respaldo por fallo.
- ETF: el informe GLD 10-K del 24/11/2026 acredita 33.996.676,238 onzas troy (1.057,41 t) a 30/09/2026, incorporado al histórico junto a SLV del mismo trimestre (493,58 M oz). Fuente: https://www.sec.gov/Archives/edgar/data/1222333/000143774926038190/gld20260930_10k.htm. El hecho iShares del 24/11 (15.664,87 t; 503.637.213 oz) procede de https://www.ishares.com/us/products/239855/ishares-silver-trust-slv. El informe mensual WGC de octubre (publicado 05/11) sigue vigente: https://www.gold.org/goldhub/research/gold-etfs-holdings-and-flows/2026/11. Se leen los archivos publicados en cada apertura y se señala la revisión según la periodicidad, pero los cortes SEC/WGC/iShares **no se renuevan automáticamente**: SEC e iShares rechazaron las solicitudes automatizadas y no se sortea ese bloqueo. La validación y el mes WGC ya no están fijados a noviembre de 2026 en el código.
- Sin cron, servicios de pago, credenciales ni nuevo coste incremental previsto. Ni Yahoo ni el relay son proveedores con SLA contractual. Las fuentes oficiales o los derechos de exhibición de datos de terceros no quedan garantizados por el relay. Se mantiene el carácter personal de la web.


## V4.8 — Bitcoin BTC/USD como sexta curva (21/11/2026)

La tarjeta «Índices bursátiles + Bitcoin» incorpora la cotización **Bitcoin BTC/USD (símbolo Yahoo Finance \`BTC-USD\`)** como sexta serie porcentual en el **mismo gráfico nativo SVG** que los cinco índices existentes, sin cambiar la estructura de tarjetas ni añadir widgets externos. El BTC se distingue mediante la línea naranja, con la misma base de comparación (0 %) y la misma interacción, ampliación, temporalidad global (3D–10A o fechas personalizadas) y modo día/noche.

**Comparación metodológica:** los cinco índices forman el calendario principal de fechas de cierre comunes. Bitcoin se negocia 24/7, pero aquí **solo se representan sus observaciones diarias correspondientes a esas fechas bursátiles**: los sábados y domingos sin sesiones de bolsa no se añaden al eje ni se inventan. Tampoco se afirma que el corte diario de BTC sea simultáneo al cierre de Nueva York o Europa. Si BTC no responde o aporta menos del 75 % de las fechas comunes, o no llega a la última, **se conservan intactas las cinco series bursátiles** y aparece «BTC no disponible»; nunca se sustituye Bitcoin por ETF ni por un precio estimado. La adición de BTC exige dos o más cierres reales comunes y una identidad de ticker válida.

La leyenda, el pie, la explicación del indicador y el panel ampliado identifican a BTC separadamente de los índices de bolsa. La relación con el apetito por riesgo es una **hipótesis variable**: una correlación visual entre BTC y acciones no acredita causalidad ni permite deducir automáticamente la trayectoria de oro o plata.

**Fuentes y costes:** Yahoo Finance para las seis series, incluida \`https://finance.yahoo.com/quote/BTC-USD/\`, consultado mediante el mismo proxy gratuito cors.dev de V4.7. No hay licencias nuevas, servicios de pago ni precios de BTC archivados en GitHub Pages. El endpoint y el proxy son gratuitos pero no oficiales ni garantizados contractualmente.

La verificación mantiene los cinco índices originales y añade pruebas para la sexta curva, su continuidad cuando falla el proveedor de BTC, la falta deliberada de intradía y el gráfico real publicado. Se conservan las salvaguardas previas contra datos sintéticos en producción.

## V4.7 — Índices bursátiles mediante SVG nativo (21/11/2026)

El panel «Índices bursátiles · Comparativa» ya **no usa el widget TradingView**. Reutiliza el renderizador SVG de «Oro, Plata y Cobre — Futuros comparados», con cinco curvas porcentuales normalizadas desde la primera fecha de cierre común (base 0 %), leyenda, cursor, inspección táctil, ampliación, modo día/noche y periodos 3D–10A o personalizados. Mantiene S&P 500 (^GSPC), Nasdaq Composite (^IXIC, no Nasdaq-100), Dow Jones (^DJI), Russell 2000 (^RUT) y EURO STOXX 50 (^STOXX50E): índices reales, no ETF ni futuros como sustitutos.

Los cierres diarios se consultan a demanda **en el navegador**, sin archivarlos ni redistribuirlos en GitHub Pages. Se usa el endpoint gráfico no oficial de Yahoo Finance mediante el intermediario CORS gratuito proxy.cors.dev; no se añaden gastos recurrentes, credenciales ni un backend. **Limitación material:** Yahoo Finance no ofrece una API pública estable ni garantiza permisos generales de exhibición; el intermediario gratuito tampoco garantiza disponibilidad. Si falla el feed se informa con claridad, sin fabricar datos. Una explotación comercial o de mayor fiabilidad necesitaría una fuente con licencia y SLA adecuados.

Se valida la identidad exacta de cada ticker y el formato de cierres positivos y fechados. Se comparan exclusivamente días comunes entre los índices recibidos, sin interpolar festivos ni mezclar periodos. Si falla alguna fuente se informa la cobertura parcial y su nombre. Si no se dispone de al menos dos índices y dos sesiones comunes no se representa una curva. Las series muestran índices de precios sin dividendos y sin conversión EUR/USD. En el selector **1D** se comunica expresamente la falta de intradía.

El workflow de verificación de índices comprueba motor, responsive, modal, temas y periodo global utilizando series sintéticas **exclusivamente dentro de tests interceptados**, nunca desplegadas. Una prueba independiente informa del estado real del proveedor cuando el acceso de red lo permite.

**Histórico:** el apartado V4.6 siguiente documenta la integración externa anterior, ahora sustituida por V4.7. La distribución de tarjetas V4.6 se conserva.

## V4.6 — Renta variable mundial y redistribución de TIPS/Fed-BCE (21/11/2026)

La cuadrícula principal de escritorio mantiene tres columnas y dos filas de 300 px, con proporciones aproximadas 26,5 % / 46,9 % / 26,5 %. El nuevo reparto (≥ 1200 px) es:

| Fila | Columna izquierda | Centro | Derecha |
| --- | --- | --- | --- |
| Superior | Curva Treasury 2/10/30Y | Futuros oro/plata/cobre | TIPS real 10Y e inflación implícita |
| Inferior | **Índices bursátiles (5)** | Ratio oro/plata | Tipos oficiales Fed/BCE |

Así, TIPS se sitúa directamente encima de Fed/BCE; la tarjeta de tipos ya **no ocupa dos filas**, sino 300 px, igual que las demás. No se comprimen sus datos: el detalle de fechas queda disponible en el atributo `title`, y las advertencias metodológicas en el control desplegable «Precisiones metodológicas». El gráfico mantiene cierres y escalas propios. En pantallas intermedias de 881–1199 px, la cuadrícula pasa a dos columnas (Treasury/Futuros; Índices/Ratio) y posteriormente dos filas anchas consecutivas TIPS y Fed/BCE, en ese orden. En móvil cada tarjeta ocupa su propia fila, sin alterar los datos originales.

**Comparación de cinco índices bursátiles:** S&P 500 (símbolo TradingView `SP:SPX`), **Nasdaq Composite** (`NASDAQ:IXIC`, no Nasdaq-100), Dow Jones Industrial Average (`DJ:DJI`), Russell 2000 (`TVC:RUT`) y EURO STOXX 50 (`TVC:SX5E`). El gráfico utiliza el widget gratuito oficial de TradingView, cuyos símbolos de comparación usan la escala común `SameScale` (porcentajes comparativos a partir de la referencia del gráfico). **No compara puntos nominales** de los cinco índices, ni presenta sus cifras como rentabilidades incluyendo dividendos. Russell 2000 y EURO STOXX 50 se suministran aquí como **referencias calculadas TVC**, no como cierres directos certificados del administrador del índice.

**Justificación de la fuente:** FRED publica las series SP500, DJIA y NASDAQCOM, pero SP500 está expresamente identificado como «Copyrighted: Pre-Approval Required». STOXX protege sus descargas históricas. La alternativa elegida utiliza un widget alojado y publicado por TradingView, que permite comparar varios índices sin volver a alojar ni redistribuir en GitHub sus cierres protegidos. No incorpora ninguna API premium, credenciales de usuario ni servicio de pago. En caso de bloqueo de TradingView, el panel muestra un mensaje y un enlace al proveedor; no se generan datos sustitutos.

**Periodos:** el control global solicita al widget un rango asociado (por ejemplo 1M, 12M, 60M o 120M). No debe considerarse una garantía de que TradingView reproduzca exactamente los límites de fechas del terminal: los días hábiles, cierres y referencia porcentual son gestionados por TradingView. Los periodos 3D y 2S se aproximan a 5D y 1M respectivamente; **un periodo personalizado no se puede sincronizar exactamente** mediante este widget y se avisa expresamente. No se interpolan ni fusionan series de los cinco índices. Europa y Estados Unidos tienen horarios y festivos diferentes; los índices se expresan en sus propias divisas (EURO STOXX 50 en EUR, índices estadounidenses en USD), sin conversión FX.

Se añade además «Explicación» al gráfico ampliado para interpretar subidas, caídas, cruces, diferencias porcentuales, pequeñas/grandes capitalizaciones y limitaciones de comparación internacional. El widget conserva el enlace de atribución a TradingView.

**Verificación:** workflow [Verificar cinco índices y nueva distribución](.github/workflows/verify-indices-v46.yml), con comprobación de ubicación, alineación, altura, enlaces de fuente, los cinco símbolos, periodo global, modal ampliado, tema diurno y responsive en 1600, 1495, 1200, 1024 y 390 px. [Evidencia de una prueba integral PASS](https://github.com/cgam-coder/metals-terminal/actions/runs/44916868188). Fuente y métodos: [TradingView · Advanced Chart](https://www.tradingview.com/widget-docs/widgets/charts/advanced-chart/), [comparación a la misma escala porcentual](https://www.tradingview.com/support/solutions/43000543053-compare-see-how-symbols-perform-side-by-side/), [FRED SP500](https://fred.stlouisfed.org/series/SP500) y [STOXX](https://www.stoxx.com/help).

## Aprovechamiento interior de los gráficos — 21/11/2026 · V4.5.4

Las tarjetas del dashboard de escritorio permanecen en filas de **300 px**, con igual altura, distribución horizontal intacta y tema día/noche. Antes, los trazados SVG centrales tenían unos **108 px** y los de Treasury/TIPS unos **88 px**, al reservar 66 px para largas notas de Futuros/Ratio y al imponer altura fija de 90 px a los gráficos macroeconómicos. Además, `svgPlot()` utilizaba valores de reserva cuando el contenedor medía 90 px, reduciendo el tamaño real de los textos y ejes.

**Cambio:** en escritorio las notas metodológicas de los gráficos centrales se presentan en un `<details>` accesible «Método y fuentes» (cerrado por defecto), conservando íntegro el contenido previo para su consulta. Los elementos de leyenda y nota siguen presentes, pero ya no consumen innecesariamente el área de dibujo. En móviles se conserva el texto completo mostrado en línea como antes. Treasury y TIPS recuperan altura flexible, con mínimos suficientes para que `svgPlot` pueda usar el tamaño real. En Treasury se compacta el resumen de cambios (periodo y Δ 2Y/10Y/30Y en una banda) y la etiqueta del spread tiene el nombre completo disponible como `title` para evitar que se corte el pie.

**Evidencia real**: [GitHub Actions #44915710985](https://github.com/cgam-coder/metals-terminal/actions/runs/44915710985), PASS en 1426, 1600, 1200, 1024 y 390 px (el último sin cambios de visualización). En escritorio a 1426 px, trazados SVG **Futuros/Ratio: 148/148 px**, **Treasury/TIPS: 111/143,8 px**, con cuatro tarjetas exteriores de 300 px y sin recorte de texto. Las alturas de los gráficos laterales no son idénticas porque contienen cantidades de metadatos distintas; la prioridad es que cada uno utilice el área disponible sin tapar estadísticas. La metodología de Futuros se puede desplegar sin perder información ni modificar datos. Regresiones de tema, distribución, temporalidades y guías de interpretación PASS.

## Filas compactas iguales — 21/11/2026

Las dos filas de la cuadrícula de escritorio ocupaban aproximadamente 554 px cada una y el usuario solicitó compactarlas manteniendo la igualdad. V4.5.3 las reduce a **300 px cada una** para pantallas de 881 px de ancho o más; permanecen en paralelo y alineadas Futuros/Treasury y Ratio/TIPS. Se mantienen las columnas 26,5 % / 46,9 % / 26,5 %, mientras Fed/BCE ocupa ambas filas en escritorio ancho. En móvil se preserva el apilado existente.

El diseño compacta de forma proporcionada la cabecera de Futuros/Ratio y los textos y estadísticas de Treasury/TIPS. Se reservan **66 px para las notas de procedencia** para que no se corten los avisos de futuros en 1200 px. Se mantienen completos los textos y los controles «Ampliar». En la vista publicada, el área SVG de Futuros y Ratio mide **108 px por gráfico**; Treasury y TIPS, **88 px por gráfico**. Son dimensiones del dibujo, no de la tarjeta.

Se cambia la URL de estilos a `theme.css?v=20261121-compact-rows-4`, junto a reglas críticas de distribución en el HTML para evitar que un CSS anterior restaurase las filas altas. Verificación [GitHub Actions #44915034288](https://github.com/cgam-coder/metals-terminal/actions/runs/44915034288): **PASS** con hojas de estilos nuevas y antiguas simuladas en 1495, 1440, 1200, 1024 y 390 px. Otra prueba [#44914693683](https://github.com/cgam-coder/metals-terminal/actions/runs/44914693683) comprobó 300px, paridad real de SVG, contenido no recortado y resultados de navegador. No se modificaron datos, cálculos ni ventanas temporales.

## Corrección resistente a caché: igualdad de filas en producción — 21/11/2026

Se detectó una discrepancia entre las capturas del navegador habitual y las pruebas con un navegador nuevo: un cliente podía conservar una copia antigua de `theme.css` porque el HTML la referenciaba sin versión. Esa copia mantenía la distribución anterior, con una primera fila alta y la segunda corta, a pesar de que el repositorio ya contenía el ajuste.

La V4.5.1 añade una nueva URL versionada `theme.css?v=20261121-equal-rows-2` y una regla de distribución crítica **después de esa hoja de estilos en el propio HTML**, de mayor especificidad. Por tanto, incluso si se simula la carga de `theme.css` del commit anterior `2947ae61...`, no reaparece la antigua distribución. Es un control de visualización, sin impacto en los datos.

**Validación deliberada de caché antigua**: [GitHub Actions #44914398866](https://github.com/cgam-coder/metals-terminal/actions/runs/44914398866), PASS tanto con CSS actualizado como con la hoja obsoleta simulada. En la resolución de la captura del usuario **1495 × 774 px**, primera y segunda filas: **554/554 px** (CSS reciente) y **553/553 px** (CSS anterior interceptado); SVG central: **305/305** y **304/304 px**; soportes Treasury/TIPS: **175/175 px** en ambos casos. La segunda fila queda debajo del primer bloque y requiere desplazamiento vertical para verla completa: **la igualdad de altura no equivale a encajar dos bloques de más de 550 px en una pantalla de 774 px de alto**.

Para comprobar una publicación nueva evitando el HTML también almacenado en caché, abrir directamente la URL con `?version=20261121-v451-layout`. La edición de las reglas no altera la distribución móvil.

## Corrección de altura real de los gráficos SVG — 21/11/2026

Una captura posterior detectó que la prueba anterior validaba únicamente las **tarjetas externas** con igual altura, no el área de dibujo contenida. Diagnóstico independiente [run #44913740830](https://github.com/cgam-coder/metals-terminal/actions/runs/44913740830): en 1426 px, ambas tarjetas centrales medían 562 px, pero sus SVG tenían aproximadamente 383 px (futuros) y 434 px (ratio); Treasury/TIPS medían 189 px y 379 px. La captura parcial de una ventana de 763 px de alto solo mostraba el comienzo de la segunda fila; el documento completo sigue siendo desplazable.

Se igualan realmente las áreas gráficas con CSS aplicado solo en escritorio desde 881 px: mismas alturas de cabecera, leyenda y notas para los dos gráficos centrales, y mismo alto fijo de 175 px para los canvas laterales Treasury/TIPS, sin recortar las fuentes ni los textos de los futuros. La vista móvil permanece sin cambios. A 1426 px, la segunda medición [run #44913911026](https://github.com/cgam-coder/metals-terminal/actions/runs/44913911026) confirma **304,77 px / 304,77 px** para SVG de futuros y ratio y **173 px / 173 px** para SVG de Treasury y TIPS. Paneles externos iguales, notas y leyendas no cortadas. Las regresiones de Treasury, columnas y guías Explicación también PASS.

## Corrección de alturas y alineación vertical — 21/11/2026

Tras redistribuir las anchuras, permanecía un desajuste de filas heredado del ajuste visual de Treasury: la primera fila tenía un mínimo de 545 px (535 px entre 881–1199 px) y la segunda solo 305 px (235 px). Como consecuencia, «Futuros comparados» y «Ratio Oro/Plata» tenían alturas distintas, igual que Treasury y TIPS a su izquierda.

Se sustituyeron las filas de escritorio por **dos pistas iguales** usando `grid-template-rows:repeat(2,minmax(545px,1fr))` desde 1200 px y `repeat(2,minmax(535px,1fr)) 180px` de 881 a 1199 px. En ambos casos, Futuros/Ratio y Treasury/TIPS tienen alturas idénticas y bordes horizontales alineados; Fed/BCE continúa ocupando las dos filas centrales desde 1200 px y permanece en su propia fila en la disposición intermedia. No cambia ninguna anchura, fuente, fórmula, gráfico ni vista móvil.

**Verificación visual real:** [GitHub Actions #44913501104](https://github.com/cgam-coder/metals-terminal/actions/runs/44913501104), PASS de las ocho resoluciones, comprobando matemáticamente igualdad de alturas con 2 px de tolerancia, alineación, visibilidad de los gráficos y ausencia de desbordamiento. En escritorio a 1440 px, las cuatro tarjetas alineadas miden **558,55 px cada una**; los gráficos centrales tienen alturas de **481,06 y 490,06 px** respectivamente. También PASS las regresiones independientes de legibilidad Treasury y explicaciones (mismos datos, temas y controles).

## Ajuste de anchuras del dashboard — 21/11/2026

La distribución de escritorio (a partir de 1200 px) se ajusta sobre la rejilla existente de tres columnas, conservando las mismas tarjetas y sus áreas: `1,30fr / 2,30fr / 1,30fr` en lugar de `1,06fr / 2,85fr / 1,07fr`. Porcentaje aproximado del ancho útil: **26,5 % Treasury/TIPS · 46,9 % Futuros/Ratio · 26,5 % Tipos oficiales**. Se reparte de manera equilibrada el espacio recuperado del centro entre ambos laterales, sin tocar fuentes, cálculos, temporalidades, gráficos ampliados ni la disposición móvil. La distribución alternativa de 881–1199 px y la columna única en móvil se mantienen.

**Prueba real:** [Verificar redistribución horizontal](.github/workflows/verify-columns.yml), PASS en 1920, 1600, 1440, 1280, 1200, 1024, 390 y 360 px. Para 1920 px la tarjeta central mide 882 px, ambas laterales 499 px; a 1440 px, 657 px en el centro y 371 px en cada lateral. Sin desbordamientos. Regresiones de legibilidad Treasury y explicaciones también PASS. [Evidencias GitHub Actions](https://github.com/cgam-coder/metals-terminal/actions/runs/44913152441).

## Corrección visual «Curva de rendimientos» — 21/11/2026

La tarjeta Treasury de escritorio tenía dos problemas combinados: el texto de la cabecera y las variaciones 2Y/10Y/30Y se envolvían de forma irregular en las columnas estrechas, y la fila superior del dashboard (300–365 px) era insuficiente para mostrar a la vez gráfico, leyenda y los cuatro valores inferiores; el pie se recortaba.

Se distribuyeron título y controles en filas intencionadas; los cambios del periodo se organizan como tres columnas bajo el selector y el recuento; los últimos rendimientos se presentan en una cuadrícula 2×2 con unidad y diferencial identificados. La altura de la primera fila del dashboard se adapta para que todos los textos sean visibles, manteniendo las mismas áreas, instrumentos, fuentes, series y fórmulas. Se conserva la accesibilidad diurna/nocturna y móvil.

**Evidencia independiente:** workflow [Verificar legibilidad de curva Treasury](.github/workflows/verify-curve-layout.yml) con comprobaciones visuales y geométricas (ausencia de recortes, solapamientos, desbordamientos y conservación de tres cambios y cuatro rendimientos) en escritorio a 1920/1440/1280/1024/900 px y móvil a 390/360 px, tanto en 1M como en 10A donde se ha ejercitado. Resultado PASS [GitHub Actions #44912665177](https://github.com/cgam-coder/metals-terminal/actions/runs/44912665177).

## Guías «Explicación» en gráficos ampliados — 21/11/2026

En las ventanas **Ampliar** de ocho indicadores se incorpora el botón **ⓘ Explicación**: comparativa de futuros GC/SI/HG, ratio oro/plata XAU/XAG, curva Treasury 2Y/10Y/30Y, TIPS real 10Y e inflación implícita, COT Managed Money, interés abierto CFTC, GVZ y tenencias físicas de ETF GLD/SLV.

Al pulsarlo se abre un panel de lectura independiente: qué mide la serie, qué indican las subidas o bajadas, cómo interpretar divergencias y cruces, cómo contrastarlo con otros indicadores y cuáles son sus límites. Los textos incluyen ejemplos porcentuales, la diferencia entre precio/OI/COT/tenencias, la periodicidad y cobertura real, y enlaces a fuentes oficiales o proveedores. Se advierte expresamente que **no son señales automáticas de compra o venta**, que GVZ representa solo oro y que GLD/SLV conserva una cobertura SEC parcial en 10A.

La explicación permanece **cerrada por defecto**, no cambia el gráfico, los precios ni el periodo seleccionado y se cierra mediante su botón, pulsando de nuevo «Explicación» o con Escape, devolviendo el foco al control. Al cerrar el gráfico se restablece la guía para que no aparezca abierta en otro indicador. En móvil la lectura es desplazable; en escritorio aparece en un lateral; se adapta a Día y Noche. No se añade nueva dependencia de datos, almacenamiento ni servicio.

Implementación: `explanations.js` mantiene ocho guías estáticas y la lógica accesible, `index.html` contiene el control y panel comunes y `theme.css` presenta los dos temas. La verificación independiente `.github/workflows/verify-explanations.yml` comprueba las ocho correspondencias, contenido, visibilidad, Escape, cierre, enfoque y ausencia de desbordamiento en 1440, 1024, 390 y 360 píxeles. Los gráficos individuales de futuros, las divisas, VIX y los tipos oficiales no añaden este botón porque no forman parte de las ocho explicaciones solicitadas.

## V4.5 — Diez años de historia: selección, validación y límites (20/11/2026)

**Selector global 10A.** Once periodos sincronizados (**1D, 3D, 1S, 2S, 1M, 3M, 6M, 1A, 2A, 5A y 10A**) en la cabecera y en los gráficos ampliados. El selector de fechas personalizadas admite un intervalo civil hasta diez años atrás, inclusive, sin permitir días futuros. Se conserva un único estado de periodo y la misma URL para ambos controles, así como los modos Día/Noche.

**Comprobación real del 20/11/2026** en Chromium conectado a Internet, tanto en escritorio como en móvil (no se infiere cobertura solo por la documentación del proveedor):

| Serie o gráfica | Primera observación acreditada | Observaciones comprobadas | Última observación del corte |
| --- | --- | ---: | --- |
| Futuros GC, SI, HG y BZ · Aethereal | 2016-10-06 | 2.542–2.544 por instrumento | 2026-11-19 |
| Referencias XAUS: XAU, XAG, DXY y EUR/USD | 2016-11-21 | 523 semanales por instrumento | 2026-11-20 |
| Treasury DGS2, DGS10, DGS30 y TIPS DFII10 · FRED | 2016-10-06 | 2.528 por serie | 2026-11-18 |
| Tipos oficiales Fed DFEDTARU y BCE ECBDFR · FRED | 2016-10-06 | 3.698 por serie | 2026-11-20 |
| CFTC Disaggregated Futures Only · GC/SI | 2016-10-11 en archivo; 2016-10-04 en consulta directa | 527–528 por metal | 2026-11-10 |
| VIX · Cboe vía FRED VIXCLS | 2016-10-06 | 2.578 cierres | 2026-11-19 |
| GVZ · Cboe vía FRED GVZCLS | 2016-10-06 | 2.547 cierres | 2026-11-19 |
| ETF GLD y SLV · SEC | 2021-09-30 | 20 trimestres comunes | 2026-06-30 |

**Cobertura parcial SEC:** se conserva un selector 10A para GLD/SLV pero **el gráfico no representa diez años completos**. Los datos anteriores a 2021 no se rellenan ni se sustituyen por inferencias. En la tarjeta y el panel de «Fuentes» se marca el alcance real. Los informes anteriores existen en SEC, pero el intento de extracción automatizada desde el ejecutor terminó con HTTP 403 tanto para documentos como para los índices de presentación; no se certificó una serie de 2016–2021 y no se importó ninguna cifra no validada. El contexto WGC/iShares sigue siendo puntual, no una falsa serie decenal; VXSLV y volumen diario CME siguen no integrados.

**Fuentes y derechos:** las nuevas series VIXCLS y GVZCLS proceden del emisor Cboe a través de FRED, con el estado **«Copyrighted: Citation Required»**. Se atribuye expresamente a Cboe y a FRED al mostrar y documentar los datos. Fuente: [VIXCLS](https://fred.stlouisfed.org/series/VIXCLS), [GVZCLS](https://fred.stlouisfed.org/series/GVZCLS), [avisos legales FRED](https://fred.stlouisfed.org/legal/). Su utilización en este terminal personal y no comercial no equivale a una autorización genérica para comercializar o redistribuir el contenido por terceros.

**Procesamiento y rendimiento:** el CSV de Aethereal contiene años anteriores, por lo que la web descarga el mismo archivo original del proveedor y extrae hasta diez años. La caché de cinco años existente puede conservarse como respaldo, pero no impide intentar recuperar el decenio. Las series macro siguen conservando todas sus observaciones oficiales para variaciones y estadísticas; el dibujo 10A utiliza el último cierre real de cada mes para mantener ejes legibles. Los gráficos de precios y COT también reducen la densidad del trazado a observaciones reales mensuales, sin interpolar ni alterar los cálculos basados en fechas comunes. No se añaden costes obligatorios, APIs premium, cron, telemetría ni dependencias de NagameAlert.

**Operación de datos:** `scripts/update_data.py` conserva ahora el horizonte de diez años en la actualización FRED manual. La campaña independiente `scripts/extend_history_10y.py` recuperó y certificó las seis series oficiales y las dos series CFTC; `scripts/extend_volatility_10y.py` hizo lo propio con VIXCLS y GVZCLS, con cotejos frente a los archivos previos. Todos los archivos están fechados y se publican con GitHub Actions únicamente tras validaciones. «Actualizar todo» **no renueva automáticamente** los archivos publicados en GitHub.

**Pruebas:** workflow [Verificar V4.5 - horizonte diez años](.github/workflows/verify-v45.yml) con cobertura de fuentes, temporalidad global/ventanas ampliadas, modo diurno, escritorio 1440px, móvil 390/360px y cortes personalizados históricos.

## V4.4 — Calidad de fuentes, temporalidad ETF y modal móvil (19/11/2026)

**Estado y procedencia.** `quality.js` muestra etiquetas discretas junto a los metadatos de las tarjetas de mercado, macro y V4, diferenciando consulta directa, caché local, archivo publicado, consulta pendiente, falta de datos y fecha antigua por periodicidad. El estado incorpora fecha efectiva verificable y, para la consulta macro, cuántas de las seis series proceden de FRED directo frente al archivo. Las advertencias se basan en umbrales orientativos (diarios: más de 3 días hábiles; macro: más de 4; CFTC: 15 días naturales; ETF SEC: 160 días; WGC: 55 días). Una advertencia **no demuestra** fallo de publicación: puede haber festivos, calendarios distintos o retraso previsto en la fuente. Para una fecha personalizada histórica no se interpreta la antigüedad respecto de hoy, sino la fecha del corte elegido.

**Actualizar todo.** Tras pulsar el botón, la página conserva la temporalidad y fuerza la comprobación de futuros frente al proveedor en vez de respetar la caché de tres horas. Aparece una barra discreta «Resultado de Actualizar todo» con resumen, accesible también como tabla desplegable con la vía de consulta y última fecha por fuente. El informe distingue «Consultando», «Sin dato», «Directo», «Archivo» y caché. **Recargar no actualiza archivos GitHub:** FRED archivado, CFTC, GVZ y SEC mantienen sus propias fechas hasta revisión/actualización autorizada. El botón no promete que un proveedor admita CORS ni datos intradía. La tabla detallada también figura dentro de «Fuentes». No se añaden servicios, tareas programadas, telemetría ni gastos.

**ETF GLD/SLV: periodo exacto por defecto.** El gráfico principal solo traza observaciones trimestrales SEC publicadas dentro de la temporalidad global. Si hay cero o una observación se muestra la ausencia de curva; el último informe conjunto publicado antes del inicio puede mostrarse únicamente como referencia, **expresamente rotulada «Anterior al periodo»**, no como una evolución del periodo. El botón «Contexto 2A» permite, voluntariamente y sin cambiar el periodo global, analizar dos años trimestrales. «Volver al periodo» recupera la ventana exacta. Elegir una nueva temporalidad global también desactiva el contexto opcional. La lógica de visibilidad `filed_at <= fecha final` permanece, evitando utilizar información no disponible en cortes históricos.

**Ampliación móvil.** La ventana ampliada aprovecha el alto disponible en móviles; «Fuente, fechas y metodología» y el contenido complementario WGC/iShares se presentan en secciones desplegables sin ocultar la posibilidad de consultar sus detalles. Se preservan el selector temporal común, gráfico táctil, cierre y accesibilidad por teclado. La calidad de la fuente es una capa de presentación; no modifica observaciones, precios ni fórmulas.

## Modo diurno / nocturno — 19/11/2026

La cabecera incorpora un botón **Noche / Día**. El aspecto nocturno original es la opción predeterminada; el modo diurno utiliza fondo crema claro, tarjetas blancas cálidas, contornos discretos y colores de series oscurecidos para conservar el contraste. Ambos estilos incluyen los siete mercados, gráficos macro, fila V4, calendarios, tooltips y ventanas de **Ampliar**, tanto en escritorio como en móvil.

La elección se aplica sin recargar la página y se guarda únicamente en el almacenamiento local del navegador (`localStorage`, clave `metals-terminal-theme`), cuando el navegador lo permite. Se recupera antes de dibujar la interfaz para evitar un destello oscuro al abrir en modo Día. Si el almacenamiento no está disponible, el selector funciona durante la sesión pero no conserva la preferencia. No se infiere automáticamente el tema del sistema: Noche sigue siendo la opción inicial.

Código: `theme.css` (paleta diurna encapsulada) y `index.html` (control accesible); GitHub Pages publica ambos. **No cambian cálculos, orígenes, ventanas temporales, permisos de datos, tareas programadas ni costes.** La prueba independiente `Verificar tema diurno/nocturno` comprueba contraste de cabeceras y ejes, persistencia, calendario, gráficos ampliados, restauración del modo nocturno y ausencia de desbordamiento en 1440/390/360 px. Además se corrigió una referencia obsoleta a `market-stamp` que podía producir un error JavaScript al redimensionar, sin alterar el contenido de las series.

## V4.3 — ETF físicos · GLD frente a SLV (19/11/2026)

La cuarta tarjeta inferior pasa de dos cifras no equivalentes a una **comparativa de las tenencias físicas GLD (oro) y SLV (plata)**, con líneas dorada y plateada. Cada línea indica la variación porcentual desde la primera fecha de informe SEC disponible conjuntamente y publicada a la fecha del filtro; las cifras absolutas muestran toneladas de oro GLD y millones de onzas troy de plata SLV a la última fecha común.

**Datos y limitaciones:** `data/v4-etf-sec-quarterly.json` contiene 20 observaciones GLD y 21 SLV entre 30/09/2021 y 30/09/2026, con 20 fechas comunes, obtenidas de informes 10-Q/10-K públicos de SEC y cotejadas con el recopilador independiente Silver Dominion. Cada punto guarda fecha de tenencias, primera fecha de presentación SEC del informe y URL de su archivo; son cifras con redondeo de dos decimales, no un archivo oficial diario del ETF. GLD tiene su último informe común a **30/06/2026** (presentado 04/08/2026) y SLV dispone además de un informe a **30/09/2026** (presentado 06/11/2026). El gráfico empareja solamente observaciones cuya publicación ya consta antes de la fecha final elegida, evitando datos futuros en consultas históricas.

**Horizonte:** los informes son trimestrales. En V4.3, los selectores cortos utilizaban automáticamente una vista estructural de dos años; **desde V4.4 esa excepción es opcional**, y la vista principal respeta el periodo global. En 1A, 2A, 5A y fechas personalizadas, se respeta la ventana pedida; con cero o un dato coincidente se muestra explicación, no gráfico fabricado. «Ampliar» conserva las dos líneas y añade aparte flujos globales WGC para oro y el último dato SLV, sin mezclarlos como series comparables.

**Licencia:** se rechazó reproducir o redistribuir el Excel diario oficial de GLD porque su primera pestaña prohíbe expresamente la redistribución sin permiso. La fuente integrada usa cantidades declaradas públicamente en **SEC EDGAR** (datos factuales de informes regulatorios); las fechas de presentación se contrastaron contra el JSON oficial de `data.sec.gov/submissions/`. La descarga Excel de iShares SLV no contiene un histórico diario equiparable de toneladas. Sin API premium, servicios de pago ni programación periódica; el histórico SEC es una instantánea fechada cuya revisión/actualización sigue siendo manual.

**Verificación:** prueba aislada [GitHub Actions #44550747821](https://github.com/cgam-coder/metals-terminal/actions/runs/44550747821) superada: dos series verificadas en 1440, 1024, 390 y 360 px, ampliación con contexto WGC legible y sin desbordamientos, 19 observaciones comunes en 5A, filtro as-of excluyendo el informe de 30/06/2026 cuando se consulta el terminal con fecha final 31/07/2026. No se alteran los históricos de futuros GC/SI/HG/BZ.

**Fuentes:** https://www.sec.gov/edgar/search/ ; https://data.sec.gov/submissions/CIK0001222333.json ; https://data.sec.gov/submissions/CIK0001330568.json ; https://silverdominion.com/market-tools/gold-silver-etf-holdings-tracker/ ; https://www.gold.org/goldhub/data/gold-etfs-holdings-and-flows .



## V4.2 — Retirada de FedWatch sin datos gratuitos integrables (19/11/2026)

Se elimina el panel FedWatch y su modal de Metals Terminal. «Tipos oficiales de interés» recupera toda su columna en escritorio y su tarjeta normal en móvil. Continúan intactos los **cuatro** paneles inferiores: COT oro/plata, interés abierto semanal CFTC, GVZ y flujos ETF/ETP. No se instala API CME de pago, no se calculan probabilidades sin base y no se modifica el resto del terminal.

## V4.1 — Comparación simultánea oro/plata en COT e interés abierto (19/11/2026)

- Los gráficos **COT** e **interés abierto CFTC** representan simultáneamente oro GC (línea dorada) y plata SI (línea plateada), tanto en las tarjetas pequeñas como al pulsar «Ampliar».
- COT: eje común **Managed Money neto / interés abierto de cada metal (%)**. Las cifras netas absolutas de contratos y los percentiles históricos se conservan visibles por separado sobre las curvas.
- Interés abierto: eje común **variación porcentual desde la primera fecha de informe que comparten ambas series (base 0 %)**. El número absoluto de contratos abiertos de oro y plata se muestra en la cabecera de la tarjeta; así no se mezclan sus escalas absolutas.
- Únicamente se comparan fechas de informe CFTC Futures Only coincidentes. No se interpolan semanas ausentes, ni se sustituye el volumen diario CME aún pendiente. Al elegir un periodo sin dos fechas comunes, se muestran los valores verificados disponibles sin inventar una línea.
- Ambos gráficos utilizan fuentes y costes exactamente iguales a V4.0. La selección temporal y el calendario siguen siendo globales y las vistas ampliadas utilizan los mismos datos.

## V4.0 — Posicionamiento y expectativas (19/11/2026)

**Histórico de V4.0 (revisado en V4.2):** originalmente se incorporaron cinco paneles, incluido FedWatch. Posteriormente se retiró FedWatch por falta de una fuente gratuita integrable. En producción permanecen cuatro tarjetas — COT, interés abierto/volumen, volatilidad implícita y ETF/ETP — en la fila inferior (4 columnas escritorio, 2 tableta, 1 móvil). Se mantiene el selector temporal global, calendarios y modal de «Ampliar»; no se modifica la definición de GC/SI/HG/BZ ni la fuente de sus cierres.

**Datos realmente operativos:**
- **COT oro/plata:** CFTC Disaggregated Futures Only (Gold COMEX 088691, Silver COMEX 084691); cinco años, 263 informes por metal. Últimas posiciones disponibles en el corte (martes 10/11/2026), Managed Money neto GC +112.341 contratos y SI +3.615; percentiles históricos calculados sobre neto/interés abierto. `data/v4-cot-snapshot.json` es respaldo con fuente y fecha; se intenta consulta directa cuando CORS lo permite. El campo de publicación exacta no está en cada registro y no debe inferirse.
- **Interés abierto:** 404.725 contratos de GC del último informe CFTC del 10/11/2026; es **semanal**, no sustituto de OI/volumen diarios CME. Volumen diario: pendiente de fuente verificable y autorización de integración.
- **GVZ:** histórico de FRED/Cboe (1.268 cierres), instantánea de `data/v4-gvz-snapshot.json`; último cierre verificado para este corte, GVZ 26,46 a 17/11/2026. Se intenta FRED directo; ante bloqueo CORS se conserva el corte fechado con atribución. **VXSLV**: fuente Cboe pública identificada, pero sus derechos de redistribución en esta web no están acreditados; no se representa una serie vigente a partir del FRED discontinuado.
- **ETF/ETP:** dos hechos públicos, no una serie comparable: WGC (octubre 2026, publicado 05/11/2026): +2,7 mil millones USD en flujos netos de ETF físicos globales de oro y tenencias 4.275 t; iShares SLV (11/11/2026) 15.684,52 t mantenidas en el trust. `data/v4-flows-facts.json` conserva ambas fechas y enlaces oficiales. No se equiparan a flujos globales de plata ni se dibuja un histórico que no consta.
- **FedWatch:** tarjeta funcional de navegación y ampliación con enlace CME, sin porcentajes cuando no pueden obtenerse de fuente autorizada gratuita. La API CME FedWatch EOD se ofrece desde **25 USD/mes**, incompatibles con el presupuesto; no se contrata.

**Pruebas:** V4 aislada en `preview/v4/`, [recertificación Chromium (escritorio 1440, tableta 1080, móvil 390 y 360 px)](https://github.com/cgam-coder/metals-terminal/actions/runs/44531290207) PASS técnico: sin errores JavaScript, sin desbordamiento horizontal, COT/OI/GVZ con curvas reales, selectores Oro/Plata y ampliación COT, datos WGC/SLV visibles. Se mantienen HOLD de fuente/permiso para diario CME, VXSLV, histórico ETF/ETP y probabilidades FedWatch.

**Operación:** coste incremental obligatorio 0 €, sin cron, sin dependencia de nuevos proveedores de pago. Los archivos propios están fechados y solo cambian mediante revisión manual; no se presentan como datos en tiempo real. Documento de requisitos y aceptación: [ESPECIFICACION_V4_POSICIONAMIENTO_EXPECTATIVAS_20261119.md](docs/ESPECIFICACION_V4_POSICIONAMIENTO_EXPECTATIVAS_20261119.md).



Terminal personal estático (HTML/CSS/JS/SVG), con selector global de diez periodos **1D, 3D, 1S, 2S, 1M, 3M, 6M, 1A, 2A y 5A** junto a «Actualizar todo». No hay trabajos periódicos ni servicios nuevos de pago.

## Validación real de widgets intradía — 19/11/2026

Prueba aislada en Chromium conectado a Internet, tanto en escritorio como en móvil, sobre `preview/intradia/`: **NO APTO para integrar**. Los cinco símbolos exactos `COMEX:GC1!`, `COMEX:SI1!`, `COMEX:HG1!`, `NYMEX:BZ1!` y `CBOE:VIX` se intentan cargar en widgets oficiales Web Components de TradingView, pero los gráficos avanzados responden «Invalid symbol» y «This symbol is only available on TradingView». Las miniaturas no proporcionan una alternativa válida; además, se registraron errores `Invalid timeframe format: 1W`. Los atributos 60/120/360 minutos se transmiten al widget, pero no constituyen evidencia de barras cargadas, y el parámetro de 3D no se aplica como periodo exacto. Véanse [run 44521814002 y su artefacto de capturas](https://github.com/cgam-coder/metals-terminal/actions/runs/44521814002). La [FAQ oficial TradingView](https://www.tradingview.com/widget-docs/faq/data/) atribuye ese mensaje a restricciones de permiso para mostrar el símbolo en widgets.

Decisión: **no introducir estos widgets en producción**. Mantener históricos verificables GC/SI/HG/BZ y VIX, sin sustituir futuros por spot. La estrategia de intradía automático, datos reales, gráficos SVG propios, cero pagos y licencia de redistribución sigue sin un proveedor válido acreditado. No existen nuevos crons ni suscripciones; solo se publican evidencias y una ruta de preview aislada.

## Corrección de carga de la ratio XAU/XAG ampliada — 18/11/2026

Cuando se cambia el intervalo dentro de «Ampliar» para la ratio spot XAU/XAG, el panel deja de depender de las respuestas ajenas de DXY y EUR/USD: se actualiza en cuanto terminan las solicitudes de **oro XAU y plata XAG** (ambas de XAUS) y hay fechas comunes suficientes. Cada consulta XAUS dispone de un plazo máximo de 16 segundos, incluido el procesamiento del cuerpo. Si falla una de las dos fuentes, o no hay al menos tres fechas comunes verificadas, el cuadro presenta una explicación explícita, no un indicador de «Consultando» indefinido.

Se mantienen el selector global sincronizado, el criterio de fechas comparables, la fuente XAUS y las restricciones originales: no hay precios de relleno, nuevos servicios ni trabajos automáticos. Una demora de DXY/EUR/USD ya no bloquea el gráfico de la ratio ampliada.

## Rango de fechas personalizado (Desde / Hasta) — 18/11/2026

El control compacto **«Seleccionar periodo»** aparece en la cabecera y en todos los gráficos ampliados. Al pulsarlo, abre un panel flotante con dos calendarios HTML, **Desde** y **Hasta**; el panel permanece oculto por defecto, permite cerrar tocando fuera o pulsando Escape y señala discretamente el rango activo. Se puede elegir un periodo civil inclusivo, incluso una sola fecha poniendo el mismo día en ambos campos, y pulsar **Mostrar**. El rango se aplica al terminal completo: siete mercados, comparativo GC/SI/HG, ratio spot XAU/XAG y gráficos Treasury, TIPS/inflación implícita y Fed/BCE. Ambos controles y la URL comparten el mismo estado (`?period=custom&from=YYYY-MM-DD&to=YYYY-MM-DD`). Pulsar cualquiera de los diez periodos predefinidos desactiva el rango; «Restablecer» vuelve a 1M. «Actualizar todo» conserva las fechas elegidas.

Se admiten fechas válidas **dentro de los últimos cinco años y hasta hoy**, inclusive, con fecha inicial anterior o igual a la final. El filtro respeta la fecha real de cada observación y no añade datos de otros días para completar la curva. Si solo existe un cierre, puede mostrarse su valor y fecha, pero no se inventa una línea temporal. Las series de futuros y VIX disponen de cierres diarios, el archivo FRED proporciona historia diaria cuando se ha publicado, y para tipos oficiales se utiliza el nivel conocido a la fecha de fin solicitada y la sucesión real de decisiones.

**Limitación XAUS:** los endpoints admiten ventanas relativas fijas, no consultas arbitrarias `from/to`. La terminal descarga la ventana mínima disponible que cubre la fecha inicial y recorta localmente hasta el final elegido. Para fechas anteriores al horizonte de dos años, XAUS ofrece el histórico 5A semanal; un rango de pocos días puede no contener suficientes puntos. Se informa de ello en el formulario. No se atribuyen precios semanales a días que no figuran en el histórico. Un rango antiguo o muy corto también puede presentar cobertura parcial por ausencia de datos de origen.

## Corrección de referencias DXY/EUR/USD y VIX — 18/11/2026

Los gráficos ampliados de **DXY** y **EUR/USD** ya no esperan al cierre de todas las solicitudes de XAUS para abandonar «Consultando». Cada serie actualiza su propio panel al recibir una respuesta validada o un error, con el plazo máximo de 16 segundos ya establecido para XAUS. Se mantiene la sincronización con el selector global y se evita mostrar los datos del intervalo anterior como actuales.

El **VIX** ya no depende únicamente del respaldo reciente de 35 cierres (30/09–17/11/2026). Se ha incorporado `data/vix-history.json`, una copia fechada de **1.262 cierres diarios de Cboe redistribuidos por datasets/finance-vix**, del 28/10/2021 al 22/09/2026 (su [archivo público](https://github.com/datasets/finance-vix/blob/main/data/vix-daily.csv) declara licencia ODC-PDDL-1.0; esto no acredita por sí solo las condiciones de licencia del origen Cboe). El respaldo reciente, también etiquetado Cboe, aporta 35 cierres hasta el 17/11/2026. La combinación usa fechas únicas y conserva el hueco **23–29/09/2026** sin rellenar precios.

Con los datos actuales, las ventanas muestran 22 cierres para 1M, 254 para 1A, 511 para 2A y 1.283 para 5A. La fuente primaria [Cboe VIX History](https://www.cboe.com/tradable-products/vix/vix-historical-data/) se sigue intentando consultar directamente; si CORS o red impiden la descarga, permanece el archivo propio con fechas y procedencia explícitas. Las vistas señalan cobertura insuficiente o ausencias conocidas, nunca trazan un periodo largo a partir de 35 puntos como si cubrieran años completos.

## Selección de temporalidad en gráficos ampliados

La ventana «Ampliar» de todos los gráficos incorpora los diez intervalos de la cabecera (**1D, 3D, 1S, 2S, 1M, 3M, 6M, 1A, 2A, 5A**). Ambos controles representan **la misma temporalidad global**: cambiarla dentro del gráfico ampliado actualiza también la selección de la página principal y la URL, sin cerrar la ventana. Al volver a abrir cualquier gráfico, se conserva el último periodo seleccionado.

Los paneles basados en cierres ya descargados (futuros, VIX y series macro FRED) cambian con los datos disponibles y respetan las limitaciones de cobertura. Las referencias XAUS (DXY, EUR/USD y ratio spot) muestran un mensaje de consulta hasta recibir los puntos correspondientes al nuevo intervalo, evitando presentar el periodo anterior como si fuera el nuevo. En 1D los futuros y el VIX no inventan una curva intradía.

## Histórico real de cinco años: 18 de noviembre de 2026

El terminal consulta directamente desde el navegador el dataset Commodity Prices de Aethereal, gratuito para investigación y educación: https://dataset.aethereal.top/datasets/commodity-prices

CSV original: https://dataset.aethereal.top/files/commodity-prices.csv

En la primera consulta sin caché se descarga el CSV original (aproximadamente 6,3 MB) y se extraen cuatro símbolos. Los cierres se validan en conjunto y se conservan opcionalmente en IndexedDB local durante tres horas. Una nueva apertura durante ese plazo reutiliza únicamente esos registros verificados; al vencer o pulsar «Actualizar todo» se comprueba el proveedor de nuevo. El fichero completo no se redistribuye en GitHub.

| Instrumento | Símbolo CSV | Cierres 17/11/2021–17/11/2026 | Último cierre comprobado (17/11/2026) |
|---|---|---:|---:|
| Oro GC | GC=F | 1258 | 3823,8 USD/oz |
| Plata SI | SI=F | 1257 | 46,720 USD/oz |
| Cobre HG | HG=F | 1258 | 5,9975 USD/lb |
| Brent BZ | BZ=F | 1258 | 93,18 USD/barril |

El código incluye alrededor de dos semanas anteriores adicionales para cubrir el periodo de 5A. La web publicada pasó una prueba real en navegador: las cuatro tarjetas mostraron aproximadamente 1265–1266 sesiones, y el gráfico comparado GC/SI/HG representó tres líneas de variación acumulada de precios, normalizadas al 0 % con cierres de las mismas fechas. El gráfico de 1M se filtró a unas 22 observaciones comunes.

**Diferencias de metodología:** Aethereal etiqueta las series como futuros de contrato próximo, pero no detalla un calendario de rollover ni el método exacto de ajuste. Pueden existir saltos por cambios de contrato. No se trata de cotizaciones oficiales en tiempo real, settlements oficiales de CME/ICE ni precios de ejecución. Los cierres de Aethereal difieren algo de los publicados por trading-commodity.com (aproximadamente 1,05 % para GC y 1,35 % para SI en el corte comprobado). Los proveedores **no se empalman**.

### Respaldo

Si la descarga o validación del CSV de cinco años falla, se conservan los últimos 15 cierres verificados del proveedor alternativo trading-commodity.com, con fecha y aviso de histórico incompleto. También existe una importación manual opcional de CSV desde «Fuentes»; los archivos importados se almacenan localmente en el navegador, no en GitHub.

## El resto de indicadores

- VIX: cierres históricos oficiales diarios de Cboe, no intradía.
- DXY, EUR/USD y ratio XAU/XAG: API XAUS, referencias indicativas; la ratio sigue siendo spot, no la ratio de futuros GC/SI.
- Treasury 2Y, 10Y y 30Y: series FRED DGS2/DGS10/DGS30, con curva de vencimientos e histórico temporal.
- Tipo real TIPS 10Y: serie FRED DFII10.
- Inflación implícita: DGS10 − DFII10. Contiene primas de riesgo y liquidez; no es una predicción pura de IPC.
- Fed: DFEDTARU (límite superior del rango oficial). BCE: ECBDFR (facilidad de depósito).

El selector global sincroniza las tarjetas, el comparativo, la ratio y todos los gráficos macro. Para 3D y 2S la API XAUS proporciona un intervalo superior (5D o 1M), que el navegador recorta exactamente a los últimos 3 o 14 días; 2A utiliza la opción 2y que la API documenta. Los periodos de 3/6 meses y 2 años se calculan con fechas de calendario, no redondeos de días. En días no hábiles, las series de cierres diarios muestran únicamente las sesiones realmente negociadas, sin inventar barras. **1D no significa futuros intradía**: Aethereal publica cierres diarios y el terminal no simula una curva de ticks que no posee.

## Corrección de visualización y recarga (18/11/2026)

Cada panel macro muestra ahora, aparte del último cierre, los **cambios específicos del periodo seleccionado**:

- **Treasury:** delta en puntos porcentuales de 2Y, 10Y y 30Y entre el primer y el último cierre del intervalo, y número de observaciones.
- **TIPS e inflación implícita:** delta en puntos porcentuales de ambos indicadores y número de fechas comunes.
- **Fed/BCE:** cambios de decisiones oficiales y delta en puntos porcentuales del techo de la Fed y la facilidad de depósito del BCE. Una línea horizontal con cero cambios es correcta si no hubo modificaciones.

El último valor publicado y su fecha no cambian al seleccionar otro periodo histórico: cambia el intervalo, sus observaciones y la variación acumulada. En vistas 1D con un solo cierre Treasury/TIPS no se inventa una curva.

El periodo global se conserva en la URL mediante el parámetro period. «Actualizar todo» fuerza la recarga de la página y conserva ese periodo, en vez de restablecer 1M.

## Histórico macro de cinco años disponible también en móvil

**Corrección de noviembre de 2026.** El archivo `data/series.json` publicado anteriormente solo incluía 11 observaciones de Treasury/TIPS y 2 de Fed/BCE; cuando el navegador móvil no podía consultar directamente los CSV de FRED, el terminal mostraba erróneamente «1A · 11 obs. · cobertura parcial». Se ha sustituido por seis series verificadas de cinco años completas, obtenidas directamente de FRED, y se ha cambiado la carga para utilizar primero esa copia **del mismo origen GitHub Pages**.

| Serie | Registros archivados | Último dato oficial archivado |
|---|---:|---|
| DGS2, DGS10, DGS30 y DFII10 | 1.264 cada una | 16/11/2026 |
| DFEDTARU y ECBDFR | 1.851 cada una | 18/11/2026 |

Los gráficos comparten el selector temporal único: en 1A hay 250 cierres comunes del Treasury y los TIPS y 366 observaciones de las series de tipos; en 5A hay 1.249 y 1.827, respectivamente. Los datos son observaciones reales, no interpoladas. El archivo original publicado se descarga sin depender de permisos CORS de `fred.stlouisfed.org`.

La consulta directa a FRED se mantiene para intentar obtener nuevas observaciones cuando el navegador lo permite. Si falla, se conservan las últimas fechas archivadas. **«Actualizar todo» no actualiza automáticamente el fichero publicado de GitHub**: para renovar esa copia se usa la ejecución manual del workflow `Actualizar datos macro oficiales` en GitHub Actions, sin cron. El script de actualización ahora conserva cinco años más un margen; anteriormente descartaba toda observación anterior a 400 días.

Es importante distinguir dato histórico completo de dato al minuto: una serie de cinco años puede terminar unos días antes de la fecha de consulta si FRED aún no ha publicado una actualización. El terminal siempre debe mostrar la fecha de cierre y si procede del CSV consultado directamente o de su archivo publicado.

## Legibilidad de históricos largos y móvil — V3.6

El historial de hasta cinco años de Treasury, TIPS e inflación implícita y Fed/BCE no ha perdido observaciones. Se ha rediseñado exclusivamente la **representación** para mejorar la lectura en pantallas móviles:

- Ejes SVG calculados en **píxeles CSS reales** del espacio gráfico. Esto evita que se estiren y deformen los textos al cambiar las proporciones de las tarjetas.
- Etiquetas de fecha distribuidas según el calendario (mes y año para 1A/2A; años para 5A), números del eje Y más legibles y alturas de gráficos móviles ampliadas.
- En **2A y 5A**, Treasury y TIPS/implícita se dibujan con el **último cierre real de cada semana**, sin medias ni observaciones inventadas. El cálculo de variaciones y el número de cierres del resumen siguen usando el histórico **diario completo**. Por ejemplo, 5A conserva 1.249 observaciones oficiales diarias y representa aproximadamente 260 puntos semanales legibles.
- Fed/BCE se dibujan con los escalones exclusivamente en las **fechas reales de cambios de tipos**, conservando el valor inicial y el último; la base histórica diaria completa sigue disponible. Los 38 cambios de 5A permanecen intactos.
- Treasury muestra explícitamente las tres líneas 10Y, 2Y y 30Y en su leyenda.
- Cada gráfico macro tiene un botón **Ampliar** que abre la vista grande, manteniendo la temporalidad global. Tocando o pasando el cursor sobre el gráfico se puede consultar la fecha y los valores de las observaciones representadas.

Las mejoras son de representación: no cambian las fuentes FRED, el método de cálculo, las fechas de observación ni crean gastos o procesos recurrentes.

## Macro: fechas oficiales, no instantáneas adelantadas

Los tres paneles de Treasury, TIPS/breakeven y Fed/BCE se actualizan al abrir la web mediante los CSV oficiales de FRED (DGS2, DGS10, DGS30, DFII10, DFEDTARU, ECBDFR). Las seis series se consultan para cinco años completos de historia; el selector global de 1D, 3D, 1S, 2S, 1M, 3M, 6M, 1A, 2A y 5A recorta las observaciones reales y **no vuelve a solicitar toda la historia en cada clic**.

Cuando se obtiene el CSV oficial de una serie, se usa íntegro en lugar de conservar mezclados valores de una instantánea anterior. Este detalle evita que un dato de la instantánea, fechado después del último cierre publicado por FRED, se interprete erróneamente como valor oficial reciente.

- **Curva de rendimientos de EE. UU.:** gráfico histórico por defecto de Treasury 2Y, 10Y y 30Y, con fechas reales; botón alternativo para comparar la curva de vencimientos entre inicio y último cierre disponible del periodo.
- **Tipo real e inflación implícita:** TIPS DFII10 y diferencia DGS10 − DFII10, únicamente cuando los dos datos corresponden a la misma fecha; sin interpolar festivos.
- **Tipos oficiales:** objetivo superior Fed DFEDTARU y depósito BCE ECBDFR, como escalones según las fechas reales de publicación. Tramo plano sin decisiones de tipos = ausencia real de cambios, no fallo del gráfico.

Cada panel indica fuente, periodo y fecha del último dato publicado. Los rendimientos Treasury y TIPS pueden tener un cierre disponible de fecha anterior a la de Fed/BCE porque las series no tienen por qué actualizarse al mismo tiempo. Si una descarga FRED falla, únicamente esa serie mantiene su respaldo fechado y la página identifica que está usando respaldo parcial. No se inventa ninguna evolución para periodos con una sola observación.

Fuentes:
- Treasury 2Y: https://fred.stlouisfed.org/series/DGS2
- Treasury 10Y: https://fred.stlouisfed.org/series/DGS10
- Treasury 30Y: https://fred.stlouisfed.org/series/DGS30
- TIPS 10Y: https://fred.stlouisfed.org/series/DFII10
- Fed rango objetivo superior: https://fred.stlouisfed.org/series/DFEDTARU
- BCE facilidad de depósito: https://fred.stlouisfed.org/series/ECBDFR

## Visualización unificada V3.7 — Todos los gráficos

Además de Treasury, TIPS y Fed/BCE, las **siete tarjetas superiores** (GC, SI, HG, BZ, DXY, EUR/USD y VIX), el **comparativo de futuros** y la **ratio spot XAU/XAG** utilizan ahora geometría SVG calculada con el tamaño real del contenedor.

- Las fechas del eje horizontal siguen la distancia temporal real; etiquetas adaptadas a 1D–5A, sin estirar los textos.
- Se mantienen ejes verticales y líneas más legibles en móvil. Las tarjetas pequeñas simplifican las etiquetas para evitar solapamientos.
- Para series largas con más de 360 observaciones se representan **cierres semanales reales**; siguen calculándose máximos, mínimos, porcentajes y demás estadísticas con todos los datos originales y conservándose la procedencia.
- Se incorporan botones **Ampliar** en los siete instrumentos y en el comparativo, además del existente para la ratio. La vista ampliada permite tocar la curva y consultar fecha y valor exactos de cada punto representado.
- Ante un cambio de anchura del dispositivo, los SVG se recalculan con las series ya cargadas, sin volver a consultar ni generar datos.
- Se mantiene un **único selector global** para todo el terminal, sin rangos temporales independientes en cada gráfico.

Limitación: algunos cierres proceden de fuentes indicativas (DXY/EUR/USD, ratio spot) y otros de futuros próximos (GC/SI/HG/BZ). La mejora de presentación no cambia su naturaleza, antigüedad, ni disponibilidad intradía.

## V3.8 — Cuatro mejoras aplicadas (18/11/2026)

1. **Ventanas temporales estrictas y 1D.** El código no recupera cierres anteriores al intervalo solicitado para forzar una línea. Cuando GC, SI, HG, BZ o VIX solo tienen cierres diarios y se pulsa 1D, muestran el último precio y la fecha, con un mensaje que explica la ausencia de cotización intradía. Para un rango con un único cierre no se simula una tendencia. DXY/EUR/USD sí pueden trazar una serie intradía si XAUS la proporciona.
2. **Terminología financiera.** El comparativo de futuros GC/SI/HG indica «variación acumulada del precio (%)», no rentabilidad invertible. Es una serie de contratos próximos con posible distorsión por rollovers, sin conocer por completo el ajuste de continuidad, comisiones, financiación y resultados reales de mantenimiento de posiciones.
3. **Navegación móvil.** Tres accesos internos discretos y fijos mientras se desplaza la página: Mercados, Comparativa y Macroeconomía. No añaden otro selector de tiempo ni afectan al tamaño del histórico. No aparecen en pantallas de escritorio.
4. **Caché y frescura.** El navegador guarda opcionalmente en IndexedDB las series verificadas de los cuatro futuros durante tres horas, ahorrando transferencias repetidas del CSV de unos 6,3 MB. La caché se comprueba por esquema, fecha, cobertura de cinco años, orden y precios válidos; si es inválida se ignora. Pulsar «Actualizar todo» fuerza una nueva consulta aunque la caché no haya vencido; la URL elimina el marcador temporal tras usarlo. Si la red falla, se conservan los datos validados con su última fecha publicada. Los avisos de retraso aparecen únicamente después de más de tres días hábiles en futuros/VIX, más de dos en referencias de mercado o más de cuatro en macro FRED. Se indica «comprobar publicación» porque los festivos pueden explicarlo.

Sin cron, nuevas suscripciones, telemetría, almacenamiento en servidor ni dependencia de NagameAlert.

## Coste y seguridad

- GitHub Pages gratuito dentro de su modalidad pública; sin backend, bases de datos ni claves.
- La web consulta los históricos al abrir cuando no hay caché validada reciente; IndexedDB guarda las cuatro series parseadas durante tres horas. «Actualizar todo» obliga a renovarlas. No se ejecutan trabajos de GitHub al abrirla.
- Despliegue Pages solo ante cambios de archivos; actualización macro por GitHub Actions es manual, no tiene cron.
- No se comparten recursos, secretos, D1 ni procesos de NagameAlert.
- Aethereal declara licencia gratuita para investigación y educación, no una autorización ilimitada de redistribución comercial; el archivo se consulta directamente en origen sin copiarse al repositorio.
- La validez del histórico de cinco años no garantiza continuidad contractual ajustada ni rentabilidad real de estrategias apalancadas.

Referencia estética: REFERENCIA_VISUAL_ACORDADA.png.
