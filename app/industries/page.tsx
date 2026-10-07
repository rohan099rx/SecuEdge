import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Reveal, Stagger, Item } from "@/components/motion";
import { IconChip, iconFor } from "@/components/Icons";
import { INDUSTRIES } from "@/lib/site";
import { INDUSTRY_CONTENT, INDUSTRY_CARDS } from "@/lib/content/industries";
import { PremiumCta } from "@/components/premium/PremiumSections";
import "@/components/premium/premium.css";

export const metadata: Metadata = buildMetadata({
  title: "Industry security solutions",
  description:
    "Tailored SecuEdge Frontier deployments for education, healthcare, finance, government, manufacturing, retail, legal and media — including the sectors that vet hardest.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <div className="premium">
      <section className="relative overflow-hidden">
        <div className="premium-grid-bg absolute inset-0" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-6 py-16 md:py-24">
          <Reveal>
            <p className="premium-eyebrow">Industries</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[1.0] tracking-[-0.035em] text-[#0B2239] md:text-6xl">Built for the sectors that vet hardest.</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#30465C] md:text-lg">Every industry has its own threats, regulators and duty of care. Frontier ships with the controls each one needs — configured correctly from day one.</p>
          </Reveal>
        </div>
      </section>

      <section className="prem-navy border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.05}>
            {INDUSTRIES.map((ind) => {
              const c = INDUSTRY_CONTENT[ind.slug];
              const card = INDUSTRY_CARDS.find((x) =>
                x.industry.toLowerCase().includes(ind.name.toLowerCase())
              );
              return (
                <Item key={ind.slug}>
                  <Link href={`/industries/${ind.slug}`} className="premium-card group flex h-full flex-col p-7">
                    <IconChip name={iconFor(ind.name)} />
                    <p className="mt-5 text-lg font-bold text-[#0B2239]">{ind.name}</p>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#526274]">
                      {card?.desc ?? c?.metaDescription ?? ""}
                    </p>
                    {card?.features?.length ? (
                      <ul className="mt-4 space-y-1.5">
                        {card.features.slice(0, 3).map((f) => (
                          <li key={f} className="flex items-center gap-2 text-xs text-[#526274]">
                            <span className="h-1 w-1 rounded-full bg-[#016FED]" aria-hidden /> {f}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-bold text-[#016FED]">Explore <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span>
                  </Link>
                </Item>
              );
            })}
          </Stagger>
        </div>
      </section>

      <PremiumCta
        headline="Not sure where you fit?"
        sub="Talk to us — we'll map Frontier to your environment."
      />
    </div>
  );
}
