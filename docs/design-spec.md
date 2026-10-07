# SecuEdge — Fortune-500 Design Spec (v1)

**Owner's brief:** "Design a great Fortune 500 level company website." Reference: apple.com.
Previously rejected: dark glass-card "AI template" look, empty space, cheap/generic feel.

**Direction:** Apple clarity × enterprise-security authority (Palo Alto Networks / Cisco tier).
**Theme: LIGHT.** Dark is reserved for two things only: (1) product UI screenshots (consoles are
dark — they're the product), (2) the final CTA band + footer (deep navy full-bleed).

## 1. Color system (tokens live in tailwind.config.ts)

| Token | Value | Use |
|---|---|---|
| `ink` | `#0B1B33` | Headlines, primary text (deep navy-black, ties to brand) |
| `muted` | `#42526B` | Body/secondary text |
| `dim` | `#6B7A93` | Captions, tertiary |
| `bg.DEFAULT` | `#FFFFFF` | Page background |
| `bg.raised` | `#F5F7FA` | Alternating sections, tinted cards |
| `bg.deep` | `#081226` | Dark CTA band, footer, product-console panels |
| `brand.blue` | `#016FED` | Fills, buttons, accents |
| `brand.link` | `#0166CC` | Text links (AA on white) |
| `brand.bright` | `#3AA5FF` | On-dark accents only |
| `brand.teal` | `#0FA895` | Success/check accents on light (darker than #22D3C5 for contrast) |
| status red/amber/green | `#D9323B` / `#B97C10` / `#177245` | On-light status (dark enough for AA) |
| border | `#E3E8F0` (`--hair`), `#CBD5E4` (`--hair2`) | Hairlines, card borders |

**Discipline:** one accent (brand blue). No cyan→teal gradient text anywhere on light.
Teal only as check-mark/positive accent. Gradients only inside dark product panels.

## 2. Typography

- Inter for everything; Fraunces italic (`.serif-accent`) ONLY for the promise quote and one
  hero word. Never for UI.
- `.display-1` clamp(2.75rem→5.25rem), weight 650, tracking -0.025em, ink.
- `.display-2` clamp(2rem→3.25rem), same voice. Section headers are BIG — Apple-scale contrast
  against 17px body.
- Body 17px/1.5 muted. Captions 13px dim. `.label-mono` for tiny technical labels (SKUs, counts).
- `.eyebrow`: 12px, uppercase, tracking 0.18em, brand.link, weight 600.

## 3. Surfaces & depth (light vocabulary)

- `.card`: white, 1px `--hair` border, radius 10px, shadow barely-there (`0 1px 2px rgba(11,27,51,.05)`). Hover: border `--hair2` + slight lift. Flat, thin, quiet — no blur, no glass, no translucent white-on-white. Anatomy: icon (~32px) + bold headline + 2–3 lines + `Learn more ›`.
- `.card-tint`: `bg.raised` fill, same border. For secondary grids.
- `.band`: full-bleed `bg.raised` section with top/bottom `--hair` hairlines. Strict white ↔ band alternation.
- `.band-deep`: full-bleed `#081226` navy; white text; **max 2–3 uses per page**: the mid-page STATS BAND (oversized numerals 64–96px + tiny uppercase captions — the signature enterprise section), the final CTA band, and the footer.
- Density rule: **no section is a lone headline in whitespace** — every section carries a stat, a 3–4 card row, a table, or an interactive element. Airy = dense content + generous padding (96–128px between sections, tight inside components). Sentence case everywhere; headlines are benefit sentences.
- **Product panels stay dark**: self-contained `#0B1220`-family styling with rim light + heavy soft shadow (`.panel-product`). Dark screenshot framed on white = Apple product-page move.
- FORBIDDEN on light pages: `bg-white/5`, `bg-white/10`, `border-hair` used as glass, `.glass`, `.glass-2`, `shadow-glow`, `gradient-text`, grain, aurora, stage-floor, vignette.

## 4. Buttons & links

- `.btn-primary`: solid brand.blue, white text, radius 980px, 17px, hover darken (#0159BE) + subtle lift. No glow shadows.
- `.btn-secondary`: white, 1px `--hair2` border, ink text.
- Text links: brand.link with `›` chevron (Apple idiom): `Learn more ›`.

## 5. Header (Fortune-500 anatomy)

1. **Utility bar** (36px, `bg.deep`, white 13px text): left "India's homegrown NGFW · DPDP-ready", right links: Free security assessment · Support · Contact sales.
2. **Main nav** (64px, white, blur on scroll, hairline bottom): Logo left; Frontier / Solutions / Industries / Why SecuEdge / Customers / Resources; dropdowns = white panels, shadow-xl, 8px radius, two-column when >6 items; right: "Get a Demo" btn-primary (compact).

## 6. Section rhythm & density

- Vertical padding 80–96px (not 128+). Every section must feel FULL at 1440px: no single
  floating card in a void. Two-column minimum for stat moments (number + supporting list).
- Order (homepage): Hero → trust stat bar → customer logo strip → problem (99% + incident cards)
  → promise quote → platform pillars → Dual Mode (dark console) → Pick·Set·Save → feature
  explorer → category grid → Safe Environment (dark monitor) → why-choose → business sizes →
  certifications → industries strip → dark CTA band.
- Interior detail pages: PageHero (light, breadcrumb, big title, meta chips) → stat/context row
  → challenge cards (card-tint grid) → approach → capabilities (2-col check list) → process
  (numbered, hairline spine) → FAQ (bordered accordions) → dark CTA band.

## 7. Trust signals (the Fortune-500 tell)

- Stat bar under hero: 4 items (certifications count, industries, "Made in India", response
  promise) separated by hairlines, tabular numerals.
- Customer logos on WHITE directly (no tiles — logos are white-background JPEGs, they merge
  seamlessly): grayscale 60% opacity, full color on hover.
- Certification chips recur near CTAs. Real names only (claims governance still applies).
- Exactly ONE conversion action sitewide — "Get a Demo" — repeated in header, hero, and a
  closing band with exactly two buttons (primary + ghost). No per-section button spam.

## 7b. Footer

Dark navy (`bg.deep`) MEGA-footer: 4–5 dense link columns (Frontier / Solutions / Industries /
Company / Resources), certification strip, legal row, © line. A thin footer reads startup;
sitemap-scale dark footer is the big-company tell.

## 8. Imagery/visual rules

- Product consoles: dark panels w/ window chrome, realistic content, mono version stamps.
- ApplianceArt SVG: fine on white — add soft ellipse shadow beneath instead of blue glow.
- No decorative blobs, no aurora, no grain, no dot grids on light. Depth comes from real
  shadows and content, not effects.

## 9. Motion

- Keep `FadeUp` (mount) for above-fold, `Reveal`/`Stagger` (scroll) below fold; distances ≤24px,
  duration ≤0.7s. No parallax on light pages. Reduced-motion respected (already built).

## 10. Voice

Keep existing copy (deck-derived, claims-governed). Headlines: short declaratives.
CTAs: "Get a Demo", "Talk to an expert", "Learn more ›".


## Homepage interaction update — 11 September 2026

The current company hero retains its navy treatment. Its product visual is a
user-controlled illustration of browsing, phishing, and intrusion policy outcomes,
explicitly labeled Interactive demo. It contains no live telemetry or performance
counters. The secondary hero link leads to the homepage protection controls.

The Dual Mode illustration uses the existing SECURITY_LEVELS engine mapping. It
explains each selected level, highlights changes from the previous selection, and
supports arrow keys plus Home/End. Transparent remains explicitly testing-only.

Scroll reveals begin before entering the viewport and keep content readable at
initial opacity. The full Dual Mode section is not hidden behind a reveal. New
scenario motion respects reduced-motion preferences.
