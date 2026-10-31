/* =========================================================
   EVENTS DATA — edit this file to add, change or remove events.
   Source of truth: hummingbeing.com/events.html and its event pages.
   Last aligned: 7 September 2026.

   Each event object supports:
     slug         : string (required) — used by event?id=<slug>
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
     image        : thumbnail path (16:9) — shown on the detail page (hero) and used for og:image / posters
     card         : card-only picture (16:9) — shown on event cards in listings; falls back to image (optional)
     description  : short paragraph for the card
     facilitator  : name(s) (optional)
     credits      : e.g. "21 ICF CCEUs" (optional)
     price        : e.g. "S$79" (optional)  priceNote: e.g. "early bird" (optional)
     priceText    : shown when there is no price (optional)
     link         : primary registration URL   linkText: button label (optional)
     soldOut      : true/false   waitlistLink: URL shown when sold out
     status       : 'postponed' | 'cancelled' (optional) - shown on the site, skipped by the countdown and the chatbot,
                    marked for Google, and never given a preview or recap blog post
     tz           : time zone of the event's own clock, e.g. 'Europe/Bucharest' (optional; default Singapore;
                    Bucharest venues are detected automatically)
     seoTitle     : shorter title for search results when the title is over 65 characters (optional; the event page's
                    <title> is "<title> | TRE™ in Singapore" when that fits, else the title, else the part before " — ")
     isNew        : true to show a "New" badge
     theme        : "theme-deep" | "theme-bronze" | "theme-orange" | "theme-green" (fallback colour when no image)
     details      : { summary, about[], forWho[], schedule[], includes[], pricing[], pricingNote,
                      posterTall {src, alt} (optional portrait poster, shown as an 'Event poster' section),
                      facilitators[], partners, online (true = show the online preparation guide),
                      register[{label,url,primary}], source }
   Events whose end date (or start date) has passed move automatically to "Past events".
   ========================================================= */
window.TRE_PREP_GUIDE = 'https://hummingbeing.com/online-session-preparation';
window.TRE_PREP_PDF = 'https://hummingbeing.com/online-tre-session-guide.pdf?v=2';

var ISABELLE = {
  name: 'Isabelle Claus Teixeira',
  role: 'Global TRE™ Certifying Trainer · ICF PCC',
  bio: 'Somatic and trauma-informed Executive Coach (ICF PCC), Global TRE™ Certifying Trainer and Mindfulness Teacher. Trained directly under Dr. David Berceli, founder of TRE™. Over 30 years of experience working with professionals, executives and teams across 9 countries and 40+ nationalities — in person and online.',
  link: 'https://hummingbeing.com/isabelle', linkText: 'Meet Isabelle'
};
var SAYMARA = {
  name: 'Saymara Ryon',
  role: 'Founder & President, Asociația TRE™ România · Certified TRE™ Provider',
  bio: 'Holistic Coach, Trainer & Mentor, Certified TRE™ Provider and Trainer Trainee. Founder of Învață să Zbori SRL (Learn to Fly) and pioneer of TRE™ in Romania, building the TRE™ practitioner community across Eastern Europe.',
  link: 'https://treromania.org/', linkText: 'TRE™ Romania'
};
var SIMBA = {
  name: 'Simba Stenqvist',
  role: 'Global TRE™ Certifying Trainer · Creator of Internal Alchemy',
  bio: 'Global TRE™ Certifying Trainer and creator of Internal Alchemy — an integrated system of breathwork, fascial release, grounding and tremor work drawn from more than 25 years of hands-on practice in bodywork, nervous-system regulation and energetic healing, developed in close collaboration with Dr. David Berceli.',
  link: 'https://livingwiththespirit.com/', linkText: 'livingwiththespirit.com'
};
var SARA = {
  name: 'Sara Marie',
  role: 'The Alchemist · CEO, Living with the Spirit',
  bio: 'Sara Marie brings decades of experience from a wide range of masculine structures, having worked in marketing with global brands including L\u2019Or\u00e9al Paris, the Volvo brands and Dolce & Gabbana. That world eventually led her into a severe burnout, and the road back to her health became the place where she learned to release the masculine weight she had been carrying. She has spent the past decade in Chiang Mai as CEO of Living with the Spirit, running a retreat centre and the Internal Alchemy Certification Trainings alongside her husband Simba.',
  photo: 'assets/img/facilitators/sara-marie.webp',
  link: 'https://linktr.ee/saramariespirit', linkText: 'Linktree'
};
var AUN = {
  name: 'Aun Ali',
  role: 'Certified TRE\u2122 Trainer \u00b7 Founder, Trauma Release and Wellness Centre \u00b7 Clinically Certified Trauma Specialist (CCTS-I, F, A)',
  bio: 'Aun Ali is a Certified TRE\u2122 Trainer and Clinically Certified Trauma Specialist (CCTS-I, F, A), and the founder of the Trauma Release and Wellness Centre. His work sits at the meeting point of psychotherapy and the body: helping psychologists, counsellors and narrative therapists bring TRE\u2122 and somatic practice into trauma-informed care safely, in the right phase, without abandoning the model they already trust.',
  photo: 'assets/img/facilitators/aun-ali.webp'
};
var ANIA = {
  name: 'Ania Zieli\u0144ska',
  role: 'Yoga Teacher \u00b7 Holistic Health Coach \u00b7 Life Realignment Mentor',
  bio: 'Ania Zieli\u0144ska (Sunrise) is a Yoga Teacher, Holistic Health Coach and Life Realignment Mentor with over a decade of experience in Yoga, meditation and holistic wellbeing. She has completed over 700 hours of yoga teacher training and teaches Hatha, Vinyasa and Yin Yoga, alongside pranayama and meditation. Her work goes beyond the physical practice of Yoga: as a Life Realignment Mentor, Ania supports people in creating meaningful changes across different areas of life \u2014 from wellbeing and weight loss, habits and mindset to self-awareness, relationships and personal growth. Her approach combines traditional Yogic practices with practical tools that can be integrated into everyday life, helping people cultivate greater awareness, calm, focus, energy and connection with themselves. Ania\u2019s own journey with Yoga began as a profound personal transformation and has grown into a passion for guiding others Back to Themselves through movement, breath and mindfulness. She has taught Yoga internationally both in-person and online, and she works with people from different backgrounds and levels of experience. She believes that breath is one of the simplest and most powerful tools we have available to influence how we feel, respond and move through our day.',
  photo: 'assets/img/facilitators/ania-zielinska.webp'
};
var OLGA = {
  name: 'Olga Titkova',
  role: 'Yoga & Mindfulness Teacher · E-RYT 200, RYT 500, YACEP',
  bio: 'Olga has practiced yoga since 1997 and has been teaching since 2006. Her studies span traditional Hatha, Tantra, and Kundalini yoga, pranayama, meditation, and Yoga Nidra. She has also completed mindfulness teacher training in Oxford, UK. Alongside her yoga journey, Olga spent 27 years in the high-tech industry, leading global teams and technology operations across multiple countries. Her experience in demanding corporate environments has shaped her understanding of the importance of awareness, balance, and recovery in everyday life. Today, she brings together her yoga and mindfulness studies with her professional experience, integrating physical practice with awareness of bodily sensations, thoughts, and emotions to support personal wellbeing, inner balance, and a more conscious approach to everyday life.',
  photo: 'assets/img/facilitators/olga-titkova.webp'
};
var CALENDLY = 'https://calendly.com/bhdasia/tre-certification-intake-call';

