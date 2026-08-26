# Preferred Capital Partners — Website Strategy

Positioning, conversion architecture, SEO, and design direction for the site in this repository.
Everything below is the reasoning that produced the build; the pages are the implementation.

---

## 1. The ideal customer

### Primary: the capital-rich, time-poor accredited professional

| | |
|---|---|
| **Who** | 38–58. Household income $350K–$900K. Investable assets $500K–$4M outside retirement accounts. |
| **Occupations** | Physicians, dentists, and specialists; senior engineers and tech ICs with vested equity; attorneys and partners; business owners with $2M–$20M revenue; corporate executives. |
| **Location** | Nationwide, concentrated in high-tax metros (NY, CA, IL, NJ, MA) plus the Southeast itself. |
| **Financial state** | Maxed 401(k), backdoor Roth done, brokerage account growing, effective tax rate 32–45%. Has "won the earning game" and lost the tax and diversification game. |
| **Investing experience** | Sophisticated in public markets, novice in private ones. Has read about syndications, follows one or two podcasts, may have looked at a deal and not pulled the trigger. |
| **Decision style** | Researches privately for 3–12 months. Reads everything before speaking to anyone. Talks to a spouse and a CPA before wiring. Rarely invests on the first offering they see. |

**Why this person and not a broader audience.** A public-facing site for a Reg D 506(c) offering has to
disqualify aggressively. Non-accredited traffic cannot legally convert, and a wide funnel dilutes every
metric. The site says "accredited investors only" in the hero eyebrow, the announcement bar, and the nav
CTA path deliberately — a smaller, better-qualified funnel converts several times harder.

### Secondary: the exiting operator

Sold a business, sold a rental portfolio, or received an inheritance or settlement in the last 18 months.
Has a defined, dated sum of money and an urgent need to place it. Highest-intent traffic on the site, and
the shortest sales cycle. Served by the announcement bar (a live close date), the terms block in the hero,
and the offering snapshot on `invest.html`.

### Tertiary: the tired direct landlord

Owns 2–20 units directly. Understands the asset class intimately, is exhausted by operating it, and is
looking for the same exposure without the operations. Converts fastest of all three because no education
is needed — only trust. Served by the comparison table ("Buying a rental yourself" column) and the
"what we won't do" section.

### Who the site deliberately does not serve

Non-accredited investors, anyone needing liquidity inside five years, and yield-chasers comparing this to
a savings rate. Each is turned away explicitly in copy — on the FAQ, in the comparison note, and in the
liquidity risk line. Turning them away in writing is itself a trust signal to the people who stay.

---

## 2. Their biggest pain points

Ranked by how much emotional weight each one carries in the buying decision.

1. **"Everything I own moves together."** Salary, bonus, company equity, brokerage account, and home
   value are all levered to the same economic cycle. There is no ballast. Felt most acutely after a
   drawdown.
2. **"The tax bill scales faster than the income."** W-2 and practice income is the most heavily taxed
   money in the country. Every raise increases the sense of running to stand still, and index funds
   offer nothing to offset it.
3. **"I don't have the time to do real estate properly."** They know direct ownership works. They also
   know it means underwriting, financing, contractors, and 11pm maintenance calls — a second job taken
   on to escape the first.
4. **"I can't tell the good sponsors from the bad ones."** After the 2021–2023 vintage of failed bridge-debt
   deals, this audience has heard the horror stories. They have no framework for diligence and are afraid
   of looking naive.
5. **"My money is compounding on paper, not producing anything."** A brokerage balance is a number.
   Quarterly income from a real building is an experience of wealth. This is emotional, not rational,
   and it is a strong motivator.
6. **"I'm falling behind people who look like me."** Peers own real assets, talk about depreciation and
   K-1s, and appear to be operating in a system this person hasn't been let into.

**How the site uses them.** Section 2 of the homepage (`#problem`) names pains 1–3 in the visitor's own
language before offering anything. Pain 4 is the entire reason the "what we won't do" and underwriting
sections exist. Pain 5 is answered by the four-returns section. Pain 6 is why the tone is peer-to-peer
rather than educational-condescending.

