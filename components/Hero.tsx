import Link from "next/link";
import { FadeUp } from "@/components/motion";
import { Icon, type IconName } from "@/components/Icons";
import { FirewallGatewayScene } from "@/components/FirewallGatewayScene";
import { PRODUCTS } from "@/lib/site";

/**
 * Company hero — leader-grade restraint (see cyber-hero research brief):
 * 6 elements. Badge → 6-word headline → one-sentence subhead → 2 CTAs →
 * ONE visual (an interactive policy demonstration) on a slow ambient backdrop → product rail
 * at the fold. One motion system; atmosphere is pointer-reactive but calm.
 */
const PRODUCT_ICONS: Record<string, IconName> = {
  frontier: "shield-check",
  watchtower: "eye",
  secuweb: "globe",
  grid: "layers",
  secudefend: "shield",
  muster: "server",
};

export function Hero() {
  return (
    <section className="relative flex flex-col overflow-hidden bg-bg-deep lg:min-h-[calc(100svh-100px)]">
      <div className="relative flex min-h-0 w-full flex-1 flex-col px-6 sm:px-10 xl:px-16 2xl:px-24">
          <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:py-8 xl:gap-24">
            {/* Left — one message */}
            <div>
              <FadeUp>
                <span className="inline-flex items-center gap-2 border-l-2 border-[#3AA5FF] pl-3">
                  <Icon name="shield-check" className="h-3.5 w-3.5 text-[#3AA5FF]" />
                  <span className="text-[13px] font-medium text-[#7db9ff]">
                    India&rsquo;s homegrown cybersecurity company
                  </span>
                </span>
              </FadeUp>
              <FadeUp delay={0.08}>
                <h1 className="mt-[clamp(1.1rem,2.4vh,2rem)] font-semibold tracking-[-0.028em] text-white [font-size:clamp(2.6rem,2.2vw+2.8vh,4.9rem)] [line-height:1.04]">
                  <span className="block">Secure Every</span>
                  <span className="serif-accent relative inline-block pb-1 text-[#8cc2ff]">
                    Edge.
                    <span
                      className="absolute bottom-0 left-0 h-px w-24 bg-[#3e8bff]"
                      aria-hidden
                    />
                  </span>
                </h1>
              </FadeUp>
              <FadeUp delay={0.16}>
                <p className="mt-[clamp(1rem,2.4vh,1.9rem)] max-w-xl text-[16px] leading-relaxed text-white/65 sm:text-lg">
                  SecuEdge provides intelligent network security, firewall protection, threat
                  detection, and centralized security management for every connection.
                </p>
              </FadeUp>
              <FadeUp delay={0.24}>
                <div className="mt-[clamp(1.5rem,3.4vh,2.75rem)] flex flex-wrap items-center gap-3">
                  <Link href="/frontier" className="btn-primary !px-7 !py-3.5 text-[15px]">
                    Explore SecuEdge
                  </Link>
                  <Link href="/frontier/capabilities" className="btn-on-dark !px-7 !py-3.5 text-[15px]">
                    View Technology
                  </Link>
                </div>
              </FadeUp>
            </div>

            {/* Right — the one visual */}
            <FadeUp delay={0.18} y={24}>
              <FirewallGatewayScene />
            </FadeUp>
          </div>
      </div>

      {/* Product family rail — quiet trust strip at the fold */}
      <FadeUp delay={0.32}>
        <div className="relative border-t border-white/10 bg-white/[0.03] backdrop-blur-sm">
          <div className="grid divide-y divide-white/10 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-10 xl:px-16 2xl:px-24">
            {PRODUCTS.map((p) => (
                <Link
                  key={p.key}
                  href={p.href!}
                  className="group flex items-center gap-3 py-3.5 pr-4 transition hover:bg-white/[0.04] sm:pl-8 sm:first:pl-0"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] border border-[#3AA5FF]/40 bg-[#016FED]/15 text-[#3AA5FF]">
                    <Icon name={PRODUCT_ICONS[p.key]} className="h-[18px] w-[18px]" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{p.fullName}</span>
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#35d399] opacity-60" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#35d399]" />
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#35d399]">
                        Available
                      </span>
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-white/50">
                      {p.category} · <span className="text-[#7db9ff] group-hover:underline">Explore ›</span>
                    </span>
                  </span>
                </Link>
            ))}
          </div>
        </div>
      </FadeUp>
      <a className="hero-scroll-indicator" href="#main" aria-label="Scroll to explore SecuEdge">
        <span>Scroll to explore</span><i />
      </a>
    </section>
  );
}
