import type { Metadata } from "next";
import { ArrowRight, ShieldCheck, Eye, Globe2, Layers3, ListTree, Waypoints, Network } from "lucide-react";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { APPLIANCES, SECUEDGE_PRODUCTS, STATUS_LABEL, CUSTOM_APPLIANCE } from "@/lib/site";
import { Reveal, Stagger, Item } from "@/components/motion";
import { TiltCard } from "@/components/TiltCard";
import "@/components/premium/premium.css";

export const metadata: Metadata = buildMetadata({ title: "SecuEdge products", description: "SecuEdge Frontier is our next-generation firewall, shipping today across India. It is the first of seven SecuEdge products that will share the same appliances and console.", path: "/products", brand: "SecuEdge" });

const PRODUCT_ICONS = {
  frontier: ShieldCheck,
  secuweb: Globe2,
  secudefend: Waypoints,
  grid: Layers3,
  secuconnect: Network,
  watchtower: Eye,
  muster: ListTree,
} as const;

export default function ProductsPage() {
  const frontier = SECUEDGE_PRODUCTS.find((p) => p.key === "frontier")!;
  const roadmap = SECUEDGE_PRODUCTS.filter((p) => p.key !== "frontier");
  const FrontierIcon = PRODUCT_ICONS.frontier;

  return <div className="premium">
    <section className="relative overflow-hidden">
      <div className="premium-grid-bg absolute inset-0" aria-hidden />
      <div className="premium-glow-orb right-[12%] top-[8%] h-[320px] w-[320px] bg-[#016FED]/20" aria-hidden />
      <div className="relative mx-auto w-full max-w-[1200px] px-6 py-20 md:py-28">
        <Reveal>
          <nav className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#526274]" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-[#016FED]">Home</Link>
            <span aria-hidden>/</span>
            <span className="text-[#0B2239]">Products</span>
          </nav>
          <p className="premium-eyebrow mt-8">SecuEdge · Products</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-[1.0] tracking-tight text-white md:text-6xl">SecuEdge Frontier, available now. Six more on the way.</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">SecuEdge Frontier is our next-generation firewall, shipping today across India. It is the first of seven SecuEdge products that will share the same appliances and console.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/products/frontier" className="premium-btn-primary">Explore SecuEdge Frontier <ArrowRight size={16} /></Link>
            <Link href="/products/recommend" className="premium-btn-ghost">Find your model</Link>
          </div>
        </Reveal>
      </div>
    </section>

    <section className="border-t border-white/[0.07] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <div className="premium-card grid gap-8 p-8 md:grid-cols-[auto_1fr_auto] md:items-center md:p-10" style={{ "--prem-accent": frontier.accent } as React.CSSProperties}>
            <span className="premium-product-icon !h-16 !w-16"><FrontierIcon size={30} /></span>
            <div>
              <span className="premium-badge premium-badge--live">{STATUS_LABEL[frontier.status]}</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">{frontier.name}</h2>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">{frontier.category}</p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">{frontier.desc}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href={frontier.href} className="premium-btn-primary">Explore SecuEdge Frontier <ArrowRight size={15} /></Link>
              <Link href="/products/recommend" className="premium-btn-ghost">Find your model</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    <section className="border-t border-white/[0.07] bg-white/[0.015] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <p className="premium-eyebrow">On the roadmap</p>
          <h2 className="premium-section-title mt-4">Six more products, same console.</h2>
          <p className="premium-section-lead">The roadmap products are being built on the same appliances and console as SecuEdge Frontier — no dates have been announced. SecuEdge Frontier already includes VPN, SD-WAN and intrusion prevention on every model; the dedicated products are for organisations that need more scale.</p>
        </Reveal>
        <Stagger className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3" gap={0.06}>
          {roadmap.map((product) => {
            const Icon = PRODUCT_ICONS[product.key as keyof typeof PRODUCT_ICONS];
            return (
              <Item key={product.key}>
                <TiltCard max={5} className="h-full">
                  <Link href={product.href} className="premium-product-card" style={{ "--prem-accent": product.accent } as React.CSSProperties}>
                    <div className="flex items-center justify-between">
                      <span className="premium-product-icon"><Icon size={20} /></span>
                      <span className={["premium-badge", product.status === "available" && "premium-badge--live"].filter(Boolean).join(" ")}>{STATUS_LABEL[product.status]}</span>
                    </div>
                    <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">{product.name}</h2>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">{product.category}</p>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{product.desc}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300">Explore {product.name} <ArrowRight size={15} className="premium-link-arrow" /></span>
                  </Link>
                </TiltCard>
              </Item>
            );
          })}
        </Stagger>
      </div>
    </section>

    <section id="frontier-models" className="border-t border-white/[0.07] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <p className="premium-eyebrow">SecuEdge Frontier models</p>
          <h2 className="premium-section-title mt-4">Every feature, on every model.</h2>
          <p className="premium-section-lead">
            All SecuEdge Frontier models run the same software with the identical feature set. Choose by how many
            people use your network at the busiest time, not by features. SE20 and SE50 are desktop units; models
            ending in P are rack-mount. Larger sites get a custom design.
          </p>
        </Reveal>
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.04}>
          {APPLIANCES.map((model) => (
            <Item key={model.model}>
              <TiltCard max={4} className="h-full">
                <Link
                  href={`/products/frontier/${model.model.toLowerCase()}`}
                  className="premium-product-card"
                  style={{ "--prem-accent": "#016fed" } as React.CSSProperties}
                >
                  <div className="flex items-center justify-between">
                    <span className="premium-product-icon"><ShieldCheck size={18} /></span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-600">{model.formFactor}</span>
                  </div>
                  <h3 className="mt-5 text-2xl font-bold tracking-tight text-white">{model.model}</h3>
                  <p className="mt-1 font-mono text-xs text-slate-500">{model.userRange} peak users</p>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-slate-400">{model.typicalSite}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300">
                    Explore {model.model} <ArrowRight size={14} className="premium-link-arrow" />
                  </span>
                </Link>
              </TiltCard>
            </Item>
          ))}
          <Item>
            <div className="premium-card flex h-full flex-col justify-center p-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">Larger sites</span>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">Custom</h3>
              <p className="mt-1 font-mono text-xs text-slate-500">{CUSTOM_APPLIANCE.userRange} users</p>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-slate-400">{CUSTOM_APPLIANCE.typicalSite}.</p>
              <Link href="/contact" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300">
                Talk to our team <ArrowRight size={14} className="premium-link-arrow" />
              </Link>
            </div>
          </Item>
        </Stagger>
        <Reveal className="mt-10">
          <div className="premium-card flex flex-col items-start gap-4 p-7 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="premium-eyebrow">Model finder</p>
              <h3 className="mt-2 text-xl font-bold text-white">Two questions, sized by users.</h3>
              <p className="mt-1 text-sm text-slate-400">Peak users on site, and remote VPN users. Full specifications are available on request.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/products/recommend" className="premium-btn-primary shrink-0">Find your model <ArrowRight size={16} /></Link>
              <Link href="/products/compare" className="premium-btn-ghost shrink-0">Compare models</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  </div>;
}
