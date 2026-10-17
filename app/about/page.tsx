import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { SITE, SUPPORT, COVERAGE, HEADQUARTERS, SECUEDGE_PRODUCTS, STATUS_LABEL, INDUSTRIES } from "@/lib/site";
import { Reveal, Stagger, Item } from "@/components/motion";
import "@/components/premium/premium.css";

export const metadata: Metadata = buildMetadata({ title: "About SecuEdge", description: "SecuEdge is India’s homegrown cybersecurity company, founded in 2025 in Gurugram. Meet the founders and the idea behind SecuEdge Frontier.", path: "/about", brand: "SecuEdge" });

/* Copy deck §3. */
const PRINCIPLES = [
  { title: "Simplicity is security.", desc: "The guided path is the secure path." },
  { title: "Every feature on every model.", desc: "No cut-down boxes." },
  { title: "Built and supported in India.", desc: "Hardware, firmware, data and support stay here." },
  { title: "Support that responds.", desc: "24/7, India-based engineers." },
];

const FACTS = [
  "Founded 2025",
  `Headquartered in ${HEADQUARTERS}`,
  "200+ installations",
  "Coverage across North, West, South and East India",
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
          <p className="premium-eyebrow mt-8">{SITE.companyLine}</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[1.0] tracking-[-0.035em] text-[#0B2239] md:text-6xl">Security shouldn&apos;t be complex. It should be accessible to everyone.</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#30465C] md:text-lg">{SITE.companyLine} Our first product, SecuEdge Frontier, protects 200+ installations across India.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/why-secuedge" className="premium-btn-primary">Why SecuEdge <ArrowRight size={15} /></Link>
            <Link href="/products" className="premium-btn-ghost">What we build</Link>
          </div>
        </Reveal>
      </div>
    </section>

    <section className="prem-navy border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <p className="premium-eyebrow">Our story</p>
          <h2 className="premium-section-title mt-4">Most organisations are not breached by clever attackers. They are breached by firewalls that were set up wrongly.</h2>
          <div className="premium-section-lead space-y-4">
            <p>SecuEdge was founded in 2025 in Gurugram by two people from two different worlds. Sagar Dalal, a cybersecurity researcher and ethical hacker, kept finding good firewalls set up wrongly. Manoj Kuniyal, who spent over 20 years in technology sales, including as country head of a UK-based firewall company in India, saw why: firewalls are just as complex for a beginner as for an expert, and skilled engineers are rare, especially in smaller cities.</p>
            <p>So they built SecuEdge Frontier with Dual Mode: a Quick Mode anyone can set up correctly in a few clicks, and a Professional Mode with full depth for experts. Quick Mode follows the same order engineers use on site, so the guided path is also the secure path.</p>
          </div>
        </Reveal>
      </div>
    </section>

    <section className="border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <p className="premium-eyebrow">Founders</p>
          <h2 className="premium-section-title mt-4">Two people, one problem.</h2>
        </Reveal>
        <Stagger className="mt-8 grid gap-4 md:grid-cols-2" gap={0.06}>
          <Item>
            <article className="premium-card h-full p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#016FED] text-lg font-extrabold text-white">SD</span>
              <h3 className="mt-4 text-xl font-bold text-[#0B2239]">Sagar Dalal</h3>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[#016FED]">Co-founder</p>
              <p className="mt-2 text-sm leading-relaxed text-[#526274]">Cybersecurity researcher, penetration tester and ethical hacker.</p>
            </article>
          </Item>
          <Item>
            <article className="premium-card h-full p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#016FED] text-lg font-extrabold text-white">MK</span>
              <h3 className="mt-4 text-xl font-bold text-[#0B2239]">Manoj Kuniyal</h3>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[#016FED]">Co-founder</p>
              <p className="mt-2 text-sm leading-relaxed text-[#526274]">20+ years in technology sales, including as country head of a UK-based firewall company in India.</p>
            </article>
          </Item>
        </Stagger>
      </div>
    </section>

    <section className="prem-navy border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <p className="premium-eyebrow">Vision · Mission · Belief</p>
          <h2 className="premium-section-title mt-4">Why we exist.</h2>
        </Reveal>
        <Stagger className="mt-8 grid gap-4 md:grid-cols-3" gap={0.06}>
          {[
            ["Vision", "To make cybersecurity easy and accessible to everyone."],
            ["Mission", "To build security products in India that any business can set up correctly the first time, so no organisation is left exposed because of complexity, a shortage of experts or simple human error."],
            ["Belief", "The secure setup should be the easy setup."],
          ].map(([title, desc]) => (
            <Item key={title}>
              <article className="premium-card h-full p-7">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#016FED]">{title.toUpperCase()}</span>
                <p className="mt-2 text-base font-bold leading-snug text-[#0B2239]">{desc}</p>
              </article>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>

    <section className="border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <p className="premium-eyebrow">Principles</p>
          <h2 className="premium-section-title mt-4">How we build.</h2>
        </Reveal>
        <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.05}>
          {PRINCIPLES.map((p, i) => (
            <Item key={p.title}>
              <article className="premium-card h-full p-6">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#016FED]">0{i + 1}</span>
                <h3 className="mt-2 text-base font-bold text-[#0B2239]">{p.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#526274]">{p.desc}</p>
              </article>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>

    <section className="prem-navy border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <p className="premium-eyebrow">What we build</p>
          <h2 className="premium-section-title mt-4">SecuEdge Frontier, and what comes next.</h2>
          <p className="premium-section-lead">One available product, six more on the roadmap — all sharing the same appliances and console.</p>
        </Reveal>
        <Stagger className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" gap={0.05}>
          {SECUEDGE_PRODUCTS.map((p) => (
            <Item key={p.key}>
              <Link href={p.href} className="premium-card group block h-full p-5">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#016FED]">{STATUS_LABEL[p.status]}</span>
                <strong className="mt-1.5 block text-base font-bold text-[#0B2239]">{p.name}</strong>
                <span className="mt-1 block text-xs text-[#526274]">{p.category}</span>
              </Link>
            </Item>
          ))}
        </Stagger>
        <Reveal className="mt-8">
          <div className="premium-card p-7">
            <p className="premium-eyebrow">Who we build for</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {INDUSTRIES.map((ind) => (
                <Link key={ind.slug} href={`/industries/${ind.slug}`} className="premium-chip !text-[13px] transition-colors hover:border-[#016FED] hover:text-[#016FED]">{ind.name}</Link>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal className="mt-8">
          <div className="premium-card p-7">
            <p className="premium-eyebrow">Support and coverage</p>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#526274]">{SUPPORT.line}</p>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#526274]">{COVERAGE.line}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {FACTS.map((fact) => (
                <span key={fact} className="premium-chip !text-[11px]">{fact}</span>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal className="mt-8">
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="premium-btn-primary">Book a free demo <ArrowRight size={15} /></Link>
            <a href={SUPPORT.phoneHref} className="premium-btn-ghost"><Phone size={15} /> {SUPPORT.phone}</a>
          </div>
        </Reveal>
      </div>
    </section>
  </div>;
}
