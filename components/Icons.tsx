import type { SVGProps } from "react";

/**
 * SecuEdge icon system — consistent 24px stroke icons (1.8px, round caps),
 * used across cards sitewide. One style everywhere = enterprise consistency.
 * Usage: <Icon name="shield" className="h-6 w-6 text-brand-link" />
 */
export type IconName = keyof typeof PATHS;

const PATHS = {
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  "shield-check": (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  layers: (
    <>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
  scale: (
    <>
      <path d="M12 3v18" />
      <path d="M5 7l7-4 7 4" />
      <path d="M5 7l-3 7a3.5 3.5 0 0 0 7 0L6 7" />
      <path d="M19 7l-3 7a3.5 3.5 0 0 0 7 0l-3-7" />
    </>
  ),
  zap: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="5" cy="19" r="2.5" />
      <circle cx="19" cy="19" r="2.5" />
      <path d="M12 7.5V12m0 0l-5.5 5M12 12l5.5 5" />
    </>
  ),
  server: (
    <>
      <rect x="3" y="4" width="18" height="7" rx="1.5" />
      <rect x="3" y="13" width="18" height="7" rx="1.5" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </>
  ),
  headset: (
    <>
      <path d="M4 14v-3a8 8 0 0 1 16 0v3" />
      <rect x="2.5" y="14" width="4" height="6" rx="1.5" />
      <rect x="17.5" y="14" width="4" height="6" rx="1.5" />
      <path d="M19.5 20a3 3 0 0 1-3 2h-3" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 5a3.5 3.5 0 0 1 0 7" />
      <path d="M17.5 13.5a6.5 6.5 0 0 1 4 6.5" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M9 21v-4h6v4" />
      <path d="M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01M8 15h.01M16 15h.01" />
    </>
  ),
  filter: <path d="M3 5h18l-7 8v5.5l-4 2.5v-8L3 5z" />,
  wifi: (
    <>
      <path d="M2 8.5a15 15 0 0 1 20 0" />
      <path d="M5.5 12a10 10 0 0 1 13 0" />
      <path d="M9 15.5a5 5 0 0 1 6 0" />
      <path d="M12 19.5h.01" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </>
  ),
  document: (
    <>
      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7l-5-5z" />
      <path d="M14 2v5h5" />
      <path d="M9 13h6M9 17h6" />
    </>
  ),
  gauge: (
    <>
      <path d="M3.5 17.5a10 10 0 1 1 17 0" />
      <path d="M12 13l4-4" />
      <circle cx="12" cy="14" r="1.6" />
    </>
  ),
  route: (
    <>
      <circle cx="5" cy="6" r="2.5" />
      <circle cx="19" cy="18" r="2.5" />
      <path d="M7.5 6H15a3.5 3.5 0 0 1 0 7H9a3.5 3.5 0 0 0 0 7h7.5" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3l10 17H2L12 3z" />
      <path d="M12 10v4m0 3h.01" />
    </>
  ),
  heart: <path d="M12 21s-7.5-4.7-9.5-9A5.4 5.4 0 0 1 12 6.5 5.4 5.4 0 0 1 21.5 12c-2 4.3-9.5 9-9.5 9z" />,
  check: <path d="M20 6L9 17l-5-5" />,
  cart: (
    <>
      <circle cx="9" cy="20" r="1.6" />
      <circle cx="18" cy="20" r="1.6" />
      <path d="M2 3h3l2.5 12.5a1.5 1.5 0 0 0 1.5 1.2h8.5a1.5 1.5 0 0 0 1.5-1.2L21 8H6" />
    </>
  ),
  landmark: (
    <>
      <path d="M3 21h18M4 18h16M6 18v-7M10 18v-7M14 18v-7M18 18v-7" />
      <path d="M3 8l9-5 9 5H3z" />
    </>
  ),
  factory: (
    <>
      <path d="M2 21V9l6 4V9l6 4V4a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v17H2z" />
      <path d="M6 17h.01M11 17h.01M16 17h.01" />
    </>
  ),
  graduation: (
    <>
      <path d="M22 9L12 4 2 9l10 5 10-5z" />
      <path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" />
      <path d="M22 9v5" />
    </>
  ),
  india: (
    <>
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" />
      <circle cx="12" cy="12" r="4" />
    </>
  ),
  // ——— SecuEdge product console (Dual Mode menus) ———
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </>
  ),
  share: (
    <>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
    </>
  ),
  flame: <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z" />,
  antenna: (
    <>
      <path d="M12 11v11" />
      <path d="M8 22h8" />
      <path d="M9.5 8.5a3.5 3.5 0 0 1 5 0" />
      <path d="M6.8 5.8a7.3 7.3 0 0 1 10.4 0" />
      <circle cx="12" cy="7.5" r="1" />
    </>
  ),
  plug: (
    <>
      <path d="M12 22v-5" />
      <path d="M9 8V3M15 8V3" />
      <path d="M6 8h12v3a6 6 0 0 1-12 0V8z" />
    </>
  ),
  chart: <path d="M3 3v18h18M8 17v-5M13 17V9M18 17v-8" />,
  cpu: (
    <>
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
    </>
  ),
  terminal: (
    <>
      <path d="M4 17l6-6-6-6" />
      <path d="M12 19h8" />
    </>
  ),
  ban: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M5.6 5.6l12.8 12.8" />
    </>
  ),
} as const;

