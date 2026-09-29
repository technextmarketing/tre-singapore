"""
SEO, AEO and GEO for the TRE(TM) in Singapore site, used by build.py.

  head_meta(...)     the <head> block after <title> and the meta description: canonical, robots, Open Graph,
                     Twitter card and one schema.org JSON-LD @graph
  graph builders     Organization, WebSite, Person, WebPage, BreadcrumbList, FAQPage, BlogPosting, Course,
                     Event and ItemList nodes
  record pages       static, crawlable content for every event (events/<slug>) and facilitator (facilitators/<id>);
                     main.js replaces it with the full interactive page, and CSS hides it while JavaScript runs
  llms_txt(...)      a plain-text map of the site for AI answer engines

Everything is generated from the page sources and the data files, so the visible text, the structured data and
the crawlable copies can never drift apart. Nothing in here invents a fact: every value comes from the site.
"""
import datetime, html as H, json, re

BASE = "https://tre-in-singapore.com/"
SITE = "TRE™ in Singapore"
ORG_ID, WEBSITE_ID, ISABELLE_ID = BASE + "#org", BASE + "#website", BASE + "#isabelle"
ISABELLE = "isabelle-claus-teixeira"
LOGO = BASE + "assets/img/logo-tre-singapore.png"
DEFAULT_IMAGE = BASE + "assets/img/og-cover.jpg"
EMAIL, PHONE = "isabelle@bhdasia.com", "+81 80 6515 1778"
ADDRESS = {"@type": "PostalAddress", "streetAddress": "50 Raffles Place, #30-00 Singapore Land Tower",
           "addressLocality": "Singapore", "postalCode": "048623", "addressCountry": "SG"}
ROBOTS_INDEX = "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
MONTHS = {m: i + 1 for i, m in enumerate(["January", "February", "March", "April", "May", "June", "July",
                                          "August", "September", "October", "November", "December"])}
# The site's own definition of TRE (home page copy); llms.txt quotes it verbatim, and the build checks it is still there.
TRE_DEFINITION = ("TRE™ is a series of seven gentle exercises that safely activate a natural reflex: a shaking or vibrating "
                  "response called a neurogenic tremor. Developed by Dr. David Berceli, the method helps the body release deep "
                  "muscular patterns of stress, tension and trauma — without needing to talk about what happened.")


# ---------------------------------------------------------------- text helpers
INLINE_TAGS = r"(?:a|abbr|b|cite|code|dfn|em|i|kbd|mark|q|s|small|span|strong|sub|sup|time|u)"


def text(s):
    """Visible text of an HTML fragment. Inline tags vanish without a space (so 'tremor</strong>.' stays 'tremor.')."""
    s = re.sub(r"<(script|style|svg)\b.*?</\1>", " ", s or "", flags=re.S)
    s = re.sub(r"</?" + INLINE_TAGS + r"\b[^>]*>", "", s)
    s = re.sub(r"<[^>]+>", " ", s)
    return " ".join(H.unescape(s).split())


def trim(s, n=158):
    s = " ".join((s or "").split())
    if len(s) <= n:
        return s
    cut = s[:n - 1].rsplit(" ", 1)[0].rstrip(",;:—–- ")
    return cut + "…"


def esc(s):
    return H.escape(str(s or ""), quote=True)


def absolute(rel):
    rel = str(rel or "")
    return rel if rel.startswith("http") else BASE + rel.lstrip("./")


