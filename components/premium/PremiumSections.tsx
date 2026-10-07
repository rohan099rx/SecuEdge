"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion";
import type { Faq } from "@/lib/content/types";

/** Shared premium closers — cream/blue only, no dark bands. */

export function PremiumFaq({ faqs, title = "Common questions", eyebrow = "FAQ" }: { faqs: Faq[]; title?: string; eyebrow?: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <section className="border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <p className="premium-eyebrow">{eyebrow}</p>
          <h2 className="premium-section-title mt-4">{title}</h2>
        </Reveal>
        <div className="mt-10 grid gap-3">
          {faqs.map((f) => (
            <Reveal key={f.q}>
              <details className="premium-card group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-[#0B2239] [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="shrink-0 font-mono text-lg text-[#016FED] transition-transform duration-300 group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#526274]">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </div>
    </section>
  );
}

export function PremiumCta({ headline = "Let's protect your network — correctly — from day one.", sub }: { headline?: string; sub?: string }) {
  return (
    <section className="prem-navy border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-[#0B2239] md:text-5xl">{headline}</h2>
          {sub ? <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#30465C]">{sub}</p> : null}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="premium-btn-primary">Get a Demo <ArrowRight size={15} /></Link>
            <Link href="/assessment" className="premium-btn-ghost">Take the free security assessment</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function PremiumSteps({ eyebrow = "Implementation", title, steps }: { eyebrow?: string; title: string; steps: { title: string; desc: string }[] }) {
  return (
    <section className="prem-navy border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <p className="premium-eyebrow">{eyebrow}</p>
          <h2 className="premium-section-title mt-4">{title}</h2>
        </Reveal>
        <div className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title}>
              <div className="relative border-t-2 border-[rgba(1,111,237,0.35)] pt-8">
                <span className="absolute -top-5 left-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#016FED] text-sm font-bold text-white tabular-nums">{i + 1}</span>
                <p className="font-bold text-[#0B2239]">{s.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#526274]">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
