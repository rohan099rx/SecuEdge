import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { ProductRecommendationWizard } from "@/components/ProductRecommendationWizard";
import { Reveal } from "@/components/motion";
import "@/components/premium/premium.css";

export const metadata: Metadata = buildMetadata({ title: "Frontier model finder", description: "Shortlist Frontier NGFW appliance models by hardware format and indicative deployment band.", path: "/products/recommend", brand: "SecuEdge" });

export default function ProductRecommendationPage() {
  return <div className="premium">
    <div className="mx-auto w-full max-w-[1200px] px-6 pt-8">
      <nav className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500" aria-label="Breadcrumb">
        <Link href="/products" className="transition-colors hover:text-white">Products</Link>
        <ChevronRight size={12} />
        <Link href="/products/frontier" className="transition-colors hover:text-white">Frontier</Link>
        <ChevronRight size={12} />
        <span className="text-slate-300">Model finder</span>
      </nav>
    </div>
    <section className="relative overflow-hidden">
      <div className="premium-grid-bg absolute inset-0" aria-hidden />
      <div className="relative mx-auto w-full max-w-[1200px] px-6 py-16 md:py-24">
        <Reveal>
          <p className="premium-eyebrow">Frontier · Model finder</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-[1.0] tracking-tight text-white md:text-6xl">Shortlist the SE series.</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">Choose an indicative deployment band and preferred chassis to see relevant Frontier models. Final model selection requires a specification and traffic review.</p>
        </Reveal>
      </div>
    </section>
    <section className="border-t border-white/[0.07] py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <div className="premium-card p-6 md:p-8"><ProductRecommendationWizard /></div>
        </Reveal>
      </div>
    </section>
  </div>;
}
