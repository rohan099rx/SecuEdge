import Link from "next/link";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { Reveal, Stagger, Item } from "@/components/motion";
import { PremiumFaq, PremiumCta, PremiumSteps } from "@/components/premium/PremiumSections";
import { SECUEDGE_PRODUCTS } from "@/lib/site";
import type { DetailContent } from "@/lib/content/types";
import "@/components/premium/premium.css";

/**
 * Shared template for solution & industry pages.
 * Renders only the sections present in the content object, in a fixed
 * order: PROBLEM → REQUIREMENT → APPROACH → PRODUCTS → CAPABILITIES → NEXT.
 *
 * Content filtering (JSON files untouched — filters documented here):
 * - "Enterprise Support & Services" is excluded from the enterprise approach
 *   list (it promised 24/7 assistance with guaranteed response times).
 * - The IoT "scale to thousands of devices" FAQ is excluded (absolute scale
 *   guarantee). AI positioning language elsewhere is retained as qualitative
 *   vendor positioning, not a measured claim.
 */
const EXCLUDED_APPROACH: Record<string, string[]> = {
  "enterprise": ["Enterprise Support & Services"],
};

const EXCLUDED_FAQS: Record<string, string[]> = {
  "iot-security": ["Can your IoT security solution scale to accommodate thousands of devices?"],
};

/* Timeline answers ("typically 2–4 weeks…", "just 15 minutes") and
   counterfactual incident claims ("how would SecuEdge have changed…") are
   unverified across solution/industry pages — excluded by pattern. */
const TIMELINE_Q_RE = /how (quickly|long)/i;
const TIMELINE_A_RE = /\d+\s*(-|–)?\s*\d*\s*(week|month)s?|just 15 minutes/i;
const COUNTERFACTUAL_Q_RE = /how would SecuEdge (have changed|h)/i;

function visibleApproach(content: DetailContent) {
  const excluded = EXCLUDED_APPROACH[content.slug] ?? [];
  return (content.approach ?? []).filter((a) => !excluded.includes(a.title));
}

function visibleFaqs(content: DetailContent) {
  const excluded = EXCLUDED_FAQS[content.slug] ?? [];
  return (content.faqs ?? []).filter(
    (f) =>
      !excluded.includes(f.q) &&
      !COUNTERFACTUAL_Q_RE.test(f.q) &&
      !(TIMELINE_Q_RE.test(f.q) && TIMELINE_A_RE.test(f.a))
  );
}

