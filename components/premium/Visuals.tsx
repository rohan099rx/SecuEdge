"use client";

import Image from "next/image";
import {
  ShieldCheck, ArrowRight, Check, Phone, Factory, Landmark, GraduationCap, HeartPulse,
} from "lucide-react";
import { CUSTOMERS, SUPPORT } from "@/lib/site";
import type { Photo } from "@/lib/photos";

/**
 * Animated, theme-native "images" for the landing page.
 *
 * The site has no photography — these are drawn illustrations built from the
 * same cream/navy/blue system as the rest of the theme, so they read as
 * product imagery without inventing hardware specs, customer outcomes or
 * live telemetry. Everything is labelled illustrative where it depicts
 * behaviour, and every animation is CSS-driven and disabled under
 * prefers-reduced-motion (see premium.css).
 */

/* ─────────────────────────────────────────────────────────────────────────
   1 · Appliance stage — the hero product image.
   Deliberately abstract about port counts while model specs are pending.
   ───────────────────────────────────────────────────────────────────────── */
export function ApplianceStage({ label = "SE100P" }: { label?: string }) {
  return (
    <figure className="viz-stage">
      <figcaption className="viz-stage__bar">
        <span className="viz-stage__kicker">SecuEdge Frontier</span>
        <span className="viz-stage__meta">{label} · illustrative hardware</span>
      </figcaption>
      <div className="viz-stage__canvas">
        <div className="viz-appliance">
          <svg viewBox="0 0 640 250" role="img" aria-label={`Illustration of a SecuEdge Frontier ${label} appliance`}>
            <defs>
              <linearGradient id="vizChassis" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#22334f" />
                <stop offset="0.45" stopColor="#132340" />
                <stop offset="1" stopColor="#0a1526" />
              </linearGradient>
              <linearGradient id="vizPlate" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#2b4066" />
                <stop offset="1" stopColor="#16233c" />
              </linearGradient>
              <linearGradient id="vizSweep" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#3aa5ff" stopOpacity="0" />
                <stop offset="0.5" stopColor="#5ec8ff" stopOpacity="0.18" />
                <stop offset="1" stopColor="#3aa5ff" stopOpacity="0" />
              </linearGradient>
              <clipPath id="vizChassisClip">
                <rect x="14" y="44" width="612" height="168" rx="18" />
              </clipPath>
            </defs>

            {/* ground shadow */}
            <ellipse cx="320" cy="228" rx="230" ry="12" fill="#016FED" opacity="0.18" />

            {/* chassis */}
            <rect x="14" y="44" width="612" height="168" rx="18" fill="url(#vizChassis)" stroke="rgba(120,170,235,.3)" />
            <rect x="14" y="44" width="612" height="2.5" rx="1.25" fill="rgba(170,210,255,.3)" />

            {/* brand plate */}
            <rect x="34" y="62" width="196" height="132" rx="12" fill="url(#vizPlate)" stroke="rgba(120,170,235,.22)" />
            <circle cx="66" cy="94" r="15" fill="none" stroke="#3AA5FF" strokeWidth="2.5" />
            <circle className="viz-led viz-led--sec" cx="66" cy="94" r="5" fill="#22D3C5" />
            <text x="92" y="92" fill="#EAF1FB" fontSize="16" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">SecuEdge</text>
            <text x="92" y="110" fill="#94A7C2" fontSize="9.5" letterSpacing="2" fontFamily="Inter, system-ui, sans-serif">FRONTIER</text>
            <text x="132" y="168" fill="#3AA5FF" fontSize="15" fontWeight="700" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif">{label}</text>

            {/* vents */}
            {Array.from({ length: 12 }).map((_, i) => (
              <rect key={i} x={250 + i * 15} y="66" width="7" height="124" rx="3.5" fill="#0d1a2c" stroke="rgba(120,170,235,.16)" />
            ))}

            {/* abstract interface panel — no port count is implied */}
            <rect x="446" y="66" width="158" height="124" rx="10" fill="#08111e" stroke="rgba(120,170,235,.26)" />
            {Array.from({ length: 10 }).map((_, i) => {
              const col = i % 5;
              const row = Math.floor(i / 5);
              return (
                <g key={i}>
                  <rect x={462 + col * 28} y={82 + row * 34} width="18" height="14" rx="2.5" fill="#0d1b2e" stroke="rgba(120,170,235,.28)" />
                  <circle
                    className="viz-port"
                    cx={471 + col * 28}
                    cy={104 + row * 34}
                    r="2.4"
                    fill="#4cc9a0"
                    style={{ animationDelay: `${(i * 0.37).toFixed(2)}s` }}
                  />
                </g>
              );
            })}
            <circle className="viz-led viz-led--pwr" cx="462" cy="176" r="3.5" fill="#16A34A" />
            <text x="472" y="179" fill="#6E83A0" fontSize="8.5" fontFamily="Inter, system-ui, sans-serif">PWR</text>
            <circle className="viz-led viz-led--act" cx="514" cy="176" r="3.5" fill="#3AA5FF" />
            <text x="524" y="179" fill="#6E83A0" fontSize="8.5" fontFamily="Inter, system-ui, sans-serif">SEC</text>
            <circle className="viz-led viz-led--sec" cx="566" cy="176" r="3.5" fill="#22D3C5" />
            <text x="576" y="179" fill="#6E83A0" fontSize="8.5" fontFamily="Inter, system-ui, sans-serif">ACT</text>

            {/* rack ears */}
            <rect x="2" y="58" width="12" height="140" rx="3" fill="#132340" stroke="rgba(120,170,235,.24)" />
            <rect x="626" y="58" width="12" height="140" rx="3" fill="#132340" stroke="rgba(120,170,235,.24)" />

            {/* inspection sweep across the chassis */}
            <g clipPath="url(#vizChassisClip)" aria-hidden>
              <rect className="viz-scan" x="14" y="44" width="120" height="168" fill="url(#vizSweep)" />
            </g>
          </svg>
        </div>
        <div className="viz-stage__foot">
          {["Edge firewall", "SD-WAN", "IPS / IDS", "Log export"].map((t) => (
            <span key={t} className="viz-stage__chip"><Check size={11} />{t}</span>
          ))}
        </div>
      </div>
    </figure>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   2 · Data residency panel — "built in India, your data stays here".
   A boundary the traffic enters and cannot leave: illustrative, no map
   outline is claimed, and nothing here describes a customer deployment.
   ───────────────────────────────────────────────────────────────────────── */
export function ResidencyPanel() {
  const inside = [
    { label: "Traffic in", x: 98, y: 150, glyph: "M0 -9 v11 M-5 -3 l5 5 l5 -5 M-8 9 h16" },
    { label: "Policy", x: 286, y: 150, glyph: "M-8 -6 h16 M-8 0 h16 M-8 6 h16", knobs: [[-3, -6], [3, 0], [-1, 6]] as const },
    { label: "Logs & events", x: 98, y: 268, glyph: "M-7 -10 h10 l5 5 v15 h-15 z M3 -10 v5 h5 M-3 -1 h7 M-3 4 h7" },
    { label: "Audit export", x: 286, y: 268, glyph: "M-8 9 h16 M0 8 v-13 M-5 -1 l5 -5 l5 5" },
  ];
  return (
    <figure className="viz-frame viz-residency">
      <figcaption className="viz-frame__bar">
        <span className="viz-frame__kicker">Data residency</span>
        <span className="viz-frame__meta">Illustrative</span>
      </figcaption>
      <svg viewBox="0 0 560 380" role="img" aria-label="Illustration of traffic, logs and policy data staying inside an India boundary">
        <defs>
          <linearGradient id="vizBoundaryFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#016FED" stopOpacity="0.07" />
            <stop offset="1" stopColor="#016FED" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* the boundary */}
        <rect x="24" y="76" width="336" height="246" rx="26" fill="url(#vizBoundaryFill)" stroke="#016FED" strokeWidth="1.6" strokeDasharray="7 7" />
        <text x="44" y="62" fill="#0159bd" fontSize="10.5" fontWeight="700" letterSpacing="2.4" fontFamily="ui-monospace, Menlo, monospace">INDIA BOUNDARY</text>

        {/* links into the core */}
        {inside.map((n) => (
          <line
            key={`line-${n.label}`}
            className="viz-flow"
            x1={n.x}
            y1={n.y}
            x2="192"
            y2="209"
            stroke="#016FED"
            strokeWidth="1.6"
            strokeOpacity="0.4"
          />
        ))}

        {/* core appliance */}
        <circle className="viz-pulse" cx="192" cy="209" r="38" fill="none" stroke="#016FED" strokeWidth="1.5" />
        <circle cx="192" cy="209" r="30" fill="#0b2239" stroke="#3AA5FF" strokeWidth="1.6" strokeOpacity="0.7" />
        <g transform="translate(192 209)" stroke="#22d3ee" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M0 -15 l13 5 v8 c0 8 -5.5 14.5 -13 17 c-7.5 -2.5 -13 -9 -13 -17 v-8 z" />
          <path d="M-5.5 -1 l4 4 l8 -8" />
        </g>

        {/* inside nodes */}
        {inside.map((n) => (
          <g key={n.label}>
            <rect x={n.x - 54} y={n.y - 32} width="108" height="64" rx="14" fill="#ffffff" stroke="rgba(11,34,57,.14)" />
            <circle className="viz-led viz-led--sec" cx={n.x + 42} cy={n.y - 22} r="3.4" fill="#22d3ee" />
            <g transform={`translate(${n.x} ${n.y - 8})`} stroke="#016FED" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d={n.glyph} />
              {n.knobs?.map(([kx, ky], i) => (
                <circle key={i} cx={kx} cy={ky} r="2.2" fill="#016FED" stroke="none" />
              ))}
            </g>
            <text x={n.x} y={n.y + 22} fill="#526274" fontSize="10" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif">{n.label}</text>
          </g>
        ))}

        {/* blocked outbound attempt — the one route that never leaves */}
        <g className="viz-blocked">
          <path d="M362 172 H450" stroke="#b91c1c" strokeWidth="1.6" strokeDasharray="6 6" fill="none" />
          <path d="M430 190 C 434 246, 400 262, 362 250" stroke="#b91c1c" strokeWidth="1.6" strokeDasharray="6 6" fill="none" opacity="0.7" />
          <g transform="translate(462 172)">
            <circle r="13" fill="#fff" stroke="#b91c1c" strokeWidth="1.6" />
            <path d="M-4.5 -4.5l9 9M4.5 -4.5l-9 9" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" />
          </g>
          <text x="548" y="128" fill="#b91c1c" fontSize="10.5" textAnchor="end" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">Overseas routing</text>
          <text x="548" y="142" fill="#b91c1c" fontSize="10.5" textAnchor="end" fontFamily="Inter, system-ui, sans-serif">blocked by default</text>
        </g>

        <text x="26" y="360" fill="#526274" fontSize="11" fontFamily="Inter, system-ui, sans-serif">
          Traffic, logs and policy data stay on Indian soil.
        </text>
      </svg>
    </figure>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   3 · Logo wall — the only real bitmaps on the site, given room to breathe.
   Tiles carry a logo, the customer name and the verified sector.
   ───────────────────────────────────────────────────────────────────────── */
const initials = (name: string) =>
  name
    .replace(/[^\p{L}\p{N} ]/gu, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

export function LogoWall() {
  return (
    <ul className="viz-wall">
      {CUSTOMERS.map((c) => (
        <li key={c.name}>
          <article className="viz-tile">
            <span className="viz-tile__frame">
              {c.logo ? (
                <Image
                  src={c.logo}
                  alt={`${c.name} logo`}
                  width={150}
                  height={56}
                  className="customer-logo max-h-10 w-auto object-contain"
                  loading="lazy"
                />
              ) : (
                <span className="viz-tile__mono" aria-hidden>{initials(c.name)}</span>
              )}
            </span>
            <strong className="viz-tile__name">{c.name}</strong>
            <span className="viz-tile__sector">{c.sector}</span>
          </article>
        </li>
      ))}
    </ul>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   4 · Fact ticker — motion between bands, carrying approved copy only.
   ───────────────────────────────────────────────────────────────────────── */
const TICKER_FACTS = [
  "Built in India",
  "Data stays in India",
  "24/7 India-based support",
  "200+ installations across India",
  "Built with the DPDP Act 2023 in mind",
  "Every feature on every model",
  "Channel partners pan-India",
  `Toll-free ${SUPPORT.phone}`,
] as const;

export function FactTicker({ reverse = false }: { reverse?: boolean }) {
  const row = [...TICKER_FACTS, ...TICKER_FACTS];
  return (
    <div className="viz-ticker" role="presentation">
      <div className={`viz-ticker__track ${reverse ? "is-reverse" : ""}`}>
        {row.map((fact, i) => (
          <span className="viz-ticker__item" key={`${fact}-${i}`} aria-hidden={i >= TICKER_FACTS.length}>
            <span className="viz-ticker__dot" aria-hidden />
            {fact}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   5 · Deployment diagram frame — the existing SVG map, given a chunky mat.
   ───────────────────────────────────────────────────────────────────────── */
export function DiagramStage({ children }: { children: React.ReactNode }) {
  return (
    <figure className="viz-frame viz-diagram">
      <figcaption className="viz-frame__bar">
        <span className="viz-frame__kicker">Deployment topology</span>
        <span className="viz-frame__meta">Internet → Frontier → protected sites</span>
      </figcaption>
      <div className="viz-diagram__canvas">
        {/* Phones get a vertical cut of the same story — the wide diagram's
            labels land under 5px once 960 units are squeezed into 330. */}
        <div className="md:hidden">
          <MobileTopology />
        </div>
        <div className="hidden md:block">{children}</div>
      </div>
      <div className="viz-diagram__legend">
        <span><ArrowRight size={12} className="text-[#0FA895]" />Allows traffic that matches policy</span>
        <span><ShieldCheck size={12} className="text-[#b91c1c]" />Stops threats at the edge</span>
      </div>
    </figure>
  );
}

/* Vertical deployment cut for phones. Same story, three nodes not five. */
function MobileTopology() {
  const sites: Array<[string, string]> = [
    ["Headquarters", "LAN · VLANs · servers"],
    ["Branch offices", "Site-to-site VPN"],
    ["Remote users", "Remote-access VPN · MFA"],
  ];
  return (
    <svg viewBox="0 0 320 436" className="w-full" role="img" aria-label="Internet traffic inspected by SecuEdge Frontier before reaching headquarters, branch offices and remote users">
      {/* internet */}
      <rect x="16" y="8" width="288" height="58" rx="12" fill="#f5f7fa" stroke="#e3e8f0" />
      <text x="30" y="30" fill="#6B7A93" fontSize="10" letterSpacing="1.8" fontFamily="ui-monospace, Menlo, monospace">INTERNET</text>
      {[["Malware", 62], ["Phishing", 196]].map(([label, x]) => (
        <g key={label as string} transform={`translate(${x} 50)`}>
          <circle r="9" fill="#FDF0F0" stroke="#D9323B" strokeWidth="1.4" />
          <path d="M-3 -3l6 6M3 -3l-6 6" stroke="#D9323B" strokeWidth="1.6" strokeLinecap="round" />
          <text x="14" y="4" fill="#D9323B" fontSize="11" fontFamily="Inter, sans-serif">{label as string}</text>
        </g>
      ))}

      {/* attempt down + blocked back */}
      <path className="flow-dash" d="M160 66 V104" stroke="#94A7C2" strokeWidth="1.5" fill="none" />
      <path className="flow-dash" d="M108 50 C 120 78, 140 88, 152 100" stroke="#D9323B" strokeWidth="1.3" fill="none" opacity="0.5" />
      <path className="flow-dash" d="M212 50 C 200 78, 180 88, 168 100" stroke="#D9323B" strokeWidth="1.3" fill="none" opacity="0.5" />

      {/* boundary */}
      <line x1="26" y1="106" x2="294" y2="106" stroke="#016FED" strokeWidth="1.4" strokeDasharray="7 7" opacity="0.6" />
      <text x="26" y="126" fill="#0159bd" fontSize="9" letterSpacing="1.8" fontFamily="ui-monospace, Menlo, monospace">SECURITY BOUNDARY</text>

      {/* frontier */}
      <rect x="34" y="136" width="252" height="64" rx="13" fill="#081226" stroke="#016FED" strokeWidth="1.6" />
      <g transform="translate(60 168)" stroke="#3AA5FF" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 0l11 4v7c0 6.6-4.5 12.6-11 14.2C4.5 23.6 0 17.6 0 11V4z" />
        <path d="M6 10l3.5 3.5l6.5-6.5" stroke="#22D3C5" />
      </g>
      <text x="92" y="162" fill="#FFFFFF" fontSize="13" fontWeight="700" fontFamily="Inter, sans-serif">SecuEdge Frontier</text>
      <text x="92" y="180" fill="#7d90ad" fontSize="9.5" fontFamily="Inter, sans-serif">Inspecting traffic at the edge</text>
      <circle className="viz-led viz-led--pwr" cx="272" cy="150" r="3" fill="#35d399" />
      <circle className="viz-led viz-led--act" cx="272" cy="162" r="3" fill="#3AA5FF" />

      {/* clean path */}
      <path className="flow-dash" d="M160 202 V230" stroke="#0FA895" strokeWidth="1.8" fill="none" />
      <g transform="translate(160 216)">
        <circle r="9" fill="#fff" stroke="#0FA895" strokeWidth="1.5" />
        <path d="M-3.5 0l2.5 2.5 5-5" stroke="#0FA895" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* protected sites */}
      {sites.map(([name, detail], i) => (
        <g key={name} transform={`translate(34 ${244 + i * 62})`}>
          <rect width="252" height="52" rx="12" fill="#ffffff" stroke="#e3e8f0" />
          <rect x="14" y="12" width="28" height="28" rx="8" fill="#f1f6fd" stroke="#dbe7f6" />
          <g transform="translate(28 26)" stroke="#0166CC" strokeWidth="1.5" fill="none" strokeLinecap="round">
            {i === 0 ? <path d="M-7 -8h14v16h-14z M-3 -4h.01M0 -4h.01M3 -4h.01M4 8V3h-8v5" />
              : i === 1 ? <path d="M-8 -5h16v10h-16z M-4 9h8M-2 5v4M2 5v4" />
                : <path d="M-5 -9h10v18h-10z M0 6h.01" />}
          </g>
          <text x="56" y="24" fill="#0B1B33" fontSize="12" fontWeight="600" fontFamily="Inter, sans-serif">{name}</text>
          <text x="56" y="39" fill="#6B7A93" fontSize="9.5" fontFamily="Inter, sans-serif">{detail}</text>
        </g>
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   7 · Photographs — licensed stock frames (see lib/photos.ts and
   public/photos/credits.json). They are treated to sit inside the same
   cream/navy system as the drawn illustrations, and each one is tagged so
   that no photograph reads as a picture of our own facility or a customer
   deployment.
   ───────────────────────────────────────────────────────────────────────── */

export function PhotoTile({
  photo,
  aspect = "16 / 9",
  sizes = "(max-width: 767px) 100vw, 50vw",
  strip = false,
  side = false,
  className = "",
  tag,
}: {
  photo: Photo;
  aspect?: string;
  sizes?: string;
  /** Lead a card: the card supplies the radius and border. */
  strip?: boolean;
  /** Sit beside content on wide screens and stretch to its height. */
  side?: boolean;
  className?: string;
  /** Override the photo's own tag (pass null to show none). */
  tag?: string | null;
}) {
  const label = tag === undefined ? (photo.tag ?? "Illustrative") : tag;
  return (
    <figure
      className={`viz-photo ${strip ? "viz-strip" : ""} ${side ? "viz-photo--side" : ""} ${className}`}
      style={{ "--viz-photo-aspect": aspect } as React.CSSProperties}
    >
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="viz-photo__img" loading="lazy" />
      <span className="viz-photo__tone" aria-hidden />
      <span className="viz-photo__scrim" aria-hidden />
      {label ? <span className="viz-photo__tag">{label}</span> : null}
    </figure>
  );
}

export function PhotoBand({ photo, children }: { photo: Photo & { kicker?: string }; children: React.ReactNode }) {
  return (
    <section className="viz-band">
      <Image src={photo.src} alt={photo.alt} fill sizes="100vw" className="viz-band__img" loading="lazy" />
      <span className="viz-band__scrim" aria-hidden />
      <div className="viz-band__inner">
        {photo.kicker ? (
          <div className="mx-auto w-full max-w-[1200px] px-6 pt-12 md:pt-16">
            <p className="viz-band__kicker">{photo.kicker}</p>
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   8 · Sector strip — icons that give the industries band a visual top.
   ───────────────────────────────────────────────────────────────────────── */
const SECTOR_ICONS = [GraduationCap, HeartPulse, Landmark, Factory];

export function SectorStrip() {
  return (
    <div className="viz-sectors" aria-hidden>
      {SECTOR_ICONS.map((Icon, i) => (
        <span className="viz-sectors__item" key={i} style={{ animationDelay: `${i * 0.5}s` }}>
          <Icon size={16} />
        </span>
      ))}
      <span className="viz-sectors__line" />
      <span className="viz-sectors__label"><Phone size={12} />{SUPPORT.phone} · 24/7</span>
    </div>
  );
}
