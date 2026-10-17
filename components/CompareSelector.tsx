"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { APPLIANCES, CUSTOM_APPLIANCE, SIZING_STEPS, SIZING_EXAMPLE } from "@/lib/site";
import { getModelFact } from "@/data/models";
import { Reveal } from "@/components/motion";

const FORMS = ["Any", "Desktop", "Rack-mount"] as const;

/** Parse "1–30" into [1, 30]. */
function parseRange(range: string): [number, number] {
  const [lo, hi] = range.replace(/,/g, "").split("–").map((n) => parseInt(n, 10));
  return [isNaN(lo) ? 0 : lo, isNaN(hi) ? 0 : hi];
}

const VERIFIED_ROWS = [
  { label: "Form factor", fact: "Form factor", mark: "✓ Verified" },
  { label: "Peak users", fact: "Peak users", mark: "✓ Verified" },
  { label: "Typical site", fact: "Typical site", mark: "✓ Verified" },
  { label: "Quick + Professional Mode", fact: "Quick + Professional Mode", mark: "✓ Verified" },
] as const;

const PENDING_ROWS = [
  "Firewall throughput", "VPN throughput", "IPS throughput",
  "Concurrent sessions", "New sessions / second", "WAN / LAN / SFP ports",
] as const;

export function CompareSelector() {
  const [officeUsers, setOfficeUsers] = useState("60");
  const [vpnUsers, setVpnUsers] = useState("20");
  const [form, setForm] = useState<(typeof FORMS)[number]>("Any");
  const [selected, setSelected] = useState<string[]>(["SE100P", "SE250P"]);

  /* Sizing method (copy deck §9.4): office users + (VPN users × 3). */
  const sizing = useMemo(() => {
    const office = Math.max(0, parseInt(officeUsers, 10) || 0);
    const vpn = Math.max(0, parseInt(vpnUsers, 10) || 0);
    return { office, vpn, score: office + vpn * 3 };
  }, [officeUsers, vpnUsers]);

  const recommendation = useMemo(() => {
    const match = APPLIANCES.find((m) => {
      const [lo, hi] = parseRange(m.userRange);
      return sizing.score >= lo && sizing.score <= hi && (form === "Any" || m.formFactor === form);
    });
    if (match) return { model: match.model, custom: false };
    if (sizing.score > parseRange(CUSTOM_APPLIANCE.userRange)[0] - 1) return { model: "Custom", custom: true };
    const fallback = APPLIANCES.find((m) => form === "Any" || m.formFactor === form);
    return { model: fallback?.model ?? APPLIANCES[0].model, custom: false };
  }, [sizing, form]);

  /* Models that fit the computed score, for the shortlist. */
  const fits = useMemo(() => {
    if (recommendation.custom) return [];
    return APPLIANCES.filter((m) => {
      const [lo, hi] = parseRange(m.userRange);
      return sizing.score >= lo && sizing.score <= hi && (form === "Any" || m.formFactor === form);
    });
  }, [sizing, form, recommendation]);

  const toggle = (model: string) =>
    setSelected((prev) => (prev.includes(model) ? prev.filter((m) => m !== model) : prev.length >= 3 ? [...prev.slice(1), model] : [...prev, model]));

  return (
    <>
      <div className="mx-auto grid w-full max-w-[1200px] gap-5 px-6 lg:grid-cols-3">
        <Reveal>
          <div className="premium-card h-full p-6">
            <p className="premium-panel-label">Step 1 · People on site</p>
            <h2 className="mt-2 text-lg font-bold text-white">Peak users at the busiest hour?</h2>
            <input
              type="number"
              min={1}
              max={100000}
              value={officeUsers}
              onChange={(e) => setOfficeUsers(e.target.value)}
              aria-label="Peak users on site"
              className="mt-4 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-lg font-bold text-white focus:border-cyan-400/50 focus:outline-none"
            />
            <p className="mt-3 text-[11px] leading-relaxed text-slate-500">Count the most people or devices on the network at the same time, at the busiest hour.</p>
          </div>
        </Reveal>
        <Reveal>
          <div className="premium-card h-full p-6">
            <p className="premium-panel-label">Step 2 · Remote VPN users</p>
            <h2 className="mt-2 text-lg font-bold text-white">How many connect by VPN?</h2>
            <input
              type="number"
              min={0}
              max={100000}
              value={vpnUsers}
              onChange={(e) => setVpnUsers(e.target.value)}
              aria-label="Remote VPN users"
              className="mt-4 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-lg font-bold text-white focus:border-cyan-400/50 focus:outline-none"
            />
            <p className="mt-3 text-[11px] leading-relaxed text-slate-500">Each VPN user counts three times — encrypted traffic is heavier.</p>
          </div>
        </Reveal>
        <Reveal>
          <div className="premium-card h-full p-6">
            <p className="premium-panel-label">Step 3 · Chassis</p>
            <h2 className="mt-2 text-lg font-bold text-white">Preferred hardware format?</h2>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {FORMS.map((f) => (
                <button key={f} type="button" onClick={() => setForm(f)} aria-pressed={form === f}
                  className={`rounded-xl border px-3 py-2.5 text-xs font-bold transition-colors ${form === f ? "border-cyan-400/50 bg-cyan-400/10 text-white" : "border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/25 hover:text-white"}`}>{f}</button>
              ))}
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-slate-500">Desktop for compact edges · Rack-mount (P) for professional installs.</p>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <div className="premium-panel mt-5 overflow-hidden">
            <div className="premium-panel-head">
              <span className="premium-panel-label">Sizing · {sizing.office} office + {sizing.vpn} VPN × 3 = {sizing.score} users</span>
              <span className="font-mono text-[10px] text-slate-500">{recommendation.custom ? "custom design" : `fits ${recommendation.model}`}</span>
            </div>
            <div className="p-4">
              <p className="max-w-3xl text-[13px] leading-relaxed text-slate-400">
                {SIZING_EXAMPLE}{" "}
                {recommendation.custom
                  ? "Your count is above the SE1000P range — we will design a configuration with you."
                  : `We recommend the ${recommendation.model}. Every SecuEdge Frontier model has the full feature set. Book a free demo to confirm sizing with our team.`}
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {recommendation.custom ? (
                  <div className="rounded-xl border border-amber-400/40 bg-amber-400/[0.06] p-4">
                    <strong className="font-mono text-base font-bold text-white">Custom</strong>
                    <span className="mt-1 block text-[11px] text-slate-500">1,300+ users · designed with our team</span>
                  </div>
                ) : (
                  fits.map((m) => {
                    const active = selected.includes(m.model);
                    return (
                      <button key={m.model} type="button" onClick={() => toggle(m.model)} aria-pressed={active}
                        className={`rounded-xl border p-4 text-left transition-colors ${active ? "border-cyan-400/50 bg-cyan-400/[0.07]" : "border-white/10 bg-white/[0.02] hover:border-white/25"}`}>
                        <span className="flex items-center justify-between">
                          <strong className="font-mono text-base font-bold text-white">{m.model}</strong>
                          <span className={`flex h-5 w-5 items-center justify-center rounded-full border ${active ? "border-cyan-400/60 text-cyan-300" : "border-white/15 text-slate-500"}`}>{active ? <Minus size={12} /> : <Plus size={12} />}</span>
                        </span>
                        <span className="mt-1 block text-[11px] text-slate-500">{m.formFactor} · {m.userRange} peak users</span>
                      </button>
                    );
                  })
                )}
              </div>
              {!recommendation.custom && fits.length === 0 && (
                <p className="mt-2 text-sm text-slate-500">No model in that chassis preference fits this count — try “Any” chassis or ask our team for a custom design.</p>
              )}
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <div className="premium-panel mt-5 p-6">
            <p className="premium-panel-label">How sizing works</p>
            <ol className="mt-3 grid gap-2 md:grid-cols-2">
              {SIZING_STEPS.map((step, i) => (
                <li key={step} className="flex items-start gap-3 text-[13px] text-slate-400">
                  <span className="font-mono text-[11px] text-cyan-300/70">{String(i + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>
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
                Peak-user ranges are the approved sizing lineup. Throughput, ports, memory, dimensions and power require the approved model datasheet — full specifications are available on request.
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
