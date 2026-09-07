/* =========================================================
   FACILITATORS DATA — the pool used by the home page "Featured facilitators"
   section. Three facilitators are featured each day (Singapore time); the batch
   changes every day and, once everyone has been featured, the order is
   reshuffled and the rotation starts again.

   Each entry supports:
     id        : unique slug
     name, role, tag (badge text), tagClass ("badge-navy" | "badge-gold" | "badge-cream")
     initials  : shown when there is no photo     photo: optional image path
     photoClass: "" | "bronze" | "deep" (avatar colour)
     bio       : one short paragraph
     meta      : [{ icon: "pin" | "globe" | "award" | "group" | "calendar", text }]
     actions   : [{ label, url }]  (first one is the primary button)
     sample    : true marks a placeholder profile (shows the "Sample profile" ribbon)
   Keep this list in step with facilitators.html.
   ========================================================= */
window.TRE_FACILITATORS = [
  {
    id: 'isabelle-claus-teixeira',
    name: 'Isabelle Claus Teixeira',
    role: 'Global TRE™ Certifying Trainer · Certified TRE™ Provider · ICF PCC Executive Coach · Mindfulness Teacher',
    tag: 'Certifying Trainer', tagClass: 'badge-navy',
    initials: 'ICT', photoClass: '',
    bio: 'Founder of TRE™ in Singapore and a Global TRE™ Certifying Trainer running the full three-module certification here. Isabelle teaches individuals, groups and organisations, and supervises trainees through Modules 1–3. After 30 years in senior HR roles across nine countries, she brings both corporate fluency and deep somatic experience to every session.',
    meta: [
      { icon: 'pin', text: 'Singapore (in person, regular visits) · Japan · Online worldwide' },
      { icon: 'globe', text: 'English · French · Spanish · conversational Japanese & German' },
      { icon: 'award', text: 'Trained with Dr. David Berceli, Michelle Beck, Ching Meoh Cheong and Donna Philips' }
    ],
    actions: [
      { label: 'Book a free call', url: 'https://calendly.com/bhdasia/tre-certification-intake-call' },
      { label: 'Profile', url: 'facilitators.html' }
    ]
  },
  {
    id: 'simba-stenqvist',
    name: 'Simba Stenqvist',
    role: 'Global TRE™ Certifying Trainer · Creator of Internal Alchemy',
    tag: 'Visiting Trainer', tagClass: 'badge-gold',
    initials: 'SS', photoClass: 'bronze',
    bio: 'More than 25 years of hands-on practice in bodywork, nervous system regulation and energetic healing. Developed the Internal Alchemy system — breathwork, fascial release, grounding and tremor work — in collaboration with Dr. David Berceli. Practice: Living with the Spirit.',
    meta: [
      { icon: 'calendar', text: 'Taught the Internal Alchemy introductory workshop in Singapore, 1 Sep 2026' },
      { icon: 'globe', text: 'English · teaches internationally' }
    ],
    actions: [
      { label: 'Workshop details', url: 'event.html?id=internal-alchemy-singapore' },
      { label: 'livingwiththespirit.com', url: 'https://livingwiththespirit.com/' }
    ]
  },
  {
    id: 'saymara-ryon',
    name: 'Saymara Ryon',
    role: 'Founder & President, Asociația TRE™ România · Certified TRE™ Provider · Trainer Trainee',
    tag: 'Visiting Co-facilitator', tagClass: 'badge-gold',
    initials: 'SR', photoClass: 'deep',
    bio: 'Holistic Coach, Trainer & Mentor and pioneer of TRE™ in Romania, building the TRE™ practitioner community across Eastern Europe. Co-facilitates "From Shaking to Shaping" and TRE™ Module 1 in Bucharest with Isabelle — in English and Romanian.',
    meta: [
      { icon: 'pin', text: 'Bucharest, Romania · Online' },
      { icon: 'globe', text: 'English · Romanian' },
      { icon: 'calendar', text: 'Co-leads the 8 Oct online workshop and TRE™ Module 1, Bucharest, 15–17 Oct 2026' }
    ],
    actions: [
      { label: 'Online workshop', url: 'event.html?id=from-shaking-to-shaping-online' },
      { label: 'TRE™ Romania', url: 'https://treromania.org/' }
    ]
  },

  /* ---------- Sample provider profiles (mirror facilitators.html — replace with real providers) ---------- */
  {
    id: 'sample-physio',
    name: 'Provider Name',
    role: 'Certified TRE™ Provider · Physiotherapist',
    tag: 'Certified Provider', tagClass: 'badge-navy',
    initials: 'CP', photoClass: '',
    bio: 'Individual sessions for chronic pain, sleep and post-injury recovery. Combines TRE™ with movement rehabilitation for clients who want a body-first approach.',
    meta: [ { icon: 'pin', text: 'Novena · Online' }, { icon: 'globe', text: 'English · Mandarin' }, { icon: 'group', text: '1:1 · Small groups' } ],
    actions: [ { label: 'Email', url: 'mailto:isabelle@bhdasia.com?subject=Provider%20enquiry' }, { label: 'Directory', url: 'facilitators.html#directory' } ],
    sample: true
  },
  {
    id: 'sample-coach',
    name: 'Provider Name',
    role: 'Certified TRE™ Provider · ICF ACC Coach',
    tag: 'Certified Provider', tagClass: 'badge-navy',
    initials: 'CP', photoClass: 'deep',
    bio: 'Corporate group sessions and leadership resilience programmes. Works with HR teams to embed TRE™ in wellbeing calendars and offsites.',
    meta: [ { icon: 'pin', text: 'CBD · Client offices · Online' }, { icon: 'globe', text: 'English · Malay' }, { icon: 'group', text: 'Groups · Workplace' } ],
    actions: [ { label: 'Email', url: 'mailto:isabelle@bhdasia.com?subject=Provider%20enquiry' }, { label: 'Directory', url: 'facilitators.html#directory' } ],
    sample: true
  },
  {
    id: 'sample-yoga',
    name: 'Provider Name',
    role: 'Certified TRE™ Provider · Yoga Teacher (RYT-500)',
    tag: 'Certified Provider', tagClass: 'badge-navy',
    initials: 'CP', photoClass: 'bronze',
    bio: 'Weekly TRE™ community classes and yoga-integrated sessions for students who want deeper release and faster recovery.',
    meta: [ { icon: 'pin', text: 'Tiong Bahru · East Coast' }, { icon: 'globe', text: 'English · Tamil' }, { icon: 'group', text: 'Classes · 1:1' } ],
    actions: [ { label: 'Email', url: 'mailto:isabelle@bhdasia.com?subject=Provider%20enquiry' }, { label: 'Directory', url: 'facilitators.html#directory' } ],
    sample: true
  },
  {
    id: 'sample-trainee',
    name: 'Trainee Name',
    role: 'Completing Module 2 · Counsellor',
    tag: 'Provider-in-training', tagClass: 'badge-gold',
    initials: 'PT', photoClass: '',
    bio: 'Offers supervised one-to-one practice sessions as part of certification. Sessions are free or low-cost and supervised by the Certifying Trainer.',
    meta: [ { icon: 'pin', text: 'Bukit Timah · Online' }, { icon: 'globe', text: 'English' }, { icon: 'group', text: '1:1 practice sessions' } ],
    actions: [ { label: 'Email', url: 'mailto:isabelle@bhdasia.com?subject=Provider%20enquiry' }, { label: 'Directory', url: 'facilitators.html#directory' } ],
    sample: true
  }
];
