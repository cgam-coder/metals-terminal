# Metals Terminal · Oro y Plata · V1.0

Primera versión operativa de una web estática y gratuita, construida siguiendo la maqueta acordada. **No requiere Cloudflare, registro en nuevas APIs ni servidores de pago.**

## Abrir ahora

1. Descarga el ZIP y descomprímelo.
2. Abre `index.html` en Chrome o Edge. Con conexión a Internet deberían renderizarse los widgets oficiales de TradingView. Los gráficos macro usan `data/series.json`; en algunos navegadores `fetch` de un archivo local no funciona por CORS, por lo que conviene usar la opción de servidor local.
3. Método recomendado: desde la carpeta `metals_terminal`, ejecuta `python -m http.server 8000` y visita `http://localhost:8000/`.

## Publicar a 0 € en GitHub Pages

El repositorio público es `cgam-coder/metals-terminal`. En **Settings → Pages → Build and deployment → Source** selecciona **GitHub Actions**. El workflow `.github/workflows/pages.yml` publica la web y vuelve a desplegarla después de cada actualización diaria. URL prevista: `https://cgam-coder.github.io/metals-terminal/`.

La acción `Actualizar datos macro oficiales` se ejecuta de lunes a viernes a las 06:15 UTC (el dato macro puede aún no ser el último cierre de EE. UU. a esa hora; se capturará al día siguiente). Se puede ejecutar manualmente desde la pestaña Actions. Los cron de GitHub Actions no están garantizados al minuto, pueden retrasarse o desactivarse según el uso del repositorio. Requiere permisos de escritura adecuados para `GITHUB_TOKEN`.

Si el workflow falla, **mantiene la última serie confirmada**; no inserta valores estimados. Verifica ocasionalmente la marca de fecha de la esquina superior derecha.

## Indicadores

**Mercado (widgets de TradingView):** futuro continuo oro GC1!, plata SI1!, ratio spot GOLDSILVER, DXY TVC, EURUSD FX, VIX TVC, Brent ICEEUR BRN1!, cobre HG1!. Los widgets gratuitos pueden mostrar datos retrasados y pueden no cargar en navegadores con bloqueo de terceros. Las cifras son servidas por el propio proveedor; **no se emplean para cálculos programáticos**.

**Macro (JSON y renderizado SVG propio):** Treasury 2Y, 10Y, 30Y, spread 10Y−2Y; tipo real TIPS 10Y y breakeven 10Y, Fed límite superior del rango objetivo, BCE tasa de depósito. El breakeven no es una expectativa de inflación pura (incluye primas). Fuente histórica: series oficiales replicadas por FRED; instantánea inicial del Tesoro estadounidense 2–17 noviembre 2026, cotejada con publicaciones del Tesoro.

## Límites conocidos

- No se promete **tiempo real de COMEX** sin licencia. El widget indica el precio que proporciona TradingView y su retraso. Las cotizaciones de futuros que aparecen en la web no son datos reutilizables mediante API.
- El símbolo **TVC:GOLDSILVER es ratio spot**, no el cociente de los futuros GC1!/SI1!, por lo que se etiqueta expresamente.
- La representación comparada de GC/SI utiliza el widget de TradingView y la opción `compareSymbols`; si el proveedor no admite comparación en la cuenta/navegador, se puede añadir plata desde su propia interfaz.
- Los tipos Fed superior y BCE depósito son series de instrumentos **no idénticos**. Se presentan con etiquetas precisas.
- Los datos solo se actualizan por scripts de GitHub si se publica el repositorio y se configura Actions. La instantánea incluida tiene fecha 17/11/2026.
- No contiene noticias, IA, señales de inversión ni información ajena al alcance acordado.

## Fuentes

- U.S. Treasury nominal: https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value_month=202611
- U.S. Treasury real: https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_real_yield_curve&field_tdr_date_value_month=202611
- Fed target upper: https://fred.stlouisfed.org/series/DFEDTARU
- BCE deposit: https://fred.stlouisfed.org/series/ECBDFR
- TradingView widget docs: https://www.tradingview.com/widget-docs/

## Estructura

- `index.html`: diseño e interacciones en un único HTML, sin frameworks.
- `data/series.json`: instantánea de series oficiales.
- `scripts/update_data.py`: actualización reproducible sin claves, usando solo Python estándar.
- `.github/workflows/update-data.yml`: actualización macro automática gratuita.
- `.github/workflows/pages.yml`: despliegue desde GitHub Actions tras cambios o actualización macro.

## Referencia estética

`REFERENCIA_VISUAL_ACORDADA.png` conserva la última maqueta elegida. La disposición de bloques, paleta, curva, datos macro, futuros y gráficos se ha reproducido en HTML/CSS. Los widgets de mercado, al ser de un tercero, no pueden reproducir exactamente todos los detalles de la maqueta dentro de su área.

## Pruebas reproducibles

El proyecto se ha verificado localmente con Node.js para los cálculos del frontend y Python para la sintaxis del actualizador. Las pruebas de integración con cotizaciones externas y la primera ejecución real del cron deben validarse después de la publicación: no se afirma que estén superadas.

Para un repositorio público GitHub Pages puede alojar la web sin coste adicional en GitHub Free. Es necesario elegir explícitamente **Settings → Pages → Source: GitHub Actions**; la configuración inicial de Pages necesita efectuarse desde la cuenta de GitHub. El workflow de despliegue se puede ejecutar también desde Actions → Publicar Metals Terminal → Run workflow.

Este repositorio incluye `.nojekyll` para servir archivos estáticos literalmente. No contiene credenciales. No introducir secrets, tokens ni cuentas de NagameAlert.