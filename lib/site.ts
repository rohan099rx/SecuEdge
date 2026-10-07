/**
 * Single source of truth for site-wide content & data.
 * All figures and claims here are drawn from the SecuEdge Customer Deck.
 * Keep claims true and substantiable (see docs/ for the redesign plan's
 * claims-governance note). Do NOT reintroduce the "70% of Fortune 100" line.
 */

export const SITE = {
  name: "SecuEdge",
  product: "SecuEdge Frontier",
  tagline: "Enterprise-grade firewalling, made simple.",
  description:
    "SecuEdge Frontier is India's homegrown next-generation firewall — powerful enough for the enterprise, simple enough to configure correctly the first time.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.secuedge.com",
  twitter: "@SecuEdge",
  email: "hello@secuedge.com",
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
      { label: "Compliance", href: "/compliance", desc: "PCI DSS, HIPAA, GDPR, ISO 27001" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Education", href: "/industries/education", desc: "Safe campuses, FERPA-aware controls" },
      { label: "Healthcare", href: "/industries/healthcare", desc: "HIPAA-ready, medical IoT protection" },
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

/** SE-series appliances. number = capacity tier; "P" = Professional, rack-mountable. */
export type Appliance = {
  model: string;
  formFactor: "Desktop" | "Rack-mount";
  tier: "Branch / small office" | "Mid-market" | "Enterprise" | "High-scale";
  // Specs intentionally left as null until the official spec sheet is provided.
  throughput: string | null;
  ports: string | null;
  recommendedUsers: string | null;
};

export const APPLIANCES: Appliance[] = [
  { model: "SE20",     formFactor: "Desktop",    tier: "Branch / small office", throughput: null, ports: null, recommendedUsers: null },
  { model: "SE50",     formFactor: "Desktop",    tier: "Branch / small office", throughput: null, ports: null, recommendedUsers: null },
  { model: "SE50P",    formFactor: "Rack-mount", tier: "Branch / small office", throughput: null, ports: null, recommendedUsers: null },
  { model: "SE100P",   formFactor: "Rack-mount", tier: "Mid-market",            throughput: null, ports: null, recommendedUsers: null },
  { model: "SE250P",   formFactor: "Rack-mount", tier: "Mid-market",            throughput: null, ports: null, recommendedUsers: null },
  { model: "SE500P",   formFactor: "Rack-mount", tier: "Enterprise",            throughput: null, ports: null, recommendedUsers: null },
  { model: "SE1000P",  formFactor: "Rack-mount", tier: "Enterprise",            throughput: null, ports: null, recommendedUsers: null },
  { model: "SE2500P",  formFactor: "Rack-mount", tier: "High-scale",            throughput: null, ports: null, recommendedUsers: null },
  { model: "SE5000P",  formFactor: "Rack-mount", tier: "High-scale",            throughput: null, ports: null, recommendedUsers: null },
  { model: "SE10000P", formFactor: "Rack-mount", tier: "High-scale",            throughput: null, ports: null, recommendedUsers: null },
  { model: "SE15000P", formFactor: "Rack-mount", tier: "High-scale",            throughput: null, ports: null, recommendedUsers: null },
];

export const SECUEDGE_PRODUCTS = [
  {
    key: 'frontier',
    name: 'Frontier',
    category: 'Next-Generation Firewall',
    categoryShort: 'NGFW',
    href: '/products/frontier',
    desc: 'Next-generation firewall platform with Dual Mode — Quick Mode for everyday operations, Professional Mode for network engineers.',
    accent: '#4ca3ff',
  },
  {
    key: 'watchtower',
    name: 'Watchtower',
    category: 'Network Monitoring System',
    categoryShort: 'NMS',
    href: '/products/watchtower',
    desc: 'Unified network monitoring system for real-time infrastructure visibility, device health and network event management.',
    accent: '#76d6ac',
  },
  {
    key: 'secuweb',
    name: 'SecuWeb',
    category: 'SD-WAN',
    categoryShort: 'SD-WAN',
    href: '/products/secuweb',
    desc: 'Software-defined WAN for connecting branches, cloud environments and data centers over secure, policy-driven network paths.',
    accent: '#7bd9e8',
  },
  {
    key: 'grid',
    name: 'Grid',
    category: 'SIEM / SOAR',
    categoryShort: 'SIEM/SOAR',
    href: '/products/grid',
    desc: 'Security information and event management platform with orchestrated response capabilities for security operations.',
    accent: '#f0c060',
  },
  {
    key: 'secudefend',
    name: 'SecuDefend',
    category: 'IPS / IDS',
    categoryShort: 'IPS/IDS',
    href: '/products/secudefend',
    desc: 'Intrusion prevention and detection system for real-time threat interception across network perimeters and internal segments.',
    accent: '#f27f8b',
  },
  {
    key: 'muster',
    name: 'Muster',
    category: 'Log Analyzer',
    categoryShort: 'Log Analyzer',
    href: '/products/muster',
    desc: 'Centralized log collection, analysis and search platform for operational visibility and security event investigation.',
    accent: '#c8a8f0',
  },
] as const;

export const CERTIFICATIONS = [
  { name: "ISO 27001:2022", note: "Information security" },
  { name: "Common Criteria / NDPP", note: "IaSALab evaluated" },
  { name: "ISO 9001:2015", note: "Quality management" },
  { name: "ISO 14001:2015", note: "Environmental management" },
  { name: "ISO 45001:2018", note: "Occupational H&S" },
  { name: "FCC Part 15B · CE", note: "Emissions & safety" },
];

/** Logos sourced from the current secuedge.com customer marquee. */
export const CUSTOMERS = [
  { name: "KNL Driveline", sector: "Manufacturing", logo: "/customers/knl-driveline.png" },
  { name: "Sain Packaging", sector: "Manufacturing", logo: "/customers/sain-packaging.png" },
  { name: "NDIM", sector: "Recognised college", logo: "/customers/ndim.png" },
  { name: "Lokmat", sector: "Media house", logo: "/customers/lokmat.png" },
  { name: "Bombay Hospital", sector: "Healthcare", logo: "/customers/bombay-hospital.png" },
  { name: "Shanti Devi GI Institute", sector: "Healthcare", logo: "/customers/shanti-devi.png" },
  { name: "Natsav", sector: "Technology", logo: "/customers/natsav.png" },
  { name: "Solis Technology", sector: "Technology", logo: "/customers/solis-technology.png" },
  { name: "Government bodies", sector: "Public sector", logo: null },
] as const;

/** Quick Mode one-click protection levels (deck slide 08). */
export const SECURITY_LEVELS = [
  {
    key: "transparent",
    label: "Transparent",
    blurb: "Zero policies applied. All traffic passes freely — for testing only, never in production.",
    engines: { ids: "off", ips: "off", antivirus: "off", dns: "off", firewall: "off" },
  },
  {
    key: "balanced",
    label: "Balanced",
    blurb: "Detects threats and logs them. Antivirus active. IPS stays off to keep false positives minimal.",
    engines: { ids: "alerts", ips: "off", antivirus: "on", dns: "on", firewall: "basic" },
  },
  {
    key: "maximum",
    label: "Maximum",
    blurb: "Full enforcement. Every threat is detected and blocked in real time. Recommended for offices.",
    engines: { ids: "on", ips: "on", antivirus: "on", dns: "on", firewall: "strict" },
  },
] as const;

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
  misconfig: "up to 99%",
  misconfigSource: "Gartner",
  categories: "12",
  urls: "12.1M",
};

/** Real-world incidents (deck slide 03) — the "even giants fall" proof. */
export const INCIDENTS = [
  {
    source: "Cybersecurity Wire",
    date: "Jan 2025",
    tag: "Exposed",
    headline: "15,000 firewalls exposed in a mass configuration leak",
    detail: "Configurations and VPN credentials for thousands of devices were dumped online.",
    impact: "15,000+ devices exposed",
  },
  {
    source: "National Health Desk",
    date: "Nov 2022",
    tag: "Disrupted",
    headline: "Ransomware halts a top hospital for days",
    detail: "A flat, unsegmented network brought critical-care systems to a standstill.",
    impact: "Critical care halted for days",
  },
  {
    source: "Finance Daily",
    date: "2025",
    tag: "Breached",
    headline: "Broker breach exposes millions of investors",
    detail: "Weak access controls left sensitive customer records wide open.",
    impact: "Millions of records exposed",
  },
] as const;

/** Category-blocking database (deck slide 09). */
export const CATEGORIES = [
  { name: "Adware & Malware", tier: "Critical", urls: "2.4M", desc: "Malicious domains, C2 servers & malware sites." },
  { name: "Safe Environment Filter", tier: "Critical", urls: "1.1M", desc: "Safe search + restricted mode on video." },
  { name: "Proxy & VPN", tier: "Critical", urls: "850K", desc: "Anonymous proxies, Tor nodes, commercial VPNs." },
  { name: "Adult Content", tier: "Policy", urls: "5.2M", desc: "Explicit & mature content across web + streaming." },
  { name: "Gambling", tier: "Policy", urls: "320K", desc: "Online gambling, betting & lottery sites." },
  { name: "Social Media", tier: "Productivity", urls: "80K", desc: "Facebook, X, Instagram & web messengers." },
] as const;
