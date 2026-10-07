"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ApplianceArt } from "@/components/ApplianceArt";
import { HARDWARE_PRODUCTS } from "@/lib/products";

const HOTSPOTS = [
  { id: "form", label: "Form factor", detail: "The selected model's verified desktop or rack-mount form factor.", className: "appliance-hotspot appliance-hotspot--form" },
  { id: "frontier", label: "Frontier platform", detail: "Every model runs both Quick Mode and Professional Mode.", className: "appliance-hotspot appliance-hotspot--platform" },
] as const;

export function ApplianceShowcase({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [hotspot, setHotspot] = useState<string | null>(null);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const product = HARDWARE_PRODUCTS[selected];

  function choose(index: number) {
    setSelected(index);
    setDetailsOpen(false);
    setHotspot(null);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? HARDWARE_PRODUCTS.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + HARDWARE_PRODUCTS.length) % HARDWARE_PRODUCTS.length;
    choose(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className={`appliance-showcase ${compact ? "appliance-showcase--compact" : ""}`}>
      <div className="appliance-showcase__stage">
        <div className="appliance-showcase__stage-head"><span>SE-series / hardware view</span><span>Illustrative render · specs pending</span></div>
        <div className="appliance-showcase__device-wrap">
          <button type="button" className="appliance-showcase__device" aria-label={`Open ${product.model} product details`} onClick={() => setDetailsOpen((open) => !open)}>
            <span className="appliance-showcase__device-shadow" aria-hidden="true" />
            <span key={product.model} className="appliance-showcase__device-art"><ApplianceArt label={product.model} /></span>
          </button>
          {HOTSPOTS.map((item) => <button key={item.id} type="button" className={`${item.className} ${hotspot === item.id ? "is-active" : ""}`} onMouseEnter={() => setHotspot(item.id)} onMouseLeave={() => setHotspot(null)} onFocus={() => setHotspot(item.id)} onBlur={() => setHotspot(null)} aria-label={`${item.label}: ${item.detail}`}><i aria-hidden="true" /><span>{item.label}</span></button>)}
          {hotspot ? <div className="appliance-hotspot__tooltip" role="status">{HOTSPOTS.find((item) => item.id === hotspot)?.detail}</div> : null}
        </div>
        <div className="appliance-showcase__stage-foot"><span>Click the appliance to open quick specs</span><span>Hover the marked points to inspect</span></div>
      </div>
      <div className="appliance-showcase__info">
        <p className="eyebrow">Selected appliance</p>
        <div className="appliance-showcase__title-row"><h3>{product.model}</h3><span>{selected + 1} / {HARDWARE_PRODUCTS.length}</span></div>
        <p className="appliance-showcase__positioning">SecuEdge Frontier appliance for {product.tier.toLowerCase()} deployments.</p>
        <div className="appliance-showcase__facts">{product.details.map((detail) => <div key={detail}><span>•</span>{detail}</div>)}</div>
        <div className={`appliance-showcase__quick ${detailsOpen ? "is-open" : ""}`}>
          <button type="button" className="appliance-showcase__quick-toggle" aria-expanded={detailsOpen} onClick={() => setDetailsOpen((open) => !open)}>Quick specifications <span aria-hidden>{detailsOpen ? "−" : "+"}</span></button>
          {detailsOpen ? <div className="appliance-showcase__quick-body"><p>{product.modeSummary}</p><p>{product.specStatus}. Throughput, port counts, and recommended user ranges are not published here until the official sheet is available.</p></div> : null}
        </div>
        {!compact ? <Link href="/frontier/appliances" className="text-link">View the appliance family <span aria-hidden>→</span></Link> : null}
      </div>
      <div className="appliance-showcase__selector" role="tablist" aria-label="Select a SecuEdge Frontier appliance model">
        {HARDWARE_PRODUCTS.map((item, index) => <button key={item.id} ref={(element) => { tabs.current[index] = element; }} type="button" role="tab" aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} onClick={() => choose(index)} onKeyDown={(event) => onKeyDown(event, index)}><span>{item.model}</span><small>{item.formFactor}</small></button>)}
      </div>
    </div>
  );
}
