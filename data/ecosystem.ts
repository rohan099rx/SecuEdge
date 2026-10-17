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
  status: "available" | "in-development" | "on-roadmap";
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
  name: "SecuEdge Frontier",
  category: "Next-Generation Firewall",
  role: "PROTECT",
  accent: "#2186c4",
  status: "available" as const,
  summary: "Firewalling, made easy. The secure setup, made easy.",
  description: "SecuEdge Frontier is the available SecuEdge product: a next-generation firewall for network edges with firewall policy, inspection, secure connectivity and web filtering, in one appliance with Quick Mode and Professional Mode.",
  availability: "Available now",
  capabilities: FRONTIER_CAPABILITIES,
  story: ["Internet and WAN links", "SecuEdge Frontier", "Policy inspection", "Segmented networks", "Users and applications"],
};

const PRODUCT_STORIES: Record<string, { capabilities: string[]; story: string[] }> = {
  frontier: {
    capabilities: FRONTIER_CAPABILITIES.map((capability) => capability.name),
    story: ["Internet and WAN links", "SecuEdge Frontier", "Policy inspection", "Segmented networks", "Users and applications"],
  },
  secuweb: {
    capabilities: ["Multi-line WAN joining", "Policy-driven paths", "Branch, plant and campus connectivity"],
    story: ["Many sites need joining", "Paths are managed from one console", "Branches, plants and campuses connect"],
  },
  secudefend: {
    capabilities: ["Deep inspection", "High-capacity prevention", "Dedicated inspection layer"],
    story: ["Traffic needs depth", "Inspection scales separately", "Threats are stopped at the layer"],
  },
  grid: {
    capabilities: ["Alert consolidation", "Event correlation", "Automated response"],
    story: ["Alerts arrive from every device", "Related events connect", "Teams respond automatically"],
  },
  secuconnect: {
    capabilities: ["Large remote workforces", "Many-branch VPN", "Dedicated access layer"],
    story: ["Remote users multiply", "Dedicated VPN carries the load", "Every worker connects securely"],
  },
  watchtower: {
    capabilities: ["Device health", "Topology visibility", "Uptime monitoring"],
    story: ["Devices connect", "Topology becomes visible", "Health and uptime are monitored"],
  },
  muster: {
    capabilities: ["Long-term log records", "Search and filtering", "Audit-ready records in India"],
    story: ["Logs collect", "Records are searchable", "Audits find their evidence"],
  },
};

export const ECOSYSTEM_PRODUCTS: EcosystemProduct[] = [
  { ...FRONTIER_PRODUCT, status: "available" },
  ...SECUEDGE_PRODUCTS.filter((product) => product.key !== "frontier").map((product) => ({
    slug: product.key,
    name: product.name,
    category: product.category,
    summary: product.desc,
    description: product.desc,
    accent: product.accent,
    status: product.status,
    ...PRODUCT_STORIES[product.key],
  })),
];

export const ECOSYSTEM_BY_SLUG: Record<string, EcosystemProduct> = Object.fromEntries(
  ECOSYSTEM_PRODUCTS.map((product) => [product.slug, product]),
);
