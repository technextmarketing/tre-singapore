"""
Responsive image variants for the TRE™ in Singapore site.

The pages that main.js renders from the data files (event cards and posters, facilitator photos and galleries) used to
download every picture at full size (posters 1920px wide shown at ~400px). This module gives each picture smaller WebP
siblings, <name>-<width>.webp next to the original, and lists them for the pages:

    window.TRE_IMG = {"assets/img/events/x.webp": [1920, 1080, [480, 960]], ...}   (written into every page by build.py)

main.js turns an entry into srcset/sizes; a picture without an entry simply renders as before. A few static pictures
(the home hero still, the header logo) get fixed variants from STATIC.

    python _src/images.py        create any missing variants (needs Pillow: pip install pillow)
build.py calls ensure() on every run: with Pillow installed it creates variants for newly added pictures (the nightly
GitHub job installs it), without Pillow it lists the variants already on disk. Every variant gets a provenance sidecar
(<file>.json) like the originals.
"""
import datetime, hashlib, json, os, struct

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.dirname(HERE)  # site root

# variant widths by role (only widths clearly smaller than the original are made)
ROLES = {
    "poster": [480, 960],          # 16:9 event posters: cards (~380px) and the event hero window (~470px)
    "poster_tall": [540],          # portrait event posters, shown up to 440px wide
    "portrait": [160, 400, 800],   # facilitator photos: 42-64px avatars, ~300px cards, 340px profile window
    "gallery": [400, 800, 1200],   # facilitator galleries: 220-340px strip tiles; the 1200 opens in the lightbox
}
STATIC = {
    "assets/img/hero-poster.jpg": [960, 1600],             # home hero still (the largest contentful paint on the home page)
    "assets/img/logo-tre-singapore.png": [214, 321],       # header logo, shown 107px wide (2x and 3x screens)
    "assets/img/about/isabelle-doing-tre.jpg": [600],  # About page photo (was hot-linked from the old GoDaddy site)
}
QUALITY = 80


def img_size(path):
    """(width, height) of a PNG, JPEG or WebP file without third-party modules (None if unknown)."""
    try:
        with open(path, "rb") as f:
            head = f.read(64)
            if head[:8] == b"\x89PNG\r\n\x1a\n":
                return struct.unpack(">II", head[16:24])
            if head[:4] == b"RIFF" and head[8:12] == b"WEBP":
                kind = head[12:16]
                if kind == b"VP8 ":
                    w, h = struct.unpack("<HH", head[26:30]); return w & 0x3FFF, h & 0x3FFF
                if kind == b"VP8L":
                    b = head[21:25]; return 1 + (((b[1] & 0x3F) << 8) | b[0]), 1 + (((b[3] & 0xF) << 10) | (b[2] << 2) | ((b[1] & 0xC0) >> 6))
                if kind == b"VP8X":
                    return 1 + int.from_bytes(head[24:27], "little"), 1 + int.from_bytes(head[27:30], "little")
            if head[:2] == b"\xff\xd8":
                f.seek(2)
                while True:
                    m = f.read(2)
                    if len(m) < 2 or m[0] != 0xFF:
                        return None
                    if m[1] in (0xD8, 0x01) or 0xD0 <= m[1] <= 0xD7:
                        continue
                    ln = struct.unpack(">H", f.read(2))[0]
                    if m[1] in (0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF):
                        h, w = struct.unpack(">xHH", f.read(5)); return w, h
                    f.seek(ln - 2, 1)
    except OSError:
        pass
    return None


def variant_rel(rel, w):
    return os.path.splitext(rel)[0] + "-%d.webp" % w


def _sha1(path):
    with open(path, "rb") as f:
        return hashlib.sha1(f.read()).hexdigest()


def _fresh(dst, digest):
    """A variant is current when its sidecar names the exact source bytes it was made from (file times are no use:
    a git checkout gives every file a new one)."""
    try:
        with open(dst + ".json", encoding="utf-8") as f:
            return os.path.isfile(dst) and json.load(f).get("sourceSha1") == digest
    except (OSError, ValueError):
        return False


