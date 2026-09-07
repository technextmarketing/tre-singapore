/* TRE™ in Singapore — site behaviour
   - mobile navigation
   - scroll reveal
   - events grid (filters, countdown, past/upcoming) fed by events-data.js
   - contact form (mailto fallback or POST endpoint)
*/
(function () {
  'use strict';

  var ICONS = {
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 22l5-3 5 3-1.5-8"/></svg>'
  };

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function parseDate(iso) {
    // iso: YYYY-MM-DD or YYYY-MM-DDTHH:MM (local time)
    var m = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/.exec(iso || '');
    if (!m) return null;
    return new Date(+m[1], +m[2] - 1, +m[3], m[4] ? +m[4] : 0, m[5] ? +m[5] : 0);
  }
  function endOfDay(d) { var e = new Date(d); e.setHours(23, 59, 59, 999); return e; }

  /* ---------- Navigation ---------- */
  function initNav() {
    var toggle = $('.nav-toggle'), nav = $('.nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) nav.classList.remove('open');
    });
  }

  /* ---------- Footer year ---------- */
  function initYear() {
    $all('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    var els = $all('.reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
    // Safety net: never leave content hidden if the observer does not fire (e.g. print, odd viewports)
    setTimeout(function () { els.forEach(function (el) { el.classList.add('in'); }); }, 2500);
  }

  /* ---------- Events ---------- */
  function normaliseEvents(list) {
    var now = new Date();
    return list.map(function (ev) {
      var start = parseDate(ev.start);
      var end = ev.end ? endOfDay(parseDate(ev.end)) : endOfDay(start);
      var copy = Object.assign({}, ev);
      copy._start = start;
      copy._end = end;
      copy._past = end < now;
      copy._soldOut = !!ev.soldOut;
      return copy;
    });
  }

  function chipFor(ev) {
    if (ev.chip) return { top: ev.chip.top, bottom: ev.chip.bottom };
    var d = ev._start;
    return { top: String(d.getDate()), bottom: MONTHS[d.getMonth()] + ' ' + d.getFullYear() };
  }

  function themeFor(ev) {
    if (ev.theme) return ev.theme;
    switch (ev.category) {
      case 'Certification': return 'theme-deep';
      case 'Workshop': return 'theme-bronze';
      case 'Community': return 'theme-green';
      case 'Coaching': return 'theme-orange';
      default: return '';
    }
  }

  function renderCard(ev) {
    var chip = chipFor(ev);
    var statusBadge = '';
    if (ev._past) statusBadge = '<span class="badge past">Past event</span>';
    else if (ev._soldOut) statusBadge = '<span class="badge soldout">Sold out</span>';
    else if (ev._start < new Date()) statusBadge = '<span class="badge" style="background:var(--green);color:#fff">In progress</span>';
    else if (ev.isNew) statusBadge = '<span class="badge" style="background:var(--orange);color:#fff">New</span>';

    var meta = '';
    meta += '<li>' + ICONS.calendar + '<span>' + esc(ev.dateText) + '</span></li>';
    if (ev.timeText) meta += '<li>' + ICONS.clock + '<span>' + esc(ev.timeText) + '</span></li>';
    meta += '<li>' + ICONS.pin + '<span>' + esc(ev.venue || ev.location) + (ev.format ? ' · ' + esc(ev.format) : '') + '</span></li>';
    if (ev.facilitator) meta += '<li>' + ICONS.user + '<span>' + esc(ev.facilitator) + '</span></li>';
    if (ev.credits) meta += '<li>' + ICONS.award + '<span>' + esc(ev.credits) + '</span></li>';

    var price = ev.price
      ? '<div class="event-price">' + esc(ev.price) + (ev.priceNote ? '<small>' + esc(ev.priceNote) + '</small>' : '') + '</div>'
      : '<div class="event-price" style="font-weight:600;color:var(--muted);font-size:.9rem">' + esc(ev.priceText || 'Enquire for pricing') + '</div>';

    var action;
    if (ev._past) {
      action = ev.recapLink
        ? '<a class="btn btn-outline btn-sm" href="' + esc(ev.recapLink) + '">View recap</a>'
        : '<span class="btn btn-outline btn-sm disabled">Completed</span>';
    } else if (ev._soldOut) {
      action = '<a class="btn btn-navy btn-sm" href="' + esc(ev.waitlistLink || ev.link || '#') + '" target="_blank" rel="noopener">Join waitlist</a>';
    } else {
      action = '<a class="btn btn-primary btn-sm" href="' + esc(ev.link || '#') + '"' + (/^https?:/.test(ev.link || '') ? ' target="_blank" rel="noopener"' : '') + '>' + esc(ev.linkText || 'Register') + '</a>';
    }

    var sample = ev.sample ? '<span class="fac-sample" style="top:auto;bottom:12px;left:auto;right:12px">Sample listing</span>' : '';

    return '' +
      '<article class="event-card' + (ev._past ? ' is-past' : '') + '" data-category="' + esc(ev.category) + '" data-region="' + esc(ev.region) + '" data-past="' + (ev._past ? '1' : '0') + '" data-soldout="' + (ev._soldOut ? '1' : '0') + '">' +
        '<div class="event-media ' + themeFor(ev) + '">' +
          '<div class="badges"><span class="badge">' + esc(ev.location) + '</span>' +
            '<span><span class="badge cat">' + esc(ev.category) + '</span> ' + statusBadge + '</span></div>' +
          '<div class="date-chip"><b>' + esc(chip.top) + '</b><span>' + esc(chip.bottom) + '</span></div>' +
          sample +
        '</div>' +
        '<div class="event-body">' +
          '<h3>' + (ev.link && !ev._past ? '<a href="' + esc(ev.link) + '"' + (/^https?:/.test(ev.link) ? ' target="_blank" rel="noopener"' : '') + '>' + esc(ev.title) + '</a>' : esc(ev.title)) + '</h3>' +
          '<ul class="event-meta">' + meta + '</ul>' +
          '<p class="event-desc">' + esc(ev.description) + '</p>' +
          '<div class="event-foot">' + price + action + '</div>' +
        '</div>' +
      '</article>';
  }

  function initEvents() {
    if (!window.TRE_EVENTS) return;
    var events = normaliseEvents(window.TRE_EVENTS);
    var upcoming = events.filter(function (e) { return !e._past; }).sort(function (a, b) { return a._start - b._start; });
    var past = events.filter(function (e) { return e._past; }).sort(function (a, b) { return b._start - a._start; });

    // Home page preview
    $all('[data-events-preview]').forEach(function (grid) {
      var n = parseInt(grid.getAttribute('data-events-preview'), 10) || 3;
      var list = upcoming.filter(function (e) { return !e.sample; }).slice(0, n);
      if (list.length < n) list = upcoming.slice(0, n);
      grid.innerHTML = list.map(renderCard).join('') || '<div class="event-empty">New events are announced soon. Contact us to be notified.</div>';
    });

    // Full events page
    var grid = $('#events-grid');
    if (grid) {
      var filters = $all('.filter-btn');
      var current = 'all';

      function render() {
        var list;
        if (current === 'past') list = past;
        else if (current === 'soldout') list = events.filter(function (e) { return e._soldOut; });
        else list = upcoming.filter(function (e) {
          if (current === 'all') return true;
          if (current === 'certification') return e.category === 'Certification';
          if (current === 'community') return e.category === 'Community';
          if (current === 'workshop') return e.category === 'Workshop';
          return (e.region || '').toLowerCase() === current;
        });
        grid.innerHTML = list.length
          ? list.map(renderCard).join('')
          : '<div class="event-empty" style="grid-column:1/-1">No events in this category right now. <a href="contact.html">Contact us</a> to hear about the next one.</div>';
        var pastWrap = $('#past-events');
        if (pastWrap) pastWrap.hidden = (current !== 'all') || !past.length;
      }

      filters.forEach(function (btn) {
        btn.addEventListener('click', function () {
          filters.forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          current = btn.getAttribute('data-filter');
          render();
        });
      });

      var pastGrid = $('#past-grid');
      if (pastGrid) pastGrid.innerHTML = past.map(renderCard).join('');

      var counts = $('#event-count');
      if (counts) counts.textContent = upcoming.length + ' upcoming · ' + past.length + ' past';

      render();
    }

    // Countdown to the next event that has not started yet (real listings preferred over samples)
    var now = new Date();
    var notStarted = upcoming.filter(function (e) { return e._start > now; });
    var next = notStarted.filter(function (e) { return !e.sample; })[0] || notStarted[0];
    var cd = $('#countdown');
    if (cd && next) {
      $('#countdown-title').textContent = next.title;
      $('#countdown-sub').textContent = next.dateText + ' · ' + (next.venue || next.location);
      var link = $('#countdown-link');
      if (link) { link.href = next.link || 'events.html'; if (/^https?:/.test(next.link || '')) { link.target = '_blank'; link.rel = 'noopener'; } }
      var target = next._start;
      function tick() {
        var diff = Math.max(0, target - new Date());
        var d = Math.floor(diff / 86400000), h = Math.floor(diff / 3600000) % 24, m = Math.floor(diff / 60000) % 60, s = Math.floor(diff / 1000) % 60;
        $('#cd-d').textContent = d; $('#cd-h').textContent = ('0' + h).slice(-2);
        $('#cd-m').textContent = ('0' + m).slice(-2); $('#cd-s').textContent = ('0' + s).slice(-2);
      }
      tick(); setInterval(tick, 1000);
    } else if (cd) {
      cd.closest('.countdown-bar').hidden = true;
    }
  }

  /* ---------- Contact form ---------- */
  function initForm(form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var data = {};
      $all('input, select, textarea', form).forEach(function (f) {
        if (!f.name) return;
        if (f.type === 'checkbox') data[f.name] = f.checked ? 'Yes' : 'No';
        else data[f.name] = f.value.trim();
      });
      var endpoint = form.getAttribute('data-endpoint');
      var success = $('.form-success', form);
      var btn = $('button[type="submit"]', form);

      if (endpoint && /^https?:/.test(endpoint)) {
        btn.disabled = true; btn.textContent = 'Sending…';
        fetch(endpoint, { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
          .then(function (r) { if (!r.ok) throw new Error('Request failed'); form.reset(); success.classList.add('show'); })
          .catch(function () { alert('Sorry, the message could not be sent. Please email isabelle@bhdasia.com directly.'); })
          .then(function () { btn.disabled = false; btn.textContent = 'Send message'; });
        return;
      }

      // Fallback without a backend: open the visitor's email client with the message pre-filled.
      var to = form.getAttribute('data-mailto') || 'isabelle@bhdasia.com';
      var subject = '[TRE Singapore website] ' + (data.interest || 'Enquiry') + ' — ' + (data.name || '');
      var lines = [
        'Name: ' + data.name, 'Email: ' + data.email, 'Phone / WhatsApp: ' + (data.phone || '-'),
        'I am: ' + (data.who || '-'), 'Interested in: ' + (data.interest || '-'), '',
        'Message:', data.message || '-', '', 'Newsletter: ' + (data.newsletter || 'No')
      ];
      window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
      success.classList.add('show');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initYear();
    initReveal();
    initEvents();
    var form = document.getElementById('contact-form');
    if (form) initForm(form);
  });
})();
