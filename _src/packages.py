"""
TRE™ Certification 2027 Singapore: the three package pages (Growth, Foundational, Refresher).

Source of every fact here: Isabelle's doc "TRE COHORT SINGAPORE 2027 WITH SIMBA" (26 Oct 2026). Nothing is invented.
build.py renders one page per entry of PAGES_2027 (clean URLs /certification-2027-growth, -foundational, -refresher);
the overview is the event record in assets/js/events-data.js. The instalment sums are asserted at import time.
"""
import html as H

BASE = "https://tre-in-singapore.com/"
OVERVIEW = "events/tre-provider-certification-2027-singapore"
EB_UNTIL = "31 January 2027"
D1_EB, D1_REG, D2, D3 = "31 Jan 2027", "25 Feb 2027", "3 Jun 2027", "30 Sep 2027"
SESSION = "S$190"

# (name, early bird total, early instalments, regular total, regular instalments)
GROWTH = ("Growth Package", 5888, (1888, 2000, 2000), 6888, (1888, 2500, 2500))
FOUND = ("Foundational Package", 4888, (1888, 1500, 1500), 5888, (1888, 2000, 2000))
REFRESH = [  # option, short, includes, early total, early inst, regular total, regular inst
    ("1", "Refresher", "Participation in the 3 modules at a special refresher price", 2200, (1000, 600, 600), 2900, (1500, 700, 700)),
    ("2", "Supervised Refresher", "3 modules + 50% supervisions (no personal sessions)", 2990, (1000, 995, 995), 3600, (1500, 1050, 1050)),
    ("3", "Boosted Refresher", "3 modules + the 3 bonus programmes (value S$1,290)", 3200, (1000, 1100, 1100), 3900, (1500, 1200, 1200)),
    ("4", "Boosted Supervised Refresher", "3 modules + 50% supervisions (no personal sessions) + the 3 bonus programmes", 3990, (1000, 1495, 1495), 4600, (1500, 1550, 1550)),
]
for _row in [GROWTH, FOUND] + [(r[1],) + r[3:] for r in REFRESH]:
    _n, _et, _ei, _rt, _ri = _row
    assert sum(_ei) == _et and sum(_ri) == _rt, _n


def s(n):
    return "S$%s" % format(n, ",")


def esc(x):
    return H.escape(x, quote=False)


CARD_NOTE = "Payment is by credit card only, through Stripe (Odoo checkout). Card charges are added on top of every instalment."
FULL_OWED = ("The full package price is owed once the first instalment is paid. Instalment 1 is due on registration "
             "(by 31 Jan 2027 at the early-bird price, by 25 Feb 2027 at the regular price); instalment 2 is issued after "
             "Module 1 and due by 3 June 2027; instalment 3 is issued after Module 2 and due by 30 September 2027.")
FINAL = "All ticket sales are final, non-refundable and non-cancellable. All prices are in Singapore dollars."
MODULES = [("Module 1", "27–28 Feb 2027", "Singapore, in person"), ("Module 2", "3–4 Jul 2027", "Singapore, in person"),
           ("Module 3", "30–31 Oct 2027", "Singapore, in person")]
MODULE_INCL = [  # same for Growth and Foundational
    ("Module 1", "A 2-day workshop plus personal sessions: 2 online individual and 2 online group."),
    ("Module 2", "A 2-day workshop plus 2 online group supervisions and 2 online individual supervisions."),
    ("Module 3", "A 2-day workshop plus 3 online individual supervisions and 1 online group supervision."),
]
BONUSES = "Grounding, Verbal Interventions and Internal Alchemy"

