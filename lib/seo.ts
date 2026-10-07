import type { Metadata } from "next";
import { SITE } from "./site";

/**
 * Builds per-page metadata with a unique title, description, canonical URL,
 * and page-specific Open Graph / Twitter cards (with a share image).
 * Fixes the audit findings: site-wide duplicate titles, missing canonicals,
 * missing og:image, and the doubled "| SecuEdge | SecuEdge" title bug.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  ogImage = "/og/default.png",
  brand = SITE.product,
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  brand?: string;
}): Metadata {
  const url = new URL(path, SITE.url).toString();
  // Home keeps the bare brand title; inner pages get a single brand suffix.
  const fullTitle = path === "/" ? title : brand ? `${title} | ${brand}` : title;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: SITE.product }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      site: SITE.twitter,
      images: [ogImage],
    },
  };
}
