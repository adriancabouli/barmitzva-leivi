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

  /* ---------- La celebración ---------- */
  var progEl = document.getElementById('programa');
  if (progEl && C.programa) {
    progEl.innerHTML = C.programa.map(function (p) {
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
    var fin = new Date(fecha.getTime() + 5 * 3600 * 1000);
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
    galEl.innerHTML = fotos.map(function (f, i) {
      return '<button type="button" data-i="' + i + '" aria-label="Ampliar ' + f.alt + '">' +
        '<img src="' + f.src + '" alt="' + f.alt + '" loading="lazy"></button>';
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
  }
  function cerrar() {
    lb.hidden = true;
    document.body.style.overflow = '';
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

      if (endpoint) {
        btn.disabled = true;
        fetch(endpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(datos).toString()
        }).then(function () {
          form.reset();
          msg.className = 'form__msg ok';
          msg.textContent = '¡Gracias! Recibimos tu confirmación 🎉';
        }).catch(function () {
          msg.className = 'form__msg error';
          msg.textContent = 'No pudimos enviarlo. Probá de nuevo en un momento.';
        }).finally(function () {
          btn.disabled = false;
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
