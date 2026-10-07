/** Shared shapes for content restored from the previous secuedge.com. */

export type TitledItem = { title: string; desc: string };
export type Faq = { q: string; a: string };
export type Stat = { label: string; value: string };
export type Application = { title: string; desc: string; benefits?: string[] };

export type DetailContent = {
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  hero?: { headline?: string; sub?: string };
  challenges?: TitledItem[];
  threats?: TitledItem[];
  approach?: TitledItem[];
  capabilities?: TitledItem[];
  applications?: Application[];
  compliance?: string[];
  process?: TitledItem[];
  stats?: Stat[];
  faqs?: Faq[];
  cta?: { headline?: string; sub?: string };
};
