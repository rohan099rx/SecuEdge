import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Compass, LockKeyhole, MapPin, Headphones } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { MISCONFIG_STAT, SUPPORT } from "@/lib/site";
import { Reveal } from "@/components/motion";
import "@/components/premium/premium.css";

export const metadata: Metadata = buildMetadata({
  title: "Why SecuEdge",
  description: "Gartner found that 99% of firewall breaches come from misconfiguration. Everything SecuEdge builds starts from that fact — SecuEdge Frontier, made in India, supported 24/7.",
  path: "/why-secuedge",
});

/* Copy deck §4 — keep the problem → approach → benefit structure. */
const REASONS = [
  {
    number: "01", icon: Compass, title: "Simplicity is security.",
    problem: "Gartner found that 99% of firewall breaches come from misconfiguration.",
    approach: "Quick Mode sets all five security engines with one choice, so nothing is left half-configured.",
    get: "Engineers still get full control in Professional Mode.",
    href: "/frontier/dual-mode", cta: "See Dual Mode",
  },
  {
    number: "02", icon: MapPin, title: "Made and maintained in India.",
    problem: "Distant vendors mean slow answers and data that leaves the country.",
    approach: "Built and supported here. Your data stays in India by default, and the product is built with the DPDP Act 2023 in mind.",
    get: "Hardware, firmware, data and support stay here.",
    href: "/trust", cta: "See Built in India",
  },
  {
    number: "03", icon: LockKeyhole, title: "Enterprise depth, approachable controls.",
    problem: "Deep inspection usually means a management layer only specialists can use.",
    approach: "Deep packet inspection, application control, intrusion prevention, VPN and SD-WAN, with a management layer people can actually use.",
    get: "Every feature on every model.",
    href: "/frontier/capabilities", cta: "See capabilities",
  },
  {
    number: "04", icon: Headphones, title: "Support that actually responds.",
    problem: "Support scripts can't answer appliance and policy questions.",
    approach: `24/7 India-based engineers on ${SUPPORT.phone}, with a response within 24 hours.`,
    get: "Answers from people who know SecuEdge Frontier inside out.",
    href: "/contact", cta: "Talk to our team",
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
            <h1 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[1.0] tracking-[-0.035em] text-[#0B2239] md:text-6xl">Four reasons organisations choose SecuEdge.</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#30465C] md:text-lg">{MISCONFIG_STAT.line} Everything we build starts from that fact.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className="premium-btn-primary">Book a free demo <ArrowRight size={15} /></Link>
              <Link href="/assessment" className="premium-btn-ghost">Take the free security assessment</Link>
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
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(11,34,57,0.12)] bg-[#F1F6FD] text-[#016FED]"><r.icon size={20} /></span>
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
            <p className="premium-section-lead">Start guided, go granular when needed — Quick and Professional Mode on every SecuEdge Frontier appliance. Choosing a level sets all five security engines together: firewall, intrusion detection, intrusion prevention, antivirus and DNS filtering.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/frontier/dual-mode" className="premium-btn-primary">See Dual Mode <ArrowRight size={15} /></Link>
              <Link href="/platform" className="premium-btn-ghost">Platform architecture</Link>
            </div>
          </Reveal>
          <Reveal>
            <div className="premium-panel grid gap-px overflow-hidden sm:grid-cols-2">
              {[["Quick Mode", "Guided setup", "Strong, Mild and No Protection levels. One choice sets all five engines."], ["Professional Mode", "Granular control", "Firewall, VLAN, routing, VPN, IDPS, CLI."]].map(([t, s, d]) => (
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
            <div className="premium-card flex flex-col items-start gap-4 p-7 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#0B2239]">See how easy the secure setup can be.</h3>
                <p className="mt-1 text-sm text-[#526274]">Book a free demo with our team, or take the two-minute security assessment. No obligation.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="premium-btn-primary">Book a free demo <ArrowRight size={15} /></Link>
                <Link href="/assessment" className="premium-btn-ghost">Take the assessment</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
