"""
Page assembler for the TRE™ in Singapore site.

Each page = parts/head.html + parts/<page>.body.html + parts/footer.html, with these placeholders filled in:
  {{TITLE}} {{DESC}} {{META}} {{ROOT}} {{HOME}} {{STATIC_MANIFEST}} and {{A_<nav id>}} ("active" for the current page).
{{META}} is the SEO block from seo.py: canonical, robots, Open Graph, Twitter card and schema.org JSON-LD.

From the data files (assets/js/events-data.js, facilitators-data.js, read through headless Chrome by site_data.py)
it also generates:
  events/<slug>.html, facilitators/<id>.html   one static, indexable page per record (public URL /events/<slug>)
  the crawlable lists on events.html and facilitators.html, sitemap.xml, robots.txt, llms.txt and 404.html
After adding or changing an event or facilitator in the data files, run the build so its page exists. Until then the
record still works through the event?id= / facilitator?id= templates.

Public URLs have no ".html" (/about, /blog/what-is-tre): GitHub Pages serves about.html for /about.
Run from anywhere:
    python _src/build.py                      build everything
    python _src/build.py about.html ...       build only these pages (no sitemap / llms.txt)
No dependencies beyond Python 3 (+ Google Chrome for the pages generated from data; skipped when Chrome is missing).
"""
import datetime, glob, html as H, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import event_posts as EP, images, seo, site_data  # noqa: E402

PARTS = os.path.join(HERE, "parts")
OUT = os.path.dirname(HERE)  # site root
BASE = "https://tre-in-singapore.com/"  # absolute site root (canonical, Open Graph, sitemap); must equal seo.BASE
assert BASE == seo.BASE
NAV_IDS = ["home", "about", "education", "facilitators", "events", "blog", "contact"]
CHANGED = set()  # outputs whose content changed in this build (sitemap lastmod)


def read(p):
    with open(p if os.path.isabs(p) else os.path.join(PARTS, p), encoding="utf-8") as f:
        return f.read()


def clean(out_rel):
    """Public, extension-less path of a built file: index.html -> '', about.html -> 'about', blog/x.html -> 'blog/x'."""
    rel = out_rel.replace("\\", "/")
    if rel == "index.html":
        return ""
    return rel[:-5] if rel.endswith(".html") else rel


def canonical_for(out_rel):
    return BASE + clean(out_rel)


def og(rel):
    """(absolute image URL, (w, h)) for a generated 1200x630 share image, or the site default."""
    if rel and os.path.isfile(os.path.join(OUT, rel)):
        return BASE + rel, ((1200, 630) if "/og/" in rel else None)
    return seo.DEFAULT_IMAGE, (1200, 630)


def write(out_rel, text):
    out = os.path.join(OUT, out_rel)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    old = open(out, encoding="utf-8").read().replace("\r\n", "\n") if os.path.isfile(out) else None
    if old != text:
        CHANGED.add(out_rel.replace("\\", "/"))
    with open(out, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)
    print("built", out_rel)


def assemble(body, out_rel, title, desc, meta, active, root, manifest, head_first=""):
    html = read("head.html") + body + read("footer.html")
    if head_first:
        html = html.replace('<meta charset="utf-8">\n', '<meta charset="utf-8">\n' + head_first + "\n", 1)
    html = (html.replace("{{META}}", meta).replace("{{TITLE}}", H.escape(title, quote=False))
            .replace("{{DESC}}", H.escape(desc, quote=True)).replace("{{STATIC_MANIFEST}}", manifest)
            .replace("{{HOME}}", root or "./").replace("{{ROOT}}", root))
    for nid in NAV_IDS:
        html = html.replace("{{A_%s}}" % nid, "active" if nid == active else "")
    html = re.sub(r' class=""', "", html)
    assert "{{" not in html, (out_rel, re.findall(r"\{\{[A-Z_]+\}\}", html))
    write(out_rel, html)


