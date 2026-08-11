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

---

## Regla de trabajo: siempre pushear

**Todo cambio se hace local Y se pushea a `origin/main` en el mismo momento.** No se acumulan cambios sin subir.

Después de cada tanda de ediciones:

```bash
git add -A && git commit -m "descripción" && git push origin main
```

El sitio publicado se actualiza solo desde `main`: https://adriancabouli.github.io/barmitzva-leivi/

## Backups

Antes de un rediseño grande se guarda una copia:

- `base-v1` — tag y rama en git con la primera versión (marco doble, hero "SAVE / THE / DATE" en tres renglones).
- `../barmitzvah-BACKUP-v1/` — copia de la carpeta, sin `.git`.

Para volver a una versión guardada: `git checkout base-v1`
