# Metals Terminal V4.3 — Posicionamiento y expectativas

Web: https://cgam-coder.github.io/metals-terminal/

## V4.3 — ETF físicos · GLD frente a SLV (19/11/2026)

La cuarta tarjeta inferior pasa de dos cifras no equivalentes a una **comparativa de las tenencias físicas GLD (oro) y SLV (plata)**, con líneas dorada y plateada. Cada línea indica la variación porcentual desde la primera fecha de informe SEC disponible conjuntamente y publicada a la fecha del filtro; las cifras absolutas muestran toneladas de oro GLD y millones de onzas troy de plata SLV a la última fecha común.

**Datos y limitaciones:** `data/v4-etf-sec-quarterly.json` contiene 20 observaciones GLD y 21 SLV entre 30/09/2021 y 30/09/2026, con 20 fechas comunes, obtenidas de informes 10-Q/10-K públicos de SEC y cotejadas con el recopilador independiente Silver Dominion. Cada punto guarda fecha de tenencias, primera fecha de presentación SEC del informe y URL de su archivo; son cifras con redondeo de dos decimales, no un archivo oficial diario del ETF. GLD tiene su último informe común a **30/06/2026** (presentado 04/08/2026) y SLV dispone además de un informe a **30/09/2026** (presentado 06/11/2026). El gráfico empareja solamente observaciones cuya publicación ya consta antes de la fecha final elegida, evitando datos futuros en consultas históricas.

**Horizonte:** los informes son trimestrales. Para los selectores cortos (1D, 3D, 1S, 2S, 1M, 3M, 6M) se usa **vista estructural propia de los últimos 2 años, expresamente etiquetada**, ya que esos intervalos no proporcionan suficientes trimestres para una curva. En 1A, 2A, 5A y fechas personalizadas, se respeta la ventana pedida; con cero o un dato coincidente se muestra explicación, no gráfico fabricado. «Ampliar» conserva las dos líneas y añade aparte flujos globales WGC para oro y el último dato SLV, sin mezclarlos como series comparables.

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