# page key -> (slug, <title>, meta description, h1, lead)
PAGES_2027 = {
    "growth": ("certification-2027-growth",
               "TRE™ Certification 2027 Singapore: Growth Package",
               "Growth Package for the TRE™ Provider Certification 2027 in Singapore: 3 modules, all personal sessions and supervisions, ICF credits and 3 bonus programmes. Early bird S$5,888 to 31 Jan 2027.",
               "Growth <em>Package</em>",
               "The full TRE™ Provider Certification, 2027 Singapore cohort, with ICF credits and three self-paced bonus programmes. For new students."),
    "foundational": ("certification-2027-foundational",
                     "TRE™ Certification 2027 Singapore: Foundational Package",
                     "Foundational Package for the TRE™ Provider Certification 2027 in Singapore: the complete pathway of 3 modules, personal sessions and supervisions. Early bird S$4,888 to 31 Jan 2027.",
                     "Foundational <em>Package</em>",
                     "The complete TRE™ Provider Certification pathway, 2027 Singapore cohort, without ICF credits and without the bonus programmes. For new students."),
    "refresher": ("certification-2027-refresher",
                  "TRE™ Refresher Packages 2027 Singapore for Providers",
                  "Four Refresher options for accredited TRE™ Providers and TRE™ Provider trainees to complete their training in Singapore in 2027. Early bird from S$2,200 to 31 Jan 2027.",
                  "Refresher <em>Packages</em>",
                  "Four options for accredited TRE™ Providers and TRE™ Provider trainees who want to complete their training in the 2027 Singapore cohort."),
}
ORDER = ["growth", "foundational", "refresher"]
NAMES = {"growth": "Growth Package", "foundational": "Foundational Package", "refresher": "Refresher Packages"}

CSS = """<style id="pk-css">
/* TRE™ Certification 2027 package pages (pk-): same tokens, hero and table/form components as the rest of the site */
.pk-facts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:var(--s4);margin:0;padding:0}
.pk-fact{background:#fff;border:1px solid var(--line-2);border-radius:var(--radius);padding:var(--s5);box-shadow:var(--shadow-1)}
.pk-fact dt{font-family:var(--font-display);font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;font-weight:700;color:var(--bronze);margin:0 0 .35rem}
.pk-fact dd{margin:0;font-family:var(--font-display);font-weight:700;color:var(--navy);font-size:1.06rem;line-height:1.35}
.pk-fact small{display:block;margin-top:.3rem;font-family:var(--font-body);font-weight:400;font-size:.88rem;line-height:1.45;color:var(--muted)}
.pk-head{max-width:720px;margin:0 0 var(--s7)}
.pk-head h2{margin-bottom:var(--s4)}
.pk-head p{margin:0;color:var(--muted);font-size:1.06rem;line-height:1.65}
.pk-split{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(28px,5vw,72px);align-items:start}
.pk-list{list-style:none;margin:0;padding:0}
.pk-list li{position:relative;padding:.85rem 0 .95rem 1.55rem;border-top:1px solid var(--line-2);color:var(--ink-2);line-height:1.55}
.pk-list li::before{content:"";position:absolute;left:1px;top:1.25rem;width:8px;height:8px;border-radius:50%;border:1.5px solid var(--gold)}
.pk-list li b{color:var(--navy)}
.pk-mods{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--s4)}
.pk-mod{background:#fff;border:1px solid var(--line-2);border-radius:var(--radius);padding:var(--s5);box-shadow:var(--shadow-1)}
.pk-mod h3{margin:0 0 .15rem;font-size:1.15rem}
.pk-mod .pk-when{margin:0 0 .8rem;color:var(--bronze);font-family:var(--font-display);font-weight:700;font-size:.9rem}
.pk-mod p{margin:0;color:var(--ink-2);line-height:1.6}
.pk-extra{margin-top:var(--s5);background:var(--cream);border-radius:var(--radius);padding:var(--s5)}
.pk-extra h3{margin:0 0 .6rem;font-size:1.1rem}
.pk-extra p{margin:0 0 .6rem;color:var(--ink-2);line-height:1.6}
.pk-extra p:last-child{margin-bottom:0}
.pk-price{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--s4)}
.pk-pc{background:#fff;border:1px solid var(--line-2);border-radius:var(--radius);padding:var(--s6);box-shadow:var(--shadow-1)}
.pk-pc.is-hl{border-color:var(--gold);background:var(--cream);box-shadow:inset 0 0 0 1px var(--gold)}
.pk-pc h3{margin:0 0 .3rem;font-size:.82rem;letter-spacing:.08em;text-transform:uppercase;color:var(--bronze)}
.pk-pc .pk-amt{font-family:var(--font-display);font-weight:800;font-size:clamp(2rem,4vw,2.6rem);line-height:1.1;color:var(--navy);margin:0}
.pk-pc p{margin:.5rem 0 0;color:var(--muted);line-height:1.55}
.pk-note{margin:var(--s5) 0 0;padding:var(--s4) var(--s5);border-left:3px solid var(--gold);background:var(--cream);border-radius:0 var(--radius-sm) var(--radius-sm) 0;color:var(--ink-2);line-height:1.6}
.pk-note b{color:var(--navy)}
.pk-sched-h{margin:var(--s7) 0 var(--s4);font-size:1.15rem}
.pk-sched-h:first-of-type{margin-top:0}
.pk-terms{margin:var(--s6) 0 0;display:grid;gap:var(--s3)}
.pk-terms p{margin:0;color:var(--ink-2);line-height:1.6}
.pk-cmp th[scope=col]:not(:first-child){text-align:center}
.pk-cmp td{text-align:center}
.pk-yes{color:var(--navy);font-weight:700}
.pk-no{color:var(--muted-2)}
.pk-opts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--s4);margin-bottom:var(--s7)}
.pk-opt{display:flex;flex-direction:column;background:#fff;border:1px solid var(--line-2);border-radius:var(--radius);padding:var(--s5);box-shadow:var(--shadow-1)}
.pk-opt .pk-n{font-family:var(--font-display);font-weight:700;font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;color:var(--bronze)}
.pk-opt h3{margin:.2rem 0 .5rem;font-size:1.2rem}
.pk-opt p{margin:0 0 var(--s4);color:var(--ink-2);line-height:1.55;flex:1}
.pk-opt .pk-prices{margin:0 0 var(--s4);display:flex;gap:var(--s5);flex-wrap:wrap;font-family:var(--font-display);color:var(--navy)}
.pk-opt .pk-prices span{display:block;font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);font-weight:700}
.pk-opt .pk-prices b{font-size:1.3rem}
.pk-reg{max-width:760px;margin:0 auto}
.pk-reg .form{margin:0}
.pk-reg h2{margin-bottom:var(--s3)}
.pk-reg .pk-lead{margin:0 0 var(--s5);color:var(--muted);line-height:1.6}
.pk-others{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--s4)}
.pk-oc{display:block;background:#fff;border:1px solid var(--line-2);border-radius:var(--radius);padding:var(--s5);box-shadow:var(--shadow-1);color:inherit;text-decoration:none;transition:border-color var(--d2),transform var(--d2)}
.pk-oc:hover{border-color:var(--gold);transform:translateY(-2px)}
.pk-oc h3{margin:0 0 .3rem;font-size:1.1rem}
.pk-oc p{margin:0;color:var(--muted);line-height:1.5;font-size:.95rem}
.pk-oc b{color:var(--navy)}
@media (max-width:900px){.pk-facts{grid-template-columns:repeat(2,minmax(0,1fr))}.pk-split,.pk-mods,.pk-price,.pk-opts,.pk-others{grid-template-columns:minmax(0,1fr)}}
@media (max-width:480px){.pk-facts{grid-template-columns:minmax(0,1fr)}.pk-pc{padding:var(--s5)}}
@media (prefers-reduced-motion:reduce){.pk-oc{transition:none}.pk-oc:hover{transform:none}}
</style>"""


