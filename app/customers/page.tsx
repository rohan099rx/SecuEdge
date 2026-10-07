import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowDown, ArrowRight, Building2, HeartPulse, Landmark, Newspaper, School, Wrench } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { CUSTOMERS } from "@/lib/site";
import { Reveal, Stagger, Item } from "@/components/motion";
import "@/components/premium/premium.css";

export const metadata: Metadata = buildMetadata({
  title: "Customers",
  description: "Explore organizations featured in SecuEdge customer materials across manufacturing, healthcare, education, media and technology.",
  path: "/customers",
});

const sectors = [
  { label: "Manufacturing", icon: Wrench },
  { label: "Healthcare", icon: HeartPulse },
  { label: "Education", icon: School },
  { label: "Media", icon: Newspaper },
  { label: "Technology", icon: Building2 },
  { label: "Public sector", icon: Landmark },
];

const ENVIRONMENTS = [
  { sector: "Manufacturing", industryHref: "/industries/manufacturing", solutionHref: "/solutions/network-segmentation", title: "Plant and office networks", desc: "Segment operational and business traffic at the edge with clear policy zones." },
  { sector: "Healthcare", industryHref: "/industries/healthcare", solutionHref: "/solutions/iot-security", title: "Connected care environments", desc: "Protect clinical networks and connected devices with inspected, segmented paths." },
  { sector: "Education", industryHref: "/industries/education", solutionHref: "/solutions/network-security", title: "Campus connectivity", desc: "Keep students and staff connected with clear policy control and safe browsing." },
  { sector: "Media", industryHref: "/industries/media", solutionHref: "/solutions/branch-office", title: "Distributed newsroom networks", desc: "Secure branch and remote contributors with consistent edge controls." },
  { sector: "Technology", industryHref: "/industries/technology", solutionHref: "/solutions/secure-remote-access", title: "Engineering organizations", desc: "Secure remote access and segmented development environments." },
  { sector: "Public sector", industryHref: "/industries/government", solutionHref: "/solutions/enterprise", title: "Public infrastructure", desc: "Policy depth and visibility for compliance-sensitive environments." },
];

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
            <p className="premium-eyebrow mt-8">Customer organizations</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[1.0] tracking-[-0.035em] text-[#0B2239] md:text-6xl">Security for the networks people rely on.</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#30465C] md:text-lg">Organizations featured in SecuEdge materials work across manufacturing, healthcare, education, media and technology.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#organizations" className="premium-btn-primary">Meet the organizations <ArrowDown size={15} /></a>
              <Link href="/contact" className="premium-btn-ghost">Discuss your network <ArrowRight size={15} /></Link>
            </div>
          </Reveal>
          <Reveal className="mt-8">
            <div className="flex flex-wrap gap-2">
              {sectors.map(({ label, icon: Icon }) => (
                <span key={label} className="premium-chip"><Icon size={13} />{label}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="organizations" className="prem-navy border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Reveal>
            <p className="premium-eyebrow">SecuEdge customer materials</p>
            <h2 className="premium-section-title mt-4">Organizations across connected industries.</h2>
            <p className="premium-section-lead">These names and logos appear in SecuEdge customer materials. Contact us to discuss relevant deployments and references for your sector.</p>
          </Reveal>
          <Stagger className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3" gap={0.05}>
            {CUSTOMERS.map((customer) => (
              <Item key={customer.name}>
                <article className="premium-card flex h-full flex-col items-center p-6 text-center">
                  <div className="flex h-14 w-full items-center justify-center rounded-xl bg-[#FAF9F5] px-3">
                    {customer.logo ? (
                      <Image src={customer.logo} alt={`${customer.name} logo`} width={150} height={56} className="max-h-10 w-auto object-contain" loading="lazy" />
                    ) : (
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(11,34,57,0.14)] text-[#016FED]" aria-hidden><Landmark size={18} /></span>
                    )}
                  </div>
                  <strong className="mt-4 block text-sm font-bold text-[#0B2239]">{customer.name}</strong>
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-[#526274]">{customer.sector}</span>
                </article>
              </Item>
            ))}
          </Stagger>
          <Reveal>
            <p className="mt-6 max-w-3xl text-xs leading-relaxed text-[#526274]">Organization names are shown for identification. Logo use and references are subject to each organization&apos;s permissions. Named case studies and measured outcomes are not published here — ask about references relevant to your organization.</p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Reveal>
            <p className="premium-eyebrow">Built for demanding environments</p>
            <h2 className="premium-section-title mt-4">Where SecuEdge deploys.</h2>
            <p className="premium-section-lead">Six environment types drawn from the industries and solutions already in this site — explore the relevant pages for each.</p>
          </Reveal>
          <Stagger className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3" gap={0.05}>
            {ENVIRONMENTS.map((env) => (
              <Item key={env.sector}>
                <article className="premium-card flex h-full flex-col p-6">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#016FED]">{env.sector.toUpperCase()}</span>
                  <h3 className="mt-2 text-lg font-bold text-[#0B2239]">{env.title}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[#526274]">{env.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                    <Link href={env.industryHref} className="inline-flex items-center gap-1 text-[13px] font-bold text-[#016FED]">{env.sector} security <ArrowRight size={13} /></Link>
                    <Link href={env.solutionHref} className="inline-flex items-center gap-1 text-[13px] font-bold text-[#016FED]">Solution <ArrowRight size={13} /></Link>
                  </div>
                </article>
              </Item>
            ))}
          </Stagger>
          <Reveal className="mt-10">
            <div className="premium-card flex flex-col items-start gap-4 p-7 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <Building2 size={20} className="mt-0.5 shrink-0 text-[#016FED]" />
                <div>
                  <h3 className="text-lg font-bold text-[#0B2239]">Looking for a deployment story?</h3>
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
