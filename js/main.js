/* ============================================================
   Toda la página se arma desde js/config.js
   ============================================================ */
(function () {
  'use strict';
  var C = window.CONFIG;

  function get(path) {
    return path.split('.').reduce(function (o, k) {
      return (o == null) ? null : o[k];
    }, C);
  }

  /* ---------- Textos con data-cfg ---------- */
  document.querySelectorAll('[data-cfg]').forEach(function (el) {
    var v = get(el.getAttribute('data-cfg'));
    if (v != null && v !== '') el.textContent = v;
  });

  document.title = C.tituloPagina || document.title;
  var metaDesc = document.querySelector('meta[name=description]');
  if (metaDesc && C.descripcionPagina) metaDesc.content = C.descripcionPagina;

  /* ---------- Mostrar / ocultar secciones ---------- */
  document.querySelectorAll('[data-seccion]').forEach(function (sec) {
    var nombre = sec.getAttribute('data-seccion');
    if (C.secciones && C.secciones[nombre] === false) sec.hidden = true;
  });

  /* ============================================================
     ICONOS — trazo dorado, viewBox 44×44
     ============================================================ */
  var ICONOS = {
    estrella:
      '<polygon points="22,4 37.59,31 6.41,31" stroke-linejoin="miter"/>' +
      '<polygon points="22,40 6.41,13 37.59,13" stroke-linejoin="miter"/>',

    copa:
      '<path d="M14 7h16l-1.6 11.5a6.4 6.4 0 0 1-12.8 0z"/><path d="M22 25v10M15.5 35h13"/>' +
      '<path d="M16.6 12.5h10.8" stroke-width="1.2" opacity=".7"/>',

    musica:
      '<path d="M17 31.5V11.5l16-3.5v20"/>' +
      '<ellipse cx="13.2" cy="32.6" rx="4.6" ry="3.7" transform="rotate(-16 13.2 32.6)"/>' +
      '<ellipse cx="29.2" cy="29.1" rx="4.6" ry="3.7" transform="rotate(-16 29.2 29.1)"/>' +
      '<path d="M17 16.5l16-3.5" stroke-width="1.4" opacity=".7"/>' +
      '<path d="M7 12l1.6 3.4L12 17l-3.4 1.6L7 22l-1.6-3.4L2 17l3.4-1.6z" stroke-width="1.2" opacity=".8"/>' +
      '<path d="M38.5 33l1.1 2.3 2.4 1.1-2.4 1.1-1.1 2.4-1.1-2.4-2.4-1.1 2.4-1.1z" stroke-width="1.2" opacity=".8"/>',

    calendario:
      '<rect x="6" y="9" width="32" height="29" rx="3"/>' +
      '<path d="M6 17h32M15 5v8M29 5v8"/>' +
      '<path d="M13 24h5M20 24h5M27 24h5M13 31h5M20 31h5" stroke-width="1.3" opacity=".8"/>',

    reloj:
      '<circle cx="22" cy="24" r="15"/>' +
      '<path d="M22 15v9l6 4"/>' +
      '<path d="M11 8L6.5 12M33 8l4.5 4" stroke-width="1.4" opacity=".85"/>',

    pin:
      '<path d="M22 40s12-11.3 12-19.5A12 12 0 1 0 10 20.5C10 28.7 22 40 22 40z"/>' +
      '<circle cx="22" cy="20" r="4.6"/>',

    mono:  // moño de traje formal
      '<path d="M20 19.5L7 12.5c-1.6-.9-3.4.3-3.4 2.1v18.8c0 1.8 1.8 3 3.4 2.1l13-7z"/>' +
      '<path d="M24 19.5l13-7c1.6-.9 3.4.3 3.4 2.1v18.8c0 1.8-1.8 3-3.4 2.1l-13-7z"/>' +
      '<rect x="19" y="18" width="6" height="12" rx="2"/>'
  };

  function svgIcono(clave, clase) {
    return '<svg class="' + clase + '" viewBox="0 0 44 44" aria-hidden="true">' +
      (ICONOS[clave] || ICONOS.estrella) + '</svg>';
  }

  /* ---------- Menú ---------- */
  var navLinks = document.getElementById('nav-links');
  if (navLinks && C.menu) {
    navLinks.innerHTML = C.menu.map(function (m) {
      return '<a href="' + m.href + '">' + m.texto + '</a>';
    }).join('');
  }

  var nav = document.getElementById('nav');
  var burger = document.getElementById('nav-burger');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var abierto = nav.classList.toggle('abierto');
      burger.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('abierto');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // El header se compacta apenas arrancás a bajar
  if (nav) {
    var compactar = function () {
      nav.classList.toggle('compacto', window.scrollY > 40);
    };
    window.addEventListener('scroll', compactar, { passive: true });
    compactar();
  }

  /* ---------- Invitación ---------- */
  var invEl = document.getElementById('invitacion-texto');
  if (invEl && C.invitacion && C.invitacion.texto) {
    invEl.innerHTML = C.invitacion.texto.map(function (p) {
      return '<p>' + p + '</p>';
    }).join('');
  }

  /* ---------- Tira de datos ---------- */
  var datosEl = document.getElementById('datos');
  if (datosEl && C.datos) {
    datosEl.innerHTML = C.datos.map(function (d) {
      return '<div class="dato">' +
        '<div class="dato__ico">' + svgIcono(d.icono, '') + '</div>' +
        '<div class="dato__txt"><b>' + d.titulo + '</b>' +
        '<span>' + d.l1 + '</span>' +
        (d.l2 ? '<span>' + d.l2 + '</span>' : '') +
        '</div></div>';
    }).join('');
  }

  /* ---------- La celebración ----------
     Dos versiones de la invitación: la URL normal muestra sólo la
     ceremonia; con ?fiesta al final muestra todo el programa.      */
  var conFiesta = /(\?|&)fiesta\b/.test(location.search);
  document.body.dataset.version = conFiesta ? 'completa' : 'ceremonia';

  var progEl = document.getElementById('programa');
  var listaPrograma = C.programa
    ? (conFiesta ? C.programa.completa : C.programa.ceremonia)
    : null;

  if (progEl && listaPrograma) {
    progEl.classList.toggle('programa--uno', listaPrograma.length === 1);
    progEl.innerHTML = listaPrograma.map(function (p) {
      return '<article class="tarjeta">' +
        svgIcono(p.icono, 'tarjeta__ico') +
        '<h3 class="tarjeta__titulo">' + p.titulo + '</h3>' +
        '<p class="tarjeta__hora">' + p.hora + '</p>' +
        '<p class="tarjeta__lugar">' + p.lugar + '</p>' +
        (p.detalle ? '<p class="tarjeta__detalle">' + p.detalle + '</p>' : '') +
        '</article>';
    }).join('');
  }

  /* ---------- Contador ---------- */
  var fecha = new Date(C.fechaISO);
  var els = {
    dias: document.getElementById('cd-dias'),
    horas: document.getElementById('cd-horas'),
    min: document.getElementById('cd-min'),
    seg: document.getElementById('cd-seg')
  };

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function tick() {
    if (!els.dias) return;
    var ms = fecha - new Date();
    if (ms <= 0) {
      var cd = document.getElementById('countdown');
      if (cd) cd.innerHTML = '<p class="hero__fecha" style="margin:0">¡Llegó el gran día!</p>';
      clearInterval(timer);
      return;
    }
    var s = Math.floor(ms / 1000);
    els.dias.textContent = Math.floor(s / 86400);
    els.horas.textContent = pad(Math.floor(s / 3600) % 24);
    els.min.textContent = pad(Math.floor(s / 60) % 60);
    els.seg.textContent = pad(s % 60);
  }
  var timer = setInterval(tick, 1000);
  tick();

  /* ---------- Agendar en el calendario (.ics) ---------- */
  var ics = (function () {
    // La ceremonia es a la mañana. Para los invitados a la fiesta el
    // evento del calendario abarca todo el día; para el resto, 3 horas.
    var fin = conFiesta
      ? new Date(fecha.getTime() + 14 * 3600 * 1000)
      : new Date(fecha.getTime() + 3 * 3600 * 1000);
    var fmt = function (d) {
      return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    var lugarTxt = [get('lugar.nombre'), get('lugar.direccion')].filter(Boolean).join(', ');
    return [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//barmitzva//ES',
      'BEGIN:VEVENT',
      'UID:' + Date.now() + '@barmitzva',
      'DTSTAMP:' + fmt(new Date()),
      'DTSTART:' + fmt(fecha),
      'DTEND:' + fmt(fin),
      'SUMMARY:' + C.evento + ' de ' + C.nombre,
      'LOCATION:' + lugarTxt,
      'END:VEVENT', 'END:VCALENDAR'
    ].join('\r\n');
  })();

  ['btn-calendario', 'nav-agendar'].forEach(function (id) {
    var b = document.getElementById(id);
    if (!b) return;
    b.href = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics);
    b.setAttribute('download', C.nombre.toLowerCase() + '.ics');
  });

  /* ---------- Mapa ---------- */
  var frame = document.getElementById('mapa-frame');
  if (frame && get('lugar.mapaEmbed')) frame.src = C.lugar.mapaEmbed;
  var btnMapa = document.getElementById('btn-mapa');
  if (btnMapa && get('lugar.mapaLink')) btnMapa.href = C.lugar.mapaLink;

  /* ---------- Galería + lightbox ---------- */
  var galEl = document.getElementById('galeria');
  var fotos = get('galeria.fotos') || [];
  if (galEl && fotos.length) {
    // Con pocas fotos, la grilla se ajusta para que no queden estiradas
    if (fotos.length < 3) galEl.classList.add('galeria--' + fotos.length);

    galEl.innerHTML = fotos.map(function (f, i) {
      return '<button class="foto" type="button" data-i="' + i + '" aria-label="Ampliar: ' + f.alt + '">' +
        '<img src="' + f.src + '" alt="' + f.alt + '" loading="lazy">' +
        '<span class="foto__lupa"><svg viewBox="0 0 24 24" aria-hidden="true">' +
          '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.4 15.4L21 21"/>' +
        '</svg></span>' +
        '<span class="foto__pie">' + f.alt + '</span>' +
        '</button>';
    }).join('');
  }

  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightbox-img');
  var idx = 0;

  function abrir(i) {
    idx = (i + fotos.length) % fotos.length;
    lbImg.src = fotos[idx].src;
    lbImg.alt = fotos[idx].alt;
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('visor-abierto');
  }
  function cerrar() {
    lb.hidden = true;
    document.body.style.overflow = '';
    document.body.classList.remove('visor-abierto');
  }

  if (galEl && lb) {
    galEl.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-i]');
      if (b) abrir(+b.dataset.i);
    });
    lb.querySelector('.lightbox__cerrar').addEventListener('click', cerrar);
    lb.querySelector('.lightbox__nav--prev').addEventListener('click', function () { abrir(idx - 1); });
    lb.querySelector('.lightbox__nav--next').addEventListener('click', function () { abrir(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) cerrar(); });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') cerrar();
      if (e.key === 'ArrowLeft') abrir(idx - 1);
      if (e.key === 'ArrowRight') abrir(idx + 1);
    });
  }

  /* ---------- Regalos ---------- */
  var banco = document.getElementById('banco');
  if (banco && C.regalos) {
    var filas = [
      ['Alias', C.regalos.alias],
      ['CBU', C.regalos.cbu],
      ['Titular', C.regalos.titular]
    ].filter(function (f) { return f[1]; });
    banco.innerHTML = filas.map(function (f) {
      return '<div><b>' + f[0] + '</b>' + f[1] + '</div>';
    }).join('');
  }

  /* ---------- Hashtag ---------- */
  var hashEl = document.getElementById('hashtag-link');
  if (hashEl && C.hashtag) {
    hashEl.textContent = C.hashtag.tag;
    hashEl.href = C.hashtag.instagram || '#';
  }

  /* ---------- Envío a la planilla ----------
     Google Apps Script contesta con un redirect a script.googleusercontent.com,
     y ESA respuesta viene con "X-Frame-Options: SAMEORIGIN" y
     "Content-Security-Policy: frame-ancestors 'self'". O sea: la respuesta
     NUNCA se puede leer ni dibujar desde nuestro sitio.

     Va con fetch en modo no-cors: manda el POST, sigue el
     redirect y resuelve cuando terminó. La respuesta viene opaca (no se
     puede leer, Google no manda cabeceras CORS), pero que la promesa
     resuelva ya dice que el pedido salió y completó, que es lo que hace
     falta saber. Con el cuerpo en x-www-form-urlencoded no hay preflight,
     así que anda igual en Chrome, Firefox y Safari de iPhone.

     NO va más por un iframe oculto, y se probó por qué: apuntando el envío a
     un dominio inexistente, el formulario contestaba "¡Gracias! Recibimos tu
     confirmación" a los 0,8 segundos. Un iframe cuya navegación fracasa
     dispara 'load' igual que uno que cargó, así que su señal de éxito no
     distinguía entre que el dato llegara y que no llegara nada. Mentirle a
     alguien que confirmó es peor que fallar: se queda afuera creyendo que
     avisó. Si fetch no existe, mejor mandar por WhatsApp (ver más abajo).  */
  function enviar(url, datos, listo) {
    var cuerpo = Object.keys(datos).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(datos[k]);
    }).join('&');

    var opciones = {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: cuerpo
    };

    // Si la conexión se cuelga, cortamos a los 20 segundos en vez de dejar
    // el botón girando para siempre.
    var cortar;
    if (window.AbortController) {
      var control = new AbortController();
      opciones.signal = control.signal;
      cortar = setTimeout(function () { control.abort(); }, 20000);
    }

    fetch(url, opciones).then(function () {
      clearTimeout(cortar);
      listo(true);
    })['catch'](function () {
      clearTimeout(cortar);
      listo(false);
    });
  }

  /* ---------- RSVP ---------- */
  var form = document.getElementById('rsvp-form');
  var msg = document.getElementById('form-msg');
  var campoCant = document.getElementById('campo-cantidad');

  if (form) {
    var maxAc = get('rsvp.maxAcompanantes');
    if (maxAc && form.elements.cantidad) form.elements.cantidad.max = maxAc;

    form.querySelectorAll('input[name=asistencia]').forEach(function (r) {
      r.addEventListener('change', function () {
        if (campoCant) campoCant.hidden = (form.elements.asistencia.value === 'No');
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      msg.className = 'form__msg';
      msg.textContent = '';

      var datos = {
        nombre: form.elements.nombre.value.trim(),
        contacto: form.elements.contacto.value.trim(),
        asistencia: form.elements.asistencia.value,
        cantidad: form.elements.asistencia.value === 'No' ? 0 : form.elements.cantidad.value,
        mensaje: form.elements.mensaje.value.trim()
      };

      if (!datos.nombre || !datos.contacto) {
        msg.className = 'form__msg error';
        msg.textContent = 'Completá tu nombre y un contacto, por favor.';
        return;
      }

      var btn = form.querySelector('button[type=submit]');
      var endpoint = get('rsvp.endpoint');

      if (endpoint && window.fetch) {
        btn.disabled = true;
        msg.className = 'form__msg';
        msg.textContent = 'Enviando…';

        enviar(endpoint, datos, function (ok) {
          btn.disabled = false;
          if (ok) {
            form.reset();
            if (campoCant) campoCant.hidden = false;
            msg.className = 'form__msg ok';
            msg.textContent = '¡Gracias! Recibimos tu confirmación 🎉';
          } else {
            msg.className = 'form__msg error';
            msg.textContent = 'No pudimos enviarlo. Probá de nuevo en un momento.';
          }
        });
        return;
      }

      var texto =
        '*' + C.evento + ' de ' + C.nombre + '*\n' +
        'Nombre: ' + datos.nombre + '\n' +
        'Contacto: ' + datos.contacto + '\n' +
        'Asiste: ' + datos.asistencia + '\n' +
        (datos.asistencia === 'Sí' ? 'Cantidad: ' + datos.cantidad + '\n' : '') +
        (datos.mensaje ? 'Mensaje: ' + datos.mensaje : '');

      window.open('https://wa.me/' + get('rsvp.whatsapp') + '?text=' + encodeURIComponent(texto), '_blank');
      msg.className = 'form__msg ok';
      msg.textContent = 'Se abrió WhatsApp para que envíes tu confirmación 🎉';
    });
  }

  /* ---------- Alto real de la barra flotante ----------
     El hero reserva justo ese espacio, así el botón nunca queda
     tapado sea cual sea el alto de pantalla.                     */
  var barra = document.querySelector('.capitulo--datos');
  var navEl = document.getElementById('nav');
  if (barra || navEl) {
    var medir = function () {
      var raiz = document.documentElement.style;
      if (barra) {
        var fija = getComputedStyle(barra).position === 'fixed';
        // Cuánto ocupa desde el borde inferior de la pantalla: no alcanza
        // con su alto, también cuenta lo que está separada del fondo.
        var ocupa = window.innerHeight - barra.getBoundingClientRect().top;
        raiz.setProperty('--barra', fija ? Math.round(ocupa) + 'px' : '0px');
      }
      if (navEl) raiz.setProperty('--nav', navEl.offsetHeight + 'px');
    };
    window.addEventListener('resize', medir);
    medir();
    // Las fuentes cambian el alto al cargar: volvemos a medir
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(medir);
  }

  /* ---------- Partículas doradas ---------- */
  var cont = document.getElementById('particulas');
  var animaOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (cont && animaOk) {
    var cantidad = window.innerWidth < 700 ? 16 : 30;
    var html = '';
    for (var i = 0; i < cantidad; i++) {
      var tam = (Math.random() * 2.2 + 0.8).toFixed(1);
      var dur = (Math.random() * 22 + 26).toFixed(0);
      var delay = (Math.random() * -40).toFixed(0);
      var op = (Math.random() * 0.4 + 0.14).toFixed(2);
      var dx = (Math.random() * 90 - 45).toFixed(0);
      html += '<span class="particula" style="' +
        'left:' + (Math.random() * 100).toFixed(1) + '%;' +
        'top:' + (100 + Math.random() * 25).toFixed(0) + '%;' +
        'width:' + tam + 'px;height:' + tam + 'px;' +
        '--op:' + op + ';--dx:' + dx + 'px;' +
        'animation-duration:' + dur + 's;animation-delay:' + delay + 's;' +
        '"></span>';
    }
    cont.innerHTML = html;
  }

  /* ---------- Aparición al scrollear ---------- */
  var obs = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add('visible');
        obs.unobserve(en.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });

  /* ---------- Marcar el link activo del menú ---------- */
  var secciones = ['top', 'celebracion', 'lugar', 'rsvp', 'fotos']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if (secciones.length && navLinks) {
    var obsNav = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.querySelectorAll('a').forEach(function (a) {
          a.classList.toggle('activo', a.getAttribute('href') === '#' + en.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secciones.forEach(function (s) { obsNav.observe(s); });
  }

})();
