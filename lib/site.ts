/**
 * Single source of truth for site-wide content & data.
 * All figures and claims here are drawn from the SecuEdge Customer Deck.
 * Keep claims true and substantiable (see docs/ for the redesign plan's
 * claims-governance note). Do NOT reintroduce the "70% of Fortune 100" line.
 */

export const SITE = {
  name: "SecuEdge",
  product: "SecuEdge Frontier",
  tagline: "Cybersecurity, made easy. Built in India.",
  productTagline: "SecuEdge Frontier. Firewalling, made easy.",
  companyLine: "India’s homegrown cybersecurity company, committed to making cybersecurity simple and accessible to all.",
  description:
    "SecuEdge Frontier is a next-generation firewall built in India, with a guided Quick Mode for business owners and a full Professional Mode for engineers. Data stays in India. 24/7 India-based support.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.secuedge.com",
  twitter: "@SecuEdge",
  email: "info@secuedge.com",
} as const;

/** The six SecuEdge product families shown in public product navigation. */
export const PRODUCTS = [
  { key: "frontier", name: "Frontier", fullName: "SecuEdge Frontier", category: "Next-generation firewall", status: "available" as const, href: "/products/frontier", desc: "Next-generation firewall protection at the network edge." },
  { key: "watchtower", name: "Watchtower", fullName: "SecuEdge Watchtower", category: "Network Monitoring System", status: "available" as const, href: "/products/watchtower", desc: "Network visibility for infrastructure, devices and events." },
  { key: "secuweb", name: "SecuWeb", fullName: "SecuEdge SecuWeb", category: "SD-WAN", status: "available" as const, href: "/products/secuweb", desc: "Secure connectivity across branches, cloud and data centers." },
  { key: "grid", name: "Grid", fullName: "SecuEdge Grid", category: "SIEM / SOAR", status: "available" as const, href: "/products/grid", desc: "Security event intelligence and response workflows." },
  { key: "secudefend", name: "SecuDefend", fullName: "SecuEdge SecuDefend", category: "IPS / IDS", status: "available" as const, href: "/products/secudefend", desc: "Detection and prevention at the network boundary." },
  { key: "muster", name: "Muster", fullName: "SecuEdge Muster", category: "Log Analyzer", status: "available" as const, href: "/products/muster", desc: "Centralized log analysis for investigation and operations." },
] as const;

export type NavItem = { label: string; href: string; desc?: string; children?: NavItem[] };

export const NAV: NavItem[] = [
  {
    label: 'Products',
    href: '/products',
    children: [
      { label: 'All Products', href: '/products', desc: 'Explore the SecuEdge product portfolio' },
      { label: 'Frontier', href: '/products/frontier', desc: 'Next-Generation Firewall (NGFW)' },
      { label: 'Watchtower', href: '/products/watchtower', desc: 'Network Monitoring System' },
      { label: 'SecuWeb', href: '/products/secuweb', desc: 'SD-WAN' },
      { label: 'Grid', href: '/products/grid', desc: 'SIEM / SOAR' },
      { label: 'SecuDefend', href: '/products/secudefend', desc: 'IPS / IDS' },
      { label: 'Muster', href: '/products/muster', desc: 'Log Analyzer' },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "Network Security", href: "/solutions/network-security", desc: "NGFW protection for critical infrastructure" },
      { label: "Threat Prevention", href: "/solutions/threat-prevention", desc: "Detect and block advanced threats" },
      { label: "Secure Remote Access", href: "/solutions/secure-remote-access", desc: "VPN and zero-trust access" },
      { label: "Network Segmentation", href: "/solutions/network-segmentation", desc: "Contain threats with VLANs" },
      { label: "IoT Security", href: "/solutions/iot-security", desc: "Protect connected devices" },
      { label: "Branch Office", href: "/solutions/branch-office", desc: "Secure distributed locations" },
      { label: "Small & Medium Business", href: "/solutions/small-medium-business", desc: "Enterprise protection, SMB simplicity" },
      { label: "Enterprise", href: "/solutions/enterprise", desc: "High-performance security at scale" },
      { label: "Compliance", href: "/compliance", desc: "DPDP, RBI, SEBI, CERT-In" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Education", href: "/industries/education", desc: "Safe campuses, Safe Environment Filter" },
      { label: "Healthcare", href: "/industries/healthcare", desc: "Clinical networks, medical IoT protection" },
      { label: "Finance", href: "/industries/finance", desc: "Fraud prevention and audit trails" },
      { label: "Government", href: "/industries/government", desc: "Data sovereignty for the public sector" },
      { label: "Manufacturing", href: "/industries/manufacturing", desc: "OT/IT security for production" },
      { label: "Retail", href: "/industries/retail", desc: "POS and customer-data protection" },
      { label: "Legal", href: "/industries/legal", desc: "Client confidentiality by design" },
      { label: "Media", href: "/industries/media", desc: "Deadline-proof newsroom security" },
      { label: "Hospitality", href: "/industries/hospitality", desc: "Guest WiFi isolation and PMS protection" },
      { label: "Logistics", href: "/industries/logistics", desc: "Fleet, port and freight security" },
      { label: "Technology", href: "/industries/technology", desc: "Supply chain and cloud platform protection" },
      { label: "Construction", href: "/industries/construction", desc: "BIM data and site network security" },
      { label: "Agriculture", href: "/industries/agriculture", desc: "Co-op and farm OT protection" },
      { label: "Non-Profit", href: "/industries/nonprofit", desc: "Donor data and volunteer device security" },
      { label: "Consulting", href: "/industries/consulting", desc: "Client IP and road-warrior access security" },
      { label: "Real Estate", href: "/industries/real-estate", desc: "Wire fraud prevention and smart building security" },
      { label: "Automotive", href: "/industries/automotive", desc: "DMS isolation and dealership network security" },
      { label: "Food & Beverage", href: "/industries/food-beverage", desc: "POS segmentation and guest WiFi isolation" },
      { label: "Sports & Fitness", href: "/industries/sports-fitness", desc: "Member data and venue OT protection" },
      { label: "Entertainment", href: "/industries/entertainment", desc: "Source code and production asset security" },
      { label: "Fashion & Beauty", href: "/industries/fashion-beauty", desc: "Multi-brand segmentation and POS security" },
    ],
  },
  { label: "Why SecuEdge", href: "/why-secuedge" },
  { label: "Customers", href: "/customers" },
  { label: "Resources", href: "/resources" },
];

