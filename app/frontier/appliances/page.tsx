import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ChevronRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { APPLIANCES } from "@/lib/site";
import { ApplianceShowcase } from "@/components/ApplianceShowcase";
import { Reveal } from "@/components/motion";
import "@/components/premium/premium.css";

export const metadata: Metadata = buildMetadata({
  title: "Frontier appliances — the SE-series",
  description:
    "The SecuEdge Frontier appliance family, from the SE20 to the SE15000P — desktop and rack-mount (P) models sized from branch offices to high-scale networks.",
  path: "/frontier/appliances",
});

const TIERS = ["Branch / small office", "Mid-market", "Enterprise", "High-scale"] as const;

export default function AppliancesPage() {
  return (
    <div className="premium">
      <div className="mx-auto w-full max-w-[1200px] px-6 pt-8">
        <nav className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500" aria-label="Breadcrumb">
          <Link href="/products" className="transition-colors hover:text-white">Products</Link>
          <ChevronRight size={12} />
          <Link href="/products/frontier" className="transition-colors hover:text-white">Frontier</Link>
          <ChevronRight size={12} />
          <span className="text-slate-300">Appliances</span>
        </nav>
      </div>

      <section className="relative overflow-hidden">
        <div className="premium-grid-bg absolute inset-0" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-6 py-16 md:py-24">
          <Reveal>
            <p className="premium-eyebrow">Purpose-built hardware</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-[1.0] tracking-tight text-white md:text-6xl">One appliance family, sized to your network.</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
              Frontier runs on purpose-built hardware — from the compact SE20 to the SE15000P. Models
              ending in <strong className="text-white">P</strong> are Professional, rack-mountable units.
              Every model runs both Quick and Professional modes.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="premium-chip">Desktop edge · SE20 · SE50 · SE50P</span>
              <span className="premium-chip">Professional rack · SE100P → SE15000P</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/[0.07] py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Reveal>
            <div className="premium-card overflow-hidden p-2"><ApplianceShowcase /></div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/[0.07] bg-white/[0.015] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          {TIERS.map((tier) => {
            const rows = APPLIANCES.filter((a) => a.tier === tier);
            if (rows.length === 0) return null;
            return (
              <Reveal key={tier}>
                <div className="mb-10">
                  <h2 className="text-lg font-bold text-white">{tier}</h2>
                  <div className="mt-4 overflow-x-auto rounded-2xl border border-white/10">
                    <table className="w-full min-w-[40rem] text-left text-sm">
                      <thead className="bg-white/[0.03] font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                        <tr>
                          <th className="px-4 py-3 font-medium">Model</th>
                          <th className="px-4 py-3 font-medium">Form factor</th>
                          <th className="px-4 py-3 font-medium">Deployment band</th>
                          <th className="px-4 py-3 font-medium">Technical data</th>
                        </tr>
                      </thead>
                      <tbody className="bg-[#070d18]">
                        {rows.map((a) => (
                          <tr key={a.model} className="border-t border-white/[0.07]">
                            <td className="px-4 py-3 font-semibold text-white"><Link href={`/products/frontier/${a.model.toLowerCase()}`} className="transition-colors hover:text-cyan-300">SecuEdge Frontier {a.model}</Link></td>
                            <td className="px-4 py-3 text-slate-400">{a.formFactor}</td>
                            <td className="px-4 py-3 text-slate-400">{a.tier} · indicative</td>
                            <td className="px-4 py-3 text-emerald-300/90">Available on request</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Reveal>
            );
          })}

          <Reveal>
            <div className="premium-card p-6">
              <p className="text-sm leading-relaxed text-slate-400">
                <strong className="text-white">Sizing note:</strong> deployment bands are indicative
                lineup groupings, not capacity guarantees. Throughput, port counts and recommended
                user/device ranges require the approved model datasheet. Use the model finder for a
                preliminary shortlist, then confirm fit with SecuEdge.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products/recommend" className="premium-btn-primary">Open model finder <ArrowRight size={15} /></Link>
              <Link href="/contact" className="premium-btn-ghost">Get sizing help</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
