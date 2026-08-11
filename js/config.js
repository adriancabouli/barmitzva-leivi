/* ============================================================
   CONFIGURACIÓN — Editá SOLO este archivo para cambiar textos,
   fechas, links y datos. No hace falta tocar el HTML.
   ============================================================ */

window.CONFIG = {

  /* ---------- QUÉ SECCIONES SE MUESTRAN ----------
     Poné true / false para prender o apagar cada bloque.       */
  secciones: {
    datos:     true,   // tira de fecha / horario / lugar / dress code
    programa:  true,   // la celebración: ceremonia, recepción, fiesta
    lugar:     true,   // mapa
    galeria:   true,   // fotos (ahora DEMO, reemplazar por las de Leivi)
    rsvp:      true,   // confirmar asistencia
    regalos:   false,
    hashtag:   false
  },

  /* ---------- DATOS PRINCIPALES ---------- */
  nombre: "Leivi",
  evento: "Bar Mitzvá",          // cambiar a "Bat Mitzvá" si corresponde
  saveTheDate: "Save the Date",

  // Fecha y hora del evento (ISO, huso horario de Argentina)
  fechaISO: "2026-12-10T09:00:00-03:00",
  fechaPunteada: "10 · 12 · 2026",
  fechaLarga: "Jueves 10 de diciembre de 2026",

  tituloPagina: "Bar Mitzvá de Leivi · 10.12.26",
  descripcionPagina: "Queremos que seas parte de este día tan especial.",

  /* ---------- MENÚ ---------- */
  menu: [
    { texto: "Home",           href: "#top" },
    { texto: "La celebración", href: "#celebracion" },
    { texto: "Detalles",       href: "#lugar" },
    { texto: "Confirmación",   href: "#rsvp" },
    { texto: "Galería",        href: "#fotos" }
  ],

  /* ---------- HERO ---------- */
  hero: {
    faltan: "Faltan",
    cta: "Agendar en mi calendario",
    ctaCorto: "Agendar"
  },

  /* ---------- INVITACIÓN ---------- */
  invitacion: {
    titulo: "Con inmensa alegría",
    texto: [
      "Llegó el día en que Leivi asume sus mitzvot y celebra su entrada a la vida adulta judía.",
      "Nos encantaría que estés presente para compartir este momento con nosotros."
    ],
    firma: "Su familia"
  },

  /* ---------- TIRA DE DATOS ---------- */
  datos: [
    { icono: "calendario", titulo: "Fecha",      l1: "Jueves 10 de diciembre", l2: "de 2026" },
    { icono: "reloj",      titulo: "Horario",    l1: "09:00 hs",               l2: "Puntual" },
    { icono: "pin",        titulo: "Lugar",      l1: "Jabad Lubavitch",        l2: "Córdoba" },
    { icono: "mono",       titulo: "Dress code", l1: "Traje formal",           l2: "Elegante" }
  ],

  /* ---------- LA CELEBRACIÓN ----------
     Hay DOS versiones de la invitación:

       ceremonia  →  la URL normal del sitio
       completa   →  la misma URL con  ?fiesta  al final

     Los invitados que van sólo a la ceremonia reciben el link corto;
     los que van también a la fiesta, el link con ?fiesta.
     Ver el README para los dos links listos para mandar.           */
  programa: {

    // Para los invitados a la ceremonia solamente
    ceremonia: [
      {
        icono: "estrella",
        titulo: "Ceremonia",
        hora: "09:00 hs",
        lugar: "Jabad Lubavitch Córdoba",
        detalle: "Lectura de la Torá y bendiciones."
      }
    ],

    // Para los invitados a la ceremonia y a la fiesta
    completa: [
      {
        icono: "estrella",
        titulo: "Ceremonia",
        hora: "09:00 hs",
        lugar: "Jabad Lubavitch Córdoba",
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
        icono: "musica",
        titulo: "Fiesta",
        hora: "21:30 hs",
        lugar: "Salón (completar)",
        detalle: "Cena, música y baile hasta el final."
      }
    ]
  },

  /* ---------- LUGAR ---------- */
  lugar: {
    titulo: "El lugar",
    nombre: "Jabad Lubavitch Córdoba",
    direccion: "Sucre 1378/80, Barrio Cofico, Córdoba",
    detalle: "",
    // En Google Maps: Compartir → Insertar un mapa → copiar el src del iframe
    mapaEmbed: "https://www.google.com/maps?q=Sucre+1378,+Barrio+Cofico,+X5000+C%C3%B3rdoba,+Argentina&output=embed",
    mapaLink: "https://maps.google.com/?q=Jabad+Lubavitch+Cordoba,+Sucre+1378,+Barrio+Cofico,+Cordoba"
  },

  /* ---------- GALERÍA ---------- */
  galeria: {
    titulo: "Momentos",
    subtitulo: "Un poco de nuestra historia hasta acá",
    fotos: [
      { src: "img/galeria/foto-1.jpeg", alt: "Leivi tocando el shofar" },
      { src: "img/galeria/foto-2.jpeg", alt: "Leivi con la Torá" },
      { src: "img/galeria/foto-3.jpeg", alt: "Leivi bailando" }
    ]
  },

  /* ---------- REGALOS ---------- */
  regalos: {
    titulo: "Regalos",
    texto: "Tu presencia es el mejor regalo. Si querés hacernos un obsequio, podés dejarlo en el sobre el día del evento.",
    alias: null,      // ej: "leivi.barmitzva"
    cbu: null,
    titular: null
  },

  /* ---------- CONFIRMACIÓN DE ASISTENCIA ---------- */
  rsvp: {
    titulo: "Confirmá tu asistencia",
    texto: "Te pedimos confirmar antes del 10 de noviembre.",
    maxAcompanantes: 6,

    // Opción A (por defecto): las confirmaciones llegan por WhatsApp.
    whatsapp: "5491100000000",   // país + área + número, sin + ni espacios

    // Opción B: Google Sheets. Si tiene URL, se usa en lugar de WhatsApp.
    endpoint: null
  },

  /* ---------- HASHTAG ---------- */
  hashtag: {
    titulo: "Compartí tus fotos",
    texto: "Subí tus fotos y videos de la noche con el hashtag",
    tag: "#BarMitzvaDeLeivi",
    instagram: "https://www.instagram.com/explore/tags/barmitzvadeleivi/"
  },

  footer: "Leivi · 10.12.26"
};
