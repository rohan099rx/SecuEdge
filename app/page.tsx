"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowRight, ArrowUpRight, Check, ShieldCheck, Eye, Globe2, Layers3, ListTree,
  Waypoints, Zap, LockKeyhole, Network, Activity, Server, Building2, Cpu,
  GitBranch, FileSearch, BellRing, Route as RouteIcon, Boxes,
} from "lucide-react";
import { SecurityFlow } from "@/components/foundation/SecurityFlow";
import {
  APPLIANCES, CUSTOMERS, SECUEDGE_PRODUCTS, SECURITY_LEVELS, PRO_CAPABILITIES, CERTIFICATIONS,
} from "@/lib/site";
import { FrontierConsolePreview } from "@/components/FrontierConsolePreview";
import { FrontierModelViewer } from "@/components/FrontierModelViewer";
import { CustomerShowcase } from "@/components/CustomerShowcase";
import { Reveal, Stagger, Item, CountUp, Parallax } from "@/components/motion";
import { TiltCard } from "@/components/TiltCard";
import { ScrollProgress } from "@/components/premium/ScrollProgress";
import "@/components/premium/premium.css";

const PremiumHero3D = dynamic(
  () => import("@/components/premium/PremiumHero3D").then((m) => m.PremiumHero3D),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_35%,rgba(1,111,237,0.12),transparent_55%)]" /> }
);

const PremiumFlow3D = dynamic(
  () => import("@/components/premium/PremiumFlow3D").then((m) => m.PremiumFlow3D),
  { ssr: false, loading: () => <div className="h-[300px] w-full animate-pulse rounded-2xl bg-[#0B2239]/[0.04] md:h-[340px]" /> }
);

const PRODUCT_ICONS = {
  frontier: ShieldCheck,
  watchtower: Eye,
  secuweb: Globe2,
  grid: Layers3,
  secudefend: Waypoints,
  muster: ListTree,
} as const;

/* Existing solution slugs — hrefs unchanged (duplication fix belongs to Phase 3 routes). */
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

/* Portfolio order for the ecosystem flow visual (portfolio grouping, not an integration claim). */
const ECOSYSTEM_FLOW = ["SecuWeb", "Frontier", "SecuDefend", "Watchtower", "Grid", "Muster"] as const;

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