# (body partial, output file, <title>, meta description, active nav id, schema.org page type, breadcrumb name, share image)
# Keyword targets: TRE Singapore, Tension and Trauma Releasing Exercises, trauma release exercises, TRE certification
# Singapore, certified TRE provider, TRE workshop, online TRE session. One primary target per page, no stuffing.
PAGES = [
    ("index.body.html", "index.html", "TRE™ Singapore — Tension & Trauma Releasing Exercises",
     "Learn TRE™ (Tension & Trauma Releasing Exercises) in Singapore: find a certified provider, join a workshop or train to become a Global TRE™ Certified Provider.",
     "home", "WebPage", None, "assets/img/og-cover.jpg"),
    ("about.body.html", "about.html", "About TRE™ in Singapore — Founded by Isabelle Claus Teixeira",
     "TRE™ in Singapore is the community hub for TRE™ practitioners, trainees and first-timers, founded by Global TRE™ Certifying Trainer Isabelle Claus Teixeira.",
     "about", "AboutPage", "About", "assets/img/og/about.jpg"),
    ("education.body.html", "education.html", "TRE™ Certification Singapore — Become a Certified Provider",
     "What TRE™ is, how neurogenic tremors work, and how to become a Global TRE™ Certified Provider in Singapore: Modules 1–3, fees, ICF CCEUs and FAQ.",
     "education", "WebPage", "Education", "assets/img/og/education.jpg"),
    ("facilitators.body.html", "facilitators.html", "Certified TRE™ Providers & Facilitators in Singapore",
     "Find a certified TRE™ provider in Singapore for one-to-one, group, online or corporate sessions. Meet the Certifying Trainer and join the directory.",
     "facilitators", "CollectionPage", "Facilitators", "assets/img/og/facilitators.jpg"),
    ("events.body.html", "events.html", "TRE™ Workshops & Events — Singapore and Online",
     "Upcoming TRE™ workshops, certification modules and online sessions in Singapore, Bucharest and on Zoom: dates, prices and how to register.",
     "events", "CollectionPage", "Events", "assets/img/og/events.jpg"),
    ("event.body.html", "event.html", "Event — TRE™ in Singapore",
     "Details, programme, pricing and registration for TRE™ events in Singapore, Bucharest and online.", "events", None, None, None),
    ("facilitator.body.html", "facilitator.html", "Facilitator profile — TRE™ in Singapore",
     "Profile of a TRE™ facilitator in Singapore: background, credentials, sessions offered and how to book.", "facilitators", None, None, None),
    ("online-session-guide.body.html", "online-session-guide.html", "Online TRE™ Session Guide — Zoom, Camera & Space Setup",
     "How to prepare for an online TRE™ session: head-to-toe camera framing, your space and kit, a support person, Zoom settings and the 15-minutes-before checklist.",
     "events", "WebPage", "Online session guide", "assets/img/og/guide.jpg"),
    ("blog.body.html", "blog.html", "TRE™ Blog — Trauma Release, Stress & the Nervous System",
     "Plain-language articles on TRE™ (Tension & Trauma Releasing Exercises), neurogenic tremors, nervous-system regulation and practising TRE™ in Singapore.",
     "blog", "CollectionPage", "Blog", "assets/img/og/blog.jpg"),
    ("contact.body.html", "contact.html", "Contact TRE™ in Singapore — Book a Call or WhatsApp",
     "Contact TRE™ in Singapore about sessions, events, certification or a directory listing: email, WhatsApp, a free 30-minute call or the contact form.",
     "contact", "ContactPage", "Contact", "assets/img/og/contact.jpg"),
]

