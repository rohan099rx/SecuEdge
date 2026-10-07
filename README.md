# SecuEdge Frontier — website

Marketing site for the **SecuEdge Frontier** next-generation firewall. Built with Next.js 14
(App Router), TypeScript, and Tailwind CSS, with server-side rendering / static generation so every
page ships real, crawlable HTML.

## Quick start

```bash
npm install
cp .env.example .env.local        # set NEXT_PUBLIC_SITE_URL (canonical host, e.g. https://www.secuedge.com)
npm run dev                       # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

## Project layout

- `app/` — routes (App Router). Homepage replays the product narrative; `frontier/*` holds product
  pages; `industries/[slug]` are templated vertical pages; `sitemap.ts` / `robots.ts` are generated.
- `components/` — UI and interactive islands (`DualModeToggle`, `ContactForm` are client components).
- `lib/site.ts` — **single source of truth** for site content and data (nav, appliances, certs,
  customers). Edit content here.
- `lib/seo.ts` — `buildMetadata()` gives each page a unique title, description, canonical, and Open
  Graph / Twitter card.
- `docs/` — the redesign plan and website audit this build is based on.

## Conventions

- Brand: **SecuEdge Frontier** (company + product). Keep all claims true and substantiable.
- Design tokens live in `tailwind.config.ts` + `app/globals.css` (deck-derived dark console theme,
  Inter type).
- New page? Use `buildMetadata({...})` for its `metadata` export and add it to `app/sitemap.ts`.

## Deploy

Designed for an edge platform (Vercel/Netlify/Cloudflare). Set `NEXT_PUBLIC_SITE_URL` per
environment. Before launch, implement the redirect map and canonical-host rules from
`docs/SecuEdge_Frontier_Website_Redesign_Plan.md` (§8).

See **CLAUDE.md** for the full handoff notes and TODO list.
