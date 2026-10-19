"use client";

import { useState } from "react";
import {
  AlertTriangle, ArrowRight, Ban, BarChart3, Bell, Cable, CheckCircle2, ChevronDown,
  ChevronRight, CircleHelp, Clock, Gauge, Globe2, Info, LayoutDashboard, LockKeyhole, LogOut,
  Network, Plug, Radio, Search, Settings2, Shield, ShieldCheck, Shuffle, Split, Stethoscope,
  Users, Waypoints, Wifi, Wrench, X, XCircle,
} from "lucide-react";
import "./console.css";

/**
 * A faithful replica of the shipping SecuEdge Frontier console: the Quick /
 * Professional toggle, both navigation trees and the console's own palette.
 *
 * The menu structure, sub-items, badges and every figure shown here come from
 * the console itself (its component demo, v4.2). Nothing is live and nothing
 * is inferred: the frame is labelled a sample interface, and screens we have
 * not captured show the section's real menu names rather than invented
 * settings. See components/console.css for the palette and type scale.
 */

type Mode = "quick" | "professional";
type Screen = "dashboard" | "rules" | "form" | "ping" | "section";

type NavItem = {
  label: string;
  icon: typeof Network;
  /** Real sub-items, Professional mode. */
  children?: string[];
  /** Right-aligned marker, as the console shows it. */
  badge?: string;
  badgeKind?: "admin";
};

/* ── Quick mode: the shipping flat tile list ─────────────────────────────── */

const QUICK_TILES: Array<NavItem & { tone: string }> = [
  { label: "Dashboard", icon: LayoutDashboard, tone: "indigo" },
  { label: "WAN", icon: Globe2, tone: "orange" },
  { label: "LAN", icon: Network, tone: "green" },
  { label: "VPN", icon: LockKeyhole, tone: "blue" },
  { label: "Captive Portal", icon: Wifi, tone: "violet" },
  { label: "Load Balancing", icon: Shuffle, tone: "amber" },
  { label: "Category Blocking", icon: Ban, tone: "slate" },
  { label: "Security", icon: Shield, tone: "ink" },
  { label: "Bandwidth Management", icon: Gauge, tone: "teal" },
  { label: "Network Monitoring", icon: BarChart3, tone: "steel" },
];

/* ── Professional mode: the shipping grouped tree ────────────────────────── */

