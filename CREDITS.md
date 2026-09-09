# Image credits and licensing

## Client-supplied assets

| File | Source |
|---|---|
| `assets/img/logo-full.jpg` | Client logo, supplied |
| `assets/img/terrence-slaughter.jpg` | Client headshot, supplied |
| `assets/img/favicon.svg` | Drawn for this build from the logo's bar-and-arrow mark |

The favicon, the inline SVG mark in the header and footer, and the oversized mark behind the homepage hero
are redrawn vector versions of the supplied logo. The hero mark's paths were measured off the source JPEG
by classifying pixels into navy / forest / gold and reading the shape boundaries row by row, so the tower
proportions and the arrow match the original rather than approximating it. They use the sampled brand
colours (`#011B34`, `#024234`, `#C69143`) so they stay crisp at every size and adapt to light and dark
backgrounds.

**If a vector original of the logo exists (AI, EPS, or SVG), send it over and it should replace these.**
The traced version is faithful but it is a trace of a 435×257 JPEG, not the source artwork.

The site is set in **Spectral** (headings) and **Inter** (body, UI, labels), both open source under the
SIL Open Font License and served from Google Fonts. An earlier round matched the logo's own faces more
literally — Bodoni Moda for the Didone wordmark, Jost for the geometric tagline — but the Didone's
hairlines were too fragile at heading sizes and the geometric sans read poorly in long copy. Spectral keeps
the classical character with stroke weight that survives, and Inter is the most legible screen sans
available.

| File | Source |
|---|---|
| `assets/video/pref-hero.mp4` / `.webm` | Client-supplied aerial footage (`Pref Hero.mp4`), transcoded for web |
| `assets/img/hero-poster.jpg` | First frame of the same footage |

The master file is kept in `_source/` and should not be deployed.

## Stock photography — placeholders, replace before launch

Every photograph below is from [Unsplash](https://unsplash.com) under the
[Unsplash License](https://unsplash.com/license), which permits commercial use without attribution.
Attribution is recorded here for traceability, not obligation.

| File | Unsplash photo ID |
|---|---|
| `hero-market.jpg` | `photo-1470723710355-95304d8aece4` |
| `asset-oakbend.jpg` | `photo-1515263487990-61b07816b324` |
| `asset-summit.jpg` | `photo-1580216643062-cf460548a66a` |
| `asset-legacy.jpg` | `photo-1545324418-cc1a3fa10c00` |
| `interior-modern.jpg` | `photo-1600607687939-ce8a6c25118c` |
| `amenity-pool.jpg` | `photo-1600596542815-ffad4c1539a9` |
| `market-aerial.jpg` | `photo-1512699355324-f07e3106dae5` |
| `capital-towers.jpg` | `photo-1449157291145-7efd050a4d0e` |

> These are now used only as page-header and section atmosphere. The portfolio page that paired them with
> named properties, unit counts and occupancy figures has been deleted, which removes the misleading
> juxtaposition. They should still be replaced with the firm's own photography when it exists, but no
> image now sits beside a specific property claim.