---

## 3. Buying triggers

The events that move someone from passive interest to action. Each one has a corresponding entry point.

| Trigger | What they do | Where the site catches them |
|---|---|---|
| A large liquidity event (business sale, RSU vest, inheritance, settlement) | Search for where to put a defined sum | `invest.html`, offering snapshot, announcement bar |
| A brutal tax bill in March or April | Search "how do investors reduce taxes on income" | `insights/real-estate-depreciation-explained.html` |
| A market drawdown | Search for uncorrelated or "real" assets | `insights/multifamily-inflation-hedge.html`, comparison table |
| A peer mentions their syndication | Search the sponsor's name, then the category | `about.html`, `portfolio.html`, FAQ |
| Selling a rental property or firing a tenant | Search for passive alternatives | Comparison table, "tired landlord" column |
| A CPA suggests real estate for depreciation | Arrive already half-sold, needing a vehicle | `strategy.html`, `invest.html` |
| A deadline: an offering closing | Act now rather than later | Announcement bar with a dated close |

The first three are the highest-volume triggers and are the reason the Insights section exists at all —
they occur *before* the person knows any sponsor's name.

---

## 4. Objections, and where each one is answered

Every objection is answered somewhere specific. Unanswered objections do not become questions; they
become silent exits.

| # | Objection (as they think it) | Answered by |
|---|---|---|
| 1 | "I've never heard of you." | Named principal with a photograph, case study with real numbers, third-party administration and audit named, affiliations strip |
| 2 | "How do I know you're not the next failed sponsor?" | `#discipline` — four specific things we won't do; `#approach` — underwrite-to-be-wrong; stated screening rejection rate |
| 3 | "$50,000 is a lot for a first check." | Two-tier CTA (packet requires nothing), "most investors watch one offering go by" in the process copy, explicit no-obligation framing |
| 4 | "I can't get my money out." | Stated plainly three times — hero terms, comparison table (as a column where we lose), FAQ, and the risk section. Owning the weakness converts better than hiding it |
| 5 | "The returns are just projections." | Underwritten-vs-actual case study including the line that missed; explicit "targets are not guarantees" language |
| 6 | "What are the hidden fees?" | Waterfall section on `strategy.html` with the order of payment; "if a fee is not in the documents, it does not exist" |
| 7 | "Am I even allowed to do this?" | Accreditation self-check on `invest.html` with the three tests, plus the FAQ |
| 8 | "What if something goes wrong?" | FAQ "what happens if a property underperforms", the bad-news-travels-first commitment, and the full risk section |
| 9 | "My CPA will have questions." | Tax article, tax FAQ group, and the packet's tax primer written explicitly to be handed to a CPA |
| 10 | "Is this just an ad?" | Full disclosure block on every page, honest comparison table, and a stated recommendation to choose a REIT or index fund instead where appropriate |

**Objection 4 and the comparison table are the strategic core of this site.** Volunteering the columns
where you lose is the highest-leverage credibility move available to a private sponsor, because every
competitor is doing the opposite.

---

## 5. Desired outcomes

What the investor is actually buying, ordered by how they experience it.

- **Stated outcome:** diversification, income, and tax efficiency.
- **Functional outcome:** quarterly cash they didn't work for; a K-1 that reduces the taxable portion of it;
  a hard asset appreciating outside the stock market.
- **Emotional outcome:** the feeling of being an owner rather than a saver. Relief from being fully exposed
  to one cycle. Being inside the system peers appear to be in.
- **Identity outcome:** *"I'm an investor with a real portfolio,"* not *"I'm a high earner with a big 401(k)."*
  This is the outcome that actually moves the money, and it is why the copy says "you own a share of the
  real asset" rather than "you earn passive income."
- **Social outcome:** something substantive to say when a peer brings up their own deals.

The homepage's `#outcomes` section is written to deliver the functional layer with a mechanism attached to
each claim, while the hero and problem sections carry the emotional and identity layers.

---

