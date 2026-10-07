"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Icon, type IconName } from "@/components/Icons";
import { ApplianceArt } from "@/components/ApplianceArt";
import { TiltCard } from "@/components/TiltCard";

/**
 * Interactive deployment selector for the homepage "One platform, every size"
 * section. A scale track (the whole SE-series as a spectrum) + a keyboard-
 * navigable tier rail drive a product stage where the real appliance renders
 * and swaps per model. All interaction + content motion — no decorative
 * effects (design-spec §8–9); reduced-motion is honoured via animate-fade-up.
 */

// Ordered lineup — the spectrum shown on the scale track.
const LINEUP = ["SE20", "SE50", "SE50P", "SE100P", "SE250P", "SE500P", "SE1000P"] as const;
const isRack = (m: string) => m !== "SE20" && m !== "SE50"; // P-models + none-desktop

type Tier = {
  id: string;
  name: string;
  who: string;
  form: string;
  models: string[];
  flagship: string;
  bullets: string[];
  href: string;
  icon: IconName;
  start: number; // index into LINEUP
  end: number;
};

const TIERS: Tier[] = [
  {
    id: "branch",
    name: "Branch & small office",
    who: "A single site or your first office.",
    form: "Desktop & compact rack",
    models: ["SE20", "SE50", "SE50P"],
    flagship: "SE50P",
    bullets: [
      "Simple deployment & management",
      "Essential threat protection",
      "Cloud-managed option available",
    ],
    href: "/solutions/branch-office",
    icon: "network",
    start: 0,
    end: 2,
  },
  {
    id: "growing",
    name: "Growing business",
    who: "Room to scale — more throughput, more users.",
    form: "Rack-mount",
    models: ["SE100P", "SE250P"],
    flagship: "SE250P",
    bullets: [
      "Scales with your growth",
      "Deep packet inspection",
      "Consistent policies across sites",
    ],
    href: "/solutions/small-medium-business",
    icon: "users",
    start: 3,
    end: 4,
  },
  {
    id: "enterprise",
    name: "Distributed enterprise",
    who: "Thousands of users, every branch, one policy.",
    form: "Rack-mount · high availability",
    models: ["SE500P", "SE1000P"],
    flagship: "SE1000P",
    bullets: [
      "Scales to thousands of users",
      "High-availability configurations",
      "Enterprise-wide management",
    ],
    href: "/solutions/enterprise",
    icon: "building",
    start: 5,
    end: 6,
  },
];

const N = LINEUP.length;