/* Distinct CSS visual metaphors per product — no new WebGL canvases. */
function ProductVisual({ productKey }: { productKey: string }) {
  if (productKey === "frontier") {
    return (
      <div className="premium-panel p-6" aria-label="Frontier traffic inspection illustration">
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
      <div className="premium-panel p-6" aria-label="Watchtower topology illustration">
        <p className="premium-panel-label">Network topology · illustrative</p>
        <svg viewBox="0 0 400 170" className="mt-4 w-full" role="img" aria-label="Hub with connected nodes">
          {[[200, 85], [60, 40], [110, 130], [290, 130], [340, 40], [250, 30]].map(([x, y], i) => (
            <g key={i}>
              {i > 0 && <line x1={200} y1={85} x2={x} y2={y} stroke="#016FED" strokeOpacity={0.45} strokeWidth={1.5} />}
              <circle cx={x} cy={y} r={i === 0 ? 14 : 7} fill={i === 0 ? "#016FED" : "#0B2239"} fillOpacity={i === 0 ? 1 : 0.85} stroke="#EFECE4" strokeWidth={2} />
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
      <div className="premium-panel p-6" aria-label="SecuWeb routing illustration">
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
      <div className="premium-panel p-6" aria-label="Grid event correlation illustration">
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
      <div className="premium-panel p-6" aria-label="SecuDefend interception illustration">
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
    <div className="premium-panel p-6" aria-label="Muster log analysis illustration">
      <p className="premium-panel-label">Log intelligence · illustrative</p>
      <div className="mt-4 rounded-lg border border-[rgba(11,34,57,0.12)] bg-[#EFECE4] p-4 font-mono text-[11px] leading-[1.9] text-slate-400">
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

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState(APPLIANCES[0]);
  const [heroActive, setHeroActive] = useState(true);
  const [flowActive, setFlowActive] = useState(false);

  useEffect(() => {
    const el = document.getElementById("premium-hero");
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setHeroActive(e.isIntersecting), { threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = document.getElementById("flow-3d");
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setFlowActive(e.isIntersecting), { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const desktopModels = APPLIANCES.filter((a) => a.formFactor === "Desktop");
  const rackModels = APPLIANCES.filter((a) => a.formFactor === "Rack-mount" && a.tier !== "High-scale");
  const highScaleModels = APPLIANCES.filter((a) => a.tier === "High-scale");

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
            <p className="premium-eyebrow">SecuEdge · Network security platform</p>
            <h1 className="mt-5 text-[2.75rem] font-extrabold leading-[1.0] tracking-[-0.035em] text-white sm:text-6xl md:text-7xl">
              Network security, visibility, and control.
              <span className="mt-2 block bg-gradient-to-r from-[#0B2239] to-[#016FED] bg-clip-text text-2xl font-semibold tracking-tight text-transparent md:text-3xl">India&apos;s homegrown next-generation firewall.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
              Frontier protects the edge in two modes teams actually use — guided Quick Mode for everyday
              operations, Professional Mode for network engineers. Five companion products cover monitoring,
              connectivity, response and log intelligence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="premium-btn-primary">Explore all products <ArrowRight size={16} /></Link>
              <Link href="/contact" className="premium-btn-ghost">Talk to SecuEdge <ArrowUpRight size={15} /></Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {["NGFW", "NMS", "SD-WAN", "SIEM / SOAR", "IPS / IDS", "Log Analyzer"].map((t) => (
                <span key={t} className="premium-chip !text-[11px]">{t}</span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6">
              <div><div className="text-2xl font-bold text-white"><CountUp to={SECUEDGE_PRODUCTS.length} /></div><div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Product families</div></div>
              <div><div className="text-2xl font-bold text-white"><CountUp to={APPLIANCES.length} /></div><div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Frontier models</div></div>
              <div><div className="text-2xl font-bold text-white"><CountUp to={2} /></div><div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Operating modes</div></div>
            </div>
          </div>

          <TiltCard max={6} className="relative">
            <div className="premium-card overflow-hidden p-6">
              <div className="flex items-center justify-between">
                <span className="premium-badge premium-badge--live">Live control plane</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">{SECUEDGE_PRODUCTS.length} systems</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                {SECUEDGE_PRODUCTS.map((p, i) => {
                  const Icon = PRODUCT_ICONS[p.key as keyof typeof PRODUCT_ICONS];
                  return (
                    <Link key={p.key} href={p.href} className="group rounded-xl border border-white/10 bg-white/[0.03] p-3.5 transition-colors hover:border-cyan-400/40 hover:bg-cyan-400/[0.06]">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-cyan-300"><Icon size={15} /></span>
                        <span className="font-mono text-[10px] text-slate-500">0{i + 1}</span>
                      </div>
                      <div className="mt-2.5 text-sm font-bold text-white">{p.name}</div>
                      <div className="truncate text-[11px] text-slate-500">{p.category}</div>
                    </Link>
                  );
                })}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-center">
                {[["Event flow", "Active"], ["Network state", "Observable"], ["Policy layer", "Enforced"]].map(([k, v]) => (
                  <div key={k}><div className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">{k}</div><div className="mt-0.5 text-xs font-bold text-emerald-300">{v}</div></div>
                ))}
              </div>
            </div>
          </TiltCard>
        </div>
        <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">Scroll</div>
      </section>

      <div className="premium-divider mx-auto max-w-[1200px]" />

      {/* ══ 2 · PLATFORM ══ */}
      <section id="platform-story" className="relative py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <SectionHead eyebrow="Breaking down the system" title="One portfolio across network, security, and intelligence." lead="Five responsibilities, six products. This is how the portfolio maps to the work — a grouping of the product family, not a claim about internal integrations." />
          <Stagger className="mt-12 grid gap-3 md:grid-cols-5" gap={0.05}>
            {[
              ["Network", "Connectivity paths between sites, cloud and data centers.", [Globe2, RouteIcon]],
              ["Security", "Policy enforcement and inspection at the edge.", [ShieldCheck, LockKeyhole]],
              ["Visibility", "Health and state of infrastructure and devices.", [Eye, Activity]],
              ["Intelligence", "Events correlated into response workflows.", [Layers3, BellRing]],
              ["Control", "Logs retained, searchable, and auditable.", [FileSearch, ListTree]],
            ].map(([title, desc, icons]) => (
              <Item key={title as string}>
                <div className="premium-card h-full p-5">
                  <div className="flex gap-1.5">
                    {(icons as typeof Globe2[]).map((Icon, i) => (
                      <span key={i} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-cyan-300"><Icon size={15} /></span>
                    ))}
                  </div>
                  <h3 className="mt-3 text-base font-bold text-white">{title as string}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{desc as string}</p>
                </div>
              </Item>
            ))}
          </Stagger>
          <Reveal className="mt-8">
            <div className="premium-panel flex flex-wrap items-center gap-x-3 gap-y-2 px-5 py-4">
              <span className="premium-panel-label">Portfolio flow</span>
              <span className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-300">
                {ECOSYSTEM_FLOW.map((name, i) => (
                  <span key={name} className="flex items-center gap-2">
                    <Link href={`/products/${name.toLowerCase() === "frontier" ? "frontier" : name.toLowerCase() === "secuweb" ? "secuweb" : name.toLowerCase() === "watchtower" ? "watchtower" : name.toLowerCase() === "grid" ? "grid" : name.toLowerCase() === "secudefend" ? "secudefend" : "muster"}`} className="rounded-md border border-white/10 px-2.5 py-1 transition-colors hover:border-cyan-400/40 hover:text-white">{name}</Link>
                    {i < ECOSYSTEM_FLOW.length - 1 && <ArrowRight size={12} className="text-slate-600" />}
                  </span>
                ))}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="premium-divider mx-auto max-w-[1200px]" />

      {/* ══ 3 · SECURITY FLOW (main visual moment) ══ */}
      <section id="security-flow" className="prem-navy relative overflow-hidden py-24 md:py-32">
        <div className="premium-glow-orb left-[10%] top-[20%] h-[360px] w-[360px] bg-[#016FED]/20" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-6">
          <SectionHead eyebrow="Traffic → decision" title="Every packet earns its passage." lead="Traffic enters, gets inspected against policy, meets detection, and receives a decision — forward to a secure destination or block. Watch the path below." />
          <Reveal className="mt-12">
            <div id="flow-3d" className="premium-card overflow-hidden p-4 md:p-6">
              <PremiumFlow3D active={flowActive} />
              <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Packets traverse inspect → policy → decide gates · illustrative</p>
            </div>
          </Reveal>
          <Reveal className="mt-6">
            <TiltCard max={3}>
              <div className="premium-card overflow-hidden p-4 md:p-6"><SecurityFlow /></div>
            </TiltCard>
          </Reveal>
          <Stagger className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-6" gap={0.04}>
            {["Traffic", "Inspection", "Policy", "Detection", "Decision", "Destination"].map((s, i) => (
              <Item key={s}>
                <div className="premium-panel px-3 py-3 text-center">
                  <div className="font-mono text-[10px] text-slate-600">0{i + 1}</div>
                  <div className="mt-0.5 text-xs font-bold text-slate-200">{s}</div>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <div className="premium-divider mx-auto max-w-[1200px]" />

      {/* ══ 4 · PRODUCT ECOSYSTEM ══ */}
      <section id="ecosystem" className="relative py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <SectionHead eyebrow="Product ecosystem" title="Six products. One portfolio." lead="Each family owns a distinct operational role. Together they cover the edge-to-insight chain for modern networks." />
          <Stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3" gap={0.06}>
            {SECUEDGE_PRODUCTS.map((p, i) => {
              const Icon = PRODUCT_ICONS[p.key as keyof typeof PRODUCT_ICONS];
              return (
                <Item key={p.key}>
                  <TiltCard max={5} className="h-full">
                    <Link href={p.href} className="premium-product-card" style={{ "--prem-accent": p.accent } as React.CSSProperties}>
                      <div className="flex items-center justify-between">
                        <span className="premium-product-icon"><Icon size={20} /></span>
                        <span className="font-mono text-xs text-slate-600">0{i + 1}</span>
                      </div>
                      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em]" data-accent-text style={{ color: p.accent }}>{p.category}</p>
                      <h3 className="mt-1.5 text-2xl font-bold tracking-tight text-white">{p.name}</h3>
                      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-400">{p.desc}</p>
                      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300">Explore product <ArrowRight size={14} /></span>
                    </Link>
                  </TiltCard>
                </Item>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ══ 5 · PRODUCT DEEP DIVES ══ */}
      <section id="deep-dives" className="relative border-t border-white/[0.07] bg-white/[0.015] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <SectionHead eyebrow="Inside the portfolio" title="What each product actually does." lead="Same data as the product pages — compressed into one scroll. Each family gets its own visual language." />
          <div className="mt-12 space-y-5">
            {SECUEDGE_PRODUCTS.map((p, i) => {
              const Icon = PRODUCT_ICONS[p.key as keyof typeof PRODUCT_ICONS];
              const reversed = i % 2 === 1;
              return (
                <Reveal key={p.key}>
                  <article className={["premium-card grid gap-6 overflow-hidden p-7 md:p-9 lg:grid-cols-2", i % 2 === 1 && "prem-navy"].filter(Boolean).join(" ")}>
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

      {/* ══ 6 · APPLIANCE SHOWROOM ══ */}
      <section id="products" className="relative border-t border-white/[0.07] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <SectionHead eyebrow="Appliance showroom" title="Desktop → rack → high-scale." lead="Eleven Frontier models running one operating experience — Quick Mode for everyday work, Professional Mode for engineers." />
          <div className="mt-10 grid gap-5 lg:grid-cols-[380px_1fr]">
            <div className="premium-card max-h-[600px] overflow-y-auto p-2.5">
              {[
                ["Desktop edge", desktopModels],
                ["Professional rack", rackModels],
                ["High-scale", highScaleModels],
              ].map(([group, models]) => (
                <div key={group as string} className="mb-1">
                  <p className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">{group as string}</p>
                  {(models as typeof APPLIANCES).map((product) => (
                    <button key={product.model} type="button" onClick={() => setSelectedProduct(product)} aria-pressed={selectedProduct.model === product.model}
                      className={["premium-model-btn", selectedProduct.model === product.model && "is-active"].filter(Boolean).join(" ")}>
                      <span className="flex items-center justify-between">
                        <span className="font-mono text-base font-bold text-white">{product.model}</span>
                        <span className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-slate-400">{product.formFactor}</span>
                      </span>
                      <span className="mt-1 block text-xs text-slate-500">{product.tier} (indicative band) · Quick + Professional Mode</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
            <div className="premium-card overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Frontier · hardware view</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300">{selectedProduct.model} · {selectedProduct.formFactor}</span>
              </div>
              <div className="min-h-[420px] bg-[radial-gradient(ellipse_at_50%_40%,rgba(1,111,237,0.14),transparent_60%)]">
                <FrontierModelViewer model={selectedProduct.model} formFactor={selectedProduct.formFactor} tier={selectedProduct.tier} />
              </div>
              <div className="border-t border-white/10 px-5 py-4">
                <div className="grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] sm:grid-cols-2">
                  {[["Form factor", selectedProduct.formFactor, "Verified"], ["Operating modes", "Quick + Professional", "Included"], ["Deployment band", `${selectedProduct.tier} (indicative)`, "Guide"], ["Technical specifications", "Full spec sheet", "On request"]].map(([k, v, s]) => (
                    <div key={k} className="bg-[#070d18] px-4 py-3">
                      <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">{k}</div>
                      <div className="mt-1 flex items-center justify-between gap-2 text-sm font-semibold text-white">{v}<span className="font-mono text-[9px] uppercase tracking-widest text-emerald-300/80">{s}</span></div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href={`/products/frontier/${selectedProduct.model.toLowerCase()}`} className="premium-btn-primary !min-h-[2.6rem] !text-[13px]">View {selectedProduct.model} <ArrowRight size={14} /></Link>
                  <Link href="/products/compare" className="premium-btn-ghost !min-h-[2.6rem] !text-[13px]">Compare family</Link>
                  <Link href="/contact" className="premium-btn-ghost !min-h-[2.6rem] !text-[13px]">Request specifications</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 7 · DUAL MODE (real data) ══ */}
      <section id="modes" className="prem-navy relative border-t border-white/[0.07] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <SectionHead eyebrow="Frontier dual mode" title="One appliance. Two ways to work." lead="Protection levels from the actual Quick Mode engine set, and control areas from the real Professional capability list." />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="premium-card h-full p-7 md:p-8">
                <span className="premium-badge">Quick Mode · guided setup</span>
                <h3 className="mt-4 flex items-center gap-2.5 text-2xl font-bold text-white"><Zap size={22} className="text-cyan-300" />One-click protection</h3>
                <div className="mt-6 space-y-3">
                  {SECURITY_LEVELS.map((level) => (
                    <div key={level.key} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <div className="flex items-center justify-between">
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
              <div className="premium-card h-full border-cyan-400/20 bg-gradient-to-br from-cyan-400/[0.06] to-transparent p-7 md:p-8">
                <span className="premium-badge">Professional Mode · granular control</span>
                <h3 className="mt-4 flex items-center gap-2.5 text-2xl font-bold text-white"><Cpu size={22} className="text-indigo-300" />Full NGFW control</h3>
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

      {/* ══ 8 · CAPABILITIES (dense technical) ══ */}
      <section id="platform" className="relative border-t border-white/[0.07] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <SectionHead eyebrow="Technical capabilities" title="Engineered controls, not marketing bullets." lead="The real Professional capability areas plus the platform facts teams ask about first." />
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] md:grid-cols-3">
            {PRO_CAPABILITIES.map((c, i) => (
              <div key={c.title} className="bg-[#070d18] p-6">
                <div className="font-mono text-[10px] tracking-[0.2em] text-cyan-300/70">CAP·0{i + 1}</div>
                <h3 className="mt-2 text-base font-bold text-white">{c.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">{c.desc}</p>
              </div>
            ))}
          </div>
          <Reveal className="mt-6 flex flex-wrap items-center gap-2">
            <span className="premium-badge premium-badge--live">Dual-mode included</span>
            {CERTIFICATIONS.map((c) => (
              <span key={c.name} className="premium-badge" title={c.note}>{c.name}</span>
            ))}
          </Reveal>
          <Reveal className="mt-6 flex flex-wrap gap-3">
            <Link href="/frontier/capabilities" className="premium-btn-primary">All Frontier capabilities <ArrowRight size={15} /></Link>
            <Link href="/platform" className="premium-btn-ghost">NGFW architecture</Link>
          </Reveal>
        </div>
      </section>

      {/* ══ 9 · SPEC REQUEST (intentional pending state) ══ */}
      <section id="spec-request" className="prem-cream-soft relative overflow-hidden border-t border-white/[0.07] py-24 md:py-32">
        <div className="premium-glow-orb left-1/2 top-1/2 h-[320px] w-[640px] -translate-x-1/2 -translate-y-1/2 bg-[#016FED]/15" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-6">
          <div className="premium-card grid gap-8 p-8 md:grid-cols-2 md:p-12">
            <div>
              <p className="premium-eyebrow">Technical specifications</p>
              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">Need performance data? Request the spec sheet.</h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
                Throughput, sessions, interfaces and dimensions are published per model after validation.
                Pick a model and our team will share the current validated sheet.
              </p>
              <div className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                <Check size={13} className="text-emerald-300" /> No inflated numbers · validated sheets only
              </div>
            </div>
            <div>
              <label htmlFor="spec-model" className="premium-panel-label">Select a model</label>
              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {APPLIANCES.map((m) => (
                  <button key={m.model} type="button" onClick={() => setSelectedProduct(m)} aria-pressed={selectedProduct.model === m.model}
                    className={`rounded-lg border px-2 py-2.5 font-mono text-xs font-bold transition-colors ${selectedProduct.model === m.model ? "border-cyan-400/50 bg-cyan-400/10 text-white" : "border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/25 hover:text-white"}`}>
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

      {/* ══ 10 · SOLUTIONS ══ */}
      <section id="solutions" className="relative border-t border-white/[0.07] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <SectionHead eyebrow="Deployment patterns" title="Built around how your network actually works." lead="Nine patterns, each pointing at its full solution page. Relevant products are tagged from the existing portfolio." />
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.05}>
            {solutions.map(([number, title, description, slug, products]) => (
              <Item key={title}>
                <Link href={`/solutions/${slug}`} className="premium-card group flex h-full flex-col p-7">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-slate-600">{number}</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-cyan-300/70">{products}</span>
                  </div>
                  <span className="mt-3 flex items-center gap-2 text-lg font-bold text-white"><Server size={17} className="text-cyan-300/70" />{title}</span>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400"><span className="text-slate-500">Problem · </span>{description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300">Explore solution <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></span>
                </Link>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ══ 11 · CUSTOMERS (verified only) ══ */}
      <section id="customers" className="prem-cream-soft relative border-t border-white/[0.07] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="premium-ticker mb-8 justify-center gap-3 opacity-80" aria-label="Customer logo strip">
            {CUSTOMERS.filter((c) => c.logo).slice(0, 8).map((c) => (
              <span key={c.name} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5">
                <Image src={c.logo!} alt="" width={72} height={24} className="h-4 w-auto object-contain brightness-0 invert" loading="lazy" />
                <span className="text-[11px] font-semibold text-slate-400">{c.name}</span>
              </span>
            ))}
          </div>
          <CustomerShowcase />
        </div>
      </section>

      {/* ══ 12 · FINAL CTA ══ */}
      <section id="cta" className="prem-navy relative overflow-hidden border-t border-white/[0.07] py-24 md:py-32">
        <div className="premium-grid-bg absolute inset-0" aria-hidden />
        <div className="premium-glow-orb left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 bg-[#016FED]/20" aria-hidden />
        <div className="relative mx-auto max-w-[1200px] px-6">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="premium-eyebrow mx-auto">Deploy Frontier</p>
              <h2 className="mt-4 text-4xl font-bold leading-[1.03] tracking-tight text-white md:text-6xl">Put a SecuEdge appliance on your edge.</h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-400">
                Tell us about your sites, users and traffic. We will size the right SE-series model,
                confirm the validated spec sheet, and plan Quick or Professional Mode rollout.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="premium-btn-primary">Request a sizing call <ArrowRight size={16} /></Link>
                <Link href="/products/compare" className="premium-btn-ghost">Compare SE-series</Link>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                <span className="premium-chip"><GitBranch size={13} />11 models · SE20 → SE15000P</span>
                <span className="premium-chip"><Cpu size={13} />Quick + Professional Mode</span>
                <span className="premium-chip"><Boxes size={13} />Desktop · Rack-mount</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
