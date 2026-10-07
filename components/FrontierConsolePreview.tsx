"use client";

import { useState } from "react";
import { Activity, ArrowDownToLine, ArrowUpRight, Bell, Cable, ChevronDown, CircleHelp, Clock3, Gauge, Globe2, LockKeyhole, Network, Search, Settings2, Shield, ShieldCheck, SlidersHorizontal, Users, Waypoints, Zap } from "lucide-react";

type Mode = "Quick" | "Professional";
type ConsoleItem = { label: string; group: string; icon: typeof Network; title: string; description: string; rows: Array<[string, string, string]> };

const quick: ConsoleItem[] = [
  { label: "Dashboard", group: "OVERVIEW", icon: Gauge, title: "Your network at a glance", description: "A simplified overview for everyday checks and common firewall tasks.", rows: [["Internet connection", "WAN 1 · Connected", "Ready"], ["Protection profile", "Balanced", "Enabled"], ["Quick Mode", "Everyday controls", "Selected"]] },
  { label: "Internet connections", group: "SETUP", icon: Cable, title: "Internet connections", description: "Review the connection status and primary link for this sample appliance view.", rows: [["Primary connection", "WAN 1", "Connected"], ["Secondary connection", "WAN 2", "Not configured"], ["Failover", "Available setting", "Review"]] },
  { label: "Web safety", group: "PROTECTION", icon: Globe2, title: "Web safety", description: "Plain-language controls for common web and content filtering tasks.", rows: [["Web filtering", "Policy overview", "Review"], ["Safe Environment Filter", "Status overview", "Review"], ["Schedule", "Business hours", "Example"]] },
  { label: "VPN access", group: "ACCESS", icon: LockKeyhole, title: "VPN access", description: "A simplified entry point for reviewing supported VPN workflows.", rows: [["Remote access", "Configuration area", "Open"], ["Site-to-site", "Configuration area", "Open"], ["Access policy", "Role-based review", "Review"]] },
  { label: "Devices & users", group: "ACCESS", icon: Users, title: "Devices & users", description: "Review user and device access areas before adjusting policy.", rows: [["User access", "Identity controls", "Review"], ["Network devices", "Connected inventory", "Example"], ["Guest access", "Policy area", "Review"]] },
];

const professional: ConsoleItem[] = [
  { label: "Dashboard", group: "OVERVIEW", icon: Gauge, title: "Firewall dashboard", description: "A sample operations overview with system and interface status panels.", rows: [["System", "Health summary", "Normal"], ["Interfaces", "Status overview", "Review"], ["Recent events", "Local event view", "Sample"]] },
  { label: "System", group: "CONFIGURATION", icon: Settings2, title: "System", description: "System configuration areas for administration and appliance maintenance.", rows: [["Hostname & time", "System identity", "Configure"], ["Administration", "Accounts and access", "Configure"], ["Updates & backup", "Maintenance", "Configure"]] },
  { label: "Users & devices", group: "CONFIGURATION", icon: Users, title: "Users & devices", description: "Review user and device context where available in the configured deployment.", rows: [["User access", "Identity controls", "Review"], ["Network devices", "Connected inventory", "Example"], ["Guest access", "Policy area", "Review"]] },
  { label: "Network", group: "CONFIGURATION", icon: Network, title: "Network interfaces", description: "Review interface and network-zone configuration areas.", rows: [["WAN interfaces", "Addressing and links", "Configure"], ["LAN interfaces", "Zones and addressing", "Configure"], ["VLANs", "Network segmentation", "Configure"]] },
  { label: "Dynamic routing", group: "CONFIGURATION", icon: Waypoints, title: "Dynamic routing", description: "Routing configuration entry point. Protocol and model support should be confirmed for the deployment.", rows: [["Routing protocols", "Availability varies by release", "Review"], ["Route policies", "Policy configuration", "Configure"], ["Routing table", "Route visibility", "Sample"]] },
  { label: "Firewall", group: "SECURITY", icon: Shield, title: "Firewall policies", description: "Review rule order, match conditions and policy actions in a sample firewall view.", rows: [["Allow trusted services", "LAN → approved destinations", "Enabled"], ["Block unsolicited inbound", "WAN → protected zones", "Enabled"], ["Review unused policies", "Policy hygiene", "Suggested"]] },
  { label: "VPN", group: "SECURITY", icon: LockKeyhole, title: "VPN", description: "Configuration areas for encrypted remote access and site-to-site connectivity.", rows: [["IPsec", "Tunnel configuration", "Configure"], ["OpenVPN", "Remote access area", "Configure"], ["VPN routes", "Access policy", "Review"]] },
  { label: "IDPS", group: "SECURITY", icon: ShieldCheck, title: "Intrusion detection & prevention", description: "Review IDPS policy areas, inspection posture and event handling.", rows: [["IDPS policy", "Inspection configuration", "Review"], ["Detection events", "Sample event view", "Example"], ["Exceptions", "Rule management", "Configure"]] },
  { label: "Diagnostics & CLI", group: "MONITORING", icon: Settings2, title: "Diagnostics & CLI", description: "Administrative tools for technical troubleshooting and configuration workflows.", rows: [["Diagnostics", "Troubleshooting area", "Open"], ["Command line", "Advanced controls", "Review"], ["Support bundle", "Export unavailable here", "Example"]] },
  { label: "VLANs", group: "NETWORK SERVICES", icon: Waypoints, title: "VLAN segmentation", description: "Configure network zones and segmentation policies for the deployment.", rows: [["Network zones", "Segmentation layout", "Configure"], ["VLAN policy", "Inter-zone controls", "Review"], ["Port assignment", "Model details on request", "Example"]] },
  { label: "Monitoring", group: "MONITORING", icon: Activity, title: "Monitoring & logs", description: "Review traffic, event and appliance monitoring views.", rows: [["Traffic overview", "Interface activity", "Sample"], ["Firewall events", "Local event area", "Sample"], ["System logs", "Operations view", "Sample"]] },
];

