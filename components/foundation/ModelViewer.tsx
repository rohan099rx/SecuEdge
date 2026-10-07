"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const SecuEdgeScene = dynamic(() => import("@/components/3d/Scene").then((module) => module.SecuEdgeScene), {
  ssr: false,
  loading: () => <div className="model-viewer__fallback">Loading hardware view…</div>,
});

export function ModelViewer({ topology = false, transparent = false }: { topology?: boolean; transparent?: boolean }) {
  return (
    <div className="model-viewer">
      <Suspense fallback={<div className="model-viewer__fallback">Loading hardware view…</div>}>
        <SecuEdgeScene topology={topology} interaction transparent={transparent} />
      </Suspense>
      <div className="model-viewer__caption">
        <span>SE-series hardware</span>
        <span>Interactive preview · model subject to final specification</span>
      </div>
    </div>
  );
}
