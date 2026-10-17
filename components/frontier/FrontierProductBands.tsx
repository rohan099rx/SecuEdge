"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, Cpu, Zap } from "lucide-react";
import { APPLIANCES, CUSTOM_APPLIANCE, PRO_CAPABILITIES, SECURITY_LEVELS } from "@/lib/site";
import { FrontierConsolePreview } from "@/components/FrontierConsolePreview";
import { FrontierModelViewer } from "@/components/FrontierModelViewer";
import { Reveal, Stagger, Item } from "@/components/motion";
import { TiltCard } from "@/components/TiltCard";

function SectionHead({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <Reveal>
      <div className="premium-section-head">
        <p className="premium-eyebrow">{eyebrow}</p>
        <h2 className="premium-section-title">{title}</h2>
        <p className="premium-section-lead">{lead}</p>
      </div>
    </Reveal>
  );
}

/* Appliance showroom — the shared hardware family, grouped by form factor. */
const RACK_MODELS = APPLIANCES.filter((a) => a.formFactor === "Rack-mount");
const SHOWROOM_GROUPS: Array<[string, typeof APPLIANCES]> = [
  ["Desktop edge", APPLIANCES.filter((a) => a.formFactor === "Desktop")],
  ["Professional rack", RACK_MODELS.slice(0, 3)],
  ["High-scale", RACK_MODELS.slice(3)],
];

/**
 * SecuEdge Frontier's own feature bands: the appliance showroom, Dual Mode and
 * the technical-specification request. These live with the product (on
 * /products/frontier) rather than on the portfolio landing page.
 */
