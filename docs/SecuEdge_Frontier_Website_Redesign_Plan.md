# SecuEdge Frontier — Website Redesign Plan

**Prepared for:** SecuEdge
**Date:** 21 June 2026
**Source of truth:** SecuEdge Customer Deck (15 slides) + Website Deep-Analysis audit
**Locked decisions:** Brand model = **SecuEdge Frontier** (SecuEdge = company, Frontier = NGFW product) · Scope = **single-product (Frontier) now, restructure later** · Stack = **modern SSR/SSG**

---

## 0. How to use this document

This is the master plan for rebuilding www.secuedge.com around the **Frontier** next-generation firewall. It is organized so each section can be handed to the relevant owner (strategy, design, content, engineering, SEO). Everything here is derived from **your own deck** — the deck's narrative, claims, visual language, and proof points are treated as canonical. Where the current site contradicts the deck, the deck wins.

The plan deliberately keeps the site **focused on one product (Frontier)** per your decision. It is *not* over-engineered into a multi-product platform now; instead, §4.6 marks the few low-cost "seams" so a future restructure (when new products go public) is a clean extension rather than a teardown.

---

## 1. Executive summary

**The opportunity.** Your deck already contains a sharp, credible, differentiated story — "enterprise-grade firewalling, made simple," Made-in-India, Dual Mode, the Safe Environment Filter, real certifications, and named customers. Your current website does *not* tell that story; it uses generic copy and at least one borrowed/false enterprise claim, and it sits on a technically weak, SEO-invisible single-page app. **The redesign's core job is to put the deck's story onto a fast, search-visible, conversion-focused site — under the new Frontier product name.**

**What changes:**

1. **Reposition** the entire site around the deck's thesis: *complexity causes breaches; Frontier makes the correct configuration the easy one.*
2. **Rename** the NGFW to **SecuEdge Frontier** consistently across the site, with a clean naming system for appliance models.
3. **Rebuild** on a server-rendered/static stack so pages ship real HTML — fixing the root cause of the site's SEO and social-sharing problems.
4. **Replace** weak/false trust claims with the deck's *real* proof: ISO/Common Criteria certifications, DPDP/data-sovereignty, and named customers.
5. **Elevate** two unique assets the current site buries: **Dual Mode** and the **Safe Environment Filter**.
6. **Consolidate** the fragmented domain/URL mess and clean up the compromised blog subdomain and toxic backlinks.

**What does not change yet:** the site stays a single-product Frontier site. Future products are neither shown nor architected-for beyond the inexpensive seams in §4.6.

---

## 2. Strategic foundation

### 2.1 Positioning statement (from the deck)

> **SecuEdge Frontier is India's homegrown next-generation firewall — powerful enough for the enterprise, simple enough to configure correctly the first time.**

The wedge is **simplicity-as-security**, not feature count. The deck's argument: most breaches come from misconfiguration, not clever attackers; if the right setup is the easy setup, those breaches don't happen. Frontier delivers enterprise depth *and* a configuration experience anyone can get right.

### 2.2 Brand architecture — SecuEdge Frontier

- **SecuEdge** = the company / master brand (the trust, certifications, support, "Made in India" story live here).
- **Frontier** = the NGFW product. Always written **SecuEdge Frontier** on first mention per page; "Frontier" thereafter.
- This master-brand model is the cleanest base for a future multi-product line, even though we're not building that structure now.

**Naming conventions (confirmed):**

| Element | Convention | Example |
|---|---|---|
| Product line | SecuEdge Frontier | "SecuEdge Frontier" |
| Appliance models | SecuEdge Frontier + SE-code | SE20 · SE50 · SE50P · SE100P · SE250P · SE500P · SE1000P |
| Tiers | Branch · Mid-market · Enterprise | "SecuEdge Frontier SE100P" |
| Modes | Quick Mode · Professional Mode | (deck terms — keep as-is) |
| Signature feature | Safe Environment Filter | (keep as a named, trademark-style feature) |

