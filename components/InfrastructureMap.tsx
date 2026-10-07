"use client";

import { useState } from "react";

const NODES = [
  { id: "edge", label: "Internet edge", x: 92, y: 90, kind: "external" },
  { id: "frontier", label: "Frontier", x: 280, y: 90, kind: "core" },
  { id: "office", label: "Office network", x: 468, y: 90, kind: "internal" },
  { id: "policy", label: "Policy engine", x: 280, y: 250, kind: "core" },
  { id: "users", label: "Users & devices", x: 145, y: 410, kind: "internal" },
  { id: "data", label: "Protected data", x: 415, y: 410, kind: "internal" },
] as const;

const EDGES = [
  ["edge", "frontier"],
  ["frontier", "office"],
  ["frontier", "policy"],
  ["policy", "users"],
  ["policy", "data"],
] as const;

export function InfrastructureMap() {
  const [active, setActive] = useState("frontier");
  const byId = Object.fromEntries(NODES.map((node) => [node.id, node]));

  return (
    <div className="architecture-visual" aria-label="Illustration of SecuEdge Frontier protecting an office network">
      <div className="architecture-visual__header">
        <span className="architecture-visual__kicker">Protection architecture</span>
        <span className="architecture-visual__status"><i /> Policy path active</span>
      </div>
      <svg viewBox="0 0 560 520" role="img" aria-labelledby="architecture-title architecture-desc">
        <title id="architecture-title">SecuEdge protection architecture</title>
        <desc id="architecture-desc">Traffic crosses Frontier before reaching an office network, users, devices, and protected data.</desc>
        <g className="architecture-grid" aria-hidden="true">
          {Array.from({ length: 7 }).map((_, i) => <line key={`v-${i}`} x1={40 + i * 80} y1="35" x2={40 + i * 80} y2="475" />)}
          {Array.from({ length: 6 }).map((_, i) => <line key={`h-${i}`} x1="40" y1={35 + i * 88} x2="520" y2={35 + i * 88} />)}
        </g>
        <g className="architecture-edges" aria-hidden="true">
          {EDGES.map(([from, to]) => {
            const a = byId[from]; const b = byId[to];
            return <line key={`${from}-${to}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={active === from || active === to ? "is-active" : ""} />;
          })}
        </g>
        <g className="architecture-boundary" aria-hidden="true">
          <rect x="205" y="41" width="150" height="98" rx="3" />
          <text x="280" y="61" textAnchor="middle">SECURITY BOUNDARY</text>
        </g>
        {NODES.map((node) => (
          <g key={node.id} className={`architecture-node ${active === node.id ? "is-active" : ""}`} onMouseEnter={() => setActive(node.id)} onFocus={() => setActive(node.id)}>
            <circle cx={node.x} cy={node.y} r={node.kind === "core" ? 28 : 22} />
            <circle cx={node.x} cy={node.y} r={node.kind === "core" ? 11 : 8} className="architecture-node__core" />
            <text x={node.x} y={node.y + 52} textAnchor="middle">{node.label}</text>
          </g>
        ))}
      </svg>
      <div className="architecture-visual__legend">
        <span><i className="legend-dot legend-dot--blue" /> Decision point</span>
        <span><i className="legend-dot legend-dot--line" /> Protected path</span>
        <span><i className="legend-dot legend-dot--white" /> Managed asset</span>
      </div>
    </div>
  );
}
