import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Reveal } from "@/components/motion";
import { BLOG_POSTS } from "@/lib/content/blog";
import { ResourceBrowser } from "@/components/ResourceBrowser";
import { PremiumCta } from "@/components/premium/PremiumSections";
import "@/components/premium/premium.css";

export const metadata: Metadata = buildMetadata({
  title: "Resources — security guides & insights",
  description:
    "Practical firewall and network-security guidance from the SecuEdge team — for Indian businesses from startup to enterprise.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <div className="premium">
      <section className="relative overflow-hidden">
        <div className="premium-grid-bg absolute inset-0" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1200px] px-6 py-16 md:py-24">
          <Reveal>
            <p className="premium-eyebrow">Resources</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[1.0] tracking-[-0.035em] text-[#0B2239] md:text-6xl">Security, explained plainly.</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#30465C] md:text-lg">Guides and insights from the SecuEdge team — written for the people who run networks, not just the people who audit them.</p>
          </Reveal>
        </div>
      </section>

      <section className="prem-navy border-t border-[rgba(11,34,57,0.08)] py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Reveal>
            <div className="premium-card p-6 md:p-8"><ResourceBrowser posts={BLOG_POSTS} /></div>
            <p className="mt-8 text-sm text-[#526274]">
              More guides are on the way — case studies and the firewall buyer&rsquo;s guide are in
              production.
            </p>
          </Reveal>
        </div>
      </section>

      <PremiumCta />
    </div>
  );
}
