import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, ChevronRight } from "lucide-react";
import { FRONTIER_PRODUCT, type EcosystemProduct, type FrontierCapability } from "@/data/ecosystem";
import { APPLIANCES, SECUEDGE_PRODUCTS } from "@/lib/site";

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

export function EcosystemProductPage({ product = FRONTIER_PRODUCT }: { product?: EcosystemProduct }) {
  const isFrontier = product.slug === "frontier";
  const related = SECUEDGE_PRODUCTS.filter((item) => item.key !== product.slug);
  return <article className="premium" style={{ "--prem-accent": product.accent } as React.CSSProperties}>
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
          <p className="premium-eyebrow">{product.category} · Available product</p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-white md:text-6xl">{product.name}</h1>
          <p className="mt-3 text-xl font-medium text-slate-300">{product.summary}</p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400">{product.description}</p>
          <p className="mt-4 flex items-center gap-2 text-xs text-slate-500"><span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />{isFrontier ? "Frontier is an available NGFW family. Model-specific specifications vary by configuration and approved documentation." : `${product.name} is an available SecuEdge product family. Capabilities and implementation depend on the deployed configuration.`}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link className="premium-btn-primary" href="/contact">Talk to our team <ArrowRight size={16} /></Link>
            {isFrontier ? <Link className="premium-btn-ghost" href="/frontier/appliances">Explore the Frontier family <ArrowUpRight size={15} /></Link> : null}
          </div>
        </div>
        <div className="premium-card flex aspect-square max-w-md items-center justify-center justify-self-center w-full" aria-hidden>
          <span className="text-[9rem] font-bold leading-none" style={{ color: `${product.accent}2e` }}>{product.name[0]}</span>
        </div>
      </div>
    </section>

    <section className="border-t border-white/[0.07]">
      <div className="mx-auto grid w-full max-w-[1200px] gap-px overflow-hidden px-6 py-0 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Product", product.name, product.category],
          ["Status", "Available", "Current SecuEdge product family"],
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
        <h2 className="premium-section-title mt-4 max-w-3xl">{isFrontier ? "One firewall, a complete edge toolkit." : `${product.name} makes the network easier to understand and operate.`}</h2>
        <p className="premium-section-lead">Only verified product information is shown; request approved documentation for technical sizing.</p>
        <div className="mt-10">{isFrontier ? <Capabilities items={FRONTIER_PRODUCT.capabilities} /> : <div className="grid gap-3 md:grid-cols-2">{product.capabilities.map((capability, index) => { const label = typeof capability === "string" ? capability : capability.name; return <article key={label} className="premium-card p-6"><span className="font-mono text-[10px] tracking-[0.2em] text-cyan-300/70">0{index + 1} / {product.category.toUpperCase()}</span><h3 className="mt-2 text-lg font-bold text-white">{label}</h3><p className="mt-1.5 text-sm leading-relaxed text-slate-400">{product.description}</p></article>; })}</div>}</div>
      </div>
    </section>

    <section className="prem-navy border-t border-white/[0.07] py-20 md:py-28">
      <div className="mx-auto grid w-full max-w-[1200px] items-start gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="premium-eyebrow">{product.name} · Product story</p>
          <h2 className="premium-section-title mt-4">{isFrontier ? "Place policy at the edge." : "A connected view of the product."}</h2>
          <p className="premium-section-lead">{isFrontier ? "Frontier creates an inspection point between upstream networks and the zones behind the firewall." : "Follow the product story from its inputs to the operational outcome. The sequence is a concise explanation, not a live telemetry view."}</p>
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

    {isFrontier ? <section className="border-t border-white/[0.07] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <p className="premium-eyebrow">SE series · Hardware range</p>
        <h2 className="premium-section-title mt-4">Eleven models, desktop to rack-mount.</h2>
        <p className="premium-section-lead">Every standard model is available. “P” identifies the Professional rack-mount chassis; it is distinct from the Professional Mode software experience.</p>
        <div className="mt-8 flex flex-wrap gap-2.5">
          {APPLIANCES.map((appliance) => <Link href={`/products/frontier/${appliance.model.toLowerCase()}`} key={appliance.model} className="premium-card !rounded-xl px-4 py-3 transition-transform hover:!-translate-y-1">
            <span className="block font-mono text-[9px] uppercase tracking-widest text-slate-500">{appliance.formFactor}</span>
            <strong className="mt-0.5 block font-mono text-base font-bold text-white">{appliance.model}</strong>
            <small className="mt-0.5 block text-[11px] text-slate-500">Available · {appliance.tier}</small>
          </Link>)}
        </div>
        <Link href="/products/compare" className="premium-btn-primary mt-8">Compare all Frontier models <ArrowRight size={15} /></Link>
      </div>
    </section> : null}

    <section className="border-t border-white/[0.07] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <p className="premium-eyebrow">Related products</p>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">Explore related SecuEdge products.</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {related.map((item) => (
            <Link key={item.key} href={item.href} className="premium-card group block p-5">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em]" style={{ color: item.accent }}>{item.category}</span>
              <strong className="mt-1.5 block text-base font-bold text-white">{item.name}</strong>
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
  </article>
}
