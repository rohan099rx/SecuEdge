import { APPLIANCES } from "@/lib/site";

export const HARDWARE_PRODUCTS = APPLIANCES.map((appliance) => ({
  id: appliance.model.toLowerCase(),
  model: appliance.model,
  formFactor: appliance.formFactor,
  tier: appliance.tier,
  modeSummary: "Quick Mode + Professional Mode",
  specStatus: "Model-specific technical specifications are available on request.",
  details: [`${appliance.formFactor} form factor`, `${appliance.tier} lineup band · indicative`, "Same Frontier NGFW product family"],
}));

export type ProductPageData = {
  slug: string;
  model: string;
  displayName: string;
  formFactor: "Desktop" | "Rack-mount";
  tier: string;
  positioning: string;
  overview: string;
  performance: string[];
  interfaces: string[];
  securityCapabilities: string[];
  hardware: string[];
  deployment: string[];
  architecture: string[];
  specifications: Array<{ label: string; value: string }>;
  comparison: Array<{ label: string; value: string }>;
  downloads: Array<{ label: string; detail: string }>;
};

const SHARED_CAPABILITIES = [
  "Firewall rules, stateful inspection and NAT",
  "IDS / IPS and security inspection controls",
  "VPN connectivity and routing",
  "Web, content and DNS-based filtering",
  "VLAN segmentation and network services",
  "Traffic visibility, monitoring and logs",
  "Quick Mode and Professional Mode",
];

const COMMON_ARCHITECTURE = [
  "Internet and WAN connections",
  "SecuEdge Frontier firewall boundary",
  "LAN and segmented network zones",
  "Protected users, services and devices",
];

function deploymentFor(tier: string): string[] {
  switch (tier) {
    case "Branch / small office": return ["Branch or small office edge", "Remote location", "Compact deployment where desktop hardware is preferred"];
    case "Mid-market": return ["Mid-market network edge", "Regional office or campus", "Rack-based deployment"];
    default: return ["Enterprise network edge", "Larger or segmented environment", "Rack-based deployment"];
  }
}

export const PRODUCT_PAGES: ProductPageData[] = APPLIANCES.map((appliance) => {
  const { model, formFactor, tier } = appliance;
  const slug = model.toLowerCase();
  const capacityLabel = `${tier} (indicative deployment band)`;
  return {
    slug,
    model,
    displayName: `SecuEdge Frontier ${model}`,
    formFactor,
    tier,
    positioning: `${formFactor} Frontier NGFW hardware in the ${tier.toLowerCase()} lineup band. Validate model suitability against the approved specification sheet and your traffic profile.`,
    overview: `${model} is part of the SecuEdge Frontier next-generation firewall family. It uses the shared Frontier product experience; this page keeps model-specific performance and hardware values unpublished until they are verified.`,
    performance: [
      "Firewall / VPN / IDPS throughput: specification available on request",
      "Concurrent sessions and new sessions/second: specification available on request",
      "Recommended user or bandwidth range: confirm with SecuEdge",
    ],
    interfaces: ["WAN, LAN and SFP port counts: available on request", "Interface role and port combinations: confirm against the model datasheet", "Power, dimensions and environmental limits: available on request"],
    securityCapabilities: SHARED_CAPABILITIES,
    hardware: [
      `${formFactor} chassis`,
      formFactor === "Rack-mount" ? "Professional (P-series) rack-mount form factor" : "Desktop form factor",
      "Frontier software product family",
      "Quick Mode and Professional Mode are software operating modes, independent of hardware form factor",
    ],
    deployment: deploymentFor(tier),
    architecture: COMMON_ARCHITECTURE,
    specifications: [
      { label: "Model", value: model },
      { label: "Product", value: "SecuEdge Frontier NGFW" },
      { label: "Form factor", value: formFactor },
      { label: "Lineup band", value: capacityLabel },
      { label: "Operating modes", value: "Quick Mode + Professional Mode" },
      { label: "Firewall / VPN / IDPS throughput", value: "Available on request" },
      { label: "Ports, memory and storage", value: "Available on request" },
      { label: "Power and dimensions", value: "Available on request" },
    ],
    comparison: [
      { label: "Model in lineup", value: model },
      { label: "Form factor", value: formFactor },
      { label: "Provisional deployment band", value: tier },
      { label: "Technical sizing", value: "Confirm with the official datasheet" },
    ],
    downloads: [{ label: `${model} product data`, detail: "Request the current approved model datasheet from SecuEdge." }],
  };
});

export function getProductPage(slug: string) {
  return PRODUCT_PAGES.find((product) => product.slug === slug);
}
