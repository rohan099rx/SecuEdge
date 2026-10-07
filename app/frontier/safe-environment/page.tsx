import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ChevronRight, Check } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Reveal, Stagger, Item } from "@/components/motion";
import "@/components/premium/premium.css";

export const metadata: Metadata = buildMetadata({
  title: "The Safe Environment Filter",
  description:
    "More than a content filter — an early-warning system. When a search signals someone may be at risk, the Safe Environment Filter alerts the right person in real time, on any device.",
  path: "/frontier/safe-environment",
});

const STEPS = [
  { n: "1", t: "Concerning search", d: "A search that may signal self-harm or violence is detected in real time." },
  { n: "2", t: "Blocked instantly", d: "The content is blocked across every device on the network — wired or Wi-Fi." },
  { n: "3", t: "Person alerted", d: "A counsellor or admin is notified in under a second, on any device." },
];

export default function SafeEnvironmentPage() {
  return (
    <div className="premium">
      <div className="mx-auto w-full max-w-[1200px] px-6 pt-8">
        <nav className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500" aria-label="Breadcrumb">
          <Link href="/products" className="transition-colors hover:text-white">Products</Link>
          <ChevronRight size={12} />
          <Link href="/products/frontier" className="transition-colors hover:text-white">Frontier</Link>
          <ChevronRight size={12} />
          <span className="text-slate-300">Safe Environment</span>
        </nav>
      </div>

      <section className="relative overflow-hidden">
        <div className="premium-grid-bg absolute inset-0" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-6 py-16 md:py-24">
          <Reveal>
            <p className="premium-eyebrow">Protecting people, not just networks</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-[1.0] tracking-tight text-white md:text-6xl">The Safe Environment Filter.</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
              A search that signals someone may be at risk doesn&rsquo;t just get blocked — the right
              person is alerted, in real time. Not just a content filter: an early-warning system for
              the people in your care.
            </p>
          </Reveal>
          <Reveal className="mt-10">
            <div className="premium-panel flex flex-wrap items-center gap-x-3 gap-y-2 px-5 py-4">
              <span className="premium-panel-label">How it flows</span>
              <span className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-300">
                {["Traffic", "Controlled environment", "Inspection", "Decision"].map((s, i, arr) => (
                  <span key={s} className="flex items-center gap-2">
                    <span className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1">{s}</span>
                    {i < arr.length - 1 && <ArrowRight size={12} className="text-slate-600" />}
                  </span>
                ))}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/[0.07] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Stagger className="grid gap-4 md:grid-cols-3" gap={0.06}>
            {STEPS.map((s) => (
              <Item key={s.n}>
                <div className="premium-card h-full p-7">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-sm font-bold text-[#02131f] tabular-nums">{s.n}</div>
                  <p className="mt-5 text-base font-bold text-white">{s.t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.d}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-t border-white/[0.07] bg-white/[0.015] py-20 md:py-28">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 px-6 md:grid-cols-2">
          <Reveal>
            <p className="premium-eyebrow">Built for the ones who vet hardest</p>
            <h2 className="premium-section-title mt-4">For schools, colleges and healthcare.</h2>
            <p className="premium-section-lead">Safeguarding obligations, duty of care, and student or patient wellbeing — addressed at the network layer, with nothing to install on devices.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className="premium-btn-primary">Talk to us about safeguarding <ArrowRight size={15} /></Link>
              <Link href="/industries/education" className="premium-btn-ghost">Education security</Link>
            </div>
          </Reveal>
          <Stagger className="grid gap-3" gap={0.05}>
            {[
              ["Every search engine", "Safe mode enforced on Google, Bing & YouTube — automatically."],
              ["Every device on the network", "Wired or Wi-Fi, staff or guest — nothing to install."],
              ["Alert in under a second", "A counsellor or admin is notified the moment it happens."],
            ].map(([t, d]) => (
              <Item key={t}>
                <div className="premium-card flex gap-4 p-5">
                  <Check size={16} className="mt-0.5 shrink-0 text-emerald-300" />
                  <div>
                    <p className="text-sm font-bold text-white">{t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">{d}</p>
                  </div>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>
    </div>
  );
}
