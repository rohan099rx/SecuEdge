"use client";

import { useEffect, useRef, useState } from "react";

const NODES = [
  { label: "Cloud", x: 9, y: 23, tone: "blue" },
  { label: "Branch", x: 18, y: 76, tone: "cyan" },
  { label: "Identity", x: 79, y: 18, tone: "blue" },
  { label: "Data", x: 88, y: 76, tone: "green" },
];

export function FirewallGatewayScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [scrollRotation, setScrollRotation] = useState(0);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const onMove = (event: PointerEvent) => {
      const bounds = scene.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      setTilt({ x: y * -7, y: x * 9 });
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });
    const onScroll = () => {
      const progress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
      setScrollRotation(progress * 8);
    };
    scene.addEventListener("pointermove", onMove);
    scene.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      scene.removeEventListener("pointermove", onMove);
      scene.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="gateway-scene" ref={sceneRef} aria-label="Interactive 3D illustration of a SecuEdge security gateway">
      <div className="gateway-scene__hud gateway-scene__hud--top">
        <span><i className="status-mark" /> Protection active</span>
        <span className="gateway-scene__hud-code">SEC/EDGE · 01</span>
      </div>
      <div className="gateway-scene__space" style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y + scrollRotation}deg)` }}>
        <div className="gateway-scene__grid" />
        <div className="gateway-scene__orbit gateway-scene__orbit--one" />
        <div className="gateway-scene__orbit gateway-scene__orbit--two" />
        <svg className="gateway-scene__links" viewBox="0 0 100 100" aria-hidden="true">
          {NODES.map((node) => <line key={node.label} x1="50" y1="50" x2={node.x} y2={node.y} />)}
        </svg>
        {NODES.map((node) => (
          <div
            className={`gateway-node gateway-node--${node.tone}`}
            key={node.label}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <span className="gateway-node__pulse" />
            <span className="gateway-node__dot" />
            <span className="gateway-node__label">{node.label}</span>
          </div>
        ))}
        <div className="gateway-core">
          <div className="gateway-core__halo" />
          <div className="gateway-core__face">
            <div className="gateway-core__mark">S</div>
            <span>FRONTIER</span>
            <strong>SECURE GATEWAY</strong>
            <i />
          </div>
          <div className="gateway-core__ring gateway-core__ring--outer" />
          <div className="gateway-core__ring gateway-core__ring--inner" />
        </div>
        <span className="gateway-packet gateway-packet--one" />
        <span className="gateway-packet gateway-packet--two" />
        <span className="gateway-packet gateway-packet--three" />
        <span className="gateway-threat">THREAT BLOCKED <b>×</b></span>
      </div>
      <div className="gateway-scene__hud gateway-scene__hud--bottom">
        <span>5 active security layers</span>
        <span>Policy path: <b>verified</b></span>
      </div>
    </div>
  );
}
