"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowRight, ArrowUpRight, ShieldCheck, Eye, Globe2, Layers3, ListTree,
  Waypoints, Phone, LockKeyhole, Activity, Server, BellRing, FileSearch,
  Boxes, Route as RouteIcon, Check, MapPin,
  GraduationCap, HeartPulse, Landmark, Banknote, Factory, Store, Coffee, Rocket,
} from "lucide-react";
import {
  CUSTOMERS, CUSTOMER_GROUPS, HOME_PRODUCTS, STATUS_LABEL,
  SUPPORT, COVERAGE, MISCONFIG_STAT, SITE,
} from "@/lib/site";
import { CustomerMarquee } from "@/components/CustomerMarquee";
import { Reveal, Stagger, Item, Parallax } from "@/components/motion";
import { TiltCard } from "@/components/TiltCard";
import { ScrollProgress } from "@/components/premium/ScrollProgress";
import "@/components/premium/premium.css";

const PremiumHero3D = dynamic(
  () => import("@/components/premium/PremiumHero3D").then((m) => m.PremiumHero3D),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_35%,rgba(1,111,237,0.12),transparent_55%)]" /> }
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

/* Industry cards — hero subheads and approved references (copy deck §15). */
const INDUSTRIES = [
  { name: "Education", ref: "The Shri Ram School · NDIM · St. Bede's", href: "/industries/education", icon: GraduationCap, sub: "Protect students online, keep Wi-Fi under control and separate admin, lab and student networks, without a full-time security team." },
  { name: "Healthcare", ref: "Bombay Hospital · Shanti Devi GI Institute", href: "/industries/healthcare", icon: HeartPulse, sub: "Separate medical devices, billing and guest Wi-Fi, block threats before they reach clinical systems and stay online when a line fails." },
  { name: "Government", ref: "Kisan Call Centre", href: "/industries/government", icon: Landmark, sub: "Made in India, with citizen data kept in India, strict outbound controls and complete audit logs." },
  { name: "Banking and finance", ref: "References on request", href: "/industries/finance", icon: Banknote, sub: "Default-deny outbound rules, phishing blocking, separate sensitive zones and audit evidence your regulator expects to see." },
  { name: "Manufacturing", ref: "KNL Driveline · Sain Packaging", href: "/industries/manufacturing", icon: Factory, sub: "Separate machine networks from office networks, control contractor access and block ransomware before it reaches the shop floor." },
  { name: "Retail", ref: "Closest ref: Chaayos (multi-outlet)", href: "/industries/retail", icon: Store, sub: "Keep billing systems separate, give customers safe Wi-Fi and set up each store correctly with Quick Mode." },
  { name: "Hospitality", ref: "Chaayos", href: "/industries/hospitality", icon: Coffee, sub: "Give guests fast, fair Wi-Fi with a login page while keeping them away from billing and property systems." },
  { name: "SMB and startups", ref: "Solis Technology · Eleet Mindz · Natsav", href: "/industries/technology", icon: Rocket, sub: "No security team? No problem. Quick Mode lets you set up SecuEdge Frontier correctly, and every feature comes on every model." },
] as const;

const INDIA_POINTS = [
  { title: "Designed and built in India.", desc: "Hardware, firmware and software engineered and quality-checked in India, not a foreign platform under an Indian label." },
  { title: "Data stays in India.", desc: "Traffic, logs and policy data stay on Indian soil by default, with no overseas routing." },
  { title: "Built with the DPDP Act 2023 in mind.", desc: "Data protection is designed in, not added later." },
  { title: "No import dependency.", desc: "No exposure to export restrictions or overseas logistics." },
] as const;

