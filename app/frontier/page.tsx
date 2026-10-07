import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ChevronRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Reveal, Stagger, Item } from "@/components/motion";
import { FrontierHero } from "@/components/FrontierHero";
import { ExplodedFirewallClient } from "@/components/ExplodedFirewallClient";
import "@/components/premium/premium.css";

export const metadata: Metadata = buildMetadata({
  title: "SecuEdge Frontier — the NGFW",
  description:
    "SecuEdge Frontier is a next-generation firewall with Dual Mode: Quick Mode for the business, Professional Mode for engineers. Enterprise security, made simple.",
  path: "/frontier",
});

const PILLARS = [
  { title: "Dual Mode", desc: "Quick Mode for the business, Professional Mode for engineers — one appliance, one toggle.", href: "/frontier/dual-mode" },
  { title: "Safe Environment Filter", desc: "Real-time safeguarding that alerts the right person when someone may be at risk.", href: "/frontier/safe-environment" },
  { title: "Professional capabilities", desc: "Firewall/NAT, VLAN, OSPF/BGP, SD-WAN, IDPS, CLI — the depth of an enterprise NGFW.", href: "/frontier/capabilities" },
  { title: "The appliance family", desc: "SE20 to SE15000P — desktop and rack-mount, branch to high-scale.", href: "/frontier/appliances" },
];

const SEQUENCE = ["Network traffic", "Security inspection", "Policy", "Decision", "Block / Allow"] as const;

export default function FrontierPage() {
  return (
    <div className="premium">
      <FrontierHero />
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <div className="premium-panel flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4">
            <span className="premium-panel-label">Inside the firewall</span>
            <span className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-300">
              {SEQUENCE.map((s, i) => (
                <span key={s} className="flex items-center gap-2">
                  <span className={`rounded-md border px-2.5 py-1 ${i === SEQUENCE.length - 1 ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : i === 0 ? "border-white/10 bg-white/[0.03] text-slate-300" : "border-cyan-400/25 bg-cyan-400/[0.07] text-cyan-200"}`}>{s}</span>
                  {i < SEQUENCE.length - 1 && <ArrowRight size={12} className="text-slate-600" />}
                </span>
              ))}
            </span>
          </div>
        </Reveal>
      </div>
      <ExplodedFirewallClient />

      <section className="border-t border-white/[0.07] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Reveal>
            <nav className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500" aria-label="Breadcrumb">
              <Link href="/products" className="transition-colors hover:text-white">Products</Link>
              <ChevronRight size={12} />
              <span className="text-slate-300">Frontier</span>
            </nav>
            <p className="premium-eyebrow mt-8">Explore Frontier</p>
            <h2 className="premium-section-title mt-4">One appliance family. Two ways to run it.</h2>
            <p className="premium-section-lead">Frontier combines next-generation firewall, IPS/IDS, VPN, SD-WAN and content filtering with a configuration experience anyone can get right the first time.</p>
          </Reveal>
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2" gap={0.06}>
            {PILLARS.map((p) => (
              <Item key={p.href}>
                <Link href={p.href} className="premium-card group flex h-full flex-col p-7">
                  <p className="text-lg font-bold text-white">{p.title}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{p.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300">Learn more <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span>
                </Link>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>
    </div>
  );
}
