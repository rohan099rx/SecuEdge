"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { APPLIANCES, CUSTOM_APPLIANCE } from "@/lib/site";

type FormFactor = "Any" | "Desktop" | "Rack-mount";

/** Parse "1–30" into [1, 30]. */
function parseRange(range: string): [number, number] {
  const [lo, hi] = range.replace(/,/g, "").split("–").map((n) => parseInt(n, 10));
  return [isNaN(lo) ? 0 : lo, isNaN(hi) ? 0 : hi];
}

export function ProductRecommendationWizard() {
  const [officeUsers, setOfficeUsers] = useState("60");
  const [vpnUsers, setVpnUsers] = useState("20");
  const [formFactor, setFormFactor] = useState<FormFactor>("Any");
  const [submitted, setSubmitted] = useState(false);

  const office = Math.max(0, parseInt(officeUsers, 10) || 0);
  const vpn = Math.max(0, parseInt(vpnUsers, 10) || 0);
  const score = office + vpn * 3;

  const results = useMemo(() => APPLIANCES.filter((model) => {
    const [lo, hi] = parseRange(model.userRange);
    return score >= lo && score <= hi && (formFactor === "Any" || model.formFactor === formFactor);
  }), [score, formFactor]);

  const isCustom = score > 1300;
  const recommended = results[0]?.model ?? (isCustom ? "Custom" : APPLIANCES.find((m) => formFactor === "Any" || m.formFactor === formFactor)?.model);

  return <div className="text-slate-200">
    {!submitted ? <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300">Frontier model finder</p>
      <h2 className="mt-2 text-2xl font-bold text-white">Find your model.</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">Two questions, sized by users — not features. Every SecuEdge Frontier model runs the same software with the identical feature set. This guide does not estimate throughput or replace a technical sizing review.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <label className="block text-xs font-semibold text-slate-300">How many people use the network at the busiest hour?
          <input type="number" min={1} value={officeUsers} onChange={(event) => setOfficeUsers(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1424] px-3 py-2.5 text-sm text-white" />
        </label>
        <label className="block text-xs font-semibold text-slate-300">How many connect by VPN from outside?
          <input type="number" min={0} value={vpnUsers} onChange={(event) => setVpnUsers(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1424] px-3 py-2.5 text-sm text-white" />
        </label>
        <label className="block text-xs font-semibold text-slate-300">Preferred hardware format
          <select value={formFactor} onChange={(event) => setFormFactor(event.target.value as FormFactor)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1424] px-3 py-2.5 text-sm text-white"><option>Any</option><option>Desktop</option><option>Rack-mount</option></select>
        </label>
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-slate-500">Each VPN user counts three times — encrypted traffic is heavier. Sizing score: {office} office + {vpn} VPN × 3 = <strong className="text-slate-300">{score} users</strong>.</p>
      <button type="button" className="premium-btn-primary mt-6" onClick={() => setSubmitted(true)}>Show matching models <ArrowRight size={16} /></button>
    </div> : <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300">Frontier · Model shortlist</p>
      <h2 className="mt-2 text-2xl font-bold text-white">{results.length ? `${results.length} model${results.length === 1 ? "" : "s"} to review` : isCustom ? "Custom design recommended" : "No exact chassis match"}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
        Sizing score: {office} office users + {vpn} VPN users × 3 = {score} users. Chassis preference: {formFactor}. Both Quick and Professional modes run on every model.
      </p>
      {recommended && !isCustom && (
        <p className="mt-4 max-w-2xl rounded-xl border border-cyan-400/30 bg-cyan-400/[0.06] px-4 py-3 text-[13px] leading-relaxed text-slate-200">
          We recommend the <strong className="text-white">{recommended}</strong>. Every SecuEdge Frontier model has the full feature set. Book a free demo to confirm sizing with our team.
        </p>
      )}
      {isCustom && (
        <p className="mt-4 max-w-2xl rounded-xl border border-amber-400/30 bg-amber-400/[0.06] px-4 py-3 text-[13px] leading-relaxed text-slate-200">
          Your count is above the SE1000P range ({CUSTOM_APPLIANCE.userRange} users). We will design a configuration with you — talk to our team.
        </p>
      )}
      <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {(results.length ? results : APPLIANCES.filter((model) => formFactor === "Any" || model.formFactor === formFactor)).map((model, index) => (
          <article key={model.model} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <span className="font-mono text-[10px] text-slate-500">0{index + 1} / {model.formFactor.toUpperCase()}</span>
            <strong className="mt-1 block font-mono text-lg font-bold text-white">{model.model}</strong>
            <small className="mt-0.5 block text-xs text-slate-500">{model.userRange} peak users · {model.typicalSite}</small>
            <Link href={`/products/frontier/${model.model.toLowerCase()}`} className="mt-2.5 inline-flex items-center gap-1 text-[13px] font-semibold text-cyan-300">Review model <ArrowRight size={14} /></Link>
          </article>
        ))}
      </div>
      <p className="mt-5 max-w-3xl rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-[13px] leading-relaxed text-slate-500">Peak-user ranges are the approved sizing lineup. Official throughput, ports, dimensions and power should be confirmed with SecuEdge before selecting hardware.</p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button type="button" className="premium-btn-ghost !min-h-[2.6rem] !text-[13px]" onClick={() => setSubmitted(false)}><RotateCcw size={15} /> Edit preferences</button>
        <Link href="/contact" className="premium-btn-primary !min-h-[2.6rem] !text-[13px]">Request sizing help <ArrowRight size={16} /></Link>
      </div>
    </div>}
  </div>;
}
