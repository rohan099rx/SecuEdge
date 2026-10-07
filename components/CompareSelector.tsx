"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { APPLIANCES } from "@/lib/site";
import { getModelFact } from "@/data/models";
import { Reveal } from "@/components/motion";

const BANDS = ["Branch / small office", "Mid-market", "Enterprise", "High-scale"] as const;
const FORMS = ["Any", "Desktop", "Rack-mount"] as const;
const PRIORITIES = [
  ["Security", "Tighter inspection and policy control — discuss IDPS posture and Maximum protection."],
  ["Connectivity", "Multi-site and remote paths — discuss VPN, failover and SD-WAN behavior."],
  ["Management", "Day-to-day operability — discuss Quick Mode workflows and monitoring views."],
  ["Scale", "Growth headroom — discuss high-scale models and validated throughput sheets."],
] as const;

const VERIFIED_ROWS = [
  { label: "Form factor", fact: "Form factor", mark: "✓ Verified" },
  { label: "Quick + Professional Mode", fact: "Quick + Professional Mode", mark: "✓ Verified" },
  { label: "Deployment tier", fact: "Deployment tier", mark: "~ Indicative" },
] as const;

const PENDING_ROWS = [
  "Firewall throughput", "VPN throughput", "IPS throughput",
  "Concurrent sessions", "New sessions / second", "WAN / LAN / SFP ports",
] as const;

