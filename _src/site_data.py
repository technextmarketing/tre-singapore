"""
Read the site's JavaScript data files (assets/js/events-data.js, facilitators-data.js) exactly as the browser does.

The data files use variables and string joins, so they are evaluated by headless Chrome (--dump-dom) instead of being
parsed by hand. Chrome is looked up in the usual install paths or in the CHROME environment variable. If it is not
available, load() returns None and the build skips the pages generated from data (the rest of the site still builds).
"""
import html, json, os, pathlib, shutil, subprocess, tempfile

HERE = pathlib.Path(__file__).resolve().parent
SITE = HERE.parent
CANDIDATES = [
    os.environ.get("CHROME", ""),
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    os.path.expandvars(r"%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"),
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    shutil.which("google-chrome") or "", shutil.which("chromium") or "", shutil.which("chrome") or "",
]

PAGE = """<!doctype html><meta charset="utf-8">
<script src="{events}"></script>
<script src="{facilitators}"></script>
<pre id="out"></pre>
<script>
document.getElementById('out').textContent = '@@JSON@@' + JSON.stringify({{
  events: window.TRE_EVENTS || [], facilitators: window.TRE_FACILITATORS || [],
  prepGuide: window.TRE_PREP_GUIDE || '', prepPdf: window.TRE_PREP_PDF || ''
}}) + '@@END@@';
</script>
"""


def chrome():
    for c in CANDIDATES:
        if c and os.path.isfile(c):
            return c
    return None


def load():
    exe = chrome()
    if not exe:
        print("site_data: Chrome not found (set CHROME=...); skipping pages generated from events/facilitators data")
        return None
    tmp = pathlib.Path(tempfile.mkdtemp(prefix="tre-data-"))
    try:
        page = tmp / "dump.html"
        page.write_text(PAGE.format(events=(SITE / "assets/js/events-data.js").as_uri(),
                                    facilitators=(SITE / "assets/js/facilitators-data.js").as_uri()), encoding="utf-8")
        out = subprocess.run([exe, "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
                              "--allow-file-access-from-files", f"--user-data-dir={tmp / 'profile'}"] + (["--no-sandbox"] if os.environ.get("CI") else []) + ["--dump-dom", page.as_uri()],
                             capture_output=True, text=True, encoding="utf-8", timeout=90).stdout
        a, b = out.find("@@JSON@@"), out.find("@@END@@")
        if a < 0 or b < 0:
            print("site_data: Chrome ran but returned no data; skipping data pages")
            return None
        return json.loads(html.unescape(out[a + 8:b]))
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


if __name__ == "__main__":
    d = load()
    if d:
        print(len(d["events"]), "events,", len(d["facilitators"]), "facilitators")