# Blog posts live in blog/ so their asset root is "../"
POSTS = [
    ("post-what-is-tre.body.html", "blog/what-is-tre.html", "What is TRE™? Tension & Trauma Releasing Exercises Explained",
     "TRE™ (Tension & Trauma Releasing Exercises) in plain language: the seven exercises, the neurogenic tremor, where TRE™ comes from and how a session feels."),
    ("post-science.body.html", "blog/science-of-neurogenic-tremors.html", "Why the Body Shakes: The Science of Neurogenic Tremors",
     "How self-induced neurogenic tremors relate to the stress response, the psoas and polyvagal theory: the science behind TRE™ trauma release exercises."),
    ("post-first-session.body.html", "blog/your-first-tre-session.html", "Your First TRE™ Session in Singapore: How to Prepare",
     "What to wear, what to expect and how to look after yourself before and after your first TRE™ session with a certified provider in Singapore."),
    ("post-coaches.body.html", "blog/tre-for-coaches.html", "TRE™ for Coaches: From Shaking to Shaping",
     "Why ICF coaches, HR partners and therapists in Singapore add TRE™ to their practice: self-care, client work and what TRE™ certification involves."),
    ("post-workday.body.html", "blog/nervous-system-habits-for-the-workday.html", "Five Nervous-System Habits for Singapore's Workday",
     "Practical nervous-system regulation habits for busy professionals in Singapore, informed by TRE™ (Tension & Trauma Releasing Exercises) and somatic practice."),
    ("post-isabelle.body.html", "blog/from-provider-to-certifying-trainer.html", "From Provider to Certifying Trainer: Isabelle's TRE™ Journey",
     "How Isabelle Claus Teixeira went from a first TRE™ session in 2017 to Global TRE™ Certifying Trainer in 2025, and what it means for TRE™ in Singapore."),
]

BASE_404 = ("<script>(function(){var s=location.pathname.split('/')[1];"
            "document.write('<base href=\"/'+(/github\\.io$/.test(location.hostname)&&s?s+'/':'')+'\">')})();</script>")

# Addresses of the old GoDaddy Website Builder site that Google indexed (site: search, 2026-09-29), mapped to the new
# pages. Each gets a static redirect page (instant meta refresh = a permanent move for Google, canonical to the
# target). Old paths that cannot exist as a file name on Windows (a literal "?") are redirected by the 404 page.
REDIRECTS = {"certified-tre-providers": "facilitators"}
REDIRECTS_404 = {"/who-are-we?": "about", "/who-are-we": "about", "/certified-tre-providers": "facilitators"}
BASE_404 += ("<script>(function(){var m=" + seo.json.dumps(REDIRECTS_404) + ",p=decodeURIComponent(location.pathname);"
             "if(m[p])location.replace('/'+m[p]+location.hash)})();</script>")


def redirect_page(old, new):
    url = canonical_for(new + ".html")
    return (f'<!DOCTYPE html>\n<html lang="en-SG">\n<head>\n<meta charset="utf-8">\n'
            f'<meta name="viewport" content="width=device-width, initial-scale=1">\n'
            f'<title>Moved — TRE™ in Singapore</title>\n<link rel="canonical" href="{url}">\n'
            f'<meta http-equiv="refresh" content="0; url={new}">\n'
            f"<script>location.replace('{new}'+location.search+location.hash)</script>\n</head>\n"
            f'<body><p>This page has moved to <a href="{new}">{url}</a>.</p></body>\n</html>\n')


def record_body(template, container, rid, static_html):
    pat = re.compile(r'<div id="%s"><section\b.*?</section></div>' % container, re.S)
    body, n = pat.subn(lambda m: f'<div id="{container}" data-id="{H.escape(rid)}">{static_html}</div>', template, count=1)
    assert n == 1, container
    return body


def base_graph(facs, skip_isabelle=False):
    return [seo.organization(), seo.website()] + ([] if skip_isabelle else [seo.isabelle(facs)])


def page_meta(out, title, desc, kind, crumb, image, body, events, facs, posts):
    if kind is None:  # ?id= templates: never indexed themselves; known ids move to their own pages
        return seo.head_meta(title, desc, url=None, robots="noindex,follow")
    url = canonical_for(out)
    img, size = og(image)
    nodes = base_graph(facs)
    extra = {"mainEntity": {"@id": seo.ORG_ID}} if kind == "AboutPage" else {}
    nodes.append(seo.webpage(url, title, desc, kind=kind, image=img, crumbs=bool(crumb), **extra))
    if crumb:
        nodes.append(seo.breadcrumb(url, [(crumb, url)]))
    nodes.append(seo.faq(url, body))
    if out == "education.html":
        nodes.append(seo.course(url, body))
    if out == "events.html":
        nodes.append(seo.item_list(url, "Upcoming TRE™ events", [(e["title"], seo.rec_url("events", e["slug"])) for e in events if not e["_past"] and e.get("status") not in ("postponed", "cancelled")]))
    if out == "facilitators.html":
        nodes.append(seo.item_list(url, "TRE™ facilitators in Singapore", [(f["name"], seo.rec_url("facilitators", f["id"])) for f in facs]))
    if out == "blog.html":
        nodes.append(seo.item_list(url, "TRE™ articles", [(t, canonical_for(o)) for _, o, t, _d in posts]))
    return seo.head_meta(title, desc, url, img, "website", graph=nodes, image_size=size)


