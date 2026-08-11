# Confirmaciones en una planilla de Google

Las respuestas del formulario se guardan solas en un Google Sheet, con la lista ordenada y los totales sumados. Son ~10 minutos, una sola vez.

## 1. Crear la planilla

Entrá a [sheets.new](https://sheets.new) y ponele un nombre, por ejemplo **Confirmaciones Bar Mitzvá Leivi**. No hace falta escribir nada adentro: las columnas se crean solas.

## 2. Pegar el script

En esa planilla: menú **Extensiones → Apps Script**.

Se abre un editor con un `function myFunction() {}` de ejemplo. Borralo todo y pegá el contenido de [`planilla-confirmaciones.gs`](planilla-confirmaciones.gs).

Si querés recibir un mail cada vez que alguien confirma, completá tu dirección en la primera línea:

```javascript
var MI_MAIL = "adriancabouli@gmail.com";
```

Guardá con Cmd+S.

## 3. Publicarlo como aplicación web

Arriba a la derecha: **Implementar → Nueva implementación**.

1. Al lado de "Seleccionar tipo" tocá el engranaje y elegí **Aplicación web**.
2. Completá así:
   - **Ejecutar como:** Yo (tu cuenta)
   - **Quién tiene acceso:** **Cualquier persona** ← es la clave, si queda en "Solo yo" las confirmaciones no llegan
3. **Implementar**.

Google te va a pedir permisos la primera vez. Va a aparecer una pantalla que dice *"Google no verificó esta aplicación"*: es normal, el script lo escribiste vos. Tocá **Configuración avanzada → Ir a (nombre del proyecto)** y **Permitir**.

## 4. Copiar la URL

Al terminar te muestra una **URL de la aplicación web**, que termina en `/exec`. Copiala.

## 5. Pegarla en el sitio

En `js/config.js`, dentro de `rsvp`:

```javascript
endpoint: "https://script.google.com/macros/s/AKfycb..../exec"
```

Con eso alcanza: en cuanto `endpoint` tiene una URL, el formulario deja de usar WhatsApp y escribe en la planilla. El campo `whatsapp` puede quedar como está, no se usa.

Subí el cambio:

```bash
git add -A && git commit -m "RSVP a la planilla" && git push origin main
```

## 6. Probarlo

Entrá al sitio, completá el formulario con datos de prueba y fijate que aparezca la fila en la planilla. Después borrás esa fila.

## Ver los totales

En el editor de Apps Script, elegí la función `crearResumen` en el desplegable de arriba y tocá **▶ Ejecutar**. Te crea una hoja **Resumen** con:

- cuántas personas vienen en total
- cuántas familias confirmaron
- cuántas no pueden
- cuándo fue la última confirmación

Los números se actualizan solos a medida que llegan confirmaciones.

## Si cambiás el script después

Cada vez que edites el código hay que volver a implementar: **Implementar → Administrar implementaciones → el lápiz ✏️ → Versión: Nueva versión → Implementar**. La URL sigue siendo la misma, no hay que tocar el config.

## Problemas frecuentes

**No aparece nada en la planilla.** Casi siempre es que "Quién tiene acceso" quedó en "Solo yo". Revisalo en Administrar implementaciones.

**El formulario dice que se envió pero la fila no está.** El navegador no puede leer la respuesta de Google por seguridad, así que el sitio muestra el mensaje de éxito igual. Probá la URL del `/exec` en el navegador: si te pide iniciar sesión, el acceso está mal configurado.
