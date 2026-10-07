import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ChevronRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { PRO_CAPABILITIES } from "@/lib/site";
import { Reveal, Stagger, Item } from "@/components/motion";
import "@/components/premium/premium.css";

export const metadata: Metadata = buildMetadata({
  title: "Professional Mode — full NGFW control",
  description:
    "Professional Mode gives engineers the full depth of an enterprise NGFW: granular firewall & NAT, VLAN segmentation, OSPF/BGP routing, SD-WAN & VPN, an active IDPS engine, SNMP and CLI.",
  path: "/frontier/capabilities",
});

export default function CapabilitiesPage() {
  return (
    <div className="premium">
      <div className="mx-auto w-full max-w-[1200px] px-6 pt-8">
        <nav className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500" aria-label="Breadcrumb">
          <Link href="/products" className="transition-colors hover:text-white">Products</Link>
          <ChevronRight size={12} />
          <Link href="/products/frontier" className="transition-colors hover:text-white">Frontier</Link>
          <ChevronRight size={12} />
          <span className="text-slate-300">Capabilities</span>
        </nav>
      </div>

      <section className="relative overflow-hidden">
        <div className="premium-grid-bg absolute inset-0" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-6 py-16 md:py-24">
          <Reveal>
            <p className="premium-eyebrow">The other half</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-[1.0] tracking-tight text-white md:text-6xl">Full control, when your engineers need it.</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
              Flip to Professional Mode for the complete enterprise NGFW feature set — on the same
              appliance, with the same hardware.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/frontier/dual-mode" className="premium-btn-primary">See Dual Mode <ArrowRight size={15} /></Link>
              <Link href="/contact" className="premium-btn-ghost">Get a Demo</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/[0.07] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Reveal>
            <p className="premium-eyebrow">Capability map · Professional Mode</p>
            <h2 className="premium-section-title mt-4">Six control areas. One toggle away.</h2>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] md:grid-cols-2 lg:grid-cols-3">
            {PRO_CAPABILITIES.map((c, i) => (
              <div key={c.title} className="bg-[#070d18] p-7">
                <div className="font-mono text-[10px] tracking-[0.2em] text-cyan-300/70">CAP·0{i + 1}</div>
                <p className="mt-2.5 text-lg font-bold text-white">{c.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{c.desc}</p>
              </div>
            ))}
          </div>
          <Reveal>
            <p className="mt-8 max-w-2xl rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-[13px] leading-relaxed text-slate-500">
              Capability behavior can vary with configuration and software version. Confirm deployment fit against the approved documentation.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="premium-btn-primary">Get a Demo <ArrowRight size={15} /></Link>
              <Link href="/platform" className="premium-btn-ghost">NGFW architecture</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
