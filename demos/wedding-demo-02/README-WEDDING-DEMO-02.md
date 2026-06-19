# INVYRA Wedding Demo 02 — Legacy Editorial

Carpeta propuesta para integrar como:

`/demos/wedding-demo-02/`

## Cambios principales

- Rediseño visual tipo editorial premium: papel marfil, acuarela azul, dorado champagne y textura cálida.
- Efectos de papel rasgado mediante SVGs en `assets/`.
- Portada/splash reinterpretada como invitación física digitalizada.
- Hero más emocional con jerarquía tipo story vertical.
- Sección “Nuestra historia” en layout editorial con foto + tarjeta.
- Itinerario visual expandido con horas, iconos y foto protagonista.
- Galería ampliada a 8 entradas con lightbox.
- Conserva las secciones clave Legacy: padres, ceremonia/recepción, dress code, menú, mesa de regalos, guía para invitados y RSVP avanzado.
- Responsive enfocado en móvil, con galería horizontal tipo story en pantallas pequeñas.

## Notas de integración

- No reemplaza `wedding-demo-01`; esta versión debe vivir como demo independiente.
- Conserva rutas compartidas del repo para logo y música:
  - `../../LOGO/FAVICON.jpeg`
  - `../../music/violin-luxury.mp3`
- El RSVP usa el mismo Apps Script de la demo anterior, pero con llave localStorage distinta para evitar conflicto entre demos.
- Las imágenes actuales fueron reutilizadas desde `wedding-demo-01`. Si se consiguen assets de playa/atardecer reales, basta con reemplazar los archivos dentro de `assets/` manteniendo los nombres.


## Hotfix v2.1
- Se eliminó el blur persistente de las secciones reveal.
- Se reemplazaron los SVG de transición por bordes rasgados más irregulares, con fibras y borde tipo papel.
- Se aumentó la presencia visual del desgarre en divisores y tarjetas.


## Hotfix 2.2.0
- Reemplacé los SVG de borde rasgado por PNGs orgánicos con transparencia, sombra, grano y fibras para que el efecto se parezca más a papel desgarrado real.
- Aumenté altura y presencia visual de los rasgados en divisores, fotos, galería y tarjetas.
- Actualicé cache busting de CSS a v=2.2.0.


## Hotfix 2.3.0
- Reduje el alto visual de los desgarres aproximadamente 20% para que no invadan texto ni foto.
- Suavicé la línea oscura y la sombra del rasgado para un acabado más elegante y menos protagonista.
- Atenué la textura fibrada en PNG manteniendo la organicidad tipo papel real.
- Actualicé cache busting de CSS a v=2.3.0.


## Hotfix 2.3.1
- Eliminé prácticamente por completo el delineado negro del rasgado.
- Conservé únicamente una textura orgánica suave para que se lea más como papel premium que como pared desgastada.
- Reduje la sombra del desgarre a una separación mínima.
- Mantengo el tamaño refinado de v2.3 y actualicé cache busting a v=2.3.1.


## Hotfix 2.3.2
- Eliminé por completo la lectura de delineado negro en el rasgado.
- Mantengo únicamente una textura orgánica muy suave en tono papel/fibra.
- Reduje la sombra a una separación mínima para conservar profundidad sin oscurecer el borde.
- Se conserva el tamaño refinado heredado de la v2.3 y se actualiza cache busting a v=2.3.2.


## Hotfix 2.3.3
- Eliminé la lectura de contorno negro usando el alfa del rasgado únicamente como forma, no como color.
- Rehice los PNG del desgarre con tono papel marfil y textura orgánica muy sutil, sin intervención de negro.
- Dejé una sombra mínima de separación y conservé el tamaño refinado heredado de la v2.3.
- Actualicé cache busting a v=2.3.3.


## Hotfix 2.3.4
- Eliminé el bleed oscuro del borde haciendo el rasgado visualmente opaco al 100% en su área visible.
- Mantengo únicamente textura orgánica de papel en tono marfil, sin intervención del color negro.
- Dejé una sombra mínima de separación y conservé el tamaño refinado heredado de la v2.3.
- Actualicé cache busting a v=2.3.4.


## Hotfix 2.3.5
- Añadí un bordesito sutil tono papel en el filo del desgarre para recuperar realismo sin volver al contorno negro.
- Mantuve la textura orgánica opaca al 100% y la sombra mínima.
- Se conserva el tamaño refinado heredado de la v2.3 y se actualiza cache busting a v=2.3.5.


