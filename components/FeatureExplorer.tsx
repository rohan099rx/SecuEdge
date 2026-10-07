"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FEATURES, FEATURE_TABS } from "@/lib/content/home";

/**
 * Tabbed explorer for the 24 restored product features — F500 light
 * treatment: pill tabs, flat white cards with thin borders.
 */
export function FeatureExplorer() {
  const [tab, setTab] = useState(FEATURE_TABS[0]);
  const reduce = useReducedMotion();
  const visible = FEATURES.filter((f) => f.tab === tab);

  return (
    <div>
      <div role="tablist" aria-label="Feature categories" className="flex flex-wrap gap-2">
        {FEATURE_TABS.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
              tab === t
                ? "border-brand-blue bg-brand-blue text-white"
                : "border-hair2 bg-white text-muted hover:border-[#9db1c9] hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((f) => (
            <div key={f.title} className="card card-hover h-full p-6">
              <p className="font-semibold text-ink">{f.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.desc}</p>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
