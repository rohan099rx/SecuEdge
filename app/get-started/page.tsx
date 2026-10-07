import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Reveal, Stagger, Item } from "@/components/motion";
import { ContactForm } from "@/components/ContactForm";
import { PremiumFaq, PremiumCta, PremiumSteps } from "@/components/premium/PremiumSections";
import raw from "@/lib/content/data/get-started.json";
import type { TitledItem, Faq } from "@/lib/content/types";
import "@/components/premium/premium.css";

type GetStartedData = {
  metaTitle: string;
  metaDescription: string;
  hero: { eyebrow: string; headline: string; sub: string };
  benefitsIntro: { headline: string; sub?: string };
  benefits: TitledItem[];
  processIntro: { headline: string; sub?: string };
  process: TitledItem[];
  formSection: { eyebrow?: string; headline: string; sub?: string; sidebarPoints?: TitledItem[] };
  faqs?: Faq[];
};

const data = raw as unknown as GetStartedData;

/* Fabricated claims are filtered at render — the JSON file itself is untouched:
   "24/7 Monitoring" benefit, timeline + trial + 24/7-support FAQs, trial/support
   badges, "within 24 hours" sidebar point, enterprise phone number, and the
   "thousands of businesses" CTA sub are all excluded as unverified. */
const benefits = data.benefits.filter((b) => b.title !== "24/7 Monitoring");
const faqs = (data.faqs ?? []).filter(
  (f) => !/how long does implementation|trial periods|what kind of support/i.test(f.q)
);
const sidebarPoints = (data.formSection.sidebarPoints ?? []).filter(
  (p) => !/within 24 hours/i.test(p.desc)
);

export const metadata: Metadata = buildMetadata({
  title: "Get started with SecuEdge",
  description: data.metaDescription,
  path: "/get-started",
});

const JOURNEY = [
  { step: "01 · Understand", title: "Learn the architecture", desc: "See how Frontier policy sits at the edge and how the portfolio maps to the work.", links: [["Platform architecture", "/platform"], ["All products", "/products"]] },
  { step: "02 · Evaluate", title: "Assess your exposure", desc: "Answer seven questions and get an explainable risk picture for your environment.", links: [["Take the assessment", "/assessment"], ["Find your model", "/products/recommend"]] },
  { step: "03 · Compare", title: "Shortlist hardware honestly", desc: "Verified form factors and modes side by side; the rest available on request.", links: [["Compare models", "/products/compare"], ["Appliance range", "/frontier/appliances"]] },
  { step: "04 · Deploy / Discuss", title: "Talk sizing with SecuEdge", desc: "Confirm the validated spec sheet and plan Quick or Professional Mode rollout.", links: [["Contact sales", "/contact"], ["Dual Mode", "/frontier/dual-mode"]] },
] as const;

export default function GetStartedPage() {
  return (
    <div className="premium">
      <section className="relative overflow-hidden">
        <div className="premium-grid-bg absolute inset-0" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-6 py-16 md:py-24">
          <Reveal>
            <nav className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#526274]" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-[#016FED]">Home</Link>
              <span aria-hidden>/</span>
              <span className="text-[#0B2239]">Get started</span>
            </nav>
            <p className="premium-eyebrow mt-8">{data.hero.eyebrow}</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[1.0] tracking-[-0.035em] text-[#0B2239] md:text-6xl">Start with the right security architecture.</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#30465C] md:text-lg">{data.hero.sub}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#start-form" className="premium-btn-primary">Get started now <ArrowRight size={15} /></a>
              <Link href="/frontier" className="premium-btn-ghost">Explore Frontier</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="prem-navy border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Reveal>
            <p className="premium-eyebrow">Your path</p>
            <h2 className="premium-section-title mt-4">Understand → evaluate → compare → deploy.</h2>
            <p className="premium-section-lead">Each step links to the existing route that does the work. No timelines invented, no pricing promised.</p>
          </Reveal>
          <Stagger className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4" gap={0.06}>
            {JOURNEY.map((j) => (
              <Item key={j.step}>
                <article className="premium-card flex h-full flex-col p-6">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#016FED]">{j.step}</span>
                  <h3 className="mt-2 text-lg font-bold text-[#0B2239]">{j.title}</h3>
                  <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-[#526274]">{j.desc}</p>
                  <div className="mt-4 space-y-1.5 border-t border-[rgba(11,34,57,0.08)] pt-3">
                    {j.links.map(([label, href]) => (
                      <Link key={href + label} href={href} className="flex items-center justify-between text-[13px] font-bold text-[#016FED]">{label} <ArrowRight size={13} /></Link>
                    ))}
                  </div>
                </article>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Reveal>
            <p className="premium-eyebrow">Why SecuEdge</p>
            <h2 className="premium-section-title mt-4">{data.benefitsIntro.headline}</h2>
            {data.benefitsIntro.sub ? <p className="premium-section-lead">{data.benefitsIntro.sub}</p> : null}
          </Reveal>
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.05}>
            {benefits.map((b) => (
              <Item key={b.title}>
                <article className="premium-card h-full p-6">
                  <p className="text-base font-bold text-[#0B2239]">{b.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#526274]">{b.desc}</p>
                </article>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <PremiumSteps title={data.processIntro.headline} steps={data.process} />

      <section className="prem-navy border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28" id="start-form">
        <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <p className="premium-eyebrow">{data.formSection.eyebrow ?? "Ready to begin?"}</p>
            <h2 className="premium-section-title mt-4 !text-3xl md:!text-4xl">{data.formSection.headline}</h2>
            {data.formSection.sub ? (
              <p className="premium-section-lead">{data.formSection.sub}</p>
            ) : null}
            {sidebarPoints.length ? (
              <ul className="mt-8 space-y-3">
                {sidebarPoints.map((p) => (
                  <li key={p.title} className="premium-card p-5">
                    <p className="text-sm font-bold text-[#0B2239]">{p.title}</p>
                    <p className="mt-1 text-sm text-[#526274]">{p.desc}</p>
                  </li>
                ))}
              </ul>
            ) : null}
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {faqs.length ? <PremiumFaq faqs={faqs} /> : null}

      <PremiumCta
        headline="Prefer to talk it through?"
        sub="Book a demo and see Dual Mode on your own traffic."
      />
    </div>
  );
}
