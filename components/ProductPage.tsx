import Link from "next/link";
import { ArrowRight, Check, ChevronRight, FileText } from "lucide-react";
import type { ProductPageData } from "@/lib/products";
import { APPLIANCES } from "@/lib/site";
import { ApplianceArt } from "@/components/ApplianceArt";

function FeatureList({ items }: { items: string[] }) {
  return <ul className="space-y-2">{items.map((item) => <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-300"><Check size={16} className="mt-0.5 shrink-0 text-emerald-300" aria-hidden="true" />{item}</li>)}</ul>;
}

export function ProductPage({ product }: { product: ProductPageData }) {
  const related = APPLIANCES.filter((a) => a.model !== product.model).slice(0, 4);
  return (
    <div className="premium">
      <div className="mx-auto w-full max-w-[1200px] px-6 pt-8">
        <nav className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500" aria-label="Breadcrumb">
          <Link href="/products" className="transition-colors hover:text-white">Products</Link>
          <ChevronRight size={12} />
          <Link href="/products/frontier" className="transition-colors hover:text-white">Frontier</Link>
          <ChevronRight size={12} />
          <Link href="/frontier/appliances" className="transition-colors hover:text-white">Appliances</Link>
          <ChevronRight size={12} />
          <span className="text-slate-300">{product.model}</span>
        </nav>
      </div>

      <section className="relative overflow-hidden">
        <div className="premium-grid-bg absolute inset-0" aria-hidden />
        <div className="premium-glow-orb right-[8%] top-[10%] h-[320px] w-[320px] bg-[#016FED]/20" aria-hidden />
        <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-10 px-6 py-14 md:py-20 lg:grid-cols-2">
          <div>
            <p className="premium-eyebrow">SecuEdge Frontier · SE series</p>
            <h1 className="mt-4 text-5xl font-bold tracking-tight text-white md:text-6xl">{product.displayName}</h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300">{product.positioning}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="premium-btn-primary">Talk to our team <ArrowRight size={16} /></Link>
              <Link href="/frontier/appliances" className="premium-btn-ghost">Compare models</Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="premium-chip">{product.formFactor}</span>
              <span className="premium-chip">{product.tier} · indicative band</span>
              <span className="premium-chip !border-emerald-400/25 !text-emerald-300">Specs available on request</span>
            </div>
          </div>
          <div className="premium-card flex min-h-[320px] flex-col items-center justify-center p-8" aria-label={`${product.model} illustrative hardware view`}>
            <ApplianceArt label={product.model} />
            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">Illustrative hardware view · final configuration subject to official specifications</p>
          </div>
        </div>
      </section>

      <section id="overview" className="border-t border-white/[0.07] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <p className="premium-eyebrow">Product overview</p>
          <h2 className="premium-section-title mt-4">Frontier NGFW for your network edge.</h2>
          <p className="premium-section-lead">{product.overview}</p>
          <p className="mt-4 max-w-2xl rounded-xl border border-amber-400/20 bg-amber-400/[0.05] px-4 py-3 text-[13px] leading-relaxed text-slate-400">{product.tier} is an indicative lineup band only. Confirm hardware suitability against the current Frontier datasheet and your traffic requirements.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <article className="premium-card p-6">
              <span className="font-mono text-[10px] tracking-[0.2em] text-cyan-300/70">01 / FRONTIER NGFW</span>
              <h3 className="mt-2 text-lg font-bold text-white">One product, two operating modes</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">Guided Quick Mode for simpler setup or Professional Mode for direct policy control.</p>
              <Link href="/frontier/dual-mode" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300">Explore operating modes <ArrowRight size={15} /></Link>
            </article>
            <article className="premium-card p-6">
              <span className="font-mono text-[10px] tracking-[0.2em] text-cyan-300/70">02 / SECURITY</span>
              <h3 className="mt-2 text-lg font-bold text-white">Core Frontier capabilities</h3>
              <div className="mt-3"><FeatureList items={product.securityCapabilities} /></div>
            </article>
            <article className="premium-card p-6">
              <span className="font-mono text-[10px] tracking-[0.2em] text-cyan-300/70">03 / DEPLOYMENT</span>
              <h3 className="mt-2 text-lg font-bold text-white">Designed for {product.formFactor.toLowerCase()} deployment</h3>
              <div className="mt-3"><FeatureList items={product.deployment} /></div>
            </article>
          </div>
        </div>
      </section>

      <section id="specifications" className="border-t border-white/[0.07] bg-white/[0.015] py-20 md:py-28">
        <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="premium-eyebrow">Specifications</p>
            <h2 className="premium-section-title mt-4">Technical details, clearly stated.</h2>
            <p className="premium-section-lead">Model-specific numbers are published when the official specification sheet is approved. Unconfirmed values are identified below.</p>
            <p className="mt-5 flex items-center gap-2 text-sm text-slate-400"><FileText size={17} className="text-cyan-300" />Ask our team about current availability and configuration options.</p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300">Request product information <ArrowRight size={15} /></Link>
          </div>
          <dl className="premium-panel overflow-hidden">
            <div className="premium-panel-head"><span className="premium-panel-label">{product.model} · specification status</span><span className="premium-badge premium-badge--live">Verified where shown</span></div>
            {product.specifications.map((spec) => (
              <div className="premium-spec-row" key={spec.label}><dt className="premium-spec-name">{spec.label}</dt><dd className="premium-spec-note">{spec.value}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section id="architecture" className="prem-navy border-t border-white/[0.07] py-20 md:py-28">
        <div className="mx-auto grid w-full max-w-[1200px] items-start gap-10 px-6 lg:grid-cols-2">
          <div>
            <p className="premium-eyebrow">Network path</p>
            <h2 className="premium-section-title mt-4">See where protection sits.</h2>
            <p className="premium-section-lead">Frontier creates an inspection boundary between your internet connection and internal network segments.</p>
          </div>
          <ol className="space-y-0">
            {product.architecture.map((item, index) => (
              <li key={item} className="flex items-center gap-4 border-b border-white/[0.07] py-4 last:border-0">
                <span className="font-mono text-xs text-cyan-300/70">0{index + 1}</span>
                <strong className="text-[15px] font-semibold text-white">{item}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-white/[0.07] bg-white/[0.015] py-20 md:py-28">
        <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-6 lg:grid-cols-2">
          <div>
            <p className="premium-eyebrow">Product material</p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">Documentation status</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">Product downloads will appear here when the approved materials are ready.</p>
          </div>
          <div className="space-y-2.5">
            {product.downloads.map((item) => (
              <div key={item.label} className="premium-card flex items-center gap-3 p-4">
                <FileText size={18} className="shrink-0 text-cyan-300" />
                <div><strong className="block text-sm font-bold text-white">{item.label}</strong><span className="mt-0.5 block text-xs text-slate-500">{item.detail}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.07] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <p className="premium-eyebrow">Related models</p>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">Explore related SecuEdge products.</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((a) => (
              <Link key={a.model} href={`/products/frontier/${a.model.toLowerCase()}`} className="premium-card group block p-5">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">{a.formFactor} · {a.tier}</span>
                <strong className="mt-1.5 block font-mono text-lg font-bold text-white">{a.model}</strong>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-cyan-300">View model <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" /></span>
              </Link>
            ))}
          </div>
          <div className="premium-card mt-8 flex flex-col items-start gap-4 p-7 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="premium-eyebrow">Next step</p>
              <h3 className="mt-2 text-xl font-bold text-white">Find the right edge for your organization.</h3>
              <p className="mt-1 text-sm text-slate-400">Discuss deployment, sizing and the Frontier operating model with the SecuEdge team.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="premium-btn-primary">Contact SecuEdge <ArrowRight size={16} /></Link>
              <Link href="/products/compare" className="premium-btn-ghost">Compare models</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
