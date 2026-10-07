import raw from "./data/home-sections.json";

/**
 * Homepage sections restored from the previous secuedge.com.
 * Copy adjustments from the original (claims governance):
 * - Support promise standardized to the deck's "response within 24 hours"
 *   (the old "under 15 minutes" claim is unverified).
 * - "worldwide" reach softened to India-first phrasing per the audit.
 */
export type Feature = { tab: string; title: string; desc: string };
export type WhyChoose = { title: string; desc: string };
export type BusinessSize = { name: string; desc: string; bullets: string[]; href: string };

export const FEATURE_TABS: string[] = Array.from(new Set(raw.features.map((f) => f.tab)));
export const FEATURES: Feature[] = raw.features;

export const WHY_CHOOSE: WhyChoose[] = raw.whyChoose.map((w) => {
  if (w.title === "Unparalleled Customer Support") {
    return {
      ...w,
      desc: "Dedicated technical experts who actually answer — with a response within 24 hours, and local teams who speak your language.",
    };
  }
  if (w.title === "Global Expertise") {
    return {
      title: "Local Expertise",
      desc: "Protecting organizations across India with local knowledge and international security standards.",
    };
  }
  return w;
});

const SIZE_LINKS: Record<string, string> = {
  "Small-Medium Business": "/solutions/small-medium-business",
  Enterprise: "/solutions/enterprise",
  "Branch Office": "/solutions/branch-office",
};

export const BUSINESS_SIZES: BusinessSize[] = raw.businessSizes.map((b) => ({
  ...b,
  href: SIZE_LINKS[b.name] ?? "/solutions",
}));

export const HOME_HEADINGS = raw.sectionHeadings;
