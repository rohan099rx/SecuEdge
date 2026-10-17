"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight, ArrowUpRight, ShieldCheck, Eye, Globe2, Layers3, ListTree,
  Waypoints, Phone, LockKeyhole, Activity, BellRing, FileSearch,
  Boxes, Route as RouteIcon, Check, MapPin, Zap, Cpu,
  GraduationCap, HeartPulse, Landmark, Banknote, Factory, Store, Coffee, Rocket,
} from "lucide-react";
import {
  APPLIANCES, CUSTOM_APPLIANCE,
  CUSTOMERS, CUSTOMER_GROUPS, HOME_PRODUCTS,
  SECURITY_LEVELS, PRO_CAPABILITIES,
  SUPPORT, COVERAGE, SITE, HEADQUARTERS, MISCONFIG_STAT,
  INDUSTRIES as ALL_INDUSTRIES,
} from "@/lib/site";
import { INDUSTRY_CARDS } from "@/lib/content/industries";
import compliancePage from "@/lib/content/data/compliance-page.json";
import { CustomerMarquee } from "@/components/CustomerMarquee";
import { FrontierConsolePreview } from "@/components/FrontierConsolePreview";
import { FrontierModelViewer } from "@/components/FrontierModelViewer";
import { SecurityFlow } from "@/components/foundation/SecurityFlow";
import { Reveal, Stagger, Item, Parallax } from "@/components/motion";
import { TiltCard } from "@/components/TiltCard";
import { ScrollProgress } from "@/components/premium/ScrollProgress";
import "@/components/premium/premium.css";

const PremiumHero3D = dynamic(
  () => import("@/components/premium/PremiumHero3D").then((m) => m.PremiumHero3D),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_35%,rgba(1,111,237,0.12),transparent_55%)]" /> }
);

const PremiumFlow3D = dynamic(
  () => import("@/components/premium/PremiumFlow3D").then((m) => m.PremiumFlow3D),
  { ssr: false, loading: () => <div className="h-[300px] w-full md:h-[340px]" /> }
);

/* Icons for the six families shown on the landing page. */
const PRODUCT_ICONS = {
  frontier: ShieldCheck,
  watchtower: Eye,
  secuweb: Globe2,
  grid: Layers3,
  secudefend: Waypoints,
  muster: ListTree,
} as const;

/* The five responsibilities the portfolio maps to (portfolio-level, not a product). */
const PLATFORM_LAYERS: Array<[string, string, LucideIcon[]]> = [
  ["Network", "Connectivity paths between sites, cloud and data centers.", [Globe2, RouteIcon]],
  ["Security", "Policy enforcement and inspection at the edge.", [ShieldCheck, LockKeyhole]],
  ["Visibility", "Health and state of infrastructure and devices.", [Eye, Activity]],
  ["Intelligence", "Events correlated into response workflows.", [Layers3, BellRing]],
  ["Control", "Logs retained, searchable, and auditable.", [FileSearch, ListTree]],
];

/* Existing solution slugs — hrefs unchanged. */
const solutions = [
  ["01", "Enterprise", "Policy depth and visibility for complex networks.", "enterprise", "Frontier"],
  ["02", "SMB", "Enterprise-grade protection without enterprise overhead.", "small-medium-business", "Frontier"],
  ["03", "Branch office", "A focused, dependable security edge for every site.", "branch-office", "Frontier · SecuWeb"],
  ["04", "Multi-site", "Consistent controls across distributed locations.", "network-security", "SecuWeb"],
  ["05", "Remote workforce", "Secure access for people and the applications they use.", "secure-remote-access", "Frontier"],
  ["06", "Manufacturing", "Segment operational and business networks at the edge.", "network-segmentation", "Frontier"],
  ["07", "Healthcare", "Protect connected care environments and sensitive traffic.", "iot-security", "Frontier"],
  ["08", "Education", "Keep campuses connected with clear policy control.", "network-security", "Frontier"],
  ["09", "Data center", "A composed security boundary for critical infrastructure.", "network-segmentation", "Frontier"],
] as const;

/* Traffic → decision pipeline shown under the live 3D flow. */
const FLOW_STEPS = ["Traffic", "Inspection", "Policy", "Detection", "Decision", "Destination"];

/* Appliance showroom — the shared hardware family, grouped by form factor. */
const RACK_MODELS = APPLIANCES.filter((a) => a.formFactor === "Rack-mount");
const SHOWROOM_GROUPS: Array<[string, typeof APPLIANCES]> = [
  ["Desktop edge", APPLIANCES.filter((a) => a.formFactor === "Desktop")],
  ["Professional rack", RACK_MODELS.slice(0, 3)],
  ["High-scale", RACK_MODELS.slice(3)],
];

function SectionHead({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <Reveal>
      <div className="premium-section-head">
        <p className="premium-eyebrow">{eyebrow}</p>
        <h2 className="premium-section-title">{title}</h2>
        <p className="premium-section-lead">{lead}</p>
      </div>
    </Reveal>
  );
}

