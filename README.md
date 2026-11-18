# Metals Terminal V3.4 — Histórico de cinco años

Web: https://cgam-coder.github.io/metals-terminal/

Terminal personal estático (HTML/CSS/JS/SVG), con selector global de diez periodos **1D, 3D, 1S, 2S, 1M, 3M, 6M, 1A, 2A y 5A** junto a «Actualizar todo». No hay trabajos periódicos ni servicios nuevos de pago.

## Histórico real de cinco años: 18 de noviembre de 2026

El terminal consulta directamente desde el navegador el dataset Commodity Prices de Aethereal, gratuito para investigación y educación: https://dataset.aethereal.top/datasets/commodity-prices

CSV original: https://dataset.aethereal.top/files/commodity-prices.csv

Se descarga una sola vez al abrir la página (aproximadamente 6,3 MB) y se extraen cuatro símbolos. Se validan todos antes de sustituir las series de respaldo. Los valores no se inventan ni se redistribuye el CSV en GitHub.

| Instrumento | Símbolo CSV | Cierres 17/11/2021–17/11/2026 | Último cierre comprobado (17/11/2026) |
|---|---|---:|---:|
| Oro GC | GC=F | 1258 | 3823,8 USD/oz |
| Plata SI | SI=F | 1257 | 46,720 USD/oz |
| Cobre HG | HG=F | 1258 | 5,9975 USD/lb |
| Brent BZ | BZ=F | 1258 | 93,18 USD/barril |

El código incluye alrededor de dos semanas anteriores adicionales para cubrir el periodo de 5A. La web publicada pasó una prueba real en navegador: las cuatro tarjetas mostraron aproximadamente 1265–1266 sesiones, y el gráfico comparado GC/SI/HG representó tres líneas de rendimientos normalizados al 0 % con cierres de las mismas fechas. El gráfico de 1M se filtró a unas 22 observaciones comunes.

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

## Coste y seguridad

- GitHub Pages gratuito dentro de su modalidad pública; sin backend, bases de datos ni claves.
- La web consulta el dataset una vez por visita y al pulsar «Actualizar todo» (recarga). No ejecuta jobs de GitHub al abrirse.
- Despliegue Pages solo ante cambios de archivos; actualización macro por GitHub Actions es manual, no tiene cron.
- No se comparten recursos, secretos, D1 ni procesos de NagameAlert.
- Aethereal declara licencia gratuita para investigación y educación, no una autorización ilimitada de redistribución comercial; el archivo se consulta directamente en origen sin copiarse al repositorio.
- La validez del histórico de cinco años no garantiza continuidad contractual ajustada ni rentabilidad real de estrategias apalancadas.

Referencia estética: REFERENCIA_VISUAL_ACORDADA.png.
