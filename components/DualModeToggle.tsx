"use client";

import { useState } from "react";
import { Icon, type IconName } from "@/components/Icons";
import { Logo } from "@/components/Logo";

/**
 * Faithful mock of the real SecuEdge product sidebar in its two modes.
 * `ProductMenu` renders one labelled menu (used to show Quick and
 * Professional side by side on the homepage). `DualModeToggle` is the
 * interactive toggling version (used on /frontier/dual-mode).
 * Self-contained on-dark palette — do not use light-theme tokens here.
 */

type QuickItem = { label: string; icon: IconName; color: string; active?: boolean };
const QUICK: QuickItem[] = [
  { label: "Dashboard", icon: "grid", color: "#4f46e5", active: true },
  { label: "WAN", icon: "globe", color: "#b45c2e" },
  { label: "LAN", icon: "network", color: "#3f8c5f" },
  { label: "VPN", icon: "lock", color: "#2f6da4" },
  { label: "Captive Portal", icon: "wifi", color: "#7c4d9e" },
  { label: "Load Balancing", icon: "share", color: "#bd8a2e" },
  { label: "Category Blocking", icon: "ban", color: "#4a5568" },
  { label: "Security", icon: "shield", color: "#1e2a3d" },
  { label: "Bandwidth Management", icon: "gauge", color: "#3d8577" },
  { label: "Network Monitoring", icon: "chart", color: "#2d5a8c" },
];

type ProItem = { label: string; icon: IconName; expand?: boolean; badge?: string; active?: boolean };
const PRO: { group: string; items: ProItem[] }[] = [
  { group: "Overview", items: [{ label: "Dashboard", icon: "grid" }] },
  {
    group: "Configuration",
    items: [
      { label: "System", icon: "settings", expand: true },
      { label: "Identity & access", icon: "users", expand: true },
      { label: "Network", icon: "share", expand: true },
      { label: "Dynamic routing", icon: "route", expand: true },
    ],
  },
  {
    group: "Security",
    items: [
      { label: "Firewall", icon: "flame", expand: true },
      { label: "VPN", icon: "lock", expand: true },
      { label: "IDPS", icon: "eye", badge: "Active" },
      { label: "SNMP", icon: "antenna", active: true },
      { label: "NTP", icon: "clock" },
      { label: "PPPoE server", icon: "plug" },
    ],
  },
  { group: "Monitoring", items: [{ label: "Status & logs", icon: "chart", expand: true }] },
  {
    group: "Diagnostics & tools",
    items: [
      { label: "Network tools", icon: "globe", expand: true },
      { label: "System info", icon: "cpu", expand: true },
      { label: "Command prompt", icon: "terminal" },
    ],
  },
];

function Chevron() {
  return (
    <svg className="h-4 w-4 shrink-0 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/** The scrolling menu body for a given mode. */
function MenuBody({ mode }: { mode: "quick" | "pro" }) {
  if (mode === "pro") {
    return (
      <div className="space-y-4 px-3.5 py-3.5">
        {PRO.map((g) => (
          <div key={g.group}>
            <p className="mb-1.5 px-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
              {g.group}
            </p>
            <div className="space-y-0.5">
              {g.items.map((it) => (
                <div
                  key={it.label}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 ${
                    it.active ? "bg-white/[0.08]" : ""
                  }`}
                >
                  <Icon name={it.icon} className={`h-[18px] w-[18px] shrink-0 ${it.active ? "text-white" : "text-white/65"}`} />
                  <span className={`flex-1 truncate text-[14px] ${it.active ? "text-white" : "text-white/85"}`}>
                    {it.label}
                  </span>
                  {it.badge ? (
                    <span className="rounded-full bg-[#2f7d4f] px-2 py-0.5 text-[10px] font-semibold text-white">
                      {it.badge}
                    </span>
                  ) : null}
                  {it.expand ? <Chevron /> : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-2 px-3.5 py-3.5">
      {QUICK.map((it) => (
        <div
          key={it.label}
          className={`flex items-center gap-3.5 rounded-xl px-4 py-2.5 ${it.active ? "ring-2 ring-white/80" : ""}`}
          style={{ backgroundColor: it.color }}
        >
          <Icon name={it.icon} className="h-[18px] w-[18px] shrink-0 text-white" />
          <span className="text-[14px] font-medium text-white">{it.label}</span>
        </div>
      ))}
    </div>
  );
}

/** Static labelled console — used to show Quick and Professional side by side.
 *  Quick shows fully (it's the simple mode); Professional is capped to the
 *  same height with a fade, signalling there's more depth than fits. */
export function ProductMenu({ mode }: { mode: "quick" | "pro" }) {
  const isQuick = mode === "quick";
  return (
    <div className="panel-product overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <span className="flex items-center gap-2 text-sm font-semibold text-white">
          <Icon name={isQuick ? "zap" : "gauge"} className="h-4 w-4 text-[#3AA5FF]" />
          {isQuick ? "Quick Mode" : "Professional Mode"}
        </span>
        <span className="text-[11px] uppercase tracking-[0.12em] text-white/40">
          {isQuick ? "For the business" : "For engineers"}
        </span>
      </div>
      {isQuick ? (
        <MenuBody mode="quick" />
      ) : (
        <div className="relative">
          <div className="max-h-[500px] overflow-hidden">
            <MenuBody mode="pro" />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-16 items-end justify-center bg-gradient-to-t from-[#0b1424] via-[#0b1424]/85 to-transparent pb-3">
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#7db9ff]">
              + full technical control
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

/** Interactive toggling console (used on /frontier/dual-mode). */
export function DualModeToggle() {
  const [mode, setMode] = useState<"quick" | "pro">("quick");
  const pro = mode === "pro";

  return (
    <div className="panel-product overflow-hidden">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <Logo onDark />
        <span className="mt-0.5 self-end text-[10px] font-semibold uppercase tracking-[0.28em] text-[#3AA5FF]">
          Enterprise
        </span>
      </div>

      <div className="border-b border-white/10 px-4 py-3">
        <div className="mx-auto flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5">
          <button type="button" onClick={() => setMode("quick")} className={`text-sm transition ${pro ? "text-white/40" : "font-semibold text-white"}`}>
            Quick
          </button>
          <button
            type="button"
            role="switch"
            aria-checked={pro}
            aria-label="Toggle Professional Mode"
            onClick={() => setMode(pro ? "quick" : "pro")}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${pro ? "bg-brand-blue" : "bg-white/10 ring-2 ring-brand-blue/60"}`}
          >
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-300 ${pro ? "left-[1.375rem]" : "left-0.5"}`} />
          </button>
          <button type="button" onClick={() => setMode("pro")} className={`text-sm transition ${pro ? "font-semibold text-white" : "text-white/40"}`}>
            Professional
          </button>
        </div>
      </div>

      <MenuBody mode={mode} />
    </div>
  );
}