def ld(nodes):
    doc = {"@context": "https://schema.org", "@graph": [n for n in nodes if n]}
    return ('<script type="application/ld+json">' +
            json.dumps(doc, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/") + "</script>")


# ---------------------------------------------------------------- head block
def head_meta(title, desc, url=None, image=None, og_type="website", robots=ROBOTS_INDEX, graph=None,
              extra=(), image_size=None):
    """Everything after <title>/<meta description>. url=None: no canonical (templates, 404)."""
    image = image or DEFAULT_IMAGE
    out = []
    if url:
        out.append(f'<link rel="canonical" href="{esc(url)}">')
    out.append(f'<meta name="robots" content="{esc(robots)}">')
    out += [f'<meta property="og:locale" content="en_SG">',
            f'<meta property="og:site_name" content="{esc(SITE)}">',
            f'<meta property="og:type" content="{esc(og_type)}">',
            f'<meta property="og:title" content="{esc(title)}">',
            f'<meta property="og:description" content="{esc(desc)}">']
    if url:
        out.append(f'<meta property="og:url" content="{esc(url)}">')
    out.append(f'<meta property="og:image" content="{esc(image)}">')
    if image_size:
        out += [f'<meta property="og:image:width" content="{image_size[0]}">',
                f'<meta property="og:image:height" content="{image_size[1]}">']
    out += [f'<meta name="twitter:card" content="summary_large_image">',
            f'<meta name="twitter:title" content="{esc(title)}">',
            f'<meta name="twitter:description" content="{esc(desc)}">',
            f'<meta name="twitter:image" content="{esc(image)}">']
    for prop, val in extra:
        out.append(f'<meta property="{esc(prop)}" content="{esc(val)}">')
    if graph:
        out.append(ld(graph))
    return "\n".join(out)


# ---------------------------------------------------------------- shared entities
def organization():
    return {
        "@type": "Organization", "@id": ORG_ID, "name": SITE, "alternateName": ["TRE Singapore", "TRE in Singapore"],
        "url": BASE, "logo": {"@type": "ImageObject", "url": LOGO}, "image": DEFAULT_IMAGE,
        "description": ("The home of TRE™ (Tension and Trauma Releasing Exercises) in Singapore: certified providers, "
                        "Global TRE™ Provider Certification, workshops, practice circles and resources."),
        "email": EMAIL, "telephone": PHONE, "address": ADDRESS,
        "areaServed": {"@type": "Country", "name": "Singapore"},
        "founder": {"@id": ISABELLE_ID},
        "parentOrganization": {"@type": "Organization", "name": "Business & Human Development Consulting Pte Ltd",
                               "alternateName": "BHD Asia", "url": "https://bhdasia.com/",
                               "sameAs": ["https://www.facebook.com/bhdasia/"]},
        "knowsAbout": ["Tension and Trauma Releasing Exercises (TRE)", "Neurogenic tremors", "Nervous system regulation",
                       "Stress and trauma release", "TRE provider certification"],
    }


def website():
    return {"@type": "WebSite", "@id": WEBSITE_ID, "url": BASE, "name": SITE, "alternateName": "TRE Singapore",
            "inLanguage": "en-SG", "publisher": {"@id": ORG_ID}}


def same_as(f):
    urls = [s.get("url", "") for s in f.get("socials") or []] + [(f.get("website") or {}).get("url", "")]
    urls = [u for u in urls if u.startswith("http") and not re.search(r"wa\.me|calendly\.com|mailto:", u)]
    return list(dict.fromkeys(urls))


def person(f, full=True):
    """A facilitator as schema.org Person. Isabelle keeps one @id site-wide (she is the Organization's founder)."""
    pid = ISABELLE_ID if f["id"] == ISABELLE else rec_url("facilitators", f["id"]) + "#person"
    node = {"@type": "Person", "@id": pid, "name": f["name"], "url": rec_url("facilitators", f["id"])}
    roles = [r.strip() for r in (f.get("role") or "").split("·") if r.strip()]
    if roles:
        node["jobTitle"] = roles if len(roles) > 1 else roles[0]
    if f.get("photo"):
        node["image"] = absolute(f["photo"])
    sa = same_as(f)
    if sa:
        node["sameAs"] = sa
    if f["id"] == ISABELLE:
        node["worksFor"] = {"@id": ORG_ID}
    if full:
        if f.get("summary") or f.get("bio"):
            node["description"] = f.get("summary") or f.get("bio")
        if f.get("services"):
            node["knowsAbout"] = f["services"]
    return node


def isabelle(facs):
    f = next((x for x in facs or [] if x["id"] == ISABELLE), None)
    return person(f, full=False) if f else {"@type": "Person", "@id": ISABELLE_ID, "name": "Isabelle Claus Teixeira"}


def webpage(url, name, desc, kind="WebPage", image=None, crumbs=True, **extra):
    node = {"@type": kind, "@id": url + "#webpage", "url": url, "name": name, "description": desc,
            "isPartOf": {"@id": WEBSITE_ID}, "about": {"@id": ORG_ID}, "inLanguage": "en-SG"}
    if image:
        node["primaryImageOfPage"] = {"@type": "ImageObject", "url": image}
    if crumbs:
        node["breadcrumb"] = {"@id": url + "#breadcrumb"}
    node.update(extra)
    return node


def breadcrumb(url, trail):
    items = [("Home", BASE)] + list(trail)
    return {"@type": "BreadcrumbList", "@id": url + "#breadcrumb",
            "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": n, "item": u} for i, (n, u) in enumerate(items)]}