## 6. Positioning and message hierarchy

**Positioning statement.** For accredited professionals who have out-earned their investment options,
Preferred Capital Partners is the private multifamily sponsor that runs an institutional process at a
scale individuals can access — because the discipline, not the deal, is what protects capital.

**Message hierarchy** (the order a visitor must accept things, and therefore the order of the page):

1. This is real estate ownership, not a fund product. *(hero)*
2. You have a real gap in your portfolio. *(problem)*
3. This specific asset class fills it, for structural reasons. *(thesis)*
4. This specific firm can be trusted to execute it. *(approach, discipline, principal)*
5. Here is what you'd actually receive. *(outcomes)*
6. Here is what it costs you — including illiquidity. *(comparison)*
7. Here is exactly what happens next. *(how it works)*
8. Here is how to start with no commitment. *(CTA)*

**Voice.** Peer to peer. Specific over superlative. Never uses "unlock," "passive income streams,"
"generational wealth," or "let your money work for you" — the vocabulary of the mass-market syndication
world this client needs to be distinguished from. Where a claim can't be evidenced, it is not made.

---

## 7. Sitemap

```
/                              Homepage — full conversion narrative
├── /strategy.html             Investment strategy (depth / diligence)
├── /portfolio.html            Holdings, realized exits, case study
├── /about.html                Firm, principal, commitments, partners
├── /invest.html               PRIMARY CONVERSION — call + packet + eligibility
├── /faq.html                  21 questions in 5 groups (objection library)
├── /insights/                 Education hub (top-of-funnel SEO)
│   ├── multifamily-inflation-hedge.html
│   ├── real-estate-depreciation-explained.html
│   └── questions-to-ask-a-sponsor.html
├── /contact.html              Investors, brokers, media
├── /portal.html               Investor portal entry (third-party)
├── /disclosures.html          Securities disclosures
├── /privacy.html              Privacy policy
├── /terms.html                Terms of use
└── /404.html                  Recovery page routing to the four main paths
```

**Why this shape.** Eleven content pages is the right size for a single-principal fund: enough surface to
answer diligence questions and rank for the category, small enough that every page can be kept current by
one person. Adding a page per property, a team page with one person on it, or a blog with no publishing
cadence would all reduce credibility rather than add to it.

**Deliberate omissions.** No "Services" page (this is not a service). No "Testimonials" page (proof belongs
next to claims, not quarantined). No gated deal room in the public site (offering documents belong behind
verified accreditation, in the portal).

---

## 8. Navigation

**Primary nav:** Strategy · Portfolio · About · Insights · FAQ, plus a persistent gold **Book an intro call**
button.

Five items, ordered by the sequence of questions a prospect actually asks: *What do you do → What do you
own → Who are you → Are you credible → What's still unclear.* The CTA is visually separated as the only
gold element in the bar, so the conversion action is never more than one glance away on any page.

- **Transparent over the hero, solid on scroll.** The nav starts transparent so the hero image runs
  full-bleed, then gains a blurred paper background past 80px. This is a state indication, not decoration.
- **Mobile:** a full-screen drawer with large serif links and both CTAs pinned to the bottom, where the
  thumb is. Focus is trapped on open, Escape closes, focus returns to the toggle.
- **`Invest` is not in the nav list.** It is the button. Putting it in both places dilutes it.
- **Footer** carries the full sitemap in three columns for the researcher who scrolls to the bottom
  looking for legal and contact detail — plus the disclosure block, which must appear site-wide.

---

## 9. Homepage: every section and why it exists

The homepage is a complete argument in thirteen movements. Each section's HTML carries a comment block
explaining its job; this is the summary.

