"use client";

import { Check, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";

const flows = [
  { label: "Traffic allowed by policy", status: "Allowed", tone: "safe" },
  { label: "Traffic matched to inspection", status: "Inspected", tone: "inspect" },
  { label: "Disallowed traffic pattern", status: "Blocked", tone: "blocked" },
];

export function SecurityFlow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % flows.length), 2200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="security-flow" aria-label="Demonstration of SecuEdge traffic inspection">
      <div className="security-flow__route">
        <span>Internet / WAN</span><i /><b>FRONTIER NGFW</b><i /><b>POLICY + INSPECTION</b><i /><span>Network zones</span>
      </div>
      <div className="security-flow__items">
        {flows.map((flow, index) => (
          <div className={`security-flow__item security-flow__item--${flow.tone}${index === active ? " is-active" : ""}`} key={flow.label}>
            <span className="security-flow__icon">{flow.tone === "blocked" ? <ShieldAlert size={16} /> : <Check size={16} />}</span>
            <span>{flow.label}</span>
            <small>{flow.status}</small>
          </div>
        ))}
      </div>
      <p>Conceptual traffic path only. This preview is not connected to an appliance and does not represent live traffic or event data.</p>
    </div>
  );
}
