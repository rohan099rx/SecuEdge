"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowRight, ArrowUpRight, ShieldCheck, Eye, Globe2, Layers3, ListTree,
  Waypoints, Phone, LockKeyhole, Activity, Server, BellRing, FileSearch,
  Boxes, Route as RouteIcon,
} from "lucide-react";
import { SecurityFlow } from "@/components/foundation/SecurityFlow";
import { CUSTOMERS, CONTACT, HOME_PRODUCTS } from "@/lib/site";
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

/* Icons for the six families shown on the landing page. */
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

export default function HomePage() {
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
              Network security, visibility, and control.
              <span className="mt-2 block bg-gradient-to-r from-[#0B2239] to-[#016FED] bg-clip-text text-2xl font-semibold tracking-tight text-transparent md:text-3xl">India&apos;s homegrown security portfolio.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
              {HOME_PRODUCTS.length} product families cover the edge-to-insight chain — firewall protection,
              network monitoring, secure connectivity, threat detection, event intelligence and log analysis.
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
              <div><div className="text-2xl font-bold text-white"><CountUp to={HOME_PRODUCTS.length} /></div><div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Product families</div></div>
              <div><div className="text-2xl font-bold text-white"><CountUp to={solutions.length} /></div><div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Deployment patterns</div></div>
              <div>
                <a href={CONTACT.phoneHref} className="text-2xl font-bold text-white transition-colors hover:text-cyan-300">{CONTACT.phone}</a>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Toll-free · Talk to us</div>
              </div>
            </div>
          </div>

          <TiltCard max={6} className="relative">
            <div className="premium-card overflow-hidden p-6">
              <div className="flex items-center justify-between">
                <span className="premium-badge premium-badge--live">Product portfolio</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">{HOME_PRODUCTS.length} systems</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                {HOME_PRODUCTS.map((p, i) => {
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
                    <Link href={`/products/${name.toLowerCase()}`} className="rounded-md border border-white/10 px-2.5 py-1 transition-colors hover:border-cyan-400/40 hover:text-white">{name}</Link>
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
            {HOME_PRODUCTS.map((p, i) => {
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

      {/* ══ 5 · SOLUTIONS ══ */}
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

      {/* ══ 6 · CUSTOMERS (verified only) ══ */}
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

      {/* ══ 7 · FINAL CTA ══ */}
      <section id="cta" className="prem-navy relative overflow-hidden border-t border-white/[0.07] py-24 md:py-32">
        <div className="premium-grid-bg absolute inset-0" aria-hidden />
        <div className="premium-glow-orb left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 bg-[#016FED]/20" aria-hidden />
        <div className="relative mx-auto max-w-[1200px] px-6">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="premium-eyebrow mx-auto">Talk to SecuEdge</p>
              <h2 className="mt-4 text-4xl font-bold leading-[1.03] tracking-tight text-white md:text-6xl">Find the right fit for your network.</h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-400">
                Tell us about your sites, users and traffic. We will help you choose the right product
                for your network and plan the rollout.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="premium-btn-primary">Talk to our team <ArrowRight size={16} /></Link>
                <Link href="/products" className="premium-btn-ghost">Explore all products</Link>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                <span className="premium-chip"><Boxes size={13} />{HOME_PRODUCTS.length} product families</span>
                <span className="premium-chip"><ShieldCheck size={13} />Edge-to-insight coverage</span>
                <span className="premium-chip"><Phone size={13} />Toll-free <a href={CONTACT.phoneHref} className="font-semibold text-cyan-300">{CONTACT.phone}</a></span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
