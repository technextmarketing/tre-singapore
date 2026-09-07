/* =========================================================
   FACILITATORS DATA — one object per facilitator. Used by:
     • facilitators.html — the single, filterable grid (order is shuffled on every load)
     • index.html — "Featured facilitators" (3 per day, rotating)
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
    role: 'Global TRE® Certifying Trainer · ICF PCC Executive Coach · Mindfulness Teacher',
    tag: 'Certifying Trainer', tagClass: 'badge-navy', kind: 'trainer',
    modes: ['1:1', 'Groups', 'Online', 'In-person', 'Corporate', 'Certification', 'Workshops'],
    services: ['TRE® certification (Modules 1–3)', 'Individual TRE® sessions', 'Group sessions', 'Corporate resilience programmes', 'Workshops for coaches · 21 ICF CCEUs', 'Executive & somatic coaching', 'Mindfulness', 'Online worldwide', 'English · French · Spanish'],
    initials: 'ICT', photoClass: '', photo: FAC_IMG + 'isabelle-her-story.jpg', hero: FAC_IMG + 'gallery-isabelle-teaching-tre.jpg',
    bio: 'Founder of TRE® in Singapore; runs the full three-module certification and teaches individuals, groups and organisations.',
    summary: 'Founder of TRE® in Singapore and HummingBeing. Isabelle runs the Global TRE® Provider Certification in Singapore, teaches individuals, groups and organisations, and supervises trainees through Modules 1–3 — in person and online.',
    contact: { email: 'mailto:isabelle@bhdasia.com?subject=TRE%20session%20enquiry', whatsapp: WA + '?text=Hi%20Isabelle%2C%20I%27d%20like%20to%20ask%20about%20TRE%C2%AE%20in%20Singapore', book: 'https://calendly.com/bhdasia/tre-certification-intake-call' },
    website: { url: 'https://hummingbeing.com', label: 'hummingbeing.com' },
    socials: [
      { type: 'linkedin', url: 'https://www.linkedin.com/in/isabelleclausteixeira/', label: 'LinkedIn' },
      { type: 'instagram', url: 'https://www.instagram.com/isabelleclausteixeira_bhd/', label: 'Instagram' },
      { type: 'youtube', url: 'https://www.youtube.com/@IsabelleClausTeixeira', label: 'YouTube' },
      { type: 'facebook', url: 'https://www.facebook.com/bhdasia/', label: 'Facebook' },
      { type: 'website', url: 'https://bhdasia.com', label: 'BHD Asia' }
    ],
    facts: { location: 'Singapore (in person, regular visits) · Japan · Online worldwide', languages: 'English · French · Spanish · conversational Japanese & German', formats: '1:1 · Groups · Corporate · Certification training', certified: 'Global TRE® Certifying Trainer (TRE® For All) · ICF PCC' },
    about: [
      'Isabelle is a somatic and trauma-informed Executive Coach (ICF PCC), Global TRE® Certifying Trainer and Mindfulness Teacher. She trained directly under Dr. David Berceli, the founder of TRE®, and began her own TRE® practice in 2017.',
      'After 30 years in senior HR roles across nine countries, working with professionals, executives and teams of more than 40 nationalities, she brings both corporate fluency and deep somatic experience to every session. She founded HummingBeing — science-backed processes with TRE®, coaching and somatic practices — and leads TRE® in Singapore under Business and Human Development Consulting Pte Ltd.',
      'In Singapore she runs the full Global TRE® Provider Certification (Modules 1–3), the only TRE® training in the world that carries ICF CCEUs, and works with individuals, groups and organisations in person and online.'
    ],
    highlights: [
      'Global TRE® Certifying Trainer, accredited by TRE® For All under Dr. David Berceli\'s methodology',
      'ICF PCC Executive Coach · Mindfulness Teacher · Certified Reiki Level II',
      'Trained with Dr. David Berceli, Michelle Beck, Ching Meoh Cheong and Donna Philips',
      '30 years in senior HR and leadership roles across 9 countries and 40+ nationalities',
      'Leads TRE® trainings in Singapore, Bucharest and online; speaker at the TRE® Asia conferences'
    ],
    offers: [
      { title: 'Individual TRE® sessions', text: 'One-to-one sessions online or in Singapore — a personalised introduction to TRE® or deeper ongoing work.' },
      { title: 'Group sessions & corporate programmes', text: 'TRE® for teams, lunch-and-learns, offsites and resilience programmes for organisations in Singapore.' },
      { title: 'Global TRE® Provider Certification', text: 'Modules 1–3 in Singapore (Module 1 also online) with 12 online sessions and ongoing supervision.' },
      { title: 'Workshops for coaches', text: 'Nervous system regulation and self-induced neurogenic tremoring for coaches — 21 ICF CCEUs.' }
    ],
    gallery: [
      { src: FAC_IMG + 'gallery-isabelle-teaching-tre.jpg', caption: 'Teaching TRE® Module 1' },
      { src: FAC_IMG + 'gallery-isabelle-students-module1-may2026.jpg', caption: 'TRE® Module 1 — May 2026' },
      { src: FAC_IMG + 'gallery-tre-module1-2026.jpg', caption: 'TRE® Module 1 — January 2026' },
      { src: FAC_IMG + 'gallery-ws-1.jpg', caption: 'TRE® Module 1 training' },
      { src: FAC_IMG + 'gallery-danang-tre-conference-nov2025.jpg', caption: 'Da Nang TRE® Conference — November 2025' },
      { src: FAC_IMG + 'gallery-dinner-david-berceli-founders.jpg', caption: 'Dinner with David Berceli, founder of TRE®' },
      { src: FAC_IMG + 'gallery-asia-tre-trainers-david.jpg', caption: 'Asia TRE® trainers with David Berceli' },
      { src: FAC_IMG + 'gallery-isabelle-vietnam-tre.jpg', caption: 'TRE® Asia Conference, Vietnam' },
      { src: FAC_IMG + 'gallery-uk-tre-providers.jpg', caption: 'With UK TRE® provider students' },
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
    id: 'simba-stenqvist',
    name: 'Simba Stenqvist',
    role: 'Global TRE® Certifying Trainer · Creator of Internal Alchemy',
    tag: 'Visiting Trainer', tagClass: 'badge-gold', kind: 'trainer',
    modes: ['Groups', 'In-person', 'Workshops', 'Certification'],
    services: ['Internal Alchemy workshops', 'Breathwork', 'Fascial release', 'Grounding', 'Tremor work', 'TRE® certification training', 'Bodywork · 25+ years', 'Visiting Singapore'],
    initials: 'SS', photoClass: 'bronze', hero: FAC_IMG + 'gallery-isabelle-david-simba-nikki.jpg',
    bio: 'Creator of Internal Alchemy — breathwork, fascial release, grounding and tremor work — developed with Dr. David Berceli.',
    summary: 'Global TRE® Certifying Trainer and creator of Internal Alchemy — an integrated system of breathwork, fascial release, grounding and tremor work that restores the nervous system at the level where tension actually lives.',
    contact: { email: 'mailto:isabelle@bhdasia.com?subject=Internal%20Alchemy%20%2F%20Simba%20Stenqvist%20enquiry', whatsapp: WA + '?text=Hi%2C%20I%27d%20like%20to%20know%20about%20the%20next%20Internal%20Alchemy%20workshop%20in%20Singapore', book: 'contact.html?interest=event' },
    website: { url: 'https://livingwiththespirit.com/', label: 'livingwiththespirit.com' },
    socials: [
      { type: 'instagram', url: 'https://www.instagram.com/internalalchemywithsimba/', label: 'Internal Alchemy' },
      { type: 'instagram', url: 'https://www.instagram.com/livingwiththespirit', label: 'Living with the Spirit' }
    ],
    facts: { location: 'Visiting Singapore · teaches internationally', languages: 'English', formats: 'Workshops · Certification training · Bodywork', certified: 'Global TRE® Certifying Trainer (TRE® For All)' },
    about: [
      'Simba Stenqvist is a Global TRE® Certifying Trainer and the creator of Internal Alchemy — a system born from more than twenty-five years of hands-on practice in bodywork, nervous system regulation and energetic healing, developed in close collaboration with Dr David Berceli, founder of TRE®.',
      'Internal Alchemy combines breathwork, fascial release, grounding and tremor work to restore the nervous system at the level where tension actually lives. His official practice is Living with the Spirit.',
      'Simba taught the first Internal Alchemy introductory workshop in Singapore on 1 September 2026, hosted by HummingBeing and TRE® in Singapore. Enquiries about his next visit go through Isabelle.'
    ],
    highlights: [
      'Global TRE® Certifying Trainer',
      'Creator of the Internal Alchemy system — breathwork, fascial release, grounding and tremor work',
      '25+ years of hands-on bodywork and nervous-system practice',
      'Developed his method in close collaboration with Dr. David Berceli'
    ],
    offers: [
      { title: 'Internal Alchemy workshops', text: 'Two-hour introductory evenings and longer immersions when visiting Singapore.' },
      { title: 'TRE® certification training', text: 'Certifying Trainer for the Global TRE® Provider Certification internationally.' }
    ],
    gallery: [
      { src: EVT_IMG + 'event-internal-alchemy.webp', caption: 'Internal Alchemy — introductory workshop, Singapore, 1 September 2026' },
      { src: FAC_IMG + 'gallery-insead-simba-stenqvist.jpg', caption: 'Visiting INSEAD campus with Simba Stenqvist' },
      { src: FAC_IMG + 'gallery-isabelle-david-simba-nikki.jpg', caption: 'With David Berceli, Simba Stenqvist and Nikki Tay' }
    ],
    events: ['internal-alchemy-singapore'],
    meta: [
      { icon: 'calendar', text: 'Internal Alchemy workshop, Singapore, 1 Sep 2026' },
      { icon: 'globe', text: 'English · teaches internationally' }
    ]
  },
  {
    id: 'saymara-ryon',
    name: 'Saymara Ryon',
    role: 'Founder & President, Asociația TRE® România · Certified TRE® Provider · Trainer Trainee',
    tag: 'Visiting Co-facilitator', tagClass: 'badge-gold', kind: 'provider',
    modes: ['1:1', 'Groups', 'Online', 'In-person', 'Workshops', 'Certification'],
    services: ['From Shaking to Shaping', 'TRE® in a coaching context', 'TRE® Module 1 — Bucharest', 'Individual & group TRE® sessions', 'Holistic coaching', 'Neurogenic Integration', 'English · Romanian', 'Online & in person'],
    initials: 'SR', photoClass: 'deep', hero: FAC_IMG + 'gallery-isabelle-saymara.jpg',
    bio: 'Pioneer of TRE® in Romania; co-facilitates the Bucharest trainings and the "From Shaking to Shaping" workshops with Isabelle.',
    summary: 'Pioneer of TRE® in Romania and founder of Neurogenic Integration and Asociația TRE® România. Saymara co-facilitates the Bucharest trainings and the "From Shaking to Shaping" workshops with Isabelle — in English and Romanian.',
    contact: { email: 'mailto:isabelle@bhdasia.com?subject=Bucharest%20TRE%C2%AE%20events%20%E2%80%94%20Saymara%20Ryon', whatsapp: WA + '?text=Hi%2C%20I%27d%20like%20to%20ask%20about%20the%20TRE%C2%AE%20events%20in%20Bucharest', book: 'event.html?id=tre-module-1-bucharest' },
    website: { url: 'https://treromania.org/', label: 'treromania.org' },
    socials: [
      { type: 'linkedin', url: 'https://ro.linkedin.com/in/saymara-ryon-7252845', label: 'LinkedIn' },
      { type: 'instagram', url: 'https://www.instagram.com/treromania/', label: 'TRE® România' },
      { type: 'facebook', url: 'https://www.facebook.com/TREromania', label: 'TRE® România' },
      { type: 'website', url: 'https://www.atelierdesuflet.ro/', label: 'Atelier de Suflet' },
      { type: 'website', url: 'https://neurogenic-integration.com/', label: 'Neurogenic Integration' }
    ],
    facts: { location: 'Bucharest, Romania · Online', languages: 'English · Romanian', formats: '1:1 · Groups · Workshops · Co-facilitated trainings', certified: 'Certified TRE® Provider · TRE® Trainer Trainee' },
    about: [
      'Saymara Ryon is the Founder and President of Asociația TRE® România, a Holistic Coach, Trainer and Mentor, Certified TRE® Provider and Trainer Trainee. She founded Învață să Zbori SRL (Learn to Fly) and Neurogenic Integration, and is the pioneer of TRE® in Romania — bringing embodied healing and somatic practices to the Romanian professional community and building the practitioner network across Eastern Europe.',
      'With Isabelle she co-facilitates "From Shaking to Shaping — Use of TRE® in a Coaching Context" (online and in Bucharest) and TRE® Module 1 in Bucharest, the first ICF-accredited Module 1 in Europe delivered in English. In-person sessions are facilitated in English and Romanian.'
    ],
    highlights: [
      'Founder & President, Asociația TRE® România',
      'Certified TRE® Provider and Trainer Trainee under the Global TRE® Certification Program',
      'Founder of Neurogenic Integration and Învață să Zbori SRL (Learn to Fly)',
      'Co-facilitator of the Bucharest TRE® trainings with Isabelle Claus Teixeira'
    ],
    offers: [
      { title: 'From Shaking to Shaping', text: 'Half-day intensives on using TRE® in a coaching context — online (8 Oct) and in Bucharest (20 & 24 Oct 2026).' },
      { title: 'TRE® Module 1 — Bucharest', text: 'Three-day certification training, 15–17 October 2026, co-facilitated in English; 21 ICF CCEUs.' },
      { title: 'TRE® sessions in Romania', text: 'Individual and group TRE® sessions through Neurogenic Integration and TRE® România.' }
    ],
    gallery: [
      { src: FAC_IMG + 'gallery-isabelle-saymara.jpg', caption: 'Isabelle and Saymara' },
      { src: EVT_IMG + 'event-shaking-online.webp', caption: 'From Shaking to Shaping — live online, 8 October 2026' },
      { src: EVT_IMG + 'event-bucharest-module1.webp', caption: 'TRE® Module 1 — Bucharest, 15–17 October 2026' },
      { src: FAC_IMG + 'gallery-isabelle-saymara-2.jpg', caption: 'Isabelle and Saymara' },
      { src: FAC_IMG + 'gallery-isabelle-saymara-3.jpg', caption: 'Isabelle and Saymara' },
      { src: FAC_IMG + 'gallery-isabelle-saymara-4.jpg', caption: 'Isabelle and Saymara' },
      { src: EVT_IMG + 'event-shaking-to-shaping.webp', caption: 'From Shaking to Shaping — Bucharest sessions' }
    ],
    events: ['from-shaking-to-shaping-online', 'tre-module-1-bucharest', 'from-shaking-to-shaping-bucharest'],
    meta: [
      { icon: 'pin', text: 'Bucharest, Romania · Online' },
      { icon: 'globe', text: 'English · Romanian' },
      { icon: 'calendar', text: 'Co-leads TRE® Module 1, Bucharest, 15–17 Oct 2026' }
    ]
  },

  /* ---------- Sample provider profiles (replace with real providers as they join) ---------- */
  {
    id: 'sample-physio',
    name: 'Provider Name',
    role: 'Certified TRE® Provider · Physiotherapist',
    tag: 'Certified Provider', tagClass: 'badge-navy', kind: 'provider',
    modes: ['1:1', 'Groups', 'Online', 'In-person'],
    services: ['Individual TRE® sessions', 'Chronic pain', 'Sleep', 'Post-injury recovery', 'Movement rehabilitation', 'Small groups', 'Novena · Online', 'English · Mandarin'],
    initials: 'CP', photoClass: '',
    bio: 'TRE® combined with movement rehabilitation for chronic pain, sleep and post-injury recovery.',
    summary: 'Sample profile. A certified TRE® provider combining TRE® with movement rehabilitation for clients who want a body-first approach to chronic pain, sleep and recovery.',
    contact: { email: 'mailto:isabelle@bhdasia.com?subject=Provider%20enquiry', whatsapp: WA + '?text=Hi%2C%20I%27d%20like%20to%20book%20a%20TRE%C2%AE%20session%20with%20a%20certified%20provider%20in%20Singapore', book: 'contact.html?interest=session' },
    website: { url: 'facilitators.html#get-listed', label: 'Provider website (added when listed)' },
    socials: [],
    facts: { location: 'Novena · Online', languages: 'English · Mandarin', formats: '1:1 · Small groups', certified: 'Certified TRE® Provider' },
    about: ['This is a sample profile showing how a listed provider appears. Real providers replace the text, photo, gallery and links when they join the directory.'],
    highlights: ['Certified TRE® Provider (Global TRE® Certification Program)', 'Physiotherapist'],
    offers: [{ title: 'Individual sessions', text: 'TRE® for chronic pain, sleep and post-injury recovery.' }, { title: 'Small groups', text: 'Body-first sessions combining TRE® with movement rehabilitation.' }],
    gallery: [],
    meta: [ { icon: 'pin', text: 'Novena · Online' }, { icon: 'globe', text: 'English · Mandarin' }, { icon: 'group', text: '1:1 · Small groups' } ],
    sample: true
  },
  {
    id: 'sample-coach',
    name: 'Provider Name',
    role: 'Certified TRE® Provider · ICF ACC Coach',
    tag: 'Certified Provider', tagClass: 'badge-navy', kind: 'provider',
    modes: ['Groups', 'Corporate', 'Online', 'In-person'],
    services: ['Corporate group sessions', 'Leadership resilience', 'Wellbeing programmes', 'Offsites', 'ICF ACC coaching', 'CBD · Client offices · Online', 'English · Malay'],
    initials: 'CP', photoClass: 'deep',
    bio: 'Corporate group sessions and leadership resilience programmes that embed TRE® in wellbeing calendars.',
    summary: 'Sample profile. A certified TRE® provider and ICF ACC coach running corporate group sessions and leadership resilience programmes.',
    contact: { email: 'mailto:isabelle@bhdasia.com?subject=Provider%20enquiry', whatsapp: WA + '?text=Hi%2C%20I%27d%20like%20to%20book%20a%20TRE%C2%AE%20session%20with%20a%20certified%20provider%20in%20Singapore', book: 'contact.html?interest=session' },
    website: { url: 'facilitators.html#get-listed', label: 'Provider website (added when listed)' },
    socials: [],
    facts: { location: 'CBD · Client offices · Online', languages: 'English · Malay', formats: 'Groups · Workplace', certified: 'Certified TRE® Provider · ICF ACC' },
    about: ['This is a sample profile showing how a listed provider appears. Real providers replace the text, photo, gallery and links when they join the directory.'],
    highlights: ['Certified TRE® Provider (Global TRE® Certification Program)', 'ICF ACC Coach'],
    offers: [{ title: 'Corporate group sessions', text: 'TRE® embedded in wellbeing calendars and offsites.' }, { title: 'Leadership resilience programmes', text: 'Multi-week programmes for leadership teams.' }],
    gallery: [],
    meta: [ { icon: 'pin', text: 'CBD · Client offices · Online' }, { icon: 'globe', text: 'English · Malay' }, { icon: 'group', text: 'Groups · Workplace' } ],
    sample: true
  },
  {
    id: 'sample-yoga',
    name: 'Provider Name',
    role: 'Certified TRE® Provider · Yoga Teacher (RYT-500)',
    tag: 'Certified Provider', tagClass: 'badge-navy', kind: 'provider',
    modes: ['1:1', 'Groups', 'In-person'],
    services: ['Weekly community classes', 'Yoga-integrated TRE®', 'Deeper release', 'Faster recovery', 'Tiong Bahru · East Coast', 'English · Tamil'],
    initials: 'CP', photoClass: 'bronze',
    bio: 'Weekly community classes and yoga-integrated TRE® sessions for deeper release and faster recovery.',
    summary: 'Sample profile. A certified TRE® provider and RYT-500 yoga teacher running weekly community classes and yoga-integrated sessions.',
    contact: { email: 'mailto:isabelle@bhdasia.com?subject=Provider%20enquiry', whatsapp: WA + '?text=Hi%2C%20I%27d%20like%20to%20book%20a%20TRE%C2%AE%20session%20with%20a%20certified%20provider%20in%20Singapore', book: 'contact.html?interest=session' },
    website: { url: 'facilitators.html#get-listed', label: 'Provider website (added when listed)' },
    socials: [],
    facts: { location: 'Tiong Bahru · East Coast', languages: 'English · Tamil', formats: 'Classes · 1:1', certified: 'Certified TRE® Provider · RYT-500' },
    about: ['This is a sample profile showing how a listed provider appears. Real providers replace the text, photo, gallery and links when they join the directory.'],
    highlights: ['Certified TRE® Provider (Global TRE® Certification Program)', 'Yoga Teacher (RYT-500)'],
    offers: [{ title: 'Weekly community classes', text: 'Group TRE® classes for students who want deeper release.' }, { title: 'Yoga-integrated 1:1 sessions', text: 'TRE® woven into a personal yoga practice.' }],
    gallery: [],
    meta: [ { icon: 'pin', text: 'Tiong Bahru · East Coast' }, { icon: 'globe', text: 'English · Tamil' }, { icon: 'group', text: 'Classes · 1:1' } ],
    sample: true
  },
  {
    id: 'sample-trainee',
    name: 'Trainee Name',
    role: 'Completing Module 2 · Counsellor',
    tag: 'Provider-in-training', tagClass: 'badge-gold', kind: 'trainee',
    modes: ['1:1', 'Online', 'In-person'],
    services: ['Supervised practice sessions', 'Free or low-cost', 'Counselling background', 'Bukit Timah · Online', 'English'],
    initials: 'PT', photoClass: '',
    bio: 'Supervised one-to-one practice sessions, free or low-cost, as part of certification.',
    summary: 'Sample profile. A provider-in-training offering supervised one-to-one practice sessions while completing the Global TRE® Provider Certification.',
    contact: { email: 'mailto:isabelle@bhdasia.com?subject=Practice%20session%20enquiry', whatsapp: WA + '?text=Hi%2C%20I%27d%20like%20to%20book%20a%20supervised%20TRE%C2%AE%20practice%20session', book: 'contact.html?interest=session' },
    website: { url: 'facilitators.html#get-listed', label: 'Website (added when listed)' },
    socials: [],
    facts: { location: 'Bukit Timah · Online', languages: 'English', formats: '1:1 practice sessions', certified: 'Completing TRE® Module 2' },
    about: ['This is a sample profile showing how a provider-in-training appears. Practice sessions are free or low-cost and supervised by the Certifying Trainer.'],
    highlights: ['Completed TRE® Module 1 · completing Module 2', 'Counsellor'],
    offers: [{ title: 'Supervised practice sessions', text: 'One-to-one sessions as part of certification, supervised by Isabelle.' }],
    gallery: [],
    meta: [ { icon: 'pin', text: 'Bukit Timah · Online' }, { icon: 'globe', text: 'English' }, { icon: 'group', text: '1:1 practice sessions' } ],
    sample: true
  }
];