export function Icon({
  name,
  className = "h-6 w-6",
  ...rest
}: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}

/** Icon chip — the standard card icon treatment sitewide.
 *  When the parent card carries the `group` class, the chip fills
 *  brand-blue on hover — one consistent micro-interaction everywhere. */
export function IconChip({ name, tone = "blue" }: { name: IconName; tone?: "blue" | "onDark" }) {
  return (
    <span
      className={
        tone === "onDark"
          ? "flex h-11 w-11 items-center justify-center rounded-[10px] border border-white/15 bg-white/[0.06] text-[#3AA5FF]"
          : "flex h-11 w-11 items-center justify-center rounded-[10px] border border-hair bg-brand-blue/[0.06] text-brand-link transition-colors duration-200 group-hover:border-brand-blue group-hover:bg-brand-blue group-hover:text-white"
      }
    >
      <Icon name={name} className="h-[22px] w-[22px]" />
    </span>
  );
}

/** Keyword → icon matcher for restored content cards (no icon keys in data). */
export function iconFor(title: string): IconName {
  const t = title.toLowerCase();
  const rules: [RegExp, IconName][] = [
    [/educat|school|campus|college|student|learning/, "graduation"],
    [/government|public sector|municipal|civic/, "landmark"],
    [/manufactur|factory|industrial|production|plant|ot\//, "factory"],
    [/retail|store|commerce|pos|point[- ]of[- ]sale|shopping/, "cart"],
    [/financ|bank|broker|invest|payment|transaction/, "gauge"],
    [/media|broadcast|news/, "eye"],
    [/complian|regulat|audit|hipaa|pci|gdpr|iso|policy|legal|dpdp/, "document"],
    [/data|phi|record|storage|informa/, "database"],
    [/remote|vpn|wifi|wi-fi|wireless|access point/, "wifi"],
    [/access|auth|credential|password|lock|confidential|privacy|encrypt/, "lock"],
    [/segment|vlan|network|topolog|infrastructure|branch|site/, "network"],
    [/threat|ransom|malware|attack|breach|phish|risk|incident/, "alert"],
    [/monitor|visib|detect|log|report|insight|track|watch/, "eye"],
    [/speed|fast|rapid|deploy|instal|performance|latency|throughput/, "zap"],
    [/scal|grow|expand|size|capacity/, "scale"],
    [/support|team|expert|consult|service|human|respond/, "headset"],
    [/user|people|staff|student|patient|employee|customer/, "users"],
    [/uptime|availab|continuity|reliab|24\/7|always/, "clock"],
    [/device|iot|appliance|hardware|equipment|legacy|machine/, "server"],
    [/filter|block|category|content/, "filter"],
    [/protect|secur|defen|guard|shield|safe/, "shield-check"],
    [/india|sovereign|local|soil/, "globe"],
    [/care|health|wellbe|safeguard/, "heart"],
    [/simpl|easy|effortless|one[- ]click/, "check"],
  ];
  for (const [re, icon] of rules) if (re.test(t)) return icon;
  return "layers";
}
