/* =========================================================
   FACILITATORS DATA — one object per facilitator. Used by:
     • facilitators.html — the single, filterable grid (order is shuffled on every load)
     • index.html — "Featured facilitators" (a random three on every page load)
     • facilitator.html?id=<id> — the full profile page
   Each entry supports:
     id, name, role, tag, tagClass ("badge-navy" | "badge-gold" | "badge-cream")
     kind         : "trainer" | "provider" | "trainee"  (filter group)
     modes        : ["1:1","Groups","Online","In-person","Corporate","Certification","Workshops"] (filter chips)
     services     : tags shown in the running ticker under the profile hero
     initials, photoClass ("" | "bronze" | "deep"), photo (square), hero (wide photo behind the profile hero)
     bio          : ONE short sentence for cards        summary: lead paragraph for the profile hero
     contact      : { email, whatsapp, book }           website: { url, label }
     socials      : [{ type: "linkedin"|"instagram"|"youtube"|"facebook"|"website", url, label }]
     facts        : { location, languages, formats, certified }
     about[], highlights[], offers[{title,text}], gallery[{src,caption}], events[event slugs]
     meta         : [{ icon: "pin"|"globe"|"award"|"group"|"calendar", text }]   (card bullets)
     sample       : true marks a placeholder profile
   ========================================================= */
var WA = 'https://wa.me/818065151778';
var FAC_IMG = 'assets/img/facilitators/';
var EVT_IMG = 'assets/img/events/';