| # | Section | Job | How it lifts conversion |
|---|---|---|---|
| 0 | **Announcement bar** | Live offering status + dated close | Adds urgency to an evergreen page and pre-qualifies (accredited only) in one line |
| 1 | **Hero** | What / who for / is it me / what next, in four seconds | Terms exposed above the fold (minimum, preferred return, hold, distributions) because this audience's first question is always "minimum?". Disqualifying language raises lead quality |
| 1b | **Credibility rail** | Four scannable numbers | Satisfies the skim-reader who will never read a paragraph, and anchors the firm as operating rather than raising |
| 2 | **The problem** | Agitation before solution | Naming the visitor's frustration more precisely than they could earns the right to keep talking. This is where a cold visitor decides to keep scrolling |
| 3 | **The thesis** | Reframe from "a deal" to "a strategy" | Investors write larger checks into a thesis they can repeat to a spouse or CPA. Three evidence-backed pillars, not adjectives |
| 4 | **The approach** | Make "institutional" falsifiable | A stated screening rejection rate is the most persuasive number a sponsor can publish — it proves discipline costs them something |
| 5 | **How it works** | Remove process anxiety | First-time private investors stall because they don't know what happens after "yes." Four steps with time expectations turn "complicated" into "about three weeks" |
| 6 | **Portfolio** | Make the abstraction physical | Cards styled as offering-memorandum pages: market, units, vintage, occupancy. Concrete, checkable specifics separate a real sponsor from a marketing site |
| 7 | **Comparison** | Do the comparison they're already making | Highest-converting section on the page. Including the columns where we lose (liquidity, minimum) buys credibility no superlative can |
| 8 | **Four returns** | Translate mechanism into what they receive | Most investors count only cash flow. Naming four currencies raises perceived value without raising a single projected number |
| 9 | **The principal** | Answer "who is holding my money" | People invest in people at first check. The co-investment line is the single strongest trust element on the page |
| 10 | **Social proof** | Peer validation | For this audience the persuasive testimonial is about communication and reporting, never returns. The placeholders are written to model exactly that |
| 11 | **What we won't do** | Risk reversal by negation | Stating four things you refuse to do converts skepticism faster than any promise, and pre-empts the objections that would otherwise surface on the call |
| 12 | **FAQ** | Residual objections, in place | Answers the last six questions where the visitor is, rather than requiring a call. Also the page's strongest structured-data asset |
| 13 | **Final CTA** | One action, restated | Paired with the low-commitment alternative, because ~9 in 10 qualified visitors are not ready to book. That pairing is the difference between a 1% and a 6% page |

**Sequencing logic.** Attention → agitation → thesis → mechanism → process → evidence → honest trade-off →
outcomes → authority → social proof → risk reversal → residual objections → action. Trust-building sections
are deliberately placed *before* the sections that ask for anything.

---

## 10. User journeys

**A. The researcher (≈70% of qualified traffic).** Organic article → Insights hub → Strategy → About →
FAQ → packet form → 2–8 weeks of email → intro call → invest.
*Designed for:* every page ends with a next step, the packet requires no accreditation, and the FAQ is
deep enough to satisfy a full diligence pass without a call.

**B. The referral (highest conversion rate).** Peer mentions the firm → searches the name → homepage →
About (checks the person) → Portfolio (checks the record) → books a call.
*Designed for:* the principal is named and photographed on the homepage and About page, and the case study
is one click from the homepage portfolio strip.

**C. The event-driven buyer (highest urgency).** Liquidity event → searches the category → lands on
homepage or Invest → scans hero terms → scans offering snapshot → books immediately.
*Designed for:* terms above the fold, offering snapshot beside the form on `invest.html`, dated close in
the announcement bar, and a form that asks for accreditation status up front so the first call is useful.

**D. The skeptic.** Arrives anywhere → jumps straight to fees, risk, and track record.
*Designed for:* the waterfall section, the "what can go wrong" block, and the case study line that shows
what missed. This visitor is looking for evasion; giving them nothing to find converts them.

---

## 11. CTA architecture

**Two offers, one action each.**

- **Primary — "Book an intro call."** Gold, high-contrast, the only gold element in the nav. Appears 6+
  times on the homepage.
- **Secondary — "Get the investor packet."** Outline. For the 90% not ready to speak to anyone. Requires
  name and email only, and explicitly promises no call as a result.

