import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/motion";
import "@/components/premium/premium.css";

export const metadata: Metadata = buildMetadata({
  title: "Get a demo",
  description:
    "Talk to the SecuEdge team about your network and explore the right Frontier configuration.",
  path: "/contact",
});

const PATHS = [
  { key: "deployment", title: "Discuss a deployment", desc: "Appliance sizing and rollout for your network.", href: "/frontier/appliances" },
  { key: "product", title: "Product information", desc: "Capabilities, modes and documentation.", href: "/products" },
  { key: "technical", title: "Technical question", desc: "Policy, architecture or compatibility.", href: "/platform" },
  { key: "partnership", title: "Partnership / business", desc: "Reselling, distribution or business inquiry.", href: "/about" },
] as const;

export default function ContactPage() {
  return (
    <div className="premium">
      <section className="relative overflow-hidden">
        <div className="premium-grid-bg absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid w-full max-w-[1200px] items-start gap-12 px-6 py-16 md:py-24 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <nav className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#526274]" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-[#016FED]">Home</Link>
              <span aria-hidden>/</span>
              <span className="text-[#0B2239]">Contact</span>
            </nav>
            <p className="premium-eyebrow mt-8">Let&apos;s talk</p>
            <h1 className="mt-4 text-5xl font-extrabold leading-[1.0] tracking-[-0.035em] text-[#0B2239] md:text-6xl">Talk to the SecuEdge team.</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#30465C] md:text-lg">
              Tell us about your network and what you are looking to protect. We&rsquo;ll help you
              explore the Frontier appliance family and its operating modes.
            </p>
            <ul className="mt-7 space-y-2.5">
              {[
                "Discuss appliance sizing and deployment",
                "Explore Quick and Professional operating modes",
                "Get product and configuration guidance",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm font-medium text-[#30465C]">
                  <Check size={16} className="mt-0.5 shrink-0 text-[#15803d]" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
            <div className="premium-panel mt-8 p-5" aria-label="A typical Frontier network security path">
              <p className="premium-panel-label">A clear path through your network</p>
              <ol className="mt-4 space-y-0">
                {[["01", "Internet"], ["02", "Frontier inspection"], ["03", "Protected network"]].map(([n, t], i, arr) => (
                  <li key={t} className={["flex items-center gap-3 py-2.5", i < arr.length - 1 && "border-b border-[rgba(11,34,57,0.08)]"].filter(Boolean).join(" ")}>
                    <span className="font-mono text-xs text-[#016FED]">{n}</span>
                    <strong className="text-sm font-bold text-[#0B2239]">{t}</strong>
                    {i === 1 && <span className="premium-badge premium-badge--live ml-auto">Secured</span>}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
          <Reveal>
            <ContactForm />
            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {PATHS.map((p) => (
                <Link key={p.key} href={p.href} className="premium-card group block p-4">
                  <strong className="block text-sm font-bold text-[#0B2239]">{p.title}</strong>
                  <span className="mt-0.5 block text-xs text-[#526274]">{p.desc}</span>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#016FED]">Open <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" /></span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
