import Link from "next/link";
import { Icon, iconFor, type IconName } from "@/components/Icons";
import { Stagger, Item } from "@/components/motion";
import { TiltCard } from "@/components/TiltCard";
import { WHY_CHOOSE } from "@/lib/content/home";

/**
 * "Our advantage" — all six advantages, always visible, in a refined editorial
 * grid. Each card is an actionable link with pointer-reactive depth: a 3D tilt,
 * a brand spotlight that follows the cursor, a top-hairline that fills on hover,
 * and a reveal arrow. Luxury by restraint (design-spec §8: depth from real
 * shadows + content, never decorative effects); staggered entrance cascade.
 */

type Meta = { icon: IconName; proof: string; href: string };
const META: Record<string, Meta> = {
  "Unparalleled Customer Support": { icon: "headset", proof: "Response within 24 hours", href: "/contact" },
  "Rapid Deployment": { icon: "zap", proof: "Guided, streamlined setup", href: "/get-started" },
  "Comprehensive Protection": { icon: "shield-check", proof: "Deep packet inspection", href: "/frontier/capabilities" },
  "Continuous Improvement": { icon: "route", proof: "Regular threat updates", href: "/frontier" },
  "Personalized Service": { icon: "users", proof: "Tailored to your compliance", href: "/solutions" },
  "Local Expertise": { icon: "india", proof: "Built & supported in India", href: "/why-secuedge" },
};

const metaFor = (title: string): Meta =>
  META[title] ?? { icon: iconFor(title), proof: "SecuEdge advantage", href: "/why-secuedge" };

export function AdvantageGrid() {
  return (
    <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
      {WHY_CHOOSE.map((w, i) => {
        const m = metaFor(w.title);
        return (
          <Item key={w.title} className="h-full">
            <TiltCard max={5} sheenColor="rgba(1,111,237,0.12)" className="h-full rounded-2xl">
              <Link
                href={m.href}
                aria-label={`${w.title} — learn more`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-hair bg-white p-8 transition-[box-shadow,border-color] duration-300 ease-out hover:border-brand-blue/25 hover:shadow-[0_34px_64px_-30px_rgba(11,27,51,0.34)]"
              >
                {/* signature: a hairline across the top that fills brand on hover */}
                <span className="absolute inset-x-0 top-0 h-px bg-hair" aria-hidden />
                <span
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-brand-blue transition-transform duration-[600ms] ease-out group-hover:scale-x-100"
                  aria-hidden
                />

                {/* icon + oversized editorial index */}
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-blue/15 bg-brand-blue/[0.06] text-brand-link transition-colors duration-300 group-hover:border-brand-blue group-hover:bg-brand-blue group-hover:text-white">
                    <Icon name={m.icon} className="h-6 w-6" />
                  </span>
                  <span
                    className="text-[2.75rem] font-semibold leading-none tracking-tight text-[#DCE3EE] tabular transition-colors duration-300 group-hover:text-brand-blue/35"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-7 text-[1.35rem] font-semibold leading-snug tracking-tight text-ink">
                  {w.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-muted">{w.desc}</p>

                {/* footer: proof (left) + a reveal arrow (right) signalling the link */}
                <div className="mt-7 flex items-center justify-between border-t border-hair pt-4">
                  <span className="flex items-center gap-2.5 text-[13px] font-semibold text-brand-link">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-blue/10">
                      <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    {m.proof}
                  </span>
                  <span
                    className="flex h-8 w-8 shrink-0 -translate-x-1 items-center justify-center rounded-full border border-hair text-dim opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:border-brand-blue group-hover:bg-brand-blue group-hover:text-white group-hover:opacity-100"
                    aria-hidden
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            </TiltCard>
          </Item>
        );
      })}
    </Stagger>
  );
}
