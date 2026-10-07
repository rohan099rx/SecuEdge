"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/Icons";
import { SECURITY_LEVELS } from "@/lib/site";

/** Engine rows in display order — keys match SECURITY_LEVELS[n].engines */
const ENGINE_ROWS = [
  { key: "ids",       label: "IDS",        desc: "Intrusion detection" },
  { key: "ips",       label: "IPS",        desc: "Intrusion prevention" },
  { key: "antivirus", label: "Antivirus",  desc: "Malware scanning" },
  { key: "dns",       label: "DNS Filter", desc: "Domain blocking" },
  { key: "firewall",  label: "Firewall",   desc: "Packet policy" },
] as const;

const STATUS_STYLE: Record<string, { dot: string; ring: string; text: string }> = {
  on:     { dot: "bg-[#35d399]", ring: "border-[#35d399]/25 bg-[#35d399]/[0.08]", text: "text-[#35d399]" },
  strict: { dot: "bg-[#35d399]", ring: "border-[#35d399]/25 bg-[#35d399]/[0.08]", text: "text-[#35d399]" },
  alerts: { dot: "bg-[#F59E0B]", ring: "border-[#F59E0B]/25 bg-[#F59E0B]/[0.08]", text: "text-[#F59E0B]" },
  basic:  { dot: "bg-[#3AA5FF]", ring: "border-[#3AA5FF]/25 bg-[#3AA5FF]/[0.08]", text: "text-[#3AA5FF]" },
  off:    { dot: "bg-white/15",  ring: "border-white/[0.07] bg-white/[0.03]",       text: "text-white/65" },
};

const STATUS_LABEL: Record<string, string> = {
  on: "Active", strict: "Strict", alerts: "Alerts", basic: "Basic", off: "Off",
};

/** Display Maximum first (most secure is the hero choice). */
const DISPLAY_ORDER = [2, 1, 0] as const;

const PROOF = [
  "Independently certified",
  "ISO 27001:2022",
  "Common Criteria",
  "Built in India",
  "24-hour response",
];

