"""
Event blog posts: a PREVIEW for every event and a RECAP after it ends. Used by build.py.

One file per post in _src/posts/<post-slug>.html:

    <!--post
    {"event": "the-body-in-the-room", "kind": "preview", "status": "draft", "date": "2026-09-29",
     "title": "optional", "description": "optional", "credit": "optional hero caption",
     "photos": [{"src": "assets/img/...", "alt": "...", "caption": "..."}]}
    -->
    optional body HTML (leave empty to use the text generated from the event's data)

status "draft"     -> /drafts/<post-slug>: noindex, not linked, not in the sitemap, the blog, llms.txt or structured data
status "published" -> /blog/<post-slug>: listed on /blog, linked from the event page, in the sitemap and llms.txt

`python _src/build.py --auto-drafts` (the daily GitHub Action runs this) writes the missing drafts:
  - a preview for every event that has not started yet (not postponed or cancelled)
  - a recap for every event that ended on or after SYSTEM_START (not postponed or cancelled)
A human approves each draft (add photos and highlights to recaps), then sets "status": "published".
Every sentence the generator writes comes from the event's own data; nothing is invented.
"""
import datetime, html as H, json, os, re

import images  # noqa: E402  (smaller copies of the event posters; _src/images.py)

SYSTEM_START = "2026-09-29"  # recaps are drafted for events that end on or after this day (the user asked for no back-catalogue)
POSTS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "posts")
HEROES = {"Certification": ("hero-education", "Isabelle & Simba with the Module 2 cohort · September 2026"),
          None: ("hero-events", "Module 2 with Isabelle & Simba · Singapore, September 2026")}
KIND_LABEL = {"preview": "Event preview", "recap": "Event recap"}
HEAD_RE = re.compile(r"^\s*<!--post\s*(\{.*?\})\s*-->\s*", re.S)


def esc(s):
    return H.escape(str(s or ""), quote=True)


def short_title(e):
    return re.split(r"\s+[—–-]\s+", e["title"], maxsplit=1)[0].strip()


def load_posts():
    posts = []
    if not os.path.isdir(POSTS_DIR):
        return posts
    for name in sorted(os.listdir(POSTS_DIR)):
        if not name.endswith(".html"):
            continue
        raw = open(os.path.join(POSTS_DIR, name), encoding="utf-8").read()
        m = HEAD_RE.match(raw)
        if not m:
            print(f"event_posts: {name} has no <!--post {{...}} --> header; skipped")
            continue
        meta = json.loads(m.group(1))
        meta["slug"] = name[:-5]
        meta["body"] = raw[m.end():].strip()
        meta.setdefault("status", "draft")
        posts.append(meta)
    return posts


def _off(e):
    return e.get("status") in ("postponed", "cancelled")


def missing_drafts(events, posts, today):
    """(kind, event) pairs that should get an auto-draft today."""
    have = {(p.get("event"), p.get("kind")) for p in posts}
    out = []
    for e in events:
        if _off(e) or e.get("sample"):
            continue
        started = (e.get("start") or "")[:10] <= today.isoformat()
        last = (e.get("end") or e.get("start") or "")[:10]
        if not started and not e["_past"] and (e["slug"], "preview") not in have:
            out.append(("preview", e))
        if e["_past"] and last >= SYSTEM_START and (e["slug"], "recap") not in have:
            out.append(("recap", e))
    return out


def write_draft(kind, e, today):
    os.makedirs(POSTS_DIR, exist_ok=True)
    slug = f"{e['slug']}-{kind}"
    path = os.path.join(POSTS_DIR, slug + ".html")
    meta = {"event": e["slug"], "kind": kind, "status": "draft", "date": today.isoformat()}
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write("<!--post\n" + json.dumps(meta, ensure_ascii=False, indent=1) + "\n-->\n")
    return slug


def post_title(p, e):
    if p.get("title"):
        return p["title"]
    return f"{short_title(e)}: what to expect" if p["kind"] == "preview" else f"{short_title(e)}: event recap"