const groups = (mode: Mode) => {
  const items = mode === "Quick" ? quick : professional;
  return [...new Set(items.map((item) => item.group))].map((group) => ({ group, items: items.filter((item) => item.group === group) }));
};

export function FrontierConsolePreview() {
  const [mode, setMode] = useState<Mode>("Professional");
  const [active, setActive] = useState("Dashboard");
  const items = mode === "Quick" ? quick : professional;
  const item = items.find((entry) => entry.label === active) ?? items[0];

  function changeMode(next: Mode) {
    setMode(next);
    setActive("Dashboard");
  }

  return <section className="frontier-console" aria-label="Illustrative Frontier management console preview">
    <div className="frontier-console__topbar">
      <div className="frontier-console__brand"><span className="frontier-console__brandmark">S</span><strong>SecuEdge <b>Frontier</b></strong><span className="frontier-console__edition">APPLIANCE INTERFACE PREVIEW</span></div>
      <div className="frontier-console__top-actions"><span className="frontier-console__sample"><i /> SAMPLE INTERFACE</span><button type="button" aria-label="Help information" title="Illustrative preview only"><CircleHelp size={17}/></button></div>
    </div>
    <div className="frontier-console__workarea">
      <aside className="frontier-console__sidebar" aria-label={`${mode} Mode preview sections`}>
        {groups(mode).map(({group, items: groupItems}) => <section key={group}><h3>{group}</h3>{groupItems.map((entry) => { const Icon = entry.icon; return <button type="button" key={entry.label} className={entry.label === item.label ? "is-active" : ""} aria-current={entry.label === item.label ? "page" : undefined} onClick={() => setActive(entry.label)}><Icon size={16}/><span>{entry.label}</span>{entry.label !== "Dashboard" && <ChevronDown size={13} className="frontier-console__chevron"/>}</button>; })}</section>)}
      </aside>
      <div className="frontier-console__main">
        <div className="frontier-console__masthead"><div><span className="frontier-console__eyebrow">SECUREDGE FRONTIER / {mode.toUpperCase()} MODE</span><h3>{item.title}</h3><p>{item.description}</p></div><div className="frontier-console__mode" role="group" aria-label="Preview mode"><button type="button" aria-pressed={mode === "Quick"} onClick={() => changeMode("Quick")}><Zap size={14}/>Quick</button><button type="button" aria-pressed={mode === "Professional"} onClick={() => changeMode("Professional")}><SlidersHorizontal size={14}/>Professional</button></div></div>
        <div className="frontier-console__notice"><ShieldCheck size={16}/><span>This is a non-operational interface concept. Controls do not change an appliance.</span></div>
        <div className="frontier-console__cards"><article><span><Activity size={16}/> Firewall services</span><strong>Policy overview</strong><small>Sample interface</small></article><article><span><Network size={16}/> Network interfaces</span><strong>Status overview</strong><small>Sample interface</small></article><article><span><Bell size={16}/> Events & alerts</span><strong>Example only</strong><small>No live telemetry</small></article></div>
        <div className="frontier-console__table-wrap"><div className="frontier-console__table-head"><div><h4>{item.label === "Dashboard" ? "Quick links" : `${item.label} overview`}</h4><p>Representative labels · no appliance data</p></div><div className="frontier-console__table-actions"><button type="button" aria-label="Search sample list"><Search size={15}/></button><button type="button" aria-label="Export unavailable in preview" title="Exports are not available in this preview"><ArrowDownToLine size={15}/></button></div></div><div className="frontier-console__rows" role="table" aria-label={`${item.label} sample settings`}><div role="row" className="frontier-console__row frontier-console__row--header"><span>SETTING</span><span>DETAIL</span><span>STATUS</span></div>{item.rows.map(([name,value,status])=><div role="row" className="frontier-console__row" key={name}><strong>{name}</strong><span>{value}</span><em>{status}<ArrowUpRight size={12}/></em></div>)}</div></div>
        <p className="frontier-console__footnote">Concept UI based on public-facing Frontier feature areas. Exact menus and release behavior can vary by software version and enabled features.</p>
      </div>
    </div>
  </section>;
}
