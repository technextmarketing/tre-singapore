"""
Page assembler for the TRE™ in Singapore site.

Each page = parts/head.html + parts/<page>.body.html + parts/footer.html, with these placeholders filled in:
  {{TITLE}} {{DESC}} {{ROOT}} and {{A_<nav id>}} (set to "active" for the current page).

Edit the header/nav/footer once in parts/head.html or parts/footer.html, then run:
    python _src/build.py
from the site root (or from anywhere — paths are resolved relative to this file).
The finished pages are written to the site root and blog/ folder. No dependencies beyond Python 3.
"""
import os, re

HERE = os.path.dirname(os.path.abspath(__file__))
PARTS = os.path.join(HERE, "parts")
OUT = os.path.dirname(HERE)  # site root

NAV_IDS = ["home", "about", "education", "facilitators", "events", "blog", "contact"]

def read(p):
    with open(p, encoding="utf-8") as f:
        return f.read()

def build(body_file, out_rel, title, desc, active, root=""):
    html = read(os.path.join(PARTS, "head.html")) + read(os.path.join(PARTS, body_file)) + read(os.path.join(PARTS, "footer.html"))
    html = html.replace("{{TITLE}}", title).replace("{{DESC}}", desc).replace("{{ROOT}}", root)
    for nid in NAV_IDS:
        html = html.replace("{{A_%s}}" % nid, "active" if nid == active else "")
    html = re.sub(r' class=""', "", html)
    out = os.path.join(OUT, out_rel)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, "w", encoding="utf-8", newline="\n") as f:
        f.write(html)
    print("built", out_rel)

# (body partial, output file, <title>, meta description, active nav id)
PAGES = [
    ("index.body.html", "index.html", "TRE™ in Singapore — Release Stress, Strengthen Resilience, Improve Wellbeing",
     "The home of TRE™ (Tension and Trauma Releasing Exercises) in Singapore: certified providers, Global TRE™ Provider Certification, workshops, practice circles and resources.", "home"),
    ("about.body.html", "about.html", "About TRE™ in Singapore — Who We Are",
     "TRE™ in Singapore is a community hub for TRE practitioners, founded by Global TRE™ Certifying Trainer Isabelle Claus Teixeira.", "about"),
    ("education.body.html", "education.html", "Education and TRE™ Provider Certification in Singapore",
     "Learn what TRE™ is, how neurogenic tremors work, and how to become a Global TRE™ Certified Provider in Singapore. Modules, fees, dates and FAQ.", "education"),
    ("facilitators.body.html", "facilitators.html", "Certified TRE™ Facilitators and Providers in Singapore",
     "Find a certified TRE™ provider in Singapore for individual or group sessions. Meet our Certifying Trainer and join the practitioner directory.", "facilitators"),
    ("events.body.html", "events.html", "TRE™ Events, Workshops and Certification Dates — Singapore",
     "Upcoming TRE™ events in Singapore and online: provider certification modules, workshops for coaches, community practice circles and introductory sessions.", "events"),
    ("event.body.html", "event.html", "Event details — TRE™ in Singapore",
     "Details, programme, pricing and registration for TRE™ events in Singapore, Bucharest and online.", "events"),
    ("blog.body.html", "blog.html", "Blog — TRE™ in Singapore",
     "Articles on TRE™, neurogenic tremors, nervous system regulation, self-care for practitioners and life as a TRE™ provider in Singapore.", "blog"),
    ("contact.body.html", "contact.html", "Contact TRE™ in Singapore",
     "Get in touch with TRE™ in Singapore: email, WhatsApp, office address at Raffles Place, booking links and a contact form.", "contact"),
]

# Blog posts live in blog/ so their asset root is "../"
POSTS = [
    ("post-what-is-tre.body.html", "blog/what-is-tre.html", "What is TRE™? A plain-language guide — TRE™ in Singapore",
     "TRE™ (Tension and Trauma Releasing Exercises) explained: the seven exercises, the neurogenic tremor and what a session feels like."),
    ("post-science.body.html", "blog/science-of-neurogenic-tremors.html", "Why the body shakes: the science behind neurogenic tremors — TRE™ in Singapore",
     "How self-induced neurogenic tremoring relates to the stress response, the psoas, and polyvagal theory."),
    ("post-first-session.body.html", "blog/your-first-tre-session.html", "Preparing for your first TRE™ session in Singapore — TRE™ in Singapore",
     "What to wear, what to expect and how to look after yourself before and after a first TRE™ session with a certified provider."),
    ("post-coaches.body.html", "blog/tre-for-coaches.html", "From Shaking to Shaping: why coaches are adding TRE™ to their practice — TRE™ in Singapore",
     "How ICF coaches and HR professionals use TRE™ for self-care and with clients, and what certification involves."),
    ("post-workday.body.html", "blog/nervous-system-habits-for-the-workday.html", "Five nervous-system habits for Singapore's fast-paced workday — TRE™ in Singapore",
     "Practical regulation habits for busy professionals in Singapore, informed by TRE™ and somatic practice."),
    ("post-isabelle.body.html", "blog/from-provider-to-certifying-trainer.html", "From Provider to Certifying Trainer: Isabelle's TRE™ journey — TRE™ in Singapore",
     "The path from a first TRE™ session in 2017 to Global TRE™ Certifying Trainer in 2025, and what it means for Singapore."),
]

if __name__ == "__main__":
    for body, out, title, desc, active in PAGES:
        build(body, out, title, desc, active, root="")
    for body, out, title, desc in POSTS:
        build(body, out, title, desc, "blog", root="../")
    print("done")
