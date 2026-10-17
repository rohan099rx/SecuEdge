import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowDown, ArrowRight, Building2 } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { CUSTOMERS, CUSTOMER_GROUPS } from "@/lib/site";
import { Reveal, Stagger, Item } from "@/components/motion";
import { CustomerMarquee } from "@/components/CustomerMarquee";
import "@/components/premium/premium.css";

export const metadata: Metadata = buildMetadata({
  title: "Customers",
  description: "SecuEdge Frontier protects 200+ installations across government, education, healthcare, manufacturing, media, hospitality and technology.",
  path: "/customers",
});

const GROUP_LINES: Record<string, string> = {
  "Government and agriculture": "Made in India, with data kept in India.",
  "Healthcare": "Separate clinical networks, protected patient data.",
  "Colleges": "Safe student Wi-Fi with separate admin and lab networks.",
  "Schools": "Safer networks for every student.",
  "Media": "Failover and bandwidth priority for deadline-driven newsrooms.",
  "Hospitality and F&B": "Protected billing with safe guest Wi-Fi.",
  "Manufacturing": "Separate machine and office networks.",
  "Technology": "VPN for hybrid teams with separate dev and production networks.",
};

export default function CustomersPage() {
  return (
    <div className="premium">
      <section className="relative overflow-hidden">
        <div className="premium-grid-bg absolute inset-0" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-6 py-16 md:py-24">
          <Reveal>
            <nav className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#526274]" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-[#016FED]">Home</Link>
              <span aria-hidden>/</span>
              <span className="text-[#0B2239]">Customers</span>
            </nav>
            <p className="premium-eyebrow mt-8">Customers</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[1.0] tracking-[-0.035em] text-[#0B2239] md:text-6xl">200+ installations across India.</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#30465C] md:text-lg">From government and colleges, which vet vendors hardest, to hospitals, factories, newsrooms and cafés, organisations across India trust SecuEdge Frontier at their network edge.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#organizations" className="premium-btn-primary">Meet the organizations <ArrowDown size={15} /></a>
              <Link href="/contact" className="premium-btn-ghost">Book a free demo <ArrowRight size={15} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-[rgba(11,34,57,0.08)] py-8" aria-label="Customer logo strip">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <CustomerMarquee />
        </div>
      </section>

      <section id="organizations" className="prem-navy border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Reveal>
            <p className="premium-eyebrow">SecuEdge customers</p>
            <h2 className="premium-section-title mt-4">Organizations across connected industries.</h2>
            <p className="premium-section-lead">Approved customer names, grouped by industry. Contact us to discuss relevant deployments and references for your sector.</p>
          </Reveal>
          <div className="mt-8 space-y-8">
            {CUSTOMER_GROUPS.map((group) => (
              <div key={group}>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#526274]">{group}</p>
                <p className="mt-1 text-[13px] text-[#526274]">{GROUP_LINES[group]}</p>
                <Stagger className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3" gap={0.07}>
                  {CUSTOMERS.filter((c) => c.group === group).map((customer) => (
                    <Item key={customer.name}>
                      <article className="premium-card customer-card flex h-full flex-col items-center p-6 text-center">
                        {customer.logo ? (
                          <div className="flex h-14 w-full items-center justify-center rounded-xl bg-[#F1F6FD] px-3">
                            <Image src={customer.logo} alt={`${customer.name} logo`} width={150} height={56} className="customer-logo max-h-10 w-auto object-contain" loading="lazy" />
                          </div>
                        ) : null}
                        <strong className="mt-4 block text-sm font-bold text-[#0B2239]">{customer.name}</strong>
                        <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-[#526274]">{customer.sector}</span>
                      </article>
                    </Item>
                  ))}
                </Stagger>
              </div>
            ))}
          </div>
          <Reveal>
            <p className="mt-6 max-w-3xl text-xs leading-relaxed text-[#526274]">Organization names are shown for identification. Logo use and references are subject to each organization&apos;s permissions. Case studies with measured outcomes are being written — until they are ready, ask about references relevant to your organization.</p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Reveal className="mt-2">
            <div className="premium-card flex flex-col items-start gap-4 p-7 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <Building2 size={20} className="mt-0.5 shrink-0 text-[#016FED]" />
                <div>
                  <h3 className="text-lg font-bold text-[#0B2239]">Want to speak to a customer in your industry?</h3>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-[#526274]">Contact SecuEdge to ask about references and information relevant to your organization.</p>
                </div>
              </div>
              <Link href="/contact" className="premium-btn-primary shrink-0">Talk to our team <ArrowRight size={15} /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
