# Metals Terminal · Oro y Plata · V2.1 (periodos ampliados)

Primera versión operativa de una web estática y gratuita, construida siguiendo la maqueta acordada. **No requiere Cloudflare, registro en nuevas APIs ni servidores de pago.**

## Abrir ahora

1. Descarga el ZIP y descomprímelo.
2. Abre `index.html` en Chrome o Edge. Con conexión a Internet el navegador consultará la API pública XAUS para dibujar sus propios gráficos de referencias XAU/USD, XAG/USD, DXY y EUR/USD. Los datos macro usan `data/series.json`; en algunos navegadores `fetch` de un archivo local no funciona por CORS, por lo que conviene usar la opción de servidor local.
3. Método recomendado: desde la carpeta `metals_terminal`, ejecuta `python -m http.server 8000` y visita `http://localhost:8000/`.

## Publicar a 0 € en GitHub Pages

El repositorio público es `cgam-coder/metals-terminal`. En **Settings → Pages → Build and deployment → Source** selecciona **GitHub Actions**. El workflow `.github/workflows/pages.yml` publica la web tras cambios de código/datos o una ejecución manual. No hay actualizaciones programadas. URL prevista: `https://cgam-coder.github.io/metals-terminal/`.

La acción `Actualizar datos macro oficiales` ya **no tiene cron**. Solo puede ejecutarse manualmente desde GitHub Actions (con permisos de escritura adecuados para `GITHUB_TOKEN`). Abrir el sitio **no ejecuta GitHub Actions** ni actualiza automáticamente las series oficiales; descarga la última instantánea guardada y muestra su fecha. Los widgets de mercado que están autorizados cargan cuando se abre la web, sujetos a sus propias licencias y frecuencia de datos. Se evaluará una consulta directa desde el navegador únicamente para fuentes que permitan acceso programático y CORS.

Si el workflow falla, **mantiene la última serie confirmada**; no inserta valores estimados. Verifica ocasionalmente la marca de fecha de la esquina superior derecha.

## Indicadores

**Mercado (gráficos nativos SVG):** XAU/USD, XAG/USD, su ratio calculada con observaciones coincidentes, DXY y EUR/USD usan la API de XAUS, gratuita para proyectos personales y con CORS autorizado. Los rangos 1D, 1S, 1M, 3M, 6M y 1A se consultan exclusivamente al entrar o al seleccionarlos. **No son futuros GC/SI, ni datos oficiales COMEX.** Los enlaces a futuros GC/SI siguen visibles; VIX utiliza el histórico de cierres diarios publicado por Cboe y consultado desde el navegador (no VIX en tiempo real). Cobre HG mantiene enlace externo al no disponerse de una fuente gratuita de futuros integrada en esta versión. Brent utiliza el widget permitido `TVC:UKOIL`, un **CFD derivado y no el futuro ICE BRN1!**, cuyo enlace se mantiene. La cotización es indicativa y depende del proveedor.

**Macro (JSON y renderizado SVG propio):** Treasury 2Y, 10Y, 30Y, spread 10Y−2Y; tipo real TIPS 10Y y breakeven 10Y, Fed límite superior del rango objetivo, BCE tasa de depósito. El breakeven no es una expectativa de inflación pura (incluye primas). Fuente histórica: series oficiales replicadas por FRED; instantánea inicial del Tesoro estadounidense 2–17 noviembre 2026, cotejada con publicaciones del Tesoro.

## Límites conocidos

- **No se suministran cotizaciones COMEX numéricas en la página.** Los gráficos propios son **referencias de mercado XAU/USD y XAG/USD**, no GC1!/SI1!. Las páginas de futuros externos se enlazan sin transcribir sus datos.
- La ratio es **XAU/XAG del mismo proveedor y fechas emparejadas**, no la ratio de los futuros GC/SI.
- La comparación oro/plata normaliza cada serie al 0 % del comienzo del periodo. Cambiar el periodo provoca una consulta, no una actualización continua. Sin datos fiables se muestran errores, nunca curvas ficticias.
- Los tipos Fed superior y BCE depósito son series de instrumentos **no idénticos**. Se presentan con etiquetas precisas.
- Las cotizaciones se consultan al entrar o cambiar el periodo y **no se vuelcan a GitHub**. Los datos macro del archivo solo se renuevan si se lanza su actualización manual. La instantánea inicial tiene fecha 17/11/2026.
- No contiene noticias, IA, señales de inversión ni información ajena al alcance acordado.

## Fuentes

- U.S. Treasury nominal: https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value_month=202611
- U.S. Treasury real: https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_real_yield_curve&field_tdr_date_value_month=202611
- Fed target upper: https://fred.stlouisfed.org/series/DFEDTARU
- BCE deposit: https://fred.stlouisfed.org/series/ECBDFR
- API de mercado XAUS (uso personal gratuito, CORS): https://xaus.com/api/
- Histórico VIX (Cboe, cierres diarios): https://www.cboe.com/tradable-products/vix/vix-historical-data/
- TradingView widget docs: https://www.tradingview.com/widget-docs/

## Estructura