def hero(key):
    slug, _t, _d, h1, lead = PAGES_2027[key]
    return f"""<section class="page-hero hx hx-events" style="--fx:62%;--fy:60%;--fx-m:70%">
  <div class="hx-media" aria-hidden="true"><img class="hx-photo" src="assets/img/gallery/hero-events-1600.webp" srcset="assets/img/gallery/hero-events-960.webp 960w, assets/img/gallery/hero-events-1600.webp 1600w" sizes="(max-width: 760px) 50vw, 100vw" width="1600" height="1200" alt="" fetchpriority="high" decoding="async"></div>
  <div class="hx-wash" aria-hidden="true"></div>
  <canvas class="hx-tremor" aria-hidden="true"></canvas>
  <div class="container hx-inner">
      <p class="crumbs"><a href="{OVERVIEW}">TRE™ Certification 2027 Singapore</a></p>
      <h1>{h1}</h1>
      <p>{esc(lead)}</p>
      <div class="btn-row">
        <a class="btn btn-primary" href="#register">Register</a>
        <a class="btn btn-ghost-light" href="{OVERVIEW}">Compare all packages</a>
      </div>
  </div>
  <p class="hx-credit">Co-taught by Isabelle Claus Teixeira &amp; Simba Stenqvist · Singapore 2027</p>
</section>"""


