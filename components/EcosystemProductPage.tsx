import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Zap, ShieldCheck, Layers, Server, Search } from "lucide-react";
import { FRONTIER_PRODUCT, type EcosystemProduct, type FrontierCapability } from "@/data/ecosystem";
import { SECUEDGE_PRODUCTS, STATUS_LABEL } from "@/lib/site";
import { FrontierProductBands } from "@/components/frontier/FrontierProductBands";
import "@/components/premium/premium.css";

function Capabilities({ items }: { items: FrontierCapability[] }) {
  return <div className="grid gap-3 md:grid-cols-2">
    {items.map((capability, index) => <article key={capability.slug} className="premium-card p-6">
      <span className="font-mono text-[10px] tracking-[0.2em] text-cyan-300/70">0{index + 1} / {capability.group.toUpperCase()}</span>
      <h3 className="mt-2 text-lg font-bold text-white">{capability.name}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{capability.summary}</p>
      <ul className="mt-3 space-y-1.5">{capability.details.map((detail) => <li key={detail} className="flex items-start gap-2 text-[13px] text-slate-300"><Check size={14} className="mt-0.5 shrink-0 text-emerald-300" />{detail}</li>)}</ul>
    </article>)}
  </div>;
}

/* Frontier feature pages — showcased on the SecuEdge Frontier product page
   (the features live with Frontier, not in the top-level Products menu). */
const FRONTIER_FEATURES = [
  { icon: Zap, title: "Dual Mode", desc: "Quick Mode and Professional Mode, one toggle.", href: "/frontier/dual-mode" },
  { icon: ShieldCheck, title: "Safe Environment Filter", desc: "Protection for students and patients.", href: "/frontier/safe-environment" },
  { icon: Layers, title: "Capabilities", desc: "Firewall, VPN, SD-WAN and more on every model.", href: "/frontier/capabilities" },
  { icon: Server, title: "Appliances and sizing", desc: "Desktop and rack-mount models, sized by users.", href: "/frontier/appliances" },
  { icon: Search, title: "Find your model", desc: "Two questions, sized by users.", href: "/products/recommend" },
  { icon: ArrowRight, title: "Compare models", desc: "Form factor, peak users and typical site, side by side.", href: "/products/compare" },
] as const;

