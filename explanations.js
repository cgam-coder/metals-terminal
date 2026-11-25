/* Metals Terminal · Guías de interpretación de los gráficos ampliados.
   Contenido metodológico estático: no consulta el mercado, no construye señales
   ni cambia las series, las temporalidades ni sus cálculos. */
(function(){
 "use strict";
 const GUIDES={
  "futures": {
    "title": "Comparativa de futuros · oro, plata y cobre",
    "intro": "GC, SI y HG son los futuros continuos de oro, plata y cobre: contratos sobre un precio futuro, no compras de metal físico. El gráfico compara cuánto ha cambiado cada precio desde una misma sesión inicial, no sus precios en dólares.",
    "blocks": [
      [
        "Cómo leer el gráfico",
        "<p>El eje horizontal muestra las fechas del periodo seleccionado; el vertical, la variación acumulada en %. Las tres líneas nacen en 0 %. Si una marca +12 %, su precio es 12 % mayor que al inicio. El número de la leyenda corresponde al último punto. Al cambiar de periodo se recalcula la base.</p>"
      ],
      [
        "Cruces y separación de las curvas",
        "<p>Oro +15 % y plata +5 % implica una ventaja de 10 puntos porcentuales del oro. Si se cruzan, se iguala su variación acumulada, no su precio. Una curva horizontal significa estabilidad aproximada del precio; no ausencia de negociación. La pendiente indica el ritmo del cambio.</p><p>Ejemplo: oro de 2.500 a 2.750 USD y plata de 25 a 30 USD: +10 % y +20 %. La plata lidera aunque su precio por onza sea menor. Una línea puede caer desde un máximo y seguir por encima de cero. Los contratos próximos pueden diferir del contado por financiación, almacenamiento y expectativas.</p>"
      ],
      [
        "Qué podemos interpretar",
        "<p>Oro liderando puede ser compatible con demanda defensiva; plata y cobre liderando, con mejores expectativas industriales. Si los tres caen, puede haber presión del dólar, tipos reales o liquidaciones; si solo uno cae, busca factores propios de ese metal. Comprueba la ratio spot, los índices, el NFCI y el COT antes de atribuir una causa.</p>"
      ],
      [
        "Frecuencia y límites",
        "<p>Se usan cierres diarios coincidentes de Yahoo Finance (o respaldo identificado). No se inventan observaciones intradía en 1D. Los futuros continuos cambian de contrato al vencer: el rollover puede provocar saltos. No incluyen costes ni financiación; la curva no representa el rendimiento de un ETF apalancado ni una estrategia invertible.</p>"
      ]
    ],
    "sources": [
      [
        "Yahoo Finance · GC",
        "https://finance.yahoo.com/quote/GC%3DF/history/"
      ],
      [
        "Yahoo Finance · SI",
        "https://finance.yahoo.com/quote/SI%3DF/history/"
      ],
      [
        "Yahoo Finance · HG",
        "https://finance.yahoo.com/quote/HG%3DF/history/"
      ],
      [
        "Aethereal · respaldo histórico",
        "https://dataset.aethereal.top/datasets/commodity-prices"
      ]
    ]
  },
  "indices": {
    "title": "Comparativa de índices bursátiles y Bitcoin · EE. UU. y Europa",
    "intro": "Cinco índices bursátiles y Bitcoin comparan la evolución de mercados distintos con una unidad común: el porcentaje de cambio desde la primera fecha compartida. BTC/USD representa Bitcoin al contado, no un índice de bolsa ni un ETF.",
    "blocks": [
      [
        "Qué representa cada línea",
        "<p>S&P 500: grandes empresas estadounidenses; Nasdaq Composite: conjunto amplio del Nasdaq, con mucho peso tecnológico (no Nasdaq-100); Dow Jones: 30 grandes compañías ponderadas por precio; Russell 2000: pequeñas compañías estadounidenses; EURO STOXX 50: grandes empresas de la eurozona; Bitcoin: precio en dólares de un criptoactivo.</p>"
      ],
      [
        "Cómo leer el gráfico",
        "<p>Eje X: fechas de cierre compartidas. Eje Y: variación acumulada en %, base 0 %. Si BTC marca +10 % y S&P 500 +3 %, hay 7 puntos porcentuales de diferencia. Un cruce iguala rentabilidades acumuladas desde la base, no precios ni tamaños. Una línea plana implica poco cambio neto. Al cambiar el intervalo cambia el punto de partida.</p><p>Un Nasdaq al alza con Russell a la baja puede indicar concentración en grandes compañías tecnológicas, no mejora generalizada. Euro STOXX 50 se mide en moneda local; un inversor en euros puede obtener resultados distintos de los porcentajes dibujados.</p><p>Por ejemplo, si el S&P 500 pasa de 5.000 a 5.250 puntos y Bitcoin de 80.000 a 88.000 dólares, las curvas muestran +5 % y +10 %. Bitcoin lidera aunque las unidades sean distintas. Si después retrocede hasta +6 %, conserva una ganancia desde el inicio, pero ha perdido parte de la ventaja. El punto cero no significa que el activo no tenga valor.</p>"
      ],
      [
        "Qué dice sobre el apetito por riesgo",
        "<p>Avances generalizados, sobre todo de Russell y Nasdaq, pueden indicar mayor disposición a asumir riesgo; caídas conjuntas con VIX creciente sugieren cautela. Bitcoin puede coincidir o divergir: también influyen regulación, ETF y liquidez cripto. Si plata no acompaña, contrasta dólar, tipos reales e inventarios. No hay correlación fija ni causalidad automática.</p><p>Una recuperación de Russell junto al cobre puede sugerir que la mejora del apetito por riesgo se extiende más allá de las grandes tecnológicas. No es una medición directa del crecimiento económico.</p>"
      ],
      [
        "Fechas, comparabilidad y fuentes",
        "<p>Los índices no incluyen dividendos ni ajuste de divisa. BTC cotiza 24/7, pero aquí solo se comparan días bursátiles comunes; sus cierres no son simultáneos. No se interpolan festivos. Yahoo Finance mediante cors.dev no garantiza disponibilidad; si BTC falla se mantienen los índices disponibles, con aviso de cobertura. La vista 1D no simula intradía.</p>"
      ]
    ],
    "sources": [
      [
        "Yahoo Finance · índices mundiales",
        "https://finance.yahoo.com/markets/world-indices/"
      ],
      [
        "Bitcoin BTC/USD",
        "https://finance.yahoo.com/quote/BTC-USD/"
      ],
      [
        "cors.dev · condiciones del intermediario",
        "https://cors.dev/guides/yahoo-finance-api-cors"
      ]
    ]
  },
  "ratio": {
    "title": "Ratio oro/plata · XAU/XAG",
    "intro": "La ratio XAU/XAG indica cuántas onzas troy de plata equivalen al precio de una onza de oro. Se obtiene dividiendo las referencias spot de ambos metales en la misma fecha y moneda; no es el cociente de futuros GC/SI.",
    "blocks": [
      [
        "Cómo leer el gráfico",
        "<p>El eje X muestra fechas y el Y el número de onzas de plata por onza de oro. Una ratio 80 significa que 80 onzas de plata cuestan lo mismo que una de oro. El botón «Vista: cambio %» transforma la ratio en variación desde el inicio (base 0 %), no en variación del precio de la plata.</p>"
      ],
      [
        "Subida, bajada y estabilidad",
        "<p>Si pasa de 80 a 88, el oro se encarece relativamente un 10 % frente a la plata; ambos podrían estar cayendo. Si pasa de 85 a 75, la plata gana valor relativo. Si permanece estable, ambos precios evolucionan aproximadamente en la misma proporción, aunque suban o bajen mucho.</p><p>Ejemplo: oro a 2.400 USD y plata a 30 USD dan 80. Si la plata baja a 24 y el oro no cambia, la ratio sube a 100; en vista porcentual marcaría +25 %. Distingue así qué metal resiste mejor una corrección.</p>"
      ],
      [
        "Cómo interpretar el contexto",
        "<p>Una ratio creciente puede acompañar búsqueda de refugio o debilidad industrial. Una decreciente es compatible con mayor fortaleza de plata. Confirma cuál de los precios provoca el cambio y compara con cobre, dólar, tipos reales y COT. Una ratio extrema no obliga a una reversión a la media.</p>"
      ],
      [
        "Límites de la lectura",
        "<p>Solo hay una curva, no cruces entre metales. El indicador mide precio relativo, no escasez física ni valoración fundamental. XAUS ofrece referencias indicativas, no cotizaciones ejecutables. Se necesitan fechas de ambos metales coincidentes; si faltan, no se inventan datos.</p>"
      ]
    ],
    "sources": [
      [
        "Fuente de referencias XAU/XAG",
        "https://xaus.com/api/"
      ]
    ]
  },
  "macro-curve": {
    "title": "Curva de rendimientos · Treasury 2Y / 10Y / 30Y",
    "intro": "Rentabilidad nominal anual exigida a los bonos del Tesoro estadounidense a 2, 10 y 30 años. El terminal también dibuja el diferencial 10Y−2Y. No es el precio del bono: cuando su rendimiento sube, el precio de un bono existente suele bajar.",
    "blocks": [
      [
        "Cómo leer los dos modos",
        "<p>En «Ver histórico», el eje X contiene fechas y el Y rendimientos anuales en %. Cada color representa un vencimiento; la cuarta línea, 10Y−2Y, está en puntos porcentuales (pp). En «Ver curva», el eje X contiene vencimientos 2Y, 10Y y 30Y, y se comparan inicio y último dato del periodo. La pendiente de ese modo es entre plazos, no entre fechas.</p>"
      ],
      [
        "Qué explica cada plazo",
        "<p>El 2Y responde mucho a las expectativas de política de la Fed; el 10Y incorpora crecimiento, inflación y prima por plazo; el 30Y refleja además incertidumbre de largo plazo y oferta de deuda. Si todos suben, puede haber mayores tipos esperados o primas; si bajan, expectativas de recortes o demanda de refugio. Una línea plana indica rendimiento estable.</p><p>Un punto básico equivale a 0,01 punto porcentual. De 4 % a 4,25 % son 25 puntos básicos. Una curva puede empinarse tanto por caída del corto como por subida del largo; no son escenarios equivalentes. La cuarta línea morada permite seguir ese diferencial.</p>"
      ],
      [
        "Diferencial e inversión",
        "<p>Si 10Y = 4,5 % y 2Y = 4 %, el diferencial es +0,5 pp (50 puntos básicos). Si es negativo, hay inversión de ese tramo. Una subida del diferencial puede proceder de un 10Y al alza o un 2Y a la baja: distingue ambos movimientos. La inversión se ha asociado con recesiones, sin asegurar su ocurrencia ni fecha. Volver a positivo no elimina el riesgo.</p>"
      ],
      [
        "Implicaciones para los metales",
        "<p>El rendimiento nominal combina rendimiento real y compensación por inflación. Para el oro importa distinguir cuál cambia: compara con TIPS y breakeven, dólar y condiciones financieras. Un rendimiento nominal mayor no prueba por sí solo que sea peor para el oro. Datos diarios del Tesoro vía FRED.</p>"
      ]
    ],
    "sources": [
      [
        "Tesoro de EE. UU. · tipos de interés",
        "https://home.treasury.gov/resource-center/data-chart-center/interest-rates"
      ],
      [
        "FRED DGS10",
        "https://fred.stlouisfed.org/series/DGS10"
      ]
    ]
  },
  "macro-reals": {
    "title": "Tipo real TIPS 10Y e inflación implícita",
    "intro": "Dos componentes del rendimiento nominal del Treasury 10Y: el tipo real de los bonos estadounidenses protegidos contra inflación (TIPS) y el breakeven, la compensación inflacionaria que resulta de restar ese tipo real al nominal.",
    "blocks": [
      [
        "Cómo leer las dos líneas",
        "<p>Eje X: fechas. Eje Y: porcentaje anual; no es el cambio acumulado del periodo. Ejemplo: nominal 10Y = 4,5 % y TIPS = 2 %, breakeven = 2,5 %. El tipo real es el rendimiento cotizado ajustado por inflación de ese bono, no el tipo oficial de la Fed ni el nominal menos el IPC actual.</p>"
      ],
      [
        "Tipo real y coste de oportunidad",
        "<p>Una subida del TIPS ofrece una alternativa de rentabilidad real más atractiva al oro, que no paga intereses; una bajada reduce ese coste de oportunidad. Una línea plana mantiene aproximadamente ese coste. El efecto no es mecánico: dólar, riesgo, compras físicas y liquidez pueden dominar.</p><p>Los TIPS ajustan su principal por el IPC estadounidense. No hay que restar otra vez el IPC de su rendimiento real. Si el nominal permanece en 4,5 % y el breakeven cae de 2,5 % a 2 %, el real sube de 2 % a 2,5 %: el nominal plano oculta un endurecimiento real.</p>"
      ],
      [
        "Breakeven y combinaciones",
        "<p>El breakeven refleja compensación inflacionaria media a diez años, incluyendo primas de riesgo y liquidez, no una previsión pura del IPC. Si sube y el tipo real cae, el entorno puede favorecer al oro. Si ambos suben, el mayor tipo real puede pesar más que la inflación. Si ambos caen, podría haber desinflación o menor crecimiento.</p>"
      ],
      [
        "Cruces y comprobaciones",
        "<p>Si las curvas se cruzan, sus niveles numéricos coinciden, pero no existe un umbral especial. Si se quedan planas, los dos componentes nominales cambian poco. Contrasta Treasury, inflación publicada, Fed y DXY. Se usan fechas comunes oficiales; una inflación alta no garantiza una subida del oro.</p>"
      ]
    ],
    "sources": [
      [
        "Treasury nominal · FRED DGS10",
        "https://fred.stlouisfed.org/series/DGS10"
      ],
      [
        "TIPS real · FRED DFII10",
        "https://fred.stlouisfed.org/series/DFII10"
      ]
    ]
  },
  "v4-cot": {
    "title": "COT · posicionamiento Managed Money oro/plata",
    "intro": "El Commitments of Traders (COT) de la CFTC desglosa posiciones en futuros. Aquí se observa Managed Money (gestores, fondos y otros operadores de esa categoría), comparando el saldo de largos menos cortos de oro GC y plata SI respecto al interés abierto de su propio mercado.",
    "blocks": [
      [
        "Cómo leer cifras y curvas",
        "<p>Arriba se muestra el saldo neto en contratos; la gráfica utiliza neto/OI × 100. Ejemplo: 60.000 largos, 20.000 cortos y OI de 200.000 = +40.000 contratos netos y +20 %. Eje X: fechas semanales de posición; eje Y: porcentaje del OI, no variación del precio. Por encima de cero predominan largos netos; por debajo, cortos netos.</p>"
      ],
      [
        "Subidas, bajadas y cruces",
        "<p>Una subida indica más inclinación alcista relativa, por aumento de largos, cierre de cortos o cambios del denominador; una caída, lo contrario. Una línea plana no descarta operaciones compensadas. Si la plata supera al oro, su saldo neto representa una mayor proporción de su OI; no necesariamente más contratos ni dinero.</p><p>Ejemplo: con saldo neto constante de 40.000 contratos, un aumento del OI de 200.000 a 250.000 reduce el indicador del 20 % al 16 %. Por eso deben leerse también las cifras absolutas de la tarjeta.</p>"
      ],
      [
        "Percentiles y opinión contraria",
        "<p>P95 significa que aproximadamente el 95 % de los valores históricos usados son inferiores o iguales al actual; no una probabilidad del 95 % de caída. Un extremo alcista puede reflejar fuerza, pero también saturación y vulnerabilidad a liquidaciones. Un extremo bajista puede preceder una recuperación o persistir.</p>"
      ],
      [
        "Cómo combinarlo y límites",
        "<p>Precio al alza, OI creciendo y Managed Money más alcista son compatibles con mayor participación especulativa; no prueban causalidad ni predicen continuidad. El informe semanal Futures Only mide posiciones del martes y se publica después; no es un flujo diario ni representa todas las categorías de operadores.</p>"
      ]
    ],
    "sources": [
      [
        "CFTC · informes Commitment of Traders",
        "https://www.cftc.gov/MarketReports/CommitmentsofTraders/index.htm"
      ],
      [
        "CFTC · datos públicos GC/SI",
        "https://publicreporting.cftc.gov/resource/72hh-3qpy.json"
      ]
    ]
  },
  "v4-oi": {
    "title": "Interés abierto semanal · oro GC y plata SI",
    "intro": "El interés abierto (OI, open interest) es el número de contratos de futuros aún vigentes. Cada contrato tiene una parte compradora y otra vendedora y se cuenta una sola vez. No es el volumen negociado en una sesión.",
    "blocks": [
      [
        "Cómo leer la tarjeta y el gráfico",
        "<p>Las cifras superiores son contratos abiertos de GC y SI. El eje X muestra fechas semanales comunes; el Y, la variación del OI desde el inicio del intervalo (base 0 %). Si oro pasa de 400.000 a 440.000 contratos, su línea marca +10 %. Un cruce iguala crecimiento relativo, no número de contratos.</p>"
      ],
      [
        "Qué indica el movimiento",
        "<p>Si sube, hay más contratos pendientes; si baja, hay menos. Si se mantiene plano, las aperturas y cierres pueden compensarse aunque haya mucho volumen. OI creciente significa mayor participación contractual, no automáticamente más compras: siempre existen largos y cortos.</p><p>Cuando una nueva pareja comprador-vendedor abre un contrato, el OI aumenta en uno. Si ambos cierran uno existente, disminuye en uno. Si cambia de manos sin desaparecer, puede mantenerse igual. El volumen puede aumentar con OI estable.</p>"
      ],
      [
        "Precio frente a OI",
        "<ul><li>Precio ↑ / OI ↑: expansión de participación durante la subida.</li><li>Precio ↑ / OI ↓: compatible con cierre de cortos.</li><li>Precio ↓ / OI ↑: expansión de participación durante la caída.</li><li>Precio ↓ / OI ↓: compatible con reducción de posiciones o liquidaciones.</li></ul><p>Son hipótesis, no identificación de las operaciones individuales.</p>"
      ],
      [
        "Contraste y límites",
        "<p>Consulta el COT para ver si Managed Money aumenta o reduce su saldo neto. Una caída del OI no demuestra por sí sola agotamiento del precio. El terminal utiliza informes semanales CFTC Futures Only; el volumen diario CME no está integrado. Cambios de contrato y calendario también influyen.</p>"
      ]
    ],
    "sources": [
      [
        "CFTC · Commitment of Traders",
        "https://www.cftc.gov/MarketReports/CommitmentsofTraders/index.htm"
      ]
    ]
  },
  "v4-volatility": {
    "title": "Volatilidad implícita GVZ · oro",
    "intro": "GVZ mide la volatilidad implícita de opciones sobre el ETF GLD de oro, a un horizonte cercano a 30 días, anualizada. Es una medida de la magnitud de las oscilaciones que incorpora el mercado de opciones, no de la dirección del precio.",
    "blocks": [
      [
        "Cómo leer el gráfico",
        "<p>Eje X: fechas de cierre. Eje Y: nivel del índice, interpretable como volatilidad anualizada en %. Un GVZ de 30 equivale aproximadamente a una volatilidad anualizada del 30 %; en 30 días sería del orden del 8,6 % (30 × √(30/365)), bajo una simplificación estadística. No es un objetivo de precio ni una probabilidad de caída.</p>"
      ],
      [
        "Subida, bajada y estabilidad",
        "<p>Sube cuando las opciones incorporan mayor incertidumbre o valoración de oscilaciones. Baja cuando descuentan movimientos menores. Una línea plana indica estabilidad de volatilidad implícita, no estabilidad del oro. Pueden ocurrir movimientos bruscos con GVZ bajo.</p><p>Las opciones son contratos cuyo valor depende, entre otros factores, de la incertidumbre esperada. GVZ de 20 a 30 aumenta 10 puntos de volatilidad, no implica que el oro haya subido un 10 %. Compararlo con VIX ayuda a separar incertidumbre específica y bursátil.</p>"
      ],
      [
        "Relación con el oro",
        "<p>Oro ↑ y GVZ ↑: avance con incertidumbre creciente. Oro ↓ y GVZ ↑: posible tensión. Oro ↑ y GVZ ↓: menor oscilación esperada durante el avance. Oro lateral y GVZ ↑: las opciones descuentan mayor movimiento sin señalar dirección. Contrasta con precio, VIX y tipos reales.</p>"
      ],
      [
        "Cobertura y límites",
        "<p>Solo hay una línea GVZ; no hay cruces con plata. VXSLV no se integra por falta de derechos de reutilización acreditados. Se muestran cierres diarios Cboe/FRED, no volatilidad realizada ni un dato intradía.</p>"
      ]
    ],
    "sources": [
      [
        "FRED GVZCLS · Cboe (cita obligatoria)",
        "https://fred.stlouisfed.org/series/GVZCLS"
      ]
    ]
  },
  "v4-flows": {
    "title": "ETF físicos GLD frente a SLV · tenencias",
    "intro": "GLD y SLV son vehículos respaldados por metal físico. Este gráfico compara la cantidad de oro y plata que declaran mantener, no el precio de sus participaciones ni flujos monetarios de inversión.",
    "blocks": [
      [
        "Cómo leer cifras y curvas",
        "<p>Arriba: toneladas de oro en GLD y millones de onzas troy en SLV. Eje X: fechas trimestrales de existencias. Eje Y: cambio porcentual desde el primer trimestre común del intervalo (0 %). Si GLD pasa de 1.000 a 1.080 t, marca +8 %. SLV +20 % implica mayor crecimiento relativo, no más metal absoluto.</p>"
      ],
      [
        "Subidas, bajadas y cruces",
        "<p>Una curva creciente indica acumulación neta de metal en ese vehículo; decreciente, reducción. Las creaciones y reembolsos de participaciones influyen, también los gastos. Una línea plana indica existencias similares, aunque el precio cambie. Un cruce solo iguala variaciones relativas desde la base.</p><p>Si GLD conserva 1.000 toneladas pero sube el precio del oro, la línea queda plana. La fecha de tenencia no es la fecha de presentación SEC: no se atribuye a una fecha anterior un dato publicado después.</p>"
      ],
      [
        "Demanda inversora y flujos",
        "<p>Existencias al alza pueden reflejar demanda de ese fondo; no toda la demanda mundial ni una compra de metal equivalente en bolsa. El flujo en dólares depende también del precio. El contexto WGC muestra flujos globales de ETF de oro y el de iShares un dato puntual de SLV: son métricas distintas, no una comparación directa de flujos.</p>"
      ],
      [
        "Fechas y límites",
        "<p>Datos trimestrales SEC, visibles según fecha de presentación. Histórico común desde septiembre de 2021; en 10A es parcial. Si no hay dos trimestres comunes en el periodo, se muestra una referencia anterior sin curva. «Contexto 2A» permite una vista adicional sin cambiar el periodo global. Los archivos se revisan manualmente, no explican una sesión.</p>"
      ]
    ],
    "sources": [
      [
        "SEC EDGAR · informes de GLD y SLV",
        "https://www.sec.gov/edgar/search/"
      ],
      [
        "World Gold Council · datos ETF oro",
        "https://www.gold.org/goldhub/data/gold-etfs-holdings-and-flows"
      ]
    ]
  },
  "v5-vixterm": {
    "title": "Estructura temporal VIX · 30 días y 3 meses",
    "intro": "Dos índices Cboe de volatilidad implícita del S&P 500: VIX a 30 días y VIX a 3 meses, no futuros del VIX.",
    "blocks": [
      [
        "Cómo leer el gráfico",
        "<p>Eje X: cierres diarios. Eje Y: volatilidad anualizada en %. Cada línea expresa la magnitud esperada de oscilaciones en su horizonte, no la dirección de la bolsa.</p>"
      ],
      [
        "Distancia y cruces",
        "<p>30D > 3M indica tensión inmediata relativa (estructura invertida). 30D < 3M indica más incertidumbre anualizada a largo plazo. Si ambas suben, crece la incertidumbre; planas, cambia poco.</p><p>30D = 28 y 3M = 22 son seis puntos de volatilidad de diferencia, no una caída bursátil prevista del 6 %.</p>"
      ],
      [
        "Interpretación para los metales",
        "<p>Contrasta con NFCI, dólar y plata. La tensión puede inducir liquidaciones o demanda de refugio; no predice la dirección del oro ni equivale a backwardation de futuros.</p>"
      ],
      [
        "Fuente y límites",
        "<p>Cboe vía FRED, fechas comunes. VIX9D no integrado: derechos de exhibición no acreditados.</p>"
      ]
    ],
    "sources": [
      [
        "Cboe · VIXCLS, FRED",
        "https://fred.stlouisfed.org/series/VIXCLS"
      ],
      [
        "Cboe · VXVCLS, FRED",
        "https://fred.stlouisfed.org/series/VXVCLS"
      ]
    ]
  },
  "v5-nfci": {
    "title": "Condiciones financieras · NFCI y ANFCI",
    "intro": "NFCI resume las condiciones financieras estadounidenses (crédito, riesgo y apalancamiento); ANFCI las ajusta por el entorno económico.",
    "blocks": [
      [
        "Cómo leer el gráfico",
        "<p>Eje X: semanas. Eje Y: desviaciones estándar respecto a la media histórica. Cero es la referencia: +1 indica condiciones más restrictivas; −1, más laxas.</p>"
      ],
      [
        "Subidas, bajadas y cruces",
        "<p>Subir implica endurecimiento relativo incluso bajo cero; bajar, relajación. Una línea plana significa estabilidad. ANFCI alto frente a NFCI sugiere más tensión relativa al contexto macro.</p><p>De −0,6 a −0,2: condiciones aún laxas, pero menos favorables que antes. No son porcentajes.</p>"
      ],
      [
        "Metales",
        "<p>Un endurecimiento puede coincidir con ventas por liquidez, especialmente en plata; contrasta VIX, dólar y tipos reales.</p>"
      ],
      [
        "Fechas y límites",
        "<p>Fed de Chicago/FRED, frecuencia semanal y revisiones posibles. No mide directamente la liquidez ni anticipa precios.</p>"
      ]
    ],
    "sources": [
      [
        "Chicago Fed · NFCI",
        "https://fred.stlouisfed.org/series/NFCI"
      ],
      [
        "Chicago Fed · ANFCI",
        "https://fred.stlouisfed.org/series/ANFCI"
      ]
    ]
  },
  "v5-inflation": {
    "title": "Inflación estadounidense · IPC y PCE",
    "intro": "Tres tasas de inflación estadounidense: IPC general y subyacente (BLS), PCE subyacente (BEA), calculadas interanualmente con índices desestacionalizados.",
    "blocks": [
      [
        "Cómo leer el gráfico",
        "<p>Eje X: meses de referencia. Eje Y: variación interanual en %. Un 3 % significa precios un 3 % mayores que en el mismo mes del año anterior, no una subida mensual. Fórmula: (índice / índice de hace 12 meses − 1) × 100.</p>"
      ],
      [
        "Qué representa cada línea",
        "<p>IPC general incluye alimentos y energía; los subyacentes los excluyen. IPC y PCE tienen distinta cobertura y ponderación; la Fed presta especial atención al PCE.</p><p>Bajar del 4 % al 2 % sigue implicando encarecimiento interanual. El objetivo del 2 % de la Fed se refiere a PCE general, no IPC.</p>"
      ],
      [
        "Subidas, bajadas y cruces",
        "<p>Subir indica aceleración; bajar, desinflación si la tasa sigue positiva; plana, ritmo estable. Un cruce iguala tasas, no niveles de precios. Contrasta tipos reales y breakeven: inflación alta no garantiza oro al alza.</p>"
      ],
      [
        "Frecuencia y límites",
        "<p>Meses comunes publicados, sin interpolación. Son series revisadas, no el dato conocido en cada fecha histórica.</p>"
      ]
    ],
    "sources": [
      [
        "BLS · IPC",
        "https://fred.stlouisfed.org/series/CPIAUCSL"
      ],
      [
        "BLS · IPC subyacente",
        "https://fred.stlouisfed.org/series/CPILFESL"
      ],
      [
        "BEA · PCE subyacente",
        "https://fred.stlouisfed.org/series/PCEPILFE"
      ]
    ]
  },
  "v5-comex": {
    "title": "Inventarios físicos COMEX · oro y plata",
    "intro": "Existencias de oro y plata en almacenes COMEX, recopiladas por MetalCharts a partir de informes CME. No equivalen al metal disponible en todo el mundo.",
    "blocks": [
      [
        "Qué significa cada opción",
        "<p>Registrado: metal con warrant, documento que permite entregarlo contra futuros. Elegible: cumple las especificaciones pero no tiene warrant. Total: suma de ambos. El selector cambia la categoría de las dos curvas.</p>"
      ],
      [
        "Cómo leer el gráfico",
        "<p>Arriba aparecen millones de onzas troy. Eje X: última fecha de informe de cada semana. Eje Y: cambio porcentual desde la primera fecha común (0 %). Oro −10 % significa un 10 % menos de existencias de la categoría elegida. Un cruce iguala variaciones, no cantidades.</p><p>Si registrado cae de 15 a 12 millones de onzas, marca −20 %. Si elegible aumenta 3 millones y el total no cambia, no hay evidencia de salida neta de esos almacenes.</p>"
      ],
      [
        "Cómo interpretar movimientos",
        "<p>Caída del registrado con total estable puede ser reclasificación hacia elegible; caída del total indica reducción neta en esos almacenes, no necesariamente escasez mundial. Si se mantiene plano, el saldo neto cambia poco. Contrasta precio, OI y ETF.</p>"
      ],
      [
        "Cobertura y fuente",
        "<p>Informes semanales reales; la semana en curso puede cambiar. Oro desde febrero de 2026, plata desde septiembre de 2023; la comparación solo usa fechas comunes. MetalCharts.org/CME, sin rellenar histórico ausente.</p>"
      ]
    ],
    "sources": [
      [
        "MetalCharts.org · CSV semanal COMEX (crédito obligatorio)",
        "https://metalcharts.org/data#comex-gold-silver-registered-eligible-weekly"
      ],
      [
        "CME · almacenes y depósitos",
        "https://www.cmegroup.com/clearing/operations-and-deliveries/registrar-reports.html"
      ]
    ]
  },
  "gold": {
    "title": "Oro · futuro GC",
    "intro": "GC representa futuros COMEX sobre oro. Su precio expresa cuánto se valora una onza del metal en el contrato de referencia.",
    "blocks": [
      [
        "Cómo leer el gráfico",
        "<p>Eje X: fechas. Eje Y: precio absoluto en USD por onza troy, no cambio acumulado. De 2.500 a 2.600 USD/oz son +100 USD o +4 %. La tarjeta indica el último cierre y la variación por sesión; en fechas personalizadas, el cambio del intervalo.</p>"
      ],
      [
        "Subida, bajada y estabilidad",
        "<p>Curva ascendente: precio mayor; descendente: menor; plana: poco cambio. La pendiente depende de la escala vertical. Una recuperación desde mínimos no significa que se haya recuperado el precio inicial.</p>"
      ],
      [
        "Qué factores contrastar",
        "<p>Dólar fuerte y TIPS reales al alza pueden presionar al oro por coste de oportunidad; refugio, compras físicas o incertidumbre pueden compensarlo. Contrasta ratio, VIX, COT y tipos reales.</p>"
      ],
      [
        "Frecuencia y límites",
        "<p>Futuro continuo de contrato próximo: no es contado ni inversión directa. Cambiar de vencimiento puede producir saltos (rollover). Cierres diarios identificados; 1D no simula intradía. Verifica fecha y cobertura.</p>"
      ]
    ],
    "sources": [
      [
        "Yahoo Finance · GC=F",
        "https://finance.yahoo.com/quote/GC%3DF/history/"
      ]
    ]
  },
  "silver": {
    "title": "Plata · futuro SI",
    "intro": "SI representa futuros COMEX sobre plata, un metal monetario y también un insumo industrial.",
    "blocks": [
      [
        "Cómo leer el gráfico",
        "<p>Eje X: fechas. Eje Y: precio absoluto en USD por onza troy, no cambio acumulado. De 25 a 27 USD/oz son +2 USD o +8 %. La tarjeta indica el último cierre y la variación por sesión; en fechas personalizadas, el cambio del intervalo.</p>"
      ],
      [
        "Subida, bajada y estabilidad",
        "<p>Curva ascendente: precio mayor; descendente: menor; plana: poco cambio. La pendiente depende de la escala vertical. Una recuperación desde mínimos no significa que se haya recuperado el precio inicial.</p>"
      ],
      [
        "Qué factores contrastar",
        "<p>Responde a dólar y tipos reales, pero también a demanda industrial. Cobre y plata al alza pueden acompañar expectativas industriales favorables; estrés financiero puede inducir liquidaciones. Contrasta ratio, COT, OI e inventarios.</p>"
      ],
      [
        "Frecuencia y límites",
        "<p>Futuro continuo de contrato próximo: no es contado ni inversión directa. Cambiar de vencimiento puede producir saltos (rollover). Cierres diarios identificados; 1D no simula intradía. Verifica fecha y cobertura.</p>"
      ]
    ],
    "sources": [
      [
        "Yahoo Finance · SI=F",
        "https://finance.yahoo.com/quote/SI%3DF/history/"
      ]
    ]
  },
  "copper": {
    "title": "Cobre · futuro HG",
    "intro": "HG es el futuro de cobre COMEX, referencia de un metal utilizado en construcción, redes eléctricas y manufactura.",
    "blocks": [
      [
        "Cómo leer el gráfico",
        "<p>Eje X: fechas. Eje Y: precio absoluto en USD por libra, no cambio acumulado. De 4 a 4,40 USD/lb son +10 %. La tarjeta indica el último cierre y la variación por sesión; en fechas personalizadas, el cambio del intervalo.</p>"
      ],
      [
        "Subida, bajada y estabilidad",
        "<p>Curva ascendente: precio mayor; descendente: menor; plana: poco cambio. La pendiente depende de la escala vertical. Una recuperación desde mínimos no significa que se haya recuperado el precio inicial.</p>"
      ],
      [
        "Qué factores contrastar",
        "<p>Actividad industrial, demanda china, electrificación y oferta minera influyen en su precio. Un avance junto a plata puede reflejar mejores expectativas industriales; no demuestra crecimiento del PIB. Contrasta dólar y precios de otros metales.</p>"
      ],
      [
        "Frecuencia y límites",
        "<p>Futuro continuo de contrato próximo: no es contado ni inversión directa. Cambiar de vencimiento puede producir saltos (rollover). Cierres diarios identificados; 1D no simula intradía. Verifica fecha y cobertura.</p>"
      ]
    ],
    "sources": [
      [
        "Yahoo Finance · HG=F",
        "https://finance.yahoo.com/quote/HG%3DF/history/"
      ]
    ]
  },
  "brent": {
    "title": "Brent · futuro BZ",
    "intro": "BZ representa el futuro continuo de Brent, referencia internacional del petróleo.",
    "blocks": [
      [
        "Cómo leer el gráfico",
        "<p>Eje X: fechas. Eje Y: precio absoluto en USD por barril, no cambio acumulado. De 70 a 77 USD/barril son +10 %. La tarjeta indica el último cierre y la variación por sesión; en fechas personalizadas, el cambio del intervalo.</p>"
      ],
      [
        "Subida, bajada y estabilidad",
        "<p>Curva ascendente: precio mayor; descendente: menor; plana: poco cambio. La pendiente depende de la escala vertical. Una recuperación desde mínimos no significa que se haya recuperado el precio inicial.</p>"
      ],
      [
        "Qué factores contrastar",
        "<p>Oferta OPEP+, demanda, inventarios y geopolítica influyen en el crudo. El encarecimiento puede alimentar inflación y debilitar crecimiento. Contrasta IPC, breakeven, TIPS y DXY; no implica por sí solo oro al alza.</p>"
      ],
      [
        "Frecuencia y límites",
        "<p>Futuro continuo de contrato próximo: no es contado ni inversión directa. Cambiar de vencimiento puede producir saltos (rollover). Cierres diarios identificados; 1D no simula intradía. Verifica fecha y cobertura.</p>"
      ]
    ],
    "sources": [
      [
        "Yahoo Finance · BZ=F",
        "https://finance.yahoo.com/quote/BZ%3DF/history/"
      ]
    ]
  },
  "dxy": {
    "title": "DXY · índice dólar",
    "intro": "DXY mide el valor del dólar frente a una cesta de seis monedas, con gran peso del euro. La serie es una referencia indicativa XAUS.",
    "blocks": [
      [
        "Cómo leer el gráfico",
        "<p>Eje X: fechas u horas según disponibilidad; Y: puntos de índice, no dólares ni %. De 100 a 105 implica +5 % en el índice. La tarjeta expresa el cambio del periodo.</p>"
      ],
      [
        "Subida, bajada y estabilidad",
        "<p>Subir significa dólar más fuerte frente a la cesta; bajar, más débil. Una línea plana significa estabilidad relativa frente a esa cesta, no frente a cada moneda.</p>"
      ],
      [
        "Metales y contexto",
        "<p>Un dólar fuerte puede encarecer los metales para compradores extranjeros. En episodios de estrés, oro y dólar pueden subir juntos. Contrasta Treasury, TIPS y VIX.</p>"
      ],
      [
        "Límites",
        "<p>No mide todas las monedas ni equivale a USD/EUR. Referencia no ejecutable: verifica fechas y cobertura.</p>"
      ]
    ],
    "sources": [
      [
        "XAUS · referencias",
        "https://xaus.com/api/"
      ]
    ]
  },
  "eur": {
    "title": "EUR/USD · euro frente al dólar",
    "intro": "EUR/USD expresa cuántos dólares vale un euro, no cuántos euros vale un dólar.",
    "blocks": [
      [
        "Cómo leer el gráfico",
        "<p>Eje X: fechas u horas según disponibilidad. Y: USD por EUR. 1,10 significa que 1 euro equivale a 1,10 dólares. De 1,10 a 1,155 supone +5 %.</p>"
      ],
      [
        "Subida, bajada y estabilidad",
        "<p>Sube si el euro se fortalece frente al dólar; baja si se debilita. Plana: tipo de cambio similar. El porcentaje de la tarjeta representa cambio del periodo.</p>"
      ],
      [
        "Efecto para un inversor en euros",
        "<p>Divide el precio en USD por EUR/USD: si oro permanece en 2.500 USD, a 1,10 vale unos 2.273 EUR; a 1,20, unos 2.083 EUR. La exposición efectiva depende de la cobertura de divisa del producto.</p>"
      ],
      [
        "Contraste y límites",
        "<p>Compara con Fed/BCE y DXY. XAUS es una referencia indicativa, no precio de ejecución.</p>"
      ]
    ],
    "sources": [
      [
        "XAUS · referencias",
        "https://xaus.com/api/"
      ]
    ]
  },
  "vix": {
    "title": "VIX · volatilidad implícita bursátil",
    "intro": "Índice Cboe que estima la volatilidad implícita anualizada del S&P 500 a unos 30 días a partir de opciones. Mide magnitud esperada de oscilaciones, no dirección.",
    "blocks": [
      [
        "Cómo leer el gráfico",
        "<p>Eje X: cierres diarios. Y: puntos de volatilidad anualizada. VIX 20 equivale aproximadamente al 20 % anualizado, no a una caída prevista del 20 %. De 20 a 30 son 10 puntos.</p>"
      ],
      [
        "Subida, bajada y estabilidad",
        "<p>Sube cuando las opciones valoran mayor incertidumbre; baja cuando descuentan oscilaciones menores. Una línea plana indica volatilidad implícita similar, no precios bursátiles estables.</p>"
      ],
      [
        "Relación con metales",
        "<p>Estrés bursátil puede impulsar refugio en oro o provocar ventas por liquidez, especialmente en plata. Contrasta VIX 30D/3M, NFCI, índices y dólar.</p>"
      ],
      [
        "Frecuencia y límites",
        "<p>Cierres Cboe/FRED; 1D no ofrece intradía. No es volatilidad realizada, futuro VIX ni señal automática de caída.</p>"
      ]
    ],
    "sources": [
      [
        "Cboe · VIX",
        "https://www.cboe.com/tradable-products/vix/"
      ],
      [
        "FRED VIXCLS",
        "https://fred.stlouisfed.org/series/VIXCLS"
      ]
    ]
  },
  "macro-policy": {
    "title": "Tipos oficiales de interés · Fed y BCE",
    "intro": "Se representan el límite superior del rango objetivo de fondos federales de la Fed (DFEDTARU) y la facilidad de depósito del BCE (ECBDFR). No son rendimientos de bonos ni probabilidades de recortes.",
    "blocks": [
      [
        "Cómo leer el gráfico",
        "<p>Eje X: fechas; Y: tipo oficial anual en %. Las líneas escalonadas cambian cuando lo hace el tipo; tramos horizontales indican que se mantuvo. El resumen muestra cambios en puntos porcentuales.</p>"
      ],
      [
        "Subidas y bajadas",
        "<p>De 4,50 % a 4,25 % es un recorte de 25 puntos básicos. Tipos mayores tienden a encarecer financiación; menores, a abaratarla, aunque importa la transmisión bancaria.</p>"
      ],
      [
        "Diferencias entre bancos centrales",
        "<p>Fed por encima del BCE puede favorecer al dólar, pero cuentan expectativas y primas de riesgo. Un cruce iguala los niveles, no las condiciones monetarias reales.</p>"
      ],
      [
        "Relación con oro y plata",
        "<p>Tipos oficiales planos no implican TIPS ni dólar planos: el mercado anticipa decisiones. Contrasta Treasury 2Y, TIPS y breakeven. FRED muestra decisiones efectivas, no FedWatch.</p>"
      ]
    ],
    "sources": [
      [
        "FRED · Fed",
        "https://fred.stlouisfed.org/series/DFEDTARU"
      ],
      [
        "FRED · depósito BCE",
        "https://fred.stlouisfed.org/series/ECBDFR"
      ]
    ]
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
