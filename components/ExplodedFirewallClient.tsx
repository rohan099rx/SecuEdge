"use client";

import dynamic from "next/dynamic";

const ExplodedFirewall = dynamic(
  () => import("@/components/3d/ExplodedFirewall").then((module) => module.ExplodedFirewall),
  { ssr: false, loading: () => <div className="exploded-firewall__fallback">Loading engineering view</div> },
);

export function ExplodedFirewallClient() {
  return <ExplodedFirewall />;
}
