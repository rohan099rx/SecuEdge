import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ChevronRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Reveal, Stagger, Item } from "@/components/motion";
import "@/components/premium/premium.css";

export const metadata: Metadata = buildMetadata({
  title: "SecuEdge Frontier capabilities — what it does for you",
  description:
    "Web and category blocking, intrusion prevention, gateway antivirus, VPN, SD-WAN, segmentation and more — every capability on every SecuEdge Frontier model.",
  path: "/frontier/capabilities",
});

/* Copy deck §9.1 — capabilities explained as benefits. */
const CAPABILITIES = [
  { title: "Web and category blocking", desc: "Stops staff or students reaching harmful, adult, gambling or time-wasting sites." },
  { title: "Intrusion prevention and detection", desc: "Spots and blocks attacks as they happen." },
  { title: "Gateway antivirus", desc: "Catches infected files before they reach a computer." },
  { title: "Deep packet inspection", desc: "Opens the envelope and checks what is inside, not just the address." },
  { title: "Application control", desc: "Decides which apps may use the network." },
  { title: "VPN", desc: "Safe connections for branches and staff working from home." },
  { title: "SD-WAN", desc: "Joins sites and internet lines intelligently." },
  { title: "Network segmentation (VLANs)", desc: "Separate networks for admin, guests, labs, medical devices or billing, so one infection cannot spread." },
  { title: "Captive portal", desc: "A login page for guest or student Wi-Fi, with a record of who used it." },
  { title: "Bandwidth management", desc: "Stops one person's downloads slowing everyone." },
  { title: "Multi-WAN failover", desc: "Switches to a backup internet line automatically." },
  { title: "High availability", desc: "A second unit takes over if the first fails." },
  { title: "Logs and reports", desc: "Blocked and accessed logs per device, exportable as audit evidence." },
  { title: "Threat intelligence and DDoS protection", desc: "Blocks known-bad sources and floods of traffic." },
  { title: "Routing, SNMP and CLI", desc: "Enterprise integration for engineers." },
];

export default function CapabilitiesPage() {
  return (
    <div className="premium">
      <div className="mx-auto w-full max-w-[1200px] px-6 pt-8">
        <nav className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500" aria-label="Breadcrumb">
          <Link href="/products" className="transition-colors hover:text-white">Products</Link>
          <ChevronRight size={12} />
          <Link href="/products/frontier" className="transition-colors hover:text-white">SecuEdge Frontier</Link>
          <ChevronRight size={12} />
          <span className="text-slate-300">Capabilities</span>
        </nav>
      </div>

      <section className="relative overflow-hidden">
        <div className="premium-grid-bg absolute inset-0" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-6 py-16 md:py-24">
          <Reveal>
            <p className="premium-eyebrow">What it does for you</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-[1.0] tracking-tight text-white md:text-6xl">One appliance, a complete edge toolkit.</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
              Every capability below ships on every SecuEdge Frontier model — Quick Mode for business
              owners, Professional Mode for engineers.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/frontier/dual-mode" className="premium-btn-primary">See Dual Mode <ArrowRight size={15} /></Link>
              <Link href="/contact" className="premium-btn-ghost">Book a free demo</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/[0.07] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Reveal>
            <p className="premium-eyebrow">Capability map</p>
            <h2 className="premium-section-title mt-4">What each feature does for you.</h2>
          </Reveal>
          <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
            {CAPABILITIES.map((c) => (
              <Item key={c.title}>
                <div className="premium-card h-full p-6">
                  <p className="text-base font-bold text-white">{c.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{c.desc}</p>
                </div>
              </Item>
            ))}
          </Stagger>
          <Reveal>
            <p className="mt-8 max-w-2xl rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-[13px] leading-relaxed text-slate-500">
              Capability behavior can vary with configuration and software version. Confirm deployment fit against the approved documentation.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="premium-btn-primary">Book a free demo <ArrowRight size={15} /></Link>
              <Link href="/platform" className="premium-btn-ghost">NGFW architecture</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
