# Checklist de demos INVYRA

Usar antes de aprobar una demo nueva o modificar una existente. Marcar cada punto como `Cumple`, `No cumple`, `N/A` o `POR CONFIRMAR`.

## 1. Alcance y privacidad

- [ ] El nivel está definido y corresponde a [PACKAGE-RULES.md](PACKAGE-RULES.md).
- [ ] El nombre oficial **Esencial** se usa de forma consistente.
- [ ] En Signature, los módulos responden al tipo de evento y conservan profundidad, cantidad de contenido y valor equivalentes.
- [ ] La demo está identificada como comercial o como privada conmemorativa; Memorial no recibe paquete ni entra al catálogo.
- [ ] No hay credenciales, secretos o tokens dentro del frontend.
- [ ] La documentación pública no contiene nombres, teléfonos, fechas, domicilios, enlaces privados ni información personal de clientes.
- [ ] Los datos de demostración están autorizados o son ficticios.
- [ ] Las integraciones sensibles se documentan únicamente por función, nunca por valor.

## 2. Estructura y contenido

- [ ] `index.html`, `style.css` y `script.js` existen y cargan desde rutas válidas.
- [ ] `<title>`, descripción, idioma, viewport y favicon son correctos.
- [ ] Hay un único propósito por sección y una jerarquía de encabezados comprensible.
- [ ] Fecha, hora, ubicación y CTA no se contradicen entre secciones.
- [ ] Imágenes, audio y video tienen rutas válidas y fallbacks razonables.
- [ ] No quedan textos provisionales, instrucciones internas o datos “POR CONFIRMAR” visibles al invitado.

## 3. ADN visual

- [ ] La dirección artística se siente premium y coherente con el evento.
- [ ] La tipografía mantiene contraste, jerarquía y legibilidad.
- [ ] El movimiento acompaña; no oculta contenido ni bloquea acciones.
- [ ] Con `prefers-reduced-motion`, el contenido sigue disponible.
- [ ] La marca INVYRA aparece con discreción y consistencia cuando corresponde.

## 4. Responsive

### Móvil

- [ ] Se siente como invitación vertical, no como escritorio reducido.
- [ ] No hay scroll horizontal ni elementos cortados.
- [ ] Botones y campos tienen áreas táctiles suficientes.
- [ ] Texto, imágenes, formularios y modales caben en la ventana visible.
- [ ] La apertura funciona con toque y no necesita hover.

### Escritorio

- [ ] La composición está contenida; no se estira a todo el ancho.
- [ ] El texto conserva medidas de lectura cómodas.
- [ ] Columnas y asimetrías mantienen un orden editorial claro.
- [ ] Los medios no dominan ni dejan grandes vacíos accidentales.

## 5. Música y visibilidad

- [ ] No existe botón visible de música.
- [ ] La música intenta reproducirse al abrir la experiencia cuando el navegador lo permite.
- [ ] Un bloqueo de autoplay no rompe el recorrido ni genera errores visibles.
- [ ] `visibilitychange` pausa el audio cuando `document.hidden` es verdadero.
- [ ] Al volver, solo se intenta reanudar si la experiencia ya comenzó y el usuario no la pausó por otra razón.
- [ ] Audio y video no compiten; el video pausa o atenúa la música cuando corresponda.

## 6. RSVP y WhatsApp

- [ ] En toda demo comercial, el CTA de WhatsApp abre una URL válida y un mensaje correctamente codificado.
- [ ] El envío no incluye campos vacíos, ocultos o deshabilitados como datos válidos.
- [ ] “No asistiré” oculta **y deshabilita** todos los campos dependientes, y sus valores no se envían.
- [ ] Al volver a “Asistiré”, los campos pertinentes se habilitan de nuevo.
- [ ] Los campos obligatorios se validan con mensajes útiles y foco visible.
- [ ] El botón comunica carga, evita doble envío y se recupera tras un error.
- [ ] Éxito, duplicado, error de red y reintento tienen estados comprensibles.
- [ ] El borrador en `localStorage` no conserva datos después de un envío exitoso.
- [ ] Si la integración remota falla, la ruta de contacto o recuperación sigue clara.

## 7. Accesibilidad y resiliencia

- [ ] Imágenes informativas tienen `alt`; decorativas están correctamente ocultas.
- [ ] Controles tienen nombre accesible, foco visible y estado comunicado.
- [ ] El modal usa semántica adecuada, puede cerrarse con teclado y devuelve el foco cuando corresponda.
- [ ] El contraste es suficiente en fondos, overlays, botones y texto pequeño.
- [ ] Sin GSAP o con JavaScript parcial, el contenido esencial no queda invisible.
- [ ] Los errores de imágenes o integraciones no bloquean el resto de la invitación.

## 8. Prueba manual mínima

- [ ] Móvil estrecho.
- [ ] Móvil grande.
- [ ] Tablet vertical y horizontal.
- [ ] Escritorio estándar.
- [ ] Escritorio ancho verificando contención editorial.
- [ ] Cambio de pestaña y cambio de aplicación con audio activo.
- [ ] RSVP “Asistiré” y “No asistiré”.
- [ ] WhatsApp en navegador móvil y escritorio.
- [ ] Navegación por teclado y reducción de movimiento.

No instalar Playwright durante la Fase 1. Esta lista define primero el contrato; la automatización se diseñará después de aprobar las reglas y extraer la oferta comercial exacta.

## Registro de deuda

- [ ] Toda brecha detectada queda registrada como deuda de calidad, con demo, regla incumplida y evidencia.
- [ ] Graduación y Primera Comunión quedan pendientes de música por ser Signature.
- [ ] El copy provisional de Experiencias queda registrado como deuda de contenido.
- [ ] “Privada” no se confunde con “protegida”: un recurso en GitHub Pages puede abrirse mediante URL directa.
