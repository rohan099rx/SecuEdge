import { SECUEDGE_PRODUCTS } from "@/lib/site";

export type FrontierCapability = {
  slug: string;
  name: string;
  group: string;
  summary: string;
  details: string[];
};

export type EcosystemProduct = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  accent: string;
  capabilities: string[] | FrontierCapability[];
  story: string[];
};

/** Public product story is intentionally limited to the currently available Frontier NGFW. */
export const FRONTIER_CAPABILITIES: FrontierCapability[] = [
  { slug: "firewall-policy", name: "Firewall policy & NAT", group: "Firewall", summary: "Define which traffic may enter, leave and move through the network.", details: ["Stateful packet inspection", "Firewall rules, NAT and anti-spoofing", "Time-based and policy-based controls"] },
  { slug: "intrusion-prevention", name: "IDS / IPS", group: "Security", summary: "Inspect network traffic for suspicious or disallowed activity.", details: ["Intrusion detection and prevention controls", "Protection profiles for different operating needs", "Policy tuning and event review"] },
  { slug: "web-content", name: "Web & content filtering", group: "Security", summary: "Apply network policy to web destinations and content access.", details: ["IP and DNS-based filtering", "Web and content policy areas", "Safe Environment Filter for supported deployments"] },
  { slug: "vpn", name: "VPN connectivity", group: "Connectivity", summary: "Protect approved site-to-site and remote-access connections.", details: ["IPsec and OpenVPN", "Site-to-site and remote access workflows", "VPN access, routing and split-tunnel policy"] },
  { slug: "networking", name: "Routing & network services", group: "Networking", summary: "Configure how traffic moves between interfaces and network zones.", details: ["Static, policy-based and dynamic routing", "OSPF / BGP, subject to deployment and release", "VLAN segmentation and network services"] },
  { slug: "wan", name: "Multi-WAN & failover", group: "Connectivity", summary: "Configure more than one internet path and review connection status.", details: ["Multi-WAN support", "Connection failover settings", "WAN configuration and status views"] },
  { slug: "visibility", name: "Monitoring, logs & reports", group: "Visibility", summary: "Review firewall activity and network status for day-to-day operations.", details: ["Dashboard and traffic graph views", "Firewall logs and reports", "SNMP and CLI diagnostics in Professional Mode"] },
  { slug: "bandwidth", name: "Bandwidth management", group: "Networking", summary: "Shape or prioritize traffic according to network policy.", details: ["Bandwidth priority settings", "Traffic management controls", "Policy behavior varies with configuration"] },
];

export const FRONTIER_PRODUCT = {
  slug: "frontier",
  name: "Frontier",
  category: "Next-Generation Firewall",
  role: "PROTECT",
  accent: "#2186c4",
  summary: "Next-generation firewall protection with a clearer way to work.",
  description: "SecuEdge Frontier is the currently available SecuEdge product: an NGFW for securing network edges with firewall policy, inspection, secure connectivity and network visibility.",
  availability: "Available now",
  capabilities: FRONTIER_CAPABILITIES,
  story: ["Internet and WAN links", "Frontier NGFW", "Policy inspection", "Segmented networks", "Users and applications"],
};

const PRODUCT_STORIES: Record<string, { capabilities: string[]; story: string[] }> = {
  frontier: {
    capabilities: FRONTIER_CAPABILITIES.map((capability) => capability.name),
    story: ["Internet and WAN links", "Frontier NGFW", "Policy inspection", "Segmented networks", "Users and applications"],
  },
  watchtower: {
    capabilities: ["Infrastructure visibility", "Device health", "Network event management"],
    story: ["Devices connect", "Topology becomes visible", "Health and events are monitored"],
  },
  secuweb: {
    capabilities: ["Secure branch connectivity", "Policy-driven WAN paths", "Cloud and data-center connections"],
    story: ["Branch", "Secure path", "Cloud and data center"],
  },
  grid: {
    capabilities: ["Security information and event management", "Event correlation", "Orchestrated response workflows"],
    story: ["Events enter", "Signals correlate", "Incidents become actionable"],
  },
  secudefend: {
    capabilities: ["Intrusion detection", "Intrusion prevention", "Threat interception"],
    story: ["Traffic arrives", "Suspicious activity is detected", "Threats are intercepted"],
  },
  muster: {
    capabilities: ["Centralized log collection", "Search and filtering", "Security event investigation"],
    story: ["Logs collect", "Events are filtered", "Records become insight"],
  },
};

export const ECOSYSTEM_PRODUCTS: EcosystemProduct[] = [
  FRONTIER_PRODUCT,
  ...SECUEDGE_PRODUCTS.filter((product) => product.key !== "frontier").map((product) => ({
    slug: product.key,
    name: product.name,
    category: product.category,
    summary: product.desc,
    description: product.desc,
    accent: product.accent,
    ...PRODUCT_STORIES[product.key],
  })),
];

export const ECOSYSTEM_BY_SLUG: Record<string, EcosystemProduct> = Object.fromEntries(
  ECOSYSTEM_PRODUCTS.map((product) => [product.slug, product]),
);
