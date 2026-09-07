# DESIGN.md — TRE™ in Singapore

Design system for the static site. Tokens live in `assets/css/style.css` (`:root`). Mode: **persuade** (marketing site for a wellbeing practice) with a **read** mode for blog articles.

## Brand
Derived from the TRE Singapore logo: a navy/blue globe with bronze continents and a bronze eagle, the navy "TRE®" wordmark, and "Singapore" in brown italic. The existing site adds an orange CTA colour and warm cream panels.

## Colour
| Token | Value | Use |
|---|---|---|
| `--navy` | #1c3d7a | headings, primary text accents, nav active |
| `--navy-deep` / `--navy-ink` | #132b56 / #0f1f3d | dark sections, footer |
| `--blue` | #2a63a8 | hover links, gradients |
| `--blue-soft` / `--blue-tint` | #e7eef8 / #f4f7fc | callouts, tinted section backgrounds |
| `--bronze` / `--gold` | #8b6b45 / #c9a45c | eyebrows, icons, accent lines, italic accent words |
| `--brown` | #5f4630 | "Singapore" wordmark |
| `--orange` / `--orange-deep` | #e08a2e / #c4741d | primary CTA only |
| `--cream` / `--cream-2` | #faf6ef / #f2e9db | alternating warm sections (brand echo, used sparingly) |
| `--ink`, `--ink-2`, `--muted` | #1b2536, #3a4657, #5f6b7d | body text — navy-tinted, never pure grey |

Rules: one orange CTA per view; text on coloured backgrounds is white or tinted light (`#cdd8ea`), never grey; no purple gradients; no glass blur.

## Typography
- Display: **Montserrat** 700/800 (italic 800 for the wordmark, echoing the logo). Tracking −0.022em on headings.
- Body: **Nunito Sans** 400/600/700, 17px, line-height 1.6.
- Scale: h1 `clamp(2.2rem,4.6vw,3.5rem)`, h2 `clamp(1.65rem,3vw,2.35rem)`, h3 1.22rem, h4 1.02rem.
- Labels/eyebrows: uppercase .72rem with **.08em** tracking (was .22em — too wide). Nav and buttons are sentence case with 0 tracking.
- Measure: article body ≤ 740px.

## Spacing
4/8/12/16/24/32/48/64/96 px scale (`--s1`…`--s9`). Sections 96px desktop, 64px mobile. Card padding 32px. Radius 16 / 10 / 6.

## Components
- **Buttons**: pill, 46px min height, sentence case. Primary = orange with sheen sweep and arrow slide; navy; outline; light; ghost-light. Hover lifts 2px; active scales .98; click ripple.
- **Cards**: white, 1px tinted border, soft two-layer shadow; hover lift 4px. Icons are inline (no icon tiles). No cards nested inside cards.
- **Badges**: max two per card (location + category). Status is a coloured dot + text line, not a third chip.
- **Header**: sticky, 78px → 66px on scroll with shadow; single-row brand (mark + "TRE® Singapore"); gold underline slides in on hover/active.
- **Footer**: compact three-column block + one-line legal bar with social icons.

## Motion
Easing `cubic-bezier(.2,.7,.2,1)` (standard) and `cubic-bezier(.16,1,.3,1)` (out). Durations .18s / .32s / .6s. No bounce or elastic.
- Entrances: fade + 14px rise, staggered 60–70ms per sibling (`--i`).
- Hero: image settles from 1.06 scale; panel content rises in sequence; page-hero blobs drift slowly.
- Stats count up on reveal. Countdown digits tick. CTA band has a pointer-following gold spotlight. Marquee pauses on hover.
- Everything is disabled under `prefers-reduced-motion`.

## Accessibility
Touch targets ≥ 44px, visible gold focus ring, semantic heading order (one h1 per page), aria labels on icon links, skip link, `aria-expanded` on the menu toggle.
