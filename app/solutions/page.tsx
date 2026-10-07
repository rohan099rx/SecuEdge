import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Reveal, Stagger, Item } from "@/components/motion";
import { IconChip, iconFor } from "@/components/Icons";
import { SOLUTIONS_NAV } from "@/lib/site";
import { SOLUTION_CONTENT } from "@/lib/content/solutions";
import { PremiumCta } from "@/components/premium/PremiumSections";
import "@/components/premium/premium.css";

export const metadata: Metadata = buildMetadata({
  title: "Security solutions",
  description:
    "Network security, threat prevention, secure remote access, segmentation, IoT security and deployments for every business size — all delivered by SecuEdge Frontier.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <div className="premium">
      <section className="relative overflow-hidden">
        <div className="premium-grid-bg absolute inset-0" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-6 py-16 md:py-24">
          <Reveal>
            <p className="premium-eyebrow">Solutions</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[1.0] tracking-[-0.035em] text-[#0B2239] md:text-6xl">One appliance. Every security job.</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#30465C] md:text-lg">Whatever brought you here — locking down the network, connecting branches, securing remote work — Frontier covers it without the complexity that gets people breached.</p>
          </Reveal>
        </div>
      </section>

      <section className="prem-navy border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.05}>
            {SOLUTIONS_NAV.map((s) => {
              const c = SOLUTION_CONTENT[s.slug];
              return (
                <Item key={s.slug}>
                  <Link href={`/solutions/${s.slug}`} className="premium-card group flex h-full flex-col p-7">
                    <IconChip name={iconFor(s.name)} />
                    <p className="mt-5 text-lg font-bold text-[#0B2239]">{s.name}</p>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#526274]">
                      {c?.metaDescription?.replace(/^SecuEdge (provides|offers)\s*/i, "") ?? ""}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-bold text-[#016FED]">Explore <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span>
                  </Link>
                </Item>
              );
            })}
            <Item>
              <Link href="/compliance" className="premium-card group flex h-full flex-col p-7">
                <IconChip name="document" />
                <p className="mt-5 text-lg font-bold text-[#0B2239]">Compliance</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#526274]">
                  PCI DSS, HIPAA, GDPR, ISO 27001, SOC 2 and industry-specific frameworks — with the
                  network controls and audit evidence to match.
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-bold text-[#016FED]">Explore <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span>
              </Link>
            </Item>
          </Stagger>
        </div>
      </section>

      <section className="border-t border-[rgba(11,34,57,0.08)] py-16 md:py-20">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Reveal>
            <div className="premium-card flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-10">
              <div>
                <p className="premium-eyebrow">Powered by SecuEdge Frontier</p>
                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-[#0B2239]">Every solution on this page — delivered by one appliance family with Dual Mode.</p>
              </div>
              <Link href="/frontier" className="premium-btn-ghost shrink-0">Explore Frontier <ArrowRight size={15} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <PremiumCta />
    </div>
  );
}