def post_description(p, e, trim):
    if p.get("description"):
        return p["description"]
    d = (e.get("details") or {}).get("summary") or e.get("description") or ""
    if p["kind"] == "recap":
        d = f"A look back at {short_title(e)} ({e.get('dateText') or ''}). " + d
    return trim(d, 158)


def _lis(items):
    return "".join(f"<li>{esc(x)}</li>" for x in items if x)


def _h2(text):
    return f'<h2 id="{re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")}">{esc(text)}</h2>'


def _event_link(e, root):
    return f"{root}events/{e['slug']}"


def generated_body(p, e, upcoming, root):
    """Article text built only from the event record."""
    d = e.get("details") or {}
    b = []
    if p["kind"] == "recap":
        if p.get("status") != "published":
            b.append('<div class="draft-note"><b>Before publishing:</b> add 3–6 photos and two or three highlights '
                     '(a moment, a quote, how many joined). The text below is drafted from the event details.</div>')
        where = " · ".join(x for x in [e.get("format"), e.get("venue") or e.get("location")] if x)
        who = e.get("facilitator")
        b.append(f'<p class="lead">On {esc(e.get("dateText"))}, {esc(who) + " led " if who else ""}'
                 f'<a href="{_event_link(e, root)}">{esc(e["title"])}</a>{" (" + esc(where) + ")" if where else ""}.</p>')
        if d.get("summary"):
            b.append(f"<p>{esc(d['summary'])}</p>")
        covered = d.get("includes") or [s.get("title") for s in d.get("schedule") or [] if s.get("title")]
        if covered:
            b.append(_h2("What the programme covered") + f"<ul>{_lis(covered)}</ul>")
        for ph in p.get("photos") or []:
            b.append(f'<figure class="ar-figure"><img src="{root}{esc(ph["src"])}"{images.srcset_attrs(root, ph["src"], "gallery", "(max-width: 760px) 92vw, 720px")} alt="{esc(ph.get("alt"))}" loading="lazy" decoding="async">'
                     + (f"<figcaption>{esc(ph['caption'])}</figcaption>" if ph.get("caption") else "") + "</figure>")
        nxt = [x for x in upcoming if x["slug"] != e["slug"]][:3]
        if nxt:
            b.append(_h2("What's next") + "<ul>" + "".join(
                f'<li><a href="{_event_link(x, root)}">{esc(x["title"])}</a> — {esc(x.get("dateText"))}</li>' for x in nxt) + "</ul>")
        b.append(f'<p>Missed it? <a href="{root}events">See upcoming TRE™ events</a> or <a href="{root}facilitators">find a certified provider</a> in Singapore.</p>')
        return "\n".join(b)
    # preview
    b.append(f'<p class="lead">{esc(d.get("summary") or e.get("description"))}</p>')
    if e.get("image"):
        srcset = images.srcset_attrs(root, e["image"], "poster", "(max-width: 760px) 92vw, 720px")
        b.append(f'<figure class="ar-figure"><img src="{root}{esc(e["image"])}"{srcset} alt="{esc(e["title"])} — event poster" width="1920" height="1080" loading="lazy" decoding="async"></figure>')
    facts = [("Date", e.get("dateText")), ("Time", e.get("timeText")), ("Where", e.get("venue") or e.get("location")),
             ("Format", e.get("format")), ("With", e.get("facilitator")), ("Credits", e.get("credits"))]
    b.append(_h2("When and where") + "<ul>" + "".join(f"<li><strong>{k}:</strong> {esc(v)}</li>" for k, v in facts if v) + "</ul>")
    if d.get("forWho"):
        b.append(_h2("Who it is for") + f"<ul>{_lis(d['forWho'])}</ul>")
    if d.get("about") or d.get("includes"):
        b.append(_h2("What it covers") + "".join(f"<p>{esc(x)}</p>" for x in d.get("about") or []) +
                 (f"<ul>{_lis(d['includes'])}</ul>" if d.get("includes") else ""))
    if d.get("facilitators"):
        b.append(_h2("Your facilitators" if len(d["facilitators"]) > 1 else "Your facilitator") + "".join(
            f"<p><strong>{esc(x.get('name'))}</strong>{', ' + esc(x.get('role')) if x.get('role') else ''}. {esc(x.get('bio'))}</p>" for x in d["facilitators"]))
    price = e.get("price") or e.get("priceText")
    b.append(_h2("Fees and registration") + (f"<p>{esc(price)}{' — ' + esc(e.get('priceNote')) if e.get('priceNote') else ''}.</p>" if price else "")
             + f'<p>The full programme, every fee option and the registration links are on the event page: '
               f'<a class="link-arrow" href="{_event_link(e, root)}">{esc(e["title"])}</a></p>')
    if d.get("online"):
        b.append(_h2("Joining online") + f'<p>Set up your space, camera and kit before the session with the <a href="{root}online-session-guide">online session guide</a>.</p>')
    return "\n".join(b)


