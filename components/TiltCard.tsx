"use client";

import { ReactNode, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Subtle pointer-reactive 3D tilt — wrap product panels / screenshots so they
 * feel alive as the cursor moves across them. Transform-only, rAF-throttled,
 * and disabled under prefers-reduced-motion. A soft sheen follows the pointer.
 */
export function TiltCard({
  children,
  className = "",
  max = 5,
  sheen = true,
  sheenColor = "rgba(255,255,255,0.10)",
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  sheen?: boolean;
  /** Highlight tint that follows the pointer. Light-on-dark by default; pass a
   *  brand tint (e.g. "rgba(1,111,237,0.12)") for light-surface cards. */
  sheenColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const raf = useRef(0);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(1400px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
      if (sheenRef.current) {
        sheenRef.current.style.background = `radial-gradient(45% 55% at ${(px * 100 + 50).toFixed(1)}% ${(py * 100 + 50).toFixed(1)}%, ${sheenColor}, transparent 60%)`;
        sheenRef.current.style.opacity = "1";
      }
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    el.style.transform = "perspective(1400px) rotateX(0deg) rotateY(0deg)";
    if (sheenRef.current) sheenRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={["relative transition-transform duration-300 ease-out [transform-style:preserve-3d] will-change-transform", className].filter(Boolean).join(" ")}
    >
      {children}
      {sheen ? (
        <div
          ref={sheenRef}
          className="pointer-events-none absolute inset-0 z-20 rounded-2xl opacity-0 transition-opacity duration-300"
          aria-hidden
        />
      ) : null}
    </div>
  );
}
