import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileCheck2, Mail } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { CERTIFICATIONS, SITE } from "@/lib/site";
import { FirewallGatewayScene } from "@/components/FirewallGatewayScene";
import { Reveal, Stagger, Item } from "@/components/motion";
import "@/components/premium/premium.css";

export const metadata: Metadata = buildMetadata({
  title: "Trust & certifications",
  description:
    "SecuEdge Frontier is independently certified: ISO 27001/9001/14001/45001, Common Criteria / NDPP, FCC Part 15B and CE. DPDP-ready, with data that stays on Indian soil.",
  path: "/trust",
});

const EVIDENCE_ROWS = [
  {
    claim: "Independently certified product and management systems",
    evidence: "ISO 27001:2022 · ISO 9001:2015 · ISO 14001:2015 · ISO 45001:2018 · Common Criteria / NDPP (IaSALab evaluated) · FCC Part 15B · CE",
    docs: "Request scope and applicability documents",
  },
  {
    claim: "Honest technical specifications",
    evidence: "Form factor and Dual Mode verified per model; throughput, ports and dimensions published only when approved",
    docs: "Request the current model datasheet",
  },
  {
    claim: "Data handled under Indian jurisdiction",
    evidence: "DPDP-ready design; see the published DPDP statement",
    docs: "Read the DPDP statement",
  },
  {
    claim: "Direct security contact",
    evidence: `Security questions reach the team at ${SITE.email}`,
    docs: "Write to the SecuEdge team",
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
              <span className="text-[#0B2239]">Trust</span>
            </nav>
            <p className="premium-eyebrow mt-8">Trust you can verify</p>
            <h1 className="mt-4 max-w-2xl text-5xl font-extrabold leading-[1.0] tracking-[-0.035em] text-[#0B2239] md:text-6xl">Independently certified. Built in India.</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#30465C] md:text-lg">
              We don&rsquo;t ask you to take our word for it. Evidence first — claims only where
              documentation exists.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className="premium-btn-primary">Request documentation <ArrowRight size={15} /></Link>
              <Link href="/compliance" className="premium-btn-ghost">Compliance solutions</Link>
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
            <p className="premium-eyebrow">Evidence over claims</p>
            <h2 className="premium-section-title mt-4">Claim → evidence → documentation.</h2>
            <p className="premium-section-lead">If evidence isn&apos;t available, we don&apos;t make the claim. Everything below links to something verifiable.</p>
          </Reveal>
          <div className="mt-10 overflow-hidden rounded-2xl border border-[rgba(11,34,57,0.12)] bg-white">
            {EVIDENCE_ROWS.map((row, i) => (
              <Reveal key={row.claim}>
                <div className={`grid gap-2 p-6 md:grid-cols-[1fr_1.4fr_1fr] md:gap-6 ${i > 0 ? "border-t border-[rgba(11,34,57,0.08)]" : ""}`}>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.2em] text-[#016FED]">CLAIM 0{i + 1}</p>
                    <p className="mt-1.5 text-[15px] font-bold text-[#0B2239]">{row.claim}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.2em] text-[#15803d]">EVIDENCE</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#30465C]">{row.evidence}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.2em] text-[#526274]">DOCUMENTATION</p>
                    <p className="mt-1.5 text-sm font-semibold text-[#0B2239]">{row.docs}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Reveal>
            <p className="premium-eyebrow">Certifications & standards</p>
            <h2 className="premium-section-title mt-4">Associated credentials.</h2>
            <p className="premium-section-lead">Ask our team for current scope, product applicability and supporting documentation for any item below.</p>
          </Reveal>
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.05}>
            {CERTIFICATIONS.map((c) => (
              <Item key={c.name}>
                <div className="premium-card h-full p-6">
                  <FileCheck2 size={22} className="text-[#016FED]" />
                  <p className="mt-4 text-base font-bold text-[#0B2239]">{c.name}</p>
                  <p className="mt-1 text-sm text-[#526274]">{c.note}</p>
                </div>
              </Item>
            ))}
          </Stagger>

          <Reveal className="mt-6">
            <div className="premium-card p-7">
              <h2 className="text-lg font-bold text-[#0B2239]">Data sovereignty</h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#526274]">
                DPDP-ready by design. Data stays on Indian soil, and support is local. See our{" "}
                <Link className="font-semibold text-[#016FED] underline" href="/legal/dpdp">DPDP statement</Link>.
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-6">
            <div className="premium-card flex flex-col items-start gap-4 p-7 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <Mail size={20} className="mt-0.5 shrink-0 text-[#016FED]" />
                <div>
                  <h3 className="text-lg font-bold text-[#0B2239]">Responsible disclosure</h3>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-[#526274]">Found a security issue in a SecuEdge product? Write to <span className="font-semibold text-[#0B2239]">{SITE.email}</span> and our team will respond.</p>
                </div>
              </div>
              <Link href="/contact" className="premium-btn-primary shrink-0">Contact SecuEdge <ArrowRight size={15} /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