export function FrontierProductBands() {
  const [selectedProduct, setSelectedProduct] = useState(APPLIANCES[0]);

  return (
    <>
      {/* ── Appliance showroom (3D hardware view) ── */}
      <section id="appliances" className="prem-cream-soft relative border-t border-[var(--prem-border)] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <SectionHead eyebrow="Appliance showroom" title="One hardware family. Seven models." lead="The whole portfolio runs on the same SecuEdge appliances. Pick a model to spin it in 3D — every model ships both Quick Mode and Professional Mode, and above 1,300 users we design the box with you." />
          <div className="mt-10 grid gap-5 lg:grid-cols-[370px_1fr]">
            <div className="premium-card p-2.5 lg:max-h-[672px] lg:overflow-y-auto">
              {SHOWROOM_GROUPS.filter(([, models]) => models.length > 0).map(([group, models]) => (
                <div key={group} className="mb-1">
                  <p className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">{group}</p>
                  {models.map((product) => (
                    <button
                      key={product.model}
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      aria-pressed={selectedProduct.model === product.model}
                      className={["premium-model-btn", selectedProduct.model === product.model && "is-active"].filter(Boolean).join(" ")}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-mono text-base font-bold text-[var(--prem-text)]">{product.model}</span>
                        <span className="rounded-md border border-[var(--prem-border)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-[var(--prem-muted)]">{product.formFactor}</span>
                      </span>
                      <span className="mt-1 block text-xs text-[var(--prem-muted)]">{product.userRange} users · {product.typicalSite}</span>
                    </button>
                  ))}
                </div>
              ))}
              <div className="mb-1">
                <p className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Above the range</p>
                <div className="mx-1 rounded-xl border border-[rgba(1,111,237,0.35)] bg-[rgba(1,111,237,0.06)] px-3.5 py-3">
                  <span className="font-mono text-base font-bold text-[var(--prem-text)]">{CUSTOM_APPLIANCE.model}</span>
                  <span className="mt-1 block text-xs text-[var(--prem-muted)]">{CUSTOM_APPLIANCE.userRange} users · {CUSTOM_APPLIANCE.typicalSite}</span>
                </div>
              </div>
            </div>

            <div className="premium-card overflow-hidden">
              <div className="h-[360px] sm:h-[420px] lg:h-[480px]">
                <FrontierModelViewer model={selectedProduct.model} formFactor={selectedProduct.formFactor} userRange={selectedProduct.userRange} />
              </div>
              <div className="border-t border-[var(--prem-border)] px-5 py-4">
                <div className="grid gap-px overflow-hidden rounded-xl border border-[var(--prem-border)] bg-[rgba(11,34,57,0.10)] sm:grid-cols-2">
                  {[
                    ["Form factor", selectedProduct.formFactor, "Verified"],
                    ["Operating modes", "Quick + Professional", "Included"],
                    ["Recommended users", `${selectedProduct.userRange} (indicative)`, "Guide"],
                    ["Technical specifications", "Available on request", "On request"],
                  ].map(([k, v, s]) => (
                    <div key={k} className="bg-[var(--prem-bg-soft)] px-4 py-3">
                      <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">{k}</div>
                      <div className="mt-1 flex items-center justify-between gap-2 text-sm font-semibold text-[var(--prem-text)]">{v}<span className="font-mono text-[9px] uppercase tracking-widest text-[#15803d]">{s}</span></div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs leading-relaxed text-[var(--prem-muted)]">
                  <span className="font-semibold text-[var(--prem-text)]">Typical site · </span>{selectedProduct.typicalSite}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href={`/products/frontier/${selectedProduct.model.toLowerCase()}`} className="premium-btn-primary !min-h-[2.6rem] !text-[13px]">View {selectedProduct.model} <ArrowRight size={14} /></Link>
                  <Link href="/frontier/appliances" className="premium-btn-ghost !min-h-[2.6rem] !text-[13px]">Compare family</Link>
                  <Link href="/contact" className="premium-btn-ghost !min-h-[2.6rem] !text-[13px]">Request specifications</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Dual Mode ── */}
      <section id="modes" className="prem-navy relative border-t border-[var(--prem-border)] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <SectionHead eyebrow="Frontier dual mode" title="One appliance. Two ways to work." lead="Protection levels from the actual Quick Mode engine set, and control areas from the real Professional capability list." />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="premium-card h-full p-7 md:p-8">
                <span className="premium-badge">Quick Mode · guided setup</span>
                <h3 className="mt-4 flex items-center gap-2.5 text-2xl font-bold text-white"><Zap size={22} className="text-[var(--prem-blue)]" />One-click protection</h3>
                <div className="mt-6 space-y-3">
                  {SECURITY_LEVELS.map((level) => (
                    <div key={level.key} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <strong className="text-sm font-bold text-white">{level.label}</strong>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">
                          IDS {level.engines.ids} · IPS {level.engines.ips} · AV {level.engines.antivirus}
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{level.blurb}</p>
                    </div>
                  ))}
                </div>
                <Link href="/frontier/dual-mode" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300">Explore Quick Mode <ArrowRight size={15} /></Link>
              </div>
            </Reveal>
            <Reveal>
              <div className="premium-card h-full border-[rgba(1,111,237,0.25)] bg-gradient-to-br from-[rgba(1,111,237,0.06)] to-transparent p-7 md:p-8">
                <span className="premium-badge">Professional Mode · granular control</span>
                <h3 className="mt-4 flex items-center gap-2.5 text-2xl font-bold text-white"><Cpu size={22} className="text-[var(--prem-blue)]" />Full NGFW control</h3>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {PRO_CAPABILITIES.map((c) => (
                    <li key={c.title} className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                      <strong className="block text-[13px] font-bold text-white">{c.title}</strong>
                      <span className="mt-1 block text-xs leading-relaxed text-slate-500">{c.desc}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/frontier/dual-mode" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300">Explore Professional Mode <ArrowRight size={15} /></Link>
              </div>
            </Reveal>
          </div>
          <Reveal className="mt-8">
            <TiltCard max={3}>
              <div className="premium-card overflow-hidden p-2"><FrontierConsolePreview /></div>
            </TiltCard>
          </Reveal>
          <Stagger className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[var(--prem-border)] bg-[rgba(11,34,57,0.10)] md:grid-cols-3" gap={0.05}>
            {PRO_CAPABILITIES.map((c, i) => (
              <Item key={c.title}>
                <div className="h-full bg-[var(--prem-bg-soft)] p-6">
                  <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--prem-blue-deep)]">CAP·0{i + 1}</div>
                  <h3 className="mt-2 text-base font-bold text-[var(--prem-text)]">{c.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--prem-muted)]">{c.desc}</p>
                </div>
              </Item>
            ))}
          </Stagger>
          <Reveal className="mt-8 flex flex-wrap gap-3">
            <Link href="/frontier/capabilities" className="premium-btn-primary">All Frontier capabilities <ArrowRight size={15} /></Link>
            <Link href="/platform" className="premium-btn-ghost">NGFW architecture</Link>
          </Reveal>
        </div>
      </section>

      {/* ── Technical specification request ── */}
      <section id="spec-request" className="prem-cream-soft relative overflow-hidden border-t border-[var(--prem-border)] py-24 md:py-32">
        <div className="premium-glow-orb left-1/2 top-1/2 h-[320px] w-[640px] -translate-x-1/2 -translate-y-1/2 bg-[#016FED]/15" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-6">
          <div className="premium-card grid gap-8 p-8 md:grid-cols-2 md:p-12">
            <div>
              <p className="premium-eyebrow">Technical specifications</p>
              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[var(--prem-text)] md:text-4xl">Need performance data? Request the spec sheet.</h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--prem-muted)]">
                Throughput, sessions, interfaces and dimensions are published per model after validation.
                Pick a model and our team will share the current validated sheet.
              </p>
              <div className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                <Check size={13} className="text-[#15803d]" /> No inflated numbers · validated sheets only
              </div>
            </div>
            <div>
              <p className="premium-panel-label" id="spec-model-label">Select a model</p>
              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4" role="group" aria-labelledby="spec-model-label">
                {APPLIANCES.map((m) => (
                  <button key={m.model} type="button" onClick={() => setSelectedProduct(m)} aria-pressed={selectedProduct.model === m.model}
                    className={`rounded-lg border px-2 py-2.5 font-mono text-xs font-bold transition-colors ${selectedProduct.model === m.model ? "border-[rgba(1,111,237,0.5)] bg-[rgba(1,111,237,0.10)] text-[var(--prem-text)]" : "border-[var(--prem-border)] bg-white text-[var(--prem-muted)] hover:border-[rgba(11,34,57,0.3)] hover:text-[var(--prem-text)]"}`}>
                    {m.model}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/contact" className="premium-btn-primary">Request {selectedProduct.model} specs <ArrowRight size={15} /></Link>
                <Link href="/products/compare" className="premium-btn-ghost">Compare models</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
