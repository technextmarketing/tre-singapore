/* TRE™ in Singapore — interactive layer (2026-09-29)
   Loaded after main.js on every page. Public API: window.TRELayer
     .reduced / .fine           motion + pointer capability flags
     .onVisible(el, cb, opts)   run cb(entry, isIn) as el enters / leaves the viewport
     .tremor(canvas, opts)      tremor-line field: breathes, trembles under the pointer, settles
     .draw(root)                wire every [data-draw] path under root (one-shot or data-draw="scroll")
     .parallax(root)            wire every [data-parallax] under root (sets --par in px)
     .lightbox(items, index)    items = [{src, caption}]
     .strip(el)                 drag-to-scroll for an .lx-strip (mouse)
   Everything degrades to a still, complete page under prefers-reduced-motion.
*/
(function () {
  'use strict';

  var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  function $(s, c) { return (c || document).querySelector(s); }
  function $all(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function lerp(a, b, t) { return a + (b - a) * t; }

  /* ---------- visibility helper ---------- */
  function onVisible(el, cb, opts) {
    if (!el) return;
    if (!('IntersectionObserver' in window)) { cb(null, true); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { cb(en, en.isIntersecting); if (en.isIntersecting && opts && opts.once) io.unobserve(el); });
    }, { threshold: (opts && opts.threshold) || 0, rootMargin: (opts && opts.rootMargin) || '0px' });
    io.observe(el);
    return io;
  }

  /* =========================================================
     TREMOR FIELD — fine horizontal lines that breathe on a slow cycle.
     Where the pointer passes they shiver (a small, fast tremor) and then
     settle over ~1.2 s: charge -> release -> settle.
     ========================================================= */
  function tremor(canvas, opts) {
    if (!canvas || !canvas.getContext) return null;
    var o = {
      lines: 7, top: 0.6, bottom: 0.95,                // vertical band, as fractions of the canvas height
      colors: ['201,164,92', '139,107,69', '201,164,92', '184,154,114'],   // gold / bronze only
      alpha: [0.18, 0.45], width: 1.5,
      amp: 17, wave: [360, 640], breath: 8,            // breath cycle in seconds
      fade: 0.55,                                      // (kept for page scripts that pass it)
      rest: 0, restAmt: 0.5, settleRight: false,       // heroes: resting shiver under the copy + flat toward the photo
      reach: 150, shiver: 7, settle: 2.3,              // pointer radius (px), tremor amplitude (px), decay rate
      source: null,                                    // element that receives pointer events (default: canvas parent)
      idlePulse: 9                                     // seconds between gentle auto pulses (0 = off)
    };
    for (var k in (opts || {})) o[k] = opts[k];
    var ctx = canvas.getContext('2d'), dpr = Math.min(2, window.devicePixelRatio || 1);
    var w = 0, h = 0, lines = [], running = false, raf = 0, last = 0, t0 = performance.now();
    var px = -1e4, py = -1e4, lastMove = 0, pulse = null, visible = false;

    function build() {
      lines = [];
      for (var i = 0; i < o.lines; i++) {
        var k = o.lines === 1 ? 0.5 : i / (o.lines - 1), mid = 1 - Math.abs(k - 0.5) * 2;
        lines.push({
          k: k, phase: Math.random() * Math.PI * 2, speed: 0.28 + Math.random() * 0.22,
          lambda: lerp(o.wave[0], o.wave[1], Math.random()), color: o.colors[i % o.colors.length],
          alpha: lerp(o.alpha[0], o.alpha[1], mid), energy: new Float32Array(0)
        });
      }
    }
    function size() {
      var r = canvas.getBoundingClientRect();
      w = Math.max(1, r.width); h = Math.max(1, r.height);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.ceil((w + 40) / 8) + 1;
      lines.forEach(function (L) { L.energy = new Float32Array(n); });
    }
    function draw(now) {
      var dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016); last = now;
      var t = (now - t0) / 1000, breath = 0.62 + 0.38 * Math.sin(t * 2 * Math.PI / o.breath);
      /* idle pulse: a slow wave of release travels along one line */
      if (!REDUCED && o.idlePulse && !pulse && now - lastMove > o.idlePulse * 1000 && (!lastMove || now - lastMove > 2500)) {
        pulse = { x: -60, line: Math.floor(Math.random() * lines.length), speed: w / 3.2 }; lastMove = now;
      }
      var pX = px, pY = py;
      if (pulse) { pulse.x += pulse.speed * dt; if (pulse.x > w + 80) pulse = null; }
      ctx.clearRect(0, 0, w, h);
      for (var li = 0; li < lines.length; li++) {
        var L = lines[li], baseY = (o.top + (o.bottom - o.top) * L.k) * h, E = L.energy;
        ctx.beginPath();
        for (var i = 0, x = -20; i < E.length; i++, x += 8) {
          /* target energy from the pointer (distance to this point of the line) */
          var dx = x - pX, dy = baseY - pY, d2 = dx * dx + dy * dy, R = o.reach, target = 0;
          if (d2 < R * R * 4) target = Math.exp(-d2 / (2 * R * R * 0.5));
          if (pulse && pulse.line === li) { var q = x - pulse.x; target = Math.max(target, 0.55 * Math.exp(-(q * q) / (2 * 90 * 90))); }
          E[i] += (target - E[i]) * (target > E[i] ? 1 - Math.exp(-dt * 9) : 1 - Math.exp(-dt * o.settle));
          /* charge -> release -> settle, left to right: the wave is strongest under the copy and flat by the photo */
          var u = clamp((x + 20) / (w + 40), 0, 1);
          var env = o.settleRight ? Math.min(1, u / 0.06) * Math.pow(1 - u, 1.35) : Math.sin(Math.PI * u) * (1 - o.fade * u * u);
          var restE = o.rest ? Math.pow(Math.max(0, 1 - u / o.rest), 2) * o.restAmt : 0;
          var y = baseY + Math.sin(x / L.lambda * 2 * Math.PI + L.phase + t * L.speed) * o.amp * breath * env;
          var sh = Math.max(E[i], restE);
          if (sh > 0.003) y += Math.sin(t * 19 + x * 0.085 + L.phase) * o.shiver * sh;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(' + L.color + ',' + L.alpha + ')';
        ctx.lineWidth = o.width; ctx.stroke();
      }
      if (running) raf = requestAnimationFrame(draw);
    }
    function start() { if (running || REDUCED) return; running = true; last = 0; raf = requestAnimationFrame(draw); }
    function stop() { running = false; cancelAnimationFrame(raf); }

    build(); size();
    if (REDUCED) { draw(t0 + 2000); }                   // one calm still frame
    var src = o.source || canvas.parentElement;
    if (!REDUCED && src) {
      src.addEventListener('pointermove', function (e) {
        var r = canvas.getBoundingClientRect(); px = e.clientX - r.left; py = e.clientY - r.top; lastMove = performance.now();
      }, { passive: true });
      src.addEventListener('pointerleave', function () { px = py = -1e4; });
    }
    var ro = 'ResizeObserver' in window ? new ResizeObserver(function () { size(); if (REDUCED) draw(t0 + 2000); }) : null;
    if (ro) ro.observe(canvas);
    onVisible(canvas, function (en, isIn) { visible = isIn; if (isIn && !document.hidden) start(); else stop(); });
    document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else if (visible) start(); });
    return {
      pulse: function (x, line) { pulse = { x: x == null ? -60 : x, line: line == null ? Math.floor(lines.length / 2) : line, speed: w / 3.2 }; },
      poke: function (x, y) { px = x; py = y; lastMove = performance.now(); },
      stop: stop, start: start
    };
  }

  /* =========================================================
     HEROES — every .hx and the home .hero-full get the tremor field,
     pointer parallax on the photo and (over the photo side) the lens.
     ========================================================= */
  function initHeroes() {
    $all('.hx, .hero-full').forEach(function (hero) {
      var canvas = $('.hx-tremor', hero);
      if (!canvas) { canvas = document.createElement('canvas'); canvas.className = 'hx-tremor'; canvas.setAttribute('aria-hidden', 'true'); var content = $('.hero-full-content, .hx-inner, .container', hero); hero.insertBefore(canvas, content); }
      tremor(canvas, { source: hero, top: hero.classList.contains('hero-full') ? 0.62 : 0.56, rest: 0.46, settleRight: true });
      if (REDUCED || !FINE) return;
      var tx = 0, ty = 0, cx = 0, cy = 0, lens = 0, lensT = 0, lx = 0, ly = 0, raf = 0, active = false;
      function loop() {
        cx = lerp(cx, tx, 0.08); cy = lerp(cy, ty, 0.08); lens = lerp(lens, lensT, 0.1);
        hero.style.setProperty('--px', cx.toFixed(2) + 'px'); hero.style.setProperty('--py', cy.toFixed(2) + 'px');
        hero.style.setProperty('--lens', lens.toFixed(3));
        hero.style.setProperty('--lx', lx.toFixed(0) + 'px'); hero.style.setProperty('--ly', ly.toFixed(0) + 'px');
        var win = $('.hx-window', hero); if (win) { win.style.setProperty('--wx', (-cx * 0.6).toFixed(2) + 'px'); win.style.setProperty('--wy', (-cy * 0.6).toFixed(2) + 'px'); }
        if (active || Math.abs(cx - tx) > 0.05 || Math.abs(lens - lensT) > 0.005) raf = requestAnimationFrame(loop); else raf = 0;
      }
      hero.addEventListener('pointermove', function (e) {
        var r = hero.getBoundingClientRect(), nx = (e.clientX - r.left) / r.width, ny = (e.clientY - r.top) / r.height;
        tx = (0.5 - nx) * 16; ty = (0.5 - ny) * 10;
        lx = e.clientX - r.left; ly = e.clientY - r.top;
        lensT = hero.classList.contains('hx') && nx > 0.5 && !e.target.closest('a,button,.hx-window') ? 1 : 0;
        active = true; if (!raf) raf = requestAnimationFrame(loop);
      }, { passive: true });
      hero.addEventListener('pointerleave', function () { tx = ty = 0; lensT = 0; active = false; if (!raf) raf = requestAnimationFrame(loop); });
    });
  }

  /* =========================================================
     BUTTONS — pointer glow coordinates + a small magnetic pull
     ========================================================= */
  function initButtons() {
    if (REDUCED || !FINE) return;
    document.addEventListener('pointermove', function (e) {
      var b = e.target.closest ? e.target.closest('.btn') : null; if (!b) return;
      var r = b.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      b.style.setProperty('--bx', x + 'px'); b.style.setProperty('--by', y + 'px');
      var mx = clamp((x - r.width / 2) * 0.14, -5, 5), my = clamp((y - r.height / 2) * 0.22, -3, 3);
      b.classList.add('is-magnet'); b.style.translate = mx.toFixed(1) + 'px ' + my.toFixed(1) + 'px';
    }, { passive: true });
    document.addEventListener('pointerout', function (e) {
      var b = e.target.closest ? e.target.closest('.btn') : null; if (!b || (e.relatedTarget && b.contains(e.relatedTarget))) return;
      b.classList.remove('is-magnet'); b.style.translate = '';
    }, { passive: true });
  }

  /* =========================================================
     PHONE MENU SHEET — main.js toggles .nav.open; this syncs the page
     ========================================================= */
  function initMenu() {
    var nav = $('.nav'), toggle = $('.nav-toggle'); if (!nav || !toggle) return;
    if (!$('.nav-extra', nav)) {
      var ex = document.createElement('div'); ex.className = 'nav-extra';
      ex.innerHTML = '<span>Questions? Isabelle replies personally.</span><a href="https://wa.me/818065151778" target="_blank" rel="noopener">WhatsApp +81 80 6515 1778</a><a href="mailto:isabelle@bhdasia.com">isabelle@bhdasia.com</a>';
      nav.appendChild(ex);
    }
    var sync = function () {
      var open = nav.classList.contains('open');
      document.documentElement.classList.toggle('menu-open', open && window.innerWidth <= 980);
      if (open && window.innerWidth <= 980) { var first = $('a', nav); if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, 60); }
    };
    new MutationObserver(sync).observe(nav, { attributes: true, attributeFilter: ['class'] });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); } });
    window.addEventListener('resize', function () { if (window.innerWidth > 980 && nav.classList.contains('open')) { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); } });
  }

  /* =========================================================
     DRAWN LINES — [data-draw] (one-shot as it enters) or [data-draw="scroll"]
     ========================================================= */
  var scrollers = [];
  function draw(root) {
    $all('[data-draw]', root).forEach(function (p) {
      if (p.__drawn) return; p.__drawn = true;
      var len = p.getTotalLength ? Math.ceil(p.getTotalLength()) : 1000;
      p.style.setProperty('--len', len);
      if (REDUCED) { p.style.setProperty('--p', 1); return; }
      if (p.getAttribute('data-draw') === 'scroll') { p.style.setProperty('--p', 0); scrollers.push(p); onScroll(); return; }
      p.style.setProperty('--p', 0);
      onVisible(p, function (en, isIn) {
        if (!isIn) return;
        var t0 = performance.now(), dur = parseFloat(p.getAttribute('data-draw-dur')) || 1600;
        (function step(now) { var k = clamp((now - t0) / dur, 0, 1); p.style.setProperty('--p', (1 - Math.pow(1 - k, 3)).toFixed(4)); if (k < 1) requestAnimationFrame(step); })(t0);
      }, { once: true, threshold: 0.2 });
    });
  }
  /* [data-parallax]: children drift a few px against the scroll */
  var parallaxers = [];
  function parallax(root) { if (REDUCED) return; $all('[data-parallax]', root).forEach(function (el) { if (!el.__par) { el.__par = true; parallaxers.push(el); } }); onScroll(); }
  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      ticking = false; var vh = window.innerHeight;
      scrollers.forEach(function (p) {
        /* the drawn tip follows the reading line (~60% down the viewport); short graphics draw over half a screen of scroll */
        var box = (p.ownerSVGElement || p).getBoundingClientRect();
        var k = clamp((vh * 0.6 - box.top) / Math.max(box.height, vh * 0.5), 0, 1);
        p.style.setProperty('--p', k.toFixed(4));
      });
      parallaxers.forEach(function (el) {
        var r = el.getBoundingClientRect(); if (r.bottom < -100 || r.top > vh + 100) return;
        var k = ((r.top + r.height / 2) - vh / 2) / vh, amt = parseFloat(el.getAttribute('data-parallax')) || 24;
        el.style.setProperty('--par', (-k * amt).toFixed(1) + 'px');
      });
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  /* =========================================================
     LIGHTBOX + STRIP
     ========================================================= */
  function lightbox(items, index) {
    if (!items || !items.length) return;
    var i = index || 0, prevFocus = document.activeElement;
    var lb = document.createElement('figure'); lb.className = 'lx-lightbox'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Photo viewer');
    lb.innerHTML = '<span class="lx-lb-count"></span><img alt=""><figcaption></figcaption>' +
      '<button type="button" class="lx-lb-close" aria-label="Close"></button>' +
      (items.length > 1 ? '<button type="button" class="lx-lb-prev" aria-label="Previous photo"></button><button type="button" class="lx-lb-next" aria-label="Next photo"></button>' : '');
    document.body.appendChild(lb); document.documentElement.style.overflow = 'hidden';
    var img = $('img', lb), cap = $('figcaption', lb), cnt = $('.lx-lb-count', lb);
    function show(n) { i = (n + items.length) % items.length; img.src = items[i].src; img.alt = items[i].caption || ''; cap.textContent = items[i].caption || ''; cnt.textContent = (i + 1) + ' / ' + items.length; }
    function close() { lb.remove(); document.documentElement.style.overflow = ''; document.removeEventListener('keydown', key); if (prevFocus && prevFocus.focus) prevFocus.focus(); }
    function key(e) { if (e.key === 'Escape') close(); else if (e.key === 'ArrowLeft') show(i - 1); else if (e.key === 'ArrowRight') show(i + 1); }
    lb.addEventListener('click', function (e) { if (e.target.closest('.lx-lb-prev')) show(i - 1); else if (e.target.closest('.lx-lb-next')) show(i + 1); else if (e.target === lb || e.target.closest('.lx-lb-close')) close(); });
    var sx = null; lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) { if (sx == null) return; var d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 40) show(i + (d < 0 ? 1 : -1)); sx = null; });
    document.addEventListener('keydown', key); show(i); $('.lx-lb-close', lb).focus();
  }
  function strip(el) {
    if (!el || el.__strip || !FINE) return; el.__strip = true;
    var down = false, sx = 0, sl = 0, moved = false;
    el.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = el.scrollLeft; });
    window.addEventListener('pointermove', function (e) { if (!down) return; var d = e.clientX - sx; if (Math.abs(d) > 4) { moved = true; el.classList.add('is-drag'); } el.scrollLeft = sl - d; });
    window.addEventListener('pointerup', function () { if (!down) return; down = false; el.classList.remove('is-drag'); });
    el.addEventListener('click', function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
  }
  /* declarative galleries: <div data-gallery> … <a href="big.webp" data-caption="…"> … </div> */
  function initGalleries() {
    $all('[data-gallery]').forEach(function (g) {
      if (g.classList.contains('lx-strip')) strip(g);
      g.addEventListener('click', function (e) {
        var a = e.target.closest('a[href]'); if (!a || !g.contains(a)) return; e.preventDefault();
        var links = $all('a[href]', g), items = links.map(function (x) { return { src: x.getAttribute('href'), caption: x.getAttribute('data-caption') || ($('img', x) || {}).alt || '' }; });
        lightbox(items, links.indexOf(a));
      });
    });
  }

  /* one orange action in view: the header CTA turns navy while any other .btn-primary is on screen */
  function initCtaQuiet() {
    var head = $('.site-header .nav .btn-primary'); if (!head || !('IntersectionObserver' in window)) return;
    var seen = new Set();
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) seen.add(e.target); else seen.delete(e.target); });
      head.classList.toggle('is-quiet', seen.size > 0);
    }, { threshold: 0.01 });
    function watch() { $all('.btn-primary').forEach(function (b) { if (!b.__cq && !b.closest('.site-header')) { b.__cq = true; io.observe(b); } }); }
    watch();
    if ('MutationObserver' in window) new MutationObserver(watch).observe($('main') || document.body, { childList: true, subtree: true });
  }

  window.TRELayer = { reduced: REDUCED, fine: FINE, onVisible: onVisible, tremor: tremor, draw: draw, parallax: parallax, lightbox: lightbox, strip: strip };

  function boot() { initHeroes(); initButtons(); initMenu(); draw(document); parallax(document); initGalleries(); initCtaQuiet(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
