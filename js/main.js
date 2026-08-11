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

  /* ---------- Textos simples con data-cfg ---------- */
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
    if (nombre === 'invitacion') return;              // siempre visible
    if (C.secciones && C.secciones[nombre] === false) sec.hidden = true;
  });

  /* ---------- Invitación ---------- */
  var invEl = document.getElementById('invitacion-texto');
  if (invEl && C.invitacion && C.invitacion.texto) {
    invEl.innerHTML = C.invitacion.texto.map(function (p) {
      return '<p>' + p + '</p>';
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
      if (cd) cd.innerHTML = '<p class="h-script" style="margin:0">¡Llegó el gran día!</p>';
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
  var btnCal = document.getElementById('btn-calendario');
  if (btnCal) {
    var fin = new Date(fecha.getTime() + 5 * 3600 * 1000);
    var fmt = function (d) {
      return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    var lugarTxt = [get('lugar.nombre'), get('lugar.direccion')].filter(Boolean).join(', ');
    var ics = [
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
    btnCal.href = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics);
    btnCal.setAttribute('download', C.nombre.toLowerCase() + '.ics');
  }

  /* ---------- Programa ---------- */
  var ICONOS = {
    torah: '<path d="M15 11h14v22H15z"/><path d="M12 8.5v27M32 8.5v27"/>' +
           '<ellipse cx="12" cy="7" rx="3.6" ry="2"/><ellipse cx="12" cy="37" rx="3.6" ry="2"/>' +
           '<ellipse cx="32" cy="7" rx="3.6" ry="2"/><ellipse cx="32" cy="37" rx="3.6" ry="2"/>' +
           '<path d="M18.5 17h7M18.5 21h7M18.5 25h7M18.5 29h5" stroke-width="1.2" opacity=".75"/>',
    copa: '<path d="M14 7h16l-1.6 11.5a6.4 6.4 0 0 1-12.8 0z"/><path d="M22 25v10M15.5 35h13"/>' +
          '<path d="M16.6 12.5h10.8" stroke-width="1.2" opacity=".7"/>',
    estrella: '<polygon points="22,4 37.59,31 6.41,31" stroke-linejoin="miter"/>' +
              '<polygon points="22,40 6.41,13 37.59,13" stroke-linejoin="miter"/>',
    musica: '<path d="M17 31.5V11.5l16-3.5v20"/>' +
            '<ellipse cx="13.2" cy="32.6" rx="4.6" ry="3.7" transform="rotate(-16 13.2 32.6)"/>' +
            '<ellipse cx="29.2" cy="29.1" rx="4.6" ry="3.7" transform="rotate(-16 29.2 29.1)"/>' +
            '<path d="M17 16.5l16-3.5" stroke-width="1.4" opacity=".7"/>' +
            '<path d="M7 12l1.6 3.4L12 17l-3.4 1.6L7 22l-1.6-3.4L2 17l3.4-1.6z" stroke-width="1.2" opacity=".8"/>' +
            '<path d="M38.5 33l1.1 2.3 2.4 1.1-2.4 1.1-1.1 2.4-1.1-2.4-2.4-1.1 2.4-1.1z" stroke-width="1.2" opacity=".8"/>'
  };
  var progEl = document.getElementById('programa');
  if (progEl && C.programa) {
    progEl.innerHTML = C.programa.map(function (p) {
      return '<article class="card">' +
        '<svg class="card__icon" viewBox="0 0 44 44" aria-hidden="true">' + (ICONOS[p.icono] || ICONOS.estrella) + '</svg>' +
        '<h3 class="card__titulo">' + p.titulo + '</h3>' +
        '<p class="card__hora">' + p.hora + '</p>' +
        '<p class="card__lugar">' + p.lugar + '</p>' +
        (p.detalle ? '<p class="card__detalle">' + p.detalle + '</p>' : '') +
        '</article>';
    }).join('');
  }

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
    lb.querySelector('.lightbox__close').addEventListener('click', cerrar);
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
  var banco = document.getElementById('datos-banco');
  if (banco && C.regalos) {
    var filas = [
      ['Alias', C.regalos.alias],
      ['CBU', C.regalos.cbu],
      ['Titular', C.regalos.titular]
    ].filter(function (f) { return f[1]; });
    banco.innerHTML = filas.map(function (f) {
      return '<div><b>' + f[0] + '</b><br>' + f[1] + '</div>';
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
  var campoCant = document.getElementById('field-cantidad');

  if (form) {
    var maxAc = get('rsvp.maxAcompanantes');
    var inputCant = form.elements.cantidad;
    if (maxAc && inputCant) inputCant.max = maxAc;

    // Si dice que no viene, se esconde "cuántos son"
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

      // Opción B: guardar en Google Sheets
      if (endpoint) {
        btn.disabled = true;
        btn.textContent = 'Enviando…';
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
          btn.textContent = 'Enviar confirmación';
        });
        return;
      }

      // Opción A (por defecto): abrir WhatsApp con el mensaje armado
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

  /* ---------- Aparición al scrollear ---------- */
  var obs = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add('visible');
        obs.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });

})();
