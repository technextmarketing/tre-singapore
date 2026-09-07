# TRE™ in Singapore — website

A static, dependency-free HTML/CSS/JS website for **TRE™ in Singapore** (tre-in-singapore.com), built as a community hub for TRE™ (Tension & Trauma Releasing Exercises) practitioners in Singapore.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, pillars, what is TRE™, practitioner hub, upcoming events, founder spotlight, blog teasers |
| `about.html` | Who we are, Isabelle's biography and milestones, values, the operating company |
| `education.html` | What TRE™ is, how it works, safety, who it is for, the 3-module certification, fees table, FAQ |
| `facilitators.html` | Certifying Trainer profile, visiting trainers, provider directory, "get listed" |
| `events.html` | Events & Sessions (modelled on hummingbeing.com/events.html): countdown, filter tabs, event cards, past events, online prep guide |
| `blog.html` | Article listing + newsletter box |
| `blog/*.html` | Six full articles |
| `contact.html` | Contact details, form, map, response times, FAQ |

Shared assets: `assets/css/style.css`, `assets/js/main.js`, `assets/js/events-data.js`, `assets/img/favicon.svg`.

## Editing the header, navigation or footer

The finished pages are plain HTML and can be edited directly. To change the header, navigation or footer on **every** page at once, edit `_src/parts/head.html` or `_src/parts/footer.html` (page bodies are in `_src/parts/*.body.html`) and run:

```bash
python _src/build.py
```

This regenerates all pages. The `_src` folder is not needed on the web server.

## Editing events

All events live in **`assets/js/events-data.js`** — one object per event, documented at the top of the file. Events move to "Past events" automatically once their end date passes.

The listings mirror **hummingbeing.com/events.html** and its event pages (last aligned 7 September 2026). Each event has a `slug`, a 16:9 `image` in `assets/img/events/` (the same posters used on hummingbeing.com) and a `details` block that feeds **`event.html?id=<slug>`** — the per-event detail page with programme, pricing tiers, facilitators, registration links and, for online events, the preparation guide (aligned with hummingbeing.com/online-session-preparation.html). The same preparation guide is reproduced on `events.html#online-prep`.

## Before launch — checklist

1. **Photos.** The hero and About page hot-link two photos from the current GoDaddy site. Download them, save as `assets/img/hero-group.jpg` and `assets/img/isabelle-tre.jpg`, and update the `<img src>` in `index.html` and `about.html`. Add a real photo of Isabelle to the facilitator cards (replace the `.initials` span with an `<img>`).
2. **Logo.** The logo is recreated as inline SVG in the header/footer. To use the original PNG instead, save it as `assets/img/logo.png` and swap the `<svg>` inside `.footer-logo` (and optionally the header) for `<img src="assets/img/logo.png" alt="TRE Singapore">`.
3. **Provider directory.** `facilitators.html` contains four sample provider cards clearly labelled "Sample profile". Replace them with real certified providers and remove the `<span class="fac-sample">` line.
4. **Contact form.** By default the form opens the visitor's email client (mailto) with the message pre-filled. For silent sending, sign up for a form service (e.g. Formspree) and add `data-endpoint="https://formspree.io/f/XXXX"` to the `<form id="contact-form">` in `contact.html`.
5. **Newsletter form** in `blog.html` uses a mailto action — replace with your mailing-list provider's form action if you use one.
6. **Links to verify:** Calendly (`calendly.com/bhdasia/tre-certification-intake-call`), HummingBeing event pages, WhatsApp number (+81 80 6515 1778), registered office address.

## Deploying

Upload the whole folder to any static host (GoDaddy, Netlify, Cloudflare Pages, GitHub Pages, S3). No build step is required. Open `index.html` locally to preview.

## Design notes

Palette taken from the TRE Singapore logo: navy `#1c3d7a` (TRE wordmark), globe blue `#2a63a8`, bronze `#8b6b45` (continents/eagle), brown `#5f4630` ("Singapore"), plus the orange `#e08a2e` CTA colour and cream `#fbf5ec` panels used on the current site. Fonts: Montserrat (headings, italic accents echoing the logo) and Nunito Sans (body), loaded from Google Fonts with system fallbacks.
