# Matriz preliminar de QA

## Alcance

Auditoría estática de Inicio, Experiencias, Portafolio, Cotizar y las 15 demos comerciales. No incluye ejecución visual, pruebas reales de red ni Playwright.

Leyenda: `Sí` = evidencia en fuente; `No` = brecha observada; `N/A` = no aplica; `PC` = **POR CONFIRMAR**.

## Páginas principales

| Página | Función | Evidencia positiva | Pendiente preliminar |
|---|---|---|---|
| Inicio | Presentar marca y conducir a exploración/cotización | Promesa premium, mobile first, narrativa de primera impresión, portafolio, proceso y CTA | Validación visual y de enlaces en ejecución |
| Experiencias | Explicar niveles y adicionales | Alcance publicado para tres niveles y recomendación de Signature | Deuda de contenido: copy visible que anuncia una futura sustitución del mapa de paquetes; incluidos/adicionales siguen POR CONFIRMAR |
| Portafolio | Mostrar y filtrar demos | Etiquetas por nivel, filtros y rutas hacia demo/cotización | Correcto: publica 15 demos comerciales |
| Cotizar | Capturar briefing y abrir WhatsApp | Prefill por URL, reglas por paquete, borrador local, integración remota y WhatsApp | Probar errores reales, privacidad, doble envío y persistencia |

## Demos

| Demo | Nivel publicado | Audio al abrir | Pausa al ocultar | Sin botón visible de música | WhatsApp | Dependientes se deshabilitan al declinar | Resultado preliminar |
|---|---|---:|---:|---:|---:|---:|---|
| `anniversary-dinner-demo-01` | Esencial | Sí | Sí | Sí | Sí | N/A | Base coherente; requiere prueba manual |
| `babyshower-demo-01` | Signature | Sí | Sí | Sí | Sí | Sí | Referente Signature coherente |
| `bautizo-demo-01` | Signature | Sí | Sí | Sí | No | Sí | Falta CTA de WhatsApp |
| `birthday-demo-01` | Esencial | Sí | Sí | Sí | Sí | N/A | Referente Esencial coherente |
| `bridal-shower-demo-01` | Signature | Sí | No | No | Sí | No | Incumple música y RSVP dependiente |
| `corporate-launch-demo-01` | Legacy | Sí | Sí | Sí | Sí | Sí | Adaptación Legacy coherente |
| `fiesta-infantil-tematica-demo-01` | Signature | Sí | No | Sí | No | No | Falta pausa, WhatsApp y deshabilitado; conserva CSS de control musical sin control visible |
| `gender-reveal-demo-01` | Signature | Sí | No | No | Sí | No | Incumple música y RSVP dependiente |
| `graduacion-demo-01` | Signature | No | N/A | Sí | No | No | Deuda: requiere música, WhatsApp y RSVP conforme |
| `primera-comunion-demo-01` | Signature | No | N/A | Sí | No | No | Deuda: requiere música, WhatsApp y RSVP conforme |
| `proposal-dinner-demo-01` | Esencial | Sí | Sí | Sí | Sí | N/A | Base coherente; requiere prueba manual |
| `save-the-date-demo-01` | Signature | Sí | No | No | Sí | No | Incumple música y RSVP dependiente |
| `wedding-demo-01` | Legacy | Sí | Sí | Sí | Sí | Sí | Referente Legacy coherente |
| `wedding-demo-02` | Legacy | Sí | Sí | Sí | Sí | Sí | Variante Legacy coherente en fuente |
| `xv-demo-01` | Signature | Sí | Sí | Sí | Sí | Sí | Referente Signature coherente |

`N/A` en RSVP significa que la demo no contiene campos realmente dependientes o no contiene RSVP; no exime de validar el mensaje y el envío.

## Deuda de calidad pendiente

1. Hay botones visibles de música en tres demos Signature.
2. Varias demos con audio no pausan al cambiar de pestaña o aplicación.
3. Varias demos ocultan campos de RSVP sin deshabilitarlos.
4. Varias demos no presentan una salida funcional por WhatsApp.
5. Graduación y Primera Comunión no cargan música, aunque Signature hereda todo lo de Esencial.
6. La interfaz todavía utiliza “Essential” en lugar del nombre oficial Esencial.
7. Experiencias conserva texto provisional sobre una futura sustitución visual; se registra como deuda de contenido.

Estas brechas no redefinen paquetes ni comportamientos; deben corregirse en fases posteriores.

## Decisiones resueltas

- Nombre oficial: **Esencial**.
- Signature adapta módulos al evento manteniendo profundidad, cantidad de contenido y valor equivalentes.
- Hay 15 demos comerciales.
- WhatsApp es obligatorio en toda demo comercial.
- Toda demo con música oculta controles y pausa al perder visibilidad.
- RSVP deshabilita dependencias y excluye sus datos del envío.

## POR CONFIRMAR

1. ¿Qué módulos pertenecen al paquete y cuáles son adicionales según la oferta comercial exacta?
2. ¿Qué parte de la confirmación conectada es estándar y cuál pertenece a un adicional?
3. La inclusión de publicación y alojamiento por nivel se resolverá dentro de esa misma extracción comercial.

## Publicación actual observada

- `main` es la rama predeterminada.
- GitHub Pages usa el flujo integrado `pages-build-deployment` y sus ejecuciones observables provienen de `main`.
- La página principal se sirve desde la raíz en `https://invyra-studio.github.io/invyra-events/`.
- La preview se sirve desde `landing-preview/` dentro del mismo despliegue: `https://invyra-studio.github.io/invyra-events/landing-preview/`.
- No existe una rama de preview ni un workflow propio en el repositorio. Una rama de trabajo publicada en GitHub no obtiene preview web automáticamente.
- `client-preview/`, si permanece dentro del árbol publicado, es accesible por URL directa aunque no esté enlazado.