export function EcosystemProductPage({ product = FRONTIER_PRODUCT }: { product?: EcosystemProduct }) {
  const isFrontier = product.slug === "frontier";
  const related = SECUEDGE_PRODUCTS.filter((item) => item.key !== product.slug);  return <article className="premium" style={{ "--prem-accent": product.accent } as React.CSSProperties}>
    <nav className="premium-nav sticky top-0 z-30" aria-label="SecuEdge product navigation">
      <div className="mx-auto flex w-full max-w-[1200px] items-center gap-4 overflow-x-auto px-6 py-2.5">
        <span className="shrink-0 font-mono text-[10px] tracking-[0.2em] text-slate-500">PRODUCTS</span>
        {SECUEDGE_PRODUCTS.map((item, index) => <Link className={`shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${item.key === product.slug ? "bg-cyan-400/10 text-white" : "text-slate-400 hover:text-white"}`} href={item.href} key={item.key}><span className="mr-1.5 font-mono text-[10px] text-slate-600">{String(index + 1).padStart(2, "0")}</span>{item.name}</Link>)}
      </div>
    </nav>

    <div className="mx-auto w-full max-w-[1200px] px-6 pt-8">
      <nav className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500" aria-label="Breadcrumb">
        <Link href="/products" className="transition-colors hover:text-white">Products</Link>
        <ChevronRight size={12} />
        <span className="text-slate-300">{product.name}</span>
      </nav>
    </div>

    <section className="relative overflow-hidden">
      <div className="premium-grid-bg absolute inset-0" aria-hidden />
      <div className="premium-glow-orb right-[10%] top-[10%] h-[300px] w-[300px]" style={{ background: `${product.accent}26` }} aria-hidden />
      <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-10 px-6 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="premium-eyebrow">{product.category} · {STATUS_LABEL[product.status]}</p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-white md:text-6xl">{product.name}</h1>
          <p className="mt-3 text-xl font-medium text-slate-300">{product.summary}</p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400">{product.description}</p>
          <p className="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <span className={`inline-block h-1.5 w-1.5 rounded-full ${product.status === "available" ? "bg-emerald-400" : "bg-amber-400"}`} />
            {product.status === "available"
              ? "SecuEdge Frontier is available now. Model-specific specifications are shared on request."
              : `${product.name} is ${STATUS_LABEL[product.status].toLowerCase()} — no launch date has been announced.`}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link className="premium-btn-primary" href="/contact">Talk to our team <ArrowRight size={16} /></Link>
            {isFrontier ? <Link className="premium-btn-ghost" href="/frontier/appliances">Find your model <ArrowUpRight size={15} /></Link> : null}
          </div>
        </div>
        <div className="premium-card premium-hero-mark flex aspect-square max-w-md items-center justify-center justify-self-center w-full" aria-hidden>
          <span className="text-[9rem] font-bold leading-none" style={{ color: `${product.accent}2e` }}>{product.name[0]}</span>
        </div>
      </div>
    </section>

    {!isFrontier ? (
      <section className="border-t border-white/[0.07]">
        <div className="mx-auto w-full max-w-[1200px] px-6 py-10">
          <div className="premium-card flex flex-col gap-4 p-7 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="premium-eyebrow">Today</p>
              <h2 className="mt-2 text-xl font-bold text-white">SecuEdge Frontier already includes this capability.</h2>
              <p className="mt-1 text-sm text-slate-400">Every SecuEdge Frontier model ships with this capability built in. {product.name} is the dedicated product for organisations that need more scale or depth.</p>
            </div>
            <Link href="/products/frontier" className="premium-btn-primary shrink-0">See SecuEdge Frontier <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>
    ) : null}

    <section className="border-t border-white/[0.07]">
      <div className="mx-auto grid w-full max-w-[1200px] gap-px overflow-hidden px-6 py-0 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Product", product.name, product.category],
          ["Status", STATUS_LABEL[product.status], product.status === "available" ? "Current SecuEdge product" : "No launch date announced"],
          ["Operating story", `${product.story.length} connected stages`, "Visual explanation, not live telemetry"],
        ].map(([k, v, d]) => (
          <div key={k} className="border-white/[0.07] py-6 pr-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">{k}</div>
            <div className="mt-1.5 text-base font-bold text-white">{v}</div>
            <div className="mt-0.5 text-xs text-slate-500">{d}</div>
          </div>
        ))}
        <div className="py-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Access</div>
          <Link href="/contact" className="mt-1.5 inline-flex items-center gap-1.5 text-base font-bold text-cyan-300">Request product details <ArrowRight size={14} /></Link>
          <div className="mt-0.5 text-xs text-slate-500">Talk to SecuEdge</div>
        </div>
      </div>
    </section>

    <section className="border-t border-white/[0.07] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <p className="premium-eyebrow">{product.name} · Capabilities</p>
        <h2 className="premium-section-title mt-4 max-w-3xl">{isFrontier ? "One firewall, a complete edge toolkit." : `${product.name} — what it will do.`}</h2>
        <p className="premium-section-lead">Only verified product information is shown; request approved documentation for technical sizing.</p>
        <div className="mt-10">{isFrontier ? <Capabilities items={FRONTIER_PRODUCT.capabilities} /> : <div className="grid gap-3 md:grid-cols-2">{product.capabilities.map((capability, index) => { const label = typeof capability === "string" ? capability : capability.name; return <article key={label} className="premium-card p-6"><span className="font-mono text-[10px] tracking-[0.2em] text-cyan-300/70">0{index + 1} / {product.category.toUpperCase()}</span><h3 className="mt-2 text-lg font-bold text-white">{label}</h3><p className="mt-1.5 text-sm leading-relaxed text-slate-400">{product.description}</p></article>; })}</div>}</div>
      </div>
    </section>

    {isFrontier ? <section className="border-t border-white/[0.07] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <p className="premium-eyebrow">SecuEdge Frontier · Features</p>
        <h2 className="premium-section-title mt-4 max-w-3xl">Everything around the appliance.</h2>
        <p className="premium-section-lead">Dual Mode, safeguarding, sizing and capabilities — each with its own page.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FRONTIER_FEATURES.map((f) => (
            <Link key={f.href} href={f.href} className="premium-product-card group" style={{ "--prem-accent": product.accent } as React.CSSProperties}>
              <span className="premium-product-icon"><f.icon size={20} /></span>
              <h3 className="mt-4 text-lg font-bold tracking-tight text-white">{f.title}</h3>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-slate-400">{f.desc}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300">Explore <ArrowRight size={14} className="premium-link-arrow" /></span>
            </Link>
          ))}
        </div>
      </div>
    </section> : null}

    <section className="prem-navy border-t border-white/[0.07] py-20 md:py-28">
      <div className="mx-auto grid w-full max-w-[1200px] items-start gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="premium-eyebrow">{product.name} · Product story</p>
          <h2 className="premium-section-title mt-4">{isFrontier ? "Place policy at the edge." : "A connected view of the product."}</h2>
          <p className="premium-section-lead">{isFrontier ? "SecuEdge Frontier creates an inspection point between upstream networks and the zones behind the firewall." : "Follow the product story from its inputs to the operational outcome. The sequence is a concise explanation, not a live telemetry view."}</p>
        </div>
        <ol className="space-y-0">
          {product.story.map((step, index) => (
            <li key={step} className="flex items-center gap-4 border-b border-white/[0.07] py-4 last:border-0">
              <span className="font-mono text-xs text-cyan-300/70">{String(index + 1).padStart(2, "0")}</span>
              <strong className="text-[15px] font-semibold text-white">{step}</strong>
              {index < product.story.length - 1 && <span className="ml-auto h-px w-10 bg-gradient-to-r from-cyan-400/50 to-transparent" aria-hidden />}
            </li>
          ))}
        </ol>
      </div>
    </section>

    {isFrontier ? <FrontierProductBands /> : null}

    <section className="border-t border-white/[0.07] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <p className="premium-eyebrow">Related products</p>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">SecuEdge Frontier, and what comes next.</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {related.map((item) => (
            <Link key={item.key} href={item.href} className="premium-card group block p-5">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em]" style={{ color: item.accent }}>{item.category}</span>
              <strong className="mt-1.5 block text-base font-bold text-white">{item.name}</strong>
              <span className="mt-1 block text-[11px] font-semibold uppercase tracking-widest text-slate-500">{STATUS_LABEL[item.status]}</span>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-cyan-300">Explore <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" /></span>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/contact" className="premium-btn-primary">Talk to our team <ArrowRight size={16} /></Link>
          <Link href="/products/compare" className="premium-btn-ghost">Compare Frontier models</Link>
        </div>
      </div>
    </section>
  </article>;
}
