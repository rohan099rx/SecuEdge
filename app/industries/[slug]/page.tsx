import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { INDUSTRIES } from "@/lib/site";
import { INDUSTRY_CONTENT } from "@/lib/content/industries";
import { DetailPage } from "@/components/templates/DetailPage";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = INDUSTRY_CONTENT[slug];
  if (!c) return {};
  return buildMetadata({
    title: c.metaTitle ?? `${slug} security`,
    description: c.metaDescription ?? "",
    path: `/industries/${slug}`,
  });
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = INDUSTRY_CONTENT[slug];
  const meta = INDUSTRIES.find((i) => i.slug === slug);
  if (!c || !meta) notFound();

  return (
    <DetailPage
      content={c}
      eyebrow={`Industries · ${meta.name}`}
      crumb={{ href: "/industries", label: "All industries" }}
      frontierContext={`Everything ${meta.name.toLowerCase()} teams need from a firewall`}
    />
  );
}