export default function HomePage() {
  const [heroActive, setHeroActive] = useState(true);

  useEffect(() => {
    const el = document.getElementById("premium-hero");
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setHeroActive(e.isIntersecting), { threshold: 0 });
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
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                {HOME_PRODUCTS.map((p, i) => {
                  const Icon = PRODUCT_ICONS[p.key as keyof typeof PRODUCT_ICONS];
                  return (
                    <Link key={p.key} href={p.href} className="group rounded-xl border border-white/10 bg-white/[0.03] p-3.5 transition-colors hover:border-cyan-400/40 hover:bg-cyan-400/[0.06]">
                      <div className="flex items-center justify-between">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-cyan-300"><Icon size={15} /></span>
                        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">{STATUS_LABEL[p.status]}</span>
                      </div>
                      <div className="mt-2.5 text-sm font-bold text-white">{p.name}</div>
                      <div className="truncate text-[11px] text-slate-500">{p.category}</div>
                    </Link>
                  );
                })}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-center">
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

      {/* ══ 2 · THE PROBLEM ══ */}
      <section id="why-secured" className="relative py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="premium-eyebrow mx-auto">Why breaches happen</p>
              <p className="mt-6 font-mono text-sm font-bold uppercase tracking-[0.2em] text-slate-500">{MISCONFIG_STAT.figure} of firewall breaches</p>
              <h2 className="mt-3 text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
                start with a setting, not a hacker.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">{MISCONFIG_STAT.line} Traditional firewalls are built for specialists, and most organisations do not have one on call. The result is a good firewall, set up wrongly.</p>
              <p className="mt-8 font-serif text-2xl italic text-white md:text-3xl">Complexity is the vulnerability.</p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">{MISCONFIG_STAT.source}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="premium-divider mx-auto max-w-[1200px]" />

      {/* ══ 3 · PLATFORM ══ */}
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
        </div>
      </section>

      <div className="premium-divider mx-auto max-w-[1200px]" />

      {/* ══ 4 · PRODUCT ECOSYSTEM (6 products + roadmap status) ══ */}
      <section id="ecosystem" className="relative py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <SectionHead eyebrow="Product ecosystem" title="Six products. One portfolio." lead="Each family owns a distinct operational role. Together they cover the edge-to-insight chain — SecuEdge Frontier ships today, the first of seven, with SecuConnect and the rest following on the same appliances and console." />
          <Stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3" gap={0.06}>
            {HOME_PRODUCTS.map((p, i) => {
              const Icon = PRODUCT_ICONS[p.key as keyof typeof PRODUCT_ICONS];
              return (
                <Item key={p.key}>
                  <TiltCard max={5} className="h-full">
                    <Link href={p.href} className="premium-product-card" style={{ "--prem-accent": p.accent } as React.CSSProperties}>
                      <div className="flex items-center justify-between">
                        <span className="premium-product-icon"><Icon size={20} /></span>
                        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">{STATUS_LABEL[p.status]}</span>
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
          <Reveal className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/products" className="premium-btn-primary">See the full roadmap <ArrowRight size={15} /></Link>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Same appliances + console · no dates</span>
          </Reveal>
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

      {/* ══ 6 · PROOF ══ */}
      <section id="customers" className="prem-cream-soft relative border-t border-white/[0.07] py-24 md:py-32">
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
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.05}>
            {CUSTOMER_GROUPS.map((group) => (
              <Item key={group}>
                <div className="premium-card h-full p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">{group}</p>
                  <ul className="mt-3 space-y-2.5">
                    {CUSTOMERS.filter((c) => c.group === group).map((c) => (
                      <li key={c.name} className="flex items-center gap-2.5">
                        {c.logo ? (
                          <Image src={c.logo} alt={`${c.name} logo`} width={72} height={24} className="customer-logo h-4 w-auto max-w-[4.5rem] object-contain" loading="lazy" />
                        ) : null}
                        <span className="text-[13px] font-semibold text-slate-300">{c.name}</span>
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

      {/* ══ 7 · BUILT IN INDIA ══ */}
      <section className="prem-navy relative border-t border-white/[0.07] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <SectionHead eyebrow="Made in India" title="Built in India. Your data stays here." lead={SITE.companyLine} />
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2" gap={0.06}>
            {INDIA_POINTS.map((point, i) => (
              <Item key={point.title}>
                <div className="premium-card flex h-full items-start gap-4 p-6">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-cyan-300"><Check size={17} /></span>
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.2em] text-slate-600">0{i + 1}</div>
                    <h3 className="mt-1 text-base font-bold text-white">{point.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{point.desc}</p>
                  </div>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ══ 8 · SUPPORT + COVERAGE ══ */}
      <section className="relative border-t border-white/[0.07] py-24 md:py-32">
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

      {/* ══ 9 · INDUSTRIES ══ */}
      <section className="relative border-t border-white/[0.07] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <SectionHead eyebrow="Industries" title="Made for the way your sector works." lead="Eight priority sectors, each with its own page. Every deployment starts from the same SecuEdge Frontier appliance." />
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.05}>
            {INDUSTRIES.map((industry) => (
              <Item key={industry.name}>
                <Link href={industry.href} className="premium-product-card group" style={{ "--prem-accent": "#016fed" } as React.CSSProperties}>
                  <span className="premium-product-icon"><industry.icon size={20} /></span>
                  <h3 className="mt-4 text-lg font-bold tracking-tight text-white">{industry.name}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{industry.sub}</p>
                  <p className="mt-3 border-t border-white/[0.07] pt-3 font-mono text-[10px] leading-relaxed tracking-wide text-slate-500"><span className="text-cyan-300/70">REF · </span>{industry.ref}</p>
                  <span className="mt-4 inline-flex flex-1 items-end gap-1.5 text-sm font-semibold text-cyan-300">Explore <ArrowRight size={14} className="premium-link-arrow" /></span>
                </Link>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ══ 10 · COMPANY TEASER ══ */}
      <section className="relative border-t border-white/[0.07] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="premium-eyebrow mx-auto">Our story</p>
              <h2 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl">Started by two people who kept seeing the same problem.</h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
                SecuEdge was founded in 2025 in Gurugram by Sagar Dalal, a cybersecurity researcher and
                ethical hacker, and Manoj Kuniyal, who spent over 20 years in technology sales. One saw good
                firewalls set up wrongly. The other saw why. Together they built SecuEdge Frontier.
              </p>
              <div className="mt-8">
                <Link href="/about" className="premium-btn-ghost">Read our story <ArrowRight size={15} /></Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 11 · FINAL CTA ══ */}
      <section id="cta" className="prem-navy relative overflow-hidden border-t border-white/[0.07] py-24 md:py-32">
        <div className="premium-grid-bg absolute inset-0" aria-hidden />
        <div className="premium-glow-orb left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 bg-[#016FED]/20" aria-hidden />
        <div className="relative mx-auto max-w-[1200px] px-6">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="premium-eyebrow mx-auto">Talk to SecuEdge</p>
              <h2 className="mt-4 text-4xl font-bold leading-[1.03] tracking-tight text-white md:text-6xl">See how easy the secure setup can be.</h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-400">
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
                <span className="premium-chip"><Phone size={13} />Toll-free <a href={SUPPORT.phoneHref} className="font-semibold text-cyan-300">{SUPPORT.phone}</a></span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
