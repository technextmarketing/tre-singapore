/* TRE™ in Singapore — event + facilitator detail pages (2026-09-29)
   main.js (initEventPage / initFacilitatorPage) renders the dt-* markup; this file adds the behaviour:
     - the facts band's gold edge and the "Who it is for" checks draw in once
     - programme rail draws with scroll (TRELayer.draw, data-draw="scroll"); the credentials rail draws once;
       each node fills as the line reaches it
     - price tiers become a radio comparison (the highlighted tier is preselected, sold-out tiers are disabled)
     - online preparation: tick each step (remembered on this device)
     - desktop: the register / contact box stays in view (sticky, clamped to the viewport height)
     - phones: the register box moves up into the reading flow, and a floating register action appears
       while neither the hero button, the register box nor the page end is on screen
     - the close panel's three gold lines are drawn to the panel's own size (once, as it enters)
   Under prefers-reduced-motion everything is drawn, still and complete.
*/
(function () {
  'use strict';

  var L = null, REDUCED = false, NS = 'http://www.w3.org/2000/svg';
  function $(s, c) { return (c || document).querySelector(s); }
  function $all(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function seen(el, cb, opts) {
    if (L && L.onVisible) return L.onVisible(el, cb, opts);
    cb(null, true);
  }
  function media(q) { return window.matchMedia ? window.matchMedia(q) : { matches: false }; }
  function onMedia(m, fn) { if (m.addEventListener) m.addEventListener('change', fn); else if (m.addListener) m.addListener(fn); }

  /* ---------- one-shot entrances: the facts band edge, the "Who it is for" checks ---------- */
  function entrances(root) {
    if (REDUCED) return;
    $all('.dt-facts, .dt-checks', root).forEach(function (el) {
      el.classList.add('dt-anim'); void el.offsetWidth;
      seen(el, function (en, isIn) { if (isIn) el.classList.add('is-in'); }, { once: true, threshold: 0.25 });
    });
  }

  /* ---------- rails: an SVG line from the first node to the last; nodes fill as the line reaches them ---------- */
  function rails(root) {
    $all('[data-dt-rail]', root).forEach(function (list) {
      var steps = $all('.dt-step', list), nodes = steps.map(function (s) { return $('.dt-node', s); });
      if (steps.length < 2 || nodes.some(function (n) { return !n; })) { steps.forEach(function (s) { s.classList.add('on'); }); return; }
      var scroll = list.getAttribute('data-dt-rail') === 'scroll';
      var svg = document.createElementNS(NS, 'svg'), base = document.createElementNS(NS, 'path'), line = document.createElementNS(NS, 'path');
      svg.setAttribute('class', 'dt-rail'); svg.setAttribute('aria-hidden', 'true'); svg.setAttribute('focusable', 'false');
      base.setAttribute('class', 'base'); line.setAttribute('class', 'line');
      line.setAttribute('data-draw', scroll ? 'scroll' : ''); if (!scroll) line.setAttribute('data-draw-dur', '1700');
      svg.appendChild(base); svg.appendChild(line); list.insertBefore(svg, list.firstChild);
      var H = 1, offs = [];
      function layout() {
        var r = list.getBoundingClientRect();
        var c = nodes.map(function (n) { var b = n.getBoundingClientRect(); return { x: b.left + b.width / 2 - r.left, y: b.top + b.height / 2 - r.top }; });
        H = Math.max(1, Math.round(c[c.length - 1].y - c[0].y));
        offs = c.map(function (p) { return p.y - c[0].y; });
        svg.style.left = (c[0].x - 6).toFixed(1) + 'px'; svg.style.top = c[0].y.toFixed(1) + 'px';
        svg.setAttribute('width', '12'); svg.setAttribute('height', String(H)); svg.setAttribute('viewBox', '0 0 12 ' + H);
        var d = 'M6 0V' + H; base.setAttribute('d', d); line.setAttribute('d', d);
        line.style.setProperty('--len', H);
      }
      layout();
      if (L && L.draw) L.draw(list); else line.style.setProperty('--p', 1);
      if ('ResizeObserver' in window) new ResizeObserver(layout).observe(list);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
      if (REDUCED) { steps.forEach(function (s) { s.classList.add('on'); }); return; }
      var raf = 0, live = false;
      function tick() {
        var p = parseFloat(line.style.getPropertyValue('--p')); if (isNaN(p)) p = 1;
        var tip = p * H;
        steps.forEach(function (s, i) { s.classList.toggle('on', p > 0.001 && offs[i] <= tip + 2); });
        raf = live ? requestAnimationFrame(tick) : 0;
      }
      seen(list, function (en, isIn) { live = isIn; if (isIn && !raf) raf = requestAnimationFrame(tick); }, { threshold: 0 });
    });
  }

  /* ---------- price tiers: native radios in a labelled group ---------- */
  var groups = 0;
  function tiers(root) {
    $all('.dt-tiers', root).forEach(function (box) {
      box.classList.add('is-live');
      var all = $all('.dt-tier', box), open = all.filter(function (t) { return !t.classList.contains('is-out'); });
      var hl = open.filter(function (t) { return t.classList.contains('is-hl'); })[0] || null;
      function mark(t) { all.forEach(function (x) { x.classList.toggle('is-sel', x === t); }); }
      if (open.length < 2) { if (hl) mark(hl); return; }
      var gid = 'dt-tier-' + (++groups), head = $('h3', box.parentNode);
      box.classList.add('is-choice'); box.setAttribute('role', 'radiogroup');
      if (head) { if (!head.id) head.id = gid + '-h'; box.setAttribute('aria-labelledby', head.id); }
      all.forEach(function (t, i) {
        var dot = $('.dt-dot', t), tl = $('.dt-tl', t), pb = $('.dt-tp b', t);
        if (tl && !tl.id) tl.id = gid + '-' + i + '-l';
        if (pb && !pb.id) pb.id = gid + '-' + i + '-p';
        var r = document.createElement('input'); r.type = 'radio'; r.name = gid; r.className = 'dt-dot'; r.value = String(i);
        r.setAttribute('aria-labelledby', [tl && tl.id, pb && pb.id].filter(Boolean).join(' '));
        if (t.classList.contains('is-out')) r.disabled = true;
        if (t === hl) r.checked = true;
        if (dot) t.replaceChild(r, dot); else t.insertBefore(r, t.firstChild);
        r.addEventListener('change', function () { if (r.checked) mark(t); });
        t.addEventListener('click', function (e) {
          if (r.disabled || e.target === r || e.target.closest('a, .tre-term')) return;
          r.checked = true; mark(t); r.focus({ preventScroll: true });
        });
      });
      mark(hl);
    });
  }

  /* ---------- online preparation: tick each step, remembered on this device ---------- */
  function prep(root) {
    var list = $('.dt-prep-list', root); if (!list) return;
    var items = $all('li', list), KEY = 'tre-prep-ready', mask = 0;
    try { mask = parseInt(localStorage.getItem(KEY) || '0', 10) || 0; } catch (e) { mask = 0; }
    var bar = document.createElement('div'); bar.className = 'dt-prep-bar'; bar.setAttribute('aria-hidden', 'true');
    bar.appendChild(document.createElement('i')); list.parentNode.insertBefore(bar, list);
    list.classList.add('is-live');
    function paint() {
      var n = 0;
      items.forEach(function (li, i) {
        var on = !!(mask & (1 << i)); if (on) n++;
        li.classList.toggle('is-done', on);
        var b = $('.dt-tickbox', li); if (b) b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      bar.style.setProperty('--done', (n / items.length).toFixed(3));
    }
    items.forEach(function (li, i) {
      var label = $('strong', li); if (label && !label.id) label.id = 'dt-prep-' + i;
      var b = document.createElement('button'); b.type = 'button'; b.className = 'dt-tickbox'; b.setAttribute('aria-pressed', 'false');
      if (label) b.setAttribute('aria-labelledby', label.id);
      b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path pathLength="1" d="m6.6 12.6 3.5 3.5 7.3-7.9"/></svg>';
      li.insertBefore(b, li.firstChild);
      b.addEventListener('click', function () { mask ^= (1 << i); try { localStorage.setItem(KEY, String(mask)); } catch (e) { /* private mode */ } paint(); });
      li.addEventListener('click', function (e) {
        if (b.contains(e.target) || e.target.closest('a, .tre-term')) return;
        if (window.getSelection && String(window.getSelection())) return;   // selecting text, not ticking
        b.click();
      });
    });
    paint();
  }

  /* ---------- sidebar: sticky box clamped to the viewport; on phones the register box joins the reading flow ---------- */
  function side(root) {
    var stick = $('.dt-stick-in', root); if (!stick) return;
    function fit() { stick.style.setProperty('--dt-top', Math.round(Math.min(96, window.innerHeight - stick.offsetHeight - 24)) + 'px'); }
    var reg = $('#dt-register', root), slot = $('[data-dt-slot]', root), m = media('(max-width: 900px)');
    if (reg && slot) {
      var place = function () { var target = m.matches ? slot : stick; if (reg.parentNode !== target) target.insertBefore(reg, target.firstChild); fit(); };
      place(); onMedia(m, place);
    }
    fit(); window.addEventListener('resize', fit, { passive: true });
    if ('ResizeObserver' in window) new ResizeObserver(fit).observe(stick);
  }

  /* ---------- phones: floating register action ---------- */
  function dock(root) {
    var dk = $('.dt-dock', root); if (!dk) return;
    var m = media('(max-width: 900px)');
    var watch = [$('.hx .btn-row', root), $('#dt-register', root), $('.dt-related, .dt-end', root), $('.site-footer')].filter(Boolean);
    var state = watch.map(function (el) { var r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < window.innerHeight; });
    function update() {
      var show = m.matches && !state.some(Boolean);
      dk.classList.toggle('is-on', show); dk.setAttribute('aria-hidden', show ? 'false' : 'true');
      if ('inert' in dk) dk.inert = !show;
    }
    dk.hidden = false; update();
    watch.forEach(function (el, i) { seen(el, function (en, isIn) { state[i] = isIn; update(); }, { threshold: 0 }); });
    onMedia(m, update);
  }

  /* ---------- the close: three gold lines sized to the panel, drawn once as it enters ---------- */
  function closeLines(root) {
    $all('.dt-close-lines', root).forEach(function (svg) {
      var panel = svg.parentNode, paths = [0, 1, 2].map(function (i) {
        var p = document.createElementNS(NS, 'path'); p.setAttribute('data-draw', ''); p.setAttribute('data-draw-dur', String(1800 + i * 300)); svg.appendChild(p); return p;
      });
      function shape() {
        var W = Math.max(1, Math.round(panel.clientWidth)), H = Math.max(1, Math.round(panel.clientHeight)), a = Math.min(16, H * 0.07);
        svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
        paths.forEach(function (p, i) {
          var y = H * (0.6 + i * 0.12), s = i % 2 ? -1 : 1, r = function (v) { return v.toFixed(1); };
          p.setAttribute('d', 'M0 ' + r(y) + 'C' + r(W * 0.17) + ' ' + r(y - a * s) + ' ' + r(W * 0.33) + ' ' + r(y + a * s) + ' ' + r(W * 0.5) + ' ' + r(y) +
            'S' + r(W * 0.84) + ' ' + r(y - a * 0.8 * s) + ' ' + W + ' ' + r(y + a * 0.3 * s));
          if (p.__drawn) p.style.setProperty('--len', Math.ceil(p.getTotalLength()));
        });
      }
      shape();
      if (L && L.draw) L.draw(svg);
      if ('ResizeObserver' in window) new ResizeObserver(shape).observe(panel);
    });
  }

  /* ---------- services ticker: a slow, even pace whatever its length ---------- */
  function ticker(root) {
    var track = $('.dt-ticker .marquee-track', root); if (!track || REDUCED) return;
    var copy = track.firstElementChild; if (!copy) return;
    function pace() { var w = copy.getBoundingClientRect().width; if (w > 0) track.style.setProperty('--dt-dur', Math.max(24, w / 34).toFixed(1) + 's'); }
    pace(); if (document.fonts && document.fonts.ready) document.fonts.ready.then(pace);
  }

  function init() {
    var root = $('#event-page') || $('#facilitator-page'); if (!root || !$('.dt-body', root)) return;
    L = window.TRELayer || null;
    REDUCED = L ? !!L.reduced : !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    entrances(root); tiers(root); prep(root); side(root); rails(root); closeLines(root); ticker(root); dock(root);
    if (L && L.draw) L.draw(root);
  }
  function go() { setTimeout(init, 0); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();
