import type { DetailContent } from "./types";
import networkSecurity from "./data/solution-network-security.json";
import threatPrevention from "./data/solution-threat-prevention.json";
import secureRemoteAccess from "./data/solution-secure-remote-access.json";
import branchOffice from "./data/solution-branch-office.json";
import enterprise from "./data/solution-enterprise.json";
import smb from "./data/solution-small-medium-business.json";
import iotSecurity from "./data/solution-iot-security.json";
import networkSegmentation from "./data/solution-network-segmentation.json";

/**
 * Solution pages restored from the previous secuedge.com (sanitized —
 * unverifiable stats/testimonials quarantined in docs/content-review/,
 * false borrowed claims removed).
 */
export const SOLUTION_CONTENT: Record<string, DetailContent> = {
  "network-security": networkSecurity as DetailContent,
  "threat-prevention": threatPrevention as DetailContent,
  "secure-remote-access": secureRemoteAccess as DetailContent,
  "branch-office": branchOffice as DetailContent,
  enterprise: enterprise as DetailContent,
  "small-medium-business": smb as DetailContent,
  "iot-security": iotSecurity as DetailContent,
  "network-segmentation": networkSegmentation as DetailContent,
};