**Placement on the homepage:** hero, after How-it-works, after Discipline, and in the final band — one at
each point where a visitor has just been given a reason to act. Never two competing primaries in the same
viewport.

**Rules applied throughout:**

- Consistent labels. The button that says "Book an intro call" leads to a page headed "Begin with a
  conversation" and a button that says "Request the call." An action keeps its name through the flow.
- Every CTA states the cost of acting: *thirty minutes, no pitch deck, no obligation.*
- No "Learn more" anywhere. Every link says what happens.
- The form asks for accreditation status before money, so the first conversation is already qualified.
- Micro-copy under every submit answers "what happens now" — the last unspoken anxiety before a click.

---

## 12. Trust elements inventory

Deployed in rough order of persuasive weight for this audience:

1. **Sponsor co-investment**, stated three times in different words.
2. **A named, photographed, accountable principal** — with "every intro call is with Terrence."
3. **Underwritten-versus-actual case study**, including the line that missed plan.
4. **A published screening rejection rate** (340 screened → 3 closed).
5. **The honest comparison table**, including where the firm is the worse choice.
6. **"Four things we won't do"** — constraints that cost real deals.
7. **Third-party infrastructure named** — administrator, auditor, counsel, property management.
8. **Bad-news-first reporting commitment.**
9. **Full risk disclosure on the strategy page**, not only in the footer.
10. **Site-wide disclosure block** and dedicated disclosures page.
11. **Offering-memorandum visual language** — mono labels, hairline rules, spec tables.
12. **Investor testimonials** (currently placeholders — see PLACEHOLDERS.md).
13. **Affiliations strip** (placeholders).

---

## 13. SEO

### Technical
- Static HTML, no framework, no hydration — fast by construction.
- Unique title (36–89 chars) and meta description (129–207 chars) on every page.
- One `<h1>` per page, ordered heading hierarchy, descriptive `alt` on every image.
- Canonical URLs, Open Graph and Twitter card metadata sitewide.
- `sitemap.xml` with priorities, `robots.txt` disallowing only `/portal.html`.
- Structured data: `FinancialService` (home), `FAQPage` (home + FAQ), `Article` (each insight).
- Lazy-loading below the fold, `fetchpriority="high"` on the hero image, explicit `width`/`height` on
  every image to hold layout (CLS).
- Semantic landmarks, skip link, visible focus states — accessibility and SEO reinforce each other here.

### Keyword map

| Page | Primary intent | Supporting terms |
|---|---|---|
| `/` | multifamily investment fund; apartment investing for accredited investors | private real estate fund, passive apartment investing |
| `/strategy.html` | value-add multifamily strategy | apartment underwriting criteria, preferred return waterfall, Southeast multifamily markets |
| `/portfolio.html` | multifamily track record | apartment syndication case study, realized returns |
| `/about.html` | brand + principal name | Terrence Slaughter, Preferred Capital Partners |
| `/invest.html` | accredited investor apartment fund; minimum investment | 506(c) offering, how to invest in apartment syndication |
| `/faq.html` | long-tail question queries | K-1, accreditation, illiquidity, UBTI, cost segregation |
| `insights/multifamily-inflation-hedge` | is real estate an inflation hedge | lease duration, rent repricing, fixed-rate debt |
| `insights/real-estate-depreciation-explained` | real estate depreciation tax benefits | cost segregation, passive losses, depreciation recapture |
| `insights/questions-to-ask-a-sponsor` | how to vet a syndication sponsor | syndication due diligence checklist |

**Strategy note.** The category head terms are dominated by national platforms and are not worth
contesting. The winnable, higher-intent surface is (a) long-tail question queries — which the FAQ and
Insights own — and (b) branded search, which is what referral traffic actually types. The Insights
articles exist to catch triggers 1–3 in section 3, *before* the visitor knows any sponsor's name.

### Content plan (next 90 days)
One article per month, each targeting a real query and each ending in the packet CTA:
1. "What a $100,000 apartment investment actually produces, year by year"
2. "Why your CPA needs the K-1, and what to ask them about it"
3. "How to read a private placement memorandum in 40 minutes"
4. Quarterly Southeast submarket note (also the best re-engagement email of the year)