export function DeploymentSelector() {
  const [tierIdx, setTierIdx] = useState(0);
  const [model, setModel] = useState(TIERS[0].flagship);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tier = TIERS[tierIdx];
  const selectTier = (i: number) => {
    setTierIdx(i);
    setModel(TIERS[i].flagship);
  };

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    let next = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % TIERS.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + TIERS.length) % TIERS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = TIERS.length - 1;
    else return;
    e.preventDefault();
    selectTier(next);
    tabRefs.current[next]?.focus();
  };

  const activeModelIdx = LINEUP.indexOf(model as (typeof LINEUP)[number]);

  return (
    <div className="mt-8">
      {/* ——— Scale track: the whole SE-series as a spectrum ——— */}
      <div className="rounded-2xl border border-hair bg-bg-raised/50 px-5 py-4 sm:px-8">
        <div className="flex items-center justify-between">
          <p className="label-mono">The SE-series</p>
          <p className="label-mono">Desktop → rack → high-availability</p>
        </div>
        <div className="relative mt-4 grid grid-cols-7" aria-hidden>
          {/* baseline */}
          <div className="pointer-events-none absolute inset-x-0 top-[7px] h-px bg-hair" />
          {/* active-tier band */}
          <div
            className="pointer-events-none absolute top-[-4px] bottom-[-4px] rounded-lg border border-brand-blue/30 bg-brand-blue/[0.06] transition-all duration-500 ease-out"
            style={{
              left: `calc(${(tier.start / N) * 100}% + 2px)`,
              width: `calc(${((tier.end - tier.start + 1) / N) * 100}% - 4px)`,
            }}
          />
          {LINEUP.map((m, i) => {
            const inTier = i >= tier.start && i <= tier.end;
            const isSel = i === activeModelIdx;
            return (
              <div key={m} className="relative flex flex-col items-center gap-2">
                <span
                  className={`h-3.5 w-3.5 rounded-full border-2 bg-white transition-colors duration-300 ${
                    isSel
                      ? "border-brand-blue ring-4 ring-brand-blue/15"
                      : inTier
                        ? "border-brand-blue"
                        : "border-hair2"
                  }`}
                />
                <span
                  className={`hidden font-mono text-[10px] tracking-wide transition-colors duration-300 sm:block ${
                    isSel ? "font-semibold text-ink" : inTier ? "text-brand-link" : "text-dim"
                  }`}
                >
                  {m}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ——— Tier rail + product stage ——— */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        {/* Tier rail (tablist) */}
        <div
          role="tablist"
          aria-label="Choose a deployment size"
          aria-orientation="vertical"
          className="flex min-w-0 flex-col justify-center gap-3"
        >
          {TIERS.map((t, i) => {
            const active = i === tierIdx;
            return (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`tier-tab-${t.id}`}
                aria-selected={active}
                aria-controls="deployment-stage"
                tabIndex={active ? 0 : -1}
                onClick={() => selectTier(i)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={`group flex cursor-pointer items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200 ${
                  active
                    ? "border-brand-blue/40 bg-white shadow-[0_10px_26px_-14px_rgba(11,27,51,0.18)]"
                    : "border-hair bg-bg-raised hover:border-hair2 hover:bg-white"
                }`}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border transition-colors ${
                    active
                      ? "border-brand-blue bg-brand-blue text-white"
                      : "border-brand-blue/15 bg-brand-blue/[0.06] text-brand-link"
                  }`}
                >
                  <Icon name={t.icon} className="h-[22px] w-[22px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-ink">{t.name}</span>
                  <span className="mt-0.5 block truncate text-[13px] text-muted">{t.who}</span>
                </span>
                <svg
                  className={`h-4 w-4 shrink-0 transition-all duration-200 ${
                    active ? "text-brand-link opacity-100" : "text-dim opacity-0 group-hover:opacity-100"
                  }`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            );
          })}
        </div>

        {/* Concise SR announcement for model swaps — the panel itself is not a
            live region (tab selection is already conveyed via aria-selected). */}
        <span className="sr-only" role="status" aria-live="polite">
          Showing {model}, {isRack(model) ? "rack-mount" : "desktop"}
        </span>

        {/* Product stage */}
        <div
          role="tabpanel"
          id="deployment-stage"
          aria-labelledby={`tier-tab-${tier.id}`}
          className="card flex min-w-0 flex-col p-6 sm:p-7"
        >
          {/* appliance — dark render framed on white, tilts in 3D to the pointer
              (mouse-only, reduced-motion safe): the product on a stage */}
          <div className="rounded-xl border border-hair bg-bg-raised/40 px-4 pb-4 pt-5">
            <TiltCard max={9} className="mx-auto max-w-xl">
              <div key={model} className="animate-fade-up">
                <ApplianceArt label={model} />
              </div>
            </TiltCard>
            <p className="mt-3.5 text-center label-mono">
              {model} · {isRack(model) ? "Rack-mount" : "Desktop"}
            </p>
          </div>

          {/* details */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-xl font-semibold text-ink">{tier.name}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{tier.who}</p>
              <p className="mt-4 label-mono">Choose a model</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {tier.models.map((m) => {
                  const on = m === model;
                  return (
                    <button
                      key={m}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setModel(m)}
                      className={`cursor-pointer rounded-md border px-2.5 py-1 font-mono text-[11px] font-medium tracking-wide transition-colors ${
                        on
                          ? "border-brand-blue bg-brand-blue text-white"
                          : "border-hair bg-white text-ink hover:border-brand-blue/40 hover:bg-brand-blue/[0.04]"
                      }`}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="label-mono">What you get</p>
              <ul className="mt-2 space-y-2">
                {tier.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-muted">
                    <svg className="mt-1 h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#0FA895" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
              <Link href={tier.href} className="link-cta mt-5 inline-block text-[15px]">
                Explore {tier.name.toLowerCase()} solutions ›
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