**Appliance lineup (confirmed):** SE20, SE50, SE50P, SE100P, SE250P, SE500P, SE1000P — written as *SecuEdge Frontier SE100P* (product line + SE-code). The lineup has **two axes**: capacity (ascending number, 20→1000) and **form factor** — **"P" = Professional, rack-mountable**; non-P (SE20, SE50) = desktop/compact. Provisional capacity grouping for the site: **Branch / small office** — SE20, SE50, SE50P · **Mid-market** — SE100P, SE250P · **Enterprise** — SE500P, SE1000P.

> Copy guardrail: keep the hardware **"P" (Professional / rack-mount)** distinct from the software **Professional Mode** (half of Dual Mode). Every appliance runs *both* Quick and Professional modes regardless of form factor — "P" is only about rack-mount hardware. The model-selector should ask **form factor (desktop vs rack)** × **capacity**. Still needed: per-model specs (firewall throughput, port count, recommended users/devices).

### 2.3 Messaging pillars (five — one per core deck idea)

1. **Made simple, so it's made secure.** The right config is the default; correct-by-default removes the #1 cause of breaches.
2. **Dual Mode — one firewall for everyone.** Quick Mode for the business; Professional Mode for engineers; same appliance, one toggle.
3. **Protecting people, not just networks.** The Safe Environment Filter — a real-time early-warning system for schools, colleges, and healthcare.
4. **Trust you can verify.** Independently certified (ISO, Common Criteria/NDPP), DPDP-ready, data on Indian soil.
5. **Enterprise security shouldn't be hard — or imported.** Built, certified, and supported in India.

### 2.4 Target audiences

- **Primary buyers:** SMB and mid-market IT leaders / business owners in India who need enterprise security without an enterprise security team.
- **Technical evaluators:** in-house network/security engineers (the Professional Mode audience) who must be convinced of depth.
- **High-vetting verticals:** education (schools/colleges), healthcare, manufacturing, government, media, legal, finance — where compliance and the Safe Environment Filter resonate.
- **Channel/partners:** resellers/MSPs (future nav seam; light treatment now).

### 2.5 Claims governance (non-negotiable)

Every on-site claim must be **true and substantiable**. Remove the "70% of Fortune 100 / hundreds of government agencies" line entirely — it is Fortinet's stat and contradicts your own deck. Standardize the misconfiguration statistic to a single cited figure (the deck mixes 95% and 99%; use **"up to 99%, Gartner"** consistently, with a footnote/source link).

---

## 3. Design system (the deck's visual DNA, productized for web)

The deck already defines a strong, premium, dark "security-console" identity. The website adopts it verbatim so deck and site feel like one brand.

### 3.1 Color tokens (extracted from the deck)

| Token | Value | Use |
|---|---|---|
| `--blue` (primary) | `#016FED` | Primary actions, links, brand accents |
| `--bluebr` | `#3AA5FF` | Hover/bright accent, highlights |
| `--glow` | `#2F9BF0` | Glows, focus rings, gradient mid-stops |
| `--teal` | `#22D3C5` | Secondary accent, "secure/healthy" states |
| `--red` | `#FF5A60` | Threats/critical states, alerts |
| `--amber` | `#F4B845` | Warnings, "alerts-only" states |
| green | `#16A34A` / `#15803D` | Success, "protected/blocked" confirmations |
| `--ink` | `#EAF1FB` | Primary text on dark |
| `--muted` | `#94A7C2` | Secondary text |
| `--dim` | `#6E83A0` | Tertiary text, captions |
| bg deep | `#0B1525` / `#0F1B2D` | Page / section backgrounds |
| `--glass` | `rgba(18,32,58,.50)` | Glassmorphism panels/cards |
| borders | `rgba(120,170,235,.18–.30)` | Hairline card borders |

Signature gradients: blue→teal and blue glow washes (e.g., `linear-gradient(90deg,#1283d6,#016FED)`), plus subtle status gradients (red/amber/green) for security UI.

### 3.2 Typography

- **Primary typeface:** **Inter** (weights 400/500/600/700/800/900), already the deck font — load via self-hosted woff2 for performance (not third-party CDN).
- **Editorial/quote accent:** a serif (deck uses Georgia/Times) for pull-quotes and "promise" moments — use sparingly.
- **Type scale:** large, confident display headings (the deck's hero voice), generous line-height for body, tabular figures for the dashboard/stat components.

### 3.3 Visual language & components

Reuse the deck's distinctive UI as **interactive web components** (they're the proof, not decoration):