### Local
Google Business Profile for the Atlanta office, consistent NAP across the site (`FinancialService` schema
carries the address), and — once real — an office address on the contact page rather than a placeholder.

---

## 14. Design direction

**Concept.** *Offering memorandum, not brochure.* The design borrows the visual vernacular of institutional
investment documents — hairline rules, monospaced data labels, specification tables, generous margins —
and warms it with the editorial serif and deep green of the existing brand mark. The result reads as a firm
that publishes documents, not one that runs campaigns.

**Palette** — sampled directly from the client's logo file, so the site and the mark are the same brand.

| Token | Hex | Role |
|---|---|---|
| Ink (navy) | `#011B34` | Primary dark ground, footer, dark bands |
| Forest | `#024234` / `#01271F` | Secondary dark ground, page headers, eyebrows |
| Gold | `#C69143` | Single accent — CTAs, rules, data labels on dark |
| Gold ink | `#8A5F1E` | The same accent, darkened for AA contrast on light grounds |
| Paper | `#F5F3ED` / `#EBE7DD` | Warm, slightly green-cast ground |
| Text | `#14241C` / `#5B6660` | Body and muted body |

Gold is used once per view and never as a background for large areas. The discipline of a single accent is
what makes it read as expensive rather than decorated.

**Typography — taken from the logo itself.** The firm's mark is a two-typeface lockup, and the site now
uses both, so the wordmark and the page are the same voice rather than cousins.

- **Bodoni Moda** (variable Didone serif) for display — the wordmark's face. The logo's
  `PREFERRED CAPITAL PARTNERS` is a high-contrast modern serif with flat hairline serifs; Bodoni Moda
  matches its letterforms and stroke contrast closely, and its `opsz` axis keeps the hairlines from
  breaking down at smaller heading sizes. Headings are set at weight 500 to match the logo's optical weight.
- **Jost** for interface, body copy, and every tracked-caps label — the tagline's face. The logo's
  `GUIDING CAPITAL WITH AN INSTITUTIONAL APPROACH` is a geometric sans in the Futura tradition; Jost is the
  closest widely-available match, and it carries the eyebrows and spec labels at .24em tracking exactly the
  way the logo sets its tagline.
- Two faces, not three. The earlier build used a monospace for data labels; that role now belongs to Jost
  in tracked caps, which is both closer to the brand and one fewer font to load.
- Because Jost sets optically smaller than a neutral grotesque, the body scale was lifted (17.4px body,
  15.2px small) to hold the same reading comfort.
- Italic Bodoni in gold is reserved for the one emphasised phrase in each headline. It appears once per
  page, which is why it registers.

**Layout**
- Asymmetric editorial grid (0.82fr / 1.18fr) rather than centred symmetry, so pages read as pages.
- Alternating light and dark full-bleed bands to give a very long homepage a sense of chapters.
- A single angled wedge transition, used exactly once entering the thesis band. Used twice it would be a tic.
- Content max-width 1300px, prose measure held to 58–70 characters.

**Signature elements** (the two things this site is remembered by)
1. **The offering-memorandum card** — hairline-ruled blocks with mono labels and tabular figures, used for
   properties, offering terms, and contact details. The same object, everywhere, carrying real data.
2. **The gold hairline that draws itself** as each section enters the viewport — a one-pixel echo of the
   ascending arrow in the firm's mark.

**Motion** — built to the rule that motion must have a nameable purpose.
- *Hero:* one orchestrated entrance — the image settles from `scale(1.07)` over 1.7s while the copy staggers
  in at 100ms intervals. Purpose: establishes hierarchy before reading begins. Happens once.
- *Scroll reveals:* 22px rise + fade, 700ms, `cubic-bezier(0.23, 1, 0.32, 1)`, 70ms stagger. Purpose:
  prevents a jarring change on a long page.
- *Hover:* 200ms lifts on cards, 4px arrow travel on buttons. Purpose: feedback. All gated behind
  `@media (hover: hover) and (pointer: fine)` so touch devices don't fire false hovers.
