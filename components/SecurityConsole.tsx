"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/Icons";

const SCENARIOS = [
  { label: "Everyday browsing", engine: "Firewall", result: "Connection allowed", detail: "An allowed connection passes through Frontier to the destination.", blocked: false },
  { label: "Phishing link", engine: "DNS filtering", result: "Domain blocked", detail: "A request to a known phishing domain is stopped at the firewall.", blocked: true },
  { label: "Intrusion attempt", engine: "Intrusion prevention", result: "Attempt blocked", detail: "Traffic matching an intrusion rule is stopped before reaching the office network.", blocked: true },
] as const;

/** Illustrative policy scenarios; never represents live customer telemetry. */
export function SecurityConsole() {
  const [selected, setSelected] = useState(0);
  const reduce = useReducedMotion();
  const scene = SCENARIOS[selected];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#3AA5FF]/30 bg-[#0A1322] text-white shadow-[0_35px_80px_-30px_rgba(0,0,0,0.8)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-5 py-4">
        <span className="text-sm font-semibold">Frontier in action</span>
        <span className="rounded-full border border-[#7db9ff]/30 px-2.5 py-1 text-[11px] text-[#a9cfff]">Interactive demo</span>
      </div>
      <div className="p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-[#a9cfff]">One boundary. Clear decisions.</p>
        <div className="relative my-8 grid grid-cols-[1fr_1.15fr_1fr] items-center gap-3 text-center">
          <div className="absolute inset-x-8 top-8 h-px bg-[#3AA5FF]/30" aria-hidden />
          <motion.div key={`path-${selected}`} aria-hidden
            className={`absolute left-[12%] top-[30px] h-1 rounded-full ${scene.blocked ? "bg-[#ffacaf]" : "bg-[#72e7be]"}`}
            style={{ width: scene.blocked ? "38%" : "76%", transformOrigin: scene.blocked ? "right" : "left", left: scene.blocked ? "50%" : "12%" }}
            initial={reduce ? false : { scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.55 }} />
          {[
            { name: "Your office", icon: "network" as const },
            { name: "Frontier", icon: "shield-check" as const },
            { name: "Internet", icon: "globe" as const },
          ].map((node, i) => (
            <div key={node.name} className="relative">
              <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border ${i === 1 ? "border-[#3AA5FF]/60 bg-[#123460] shadow-[0_0_35px_rgba(1,111,237,0.25)]" : "border-white/15 bg-[#101f35]"}`}>
                <Icon name={node.icon} className="h-7 w-7 text-[#a9cfff]" />
              </div>
              <p className="mt-3 text-xs font-medium text-white/80">{node.name}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-2 sm:grid-cols-3" role="group" aria-label="Choose a traffic scenario">
          {SCENARIOS.map((item, i) => (
            <button key={item.label} type="button" aria-pressed={i === selected} onClick={() => setSelected(i)}
              className={`min-h-11 rounded-lg border px-3 py-2 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7db9ff] ${i === selected ? "border-[#3AA5FF] bg-[#016FED]/20 text-white" : "border-white/15 text-white/65 hover:bg-white/5"}`}>
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-5 min-h-[152px] rounded-xl border border-white/10 bg-[#061020] p-4" role="status" aria-live="polite" aria-atomic="true">
          <motion.div key={selected} initial={reduce ? false : { opacity: 0.6, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }}>
            <p className="text-[11px] uppercase tracking-wider text-[#9aadc8]">{scene.engine} · Illustrative policy outcome</p>
            <p className={`mt-2 flex items-center gap-2 text-lg font-semibold ${scene.blocked ? "text-[#ffacaf]" : "text-[#72e7be]"}`}>
              <span aria-hidden>{scene.blocked ? "×" : "✓"}</span>{scene.result}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#b5c5db]">{scene.detail}</p>
          </motion.div>
        </div>
        <a href="#frontier-demo" className="mt-5 inline-flex min-h-11 items-center text-sm font-medium text-[#a9cfff] hover:text-white">Try the protection controls <span className="ml-2" aria-hidden>↓</span></a>
      </div>
    </div>
  );
}
