/* TRE™ in Singapore — site behaviour (v2)
   - header scroll state, scroll progress, back-to-top
   - mobile navigation
   - staggered scroll reveal, stat count-up, button ripple, CTA spotlight
   - events grid (filters, countdown, past/upcoming) fed by events-data.js
   - contact form (mailto fallback or POST endpoint)
   All motion respects prefers-reduced-motion.
*/
(function () {
  'use strict';

  var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var ICONS = {
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 22l5-3 5 3-1.5-8"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>'
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
    var m = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/.exec(iso || '');
    if (!m) return null;
    return new Date(+m[1], +m[2] - 1, +m[3], m[4] ? +m[4] : 0, m[5] ? +m[5] : 0);
  }
  function endOfDay(d) { var e = new Date(d); e.setHours(23, 59, 59, 999); return e; }
  function isExternal(url) { return /^https?:/.test(url || ''); }

  /* ---------- Header: scroll state + progress bar + back to top ---------- */
  function initChrome() {
    var header = $('.site-header');
    var bar = document.createElement('div'); bar.className = 'scroll-progress'; document.body.appendChild(bar);
    var top = document.createElement('button'); top.className = 'to-top'; top.type = 'button'; top.setAttribute('aria-label', 'Back to top'); top.innerHTML = ICONS.up;
    document.body.appendChild(top);
    top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' }); });

    var ticking = false;
    function update() {
      var y = window.scrollY || document.documentElement.scrollTop;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (header) header.classList.toggle('scrolled', y > 8);
      bar.style.width = (max > 0 ? Math.min(100, (y / max) * 100) : 0) + '%';
      top.classList.toggle('show', y > 640);
      ticking = false;
    }
    window.addEventListener('scroll', function () { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
    update();
  }

  /* ---------- Navigation ---------- */
  function initNav() {
    var toggle = $('.nav-toggle'), nav = $('.nav');
    if (!toggle || !nav) return;
    function setOpen(open) { nav.classList.toggle('open', open); toggle.setAttribute('aria-expanded', open ? 'true' : 'false'); }
    toggle.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
    document.addEventListener('click', function (e) { if (!nav.contains(e.target) && !toggle.contains(e.target)) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  }

  /* ---------- Year ---------- */
  function initYear() { $all('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); }); }

  /* ---------- Reveal (staggered per parent) + count-up ---------- */
  function initReveal() {
    var els = $all('.reveal');
    // give siblings a stagger index
    var groups = new Map();
    els.forEach(function (el) {
      var p = el.parentElement; var n = groups.get(p) || 0; el.style.setProperty('--i', n); groups.set(p, n + 1);
    });
    if (!('IntersectionObserver' in window) || REDUCED) { els.forEach(function (el) { el.classList.add('in'); }); countUpAll(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); countUp(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
    setTimeout(function () { els.forEach(function (el) { el.classList.add('in'); }); }, 2500);
  }
  function countUpAll() { $all('.stat b').forEach(animateNumber); }
  function countUp(scope) { $all('.stat b', scope).forEach(animateNumber); if (scope.matches && scope.matches('.stat')) animateNumber($('b', scope)); }
  function animateNumber(el) {
    if (!el || el.dataset.done) return;
    var text = el.textContent.trim();
    if (!/^\d{1,4}$/.test(text)) return; // only plain integers
    el.dataset.done = '1';
    var target = parseInt(text, 10), start = null, dur = 1100;
    if (REDUCED) { el.textContent = target; return; }
    function frame(ts) {
      if (!start) start = ts;
      var p = Math.min(1, (ts - start) / dur); var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(frame); else el.textContent = target;
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Button ripple + CTA spotlight ---------- */
  function initInteractions() {
    if (REDUCED) return;
    document.addEventListener('pointerdown', function (e) {
      var btn = e.target.closest ? e.target.closest('.btn') : null;
      if (!btn) return;
      var r = btn.getBoundingClientRect(); var size = Math.max(r.width, r.height);
      var s = document.createElement('span'); s.className = 'ripple';
      s.style.width = s.style.height = size + 'px';
      s.style.left = (e.clientX - r.left - size / 2) + 'px'; s.style.top = (e.clientY - r.top - size / 2) + 'px';
      btn.appendChild(s); setTimeout(function () { s.remove(); }, 600);
    });
    $all('.cta-band').forEach(function (band) {
      band.addEventListener('pointermove', function (e) {
        var r = band.getBoundingClientRect();
        band.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        band.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    });
  }

  /* ---------- Events ---------- */
  function normaliseEvents(list) {
    var now = new Date();
    return list.map(function (ev) {
      var start = parseDate(ev.start);
      var end = ev.end ? endOfDay(parseDate(ev.end)) : endOfDay(start);
      var copy = Object.assign({}, ev);
      copy._start = start; copy._end = end; copy._past = end < now; copy._soldOut = !!ev.soldOut; copy._live = !copy._past && start < now;
      return copy;
    });
  }
  function chipFor(ev) {
    if (ev.chip) return { top: ev.chip.top, bottom: ev.chip.bottom };
    var d = ev._start; return { top: String(d.getDate()), bottom: MONTHS[d.getMonth()] + ' ' + d.getFullYear() };
  }
  function themeFor(ev) {
    if (ev.theme) return ev.theme;
    switch (ev.category) { case 'Certification': return 'theme-deep'; case 'Workshop': return 'theme-bronze'; case 'Community': return 'theme-green'; case 'Coaching': return 'theme-orange'; default: return ''; }
  }
  function statusFor(ev) {
    if (ev._past) return '<span class="event-status past">Completed</span>';
    if (ev._soldOut) return '<span class="event-status soldout">Sold out · waitlist open</span>';
    if (ev._live) return '<span class="event-status live">In progress</span>';
    if (ev.sample) return '<span class="event-status">Sample listing · details to confirm</span>';
    if (ev.isNew) return '<span class="event-status new">New</span>';
    return '<span class="event-status live">Registration open</span>';
  }
  function renderCard(ev, i) {
    var chip = chipFor(ev);
    var meta = '<li>' + ICONS.calendar + '<span>' + esc(ev.dateText) + '</span></li>';
    if (ev.timeText) meta += '<li>' + ICONS.clock + '<span>' + esc(ev.timeText) + '</span></li>';
    meta += '<li>' + ICONS.pin + '<span>' + esc(ev.venue || ev.location) + (ev.format ? ' · ' + esc(ev.format) : '') + '</span></li>';
    if (ev.facilitator) meta += '<li>' + ICONS.user + '<span>' + esc(ev.facilitator) + '</span></li>';
    if (ev.credits) meta += '<li>' + ICONS.award + '<span>' + esc(ev.credits) + '</span></li>';

    var price = ev.price
      ? '<div class="event-price">' + esc(ev.price) + (ev.priceNote ? '<small>' + esc(ev.priceNote) + '</small>' : '') + '</div>'
      : '<div class="event-price soft">' + esc(ev.priceText || 'Enquire for pricing') + '</div>';

    var action;
    if (ev._past) action = '<span class="btn btn-outline btn-sm disabled">Completed</span>';
    else if (ev._soldOut) action = '<a class="btn btn-navy btn-sm" href="' + esc(ev.waitlistLink || ev.link || '#') + '" target="_blank" rel="noopener">Join waitlist</a>';
    else action = '<a class="btn btn-primary btn-sm" href="' + esc(ev.link || '#') + '"' + (isExternal(ev.link) ? ' target="_blank" rel="noopener"' : '') + '>' + esc(ev.linkText || 'Register') + '</a>';

    var title = (ev.link && !ev._past)
      ? '<a href="' + esc(ev.link) + '"' + (isExternal(ev.link) ? ' target="_blank" rel="noopener"' : '') + '>' + esc(ev.title) + '</a>'
      : esc(ev.title);

    return '' +
      '<article class="event-card' + (ev._past ? ' is-past' : '') + '" style="--i:' + (i % 9) + '" data-category="' + esc(ev.category) + '" data-region="' + esc(ev.region) + '">' +
        '<div class="event-media ' + themeFor(ev) + '">' +
          '<div class="badges"><span class="badge">' + esc(ev.location) + '</span><span class="badge cat">' + esc(ev.category) + '</span></div>' +
          '<div class="date-chip"><b>' + esc(chip.top) + '</b><span>' + esc(chip.bottom) + '</span></div>' +
        '</div>' +
        '<div class="event-body">' +
          statusFor(ev) +
          '<h3>' + title + '</h3>' +
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

    $all('[data-events-preview]').forEach(function (grid) {
      var n = parseInt(grid.getAttribute('data-events-preview'), 10) || 3;
      var list = upcoming.filter(function (e) { return !e.sample; }).slice(0, n);
      if (list.length < n) list = upcoming.slice(0, n);
      grid.innerHTML = list.map(renderCard).join('') || '<div class="event-empty">New events are announced soon. <a href="contact.html">Contact us</a> to be notified.</div>';
    });

    var grid = $('#events-grid');
    if (grid) {
      var filters = $all('.filter-btn'); var current = 'all';
      function render() {
        var list;
        if (current === 'past') list = past;
        else list = upcoming.filter(function (e) {
          if (current === 'all') return true;
          if (current === 'certification') return e.category === 'Certification';
          if (current === 'community') return e.category === 'Community';
          if (current === 'workshop') return e.category === 'Workshop';
          return (e.region || '').toLowerCase() === current;
        });
        grid.innerHTML = list.length ? list.map(renderCard).join('')
          : '<div class="event-empty" style="grid-column:1/-1">No events in this category right now. <a href="contact.html">Contact us</a> to hear about the next one.</div>';
        var pastWrap = $('#past-events'); if (pastWrap) pastWrap.hidden = (current !== 'all') || !past.length;
      }
      filters.forEach(function (btn) {
        btn.addEventListener('click', function () {
          filters.forEach(function (b) { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
          btn.classList.add('active'); btn.setAttribute('aria-selected', 'true'); current = btn.getAttribute('data-filter'); render();
        });
      });
      var pastGrid = $('#past-grid'); if (pastGrid) pastGrid.innerHTML = past.map(renderCard).join('');
      var counts = $('#event-count'); if (counts) counts.textContent = upcoming.length + ' upcoming · ' + past.length + ' past';
      render();
    }

    // Countdown to the next event that has not started (real listings preferred over samples)
    var now = new Date();
    var notStarted = upcoming.filter(function (e) { return e._start > now; });
    var next = notStarted.filter(function (e) { return !e.sample; })[0] || notStarted[0];
    var cd = $('#countdown');
    if (cd && next) {
      $('#countdown-title').textContent = next.title;
      $('#countdown-sub').textContent = next.dateText + ' · ' + (next.venue || next.location);
      var link = $('#countdown-link');
      if (link) { link.href = next.link || 'events.html'; if (isExternal(next.link)) { link.target = '_blank'; link.rel = 'noopener'; } }
      var target = next._start, cells = { d: $('#cd-d'), h: $('#cd-h'), m: $('#cd-m'), s: $('#cd-s') };
      function set(el, v) { if (el.textContent !== v) { el.textContent = v; if (!REDUCED) { el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick'); } } }
      function tick() {
        var diff = Math.max(0, target - new Date());
        set(cells.d, String(Math.floor(diff / 86400000)));
        set(cells.h, ('0' + (Math.floor(diff / 3600000) % 24)).slice(-2));
        set(cells.m, ('0' + (Math.floor(diff / 60000) % 60)).slice(-2));
        set(cells.s, ('0' + (Math.floor(diff / 1000) % 60)).slice(-2));
      }
      tick(); setInterval(tick, 1000);
    } else if (cd) { var barEl = cd.closest('.countdown-bar'); if (barEl) barEl.hidden = true; }
  }

  /* ---------- Contact form ---------- */
  function initForm(form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var data = {};
      $all('input, select, textarea', form).forEach(function (f) { if (!f.name) return; data[f.name] = f.type === 'checkbox' ? (f.checked ? 'Yes' : 'No') : f.value.trim(); });
      var endpoint = form.getAttribute('data-endpoint'); var success = $('.form-success', form); var btn = $('button[type="submit"]', form);
      if (endpoint && isExternal(endpoint)) {
        btn.disabled = true; btn.textContent = 'Sending…';
        fetch(endpoint, { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
          .then(function (r) { if (!r.ok) throw new Error('Request failed'); form.reset(); success.classList.add('show'); })
          .catch(function () { alert('Sorry, the message could not be sent. Please email isabelle@bhdasia.com directly.'); })
          .then(function () { btn.disabled = false; btn.textContent = 'Send message'; });
        return;
      }
      var to = form.getAttribute('data-mailto') || 'isabelle@bhdasia.com';
      var subject = '[TRE Singapore website] ' + (data.interest || 'Enquiry') + ' — ' + (data.name || '');
      var lines = ['Name: ' + data.name, 'Email: ' + data.email, 'Phone / WhatsApp: ' + (data.phone || '-'), 'I am: ' + (data.who || '-'),
        'Interested in: ' + (data.interest || '-'), '', 'Message:', data.message || '-', '', 'Newsletter: ' + (data.newsletter || 'No')];
      window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
      success.classList.add('show');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initChrome(); initNav(); initYear(); initReveal(); initInteractions(); initEvents();
    var form = document.getElementById('contact-form'); if (form) initForm(form);
  });
})();