/** Restored solution pages (content recovered from the previous secuedge.com). */
export const SOLUTIONS_NAV = [
  { slug: "network-security", name: "Network Security" },
  { slug: "threat-prevention", name: "Threat Prevention" },
  { slug: "secure-remote-access", name: "Secure Remote Access" },
  { slug: "network-segmentation", name: "Network Segmentation" },
  { slug: "iot-security", name: "IoT Security" },
  { slug: "branch-office", name: "Branch Office" },
  { slug: "small-medium-business", name: "Small & Medium Business" },
  { slug: "enterprise", name: "Enterprise" },
] as const;

/**
 * SE-series appliances — the approved lineup (copy deck §1.3).
 * Sizing is by users only: office users + (VPN users × 3).
 * Full specifications are available on request. No throughput,
 * ports, dimensions or power figures are published.
 */
export type Appliance = {
  model: string;
  formFactor: "Desktop" | "Rack-mount";
  /** Peak users the model is sized for (published range). */
  userRange: string;
  /** Typical site for this range. */
  typicalSite: string;
  // Specs intentionally left as null until the official spec sheet is provided.
  throughput: string | null;
  ports: string | null;
  recommendedUsers: string | null;
};

export const APPLIANCES: Appliance[] = [
  { model: "SE20", formFactor: "Desktop", userRange: "1–30", typicalSite: "Small office, clinic, single café or shop", throughput: null, ports: null, recommendedUsers: null },
  { model: "SE50", formFactor: "Desktop", userRange: "31–70", typicalSite: "Growing office, school wing, small branch", throughput: null, ports: null, recommendedUsers: null },
  { model: "SE100P", formFactor: "Rack-mount", userRange: "71–130", typicalSite: "Mid-size office, school, hospital department", throughput: null, ports: null, recommendedUsers: null },
  { model: "SE250P", formFactor: "Rack-mount", userRange: "131–325", typicalSite: "Large school, college, mid-size hospital or factory", throughput: null, ports: null, recommendedUsers: null },
  { model: "SE500P", formFactor: "Rack-mount", userRange: "326–650", typicalSite: "Enterprise site, large campus", throughput: null, ports: null, recommendedUsers: null },
  { model: "SE750P", formFactor: "Rack-mount", userRange: "651–975", typicalSite: "Large enterprise or campus", throughput: null, ports: null, recommendedUsers: null },
  { model: "SE1000P", formFactor: "Rack-mount", userRange: "976–1,300", typicalSite: "Very large site or head office", throughput: null, ports: null, recommendedUsers: null },
];

/** Above the SE1000P range we design together — never a published model. */
export const CUSTOM_APPLIANCE = {
  model: "Custom",
  userRange: "1,300+",
  typicalSite: "Designed with our team",
};

/** How to size a network (copy deck §9.4). */
export const SIZING_STEPS = [
  "Count the most people or devices on your network at the same time, at the busiest hour.",
  "Count how many people connect by VPN from outside.",
  "Add them, counting each VPN user three times (encrypted traffic is heavier): office users + (VPN users × 3).",
  "Pick the model whose range contains that number.",
];

