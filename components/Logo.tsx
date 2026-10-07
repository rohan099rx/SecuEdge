"use client";

import Image from "next/image";

/** SecuEdge mark — local asset for instant load, no external fetch. */
export function Logo({ className = "", onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <span role="img" aria-label="SecuEdge" className={["inline-flex items-center gap-2.5", className].filter(Boolean).join(" ")}>
      <Image
        src="/logo.svg"
        alt=""
        width={30}
        height={25}
        className="h-7 w-auto"
        priority
      />
      <span className={`text-base font-semibold tracking-tight ${onDark ? "text-white" : "text-ink"}`}>
        Secu<span className={onDark ? "text-brand-bright" : "text-brand-blue"}>Edge</span>
      </span>
    </span>
  );
}
