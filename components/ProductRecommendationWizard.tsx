"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { APPLIANCES } from "@/lib/site";

const tiers = ["Branch / small office", "Mid-market", "Enterprise"] as const;
type FormFactor = "Any" | "Desktop" | "Rack-mount";

export function ProductRecommendationWizard() {
  const [tier, setTier] = useState<(typeof tiers)[number]>(tiers[0]);
  const [formFactor, setFormFactor] = useState<FormFactor>("Any");
  const [mode, setMode] = useState("Not sure yet");
  const [submitted, setSubmitted] = useState(false);
  const results = useMemo(() => APPLIANCES.filter((model) => model.tier === tier && (formFactor === "Any" || model.formFactor === formFactor)), [tier, formFactor]);

  return <div className="text-slate-200">
    {!submitted ? <div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300">Frontier model finder</p><h2 className="mt-2 text-2xl font-bold text-white">Shortlist models to discuss.</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">This guide narrows the hardware family using your chassis preference and indicative deployment band. It does not estimate throughput or replace a technical sizing review.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3"><label className="block text-xs font-semibold text-slate-300">Which deployment band best describes your environment?<select value={tier} onChange={(event) => setTier(event.target.value as typeof tier)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1424] px-3 py-2.5 text-sm text-white">{tiers.map((option) => <option key={option}>{option}</option>)}</select></label><label className="block text-xs font-semibold text-slate-300">Preferred hardware format<select value={formFactor} onChange={(event) => setFormFactor(event.target.value as FormFactor)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1424] px-3 py-2.5 text-sm text-white"><option>Any</option><option>Desktop</option><option>Rack-mount</option></select></label><label className="block text-xs font-semibold text-slate-300">Which operating mode do you expect to use?<select value={mode} onChange={(event) => setMode(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1424] px-3 py-2.5 text-sm text-white"><option>Not sure yet</option><option>Quick Mode</option><option>Professional Mode</option><option>Both modes</option></select></label></div>
      <button type="button" className="premium-btn-primary mt-6" onClick={() => setSubmitted(true)}>Show matching models <ArrowRight size={16} /></button>
    </div> : <div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300">Frontier · Model shortlist</p><h2 className="mt-2 text-2xl font-bold text-white">{results.length ? `${results.length} model${results.length === 1 ? "" : "s"} to review` : "No exact chassis match"}</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">Deployment band: {tier} (indicative). Chassis preference: {formFactor}. Mode preference: {mode}. Both Quick and Professional modes are available across the Frontier family.</p>
      <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">{(results.length ? results : APPLIANCES.filter((model) => model.tier === tier)).map((model, index) => <article key={model.model} className="rounded-xl border border-white/10 bg-white/[0.02] p-4"><span className="font-mono text-[10px] text-slate-500">0{index + 1} / {model.formFactor.toUpperCase()}</span><strong className="mt-1 block font-mono text-lg font-bold text-white">{model.model}</strong><small className="mt-0.5 block text-xs text-slate-500">{model.tier} · indicative band</small><Link href={`/products/frontier/${model.model.toLowerCase()}`} className="mt-2.5 inline-flex items-center gap-1 text-[13px] font-semibold text-cyan-300">Review model <ArrowRight size={14} /></Link></article>)}</div>
      <p className="mt-5 max-w-3xl rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-[13px] leading-relaxed text-slate-500">This shortlist reflects form factor and indicative lineup bands only. Official throughput, ports, user ranges and deployment requirements should be confirmed with SecuEdge before selecting hardware.</p><div className="mt-5 flex flex-wrap items-center gap-3"><button type="button" className="premium-btn-ghost !min-h-[2.6rem] !text-[13px]" onClick={() => setSubmitted(false)}><RotateCcw size={15} /> Edit preferences</button><Link href="/contact" className="premium-btn-primary !min-h-[2.6rem] !text-[13px]">Request sizing help <ArrowRight size={16} /></Link></div>
    </div>}
  </div>;
}