export function CompareSelector() {
  const [band, setBand] = useState<(typeof BANDS)[number]>("Mid-market");
  const [form, setForm] = useState<(typeof FORMS)[number]>("Any");
  const [priority, setPriority] = useState<(typeof PRIORITIES)[number][0]>("Security");
  const [selected, setSelected] = useState<string[]>(["SE50", "SE500P", "SE1000P"]);

  const shortlist = useMemo(
    () => APPLIANCES.filter((m) => m.tier === band && (form === "Any" || m.formFactor === form)),
    [band, form]
  );

  const toggle = (model: string) =>
    setSelected((prev) => (prev.includes(model) ? prev.filter((m) => m !== model) : prev.length >= 3 ? [...prev.slice(1), model] : [...prev, model]));

  const priorityNote = PRIORITIES.find(([p]) => p === priority)?.[1];

  return (
    <>
      <div className="mx-auto grid w-full max-w-[1200px] gap-5 px-6 lg:grid-cols-3">
        <Reveal>
          <div className="premium-card h-full p-6">
            <p className="premium-panel-label">Step 1 · Deployment</p>
            <h2 className="mt-2 text-lg font-bold text-white">What are you securing?</h2>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {BANDS.map((b) => (
                <button key={b} type="button" onClick={() => setBand(b)} aria-pressed={band === b}
                  className={`rounded-xl border px-3 py-2.5 text-left text-xs font-bold transition-colors ${band === b ? "border-cyan-400/50 bg-cyan-400/10 text-white" : "border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/25 hover:text-white"}`}>{b}</button>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-slate-500">Bands are indicative lineup groupings, not capacity guarantees.</p>
          </div>
        </Reveal>
        <Reveal>
          <div className="premium-card h-full p-6">
            <p className="premium-panel-label">Step 2 · Chassis</p>
            <h2 className="mt-2 text-lg font-bold text-white">Preferred hardware format?</h2>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {FORMS.map((f) => (
                <button key={f} type="button" onClick={() => setForm(f)} aria-pressed={form === f}
                  className={`rounded-xl border px-3 py-2.5 text-xs font-bold transition-colors ${form === f ? "border-cyan-400/50 bg-cyan-400/10 text-white" : "border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/25 hover:text-white"}`}>{f}</button>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-slate-500">Desktop for compact edges · Rack-mount (P) for professional installs.</p>
          </div>
        </Reveal>
        <Reveal>
          <div className="premium-card h-full p-6">
            <p className="premium-panel-label">Step 3 · Priority</p>
            <h2 className="mt-2 text-lg font-bold text-white">What matters most?</h2>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {PRIORITIES.map(([p]) => (
                <button key={p} type="button" onClick={() => setPriority(p)} aria-pressed={priority === p}
                  className={`rounded-xl border px-3 py-2.5 text-left text-xs font-bold transition-colors ${priority === p ? "border-cyan-400/50 bg-cyan-400/10 text-white" : "border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/25 hover:text-white"}`}>{p}</button>
              ))}
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-slate-500">{priorityNote} Priority shapes guidance only — the shortlist below is form factor + band.</p>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <div className="premium-panel mt-5 overflow-hidden">
            <div className="premium-panel-head">
              <span className="premium-panel-label">Step 4 · Recommended models — {band}{form !== "Any" ? ` · ${form}` : ""}</span>
              <span className="font-mono text-[10px] text-slate-500">{shortlist.length} match{shortlist.length === 1 ? "" : "es"}</span>
            </div>
            <div className="grid gap-2 p-4 sm:grid-cols-2 lg:grid-cols-4">
              {shortlist.map((m) => {
                const active = selected.includes(m.model);
                return (
                  <button key={m.model} type="button" onClick={() => toggle(m.model)} aria-pressed={active}
                    className={`rounded-xl border p-4 text-left transition-colors ${active ? "border-cyan-400/50 bg-cyan-400/[0.07]" : "border-white/10 bg-white/[0.02] hover:border-white/25"}`}>
                    <span className="flex items-center justify-between">
                      <strong className="font-mono text-base font-bold text-white">{m.model}</strong>
                      <span className={`flex h-5 w-5 items-center justify-center rounded-full border ${active ? "border-cyan-400/60 text-cyan-300" : "border-white/15 text-slate-500"}`}>{active ? <Minus size={12} /> : <Plus size={12} />}</span>
                    </span>
                    <span className="mt-1 block text-[11px] text-slate-500">{m.formFactor} · {m.tier} (indicative)</span>
                  </button>
                );
              })}
              {shortlist.length === 0 && <p className="col-span-full p-4 text-sm text-slate-500">No models match those filters. Adjust the chassis preference.</p>}
            </div>
          </div>
        </Reveal>
      </div>

      {selected.length > 0 && (
        <div className="border-t border-white/[0.07] bg-white/[0.015] py-14 md:py-20" aria-label="Model comparison">
          <div className="mx-auto w-full max-w-[1200px] px-6">
            <Reveal>
              <p className="premium-eyebrow">Side by side · {selected.length} selected</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">{selected.join("  vs  ")}</h2>
              <div className="mt-4 flex flex-wrap gap-4 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">
                <span><span className="text-emerald-300">✓</span> Verified</span>
                <span><span className="text-amber-300">~</span> Indicative grouping</span>
                <span><span className="text-slate-400">○</span> Available on request</span>
              </div>
            </Reveal>
            <Reveal className="mt-8">
              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full min-w-[36rem] text-left text-sm">
                  <thead className="bg-white/[0.03] font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                    <tr>
                      <th className="px-5 py-3.5 font-medium">Attribute</th>
                      {selected.map((model) => (
                        <th key={model} className="px-5 py-3.5 font-bold text-white">
                          <Link href={`/products/frontier/${model.toLowerCase()}`} className="transition-colors hover:text-cyan-300">{model}</Link>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-[#070d18]">
                    {VERIFIED_ROWS.map((row) => (
                      <tr key={row.label} className="border-t border-white/[0.07]">
                        <th scope="row" className="px-5 py-3.5 font-semibold text-slate-300">{row.label} <span className="ml-1 font-mono text-[9px] font-normal uppercase tracking-widest text-slate-500">{row.mark}</span></th>
                        {selected.map((model) => {
                          const fact = getModelFact(model, row.fact);
                          return <td key={model} className="px-5 py-3.5 text-slate-200">{fact?.value ?? "—"}</td>;
                        })}
                      </tr>
                    ))}
                    {PENDING_ROWS.map((label) => (
                      <tr key={label} className="border-t border-white/[0.07]">
                        <th scope="row" className="px-5 py-3.5 font-semibold text-slate-300">{label} <span className="ml-1 font-mono text-[9px] font-normal uppercase tracking-widest text-slate-500">○ On request</span></th>
                        {selected.map((model) => <td key={model} className="px-5 py-3.5 text-emerald-300/90">Available on request</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
            <Reveal>
              <p className="mt-5 max-w-3xl text-[13px] leading-relaxed text-slate-500">
                Deployment bands are indicative lineup groupings only. Throughput, ports, memory, dimensions, power and user ranges require the approved model datasheet.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/contact" className="premium-btn-primary">Request model details <ArrowRight size={16} /></Link>
                <Link href="/frontier/appliances" className="premium-btn-ghost">View appliance range</Link>
              </div>
            </Reveal>
          </div>
        </div>
      )}
    </>
  );
}
