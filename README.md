make a full file 
Here's the complete file — copy everything below into README.md at the repo root:

# SecuEdge Frontier — Website

Marketing site for **SecuEdge Frontier**, India's homegrown next-generation firewall (NGFW) —
plus the Watchtower (NMS), SecuWeb (SD-WAN), Grid (SIEM/SOAR), SecuDefend (IPS/IDS),
and Muster (Log Analyzer) product families.

Built with the Next.js App Router (SSR/SSG), TypeScript, Tailwind CSS,
Framer Motion, and React Three Fiber. No database, no backend, no API keys.

---

## 1. Prerequisites

- Node.js 20+ (check `.nvmrc` if present, otherwise use your team's pinned version)
- npm 10+

## 2. Quick start

```bash
npm install
npm run dev          # http://localhost:3000
Production:

npm run build        # optimized production build
npm start            # serve the production build
npm run lint         # eslint
3. Environment
Variable	Required	Default	Purpose
NEXT_PUBLIC_SITE_URL	No	https://www.secuedge.com	Canonical host for sitemap.xml, robots, and page metadata
NEXT_PUBLIC_SITE_URL=https://www.secuedge.com npm run build
The contact form builds a mailto: draft the visitor reviews and sends in their own email app. Nothing is transmitted to, or stored by, this site.

4. Route map (~73 URLs, 84 pages)
Area	Routes
Home	/
Products	/products, /products/compare, /products/recommend, /products/frontier, /products/frontier/custom, /products/frontier/:model (11 SE models: se20 → se15000p), /products/:family (watchtower, secuweb, grid, secudefend, muster)
Frontier	/frontier, /frontier/dual-mode, /frontier/safe-environment, /frontier/appliances, /frontier/capabilities
Platform	/platform (NGFW architecture reference)
Solutions	/solutions, /solutions/:slug (8)
Industries	/industries, /industries/:slug (21)
Resources	/resources, /resources/:slug (2 guides)
Company	/about, /why-secuedge, /trust, /customers
Conversion	/contact, /get-started, /assessment, /compliance
Legal	/legal/privacy, /legal/terms, /legal/dpdp (placeholders — see §9)
Infra	/sitemap.xml, /robots.txt, custom 404, loading.tsx / error.tsx
Legacy short links (/grid, /muster, /watchtower, /secuweb, /secudefend) redirect to their canonical /products/* URLs. /preview is an internal, noindexed design-comparison page — do not link it publicly.

5. Content & data system
Single source of truth: lib/site.ts

SITE — brand, tagline, description, URL, contact email
SECUEDGE_PRODUCTS — 6 product families + accent colors
APPLIANCES — 11 SE models (form factor + indicative tier; specs intentionally null)
CUSTOMERS — 9 organizations: names, sectors, logos only (no outcomes)
SECURITY_LEVELS — Quick Mode Transparent / Balanced / Maximum
PRO_CAPABILITIES — 6 Professional Mode capability areas
CERTIFICATIONS — ISO 27001/9001/14001/45001, Common Criteria / NDPP, FCC Part 15B · CE
CATEGORIES — URL-filter database (2.4M / 1.1M / 850K …, 12 categories, 12.1M URLs)
Supporting data:

data/products/ — per-model pages (form factor + honest "available on request" specs)
data/ecosystem.ts — family pages (capabilities, product stories)
data/models.ts — source-tracked model facts (a verified flag per field)
lib/content/data/*.json — solutions, industries, compliance, assessment, get-started copy
lib/content/blog-posts/*.md — resource guides (Markdown + frontmatter: title, excerpt, category, readTime, author, publishedAt)
lib/seo.ts — buildMetadata() (title, description, canonical, OpenGraph/Twitter)
Key shared components:

ProductPage / EcosystemProductPage / templates/DetailPage — product, family, and solution/industry templates (include breadcrumbs, related products, docs-on-request CTAs)
FrontierModelViewer, FrontierConsolePreview, SecurityFlow — interactive product visuals
AssessmentQuiz, ProductRecommendationWizard, ContactForm, CompareSelector, ResourceBrowser, GlobalSearch
motion.tsx — the only scroll-animation system (Reveal, Stagger, FadeUp, CountUp, Parallax)
6. Claims governance (non-negotiable)
These rules override any marketing instinct. They exist because every statement must survive scrutiny from a technical buyer.

Never publish throughput, sessions, ports, dimensions, weight, power, or user counts — use "Available on request".
Deployment tiers are indicative lineup groupings, never capacity guarantees.
Never invent customer outcomes, testimonials, uptime figures, response times, SLAs, pricing, timelines, awards, or deployment counts.
Unsupported strings in JSON/blog sources are filtered at render (see DetailPage, get-started/compliance pages) — source files are left untouched and documented inline.
Industry "incident stats" describe real third-party events shown as context — never as SecuEdge outcomes.
New page? Export metadata via buildMetadata({…}), keep one H1, logical H2/H3 order, and add the path to app/sitemap.ts if public.
7. Design system
One theme — cream + deep navy + SecuEdge blue — defined as semantic variables in components/premium/premium.css. Do not introduce a second theme.

Token group	Values
Canvas	--prem-bg: #F5F2EA, --prem-bg-soft: #FAF9F5, alt #EFECE4, rhythm band #E9EFF6 → #DFEAF3
Ink	--prem-text: #0B2239, muted #526274, faint #64748b
Brand	--prem-blue: #016FED, deep #0159bd, cyan-deep #0E7490
Status	success #15803d, warning #B45309, danger #B91C1C
Typography:

Role	Family	Weights
Headings	Manrope (--font-heading)	700 / 800
Body / UI	Inter (--font-inter)	400–700 (never 300 on body copy)
Technical labels	JetBrains Mono (--font-mono)	600 / 700
Editorial accent	Fraunces (--font-display)	italic only, sparing use
Motion rules: Framer Motion primitives only; max one WebGL canvas per viewport (paused offscreen, DPR ≤ 1.5); prefers-reduced-motion disables non-essential animation; deterministic classnames (no trailing-space template bugs).

8. Project layout
app/                       Routes (see §4), sitemap.ts, robots.ts,
                           loading.tsx, error.tsx, globals.css
components/premium/        Design system (premium.css), hero/flow 3D,
                           shared sections, LegalShell
components/                Product/visual templates, console preview, quiz,
                           wizards, contact form, 3D scenes, layout
lib/ / data/               Content system (see §5)
public/customers/          Customer logos (Government entry has none — by design)
public/logo.svg             Brand mark (local; no external logo dependency)
docs/                      Redesign plan, deep analysis, industry research
9. Known gaps (tracked, not hidden)
Model spec sheets unpublished → "Available on request" pattern throughout
4 high-scale models absent from data/products/index.ts
/models/products/frontier.glb missing → procedural 3D fallback (working, do not fake it)
Legal pages are placeholders awaiting reviewed copy — do not invent legal language
Single OG image (/og/default.png); no per-page OG images
10. QA checklist (before any release)
npm run build clean (compiled + TypeScript, 84 pages)
Every public route returns 200 (or its intentional redirect); unknown paths 404
Zero hydration mismatches, zero console errors
No fabricated metric, testimonial, timeline, or spec introduced
Forms: contact mailto flow, quiz scoring/retake, compare selector, recommend wizard
Mobile: 44px touch targets, tables scroll, no horizontal overflow
sitemap.xml lists canonical URLs only
License
Private — © SecuEdge. All rights reserved.