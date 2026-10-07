import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight, ShieldCheck } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { FRONTIER_CAPABILITIES } from "@/data/ecosystem";
import { APPLIANCES, SECUEDGE_PRODUCTS } from "@/lib/site";
import { Reveal, Stagger, Item } from "@/components/motion";
import "@/components/premium/premium.css";

export const metadata: Metadata = buildMetadata({ title: "Frontier NGFW architecture", description: "Explore the SecuEdge Frontier next-generation firewall architecture, edge policy path and available capability areas.", path: "/platform", brand: "SecuEdge" });

const LAYERS = [
  ["Network", "Internet & WAN connections enter through Frontier-controlled paths."],
  ["Security", "Firewall, NAT and inspection policy decide what may pass."],
  ["Visibility", "Interfaces, zones and device state stay observable."],
  ["Intelligence", "Events correlate into response workflows."],
  ["Control", "Logs, policy and access remain auditable."],
] as const;

export default function PlatformPage() {
  return <div className="premium">
    <div className="mx-auto w-full max-w-[1200px] px-6 pt-8">
      <nav className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500" aria-label="Breadcrumb">
        <Link href="/products" className="transition-colors hover:text-white">Products</Link>
        <ChevronRight size={12} />
        <span className="text-slate-300">Platform architecture</span>
      </nav>
    </div>

    <section className="relative overflow-hidden">
      <div className="premium-grid-bg absolute inset-0" aria-hidden />
      <div className="relative mx-auto w-full max-w-[1200px] px-6 py-16 md:py-24">
        <Reveal>
          <p className="premium-eyebrow">SecuEdge · Frontier architecture</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-[1.0] tracking-tight text-white md:text-6xl">Policy starts at the edge.</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">SecuEdge Frontier is the NGFW product family for controlling network paths, inspecting traffic and helping teams manage their security boundary.</p>
          <p className="mt-5 flex items-center gap-2 text-xs text-slate-500"><ShieldCheck size={15} className="text-emerald-300" />Frontier NGFW · {APPLIANCES.length} SE-series models</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/frontier/appliances" className="premium-btn-primary">Browse {APPLIANCES.length} models <ArrowRight size={15} /></Link>
            <Link href="/frontier/capabilities" className="premium-btn-ghost">Capability guide <ArrowRight size={15} /></Link>
          </div>
        </Reveal>
      </div>
    </section>

    <section className="border-t border-white/[0.07] py-20 md:py-28">
      <div className="mx-auto grid w-full max-w-[1200px] items-start gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="premium-eyebrow">Traffic path</p>
          <h2 className="premium-section-title mt-4">From the internet to protected zones.</h2>
          <p className="premium-section-lead">Use this reference path to plan policy placement. The diagram is conceptual; actual interfaces and traffic flow depend on the approved hardware configuration.</p>
        </Reveal>
        <Stagger className="space-y-0" gap={0.05}>
          {["Internet & WAN connections", "Frontier NGFW", "Firewall, NAT and inspection policy", "LAN and segmented network zones", "Approved users, services and devices"].map((item, index) => (
            <Item key={item}>
              <div className="flex items-center gap-4 border-b border-white/[0.07] py-4 last:border-0">
                <span className="font-mono text-xs text-cyan-300/70">0{index + 1}</span>
                <strong className={`text-[15px] font-semibold ${index === 1 ? "text-cyan-200" : "text-white"}`}>{item}</strong>
                {index === 1 && <span className="premium-badge premium-badge--live ml-auto">Inspection point</span>}
              </div>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>

    <section className="border-t border-white/[0.07] bg-white/[0.015] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <p className="premium-eyebrow">Architecture layers</p>
          <h2 className="premium-section-title mt-4">How the portfolio maps to the work.</h2>
          <p className="premium-section-lead">A grouping of responsibilities across the SecuEdge product family — not a claim about internal integrations.</p>
        </Reveal>
        <Stagger className="mt-10 grid gap-3 md:grid-cols-5" gap={0.05}>
          {LAYERS.map(([title, desc], i) => (
            <Item key={title}>
              <div className="premium-card h-full p-5">
                <div className="font-mono text-[10px] text-slate-600">LAYER 0{i + 1}</div>
                <h3 className="mt-2 text-base font-bold text-white">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{desc}</p>
              </div>
            </Item>
          ))}
        </Stagger>
        <Reveal className="mt-8 flex flex-wrap gap-2">
          {SECUEDGE_PRODUCTS.map((p) => (
            <Link key={p.key} href={p.href} className="premium-chip transition-colors hover:border-cyan-400/40 hover:text-white">{p.name} · {p.categoryShort}</Link>
          ))}
        </Reveal>
      </div>
    </section>

    <section className="border-t border-white/[0.07] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <p className="premium-eyebrow">Capability map</p>
          <h2 className="premium-section-title mt-4">Explore Frontier feature areas.</h2>
          <p className="premium-section-lead">Capabilities below describe the current NGFW product story. Exact behavior and availability can depend on configuration and software version.</p>
        </Reveal>
        <Stagger className="mt-10 grid gap-3 md:grid-cols-2" gap={0.05}>
          {FRONTIER_CAPABILITIES.map((capability, index) => (
            <Item key={capability.slug}>
              <article className="premium-card h-full p-6">
                <span className="font-mono text-[10px] tracking-[0.2em] text-cyan-300/70">0{index + 1} / {capability.group.toUpperCase()}</span>
                <h3 className="mt-2 text-lg font-bold text-white">{capability.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{capability.summary}</p>
                <ul className="mt-3 space-y-1.5">{capability.details.map((detail) => <li key={detail} className="flex items-start gap-2 text-[13px] text-slate-300"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-300/70" />{detail}</li>)}</ul>
              </article>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>

    <section className="border-t border-white/[0.07] bg-white/[0.015] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <p className="premium-eyebrow">One firewall · Two operating modes</p>
          <h2 className="premium-section-title mt-4">A mode for everyday setup. A mode for deeper control.</h2>
          <p className="premium-section-lead">Both modes are part of the Frontier experience. The “P” suffix identifies hardware form factor, not Professional Mode.</p>
        </Reveal>
        <Stagger className="mt-10 grid gap-4 md:grid-cols-2" gap={0.06}>
          <Item>
            <Link className="premium-card block p-8" href="/frontier/dual-mode">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300">01 · Simplified workflow</span>
              <h3 className="mt-3 text-2xl font-bold text-white">Quick Mode</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">Clearer, guided workflows for everyday network and security settings.</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300">Explore Quick Mode <ArrowRight size={15} /></span>
            </Link>
          </Item>
          <Item>
            <Link className="premium-card block p-8" href="/frontier/dual-mode">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-indigo-300">02 · Configuration depth</span>
              <h3 className="mt-3 text-2xl font-bold text-white">Professional Mode</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">More detailed controls for network engineers and security administrators.</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300">Explore Professional Mode <ArrowRight size={15} /></span>
            </Link>
          </Item>
        </Stagger>
      </div>
    </section>
  </div>;
}
