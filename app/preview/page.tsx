import { FrontierShowcaseB } from "@/components/FrontierShowcaseB";
import { FrontierShowcaseC } from "@/components/FrontierShowcaseC";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design preview — SecuEdge",
  description: "Internal comparison of SecuEdge Frontier visual concepts.",
  robots: { index: false, follow: false },
};

export default function PreviewPage() {
  return (
    <>
      <h1 className="sr-only">SecuEdge Frontier design preview</h1>
      {/* ── Option B: Dark Command Centre ── */}
      <div className="relative">
        <div className="absolute top-0 left-0 z-50 m-4 rounded-full bg-white/90 backdrop-blur-sm px-4 py-1.5 text-[12px] font-semibold uppercase tracking-wider text-ink shadow-md border border-hair">
          Option B — Dark Command Centre
        </div>
        <FrontierShowcaseB />
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 bg-bg-raised px-8 py-5 border-y border-hair">
        <span className="h-px flex-1 bg-hair2" />
        <span className="text-[12px] font-semibold uppercase tracking-wider text-dim">vs</span>
        <span className="h-px flex-1 bg-hair2" />
      </div>

      {/* ── Option C: Light Data Theatre ── */}
      <div className="relative">
        <div className="absolute top-0 left-0 z-50 m-4 rounded-full bg-ink/90 backdrop-blur-sm px-4 py-1.5 text-[12px] font-semibold uppercase tracking-wider text-white shadow-md">
          Option C — Light Data Theatre
        </div>
        <FrontierShowcaseC />
      </div>
    </>
  );
}
