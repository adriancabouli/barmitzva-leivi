# Bar Mitzvá de Leivi — 10.12.26

Sitio de invitación. HTML, CSS y JS puros: **no necesita build ni instalar nada**.

## Qué tocar

Casi todo se edita en **un solo archivo**: [`js/config.js`](js/config.js).
Ahí están los textos, la fecha, los horarios, el lugar, el mapa y el WhatsApp de confirmación.

Los colores están arriba de todo en [`css/styles.css`](css/styles.css), en el bloque `:root`.

### Prender y apagar secciones

En `config.js`, arriba de todo:

```js
secciones: {
  contador:  true,   // días que faltan
  programa:  true,   // lugar y horarios
  lugar:     true,   // mapa
  rsvp:      true,   // confirmar asistencia
  galeria:   true,   // fotos
  dressCode: false,
  regalos:   false,
  hashtag:   false
}
```

### Fotos

Las de ahora son de muestra (`img/galeria/demo-*.svg`).
Poné las reales en `img/galeria/` y cambiá los `src` en `config.js`:

```js
{ src: "img/galeria/foto-1.jpg", alt: "Leivi" }
```

### Mapa

En Google Maps: **Compartir → Insertar un mapa**, copiá el `src` del iframe y pegalo en `lugar.mapaEmbed`.

### Confirmaciones (RSVP)

Por defecto llegan **por WhatsApp**: poné tu número en `rsvp.whatsapp` (país + área + número, sin `+` ni espacios).

Si preferís que se guarden en una planilla, creá un Google Apps Script que escriba en un Sheet, publicalo como app web con acceso "Cualquiera" y pegá la URL en `rsvp.endpoint`. Cuando ese campo tiene un valor, se usa en lugar de WhatsApp.

## Ver el sitio localmente

```bash
python3 -m http.server 4173
```

Y abrí http://localhost:4173

## Tipografías

- **Cinzel** — títulos (el "SAVE THE DATE" y los encabezados)
- **Pinyon Script** — el nombre, equivalente libre de Bickham / Edwardian Script
- **Cormorant Garamond** — textos

Se cargan desde Google Fonts, no hay que instalar nada.
