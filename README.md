# Preferred Capital Partners — website

A hand-built static site. No framework, no build step, no dependencies. Every page is a plain HTML file
that can be opened, edited, and deployed as-is.

- **Strategy, positioning, and the reasoning behind every section:** [`STRATEGY.md`](STRATEGY.md)
- **Everything that must be replaced before launch:** [`PLACEHOLDERS.md`](PLACEHOLDERS.md)
- **Image licensing:** [`CREDITS.md`](CREDITS.md)

---

## Run it locally

```bash
python -m http.server 4387
```

Then open <http://localhost:4387>. Any static server works; the site has no server-side requirements.

---

## Structure

```
index.html              Homepage — the full conversion narrative
strategy.html           Investment strategy
portfolio.html          Holdings, realized exits, case study
about.html              Firm and principal
invest.html             Primary conversion page (call + packet + eligibility)
faq.html                21 questions in 5 groups
contact.html            Contact
portal.html             Investor portal entry point
disclosures.html        Securities disclosures
privacy.html            Privacy policy
terms.html              Terms of use
404.html                Not-found recovery page
insights/
  index.html            Education hub
  multifamily-inflation-hedge.html
  real-estate-depreciation-explained.html
  questions-to-ask-a-sponsor.html
assets/
  css/site.css          The entire design system, in 24 commented sections
  js/site.js            ~170 lines: nav, drawer, reveals, accordion, forms
  img/                  Photography, logo, headshot, favicon
robots.txt
sitemap.xml
```

Each page's HTML carries comment blocks above every section explaining what that section is for and how it
affects conversion. Read those before restructuring anything.

---

## Editing

### The design system
Everything visual is controlled by CSS custom properties at the top of `assets/css/site.css` — colours,
type scale, spacing, motion curves and durations. Change a token there and the whole site follows. Avoid
hard-coding hex values or pixel sizes in the pages.

**Typefaces** are **Spectral** (`--display`) and **Inter** (`--sans` and `--label`), both from Google
Fonts. Spectral is a screen-first transitional serif: it keeps the refinement of the logo's wordmark but
has real stroke weight, so headings stay legible where a Didone's hairlines break up. Inter carries body
copy, UI and every tracked-caps label — spec tables, stat labels, metadata. `--label` exists as a separate
token so the label role can be given its own face later without touching body copy.

**Cache busting.** Stylesheet and script links carry a `?v=` query (`site.css?v=14`). Bump that number
across all sixteen pages whenever you change the CSS or JS, or visitors will keep the old file.

### The hero
The background is the client's aerial footage, transcoded for web delivery:

| File | Size | Notes |
|---|---|---|
| `assets/video/pref-hero.webm` | 1.5 MB | VP9, listed first so supporting browsers take the smaller file |
| `assets/video/pref-hero.mp4` | 1.8 MB | H.264 with `+faststart`, universal fallback |
| `assets/img/hero-poster.jpg` | 166 KB | First frame; shows instantly and stands in under reduced motion |
| `_source/Pref Hero.mp4` | 16 MB | The master. **Exclude this folder from deployment.** |

Both are 1280×720 and silent — a background loop does not need 1080p or an audio track, and dropping both
took the payload from 16 MB to under 2 MB. Re-encode from the master with:

```bash
ffmpeg -i "_source/Pref Hero.mp4" -an -vf scale=1280:-2 -c:v libx264 -crf 30 -preset slow -movflags +faststart assets/video/pref-hero.mp4
```

The footage is bright daylight, so it is graded down in CSS (`saturate(.62) contrast(1.06) brightness(.72)`)
and sits under a three-layer scrim that keeps the headline legible. The brand mark is still there behind
it as an oversized watermark at 34% — set `--mark-o: 0` on `.hero__mark` to drop it.

### Motion
One entrance system, applied by `assets/js/site.js` rather than in the markup, so the HTML stays free of
presentation hooks:

| Motion | Applied to | Class |
|---|---|---|
| Heading resolves upward from behind a mask | every `main section h2` | `.rv-head` |
| Media wipes open from one edge | `.media-frame`, `.om__media`, `.insight-card__media`, `.principal__media` | `.rv-media` |
| Gold hairline draws left to right | `.pillar` top rules, `.card` on hover, `.acc` on hover/open, `.profile` rows | — |
| Numbered rule extends across the sequence | `.steps` | — |
| Page header opens like the hero | `.pagehead` | `.is-ready` |
| Slow sheen crosses the button | `.btn` on hover | — |

Everything is scoped behind a `.js` class set inline in `<head>`, so the page renders fully visible if the
script never runs, and every rule has a `prefers-reduced-motion` counterpart that removes movement while
keeping the content.

