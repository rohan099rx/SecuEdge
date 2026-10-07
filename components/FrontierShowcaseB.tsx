"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/Icons";
import { STAT, SECURITY_LEVELS } from "@/lib/site";

// ─── Shared display data ───────────────────────────────────────────────────

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
  off:    { dot: "bg-white/15",  ring: "border-white/[0.07] bg-white/[0.03]",       text: "text-white/30" },
};
const STATUS_LABEL: Record<string, string> = {
  on: "Active", strict: "Strict", alerts: "Alerts", basic: "Basic", off: "Off",
};
const DISPLAY_ORDER = [2, 1, 0] as const;

// ─── Glow colours per level ────────────────────────────────────────────────

const LEVEL_GLOW = [
  // Transparent: no protection, dim grey
  {
    top:    "rgba(107,122,147,0.10)",
    side:   "rgba(107,122,147,0.05)",
    border: "rgba(107,122,147,0.18)",
    shadow: "0 60px 120px -40px rgba(107,122,147,0.08)",
  },
  // Balanced: amber watchfulness
  {
    top:    "rgba(234,179,8,0.22)",
    side:   "rgba(245,158,11,0.10)",
    border: "rgba(245,158,11,0.28)",
    shadow: "0 60px 120px -40px rgba(234,179,8,0.18)",
  },
  // Maximum: brand blue / teal authority
  {
    top:    "rgba(1,111,237,0.38)",
    side:   "rgba(53,211,153,0.14)",
    border: "rgba(58,165,255,0.30)",
    shadow: "0 60px 120px -40px rgba(1,111,237,0.32)",
  },
];

// ─── Animated SVG network backdrop ────────────────────────────────────────