def facts(price_dd, price_small):
    return f"""<section class="section" style="padding-bottom:var(--s7)">
  <div class="container">
    <dl class="pk-facts">
      <div class="pk-fact"><dt>Modules</dt><dd>27–28 Feb · 3–4 Jul · 30–31 Oct 2027</dd><small>In person, Singapore. Co-taught by Isabelle Claus Teixeira and Simba Stenqvist.</small></div>
      <div class="pk-fact"><dt>Early bird</dt><dd>{price_dd}</dd><small>{price_small}</small></div>
      <div class="pk-fact"><dt>Payment</dt><dd>Credit card only</dd><small>Through Stripe (Odoo checkout). Card charges are added on top of every instalment.</small></div>
      <div class="pk-fact"><dt>Extra sessions</dt><dd>{SESSION} per session</dd><small>For an extra 60-minute online personal session or supervision, with any package.</small></div>
    </dl>
  </div>
</section>"""


def inst_table(label_rows, caption):
    """label_rows: [(row label, early total, early instalments, regular total, regular instalments)]"""
    head = ('<thead><tr><th scope="col">Instalment</th><th scope="col">Due (early bird)</th><th scope="col">Early bird</th>'
            '<th scope="col">Due (regular)</th><th scope="col">Regular</th></tr></thead>')
    rows = []
    _lbl, et, ei, rt, ri = label_rows[0]
    due_eb, due_reg = [D1_EB, D2, D3], [D1_REG, D2, D3]
    when = ["On registration", "Issued after Module 1", "Issued after Module 2"]
    for i in range(3):
        rows.append(f'<tr><td><b>Instalment {i + 1}</b><br><span class="note">{when[i]}</span></td>'
                    f'<td data-label="Due (early bird)">by {due_eb[i]}</td><td data-label="Early bird"><b>{s(ei[i])}</b></td>'
                    f'<td data-label="Due (regular)">by {due_reg[i]}</td><td data-label="Regular">{s(ri[i])}</td></tr>')
    rows.append(f'<tr class="hl"><td><b>Total</b></td><td data-label="Due (early bird)">all instalments</td><td data-label="Early bird"><b>{s(et)}</b></td>'
                f'<td data-label="Due (regular)">all instalments</td><td data-label="Regular"><b>{s(rt)}</b></td></tr>')
    return (f'<div class="table-wrap"><table class="price" aria-label="{esc(caption)}">{head}<tbody>{"".join(rows)}</tbody></table></div>')


def terms():
    return (f'<div class="pk-terms"><p><b>Card only.</b> {CARD_NOTE}</p><p><b>Instalments.</b> {FULL_OWED}</p>'
            f'<p><b>Final sale.</b> {FINAL}</p></div>')


def section(h2, inner, cls="", sid="", intro=""):
    sid_a = f' id="{sid}"' if sid else ""
    intro_h = f"<p>{intro}</p>" if intro else ""
    return (f'<section class="section {cls}"{sid_a}><div class="container"><div class="pk-head"><h2>{h2}</h2>{intro_h}</div>{inner}</div></section>')


def addons(refresher=False):
    items = [f"<li><b>Extra online personal session or supervision:</b> {SESSION} per 60-minute online session (any package).</li>"]
    if refresher:
        items.append("<li><b>ICF CCEs for Module 1:</b> S$500 at the early-bird price, S$900 at the regular price.</li>")
    return f'<ul class="pk-list">{"".join(items)}</ul>'


def others(current):
    cards = {
        "growth": ("Growth Package", f"New students. The full certification with ICF credits and 3 bonus programmes. Early bird <b>{s(GROWTH[1])}</b>."),
        "foundational": ("Foundational Package", f"New students. The complete pathway without ICF credits or bonuses. Early bird <b>{s(FOUND[1])}</b>."),
        "refresher": ("Refresher Packages", f"Accredited TRE™ Providers and trainees. Four options, early bird from <b>{s(REFRESH[0][3])}</b>."),
    }
    out = []
    for k in ORDER:
        if k == current:
            continue
        t, d = cards[k]
        out.append(f'<a class="pk-oc" href="{PAGES_2027[k][0]}"><h3>{t}</h3><p>{d}</p></a>')
    return section("The other packages", f'<div class="pk-others">{"".join(out)}</div>', "bg-cream",
                   intro=f'Or <a href="{OVERVIEW}">compare all three packages</a>.')


