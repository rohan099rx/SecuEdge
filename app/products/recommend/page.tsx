import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { ProductRecommendationWizard } from "@/components/ProductRecommendationWizard";
import { Reveal } from "@/components/motion";
import { PremiumFaq } from "@/components/premium/PremiumSections";
import { SIZING_STEPS, SIZING_EXAMPLE } from "@/lib/site";
import "@/components/premium/premium.css";

export const metadata: Metadata = buildMetadata({ title: "SecuEdge Frontier model finder", description: "Two questions, sized by users — find your SecuEdge Frontier model. Full specifications are available on request.", path: "/products/recommend", brand: "SecuEdge" });

export default function ProductRecommendationPage() {
  return <div className="premium">
    <div className="mx-auto w-full max-w-[1200px] px-6 pt-8">
      <nav className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500" aria-label="Breadcrumb">
        <Link href="/products" className="transition-colors hover:text-white">Products</Link>
        <ChevronRight size={12} />
        <Link href="/products/frontier" className="transition-colors hover:text-white">SecuEdge Frontier</Link>
        <ChevronRight size={12} />
        <span className="text-slate-300">Model finder</span>
      </nav>
    </div>
    <section className="relative overflow-hidden">
      <div className="premium-grid-bg absolute inset-0" aria-hidden />
      <div className="relative mx-auto w-full max-w-[1200px] px-6 py-16 md:py-24">
        <Reveal>
          <p className="premium-eyebrow">SecuEdge Frontier · Model finder</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-[1.0] tracking-tight text-white md:text-6xl">Shortlist the SE series.</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">Two questions, sized by users — not features. Final model selection is confirmed with our team.</p>
        </Reveal>
      </div>
    </section>
    <section className="border-t border-white/[0.07] py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <div className="premium-card p-6 md:p-8"><ProductRecommendationWizard /></div>
        </Reveal>
        <Reveal className="mt-6">
          <div className="premium-card p-6 md:p-8">
            <p className="premium-eyebrow">How sizing works</p>
            <ol className="mt-4 grid gap-3 md:grid-cols-2">
              {SIZING_STEPS.map((step, i) => (
                <li key={step} className="flex items-start gap-3 text-sm leading-relaxed text-slate-400">
                  <span className="font-mono text-xs text-cyan-300/70">{String(i + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="mt-4 text-[13px] leading-relaxed text-slate-500"><strong className="text-white">Worked example:</strong> {SIZING_EXAMPLE}</p>
          </div>
        </Reveal>
      </div>
    </section>

    <PremiumFaq
      eyebrow="Model finder · FAQ"
      faqs={[
        { q: "Can we get performance figures?", a: "Full specifications are available on request." },
        { q: "Do all models run both modes?", a: "Yes. Every SecuEdge Frontier model runs Quick Mode and Professional Mode." },
        { q: "What if our count is above the largest model?", a: "We will design a configuration with you. Talk to our team." },
      ]}
    />
  </div>;
}
