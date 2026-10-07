"use client";

import { ArrowDown, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

const nodes = ["Internet", "SecuEdge", "Core network", "Applications", "Users"];

export function NetworkDiagram({ compact = false }: { compact?: boolean }) {
  const [packet, setPacket] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setPacket((value) => (value + 1) % nodes.length), 1200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className={`network-diagram${compact ? " network-diagram--compact" : ""}`} aria-label="SecuEdge network flow">
      {nodes.map((node, index) => (
        <div className="network-diagram__step" key={node}>
          <div className={`network-diagram__node${index === 1 ? " network-diagram__node--firewall" : ""}`}>
            {index === 1 ? <ShieldCheck size={compact ? 15 : 18} /> : <span>{String(index + 1).padStart(2, "0")}</span>}
            <strong>{node}</strong>
            {index === packet ? <i className="network-diagram__packet" aria-hidden /> : null}
          </div>
          {index < nodes.length - 1 ? <ArrowDown className="network-diagram__arrow" size={compact ? 14 : 18} /> : null}
        </div>
      ))}
    </div>
  );
}
