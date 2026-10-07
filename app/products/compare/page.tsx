import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { CompareSelector } from "@/components/CompareSelector";
import { Reveal } from "@/components/motion";
import "@/components/premium/premium.css";

export const metadata: Metadata = buildMetadata({ title: "Compare Frontier models", description: "Compare all eleven SecuEdge Frontier NGFW models, known form factors and technical specification availability.", path: "/products/compare", brand: "SecuEdge" });

export default function CompareProductsPage() {
  return <div className="premium">
    <div className="mx-auto w-full max-w-[1200px] px-6 pt-8">
      <nav className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500" aria-label="Breadcrumb">
        <Link href="/products" className="transition-colors hover:text-white">Products</Link>
        <ChevronRight size={12} />
        <Link href="/products/frontier" className="transition-colors hover:text-white">Frontier</Link>
        <ChevronRight size={12} />
        <span className="text-slate-300">Compare</span>
      </nav>
    </div>

    <section className="relative overflow-hidden">
      <div className="premium-grid-bg absolute inset-0" aria-hidden />
      <div className="relative mx-auto w-full max-w-[1200px] px-6 py-16 md:py-24">
        <Reveal>
          <p className="premium-eyebrow">Frontier · Model selector + comparison</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-[1.0] tracking-tight text-white md:text-6xl">Compare the SE series — honestly.</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
            Published hardware details are shown where confirmed; technical measurements remain
            available on request. “P” identifies the rack-mount Professional chassis.
          </p>
          <Link href="/products/recommend" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300">Find a model shortlist <ArrowRight size={15} /></Link>
        </Reveal>
      </div>
    </section>

    <section className="border-t border-white/[0.07] py-14 md:py-20">
      <CompareSelector />
    </section>
  </div>;
}