- *Accordion:* height, 320ms — the one place a transform equivalent doesn't exist.
- Transform and opacity only. No `transition: all`, no `ease-in` on UI, nothing over 300ms except the
  deliberate marketing-tier hero and reveals.
- `prefers-reduced-motion` removes movement and keeps opacity; every hide-then-reveal rule is scoped behind
  a `.js` class so the page renders fully visible if the script never loads.
- **No animated stat counters.** Numbers a person is reading should not move for style — and these are
  placeholders besides.

**The hero.** The background is the firm's mark itself, traced to vector from the logo artwork and scaled
to roughly 106% of the hero's height so it crops off the right edge — monumental rather than placed. The
mark is literally three buildings and an ascending arrow, which is the fund's business stated in one
graphic, so it earns the space. It sits on a navy-to-forest brand gradient; the towers are rendered as
near-transparent gradients that emerge from the ground, and the gold arrow is the only element allowed to
read at full strength. The skyline photograph remains underneath at 20% opacity as texture — set
`.hero__media` opacity to 0 to remove it and leave the mark on flat brand colour. A scrim keeps the left
column dark enough for the headline while leaving the right side, where the arrow lives, almost clear.

**Imagery.** Elsewhere, then
straight architectural photography of the actual asset type — no stock handshakes, no glass towers standing
in for garden-style apartments, no smiling models. All current images are licensed stock placeholders and
must be replaced with photography of properties the firm actually owns before launch.

---

## 15. Measurement

**Primary conversion:** intro call requests. **Secondary:** packet downloads. **Leading indicators:**
scroll depth past the comparison table, FAQ interaction rate, insights → packet rate.

Reasonable benchmarks for a well-built private-placement site with qualified traffic:

| Metric | Target |
|---|---|
| Homepage → any CTA click | 6–9% |
| Invest page → form submit | 12–20% |
| Packet request → intro call, within 90 days | 8–15% |
| Intro call → first investment | 20–35% |
| Organic article → packet request | 2–4% |

Instrument as events: `cta_call_click`, `cta_packet_click`, `form_submit_call`, `form_submit_packet`,
`faq_open` (with the question), `compare_scroll`. The FAQ interaction data in particular tells you which
objection to answer better next quarter.

---

## 16. Compliance notes for this build

Not legal advice — but these shaped the design, and counsel should confirm each one.

- **The site publicly markets the offering, which means Rule 506(c), not 506(b).** 506(b) prohibits general
  solicitation; a public marketing site is general solicitation. 506(c) permits it but requires *verified*
  accredited status rather than self-certification. That single fact drives the accreditation step in the
  process, the eligibility section, and the disqualifying language in the hero.
- **Every performance figure on the site is currently a placeholder.** Track record, AUM, IRRs, equity
  multiples, and the case study numbers must be replaced with evidenced figures and reviewed by counsel.
- **Testimonials are regulated.** Under the SEC Marketing Rule, testimonials require disclosure of any
  compensation and material conflicts, and written consent. The three quote slots are deliberately written
  as visible template text so they cannot ship by accident.
- **Disclosure block appears on every page**, not just the legal pages.
- **The three legal pages are drafting starting points**, labelled as such at the top, and require securities
  and privacy counsel before launch.

---

## 17. Pre-launch checklist

- [ ] Clear all 150 items in `PLACEHOLDERS.md`
- [ ] Replace stock imagery with photography of owned properties (`CREDITS.md`)
- [ ] Securities counsel review: disclosures, all performance figures, testimonials
- [ ] Wire forms to the CRM / scheduler (see `README.md`)
- [ ] Point `portal.html` at the live portal provider
- [ ] Set the real domain in canonical tags, `sitemap.xml`, and `robots.txt`
- [ ] Add analytics and the six conversion events
- [ ] Confirm whether a cookie consent mechanism is required for the audience
- [ ] Verify the 404 page is served on the host
- [ ] Compress images to WebP/AVIF and re-check Lighthouse
