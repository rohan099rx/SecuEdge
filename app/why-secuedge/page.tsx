import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Compass, Headphones, LockKeyhole, MapPin, ShieldCheck } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { CERTIFICATIONS } from "@/lib/site";
import { Reveal, Stagger, Item } from "@/components/motion";
import "@/components/premium/premium.css";

export const metadata: Metadata = buildMetadata({
  title: "Why SecuEdge",
  description: "Learn how SecuEdge Frontier brings approachable network security, flexible controls and local product support together.",
  path: "/why-secuedge",
});

const REASONS = [
  {
    number: "01", icon: Compass, title: "Make secure setup easier",
    problem: "Firewall misconfiguration is one of the most common ways networks stay exposed.",
    approach: "Frontier offers guided Quick Mode alongside Professional Mode on the same appliance.",
    get: "Choose a simpler starting point — or take direct control of the configuration.",
    href: "/frontier/dual-mode", cta: "See Dual Mode",
  },
  {
    number: "02", icon: LockKeyhole, title: "Put the security boundary in view",
    problem: "Policy, segmentation, connectivity and inspection are often scattered across tools.",
    approach: "Firewall policy, network segmentation, VPN connectivity and IDPS come together at the edge.",
    get: "One boundary to understand, inspect and manage.",
    href: "/platform", cta: "See the architecture",
  },
  {
    number: "03", icon: MapPin, title: "Built with India in mind",
    problem: "Distant vendors mean slow answers and generic guidance.",
    approach: "SecuEdge is an India-based security company — talk directly with the team.",
    get: "Deployment discussion and product detail for your environment.",
    href: "/contact", cta: "Talk to our team",
  },
  {
    number: "04", icon: Headphones, title: "Help from people who know the product",
    problem: "Support scripts can't answer appliance and policy questions.",
    approach: "Connect with the SecuEdge team for practical guidance on appliances and modes.",
    get: "Answers grounded in the products you actually deploy.",
    href: "/contact", cta: "Ask a question",
  },
];

export default function WhySecuEdgePage() {
  return (
    <div className="premium">
      <section className="relative overflow-hidden">
        <div className="premium-grid-bg absolute inset-0" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-6 py-16 md:py-24">
          <Reveal>
            <nav className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#526274]" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-[#016FED]">Home</Link>
              <span aria-hidden>/</span>
              <span className="text-[#0B2239]">Why SecuEdge</span>
            </nav>
            <p className="premium-eyebrow mt-8">Why SecuEdge</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[1.0] tracking-[-0.035em] text-[#0B2239] md:text-6xl">Security designed around the way networks actually operate.</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#30465C] md:text-lg">Four reasons organizations evaluate SecuEdge — each tied to something you can verify in the products, the architecture, or a conversation with our team.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/frontier" className="premium-btn-primary">Explore Frontier <ArrowRight size={15} /></Link>
              <Link href="/trust" className="premium-btn-ghost">Verify trust claims</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="prem-navy border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Reveal>
            <p className="premium-eyebrow">Decision framework</p>
            <h2 className="premium-section-title mt-4">Problem → approach → what you get.</h2>
          </Reveal>
          <div className="mt-10 space-y-4">
            {REASONS.map((r) => (
              <Reveal key={r.number}>
                <article className="premium-card grid gap-5 p-7 md:grid-cols-[auto_1fr_1fr_1fr_auto] md:items-start md:gap-8 md:p-8">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(11,34,57,0.12)] bg-[#FAF9F5] text-[#016FED]"><r.icon size={20} /></span>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.2em] text-[#016FED]">{r.number} · PROBLEM</p>
                    <h3 className="mt-1.5 text-lg font-bold text-[#0B2239]">{r.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#526274]">{r.problem}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.2em] text-[#016FED]">APPROACH</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#30465C]">{r.approach}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.2em] text-[#15803d]">WHAT YOU GET</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#30465C]">{r.get}</p>
                  </div>
                  <Link href={r.href} className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-bold text-[#016FED] md:mt-6">{r.cta} <ArrowRight size={14} /></Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-10 px-6 lg:grid-cols-2">
          <Reveal>
            <p className="premium-eyebrow">Dual Mode, concretely</p>
            <h2 className="premium-section-title mt-4">Useful controls. Clear choices.</h2>
            <p className="premium-section-lead">Start guided, go granular when needed — Quick and Professional Mode on every Frontier appliance.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/frontier/dual-mode" className="premium-btn-primary">See Dual Mode <ArrowRight size={15} /></Link>
              <Link href="/platform" className="premium-btn-ghost">Platform architecture</Link>
            </div>
          </Reveal>
          <Reveal>
            <div className="premium-panel grid gap-px overflow-hidden sm:grid-cols-2">
              {[["Quick Mode", "Guided setup", "Transparent · Balanced · Maximum protection levels."], ["Professional Mode", "Granular control", "Firewall, VLAN, routing, VPN, IDPS, CLI."]].map(([t, s, d]) => (
                <div key={t} className="bg-white p-6">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-[#016FED]">{s}</p>
                  <h3 className="mt-1.5 text-lg font-bold text-[#0B2239]">{t}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[#526274]">{d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="prem-navy border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Reveal>
            <p className="premium-eyebrow">Credentials that support trust</p>
            <h2 className="premium-section-title mt-4">Associated certifications and standards.</h2>
            <p className="premium-section-lead">Ask our team for current scope, product applicability and supporting documentation.</p>
          </Reveal>
          <Stagger className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" gap={0.05}>
            {CERTIFICATIONS.map((item) => (
              <Item key={item.name}>
                <div className="premium-card flex items-start gap-3 p-5">
                  <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#016FED]" />
                  <div><strong className="block text-sm font-bold text-[#0B2239]">{item.name}</strong><small className="mt-0.5 block text-xs text-[#526274]">{item.note}</small></div>
                </div>
              </Item>
            ))}
          </Stagger>
          <Reveal className="mt-10">
            <div className="premium-card flex flex-col items-start gap-4 p-7 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#0B2239]">Let&apos;s talk about your network.</h3>
                <p className="mt-1 text-sm text-[#526274]">Tell us what you need to protect — we&apos;ll help you explore Frontier and its appliance family.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="premium-btn-primary">Contact SecuEdge <ArrowRight size={15} /></Link>
                <Link href="/trust" className="premium-btn-ghost">Trust & certifications</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