def _make(rel, w, Image, digest):
    src, dst = os.path.join(OUT, rel), os.path.join(OUT, variant_rel(rel, w))
    with Image.open(src) as im:
        im.load()
        keep_alpha = im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info)
        im = im.convert("RGBA" if keep_alpha else "RGB")
        h = round(im.height * w / im.width)
        im.resize((w, h), Image.LANCZOS).save(dst, "WEBP", quality=QUALITY if not keep_alpha else 90, method=6)
    side = {"prompt": "Resized %dpx WebP variant of %s (same picture, made by _src/images.py; see that file's sidecar for "
                      "its source). No other edits." % (w, rel.replace("\\", "/")),
            "createdAt": datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.000Z"),
            "sourceSha1": digest}
    with open(dst + ".json", "w", encoding="utf-8", newline="\n") as f:
        json.dump(side, f, ensure_ascii=False, indent=2); f.write("\n")
    print("image variant", variant_rel(rel, w).replace("\\", "/"))


def ensure(rel, widths):
    """Create the missing (or outdated) variants of one picture when Pillow is available; return
    [width, height, [current variant widths]] or None when the picture is missing. A variant made from an older
    version of the picture is never listed (it would show the old picture)."""
    rel = rel.split("?")[0].split("#")[0]
    src = os.path.join(OUT, rel)
    size = img_size(src) if os.path.isfile(src) else None
    if not size:
        return None
    wanted = [w for w in widths if w <= size[0] - 64]
    try:
        from PIL import Image
    except ImportError:
        Image = None
    digest, have = _sha1(src), []
    for w in wanted:
        dst = os.path.join(OUT, variant_rel(rel, w))
        if not _fresh(dst, digest) and Image is not None:
            _make(rel, w, Image, digest)
        if _fresh(dst, digest):
            have.append(w)
    return [size[0], size[1], have]


def srcset_attrs(root, src, role, sizes):
    """' srcset="…" sizes="…"' for a picture with current variants (the same URLs main.js's pic() writes), else ''.
    Used by the pages the build writes itself (event blog posts and their cards)."""
    path, _, q = (src or "").partition("?")
    entry = ensure(path, ROLES[role]) if path and not path.startswith(("http:", "https:", "//")) else None
    if not entry or not entry[2]:
        return ""
    q = "?" + q if q else ""
    stem = root + os.path.splitext(path)[0]
    cands = [f"{stem}-{w}.webp{q} {w}w" for w in entry[2]] + [f"{root}{src} {entry[0]}w"]
    return f' srcset="{", ".join(cands)}" sizes="{sizes}"'


def manifest(events, facs):
    """window.TRE_IMG for the pictures the data files reference (keys = the path without any ?v= query)."""
    want = []
    for ev in events:
        if ev.get("image"):
            want.append((ev["image"], "poster"))
        pt = (ev.get("details") or {}).get("posterTall") or {}
        if pt.get("src"):
            want.append((pt["src"], "poster_tall"))
    for f in facs:
        if f.get("photo"):
            want.append((f["photo"], "portrait"))
        for g in f.get("gallery") or []:
            if g.get("src"):
                want.append((g["src"], "gallery"))
    out = {}
    for rel, role in want:
        key = rel.split("?")[0]
        if key in out or key.startswith(("http:", "https:", "//")):
            continue
        entry = ensure(key, ROLES[role])
        if entry and entry[2]:
            out[key] = entry
    return out


def ensure_static():
    return {rel: ensure(rel, ws) for rel, ws in STATIC.items()}


if __name__ == "__main__":
    import site_data
    d = site_data.load() or {"events": [], "facilitators": []}
    m = manifest(d["events"], d["facilitators"])
    s = ensure_static()
    print(len(m), "data pictures with variants;", sum(1 for v in s.values() if v and v[2]), "static pictures with variants")
