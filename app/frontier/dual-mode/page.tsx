import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ChevronRight, Zap, Cpu } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { FrontierConsolePreview } from "@/components/FrontierConsolePreview";
import { SECURITY_LEVELS, PRO_CAPABILITIES } from "@/lib/site";
import { Reveal, Stagger, Item } from "@/components/motion";
import "@/components/premium/premium.css";

export const metadata: Metadata = buildMetadata({
  title: "Dual Mode — one firewall for everyone",
  description:
    "Quick Mode for the people who run the business. Professional Mode for the engineers who need full control. Same appliance, same hardware — one toggle.",
  path: "/frontier/dual-mode",
});

export default function DualModePage() {
  return (
    <div className="premium">
      <div className="mx-auto w-full max-w-[1200px] px-6 pt-8">
        <nav className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500" aria-label="Breadcrumb">
          <Link href="/products" className="transition-colors hover:text-white">Products</Link>
          <ChevronRight size={12} />
          <Link href="/products/frontier" className="transition-colors hover:text-white">Frontier</Link>
          <ChevronRight size={12} />
          <span className="text-slate-300">Dual Mode</span>
        </nav>
      </div>

      <section className="relative overflow-hidden">
        <div className="premium-grid-bg absolute inset-0" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-6 py-16 md:py-24">
          <Reveal>
            <p className="premium-eyebrow">The core idea</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-[1.0] tracking-tight text-white md:text-6xl">Dual Mode — one firewall for everyone.</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
              The console transforms with the mode. The same appliance can be run by a business owner
              in plain language, or by a network engineer with the full depth of an enterprise NGFW.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/[0.07] py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Reveal>
            <div className="premium-card overflow-hidden p-2"><FrontierConsolePreview /></div>
            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Interactive preview · switch Quick / Professional above</p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/[0.07] bg-white/[0.015] py-20 md:py-28">
        <div className="mx-auto grid w-full max-w-[1200px] gap-5 px-6 lg:grid-cols-2">
          <Reveal>
            <div className="premium-card h-full p-7 md:p-8">
              <span className="premium-badge"><Zap size={12} /> Quick Mode</span>
              <h2 className="mt-4 text-2xl font-bold text-white">For the people who run the business.</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Big, plain-language controls. No CLI, no rule syntax, no networking degree. Every page
                works the same way: pick from a few clearly-explained options, set, and save.
              </p>
              <div className="mt-6 space-y-2.5">
                {SECURITY_LEVELS.map((level, i) => (
                  <div key={level.key} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <div className="flex items-center justify-between gap-2">
                      <strong className="text-sm font-bold text-white">0{i + 1} · {level.label}</strong>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">IDS {level.engines.ids} · IPS {level.engines.ips} · AV {level.engines.antivirus}</span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{level.blurb}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="premium-card h-full border-cyan-400/20 bg-gradient-to-br from-cyan-400/[0.06] to-transparent p-7 md:p-8">
              <span className="premium-badge"><Cpu size={12} /> Professional Mode</span>
              <h2 className="mt-4 text-2xl font-bold text-white">For the engineers who need full control.</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Granular firewall &amp; NAT, VLAN segmentation, dynamic routing (OSPF/BGP), SD-WAN and
                VPN overlays, an active IDPS engine, SNMP, diagnostics and a command line.
              </p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {PRO_CAPABILITIES.map((c) => (
                  <li key={c.title} className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                    <strong className="block text-[13px] font-bold text-white">{c.title}</strong>
                    <span className="mt-1 block text-xs leading-relaxed text-slate-500">{c.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Reveal>
            <p className="mt-8 text-[13px] text-slate-500">Note: every Frontier appliance runs both modes regardless of model or form factor.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/contact" className="premium-btn-primary">Get a Demo <ArrowRight size={15} /></Link>
              <Link href="/frontier/appliances" className="premium-btn-ghost">Browse appliances</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
