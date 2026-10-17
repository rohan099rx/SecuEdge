import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { SITE, SUPPORT } from "@/lib/site";
import { FirewallGatewayScene } from "@/components/FirewallGatewayScene";
import { Reveal, Stagger, Item } from "@/components/motion";
import { PremiumFaq } from "@/components/premium/PremiumSections";
import "@/components/premium/premium.css";

export const metadata: Metadata = buildMetadata({
  title: "Built in India",
  description:
    "SecuEdge Frontier is designed, built and supported in India. Traffic, logs and policy data stay on Indian soil by default. Built with the DPDP Act 2023 in mind.",
  path: "/trust",
});

/* Copy deck §5 — six rows, no certificates, no "verified/evaluated" wording. */
const ROWS = [
  {
    label: "Hardware and firmware",
    title: "Engineered and quality-checked in India.",
    desc: "Not a foreign platform resold under an Indian label.",
  },
  {
    label: "Your data",
    title: "Traffic, logs and policy data stay on Indian soil by default.",
    desc: "No cloud relay, no overseas routing.",
  },
  {
    label: "DPDP Act 2023",
    title: "Built with the Digital Personal Data Protection Act in mind.",
    desc: "Logs can be exported as evidence for your own audits.",
  },
  {
    label: "Supply chain",
    title: "No import dependency.",
    desc: "No exposure to export restrictions or overseas logistics.",
  },
  {
    label: "Support",
    title: "24/7 India-based engineers who understand Indian compliance and speak your language.",
    desc: SUPPORT.phone,
  },
  {
    label: "Secure by default",
    title: "Strong protection is the recommended default.",
    desc: "Quick Mode never leaves a dangerous gap.",
  },
];

export default function TrustPage() {
  return (
    <div className="premium">
      <section className="relative overflow-hidden">
        <div className="premium-grid-bg absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <nav className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#526274]" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-[#016FED]">Home</Link>
              <span aria-hidden>/</span>
              <span className="text-[#0B2239]">Built in India</span>
            </nav>
            <p className="premium-eyebrow mt-8">Built in India</p>
            <h1 className="mt-4 max-w-2xl text-5xl font-extrabold leading-[1.0] tracking-[-0.035em] text-[#0B2239] md:text-6xl">Trust you can see: built, supported and kept in India.</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#30465C] md:text-lg">
              SecuEdge Frontier is designed, built and supported in India. Here is what that means for your organisation.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className="premium-btn-primary">Talk to our team <ArrowRight size={15} /></Link>
              <a href={SUPPORT.phoneHref} className="premium-btn-ghost"><Phone size={15} /> {SUPPORT.phone}</a>
            </div>
          </Reveal>
          <Reveal aria-hidden>
            <div className="premium-card overflow-hidden p-2"><FirewallGatewayScene /></div>
          </Reveal>
        </div>
      </section>

      <section className="prem-navy border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Reveal>
            <p className="premium-eyebrow">What Made in India means</p>
            <h2 className="premium-section-title mt-4">Six facts, no fine print.</h2>
            <p className="premium-section-lead">Every claim below describes something you can ask us to show you.</p>
          </Reveal>
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.05}>
            {ROWS.map((row, i) => (
              <Item key={row.label}>
                <div className="premium-card h-full p-6">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-[#016FED]">{String(i + 1).padStart(2, "0")} · {row.label.toUpperCase()}</p>
                  <p className="mt-3 text-base font-bold leading-snug text-[#0B2239]">{row.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#526274]">{row.desc}</p>
                </div>
              </Item>
            ))}
          </Stagger>

          <Reveal className="mt-6">
            <div className="premium-card flex flex-col items-start gap-4 p-7 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <Phone size={20} className="mt-0.5 shrink-0 text-[#016FED]" />
                <div>
                  <h3 className="text-lg font-bold text-[#0B2239]">24/7 India-based support.</h3>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-[#526274]">Call <a href={SUPPORT.phoneHref} className="font-semibold text-[#016FED]">{SUPPORT.phone}</a>. {SUPPORT.response}.</p>
                </div>
              </div>
              <a href={SUPPORT.phoneHref} className="premium-btn-primary shrink-0"><Phone size={15} /> Call {SUPPORT.phone}</a>
            </div>
          </Reveal>

          <Reveal className="mt-6">
            <div className="premium-card flex flex-col items-start gap-4 p-7 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <Mail size={20} className="mt-0.5 shrink-0 text-[#016FED]" />
                <div>
                  <h3 className="text-lg font-bold text-[#0B2239]">Questions about security or data handling?</h3>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-[#526274]">Write to <span className="font-semibold text-[#0B2239]">{SITE.email}</span> and our team will respond. {SUPPORT.response}.</p>
                </div>
              </div>
              <Link href="/contact" className="premium-btn-primary shrink-0">Talk to our team <ArrowRight size={15} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <PremiumFaq
        eyebrow="Built in India · FAQ"
        faqs={[
          { q: "Is SecuEdge Frontier made in India?", a: "Yes. Hardware, firmware and software are engineered and quality-checked in India." },
          { q: "Where are our logs stored?", a: "On the appliance in India by default, with no overseas routing." },
          { q: "How does SecuEdge approach data protection?", a: "SecuEdge Frontier is built with the Digital Personal Data Protection Act 2023 in mind. Logs can be exported as evidence for your own audits." },
          { q: "What support do we get?", a: "24/7 India-based engineers who understand Indian compliance and speak your language. 1800 123 0966." },
        ]}
      />
    </div>
  );
}
