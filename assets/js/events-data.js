/* =========================================================
   EVENTS DATA — edit this file to add, change or remove events.
   Source of truth: hummingbeing.com/events.html and its event pages.
   Last aligned: 7 September 2026.

   Each event object supports:
     slug         : string (required) — used by event.html?id=<slug>
     title        : string (required)
     category     : "Certification" | "Workshop" | "Community" | "Coaching"
     region       : "singapore" | "online" | "international"   (used by the filter tabs)
     location     : short label shown on the card badge (e.g. "Singapore")
     venue        : fuller venue text (optional)
     format       : "In-Person" | "Online" | "Online & In-Person" (optional)
     start        : "YYYY-MM-DD" or "YYYY-MM-DDTHH:MM" (required; local time of the event)
     end          : "YYYY-MM-DD" (optional; for multi-day events)
     dateText     : human-readable date line (required)
     timeText     : human-readable time (optional)
     chip         : {top:"29–30", bottom:"Aug 2026"} to override the date chip (optional)
     image        : thumbnail path (16:9) — shown on the card and the detail page
     description  : short paragraph for the card
     facilitator  : name(s) (optional)
     credits      : e.g. "21 ICF CCEUs" (optional)
     price        : e.g. "S$79" (optional)  priceNote: e.g. "early bird" (optional)
     priceText    : shown when there is no price (optional)
     link         : primary registration URL   linkText: button label (optional)
     soldOut      : true/false   waitlistLink: URL shown when sold out
     isNew        : true to show a "New" badge
     theme        : "theme-deep" | "theme-bronze" | "theme-orange" | "theme-green" (fallback colour when no image)
     details      : { summary, about[], forWho[], schedule[], includes[], pricing[], pricingNote,
                      facilitators[], partners, online (true = show the online preparation guide),
                      register[{label,url,primary}], source }
   Events whose end date (or start date) has passed move automatically to "Past events".
   ========================================================= */
window.TRE_PREP_GUIDE = 'https://hummingbeing.com/online-session-preparation.html';
window.TRE_PREP_PDF = 'https://hummingbeing.com/online-tre-session-guide.pdf?v=2';

var ISABELLE = {
  name: 'Isabelle Claus Teixeira',
  role: 'Global TRE® Certifying Trainer · ICF PCC',
  bio: 'Somatic and trauma-informed Executive Coach (ICF PCC), Global TRE® Certifying Trainer and Mindfulness Teacher. Trained directly under Dr. David Berceli, founder of TRE®. Over 30 years of experience working with professionals, executives and teams across 9 countries and 40+ nationalities — in person and online.',
  link: 'https://hummingbeing.com/isabelle.html', linkText: 'Meet Isabelle'
};
var SAYMARA = {
  name: 'Saymara Ryon',
  role: 'Founder & President, Asociația TRE® România · Certified TRE® Provider',
  bio: 'Holistic Coach, Trainer & Mentor, Certified TRE® Provider and Trainer Trainee. Founder of Învață să Zbori SRL (Learn to Fly) and pioneer of TRE® in Romania, building the TRE® practitioner community across Eastern Europe.',
  link: 'https://treromania.org/', linkText: 'TRE® Romania'
};
var SIMBA = {
  name: 'Simba Stenqvist',
  role: 'Global TRE® Certifying Trainer · Creator of Internal Alchemy',
  bio: 'Global TRE® Certifying Trainer and creator of Internal Alchemy — an integrated system of breathwork, fascial release, grounding and tremor work drawn from more than 25 years of hands-on practice in bodywork, nervous-system regulation and energetic healing, developed in close collaboration with Dr. David Berceli.',
  link: 'https://livingwiththespirit.com/', linkText: 'livingwiththespirit.com'
};
var CALENDLY = 'https://calendly.com/bhdasia/tre-certification-intake-call';

