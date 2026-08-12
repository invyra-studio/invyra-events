# INVYRA — Legal & Operations

## Estado

**LISTO PARA QA LOCAL Y REVISIÓN PREVIA A PUBLICACIÓN.**

La información de identificación del responsable ya quedó integrada. Antes del commit a `main`, validar navegación, responsive, formulario y coherencia comercial.

## Responsable

- Marca comercial: **INVYRA**
- Responsable: **Javier Valdemar Gonzalez Ortega**
- Figura: **persona física**
- Privacidad / ARCO: **invyra.privacidad@gmail.com**
- Domicilio: **Delia 149, Guadalupe Tepeyac, Gustavo A. Madero, 07840 Ciudad de México, CDMX**
- Versión: **2.0 / 12-ago-2026**

## Reglas operativas aprobadas V1

- Anticipo: **50 %** para confirmar e iniciar.
- Liquidación: **50 %** antes de publicación/entrega final.
- Producción estándar: **5–7 días hábiles**.
- El plazo comienza únicamente con **anticipo + información/materiales suficientes**.
- Express 48 h: **+$699 MXN**, sujeto a disponibilidad y materiales completos.
- Prioridad 24 h: **+$999 MXN**, sujeto a disponibilidad y materiales completos.
- Esencial: **1 ronda de ajustes**.
- Signature: **2 rondas de ajustes**.
- Legacy: **3 rondas de ajustes**.
- Bespoke: alcance y rondas según cotización.
- Una ronda = una solicitud consolidada de cambios sobre una versión.
- Cambios de alcance / rondas adicionales: cotización adicional.
- Vigencia estándar de publicación: **30 días naturales después del evento**.
- Reprogramación: **1 cambio de fecha** incluido cuando no requiere rediseño sustancial y existe disponibilidad.
- Cambios posteriores a aprobación final: se cotizan, salvo correcciones de errores atribuibles a INVYRA.
- Materiales del cliente: el cliente declara contar con las autorizaciones necesarias.
- Archivos fuente: no incluidos salvo acuerdo escrito.
- Soporte técnico: **7 días naturales posteriores al evento**.
- Fallas atribuibles a INVYRA: corrección sin costo.

## Cancelaciones / revocación

No utilizar frases absolutas como “anticipo no reembolsable” en superficies comerciales.

Regla V1:

1. Respetar siempre los derechos irrenunciables que correspondan a la persona consumidora.
2. Cuando resulte aplicable el derecho de revocación previsto por la Ley Federal de Protección al Consumidor para contrataciones fuera del establecimiento o a distancia, respetar el plazo y las excepciones legales vigentes.
3. Fuera de derechos obligatorios:
   - si producción no inició: devolución menos costos de terceros expresamente autorizados y efectivamente no recuperables;
   - si producción inició: determinar devolución/saldo según trabajo efectivamente ejecutado + costos autorizados no recuperables;
   - documentar fecha de inicio de producción y alcance realizado.

## Protección de datos — operación

### Cotizaciones no convertidas

- Objetivo de conservación: **hasta 6 meses** desde la última interacción útil.
- Acción: borrar o anonimizar registros que ya no tengan una finalidad vigente ni obligación de conservación.

### Clientes y proyectos contratados

- Conservar durante la relación y después únicamente por los plazos necesarios para obligaciones legales, fiscales, contractuales o defensa de derechos.
- No utilizar datos del proyecto para marketing no autorizado.

### Invitados / RSVP

- Objetivo de conservación: **hasta 90 días después del evento**.
- Borrar o anonimizar después, salvo necesidad legal documentada.
- No reutilizar bases de invitados para promociones.

### Borrador local de Cotización

- `localStorage` se usa solo como borrador de comodidad.
- Se limpia después de un envío exitoso/reset y puede desaparecer al limpiar datos del navegador.
- No guardar datos sensibles en este mecanismo.

### Datos sensibles

- El formulario general no debe pedirlos.
- Si un flujo futuro necesita salud, discapacidad, alergias u otra información sensible, revisar finalidad, minimización y consentimiento antes de desplegarlo.

## Checklist previo al commit

- [ ] Abrir `/privacidad/`, `/terminos/` y `/politicas/` en Live Server.
- [ ] Probar enlaces legales en Inicio, Experiencias, Portafolio y Cotizar.
- [ ] Probar responsive 390×844 y 430×932.
- [ ] Probar navegación por teclado y foco visible.
- [ ] Confirmar que presupuesto siga siendo **opcional**.
- [ ] Confirmar que la casilla legal sea **obligatoria** y no se guarde como consentimiento en `localStorage`.
- [ ] Probar envío correcto del formulario y fallback a WhatsApp.
- [ ] Confirmar que no se documentaron credenciales ni datos privados de clientes.
- [ ] Revisar visualmente el domicilio, nombre y correo en las tres páginas legales.
- [ ] Solo después: `git add`, commit y merge/push.

## Nota jurídica

Estos textos son una base operativa y de producto para INVYRA y no sustituyen una revisión profesional individualizada. Se estructuraron tomando como referencia el marco mexicano vigente consultado al 12 de agosto de 2026, incluida la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y la Ley Federal de Protección al Consumidor.
