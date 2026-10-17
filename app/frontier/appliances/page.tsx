import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ChevronRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { APPLIANCES, CUSTOM_APPLIANCE, SIZING_STEPS, SIZING_EXAMPLE } from "@/lib/site";
import { ApplianceShowcase } from "@/components/ApplianceShowcase";
import { Reveal } from "@/components/motion";
import { PremiumFaq } from "@/components/premium/PremiumSections";
import "@/components/premium/premium.css";

export const metadata: Metadata = buildMetadata({
  title: "SecuEdge Frontier appliances — every feature, on every model",
  description:
    "All SecuEdge Frontier models run the same software with the identical feature set. Choose by how many people use your network — desktop and rack-mount models, plus custom designs for larger sites.",
  path: "/frontier/appliances",
});

export default function AppliancesPage() {
  return (
    <div className="premium">
      <div className="mx-auto w-full max-w-[1200px] px-6 pt-8">
        <nav className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500" aria-label="Breadcrumb">
          <Link href="/products" className="transition-colors hover:text-white">Products</Link>
          <ChevronRight size={12} />
          <Link href="/products/frontier" className="transition-colors hover:text-white">SecuEdge Frontier</Link>
          <ChevronRight size={12} />
          <span className="text-slate-300">Appliances</span>
        </nav>
      </div>

      <section className="relative overflow-hidden">
        <div className="premium-grid-bg absolute inset-0" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-6 py-16 md:py-24">
          <Reveal>
            <p className="premium-eyebrow">Purpose-built hardware</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-[1.0] tracking-tight text-white md:text-6xl">Every feature, on every model.</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
              All SecuEdge Frontier models run the same software with the identical feature set. Choose by
              how many people use your network at the busiest time, not by features. SE20 and SE50 are
              desktop units; models ending in P are rack-mount.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="premium-chip">Desktop · SE20 · SE50</span>
              <span className="premium-chip">Rack-mount · SE100P · SE250P · SE500P · SE750P · SE1000P</span>
              <span className="premium-chip">Larger sites · Custom design</span>
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
          <Reveal>
            <p className="premium-eyebrow">Sizing table</p>
            <h2 className="premium-section-title mt-4">Sized by users, not features.</h2>
            <p className="premium-section-lead">Peak users at the busiest hour. Full specifications are available on request.</p>
          </Reveal>
          <Reveal className="mt-8">
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full min-w-[44rem] text-left text-sm">
                <thead className="bg-white/[0.03] font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-medium">Model</th>
                    <th className="px-4 py-3 font-medium">Form factor</th>
                    <th className="px-4 py-3 font-medium">Peak users</th>
                    <th className="px-4 py-3 font-medium">Typical site</th>
                    <th className="px-4 py-3 font-medium">Full specifications</th>
                  </tr>
                </thead>
                <tbody className="bg-[#070d18]">
                  {APPLIANCES.map((a) => (
                    <tr key={a.model} className="border-t border-white/[0.07]">
                      <td className="px-4 py-3 font-semibold text-white"><Link href={`/products/frontier/${a.model.toLowerCase()}`} className="transition-colors hover:text-cyan-300">SecuEdge Frontier {a.model}</Link></td>
                      <td className="px-4 py-3 text-slate-400">{a.formFactor}</td>
                      <td className="px-4 py-3 font-mono text-slate-200">{a.userRange}</td>
                      <td className="px-4 py-3 text-slate-400">{a.typicalSite}</td>
                      <td className="px-4 py-3 text-emerald-300/90">Available on request</td>
                    </tr>
                  ))}
                  <tr className="border-t border-white/[0.07]">
                    <td className="px-4 py-3 font-semibold text-white">Custom</td>
                    <td className="px-4 py-3 text-slate-400">—</td>
                    <td className="px-4 py-3 font-mono text-slate-200">{CUSTOM_APPLIANCE.userRange}</td>
                    <td className="px-4 py-3 text-slate-400">{CUSTOM_APPLIANCE.typicalSite}</td>
                    <td className="px-4 py-3 text-emerald-300/90"><Link href="/contact" className="transition-colors hover:text-cyan-300">Talk to our team</Link></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal className="mt-8">
            <div className="premium-card p-6 md:p-8">
              <p className="premium-eyebrow">How to size your network</p>
              <ol className="mt-4 grid gap-3 md:grid-cols-2">
                {SIZING_STEPS.map((step, i) => (
                  <li key={step} className="flex items-start gap-3 text-sm leading-relaxed text-slate-400">
                    <span className="font-mono text-xs text-cyan-300/70">{String(i + 1).padStart(2, "0")}</span>
                    {step}
                  </li>
                ))}
              </ol>
              <p className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-[13px] leading-relaxed text-slate-400">
                <strong className="text-white">Worked example:</strong> {SIZING_EXAMPLE}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products/recommend" className="premium-btn-primary">Find your model <ArrowRight size={15} /></Link>
              <Link href="/contact" className="premium-btn-ghost">Get sizing help</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <PremiumFaq
        eyebrow="Appliances · FAQ"
        faqs={[
          { q: "How do I choose a model?", a: "Choose by how many people use your network at the busiest time, counting each VPN user three times. Use the model finder or ask our team." },
          { q: "Can we get performance figures?", a: "Full specifications are available on request." },
          { q: "What if we are above 1,300 users?", a: "We will design a configuration with you. Talk to our team." },
          { q: "Do all models run both modes?", a: "Yes. Every model runs Quick Mode and Professional Mode, switching with one toggle. Neither is a cut-down product." },
          { q: "Where is our data kept?", a: "In India, by default. Traffic, logs and policy data stay on Indian soil, with no overseas routing." },
        ]}
      />
    </div>
  );
}