FAQ_RE = re.compile(r"<details\b[^>]*>\s*<summary\b[^>]*>(.*?)</summary>(.*?)</details>", re.S)


def faq(url, body):
    """FAQPage from the page's own <details><summary>question?</summary>answer</details> items (visible text only)."""
    qa = [(text(q), text(a)) for q, a in FAQ_RE.findall(body)]
    qa = [(q, a) for q, a in qa if q.endswith("?") and len(a) > 20]
    if len(qa) < 2:
        return None
    return {"@type": "FAQPage", "@id": url + "#faq", "isPartOf": {"@id": url + "#webpage"},
            "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in qa]}


def item_list(url, name, items):
    if not items:
        return None
    return {"@type": "ItemList", "@id": url + "#list", "name": name, "numberOfItems": len(items),
            "itemListElement": [{"@type": "ListItem", "position": i + 1, "url": u, "name": n} for i, (n, u) in enumerate(items)]}


def post_date(body):
    """The article's stated date as an ISO datetime at the start of that day in Singapore (Google wants a time zone)."""
    m = re.search(r"(\d{1,2}) (" + "|".join(MONTHS) + r") (20\d\d)", text(body))
    if not m:
        return None
    return datetime.date(int(m.group(3)), MONTHS[m.group(2)], int(m.group(1))).isoformat() + "T00:00:00+08:00"


def blog_posting(url, body, desc, image):
    h1 = re.search(r"<h1[^>]*>(.*?)</h1>", body, re.S)
    headline = text(h1.group(1)) if h1 else ""
    sec = re.search(r'post-meta"><span class="badge[^"]*">([^<]+)</span>', body)
    words = len(text(re.sub(r"<(aside|nav)\b.*?</\1>", " ", body, flags=re.S)).split())
    node = {"@type": "BlogPosting", "@id": url + "#article", "headline": trim(headline, 110), "description": desc,
            "url": url, "mainEntityOfPage": {"@id": url + "#webpage"}, "image": [image], "inLanguage": "en-SG",
            "author": {"@id": ORG_ID}, "publisher": {"@id": ORG_ID}, "wordCount": words,
            "about": {"@type": "Thing", "name": "Tension and Trauma Releasing Exercises (TRE)"}}
    d = post_date(body)
    if d:
        node["datePublished"] = node["dateModified"] = d
    if sec:
        node["articleSection"] = text(sec.group(1))
    return node


def course(url, body):
    m = re.search(r'id="ed-cert-h".*?</h2>(.*?)(?:<h2|$)', body, re.S)
    first_p = re.search(r"<p[^>]*>(.*?)</p>", m.group(1), re.S) if m else None
    desc = trim(text(first_p.group(1)), 300) if first_p else "The three-module Global TRE™ Provider Certification in Singapore."
    return {"@type": "Course", "@id": url + "#course", "name": "Global TRE™ Provider Certification",
            "description": desc, "url": url + "#certification", "provider": {"@id": ORG_ID},
            "educationalCredentialAwarded": "Global TRE™ Certified Provider", "inLanguage": "en"}


# ---------------------------------------------------------------- records (events, facilitators)
def rec_url(kind, rid):
    return BASE + kind + "/" + rid


def utc_offset_hours(e, d):
    """The event's own clock: Bucharest venues follow Europe/Bucharest (EET/EEST), everything else Singapore (+8)."""
    where = " ".join(str(e.get(k) or "") for k in ("location", "venue", "tz")).lower()
    if "bucharest" in where or "romania" in where:
        return 3 if _last_sunday(d.year, 3) <= d < _last_sunday(d.year, 10) else 2
    return 8


def normalise_events(events, now_utc):
    """_past = the event's last day has ended at the event's own place (same rule as main.js)."""
    out = []
    for e in events or []:
        if not e.get("slug"):
            continue
        last = (e.get("end") or e.get("start") or "")[:10]
        local_today = (now_utc + datetime.timedelta(hours=utc_offset_hours(e, now_utc.date()))).date()
        e = dict(e, _past=bool(last) and last < local_today.isoformat())
        out.append(e)
    upcoming = sorted((e for e in out if not e["_past"]), key=lambda e: e.get("start") or "")
    past = sorted((e for e in out if e["_past"]), key=lambda e: e.get("start") or "", reverse=True)
    return upcoming + past


def _last_sunday(year, month):
    d = datetime.date(year, month + 1, 1) - datetime.timedelta(days=1) if month < 12 else datetime.date(year, 12, 31)
    return d - datetime.timedelta(days=(d.weekday() + 1) % 7)


def event_start(e):
    """ISO start. A clock time gets an offset only when the time zone is stated by the site; otherwise date only."""
    s = e.get("start") or ""
    if "T" not in s:
        return s
    where = " ".join(str(e.get(k) or "") for k in ("location", "venue")).lower()
    tt = (e.get("timeText") or "").lower()
    d = datetime.date.fromisoformat(s[:10])
    if "bucharest" in where:
        off = "+03:00" if _last_sunday(d.year, 3) <= d < _last_sunday(d.year, 10) else "+02:00"
    elif e.get("region") == "singapore" or "singapore time" in tt or "sgt" in tt:
        off = "+08:00"
    else:
        return s[:10]
    return s + ":00" + off


def _register_url(e):
    d = e.get("details") or {}
    reg = [r for r in d.get("register") or [] if (r.get("url") or "").startswith("http")]
    primary = next((r for r in reg if r.get("primary")), reg[0] if reg else None)
    if primary:
        return primary["url"]
    return e.get("link") if (e.get("link") or "").startswith("http") else rec_url("events", e["slug"])


def _offer(e):
    p = e.get("price") or ""
    m = re.search(r"(S\$|US\$|€|£|SGD|EUR|RON)\s?([\d,]+(?:\.\d+)?)", p)
    if not m:
        return None
    cur = {"S$": "SGD", "US$": "USD", "€": "EUR", "£": "GBP"}.get(m.group(1), m.group(1))
    amount = m.group(2).replace(",", "")
    avail = "https://schema.org/SoldOut" if e.get("soldOut") else "https://schema.org/InStock"
    if p.strip().lower().startswith("from"):
        return {"@type": "AggregateOffer", "lowPrice": amount, "priceCurrency": cur, "availability": avail, "url": _register_url(e)}
    return {"@type": "Offer", "price": amount, "priceCurrency": cur, "availability": avail, "url": _register_url(e)}


def event_node(e, image):
    d = e.get("details") or {}
    url = rec_url("events", e["slug"])
    fmt = (e.get("format") or "").lower()
    online = "online" in fmt or e.get("region") == "online"
    inperson = "in-person" in fmt or "in person" in fmt or (not online)
    mode = "Mixed" if online and inperson else ("Online" if online else "Offline")
    where = " ".join(str(e.get(k) or "") for k in ("location", "venue")).lower()
    city, country = ("Bucharest", "RO") if "bucharest" in where else (("Singapore", "SG") if e.get("region") == "singapore" or "singapore" in where else (None, None))
    locs = []
    if inperson and city:
        locs.append({"@type": "Place", "name": e.get("venue") or e.get("location") or city,
                     "address": {"@type": "PostalAddress", "addressLocality": city, "addressCountry": country}})
    if online:
        zoom = next((u for u in [e.get("link") or ""] + [r.get("url") or "" for r in d.get("register") or []] if "zoom.us" in u), None)
        locs.append({"@type": "VirtualLocation", "url": zoom or url})  # a private join link: the event page itself
    node = {"@type": "Event", "@id": url + "#event", "name": e["title"], "url": url,
            "description": d.get("summary") or e.get("description") or "", "startDate": event_start(e),
            "eventAttendanceMode": f"https://schema.org/{mode}EventAttendanceMode",
            "eventStatus": {"postponed": "https://schema.org/EventPostponed", "cancelled": "https://schema.org/EventCancelled"}.get(
                e.get("status"), "https://schema.org/EventScheduled"), "image": [image], "inLanguage": "en"}
    if e.get("end"):
        node["endDate"] = e["end"][:10] if "T" not in e["end"] else e["end"]
    if locs:
        node["location"] = locs if len(locs) > 1 else locs[0]
    people = [p.get("name") for p in d.get("facilitators") or [] if p.get("name")] or \
             [n.strip() for n in re.split(r"\s*&\s*|,\s*", e.get("facilitator") or "") if n.strip()]
    if people:
        node["performer"] = [{"@type": "Person", "name": n} for n in people]
    src = (d.get("source") or "") + " " + (e.get("link") or "")
    if "hummingbeing.com" in src:
        node["organizer"] = {"@type": "Organization", "name": "HummingBeing", "url": "https://hummingbeing.com/"}
    off = _offer(e)
    if off:
        node["offers"] = off
    return node


def href(u, root):
    """A link from the data files, for a page `root` levels down: anything with a scheme (http:, mailto:, tel:) as is."""
    u = u or ""
    return u if re.match(r"^([a-z][a-z0-9+.-]*:|#|//)", u) else root + u


def _li(items):
    return "".join(f"<li>{esc(x)}</li>" for x in items if x)


def event_static(e, root):
    """Crawlable copy of an event record (hidden while JavaScript runs; main.js renders the full page)."""
    d = e.get("details") or {}
    facts = " · ".join(x for x in [e.get("dateText"), e.get("timeText"), e.get("venue") or e.get("location"), e.get("format")] if x)
    h = [f'<section class="section rec-static"><div class="container">',
         f'<p class="crumbs"><a href="{root}">Home</a> › <a href="{root}events">Events</a> › {esc(e.get("category") or "")}</p>',
         f'<h1>{esc(e["title"])}</h1>', f'<p><strong>{esc(facts)}</strong></p>']
    if e.get("status") in ("postponed", "cancelled"):
        h.append(f'<p><strong>This event is {esc(e["status"])}.</strong></p>')
    elif e.get("_past"):
        h.append("<p><strong>This event has ended.</strong></p>")
    if e.get("facilitator"):
        h.append(f'<p>With {esc(e["facilitator"])}</p>')
    h.append(f'<p>{esc(d.get("summary") or e.get("description") or "")}</p>')
    h += [f"<p>{esc(p)}</p>" for p in d.get("about") or []]
    if d.get("forWho"):
        h.append(f"<h2>Who it is for</h2><ul>{_li(d['forWho'])}</ul>")
    if d.get("schedule"):
        rows = [" — ".join(x for x in [" ".join(y for y in [s.get("when"), s.get("time")] if y), s.get("title"), s.get("text")] if x)
                for s in d["schedule"]]
        h.append(f"<h2>Programme</h2><ul>{_li(rows)}</ul>")
    if d.get("includes"):
        h.append(f"<h2>What is included</h2><ul>{_li(d['includes'])}</ul>")
    if d.get("pricing") or e.get("price") or e.get("priceText"):
        rows = [" — ".join(x for x in [(p.get("label") or "") + (f" ({p['sub']})" if p.get("sub") else ""), p.get("price"), p.get("note")] if x)
                for p in d.get("pricing") or []] or [" ".join(x for x in [e.get("price"), e.get("priceNote"), e.get("priceText")] if x)]
        h.append(f"<h2>Fees</h2><ul>{_li(rows)}</ul>" + (f"<p>{esc(d['pricingNote'])}</p>" if d.get("pricingNote") else ""))
    if d.get("facilitators"):
        rows = [". ".join(x for x in [", ".join(y for y in [p.get("name"), p.get("role")] if y), p.get("bio")] if x) for p in d["facilitators"]]
        h.append(f"<h2>Facilitators</h2><ul>{_li(rows)}</ul>")
    if d.get("partners"):
        h.append(f"<p>{esc(d['partners'])}</p>")
    links = [r for r in d.get("register") or [] if r.get("url")]
    if not e.get("_past") and links:
        h.append("<p>" + " · ".join(f'<a href="{esc(href(r["url"], root))}">{esc(r.get("label") or "Register")}</a>' for r in links) + "</p>")
    h.append(f'<p><a href="{root}events">All TRE™ events</a>' + (f' · <a href="{root}online-session-guide">Online session guide</a>' if d.get("online") else "") + "</p>")
    h.append("</div></section>")
    return "\n".join(h)


def facilitator_static(f, events, root):
    facts = f.get("facts") or {}
    h = [f'<section class="section rec-static"><div class="container">',
         f'<p class="crumbs"><a href="{root}">Home</a> › <a href="{root}facilitators">Facilitators</a> › {esc(f.get("tag") or "")}</p>',
         f'<h1>{esc(f["name"])}</h1>', f'<p><strong>{esc(f.get("role") or "")}</strong></p>',
         f'<p>{esc(f.get("summary") or f.get("bio") or "")}</p>']
    rows = [f"{k}: {facts[key]}" for k, key in (("Where", "location"), ("Languages", "languages"), ("Formats", "formats"), ("Certification", "certified")) if facts.get(key)]
    if rows:
        h.append(f"<ul>{_li(rows)}</ul>")
    h += [f"<p>{esc(p)}</p>" for p in f.get("about") or []]
    if f.get("highlights"):
        h.append(f"<h2>Highlights</h2><ul>{_li(f['highlights'])}</ul>")
    if f.get("offers"):
        h.append(f"<h2>Sessions and services</h2><ul>{_li(o.get('title', '') + ': ' + o.get('text', '') for o in f['offers'])}</ul>")
    c = f.get("contact") or {}
    links = [(u, l) for u, l in ((c.get("email"), "Email"), (c.get("whatsapp"), "WhatsApp"), (c.get("book"), "Book a session")) if u]
    links += [(u, (f.get("website") or {}).get("label") or u) for u in [(f.get("website") or {}).get("url")] if u]
    links += [(s["url"], s.get("label") or s.get("type")) for s in f.get("socials") or [] if s.get("url") and s["url"] != (f.get("website") or {}).get("url")]
    if links:
        h.append("<h2>Contact</h2><p>" + " · ".join(f'<a href="{esc(u)}">{esc(l)}</a>' for u, l in links) + "</p>")
    mine = [e for e in events if e["slug"] in (f.get("events") or []) and not e["_past"]]
    if mine:
        h.append("<h2>Upcoming events</h2><ul>" + "".join(f'<li><a href="{root}events/{esc(e["slug"])}">{esc(e["title"])}</a> — {esc(e.get("dateText") or "")}</li>' for e in mine) + "</ul>")
    h.append(f'<p><a href="{root}facilitators">All TRE™ facilitators in Singapore</a></p></div></section>')
    return "\n".join(h)


def events_static_list(events, root):
    if not events:
        return ""
    def row(e):
        bits = " · ".join(x for x in [e.get("dateText"), e.get("location"), e.get("price"),
                                            (e.get("status") or "").capitalize() or None] if x)
        return f'<li><a href="{root}events/{esc(e["slug"])}">{esc(e["title"])}</a> — {esc(bits)}</li>'
    up = [row(e) for e in events if not e["_past"]]
    past = [row(e) for e in events if e["_past"]]
    return ('<div class="container rec-static"><h2>All TRE™ events</h2>' +
            (f"<h3>Upcoming</h3><ul>{''.join(up)}</ul>" if up else "") + (f"<h3>Past events</h3><ul>{''.join(past)}</ul>" if past else "") + "</div>")


def facilitators_static_list(facs, root):
    if not facs:
        return ""
    rows = "".join(f'<li><a href="{root}facilitators/{esc(f["id"])}">{esc(f["name"])}</a> — {esc(f.get("role") or "")}. {esc(f.get("bio") or "")}</li>' for f in facs)
    return f'<div class="container rec-static"><h2>All TRE™ facilitators and certified providers in Singapore</h2><ul>{rows}</ul></div>'


def manifest_script(events, facs):
    m = {"events": [e["slug"] for e in events], "facilitators": [f["id"] for f in facs]}
    return "<script>window.TRE_STATIC=" + json.dumps(m, separators=(",", ":")) + ";</script>"


# ---------------------------------------------------------------- llms.txt
def llms_txt(pages, posts, events, facs):
    L = [f"# {SITE}", "",
         "> The Singapore hub for TRE™ (Tension and Trauma Releasing Exercises): certified providers, the Global TRE™ "
         "Provider Certification, workshops, online sessions and plain-language guides. Founded by Global TRE™ Certifying "
         f"Trainer Isabelle Claus Teixeira. Website: {BASE}", "",
         TRE_DEFINITION, "",
         "TRE™ is a registered trademark of TRE For All, Inc. Method created by Dr. David Berceli.", "", "## Pages"]
    L += [f"- [{t}]({u}): {d}" for t, u, d in pages]
    L += ["", "## Guides and articles"] + [f"- [{t}]({u}): {d}" for t, u, d in posts]
    up = [e for e in events if not e["_past"] and e.get("status") not in ("postponed", "cancelled")]
    if up:
        L += ["", "## Upcoming events"]
        L += [f"- [{e['title']}]({rec_url('events', e['slug'])}): " + " · ".join(x for x in [e.get("dateText"), e.get("location"), e.get("price")] if x) for e in up]
    if facs:
        L += ["", "## Facilitators and certified providers"]
        L += [f"- [{f['name']}]({rec_url('facilitators', f['id'])}): {f.get('role') or ''}" for f in facs]
    L += ["", "## Contact",
          f"- Email: {EMAIL}", f"- WhatsApp: {PHONE}",
          "- Address: Business & Human Development Consulting Pte Ltd, 50 Raffles Place, Singapore Land Tower #30-00, Singapore 048623",
          "- Book a certification intake call: https://calendly.com/bhdasia/tre-certification-intake-call", ""]
    return "\n".join(L)