def form(key):
    names = [("Growth Package", "growth"), ("Foundational Package", "foundational")] + \
            [(f"Refresher option {n}: {name}", "refresher" + n) for n, name, *_ in REFRESH]
    sel = key if key != "refresher" else "refresher1"
    opts = "".join(f'<option value="{esc(n)}"{" selected" if v == sel else ""}>{esc(n)}</option>' for n, v in names)
    what = NAMES[key]
    return f"""<section class="section bg-cream" id="register">
  <div class="container pk-reg">
    <form class="form" id="contact-form" novalidate data-mailto="bonjour@bhdasia.com" data-endpoint="formsubmit">
      <input type="hidden" name="_subject" value="New TRE Certification 2027 registration: {esc(what)}">
      <input type="hidden" name="_template" value="table">
      <input type="text" name="_honey" style="display:none" tabindex="-1" autocomplete="off">
      <h2>Register for the {esc(what)}</h2>
      <p class="pk-lead">Send your details and we will confirm your place and the payment steps. Payment is by credit card only, and card charges are added on top of every instalment. Early-bird prices apply until {EB_UNTIL}.</p>
      <div class="form-row">
        <div class="field"><label for="f-name">Name <span class="req">*</span></label><input id="f-name" name="name" type="text" required autocomplete="name" placeholder="Your full name"></div>
        <div class="field"><label for="f-email">Email <span class="req">*</span></label><input id="f-email" name="email" type="email" required autocomplete="email" placeholder="you@example.com"></div>
      </div>
      <div class="form-row">
        <div class="field"><label for="f-phone">Phone / WhatsApp</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" placeholder="+65 …"></div>
        <div class="field">
          <label for="f-who">I am…</label>
          <select id="f-who" name="who">
            <option value="">Please choose</option>
            <option>A new student</option>
            <option>An accredited TRE™ Provider</option>
            <option>A TRE™ Provider trainee</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="field"><label for="f-interest">Package <span class="req">*</span></label><select id="f-interest" name="interest" required>{opts}</select></div>
        <div class="field"><label for="f-plan">Price <span class="req">*</span></label><select id="f-plan" name="price_plan" required><option value="Early bird (until 31 Jan 2027)">Early bird (until 31 Jan 2027)</option><option value="Regular price">Regular price</option></select></div>
      </div>
      <div class="field"><label for="f-message">Message</label><textarea id="f-message" name="message" placeholder="Anything we should know, or a question about the package."></textarea></div>
      <label class="check"><input type="checkbox" name="consent" required> I agree that my details will be used to process my registration. We never share your data without your consent. <span class="req">*</span></label>
      <button class="btn btn-primary" type="submit">Send my registration</button>
      <div class="form-success" role="status">Thank you — your registration is on its way to Isabelle.</div>
      <p class="form-note">{esc(CARD_NOTE)} {esc(FINAL)}</p>
    </form>
  </div>
</section>
<script>
(function () {{
  'use strict';
  var sel = document.getElementById('f-interest'); if (!sel) return;
  var m = /[?&]option=([1-4])/.exec(location.search);
  if (m) {{ for (var i = 0; i < sel.options.length; i++) if (sel.options[i].value === 'refresher' + m[1] || sel.options[i].text.indexOf('Refresher option ' + m[1]) === 0) sel.selectedIndex = i; }}
  Array.prototype.forEach.call(document.querySelectorAll('[data-pick]'), function (a) {{
    a.addEventListener('click', function () {{
      for (var i = 0; i < sel.options.length; i++) if (sel.options[i].text.indexOf('Refresher option ' + a.getAttribute('data-pick')) === 0) sel.selectedIndex = i;
    }});
  }});
}})();
</script>"""


