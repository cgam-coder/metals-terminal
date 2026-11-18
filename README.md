# Metals Terminal V3.0 — Oro, plata y contexto macro

Web: https://cgam-coder.github.io/metals-terminal/

## Arquitectura y estado

Terminal estático de gráficos nativos SVG/JavaScript. Publicado en GitHub Pages con coste incremental cero en la modalidad gratuita. Se comprobó en navegador el 18/11/2026: cinco tarjetas superiores, dos de materias primas, ratio única, curva Treasury, política monetaria y TIPS. No se detectaron solapamientos ni errores gráficos durante la auditoría visual.

El navegador consulta las fuentes cuando se abre el terminal o se cambia la temporalidad. No hay actualizaciones de mercado programadas ni dependencia operativa de NagameAlert. El workflow de datos macro solo tiene activación manual; el workflow de Pages publica cambios de código/datos.

## Instrumentos y fuentes

| Elemento | Dato | Fuente |
|---|---|---|
| Oro | GC, futuro próximo: cierre diario | https://trading-commodity.com/download/gc/ |
| Plata | SI, futuro próximo: cierre diario | https://trading-commodity.com/download/si/ |
| Cobre | HG, futuro próximo: cierre diario | https://trading-commodity.com/download/hg/ |
| Brent | BZ, futuro próximo: cierre diario | https://trading-commodity.com/download/bz/ |
| DXY | Referencia indicativa del USD Index | https://xaus.com/api/ |
| EUR/USD | Referencia indicativa de divisas | https://xaus.com/api/ |
| VIX | Cierre diario oficial del índice | https://www.cboe.com/tradable-products/vix/vix-historical-data/ |
| Oro, Plata y Cobre comparados | GC/SI/HG, cierres futuros del contrato próximo en fechas comunes, base 0 % | https://trading-commodity.com/download/ |
| Ratio oro/plata | XAU/XAG spot, separada de los futuros | https://xaus.com/api/ |

No hay feed COMEX o ICE intradía en el sitio. Los cierres de GC, SI, HG y BZ son publicados por una fuente externa y no constituyen precios ejecutables ni settlements oficiales de las bolsas. Las tablas públicas contienen solo las últimas 15 sesiones. El terminal muestra las observaciones disponibles para el periodo seleccionado y avisa si este excede la cobertura; nunca crea datos intermedios. Dispone de instantáneas de respaldo, fechadas, para mantener los últimos cierres verificados ante fallos de consultas. El comparativo principal usa solo estos cierres de futuros en fechas comunes. El gráfico inferior de ratio usa spot XAU/XAG y nunca mezcla los instrumentos.

## Un único selector de periodos

La cabecera contiene exclusivamente los botones globales **1D · 1S · 1M · 1A · 5A** junto a **Actualizar todo**. No hay botones de tiempo en cada gráfico. Cambiar la temporalidad modifica a la vez la comparación de futuros GC/SI/HG, su ratio spot XAU/XAG, las siete tarjetas superiores, VIX, bonos Treasury, TIPS/breakeven y Fed/BCE. La vista de curva/histórico Treasury y la presentación de la ratio (valor/cambio porcentual) siguen siendo controles de tipo de gráfico, no rangos temporales.

**Actualizar todo** recarga la página y consulta los datos desde el navegador, sin activar workflows periódicos ni un servidor intermedio. No equivale a un feed COMEX tick-by-tick. La fuente de futuros incorporada publica cierres diarios, no la curva 1D intradía.

## Cómo habilitar realmente cinco años de futuros

Los **datos de Treasury, TIPS, tipos Fed/BCE y VIX** ya se solicitan con cobertura de hasta cinco años cuando las fuentes los suministran. DXY, EUR/USD y ratio spot XAUS se consultan en el periodo seleccionado. **Los futuros GC, SI, HG y BZ todavía solo tienen las últimas 15 sesiones en las tablas gratuitas integradas**.

El proveedor publica gratuitamente una descarga CSV diaria de varios años en sus páginas para GC, SI, HG y BZ; sin embargo, la descarga utiliza un ticket temporal individual y no hemos podido verificar un endpoint estable que permita recuperar el CSV completo automáticamente desde GitHub Pages. No se elude la protección del proveedor ni se inventan cotizaciones.

Para habilitar hasta cinco años en los cuatro futuros, existe una importación **manual y opcional** bajo **Fuentes → Histórico de futuros**:

1. Descargar los cuatro archivos **Raw contract prices** usando los botones oficiales del proveedor (enlaces en el panel). Son series de contrato próximo; no mezclar con una versión back-adjusted incompatible.
2. Seleccionarlos juntos o por separado en **Importar CSV históricos**.
3. Verificar en el mensaje cuántas sesiones y qué fechas se han incorporado. Se guardan únicamente en el almacenamiento local del navegador; no se envían al repositorio ni a ChatGPT.

La importación comprueba nombres de instrumento, fechas, cierres válidos y discrepancias significativas con el histórico reciente. Si rechaza un CSV, no altera los datos verificados. Las observaciones importadas se conservan entre visitas al sitio desde el mismo navegador, sujeto a sus ajustes de privacidad y almacenamiento. Los 15 cierres recientes que se consultan al abrir se integran respetando fechas y sin inventar datos intermedios. Los periodos que excedan la cobertura siguen señalados como **incompletos**.

**La cobertura automática de cinco años para los cuatro futuros sigue pendiente de un proveedor gratuito y autorizado con API apta para uso desde el navegador.** Esta limitación no impide el selector global, pero sí es relevante antes de interpretar las curvas.

## Macro oficial

Series FRED consultadas desde el navegador:
- DGS2, DGS10, DGS30: rendimientos nominales Treasury.
- DFII10: TIPS real a 10 años.
- DFEDTARU: techo del rango objetivo de los fondos federales.
- ECBDFR: facilidad de depósito del BCE.

Inflación implícita 10Y = DGS10 − DFII10. Incluye primas de mercado y no es una previsión pura de IPC. Si la consulta falla, se conserva una instantánea fechada, indicando cobertura insuficiente si faltan años.

## Operativa de coste cero y seguridad

- Web pública estática: repositorio cgam-coder/metals-terminal.
- Sin base de datos, procesos continuos, claves API, ni automatizaciones recurrentes.
- Publicación en GitHub Pages tras cambios. Actualización macro manual opcional por GitHub Actions, sin cron.
- Sin vinculación al proyecto NagameAlert.
- Las fuentes externas reciben solicitudes del navegador al abrir la página.
- Que una web sea accesible y permita CORS no constituye automáticamente una licencia de redistribución. Uso personal; revisar condiciones del proveedor antes de una distribución pública amplia o comercial.

## Límites

No se promete cotización futura en tiempo real. La cobertura inicial automática de futuros es de 15 sesiones, ampliable a cinco años mediante importación local de CSV originales; el VIX es de cierre diario. La comparación GC/SI/HG usa futuros; únicamente la ratio XAU/XAG permanece spot. Ante falta de un dato, el terminal lo marca o conserva un cierre verificado fechado; nunca usa una serie sintética ni hace pasar CFD/spot por futuros.

Referencia visual: REFERENCIA_VISUAL_ACORDADA.png.
