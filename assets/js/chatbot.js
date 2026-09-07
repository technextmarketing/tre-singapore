/* TRE® in Singapore — site assistant (rule-based, runs entirely in the browser)
   Answers from events-data.js, facilitators-data.js and a small FAQ. No data leaves the page.
   Sits above the WhatsApp button; anything it cannot answer is handed to WhatsApp / email. */
(function () {
  'use strict';
  var WA = 'https://wa.me/818065151778';
  var CAL = 'https://calendly.com/bhdasia/tre-certification-intake-call';
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function root() { var s = document.querySelector('script[src*="chatbot.js"]'); var m = s && /^(.*?)assets\/js\/chatbot\.js/.exec(s.getAttribute('src')); return m ? m[1] : ''; }
  var ROOT = root();
  function link(href, label) { var ext = /^https?:/.test(href); return '<a href="' + esc(href) + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' + esc(label) + '</a>'; }
  function parseDate(iso) { var m = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/.exec(iso || ''); return m ? new Date(+m[1], +m[2] - 1, +m[3], m[4] ? +m[4] : 0, m[5] ? +m[5] : 0) : null; }
  function upcoming(filter) {
    var now = new Date();
    return (window.TRE_EVENTS || []).map(function (e) { var end = parseDate(e.end || e.start); if (end) end.setHours(23, 59, 59); return Object.assign({}, e, { _start: parseDate(e.start), _end: end }); })
      .filter(function (e) { return e._end && e._end >= now && (!filter || filter(e)); })
      .sort(function (a, b) { return a._start - b._start; });
  }
  function eventList(list, n) {
    if (!list.length) return '<p>No dates in that category right now — ' + link(ROOT + 'events.html', 'see all events') + '.</p>';
    return '<ul class="cb-list">' + list.slice(0, n || 4).map(function (e) {
      return '<li>' + link(ROOT + 'event.html?id=' + encodeURIComponent(e.slug), e.title) + '<small>' + esc(e.dateText) + ' · ' + esc(e.location) + (e.price ? ' · ' + esc(e.price) : '') + '</small></li>';
    }).join('') + '</ul>' + (list.length > (n || 4) ? '<p>' + link(ROOT + 'events.html', 'All ' + list.length + ' upcoming events') + '</p>' : '');
  }
  function facilitatorList() {
    var fs = (window.TRE_FACILITATORS || []).filter(function (f) { return !f.sample; });
    return '<ul class="cb-list">' + fs.map(function (f) { return '<li>' + link(ROOT + 'facilitator.html?id=' + encodeURIComponent(f.id), f.name) + '<small>' + esc(f.role) + '</small></li>'; }).join('') + '</ul><p>' + link(ROOT + 'facilitators.html', 'Browse every facilitator and provider') + '</p>';
  }

  var FAQ = [
    { k: /what is tre|what.s tre|tre mean|stand for|meaning|tremor|shak/i, a: function () { return '<p><b>TRE®</b> stands for <b>Tension &amp; Trauma Releasing Exercises</b> — seven simple exercises that switch on the body\'s natural tremor reflex to release deep muscular tension and stress. It was created by Dr. David Berceli after years of trauma work in conflict zones and is now taught worldwide.</p><p>' + link(ROOT + 'education.html', 'How TRE® works') + ' · ' + link(ROOT + 'blog/what-is-tre.html', 'Plain-language guide') + '</p>'; } },
    { k: /prepar|online session|zoom|camera|set ?up|what to bring|headphone|mat\b/i, a: function () { return '<p>For an online session we must see you <b>head to toe, standing and on the mat</b>: device about 2–2.5 m away, landscape, at hip height and to the side of your mat. Have a yoga mat, wireless headphones, good lighting, loose light-coloured trousers, water and cushions ready, and join through the Zoom app a few minutes early.</p><p>' + link(ROOT + 'online-session-guide.html', 'Read the full preparation guide') + '</p>'; } },
    { k: /certif|module|provider training|become a provider|train(ing)? to teach|cceu|icf/i, a: function () { var m = upcoming(function (e) { return e.category === 'Certification'; }); return '<p>The <b>Global TRE® Provider Certification</b> is three modules — each a 2-day workshop plus 4 online sessions. Full bundle from <b>S$3,699</b> (super early bird; early bird S$4,200, normal S$4,500). Module 1 alone: S$1,290 in person or S$990 online, and it carries <b>21 ICF CCEUs</b>.</p>' + eventList(m, 3) + '<p>' + link(CAL, 'Book a certification intake call') + ' · ' + link(ROOT + 'education.html#certification', 'Certification pathway') + '</p>'; } },
    { k: /price|cost|fee|how much|\$|sgd|rm\b|expens/i, a: function () { return '<p>Certification bundle from <b>S$3,699</b>; Module 1 only S$1,290 (in person) or S$990 (online). Workshops vary — the Internal Alchemy evening was S$79 and the Bucharest workshops are €97. Individual sessions are quoted by each provider.</p><p>' + link(ROOT + 'events.html', 'See event prices') + ' · ' + link(ROOT + 'contact.html?interest=session', 'Ask for a session quote') + '</p>'; } },
    { k: /event|workshop|when|date|next|calendar|upcoming|schedule/i, a: function () { return '<p>Here is what is coming up:</p>' + eventList(upcoming(), 4); } },
    { k: /online|remote|from home|virtual/i, a: function () { var o = upcoming(function (e) { return e.region === 'online'; }); return '<p>Online options:</p>' + eventList(o, 3) + '<p>Individual sessions are also available online worldwide — ' + link(CAL, 'book a call') + '.</p>'; } },
    { k: /bucharest|romania|europe|saymara/i, a: function () { var r = upcoming(function (e) { return e.region === 'international'; }); return '<p>Events in Bucharest with Isabelle and Saymara Ryon:</p>' + eventList(r, 3); } },
    { k: /book|session|appointment|1:1|one.to.one|individual|private|try tre|first session/i, a: function () { return '<p>The quickest way is a free discovery call with Isabelle, or a message on WhatsApp. Certified providers in Singapore also take individual and group bookings.</p><p>' + link(CAL, 'Book a free call') + ' · ' + link(WA, 'WhatsApp us') + ' · ' + link(ROOT + 'facilitators.html', 'Find a provider') + '</p>'; } },
    { k: /facilitator|provider|trainer|isabelle|simba|who teach|directory|coach/i, a: function () { return '<p>Our facilitators:</p>' + facilitatorList(); } },
    { k: /corporate|team|company|workplace|hr\b|offsite|lunch/i, a: function () { return '<p>We run private group sessions, lunch-and-learns, offsites and multi-week resilience programmes for organisations in Singapore.</p><p>' + link(ROOT + 'contact.html?interest=corporate', 'Enquire about a corporate programme') + '</p>'; } },
    { k: /safe|risk|contraindic|pregnan|injur|medical|condition|epilep|surgery/i, a: function () { return '<p>TRE® is gentle and self-regulated, but some conditions need care (recent surgery, pregnancy, epilepsy, acute mental-health episodes). Please tell your provider before a session — they will adapt or advise.</p><p>' + link(ROOT + 'education.html', 'Safety and who TRE® is for') + '</p>'; } },
    { k: /contact|email|whatsapp|phone|reach|address|where are you|office/i, a: function () { return '<p>Email ' + link('mailto:isabelle@bhdasia.com', 'isabelle@bhdasia.com') + ' or WhatsApp ' + link(WA, '+81 80 6515 1778') + '. Office: Business &amp; Human Development Consulting Pte Ltd, 50 Raffles Place, Singapore Land Tower #30-00, Singapore 048623.</p>'; } },
    { k: /list|join the directory|get listed|add my|register as/i, a: function () { return '<p>Certified providers and trainees in Singapore can be listed free of charge.</p><p>' + link(ROOT + 'facilitators.html#get-listed', 'Get listed in the directory') + '</p>'; } },
    { k: /blog|article|read|science|research/i, a: function () { return '<p>Start with ' + link(ROOT + 'blog/what-is-tre.html', 'What is TRE®?') + ', ' + link(ROOT + 'blog/science-of-neurogenic-tremors.html', 'the science of neurogenic tremors') + ' or ' + link(ROOT + 'blog/your-first-tre-session.html', 'preparing for your first session') + '.</p>'; } },
    { k: /hello|hi\b|hey|good (morning|afternoon|evening)|thanks|thank you/i, a: function () { return '<p>Hello! Ask me about upcoming events, certification, how to prepare for an online session, or how to book. Or tap one of the suggestions below.</p>'; } }
  ];
  function answer(q) {
    for (var i = 0; i < FAQ.length; i++) if (FAQ[i].k.test(q)) return FAQ[i].a();
    return '<p>I am not sure about that one. A real person can help quickly:</p><p>' + link(WA, 'WhatsApp us') + ' · ' + link('mailto:isabelle@bhdasia.com?subject=' + encodeURIComponent('Question from the website: ' + q.slice(0, 80)), 'Email Isabelle') + '</p><p>You can also try: <em>events</em>, <em>certification</em>, <em>prepare online</em>, <em>book a session</em>, <em>facilitators</em>.</p>';
  }
  var CHIPS = ['Upcoming events', 'How much is certification?', 'Prepare for an online session', 'Book a session', 'Who are the facilitators?', 'What is TRE®?'];

  function init() {
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'cb-fab'; btn.setAttribute('aria-label', 'Ask a question'); btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-8 8H8l-5 3 1.4-4.2A8 8 0 1 1 21 12z"/><path d="M8 11h8M8 15h5"/></svg><span class="cb-fab-label">Ask us</span>';
    var panel = document.createElement('section');
    panel.className = 'cb-panel'; panel.hidden = true; panel.setAttribute('aria-label', 'Site assistant');
    panel.innerHTML = '<header class="cb-head"><div><b>TRE® in Singapore</b><small>Assistant · answers in seconds</small></div><button type="button" class="cb-close" aria-label="Close">&times;</button></header>' +
      '<div class="cb-msgs" aria-live="polite"></div>' +
      '<div class="cb-chips">' + CHIPS.map(function (c) { return '<button type="button" class="cb-chip">' + esc(c) + '</button>'; }).join('') + '</div>' +
      '<form class="cb-form"><input type="text" placeholder="Type a question…" aria-label="Your question" autocomplete="off"/><button type="submit" aria-label="Send"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg></button></form>' +
      '<p class="cb-foot">Automated answers from this website. Nothing you type is stored or sent anywhere.</p>';
    document.body.appendChild(panel); document.body.appendChild(btn);
    var msgs = panel.querySelector('.cb-msgs'), form = panel.querySelector('.cb-form'), input = form.querySelector('input');
    function add(html, who) { var d = document.createElement('div'); d.className = 'cb-msg ' + who; d.innerHTML = html; msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight; }
    function ask(q) { q = String(q || '').trim(); if (!q) return; add('<p>' + esc(q) + '</p>', 'me'); setTimeout(function () { add(answer(q), 'bot'); }, 250); }
    function open(o) { panel.hidden = !o; btn.setAttribute('aria-expanded', o ? 'true' : 'false'); btn.classList.toggle('open', o); if (o) { if (!msgs.children.length) add('<p>Hi! I can help with events, certification, online-session preparation and bookings. What would you like to know?</p>', 'bot'); input.focus(); } }
    btn.addEventListener('click', function () { open(panel.hidden); });
    panel.querySelector('.cb-close').addEventListener('click', function () { open(false); });
    panel.addEventListener('click', function (e) { var c = e.target.closest('.cb-chip'); if (c) ask(c.textContent); });
    form.addEventListener('submit', function (e) { e.preventDefault(); ask(input.value); input.value = ''; });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) open(false); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
