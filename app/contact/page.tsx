import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Phone, MapPin } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { SITE, SUPPORT, COVERAGE, HEADQUARTERS } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/motion";
import { PremiumFaq } from "@/components/premium/PremiumSections";
import "@/components/premium/premium.css";

export const metadata: Metadata = buildMetadata({
  title: "Talk to SecuEdge",
  description:
    "Book a free demo, get help choosing a model, or ask about becoming a partner. 24/7 India-based support on 1800 123 0966.",
  path: "/contact",
});

const PATHS = [
  { key: "demo", title: "Book a demo", desc: "See SecuEdge Frontier in action.", href: "/contact" },
  { key: "sizing", title: "Size my network", desc: "Desktop and rack-mount models, sized by users.", href: "/frontier/appliances" },
  { key: "assessment", title: "Free security assessment", desc: "Seven questions, about two minutes.", href: "/assessment" },
  { key: "partner", title: "Become a partner", desc: "Distribution across India.", href: "/about" },
] as const;

export default function ContactPage() {
  return (
    <div className="premium">
      <section className="relative overflow-hidden">
        <div className="premium-grid-bg absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid w-full max-w-[1200px] items-start gap-9 px-6 py-16 md:py-24 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <nav className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#526274]" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-[#016FED]">Home</Link>
              <span aria-hidden>/</span>
              <span className="text-[#0B2239]">Contact</span>
            </nav>
            <p className="premium-eyebrow mt-8">Let&apos;s talk</p>
            <h1 className="mt-4 text-5xl font-extrabold leading-[1.0] tracking-[-0.035em] text-[#0B2239] md:text-6xl">Talk to SecuEdge.</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#30465C] md:text-lg">
              Book a free demo, get help choosing a model, or ask about becoming a partner.
            </p>
            <ul className="mt-7 space-y-2.5">
              {[
                "See SecuEdge Frontier set up correctly, live",
                "Choose by how many people use your network",
                "Every feature on every model — no cut-down boxes",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm font-medium text-[#30465C]">
                  <Check size={16} className="mt-0.5 shrink-0 text-[#15803d]" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
            <div className="premium-panel mt-8 p-5" aria-label="Support">
              <p className="premium-panel-label">Already a customer?</p>
              <p className="mt-2 text-sm font-bold text-[#0B2239]">
                Call 24/7 support on <a href={SUPPORT.phoneHref} className="text-[#016FED]">{SUPPORT.phone}</a>.
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#526274]">{SUPPORT.response}.</p>
            </div>
            <div className="premium-panel mt-3 p-5" aria-label="Coverage and office">
              <p className="premium-panel-label">Coverage</p>
              <p className="mt-2 flex items-start gap-2 text-[13px] leading-relaxed text-[#526274]">
                <MapPin size={14} className="mt-0.5 shrink-0 text-[#016FED]" />{COVERAGE.line}
              </p>
              <p className="mt-2 text-[13px] text-[#526274]">SecuEdge, {HEADQUARTERS} · {SITE.email}</p>
            </div>
          </Reveal>
          <Reveal>
            <ContactForm />
            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {PATHS.map((p) => (
                <Link key={p.key} href={p.href} className="premium-card group block p-4">
                  <strong className="block text-sm font-bold text-[#0B2239]">{p.title}</strong>
                  <span className="mt-0.5 block text-xs text-[#526274]">{p.desc}</span>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#016FED]">Open <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" /></span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <PremiumFaq
        eyebrow="Contact · FAQ"
        faqs={[
          { q: "What happens in a demo?", a: "Our team shows SecuEdge Frontier set up correctly in Quick Mode, answers your questions, and recommends the right model for your user count." },
          { q: "How are licences sold?", a: "Licences and subscriptions are available on 1-year or 3-year terms." },
          { q: "How do I choose a model?", a: "Choose by how many people use your network at the busiest time, counting each VPN user three times. Use the model finder or ask our team." },
          { q: "What support do we get?", a: "24/7 technical support from India-based engineers on 1800 123 0966. We respond within 24 hours." },
        ]}
      />
    </div>
  );
}