const PRO_TREE: Array<{ group: string; items: NavItem[] }> = [
  {
    group: "Overview",
    items: [{ label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    group: "Configuration",
    items: [
      {
        label: "System",
        icon: Settings2,
        children: ["General setup", "Advanced settings", "Management network", "High availability", "License management", "Software updates", "Setup wizard"],
      },
      { label: "Identity & access", icon: Users, children: ["User manager", "Certificates & CAs", "Authentication test"] },
      { label: "Interfaces", icon: Cable, children: ["Interface config", "Assignments & types"] },
      {
        label: "Network",
        icon: Split,
        children: ["Static routing", "Gateways", "Virtual IPs", "DHCP server (IPv4)", "DHCP server (IPv6)", "DHCP relay", "DNS resolver", "DNS enforcement", "Content filtering", "DNS forwarder", "Dynamic DNS", "IGMP proxy", "UPnP & NAT-PMP", "Wake on LAN"],
      },
      { label: "Dynamic routing", icon: Waypoints, children: ["Global / Zebra", "BGP", "OSPF (IPv4)", "OSPF6 (IPv6)", "RIP", "BFD", "FRR status"] },
    ],
  },
  {
    group: "Security",
    items: [
      { label: "Firewall", icon: Shield, children: ["Rules", "Security rules", "NAT", "Aliases", "Traffic shaper", "Captive portal"] },
      { label: "VPN", icon: LockKeyhole, children: ["OpenVPN", "L2TP", "Site-to-site", "SD-WAN"] },
      { label: "SecuDefend IPS", icon: ShieldCheck, badge: "Active" },
      { label: "SNMP", icon: Radio },
      { label: "NTP", icon: Clock },
      { label: "PPPoE server", icon: Plug },
    ],
  },
  {
    group: "Monitoring",
    items: [
      {
        label: "Status & logs",
        icon: BarChart3,
        children: ["System monitoring", "Sessions", "Interfaces", "Gateways", "Services", "System logs", "Firewall log", "DHCP leases (IPv4)", "DHCP leases (IPv6)", "IPsec tunnels", "OpenVPN sessions", "CARP / HA", "Captive portal", "Traffic graph", "Queues", "DNS resolver status", "Filter reload"],
      },
      {
        label: "Diagnostics & tools",
        icon: Stethoscope,
        children: ["Ping", "Traceroute", "DNS lookup", "Test port", "Packet capture", "ARP table", "NDP table", "Routing table", "Firewall states", "States summary", "Socket states", "pfTop", "pf info", "pf tables", "System activity", "SMART status", "Limiter info", "Command prompt", "Edit file", "Backup & restore", "Auto config backup", "Support bundle"],
      },
      { label: "Maintenance", icon: Wrench, children: ["Reboot system", "Factory reset"], badge: "Admin", badgeKind: "admin" },
    ],
  },
];

/* Quick tiles open plain-language pages. We have not captured those screens,
   so each tile shows the settings groups it covers — the names are the
   console's own, taken from the Professional tree. */
const QUICK_AREAS: Record<string, string[]> = {
  WAN: ["Interface config", "Gateways", "Static routing", "Virtual IPs", "DNS resolver"],
  LAN: ["Interface config", "Assignments & types", "DHCP server (IPv4)", "DHCP relay"],
  VPN: ["OpenVPN", "L2TP", "Site-to-site", "SD-WAN"],
  "Captive Portal": ["Captive portal", "Aliases", "Traffic shaper"],
  "Load Balancing": ["Gateways", "Static routing", "Virtual IPs"],
  "Category Blocking": ["Content filtering", "DNS enforcement", "Aliases"],
  Security: ["Rules", "Security rules", "NAT", "SecuDefend IPS", "Certificates & CAs"],
  "Bandwidth Management": ["Traffic shaper", "Limiter info", "Queues"],
  "Network Monitoring": ["Status & logs", "Traffic graph", "Gateways", "Sessions"],
};

/* ── Sample content, straight from the console's component demo ──────────── */

const STATS = [
  { label: "Active sessions", value: "1,284", note: "↑ 12% from yesterday", dir: "up" },
  { label: "Firewall rules", value: "47", note: "Last modified 2h ago", dir: "" },
  { label: "VPN tunnels", value: "8 / 10", note: "↑ 2 new today", dir: "up" },
  { label: "Threat blocks", value: "326", note: "↓ 5% from yesterday", dir: "down" },
] as const;

const ALERTS = [
  { tone: "info", icon: Info, title: "Software update available", body: "SecuEdge v4.3.1 is ready to install. No reboot required for this patch.", close: true },
  { tone: "success", icon: CheckCircle2, title: "Configuration saved", body: "Firewall rules have been applied and are now active.", close: false },
  { tone: "warning", icon: AlertTriangle, title: "Certificate expiring soon", body: "WAN certificate expires in 14 days. Renew before service disruption.", close: false },
  { tone: "danger", icon: XCircle, title: "WAN gateway unreachable", body: "Gateway 203.0.113.1 has not responded for 3 minutes. Failover activated.", close: true },
] as const;

const RULES: Array<{ state: string; dot: string; iface: string; src: string; dst: string; proto: string; action: string; actionDir: string }> = [
  { state: "Enabled", dot: "on", iface: "WAN", src: "any", dst: "203.0.113.10", proto: "TCP 443", action: "Pass", actionDir: "up" },
  { state: "Enabled", dot: "on", iface: "LAN", src: "192.168.1.0/24", dst: "any", proto: "any", action: "Pass", actionDir: "up" },
  { state: "Disabled", dot: "off", iface: "WAN", src: "any", dst: "any", proto: "TCP 23", action: "Block", actionDir: "down" },
  { state: "Enabled", dot: "on", iface: "DMZ", src: "10.10.0.0/16", dst: "10.10.1.50", proto: "UDP 53", action: "Pass", actionDir: "up" },
  { state: "Error", dot: "err", iface: "WAN", src: "any", dst: "any", proto: "ICMP", action: "Block", actionDir: "down" },
];

const HEADS: Record<Exclude<Screen, "section">, { title: string; subtitle: string; action: string }> = {
  dashboard: { title: "Dashboard", subtitle: "Sessions, policy, tunnels and threats for this appliance.", action: "Primary action" },
  rules: { title: "Firewall · Rules", subtitle: "Rules are evaluated in order, top to bottom. Addresses shown are documentation ranges.", action: "Add rule" },
  form: { title: "System · General setup", subtitle: "Identity, time keeping and update settings for this appliance.", action: "Primary action" },
  ping: { title: "Diagnostics & tools · Ping", subtitle: "Send test traffic from the appliance and read what comes back.", action: "Primary action" },
};

const SCREEN_OF: Record<string, Exclude<Screen, "section">> = {
  Dashboard: "dashboard",
  Firewall: "rules",
  System: "form",
  "Diagnostics & tools": "ping",
};

/* ── Component ───────────────────────────────────────────────────────────── */

export function FrontierConsolePreview() {
  const [mode, setMode] = useState<Mode>("professional");
  const [active, setActive] = useState("Dashboard");
  const [open, setOpen] = useState<string[]>([]);

  const tree = mode === "quick" ? QUICK_TILES : PRO_TREE.flatMap((entry) => entry.items);
  const item = tree.find((entry) => entry.label === active) ?? tree[0];
  const screen: Screen = mode === "quick" && !SCREEN_OF[item.label] ? "section" : SCREEN_OF[item.label] ?? "section";

  function changeMode(next: Mode) {
    setMode(next);
    setActive("Dashboard");
  }

  function select(label: string) {
    setActive(label);
    if (mode === "professional") {
      setOpen((current) => (current.includes(label) ? current.filter((entry) => entry !== label) : [...current, label]));
    }
  }

  const head = screen === "section"
    ? { title: item.label, subtitle: mode === "quick" ? "Settings groups in this area." : "Sections in this area.", action: "Primary action" }
    : HEADS[screen];

  return (
    <section className="se-console" aria-label="SecuEdge Frontier console preview — sample interface, not connected to an appliance">
      {/* Top bar */}
      <div className="se-console__topbar">
        <div className="se-console__crumbs">
          <span>{mode === "quick" ? "Quick mode" : "Overview"}</span>
          <ChevronRight size={13} />
          <span className="is-here">{item.label}</span>
          {mode === "quick" ? <span className="se-console__mode-tag">Quick</span> : null}
        </div>
        <div className="se-console__tools">
          <span className="se-console__search" aria-hidden>
            <Search size={15} />
            Search
          </span>
          <span className="se-console__icon-btn" aria-hidden>
            <Bell size={16} />
          </span>
          <span className="se-console__icon-btn" aria-hidden>
            <CircleHelp size={16} />
          </span>
          <span className="se-console__avatar">AD</span>
        </div>
      </div>

      <div className="se-console__body">
        {/* Sidebar */}
        <aside className="se-console__side">
          <div className="se-console__brand">
            <span className="se-console__mark">S</span>
            <div>
              <strong>SecuEdge</strong>
              <small>Frontier appliance</small>
            </div>
          </div>

          <div className="se-console__toggle" role="group" aria-label="Console mode">
            <button type="button" aria-pressed={mode === "quick"} onClick={() => changeMode("quick")}>
              Quick
            </button>
            <button type="button" aria-pressed={mode === "professional"} onClick={() => changeMode("professional")}>
              Professional
            </button>
          </div>

          <nav className="se-console__nav" aria-label={`${mode} mode sections`}>
            {mode === "quick"
              ? QUICK_TILES.map((tile) => {
                  const Icon = tile.icon;
                  return (
                    <button
                      type="button"
                      key={tile.label}
                      className="se-console__tile"
                      data-tone={tile.tone}
                      aria-current={tile.label === item.label ? "page" : undefined}
                      onClick={() => select(tile.label)}
                    >
                      <Icon size={16} />
                      <span>{tile.label}</span>
                    </button>
                  );
                })
              : PRO_TREE.map((entry) => (
                  <div className="se-console__group" key={entry.group}>
                    <h4>{entry.group}</h4>
                    {entry.items.map((navItem) => {
                      const Icon = navItem.icon;
                      const isOpen = open.includes(navItem.label);
                      return (
                        <div key={navItem.label}>
                          <button
                            type="button"
                            className="se-console__item"
                            aria-current={navItem.label === item.label ? "page" : undefined}
                            aria-expanded={navItem.children ? isOpen : undefined}
                            onClick={() => select(navItem.label)}
                          >
                            <Icon size={15} />
                            <span>{navItem.label}</span>
                            {navItem.badge ? (
                              <em className={`se-console__badge ${navItem.badgeKind === "admin" ? "se-console__badge--admin" : ""}`}>
                                {navItem.badge}
                              </em>
                            ) : null}
                            {navItem.children ? <ChevronDown size={13} className="se-console__chev" /> : null}
                          </button>
                          {navItem.children && isOpen ? (
                            <div className="se-console__sub">
                              {navItem.children.map((child) => (
                                <span key={child}>{child}</span>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                ))}
          </nav>

          <div className="se-console__side-foot">
            <span className="se-console__avatar">AD</span>
            <div>
              <strong>Administrator</strong>
              <small>SecuEdge v4.2</small>
            </div>
            <LogOut size={15} />
          </div>
        </aside>

        {/* Main */}
        <div className="se-console__main">
          <div className="se-console__pagehead">
            <div>
              <h3>{head.title}</h3>
              <p>{head.subtitle}</p>
            </div>
            <span className="se-console__btn se-console__btn--primary">
              {head.action} <ArrowRight size={13} />
            </span>
          </div>

          <p className="se-console__sample">
            <i aria-hidden />
            Sample interface · not connected to an appliance
          </p>

          {screen === "dashboard" ? <Dashboard /> : null}
          {screen === "rules" ? <Rules /> : null}
          {screen === "form" ? <GeneralSetup /> : null}
          {screen === "ping" ? <Ping /> : null}
          {screen === "section" ? <SectionList items={mode === "quick" ? QUICK_AREAS[item.label] ?? [] : item.children ?? []} /> : null}
        </div>
      </div>
    </section>
  );
}

/* ── Screens ─────────────────────────────────────────────────────────────── */

function Dashboard() {
  return (
    <>
      <div className="se-console__stats">
        {STATS.map((stat) => (
          <div className="se-console__stat" key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <small className={stat.dir}>{stat.note}</small>
          </div>
        ))}
      </div>

      <div className="se-console__panel">
        <div className="se-console__panel-head">
          Alerts &amp; notifications
          <span className="se-console__count">4 open</span>
        </div>
        {ALERTS.map((alert) => {
          const AlertIcon = alert.icon;
          return (
            <div className={`se-console__alert se-console__alert--${alert.tone}`} key={alert.title}>
              <AlertIcon size={16} />
              <div>
                <strong>{alert.title}</strong>
                <p>{alert.body}</p>
              </div>
              {alert.close ? (
                <span className="se-console__alert-x" aria-hidden>
                  <X size={14} />
                </span>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="se-console__panel">
        <div className="se-console__panel-head">
          Firewall rules
          <span className="se-console__count">Top of the list</span>
        </div>
        <RulesTable />
        <div className="se-console__pager">
          <span>Showing 1–5 of 47 entries</span>
          <div>
            <b className="is-on">1</b>
            <b>2</b>
          </div>
        </div>
      </div>
    </>
  );
}

function RulesTable() {
  return (
    <div className="se-console__scroll">
      <table className="se-console__table">
        <thead>
          <tr>
            <th>Actions</th>
            <th>State</th>
            <th>Interface</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Protocol</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {RULES.map((rule, index) => (
            <tr key={`${rule.iface}-${rule.proto}-${index}`}>
              <td>
                <span className="se-console__dot" data-tone={rule.dot} aria-hidden />
              </td>
              <td className={rule.dot === "on" ? "" : rule.dot === "off" ? "off" : "down"}>
                <span className={`se-console__check ${rule.dot === "on" ? "is-on" : ""}`} aria-hidden /> {rule.state}
              </td>
              <td className="se-console__mono">{rule.iface}</td>
              <td className="se-console__mono">{rule.src}</td>
              <td className="se-console__mono">{rule.dst}</td>
              <td className="se-console__mono">{rule.proto}</td>
              <td className={rule.actionDir}>{rule.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Rules() {
  return (
    <div className="se-console__panel">
      <div className="se-console__panel-head">
        Firewall rules
        <span className="se-console__count">Template 2 · list</span>
      </div>
      <div className="se-console__toolbar">
        <div className="se-console__toolbar-left">
          <span className="se-console__chip">Search rules…</span>
          <span className="se-console__chip">All interfaces</span>
        </div>
        <span className="se-console__chip">Export</span>
      </div>
      <RulesTable />
      <div className="se-console__pager">
        <span>Showing 1–25 of 47 entries</span>
        <div>
          <span>Rows: 25</span>
          <b className="is-on">1</b>
          <b>2</b>
        </div>
      </div>
    </div>
  );
}

function GeneralSetup() {
  return (
    <div className="se-console__panel">
      <div className="se-console__tabs">
        <span className="is-on">General</span>
        <span>Advanced</span>
        <span>Logging</span>
      </div>
      <div className="se-console__fields">
        <div className="se-console__field">
          <span>Hostname</span>
          <span className="se-console__input se-console__input--mono">secuedge-01</span>
        </div>
        <div className="se-console__field">
          <span>Domain</span>
          <span className="se-console__input se-console__input--mono">corp.local</span>
          <small>Fully qualified domain name of this appliance.</small>
        </div>
        <div className="se-console__field">
          <span>Primary DNS</span>
          <span className="se-console__input se-console__input--mono">8.8.8.8</span>
        </div>
        <div className="se-console__field">
          <span>Timezone</span>
          <span className="se-console__input">UTC</span>
        </div>
        <div className="se-console__field">
          <span>System version</span>
          <span className="se-console__input se-console__input--mono">4.2.1-RELEASE</span>
          <small>Read-only — set during installation.</small>
        </div>
        <div className="se-console__field">
          <span>Description</span>
          <span className="se-console__input">Primary edge security appliance for HQ.</span>
        </div>

        <div className="se-console__field se-console__field--wide">
          <span>Options</span>
          <div className="se-console__choices">
            <span className="se-console__choice">
              <i className="is-on" aria-hidden /> Enable HTTPS redirect
            </span>
            <span className="se-console__choice">
              <i className="is-on" aria-hidden /> Enable SSH access
            </span>
            <span className="se-console__choice">
              <i aria-hidden /> Auto-install security updates
            </span>
          </div>
        </div>

        <div className="se-console__field se-console__field--wide">
          <span>SecuDefend IPS mode</span>
          <div className="se-console__choices">
            <span className="se-console__choice">
              <i className="is-round" aria-hidden /> Detection only
            </span>
            <span className="se-console__choice">
              <i className="is-round is-on" aria-hidden /> Prevention (block)
            </span>
            <span className="se-console__choice">
              <i className="is-round" aria-hidden /> Disabled
            </span>
          </div>
        </div>

        <div className="se-console__field se-console__field--wide is-error">
          <span>Error field example</span>
          <span className="se-console__input se-console__input--mono">256.300.1.1</span>
          <small>Must be a valid IPv4 address.</small>
        </div>
      </div>
      <div className="se-console__unsaved">
        You have unsaved changes
        <div>
          <span className="se-console__btn se-console__btn--secondary">Cancel</span>
          <span className="se-console__btn se-console__btn--primary">Save changes</span>
        </div>
      </div>
    </div>
  );
}

function Ping() {
  return (
    <div className="se-console__panel">
      <div className="se-console__panel-head">
        Diagnostic tool · ping
        <span className="se-console__count">Template 5</span>
      </div>
      <div className="se-console__fields">
        <div className="se-console__field">
          <span>Target host</span>
          <span className="se-console__input se-console__input--mono">8.8.8.8</span>
        </div>
        <div className="se-console__field">
          <span>Count</span>
          <span className="se-console__input se-console__input--mono">5</span>
        </div>
      </div>
      <div className="se-console__actions">
        <span className="se-console__chip se-console__chip--primary">Run ping</span>
      </div>
      <pre className="se-console__term">Press Run ping to execute…</pre>
    </div>
  );
}

function SectionList({ items }: { items: string[] }) {
  if (!items.length) {
    return (
      <div className="se-console__panel">
        <div className="se-console__panel-head">Sections</div>
        <div className="se-console__list">
          <span>
            Settings for this section are shown on the appliance.
            <b>Live only</b>
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="se-console__panel">
      <div className="se-console__panel-head">
        Sections in this area
        <span className="se-console__count">{items.length} entries</span>
      </div>
      <div className="se-console__list">
        {items.map((entry) => (
          <span key={entry}>
            {entry}
            <b>Open</b>
          </span>
        ))}
      </div>
    </div>
  );
}
