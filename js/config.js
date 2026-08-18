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
    galeria:   true,   // fotos de Leivi (las reales, en img/galeria/)
    rsvp:      true,   // confirmar asistencia
    regalos:   false,
    hashtag:   false
  },

  /* ---------- DATOS PRINCIPALES ---------- */
  nombre: "Leivi",
  evento: "Bar Mitzvá",          // cambiar a "Bat Mitzvá" si corresponde
  saveTheDate: "Save the Date",

  // Lo que dice el header. Antes repetía "Bar Mitzvá de Leivi",
  // que ya está grande en la portada: con el nombre solo alcanza.
  marca: "Leivi",

  // Fecha y hora del evento (ISO, huso horario de Argentina)
  fechaISO: "2026-12-10T09:00:00-03:00",
  fechaPunteada: "10 · 12 · 2026",
  fechaLarga: "Jueves 10 de diciembre de 2026",

  tituloPagina: "Bar Mitzvá de Leivi · 10.12.26",
  descripcionPagina: "Quiero que seas parte de este día tan especial.",

  /* ---------- MENÚ ---------- */
  menu: [
    { texto: "Home",           href: "#top" },
    { texto: "La celebración", href: "#celebracion" },
    { texto: "El lugar",       href: "#lugar" },
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
      "Llegó el día en que asumo mis mitzvot y celebro mi entrada a la vida adulta judía.",
      "Me encantaría que estés presente para compartir este momento conmigo."
    ],
    firma: "Leivi"
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
        detalle: "Colocación de tefilín y lectura de la Torá."
      }
    ],

    // Para los invitados a la ceremonia y a la fiesta
    completa: [
      {
        icono: "estrella",
        titulo: "Ceremonia",
        hora: "09:00 hs",
        lugar: "Jabad Lubavitch Córdoba",
        detalle: "Colocación de tefilín y lectura de la Torá."
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
    subtitulo: "Un poco de mi historia hasta acá",
    // En orden cronológico: recién nacido primero, hoy al final.
    // Se ve crecer a Leivi a medida que uno baja.
    fotos: [
      { src: "img/galeria/foto-01.jpg", alt: "Leivi recién nacido, en brazos" },
      { src: "img/galeria/foto-02.jpg", alt: "Leivi bebé, sentadito con camisa a cuadros" },
      { src: "img/galeria/foto-03.jpg", alt: "Leivi encendiendo la januquiá" },
      { src: "img/galeria/foto-04.jpg", alt: "Leivi con su mamadera" },
      { src: "img/galeria/foto-05.jpg", alt: "Leivi con la mochila, listo para el jardín" },
      { src: "img/galeria/foto-06.jpg", alt: "Leivi de galera y camisa blanca" },
      { src: "img/galeria/foto-07.jpg", alt: "Leivi haciendo fuerza" },
      { src: "img/galeria/foto-08.jpg", alt: "Leivi disfrazado, con la cara pintada" },
      { src: "img/galeria/foto-09.jpg", alt: "Leivi de paseo, con gorro y mochila" },
      { src: "img/galeria/foto-10.jpg", alt: "Leivi en la playa" },
      { src: "img/galeria/foto-11.jpg", alt: "Leivi disfrazado en Purim" },
      { src: "img/galeria/foto-12.jpg", alt: "Leivi de saco, brindando" }
    ]
  },

  /* ---------- REGALOS ---------- */
  regalos: {
    titulo: "Regalos",
    texto: "Tu presencia es el mejor regalo. Si querés hacerme un obsequio, podés dejarlo en el sobre el día del evento.",
    alias: null,      // ej: "leivi.barmitzva"
    cbu: null,
    titular: null
  },

  /* ---------- CONFIRMACIÓN DE ASISTENCIA ---------- */
  rsvp: {
    titulo: "Confirmá tu asistencia",
    texto: "Te pido que confirmes antes del 10 de noviembre.",
    maxAcompanantes: 6,

    // Opción A (por defecto): las confirmaciones llegan por WhatsApp.
    whatsapp: "5491100000000",   // país + área + número, sin + ni espacios

    // Opción B: Google Sheets. Si tiene URL, se usa en lugar de WhatsApp.
    endpoint: "https://script.google.com/macros/s/AKfycbwUc3Y0IgxKSIM9w0MVsZJa0UbZIzQOPMvtqEbTWL5AMBU7hJ4G3MHZnKzF7zstfBLpHQ/exec"
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
