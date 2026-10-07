"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin SecuEdge-blue scroll progress hairline. Uses the existing
 *  framer-motion architecture — no new scroll system. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#016FED] to-[#22D3EE]"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
