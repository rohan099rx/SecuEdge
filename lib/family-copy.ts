import { ECOSYSTEM_BY_SLUG } from "@/data/ecosystem";
import { STATUS_LABEL, type ProductStatus } from "@/lib/site";

/**
 * Front-page story for each portfolio family.
 *
 * Every sentence here is composed from copy that is already approved
 * elsewhere on the site:
 *   · the family's own summary                      (lib/site.ts)
 *   · its capability names                          (data/ecosystem.ts)
 *   · the standing line that SecuEdge Frontier already includes the
 *     capability and that the dedicated product is for organisations
 *     needing more scale or depth                  (EcosystemProductPage)
 *   · the availability wording used on product pages
 *     ("no launch date has been announced")        (EcosystemProductPage)
 *
 * No specifications, port counts, dates, customer names, outcomes or
 * telemetry numbers are introduced. The copy exists so each family on the
 * front page carries a real paragraph instead of a one-line caption.
 */
const FAMILY_STORY: Record<string, string> = {
  frontier:
    "Frontier is the family that is available today, and the one the rest of the portfolio builds on: firewall policy and NAT, IDS / IPS inspection, web and content filtering, VPN connectivity, routing and VLAN segmentation, multi-WAN failover, bandwidth management and the logs that hold it together — in one appliance. Quick Mode configures a correct baseline for teams without a security specialist; Professional Mode opens the full rule set. Hardware, firmware and software are engineered and quality-checked in India, data stays on Indian soil, and every feature comes on every model.",
  secuweb:
    "SecuWeb is the dedicated SD-WAN family for organisations joining many branches, plants and campuses: multi-line WAN joining, policy-driven paths and branch, plant and campus connectivity managed as one system rather than device by device. SecuEdge Frontier already includes this capability — SecuWeb is the product for networks that need more scale and depth. Designed under the same rules as the rest of the portfolio: engineered in India, data kept in India, and supported from India. It is being built on the same appliances and console as SecuEdge Frontier, so it arrives as part of the portfolio you already run.",
  secudefend:
    "SecuDefend is the dedicated intrusion-prevention family, for networks whose traffic needs more inspection depth and scale than an edge appliance should carry alone: deep inspection, high-capacity prevention and a dedicated inspection layer in the network. SecuEdge Frontier already includes intrusion prevention on every model — SecuDefend is the product for organisations where that inspection deserves its own layer. Engineered in India, with data kept in India and 24/7 India-based support. It is being built on the same appliances and console as SecuEdge Frontier, so it arrives as part of the portfolio you already run.",
  grid:
    "GRID is the dedicated SIEM / SOAR family. It is built to consolidate the alerts arriving from every SecuEdge device, correlate related events into one picture, and automate the response that follows — alert consolidation, event correlation and automated response. SecuEdge Frontier already reports what it sees; GRID is the product for organisations that want those events correlated across the whole estate. Engineered in India, data kept in India, and supported from India. It is being built on the same appliances and console as SecuEdge Frontier, so it arrives as part of the portfolio you already run.",
  watchtower:
    "Watchtower is the dedicated network-monitoring family: the health, topology and uptime picture of every device on the network — device health, topology visibility and uptime monitoring in one place. SecuEdge Frontier already reports its own activity; Watchtower is the product for organisations that want the whole estate watched, not only the edge. Engineered in India, with data kept in India and 24/7 India-based support. It is being built on the same appliances and console as SecuEdge Frontier, so it arrives as part of the portfolio you already run.",
  muster:
    "Muster is the dedicated log-analytics family: long-term log records, search and filtering, and audit-ready records kept in India — the evidence trail an audit asks for, collected from the devices you already run. SecuEdge Frontier already keeps its own records; Muster is the product for organisations that need searchable history held on Indian soil. Engineered in India, and supported from one toll-free line. It is being built on the same appliances and console as SecuEdge Frontier, so it arrives as part of the portfolio you already run.",
};

const AVAILABILITY: Record<ProductStatus, string> = {
  available: "Available now, with model specifications shared on request.",
  "in-development": "In development — no launch date has been announced.",
  "on-roadmap": "On the roadmap — no launch date has been announced.",
};

export type FamilyStory = {
  /** Short paragraph that follows the family's one-line summary. */
  body: string;
  /** Availability sentence, phrased like the product pages. */
  availability: string;
  /** Capability names, straight from the family's approved data. */
  capabilities: string[];
};

export function familyStory(key: string): FamilyStory | null {
  const product = ECOSYSTEM_BY_SLUG[key];
  const body = FAMILY_STORY[key];
  if (!product || !body) return null;
  return {
    body,
    availability: AVAILABILITY[product.status],
    capabilities: product.capabilities.map((c) => (typeof c === "string" ? c : c.name)),
  };
}

/** Status label, re-exported so the page needs one import. */
export const familyStatus = (key: string) => {
  const product = ECOSYSTEM_BY_SLUG[key];
  return product ? STATUS_LABEL[product.status] : "";
};