def post_meta(out, title, desc, body, facs):
    url = canonical_for(out)
    slug = os.path.basename(out)[:-5]
    img, size = og(f"assets/img/blog/{slug}.jpg")
    reviewed = {"reviewedBy": {"@id": seo.ISABELLE_ID}} if "reviewed by" in seo.text(body).lower() else {}
    art = seo.blog_posting(url, body, desc, img)
    nodes = base_graph(facs) + [seo.webpage(url, title, desc, image=img, **reviewed),
                                seo.breadcrumb(url, [("Blog", BASE + "blog"), (title, url)]), art, seo.faq(url, body)]
    extra = [("article:section", art["articleSection"])] if art.get("articleSection") else []
    if art.get("datePublished"):
        extra = [("article:published_time", art["datePublished"])] + extra
    return seo.head_meta(title, desc, url, img, "article", graph=nodes, extra=extra, image_size=None)


SUFFIX = " | TRE™ in Singapore"


def record_title(full, preferred=None, limit=65):
    """Search-result title of a record page, at most `limit` characters: '<title> | TRE™ in Singapore' when that fits,
    else the title alone. A longer title uses the record's seoTitle (events-data.js), else its part before ' — ' / ': ',
    else it is cut at a word."""
    t = (preferred or full).strip()
    if len(t + SUFFIX) <= limit:
        return t + SUFFIX
    if len(t) <= limit:
        return t
    for sep in (" — ", ": ", " – "):
        head = t.split(sep)[0]
        if sep in t and 20 <= len(head) <= limit:
            return head + SUFFIX if len(head + SUFFIX) <= limit else head
    return t[:limit].rsplit(" ", 1)[0].rstrip(" ,;:—–-&")


IMG = {}  # window.TRE_IMG of this build (path -> [width, height, [variant widths]])


def event_page(e, template, facs, manifest):
    out = f"events/{e['slug']}.html"
    url = canonical_for(out)
    title = record_title(e["title"], e.get("seoTitle"))
    d = e.get("details") or {}
    desc = seo.trim(d.get("summary") or e.get("description") or "", 158)
    img, size = og(f"assets/img/og/event-{e['slug']}.jpg")
    nodes = base_graph(facs) + [seo.webpage(url, title, desc, image=img),
                                seo.breadcrumb(url, [("Events", BASE + "events"), (e["title"], url)]), seo.event_node(e, img)]
    meta = seo.head_meta(title, desc, url, img, "website", graph=nodes, image_size=size)
    body = record_body(template, "event-page", e["slug"], seo.event_static(e, "../"))
    assemble(body, out, title, desc, meta, "events", "../", manifest)


def facilitator_page(f, template, events, facs, manifest):
    out = f"facilitators/{f['id']}.html"
    url = canonical_for(out)
    title = f"{f['name']} — {f.get('tag') or 'TRE™ facilitator'} | TRE™ in Singapore"
    title = title if len(title) <= 70 else f"{f['name']} | TRE™ in Singapore"
    desc = seo.trim(f.get("summary") or f.get("bio") or "", 158)
    img, size = og(f"assets/img/og/fac-{f['id']}.jpg")
    who = seo.person(f, full=True)
    nodes = base_graph(facs, skip_isabelle=f["id"] == seo.ISABELLE) + [
        seo.webpage(url, title, desc, kind="ProfilePage", image=img, mainEntity={"@id": who["@id"]}),
        seo.breadcrumb(url, [("Facilitators", BASE + "facilitators"), (f["name"], url)]), who]
    meta = seo.head_meta(title, desc, url, img, "profile", graph=nodes, image_size=size)
    body = record_body(template, "facilitator-page", f["id"], seo.facilitator_static(f, events, "../"))
    assemble(body, out, title, desc, meta, "facilitators", "../", manifest)