export const SIZING_EXAMPLE = "Example: 60 office users and 20 VPN users = 60 + 60 = 120, so the SE100P. Over 1,300? We will design it with you.";

/**
 * The seven SecuEdge products. SecuEdge Frontier ships today; the other
 * six are on the roadmap with no dates. Status labels are shown wherever
 * a product appears. Copy per the Company Handbook and copy deck (12 Oct 2026).
 */
export type ProductStatus = "available" | "in-development" | "on-roadmap";

export const STATUS_LABEL: Record<ProductStatus, string> = {
  available: "Available now",
  "in-development": "In development",
  "on-roadmap": "On the roadmap",
};

export const SECUEDGE_PRODUCTS = [
  {
    key: "frontier",
    name: "SecuEdge Frontier",
    category: "Next-Generation Firewall",
    categoryShort: "NGFW",
    href: "/products/frontier",
    status: "available" as ProductStatus,
    desc: "The secure setup, made easy. Firewall, intrusion prevention, antivirus, VPN, SD-WAN and web filtering in one appliance, with Quick Mode and Professional Mode.",
    accent: "#4ca3ff",
  },
  {
    key: "secuweb",
    name: "SecuWeb",
    category: "SD-WAN",
    categoryShort: "SD-WAN",
    href: "/products/secuweb",
    status: "in-development" as ProductStatus,
    desc: "Dedicated SD-WAN for organisations joining many branches, plants and campuses.",
    accent: "#7bd9e8",
  },
  {
    key: "secudefend",
    name: "SecuDefend",
    category: "Intrusion Prevention",
    categoryShort: "IPS/IDS",
    href: "/products/secudefend",
    status: "in-development" as ProductStatus,
    desc: "Dedicated intrusion prevention for networks that need more inspection depth and scale.",
    accent: "#f27f8b",
  },
  {
    key: "grid",
    name: "GRID",
    category: "SIEM / SOAR",
    categoryShort: "SIEM/SOAR",
    href: "/products/grid",
    status: "in-development" as ProductStatus,
    desc: "Brings alerts from every SecuEdge device together and helps teams respond automatically.",
    accent: "#f0c060",
  },
  {
    key: "secuconnect",
    name: "SecuConnect",
    category: "VPN",
    categoryShort: "VPN",
    href: "/products/secuconnect",
    status: "on-roadmap" as ProductStatus,
    desc: "Dedicated VPN for large remote workforces and many branches.",
    accent: "#9db8ff",
  },
  {
    key: "watchtower",
    name: "Watchtower",
    category: "Network Monitoring",
    categoryShort: "NMS",
    href: "/products/watchtower",
    status: "on-roadmap" as ProductStatus,
    desc: "Health, topology and uptime for every device on the network.",
    accent: "#76d6ac",
  },
  {
    key: "muster",
    name: "Muster",
    category: "Log Analytics",
    categoryShort: "Log Analytics",
    href: "/products/muster",
    status: "on-roadmap" as ProductStatus,
    desc: "A searchable audit record of network activity, kept in India.",
    accent: "#c8a8f0",
  },
] as const;

/** Logos sourced from the current secuedge.com customer marquee.
 *  Only approved names are shown, grouped by industry (copy deck §1.5).
 *  "Government bodies" is not a customer and is removed. */
export type CustomerGroup =
  | "Government and agriculture"
  | "Healthcare"
  | "Colleges"
  | "Schools"
  | "Media"
  | "Hospitality and F&B"
  | "Manufacturing"
  | "Technology";

export const CUSTOMER_GROUPS: CustomerGroup[] = [
  "Government and agriculture",
  "Healthcare",
  "Colleges",
  "Schools",
  "Media",
  "Hospitality and F&B",
  "Manufacturing",
  "Technology",
];

export const CUSTOMERS: {
  name: string;
  sector: string;
  group: CustomerGroup;
  logo: string | null;
}[] = [
  { name: "Kisan Call Centre", sector: "Government and agriculture", group: "Government and agriculture", logo: null },
  { name: "Bombay Hospital", sector: "Healthcare", group: "Healthcare", logo: "/customers/bombay-hospital.png" },
  { name: "Shanti Devi GI Institute", sector: "Healthcare", group: "Healthcare", logo: "/customers/shanti-devi.png" },
  { name: "NDIM", sector: "College", group: "Colleges", logo: "/customers/ndim.png" },
  { name: "St. Bede’s College, Shimla", sector: "College", group: "Colleges", logo: null },
  { name: "The Shri Ram School", sector: "School", group: "Schools", logo: null },
  { name: "Lokmat", sector: "Media house", group: "Media", logo: "/customers/lokmat.png" },
  { name: "Chaayos", sector: "Hospitality and F&B", group: "Hospitality and F&B", logo: null },
  { name: "KNL Driveline", sector: "Manufacturing", group: "Manufacturing", logo: "/customers/knl-driveline.png" },
  { name: "Sain Packaging", sector: "Manufacturing", group: "Manufacturing", logo: "/customers/sain-packaging.png" },
  { name: "Solis Technology", sector: "Technology", group: "Technology", logo: "/customers/solis-technology.png" },
  { name: "Eleet Mindz", sector: "Technology", group: "Technology", logo: null },
  { name: "Natsav", sector: "Technology", group: "Technology", logo: "/customers/natsav.png" },
];

