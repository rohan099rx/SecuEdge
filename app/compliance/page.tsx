import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Reveal, Stagger, Item } from "@/components/motion";
import { PremiumFaq, PremiumCta, PremiumSteps } from "@/components/premium/PremiumSections";
import raw from "@/lib/content/data/compliance-page.json";
import type { TitledItem, Faq } from "@/lib/content/types";
import "@/components/premium/premium.css";

type ComplianceData = {
  metaTitle: string;
  metaDescription: string;
  hero: { headline: string; sub: string };
  challenges: { headline: string; sub?: string; items: TitledItem[] };
  frameworksIntro: { eyebrow?: string; headline: string; sub?: string };
  frameworks: { name: string; desc: string; items: string[] }[];
  approachIntro: { headline: string };
  approach: TitledItem[];
  capabilities: TitledItem[];
  process: TitledItem[];
  ongoingManagement?: { headline: string; items: TitledItem[] };
  faqs: Faq[];
  cta: { headline?: string; sub?: string };
};

const data = raw as unknown as ComplianceData;

/* Fabricated metrics are filtered at render — the JSON file is untouched:
   the "how quickly" timeline FAQ and the "40–60% reduction" FAQ are excluded
   as unverified. Framework names/descriptions and all other sections stay. */
const faqs = data.faqs.filter(
  (f) => !/how quickly can we achieve|reduce the cost of compliance audits/i.test(f.q)
);

export const metadata: Metadata = buildMetadata({
  title: data.metaTitle.replace(" | SecuEdge", ""),
  description: data.metaDescription,
  path: "/compliance",
});

export default function CompliancePage() {
  return (
    <div className="premium">
      <section className="relative overflow-hidden">
        <div className="premium-grid-bg absolute inset-0" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-6 py-16 md:py-24">
          <Reveal>
            <nav className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#526274]" aria-label="Breadcrumb">
              <Link href="/solutions" className="transition-colors hover:text-[#016FED]">All solutions</Link>
              <ChevronRight size={12} />
              <span className="text-[#0B2239]">Compliance</span>
            </nav>
            <p className="premium-eyebrow mt-8">Solutions · Compliance</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[1.0] tracking-[-0.035em] text-[#0B2239] md:text-6xl">{data.hero.headline}</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#30465C] md:text-lg">{data.hero.sub}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {data.frameworks.map((f) => (
                <span key={f.name} className="premium-chip">{f.name}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="prem-navy border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Reveal>
            <p className="premium-eyebrow">Compliance challenges</p>
            <h2 className="premium-section-title mt-4">{data.challenges.headline}</h2>
            {data.challenges.sub ? <p className="premium-section-lead">{data.challenges.sub}</p> : null}
          </Reveal>
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.05}>
            {data.challenges.items.map((it) => (
              <Item key={it.title}>
                <article className="premium-card h-full p-6">
                  <p className="text-base font-bold text-[#0B2239]">{it.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#526274]">{it.desc}</p>
                </article>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Reveal>
            <p className="premium-eyebrow">{data.frameworksIntro.eyebrow ?? "Frameworks we support"}</p>
            <h2 className="premium-section-title mt-4">{data.frameworksIntro.headline}</h2>
            {data.frameworksIntro.sub ? (
              <p className="premium-section-lead">{data.frameworksIntro.sub}</p>
            ) : null}
            <p className="mt-4 max-w-2xl rounded-xl border border-[rgba(11,34,57,0.12)] bg-white px-4 py-3 text-[13px] leading-relaxed text-[#526274]">
              Requirement → control → evidence: each framework below names the control areas SecuEdge
              addresses. For scope, applicability and current documents, contact SecuEdge.
            </p>
          </Reveal>
          <Stagger className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3" gap={0.05}>
            {data.frameworks.map((f) => (
              <Item key={f.name}>
                <div className="premium-card flex h-full flex-col p-7">
                  <p className="text-lg font-bold text-[#016FED]">{f.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#526274]">{f.desc}</p>
                  <ul className="mt-4 space-y-2 border-t border-[rgba(11,34,57,0.08)] pt-4">
                    {f.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-sm text-[#30465C]">
                        <Check size={14} className="mt-0.5 shrink-0 text-[#15803d]" aria-hidden />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="prem-navy border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Reveal>
            <p className="premium-eyebrow">Our approach</p>
            <h2 className="premium-section-title mt-4">{data.approachIntro.headline}</h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-4 md:grid-cols-2" gap={0.05}>
            {data.approach.map((a, i) => (
              <Item key={a.title}>
                <article className="premium-card h-full p-6">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#016FED]">0{i + 1}</span>
                  <p className="mt-2 text-base font-bold text-[#0B2239]">{a.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#526274]">{a.desc}</p>
                </article>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Reveal>
            <p className="premium-eyebrow">Key capabilities</p>
            <h2 className="premium-section-title mt-4">Compliance capabilities, built in.</h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-x-12 gap-y-7 sm:grid-cols-2" gap={0.04}>
            {data.capabilities.map((it) => (
              <Item key={it.title}>
                <div className="flex gap-4">
                  <Check size={18} strokeWidth={3} className="mt-1 h-5 w-5 shrink-0 text-[#15803d]" aria-hidden />
                  <div>
                    <p className="font-bold text-[#0B2239]">{it.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#526274]">{it.desc}</p>
                  </div>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <PremiumSteps eyebrow="Implementation" title="From gap analysis to audit-ready." steps={data.process} />

      {data.ongoingManagement ? (
        <section className="border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
          <div className="mx-auto w-full max-w-[1200px] px-6">
            <Reveal>
              <p className="premium-eyebrow">After go-live</p>
              <h2 className="premium-section-title mt-4">{data.ongoingManagement.headline}</h2>
            </Reveal>
            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.05}>
              {data.ongoingManagement.items.map((it) => (
                <Item key={it.title}>
                  <article className="premium-card h-full p-6">
                    <p className="text-base font-bold text-[#0B2239]">{it.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[#526274]">{it.desc}</p>
                  </article>
                </Item>
              ))}
            </Stagger>
          </div>
        </section>
      ) : null}

      <section className="prem-navy border-t border-[rgba(11,34,57,0.08)] py-16 md:py-20">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Reveal>
            <div className="premium-card flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-10">
              <div>
                <p className="premium-eyebrow">Powered by SecuEdge Frontier</p>
                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-[#0B2239]">
                  Audit-ready logs, segmentation and policy controls — delivered by one appliance family with Dual Mode.
                </p>
              </div>
              <Link href="/frontier" className="premium-btn-ghost shrink-0">Explore Frontier <ArrowRight size={15} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <PremiumFaq faqs={faqs} />

      <section className="prem-navy border-t border-[rgba(11,34,57,0.08)] py-16 md:py-20">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-5 px-6 md:flex-row md:items-center md:justify-between">
          <Reveal>
            <p className="premium-eyebrow">Documentation on request</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0B2239] md:text-3xl">Need scope, mappings or evidence samples?</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#526274]">Contact SecuEdge for current compliance documentation for your framework and environment.</p>
          </Reveal>
          <Reveal>
            <Link href="/contact" className="premium-btn-primary shrink-0">Request documentation <ArrowRight size={15} /></Link>
          </Reveal>
        </div>
      </section>

      <PremiumCta headline={data.cta.headline} sub={data.cta.sub} />
    </div>
  );
}