def next_event(events, now_utc):
    """The event the countdown on events.html shows (the same rule as nextEvent() in main.js): not started yet, not
    postponed or cancelled, events you can still join before sold-out ones, then the earliest; real listings first."""
    def start(e):
        s = e.get("start") or ""
        try:
            t = datetime.datetime.fromisoformat(s[:16] if "T" in s else s[:10])
        except ValueError:
            return None
        return (t - datetime.timedelta(hours=seo.utc_offset_hours(e, t.date()))).replace(tzinfo=datetime.timezone.utc)
    now = now_utc if now_utc.tzinfo else now_utc.replace(tzinfo=datetime.timezone.utc)
    open_ = [e for e in events if start(e) and start(e) > now and e.get("status") not in ("postponed", "cancelled")]
    open_.sort(key=lambda e: (bool(e.get("soldOut")), start(e)))
    real = [e for e in open_ if not e.get("sample")]
    return (real or open_ or [None])[0]


def countdown_static(body, events, now_utc):
    """Write the next event into the countdown band at build time, so the band has its final size before main.js runs
    (it used to say "Loading…" and grow when the title arrived) and reads correctly without JavaScript."""
    e = next_event(events, now_utc)
    if not e:
        return body
    title = H.escape(e["title"], quote=False)
    sub = H.escape(f"{e.get('dateText', '')} · {e.get('venue') or e.get('location') or ''}", quote=False)
    link = e.get("link") or ""
    m = re.match(r"^event\?id=([^&#]+)", link)
    href = f"events/{m.group(1)}" if m else (link if link else "events")
    ext = ' target="_blank" rel="noopener"' if re.match(r"^https?:", href) else ""
    old_t = '<span id="countdown-title">Loading…</span><small id="countdown-sub"></small>'
    old_l = '<a class="btn btn-navy btn-sm" id="countdown-link" href="#calendar">Register</a>'
    assert body.count(old_t) == 1 and body.count(old_l) == 1, "events.body.html countdown markup changed"
    body = body.replace(old_t, f'<span id="countdown-title">{title}</span><small id="countdown-sub">{sub}</small>')
    return body.replace(old_l, f'<a class="btn btn-navy btn-sm" id="countdown-link" href="{H.escape(href)}"{ext}>Register</a>')


def sg_now():
    """(now in UTC, today's date in Singapore) - the build server may run in any time zone."""
    now = datetime.datetime.now(datetime.timezone.utc)
    return now, (now + datetime.timedelta(hours=8)).date()


def pretty_date(iso):
    try:
        d = datetime.date.fromisoformat((iso or "")[:10])
    except ValueError:
        return ""
    return f"{d.day} {d.strftime('%B')} {d.year}"


GENERATED = "<!-- generated: event post -->"


