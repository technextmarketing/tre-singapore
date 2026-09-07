/* =========================================================
   EVENTS DATA — edit this file to add, change or remove events.
   Each event object supports:
     title        : string (required)
     category     : "Certification" | "Workshop" | "Community" | "Coaching"
     region       : "singapore" | "online" | "international"   (used by the filter tabs)
     location     : short label shown on the card badge (e.g. "Singapore")
     venue        : fuller venue text (optional)
     format       : "In-Person" | "Online" | "Online & In-Person" (optional)
     start        : "YYYY-MM-DD" or "YYYY-MM-DDTHH:MM" (required; local time)
     end          : "YYYY-MM-DD" (optional; for multi-day events)
     dateText     : human-readable date line (required)
     timeText     : human-readable time (optional)
     chip         : {top:"29–30", bottom:"Aug 2026"} to override the date chip (optional)
     description  : short paragraph
     facilitator  : name(s) (optional)
     credits      : e.g. "21 ICF CCEUs" (optional)
     price        : e.g. "S$79" (optional)  priceNote: e.g. "early bird" (optional)
     priceText    : shown when there is no price (optional)
     link         : registration / details URL   linkText: button label (optional)
     soldOut      : true/false   waitlistLink: URL shown when sold out
     isNew        : true to show a "New" badge
     theme        : "theme-deep" | "theme-bronze" | "theme-orange" | "theme-green" (optional)
     sample       : true marks a placeholder listing that should be confirmed or removed
   Events whose end date (or start date) has passed move automatically to "Past events".
   ========================================================= */