window.TRE_FACILITATORS = [
  {
    id: 'isabelle-claus-teixeira',
    name: 'Isabelle Claus Teixeira',
    role: 'Global TRE™ Certifying Trainer · ICF PCC Executive Coach · Mindfulness Teacher',
    tag: 'Certifying Trainer', tagClass: 'badge-navy', kind: 'trainer',
    modes: ['1:1', 'Groups', 'Online', 'In-person', 'Corporate', 'Certification', 'Workshops'],
    services: ['TRE™ certification (Modules 1–3)', 'Individual TRE™ sessions', 'Group sessions', 'Corporate resilience programmes', 'Workshops for coaches · 21 ICF CCEUs', 'Executive & somatic coaching', 'Mindfulness', 'Online worldwide', 'English · French · Spanish'],
    initials: 'ICT', photoClass: '', photo: FAC_IMG + 'isabelle-her-story.jpg', hero: FAC_IMG + 'gallery-isabelle-teaching-tre.jpg',
    bio: 'Founder of TRE™ in Singapore; runs the full three-module certification and teaches individuals, groups and organisations.',
    summary: 'Founder of TRE™ in Singapore and HummingBeing. Isabelle runs the Global TRE™ Provider Certification in Singapore, teaches individuals, groups and organisations, and supervises trainees through Modules 1–3 — in person and online.',
    contact: { email: 'mailto:isabelle@bhdasia.com?subject=TRE%20session%20enquiry', whatsapp: WA + '?text=Hi%20Isabelle%2C%20I%27d%20like%20to%20ask%20about%20TRE%E2%84%A2%20in%20Singapore', book: 'https://calendly.com/bhdasia/tre-certification-intake-call' },
    website: { url: 'https://hummingbeing.com', label: 'hummingbeing.com' },
    socials: [
      { type: 'linkedin', url: 'https://www.linkedin.com/in/isabelleclausteixeira/', label: 'LinkedIn' },
      { type: 'instagram', url: 'https://www.instagram.com/isabelleclausteixeira_bhd/', label: 'Instagram' },
      { type: 'youtube', url: 'https://www.youtube.com/@IsabelleClausTeixeira', label: 'YouTube' },
      { type: 'facebook', url: 'https://www.facebook.com/bhdasia/', label: 'Facebook' },
      { type: 'website', url: 'https://bhdasia.com', label: 'BHD Asia' }
    ],
    facts: { location: 'Singapore (in person, regular visits) · Japan · Online worldwide', languages: 'English · French · Spanish · conversational Japanese & German', formats: '1:1 · Groups · Corporate · Certification training', certified: 'Global TRE™ Certifying Trainer (TRE™ For All) · ICF PCC' },
    about: [
      'Isabelle is a somatic and trauma-informed Executive Coach (ICF PCC), Global TRE™ Certifying Trainer and Mindfulness Teacher. She trained directly under Dr. David Berceli, the founder of TRE™, and began her own TRE™ practice in 2017.',
      'After 30 years in senior HR roles across nine countries, working with professionals, executives and teams of more than 40 nationalities, she brings both corporate fluency and deep somatic experience to every session. She founded HummingBeing — science-backed processes with TRE™, coaching and somatic practices — and leads TRE™ in Singapore under Business and Human Development Consulting Pte Ltd.',
      'In Singapore she runs the full Global TRE™ Provider Certification (Modules 1–3), the only TRE™ training in the world that carries ICF CCEUs, and works with individuals, groups and organisations in person and online.'
    ],
    highlights: [
      'Global TRE™ Certifying Trainer, accredited by TRE™ For All under Dr. David Berceli\'s methodology',
      'ICF PCC Executive Coach · Mindfulness Teacher · Certified Reiki Level II',
      'Trained with Dr. David Berceli, Michelle Beck, Ching Meoh Cheong and Donna Philips',
      '30 years in senior HR and leadership roles across 9 countries and 40+ nationalities',
      'Leads TRE™ trainings in Singapore, Bucharest and online; speaker at the TRE™ Asia conferences'
    ],
    offers: [
      { title: 'Individual TRE™ sessions', text: 'One-to-one sessions online or in Singapore — a personalised introduction to TRE™ or deeper ongoing work.' },
      { title: 'Group sessions & corporate programmes', text: 'TRE™ for teams, lunch-and-learns, offsites and resilience programmes for organisations in Singapore.' },
      { title: 'Global TRE™ Provider Certification', text: 'Modules 1–3 in Singapore (Module 1 also online) with 12 online sessions and ongoing supervision.' },
      { title: 'Workshops for coaches', text: 'Nervous system regulation and self-induced neurogenic tremoring for coaches — 21 ICF CCEUs.' }
    ],
    gallery: [
      { src: FAC_IMG + 'gallery-isabelle-teaching-tre.jpg', caption: 'Teaching TRE™ Module 1' },
      { src: FAC_IMG + 'gallery-isabelle-students-module1-may2026.jpg', caption: 'TRE™ Module 1 — May 2026' },
      { src: FAC_IMG + 'gallery-tre-module1-2026.jpg', caption: 'TRE™ Module 1 — January 2026' },
      { src: FAC_IMG + 'gallery-ws-1.jpg', caption: 'TRE™ Module 1 training' },
      { src: FAC_IMG + 'gallery-danang-tre-conference-nov2025.jpg', caption: 'Da Nang TRE™ Conference — November 2025' },
      { src: FAC_IMG + 'gallery-dinner-david-berceli-founders.jpg', caption: 'Dinner with David Berceli, founder of TRE™' },
      { src: FAC_IMG + 'gallery-asia-tre-trainers-david.jpg', caption: 'Asia TRE™ trainers with David Berceli' },
      { src: FAC_IMG + 'gallery-isabelle-vietnam-tre.jpg', caption: 'TRE™ Asia Conference, Vietnam' },
      { src: FAC_IMG + 'gallery-uk-tre-providers.jpg', caption: 'With UK TRE™ provider students' },
      { src: FAC_IMG + 'gallery-ws-2.jpg', caption: 'At the Esplanade, Singapore' },
      { src: FAC_IMG + 'isabelle-global-journey.jpg', caption: '9 countries, 40+ nationalities' },
      { src: FAC_IMG + 'isabelle-her-story.jpg', caption: 'Isabelle Claus Teixeira' }
    ],
    events: ['tre-provider-certification-singapore', 'tre-module-2-singapore', 'from-shaking-to-shaping-online', 'tre-module-1-bucharest', 'from-shaking-to-shaping-bucharest', 'tre-module-3-singapore'],
    meta: [
      { icon: 'pin', text: 'Singapore · Japan · Online worldwide' },
      { icon: 'globe', text: 'English · French · Spanish' },
      { icon: 'award', text: 'Trained directly under Dr. David Berceli' }
    ]
  },
  {
    id: 'yan',
    name: 'Yan Lau',
    role: 'Holistic Healing & Wellness Facilitator · Certified TRE™ Provider',
    tag: 'Certified Provider', tagClass: 'badge-navy', kind: 'provider',
    modes: ['1:1', 'Groups', 'Workshops', 'In-person', 'Online'],
    services: ['TRE™', 'Family Constellations', 'Brainspotting & Expressive Art', 'PSYCH-K® & NLP', 'Themed workshops', '1:1 integrated sessions', 'Subconscious healing', 'West Singapore · Online'],
    initials: 'Y', photoClass: '', photo: FAC_IMG + 'yan.webp',
    bio: 'Holistic facilitator blending Family Constellations, Brainspotting, TRE™ and PSYCH-K® to clear subconscious blocks and heal generational patterns.',
    summary: 'Helping you clear subconscious blocks, heal generational patterns, and step into authentic happiness and love. Through an integrative, mind-body approach, Yan holds a safe, transformative space to process trauma, release tension and create lasting emotional balance.',
    contact: { email: 'mailto:blooms.n.beyond.love@gmail.com?subject=Session%20enquiry%20%E2%80%94%20Blooms%20n%20Beyond', whatsapp: 'https://wa.me/6588560573?text=Hi%20Yan%2C%20I%27d%20like%20to%20ask%20about%20a%20session', book: 'https://wa.me/6588560573?text=Hi%20Yan%2C%20I%27d%20like%20to%20book%20a%20session' },
    website: { url: 'https://www.instagram.com/blooms.n.beyond/', label: '@blooms.n.beyond' },
    socials: [ { type: 'instagram', url: 'https://www.instagram.com/blooms.n.beyond/', label: '@blooms.n.beyond' } ],
    facts: { location: 'West Singapore · In-person & online', languages: 'English', formats: '1:1 integrated sessions · Themed workshops', certified: 'Certified in TRE™, PSYCH-K® & NLP' },
    about: [
      'Yan is a holistic healing and wellness facilitator helping people clear subconscious blocks, heal generational patterns and step into authentic happiness and love. Her work combines a mind-body approach with a safe, transformative space to process trauma, release tension and create lasting emotional balance.',
      'In her 1:1 integrated private sessions she tailors one or two modalities to your unique needs — from Family Constellations and Brainspotting to TRE™, PSYCH-K® and NLP — and she runs themed group workshops on relationship healing, subconscious alignment, emotional regulation and self-discovery. She practises as Blooms n Beyond.'
    ],
    highlights: [
      'Family Constellations — heals systemic family dynamics and generational patterns',
      'Brainspotting & Expressive Art — processes deep-seated trauma via somatic and creative pathways',
      'TRE™ (Tension & Trauma Releasing Exercises) — somatic tremoring to release nervous-system stress',
      'PSYCH-K® & NLP — rewires limiting subconscious beliefs and communication patterns'
    ],
    offers: [
      { title: '1:1 Integrated Private Sessions', text: 'Deeply customised sessions combining one or two tailored modalities based on your unique needs.' },
      { title: 'Family Constellations', text: 'Uncover and heal systemic family dynamics and generational patterns affecting your relationships and wellbeing.' },
      { title: 'Brainspotting & Expressive Art', text: 'Process deep-seated trauma and access implicit memory through visual, somatic and creative pathways.' },
      { title: 'TRE™ sessions', text: 'Somatic tremoring techniques to safely release physical tension and nervous-system stress.' },
      { title: 'PSYCH-K® & NLP', text: 'Rewire limiting subconscious beliefs and communication patterns to align with self-love, joy and fulfilment.' },
      { title: 'Themed Workshops', text: 'Group experiences focused on relationship healing, subconscious alignment, emotional regulation and self-discovery.' }
    ],
    gallery: [],
    meta: [
      { icon: 'pin', text: 'West Singapore · In-person & online' },
      { icon: 'group', text: '1:1 integrated sessions · Themed workshops' },
      { icon: 'award', text: 'TRE™ · Family Constellations · Brainspotting · PSYCH-K® · NLP' }
    ]
  },
  {
    id: 'nikki-tay',
    name: 'Nikki Tay',
    role: 'Certified TRE™ Provider · MEd Special Education',
    tag: 'Certified Provider', tagClass: 'badge-navy', kind: 'provider',
    modes: ['1:1', 'Groups', 'In-person', 'Online'],
    services: ['TRE™ sessions', 'Gentle body-based practice', 'Nervous-system settling', 'Special-education background', 'Neurodivergent-friendly', 'Singapore'],
    initials: 'NT', photoClass: 'deep', photo: FAC_IMG + 'nikki-tay.webp',
    bio: 'Certified TRE™ Provider drawing on nearly three decades in early-childhood and special education to offer a gentle, body-based way to release tension.',
    summary: 'After almost three decades in early childhood and special education — supporting children, families and neurodivergent individuals — Nikki offers TRE™ as a gentle, body-based practice that helps people release tension, feel more settled and reconnect with themselves.',
    contact: { email: 'mailto:steadyessentials@gmail.com?subject=TRE%E2%84%A2%20session%20enquiry', whatsapp: 'https://wa.me/6590266965?text=Hi%20Nikki%2C%20I%27d%20like%20to%20ask%20about%20a%20TRE%E2%84%A2%20session', book: 'https://wa.me/6590266965?text=Hi%20Nikki%2C%20I%27d%20like%20to%20book%20a%20TRE%E2%84%A2%20session' },
    website: { url: 'https://www.steadyessentials.com', label: 'steadyessentials.com' },
    socials: [],
    facts: { location: 'Singapore · In-person & online', languages: 'English', formats: '1:1 · Groups', certified: 'Certified TRE™ Provider · MEd Special Education (University of Birmingham)' },
    about: [
      'For almost three decades Nikki Tay has worked in early childhood education and special education, supporting children, families and neurodivergent individuals. Over the years she has seen how stress shows up in the body, in behaviour, in learning and in everyday life.',
      'That is what drew her to TRE™. She wanted to offer a gentle, body-based practice that helps people release tension, feel more settled and reconnect with themselves.'
    ],
    highlights: [
      'Certified TRE™ Provider',
      'MEd Special Education, University of Birmingham',
      'Nearly 30 years in early-childhood and special education',
      'Experience supporting children, families and neurodivergent individuals'
    ],
    offers: [
      { title: 'Individual TRE™ sessions', text: 'Gentle, body-based one-to-one sessions to release tension and settle the nervous system.' },
      { title: 'Group sessions', text: 'TRE™ in a supportive group setting, welcoming to neurodivergent participants.' }
    ],
    gallery: [],
    meta: [
      { icon: 'pin', text: 'Singapore · In-person & online' },
      { icon: 'award', text: 'MEd Special Education · Certified TRE™ Provider' },
      { icon: 'group', text: '1:1 · Groups' }
    ]
  }
];