def event_post_pages(eposts, events, facs, manifest):
    """Render every post in _src/posts: published ones to blog/, drafts to drafts/. Removes stale copies."""
    by_slug = {e["slug"]: e for e in events}
    upcoming = sorted((e for e in events if not e["_past"] and e.get("status") not in ("postponed", "cancelled")),
                      key=lambda e: e.get("start") or "")
    template = read("event-post.body.html")
    keep = set()
    for p in eposts:
        e = by_slug.get(p.get("event"))
        if not e:
            print(f"event post {p['slug']}: no event '{p.get('event')}' in events-data.js; skipped")
            continue
        live = p.get("status") == "published"
        out = f"{'blog' if live else 'drafts'}/{p['slug']}.html"
        keep.add(out)
        title, body = EP.render(p, e, upcoming, "../", template, seo.text, pretty_date)
        page_title = f"{title} | TRE™ in Singapore" if len(title) <= 45 else title
        desc = EP.post_description(p, e, seo.trim)
        if live:
            url = canonical_for(out)
            img, size = og(f"assets/img/og/event-{e['slug']}.jpg")
            art = {"@type": "BlogPosting", "@id": url + "#article", "headline": seo.trim(title, 110), "description": desc, "url": url,
                   "mainEntityOfPage": {"@id": url + "#webpage"}, "image": [img], "inLanguage": "en-SG",
                   "author": {"@id": seo.ORG_ID}, "publisher": {"@id": seo.ORG_ID},
                   "about": {"@id": seo.rec_url("events", e["slug"]) + "#event"}, "articleSection": EP.KIND_LABEL[p["kind"]]}
            if p.get("date"):
                art["datePublished"] = art["dateModified"] = p["date"][:10] + "T00:00:00+08:00"
            nodes = base_graph(facs) + [seo.webpage(url, page_title, desc, image=img, reviewedBy={"@id": seo.ISABELLE_ID}),
                                        seo.breadcrumb(url, [("Blog", BASE + "blog"), (title, url)]), art]
            extra = [("article:published_time", art["datePublished"])] if p.get("date") else []
            meta = seo.head_meta(page_title, desc, url, img, "article", graph=nodes, extra=extra, image_size=size)
        else:
            meta = seo.head_meta(page_title, desc, url=None, robots="noindex,nofollow")
        assemble(body + "\n" + GENERATED + "\n", out, page_title, desc, meta, "blog", "../", manifest)
    for folder in ("drafts", "blog"):  # a post that moved (draft -> published) or was deleted leaves no copy behind
        for path in glob.glob(os.path.join(OUT, folder, "*.html")):
            rel = folder + "/" + os.path.basename(path)
            if rel not in keep and (folder == "drafts" or GENERATED in open(path, encoding="utf-8").read()):
                os.remove(path)
                print("removed stale", rel)


def write_sitemap_robots_llms(events, facs, eposts):
    """sitemap.xml (lastmod moves only for pages whose HTML changed), robots.txt, llms.txt."""
    old = {}
    sm = os.path.join(OUT, "sitemap.xml")
    if os.path.isfile(sm):
        for loc, mod in re.findall(r"<loc>([^<]+)</loc>\s*<lastmod>([^<]+)</lastmod>", read(sm)):
            old[loc] = mod
    today = sg_now()[1].isoformat()
    entries = []
    for _, out, *rest in PAGES:
        if rest[3] is None:  # ?id= templates are not pages of their own
            continue
        entries.append((out, "1.0" if out == "index.html" else "0.8"))
    entries += [(out, "0.7") for _, out, *_ in POSTS]
    entries += [(f"blog/{p['slug']}.html", "0.6") for p in EP.published(eposts)]
    entries += [(f"events/{e['slug']}.html", "0.5" if e["_past"] else "0.8") for e in events]
    entries += [(f"facilitators/{f['id']}.html", "0.7") for f in facs]
    lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for out, pri in entries:
        loc = canonical_for(out)
        mod = today if (out in CHANGED or loc not in old) else old[loc]
        lines += ["  <url>", f"    <loc>{loc}</loc>", f"    <lastmod>{mod}</lastmod>", f"    <priority>{pri}</priority>", "  </url>"]
    lines.append("</urlset>")
    write("sitemap.xml", "\n".join(lines) + "\n")
    write("robots.txt", "User-agent: *\nAllow: /\n\nSitemap: %ssitemap.xml\n" % BASE)
    pages = [(t, canonical_for(o), d) for _, o, t, d, *rest in PAGES if rest[1] is not None]
    posts = [(t, canonical_for(o), d) for _, o, t, d in POSTS]
    by_slug = {e["slug"]: e for e in events}
    posts += [(EP.post_title(p, by_slug[p["event"]]), canonical_for(f"blog/{p['slug']}.html"), EP.post_description(p, by_slug[p["event"]], seo.trim))
              for p in EP.published(eposts) if p.get("event") in by_slug]
    write("llms.txt", seo.llms_txt(pages, posts, events, facs))


