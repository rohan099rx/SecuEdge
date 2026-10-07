import type { Metadata } from "next";
import { ArrowRight, ShieldCheck, Eye, Globe2, Layers3, ListTree, Waypoints } from "lucide-react";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { EcosystemDirectory } from "@/components/EcosystemDirectory";
import { APPLIANCES, SECUEDGE_PRODUCTS } from "@/lib/site";
import { Reveal, Stagger, Item } from "@/components/motion";
import { TiltCard } from "@/components/TiltCard";
import "@/components/premium/premium.css";

export const metadata: Metadata = buildMetadata({ title: "SecuEdge products", description: "Explore the six SecuEdge security and networking product families, including the complete Frontier NGFW model portfolio.", path: "/products", brand: "SecuEdge" });

const PRODUCT_ICONS = {
  frontier: ShieldCheck,
  watchtower: Eye,
  secuweb: Globe2,
  grid: Layers3,
  secudefend: Waypoints,
  muster: ListTree,
} as const;

export default function ProductsPage() {
  return <div className="premium">
    <section className="relative overflow-hidden">
      <div className="premium-grid-bg absolute inset-0" aria-hidden />
      <div className="premium-glow-orb right-[12%] top-[8%] h-[320px] w-[320px] bg-[#016FED]/20" aria-hidden />
      <div className="relative mx-auto w-full max-w-[1200px] px-6 py-20 md:py-28">
        <Reveal>
          <p className="premium-eyebrow">SecuEdge · Product ecosystem</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-[1.0] tracking-tight text-white md:text-6xl">Security infrastructure for the network edge.</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">Six product families with distinct operational roles — then the complete Frontier NGFW hardware portfolio of {APPLIANCES.length} models.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="#product-families" className="premium-btn-primary">Explore products <ArrowRight size={16} /></Link>
            <Link href="/products/frontier" className="premium-btn-ghost">Explore Frontier <ArrowRight size={15} /></Link>
          </div>
          <p className="mt-6 flex items-center gap-2 text-xs text-slate-500"><ShieldCheck size={15} className="text-emerald-300" />Six available product families · Frontier model specifications available on request</p>
        </Reveal>
      </div>
    </section>

    <section id="product-families" className="border-t border-white/[0.07] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <p className="premium-eyebrow">SecuEdge platform</p>
          <h2 className="premium-section-title mt-4">Choose the capability you need.</h2>
          <p className="premium-section-lead">Each product has a distinct role in the security and networking system. Product pages explain the supported story without inventing technical specifications.</p>
        </Reveal>
        <Stagger className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3" gap={0.06}>
          {SECUEDGE_PRODUCTS.map((product, index) => {
            const Icon = PRODUCT_ICONS[product.key as keyof typeof PRODUCT_ICONS];
            return (
            <Item key={product.key}>
              <TiltCard max={5} className="h-full">
                <Link href={product.href} className="premium-product-card" style={{ "--prem-accent": product.accent } as React.CSSProperties}>
                  <div className="flex items-center justify-between">
                    <span className="premium-product-icon"><Icon size={20} /></span>
                    <span className="font-mono text-xs text-slate-600">0{index + 1} / {product.category.toUpperCase()}</span>
                  </div>
                  <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">{product.name}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{product.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300">Explore {product.name} <ArrowRight size={15} /></span>
                </Link>
              </TiltCard>
            </Item>
            );
          })}
        </Stagger>
      </div>
    </section>

    <section id="product-directory" className="border-t border-white/[0.07] bg-white/[0.015] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <p className="premium-eyebrow">Frontier hardware catalog</p>
          <h2 className="premium-section-title mt-4">Find your place in the SE series.</h2>
          <p className="premium-section-lead">Filter the lineup by chassis and indicative deployment band. Confirm throughput, ports and deployment fit with SecuEdge.</p>
        </Reveal>
        <Reveal className="mt-10">
          <div className="premium-card p-5 md:p-7"><EcosystemDirectory /></div>
        </Reveal>
        <Reveal className="mt-8">
          <div className="premium-card flex flex-col items-start gap-4 p-7 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="premium-eyebrow">Compare the range</p>
              <h3 className="mt-2 text-xl font-bold text-white">See all eleven models together.</h3>
              <p className="mt-1 text-sm text-slate-400">Form factor and verified fields side by side; the rest available on request.</p>
            </div>
            <Link href="/products/compare" className="premium-btn-primary shrink-0">Compare Frontier models <ArrowRight size={16} /></Link>
          </div>
        </Reveal>
      </div>
    </section>
  </div>;
}
