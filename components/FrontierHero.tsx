import Link from "next/link";
import { FadeUp } from "@/components/motion";
import { ProductExperience } from "@/components/ProductExperienceClient";

/**
 * Frontier product hero (lives on /frontier): headline left, dark product
 * console with floating status chips right. Moved here from the homepage —
 * the homepage hero is now company-level (see components/Hero.tsx).
 */
export function FrontierHero() {
  return (
    <section className="frontier-hero-cinematic relative overflow-hidden">
      <div className="container-wide relative grid items-center gap-14 pb-16 pt-16 sm:pt-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:pb-24">
        {/* Left — headline */}
        <div>
          <FadeUp>
            <p className="eyebrow">SecuEdge Frontier · Next-generation firewall</p>
          </FadeUp>
          <FadeUp delay={0.06}>
            <h1 className="display-1 mt-5">
              Enterprise-grade firewalling,{" "}
              <span className="serif-accent text-brand-blue">made simple.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.12}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              India&rsquo;s homegrown next-generation firewall — powerful enough for the enterprise,
              simple enough to configure correctly the first time.
            </p>
          </FadeUp>
          <FadeUp delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/contact" className="btn-primary">Get a Demo</Link>
              <Link href="/frontier/dual-mode" className="btn-secondary">
                See Dual Mode
              </Link>
            </div>
          </FadeUp>
          <FadeUp delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center gap-x-2.5 gap-y-2 text-[13px] text-dim">
              {["Made in India", "ISO 27001:2022", "Common Criteria / NDPP", "DPDP-ready"].map(
                (t, i) => (
                  <span key={t} className="flex items-center gap-2.5">
                    {i > 0 ? <span className="h-1 w-1 rounded-full bg-[#CBD5E4]" aria-hidden /> : null}
                    {t}
                  </span>
                )
              )}
            </div>
          </FadeUp>
        </div>

        {/* Right — interactive Frontier hardware */}
        <FadeUp delay={0.15} y={32}>
          <div className="relative frontier-hero-cinematic__visual">
            <ProductExperience
              scale={1}
              camera={{ position: [0, 0.42, 5.4], target: [0, 0, 0], fov: 34 }}
              lighting={{ key: 2, rim: 1.3, ambient: 0.38 }}
            />
            {/* Floating chips — product-in-action */}
            <div className="absolute -left-6 -top-5 hidden items-center gap-2.5 rounded-xl border border-hair bg-white px-4 py-3 shadow-[0_8px_30px_-8px_rgba(11,27,51,0.25)] lg:flex">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-green opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-status-green" />
              </span>
              <div>
                <p className="text-[13px] font-semibold leading-tight text-ink">All engines active</p>
                <p className="text-[11px] leading-tight text-dim">IDS · IPS · AV · DNS · Firewall</p>
              </div>
            </div>
            <div className="absolute -bottom-5 -right-4 hidden items-center gap-2.5 rounded-xl border border-hair bg-white px-4 py-3 shadow-[0_8px_30px_-8px_rgba(11,27,51,0.25)] lg:flex">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="#0FA895" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <div>
                <p className="text-[13px] font-semibold leading-tight text-ink">Correct by default</p>
                <p className="text-[11px] leading-tight text-dim">Nothing left half-configured</p>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