window.TRE_EVENTS = [

  /* ---------- Singapore certification 2027 cohort (Modules 1–3 + bonuses) ---------- */
  {
    slug: 'tre-provider-certification-2027-singapore',
    title: 'Become a Certified TRE® Provider — 2027 Cohort (Singapore)',
    category: 'Certification',
    region: 'singapore',
    location: 'Singapore',
    venue: 'Singapore (venue confirmed on registration)',
    format: 'In-Person + online sessions',
    start: '2027-02-27',
    end: '2027-10-31',
    dateText: 'Feb–Oct 2027 · Module 1: 27–28 Feb · Module 2: 3–4 Jul · Module 3: 30–31 Oct 2027',
    chip: { top: '2027', bottom: 'Cohort' },
    image: 'assets/img/events/event-certification-2027.webp',
    description: 'The 2027 Singapore cohort of the Global TRE® Provider Certification — boosted by Internal Alchemy and co-taught by two TRE® Trainers, Isabelle Claus Teixeira & Simba Stenqvist. Three modules plus online supervisions and three self-paced bonus programs. Bundle from S$5,888 early bird.',
    facilitator: 'Isabelle Claus Teixeira & Simba Stenqvist',
    credits: 'ICF CCE with Module 1',
    price: 'S$5,888',
    priceNote: 'full certification + bonuses · early bird to 31 Dec 2026 (then S$6,688)',
    link: 'https://www.hummingbeing.com/event-certification-2027.html',
    linkText: 'Register',
    isNew: true,
    theme: 'theme-deep',
    details: {
      summary: 'The 2027 Singapore cohort of the Global TRE® Provider Certification — co-taught by Isabelle Claus Teixeira and Simba Stenqvist, and boosted by Internal Alchemy. Three modules take you from your own TRE® practice to confidently teaching individuals and groups. One cohort per year.',
      about: [
        'The Global TRE® Provider Certification qualifies you to offer TRE® to the general public, in individual and group settings.',
        'The 2027 Singapore cohort is boosted by Internal Alchemy and co-taught by two TRE® Trainers — Isabelle Claus Teixeira and Simba Stenqvist — for richer, varied learning. Only one cohort runs in Singapore each year.'
      ],
      forWho: [
        'A coach (ACC, PCC, MCC or in training) wanting somatic tools',
        'A therapist, counsellor or psychologist seeking body-based approaches',
        'An HR, wellbeing or corporate resilience professional',
        'A yoga teacher, physiotherapist or movement practitioner',
        'Someone who has experienced TRE® and wants to share it professionally'
      ],
      schedule: [
        { when: 'Module 1', time: '27–28 Feb 2027 · Singapore · SGT', title: 'Your Personal TRE® Practice', text: 'For your personal use — can be purchased alone. A 2-day in-person workshop plus 4 online TRE® sessions (2 personal & individual with a different trainer, and 2 online group sessions on 1 Apr & 1 Jun 2027). 21 ICF CCE for coaches included.' },
        { when: 'Module 2', time: '3–4 Jul 2027 · Singapore · SGT', title: 'Teaching TRE® to One Person', text: 'Open after Module 1. A 2-day in-person workshop plus 2 online group supervisions (19 Jul & 16 Aug 2027) and 2 individual supervisions with a different trainer.' },
        { when: 'Module 3', time: '30–31 Oct 2027 · Singapore · SGT', title: 'Teaching TRE® to Groups', text: 'Open after Module 2. A 2-day in-person workshop plus 1 online group supervision (13 Nov 2027) and 3 individual supervisions. Completes your Global TRE® Provider certification.' },
        { when: 'Bonuses', time: 'Self-paced online', title: 'Three bonus programs', text: 'Grounding (Simba Stenqvist), Verbal Interventions (Isabelle Claus Teixeira) and an Internal Alchemy introduction (Simba Stenqvist) — each with the option to attend a live workshop for a discounted add-on.' }
      ],
      includes: [
        'Three 2-day in-person workshops — Modules 1, 2 & 3 in Singapore',
        'Taught by 2 TRE® Trainers — varied perspectives and richer learning',
        'Online TRE® sessions & supervisions — individual and group, across all three modules',
        'Three self-paced bonus programs — Grounding, Verbal Interventions and an Internal Alchemy introduction',
        'ICF CCE for coaches — included with Module 1',
        'Global TRE® Provider certificate — qualify to offer TRE® to individuals and groups'
      ],
      pricing: [
        { label: 'Full Certification + Bonus Programs', sub: 'Modules 1–3 + 3 bonuses', price: 'S$5,888', note: 'early bird to 31 Dec 2026 · then S$6,688', hl: true },
        { label: 'Module 1 only · Personal Practice', sub: 'can be taken alone · ICF CCE for coaches', price: 'S$1,888', note: 'early bird to 31 Dec 2026 · then S$1,988' }
      ],
      pricingNote: 'All prices in Singapore Dollars. Early-bird pricing applies until 31 December 2026. All tickets are non-refundable and non-cancellable.',
      facilitators: [ISABELLE, SIMBA],
      online: true,
      register: [
        { label: 'Register your interest', url: 'https://www.hummingbeing.com/event-certification-2027.html#reserve', primary: true },
        { label: 'Book a certification intake call', url: CALENDLY }
      ],
      source: 'https://www.hummingbeing.com/event-certification-2027.html'
    }
  },

  /* ---------- Singapore certification (Modules 1–3) ---------- */
  {
    slug: 'tre-provider-certification-singapore',
    title: 'Become a Certified TRE® Provider — Singapore (Modules 1–3)',
    category: 'Certification',
    region: 'singapore',
    location: 'Singapore',
    venue: 'Singapore (venue confirmed on registration)',
    format: 'In-Person + online sessions',
    start: '2026-08-29',
    end: '2027-02-21',
    dateText: 'Aug 2026 – Feb 2027 · Module 1: 29–30 Aug · Module 2: 26–27 Sep · Module 3: 20–21 Feb 2027',
    chip: { top: '3', bottom: 'Modules' },
    image: 'assets/img/events/event-transform-practice.webp',
    description: 'The full Global TRE® Provider Certification — three 2-day workshops plus 12 online sessions. Qualify to offer TRE® to the public in individual and group settings. Bundle from S$3,699.',
    facilitator: 'Isabelle Claus Teixeira, Global TRE® Certifying Trainer',
    credits: '21 ICF CCEUs on Module 1',
    price: 'S$3,699',
    priceNote: 'full bundle · super early bird (early bird S$4,200 · normal S$4,500)',
    link: 'https://www.hummingbeing.com/event-certification.html',
    linkText: 'Join waitlist',
    soldOut: true,
    waitlistLink: CALENDLY,
    theme: 'theme-deep',
    details: {
      summary: 'Transform your practice. Empower others. The complete Global TRE® Provider Certification with Isabelle Claus Teixeira — three modules that take you from your own TRE® practice to confidently teaching TRE® to individuals and groups.',
      about: [
        'The Global TRE® Provider Certification prepares you to teach TRE® safely, responsibly and professionally. Certified Providers are qualified to offer TRE® to the general public in both individual and group settings.',
        'The journey is three modules — each a 2-day workshop plus 4 online sessions — taking you from your own personal TRE® practice (Module 1), to teaching one person (Module 2), to confidently leading groups (Module 3).',
        'You train under Isabelle Claus Teixeira, Global TRE® Certifying Trainer, accredited by TRE® for All under Dr. David Berceli\'s methodology. Module 1 is also available online.'
      ],
      forWho: [
        'A coach (ACC, PCC, MCC or in training) wanting somatic tools',
        'A therapist, counsellor or psychologist seeking body-based approaches',
        'An HR, wellbeing or corporate resilience professional',
        'A yoga teacher, physiotherapist or movement practitioner',
        'Someone who has experienced TRE® and wants to share it professionally'
      ],
      schedule: [
        { when: 'Module 1', time: '29–30 Aug 2026 · Singapore · SGT', title: 'Your Personal TRE® Practice', text: '2-day workshop + 4 online personal TRE® sessions. The stress response (anatomy, neurology, physiology), the therapeutic tremor response, TRE® as a self-practice, self-regulation, containment and grounding. Includes 21 ICF CCEUs.' },
        { when: 'Module 2', time: '26–27 Sep 2026 · Singapore · SGT', title: 'Teaching TRE® to One Person', text: '2-day workshop + 4 online supervision sessions. Open to those who completed Module 1. Deepens Module 1 content, Polyvagal theory, basic TRE® interventions and hands-on practice teaching TRE® one-to-one.' },
        { when: 'Module 3', time: '20–21 Feb 2027 · Singapore · SGT', title: 'Teaching TRE® to Groups', text: '2-day workshop + 4 online supervision sessions. The role of fascia, advanced interventions and modifications, transference and counter-transference, and experience leading groups of 3+ persons. Completes your certification.' }
      ],
      includes: [
        'Three 2-day workshops — Modules 1, 2 & 3 in Singapore (Module 1 also online)',
        '12 online sessions — 4 personal TRE® sessions + 8 supervision sessions with Isabelle',
        '21 ICF CCEUs on Module 1 — the only TRE® training in the world with ICF accreditation',
        'All training materials and manual — plus ongoing mentorship through completion',
        'Global TRE® Provider certificate — issued by TRE® for All on qualification',
        'Global provider network — join the TRE® for All community of practitioners worldwide'
      ],
      pricing: [
        { label: 'Full Certification Journey', sub: 'Modules 1, 2 & 3 · three 2-day workshops + 12 online sessions', price: 'S$3,699', note: 'super early bird · early bird S$4,200 · normal S$4,500', hl: true },
        { label: 'Module 1 only · face-to-face', sub: '2-day workshop + 4 online personal TRE® sessions · 21 ICF CCEUs', price: 'S$1,290', note: 'super early bird · early bird S$1,500 · normal S$1,800' },
        { label: 'Module 1 only · online', sub: 'Live online workshop + 4 online personal TRE® sessions', price: 'S$990', note: 'early bird · normal S$1,190' }
      ],
      pricingNote: 'All prices in Singapore Dollars. Early-bird deadlines are relative to the Module 1 start date. All tickets are non-refundable and non-cancellable.',
      facilitators: [ISABELLE],
      online: true,
      register: [
        { label: 'Register your interest', url: 'https://www.hummingbeing.com/event-certification.html', primary: true },
        { label: 'Book a certification intake call', url: CALENDLY }
      ],
      source: 'https://www.hummingbeing.com/event-certification.html'
    }
  },

  /* ---------- Module 2, Singapore ---------- */
  {
    slug: 'tre-module-2-singapore',
    title: 'TRE® Module 2 — Teaching TRE® to One Person',
    category: 'Certification',
    region: 'singapore',
    location: 'Singapore',
    venue: 'Singapore (venue confirmed on registration)',
    format: 'In-Person',
    start: '2026-09-26',
    end: '2026-09-27',
    dateText: 'Saturday 26 – Sunday 27 September 2026',
    timeText: 'Two full days · followed by 4 online supervision sessions',
    chip: { top: '26–27', bottom: 'Sep 2026' },
    image: 'assets/img/events/event-transform-practice.webp',
    description: 'Module 2 of the Global TRE® Provider Certification. Deepens Module 1 content, Polyvagal theory, basic TRE® interventions and hands-on practice teaching TRE® one-to-one. Open to those who completed Module 1.',
    facilitator: 'Isabelle Claus Teixeira',
    priceText: 'Part of the certification bundle (from S$3,699)',
    link: 'https://www.hummingbeing.com/event-certification.html',
    linkText: 'Enquire',
    theme: 'theme-deep',
    details: {
      summary: 'The second step of the Global TRE® Provider Certification: from your own practice to guiding one other person safely through TRE®.',
      about: [
        'Module 2 is a 2-day workshop plus 4 online supervision sessions, open to participants who have completed Module 1 (in Singapore, online, or in Bucharest).',
        'It deepens the Module 1 content and adds Polyvagal theory, basic TRE® interventions and hands-on practice teaching TRE® to an individual client — with feedback from your Certifying Trainer.'
      ],
      forWho: [
        'Participants who have completed TRE® Module 1',
        'Coaches, therapists and practitioners continuing toward the full Global TRE® Provider Certification'
      ],
      schedule: [
        { when: 'Sat 26 Sep', time: 'Singapore · SGT', title: 'Module 2 — Day 1', text: 'Review of the stress response and tremor mechanism, Polyvagal theory, and the basic TRE® interventions used when teaching one person.' },
        { when: 'Sun 27 Sep', time: 'Singapore · SGT', title: 'Module 2 — Day 2', text: 'Supervised practice delivering TRE® one-to-one, containment and grounding techniques, and preparation for the 4 online supervision sessions that follow.' }
      ],
      includes: [
        '2-day in-person workshop in Singapore',
        '4 online supervision sessions with Isabelle after the workshop',
        'Progress toward the Global TRE® Provider certificate issued by TRE® for All'
      ],
      pricing: [
        { label: 'Full Certification Journey', sub: 'Modules 1, 2 & 3 · three 2-day workshops + 12 online sessions', price: 'S$3,699', note: 'super early bird · early bird S$4,200 · normal S$4,500', hl: true }
      ],
      pricingNote: 'Module 2 is priced as part of the certification bundle. Contact Isabelle for single-module pricing if you completed Module 1 elsewhere. All tickets are non-refundable and non-cancellable.',
      facilitators: [ISABELLE],
      online: false,
      register: [
        { label: 'Enquire about Module 2', url: 'https://www.hummingbeing.com/event-certification.html', primary: true },
        { label: 'Book a certification intake call', url: CALENDLY }
      ],
      source: 'https://www.hummingbeing.com/event-certification.html'
    }
  },

  /* ---------- From Shaking to Shaping — Bucharest (in-person) ---------- */
  {
    slug: 'from-shaking-to-shaping-bucharest',
    title: 'From Shaking to Shaping — Use of TRE® in a Coaching Context',
    category: 'Workshop',
    region: 'international',
    location: 'Bucharest, Romania',
    venue: 'Bucharest, Romania',
    format: 'In-Person · English & Romanian',
    start: '2026-10-20T19:00',
    end: '2026-10-24',
    dateText: 'Tuesday 20 October & Saturday 24 October 2026',
    timeText: '20 Oct: 19:00–22:00 EET · 24 Oct: 14:30–17:30 EET',
    chip: { top: '20 · 24', bottom: 'Oct 2026' },
    image: 'assets/img/events/event-shaking-to-shaping.webp',
    description: 'A half-day intensive on integrating TRE® into your coaching practice — neurogenic tremoring as a somatic tool for nervous system regulation and embodied presence. Two in-person sessions in Bucharest, România.',
    facilitator: 'Isabelle Claus Teixeira & Saymara Ryon',
    price: '€97',
    priceNote: 'per participant · free with TRE® Module 1 registration',
    link: 'https://www.atelierdesuflet.ro/training-workshops-retrreat-tre/from-shaking-to-shaping-use-of-tre-in-a-coaching-context-35.html',
    linkText: 'Buy tickets',
    theme: 'theme-bronze',
    details: {
      summary: 'Use of TRE® in a coaching context — a half-day intensive exploring how neurogenic tremoring can deepen your somatic presence, prevent burnout and transform the way you work with clients. Taught in English; in-person sessions also facilitated in Romanian.',
      about: [
        'TRE® (Tension, Stress & Trauma Releasing Exercises) activates the body\'s natural tremoring response — a neurogenic mechanism that discharges accumulated stress, tension and trauma from the nervous system.',
        'In this workshop you explore how to use TRE® within your coaching practice — not just as a self-care tool, but as a somatic method that helps clients move from a state of activation to regulated presence, from trembling uncertainty to purposeful, embodied action.',
        'Each session is a standalone half-day intensive. The 3 September online session has now taken place — see the archived online session for details.'
      ],
      forWho: [
        'Coaches who want to integrate TRE® into 1-on-1 and group coaching contexts',
        'Practitioners looking for somatic self-care practices to prevent compassion fatigue and burnout',
        'Anyone considering TRE® Module 1 in Bucharest (15–17 Oct 2026) — this workshop is free with Module 1 registration'
      ],
      schedule: [
        { when: 'Session 1', time: '20 Oct 2026 · 19:00–22:00 EET · Bucharest', title: 'In-person · English & Romanian', text: '€97 per participant. Free if you register for TRE® Module 1 (March 2027 cohort) or the full certification on the same cohort.' },
        { when: 'Session 2', time: '24 Oct 2026 · 14:30–17:30 EET · Bucharest', title: 'In-person · English & Romanian', text: '€97 per participant. Free if you register for TRE® Module 1 (March 2027 cohort) or the full certification on the same cohort.' }
      ],
      includes: [
        'The neuroscience behind neurogenic tremoring and nervous system regulation',
        'How to integrate TRE® into 1-on-1 and group coaching contexts',
        'Somatic self-care practices to prevent compassion fatigue and burnout',
        'Embodied presence and body-led listening skills as a coach',
        'A full TRE® session experience guided by a Global TRE® Certifying Trainer'
      ],
      pricing: [
        { label: 'Bucharest · 20 Oct 2026', sub: '19:00–22:00 EET', price: '€97', note: 'per participant', hl: true },
        { label: 'Bucharest · 24 Oct 2026', sub: '14:30–17:30 EET', price: '€97', note: 'per participant', hl: true }
      ],
      pricingNote: 'Free if you register for TRE® Module 1 or the full TRE® certification on the same cohort. All tickets are non-refundable and non-cancellable.',
      facilitators: [ISABELLE, SAYMARA],
      partners: 'In collaboration with Învață să Zbori SRL (Learn to Fly) · TRE® România · HummingBeing',
      online: false,
      register: [
        { label: 'Buy tickets (Atelier de Suflet)', url: 'https://www.atelierdesuflet.ro/training-workshops-retrreat-tre/from-shaking-to-shaping-use-of-tre-in-a-coaching-context-35.html', primary: true },
        { label: 'Reserve by email', url: 'mailto:isabelle@bhdasia.com?subject=From%20Shaking%20to%20Shaping%20%E2%80%94%20Bucharest' },
        { label: 'Event page on HummingBeing', url: 'https://www.hummingbeing.com/event-shaking-to-shaping.html' }
      ],
      source: 'https://www.hummingbeing.com/event-shaking-to-shaping.html'
    }
  },

  /* ---------- From Shaking to Shaping — Online (3 Sep 2026, past) ---------- */
  {
    slug: 'from-shaking-to-shaping-online-sep3',
    title: 'From Shaking to Shaping — Online (3 September 2026)',
    category: 'Workshop',
    region: 'online',
    location: 'Online',
    venue: 'Zoom',
    format: 'Live online · English',
    start: '2026-09-03T10:00',
    end: '2026-09-03',
    dateText: 'Thursday 3 September 2026',
    timeText: '10:00–13:00 EET (Eastern European Time)',
    chip: { top: '3', bottom: 'Sep 2026' },
    image: 'assets/img/events/event-shaking-to-shaping.webp',
    description: 'The 3 September 2026 online session of From Shaking to Shaping — use of TRE® in a coaching context, co-facilitated by Isabelle Claus Teixeira & Saymara Ryon. Fully booked; this session has now taken place.',
    facilitator: 'Isabelle Claus Teixeira & Saymara Ryon',
    price: '€89',
    priceNote: 'per participant · sold out',
    soldOut: true,
    link: 'https://www.hummingbeing.com/event-shaking-to-shaping-sep3.html',
    linkText: 'View event',
    theme: 'theme-bronze',
    details: {
      summary: 'The 3 September 2026 online session of From Shaking to Shaping — a half-day intensive on using TRE® in a coaching context. This session was fully booked and has now taken place; the in-person Bucharest sessions (20 & 24 October 2026) are still open.',
      about: [
        'TRE® (Tension, Stress & Trauma Releasing Exercises) activates the body\'s natural tremoring response — a neurogenic mechanism that discharges accumulated stress, tension and trauma from the nervous system.',
        'In this workshop you explore how to use TRE® within your coaching practice — not just as a self-care tool, but as a somatic method that helps clients move from a state of activation to regulated presence.',
        'This online session took place on 3 September 2026 (10:00–13:00 EET) and was fully booked. For the next opportunity, see the in-person Bucharest sessions or our upcoming events.'
      ],
      forWho: [
        'Coaches who want to integrate TRE® into 1-on-1 and group coaching contexts',
        'Practitioners looking for somatic self-care practices to prevent compassion fatigue and burnout',
        'Anyone considering TRE® Module 1 in Bucharest (15–17 Oct 2026)'
      ],
      schedule: [
        { when: '3 Sep 2026', time: '10:00–13:00 EET · Online (English)', title: 'Completed', text: '€89 per participant. This session was fully booked and has now taken place.' }
      ],
      includes: [
        'The neuroscience behind neurogenic tremoring and nervous system regulation',
        'How to integrate TRE® into 1-on-1 and group coaching contexts',
        'Somatic self-care practices to prevent compassion fatigue and burnout',
        'Embodied presence and body-led listening skills as a coach',
        'A full TRE® session experience guided by a Global TRE® Certifying Trainer'
      ],
      pricing: [
        { label: 'Online session · 3 Sep 2026', sub: '10:00–13:00 EET', price: '€89', note: 'sold out — event ended', soldOut: true }
      ],
      pricingNote: 'This session has ended. All tickets were non-refundable and non-cancellable.',
      facilitators: [ISABELLE, SAYMARA],
      partners: 'In collaboration with Învață să Zbori SRL (Learn to Fly) · TRE® România · HummingBeing',
      online: true,
      register: [
        { label: 'See upcoming events', url: 'events.html', primary: true },
        { label: 'Bucharest sessions (20 & 24 Oct)', url: 'event.html?id=from-shaking-to-shaping-bucharest' }
      ],
      source: 'https://www.hummingbeing.com/event-shaking-to-shaping-sep3.html'
    }
  },

  /* ---------- From Shaking to Shaping — Live online ---------- */
  {
    slug: 'from-shaking-to-shaping-online',
    title: 'From Shaking to Shaping — Live Online Workshop',
    category: 'Workshop',
    region: 'online',
    location: 'Online',
    venue: 'Zoom (joining details sent on registration)',
    format: 'Live online',
    start: '2026-10-08T19:00',
    dateText: 'Thursday 8 October 2026',
    timeText: '7:00 – 9:00pm (confirm your time zone on registration)',
    image: 'assets/img/events/event-shaking-online.webp',
    description: 'A live online workshop on using TRE® in a coaching context — nervous system regulation, embodied presence and resilience. Co-led by Isabelle Claus Teixeira & Saymara Ryon, in partnership with Neurogenic Integration.',
    facilitator: 'Isabelle Claus Teixeira & Saymara Ryon',
    priceText: 'Registration via Neurogenic Integration',
    link: 'https://neurogenic-integration.com/',
    linkText: 'Register',
    isNew: true,
    theme: 'theme-orange',
    details: {
      summary: 'Discover how TRE® and self-induced neurogenic tremoring can become powerful tools within your coaching practice — supporting nervous system regulation, embodied presence and lasting resilience for you and your clients. Join live from anywhere in the world.',
      about: [
        'This live online session is co-facilitated by Isabelle Claus Teixeira and Saymara Ryon, and hosted in partnership with Neurogenic Integration.',
        'You will understand the neuroscience of tremoring and nervous system regulation, explore how somatic tools deepen presence and rapport in coaching, and experience a guided practice you can bring into your own work.',
        'Registration is handled by Neurogenic Integration. You can also leave your details with HummingBeing and receive the link and joining details.'
      ],
      forWho: [
        'Coaches (in training or at ACC, PCC and MCC level) curious about somatic tools',
        'Practitioners who want to bring TRE® into coaching conversations',
        'Anyone who prefers to join online, from any country'
      ],
      schedule: [
        { when: 'Thu 8 Oct', time: '7:00 – 9:00pm · Zoom', title: 'From Shaking to Shaping — live online', text: 'Neuroscience of tremoring and regulation · somatic tools for presence and rapport · a guided TRE® practice you can use in your own work · Q&A with both facilitators.' }
      ],
      includes: [
        'Understand the neuroscience of tremoring and nervous system regulation',
        'Explore how somatic tools deepen presence and rapport in coaching',
        'Experience a guided practice you can bring into your own work',
        'Join live online from anywhere in the world'
      ],
      pricing: [],
      pricingNote: 'Ticketing and pricing are published by Neurogenic Integration. All tickets are non-refundable and non-cancellable.',
      facilitators: [ISABELLE, SAYMARA],
      partners: 'Hosted in partnership with Neurogenic Integration',
      online: true,
      register: [
        { label: 'Register at Neurogenic Integration', url: 'https://neurogenic-integration.com/', primary: true },
        { label: 'Enquire via HummingBeing', url: 'https://www.hummingbeing.com/event-shaking-online.html' }
      ],
      source: 'https://www.hummingbeing.com/event-shaking-online.html'
    }
  },

  /* ---------- TRE Module 1 — Bucharest ---------- */
  {
    slug: 'tre-module-1-bucharest',
    title: 'TRE® Module 1 — Bucharest, Romania (in English)',
    category: 'Certification',
    region: 'international',
    location: 'Bucharest, Romania',
    venue: 'Bucharest, Romania',
    format: 'In-Person · 3 days',
    start: '2026-10-15T17:00',
    end: '2026-10-17',
    dateText: 'Thursday 15 – Saturday 17 October 2026',
    timeText: '15 Oct 17:00–19:00 · 16 & 17 Oct 09:00–18:00 (EET)',
    chip: { top: '15–17', bottom: 'Oct 2026' },
    image: 'assets/img/events/event-bucharest-module1.webp',
    description: 'A 3-day immersive certification — the first TRE® Module 1 in Europe in English and the only TRE® training in the world with ICF accreditation. Valid as Module 1 of the Global TRE® Provider Certification. Only 20 places.',
    facilitator: 'Isabelle Claus Teixeira & Saymara Ryon',
    credits: '21 ICF CCEUs',
    price: 'From €739',
    priceNote: 'per person · tiers rise as tickets sell (€739 · €769 · €799)',
    link: 'https://www.atelierdesuflet.ro/tre-module-1-bucharest-romania-21-icf-cceus-only-tre-training-in-the-world-with-icf-accreditation.html',
    linkText: 'Buy tickets',
    theme: 'theme-deep',
    details: {
      summary: 'A 3-day immersive certification training — valid as Module 1 of the Global TRE® Provider Certification Program. Learn to use and teach Tension & Trauma Releasing Exercises under two internationally certified trainers. Ideal for Singapore-based practitioners travelling in Europe.',
      about: [
        'This is the first ICF-accredited TRE® Module 1 in Europe — the only TRE® training anywhere in the world that carries ICF CCEUs (21 CCEUs: 16 Resource Development + 5 Core Competencies).',
        'TRE® (Tension, Stress & Trauma Releasing Exercises) was developed by Dr. David Berceli and activates the body\'s natural neurogenic tremoring mechanism — a reflex that releases stored stress and trauma from the nervous system, builds resilience and promotes deep regulation.',
        'Completing Module 1 qualifies you to use TRE® for personal practice. Combined with Modules 2 and 3, you become a Certified Global TRE® Provider — accredited to offer TRE® to individuals and groups.'
      ],
      forWho: [
        'A coach (in training or at ACC, PCC, MCC level) looking for an ICF-accredited somatic tool',
        'A therapist, psychologist or healthcare professional wanting to expand your trauma-informed practice',
        'A yoga teacher, bodyworker or somatic practitioner adding neuroscience-backed tools',
        'Anyone experiencing chronic stress, burnout or trauma and ready for a body-led approach to healing',
        'Those considering the full Global TRE® Provider Certification (Modules 1, 2 & 3)'
      ],
      schedule: [
        { when: 'Day 1 · 15 Oct', time: '17:00–19:00 EET', title: 'Introductory Evening: Self-Care and Presence for Coaches', text: 'An introductory evening on nervous system regulation and self-induced therapeutic tremoring, designed for coaches. This session counts as the "From Shaking to Shaping" workshop experience when combined with Module 1 registration.' },
        { when: 'Day 2 · 16 Oct', time: '09:00–18:00 EET', title: 'TRE® Module 1 — Full Certification Day', text: 'The neuroscience of neurogenic tremoring, the TRE® exercise sequence, somatic awareness, containment and grounding practices. Guided full TRE® sessions with direct feedback from your trainers.' },
        { when: 'Day 3 · 17 Oct', time: '09:00–18:00 EET', title: 'TRE® Module 1 — Continued & Completion', text: 'Deepen your practice, integrate the learning and complete Module 1 requirements. Q&A, personal practice time and guidance on continuing toward Modules 2 and 3. Certificate of completion issued.' }
      ],
      includes: [
        'Module 1 Certification — valid as Module 1 of the Global TRE® Provider Certification Program',
        '21 ICF CCEUs — 16 Resource Development + 5 Core Competencies (ICF-accredited)',
        '3 full training days — including the evening workshop on Day 1',
        'Co-facilitation — taught by two internationally certified TRE® trainers, in English',
        'Global certification recognition under the Global TRE® Certification Program'
      ],
      pricing: [
        { label: 'Super Early Bird', sub: 'First 5 tickets · limited, sells first', price: '€739', note: 'per person', hl: true },
        { label: 'Early Bird', sub: 'Next 5 tickets', price: '€769', note: 'per person' },
        { label: 'Full Price', sub: 'Final 10 tickets', price: '€799', note: 'per person' }
      ],
      pricingNote: 'Only 20 places. Prices step up automatically as each block of tickets sells — register early to secure the lowest tier. A single registration form and QR code are provided on confirmation. All tickets are non-refundable and non-cancellable.',
      facilitators: [ISABELLE, SAYMARA],
      partners: 'In collaboration with Învață să Zbori SRL (Learn to Fly) · TRE® România · HummingBeing',
      online: false,
      register: [
        { label: 'Buy tickets — official webshop', url: 'https://www.atelierdesuflet.ro/tre-module-1-bucharest-romania-21-icf-cceus-only-tre-training-in-the-world-with-icf-accreditation.html', primary: true },
        { label: 'Register via Isabelle (email)', url: 'mailto:isabelle@bhdasia.com?subject=TRE%20Module%201%20%E2%80%94%20Bucharest%2015%E2%80%9317%20Oct%202026' },
        { label: 'Book a call via Calendly', url: CALENDLY }
      ],
      source: 'https://www.hummingbeing.com/event-tre-module1-bucharest.html'
    }
  },

  /* ---------- Module 3, Singapore ---------- */
  {
    slug: 'tre-module-3-singapore',
    title: 'TRE® Module 3 — Teaching TRE® to Groups',
    category: 'Certification',
    region: 'singapore',
    location: 'Singapore',
    venue: 'Singapore (venue confirmed on registration)',
    format: 'In-Person',
    start: '2027-02-20',
    end: '2027-02-21',
    dateText: 'Saturday 20 – Sunday 21 February 2027',
    timeText: 'Two full days · followed by 4 online supervision sessions',
    chip: { top: '20–21', bottom: 'Feb 2027' },
    image: 'assets/img/events/event-transform-practice.webp',
    description: 'Module 3 of the Global TRE® Provider Certification. The role of fascia, advanced interventions and modifications, transference and counter-transference, and experience leading groups of 3+ people. Completes your certification.',
    facilitator: 'Isabelle Claus Teixeira',
    priceText: 'Part of the certification bundle (from S$3,699)',
    link: 'https://www.hummingbeing.com/event-certification.html',
    linkText: 'Enquire',
    theme: 'theme-deep',
    details: {
      summary: 'The final module of the Global TRE® Provider Certification: leading TRE® for groups with confidence, and completing your qualification as a Certified Provider.',
      about: [
        'Module 3 is a 2-day workshop plus 4 online supervision sessions, open to participants who have completed Module 2.',
        'It covers the role of fascia, advanced interventions and modifications, transference and counter-transference, and gives you supervised experience leading groups of three or more people. On completion you receive the Global TRE® Provider certificate issued by TRE® for All.'
      ],
      forWho: [
        'Participants who have completed TRE® Modules 1 and 2',
        'Practitioners who want to offer TRE® group sessions, workshops and corporate programmes'
      ],
      schedule: [
        { when: 'Sat 20 Feb', time: 'Singapore · SGT', title: 'Module 3 — Day 1', text: 'Fascia and the tremor mechanism, advanced interventions and modifications, transference and counter-transference in group settings.' },
        { when: 'Sun 21 Feb', time: 'Singapore · SGT', title: 'Module 3 — Day 2', text: 'Supervised practice leading groups of 3+ people, safety and containment for groups, and completion of certification requirements.' }
      ],
      includes: [
        '2-day in-person workshop in Singapore',
        '4 online supervision sessions with Isabelle after the workshop',
        'Global TRE® Provider certificate issued by TRE® for All on qualification'
      ],
      pricing: [
        { label: 'Full Certification Journey', sub: 'Modules 1, 2 & 3 · three 2-day workshops + 12 online sessions', price: 'S$3,699', note: 'super early bird · early bird S$4,200 · normal S$4,500', hl: true }
      ],
      pricingNote: 'Module 3 is priced as part of the certification bundle. All tickets are non-refundable and non-cancellable.',
      facilitators: [ISABELLE],
      online: false,
      register: [
        { label: 'Enquire about Module 3', url: 'https://www.hummingbeing.com/event-certification.html', primary: true },
        { label: 'Book a certification intake call', url: CALENDLY }
      ],
      source: 'https://www.hummingbeing.com/event-certification.html'
    }
  },

  /* ---------- Past events ---------- */
  {
    slug: 'nervous-system-regulation-coaches-singapore',
    title: 'Nervous System Regulation & Self-Induced Neurogenic Tremoring — For Coaches',
    category: 'Workshop',
    region: 'singapore',
    location: 'Singapore',
    venue: 'Singapore',
    format: 'In-Person',
    start: '2026-08-29',
    end: '2026-08-30',
    dateText: '29 & 30 August 2026',
    chip: { top: '29–30', bottom: 'Aug 2026' },
    image: 'assets/img/events/event-nervous-system.webp',
    description: 'Self-care and presence for coaches — a 2-day ICF-accredited TRE® workshop (21 CCEUs), valid as Module 1 of the Global TRE® Provider Certification. Sold out.',
    facilitator: 'Isabelle Claus Teixeira',
    credits: '21 ICF CCEUs · 16 Resource Development + 5 Core Competencies',
    price: 'S$1,290',
    priceNote: 'ICF special price (early bird S$1,500 · normal S$1,800)',
    soldOut: true,
    waitlistLink: 'https://www.hummingbeing.com/event-selfcare-coaches-singapore.html',
    link: 'https://www.hummingbeing.com/event-selfcare-coaches-singapore.html',
    theme: 'theme-bronze',
    details: {
      summary: 'A 2-day in-person TRE® workshop for coaches — develop embodied self-care, prevent burnout and deepen your somatic presence with clients. Valid as Module 1 of the Global TRE® Provider Certification Program.',
      about: [
        'Designed specifically for coaches — whether in training or at ACC, PCC or MCC level — who want to develop embodied self-care practices, prevent burnout and compassion fatigue, and deepen their somatic presence with clients.',
        'TRE® activates the body\'s natural neurogenic tremoring response — a reflex that discharges stored stress and tension from the nervous system, builds resilience and promotes deep regulation.',
        'This workshop counted as Module 1 of the Global TRE® Provider Certification Program — the first step toward becoming a Certified TRE® Provider. It sold out; the next Module 1 runs in Bucharest on 15–17 October 2026, and the Singapore certification continues with Module 2 on 26–27 September 2026.'
      ],
      forWho: [
        'Coaches in training and ACC, PCC & MCC level coaches',
        'Those looking to prevent and recover from compassion fatigue and burnout',
        'Those wanting a body-led modality for deep nervous system resilience',
        'Coaches considering the full Global TRE® Provider Certification (Modules 1, 2 & 3)'
      ],
      schedule: [
        { when: 'Day 1 · 29 Aug', time: 'Saturday · SGT', title: 'TRE® Module 1 — Part 1', text: 'Introduction to TRE® and the neuroscience of neurogenic tremoring. Guided full TRE® session and somatic awareness practices. Personal resilience tools for coaches and helping professionals.' },
        { when: 'Day 2 · 30 Aug', time: 'Sunday · SGT', title: 'TRE® Module 1 — Part 2 & Completion', text: 'Deepening the practice, integration and completion of Module 1 requirements. Guidance on continuing toward Modules 2 and 3. Certificate of completion issued.' }
      ],
      includes: [
        '2-day ICF certified workshop — in person in Singapore',
        '4 personal online TRE® sessions with Isabelle after the workshop',
        '16 Resource Development CCEUs + 5 Core Competency CCEUs (21 total)',
        'Module 1 certification — valid toward the Global TRE® Provider Certification'
      ],
      pricing: [
        { label: 'ICF special price', sub: 'until 15 August 2026', price: 'S$1,290', note: 'early bird S$1,500 until 31 Jul · normal S$1,800', hl: true, soldOut: true }
      ],
      pricingNote: 'This event is sold out. Join the waitlist on HummingBeing to be notified of releases or the next date.',
      facilitators: [ISABELLE],
      online: false,
      register: [
        { label: 'Join the waitlist', url: 'https://www.hummingbeing.com/event-selfcare-coaches-singapore.html', primary: true },
        { label: 'See the next Module 1 (Bucharest)', url: 'event.html?id=tre-module-1-bucharest' }
      ],
      source: 'https://www.hummingbeing.com/event-selfcare-coaches-singapore.html'
    }
  },
  {
    slug: 'internal-alchemy-singapore',
    title: 'Internal Alchemy — Introductory Workshop',
    category: 'Workshop',
    region: 'singapore',
    location: 'Singapore',
    venue: 'Singapore',
    format: 'In-Person',
    start: '2026-09-01T19:00',
    dateText: 'Tuesday 1 September 2026',
    timeText: '7:00 – 9:00pm SGT',
    image: 'assets/img/events/event-internal-alchemy.webp',
    description: 'First time in Singapore. Breathwork, fascial release, grounding and tremor work with Simba Stenqvist, Global TRE® Certifying Trainer and creator of Internal Alchemy.',
    facilitator: 'Simba Stenqvist',
    price: 'S$79',
    priceNote: '2-hour introductory workshop',
    link: 'https://www.hummingbeing.com/event-internal-alchemy.html',
    theme: 'theme-orange',
    details: {
      summary: 'An integrated system combining breathwork, fascial release, grounding and tremor work — restoring the nervous system at the level where tension actually lives. Led by Simba Stenqvist, first time in Singapore.',
      about: [
        'Internal Alchemy is an integrated system combining breathwork, fascial release, grounding and tremor work — restoring the nervous system at the level where tension actually lives.',
        'It brings more than twenty-five years of hands-on practice in bodywork, nervous system regulation and energetic healing into one integrated system, developed in close collaboration with Dr David Berceli, founder of TRE®.'
      ],
      forWho: [
        'Anyone curious about breathwork, fascial release and tremor work',
        'TRE® practitioners and trainees who want to experience a complementary somatic system'
      ],
      schedule: [
        { when: 'Tue 1 Sep', time: '7:00 – 9:00pm SGT · Singapore', title: 'Internal Alchemy — introductory evening', text: 'Breathwork · fascial release · grounding · tremor work, guided by Simba Stenqvist.' }
      ],
      includes: ['2-hour in-person introductory workshop in Singapore'],
      pricing: [{ label: 'Introductory workshop', sub: '1 September 2026 · 7–9pm · Singapore', price: 'S$79', note: 'per person', hl: true }],
      pricingNote: 'All tickets are non-refundable and non-cancellable.',
      facilitators: [{
        name: 'Simba Stenqvist',
        role: 'Global TRE® Certifying Trainer · Creator of Internal Alchemy',
        bio: 'Global TRE® Certifying Trainer and the creator of Internal Alchemy — a system born from more than twenty-five years of hands-on practice in bodywork, nervous system regulation and energetic healing, developed in close collaboration with Dr David Berceli, founder of TRE®. His official practice is Living with the Spirit.',
        link: 'https://livingwiththespirit.com/', linkText: 'livingwiththespirit.com'
      }],
      online: false,
      register: [{ label: 'Event page on HummingBeing', url: 'https://www.hummingbeing.com/event-internal-alchemy.html', primary: true }],
      source: 'https://www.hummingbeing.com/event-internal-alchemy.html'
    }
  }
];
