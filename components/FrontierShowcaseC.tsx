"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
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
  on:     { dot: "bg-[#0FA895]", ring: "border-[#0FA895]/20 bg-[#0FA895]/[0.07]", text: "text-[#0FA895]" },
  strict: { dot: "bg-[#0FA895]", ring: "border-[#0FA895]/20 bg-[#0FA895]/[0.07]", text: "text-[#0FA895]" },
  alerts: { dot: "bg-[#B97C10]", ring: "border-[#B97C10]/20 bg-[#B97C10]/[0.07]", text: "text-[#B97C10]" },
  basic:  { dot: "bg-brand-blue", ring: "border-brand-blue/15 bg-brand-blue/[0.06]", text: "text-brand-link" },
  off:    { dot: "bg-[#CBD5E4]", ring: "border-hair bg-bg-raised/60",               text: "text-dim" },
};
const STATUS_LABEL: Record<string, string> = {
  on: "Active", strict: "Strict", alerts: "Alerts", basic: "Basic", off: "Off",
};
const DISPLAY_ORDER = [2, 1, 0] as const;

// ─── Threat log per level ──────────────────────────────────────────────────

const THREAT_ENTRIES = {
  maximum: [
    { t: "14:32:07", engine: "IPS", action: "BLOCKED", detail: "SYN flood · 203.0.113.47" },
    { t: "14:32:04", engine: "DNS", action: "BLOCKED", detail: "phishing-kit.cc → NXDOMAIN" },
    { t: "14:31:59", engine: "AV",  action: "BLOCKED", detail: "Trojan.Dropper — quarantined" },
    { t: "14:31:55", engine: "FW",  action: "DROPPED", detail: "Port scan ×65535 → /24" },
    { t: "14:31:51", engine: "IPS", action: "BLOCKED", detail: "HTTPS exploit attempt" },
    { t: "14:31:48", engine: "DNS", action: "BLOCKED", detail: "c2.botnet-domain.ru" },
    { t: "14:31:44", engine: "AV",  action: "BLOCKED", detail: "Ransomware variant — stopped" },
    { t: "14:31:40", engine: "IDS", action: "BLOCKED", detail: "SQL injection in HTTP header" },
  ],
  balanced: [
    { t: "14:32:06", engine: "IDS", action: "ALERT",   detail: "Port scan detected · logged" },
    { t: "14:32:03", engine: "DNS", action: "BLOCKED", detail: "malware-c2.xyz → NXDOMAIN" },
    { t: "14:31:57", engine: "AV",  action: "BLOCKED", detail: "Adware.BHO — quarantined" },
    { t: "14:31:54", engine: "IDS", action: "ALERT",   detail: "Unusual outbound volume" },
    { t: "14:31:50", engine: "DNS", action: "BLOCKED", detail: "tracker.spyware.net" },
    { t: "14:31:46", engine: "AV",  action: "BLOCKED", detail: "PUP.Optional.Toolbar" },
    { t: "14:31:42", engine: "IDS", action: "ALERT",   detail: "Brute force SSH · monitored" },
    { t: "14:31:38", engine: "FW",  action: "BASIC",   detail: "Inbound port 8080 · allowed" },
  ],
  transparent: [
    { t: "14:32:05", engine: "—",   action: "PASSED",  detail: "All traffic forwarded unfiltered" },
    { t: "14:32:01", engine: "—",   action: "PASSED",  detail: "No policy applied" },
    { t: "14:31:57", engine: "—",   action: "PASSED",  detail: "No policy applied" },
    { t: "14:31:53", engine: "—",   action: "PASSED",  detail: "No policy applied" },
    { t: "14:31:49", engine: "—",   action: "PASSED",  detail: "No policy applied" },
    { t: "14:31:45", engine: "—",   action: "PASSED",  detail: "No policy applied" },
    { t: "14:31:41", engine: "—",   action: "PASSED",  detail: "No policy applied" },
    { t: "14:31:37", engine: "—",   action: "PASSED",  detail: "No policy applied" },
  ],
};

