# Generador de registros docentes SEA

Propuesta de arquitectura y flujo de usuarios para la fase 2. Pendiente de aprobación.

## Estado del proyecto

- **Fase 1 terminada en la rama de revisión.** Se actualizó la tarjeta existente en Materiales exclusivos SEA y se reutilizó `agenda-sea.html` para la ficha. «Conocer el generador» abre la ficha, que muestra «En fase piloto». Se preparó una vista previa local para computadora y celular y se redactaron borradores legales para revisión interna.
- **Alojamiento del sitio público.** El Worker `asr-educa` está conectado a este repositorio. Las vistas previas de Workers están desactivadas. La presentación de la fase 1 permanece en la rama de revisión.
- **Fase 2 pendiente.** El acceso privado, las cuentas, el panel, las licencias y la integración comercial aún están por diseñar en detalle, aprobar e implementar.

## Arquitectura propuesta

- Mantener el sitio público y el generador en proyectos separados. Alojar el generador en un Worker con código fuente privado. Confirmar el subdominio, el proveedor de identidad y la protección de los dominios alternativos antes del despliegue.
- Verificar el correo de cada cuenta. El servidor comprueba, en cada operación protegida, que el usuario está autorizado para el plantel y que la licencia del producto está vigente.
- Representar la licencia por producto y plantel, con origen comercial o de cortesía, responsable autorizado, inicio, vencimiento y estado. Ambos orígenes habilitan las mismas funciones durante la vigencia.
- El panel privado permite gestionar plantel, responsable y vigencia. Solo los administradores autorizados de ASR Educa pueden emitir, extender o revocar cortesías. Registrar actor, fecha y cambio en el historial administrativo.
- Los planteles pueden descargar PDF para uso interno y conservar los archivos descargados al vencer o revocarse la licencia.

## Licencia comercial

1. El responsable crea su cuenta, verifica su correo y vincula el acceso al plantel mediante el flujo que se apruebe.
2. El plantel adquiere una licencia anual para el producto. Cuando exista el producto real en Hotmart, «Contratar acceso anual» abrirá el checkout correspondiente.
3. La activación seguirá a la verificación de la compra en el servidor y su vinculación al plantel. El detalle de esa vinculación, la fecha inicial y las reglas de renovación quedan pendientes.
4. «Abrir generador» se habilitará cuando exista el acceso privado. La autorización del servidor comprobará la licencia, incluida su vigencia, en cada solicitud protegida.

## Licencia de cortesía

La cortesía habilita las mismas funciones que la licencia comercial equivalente. Su emisión y su canje quedan fuera del checkout, los cobros y las suscripciones automáticas.

### Asignación directa

1. El administrador selecciona producto y plantel, indica el correo autorizado del responsable y configura el inicio y la duración.
2. El responsable inicia sesión o crea su cuenta, verifica el correo autorizado y obtiene acceso durante la vigencia. La fecha límite y el máximo de canjes aplican únicamente a la modalidad con código.

### Canje por código

1. El administrador configura producto, plantel, correo autorizado, duración y fecha límite de canje. Cada código admite como máximo un canje.
2. El responsable crea su cuenta, verifica su correo e introduce el código. El servidor comprueba la identidad verificada, el correo autorizado, el producto, el plantel, el estado del código y la fecha límite.
3. En una sola transacción, el servidor consume el código, emite la licencia y registra el identificador de la cuenta que canjeó y la fecha y hora. Una restricción de unicidad protege contra canjes simultáneos. Un intento rechazado no consume el código.
4. Se propone iniciar la vigencia al canjear el código. La fecha límite de canje y el vencimiento de la licencia se gestionan por separado.

### Seguimiento y vencimiento

- Mostrar el estado del código (pendiente, canjeado, vencido o revocado) y de la licencia (programada, vigente, vencida o revocada).
- Permitir extender la ventana de un código pendiente o revocarlo. Después del canje, las extensiones y revocaciones se aplican a la licencia resultante y conservan el historial. El código consumido queda cerrado.
- Al vencer la licencia, el plantel podrá adquirir una comercial o recibir una extensión administrativa. El servidor aplica la vigencia a futuros accesos.
- Generar y validar códigos del lado del servidor. Conservar una representación no reversible para su verificación y excluir los códigos de los registros de actividad. Mantener secretos, código del generador y lógica de autorización en el entorno privado.

## Pendientes para aprobación

- Confirmar los roles, el proveedor de identidad, el subdominio, las reglas de vigencia y renovación, y el tratamiento de compras o cortesías con periodos superpuestos.
- Definir cómo se verificará la compra de Hotmart y cómo se vinculará con el plantel. Precisar soporte, facturación, cancelación y reembolsos antes de habilitar la venta.
- Completar y aprobar privacidad y condiciones. Distinguir el tratamiento de datos del sitio, de la cuenta y licencia, y del padrón escolar. Confirmar proveedores, registros, almacenamiento, accesos, plazos de conservación, eliminación y permisos sobre contenidos de Identidad SEA y homologación.
- Para el primer caso de cortesía, conservar la duración prevista de doce meses. Definir en el panel privado el plantel, el responsable, la modalidad y las fechas antes de emitir. A la fecha de este plan no se ha emitido ninguna cortesía.