export function FrontierDualMode() {
  const [levelIdx, setLevelIdx] = useState(2); // default: Maximum
  const [previousIdx, setPreviousIdx] = useState(2);
  const reduce = useReducedMotion();
  function selectLevel(idx: number) {
    if (idx === levelIdx) return;
    setPreviousIdx(levelIdx);
    setLevelIdx(idx);
  }
  const level = SECURITY_LEVELS[levelIdx];
  const engines = level.engines as Record<string, string>;

  return (
    <div id="frontier-demo" className="scroll-mt-28">
      {/* ── Section heading ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-4xl text-center">
        <p className="eyebrow">Our flagship · SecuEdge Frontier</p>
        <h2 className="display-2 mt-4">
          Powerful enough for your engineers. Simple enough to get right.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted text-pretty">
          Pick a protection level and watch the engine settings change together.
          Plain-language controls for your team, with the technical detail right beside them.
          This interactive illustration does not change a real appliance.
        </p>
      </div>

      <ol className="mx-auto mt-7 grid max-w-3xl grid-cols-3 gap-3 text-center text-sm text-muted">
        {["Pick a level", "See the settings", "Understand the protection"].map((step, i) => (
          <li key={step}><span className="mx-auto mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-blue/10 text-xs font-semibold text-brand-link">{i + 1}</span>{step}</li>
        ))}
      </ol>

      {/* ── Interactive diptych ─────────────────────────────────────────── */}
      <div className="relative mx-auto mt-10 max-w-5xl overflow-hidden rounded-[1.75rem] border border-hair shadow-[0_44px_90px_-48px_rgba(11,27,51,0.35)]">
        <div className="grid md:grid-cols-2">

          {/* ── LEFT: Quick Mode — security level selector ── */}
          <div className="relative bg-white p-8 sm:p-10">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue/[0.08] text-brand-link">
                <Icon name="zap" className="h-[18px] w-[18px]" />
              </span>
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-link">
                Quick Mode
              </span>
              <span className="text-[12px] font-medium text-dim">· For the business</span>
            </div>

            <p className="mt-5 max-w-[18rem] text-balance text-[1.25rem] font-semibold leading-[1.2] tracking-tight text-ink">
              Choose a level. See exactly what runs.
            </p>

            {/* Level radio group */}
            <div
              className="mt-5 space-y-2.5"
              role="radiogroup"
              aria-label="Security protection level"
            >
              {DISPLAY_ORDER.map((idx) => {
                const lvl = SECURITY_LEVELS[idx];
                const active = idx === levelIdx;
                return (
                  <button
                    key={lvl.key}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    tabIndex={active ? 0 : -1}
                    onClick={() => selectLevel(idx)}
                    onKeyDown={(event) => {
                      const direction = ["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : ["ArrowLeft", "ArrowUp"].includes(event.key) ? -1 : 0;
                      if (!direction && event.key !== "Home" && event.key !== "End") return;
                      event.preventDefault();
                      const position = DISPLAY_ORDER.indexOf(idx);
                      const next = event.key === "Home" ? 0 : event.key === "End" ? 2 : (position + direction + 3) % 3;
                      selectLevel(DISPLAY_ORDER[next]);
                      event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("button")[next]?.focus();
                    }}
                    className={`group w-full rounded-xl border px-4 py-3.5 text-left transition-[border-color,background-color,box-shadow] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue focus-visible:outline-offset-2 ${
                      active
                        ? "border-brand-blue/40 bg-brand-blue/[0.04] shadow-[0_4px_14px_-6px_rgba(1,111,237,0.22)]"
                        : "border-hair bg-bg-raised/50 hover:border-hair2 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Radio dot */}
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                          active ? "border-brand-blue bg-brand-blue" : "border-[#CBD5E4] bg-white"
                        }`}
                        aria-hidden
                      >
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                      </span>
                      <span
                        className={`text-[13.5px] font-semibold transition-colors duration-200 ${
                          active ? "text-brand-blue" : "text-ink"
                        }`}
                      >
                        {lvl.label}
                      </span>
                      {idx === 2 && (
                        <span className="ml-auto shrink-0 rounded-full bg-brand-blue/[0.08] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-link">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p
                      className={`mt-1.5 pl-7 text-[12px] leading-relaxed transition-colors duration-200 ${
                        active ? "text-muted" : "text-dim"
                      }`}
                    >
                      {lvl.blurb}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT: Professional Mode — live engine status ── */}
          <div className="relative overflow-hidden bg-[#081226] p-8 text-[#c7d6ee] sm:p-10">
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" aria-hidden />
            <span
              className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-brand-blue/20 blur-3xl"
              aria-hidden
            />

            <div className="relative flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] text-[#3AA5FF]">
                <Icon name="terminal" className="h-[18px] w-[18px]" />
              </span>
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#3AA5FF]">
                Professional Mode
              </span>
              <span className="text-[12px] font-medium text-white/45">· What runs under the hood</span>
            </div>

            {/* Active policy label — animates when level changes */}
            <p className="relative mt-4 text-[12px] text-white/40">
              Engine status for{" "}
              <AnimatePresence mode="wait">
                <motion.span
                  key={level.key}
                  initial={reduce ? false : { opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -3 }}
                  transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block font-semibold text-[#7db9ff]"
                >
                  {level.label}
                </motion.span>
              </AnimatePresence>{" "}
              policy
            </p>

            {/* Engine rows — cross-fade as a unit on level change */}
              <motion.div
                className="relative mt-4 space-y-2"
                aria-live="polite"
                aria-atomic="true"
              >
                {ENGINE_ROWS.map(({ key, label, desc }) => {
                  const status = engines[key] ?? "off";
                  const style = STATUS_STYLE[status] ?? STATUS_STYLE.off;
                  const changed = SECURITY_LEVELS[previousIdx].engines[key] !== status;
                  return (
                    <div
                      key={key}
                      className={`flex items-center justify-between rounded-lg border px-4 py-2.5 transition-colors duration-200 ${changed ? "border-[#7db9ff]/40 bg-[#016FED]/10" : "border-white/[0.07] bg-white/[0.03]"}`}
                    >
                      <div>
                        <p className="text-[13px] font-semibold text-[#d7e3f5]">{label}{changed && <span className="ml-2 text-[10px] font-normal text-[#a9cfff]">Changed</span>}</p>
                        <p className="text-[11px] text-white/60">{desc}</p>
                      </div>
                      <div
                        className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${style.ring} ${style.text}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`}
                          aria-hidden
                        />
                        {STATUS_LABEL[status] ?? status}
                      </div>
                    </div>
                  );
                })}
              </motion.div>

            {/* CLI prompt — command updates on level change */}
            <div className="relative mt-5 flex items-center gap-2 border-t border-white/10 pt-4 font-mono text-[12px] text-white/40">
              <span className="text-[#3AA5FF]">frontier@se</span>
              <span>~</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={level.key}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="text-white/35"
                >
                  policy set {level.key}
                </motion.span>
              </AnimatePresence>
              <span
                className="ml-0.5 inline-block h-[13px] w-[6px] translate-y-[1px] animate-pulse bg-[#3AA5FF]/60"
                aria-hidden
              />
            </div>
          </div>
        </div>

        {/* Center seam badge — pulses on level change */}
        <div className="absolute left-1/2 top-0 hidden -translate-x-1/2 xl:block">
          <motion.div
            key={levelIdx}
            animate={reduce ? {} : { scale: [1, 1.07, 1] }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-1.5 rounded-2xl border border-hair bg-white px-5 py-4 shadow-[0_18px_40px_-16px_rgba(11,27,51,0.4)]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-blue text-white">
              <Icon name="server" className="h-5 w-5" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-dim">
              Same appliance
            </span>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto mt-5 max-w-5xl rounded-xl border border-hair bg-bg-raised p-5" role="status" aria-live="polite" aria-atomic="true">
        <p className="text-sm font-semibold text-ink">{level.label}: what this means</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {level.key === "maximum" ? "Intrusion detection and prevention are active, alongside antivirus, DNS filtering and strict firewall policy." : level.key === "balanced" ? "Intrusion detection raises alerts; intrusion prevention is off. Antivirus and DNS filtering stay active, with basic firewall policy." : "All five engines are off. Traffic passes without these protections. This mode is for testing only, never production."}
        </p>
        <p className="mt-2 text-xs text-muted">Highlighted rows show changes from your previous selection.</p>
      </div>

      {/* Proof strip */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[13px] font-medium text-dim">
        {PROOF.map((p, i) => (
          <span key={p} className="flex items-center gap-3">
            {i > 0 ? <span className="h-1 w-1 rounded-full bg-hair2" aria-hidden /> : null}
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}