The migration map on the homepage is interactive: the six market points and the six chips beneath the map
are two views of one selection, wired for hover, keyboard focus and tap. Geometry is real (us-atlas
TopoJSON, Albers-projected); the generator is not shipped, so edit the inline SVG in `index.html` directly.

### Header and footer
This is a static site, so the header, drawer, and footer markup is duplicated in every page. If you change
one, change all sixteen. The blocks to keep in sync are:

- `<div class="topbar">` … announcement bar
- `<header class="nav">` … through the end of `<div class="drawer">`
- `<footer class="footer">` … including the disclosure paragraph

The pages inside `insights/` use `../` prefixes on asset and link paths; the root pages do not.

### Placeholder styling
Unverified values render with a dotted gold underline. Once `PLACEHOLDERS.md` is cleared, delete this rule
from `assets/css/site.css` to remove the styling everywhere:

```css
.ph { border-bottom: 1px dotted rgba(198,145,67,.75); cursor: help; }
```

---

## Wiring the forms

There are five forms: intro call and packet (`invest.html`), contact (`contact.html`), newsletter
(`insights/index.html`). All carry `data-validate`, which enables inline validation, error placement below
the field, focus management on the first invalid field, and a success state.

**While no `action` is set,** the script prevents submission and shows the inline confirmation panel — so
the site demos correctly without a backend.

**To connect a real endpoint**, add `action` and `method` to the form tag:

```html
<form class="form" data-validate novalidate action="https://your-endpoint" method="post">
```

The script then validates and lets the browser submit normally. Common options:

| Approach | Notes |
|---|---|
| Netlify Forms | Add `netlify` and `name="intro-call"` to the form tag. Zero backend. |
| HubSpot / Salesforce / Follow Up Boss | Post directly to the form endpoint, or swap in the embed. |
| Calendly / SavvyCal | For the intro call, either post to your CRM and redirect to the scheduler, or replace the form with the inline embed. |
| Formspree / Basin | Simple email delivery with spam filtering. |

Field names are already CRM-friendly: `first_name`, `last_name`, `email`, `phone`, `accredited`, `amount`,
`notes`, `consent`.

The `accredited` field matters — it is the qualification signal that makes the first call useful. Map it to
a CRM property and route on it.

---

## Replacing the imagery

All photography in `assets/img/` is licensed stock standing in for the real thing. Replace it with
photography of properties the firm actually owns before launch — showing buildings you do not own on a
site that markets a securities offering is a real problem, not a cosmetic one.

Keep the same filenames and the site picks them up with no code changes:

| File | Used for | Shoot |
|---|---|---|
| `hero-market.jpg` | Homepage hero | Wide dusk skyline of your anchor market (2200px+) |
| `asset-*.jpg` | Property cards | One exterior per owned community, 4:3 |
| `interior-*.jpg` | Renovated units | Post-renovation living room and kitchen |
| `amenity-*.jpg` | CTA bands | Pool, clubhouse, leasing office |
| `market-aerial.jpg` | Thesis section | Aerial of a market or community |
| `underwriting.jpg` | Approach section | Desk, plans, or the investment committee at work |
| `terrence-slaughter.jpg` | Principal sections | **Replace first.** A professional headshot at 800×1000 or larger; the current file is low resolution and will look soft on retina displays |

Then compress to WebP or AVIF. The current JPEGs total roughly 3.4MB; this is the single biggest available
performance win.

---

## Before launch

Full checklist at the end of [`STRATEGY.md`](STRATEGY.md). The four that block everything else:

1. Clear all 150 items in `PLACEHOLDERS.md`.
2. Securities counsel reviews the disclosures, every performance figure, and the testimonials.
3. Replace the stock photography.
4. Wire the forms and add analytics.

The live domain is `prefcapitalpartners.com`; it appears in canonical tags, Open Graph tags,
`sitemap.xml`, `robots.txt`, the `CNAME` file and the assistant knowledge base. Change it in all of
those together if it ever moves.

---

## Deploying

Drag the folder onto Netlify, Vercel, or Cloudflare Pages — no build command, publish directory is the
repository root. On Apache or nginx, serve the folder and point the 404 handler at `/404.html`.

---

## Accessibility and browser support

Built to WCAG 2.1 AA: 4.5:1 minimum text contrast throughout (the gold accent has a darkened variant,
`--gold-ink`, specifically for light backgrounds), visible focus rings, a skip link, semantic landmarks,
keyboard-operable nav drawer and accordion with focus management, and full `prefers-reduced-motion` support.

Works in all current browsers. Without JavaScript the site renders complete and readable — the reveal
animations are scoped behind a `.js` class set inline in `<head>`, and FAQ answers are present in the
markup rather than injected.