window.TRE_EVENTS = [
  {
    title: "Global TRE™ Provider Certification — Singapore (Modules 1–3)",
    category: "Certification",
    region: "singapore",
    location: "Singapore",
    venue: "Singapore (central venue confirmed on registration)",
    format: "In-Person + online sessions",
    start: "2026-08-29",
    end: "2027-02-21",
    dateText: "Aug 2026 – Feb 2027 · Module 1: 29–30 Aug · Module 2: 26–27 Sep · Module 3: 20–21 Feb 2027",
    chip: { top: "3", bottom: "Modules" },
    description: "The full Global TRE™ Provider Certification: three 2-day workshops plus 12 online sessions. Graduates are qualified to offer individual and group TRE™ sessions worldwide.",
    facilitator: "Isabelle Claus Teixeira, Global TRE™ Certifying Trainer",
    credits: "21 ICF CCEUs on Module 1",
    price: "S$3,699",
    priceNote: "full bundle, super early bird (regular S$4,500)",
    link: "https://www.hummingbeing.com/event-certification.html",
    linkText: "Programme details",
    theme: "theme-deep"
  },
  {
    title: "TRE™ Module 2 — Teaching TRE™ One-to-One",
    category: "Certification",
    region: "singapore",
    location: "Singapore",
    venue: "Singapore",
    format: "In-Person",
    start: "2026-09-26",
    end: "2026-09-27",
    dateText: "Saturday 26 – Sunday 27 September 2026",
    timeText: "Two full days, followed by 4 online supervision sessions",
    chip: { top: "26–27", bottom: "Sep 2026" },
    description: "Polyvagal theory, basic interventions and hands-on practice delivering TRE™ to an individual client. Open to participants who have completed Module 1.",
    facilitator: "Isabelle Claus Teixeira",
    priceText: "Included in the certification bundle",
    link: "https://www.hummingbeing.com/event-certification.html",
    linkText: "Enquire"
  },
  {
    title: "From Shaking to Shaping — Integrating TRE™ into Coaching",
    category: "Workshop",
    region: "international",
    location: "Bucharest, Romania",
    venue: "Bucharest, Romania",
    format: "Online & In-Person",
    start: "2026-09-15",
    end: "2026-10-31",
    dateText: "September – October 2026",
    chip: { top: "Sep–Oct", bottom: "2026" },
    description: "A programme for coaches on using self-induced neurogenic tremoring for nervous system regulation with clients — from personal practice to professional application.",
    facilitator: "Isabelle Claus Teixeira with Neurogenic Integration",
    priceText: "See event page for pricing",
    link: "https://www.hummingbeing.com/event-shaking-to-shaping.html",
    linkText: "Event details",
    theme: "theme-bronze"
  },
  {
    title: "From Shaking to Shaping — Live Online Workshop",
    category: "Workshop",
    region: "online",
    location: "Online",
    venue: "Zoom (link sent on registration)",
    format: "Live online",
    start: "2026-10-08T19:00",
    dateText: "Thursday 8 October 2026",
    timeText: "7:00 – 9:00pm",
    description: "An evening workshop on bringing TRE™ into coaching conversations: when to use it, how to hold the space, and how to integrate what the body releases.",
    facilitator: "Isabelle Claus Teixeira & Saymara Ryon",
    priceText: "See event page for pricing",
    link: "https://www.hummingbeing.com/event-shaking-online.html",
    linkText: "Register",
    theme: "theme-orange"
  },
  {
    title: "TRE™ Module 1 — Bucharest (in English)",
    category: "Certification",
    region: "international",
    location: "Bucharest, Romania",
    venue: "Bucharest, Romania",
    format: "In-Person",
    start: "2026-10-15",
    end: "2026-10-17",
    dateText: "Thursday 15 – Saturday 17 October 2026",
    timeText: "Immersive 3-day certification",
    chip: { top: "15–17", bottom: "Oct 2026" },
    description: "The first Module 1 in Europe delivered in English. Valid as Module 1 of the Global TRE™ Provider Certification and ideal for Singapore-based practitioners travelling in Europe.",
    facilitator: "Isabelle Claus Teixeira",
    credits: "21 ICF CCEUs",
    priceText: "See event page for pricing",
    link: "https://www.hummingbeing.com/event-tre-module1-bucharest.html",
    linkText: "Register",
    theme: "theme-deep"
  },
  {
    title: "TRE™ Provider Practice Circle",
    category: "Community",
    region: "singapore",
    location: "Singapore",
    venue: "Central Singapore (venue shared with RSVP)",
    format: "In-Person",
    start: "2026-10-22T19:30",
    dateText: "Thursday 22 October 2026",
    timeText: "7:30 – 9:00pm",
    description: "A monthly peer circle for certified TRE™ providers and trainees: shared tremoring, case discussion and supervision questions in a supportive setting.",
    facilitator: "Hosted by TRE™ in Singapore",
    price: "Free",
    priceNote: "for listed providers · S$25 for guests",
    link: "contact.html",
    linkText: "RSVP",
    sample: true
  },
  {
    title: "Introduction to TRE™ — Community Group Session",
    category: "Community",
    region: "singapore",
    location: "Singapore",
    venue: "Central Singapore (venue shared with RSVP)",
    format: "In-Person",
    start: "2026-11-07T10:00",
    dateText: "Saturday 7 November 2026",
    timeText: "10:00 – 11:30am",
    description: "New to TRE™? Learn the seven exercises with a certified provider, experience a guided tremor session and leave with a safe self-practice routine.",
    facilitator: "Certified TRE™ Provider (Singapore)",
    price: "S$45",
    link: "contact.html",
    linkText: "Reserve a spot",
    isNew: true,
    sample: true
  },
  {
    title: "TRE™ Module 3 — Teaching TRE™ to Groups",
    category: "Certification",
    region: "singapore",
    location: "Singapore",
    venue: "Singapore",
    format: "In-Person",
    start: "2027-02-20",
    end: "2027-02-21",
    dateText: "Saturday 20 – Sunday 21 February 2027",
    timeText: "Two full days, followed by 4 online supervision sessions",
    chip: { top: "20–21", bottom: "Feb 2027" },
    description: "Fascia, advanced interventions and group facilitation for three or more participants. Completes the Global TRE™ Provider Certification.",
    facilitator: "Isabelle Claus Teixeira",
    priceText: "Included in the certification bundle",
    link: "https://www.hummingbeing.com/event-certification.html",
    linkText: "Enquire"
  },

  /* ---------- Past events ---------- */
  {
    title: "Nervous System Regulation & Self-Induced Neurogenic Tremoring",
    category: "Workshop",
    region: "singapore",
    location: "Singapore",
    venue: "Singapore",
    format: "In-Person",
    start: "2026-08-29",
    end: "2026-08-30",
    dateText: "29 – 30 August 2026",
    chip: { top: "29–30", bottom: "Aug 2026" },
    description: "Self-care and presence for coaches — a 2-day ICF-accredited workshop, valid as Module 1 of the Global TRE™ Provider Certification.",
    facilitator: "Isabelle Claus Teixeira",
    credits: "21 CCEUs, ICF accredited",
    soldOut: true,
    waitlistLink: "https://www.hummingbeing.com/event-selfcare-coaches-singapore.html",
    link: "https://www.hummingbeing.com/event-selfcare-coaches-singapore.html",
    theme: "theme-bronze"
  },
  {
    title: "Internal Alchemy — Introductory Workshop",
    category: "Workshop",
    region: "singapore",
    location: "Singapore",
    venue: "Singapore",
    format: "In-Person",
    start: "2026-09-01T19:00",
    dateText: "Tuesday 1 September 2026",
    timeText: "7:00 – 9:00pm SGT",
    description: "Breathwork, fascial release, grounding and tremor work with Simba Stenqvist, Global TRE™ Certifying Trainer and creator of Internal Alchemy.",
    facilitator: "Simba Stenqvist",
    price: "S$79",
    link: "https://www.hummingbeing.com/event-internal-alchemy.html",
    theme: "theme-orange"
  }
];
