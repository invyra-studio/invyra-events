# ADN de INVYRA

## Identidad

INVYRA es una marca de invitaciones digitales premium. Su promesa no es entregar una página decorativa, sino comenzar la experiencia del evento desde el primer enlace.

**Lema:** “El evento empieza antes de llegar.”

La propuesta observada en Inicio, Experiencias, Portafolio y Cotizar se apoya en cuatro ideas:

1. La invitación es la primera impresión del evento.
2. La información debe sentirse clara, ordenada y fácil de compartir.
3. La estética debe anticipar el ambiente sin competir con el contenido.
4. Cada recorrido debe ayudar al invitado a entender, emocionarse y actuar.

## Voz y contenido

- Premium sin sonar distante: elegante, cálido, directo y seguro.
- Emocional con propósito: la narrativa acompaña la decisión o el recorrido.
- Claro antes que ornamental: fechas, ubicaciones, dress code y RSVP deben encontrarse sin esfuerzo.
- Evitar jerga técnica frente al cliente.
- Evitar promesas no respaldadas por el paquete o la implementación.
- No copiar a documentación pública nombres, teléfonos, fechas, domicilios, enlaces privados, credenciales o información personal de clientes.

## Lenguaje visual

### Marca principal

- Base marfil, crema y papel; acentos champagne, dorado, espresso y vino.
- Titulares editoriales con serif de alto contraste y texto funcional con sans serif.
- Bordes suaves, capas tipo papel o cristal, sombras contenidas y detalles metálicos discretos.
- El movimiento refuerza la entrada, la jerarquía y la anticipación; no debe convertirse en ruido.

### Demos

La paleta y las tipografías pueden adaptarse al evento. Las demos de referencia muestran desde gala oscura hasta celestial, glam y editorial romántico. Lo invariable no es un color único, sino:

- dirección artística coherente;
- jerarquía editorial clara;
- contraste legible;
- espaciado generoso;
- recursos visuales con intención;
- sensación de pieza diseñada, no de plantilla genérica.

## Composición responsive

### Móvil

- Debe sentirse como una invitación vertical.
- El recorrido es lineal, íntimo y táctil.
- Controles con áreas cómodas, textos legibles y secciones respiradas.
- Evitar desbordes horizontales, composiciones miniaturizadas y bloques de escritorio apilados sin adaptación.

### Escritorio

- Debe sentirse como una composición editorial contenida, no como una página estirada a todo el ancho.
- Los referentes amplían la invitación a contenedores aproximados de 1040–1180 px y mantienen límites internos más estrechos para texto, formularios y medios.
- Se permiten columnas, asimetrías y ritmo de revista, conservando un eje de lectura evidente.

## Arquitectura de experiencia

Patrón compartido observado en las demos:

1. Pantalla o gesto de apertura.
2. Hero con identidad del evento.
3. Contexto emocional o editorial.
4. Información práctica.
5. Módulos propios del nivel y del evento.
6. RSVP o CTA principal.
7. Cierre de marca discreto cuando corresponda.

No todas las demos necesitan los mismos módulos. El nivel determina profundidad y presencia; el tipo de evento determina qué módulos tienen sentido.

## Comportamientos obligatorios

- No mostrar botón visible de música.
- Intentar la reproducción automática al abrir la experiencia, respetando las restricciones del navegador.
- Si la página pierde visibilidad por cambio de pestaña o aplicación, pausar la música; reanudar solo cuando corresponda y el navegador lo permita.
- Toda demo comercial debe proveer CTA funcional de WhatsApp.
- En RSVP, “No asistiré” debe ocultar **y deshabilitar** campos dependientes, limpiar o ignorar sus valores y excluirlos del envío.
- Conservar un estado comprensible durante carga, éxito, error y reintento.
- Respetar `prefers-reduced-motion` y ofrecer contenido visible aun si GSAP o una animación falla.

## Patrones técnicos observados

- HTML semántico por secciones y recursos locales por demo.
- CSS propio por experiencia, con variables, breakpoints y contenedores limitados.
- JavaScript sin framework para apertura, música, animación, cuenta regresiva, RSVP, almacenamiento temporal y fallbacks.
- GSAP aparece en experiencias de mayor elaboración, acompañado por rutas de degradación.
- `localStorage` se usa para borradores; nunca debe convertirse en almacén de datos sensibles.
- Los envíos suelen combinar integración remota y WhatsApp. Sus credenciales o endpoints no deben documentarse públicamente.

## Catálogo comercial y demo privada

- INVYRA mantiene **15 demos comerciales** organizadas en Esencial, Signature y Legacy.
- `memorial-demo-01` es una demo privada conmemorativa: queda fuera de paquetes, catálogo comercial y conteo público.
- La condición privada significa **no listada**, no protegida. GitHub Pages publica las carpetas del sitio y una URL conocida puede abrirse; no debe alojarse allí información que requiera confidencialidad real.

## Deuda de calidad

Una brecha entre estas reglas y una demo existente se registra como deuda pendiente; no redefine el ADN. Actualmente existe deuda en controles visibles de música, pausa por visibilidad, WhatsApp, música requerida en dos Signature, deshabilitado de dependencias RSVP y copy provisional de Experiencias.

## Criterio de calidad

Una pieza INVYRA está lista cuando se siente intencional antes de verse abundante: abre bien, orienta rápido, emociona sin confundir, funciona en móvil y escritorio, y conduce a una acción confiable.
