"use client";

import { ReactNode, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Pointer-reactive ambience: exposes smoothed CSS vars --mx / --my (−1…1)
 * on the wrapper as the visitor moves their mouse. Background layers read
 * them for a gentle parallax drift — the hero feels alive and responsive
 * without being a gimmick. rAF-lerped, transform-only, disabled under
 * reduced motion and on touch devices (vars stay 0).
 */
export function HeroAmbience({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let tx = 0, ty = 0; // target
    let cx = 0, cy = 0; // current (lerped)

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      ty = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      el.style.setProperty("--mx", cx.toFixed(4));
      el.style.setProperty("--my", cy.toFixed(4));
      raf =
        Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001
          ? requestAnimationFrame(tick)
          : 0;
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <div ref={ref} className={className} style={{ ["--mx" as string]: 0, ["--my" as string]: 0 }}>
      {children}
    </div>
  );
}