type LogKey = keyof typeof THREAT_ENTRIES;

const ACTION_STYLE: Record<string, string> = {
  BLOCKED: "text-[#D9323B]",
  DROPPED: "text-[#D9323B]",
  ALERT:   "text-[#B97C10]",
  BASIC:   "text-brand-link",
  PASSED:  "text-dim",
};

// ─── Network topology SVG ──────────────────────────────────────────────────

function ProtectionTopology({ levelIdx }: { levelIdx: number }) {
  const zoneColor = levelIdx === 2
    ? { fill: "rgba(15,168,149,0.12)", stroke: "#0FA895", text: "#177245" }
    : levelIdx === 1
    ? { fill: "rgba(185,124,16,0.10)", stroke: "#B97C10", text: "#B97C10" }
    : { fill: "rgba(203,213,228,0.15)", stroke: "#CBD5E4", text: "#6B7A93" };

  const internetColor = levelIdx === 2 ? "#D9323B" : levelIdx === 1 ? "#B97C10" : "#CBD5E4";
  const arrowColor    = levelIdx === 2 ? "#0FA895" : levelIdx === 1 ? "#B97C10" : "#CBD5E4";

  return (
    <svg viewBox="0 0 320 280" className="w-full max-w-xs" aria-label="Network protection diagram">
      <style>{`
        @keyframes topo-flow { from { stroke-dashoffset: 24; } to { stroke-dashoffset: 0; } }
        @keyframes topo-in   { from { stroke-dashoffset: 0;  } to { stroke-dashoffset: 24; } }
        .topo-out { stroke-dasharray: 8 6; animation: topo-flow 1.8s linear infinite; }
        .topo-in  { stroke-dasharray: 8 6; animation: topo-in   1.6s linear infinite; }
      `}</style>

      {/* Internet node */}
      <circle cx="160" cy="24" r="18" fill="rgba(217,50,59,0.08)" stroke={internetColor} strokeWidth="1.2" />
      <text x="160" y="28" textAnchor="middle" fontSize="9" fontWeight="600" fill={internetColor} fontFamily="monospace">INET</text>

      {/* Arrow: Internet → Frontier (threat inbound) */}
      <path d="M160,42 L160,88" stroke={internetColor} strokeWidth="1.5" className="topo-in" />
      <polygon points="156,88 164,88 160,96" fill={internetColor} opacity="0.7" />

      {/* Frontier appliance node */}
      <rect x="108" y="96" width="104" height="40" rx="8" fill="#016FED" opacity="0.9" />
      <text x="160" y="112" textAnchor="middle" fontSize="9" fontWeight="700" fill="white" fontFamily="monospace">FRONTIER</text>
      <text x="160" y="125" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.65)" fontFamily="monospace">SE-Series</text>

      {/* Arrows: Frontier → Protected zones */}
      <path d="M130,136 L80,184"  stroke={arrowColor} strokeWidth="1.5" className="topo-out" />
      <path d="M160,136 L160,184" stroke={arrowColor} strokeWidth="1.5" className="topo-out" />
      <path d="M190,136 L240,184" stroke={arrowColor} strokeWidth="1.5" className="topo-out" />
      <polygon points="76,180 84,180 80,188"   fill={arrowColor} opacity="0.7" />
      <polygon points="156,180 164,180 160,188" fill={arrowColor} opacity="0.7" />
      <polygon points="236,180 244,180 240,188" fill={arrowColor} opacity="0.7" />

      {/* Protected zones */}
      {[
        { cx: 80,  label: "LAN",     sub: "Internal" },
        { cx: 160, label: "DMZ",     sub: "Servers" },
        { cx: 240, label: "Cloud",   sub: "Remote" },
      ].map(({ cx, label, sub }) => (
        <g key={label}>
          <motion.circle
            cx={cx} cy={214} r={28}
            fill={zoneColor.fill}
            stroke={zoneColor.stroke}
            strokeWidth="1.2"
            animate={{ fill: zoneColor.fill, stroke: zoneColor.stroke }}
            transition={{ duration: 0.6 }}
          />
          <text x={cx} y="210" textAnchor="middle" fontSize="9" fontWeight="700" fill={zoneColor.text} fontFamily="monospace">{label}</text>
          <text x={cx} y="222" textAnchor="middle" fontSize="7.5" fill={zoneColor.text} opacity="0.7" fontFamily="monospace">{sub}</text>
        </g>
      ))}

      {/* Protection status label */}
      <text x="160" y="268" textAnchor="middle" fontSize="8" fill={zoneColor.text} fontFamily="monospace" fontWeight="600">
        {levelIdx === 2 ? "FULL PROTECTION ACTIVE" : levelIdx === 1 ? "MONITORING ACTIVE" : "NO POLICY APPLIED"}
      </text>
    </svg>
  );
}