def minutes(body_html, text):
    return max(2, round(len(text(body_html).split()) / 200))


def render(p, e, upcoming, root, template, text, pretty_date):
    body = p["body"] or generated_body(p, e, upcoming, root)
    hero, credit = HEROES.get(e.get("category"), HEROES[None])
    title = post_title(p, e)
    banner = ""
    if p.get("status") != "published":
        banner = ('<div class="draft-banner" role="note"><b>Draft</b> — not published. Hidden from Google and not linked anywhere. '
                  'Reply "push" to publish it.</div>')
    html = (template.replace("{{DRAFT_BANNER}}", banner).replace("{{HERO}}", hero)
            .replace("{{CREDIT}}", esc(p.get("credit") or credit)).replace("{{KIND}}", KIND_LABEL[p["kind"]])
            .replace("{{POST_TITLE}}", esc(title)).replace("{{POST_DATE}}", pretty_date(p.get("date")))
            .replace("{{MINUTES}}", str(minutes(body, text))).replace("{{POST_BODY}}", body))
    return title, html


def published(posts):
    return [p for p in posts if p.get("status") == "published"]


def manifest_script(posts, events_by_slug, json_dumps):
    m = {}
    for p in published(posts):
        e = events_by_slug.get(p.get("event"))
        if e:
            m.setdefault(e["slug"], []).append({"kind": p["kind"], "title": post_title(p, e), "url": "blog/" + p["slug"]})
    return "<script>window.TRE_EVENT_POSTS=" + json_dumps(m, ensure_ascii=False, separators=(",", ":")) + ";</script>"


def blog_cards(posts, events_by_slug, trim, pretty_date, text):
    cards = []
    for p in sorted(published(posts), key=lambda x: x.get("date") or "", reverse=True):
        e = events_by_slug.get(p.get("event"))
        if not e:
            continue
        img = e.get("image") or "assets/img/og-cover.jpg"
        body = p["body"] or generated_body(p, e, [], "")
        cards.append(
            '<article class="bl-card bl-row">'
            f'<div class="bl-media"><img src="{esc(img)}"{images.srcset_attrs("", img, "poster", "(max-width: 640px) 104px, (max-width: 980px) 40vw, 20vw")} width="1920" height="1080" alt="" loading="lazy" decoding="async"></div>'
            f'<div class="bl-tag"><span class="badge badge-gold">{KIND_LABEL[p["kind"]]}</span></div>'
            f'<div class="bl-body"><h3><a class="bl-t" href="blog/{esc(p["slug"])}">{esc(post_title(p, e))}</a></h3>'
            f'<div class="post-meta"><span>{pretty_date(p.get("date"))}</span><span>·</span><span>{minutes(body, text)} min</span></div>'
            f'<div class="bl-lede"><div><p>{esc(post_description(p, e, trim))}</p><a class="link-arrow" href="blog/{esc(p["slug"])}">Read</a></div></div></div>'
            "</article>")
    if not cards:
        return ""
    return '<div class="bl-events"><h2 class="bl-events-h">Event previews and recaps</h2><div class="bl-grid">' + "".join(cards) + "</div></div>"
