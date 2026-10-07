import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, Gauge, Layers, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { CERTIFICATIONS, SECUEDGE_PRODUCTS, SITE } from "@/lib/site";
import { Reveal, Stagger, Item } from "@/components/motion";
import "@/components/premium/premium.css";

export const metadata: Metadata = buildMetadata({ title: "About SecuEdge", description: "Learn about SecuEdge's approach to network security, product engineering and customer guidance.", path: "/about", brand: "SecuEdge" });

const PHILOSOPHY = [
  { icon: Eye, title: "Visibility", desc: "See the network edge, its zones and its events before deciding policy." },
  { icon: SlidersHorizontal, title: "Control", desc: "Apply policy directly — from guided setup to granular configuration." },
  { icon: Gauge, title: "Performance", desc: "Publish validated numbers only; size every deployment against approved data." },
  { icon: Layers, title: "Layered security", desc: "Six product families covering protect, observe, connect and respond." },
];

export default function AboutPage() {
  return <div className="premium">
    <section className="relative overflow-hidden">
      <div className="premium-grid-bg absolute inset-0" aria-hidden />
      <div className="relative mx-auto w-full max-w-[1200px] px-6 py-16 md:py-24">
        <Reveal>
          <nav className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#526274]" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-[#016FED]">Home</Link>
            <span aria-hidden>/</span>
            <span className="text-[#0B2239]">About</span>
          </nav>
          <p className="premium-eyebrow mt-8">SecuEdge</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[1.0] tracking-[-0.035em] text-[#0B2239] md:text-6xl">Security infrastructure, built for the edge.</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#30465C] md:text-lg">{SITE.description} Our focus is network security, visibility and control — delivered as infrastructure teams can actually operate.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/why-secuedge" className="premium-btn-primary">Our approach <ArrowRight size={15} /></Link>
            <Link href="/products" className="premium-btn-ghost">What we build</Link>
          </div>
        </Reveal>
      </div>
    </section>

    <section className="prem-navy border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <p className="premium-eyebrow">Origin · Mission</p>
          <h2 className="premium-section-title mt-4">Make network security practical.</h2>
          <p className="premium-section-lead">SecuEdge builds network security products for organizations that need strong controls and a clear way to manage them — giving teams a way to understand the network edge, choose controls and get product guidance.</p>
        </Reveal>
        <Stagger className="mt-10 grid gap-4 md:grid-cols-3" gap={0.06}>
          {[
            ["01 · Mission", "Make network security practical.", "Clear controls and direct product guidance for real network environments."],
            ["02 · Technology", "One connected product ecosystem.", `Six security and networking families, with Frontier as the ${11}-model NGFW appliance family.`],
            ["03 · Trust", "State what is known.", "Model-specific performance data is provided on request until approved specifications are published."],
          ].map(([index, title, desc]) => (
            <Item key={title}>
              <article className="premium-card h-full p-7">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#016FED]">{index}</span>
                <h3 className="mt-2 text-xl font-bold text-[#0B2239]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#526274]">{desc}</p>
              </article>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>

    <section className="border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <p className="premium-eyebrow">What we build</p>
          <h2 className="premium-section-title mt-4">Six families, one portfolio.</h2>
          <p className="premium-section-lead">Each product owns a distinct operational role across protect, observe, connect and respond.</p>
        </Reveal>
        <Reveal className="mt-8">
          <div className="premium-panel flex flex-wrap items-center gap-x-3 gap-y-2 px-5 py-4">
            <span className="premium-panel-label">Portfolio</span>
            <span className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#0B2239]">
              {SECUEDGE_PRODUCTS.map((p, i) => (
                <span key={p.key} className="flex items-center gap-2">
                  <Link href={p.href} className="rounded-md border border-[rgba(11,34,57,0.12)] bg-white px-2.5 py-1 transition-colors hover:border-[#016FED] hover:text-[#016FED]">{p.name}</Link>
                  {i < SECUEDGE_PRODUCTS.length - 1 && <ArrowRight size={12} className="text-[#64748b]" />}
                </span>
              ))}
            </span>
          </div>
        </Reveal>
      </div>
    </section>

    <section className="prem-navy border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <p className="premium-eyebrow">Engineering philosophy</p>
          <h2 className="premium-section-title mt-4">How we think about security products.</h2>
        </Reveal>
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.05}>
          {PHILOSOPHY.map((p) => (
            <Item key={p.title}>
              <article className="premium-card h-full p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(11,34,57,0.12)] bg-[#FAF9F5] text-[#016FED]"><p.icon size={18} /></span>
                <h3 className="mt-4 text-base font-bold text-[#0B2239]">{p.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#526274]">{p.desc}</p>
              </article>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>

    <section className="border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <p className="premium-eyebrow">Credentials</p>
          <h2 className="premium-section-title mt-4">Review current scope with the team.</h2>
          <p className="premium-section-lead">These certifications and standards appear in SecuEdge company materials. Ask for their current scope, applicability and supporting documents.</p>
        </Reveal>
        <Stagger className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5" gap={0.04}>
          {CERTIFICATIONS.slice(0, 5).map((item) => (
            <Item key={item.name}>
              <div className="premium-card h-full p-5">
                <ShieldCheck size={20} className="text-[#016FED]" />
                <strong className="mt-3 block text-sm font-bold text-[#0B2239]">{item.name}</strong>
                <span className="mt-1 block text-xs text-[#526274]">{item.note}</span>
              </div>
            </Item>
          ))}
        </Stagger>
        <Reveal className="mt-10">
          <div className="premium-card flex flex-col items-start gap-4 p-7 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#0B2239]">Build your security stack with SecuEdge.</h3>
              <p className="mt-1 text-sm text-[#526274]">Explore the portfolio or talk to our team about your network.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/products" className="premium-btn-primary">Explore products <ArrowRight size={15} /></Link>
              <Link href="/contact" className="premium-btn-ghost">Contact us</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  </div>;
}
