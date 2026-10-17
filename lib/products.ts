import { APPLIANCES } from "@/lib/site";

export const HARDWARE_PRODUCTS = APPLIANCES.map((appliance) => ({
  id: appliance.model.toLowerCase(),
  model: appliance.model,
  formFactor: appliance.formFactor,
  userRange: appliance.userRange,
  typicalSite: appliance.typicalSite,
  modeSummary: "Quick Mode + Professional Mode",
  specStatus: "Model-specific technical specifications are available on request.",
  details: [
    `${appliance.formFactor} form factor`,
    `Sized for ${appliance.userRange} peak users`,
    "Same SecuEdge Frontier product family",
  ],
}));

export type ProductPageData = {
  slug: string;
  model: string;
  displayName: string;
  formFactor: "Desktop" | "Rack-mount";
  userRange: string;
  typicalSite: string;
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
  faqs: Array<{ q: string; a: string }>;
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

function deploymentFor(formFactor: string): string[] {
  return formFactor === "Desktop"
    ? ["Branch or small office edge", "Remote location", "Compact deployment where desktop hardware is preferred"]
    : ["Office, campus or head-office edge", "Rack-based deployment", "Professional rack-mount form factor"];
}

export const PRODUCT_PAGES: ProductPageData[] = APPLIANCES.map((appliance) => {
  const { model, formFactor, userRange, typicalSite } = appliance;
  const slug = model.toLowerCase();
  return {
    slug,
    model,
    displayName: `SecuEdge Frontier ${model}`,
    formFactor,
    userRange,
    typicalSite,
    positioning: `${formFactor} SecuEdge Frontier appliance, sized for ${userRange} peak users. Validate model suitability with our team against your busiest-hour user count.`,
    overview: `${model} is part of the SecuEdge Frontier next-generation firewall family. Every model runs the same software with the identical feature set; this page keeps model-specific performance and hardware values unpublished until they are verified.`,
    performance: [
      "Firewall / VPN / IDPS throughput: specification available on request",
      "Concurrent sessions and new sessions/second: specification available on request",
      "Recommended user range: see the sizing table on the appliances page",
    ],
    interfaces: ["WAN, LAN and SFP port counts: available on request", "Interface role and port combinations: confirm against the model datasheet", "Power, dimensions and environmental limits: available on request"],
    securityCapabilities: SHARED_CAPABILITIES,
    hardware: [
      `${formFactor} chassis`,
      formFactor === "Rack-mount" ? "Professional (P-series) rack-mount form factor" : "Desktop form factor",
      "SecuEdge Frontier software family",
      "Quick Mode and Professional Mode are software operating modes, independent of hardware form factor",
    ],
    deployment: deploymentFor(formFactor),
    architecture: COMMON_ARCHITECTURE,
    specifications: [
      { label: "Model", value: model },
      { label: "Product", value: "SecuEdge Frontier NGFW" },
      { label: "Form factor", value: formFactor },
      { label: "Peak users", value: userRange },
      { label: "Typical site", value: typicalSite },
      { label: "Operating modes", value: "Quick Mode + Professional Mode" },
      { label: "Firewall / VPN / IDPS throughput", value: "Available on request" },
      { label: "Ports, memory and storage", value: "Available on request" },
      { label: "Power and dimensions", value: "Available on request" },
    ],
    comparison: [
      { label: "Model in lineup", value: model },
      { label: "Form factor", value: formFactor },
      { label: "Peak users", value: userRange },
      { label: "Technical sizing", value: "Confirm with the official datasheet" },
    ],
    downloads: [{ label: `${model} product data`, detail: "Request the current approved model datasheet from SecuEdge." }],
    faqs: [
      { q: `Is the ${model} right for our user count?`, a: `The ${model} is sized for ${userRange} peak users at the busiest hour, counting each VPN user three times. Use the model finder or ask our team to confirm.` },
      { q: "Does it run both operating modes?", a: "Yes. Every SecuEdge Frontier model runs Quick Mode and Professional Mode, switching with one toggle. Neither is a cut-down product." },
      { q: "Can we get performance figures?", a: "Full specifications are available on request." },
      { q: "Where is our data kept?", a: "In India, by default. Traffic, logs and policy data stay on Indian soil, with no overseas routing." },
      { q: "What support do we get?", a: "24/7 technical support from India-based engineers on 1800 123 0966. We respond within 24 hours." },
    ],
  };
});

export function getProductPage(slug: string) {
  return PRODUCT_PAGES.find((product) => product.slug === slug);
}