def main(only, auto_drafts=False):
    data = site_data.load()
    now_utc, today = sg_now()
    events = seo.normalise_events(data["events"], now_utc) if data else []
    facs = [f for f in (data or {}).get("facilitators", []) if not f.get("sample")]
    eposts = EP.load_posts()
    if data and auto_drafts:  # the daily job: a preview for each new event, a recap for each event that just ended
        new = []
        for kind, e in EP.missing_drafts(events, eposts, today):
            slug = EP.write_draft(kind, e, today)
            new.append({"slug": slug, "kind": kind, "event": e["slug"], "title": e["title"], "url": BASE + "drafts/" + slug})
            print(f"new {kind} draft: drafts/{slug}")
        if new:
            eposts = EP.load_posts()
            if os.environ.get("TRE_NEW_DRAFTS"):
                with open(os.environ["TRE_NEW_DRAFTS"], "w", encoding="utf-8") as f:
                    f.write("\n".join(seo.json.dumps(x, ensure_ascii=False) for x in new) + "\n")
    if data:
        manifest = seo.manifest_script(events, facs)
    else:  # no Chrome: keep linking to the record pages that already exist
        have = lambda k: sorted(os.path.basename(p)[:-5] for p in glob.glob(os.path.join(OUT, k, "*.html")))
        manifest = "<script>window.TRE_STATIC=" + seo.json.dumps({"events": have("events"), "facilitators": have("facilitators")}, separators=(",", ":")) + ";</script>"
    manifest += EP.manifest_script(eposts, {e["slug"]: e for e in events}, seo.json.dumps)
    images.ensure_static()
    if data:  # smaller copies of the data pictures for main.js (srcset); see _src/images.py
        IMG.update(images.manifest(data["events"], data["facilitators"]))
        manifest += "<script>window.TRE_IMG=" + seo.json.dumps(IMG, separators=(",", ":")) + ";</script>"
    event_cards = EP.blog_cards(eposts, {e["slug"]: e for e in events}, seo.trim, pretty_date, seo.text)
    home_text = seo.text(read("index.body.html"))
    if seo.TRE_DEFINITION not in home_text:
        print("warning: llms.txt quotes a TRE definition that is no longer on the home page (seo.TRE_DEFINITION)")

    for body_file, out, title, desc, active, kind, crumb, image in PAGES:
        if only and out not in only:
            continue
        body = read(body_file)
        body = body.replace("{{STATIC_EVENTS}}", seo.events_static_list(events, ""))
        body = body.replace("{{STATIC_FACILITATORS}}", seo.facilitators_static_list(facs, ""))
        body = body.replace("{{EVENT_POSTS}}", event_cards)
        if out == "events.html":
            body = countdown_static(body, events, now_utc)
        meta = page_meta(out, title, desc, kind, crumb, image, body, events, facs, POSTS)
        assemble(body, out, title, desc, meta, active, "", manifest)
    for body_file, out, title, desc in POSTS:
        if only and out not in only:
            continue
        body = read(body_file)
        assemble(body, out, title, desc, post_meta(out, title, desc, body, facs), "blog", "../", manifest)
    if data:
        tev, tfac = read("event.body.html"), read("facilitator.body.html")
        for e in events:
            if not only or f"events/{e['slug']}.html" in only:
                event_page(e, tev, facs, manifest)
        for f in facs:
            if not only or f"facilitators/{f['id']}.html" in only:
                facilitator_page(f, tfac, events, facs, manifest)
        if not only:
            event_post_pages(eposts, events, facs, manifest)
    if not only or "404.html" in only:
        meta = seo.head_meta("Page not found — TRE™ in Singapore", "This page has moved or no longer exists.", url=None, robots="noindex,follow")
        assemble(read("404.body.html"), "404.html", "Page not found — TRE™ in Singapore",
                 "This page has moved or no longer exists.", meta, "", "", manifest, head_first=BASE_404)
    if not only:
        for old, new in REDIRECTS.items():
            write(old + ".html", redirect_page(old, new))
        write_sitemap_robots_llms(events, facs, eposts)
    print("done")


if __name__ == "__main__":
    args = sys.argv[1:]
    main({a for a in args if not a.startswith("--")}, auto_drafts="--auto-drafts" in args)
