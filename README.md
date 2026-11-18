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

## Periodos

El control principal de Oro, Plata y Cobre ofrece 1D, 1S, 1M, 3M, 6M, 1A y 5A. Sincroniza las tarjetas GC, SI, DXY, EUR/USD, VIX, BZ y HG y los tres gráficos macroeconómicos. Cada gráfico macro conserva además su selector individual. Los futuros solo contienen hasta 15 sesiones en las fuentes integradas, de modo que 1A o 5A sobre ellos se etiquetan expresamente como incompletos. El comparativo de futuros GC/SI/HG solo presenta sesiones comunes verificadas: 1D exige datos intradía no disponibles, y 1M/3M/6M/1A/5A se marcan como incompletos cuando exceden las fechas disponibles. El ratio spot XAU/XAG separado sí ofrece varios años cuando XAUS los publica.

La curva Treasury permite alternar entre curva por vencimientos (2Y, 10Y, 30Y) y su histórico. Los gráficos de mercado y macro muestran la fecha del dato; el eje temporal macro utiliza fechas reales y los tipos oficiales Fed/BCE se dibujan mediante escalones. Si solo existe una observación para un periodo, no se interpreta como evolución histórica.

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

No se promete cotización futura en tiempo real. La cobertura de futuros es de 15 sesiones; el VIX es de cierre diario. La comparación GC/SI/HG usa futuros; únicamente la ratio XAU/XAG permanece spot. Ante falta de un dato, el terminal lo marca o conserva un cierre verificado fechado; nunca usa una serie sintética ni hace pasar CFD/spot por futuros.

Referencia visual: REFERENCIA_VISUAL_ACORDADA.png.
