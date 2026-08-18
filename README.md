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

Las de ahora son las reales de Leivi (`img/galeria/foto-*.jpeg`).
Para agregar o cambiar: poné el archivo en `img/galeria/` y sumá o editá su
entrada en `galeria.fotos` de `config.js`:

```js
{ src: "img/galeria/foto-1.jpg", alt: "Leivi" }
```

### Mapa

En Google Maps: **Compartir → Insertar un mapa**, copiá el `src` del iframe y pegalo en `lugar.mapaEmbed`.

### Confirmaciones (RSVP)

Por defecto llegan **por WhatsApp**: poné tu número en `rsvp.whatsapp` (país + área + número, sin `+` ni espacios).

Si preferís que se guarden en una **planilla de Google** (recomendado con muchos invitados: te da la lista ordenada y los totales sumados), seguí el paso a paso de [docs/README-planilla.md](docs/README-planilla.md). Son ~10 minutos y el script ya está escrito en [docs/planilla-confirmaciones.gs](docs/planilla-confirmaciones.gs).

Cuando `rsvp.endpoint` tiene una URL, se usa la planilla en lugar de WhatsApp.

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

## Dos versiones de la invitación

El mismo sitio sirve para los dos grupos de invitados. Cambia **sólo la sección "La celebración"**:

| A quién se lo mandás | Link | Qué muestra |
|---|---|---|
| Invitados a la ceremonia | `https://adriancabouli.github.io/barmitzva-leivi/` | Sólo la ceremonia |
| Invitados a ceremonia y fiesta | `https://adriancabouli.github.io/barmitzva-leivi/?fiesta` | Ceremonia, recepción y fiesta |

Los horarios de cada versión se editan en `js/config.js`, en `programa.ceremonia` y `programa.completa`.

## Las fotos de Leivi

Ya están las reales (`foto-1` a `foto-3`). Para agregar más:

1. Guardá la foto en `img/galeria/` siguiendo la numeración (`foto-4.jpeg`, …).
2. En `js/config.js`, agregá su entrada en `galeria.fotos` con el `src` y el `alt`
   (el `alt` es además el pie que se ve abajo de la foto).
3. Las originales sin comprimir quedan en `img/_originales/`, por si hay que
   volver a exportarlas.
4. Commit y push.

Conviene achicarlas a ~1200px de ancho antes de subirlas, así el sitio carga rápido en el celular.

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
