/* ============================================================
   CONFIGURACIÓN — Editá SOLO este archivo para cambiar textos,
   fechas, links y datos. No hace falta tocar el HTML.
   ============================================================ */

window.CONFIG = {

  /* ---------- QUÉ SECCIONES SE MUESTRAN ----------
     Poné true / false para prender o apagar cada bloque.       */
  secciones: {
    contador:  true,   // días que faltan
    programa:  true,   // lugar y horarios
    lugar:     true,   // mapa
    rsvp:      true,   // confirmar asistencia
    galeria:   true,   // fotos (ahora con imágenes DEMO, reemplazar por las de Leivi)
    dressCode: false,
    regalos:   false,
    hashtag:   false
  },

  /* ---------- DATOS PRINCIPALES ---------- */
  nombre: "Leivi",
  evento: "Bar Mitzvá",          // cambiar a "Bat Mitzvá" si corresponde
  // El "Save the Date" del hero, en 3 renglones (como el arte original)
  saveTheDateL1: "Save",
  saveTheDateL2: "the",
  saveTheDateL3: "Date",

  // Fecha y hora del evento (formato ISO con huso horario de Argentina)
  fechaISO: "2026-12-10T20:00:00-03:00",
  fechaCorta: "10 / 12 / 26",
  fechaLarga: "Jueves 10 de diciembre de 2026",

  // Título de la pestaña del navegador y compartido en WhatsApp
  tituloPagina: "Bar Mitzvá de Leivi · 10.12.26",
  descripcionPagina: "Queremos que seas parte de este día tan especial. Confirmá tu asistencia.",

  /* ---------- INVITACIÓN ---------- */
  invitacion: {
    titulo: "Con inmensa alegría",
    texto: [
      "Llegó el día en que Leivi asume sus mitzvot y celebra su entrada a la vida adulta judía.",
      "Nos encantaría que estés presente para compartir este momento con nosotros."
    ],
    firma: "Su familia"
  },

  /* ---------- PROGRAMA ---------- */
  programa: [
    {
      icono: "torah",
      titulo: "Ceremonia",
      hora: "19:00 hs",
      lugar: "Templo (completar)",
      detalle: "Lectura de la Torá y bendiciones."
    },
    {
      icono: "copa",
      titulo: "Recepción",
      hora: "20:30 hs",
      lugar: "Salón (completar)",
      detalle: "Cóctel de bienvenida."
    },
    {
      icono: "estrella",
      titulo: "Fiesta",
      hora: "21:30 hs",
      lugar: "Salón (completar)",
      detalle: "Cena, música y baile hasta el final."
    }
  ],

  /* ---------- LUGAR ---------- */
  lugar: {
    titulo: "El lugar",
    nombre: "Nombre del salón",
    direccion: "Dirección completa, Ciudad",
    detalle: "Estacionamiento disponible en el predio.",
    // Pegá acá el link "Insertar un mapa" de Google Maps (el src del iframe)
    mapaEmbed: "https://www.google.com/maps?q=Buenos+Aires,+Argentina&output=embed",
    // Link para abrir en la app de mapas
    mapaLink: "https://maps.google.com/?q=Buenos+Aires,+Argentina"
  },

  /* ---------- DRESS CODE ---------- */
  dressCode: {
    titulo: "Dress code",
    texto: "Elegante. Los caballeros, por favor, con kipá (habrá disponibles en la entrada).",
    nota: "Sugerencia de color: verde, dorado o tonos neutros."
  },

  /* ---------- GALERÍA ---------- */
  // Poné las fotos en la carpeta img/galeria/ y listalas acá.
  galeria: {
    titulo: "Momentos",
    subtitulo: "Un poco de nuestra historia hasta acá",
    // DEMO: reemplazar cada src por la foto real, ej: "img/galeria/foto-1.jpg"
    fotos: [
      { src: "img/galeria/demo-1.svg", alt: "Foto 1" },
      { src: "img/galeria/demo-2.svg", alt: "Foto 2" },
      { src: "img/galeria/demo-3.svg", alt: "Foto 3" },
      { src: "img/galeria/demo-4.svg", alt: "Foto 4" },
      { src: "img/galeria/demo-5.svg", alt: "Foto 5" },
      { src: "img/galeria/demo-6.svg", alt: "Foto 6" }
    ]
  },

  /* ---------- REGALOS ---------- */
  regalos: {
    titulo: "Regalos",
    texto: "Tu presencia es el mejor regalo. Si querés hacernos un obsequio, podés dejarlo en el sobre el día del evento.",
    // Dejar en null para no mostrar los datos bancarios
    alias: null,      // ej: "leivi.barmitzva"
    cbu: null,        // ej: "0000003100010000000001"
    titular: null     // ej: "Nombre Apellido"
  },

  /* ---------- CONFIRMACIÓN DE ASISTENCIA (RSVP) ---------- */
  rsvp: {
    titulo: "Confirmá tu asistencia",
    texto: "Te pedimos confirmar antes del 10 de noviembre.",
    fechaLimite: "10 de noviembre de 2026",
    maxAcompanantes: 6,

    // Opción A (por defecto): las confirmaciones llegan por WhatsApp.
    whatsapp: "5491100000000",   // código país + área + número, sin + ni espacios

    // Opción B: Google Sheets. Pegá acá la URL del Apps Script (ver README)
    // y las respuestas se guardan solas en una planilla. Si está en null, usa WhatsApp.
    endpoint: null
  },

  /* ---------- HASHTAG / REDES ---------- */
  hashtag: {
    titulo: "Compartí tus fotos",
    texto: "Subí tus fotos y videos de la noche con el hashtag",
    tag: "#BarMitzvaDeLeivi",
    instagram: "https://www.instagram.com/explore/tags/barmitzvadeleivi/"
  },

  /* ---------- PIE ---------- */
  footer: "Leivi · 10.12.26"
};
