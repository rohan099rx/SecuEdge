"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Rotate3D, ZoomIn, ZoomOut } from "lucide-react";

const FrontierModelCanvas = dynamic(
  () =>
    import("@/components/FrontierModelCanvas").then(
      (module) => module.FrontierModelCanvas,
    ),
  { ssr: false },
);
export function FrontierModelViewer({ model, formFactor, tier }: { model: string; formFactor: string; tier: string }) {
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [viewCommand, setViewCommand] = useState<"front" | "rear" | null>(null);
  const [zoomCommand, setZoomCommand] = useState(0);
  const [rotating, setRotating] = useState(false);

  useEffect(() => {
    const node = root;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setReady(true);
      setInView(entry.isIntersecting);
    }, { rootMargin: "160px 0px" });
    observer.observe(node);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => { setReducedMotion(motion.matches); if (motion.matches) setRotating(false); };
    updateMotion();
    motion.addEventListener?.("change", updateMotion);
    return () => { observer.disconnect(); motion.removeEventListener?.("change", updateMotion); };
  }, [root]);

  return (
    <div ref={setRoot} className="frontier-model-viewer" aria-label={`${model} illustrative Frontier appliance model viewer`}>
      <div className="frontier-model-viewer__topline"><span><i /> FRONTIER / FAMILY HARDWARE VIEW</span><span>{model} · {formFactor.toUpperCase()}</span></div>
      <div className="frontier-model-viewer__canvas">
        {ready ? <FrontierModelCanvas active={inView} reducedMotion={reducedMotion} rotating={rotating} viewCommand={viewCommand} zoomCommand={zoomCommand} /> : <div className="frontier-model-viewer__loading" aria-hidden="true" />}
        <span className="frontier-model-viewer__label">{model} <i /> {tier} · indicative band</span>
        <span className="frontier-model-viewer__annotation">Concept rendering · port layout and dimensions illustrative</span>
      </div>
      <div className="frontier-model-viewer__controls" aria-label="Hardware view controls">
        <div className="frontier-model-viewer__views">
          <button type="button" onClick={() => setViewCommand("front")} aria-pressed={viewCommand === "front"}>Front</button>
          <button type="button" onClick={() => setViewCommand("rear")} aria-pressed={viewCommand === "rear"}>Rear</button>
        </div>
        <div className="frontier-model-viewer__tools">
          <button type="button" onClick={() => setRotating((value) => !value)} aria-pressed={rotating} disabled={reducedMotion} aria-label={rotating ? "Stop automatic rotation" : "Start automatic rotation"}><Rotate3D size={14} /> {rotating ? "Stop" : "Rotate"}</button>
          <button type="button" onClick={() => setZoomCommand((value) => value - 1)} aria-label="Zoom in on appliance"><ZoomIn size={14} /> Zoom in</button>
          <button type="button" onClick={() => setZoomCommand((value) => value + 1)} aria-label="Zoom out from appliance"><ZoomOut size={14} /> Zoom out</button>
        </div>
      </div>
    </div>
  );
}