window.TRE_EVENTS = [
  /* ---------- The Body in the Room \u2014 Aun Ali (online, 25 Nov 2026) ---------- */
  {
    slug: 'the-body-in-the-room',
    title: 'The Body in the Room \u2014 Integrating TRE\u2122 and Somatic Practice into Psychotherapy',
    seoTitle: 'The Body in the Room \u2014 TRE\u2122 & Somatic Practice in Psychotherapy',
    category: 'Workshop',
    region: 'online',
    location: 'Online',
    venue: 'Zoom (link sent after registration)',
    format: 'Live online',
    start: '2026-11-25T19:00',
    dateText: 'Wednesday 25 November 2026',
    timeText: '7:00\u20139:00pm Singapore time',
    image: 'assets/img/events/event-body-in-the-room.webp?v=2',
    card     : 'assets/img/events/card-event-body-in-the-room.webp?v=1',
    description: 'An online workshop with Aun Ali \u2014 Certified TRE\u2122 Trainer and Clinically Certified Trauma Specialist \u2014 for psychologists, counsellors and narrative therapists who sense that talk alone is not always enough, and want a safe, structured way to bring the body into their work. A trauma-informed approach.',
    facilitator: 'Aun Ali',
    price: 'S$88',
    priceText: 'S$88 \u00b7 discounted S$68 with a code',
    link: 'https://hummingbeing.com/event-body-in-the-room',
    linkText: 'Register \u2014 S$88',
    isNew: true,
    theme: 'theme-deep',
    details: {
      posterTall: { src: 'assets/img/events/event-body-in-the-room-portrait.webp?v=2', alt: 'The Body in the Room — online workshop with Aun Ali, 25 November 2026, 7–9pm Singapore time' },
      summary: 'Many of us were trained to work with stories, thoughts and meaning. Then we sat with clients who could tell their story perfectly and still feel unsafe in their own skin. This workshop is a space for therapists and TRE\u2122 practitioners to talk honestly about what changes when the body becomes part of the therapeutic process.',
      about: [
        'We will look at the framework of trauma-informed care, and explore how and when TRE\u2122 and other body-based practices can be woven into each stage of therapy \u2014 without overwhelming the client or abandoning your existing model.',
        'Led by Aun Ali: Certified TRE\u2122 Trainer, founder of the Trauma Release and Wellness Centre, and Clinically Certified Trauma Specialist (CCTS-I, F, A).',
        'Live on Zoom, Wednesday 25 November 2026, 7:00\u20139:00pm Singapore time. The Zoom link is shared with registered participants.',
        'In partnership with the Trauma Release and Wellness Centre, Karachi, Pakistan.'
      ],
      forWho: [
        'Psychologists, counsellors and narrative therapists',
        'Social workers and other mental health professionals curious about safely integrating somatic practice',
        'TRE\u2122 students and certified providers'
      ],
      schedule: [
        { when: 'Wed 25 Nov', time: '7:00\u20139:00pm SGT \u00b7 Zoom', title: 'The Body in the Room \u2014 live online workshop', text: 'The foundations of trauma-informed care; the phased approach to trauma therapy; where TRE\u2122 fits in each phase; when to hold back; bridging talk and body; real practice, real stories.' }
      ],
      includes: [
        'The foundations of trauma-informed care \u2014 safety, trust, choice, collaboration and empowerment, and what they look like in the body, not just on paper',
        'The phased approach to trauma therapy \u2014 stabilisation, processing and integration, and why the nervous system needs to feel safe before a story can be safely told',
        'Where TRE\u2122 fits in each phase \u2014 regulation and resourcing early on, titrated release during processing, self-practice for long-term integration',
        'When to hold back \u2014 recognising overwhelm, dissociation and shutdown, the window of tolerance, and when body-based work is not the right step yet',
        'Bridging talk and body \u2014 combining somatic awareness with your existing approach, tracking sensation alongside the client\u2019s narrative',
        'Real practice, real stories \u2014 reflections from TRE\u2122 practitioners on how including the body has shifted their work'
      ],
      pricing: [
        { label: 'Public price', sub: 'live online workshop \u00b7 Zoom', price: 'S$88', hl: true },
        { label: 'Discounted price', sub: 'with a discount code', price: 'S$68', note: 'enter your code when you register' }
      ],
      pricingNote: 'All prices in Singapore Dollars. Have a discount code? Enter it in the registration form. The Zoom link is shared with registered participants.',
      facilitators: [AUN],
      partners: 'In partnership with the Trauma Release and Wellness Centre, Karachi, Pakistan',
      online: true,
      register: [
        { label: 'Register \u2014 S$88', url: 'https://hummingbeing.com/event-body-in-the-room', primary: true }
      ],
      source: 'https://bhdasia.com/event-body-in-the-room.html'
    }
  },

  /* ---------- Breath as a medicine \u2014 Ania Zieli\u0144ska (online, 15 Dec 2026) ---------- */
  {
    slug: 'breath-as-medicine',
    title: 'Breath as a medicine \u2014 Introduction to pranayama',
    category: 'Workshop',
    region: 'online',
    location: 'Online',
    venue: 'Zoom (link shared with registered participants)',
    format: 'Live online',
    start: '2026-12-15T19:00',
    dateText: 'Tuesday 15 December 2026',
    timeText: '7:00\u20139:00pm Singapore time (SGT)',
    image: 'assets/img/events/event-breath-as-medicine.webp',
    card     : 'assets/img/events/card-event-breath-as-medicine.webp?v=1',
    description: 'An online introduction to pranayama with Ania Zieli\u0144ska: how conscious breathing supports your physical, mental and emotional wellbeing, with simple techniques to calm, reset, energise and focus. For beginners \u2014 no previous Yoga or Breathwork experience needed.',
    facilitator: 'Ania Zieli\u0144ska',
    price: 'S$88',
    priceText: 'S$88 \u00b7 discounted S$68 with a code',
    link: 'https://hummingbeing.com/event-breath-as-medicine',
    linkText: 'Register \u2014 S$88',
    isNew: true,
    theme: 'theme-bronze',
    details: {
      summary: 'In this introductory workshop, you\u2019ll learn what pranayama is and how conscious breathing can support your physical, mental and emotional wellbeing.',
      about: [
        'We\u2019ll explore the connection between the breath, nervous system and state of mind, and you\u2019ll be introduced to a selection of simple pranayama techniques that can be used in everyday life \u2014 whether you need to calm down, reset, energise and invigorate your body, improve focus or create a greater sense of presence.',
        'The workshop is suitable for beginners and no previous Yoga or Breathwork experience is required.',
        'Live on Zoom, Tuesday 15 December 2026, 7:00\u20139:00pm Singapore time. The Zoom link is shared with registered participants before the session.',
        'Come as you are, with no expectations or previous experience \u2014 just bring your curiosity and your breath.'
      ],
      forWho: [
        'Anybody interested to know more about pranayama',
        'Beginners \u2014 no previous Yoga or Breathwork experience is required'
      ],
      schedule: [
        { when: 'Tue 15 Dec', time: '7:00\u20139:00pm SGT \u00b7 Zoom', title: 'Breath as a medicine \u2014 live online workshop', text: 'What pranayama is, how breathing patterns shape your state of mind and body, simple techniques to practise, and a guided breathing practice.' }
      ],
      includes: [
        'Learn what pranayama means and why breath awareness is an incredible tool to be used in everyday life',
        'Breathwork as a powerful medicine',
        'Explore how different breathing patterns can influence your state of mind and body',
        'Practice simple and accessible pranayama techniques',
        'Experience a guided breathing practice',
        'Learn practical techniques you can incorporate into your daily routine or working day'
      ],
      pricing: [
        { label: 'Public price', sub: 'live online workshop \u00b7 Zoom', price: 'S$88', hl: true },
        { label: 'Discounted price', sub: 'with a discount code', price: 'S$68', note: 'enter your code when you register' }
      ],
      pricingNote: 'All prices in Singapore Dollars. Have a discount code? Enter it in the registration form. The Zoom link is shared with registered participants before the session.',
      posterTall: { src: 'assets/img/events/event-breath-as-medicine-portrait.webp?v=2', alt: 'Breath as a medicine \u2014 online pranayama workshop with Ania Zieli\u0144ska, 15 December 2026, 7\u20139pm Singapore time' },
      facilitators: [ANIA],
      online: false,
      register: [
        { label: 'Register \u2014 S$88', url: 'https://hummingbeing.com/event-breath-as-medicine', primary: true }
      ]
    }
  },

  /* ---------- The Art of Conscious Rest \u2014 Olga Titkova (online, 24 Jan 2027) ---------- */
  {
    slug: 'art-of-conscious-rest',
    title: 'The Art of Conscious Rest \u2014 Experiencing deep relaxation through Yoga Nidra',
    seoTitle: 'The Art of Conscious Rest \u2014 Yoga Nidra with Olga Titkova',
    category: 'Workshop',
    region: 'online',
    location: 'Online',
    venue: 'Zoom (link shared with registered participants)',
    format: 'Live online',
    start: '2027-01-24T20:00',
    dateText: 'Sunday 24 January 2027',
    timeText: '8:00\u201310:00pm Singapore time (SGT)',
    image: 'assets/img/events/event-art-of-conscious-rest.webp?v=1',
    card     : 'assets/img/events/card-event-art-of-conscious-rest.webp?v=1',
    description: 'An experiential online workshop with Olga Titkova introducing Yoga Nidra, a practice rooted in the Tantric yoga tradition that invites deep relaxation while cultivating awareness. For anybody interested to know more about Yoga Nidra \u2014 no previous Yoga Nidra experience is required.',
    facilitator: 'Olga Titkova',
    price: 'S$88',
    priceText: 'S$88 \u00b7 discounted S$68 with a code',
    linkText: 'Register \u2014 S$88',
    isNew: true,
    theme: 'theme-deep',
    details: {
      summary: 'Our increasingly busy and digitally connected lives expose us to constant stimulation and persistent demands on our attention. These conditions can contribute to accumulated physical and mental tension, making it difficult to experience genuine rest.',
      about: [
        'This experiential workshop introduces Yoga Nidra, a practice rooted in the Tantric yoga tradition that invites deep relaxation while cultivating awareness.',
        'Beginning with gentle movement to prepare the body, participants will be guided through conscious breathing and systematic relaxation toward a state of deep rest, where the body relaxes, the mind becomes quiet, and awareness may remain present.',
        'The practice will be followed by personal reflection and group discussion, allowing participants to share their experiences and insights.',
        'Live on Zoom, Sunday 24 January 2027, 8:00\u201310:00pm Singapore time. The Zoom link is shared with registered participants before the session.'
      ],
      forWho: [
        'TRE\u2122 practitioners (Tension & Trauma Releasing Exercises) interested in exploring Yoga Nidra as a complementary approach to deep relaxation, body awareness, and conscious rest',
        'Yoga & Mindfulness Practitioners \u2014 individuals seeking to deepen their experience of relaxation, cultivate awareness, and explore the traditional practice of Yoga Nidra',
        'Corporate & Wellness Professionals \u2014 individuals navigating demanding work environments, sustained mental fatigue, or disrupted sleep who are interested in exploring conscious rest as a way to support relaxation and mental wellbeing',
        'Anyone Seeking Deep Rest \u2014 individuals curious about experiencing profound relaxation and discovering a different approach to rest in everyday life',
        'No previous Yoga Nidra experience is required'
      ],
      schedule: [
        { when: 'Sun 24 Jan', time: '8:00\u201310:00pm SGT \u00b7 Zoom', title: 'The Art of Conscious Rest \u2014 live online workshop', text: 'Gentle movement to prepare the body, conscious breathing, an extended guided Yoga Nidra practice, then personal reflection and group discussion.' }
      ],
      includes: [
        'Explore Awareness \u2014 discover the difference between thinking about the body and directly experiencing sensations through a simple guided exercise',
        'Prepare for Deep Rest \u2014 explore conscious breathing and gentle physical preparation to support relaxation and stillness',
        'Discover Yoga Nidra\u2019s Roots \u2014 learn about the traditional foundations of Yoga Nidra and its effects in modern life',
        'Experience Yoga Nidra \u2014 participate in an extended guided practice, moving through bodily sensations and breath toward deep relaxation and inner stillness',
        'Reflect and Integrate \u2014 share observations and explore how conscious rest may support wellbeing in everyday life'
      ],
      pricing: [
        { label: 'Public price', sub: 'live online workshop \u00b7 Zoom', price: 'S$88', hl: true },
        { label: 'Discounted price', sub: 'with a discount code', price: 'S$68', note: 'enter your code when you register' }
      ],
      pricingNote: 'All prices in Singapore Dollars. Have a discount code? Enter it in the registration form. Payment is handled securely by Illuminate Paths. The Zoom link is shared with registered participants before the session.',
      posterTall: { src: 'assets/img/events/event-art-of-conscious-rest-portrait.webp?v=1', alt: 'The Art of Conscious Rest \u2014 online Yoga Nidra workshop with Olga Titkova, 24 January 2027, 8\u201310pm Singapore time' },
      facilitators: [OLGA],
      online: false,
      register: [
        { label: 'Register \u2014 S$88', url: '#register', primary: true }
      ],
      /* register-first gate: the form comes first, then the payment page (one payment link -> automatic redirect).
         codeHash = SHA-256 of the upper-case discount code; a matching code leads to payDiscount instead. */
      gate: {
        discount: true,
        pay: [{ label: 'Continue to payment \u2014 S$88', url: 'https://pay.illuminatepaths.org/cf90e08e-8777-4842-8223-857', primary: true }],
        payDiscount: { label: 'Continue to payment \u2014 S$68', url: 'https://pay.illuminatepaths.org/25aadd6f-8043-46c8-a7d1-9a9' },
        codeHash: '9d1b4292bdcc47f1f4fecf1e2fabc58fe1a3a64d495a957d51d1617aeaf17281',
        note: 'Payment is handled securely by Illuminate Paths. The Zoom link is shared with registered participants before the session.'
      }
    }
  },

  /* ---------- Singapore certification 2027 cohort (Modules 1–3 + bonuses) ---------- */
  {
    slug: 'tre-provider-certification-2027-singapore',
    title: 'Become a Certified TRE™ Provider — 2027 Cohort (Singapore)',
    category: 'Certification',
    region: 'singapore',
    location: 'Singapore',
    venue: 'Singapore (venue confirmed on registration)',
    format: 'In-Person + online sessions',
    start: '2027-02-27',
    end: '2027-10-31',
    dateText: 'Feb–Oct 2027 · Module 1: 27–28 Feb · Module 2: 3–4 Jul · Module 3: 30–31 Oct 2027',
    chip: { top: '2027', bottom: 'Cohort' },
    image: 'assets/img/events/event-certification-2027.webp?v=2',
    card     : 'assets/img/events/card-event-certification-2027.webp?v=1',
    description: 'The 2027 Singapore cohort of the Global TRE™ Provider Certification — boosted by Internal Alchemy and co-taught by two TRE™ Trainers, Isabelle Claus Teixeira & Simba Stenqvist. Three packages: Growth S$5,888, Foundational S$4,888 and Refresher from S$2,200 (early bird until 31 January 2027).',
    facilitator: 'Isabelle Claus Teixeira & Simba Stenqvist',
    credits: 'ICF credits in the Growth Package',
    price: 'From S$2,200',
    priceNote: 'Growth S$5,888 · Foundational S$4,888 · Refresher from S$2,200 · early bird until 31 Jan 2027',
    link: 'events/tre-provider-certification-2027-singapore#packages',
    linkText: 'Choose a package',
    isNew: true,
    theme: 'theme-deep',
    details: {
      summary: 'The 2027 Singapore cohort of the Global TRE™ Provider Certification — co-taught by Isabelle Claus Teixeira and Simba Stenqvist, and boosted by Internal Alchemy. Choose from three package families: Growth, Foundational or Refresher. One cohort per year.',
      about: [
        'The Global TRE™ Provider Certification qualifies you to offer TRE™ to the general public, in individual and group settings.',
        'The 2027 Singapore cohort is boosted by Internal Alchemy and co-taught by two TRE™ Trainers — Isabelle Claus Teixeira and Simba Stenqvist — for richer, varied learning. Only one cohort runs in Singapore each year.'
      ],
      forWho: [
        'A coach (ACC, PCC, MCC or in training) wanting somatic tools',
        'A therapist, counsellor or psychologist seeking body-based approaches',
        'An HR, wellbeing or corporate resilience professional',
        'A yoga teacher, physiotherapist or movement practitioner',
        'Someone who has experienced TRE™ and wants to share it professionally'
      ],
      schedule: [
        { when: 'Module 1', time: '27–28 Feb 2027 · Singapore · SGT', title: 'Your Personal TRE™ Practice', text: 'A 2-day in-person workshop plus personal sessions: 2 online individual and 2 online group sessions (group sessions on 1 Apr & 1 Jun 2027). ICF CCEs are released on full attendance (Module 1 = 21 CCEs) in the Growth Package.' },
        { when: 'Module 2', time: '3–4 Jul 2027 · Singapore · SGT', title: 'Teaching TRE™ to One Person', text: 'A 2-day in-person workshop plus 2 online group supervisions (19 Jul & 16 Aug 2027) and 2 online individual supervisions.' },
        { when: 'Module 3', time: '30–31 Oct 2027 · Singapore · SGT', title: 'Teaching TRE™ to Groups', text: 'A 2-day in-person workshop plus 3 online individual supervisions and 1 online group supervision (13 Nov 2027). Completes your Global TRE™ Provider certification.' },
        { when: 'Bonuses', time: 'Self-paced online · Growth Package', title: 'Three bonus programmes (value S$1,290)', text: 'Grounding (Simba Stenqvist), Verbal Interventions (Isabelle Claus Teixeira) and Internal Alchemy (Simba Stenqvist). Grounding is released after the Module 2 payment is received; Verbal Interventions and Internal Alchemy after the Module 3 payment is received. Paid in full: all three after Module 2.' }
      ],
      includes: [
        'Three 2-day in-person workshops — Modules 1, 2 & 3 in Singapore',
        'Taught by 2 TRE™ Trainers — varied perspectives and richer learning',
        'Online personal sessions and supervisions — individual and group, across all three modules',
        'Growth Package only: ICF credits (value S$2,000) and three self-paced bonus programmes (value S$1,290) — Grounding, Verbal Interventions and Internal Alchemy',
        'Global TRE™ Certification upon completion of all requirements — qualify to offer TRE™ to individuals and groups',
        'Extra 60-minute online personal sessions or supervisions: S$190 per session, with any package'
      ],
      packages: [
        { name: 'Growth Package', who: 'New students', price: 'S$5,888', regular: 'S$6,888', url: 'certification-2027-growth',
          text: 'The full certification: Modules 1–3, all online personal sessions and supervisions, ICF credits (value S$2,000) and the three self-paced bonus programmes (value S$1,290).',
          inst: 'Instalments S$1,888 + S$2,000 + S$2,000', hl: true },
        { name: 'Foundational Package', who: 'New students', price: 'S$4,888', regular: 'S$5,888', url: 'certification-2027-foundational',
          text: 'The complete certification pathway, without ICF credits and without the bonus programmes.',
          inst: 'Instalments S$1,888 + S$1,500 + S$1,500' },
        { name: 'Refresher Packages', who: 'Accredited TRE™ Providers and TRE™ Provider trainees', price: 'from S$2,200', regular: 'from S$2,900', url: 'certification-2027-refresher',
          text: 'Four options to complete your training: Refresher, Supervised Refresher, Boosted Refresher and Boosted Supervised Refresher.',
          inst: 'Early bird S$2,200 to S$3,990' }
      ],
      pricing: [
        { label: 'Growth Package', sub: 'new students · Modules 1–3 + ICF credits + 3 bonuses', price: 'S$5,888', note: 'early bird to 31 Jan 2027 · then S$6,888', hl: true },
        { label: 'Foundational Package', sub: 'new students · Modules 1–3, no ICF credits or bonuses', price: 'S$4,888', note: 'early bird to 31 Jan 2027 · then S$5,888' },
        { label: 'Refresher Packages', sub: 'accredited Providers and trainees · 4 options', price: 'from S$2,200', note: 'early bird to 31 Jan 2027 · then from S$2,900' }
      ],
      pricingNote: 'All prices in Singapore Dollars. Early-bird pricing applies until 31 January 2027. Payment is by credit card only, through Stripe (Odoo checkout), and card charges are added on top of every instalment. The full package price is owed once the first instalment is paid. Extra 60-minute online personal sessions or supervisions are S$190 each. All ticket sales are final, non-refundable and non-cancellable.',
      facilitators: [ISABELLE, SIMBA],
      online: true,
      register: [
        { label: 'Growth Package — register', url: 'certification-2027-growth#register', primary: true },
        { label: 'Foundational Package — register', url: 'certification-2027-foundational#register' },
        { label: 'Refresher Packages — register', url: 'certification-2027-refresher#register' },
        { label: 'Book a certification intake call', url: CALENDLY }
      ]
    }
  },

  /* ---------- TRE Module 1 ONLINE with TRE Scotland (UK time) ---------- */
  {
    slug: 'tre-module-1-online-tre-scotland-2027',
    title: 'TRE™ Module 1 ONLINE — with TRE Scotland (18–20 June 2027)',
    seoTitle: 'TRE™ Module 1 Online with TRE Scotland, June 2027',
    category: 'Certification',
    region: 'online',
    location: 'Online (Zoom)',
    venue: 'Online · Zoom (the link is sent to registered participants)',
    format: 'Online · 2.5 days',
    tz: 'Europe/London',
    start: '2027-06-18T14:00',
    end: '2027-06-20T18:00',
    dateText: 'Friday 18 – Sunday 20 June 2027',
    timeText: '18 Jun 14:00–17:00 · 19 & 20 Jun 09:30–18:00 (UK time)',
    chip: { top: '18–20', bottom: 'Jun 2027' },
    image: 'assets/img/events/event-tre-module1-online-scotland.webp',
    description: 'ICF-accredited TRE™ Module 1, online in collaboration with TRE Scotland — 2.5 days with 21 ICF CCEUs, valid as Module 1 of the Global TRE™ Provider Certification Program. Small group of up to 15.',
    facilitator: 'Isabelle Claus Teixeira & Vicki Cook (TRE Scotland)',
    credits: '21 ICF CCEUs',
    price: 'From £488',
    priceNote: 'early bird until 31 May 2027 · then £589',
    link: 'https://hummingbeing.com/event-tre-module1-online-scotland#register',
    linkText: 'Register',
    isNew: true,
    theme: 'theme-deep',
    details: {
      posterTall: { src: 'assets/img/events/event-tre-module1-online-scotland-portrait.webp', alt: 'TRE™ Training in the World with ICF CCEUs, online with TRE Scotland — led by Isabelle Claus Teixeira and Vicki Cook, 18–20 June 2027, UK time. Early bird 488 GBP until 31 May 2027, then 589 GBP' },
      summary: 'ICF-accredited TRE™ Module 1, online in collaboration with TRE Scotland. 2.5 training days in UK time, led by Global TRE™ Certifying Trainer Isabelle Claus Teixeira with Vicki Cook of TRE Scotland, in a small group of up to 15 participants, in English.',
      about: [
        'This is ICF-accredited TRE™ Module 1 — the only TRE™ training anywhere in the world that carries ICF CCEUs (21 CCEUs: 16 Resource Development + 5 Core Competencies), issued on attendance and completion of the full 2.5 days.',
        'TRE™ (Tension & Trauma Releasing Exercises) was developed by Dr. David Berceli and activates the body\'s natural neurogenic tremoring mechanism — a reflex that releases stored stress and trauma, builds resilience and promotes deep regulation.',
        'Module 1 qualifies you to use TRE™ for personal practice. With Modules 2 and 3 you become a Certified Global TRE™ Provider. The group is limited to 15 participants and led by a Global TRE™ Certifying Trainer with an assisting provider.'
      ],
      forWho: [
        'A coach (in training or at ACC, PCC, MCC level) looking for an ICF-accredited somatic tool',
        'A therapist, psychologist or healthcare professional expanding a trauma-informed practice',
        'A yoga or Pilates teacher, bodyworker or somatic practitioner',
        'Anyone with chronic stress or burnout who is ready for a body-led approach',
        'Those considering the full Global TRE™ Provider Certification'
      ],
      schedule: [
        { when: 'Day 1 · Fri 18 Jun', time: '2:00–5:00 PM UK time · online', title: 'Self-Care & Presence for Coaches', text: 'An introductory afternoon on nervous system regulation and self-induced therapeutic tremoring, with TRE™ as a personal resilience and self-care practice.' },
        { when: 'Day 2 · Sat 19 Jun', time: '9:30 AM–6:00 PM UK time · online', title: 'TRE™ Module 1 — Part 1', text: 'The neuroscience of neurogenic tremoring, the TRE™ exercise sequence, somatic awareness, containment and grounding. Guided full TRE™ sessions with direct feedback from the trainers.' },
        { when: 'Day 3 · Sun 20 Jun', time: '9:30 AM–6:00 PM UK time · online', title: 'TRE™ Module 1 — Part 2 & Completion', text: 'Deepen the practice, integrate the learning and complete Module 1, with Q&A, personal practice time and guidance toward Modules 2 and 3.' }
      ],
      includes: [
        'Module 1 Certification — valid as Module 1 of the Global TRE™ Provider Certification Program',
        '21 ICF CCEUs — 16 Resource Development + 5 Core Competencies',
        '2.5 training days — including the Day 1 afternoon workshop for coaches',
        'Worldwide recognition under the Global TRE™ Certification Program',
        'A small group of up to 15 participants',
        'Not included: individual TRE™ sessions — add them at £85 per session'
      ],
      pricing: [
        { label: 'Early bird', sub: 'until 31 May 2027', price: '£488', note: 'then £589', hl: true },
        { label: 'Normal price', sub: 'after the early bird', price: '£589' },
        { label: 'Personal TRE™ session', sub: 'optional add-on · not included', price: '£85', note: 'per session' }
      ],
      pricingNote: 'All prices in British pounds (GBP). Limited to 15 participants. Individual TRE™ sessions are not included and can be added at £85 each.',
      facilitators: [ISABELLE, { name: 'Vicki Cook', role: 'TRE Scotland', bio: 'In collaboration with TRE Scotland.' }],
      partners: 'In collaboration with TRE Scotland',
      online: true,
      register: [
        { label: 'Register', url: 'https://hummingbeing.com/event-tre-module1-online-scotland#register', primary: true },
        { label: 'Book a certification intake call', url: CALENDLY }
      ],
      source: 'https://hummingbeing.com/event-tre-module1-online-scotland'
    }
  },

  /* ---------- 2027 package card (Growth Package): a listing card only; its page is /certification-2027-growth ---------- */
  {
    slug: 'certification-2027-growth',
    page: 'certification-2027-growth',
    cardOnly: true,
    title: 'TRE™ Certification 2027: Growth Package',
    category: 'Certification',
    region: 'singapore',
    location: 'Singapore',
    venue: 'Singapore (venue confirmed on registration)',
    format: 'In-Person + online sessions',
    start: '2027-02-27',
    end: '2027-10-31',
    dateText: 'Feb–Oct 2027 · Module 1: 27–28 Feb · Module 2: 3–4 Jul · Module 3: 30–31 Oct 2027',
    chip: { top: '2027', bottom: 'Growth' },
    image: 'assets/img/events/event-certification-2027.webp?v=2',
    card     : 'assets/img/events/card-event-certification-2027.webp?v=1',
    description: 'Growth Package for new students: Modules 1–3, all online personal sessions and supervisions, ICF credits and three self-paced bonus programmes. Early bird S$5,888 until 31 January 2027, then S$6,888.',
    facilitator: 'Isabelle Claus Teixeira & Simba Stenqvist',
    price: 'S$5,888',
    priceNote: 'early bird to 31 Jan 2027 · then S$6,888 · new students',
    link: 'certification-2027-growth',
    linkText: 'See the package',
    theme: 'theme-deep'
  },

  /* ---------- 2027 package card (Foundational Package): a listing card only; its page is /certification-2027-foundational ---------- */
  {
    slug: 'certification-2027-foundational',
    page: 'certification-2027-foundational',
    cardOnly: true,
    title: 'TRE™ Certification 2027: Foundational Package',
    category: 'Certification',
    region: 'singapore',
    location: 'Singapore',
    venue: 'Singapore (venue confirmed on registration)',
    format: 'In-Person + online sessions',
    start: '2027-02-27',
    end: '2027-10-31',
    dateText: 'Feb–Oct 2027 · Module 1: 27–28 Feb · Module 2: 3–4 Jul · Module 3: 30–31 Oct 2027',
    chip: { top: '2027', bottom: 'Foundational' },
    image: 'assets/img/events/event-certification-2027.webp?v=2',
    card     : 'assets/img/events/card-event-certification-2027.webp?v=1',
    description: 'Foundational Package for new students: the complete certification pathway without ICF credits and without the bonus programmes. Early bird S$4,888 until 31 January 2027, then S$5,888.',
    facilitator: 'Isabelle Claus Teixeira & Simba Stenqvist',
    price: 'S$4,888',
    priceNote: 'early bird to 31 Jan 2027 · then S$5,888 · new students',
    link: 'certification-2027-foundational',
    linkText: 'See the package',
    theme: 'theme-deep'
  },

  /* ---------- 2027 package card (Refresher Packages): a listing card only; its page is /certification-2027-refresher ---------- */
  {
    slug: 'certification-2027-refresher',
    page: 'certification-2027-refresher',
    cardOnly: true,
    title: 'TRE™ Certification 2027: Refresher Packages',
    category: 'Certification',
    region: 'singapore',
    location: 'Singapore',
    venue: 'Singapore (venue confirmed on registration)',
    format: 'In-Person + online sessions',
    start: '2027-02-27',
    end: '2027-10-31',
    dateText: 'Feb–Oct 2027 · Module 1: 27–28 Feb · Module 2: 3–4 Jul · Module 3: 30–31 Oct 2027',
    chip: { top: '2027', bottom: 'Refresher' },
    image: 'assets/img/events/event-certification-2027.webp?v=2',
    card     : 'assets/img/events/card-event-certification-2027.webp?v=1',
    description: 'Four Refresher options for accredited TRE™ Providers and TRE™ Provider trainees who want to complete their training. Early bird from S$2,200 until 31 January 2027, then from S$2,900.',
    facilitator: 'Isabelle Claus Teixeira & Simba Stenqvist',
    price: 'From S$2,200',
    priceNote: 'early bird to 31 Jan 2027 · then from S$2,900 · accredited Providers and trainees',
    link: 'certification-2027-refresher',
    linkText: 'See the package',
    theme: 'theme-deep'
  },

  /* ---------- Singapore certification (Modules 1–3) ---------- */
  {
    slug: 'tre-provider-certification-singapore',
    title: 'Become a Certified TRE™ Provider — Singapore (Modules 1–3)',
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
    card     : 'assets/img/events/card-event-transform-practice.webp?v=1',
    description: 'The full Global TRE™ Provider Certification — three 2-day workshops plus 12 online sessions. Qualify to offer TRE™ to the public in individual and group settings. Bundle from S$3,699.',
    facilitator: 'Isabelle Claus Teixeira, Global TRE™ Certifying Trainer',
    credits: '21 ICF CCEUs on Module 1',
    price: 'S$3,699',
    priceNote: 'full bundle · super early bird (early bird S$4,200 · normal S$4,500)',
    link: 'https://hummingbeing.com/event-certification',
    linkText: 'Join waitlist',
    soldOut: true,
    waitlistLink: CALENDLY,
    theme: 'theme-deep',
    details: {
      summary: 'Transform your practice. Empower others. The complete Global TRE™ Provider Certification with Isabelle Claus Teixeira — three modules that take you from your own TRE™ practice to confidently teaching TRE™ to individuals and groups.',
      about: [
        'The Global TRE™ Provider Certification prepares you to teach TRE™ safely, responsibly and professionally. Certified Providers are qualified to offer TRE™ to the general public in both individual and group settings.',
        'The journey is three modules — each a 2-day workshop plus 4 online sessions — taking you from your own personal TRE™ practice (Module 1), to teaching one person (Module 2), to confidently leading groups (Module 3).',
        'You train under Isabelle Claus Teixeira, Global TRE™ Certifying Trainer, accredited by TRE™ for All under Dr. David Berceli\'s methodology. Module 1 is also available online.'
      ],
      forWho: [
        'A coach (ACC, PCC, MCC or in training) wanting somatic tools',
        'A therapist, counsellor or psychologist seeking body-based approaches',
        'An HR, wellbeing or corporate resilience professional',
        'A yoga teacher, physiotherapist or movement practitioner',
        'Someone who has experienced TRE™ and wants to share it professionally'
      ],
      schedule: [
        { when: 'Module 1', time: '29–30 Aug 2026 · Singapore · SGT', title: 'Your Personal TRE™ Practice', text: '2-day workshop + 4 online personal TRE™ sessions. The stress response (anatomy, neurology, physiology), the therapeutic tremor response, TRE™ as a self-practice, self-regulation, containment and grounding. Includes 21 ICF CCEUs.' },
        { when: 'Module 2', time: '26–27 Sep 2026 · Singapore · SGT', title: 'Teaching TRE™ to One Person', text: '2-day workshop + 4 online supervision sessions. Open to those who completed Module 1. Deepens Module 1 content, Polyvagal theory, basic TRE™ interventions and hands-on practice teaching TRE™ one-to-one.' },
        { when: 'Module 3', time: '20–21 Feb 2027 · Singapore · SGT', title: 'Teaching TRE™ to Groups', text: '2-day workshop + 4 online supervision sessions. The role of fascia, advanced interventions and modifications, transference and counter-transference, and experience leading groups of 3+ persons. Completes your certification.' }
      ],
      includes: [
        'Three 2-day workshops — Modules 1, 2 & 3 in Singapore (Module 1 also online)',
        '12 online sessions — 4 personal TRE™ sessions + 8 supervision sessions with Isabelle',
        '21 ICF CCEUs on Module 1 — the only TRE™ training in the world with ICF accreditation',
        'All training materials and manual — plus ongoing mentorship through completion',
        'Global TRE™ Provider certificate — issued by TRE™ for All on qualification',
        'Global provider network — join the TRE™ for All community of practitioners worldwide'
      ],
      pricing: [
        { label: 'Full Certification Journey', sub: 'Modules 1, 2 & 3 · three 2-day workshops + 12 online sessions', price: 'S$3,699', note: 'super early bird · early bird S$4,200 · normal S$4,500', hl: true },
        { label: 'Module 1 only · face-to-face', sub: '2-day workshop + 4 online personal TRE™ sessions · 21 ICF CCEUs', price: 'S$1,290', note: 'super early bird · early bird S$1,500 · normal S$1,800' },
        { label: 'Module 1 only · online', sub: 'Live online workshop + 4 online personal TRE™ sessions', price: 'S$990', note: 'early bird · normal S$1,190' }
      ],
      pricingNote: 'All prices in Singapore Dollars. Early-bird deadlines are relative to the Module 1 start date. All tickets are non-refundable and non-cancellable.',
      facilitators: [ISABELLE],
      online: true,
      register: [
        { label: 'Register your interest', url: 'https://hummingbeing.com/event-certification', primary: true },
        { label: 'Book a certification intake call', url: CALENDLY }
      ],
      source: 'https://hummingbeing.com/event-certification'
    }
  },

  /* ---------- Module 2, Singapore ---------- */
  {
    slug: 'tre-module-2-singapore',
    title: 'TRE™ Module 2 — Teaching TRE™ to One Person',
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
    description: 'Module 2 of the Global TRE™ Provider Certification. Deepens Module 1 content, Polyvagal theory, basic TRE™ interventions and hands-on practice teaching TRE™ one-to-one. Open to those who completed Module 1.',
    facilitator: 'Isabelle Claus Teixeira',
    priceText: 'Part of the certification bundle (from S$3,699)',
    link: 'https://hummingbeing.com/event-certification',
    linkText: 'Enquire',
    theme: 'theme-deep',
    details: {
      summary: 'The second step of the Global TRE™ Provider Certification: from your own practice to guiding one other person safely through TRE™.',
      about: [
        'Module 2 is a 2-day workshop plus 4 online supervision sessions, open to participants who have completed Module 1 (in Singapore, online, or in Bucharest).',
        'It deepens the Module 1 content and adds Polyvagal theory, basic TRE™ interventions and hands-on practice teaching TRE™ to an individual client — with feedback from your Certifying Trainer.'
      ],
      forWho: [
        'Participants who have completed TRE™ Module 1',
        'Coaches, therapists and practitioners continuing toward the full Global TRE™ Provider Certification'
      ],
      schedule: [
        { when: 'Sat 26 Sep', time: 'Singapore · SGT', title: 'Module 2 — Day 1', text: 'Review of the stress response and tremor mechanism, Polyvagal theory, and the basic TRE™ interventions used when teaching one person.' },
        { when: 'Sun 27 Sep', time: 'Singapore · SGT', title: 'Module 2 — Day 2', text: 'Supervised practice delivering TRE™ one-to-one, containment and grounding techniques, and preparation for the 4 online supervision sessions that follow.' }
      ],
      includes: [
        '2-day in-person workshop in Singapore',
        '4 online supervision sessions with Isabelle after the workshop',
        'Progress toward the Global TRE™ Provider certificate issued by TRE™ for All'
      ],
      pricing: [
        { label: 'Full Certification Journey', sub: 'Modules 1, 2 & 3 · three 2-day workshops + 12 online sessions', price: 'S$3,699', note: 'super early bird · early bird S$4,200 · normal S$4,500', hl: true }
      ],
      pricingNote: 'Module 2 is priced as part of the certification bundle. Contact Isabelle for single-module pricing if you completed Module 1 elsewhere. All tickets are non-refundable and non-cancellable.',
      facilitators: [ISABELLE],
      online: false,
      register: [
        { label: 'Enquire about Module 2', url: 'https://hummingbeing.com/event-certification', primary: true },
        { label: 'Book a certification intake call', url: CALENDLY }
      ],
      source: 'https://hummingbeing.com/event-certification'
    }
  },

  /* ---------- From Shaking to Shaping — Bucharest (in-person) ---------- */
  {
    slug: 'from-shaking-to-shaping-bucharest',
    soldOut: true,
    waitlistLink: 'mailto:bonjour@bhdasia.com?subject=Waitlist%3A%20From%20Shaking%20to%20Shaping%20Bucharest',
    title: 'From Shaking to Shaping — Use of TRE™ in a Coaching Context',
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
    card     : 'assets/img/events/card-event-shaking-to-shaping.webp?v=1',
    description: 'A half-day intensive on integrating TRE™ into your coaching practice — neurogenic tremoring as a somatic tool for nervous system regulation and embodied presence. Two in-person sessions in Bucharest, România. Now ICF-accredited: 3 ICF CCEs (1.5 Resource Development + 1.5 Core Competencies).',
    facilitator: 'Isabelle Claus Teixeira & Saymara Ryon',
    price: '€97',
    priceNote: 'per participant · free with TRE™ Module 1 registration',
    link: 'mailto:bonjour@bhdasia.com?subject=Waitlist%3A%20From%20Shaking%20to%20Shaping%20Bucharest',
    linkText: 'Join the waitlist',
    theme: 'theme-bronze',
    details: {
      summary: 'Use of TRE™ in a coaching context — a half-day intensive exploring how neurogenic tremoring can deepen your somatic presence, prevent burnout and transform the way you work with clients. Taught in English; in-person sessions also facilitated in Romanian.',
      about: [
        'TRE™ (Tension, Stress & Trauma Releasing Exercises) activates the body\'s natural tremoring response — a neurogenic mechanism that discharges accumulated stress, tension and trauma from the nervous system.',
        'In this workshop you explore how to use TRE™ within your coaching practice — not just as a self-care tool, but as a somatic method that helps clients move from a state of activation to regulated presence, from trembling uncertainty to purposeful, embodied action.',
        'Each session is a standalone half-day intensive. The 3 September online session has now taken place — see the archived online session for details.'
      ],
      forWho: [
        'Coaches who want to integrate TRE™ into 1-on-1 and group coaching contexts',
        'Practitioners looking for somatic self-care practices to prevent compassion fatigue and burnout',
        'Anyone considering TRE™ Module 1 in Bucharest (15–17 Oct 2026) — this workshop is free with Module 1 registration'
      ],
      schedule: [
        { when: 'Session 1', time: '20 Oct 2026 · 19:00–22:00 EET · Bucharest', title: 'In-person · English & Romanian', text: '€97 per participant. Free if you register for TRE™ Module 1 (March 2027 cohort) or the full certification on the same cohort.' },
        { when: 'Session 2', time: '24 Oct 2026 · 14:30–17:30 EET · Bucharest', title: 'In-person · English & Romanian', text: '€97 per participant. Free if you register for TRE™ Module 1 (March 2027 cohort) or the full certification on the same cohort.' }
      ],
      includes: [
        'The neuroscience behind neurogenic tremoring and nervous system regulation',
        'How to integrate TRE™ into 1-on-1 and group coaching contexts',
        'Somatic self-care practices to prevent compassion fatigue and burnout',
        'Embodied presence and body-led listening skills as a coach',
        'A full TRE™ session experience guided by a Global TRE™ Certifying Trainer'
      ],
      pricing: [
        { label: 'Bucharest · 20 Oct 2026', sub: '19:00–22:00 EET', price: '€97', note: 'sold out', soldOut: true },
        { label: 'Bucharest · 24 Oct 2026', sub: '14:30–17:30 EET', price: '€97', note: 'sold out', soldOut: true }
      ],
      pricingNote: 'Free if you register for TRE™ Module 1 or the full TRE™ certification on the same cohort. All tickets are non-refundable and non-cancellable.',
      facilitators: [ISABELLE, SAYMARA],
      partners: 'In collaboration with Învață să Zbori SRL (Learn to Fly) · TRE™ România · HummingBeing',
      online: false,
      register: [
        { label: 'Join the waitlist', url: 'mailto:bonjour@bhdasia.com?subject=Waitlist%3A%20From%20Shaking%20to%20Shaping%20Bucharest', primary: true },
        { label: 'Event page on HummingBeing', url: 'https://hummingbeing.com/event-shaking-to-shaping' }
      ],
      source: 'https://hummingbeing.com/event-shaking-to-shaping'
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
    card     : 'assets/img/events/card-event-shaking-to-shaping-sep3.webp?v=1',
    description: 'The 3 September 2026 online session of From Shaking to Shaping — use of TRE™ in a coaching context, co-facilitated by Isabelle Claus Teixeira & Saymara Ryon. Fully booked; this session has now taken place.',
    facilitator: 'Isabelle Claus Teixeira & Saymara Ryon',
    price: '€89',
    priceNote: 'per participant · sold out',
    soldOut: true,
    link: 'https://hummingbeing.com/event-shaking-to-shaping-sep3',
    linkText: 'View event',
    theme: 'theme-bronze',
    details: {
      summary: 'The 3 September 2026 online session of From Shaking to Shaping — a half-day intensive on using TRE™ in a coaching context. This session was fully booked and has now taken place; the in-person Bucharest sessions (20 & 24 October 2026) are still open.',
      about: [
        'TRE™ (Tension, Stress & Trauma Releasing Exercises) activates the body\'s natural tremoring response — a neurogenic mechanism that discharges accumulated stress, tension and trauma from the nervous system.',
        'In this workshop you explore how to use TRE™ within your coaching practice — not just as a self-care tool, but as a somatic method that helps clients move from a state of activation to regulated presence.',
        'This online session took place on 3 September 2026 (10:00–13:00 EET) and was fully booked. For the next opportunity, see the in-person Bucharest sessions or our upcoming events.'
      ],
      forWho: [
        'Coaches who want to integrate TRE™ into 1-on-1 and group coaching contexts',
        'Practitioners looking for somatic self-care practices to prevent compassion fatigue and burnout',
        'Anyone considering TRE™ Module 1 in Bucharest (15–17 Oct 2026)'
      ],
      schedule: [
        { when: '3 Sep 2026', time: '10:00–13:00 EET · Online (English)', title: 'Completed', text: '€89 per participant. This session was fully booked and has now taken place.' }
      ],
      includes: [
        'The neuroscience behind neurogenic tremoring and nervous system regulation',
        'How to integrate TRE™ into 1-on-1 and group coaching contexts',
        'Somatic self-care practices to prevent compassion fatigue and burnout',
        'Embodied presence and body-led listening skills as a coach',
        'A full TRE™ session experience guided by a Global TRE™ Certifying Trainer'
      ],
      pricing: [
        { label: 'Online session · 3 Sep 2026', sub: '10:00–13:00 EET', price: '€89', note: 'sold out — event ended', soldOut: true }
      ],
      pricingNote: 'This session has ended. All tickets were non-refundable and non-cancellable.',
      facilitators: [ISABELLE, SAYMARA],
      partners: 'In collaboration with Învață să Zbori SRL (Learn to Fly) · TRE™ România · HummingBeing',
      online: true,
      register: [
        { label: 'See upcoming events', url: 'events', primary: true },
        { label: 'Bucharest sessions (20 & 24 Oct)', url: 'event?id=from-shaking-to-shaping-bucharest' }
      ],
      source: 'https://hummingbeing.com/event-shaking-to-shaping-sep3'
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
    card     : 'assets/img/events/card-event-shaking-online.webp?v=1',
    description: 'A live online workshop on using TRE™ in a coaching context — nervous system regulation, embodied presence and resilience. Co-led by Isabelle Claus Teixeira & Saymara Ryon, in partnership with Neurogenic Integration. Now ICF-accredited: 3 ICF CCEs (1.5 Resource Development + 1.5 Core Competencies).',
    facilitator: 'Isabelle Claus Teixeira & Saymara Ryon',
    priceText: 'Registration via Neurogenic Integration',
    link: 'https://neurogenic-integration.com/',
    linkText: 'Register',
    isNew: true,
    theme: 'theme-orange',
    details: {
      summary: 'Discover how TRE™ and self-induced neurogenic tremoring can become powerful tools within your coaching practice — supporting nervous system regulation, embodied presence and lasting resilience for you and your clients. Join live from anywhere in the world.',
      about: [
        'This live online session is co-facilitated by Isabelle Claus Teixeira and Saymara Ryon, and hosted in partnership with Neurogenic Integration.',
        'You will understand the neuroscience of tremoring and nervous system regulation, explore how somatic tools deepen presence and rapport in coaching, and experience a guided practice you can bring into your own work.',
        'Registration is handled by Neurogenic Integration. You can also leave your details with HummingBeing and receive the link and joining details.'
      ],
      forWho: [
        'Coaches (in training or at ACC, PCC and MCC level) curious about somatic tools',
        'Practitioners who want to bring TRE™ into coaching conversations',
        'Anyone who prefers to join online, from any country'
      ],
      schedule: [
        { when: 'Thu 8 Oct', time: '7:00 – 9:00pm · Zoom', title: 'From Shaking to Shaping — live online', text: 'Neuroscience of tremoring and regulation · somatic tools for presence and rapport · a guided TRE™ practice you can use in your own work · Q&A with both facilitators.' }
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
        { label: 'Enquire via HummingBeing', url: 'https://hummingbeing.com/event-shaking-online' }
      ],
      source: 'https://hummingbeing.com/event-shaking-online'
    }
  },

  {
    slug: 'feminine-masculine-energetics-corporate',
    title: 'Navigating Feminine & Masculine Energetics Inside Corporate Structures',
    seoTitle: 'Feminine & Masculine Energetics in Corporate Structures',
    category: 'Workshop',
    region: 'online',
    location: 'Online',
    venue: 'Zoom (joining details sent on registration)',
    format: 'Live online',
    start: '2026-10-28T19:00',
    dateText: 'Wednesday 28 October 2026',
    timeText: '7:00 \u2013 9:30pm Singapore time (6pm Bangkok)',
    image: 'assets/img/events/event-feminine-masculine.webp?v=3',
    card     : 'assets/img/events/card-event-feminine-masculine.webp?v=1',
    description: 'A live online workshop with Sara Marie \u2014 The Alchemist \u2014 bringing energetic awareness together with somatic embodiment, so navigating masculine corporate structures becomes a place of liberation, ease and personal power.',
    facilitator: 'Sara Marie',
    priceText: 'Public 88 SGD (69 USD) \u00b7 TRE\u2122 providers 68 SGD',
    link: 'https://hummingbeing.com/event-feminine-masculine-energetics',
    linkText: 'Register',
    isNew: true,
    theme: 'theme-orange',
    details: {
      posterTall: { src: 'assets/img/events/event-feminine-masculine-portrait.webp?v=2', alt: 'Navigating Feminine & Masculine Energetics Inside Corporate Structures — online workshop with Sara Marie, 28 October 2026, 7–9:30pm Singapore time' },
      summary: 'The corporate structure is one of the clearest expressions of masculine dynamics in the modern world. This live online workshop brings energetic awareness together with somatic embodiment, so navigating those structures becomes a place of liberation, ease and personal power.',
      about: [
        'This workshop is for women working inside corporate environments \u2014 or carrying the effects of having left them \u2014 for entrepreneurs holding the full weight of their business inside masculine business structures, and for practitioners, coaches and somatic therapists working inside these dynamics or supporting clients who are.',
        'When a woman moves through a masculine structure day after day, her system starts to organise around it as if it were the only reality available: a body that stays tense even at rest, a mind that keeps producing when the day is done, and a growing distance from her own cycles and instincts. Over time this creates real cost \u2014 exhaustion that sleep does not fix, a nervous system stuck in overdrive, and disconnection from her own feminine intelligence.',
        'Registration and payment are handled by Sara Marie via Calendly, and all proceeds go directly to her. A replay is available to all registrants.'
      ],
      forWho: [
        'Women working inside corporate environments, or carrying the effects of having left them',
        'Entrepreneurs holding the full weight of their business inside masculine business structures',
        'Practitioners, coaches and somatic therapists working inside these dynamics or supporting clients who are'
      ],
      schedule: [
        { when: 'Wed 28 Oct', time: '7:00 \u2013 9:30pm \u00b7 Zoom', title: 'Navigating Feminine & Masculine Energetics \u2014 live online', text: 'Three parts: an interactive workshop with an energetic transmission on the masculine dynamics in corporate and global structures, a spinal flow with neurogenic tremors, and space for questions.' }
      ],
      includes: [
        'An energetic transmission on the masculine dynamics running through corporate and global structures',
        'How these structures affect the feminine body, and how to alchemise that pressure into personal power',
        'How Sara worked with her own masculine buildup from years inside masculine environments, and brought it into balance',
        'A spinal flow with neurogenic tremors, and space for questions'
      ],
      pricing: [
        { label: 'Public', sub: 'open to all', price: '88 SGD', note: '69 USD' },
        { label: 'TRE\u2122 providers trained by Isabelle & Simba', sub: 'concession', price: '68 SGD', note: '' }
      ],
      pricingNote: 'Registration and payment via Sara Marie on Calendly, and all proceeds go to her. Guest and concessionary places are arranged directly with Isabelle. All tickets are non-refundable and non-cancellable.',
      facilitators: [SARA],
      partners: 'Presented with Living with the Spirit',
      online: true,
      register: [
        { label: 'Register now', url: 'https://hummingbeing.com/event-feminine-masculine-energetics', primary: true }
      ],
      source: 'https://hummingbeing.com/event-feminine-masculine-energetics'
    }
  },

  /* ---------- TRE Module 1 — Bucharest ---------- */
  {
    slug: 'tre-module-1-bucharest',
    soldOut: true,
    waitlistLink: 'mailto:bonjour@bhdasia.com?subject=Waitlist%3A%20TRE%20Module%201%20Bucharest',
    title: 'TRE™ Module 1 — Bucharest, Romania (in English)',
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
    card     : 'assets/img/events/card-event-bucharest-module1.webp?v=1',
    description: 'A 3-day immersive certification — the first TRE™ Module 1 in Europe in English and the only TRE™ training in the world with ICF accreditation. Valid as Module 1 of the Global TRE™ Provider Certification. Only 20 places.',
    facilitator: 'Isabelle Claus Teixeira & Saymara Ryon',
    credits: '21 ICF CCEUs',
    price: 'From €739',
    priceNote: 'per person · tiers rise as tickets sell (€739 · €769 · €799)',
    link: 'mailto:bonjour@bhdasia.com?subject=Waitlist%3A%20TRE%20Module%201%20Bucharest',
    linkText: 'Join the waitlist',
    theme: 'theme-deep',
    details: {
      summary: 'A 3-day immersive certification training — valid as Module 1 of the Global TRE™ Provider Certification Program. Learn to use and teach Tension & Trauma Releasing Exercises under two internationally certified trainers. Ideal for Singapore-based practitioners travelling in Europe.',
      about: [
        'This is the first ICF-accredited TRE™ Module 1 in Europe — the only TRE™ training anywhere in the world that carries ICF CCEUs (21 CCEUs: 16 Resource Development + 5 Core Competencies).',
        'TRE™ (Tension, Stress & Trauma Releasing Exercises) was developed by Dr. David Berceli and activates the body\'s natural neurogenic tremoring mechanism — a reflex that releases stored stress and trauma from the nervous system, builds resilience and promotes deep regulation.',
        'Completing Module 1 qualifies you to use TRE™ for personal practice. Combined with Modules 2 and 3, you become a Certified Global TRE™ Provider — accredited to offer TRE™ to individuals and groups.'
      ],
      forWho: [
        'A coach (in training or at ACC, PCC, MCC level) looking for an ICF-accredited somatic tool',
        'A therapist, psychologist or healthcare professional wanting to expand your trauma-informed practice',
        'A yoga teacher, bodyworker or somatic practitioner adding neuroscience-backed tools',
        'Anyone experiencing chronic stress, burnout or trauma and ready for a body-led approach to healing',
        'Those considering the full Global TRE™ Provider Certification (Modules 1, 2 & 3)'
      ],
      schedule: [
        { when: 'Day 1 · 15 Oct', time: '17:00–19:00 EET', title: 'Introductory Evening: Self-Care and Presence for Coaches', text: 'An introductory evening on nervous system regulation and self-induced therapeutic tremoring, designed for coaches. This session counts as the "From Shaking to Shaping" workshop experience when combined with Module 1 registration.' },
        { when: 'Day 2 · 16 Oct', time: '09:00–18:00 EET', title: 'TRE™ Module 1 — Full Certification Day', text: 'The neuroscience of neurogenic tremoring, the TRE™ exercise sequence, somatic awareness, containment and grounding practices. Guided full TRE™ sessions with direct feedback from your trainers.' },
        { when: 'Day 3 · 17 Oct', time: '09:00–18:00 EET', title: 'TRE™ Module 1 — Continued & Completion', text: 'Deepen your practice, integrate the learning and complete Module 1 requirements. Q&A, personal practice time and guidance on continuing toward Modules 2 and 3. Certificate of completion issued.' }
      ],
      includes: [
        'Module 1 Certification — valid as Module 1 of the Global TRE™ Provider Certification Program',
        '21 ICF CCEUs — 16 Resource Development + 5 Core Competencies (ICF-accredited)',
        '2.5 training days — including the evening workshop on Day 1',
        'Co-facilitation — taught by two internationally certified TRE™ trainers, in English',
        'Global certification recognition under the Global TRE™ Certification Program'
      ],
      pricing: [
        { label: 'Super Early Bird', sub: 'First 5 tickets · limited, sells first', price: '€739', note: 'sold out', soldOut: true },
        { label: 'Early Bird', sub: 'Next 5 tickets', price: '€769', note: 'sold out', soldOut: true },
        { label: 'Full Price', sub: 'Final 10 tickets', price: '€799', note: 'sold out', soldOut: true }
      ],
      pricingNote: 'Only 20 places. Prices step up automatically as each block of tickets sells — register early to secure the lowest tier. A single registration form and QR code are provided on confirmation. All tickets are non-refundable and non-cancellable.',
      facilitators: [ISABELLE, SAYMARA],
      partners: 'In collaboration with Învață să Zbori SRL (Learn to Fly) · TRE™ România · HummingBeing',
      online: false,
      register: [
        { label: 'Join the waitlist', url: 'mailto:bonjour@bhdasia.com?subject=Waitlist%3A%20TRE%20Module%201%20Bucharest', primary: true },
        { label: 'Book a certification intake call', url: CALENDLY }
      ],
      source: 'https://hummingbeing.com/event-tre-module1-bucharest'
    }
  },

  /* ---------- Module 3, Singapore ---------- */
  {
    slug: 'tre-module-3-singapore',
    title: 'TRE™ Module 3 — Teaching TRE™ to Groups',
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
    description: 'Module 3 of the Global TRE™ Provider Certification. The role of fascia, advanced interventions and modifications, transference and counter-transference, and experience leading groups of 3+ people. Completes your certification.',
    facilitator: 'Isabelle Claus Teixeira',
    priceText: 'Part of the certification bundle (from S$3,699)',
    soldOut: true,
    link: 'https://hummingbeing.com/event-certification',
    linkText: 'Join waitlist',
    theme: 'theme-deep',
    details: {
      summary: 'The final module of the Global TRE™ Provider Certification: leading TRE™ for groups with confidence, and completing your qualification as a Certified Provider.',
      about: [
        'Module 3 is a 2-day workshop plus 4 online supervision sessions, open to participants who have completed Module 2.',
        'It covers the role of fascia, advanced interventions and modifications, transference and counter-transference, and gives you supervised experience leading groups of three or more people. On completion you receive the Global TRE™ Provider certificate issued by TRE™ for All.'
      ],
      forWho: [
        'Participants who have completed TRE™ Modules 1 and 2',
        'Practitioners who want to offer TRE™ group sessions, workshops and corporate programmes'
      ],
      schedule: [
        { when: 'Sat 20 Feb', time: 'Singapore · SGT', title: 'Module 3 — Day 1', text: 'Fascia and the tremor mechanism, advanced interventions and modifications, transference and counter-transference in group settings.' },
        { when: 'Sun 21 Feb', time: 'Singapore · SGT', title: 'Module 3 — Day 2', text: 'Supervised practice leading groups of 3+ people, safety and containment for groups, and completion of certification requirements.' }
      ],
      includes: [
        '2-day in-person workshop in Singapore',
        '4 online supervision sessions with Isabelle after the workshop',
        'Global TRE™ Provider certificate issued by TRE™ for All on qualification'
      ],
      pricing: [
        { label: 'Full Certification Journey', sub: 'Modules 1, 2 & 3 · three 2-day workshops + 12 online sessions', price: 'S$3,699', note: 'super early bird · early bird S$4,200 · normal S$4,500', hl: true }
      ],
      pricingNote: 'Module 3 is priced as part of the certification bundle. All tickets are non-refundable and non-cancellable.',
      facilitators: [ISABELLE],
      online: false,
      register: [
        { label: 'Join the waitlist (2026 cohort full)', url: 'https://hummingbeing.com/event-certification', primary: true },
        { label: 'Book a certification intake call', url: CALENDLY }
      ],
      source: 'https://hummingbeing.com/event-certification'
    }
  },

  /* ---------- Past events ---------- */
  {
    slug: 'nervous-system-regulation-coaches-singapore',
    title: 'Nervous System Regulation & Self-Induced Neurogenic Tremoring — For Coaches',
    seoTitle: 'Nervous System Regulation & Neurogenic Tremoring for Coaches',
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
    card     : 'assets/img/events/card-event-nervous-system.webp?v=1',
    description: 'Self-care and presence for coaches — a 2-day ICF-accredited TRE™ workshop (21 CCEUs), valid as Module 1 of the Global TRE™ Provider Certification. Sold out.',
    facilitator: 'Isabelle Claus Teixeira',
    credits: '21 ICF CCEUs · 16 Resource Development + 5 Core Competencies',
    price: 'S$1,290',
    priceNote: 'ICF special price (early bird S$1,500 · normal S$1,800)',
    soldOut: true,
    waitlistLink: 'https://hummingbeing.com/event-selfcare-coaches-singapore',
    link: 'https://hummingbeing.com/event-selfcare-coaches-singapore',
    theme: 'theme-bronze',
    details: {
      summary: 'A 2-day in-person TRE™ workshop for coaches — develop embodied self-care, prevent burnout and deepen your somatic presence with clients. Valid as Module 1 of the Global TRE™ Provider Certification Program.',
      about: [
        'Designed specifically for coaches — whether in training or at ACC, PCC or MCC level — who want to develop embodied self-care practices, prevent burnout and compassion fatigue, and deepen their somatic presence with clients.',
        'TRE™ activates the body\'s natural neurogenic tremoring response — a reflex that discharges stored stress and tension from the nervous system, builds resilience and promotes deep regulation.',
        'This workshop counted as Module 1 of the Global TRE™ Provider Certification Program — the first step toward becoming a Certified TRE™ Provider. It sold out; the next Module 1 runs in Bucharest on 15–17 October 2026, and the Singapore certification continues with Module 2 on 26–27 September 2026.'
      ],
      forWho: [
        'Coaches in training and ACC, PCC & MCC level coaches',
        'Those looking to prevent and recover from compassion fatigue and burnout',
        'Those wanting a body-led modality for deep nervous system resilience',
        'Coaches considering the full Global TRE™ Provider Certification (Modules 1, 2 & 3)'
      ],
      schedule: [
        { when: 'Day 1 · 29 Aug', time: 'Saturday · SGT', title: 'TRE™ Module 1 — Part 1', text: 'Introduction to TRE™ and the neuroscience of neurogenic tremoring. Guided full TRE™ session and somatic awareness practices. Personal resilience tools for coaches and helping professionals.' },
        { when: 'Day 2 · 30 Aug', time: 'Sunday · SGT', title: 'TRE™ Module 1 — Part 2 & Completion', text: 'Deepening the practice, integration and completion of Module 1 requirements. Guidance on continuing toward Modules 2 and 3. Certificate of completion issued.' }
      ],
      includes: [
        '2-day ICF certified workshop — in person in Singapore',
        '4 personal online TRE™ sessions with Isabelle after the workshop',
        '16 Resource Development CCEUs + 5 Core Competency CCEUs (21 total)',
        'Module 1 certification — valid toward the Global TRE™ Provider Certification'
      ],
      pricing: [
        { label: 'ICF special price', sub: 'until 15 August 2026', price: 'S$1,290', note: 'early bird S$1,500 until 31 Jul · normal S$1,800', hl: true, soldOut: true }
      ],
      pricingNote: 'This event is sold out. Join the waitlist on HummingBeing to be notified of releases or the next date.',
      facilitators: [ISABELLE],
      online: false,
      register: [
        { label: 'Join the waitlist', url: 'https://hummingbeing.com/event-selfcare-coaches-singapore', primary: true },
        { label: 'See the next Module 1 (Bucharest)', url: 'event?id=tre-module-1-bucharest' }
      ],
      source: 'https://hummingbeing.com/event-selfcare-coaches-singapore'
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
    card     : 'assets/img/events/card-event-internal-alchemy.webp?v=1',
    description: 'First time in Singapore. Breathwork, fascial release, grounding and tremor work with Simba Stenqvist, Global TRE™ Certifying Trainer and creator of Internal Alchemy.',
    facilitator: 'Simba Stenqvist',
    price: 'S$79',
    priceNote: '2-hour introductory workshop',
    link: 'https://hummingbeing.com/event-internal-alchemy',
    theme: 'theme-orange',
    details: {
      summary: 'An integrated system combining breathwork, fascial release, grounding and tremor work — restoring the nervous system at the level where tension actually lives. Led by Simba Stenqvist, first time in Singapore.',
      about: [
        'Internal Alchemy is an integrated system combining breathwork, fascial release, grounding and tremor work — restoring the nervous system at the level where tension actually lives.',
        'It brings more than twenty-five years of hands-on practice in bodywork, nervous system regulation and energetic healing into one integrated system, developed in close collaboration with Dr David Berceli, founder of TRE™.'
      ],
      forWho: [
        'Anyone curious about breathwork, fascial release and tremor work',
        'TRE™ practitioners and trainees who want to experience a complementary somatic system'
      ],
      schedule: [
        { when: 'Tue 1 Sep', time: '7:00 – 9:00pm SGT · Singapore', title: 'Internal Alchemy — introductory evening', text: 'Breathwork · fascial release · grounding · tremor work, guided by Simba Stenqvist.' }
      ],
      includes: ['2-hour in-person introductory workshop in Singapore'],
      pricing: [{ label: 'Introductory workshop', sub: '1 September 2026 · 7–9pm · Singapore', price: 'S$79', note: 'per person', hl: true }],
      pricingNote: 'All tickets are non-refundable and non-cancellable.',
      facilitators: [{
        name: 'Simba Stenqvist',
        role: 'Global TRE™ Certifying Trainer · Creator of Internal Alchemy',
        bio: 'Global TRE™ Certifying Trainer and the creator of Internal Alchemy — a system born from more than twenty-five years of hands-on practice in bodywork, nervous system regulation and energetic healing, developed in close collaboration with Dr David Berceli, founder of TRE™. His official practice is Living with the Spirit.',
        link: 'https://livingwiththespirit.com/', linkText: 'livingwiththespirit.com'
      }],
      online: false,
      register: [{ label: 'Event page on HummingBeing', url: 'https://hummingbeing.com/event-internal-alchemy', primary: true }],
      source: 'https://hummingbeing.com/event-internal-alchemy'
    }
  }
];
