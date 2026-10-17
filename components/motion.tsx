"use client";

/**
 * Motion primitives for the luxury 2D treatment.
 * Scroll-triggered reveals, staggered groups, and counting stats —
 * all disabled automatically under prefers-reduced-motion.
 */
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const; // easeOutQuint-ish — calm, expensive-feeling

/** Fade + rise into view. Wrap any block. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0.7, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.6, delay: Math.min(delay, 0.1), ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Fade + rise on MOUNT (not scroll). Use for above-the-fold content like the
 * hero, where whileInView can fail to trigger for elements already in view on
 * load — which leaves them stuck invisible.
 */
export function FadeUp({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0.85, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Parent for staggered children — pair with <Item>. */
export function Stagger({
  children,
  className = "",
  gap = 0.07,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}

export function Item({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0.72, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Counts from 0 to `to` when scrolled into view. */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className={["tabular", className].filter(Boolean).join(" ")}>
      {prefix}
      {(reduce ? to : value).toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

/** Slow parallax drift — wrap decorative layers, not content. */
export function Parallax({
  children,
  distance = 60,
  className = "",
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(raw, { stiffness: 60, damping: 20 });
  return (
    <motion.div ref={ref} style={reduce ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  );
}

/** Masked line reveal — headline slides up from behind an overflow mask.
 *  `mode="mount"` for above-the-fold content, `"scroll"` (default) below. */
export function LineReveal({
  children,
  className = "",
  delay = 0,
  mode = "scroll",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  mode?: "scroll" | "mount";
}) {
  const reduce = useReducedMotion();
  const anim = reduce ? {} : mode === "mount"
    ? { initial: { y: "110%" }, animate: { y: "0%" } }
    : { initial: { y: "110%" }, whileInView: { y: "0%" }, viewport: { once: true, margin: "-8%" } };
  return (
    <span className={["line-reveal-mask", className].filter(Boolean).join(" ")}>
      <motion.span
        className="block will-change-transform"
        transition={{ duration: 0.85, delay, ease: EASE }}
        {...anim}
      >
        {children}
      </motion.span>
    </span>
  );
}

export type StoryStep = { n: string; title: string; desc: string };

/** Sticky steps — visual pins while chapters scroll past, active step tracked. */
export function StickySteps({
  id,
  eyebrow,
  title,
  lead,
  steps,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  steps: StoryStep[];
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce || !listRef.current) return;
    const children = Array.from(listRef.current.children);
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = children.indexOf(e.target as HTMLElement);
            if (idx >= 0) setActive(idx);
          }
        }
      },
      { rootMargin: "-42% 0px -42% 0px" }
    );
    children.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [reduce, steps.length]);

  const current = steps[Math.min(active, steps.length - 1)];
  return (
    <section id={id} className="relative py-16 md:py-24 scroll-mt-24">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <div className="premium-section-head">
            <p className="premium-eyebrow">{eyebrow}</p>
            <h2 className="premium-section-title">{title}</h2>
            <p className="premium-section-lead">{lead}</p>
          </div>
        </Reveal>
        <div className="mt-9 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="sticky-steps-visual">
            <div className="premium-card p-8 md:p-10">
              <p className="premium-panel-label">Step {active + 1} / {steps.length}</p>
              <p className="sticky-steps-active-num mt-3" aria-hidden>{current.n}</p>
              <h3 className="mt-4 text-2xl font-bold text-white">{current.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{current.desc}</p>
              <div className="sticky-steps-segs" aria-hidden>
                {steps.map((s, i) => (
                  <i key={s.n} className={i <= active ? "is-on" : undefined} />
                ))}
              </div>
            </div>
          </div>
          <div ref={listRef} className="grid gap-6">
            {steps.map((step) => (
              <article
                key={step.n}
                className={["premium-card p-7 transition-opacity duration-300 md:p-8", !reduce && steps.indexOf(step) !== active ? "lg:opacity-60" : ""].filter(Boolean).join(" ")}
              >
                <div className="font-mono text-xs text-slate-600">{step.n}</div>
                <h3 className="mt-2 text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-400">{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
