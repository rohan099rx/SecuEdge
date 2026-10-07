"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, Landmark } from "lucide-react";
import { APPLIANCES, CUSTOMERS, SECUEDGE_PRODUCTS } from "@/lib/site";
import { Reveal, Stagger, Item } from "@/components/motion";

/**
 * Verified-only customer showcase.
 * Names, sectors and logos come from lib/site.ts CUSTOMERS (customer deck).
 * No deployment outcomes, user counts, uptime figures or testimonials —
 * none of those are verified. Counts are derived from data, not hardcoded.
 */
const SECTORS = ["Manufacturing", "Healthcare", "Education", "Media", "Technology", "Public sector"] as const;

export function CustomerShowcase() {
  return (
    <div>
      <Reveal>
        <p className="premium-eyebrow">Customers</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-[3.4rem]">
          Deployed where networks matter.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
          Organizations featured in SecuEdge materials across {SECTORS.length} industry verticals.
          References and deployment details are shared directly — talk to our team.
        </p>
      </Reveal>

      <Stagger className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3" gap={0.05}>
        {CUSTOMERS.map((customer) => (
          <Item key={customer.name}>
            <article className="premium-card flex h-full flex-col items-center p-6 text-center">
              <div className="flex h-14 w-full items-center justify-center rounded-xl bg-white/[0.04] px-3">
                {customer.logo ? (
                  <Image
                    src={customer.logo}
                    alt={`${customer.name} logo`}
                    width={150}
                    height={56}
                    className="max-h-10 w-auto object-contain brightness-0 invert opacity-80"
                    loading="lazy"
                  />
                ) : (
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-cyan-300" aria-hidden>
                    <Landmark size={18} />
                  </span>
                )}
              </div>
              <strong className="mt-4 block text-sm font-semibold text-white">{customer.name}</strong>
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">{customer.sector}</span>
            </article>
          </Item>
        ))}
      </Stagger>

      <Stagger className="mt-6 grid grid-cols-3 gap-3" gap={0.04}>
        {[
          { value: String(CUSTOMERS.length), label: "Organizations featured", detail: `${SECTORS.length} industry verticals` },
          { value: String(APPLIANCES.length), label: "Frontier models", detail: "Desktop · Rack-mount" },
          { value: String(SECUEDGE_PRODUCTS.length), label: "Product families", detail: "One portfolio" },
        ].map((m) => (
          <Item key={m.label}>
            <div className="premium-metric">
              <span className="premium-metric-value">{m.value}</span>
              <span className="premium-metric-label">{m.label}</span>
              <span className="premium-metric-detail">{m.detail}</span>
            </div>
          </Item>
        ))}
      </Stagger>

      <Reveal className="mt-8">
        <div className="premium-card flex flex-col items-center gap-5 p-8 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="premium-eyebrow">References on request</p>
            <h3 className="mt-2 flex items-center justify-center gap-2 text-2xl font-bold text-white md:justify-start">
              <Building2 size={22} className="text-cyan-300" /> Ask about your sector.
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">
              Contact SecuEdge to discuss relevant deployments and references for your environment.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="premium-btn-primary">Contact Sales <ArrowRight size={15} /></Link>
            <Link href="/customers" className="premium-btn-ghost">All customers <ArrowRight size={15} /></Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