- `index.html`: diseño e interacciones en un único HTML, sin frameworks.
- `data/series.json`: instantánea de series oficiales.
- `scripts/update_data.py`: actualización manual reproducible sin claves, usando solo Python estándar.
- `.github/workflows/update-data.yml`: actualización macro **solo manual**; sin cron.
- `.github/workflows/pages.yml`: despliegue tras cambios de código/datos o ejecución manual, no periódico.

## Referencia estética

`REFERENCIA_VISUAL_ACORDADA.png` conserva la última maqueta elegida. La disposición de bloques, paleta, curva, datos macro, futuros y gráficos se ha reproducido en HTML/CSS. Los gráficos de oro, plata y ratio son SVG nativos, y conservan el lenguaje visual de la maqueta sin depender de la incrustación de gráficos de TradingView.

## Pruebas reproducibles

El proyecto se ha verificado localmente con Node.js para los cálculos del frontend y Python para la sintaxis del actualizador. Las pruebas de integración con cotizaciones externas y la primera ejecución real del cron deben validarse después de la publicación: no se afirma que estén superadas.

Para un repositorio público GitHub Pages puede alojar la web sin coste adicional en GitHub Free. Es necesario elegir explícitamente **Settings → Pages → Source: GitHub Actions**; la configuración inicial de Pages necesita efectuarse desde la cuenta de GitHub. El workflow de despliegue se puede ejecutar también desde Actions → Publicar Metals Terminal → Run workflow.

Este repositorio incluye `.nojekyll` para servir archivos estáticos literalmente. No contiene credenciales. No introducir secrets, tokens ni cuentas de NagameAlert.
## Modo de consulta por apertura

- **0 workflows programados** y cero gasto adicional previsto en servicios.
- Al abrir la web, el navegador solicita las series de mercado seleccionadas a `https://xaus.com/api/v1/chart` y muestra su último dato, fecha y procedencia.
- Cambiar el periodo repite únicamente las consultas de ese periodo. Cerrar la pestaña detiene toda actividad del terminal.
- El proveedor limita y cachea los datos. «Consulta en apertura» no equivale a tick-by-tick ni a tiempo real oficial de futuros.

## Periodos y vistas gráficas (18/11/2026)

- Oro/plata: selector **1D, 1S, 1M, 3M, 6M, 1A y 5A**. Para 5A, la API XAUS devuelve barras semanales; su endpoint diario limita el historial a dos años.
- Curva Treasury, tipos Fed/BCE y tipo real TIPS/breakeven: **1M, 1A y 5A**, independientemente por panel. Los seis CSV de FRED se consultan directamente desde el navegador al entrar; comprobados permisos CORS desde GitHub Pages. Sin cron.
- Treasury permite alternar **Curva** (comparación con el inicio del periodo elegido) e **Histórico** (2Y/10Y/30Y en el tiempo).
- Fed/BCE: gráficos en escalón, adecuados para los tipos oficiales discretos. La serie Fed representa el techo del rango y BCE la facilidad de depósito; son indicadores distintos.
- Ratio oro/plata: panel de mayor altura con selector **Vista: ratio / Vista: cambio %** y botón **Ampliar**. Su base son XAU/USD y XAG/USD del mismo proveedor y marcas temporales comparables.
- VIX: último cierre y minigráfico con **vista ampliada histórica (1M, 1A, 5A)**. Fuente: CSV Cboe de cierres diarios, nunca una cotización VIX intradía.
- Cobre: gráfico embebido funcional `OANDA:XCUUSD`, un **CFD en USD/lb distinto del futuro HG**. Se mantiene acceso al futuro HG en TradingView. El panel admite ampliación.
- Brent: gráfico embebido funcional `TVC:UKOIL`, **CFD distinto del futuro ICE BRN1!**, con enlace al instrumento de referencia y ampliación.

Datos siempre fechados o etiquetados según instrumento. No se garantiza precio de ejecución, feed COMEX oficial ni puntualidad tick-by-tick. No se crea ninguna tarea recurrente.

## Tarjetas de futuros GC y SI (18/11/2026)

Las dos tarjetas destacadas de la cabecera muestran directamente el **último cierre publicado del futuro front-month** GC (oro) y SI (plata), no XAU/USD ni XAG/USD spot. El navegador solicita **una vez por apertura** las tablas HTML públicas de `https://trading-commodity.com/download/gc/` y `/si/` y valida instrumento, columnas, fechas y precios antes de dibujar los 15 últimos cierres.

- Los gráficos muestran el movimiento real de los **cierres de las 15 últimas sesiones** con escala vertical automática, fecha inicial y final, máximos y mínimos de cierre, rendimiento de esas sesiones y variación respecto al cierre anterior. Incluyen punto final y lectura al pasar el cursor.
- El precio está identificado como **cierre diario del contrato próximo**, no como cotización intradía ni *settlement* oficial de CME. La tabla se actualiza tras el cierre estadounidense según su proveedor; se muestra siempre la fecha observada y un aviso de antigüedad cuando corresponde.
- Las series históricas XAU/XAG utilizadas en el gráfico comparativo y en la ratio permanecen separadas, expresamente etiquetadas **spot** para que no se mezclen con futuros.
- No se añade una tarea programada, una API privada ni un servicio de pago. En caso de fallo de consulta no se sustituye el futuro por el precio spot, ni se inventa un cierre.