def growth_body():
    n, et, ei, rt, ri = GROWTH
    who = ('<ul class="pk-list"><li><b>New students</b> who want the complete TRE™ Provider Certification.</li>'
           "<li>You want ICF credits (value S$2,000) included in your package.</li>"
           f"<li>You want the three self-paced bonus programmes (value S$1,290): {BONUSES}.</li></ul>")
    mods = "".join(f'<div class="pk-mod"><h3>{m}</h3><p class="pk-when">{d} · {w}</p><p>{t}</p></div>'
                   for (m, d, w), (_m, t) in zip(MODULES, MODULE_INCL))
    extra = ('<div class="pk-extra"><h3>Also included in the Growth Package</h3>'
             "<p><b>ICF credits (value S$2,000).</b> ICF CCEs are released on full attendance of the relevant module (Module 1 = 21 CCEs).</p>"
             f"<p><b>Three self-paced bonus programmes (value S$1,290):</b> {BONUSES}. Grounding is released after the Module 2 payment is received; Verbal Interventions and Internal Alchemy after the Module 3 payment is received. If you pay in full, all three bonuses are released after Module 2.</p></div>")
    price = (f'<div class="pk-price"><div class="pk-pc is-hl"><h3>Early bird · until {EB_UNTIL}</h3><p class="pk-amt">{s(et)}</p><p>Three instalments: {s(ei[0])} + {s(ei[1])} + {s(ei[2])}.</p></div>'
             f'<div class="pk-pc"><h3>Regular price</h3><p class="pk-amt">{s(rt)}</p><p>Three instalments: {s(ri[0])} + {s(ri[1])} + {s(ri[2])}.</p></div></div>'
             f'<p class="pk-note"><b>Card charges are added on top of every instalment.</b> Payment is by credit card only, through Stripe (Odoo checkout).</p>')
    return "\n".join([
        facts(s(et), f"Regular price {s(rt)}. In three instalments."),
        section("Who it is for", who, "bg-cream"),
        section("What is included, module by module", f'<div class="pk-mods">{mods}</div>{extra}', "", "included"),
        section("Price", price, "bg-cream", "price", f"Early bird until {EB_UNTIL}. All prices in Singapore dollars."),
        section("Instalment schedule", inst_table([GROWTH], "Growth Package instalments") + terms(), "", "instalments"),
        section("Add-ons", addons(), "bg-cream", "addons"),
        form("growth"), others("growth")])


def found_body():
    n, et, ei, rt, ri = FOUND
    gn, get_, gei, grt, gri = GROWTH
    who = ('<ul class="pk-list"><li><b>New students</b> who want the complete TRE™ Provider Certification pathway.</li>'
           "<li>You do not need the ICF credits or the bonus programmes.</li>"
           f"<li>You can see how it compares with the <a href=\"{PAGES_2027['growth'][0]}\">Growth Package</a> below.</li></ul>")
    mods = "".join(f'<div class="pk-mod"><h3>{m}</h3><p class="pk-when">{d} · {w}</p><p>{t}</p></div>'
                   for (m, d, w), (_m, t) in zip(MODULES, MODULE_INCL))
    price = (f'<div class="pk-price"><div class="pk-pc is-hl"><h3>Early bird · until {EB_UNTIL}</h3><p class="pk-amt">{s(et)}</p><p>Three instalments: {s(ei[0])} + {s(ei[1])} + {s(ei[2])}.</p></div>'
             f'<div class="pk-pc"><h3>Regular price</h3><p class="pk-amt">{s(rt)}</p><p>Three instalments: {s(ri[0])} + {s(ri[1])} + {s(ri[2])}.</p></div></div>'
             f'<p class="pk-note"><b>Card charges are added on top of every instalment.</b> Payment is by credit card only, through Stripe (Odoo checkout).</p>')
    yes, no = '<span class="pk-yes">Included</span>', '<span class="pk-no">Not included</span>'
    cmp_rows = [
        ("Modules 1–3 (2-day workshops, Singapore)", yes, yes),
        ("Online personal sessions and supervisions", yes, yes),
        ("ICF credits (value S$2,000)", no, yes),
        ("3 bonus programmes (value S$1,290)", no, yes),
        ("Early bird (to 31 Jan 2027)", f"<b>{s(et)}</b>", f"<b>{s(get_)}</b>"),
        ("Regular price", s(rt), s(grt)),
    ]
    body = "".join(f'<tr><td><b>{a}</b></td><td data-label="Foundational">{b}</td><td data-label="Growth">{c}</td></tr>' for a, b, c in cmp_rows)
    cmp_ = (f'<div class="table-wrap"><table class="price pk-cmp" aria-label="Growth compared with Foundational"><thead><tr><th scope="col">What you get</th><th scope="col">Foundational</th><th scope="col">Growth</th></tr></thead><tbody>{body}</tbody></table></div>'
            f'<p class="pk-note">The Growth Package is the same programme plus ICF credits and the three bonus programmes ({BONUSES}). <a href="{PAGES_2027["growth"][0]}">See the Growth Package</a>.</p>')
    return "\n".join([
        facts(s(et), f"Regular price {s(rt)}. In three instalments."),
        section("Who it is for", who, "bg-cream"),
        section("What is included, module by module", f'<div class="pk-mods">{mods}</div>', "", "included"),
        section("Price", price, "bg-cream", "price", f"Early bird until {EB_UNTIL}. All prices in Singapore dollars."),
        section("Instalment schedule", inst_table([FOUND], "Foundational Package instalments") + terms(), "", "instalments"),
        section("Growth vs Foundational", cmp_, "bg-cream", "compare"),
        section("Add-ons", addons(), "", "addons"),
        form("foundational"), others("foundational")])