/** Quick Mode protection levels — the console labels (copy deck §1.4).
 *  Choosing a level sets all five security engines together. */
export const SECURITY_LEVELS = [
  {
    key: "strong",
    label: "Strong",
    recommended: true,
    blurb: "Full real-time protection. Inspects traffic in depth, blocks attacks automatically, quarantines infected files and blocks malware and phishing sites. The right choice for almost every office, school and clinic.",
    engines: { ids: "on", ips: "on", antivirus: "on", dns: "on", firewall: "strict" },
  },
  {
    key: "mild",
    label: "Mild",
    recommended: false,
    blurb: "Lighter protection for sites that need the fewest interruptions. Raises alerts on suspicious traffic, scans and blocks infected files and blocks known malware sites.",
    engines: { ids: "alerts", ips: "off", antivirus: "on", dns: "on", firewall: "basic" },
  },
  {
    key: "none",
    label: "No Protection",
    recommended: false,
    blurb: "Security engines off. For testing only; never use it on a live network.",
    engines: { ids: "off", ips: "off", antivirus: "off", dns: "off", firewall: "off" },
  },
] as const;

/** The one statistic the company approves for public use. */
export const MISCONFIG_STAT = {
  figure: "99%",
  line: "Gartner found that 99% of firewall breaches are caused by misconfiguration, not by flaws in the firewall itself.",
  short: "Gartner: 99% of firewall breaches are caused by misconfiguration.",
  source: "Source: Gartner.",
};

/** Support and coverage (copy deck §1.6) — approved lines, shown site-wide. */
export const SUPPORT = {
  line: "24/7 technical support from India-based engineers. Call 1800 123 0966. We respond within 24 hours.",
  phone: "1800 123 0966",
  phoneHref: "tel:+9118001230966",
  response: "Response within 24 hours",
  facts: ["24/7 support", "1800 123 0966", "Response within 24 hours", "Regular updates", "Quarterly security reviews"],
} as const;

export const COVERAGE = {
  line: "Available across India through national distributors, regional distributors and channel partners, with sales coverage in North, West, South and East India.",
  regions: ["North", "West", "South", "East"],
} as const;

export const HEADQUARTERS = "Gurugram, Haryana, India";

/** Professional Mode capability grid (deck slide 12). */
export const PRO_CAPABILITIES = [
  { title: "Firewall & NAT", desc: "Granular policy, per-interface scope." },
  { title: "VLAN segmentation", desc: "Isolate assets, contain blast radius." },
  { title: "Dynamic routing", desc: "OSPF / BGP for complex networks." },
  { title: "SD-WAN & VPN", desc: "Site-to-site, remote access, overlay." },
  { title: "Active IDPS engine", desc: "Real-time detection & prevention." },
  { title: "SNMP, diagnostics & CLI", desc: "Deep telemetry and a command line." },
];

export const INDUSTRIES = [
  { name: "Education", slug: "education" },
  { name: "Healthcare", slug: "healthcare" },
  { name: "Finance", slug: "finance" },
  { name: "Government", slug: "government" },
  { name: "Manufacturing", slug: "manufacturing" },
  { name: "Retail", slug: "retail" },
  { name: "Legal", slug: "legal" },
  { name: "Media", slug: "media" },
  { name: "Hospitality", slug: "hospitality" },
  { name: "Logistics", slug: "logistics" },
  { name: "Technology", slug: "technology" },
  { name: "Construction", slug: "construction" },
  { name: "Agriculture", slug: "agriculture" },
  { name: "Non-Profit", slug: "nonprofit" },
  { name: "Consulting", slug: "consulting" },
  { name: "Real Estate", slug: "real-estate" },
  { name: "Automotive", slug: "automotive" },
  { name: "Food & Beverage", slug: "food-beverage" },
  { name: "Sports & Fitness", slug: "sports-fitness" },
  { name: "Entertainment", slug: "entertainment" },
  { name: "Fashion & Beauty", slug: "fashion-beauty" },
];

export const STAT = {
  misconfig: "99%",
  misconfigSource: "Gartner",
};