function NetworkBackdrop({ levelIdx }: { levelIdx: number }) {
  const threatColor = levelIdx === 2 ? "#D9323B" : levelIdx === 1 ? "#F59E0B" : "#6B7A93";
  const safeColor   = levelIdx >= 1  ? "#35d399"  : "#6B7A93";
  const nodeOpacity = 0.28;

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 800 440"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <style>{`
        @keyframes f-flow-in  { from { stroke-dashoffset: 40; } to { stroke-dashoffset: 0; } }
        @keyframes f-flow-out { from { stroke-dashoffset: 0;  } to { stroke-dashoffset: 40; } }
        @keyframes f-pulse    { 0%,100% { opacity:0.35; } 50% { opacity:0.6; } }
        .f-in   { stroke-dasharray: 14 8; animation: f-flow-in  2s linear infinite; }
        .f-out  { stroke-dasharray: 14 8; animation: f-flow-out 2.4s linear infinite; }
        .f-node { animation: f-pulse 3s ease-in-out infinite; }
      `}</style>

      {/* ── Spoke lines ── */}
      {/* Internet → Frontier (inbound threat flow) */}
      <path d="M400,22 L400,210" stroke={threatColor} strokeWidth="1.5" className="f-in" opacity={nodeOpacity} />
      {/* Cloud → Frontier */}
      <path d="M680,110 L418,218" stroke={safeColor} strokeWidth="1"   className="f-out" opacity={nodeOpacity} />
      {/* Remote → Frontier */}
      <path d="M680,330 L418,228" stroke={safeColor} strokeWidth="1"   className="f-out" opacity={nodeOpacity} />
      {/* LAN → Frontier */}
      <path d="M120,330 L382,228" stroke={safeColor} strokeWidth="1"   className="f-out" opacity={nodeOpacity} />
      {/* Servers → Frontier */}
      <path d="M120,110 L382,218" stroke={safeColor} strokeWidth="1"   className="f-out" opacity={nodeOpacity} />

      {/* ── Outer nodes ── */}
      <circle cx="400" cy="18" r="5" fill={threatColor} className="f-node" opacity={nodeOpacity * 2.2} />
      <circle cx="680" cy="110" r="5" fill={safeColor}  className="f-node" style={{ animationDelay: "0.4s" }} opacity={nodeOpacity * 2} />
      <circle cx="680" cy="330" r="5" fill={safeColor}  className="f-node" style={{ animationDelay: "0.8s" }} opacity={nodeOpacity * 2} />
      <circle cx="120" cy="330" r="5" fill={safeColor}  className="f-node" style={{ animationDelay: "1.2s" }} opacity={nodeOpacity * 2} />
      <circle cx="120" cy="110" r="5" fill={safeColor}  className="f-node" style={{ animationDelay: "1.6s" }} opacity={nodeOpacity * 2} />

      {/* ── Frontier center (pulsing ring) ── */}
      <circle cx="400" cy="222" r="28" fill="none" stroke="#016FED" strokeWidth="1" opacity="0.18"
              style={{ animation: "f-pulse 2s ease-in-out infinite" }} />
      <circle cx="400" cy="222" r="18" fill="#016FED" opacity="0.2" />
      <circle cx="400" cy="222" r="10" fill="#016FED" opacity="0.45" />

      {/* ── Labels ── */}
      <text x="400" y="8"   textAnchor="middle" fontSize="9" fill={threatColor} opacity={nodeOpacity * 3} fontFamily="monospace">INTERNET</text>
      <text x="700" y="114" textAnchor="start"  fontSize="9" fill={safeColor}   opacity={nodeOpacity * 3} fontFamily="monospace">CLOUD</text>
      <text x="700" y="334" textAnchor="start"  fontSize="9" fill={safeColor}   opacity={nodeOpacity * 3} fontFamily="monospace">ENDPOINTS</text>
      <text x="100" y="334" textAnchor="end"    fontSize="9" fill={safeColor}   opacity={nodeOpacity * 3} fontFamily="monospace">LAN</text>
      <text x="100" y="114" textAnchor="end"    fontSize="9" fill={safeColor}   opacity={nodeOpacity * 3} fontFamily="monospace">SERVERS</text>
    </svg>
  );
}

// ─── Main component ────────────────────────────────────────────────────────

export function FrontierShowcaseB() {
  const [levelIdx, setLevelIdx] = useState(2);
  const reduce   = useReducedMotion();
  const level    = SECURITY_LEVELS[levelIdx];
  const engines  = level.engines as Record<string, string>;
  const glow     = LEVEL_GLOW[levelIdx];

  return (
    <section className="relative overflow-hidden py-16 sm:py-24" style={{ background: "#081226" }}>
      {/* SVG network backdrop */}
      <NetworkBackdrop levelIdx={levelIdx} />

      <div className="container-wide relative z-10">
        {/* ── Heading ── */}
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#3AA5FF]/25 bg-[#3AA5FF]/10 px-3.5 py-1.5">
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#7db9ff]">
              Our flagship · SecuEdge Frontier
            </span>
          </span>
          <h2 className="display-2 mt-5 text-white">
            Powerful enough for your engineers.{" "}
            <span className="serif-accent text-[#7db9ff]">Simple enough to get right.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#c7d6ee]/65">
            Up to <span className="font-semibold text-white">99% of firewall breaches</span> start with
            a misconfiguration, not a hacker{" "}
            <span className="text-[#7db9ff]/50">({STAT.misconfigSource})</span>. Frontier gives the
            business plain-language controls and engineers the full depth of an enterprise NGFW.
          </p>
        </div>

        {/* ── Interactive diptych ── */}
        <motion.div
          animate={{ boxShadow: glow.shadow }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="relative mx-auto mt-12 max-w-5xl overflow-hidden rounded-[1.75rem]"
          style={{ border: `1px solid ${glow.border}`, transition: "border-color 0.9s ease" }}
        >
          <div className="grid md:grid-cols-2">

            {/* LEFT: Quick Mode on dark surface */}
            <div className="relative p-8 sm:p-10" style={{ background: "#0c1929" }}>
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/[0.07]" aria-hidden />
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3AA5FF]/10 text-[#3AA5FF]">
                  <Icon name="zap" className="h-[18px] w-[18px]" />
                </span>
                <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#3AA5FF]">
                  Quick Mode
                </span>
                <span className="text-[12px] font-medium text-white/35">· For the business</span>
              </div>

              <p className="mt-5 text-balance text-[1.2rem] font-semibold leading-[1.2] tracking-tight text-white">
                Choose a level. See what runs.
              </p>

              <div className="mt-5 space-y-2.5" role="radiogroup" aria-label="Security protection level">
                {DISPLAY_ORDER.map((idx) => {
                  const lvl    = SECURITY_LEVELS[idx];
                  const active = idx === levelIdx;
                  return (
                    <button
                      key={lvl.key}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setLevelIdx(idx)}
                      className={`group w-full rounded-xl border px-4 py-3.5 text-left transition-[border-color,background-color,box-shadow] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3AA5FF] focus-visible:outline-offset-2 ${
                        active
                          ? "border-[#3AA5FF]/35 bg-[#3AA5FF]/[0.07] shadow-[0_4px_16px_-6px_rgba(58,165,255,0.3)]"
                          : "border-white/[0.07] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                            active ? "border-[#3AA5FF] bg-[#3AA5FF]" : "border-white/25 bg-transparent"
                          }`}
                          aria-hidden
                        >
                          {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                        </span>
                        <span className={`text-[13.5px] font-semibold transition-colors duration-200 ${active ? "text-[#7db9ff]" : "text-[#c7d6ee]"}`}>
                          {lvl.label}
                        </span>
                        {idx === 2 && (
                          <span className="ml-auto shrink-0 rounded-full bg-[#3AA5FF]/[0.12] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#3AA5FF]">
                            Recommended
                          </span>
                        )}
                      </div>
                      <p className={`mt-1.5 pl-7 text-[12px] leading-relaxed transition-colors duration-200 ${active ? "text-[#c7d6ee]/70" : "text-white/30"}`}>
                        {lvl.blurb}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: Pro Mode console */}
            <div className="relative overflow-hidden p-8 sm:p-10" style={{ background: "#081226" }}>
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" aria-hidden />

              <div className="relative flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] text-[#3AA5FF]">
                  <Icon name="terminal" className="h-[18px] w-[18px]" />
                </span>
                <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#3AA5FF]">
                  Professional Mode
                </span>
                <span className="text-[12px] font-medium text-white/40">· What runs under the hood</span>
              </div>

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

              <AnimatePresence mode="wait">
                <motion.div
                  key={level.key}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="relative mt-4 space-y-2"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {ENGINE_ROWS.map(({ key, label, desc }) => {
                    const status = engines[key] ?? "off";
                    const style  = STATUS_STYLE[status] ?? STATUS_STYLE.off;
                    return (
                      <div key={key} className="flex items-center justify-between rounded-lg border border-white/[0.07] bg-white/[0.03] px-4 py-2.5">
                        <div>
                          <p className="text-[13px] font-semibold text-[#d7e3f5]">{label}</p>
                          <p className="text-[11px] text-white/28">{desc}</p>
                        </div>
                        <div className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${style.ring} ${style.text}`}>
                          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`} aria-hidden />
                          {STATUS_LABEL[status] ?? status}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

              <div className="relative mt-5 flex items-center gap-2 border-t border-white/10 pt-4 font-mono text-[12px] text-white/40">
                <span className="text-[#3AA5FF]">frontier@se</span>
                <span>~</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={level.key}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-white/32"
                  >
                    policy set {level.key}
                  </motion.span>
                </AnimatePresence>
                <span className="ml-0.5 inline-block h-[13px] w-[6px] translate-y-[1px] animate-pulse bg-[#3AA5FF]/60" aria-hidden />
              </div>
            </div>
          </div>

          {/* Center seam badge */}
          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
            <motion.div
              key={levelIdx}
              animate={reduce ? {} : { scale: [1, 1.08, 1] }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-1.5 rounded-2xl border bg-[#0d1929] px-5 py-4 shadow-[0_20px_40px_-16px_rgba(0,0,0,0.6)]"
              style={{ borderColor: glow.border }}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-blue text-white">
                <Icon name="server" className="h-5 w-5" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7db9ff]/60">
                Same appliance
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Proof strip */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[13px] font-medium text-[#7db9ff]/45">
          {["Independently certified", "ISO 27001:2022", "Common Criteria", "Built in India", "24-hour response"].map((p, i) => (
            <span key={p} className="flex items-center gap-3">
              {i > 0 ? <span className="h-1 w-1 rounded-full bg-[#3AA5FF]/20" aria-hidden /> : null}
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