- **The Console mockup** — the WAN/Security/Category screens become live, animated product visuals (the "Pick. Set. Save." sequence; the Transparent→Maximum protection selector; the category toggles with live URL counts).
- **Dual-Mode toggle** — an interactive Quick ↔ Professional switch that transforms a console preview.
- **Security-state cards** — glass panels with status colors (green/amber/red) and check/cross iconography.
- **Live dashboards** — the visibility/reporting tables (blocked vs accessed logs), the Safeguarding monitor.
- **Trust band** — certification badges (ISO 27001/9001/14001/45001, Common Criteria/NDPP, FCC/CE) as a repeatable strip.
- **Customer/logo wall** — named customers and verticals.
- **Incident ticker** — the deck's "even giants fall" news strip, for the problem section.

Treatment: dark navy canvas, glassmorphism cards, hairline blue borders, soft glows, restrained motion (the deck's `-3deg` rotations and staged reveals). Iconography: thin-line security icons in the blue/teal family.

### 3.4 Accessibility baked into the system

Define every text/background pairing to meet **WCAG 2.1 AA contrast** (the muted/dim grays on navy must be verified — some may need lightening for body text), visible focus states, and motion that respects `prefers-reduced-motion`. (See §10.)

---

## 4. Information architecture & sitemap

### 4.1 Principles

- **One product, told as a story.** The homepage mirrors the deck's narrative arc; deeper pages let evaluators and verticals go further.
- **Two reading paths:** a *business* path (simplicity, outcomes, Safe Environment Filter, trust) and a *technical* path (Professional Mode depth, specs, certifications).
- **Proof everywhere.** Certifications and named customers recur as reusable blocks, not a single buried page.

### 4.2 Sitemap (launch scope)

```
/                          Home (deck narrative as a scroll)
/frontier                  SecuEdge Frontier — product overview
/frontier/dual-mode        Dual Mode (Quick + Professional)
/frontier/simplicity       Quick Mode: Pick·Set·Save, security levels, category blocking
/frontier/capabilities     Professional Mode: firewall/NAT, VLAN, OSPF/BGP, SD-WAN, IDPS, CLI
/frontier/safe-environment Safe Environment Filter (flagship, people-not-just-networks)
/frontier/visibility       Reporting, logs, compliance exports
/frontier/appliances       Hardware family (SE20→SE1000P; branch→enterprise)
/why-secuedge              Made in India, data sovereignty, human support, the thesis
/trust                     Certifications & compliance (ISO, Common Criteria/NDPP, DPDP, FCC/CE)
/customers                 Proof: named customers + case studies + verticals overview
/industries/...            Education, Healthcare, Manufacturing, Government, Media, Finance, Legal
/resources                 Blog / guides (clean rebuild; replaces blogs.secuedge.com)
/company                   About SecuEdge, leadership, careers
/contact  ·  /demo         Conversion: talk to an expert / request a demo
/legal/privacy · /legal/dpdp · /legal/terms
```

### 4.3 URL & navigation

- **Canonical host:** `https://www.secuedge.com` (301 the non-www and all legacy URLs to it — see §8.3).
- **Product lives under `/frontier/…`** — a stable namespace. (This is also the future seam: a second product would live under its own `/‹product›/…` sibling without disturbing Frontier.)
- **Primary nav:** Frontier ▸ (Overview, Dual Mode, Safe Environment Filter, Capabilities, Appliances) · Industries ▸ · Why SecuEdge · Trust · Customers · Resources · **[Get a Demo]** (primary button).
- **Footer:** full sitemap, certification badges, DPDP/data-sovereignty line, contact, social, legal.

### 4.4 The future-restructure seam (cheap insurance, per "restructure later")

Without building a platform now, three near-zero-cost choices keep a later expansion clean: (1) product content under `/frontier/…` rather than generic `/product/…`; (2) a component-based design system with reusable "product page" templates; (3) a headless CMS modeling "Product" as a content type with one entry (Frontier) today. None of this is visible or adds scope now — it just avoids a teardown later.

---

## 5. Page-by-page blueprints

### 5.1 Homepage — the deck as a scroll

Mirror the deck's 15-slide arc as a single narrative page:

1. **Hero** — "Enterprise-grade firewalling, made simple." Sub: India's homegrown NGFW… Primary CTA **Get a Demo**, secondary **See Dual Mode**. Trust microline: Made in India · ISO 27001 · Common Criteria · DPDP-ready.
2. **The real problem** — "Most firewalls are too complex to configure," misconfiguration → breaches, the *up to 99% (Gartner)* stat.
3. **It happens to everyone** — the incident ticker (config leak, hospital ransomware, broker breach) for credibility/urgency.
4. **The promise** — "We make enterprise-grade firewalling simple enough to get right."
5. **Introducing Frontier** — one appliance family, two modes; four value chips (built for simplicity, enterprise-grade, data sovereignty, scales with you).
6. **Dual Mode** — interactive Quick ↔ Professional toggle.
7. **Quick Mode demo** — animated Pick·Set·Save + the Transparent→Maximum security selector ("five engines, one choice").
8. **Category blocking** — 12 categories, 12.1M URLs, one toggle.
9. **Safe Environment Filter** — emotional peak; "protecting people, not just networks."
10. **Visibility** — dashboards + exportable compliance logs.
11. **Professional depth** — the engineer's grid (NAT, VLAN, OSPF/BGP, SD-WAN, IDPS, CLI).
12. **Trust** — certification wall.
13. **Customers** — named logos + verticals ("the ones that vet hardest").
14. **Closing CTA** — "Enterprise security shouldn't be hard. Or imported." → Get a Demo.

Each homepage block links to its deeper page. Every section ships as **real server-rendered HTML** with proper headings.

### 5.2 Deeper pages (purpose + must-have sections)

- **/frontier** — full product overview; the "one appliance, two modes, full security" pitch; links to all sub-pages; spec summary; CTA.
- **/frontier/dual-mode** — the core idea in depth; side-by-side Quick vs Professional; "same hardware, one toggle"; who each mode is for.
- **/frontier/simplicity (Quick Mode)** — Pick·Set·Save walkthroughs; security levels table; one-click stack; simple site-to-site VPN ("four fields + generate key").
- **/frontier/capabilities (Professional Mode)** — full NGFW feature matrix for evaluators; IDPS, routing, segmentation, SD-WAN/VPN, SNMP/CLI/telemetry.
- **/frontier/safe-environment** — flagship page; how detection→alert works in <1s; coverage (Google/Bing/YouTube, every device); for education & healthcare; safeguarding framing; CTA tuned to schools/colleges.
- **/frontier/visibility** — reporting, two-log model, per-device attribution, compliance export; screenshots.
- **/frontier/appliances** — the Frontier hardware family (SE20, SE50, SE50P, SE100P, SE250P, SE500P, SE1000P) in desktop (non-P) and rack-mount Professional (P) form factors, grouped Branch→Mid-market→Enterprise; per-model throughput/port specs (to be supplied); "which model is right for me" helper (form factor × capacity).
- **/why-secuedge** — the thesis + Made-in-India + data sovereignty + human/local support; the "or imported" argument.
- **/trust** — every certification with issuer, scope, and (where possible) a verification link; DPDP & data-residency statement.
- **/customers** — named customers (KNL Driveline, Sain Packaging, NDIM, Lokmat, Bombay Hospital, Solis Technology, government bodies), each ideally a short case study; vertical filter.
- **/industries/‹x›** — templated vertical pages (problem → Frontier fit → relevant features → compliance → proof → CTA); lead with Education & Healthcare (Safe Environment Filter).
- **/resources** — clean blog/guides rebuilt on the main domain (retire `blogs.secuedge.com`).
- **/company**, **/contact**, **/demo**, **/legal/***.

---

## 6. Content & copy plan

- **Voice:** confident, plain-spoken, anti-jargon — the deck's voice. Short declaratives ("Pick. Set. Save."). Technical precision only where evaluators need it.
- **Deck → site mapping:** every slide's headline and proof point has a home (above). Reuse the deck copy as the first draft; expand for SEO and depth.
- **Trust assets to produce:** (1) 3–5 named **case studies** with outcomes; (2) **certification badge set** with verification links; (3) **logo wall** with permissions; (4) **About/Team** page with real faces and credentials; (5) seed **G2/Trustpilot**.
- **Flagship content:** make the **Safe Environment Filter** a standalone narrative (no global competitor leads with this) — it's your most ownable, emotionally resonant asset for education/healthcare.
- **Remove/repair:** delete the Fortune-100 claim; standardize the Gartner stat; fix any "| SecuEdge | SecuEdge" title duplication; ensure every claim is sourced.

---

## 7. Technical architecture

### 7.1 Stack (SSR/SSG — fixes the root cause)

- **Framework:** **Next.js** (React) or **Astro** — both give server-rendered/static HTML so crawlers, social unfurlers, and AI answer engines receive full content. Recommendation: **Astro** if the site is largely content/marketing (lightest JS, islands for the interactive console demos); **Next.js** if you want a richer app-like component model and future product apps. Either resolves the SEO root cause.
- **Rendering:** static generation (SSG) for all marketing pages + incremental/regeneration for blog/case studies; hydrate only the interactive components (Dual-Mode toggle, console demos, dashboards) as islands.
- **CMS:** a **headless CMS** (e.g., Sanity, Contentful, or Strapi) modeling Product, Feature, Industry, Customer/Case Study, Certification, Post. This powers the blog and case studies and holds the single "Frontier" product entry (future seam).
- **Hosting/CDN:** edge platform (Vercel/Netlify/Cloudflare) with global CDN, automatic HTTPS, and image optimization.
- **Design tokens:** the §3.1 palette and Inter type as CSS variables / a Tailwind theme, shared by every component.

### 7.2 Performance budget (Core Web Vitals targets)

- LCP < 2.5s, INP < 200ms, CLS < 0.1 on mid-range mobile over Indian 4G.
- Self-host Inter (woff2, subset); lazy-load the heavy console animations; cap initial JS; use responsive AVIF/WebP images; preconnect/preload critical assets.

### 7.3 Forms, integrations, analytics

- Demo/contact forms → CRM/email with spam protection (privacy-respecting, no data in URLs).
- Privacy-first analytics (e.g., Plausible/GA4 configured for consent + DPDP); Search Console + Bing Webmaster.
- Cookie/consent banner defaulting to the most privacy-preserving option (DPDP-aligned).

### 7.4 Security & headers

HSTS, sensible CSP, X-Content-Type-Options, Referrer-Policy, clean TLS; keep the platform patched. (Doubly important given the blog compromise — see §8.5.)

---

## 8. SEO & migration plan

### 8.1 Audit issues → fixes (traceability)

| Audit finding | Fix in this redesign |
|---|---|
| Client-rendered SPA, no SSR | SSR/SSG stack ships real HTML (§7.1) |
| Identical site-wide title/description | Per-page metadata model (§8.2) |
| No `og:image`/`twitter:image`, generic OG | Per-page OG + branded share images (§8.2) |
| No real sitemap.xml / robots.txt | Generated sitemap + real robots (§8.4) |
| www vs non-www + legacy URLs indexed | Canonical host + 301 map (§8.3) |
| Viewport disables zoom | Corrected viewport (§10) |
| Title "| SecuEdge | SecuEdge" bug | Title template fixed (§6) |
| Compromised blog subdomain | Retire/clean + redirect (§8.5) |
| Toxic PBN backlinks | Inventory + disavow (§8.6) |
| False Fortune-100 claim | Removed; real proof substituted (§2.5) |

### 8.2 Metadata & structured data

- **Per page:** unique `<title>` (~50–60 chars), meta description (~140–160), self-referencing canonical, page-specific `og:*`/`twitter:*` + a branded 1200×630 share image.
- **JSON-LD:** `Organization` (with certifications via `hasCredential`), `Product`/`SoftwareApplication` for Frontier, `BreadcrumbList`, `FAQPage` on relevant pages, `Article` on posts.

### 8.3 Redirect map (build during migration)

| Legacy URL (indexed) | New target |
|---|---|
| `secuedge.com/*` (non-www) | `www.secuedge.com/*` (canonical host) |
| `/get-started/` | `/demo` |
| `/enterprise-solutions/` | `/frontier` (or `/industries` overview) |
| `/branch-office/` | `/frontier/appliances` (Branch tier) |
| `/secure-remote-access/` | `/frontier/capabilities` (VPN/remote access) |
| `/secure-your-healthcare-environment/` | `/industries/healthcare` |
| `/secure-your-educational-institution/` | `/industries/education` |
| `/solutions/network-security` | `/frontier` |
| `/solutions/small-medium-business` | `/frontier` (SMB framing) |
| `/solutions/retail` | `/industries/retail` |
| `blogs.secuedge.com/best-firewall-for-smb/` | `/resources/best-firewall-for-smb` |
| `blogs.secuedge.com/live-slot-online-bonus/` | **410 Gone** (spam — do not redirect) |

All redirects **301** (permanent), except the spam page which returns **410**. Crawl the live site + export Search Console's indexed URLs to complete this map before launch.

### 8.4 Crawl foundation

Generate a real `sitemap.xml` (all canonical URLs, lastmod) and a real `robots.txt` referencing it; submit both in Search Console and Bing Webmaster Tools; request reindexing of changed URLs.

### 8.5 Blog subdomain remediation (also a §11 Phase-0 P0)

Investigate `blogs.secuedge.com` (the "Live Slot Online Bonus" page indicates compromise/spam injection). Clean and patch the WordPress install or take it down; migrate the one legitimate post to `/resources`; 301 good URLs, 410 the spam; if any "hacked content" flag exists in Search Console, fix and request review.

### 8.6 Backlink cleanup

Inventory the PBN/Web-2.0 links (`thelateblog.com`, `luwebs.com`, `blogolize.com`, `diowebhost.com`, etc.); stop any active cheap link-building; prepare a **disavow** file if volume warrants; reinvest in legitimate linkable assets (buyer's guide, comparison pages, original SMB-security data).

### 8.7 Keyword/topic targeting (starter)

Map pages to intent: "next generation firewall India," "easy firewall for SMB," "firewall for schools/colleges," "HIPAA/DPDP firewall," "made in India firewall," "firewall misconfiguration," "[competitor] alternative India." Build the comparison/guide content in §8.6 against these.

---

## 9. Conversion & lead generation

- **CTA hierarchy:** primary **Get a Demo** (persistent header button + section CTAs); secondary **Talk to an expert** (the deck's consultative promise, "response within 24h"); tertiary **lighter on-ramps** to capture non-ready buyers — downloadable **Firewall Buyer's Guide**, a **Safe Environment Filter brief** for schools, or a **2-minute fit assessment**.
- **Self-serve gap (audit):** add at least indicative **packaging/tiers** (Branch/Mid-market/Enterprise by Frontier model) even if final pricing stays "contact us."
- **Forms:** short, role-aware (business vs engineer), with clear privacy/DPDP notice; route by industry for faster follow-up.

---

## 10. Accessibility & compliance

- Fix the viewport: `width=device-width, initial-scale=1` (re-enable zoom).
- WCAG 2.1 AA: verify contrast for all text/background tokens (lighten `--dim`/`--muted` for body where needed), visible focus, keyboard nav, alt text, captions, `prefers-reduced-motion` for the console animations.
- Public-sector buyers often mandate accessibility — treat it as a sales requirement, not a nicety.
- DPDP alignment for forms/analytics/cookies; publish a clear privacy + data-residency statement (reinforces the sovereignty story).

---

## 11. Phased roadmap

| Phase | Focus | Key deliverables | Indicative duration |
|---|---|---|---|
| **0 — Stabilize (P0, now)** | Stop active harm | Remove Fortune-100 claim; clean/secure or take down spam blog; start backlink inventory; fix viewport on current site | 2–4 days |
| **1 — Foundation** | Strategy + design system | Confirm naming/brand; finalize design tokens & components; IA sign-off; wireframes for home + key templates | 1–2 weeks |
| **2 — Content** | Words + proof | Deck→site copy; case studies; certification/legal pages; share images; metadata model | 1–2 weeks (parallel w/ 3) |
| **3 — Build** | Engineering | SSR/SSG scaffold; CMS; components (console demos, Dual-Mode toggle, dashboards); page templates | 2–4 weeks |
| **4 — Migrate & SEO** | Don't lose equity | 301/410 map; sitemap/robots; structured data; redirects tested; staging QA (Lighthouse, a11y, links) | 1 week |
| **5 — Launch** | Go live safely | DNS/canonical host cutover; submit sitemaps; monitor Search Console; verify social unfurls | 2–3 days |
| **6 — Post-launch** | Grow | Backlink disavow; content/guide program; G2/Trustpilot seeding; CWV tuning; conversion experiments | Ongoing |

(Durations are planning estimates for scoping, not commitments.)

---

## 12. Success metrics (KPIs)

- **Discoverability:** indexed pages, organic impressions/clicks (Search Console), keyword coverage for the §8.7 set, valid rich results.
- **Technical health:** Core Web Vitals pass rate, Lighthouse SEO/Perf/Best-Practices/A11y ≥ 90, zero "hacked content" flags.
- **Engagement:** demo-page conversion rate, guide/asset downloads, bounce on key pages, scroll-depth on the homepage narrative.
- **Pipeline:** demo requests, qualified leads by industry, time-to-first-response (hold the deck's 24h promise).
- **Trust:** number of live case studies, certification verifications, third-party reviews.

---

## 13. Risks & mitigations

- **SEO equity loss at migration** → comprehensive 301 map, staged launch, Search Console monitoring, keep old URLs resolving.
- **Heavy interactive visuals hurting performance** → islands architecture, lazy-load, performance budget enforced in CI (Lighthouse gate).
- **Claims/legal exposure** → claims-governance review (§2.5) before launch; every stat sourced.
- **Brand-name confusion (SecEdge/SecurEdge)** → consistent "SecuEdge Frontier" usage, branded-search optimization, distinctive design.
- **Scope creep toward multi-product** → hold the single-product line; rely on §4.6 seams, don't build the platform now.
- **Blog re-compromise** → retire WordPress or harden + monitor; prefer the new CMS for resources.

---

## 14. Immediate next steps (this week)

1. **Provide per-model specs** (firewall throughput, ports, recommended users) for the SE-series (SE20–SE1000P) so I can build the comparison table + selector. Naming is locked; **"P" = Professional / rack-mount** is confirmed.
2. **Authorize P0 stabilization** (§11 Phase 0): pull the Fortune-100 claim, secure/retire the spam blog, fix the viewport, start the backlink inventory.
3. **Confirm stack** (Astro vs Next.js) and CMS choice so engineering can scaffold.
4. **Provide assets** I'll need for the build: appliance specs (throughput/ports per model), customer-logo permissions, official certification files/links, and brand logo/wordmark in vector.

> Once you approve, I can produce the next-level artifacts: a homepage wireframe + copy deck, the full design-token sheet, page-level SEO metadata, and the complete redirect map as a spreadsheet.

---

## Appendix A — Design tokens (starter, from the deck)

```css
:root{
  --blue:#016FED; --bluebr:#3AA5FF; --glow:#2F9BF0; --teal:#22D3C5;
  --red:#FF5A60; --amber:#F4B845; --green:#16A34A; --green-deep:#15803D;
  --ink:#EAF1FB; --muted:#94A7C2; --dim:#6E83A0;
  --bg:#0B1525; --bg2:#0F1B2D;
  --glass:rgba(18,32,58,.50); --glass2:rgba(12,22,42,.55);
  --brd:rgba(120,170,235,.18); --brd2:rgba(120,170,235,.30);
  --sans:"Inter",system-ui,-apple-system,sans-serif;
}
```

## Appendix B — Source mapping (deck slide → site)

Hero/closing → Home hero & final CTA · "Real problem"/"It happens to everyone" → Home problem + incident ticker · "Why we built" → /why-secuedge · "Introducing" → /frontier · "Dual Mode" → /frontier/dual-mode · Quick Mode slides → /frontier/simplicity · Category blocking → /frontier/simplicity · Safe Environment Filter → /frontier/safe-environment · Visibility → /frontier/visibility · "Other half" → /frontier/capabilities · Certifications → /trust · "Deployed in the field" → /customers + /industries.
