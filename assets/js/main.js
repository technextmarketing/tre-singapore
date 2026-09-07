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
    if (ev._live) return '<span class="event-status progress">In progress · later modules open</span>';
    if (ev.sample) return '<span class="event-status">Sample listing · details to confirm</span>';
    if (ev.isNew) return '<span class="event-status new">New</span>';
    return '<span class="event-status live">Registration open</span>';
  }
  function detailUrl(ev) { return ev.slug ? ROOT + 'event.html?id=' + encodeURIComponent(ev.slug) : (ev.link || '#'); }
  var ROOT = (function () { var s = document.querySelector('script[src*="events-data.js"]'); var m = s && /^(.*?)assets\/js\/events-data\.js/.exec(s.getAttribute('src')); return m ? m[1] : ''; })();
  function extLink(url, cls, label) { return '<a class="' + cls + '" href="' + esc(url) + '"' + (isExternal(url) ? ' target="_blank" rel="noopener"' : '') + '>' + esc(label) + '</a>'; }
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

    var details = ev.slug ? extLink(detailUrl(ev), 'btn btn-outline btn-sm', 'Details') : '';
    var action;
    if (ev._past) action = details || '<span class="btn btn-outline btn-sm disabled">Completed</span>';
    else if (ev._soldOut) action = details + extLink(ev.waitlistLink || ev.link || '#', 'btn btn-navy btn-sm', 'Join waitlist');
    else action = details + extLink(ev.link || detailUrl(ev), 'btn btn-primary btn-sm', ev.linkText || 'Register');

    var title = '<a href="' + esc(detailUrl(ev)) + '">' + esc(ev.title) + '</a>';
    var media = ev.image
      ? '<div class="event-media has-img"><img src="' + esc(ROOT + ev.image) + '" alt="" loading="lazy" decoding="async" onerror="this.parentNode.classList.remove(\'has-img\');this.remove()"/>'
      : '<div class="event-media ' + themeFor(ev) + '">';

    return '' +
      '<article class="event-card' + (ev._past ? ' is-past' : '') + '" style="--i:' + (i % 9) + '" data-category="' + esc(ev.category) + '" data-region="' + esc(ev.region) + '">' +
        media +
          '<div class="badges"><span class="badge">' + esc(ev.location) + '</span><span class="badge cat">' + esc(ev.category) + '</span></div>' +
          '<div class="date-chip"><b>' + esc(chip.top) + '</b><span>' + esc(chip.bottom) + '</span></div>' +
        '</div>' +
        '<div class="event-body">' +
          statusFor(ev) +
          '<h3>' + title + '</h3>' +
          '<ul class="event-meta">' + meta + '</ul>' +
          '<p class="event-desc">' + esc(ev.description) + '</p>' +
          '<div class="event-foot">' + price + '<div class="actions">' + action + '</div></div>' +
        '</div>' +
      '</article>';
  }

  /* ---------- Event detail page (event.html?id=slug) ---------- */
  function initEventPage() {
    var root = $('#event-page'); if (!root || !window.TRE_EVENTS) return;
    var id = new URLSearchParams(location.search).get('id') || '';
    var events = normaliseEvents(window.TRE_EVENTS);
    var ev = events.filter(function (e) { return e.slug === id; })[0];
    if (!ev) {
      root.innerHTML = '<section class="section"><div class="container event-not-found"><span class="eyebrow">Events</span><h1>Event not found</h1><p class="muted">That event may have been renamed or removed. Browse the calendar for the latest dates.</p><div class="btn-row" style="justify-content:center"><a class="btn btn-primary" href="events.html">Browse all events</a></div></div></section>';
      document.title = 'Event not found — TRE™ in Singapore';
      return;
    }
    var d = ev.details || {};
    document.title = ev.title + ' — TRE™ in Singapore';
    var md = $('meta[name="description"]'); if (md) md.setAttribute('content', d.summary || ev.description || '');
    var ogT = $('meta[property="og:title"]'); if (ogT) ogT.setAttribute('content', ev.title);
    var ogD = $('meta[property="og:description"]'); if (ogD) ogD.setAttribute('content', d.summary || ev.description || '');
    var ogI = $('meta[property="og:image"]'); if (ogI && ev.image) ogI.setAttribute('content', new URL(ev.image, location.href).href);

    var list = function (arr) { return (arr || []).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join(''); };
    var status = ev._past ? '<span class="badge soldout">Completed</span>' : ev._soldOut ? '<span class="badge soldout">Sold out</span>' : ev._live ? '<span class="badge">In progress</span>' : '';
    var primary = (d.register || []).filter(function (r) { return r.primary; })[0] || (d.register || [])[0];
    var facts = '' +
      '<div class="fact">' + ICONS.calendar + '<div><b>Date</b><span>' + esc(ev.dateText) + '</span></div></div>' +
      '<div class="fact">' + ICONS.clock + '<div><b>Time</b><span>' + esc(ev.timeText || (ev.end ? 'Full days — see programme' : 'See programme')) + '</span></div></div>' +
      '<div class="fact">' + ICONS.pin + '<div><b>Where</b><span>' + esc(ev.venue || ev.location) + (ev.format ? ' · ' + esc(ev.format) : '') + '</span></div></div>' +
      '<div class="fact">' + ICONS.award + '<div><b>' + (ev.credits ? 'Credits' : 'Investment') + '</b><span>' + esc(ev.credits || ev.price || ev.priceText || 'Enquire') + '</span></div></div>';

    var h = '';
    h += '<section class="evt-hero">' + (ev.image ? '<div class="bg" style="background-image:url(\'' + esc(ev.image) + '\')"></div>' : '') +
      '<div class="container' + (ev.image ? ' with-poster' : '') + '"><div class="hero-copy"><p class="crumbs"><a href="events.html">Events</a> › ' + esc(ev.category) + '</p>' +
      '<div class="badges"><span class="badge">' + esc(ev.location) + '</span><span class="badge cat">' + esc(ev.category) + '</span>' + (ev.credits ? '<span class="badge">' + esc(ev.credits) + '</span>' : '') + status + '</div>' +
      '<h1>' + esc(ev.title) + '</h1><p class="lead">' + esc(d.summary || ev.description) + '</p>' +
      '<div class="btn-row">' + (ev._past ? '<a class="btn btn-ghost-light" href="events.html">See upcoming events</a>' : (primary ? extLink(primary.url, 'btn btn-primary', primary.label) : '') + (d.online ? '<a class="btn btn-ghost-light" href="#prepare">Prepare for the online session</a>' : '<a class="btn btn-ghost-light" href="#programme">See the programme</a>')) + '</div></div>' +
      (ev.image ? '<figure class="poster"><img src="' + esc(ev.image) + '" alt="' + esc(ev.title) + ' — event poster" decoding="async"/></figure>' : '') +
      '</div></section>';
    h += '<div class="container evt-facts"><div class="grid">' + facts + '</div></div>';

    h += '<section class="section"><div class="container evt-layout"><div class="evt-main">';
    if (d.about && d.about.length) { h += '<h2>About this event</h2>' + d.about.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join(''); }
    if (d.forWho && d.forWho.length) { h += '<h2>Who it is for</h2><ul class="list-check">' + list(d.forWho) + '</ul>'; }
    if (d.schedule && d.schedule.length) {
      h += '<h2 id="programme">Programme</h2><div class="evt-sched">' + d.schedule.map(function (s) {
        return '<div class="evt-day"><div class="when"><b>' + esc(s.when) + '</b><span>' + esc(s.time || '') + '</span></div><div><h4>' + esc(s.title) + '</h4><p>' + esc(s.text) + '</p></div></div>';
      }).join('') + '</div>';
    }
    if (d.includes && d.includes.length) { h += '<h2>What is included</h2><ul class="list-check">' + list(d.includes) + '</ul>'; }
    if (d.facilitators && d.facilitators.length) {
      h += '<h2>Your facilitator' + (d.facilitators.length > 1 ? 's' : '') + '</h2><div class="evt-people">' + d.facilitators.map(function (f) {
        return '<div class="person"><span class="role">' + esc(f.role) + '</span><h4>' + esc(f.name) + '</h4><p>' + esc(f.bio) + '</p>' + (f.link ? extLink(f.link, 'link-arrow', f.linkText || 'Learn more') : '') + '</div>';
      }).join('') + '</div>' + (d.partners ? '<p class="note" style="margin-top:1rem">' + esc(d.partners) + '</p>' : '');
    }
    if (d.online) {
      h += '<div class="prep-box" id="prepare"><span class="eyebrow" style="color:var(--gold)">Joining online? Prepare your space first</span><h2>Preparing for your online TRE™ session</h2>' +
        '<p>Everything your facilitator can offer you comes through the camera — so we must be able to see you <strong>head to toe, both standing and on the mat</strong>. Please test your camera before the session starts.</p>' +
        '<ul class="list-check"><li><strong>Space & camera:</strong> a room where the device can sit about 2–2.5 m away, landscape, roughly hip height — to the side of your mat, not at your head or feet.</li>' +
        '<li><strong>Kit:</strong> a yoga mat, a device with a camera (the bigger the screen the better), wireless headphones (required in group classes), reliable internet, and pillows, cushions or blankets.</li>' +
        '<li><strong>Lighting & clothing:</strong> light the room well and face the light; wear loose, stretchy, light-coloured trousers — dark clothing hides your tremors.</li>' +
        '<li><strong>Someone you trust nearby:</strong> in the same home or next door for the duration, with their name and phone number on your consent form.</li>' +
        '<li><strong>Zoom:</strong> install the Zoom app, sign in with the email you registered with, test camera and microphone, and join through the app (not the browser) a few minutes early.</li></ul>' +
        '<div class="btn-row"><a class="btn btn-primary" href="' + esc(window.TRE_PREP_GUIDE || '#') + '" target="_blank" rel="noopener">Read the full preparation guide</a><a class="btn btn-ghost-light" href="' + esc(window.TRE_PREP_PDF || '#') + '" target="_blank" rel="noopener">Download the PDF guide</a></div></div>';
    }
    h += '</div>';

    /* sidebar */
    h += '<aside class="evt-side">';
    h += '<div class="evt-box"><h3>' + (ev._past ? 'This event has ended' : ev._soldOut ? 'Sold out — waitlist' : 'Register') + '</h3>';
    if (d.pricing && d.pricing.length) {
      h += '<div class="evt-price-tiers">' + d.pricing.map(function (t) {
        return '<div class="tier' + (t.hl ? ' hl' : '') + (t.soldOut ? ' soldout' : '') + '"><div class="tl">' + esc(t.label) + (t.sub ? '<small>' + esc(t.sub) + '</small>' : '') + '</div><div class="tp">' + esc(t.price) + (t.note ? '<small>' + esc(t.note) + '</small>' : '') + '</div></div>';
      }).join('') + '</div>';
    } else if (ev.price) {
      h += '<div class="evt-price-tiers"><div class="tier hl"><div class="tl">' + esc(ev.title) + '</div><div class="tp">' + esc(ev.price) + (ev.priceNote ? '<small>' + esc(ev.priceNote) + '</small>' : '') + '</div></div></div>';
    } else if (ev.priceText) { h += '<p class="muted" style="margin:0">' + esc(ev.priceText) + '</p>'; }
    if (!ev._past) {
      (d.register || []).forEach(function (r, i) { h += extLink(r.url, 'btn ' + (r.primary || i === 0 ? 'btn-primary' : 'btn-outline'), r.label); });
    } else { h += '<a class="btn btn-primary" href="events.html">Browse upcoming events</a>'; }
    if (d.pricingNote) h += '<p class="fine">' + esc(d.pricingNote) + '</p>';
    h += '</div>';
    h += '<div class="evt-box"><h3>Questions?</h3><p class="muted" style="margin:0 0 .4rem">Ask before the event rather than on the day — we are glad to help.</p><p style="margin:0"><a href="mailto:isabelle@bhdasia.com">isabelle@bhdasia.com</a><br><a href="https://wa.me/818065151778" target="_blank" rel="noopener">WhatsApp +81 80 6515 1778</a></p>' + (d.source ? '<p class="fine">Details as published on <a href="' + esc(d.source) + '" target="_blank" rel="noopener">hummingbeing.com</a>.</p>' : '') + '</div>';
    h += '</aside></div></section>';

    /* related */
    var others = events.filter(function (e) { return !e._past && e.slug !== ev.slug; }).sort(function (a, b) { return a._start - b._start; }).slice(0, 3);
    if (others.length) h += '<section class="section bg-cream evt-related"><div class="container"><div class="section-head row"><div><span class="eyebrow">More dates</span><h2>Other upcoming events</h2></div><a class="link-arrow" href="events.html">All events</a></div><div class="event-grid">' + others.map(renderCard).join('') + '</div></div></section>';
    root.innerHTML = h;
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

  /* ---------- Featured facilitators: 3 per day, rotating through the whole pool ---------- */
  var FAC_ICONS = {
    pin: ICONS.pin,
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
    award: ICONS.award,
    group: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="7" r="3.5"/><path d="M2 21a7 7 0 0 1 14 0"/></svg>',
    calendar: ICONS.calendar
  };
  function seededShuffle(arr, seed) {
    var a = arr.slice(), t = (seed >>> 0) || 1;
    function rnd() { t += 0x6D2B79F5; var x = Math.imul(t ^ (t >>> 15), 1 | t); x ^= x + Math.imul(x ^ (x >>> 7), 61 | x); return ((x ^ (x >>> 14)) >>> 0) / 4294967296; }
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var tmp = a[i]; a[i] = a[j]; a[j] = tmp; }
    return a;
  }
  /* Which three are featured on a given date (Singapore time)? Deterministic, so every visitor sees the same batch. */
  function featuredFor(date, K) {
    var pool = window.TRE_FACILITATORS || []; var N = pool.length; K = Math.min(K || 3, N); if (!N) return { list: [], day: 0, cycleDay: 0, perCycle: 0 };
    var sg = new Date(date.getTime() + (date.getTimezoneOffset() + 480) * 60000);            // shift to UTC+8
    var dayIndex = Math.floor(Date.UTC(sg.getFullYear(), sg.getMonth(), sg.getDate()) / 86400000);
    var perCycle = Math.ceil(N / K), cycle = Math.floor(dayIndex / perCycle), step = dayIndex % perCycle;
    /* shuffle real profiles and sample placeholders separately, then interleave them so every daily batch
       contains at least one real facilitator (placeholders never fill a whole batch) */
    var idx = pool.map(function (_, i) { return i; });
    var real = seededShuffle(idx.filter(function (i) { return !pool[i].sample; }), cycle * 7919 + 17);
    var samp = seededShuffle(idx.filter(function (i) { return pool[i].sample; }), cycle * 104729 + 31);
    var order = []; while (real.length || samp.length) { if (real.length) order.push(real.shift()); if (samp.length) order.push(samp.shift()); }
    var list = []; for (var j = 0; j < K; j++) list.push(pool[order[(step * K + j) % N]]);
    return { list: list, day: dayIndex, cycleDay: step + 1, perCycle: perCycle };
  }
  window.TRE_featuredFor = function (iso) { return featuredFor(iso ? new Date(iso) : new Date()).list.map(function (f) { return f.name; }); };
  var CTA_ICONS = {
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    website: FAC_ICONS.globe,
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 12 12 0 0 0 4.6 4c1.7.7 2.1.6 2.8.5.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.4-.3z"/></svg>',
    book: ICONS.calendar
  };
  function ctaLink(url, cls, icon, label) { return '<a class="' + cls + '" href="' + esc(url) + '"' + (isExternal(url) ? ' target="_blank" rel="noopener"' : '') + '>' + CTA_ICONS[icon] + esc(label) + '</a>'; }
  function renderFacilitator(f, i) {
    var meta = (f.meta || []).map(function (m) { return '<li>' + (FAC_ICONS[m.icon] || FAC_ICONS.pin) + '<span>' + esc(m.text) + '</span></li>'; }).join('');
    var c = f.contact, acts = '';
    if (c) {
      if (c.email) acts += ctaLink(c.email, 'btn btn-outline btn-sm', 'email', 'Email');
      if (c.whatsapp) acts += ctaLink(c.whatsapp, 'btn btn-outline btn-sm', 'whatsapp', 'WhatsApp');
      if (c.book) acts += ctaLink(c.book, 'btn btn-primary btn-sm', 'book', 'Book now');
    } else acts = (f.actions || []).map(function (a, k) { return extLink(a.url, 'btn ' + (k === 0 ? 'btn-primary' : 'btn-outline') + ' btn-sm', a.label); }).join('');
    var profile = ROOT + 'facilitator.html?id=' + encodeURIComponent(f.id);
    return '<article class="fac-card reveal in" style="--i:' + i + '">' +
      (f.sample ? '<span class="fac-sample">Sample profile</span>' : '') +
      '<a class="fac-photo ' + esc(f.photoClass || '') + '" href="' + esc(profile) + '" aria-label="View profile: ' + esc(f.name) + '">' + (f.photo ? '<img src="' + esc(ROOT + f.photo) + '" alt="' + esc(f.name) + '" loading="lazy"/>' : '<span class="initials">' + esc(f.initials || f.name.charAt(0)) + '</span>') + '<span class="feat-badge">Featured today</span></a>' +
      '<div class="fac-body">' + (f.tag ? '<div class="tags"><span class="badge ' + esc(f.tagClass || 'badge-navy') + '">' + esc(f.tag) + '</span></div>' : '') +
      '<h3><a href="' + esc(profile) + '">' + esc(f.name) + '</a></h3><div class="fac-role">' + esc(f.role) + '</div>' +
      '<a class="link-arrow" href="' + esc(profile) + '">View profile</a><p>' + esc(f.bio) + '</p>' +
      (meta ? '<ul class="fac-meta">' + meta + '</ul>' : '') +
      (acts ? '<div class="fac-actions">' + acts + '</div>' : '') + '</div></article>';
  }

  /* ---------- Facilitator profile page (facilitator.html?id=slug) ---------- */
  var SOCIAL_ICONS = {
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 8.5H3.5V21h3V8.5zM5 3.5a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5zM21 13.6c0-3.4-1.8-5.3-4.5-5.3-2 0-3 1.1-3.5 1.9V8.5h-3V21h3v-6.6c0-1.7.6-2.9 2.2-2.9 1.5 0 1.9 1.2 1.9 2.9V21H21v-7.4z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2c-.3-1.2-1.1-2-2.3-2.3C18.9 4.5 12 4.5 12 4.5s-6.9 0-8.7.4C2.1 5.2 1.3 6 1 7.2.6 9 .6 12 .6 12s0 3 .4 4.8c.3 1.2 1.1 2 2.3 2.3 1.8.4 8.7.4 8.7.4s6.9 0 8.7-.4c1.2-.3 2-1.1 2.3-2.3.4-1.8.4-4.8.4-4.8s0-3-.4-4.8zM9.8 15.5v-7l6 3.5-6 3.5z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z"/></svg>',
    website: FAC_ICONS.globe
  };
  function initFacilitatorPage() {
    var root = $('#facilitator-page'); if (!root || !window.TRE_FACILITATORS) return;
    var id = new URLSearchParams(location.search).get('id') || '';
    var f = window.TRE_FACILITATORS.filter(function (x) { return x.id === id; })[0];
    if (!f) {
      root.innerHTML = '<section class="section"><div class="container event-not-found"><span class="eyebrow">Facilitators</span><h1>Profile not found</h1><p class="muted">That profile may have been renamed or removed.</p><div class="btn-row" style="justify-content:center"><a class="btn btn-primary" href="facilitators.html">Browse all facilitators</a></div></div></section>';
      document.title = 'Profile not found — TRE™ in Singapore'; return;
    }
    document.title = f.name + ' — TRE™ facilitator in Singapore';
    var md = $('meta[name="description"]'); if (md) md.setAttribute('content', f.summary || f.bio || '');
    var ogT = $('meta[property="og:title"]'); if (ogT) ogT.setAttribute('content', f.name + ' — ' + f.role);
    var ogD = $('meta[property="og:description"]'); if (ogD) ogD.setAttribute('content', f.summary || f.bio || '');
    var ogI = $('meta[property="og:image"]'); if (ogI && f.photo) ogI.setAttribute('content', new URL(f.photo, location.href).href);

    var c = f.contact || {};
    var ctas = (c.book ? ctaLink(c.book, 'btn btn-primary', 'book', 'Book now') : '') + (c.email ? ctaLink(c.email, 'btn btn-ghost-light', 'email', 'Email') : '') + (c.whatsapp ? ctaLink(c.whatsapp, 'btn btn-ghost-light', 'whatsapp', 'WhatsApp') : '');
    var socials = (f.website ? '<a href="' + esc(f.website.url) + '"' + (isExternal(f.website.url) ? ' target="_blank" rel="noopener"' : '') + '>' + SOCIAL_ICONS.website + esc(f.website.label || 'Website') + '</a>' : '') +
      (f.socials || []).map(function (s) { return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + (SOCIAL_ICONS[s.type] || SOCIAL_ICONS.website) + esc(s.label || s.type) + '</a>'; }).join('');
    var fx = f.facts || {};
    var facts = '<div class="fact">' + ICONS.pin + '<div><b>Where</b><span>' + esc(fx.location || '—') + '</span></div></div>' +
      '<div class="fact">' + FAC_ICONS.globe + '<div><b>Languages</b><span>' + esc(fx.languages || '—') + '</span></div></div>' +
      '<div class="fact">' + FAC_ICONS.group + '<div><b>Formats</b><span>' + esc(fx.formats || '—') + '</span></div></div>' +
      '<div class="fact">' + ICONS.award + '<div><b>Certification</b><span>' + esc(fx.certified || '—') + '</span></div></div>';

    var h = '<section class="fp-hero"><div class="container"><div>' +
      '<p class="crumbs"><a href="facilitators.html">Facilitators</a> › ' + esc(f.tag || 'Profile') + '</p>' +
      '<div class="badges"><span class="badge gold">' + esc(f.tag || 'Facilitator') + '</span>' + (f.sample ? '<span class="badge">Sample profile</span>' : '') + '</div>' +
      '<h1>' + esc(f.name) + '</h1><p class="role">' + esc(f.role) + '</p><p class="lead">' + esc(f.summary || f.bio) + '</p>' +
      '<div class="btn-row">' + ctas + '</div>' + (socials ? '<div class="fp-socials">' + socials + '</div>' : '') + '</div>' +
      '<div class="fp-photo ' + esc(f.photoClass || '') + '">' + (f.sample ? '<span class="fac-sample">Sample profile</span>' : '') + (f.photo ? '<img src="' + esc(f.photo) + '" alt="' + esc(f.name) + '"/>' : '<span class="initials">' + esc(f.initials || f.name.charAt(0)) + '</span>') + '</div>' +
      '</div></section>';
    h += '<div class="container evt-facts fp-facts"><div class="grid">' + facts + '</div></div>';
    h += '<section class="section"><div class="container fp-layout"><div class="fp-main">';
    if (f.about && f.about.length) h += '<h2>About ' + esc(f.name.split(' ')[0]) + '</h2>' + f.about.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
    if (f.highlights && f.highlights.length) h += '<h2>Credentials & training</h2><ul class="list-check">' + f.highlights.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
    if (f.offers && f.offers.length) h += '<h2>What you can book</h2><div class="fp-offers">' + f.offers.map(function (o) { return '<div class="fp-offer"><h4>' + esc(o.title) + '</h4><p>' + esc(o.text) + '</p></div>'; }).join('') + '</div>';
    if (f.gallery && f.gallery.length) {
      h += '<h2 id="gallery">Gallery</h2><div class="fp-gallery">' + f.gallery.map(function (g, k) { return '<a href="' + esc(g.src) + '" data-gal="' + k + '"><img src="' + esc(g.src) + '" alt="' + esc(g.caption || f.name) + '" loading="lazy" decoding="async" onerror="this.closest(\'a\').remove()"/>' + (g.caption ? '<figcaption>' + esc(g.caption) + '</figcaption>' : '') + '</a>'; }).join('') + '</div>';
    } else if (f.sample) {
      h += '<h2 id="gallery">Gallery</h2><p class="muted">Photos are added when the provider is listed.</p>';
    }
    /* related events: explicit slugs + any event naming this facilitator */
    if (window.TRE_EVENTS) {
      var evs = normaliseEvents(window.TRE_EVENTS).filter(function (e) { return !e._past && ((f.events || []).indexOf(e.slug) >= 0 || (e.facilitator || '').indexOf(f.name) >= 0); }).sort(function (a, b) { return a._start - b._start; }).slice(0, 3);
      if (evs.length) h += '<h2>Upcoming with ' + esc(f.name.split(' ')[0]) + '</h2><div class="event-grid">' + evs.map(renderCard).join('') + '</div>';
    }
    h += '</div><aside class="fp-side">';
    h += '<div class="evt-box"><h3>Get in touch</h3><div class="btn-row" style="margin:0;display:grid;gap:.5rem">' + (c.book ? ctaLink(c.book, 'btn btn-primary', 'book', 'Book now') : '') + (c.email ? ctaLink(c.email, 'btn btn-outline', 'email', 'Email') : '') + (c.whatsapp ? ctaLink(c.whatsapp, 'btn btn-outline', 'whatsapp', 'WhatsApp') : '') + '</div>' +
      (f.sample ? '<p class="fine">Sample profile — enquiries go to TRE™ in Singapore, who will connect you with a certified provider.</p>' : '<p class="fine">Questions before booking? Ask before the session rather than on the day — we are glad to help.</p>') + '</div>';
    if (f.website || (f.socials && f.socials.length)) {
      h += '<div class="evt-box"><h3>Website & socials</h3><ul class="fp-links">' + (f.website ? '<li><a href="' + esc(f.website.url) + '"' + (isExternal(f.website.url) ? ' target="_blank" rel="noopener"' : '') + '>' + SOCIAL_ICONS.website + '<span>' + esc(f.website.label || 'Website') + '<small>Website</small></span></a></li>' : '') +
        (f.socials || []).map(function (s) { return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + (SOCIAL_ICONS[s.type] || SOCIAL_ICONS.website) + '<span>' + esc(s.label || s.type) + '<small>' + esc(s.type.charAt(0).toUpperCase() + s.type.slice(1)) + '</small></span></a></li>'; }).join('') + '</ul></div>';
    }
    h += '<div class="evt-box"><h3>More facilitators</h3><ul class="fp-links">' + window.TRE_FACILITATORS.filter(function (x) { return x.id !== f.id && !x.sample; }).map(function (x) { return '<li><a href="facilitator.html?id=' + encodeURIComponent(x.id) + '">' + FAC_ICONS.group + '<span>' + esc(x.name) + '<small>' + esc(x.tag || '') + '</small></span></a></li>'; }).join('') + '<li><a href="facilitators.html#directory">' + ICONS.pin + '<span>Provider directory<small>All certified providers in Singapore</small></span></a></li></ul></div>';
    h += '</aside></div></section>';
    root.innerHTML = h;

    /* lightbox */
    root.addEventListener('click', function (e) {
      var a = e.target.closest('.fp-gallery a'); if (!a) return;
      e.preventDefault();
      var img = a.querySelector('img'), cap = a.querySelector('figcaption');
      var lb = document.createElement('figure'); lb.className = 'fp-lightbox';
      lb.innerHTML = '<button class="close" type="button" aria-label="Close">&times;</button><img src="' + esc(a.getAttribute('href')) + '" alt="' + esc(img ? img.alt : '') + '"/>' + (cap ? '<figcaption>' + esc(cap.textContent) + '</figcaption>' : '');
      document.body.appendChild(lb);
      function close() { lb.remove(); document.removeEventListener('keydown', onKey); }
      function onKey(ev) { if (ev.key === 'Escape') close(); }
      lb.addEventListener('click', close); document.addEventListener('keydown', onKey);
    });
  }
  function initFeatured() {
    var grids = $all('[data-featured-facilitators]'); if (!grids.length || !window.TRE_FACILITATORS) return;
    var pick = featuredFor(new Date(), 3);
    grids.forEach(function (grid) {
      grid.innerHTML = pick.list.map(renderFacilitator).join('');
      var note = $('[data-featured-note]'); if (note) {
        var sg = new Date(Date.now() + (new Date().getTimezoneOffset() + 480) * 60000);
        note.textContent = 'Featured on ' + sg.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }) + ' (Singapore time) · a new set of three every day · day ' + pick.cycleDay + ' of ' + pick.perCycle + ' in this rotation.';
      }
    });
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
    initChrome(); initNav(); initYear(); initReveal(); initInteractions(); initEvents(); initEventPage(); initFeatured(); initFacilitatorPage();
    var form = document.getElementById('contact-form'); if (form) initForm(form);
  });
})();