// ─── Scrolling threat log ──────────────────────────────────────────────────

function ThreatLog({ levelIdx }: { levelIdx: number }) {
  const key      = (["transparent", "balanced", "maximum"] as LogKey[])[levelIdx];
  const entries  = THREAT_ENTRIES[key];
  const doubled  = [...entries, ...entries]; // seamless CSS loop

  return (
    <div className="relative flex flex-col">
      <div className="flex items-center justify-between border-b border-hair pb-2 mb-3">
        <p className="label-mono">Traffic log · demo</p>
        <span className={`flex items-center gap-1.5 text-[11px] font-semibold ${levelIdx === 0 ? "text-dim" : "text-status-red"}`}>
          {levelIdx > 0 && (
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-red opacity-50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-status-red" />
            </span>
          )}
          {levelIdx === 0 ? "No filtering" : "Live"}
        </span>
      </div>

      {/* Scrolling container */}
      <div className="relative h-[220px] overflow-hidden rounded-lg border border-hair bg-bg-raised/40">
        <AnimatePresence mode="wait">
          <motion.div
            key={key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <div
              className="flex flex-col"
              style={{
                animation: "log-scroll 14s linear infinite",
              }}
            >
              <style>{`
                @keyframes log-scroll {
                  0%   { transform: translateY(0); }
                  100% { transform: translateY(-50%); }
                }
              `}</style>
              {doubled.map((e, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 border-b border-hair/50 px-3 py-2 last:border-0"
                >
                  <span className="shrink-0 font-mono text-[10px] text-dim tabular pt-0.5">{e.t}</span>
                  <span className="shrink-0 w-10 text-[10px] font-semibold text-ink font-mono">{e.engine}</span>
                  <span className={`shrink-0 text-[10px] font-semibold w-14 ${ACTION_STYLE[e.action] ?? "text-dim"}`}>
                    {e.action}
                  </span>
                  <span className="text-[11px] text-muted leading-tight">{e.detail}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────

export function FrontierShowcaseC() {
  const [levelIdx, setLevelIdx] = useState(2);
  const reduce  = useReducedMotion();
  const level   = SECURITY_LEVELS[levelIdx];
  const engines = level.engines as Record<string, string>;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-wide">
        {/* Heading */}
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow">Our flagship · SecuEdge Frontier</p>
          <h2 className="display-2 mt-4">
            Powerful enough for your engineers. Simple enough to get right.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted text-pretty">
            Up to <span className="font-semibold text-ink">99% of firewall breaches</span> start with
            a misconfiguration, not a hacker{" "}
            <span className="text-dim">({STAT.misconfigSource})</span>. Choose a protection level
            below and see exactly what Frontier runs under the hood.
          </p>
        </div>

        {/* ── Three-column data theatre ── */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1fr_1.05fr]">

          {/* ── COL 1: Level selector ── */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5 border-b border-hair pb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue/[0.08] text-brand-link">
                <Icon name="zap" className="h-[18px] w-[18px]" />
              </span>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-link">Quick Mode</p>
                <p className="text-[11px] text-dim">For the business</p>
              </div>
            </div>

            <div className="space-y-2.5" role="radiogroup" aria-label="Security protection level">
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
                    className={`group w-full rounded-xl border px-4 py-3.5 text-left transition-[border-color,background-color,box-shadow] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue focus-visible:outline-offset-2 ${
                      active
                        ? "border-brand-blue/40 bg-brand-blue/[0.04] shadow-[0_4px_14px_-6px_rgba(1,111,237,0.22)]"
                        : "border-hair bg-bg-raised/50 hover:border-hair2 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                          active ? "border-brand-blue bg-brand-blue" : "border-[#CBD5E4] bg-white"
                        }`}
                        aria-hidden
                      >
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                      </span>
                      <span className={`text-[13.5px] font-semibold transition-colors duration-200 ${active ? "text-brand-blue" : "text-ink"}`}>
                        {lvl.label}
                      </span>
                      {idx === 2 && (
                        <span className="ml-auto shrink-0 rounded-full bg-brand-blue/[0.08] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-link">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className={`mt-1.5 pl-7 text-[12px] leading-relaxed transition-colors duration-200 ${active ? "text-muted" : "text-dim"}`}>
                      {lvl.blurb}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Engine status on light */}
            <div className="mt-2">
              <div className="flex items-center gap-2.5 border-b border-hair pb-3 mb-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-hair text-ink">
                  <Icon name="terminal" className="h-[18px] w-[18px]" />
                </span>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink">Professional Mode</p>
                  <p className="text-[11px] text-dim">What runs under the hood</p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={level.key}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-1.5"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {ENGINE_ROWS.map(({ key, label, desc }) => {
                    const status = engines[key] ?? "off";
                    const style  = STATUS_STYLE[status] ?? STATUS_STYLE.off;
                    return (
                      <div key={key} className="card flex items-center justify-between px-3.5 py-2.5">
                        <div>
                          <p className="text-[12px] font-semibold text-ink">{label}</p>
                          <p className="text-[10px] text-dim">{desc}</p>
                        </div>
                        <div className={`flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${style.ring} ${style.text}`}>
                          <span className={`h-1 w-1 shrink-0 rounded-full ${style.dot}`} aria-hidden />
                          {STATUS_LABEL[status] ?? status}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── COL 2: Network protection topology ── */}
          <div className="card p-6 flex flex-col items-center">
            <div className="flex w-full items-center justify-between border-b border-hair pb-3 mb-5">
              <p className="label-mono">Protection coverage</p>
              <AnimatePresence mode="wait">
                <motion.span
                  key={level.key}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className={`text-[11px] font-semibold rounded-full px-2.5 py-1 ${
                    levelIdx === 2 ? "bg-[#0FA895]/10 text-[#177245]" :
                    levelIdx === 1 ? "bg-[#B97C10]/10 text-[#B97C10]" :
                    "bg-bg-raised text-dim"
                  }`}
                >
                  {level.label}
                </motion.span>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={levelIdx}
                initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="w-full flex justify-center"
              >
                <ProtectionTopology levelIdx={levelIdx} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── COL 3: Live threat log ── */}
          <div className="card p-6 flex flex-col">
            <ThreatLog levelIdx={levelIdx} />

            <div className="mt-4 pt-4 border-t border-hair">
              <p className="text-[11px] text-dim">
                Illustrative log entries showing Frontier engine behaviour per level. Not live traffic.
              </p>
              <Link href="/frontier/capabilities" className="link-cta mt-2 inline-block text-[13px]">
                See all protection capabilities ›
              </Link>
            </div>
          </div>
        </div>

        {/* Proof strip */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[13px] font-medium text-dim">
          {["Independently certified", "ISO 27001:2022", "Common Criteria", "Built in India", "24-hour response"].map((p, i) => (
            <span key={p} className="flex items-center gap-3">
              {i > 0 ? <span className="h-1 w-1 rounded-full bg-hair2" aria-hidden /> : null}
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
