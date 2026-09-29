/* TRE™ in Singapore — articles (prefix ar-) 2026-09-29
   Loaded with `defer` by the six posts in blog/. Uses window.TRELayer (layer.js) when present.
   - reading-progress line for the article body (the page-wide bar is hidden on articles)
   - table of contents from the h2s: sticky rail with a gold fill on desktop, collapsible on phones
   - pull quotes get a drawn tremor line that settles
   - the session timeline (.ar-steps) fills as you read; the prep checklist (.ar-check) ticks and remembers
   - the mechanism figure (.ar-fig) draws once: charge -> discharge -> baseline
   - related cards settle in
   The article reads completely without this file, and everything is still under prefers-reduced-motion.
*/
(function () {
  'use strict';

  var L = null, REDUCED = false, started = false;
  var CHEV = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6 9 6 6 6-6"/></svg>';
  var WAVE = '<svg class="ar-q-wave" viewBox="0 0 132 20" aria-hidden="true" focusable="false"><path d="M2 10 Q7.8 2.5 13.5 10 Q19.2 15.5 25 10 Q30.8 6 36.5 10 Q42.2 12.9 48 10 Q53.8 7.9 59.5 10 Q65.2 11.6 71 10 Q76.8 8.8 82.5 10 Q88.2 10.8 94 10 Q99.8 9.4 105.5 10 Q111.2 10.5 117 10 Q122.8 9.7 128.5 10"/></svg>';
  var TICK = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5.5 12.5l4.2 4.2L18.5 7.8"/></svg>';

  function $(s, c) { return (c || document).querySelector(s); }
  function $all(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function easeOut(k) { return 1 - Math.pow(1 - k, 3); }

  /* one rAF-throttled loop for every scroll-linked piece */
  var jobs = [], ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () { ticking = false; for (var i = 0; i < jobs.length; i++) jobs[i](); });
  }

  /* ---------- reading progress: 0 as the body starts, 1 as it ends ---------- */
  function progress(body) {
    var bar = document.createElement('div'); bar.className = 'ar-progress'; bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    document.documentElement.classList.add('ar-doc');
    jobs.push(function () {
      var r = body.getBoundingClientRect(), vh = window.innerHeight;
      var k = clamp((vh * 0.3 - r.top) / Math.max(1, r.height - vh * 0.4), 0, 1);
      bar.style.setProperty('--ar-read', k.toFixed(4));
    });
  }

  /* ---------- table of contents ---------- */
  function slug(s) {
    return (s || '').toLowerCase().replace(/[™®]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48) || 'section';
  }
  function toc(art, body) {
    var hs = $all(':scope > h2', body);
    if (hs.length < 3) return;
    var wrap = art.parentElement;
    var nav = document.createElement('nav'); nav.className = 'ar-toc'; nav.setAttribute('aria-label', 'On this page');
    var box = document.createElement('details'); box.className = 'ar-toc-box';
    var sum = document.createElement('summary'); sum.className = 'ar-toc-sum'; sum.innerHTML = '<span>On this page</span>' + CHEV;
    var ol = document.createElement('ol'); ol.className = 'ar-toc-list';
    var items = hs.map(function (h) {
      if (!h.id) { var base = slug(h.textContent), id = base, n = 2; while (document.getElementById(id)) id = base + '-' + n++; h.id = id; }
      var li = document.createElement('li'), a = document.createElement('a'); a.href = '#' + h.id; a.className = 'ar-toc-a';
      var num = $('.ar-n', h), label = h.textContent.replace(/\s+/g, ' ').trim();
      if (num) {
        var n = document.createElement('span'); n.className = 'ar-toc-n'; n.textContent = num.textContent.trim(); a.appendChild(n);
        label = label.replace(num.textContent.trim(), '').trim();
      }
      var t = document.createElement('span'); t.textContent = label; a.appendChild(t);
      li.appendChild(a); ol.appendChild(li);
      return { h: h, li: li, a: a };
    });
    box.appendChild(sum); box.appendChild(ol); nav.appendChild(box);
    wrap.insertBefore(nav, art); wrap.classList.add('ar-has-toc');

    var mq = window.matchMedia('(min-width: 1100px)');
    function sync() { box.open = mq.matches; if (!mq.matches) ol.style.removeProperty('--fill'); onScroll(); }
    sync();
    if (mq.addEventListener) mq.addEventListener('change', sync); else if (mq.addListener) mq.addListener(sync);
    sum.addEventListener('click', function (e) { if (mq.matches) e.preventDefault(); });
    ol.addEventListener('click', function (e) {
      var a = e.target.closest('a'); if (!a) return;
      var h = document.getElementById(decodeURIComponent(a.hash.slice(1))); if (!h) return;
      e.preventDefault();
      if (!mq.matches) box.open = false;                  // collapse first, then scroll to the settled position
      h.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
      if (history.replaceState) history.replaceState(null, '', a.hash);
    });

    function nodeY(i) { return items[i].li.offsetTop + 20; }
    jobs.push(function () {
      var vh = window.innerHeight, line = vh * 0.32, act = -1, i;
      for (i = 0; i < items.length; i++) { if (items[i].h.getBoundingClientRect().top <= line) act = i; else break; }
      for (i = 0; i < items.length; i++) {
        var it = items[i];
        it.li.classList.toggle('is-past', i < act);
        it.li.classList.toggle('is-active', i === act);
        if (i === act) it.a.setAttribute('aria-current', 'true'); else it.a.removeAttribute('aria-current');
      }
      if (!mq.matches) return;
      var fill = 0;
      if (act >= 0) {
        var top = items[act].h.getBoundingClientRect().top;
        var next = act + 1 < items.length ? items[act + 1].h.getBoundingClientRect().top : body.getBoundingClientRect().bottom;
        var f = clamp((line - top) / Math.max(1, next - top), 0, 1);
        fill = nodeY(act) - nodeY(0) + (act + 1 < items.length ? (nodeY(act + 1) - nodeY(act)) * f : 0);
      }
      ol.style.setProperty('--fill', fill.toFixed(1) + 'px');
      if (act >= 0 && nav.scrollHeight > nav.clientHeight + 4) {   // keep the active entry visible in a tall rail
        var li = items[act].li, y = li.offsetTop + ol.offsetTop;
        if (y < nav.scrollTop + 20 || y + li.offsetHeight > nav.scrollTop + nav.clientHeight - 20) nav.scrollTop = y - nav.clientHeight / 3;
      }
    });
  }

  /* ---------- pull quotes: a tremor line that settles ---------- */
  function quotes(body) {
    $all('blockquote', body).forEach(function (q) {
      q.classList.add('ar-q');
      q.insertAdjacentHTML('afterbegin', WAVE);
      var p = $('.ar-q-wave path', q);
      if (p) { p.setAttribute('data-draw', ''); p.setAttribute('data-draw-dur', '1400'); }
    });
    if (L && L.draw) L.draw(body);
  }

  /* ---------- session timeline: the rail fills with the reader ---------- */
  function steps(body) {
    $all('ol.ar-steps', body).forEach(function (ol) {
      var lis = $all(':scope > li', ol), last = lis[lis.length - 1];
      if (!last) return;
      jobs.push(function () {
        var track = last.offsetTop;                         // first node centre -> last node centre
        ol.style.setProperty('--track', track + 'px');
        var r = ol.getBoundingClientRect(), vh = window.innerHeight;
        var k = REDUCED ? 1 : clamp((vh * 0.62 - r.top) / Math.max(1, r.height - 36), 0, 1);
        ol.style.setProperty('--p', k.toFixed(4));
        lis.forEach(function (li) { li.classList.toggle('on', li.offsetTop <= track * k + 0.5); });
      });
    });
  }

  /* ---------- prep checklist: tick what is done (kept in this browser only) ---------- */
  function checklists(body) {
    var lists = $all('ul.ar-check', body); if (!lists.length) return;
    var key = 'ar-check:' + location.pathname.split('/').pop(), saved = {};
    try { saved = JSON.parse(localStorage.getItem(key) || '{}') || {}; } catch (e) { saved = {}; }
    function store() { try { localStorage.setItem(key, JSON.stringify(saved)); } catch (e) { /* private mode: ticks last for this visit */ } }
    lists.forEach(function (ul, u) {
      $all(':scope > li', ul).forEach(function (li, i) {
        var id = u + '-' + i, s = $('strong', li);
        var b = document.createElement('button'); b.type = 'button'; b.className = 'ar-tick'; b.innerHTML = TICK;
        b.setAttribute('aria-label', (s ? s.textContent : li.textContent).replace(/[.:]\s*$/, '').trim());
        function set(on) { b.setAttribute('aria-pressed', on ? 'true' : 'false'); li.classList.toggle('is-done', on); }
        set(!!saved[id]);
        li.insertBefore(b, li.firstChild);
        li.addEventListener('click', function (e) {
          if (e.target.closest('a, .tre-term, .tre-pop')) return;
          if (!b.contains(e.target) && window.getSelection && String(window.getSelection()) !== '') return;  // selecting text, not ticking
          var on = b.getAttribute('aria-pressed') !== 'true'; set(on);
          if (on) saved[id] = 1; else delete saved[id];
          store();
        });
      });
    });
  }

  /* ---------- mechanism figure: draws once as it enters ---------- */
  function figure(body) {
    $all('.ar-fig', body).forEach(function (fig) {
      var paths = $all('.ar-draw', fig);
      paths.forEach(function (p) { if (p.getTotalLength) p.style.setProperty('--len', Math.ceil(p.getTotalLength())); });
      $all('.ar-key', fig).forEach(function (k) {
        k.addEventListener('pointerenter', function () { fig.setAttribute('data-focus', k.getAttribute('data-k')); });
        k.addEventListener('pointerleave', function () { fig.removeAttribute('data-focus'); });
      });
      if (REDUCED || !L || !L.onVisible) return;
      if (fig.getBoundingClientRect().top < window.innerHeight * 0.9) return;     // already on screen: leave it drawn
      var a = $('.ar-fig-a', fig), b = $('.ar-fig-b', fig), marks = $all('[data-at]', fig);
      fig.classList.add('is-arming');
      paths.forEach(function (p) { p.style.setProperty('--p', 0); });
      L.onVisible(fig, function (en, isIn) {
        if (!isIn) return;
        var t0 = performance.now();
        (function step(now) {
          var ka = clamp((now - t0) / 1600, 0, 1), kb = clamp((now - t0 - 150) / 1400, 0, 1);
          var ea = easeOut(ka), eb = easeOut(kb);
          if (a) a.style.setProperty('--p', ea.toFixed(4));
          if (b) b.style.setProperty('--p', eb.toFixed(4));
          marks.forEach(function (m) {
            var on = m.getAttribute('data-line') === 'b' ? eb : ea;
            if (on >= parseFloat(m.getAttribute('data-at'))) m.classList.add('on');
          });
          if (ka < 1 || kb < 1) requestAnimationFrame(step);
          else { fig.classList.remove('is-arming'); marks.forEach(function (m) { m.classList.remove('on'); }); }
        })(t0);
      }, { once: true, threshold: 0.35 });
    });
  }

  /* ---------- related cards settle in, a row at a time ---------- */
  function settle(selector) {
    if (REDUCED || !('IntersectionObserver' in window)) return;
    var vh = window.innerHeight;
    var els = $all(selector).filter(function (el) { return el.getBoundingClientRect().top > vh; });
    if (!els.length) return;
    els.forEach(function (el) { el.classList.add('ar-arm'); });
    var io = new IntersectionObserver(function (entries) {
      var n = 0;
      entries.filter(function (en) { return en.isIntersecting; })
        .sort(function (x, y) { return x.target.compareDocumentPosition(y.target) & 2 ? 1 : -1; })
        .forEach(function (en) {
          var el = en.target; io.unobserve(el);
          el.style.setProperty('--ar-i', n++);
          el.classList.add('ar-in');
          setTimeout(function () { el.classList.remove('ar-arm', 'ar-in'); el.style.removeProperty('--ar-i'); }, 1500);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  function init() {
    if (started) return; started = true;
    L = window.TRELayer || null;
    REDUCED = L ? !!L.reduced : !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    var art = $('.ar-article'), body = art && $('.article-body', art);
    if (!body) return;
    progress(body);
    toc(art, body);
    quotes(body);
    steps(body);
    checklists(body);
    figure(body);
    settle('.ar-rel-card');
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    window.addEventListener('load', onScroll);
    onScroll();
  }

  if (document.readyState === 'complete') setTimeout(init, 0);
  else {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 0); });
    window.addEventListener('load', function () { setTimeout(init, 0); });
  }
})();
