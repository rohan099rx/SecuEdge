"use client";

import Link from "next/link";
import { ArrowRight, Eye, Globe2, Layers3, ListTree, ShieldCheck, Waypoints } from "lucide-react";
import { useEffect, useState } from "react";
import { SECUEDGE_PRODUCTS } from "@/lib/site";

const ICONS = {
  frontier: ShieldCheck,
  watchtower: Eye,
  secuweb: Globe2,
  grid: Layers3,
  secudefend: Waypoints,
  muster: ListTree,
} as const;

const POSITIONS = [
  "ecosystem-node--north",
  "ecosystem-node--east",
  "ecosystem-node--south-east",
  "ecosystem-node--south",
  "ecosystem-node--south-west",
  "ecosystem-node--west",
];

export function EcosystemHero() {
  const [active, setActive] = useState("frontier");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  const activeProduct = SECUEDGE_PRODUCTS.find((product) => product.key === active) ?? SECUEDGE_PRODUCTS[0];

  return (
    <section className={`ecosystem-hero-stage${reducedMotion ? " ecosystem-hero-stage--reduced" : ""}`} aria-labelledby="ecosystem-hero-title">
      <div className="ecosystem-hero-stage__backdrop" aria-hidden="true">
        <span /><span /><span /><span /><span /><span />
      </div>
      <div className="foundation-container ecosystem-hero-stage__layout">
        <div className="ecosystem-hero-stage__copy">
          <p className="foundation-eyebrow"><i className="ecosystem-live-dot" /> SECUEdge / SECURITY + NETWORKING PLATFORM</p>
          <h1 id="ecosystem-hero-title">The network is a system.<em>Secure every layer.</em></h1>
          <p className="ecosystem-hero-stage__lead">Six focused products for protecting the edge, seeing the network, connecting locations, responding to threats and understanding every event.</p>
          <div className="foundation-hero__actions">
            <Link href="/products" className="foundation-button">Explore all products <ArrowRight size={16} /></Link>
            <Link href="/contact" className="foundation-button foundation-button--outline">Talk to SecuEdge</Link>
          </div>
          <div className="ecosystem-hero-stage__facts" aria-label="Platform facts">
            <span>06 PRODUCT FAMILIES</span><i /><span>11 FRONTIER MODELS</span><i /><span>ONE CONNECTED VIEW</span>
          </div>
        </div>

        <div className="ecosystem-orbit" aria-label="SecuEdge product ecosystem">
          <div className="ecosystem-orbit__signal" aria-hidden="true">
            <span><i /> LIVE CONTROL PLANE</span>
            <strong>6 ACTIVE SYSTEMS</strong>
          </div>
          <div className="ecosystem-orbit__rings" aria-hidden="true"><i /><i /><i /></div>
          <div className="ecosystem-orbit__paths" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
          <div className="ecosystem-orbit__core">
            <span className="ecosystem-orbit__core-kicker">SECUEdge CORE</span>
            <strong>CONNECTED<br />SECURITY</strong>
            <small>PROTECT · OBSERVE · CONNECT · RESPOND</small>
            <i />
          </div>
          {SECUEDGE_PRODUCTS.map((product, index) => {
            const Icon = ICONS[product.key as keyof typeof ICONS];
            return (
              <Link
                href={product.href}
                key={product.key}
                className={`ecosystem-node ${POSITIONS[index]}${active === product.key ? " is-active" : ""}`}
                onMouseEnter={() => setActive(product.key)}
                onFocus={() => setActive(product.key)}
                style={{ "--node-accent": product.accent } as React.CSSProperties}
              >
                <span className="ecosystem-node__number">0{index + 1}</span>
                <span className="ecosystem-node__icon"><Icon size={16} /></span>
                <span className="ecosystem-node__content"><strong>{product.name}</strong><small>{product.category}</small></span>
                <ArrowRight className="ecosystem-node__arrow" size={14} />
              </Link>
            );
          })}
          <div className="ecosystem-orbit__telemetry ecosystem-orbit__telemetry--one"><span>EVENT FLOW</span><strong>ACTIVE</strong><i /></div>
          <div className="ecosystem-orbit__telemetry ecosystem-orbit__telemetry--two"><span>NETWORK STATE</span><strong>OBSERVABLE</strong><i /></div>
          <div className="ecosystem-orbit__telemetry ecosystem-orbit__telemetry--three"><span>POLICY LAYER</span><strong>ENFORCED</strong><i /></div>
        </div>

        <aside className="ecosystem-hero-stage__inspector">
          <span className="ecosystem-hero-stage__inspector-label">ACTIVE PRODUCT / 0{SECUEDGE_PRODUCTS.findIndex((product) => product.key === active) + 1}</span>
          <strong>{activeProduct.name}</strong>
          <span>{activeProduct.category}</span>
          <p>{activeProduct.desc}</p>
          <Link href={activeProduct.href}>Open product story <ArrowRight size={14} /></Link>
        </aside>
      </div>
      <div className="ecosystem-hero-stage__rail">
        <div className="foundation-container">
          {SECUEDGE_PRODUCTS.map((product, index) => <button type="button" key={product.key} className={active === product.key ? "is-active" : ""} onClick={() => setActive(product.key)}><span>0{index + 1}</span><strong>{product.name}</strong><small>{product.category}</small></button>)}
        </div>
      </div>
    </section>
  );
}
