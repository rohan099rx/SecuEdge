import { APPLIANCES } from "@/lib/site";

export type ModelFact = { label: string; value: string | null; source: string | null; verified: boolean };

/** Model values are source-tracked; technical fields stay empty until approved data exists. */
export const FRONTIER_MODELS = APPLIANCES.map((appliance) => ({
  model: appliance.model,
  facts: [
    { label: "Form factor", value: appliance.formFactor, source: "SecuEdge appliance roster", verified: true },
    { label: "Deployment tier", value: `${appliance.tier} (indicative)`, source: "SecuEdge lineup grouping; confirm deployment fit", verified: false },
    { label: "Firewall throughput", value: appliance.throughput, source: null, verified: false },
    { label: "VPN throughput", value: null, source: null, verified: false },
    { label: "IPS throughput", value: null, source: null, verified: false },
    { label: "Threat prevention throughput", value: null, source: null, verified: false },
    { label: "Concurrent sessions", value: null, source: null, verified: false },
    { label: "New sessions / second", value: null, source: null, verified: false },
    { label: "WAN / LAN / SFP ports", value: appliance.ports, source: null, verified: false },
    { label: "RAM and storage", value: null, source: null, verified: false },
    { label: "Power and dimensions", value: null, source: null, verified: false },
    { label: "SSL inspection", value: null, source: null, verified: false },
    { label: "SD-WAN model support", value: null, source: null, verified: false },
    { label: "Quick + Professional Mode", value: "Included across Frontier models", source: "SecuEdge Frontier product information", verified: true },
  ] satisfies ModelFact[],
}));

export function getModelFact(model: string, label: string): ModelFact | undefined {
  return FRONTIER_MODELS.find((item) => item.model === model)?.facts.find((fact) => fact.label === label);
}