## Hotfix 2.4.0
- Implementé una mezcla de desgarres horizontales y verticales para acercar la composición al lenguaje visual de la referencia.
- Añadí rasgados verticales en bloques clave: historia, legacy film, itinerario, galería, mesa de regalos y cierre visual.
- Generé nuevos assets verticales derivados de la textura final aprobada del papel rasgado.
- Mantengo la textura opaca, el bordesito sutil tono papel y la sombra mínima.
- Actualicé cache busting de CSS a v=2.4.0.


## Hotfix 2.4.1
- Reorganicé la combinación de desgarres para que se sienta más limpia y variada: los horizontales quedan como lenguaje principal.
- Dejé el desgarre vertical únicamente en la zona de Itinerario, donde sí aporta lectura editorial y se acerca mejor a la referencia.
- Eliminé los verticales de Historia, Legacy Moment, Galería, Mesa de regalos y Antes de confirmar para evitar saturación visual.
- Afiné el ancho y la sombra del rasgado vertical para que se vea más sutil y elegante.
- Actualicé cache busting de CSS a v=2.4.1.


## Hotfix 2.4.2
- Corregí la lógica visual para evitar combinaciones raras y dobles desgarres en un mismo bloque.
- Dejé el lenguaje horizontal como base general y el vertical únicamente en la zona de Itinerario.
- Cuando un bloque usa desgarre vertical, ya no puede heredar también un desgarre horizontal interno.
- Afiné un poco más el ancho del desgarre vertical para que se vea más limpio y completo.
- Actualicé cache busting de CSS a v=2.4.2.


## Hotfix 2.4.3
- Ajusté la jerarquía visual para que los textos ya no se pierdan detrás de la textura: captions y títulos sobre fotos quedaron por delante del desgarre y con mejor separación.
- Subí la posición de textos sensibles, especialmente en Legacy Moment y la galería.
- Reubiqué y amplié el desgarre vertical para que quede más pegado a la orilla y se vea más completo/estético.
- Mantengo la música sin cambios en archivos, pero este ajuste se enfoca únicamente en composición visual.
- Actualicé cache busting de CSS a v=2.4.3.


## Hotfix 2.4.4
- Reemplacé los verticales tipo tira por verticales de cobertura lateral amplia, para que una franja del costado quede cubierta con papel y el borde rasgado se vea más editorial.
- Apliqué la variación pedida: en Legacy Moment el lateral cubierto queda a la izquierda; en Itinerario el lateral cubierto queda a la derecha.
- La cobertura lateral mantiene el tono marfil, el bordesito sutil y evita combinaciones dobles con desgarres inferiores dentro del mismo bloque.
- Actualicé cache busting de CSS a v=2.4.4.


## Hotfix 2.4.5
- Cambié la lógica de los verticales para que la textura de papel rasgado cubra toda la franja lateral, en vez de verse como una zona blanca con el desgarre encima.
- Generé assets nuevos de cobertura lateral texturizada: uno para cubrir hacia la izquierda y otro para cubrir hacia la derecha, manteniendo el borde rasgado como límite interior.
- Conservé la variación pedida: algunos bloques cubren el lateral izquierdo y otros el derecho.
- Amplié ligeramente el ancho del vertical para que la cobertura lateral se perciba mejor.
- Actualicé cache busting de CSS a v=2.4.5.


## Hotfix 2.4.6
- Refiné la demo completa con un enfoque editorial: más aire entre secciones y columnas, mejor jerarquía visual y menos sensación de elementos encimados.
- Mejoré la legibilidad de textos sobre foto: captions del bloque Legacy ahora van por delante de la textura con soporte visual; los labels de galería tienen base translúcida y gradiente más sólido.
- Ajusté contraste y composición en tarjetas de ceremonia/recepción para que se lean mejor sin perder atmósfera.
- Di más respiración a Itinerario, Menú, Mesa de Regalos, Guía de Invitados y RSVP.
- Rebalanceé ligeramente el ancho de las coberturas laterales texturizadas para que se sientan más naturales.
- Añadí afinados móviles para conservar legibilidad y separación en pantallas angostas.
- Actualicé cache busting de CSS a v=2.4.6.


## Hotfix 2.4.7
- Cambié la pista de audio de fondo de `../../music/violin-luxury.mp3` a `../../music/Aleluya-Luxury.mp3`.
- Mantengo todos los ajustes visuales de la v2.4.6.
- No se realizó commit en esta entrega; queda listo para revisar y después subir al repo.