def refresher_body():
    who = ('<ul class="pk-list"><li><b>Accredited TRE™ Providers</b> who want to complete their training.</li>'
           "<li><b>TRE™ Provider trainees</b> who want to complete their training.</li>"
           "<li>Four options, from participation in the three modules to a boosted supervised package.</li></ul>")
    cards = []
    for n, name, incl, et, ei, rt, ri in REFRESH:
        cards.append(f'<div class="pk-opt" id="option-{n}"><span class="pk-n">Option {n}</span><h3>{esc(name)}</h3><p>{esc(incl)}.</p>'
                     f'<div class="pk-prices"><div><span>Early bird</span><b>{s(et)}</b></div><div><span>Regular</span><b>{s(rt)}</b></div></div>'
                     f'<a class="btn btn-navy btn-sm" href="#register" data-pick="{n}">Choose option {n}</a></div>')
    tabs = []
    for n, name, incl, et, ei, rt, ri in REFRESH:
        tabs.append(f'<h3 class="pk-sched-h">Option {n}: {esc(name)}</h3>' + inst_table([(name, et, ei, rt, ri)], f"Refresher option {n} instalments"))
    sup = ('<div class="pk-extra"><h3>What “50% supervisions” means</h3>'
           "<p>Module 2: 1 online group and 1 online individual supervision. Module 3: 1 online individual and 1 online group supervision. The supervised options include no personal sessions.</p></div>")
    mods = "".join(f'<div class="pk-mod"><h3>{m}</h3><p class="pk-when">{d} · {w}</p><p>Participation in the in-person 2-day workshop.</p></div>' for m, d, w in MODULES)
    return "\n".join([
        facts(f"from {s(REFRESH[0][3])}", f"Regular price from {s(REFRESH[0][5])}. In three instalments."),
        section("Who it is for", who, "bg-cream"),
        section("Choose your option", f'<div class="pk-opts">{"".join(cards)}</div>{sup}', "", "options", f"Early bird until {EB_UNTIL}. All prices in Singapore dollars."),
        section("The three modules", f'<div class="pk-mods">{mods}</div>', "bg-cream", "modules"),
        section("Instalment schedule", "".join(tabs) + terms(), "", "instalments"),
        section("Add-ons", addons(refresher=True), "bg-cream", "addons"),
        form("refresher"), others("refresher")])


BODIES = {"growth": growth_body, "foundational": found_body, "refresher": refresher_body}


def body(key):
    return CSS + "\n" + hero(key) + "\n" + BODIES[key]() + "\n"


def offers(key):
    """schema.org Offers (early bird + regular) for each package page."""
    def mk(name, price, until, url):
        o = {"@type": "Offer", "name": name, "price": str(price), "priceCurrency": "SGD", "availability": "https://schema.org/InStock", "url": url}
        if until:
            o["priceValidUntil"] = until
        return o
    url = BASE + PAGES_2027[key][0]
    out = []
    if key == "growth":
        out += [mk("Growth Package, early bird", GROWTH[1], "2027-01-31", url), mk("Growth Package, regular", GROWTH[3], None, url)]
    elif key == "foundational":
        out += [mk("Foundational Package, early bird", FOUND[1], "2027-01-31", url), mk("Foundational Package, regular", FOUND[3], None, url)]
    else:
        for n, name, _i, et, _ei, rt, _ri in REFRESH:
            out += [mk(f"Refresher option {n}: {name}, early bird", et, "2027-01-31", url), mk(f"Refresher option {n}: {name}, regular", rt, None, url)]
    return out


def overview_offers():
    """Event offers for the overview page: every package, early bird + regular, each pointing at its own page."""
    out = []
    for k in ORDER:
        out += offers(k)
    return out