/* Distinct CSS visual metaphors per family — no extra WebGL canvases. */
function ProductVisual({ productKey }: { productKey: string }) {
  if (productKey === "frontier") {
    return (
      <div className="premium-panel h-full p-6" aria-label="Frontier traffic inspection illustration">
        <p className="premium-panel-label">Traffic inspection · illustrative</p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {["Internet", "Inspect", "Policy", "Allow / Block"].map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              <span className={`rounded-lg border px-3 py-2 font-mono text-[11px] ${i === 3 ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : i === 1 ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-200" : "border-white/10 bg-white/[0.03] text-slate-300"}`}>{s}</span>
              {i < 3 && <ArrowRight size={13} className="text-slate-600" />}
            </span>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          {[["Allowed", "text-emerald-300"], ["Inspected", "text-cyan-300"], ["Blocked", "text-rose-300"]].map(([k, c]) => (
            <div key={k} className="rounded-lg border border-white/10 bg-white/[0.02] py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">{k}<div className={`mt-1 text-xs font-bold ${c}`}>●</div></div>
          ))}
        </div>
      </div>
    );
  }
  if (productKey === "watchtower") {
    return (
      <div className="premium-panel h-full p-6" aria-label="Watchtower topology illustration">
        <p className="premium-panel-label">Network topology · illustrative</p>
        <svg viewBox="0 0 400 170" className="mt-4 w-full" role="img" aria-label="Hub with connected nodes">
          {[[200, 85], [60, 40], [110, 130], [290, 130], [340, 40], [250, 30]].map(([x, y], i) => (
            <g key={i}>
              {i > 0 && <line x1={200} y1={85} x2={x} y2={y} stroke="#016FED" strokeOpacity={0.45} strokeWidth={1.5} />}
              <circle cx={x} cy={y} r={i === 0 ? 14 : 7} fill={i === 0 ? "#016FED" : "#0B2239"} fillOpacity={i === 0 ? 1 : 0.85} stroke="#F5F2EA" strokeWidth={2} />
            </g>
          ))}
        </svg>
        <div className="mt-2 flex flex-wrap gap-2">
          {["Infrastructure visibility", "Device health", "Network events"].map((t) => (
            <span key={t} className="premium-chip !text-[11px]"><Eye size={12} />{t}</span>
          ))}
        </div>
      </div>
    );
  }
  if (productKey === "secuweb") {
    return (
      <div className="premium-panel h-full p-6" aria-label="SecuWeb routing illustration">
        <p className="premium-panel-label">Secure routing · illustrative</p>
        <div className="mt-5 flex items-center justify-between gap-2 text-center">
          {[["Branch", "SE100P"], ["Hub", "SE1000P"], ["Cloud", "Policy path"]].map(([k, v], i) => (
            <span key={k} className="flex flex-1 items-center gap-2">
              <span className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-2 py-3">
                <span className="block text-xs font-bold text-white">{k}</span>
                <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-widest text-slate-500">{v}</span>
              </span>
              {i < 2 && <RouteIcon size={14} className="shrink-0 text-cyan-300/70" />}
            </span>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-500">Policy-driven paths across branches, cloud environments and data centers.</p>
      </div>
    );
  }
  if (productKey === "grid") {
    return (
      <div className="premium-panel h-full p-6" aria-label="GRID event correlation illustration">
        <p className="premium-panel-label">Event correlation · illustrative shapes</p>
        <div className="mt-4 space-y-2">
          {[["Firewall deny burst", "High", "w-[85%]"], ["VPN anomaly", "Medium", "w-[55%]"], ["IDS signature match", "High", "w-[70%]"], ["Log baseline drift", "Low", "w-[35%]"]].map(([k, sev, w]) => (
            <div key={k} className="flex items-center gap-3 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2.5">
              <span className={`rounded px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest ${sev === "High" ? "bg-rose-400/10 text-rose-300" : sev === "Medium" ? "bg-amber-400/10 text-amber-300" : "bg-slate-400/10 text-slate-400"}`}>{sev}</span>
              <span className="text-xs text-slate-300">{k}</span>
              <span className={`ml-auto hidden h-1 rounded bg-cyan-400/30 sm:block ${w}`}><span className={`block h-1 rounded bg-cyan-400/40 ${w}`} /></span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (productKey === "secudefend") {
    return (
      <div className="premium-panel h-full p-6" aria-label="SecuDefend interception illustration">
        <p className="premium-panel-label">Threat interception · illustrative</p>
        <div className="mt-4 space-y-2">
          {[["Perimeter scan", "Blocked"], ["Payload signature", "Blocked"], ["Internal lateral move", "Contained"]].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between rounded-lg border border-white/[0.07] bg-white/[0.02] px-4 py-3">
              <span className="text-xs font-semibold text-slate-200">{k}</span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-rose-300"><ShieldCheck size={13} />{v}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-500">Real-time interception across perimeters and internal segments.</p>
      </div>
    );
  }
  return (
    <div className="premium-panel h-full p-6" aria-label="Muster log analysis illustration">
      <p className="premium-panel-label">Log intelligence · illustrative</p>
      <div className="mt-4 rounded-lg border border-[var(--prem-border)] bg-[var(--prem-bg-soft)] p-4 font-mono text-[11px] leading-[1.9] text-slate-400">
        <div><span className="text-cyan-300/70">collect</span> · firewall · vpn · idps · system</div>
        <div><span className="text-cyan-300/70">analyze</span> · correlate events across sources</div>
        <div><span className="text-cyan-300/70">search</span> · investigate operations history</div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {["Collection", "Analysis", "Search"].map((t) => (
          <span key={t} className="premium-chip !text-[11px]"><FileSearch size={12} />{t}</span>
        ))}
      </div>
    </div>
  );
}

/* Industry cards — hero subheads and approved references (copy deck §15).
   `card` joins each sector to the verified control list used on /industries
   (lib/content/data/industry-cards.json) instead of restating it twice. */
const INDUSTRIES = [
  { name: "Education", card: "Education", regulation: "Built with the DPDP Act 2023 in mind", ref: "The Shri Ram School · NDIM · St. Bede's", href: "/industries/education", icon: GraduationCap, sub: "Protect students online, keep Wi-Fi under control and separate admin, lab and student networks, without a full-time security team." },
  { name: "Healthcare", card: "Healthcare", regulation: "Patient data stays in India by default", ref: "Bombay Hospital · Shanti Devi GI Institute", href: "/industries/healthcare", icon: HeartPulse, sub: "Separate medical devices, billing and guest Wi-Fi, block threats before they reach clinical systems and stay online when a line fails." },
  { name: "Government", card: "Government", regulation: "Built with DPDP and CERT-In directions in mind", ref: "Kisan Call Centre", href: "/industries/government", icon: Landmark, sub: "Made in India, with citizen data kept in India, strict outbound controls and complete audit logs." },
  { name: "Banking and finance", card: "Finance", regulation: "Supports RBI and SEBI cybersecurity guidelines", ref: "References on request", href: "/industries/finance", icon: Banknote, sub: "Default-deny outbound rules, phishing blocking, separate sensitive zones and audit evidence your regulator expects to see." },
  { name: "Manufacturing", card: "Manufacturing", regulation: "Built in India, with 24/7 India-based support", ref: "KNL Driveline · Sain Packaging", href: "/industries/manufacturing", icon: Factory, sub: "Separate machine networks from office networks, control contractor access and block ransomware before it reaches the shop floor." },
  { name: "Retail", card: "Retail", regulation: "Customer data stays in India by default", ref: "Closest ref: Chaayos (multi-outlet)", href: "/industries/retail", icon: Store, sub: "Keep billing systems separate, give customers safe Wi-Fi and set up each store correctly with Quick Mode." },
  { name: "Hospitality", card: "Hospitality", regulation: "Guest data stays in India by default", ref: "Chaayos", href: "/industries/hospitality", icon: Coffee, sub: "Give guests fast, fair Wi-Fi with a login page while keeping them away from billing and property systems." },
  { name: "SMB and startups", card: "Technology", regulation: "Client data stays in India by default", ref: "Solis Technology · Eleet Mindz · Natsav", href: "/industries/technology", icon: Rocket, sub: "No security team? No problem. Quick Mode lets you set up SecuEdge Frontier correctly, and every feature comes on every model." },
] as const;

/* Indian regulation frameworks (lib/content/data/compliance-page.json — the
   same approved copy the /compliance page renders). */
type Framework = { name: string; desc: string; items: string[] };
const COMPLIANCE_FRAMEWORKS = (compliancePage as { frameworks: Framework[] }).frameworks;
const INDIA_FRAMEWORKS = COMPLIANCE_FRAMEWORKS.filter((f) => f.name !== "International clients").slice(0, 4);
const INTERNATIONAL_FRAMEWORK = COMPLIANCE_FRAMEWORKS.find((f) => f.name === "International clients");

/** Verified, sector-specific controls for a card (three at most, per the card). */
const controlsFor = (industry: string) =>
  (INDUSTRY_CARDS.find((c) => c.industry.toLowerCase() === industry.toLowerCase())?.features ?? []).slice(0, 3);

/* Founding team — names, background and the origin line, per the About copy. */
const FOUNDERS = [
  { name: "Sagar Dalal", role: "Co-founder", note: "Cybersecurity researcher and ethical hacker. Saw good firewalls set up wrongly, project after project." },
  { name: "Manoj Kuniyal", role: "Co-founder", note: "Over 20 years in technology sales. Saw why the same mistakes kept repeating." },
] as const;

const INDIA_POINTS = [
  { title: "Designed and built in India.", desc: "Hardware, firmware and software engineered and quality-checked in India, not a foreign platform under an Indian label." },
  { title: "Data stays in India.", desc: "Traffic, logs and policy data stay on Indian soil by default, with no overseas routing." },
  { title: "Built with the DPDP Act 2023 in mind.", desc: "Data protection is designed in, not added later." },
  { title: "No import dependency.", desc: "No exposure to export restrictions or overseas logistics." },
] as const;

export default function HomePage() {
  const [heroActive, setHeroActive] = useState(true);
  const [flowActive, setFlowActive] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(APPLIANCES[0]);

  useEffect(() => {
    const el = document.getElementById("premium-hero");
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setHeroActive(e.isIntersecting), { threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = document.getElementById("security-flow");
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setFlowActive(e.isIntersecting), { rootMargin: "200px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="premium relative overflow-x-clip">
      <ScrollProgress />
      {/* ══ 1 · HERO ══ */}
      <section id="premium-hero" className="relative flex min-h-[94svh] items-center overflow-hidden pb-16 pt-28">
        <div className="premium-grid-bg absolute inset-0" aria-hidden />
        <Parallax distance={50} className="absolute inset-0 pointer-events-none">
          <div className="premium-glow-orb left-[8%] top-[8%] h-[420px] w-[420px] bg-[#016FED]/15" aria-hidden />
        </Parallax>
        <Parallax distance={-40} className="absolute inset-0 pointer-events-none">
          <div className="premium-glow-orb right-[4%] top-[38%] h-[360px] w-[360px] bg-[#22D3EE]/10" aria-hidden />
        </Parallax>
        <PremiumHero3D active={heroActive} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_28%_45%,rgba(245,242,234,0.88),transparent_70%)]" aria-hidden />

        <div className="relative z-10 mx-auto grid w-full max-w-[1200px] items-center gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="premium-eyebrow">SecuEdge · Network security portfolio</p>
            <h1 className="mt-5 text-[2.75rem] font-extrabold leading-[1.0] tracking-[-0.035em] text-white sm:text-6xl md:text-7xl">
              Cybersecurity, made easy.
              <span className="mt-2 block bg-gradient-to-r from-[#0B2239] to-[#016FED] bg-clip-text text-2xl font-semibold tracking-tight text-transparent md:text-3xl">Built in India. One portfolio for the whole network.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
              {HOME_PRODUCTS.length} product families cover the edge-to-insight chain — firewall protection,
              network monitoring, secure connectivity, threat detection, event intelligence and log analysis.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="premium-btn-primary">Explore all products <ArrowRight size={16} /></Link>
              <Link href="/contact" className="premium-btn-ghost">Book a free demo <ArrowUpRight size={15} /></Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {["NGFW", "NMS", "SD-WAN", "SIEM / SOAR", "IPS / IDS", "Log Analyzer"].map((t) => (
                <span key={t} className="premium-chip !text-[11px]">{t}</span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6">
              <div><div className="text-2xl font-bold text-white">{HOME_PRODUCTS.length}</div><div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Product families</div></div>
              <div><div className="text-2xl font-bold text-white">{solutions.length}</div><div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Deployment patterns</div></div>
              <div>
                <a href={SUPPORT.phoneHref} className="text-2xl font-bold text-white transition-colors hover:text-cyan-300">{SUPPORT.phone}</a>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Toll-free · 24/7 · Talk to us</div>
              </div>
            </div>
          </div>

          <TiltCard max={6} className="relative">
            <div className="premium-card overflow-hidden p-6">
              <div className="flex items-center justify-between">
                <span className="premium-badge premium-badge--live">● Available now</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">First of seven</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--prem-muted)]">
                SecuEdge Frontier — the next-generation firewall — is available today.
                The other six families in the portfolio are in development and on the roadmap.
              </p>
              <Link href="/products" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--prem-blue)]">
                See the portfolio <ArrowRight size={14} className="premium-link-arrow" />
              </Link>
              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-center">
                {[["200+", "Installations"], ["24/7", "India support"], ["India", "Data stays here"]].map(([k, v]) => (
                  <div key={k}><div className="text-xs font-bold text-white">{k}</div><div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">{v}</div></div>
                ))}
              </div>
            </div>
          </TiltCard>
        </div>
        <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">Scroll</div>
      </section>

      <div className="premium-divider mx-auto max-w-[1200px]" />

      {/* ══ 2 · PLATFORM (five responsibilities — editorial band, no boxes) ══ */}
      <section id="platform-story" className="relative py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <SectionHead eyebrow="Breaking down the system" title="One portfolio across network, security, and intelligence." lead="Five responsibilities, six products. This is how the portfolio maps to the work — a grouping of the product family, not a claim about internal integrations." />
          <Stagger className="mt-14 grid gap-x-8 gap-y-10 md:grid-cols-5" gap={0.05}>
            {PLATFORM_LAYERS.map(([title, desc, icons], i) => (
              <Item key={title}>
                <div className={i > 0 ? "md:border-l md:border-[var(--prem-border)] md:pl-6" : ""}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex gap-1.5">
                      {icons.map((Icon, k) => (
                        <span key={k} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--prem-border)] bg-white text-[var(--prem-blue)]"><Icon size={16} /></span>
                      ))}
                    </span>
                    <span className="font-mono text-xs text-slate-600">0{i + 1}</span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-[var(--prem-text)]">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--prem-muted)]">{desc}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ══ 3 · SECURITY FLOW (3D visual moment) ══ */}
      <section id="security-flow" className="prem-navy relative overflow-hidden py-24 md:py-32">
        <div className="premium-glow-orb left-[10%] top-[20%] h-[360px] w-[360px] bg-[#016FED]/20" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-6">
          <SectionHead eyebrow="Traffic → decision" title="Every packet earns its passage." lead="Traffic enters, gets inspected against policy, meets detection, and receives a decision — forward to a secure destination or block. Watch the path below." />
          <Reveal className="mt-10">
            <div id="flow-3d" className="w-full">
              <PremiumFlow3D active={flowActive} />
            </div>
          </Reveal>
          <Reveal className="mt-8">
            <TiltCard max={3}>
              <div className="premium-card overflow-hidden p-4 md:p-6"><SecurityFlow /></div>
            </TiltCard>
          </Reveal>
          <Stagger className="mt-10 grid grid-cols-3 gap-x-5 gap-y-6 lg:grid-cols-6" gap={0.04}>
            {FLOW_STEPS.map((s, i) => (
              <Item key={s}>
                <div className="border-t-2 border-[rgba(1,111,237,0.35)] pt-3">
                  <div className="font-mono text-[10px] text-slate-500">0{i + 1}</div>
                  <div className="mt-1 text-sm font-bold text-[var(--prem-text)]">{s}</div>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ══ 4 · INSIDE THE PORTFOLIO (one visual language per family) ══ */}
      <section id="deep-dives" className="relative border-t border-[var(--prem-border)] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <SectionHead eyebrow="Inside the portfolio" title="What each product actually does." lead="Same data as the product pages — compressed into one scroll. Each family gets its own visual language." />
          <div className="mt-12 space-y-5">
            {HOME_PRODUCTS.map((p, i) => {
              const Icon = PRODUCT_ICONS[p.key as keyof typeof PRODUCT_ICONS];
              const reversed = i % 2 === 1;
              return (
                <Reveal key={p.key}>
                  <article className="premium-card grid items-center gap-6 overflow-hidden p-7 md:p-9 lg:grid-cols-2">
                    <div className={reversed ? "lg:order-2" : ""}>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em]" data-accent-text style={{ color: p.accent }}>0{i + 1} · {p.category}</p>
                      <h3 className="mt-2 flex items-center gap-2.5 text-3xl font-bold tracking-tight text-white"><Icon size={26} data-accent-text style={{ color: p.accent }} />{p.name}</h3>
                      <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-400">{p.desc}</p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link href={p.href} className="premium-btn-primary !min-h-[2.7rem] !text-[13px]">Open {p.name} <ArrowRight size={14} /></Link>
                        <Link href="/contact" className="premium-btn-ghost !min-h-[2.7rem] !text-[13px]">Discuss fit</Link>
                      </div>
                    </div>
                    <div className={reversed ? "lg:order-1" : ""}><ProductVisual productKey={p.key} /></div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ 5 · APPLIANCE SHOWROOM (3D hardware view) ══ */}
      <section id="appliances" className="prem-cream-soft relative border-t border-[var(--prem-border)] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <SectionHead eyebrow="Appliance showroom" title="One hardware family. Seven models." lead="The whole portfolio runs on the same SecuEdge appliances. Pick a model to spin it in 3D — every model ships both Quick Mode and Professional Mode, and above 1,300 users we design the box with you." />
          <div className="mt-10 grid gap-5 lg:grid-cols-[370px_1fr]">
            <div className="premium-card p-2.5 lg:max-h-[672px] lg:overflow-y-auto">
              {SHOWROOM_GROUPS.filter(([, models]) => models.length > 0).map(([group, models]) => (
                <div key={group} className="mb-1">
                  <p className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">{group}</p>
                  {models.map((product) => (
                    <button
                      key={product.model}
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      aria-pressed={selectedProduct.model === product.model}
                      className={["premium-model-btn", selectedProduct.model === product.model && "is-active"].filter(Boolean).join(" ")}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-mono text-base font-bold text-[var(--prem-text)]">{product.model}</span>
                        <span className="rounded-md border border-[var(--prem-border)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-[var(--prem-muted)]">{product.formFactor}</span>
                      </span>
                      <span className="mt-1 block text-xs text-[var(--prem-muted)]">{product.userRange} users · {product.typicalSite}</span>
                    </button>
                  ))}
                </div>
              ))}
              <div className="mb-1">
                <p className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Above the range</p>
                <div className="mx-1 rounded-xl border border-[rgba(1,111,237,0.35)] bg-[rgba(1,111,237,0.06)] px-3.5 py-3">
                  <span className="font-mono text-base font-bold text-[var(--prem-text)]">{CUSTOM_APPLIANCE.model}</span>
                  <span className="mt-1 block text-xs text-[var(--prem-muted)]">{CUSTOM_APPLIANCE.userRange} users · {CUSTOM_APPLIANCE.typicalSite}</span>
                </div>
              </div>
            </div>

            <div className="premium-card overflow-hidden">
              <div className="h-[360px] sm:h-[420px] lg:h-[480px]">
                <FrontierModelViewer model={selectedProduct.model} formFactor={selectedProduct.formFactor} userRange={selectedProduct.userRange} />
              </div>
              <div className="border-t border-[var(--prem-border)] px-5 py-4">
                <div className="grid gap-px overflow-hidden rounded-xl border border-[var(--prem-border)] bg-[rgba(11,34,57,0.10)] sm:grid-cols-2">
                  {[
                    ["Form factor", selectedProduct.formFactor, "Verified"],
                    ["Operating modes", "Quick + Professional", "Included"],
                    ["Recommended users", `${selectedProduct.userRange} (indicative)`, "Guide"],
                    ["Technical specifications", "Available on request", "On request"],
                  ].map(([k, v, s]) => (
                    <div key={k} className="bg-[var(--prem-bg-soft)] px-4 py-3">
                      <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">{k}</div>
                      <div className="mt-1 flex items-center justify-between gap-2 text-sm font-semibold text-[var(--prem-text)]">{v}<span className="font-mono text-[9px] uppercase tracking-widest text-[#15803d]">{s}</span></div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs leading-relaxed text-[var(--prem-muted)]">
                  <span className="font-semibold text-[var(--prem-text)]">Typical site · </span>{selectedProduct.typicalSite}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href={`/products/frontier/${selectedProduct.model.toLowerCase()}`} className="premium-btn-primary !min-h-[2.6rem] !text-[13px]">View {selectedProduct.model} <ArrowRight size={14} /></Link>
                  <Link href="/frontier/appliances" className="premium-btn-ghost !min-h-[2.6rem] !text-[13px]">Compare family</Link>
                  <Link href="/contact" className="premium-btn-ghost !min-h-[2.6rem] !text-[13px]">Request specifications</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 6 · DUAL MODE (real data) ══ */}
      <section id="modes" className="prem-navy relative border-t border-[var(--prem-border)] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <SectionHead eyebrow="Frontier dual mode" title="One appliance. Two ways to work." lead="Protection levels from the actual Quick Mode engine set, and control areas from the real Professional capability list." />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="premium-card h-full p-7 md:p-8">
                <span className="premium-badge">Quick Mode · guided setup</span>
                <h3 className="mt-4 flex items-center gap-2.5 text-2xl font-bold text-white"><Zap size={22} className="text-[var(--prem-blue)]" />One-click protection</h3>
                <div className="mt-6 space-y-3">
                  {SECURITY_LEVELS.map((level) => (
                    <div key={level.key} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <strong className="text-sm font-bold text-white">{level.label}</strong>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">
                          IDS {level.engines.ids} · IPS {level.engines.ips} · AV {level.engines.antivirus}
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{level.blurb}</p>
                    </div>
                  ))}
                </div>
                <Link href="/frontier/dual-mode" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300">Explore Quick Mode <ArrowRight size={15} /></Link>
              </div>
            </Reveal>
            <Reveal>
              <div className="premium-card h-full border-[rgba(1,111,237,0.25)] bg-gradient-to-br from-[rgba(1,111,237,0.06)] to-transparent p-7 md:p-8">
                <span className="premium-badge">Professional Mode · granular control</span>
                <h3 className="mt-4 flex items-center gap-2.5 text-2xl font-bold text-white"><Cpu size={22} className="text-[var(--prem-blue)]" />Full NGFW control</h3>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {PRO_CAPABILITIES.map((c) => (
                    <li key={c.title} className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                      <strong className="block text-[13px] font-bold text-white">{c.title}</strong>
                      <span className="mt-1 block text-xs leading-relaxed text-slate-500">{c.desc}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/frontier/dual-mode" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300">Explore Professional Mode <ArrowRight size={15} /></Link>
              </div>
            </Reveal>
          </div>
          <Reveal className="mt-8">
            <TiltCard max={3}>
              <div className="premium-card overflow-hidden p-2"><FrontierConsolePreview /></div>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      {/* ══ 7 · TECHNICAL CAPABILITIES (dense technical) ══ */}
      <section id="capabilities" className="relative border-t border-[var(--prem-border)] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <SectionHead eyebrow="Technical capabilities" title="Engineered controls, not marketing bullets." lead="The real Professional capability areas plus the platform facts teams ask about first." />
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[var(--prem-border)] bg-[rgba(11,34,57,0.10)] md:grid-cols-3">
            {PRO_CAPABILITIES.map((c, i) => (
              <div key={c.title} className="bg-[var(--prem-bg-soft)] p-6">
                <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--prem-blue-deep)]">CAP·0{i + 1}</div>
                <h3 className="mt-2 text-base font-bold text-[var(--prem-text)]">{c.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--prem-muted)]">{c.desc}</p>
              </div>
            ))}
          </div>
          <Reveal className="mt-8 flex flex-wrap gap-3">
            <Link href="/frontier/capabilities" className="premium-btn-primary">All Frontier capabilities <ArrowRight size={15} /></Link>
            <Link href="/platform" className="premium-btn-ghost">NGFW architecture</Link>
          </Reveal>
        </div>
      </section>

      {/* ══ 8 · SPEC REQUEST (intentional pending state) ══ */}
      <section id="spec-request" className="prem-cream-soft relative overflow-hidden border-t border-[var(--prem-border)] py-24 md:py-32">
        <div className="premium-glow-orb left-1/2 top-1/2 h-[320px] w-[640px] -translate-x-1/2 -translate-y-1/2 bg-[#016FED]/15" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-6">
          <div className="premium-card grid gap-8 p-8 md:grid-cols-2 md:p-12">
            <div>
              <p className="premium-eyebrow">Technical specifications</p>
              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[var(--prem-text)] md:text-4xl">Need performance data? Request the spec sheet.</h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--prem-muted)]">
                Throughput, sessions, interfaces and dimensions are published per model after validation.
                Pick a model and our team will share the current validated sheet.
              </p>
              <div className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                <Check size={13} className="text-[#15803d]" /> No inflated numbers · validated sheets only
              </div>
            </div>
            <div>
              <p className="premium-panel-label" id="spec-model-label">Select a model</p>
              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4" role="group" aria-labelledby="spec-model-label">
                {APPLIANCES.map((m) => (
                  <button key={m.model} type="button" onClick={() => setSelectedProduct(m)} aria-pressed={selectedProduct.model === m.model}
                    className={`rounded-lg border px-2 py-2.5 font-mono text-xs font-bold transition-colors ${selectedProduct.model === m.model ? "border-[rgba(1,111,237,0.5)] bg-[rgba(1,111,237,0.10)] text-[var(--prem-text)]" : "border-[var(--prem-border)] bg-white text-[var(--prem-muted)] hover:border-[rgba(11,34,57,0.3)] hover:text-[var(--prem-text)]"}`}>
                    {m.model}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/contact" className="premium-btn-primary">Request {selectedProduct.model} specs <ArrowRight size={15} /></Link>
                <Link href="/products/compare" className="premium-btn-ghost">Compare models</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 9 · DEPLOYMENT PATTERNS (editorial list, no boxes) ══ */}
      <section id="solutions" className="relative border-t border-[var(--prem-border)] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <SectionHead eyebrow="Deployment patterns" title="Built around how your network actually works." lead="Nine patterns, each pointing at its full solution page. Relevant products are tagged from the existing portfolio." />
          <Stagger className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3" gap={0.05}>
            {solutions.map(([number, title, description, slug, products]) => (
              <Item key={title}>
                <Link href={`/solutions/${slug}`} className="group flex h-full flex-col border-t border-[var(--prem-border)] py-7">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs text-slate-600">{number}</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--prem-blue)]/70">{products}</span>
                  </div>
                  <span className="mt-3 text-lg font-bold text-[var(--prem-text)] transition-colors group-hover:text-[var(--prem-blue)]">{title}</span>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--prem-muted)]"><span className="text-slate-500">Problem · </span>{description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--prem-blue-deep)]">Explore solution <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></span>
                </Link>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ══ 10 · PROOF ══ */}
      <section id="customers" className="prem-cream-soft relative border-t border-[var(--prem-border)] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <SectionHead eyebrow="Proof" title="Trusted across India." lead="SecuEdge Frontier protects 200+ installations across government, education, healthcare, manufacturing, media, hospitality and technology." />
          <Reveal className="mt-6 flex flex-wrap gap-2">
            <span className="premium-chip !text-[11px]">200+ installations</span>
            {COVERAGE.regions.map((r) => (
              <span key={r} className="premium-chip !text-[11px]">Sales coverage · {r} India</span>
            ))}
            <span className="premium-chip !text-[11px]">Channel partners pan-India</span>
          </Reveal>
          <Reveal className="mt-8">
            <CustomerMarquee />
          </Reveal>
          <Stagger className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4" gap={0.05}>
            {CUSTOMER_GROUPS.map((group) => (
              <Item key={group}>
                <div className="h-full border-t border-[var(--prem-border)] py-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">{group}</p>
                  <ul className="mt-3 space-y-2.5">
                    {CUSTOMERS.filter((c) => c.group === group).map((c) => (
                      <li key={c.name} className="flex items-center gap-2.5">
                        {c.logo ? (
                          <Image src={c.logo} alt={`${c.name} logo`} width={72} height={24} className="customer-logo h-4 w-auto max-w-[4.5rem] object-contain" loading="lazy" />
                        ) : null}
                        <span className="text-[13px] font-semibold text-[var(--prem-text)]">{c.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Item>
            ))}
          </Stagger>
          <Reveal className="mt-8">
            <Link href="/customers" className="premium-btn-ghost">See our customers <ArrowRight size={15} /></Link>
          </Reveal>
        </div>
      </section>

      {/* ══ 11 · BUILT IN INDIA (split, no boxes) ══ */}
      <section className="prem-navy relative border-t border-[var(--prem-border)] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <div className="premium-section-head">
                <p className="premium-eyebrow">Made in India</p>
                <h2 className="premium-section-title">Built in India. Your data stays here.</h2>
                <p className="premium-section-lead">{SITE.companyLine}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="premium-chip !text-[11px]">Engineered in India</span>
                <span className="premium-chip !text-[11px]">DPDP Act 2023</span>
                <span className="premium-chip !text-[11px]">No overseas routing</span>
              </div>
            </Reveal>
            <Stagger className="grid gap-x-10 sm:grid-cols-2" gap={0.06}>
              {INDIA_POINTS.map((point, i) => (
                <Item key={point.title}>
                  <div className="h-full border-t border-[var(--prem-border)] py-6">
                    <div className="font-mono text-[10px] tracking-[0.2em] text-slate-600">0{i + 1}</div>
                    <h3 className="mt-2 flex items-start gap-2 text-base font-bold text-[var(--prem-text)]"><Check size={16} className="mt-0.5 shrink-0 text-[var(--prem-blue)]" />{point.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--prem-muted)]">{point.desc}</p>
                  </div>
                </Item>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ══ 12 · SUPPORT + COVERAGE ══ */}
      <section className="relative border-t border-[var(--prem-border)] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <SectionHead eyebrow="Support that answers" title="We compete on what happens the morning after something goes wrong." lead="Our India-based engineers are available 24/7 and know SecuEdge Frontier inside out, so you never have to explain your setup to an overseas queue." />
          <Reveal className="mt-10">
            <div className="premium-card p-7 md:p-8">
              <div className="flex flex-wrap gap-2">
                {SUPPORT.facts.map((fact) => (
                  <span key={fact} className="premium-chip">
                    {fact === SUPPORT.phone ? <Phone size={13} className="text-cyan-300" /> : <Check size={13} className="text-emerald-300" />}{fact}
                  </span>
                ))}
              </div>
              <p className="mt-5 flex max-w-3xl items-start gap-2 text-sm leading-relaxed text-slate-400">
                <MapPin size={15} className="mt-0.5 shrink-0 text-cyan-300" />{COVERAGE.line}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={SUPPORT.phoneHref} className="premium-btn-primary"><Phone size={15} /> Call {SUPPORT.phone}</a>
                <Link href="/contact" className="premium-btn-ghost">Talk to our team</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 13 · INDUSTRIES ══ */}
      <section className="relative border-t border-[var(--prem-border)] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <SectionHead eyebrow="Industries" title="Made for the way your sector works." lead="Eight priority sectors, each with its own page. Every deployment starts from the same SecuEdge Frontier appliance." />
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.05}>
            {INDUSTRIES.map((industry) => (
              <Item key={industry.name}>
                <Link href={industry.href} className="premium-product-card group" style={{ "--prem-accent": "#016fed" } as React.CSSProperties}>
                  <span className="premium-product-icon"><industry.icon size={20} /></span>
                  <h3 className="mt-4 text-lg font-bold tracking-tight text-white">{industry.name}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{industry.sub}</p>
                  <ul className="mt-3.5 space-y-1.5">
                    {controlsFor(industry.card).map((control) => (
                      <li key={control} className="flex items-start gap-2 text-[12px] leading-snug text-slate-400">
                        <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-[#016fed]" aria-hidden />
                        {control}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3.5 flex items-start gap-1.5 text-[11.5px] leading-snug text-slate-500">
                    <ShieldCheck size={12} className="mt-[2px] shrink-0 text-cyan-300/70" aria-hidden />
                    {industry.regulation}
                  </p>
                  <p className="mt-3 border-t border-white/[0.07] pt-3 font-mono text-[10px] leading-relaxed tracking-wide text-slate-500"><span className="text-cyan-300/70">REF · </span>{industry.ref}</p>
                  <span className="mt-4 inline-flex flex-1 items-end gap-1.5 text-sm font-semibold text-cyan-300">Explore <ArrowRight size={14} className="premium-link-arrow" /></span>
                </Link>
              </Item>
            ))}
          </Stagger>
          <Reveal>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href="/industries" className="premium-btn-ghost">All {ALL_INDUSTRIES.length} industries <ArrowRight size={15} /></Link>
              <p className="text-sm text-[var(--prem-muted)]">Not listed? The same appliance covers every sector.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 14 · INDIA FIRST · COMPLIANCE ══ */}
      <section className="prem-cream-soft relative border-t border-[var(--prem-border)] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <SectionHead
            eyebrow="India first"
            title="Indian regulation, supported by design."
            lead="Frontier's controls map to what Indian regulators expect: data that stays in India, sensitive systems kept apart, threats blocked and logs you can export. Compliance remains your responsibility — we make the network part easier."
          />
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.05}>
            {INDIA_FRAMEWORKS.map((framework) => (
              <Item key={framework.name}>
                <div className="premium-card flex h-full flex-col p-6">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--prem-blue)]">{framework.name}</p>
                  <p className="mt-2 text-sm font-bold leading-snug text-[var(--prem-text)]">{framework.desc}</p>
                  <ul className="mt-4 space-y-2">
                    {framework.items.map((control) => (
                      <li key={control} className="flex items-start gap-2 text-[13px] leading-snug text-[var(--prem-muted)]">
                        <Check size={13} className="mt-[3px] shrink-0 text-[var(--prem-blue)]" aria-hidden />
                        {control}
                      </li>
                    ))}
                  </ul>
                </div>
              </Item>
            ))}
          </Stagger>
          {INTERNATIONAL_FRAMEWORK ? (
            <Reveal>
              <div className="premium-card mt-4 flex flex-col items-start gap-2 p-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-3">
                <p className="text-sm font-bold text-[var(--prem-text)]">{INTERNATIONAL_FRAMEWORK.name}</p>
                <p className="w-full text-[13px] leading-relaxed text-[var(--prem-muted)] sm:w-auto sm:flex-1">
                  {INTERNATIONAL_FRAMEWORK.desc}. Also helps with{" "}
                  {INTERNATIONAL_FRAMEWORK.items
                    .map((item) => item.replace(/^The same controls help with /, "").replace(/ requirements$/, ""))
                    .join(", ")}{" "}
                  requirements.
                </p>
              </div>
            </Reveal>
          ) : null}
          <Reveal>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href="/compliance" className="premium-btn-primary">See how the controls map <ArrowRight size={15} /></Link>
              <Link href="/trust" className="premium-btn-ghost">Trust and data residency</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 15 · COMPANY TEASER ══ */}
      <section className="relative border-t border-[var(--prem-border)] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="premium-eyebrow mx-auto">Our story</p>
              <h2 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-[var(--prem-text)] md:text-5xl">Started by two people who kept seeing the same problem.</h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--prem-muted)]">
                SecuEdge was founded in 2025 in Gurugram by Sagar Dalal, a cybersecurity researcher and
                ethical hacker, and Manoj Kuniyal, who spent over 20 years in technology sales. One saw good
                firewalls set up wrongly. The other saw why. Together they built SecuEdge Frontier.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="premium-card mx-auto mt-10 flex max-w-3xl flex-col items-center gap-2 p-7 text-center md:p-8">
              <p className="text-4xl font-extrabold tracking-tight text-[var(--prem-blue)] md:text-5xl">{MISCONFIG_STAT.figure}</p>
              <p className="max-w-2xl text-sm leading-relaxed text-[var(--prem-muted)] md:text-base">{MISCONFIG_STAT.line}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">{MISCONFIG_STAT.source}</p>
            </div>
          </Reveal>
          <Stagger className="mx-auto mt-4 grid max-w-3xl gap-4 sm:grid-cols-2" gap={0.06}>
            {FOUNDERS.map((founder) => (
              <Item key={founder.name}>
                <div className="premium-card h-full p-6 text-left">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--prem-blue)]">{founder.role}</p>
                  <p className="mt-2 text-lg font-bold tracking-tight text-[var(--prem-text)]">{founder.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--prem-muted)]">{founder.note}</p>
                </div>
              </Item>
            ))}
          </Stagger>
          <Reveal>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <span className="premium-chip"><MapPin size={13} />{HEADQUARTERS}</span>
              <span className="premium-chip"><Rocket size={13} />Founded 2025</span>
              <span className="premium-chip"><ShieldCheck size={13} />Made in India</span>
              <span className="premium-chip"><Globe2 size={13} />200+ installations across India</span>
              <span className="premium-chip"><Phone size={13} />24/7 toll-free <a href={SUPPORT.phoneHref} className="font-semibold text-[var(--prem-blue)]">{SUPPORT.phone}</a></span>
            </div>
          </Reveal>
          <Reveal>
            <div className="mt-8 text-center">
              <Link href="/about" className="premium-btn-ghost">Read our story <ArrowRight size={15} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 16 · FINAL CTA ══ */}
      <section id="cta" className="prem-navy relative overflow-hidden border-t border-[var(--prem-border)] py-24 md:py-32">
        <div className="premium-grid-bg absolute inset-0" aria-hidden />
        <div className="premium-glow-orb left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 bg-[#016FED]/20" aria-hidden />
        <div className="relative mx-auto max-w-[1200px] px-6">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="premium-eyebrow mx-auto">Talk to SecuEdge</p>
              <h2 className="mt-4 text-4xl font-bold leading-[1.03] tracking-tight text-[var(--prem-text)] md:text-6xl">See how easy the secure setup can be.</h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--prem-muted)]">
                Tell us about your sites, users and traffic. We will help you choose the right product
                for your network and plan the rollout.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="premium-btn-primary">Book a free demo <ArrowRight size={16} /></Link>
                <Link href="/assessment" className="premium-btn-ghost">Take the assessment</Link>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                <span className="premium-chip"><Boxes size={13} />{HOME_PRODUCTS.length} product families</span>
                <span className="premium-chip"><ShieldCheck size={13} />Edge-to-insight coverage</span>
                <span className="premium-chip"><Phone size={13} />Toll-free <a href={SUPPORT.phoneHref} className="font-semibold text-[var(--prem-blue)]">{SUPPORT.phone}</a></span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