export function DetailPage({
  content,
  eyebrow,
  crumb,
  frontierContext,
}: {
  content: DetailContent;
  eyebrow: string;
  crumb: { href: string; label: string };
  frontierContext: string;
}) {
  const c = content;
  const approach = visibleApproach(c);
  const faqs = visibleFaqs(c);

  return (
    <div className="premium">
      <section className="relative overflow-hidden">
        <div className="premium-grid-bg absolute inset-0" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-6 py-16 md:py-24">
          <Reveal>
            <nav className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#526274]" aria-label="Breadcrumb">
              <Link href={crumb.href} className="transition-colors hover:text-[#016FED]">{crumb.label}</Link>
              <ChevronRight size={12} />
              <span className="text-[#0B2239]">{c.slug}</span>
            </nav>
            <p className="premium-eyebrow mt-8">{eyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-extrabold leading-[1.0] tracking-[-0.035em] text-[#0B2239] md:text-6xl">{c.hero?.headline ?? c.metaTitle ?? c.slug}</h1>
            {c.hero?.sub ?? c.metaDescription ? (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#30465C] md:text-lg">{c.hero?.sub ?? c.metaDescription}</p>
            ) : null}
            {c.compliance?.length ? (
              <div className="mt-7 flex flex-wrap gap-2">
                {c.compliance.map((tag) => (
                  <span key={tag} className="premium-chip">{tag}</span>
                ))}
              </div>
            ) : null}
          </Reveal>
        </div>
      </section>

      {c.stats?.length ? (
        <section className="prem-navy border-t border-[rgba(11,34,57,0.08)] py-16 md:py-20">
          <div className="mx-auto w-full max-w-[1200px] px-6">
            <Reveal>
              <p className="premium-eyebrow">Reported industry incidents</p>
              <h2 className="premium-section-title mt-4 !text-3xl md:!text-4xl">Why this sector prepares.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#526274]">Publicly reported incidents from this industry — context for the requirements below, not SecuEdge outcomes.</p>
            </Reveal>
            <Stagger className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" gap={0.05}>
              {c.stats.map((s) => (
                <Item key={s.label}>
                  <div className="premium-card h-full p-6">
                    <p className="text-3xl font-extrabold tracking-tight text-[#0B2239] tabular-nums">{s.value}</p>
                    <p className="mt-2 text-[13px] leading-relaxed text-[#526274]">{s.label}</p>
                  </div>
                </Item>
              ))}
            </Stagger>
          </div>
        </section>
      ) : null}

      {c.challenges?.length ? (
        <section className="border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
          <div className="mx-auto w-full max-w-[1200px] px-6">
            <Reveal>
              <p className="premium-eyebrow">The challenges</p>
              <h2 className="premium-section-title mt-4">What you&apos;re up against.</h2>
            </Reveal>
            <Stagger className={`mt-10 grid gap-4 ${c.challenges.length % 2 === 0 ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`} gap={0.05}>
              {c.challenges.map((it) => (
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

      {c.threats?.length ? (
        <section className="prem-navy border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
          <div className="mx-auto w-full max-w-[1200px] px-6">
            <Reveal>
              <p className="premium-eyebrow">Real-world threats</p>
              <h2 className="premium-section-title mt-4">This is not theoretical.</h2>
            </Reveal>
            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.05}>
              {c.threats.map((it) => (
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

      {approach.length ? (
        <section className="border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
          <div className="mx-auto w-full max-w-[1200px] px-6">
            <Reveal>
              <p className="premium-eyebrow">Our approach</p>
              <h2 className="premium-section-title mt-4">How SecuEdge answers it.</h2>
            </Reveal>
            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.05}>
              {approach.map((it) => (
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

      {c.capabilities?.length ? (
        <section className="prem-navy border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
          <div className="mx-auto w-full max-w-[1200px] px-6">
            <Reveal>
              <p className="premium-eyebrow">Capabilities</p>
              <h2 className="premium-section-title mt-4">Everything you need, nothing half-configured.</h2>
            </Reveal>
            <Stagger className="mt-10 grid gap-x-12 gap-y-7 sm:grid-cols-2" gap={0.04}>
              {c.capabilities.map((it) => (
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
      ) : null}

      {c.applications?.length ? (
        <section className="border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
          <div className="mx-auto w-full max-w-[1200px] px-6">
            <Reveal>
              <p className="premium-eyebrow">Where it applies</p>
              <h2 className="premium-section-title mt-4">Where this matters most.</h2>
            </Reveal>
            <Stagger className="mt-10 grid gap-4 md:grid-cols-2" gap={0.05}>
              {c.applications.map((a) => (
                <Item key={a.title}>
                  <article className="premium-card h-full p-7">
                    <p className="text-lg font-bold text-[#0B2239]">{a.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[#526274]">{a.desc}</p>
                    {a.benefits?.length ? (
                      <ul className="mt-5 space-y-2">
                        {a.benefits.map((b) => (
                          <li key={b} className="flex items-start gap-2.5 text-sm text-[#30465C]">
                            <Check size={14} className="mt-0.5 shrink-0 text-[#15803d]" aria-hidden />
                            {b}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                </Item>
              ))}
            </Stagger>
          </div>
        </section>
      ) : null}

      {c.process?.length ? (
        <PremiumSteps eyebrow="Engagement" title="From first call to fully protected." steps={c.process} />
      ) : null}

      <section className="border-t border-[rgba(11,34,57,0.08)] py-16 md:py-20">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Reveal>
            <div className="premium-card flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-10">
              <div>
                <p className="premium-eyebrow">Powered by SecuEdge Frontier</p>
                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-[#0B2239]">{frontierContext} — delivered by one appliance family with Dual Mode.</p>
              </div>
              <Link href="/frontier" className="premium-btn-ghost shrink-0">Explore Frontier <ArrowRight size={15} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="prem-navy border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Reveal>
            <p className="premium-eyebrow">Related products</p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#0B2239] md:text-3xl">Explore the SecuEdge portfolio.</h2>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SECUEDGE_PRODUCTS.map((p) => (
              <Reveal key={p.key}>
                <Link href={p.href} className="premium-card group flex h-full flex-col p-5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#016FED]">{p.category}</span>
                  <strong className="mt-1.5 block text-base font-bold text-[#0B2239]">{p.name}</strong>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#016FED]">Explore <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {faqs.length ? <PremiumFaq faqs={faqs} /> : null}

      <PremiumCta headline={c.cta?.headline} sub={c.cta?.sub} />
    </div>
  );
}
