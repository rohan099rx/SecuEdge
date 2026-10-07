import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Reveal, Stagger, Item } from "@/components/motion";
import { PremiumCta } from "@/components/premium/PremiumSections";
import { AssessmentQuiz } from "@/components/AssessmentQuiz";
import { FirewallGatewayScene } from "@/components/FirewallGatewayScene";
import "@/components/premium/premium.css";

export const metadata: Metadata = buildMetadata({
  title: "Free firewall security assessment",
  description:
    "Answer seven questions about your business. Get an explainable risk picture, industry-specific threats and tailored protection recommendations.",
  path: "/assessment",
});

const FLOW = [
  ["01 · Discover", "Seven questions about your business, data, access and IT setup."],
  ["02 · Assess", "Each answer adjusts a score that starts at 5 out of 10 — nothing hidden."],
  ["03 · Understand", "See your risk level, vulnerability points and industry threats."],
  ["04 · Recommend", "Get Frontier capabilities matched to what you reported."],
] as const;

export default function AssessmentPage() {
  return (
    <div className="premium">
      <section className="relative overflow-hidden">
        <div className="premium-grid-bg absolute inset-0" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-6 py-16 text-center md:py-24">
          <Reveal>
            <nav className="flex items-center justify-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#526274]" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-[#016FED]">Home</Link>
              <span aria-hidden>/</span>
              <span className="text-[#0B2239]">Assessment</span>
            </nav>
            <p className="premium-eyebrow mx-auto mt-8">Free security assessment</p>
            <h1 className="mx-auto mt-4 max-w-3xl text-5xl font-extrabold leading-[1.0] tracking-[-0.035em] text-[#0B2239] md:text-6xl">Is your organisation protected? Find out in 2 minutes.</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#30465C] md:text-lg">
              Answer seven questions about how your business works. Get a risk picture you can
              inspect, the threats specific to your industry, and a protection plan — no email required.
            </p>
          </Reveal>
          <Reveal aria-hidden>
            <div className="mx-auto mt-8 max-w-2xl"><FirewallGatewayScene /></div>
          </Reveal>
        </div>
      </section>

      <section className="prem-navy border-t border-[rgba(11,34,57,0.08)] py-16 md:py-20">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Reveal>
            <p className="premium-eyebrow">How scoring works</p>
            <h2 className="premium-section-title mt-4 !text-3xl md:!text-4xl">Explainable, not mysterious.</h2>
          </Reveal>
          <Stagger className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" gap={0.05}>
            {FLOW.map(([title, desc]) => (
              <Item key={title}>
                <div className="premium-card h-full p-5">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-[#016FED]">{title.split(" · ")[0]}</p>
                  <h3 className="mt-1.5 text-base font-bold text-[#0B2239]">{title.split(" · ")[1]}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[#526274]">{desc}</p>
                </div>
              </Item>
            ))}
          </Stagger>
          <Reveal>
            <p className="mt-6 max-w-3xl rounded-xl border border-[rgba(11,34,57,0.12)] bg-white px-4 py-3 text-[13px] leading-relaxed text-[#526274]">
              Scoring is transparent: every answer starts at 5 of 10. Storing customer data, remote access,
              a previous attack or public Wi-Fi use raises it; healthcare, finance and larger teams add weight.
              8+ reads High, 5–7 Medium, below that Low. No industry averages are claimed.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[rgba(11,34,57,0.08)] py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Reveal>
            <div className="premium-card mx-auto max-w-3xl p-6 md:p-10"><AssessmentQuiz /></div>
          </Reveal>
        </div>
      </section>

      <PremiumCta
        headline="Want the full picture?"
        sub="A SecuEdge engineer can run a comprehensive evaluation of your environment — free, no obligation."
      />
    </div>
  );
}
