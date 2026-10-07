import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { SOLUTIONS_NAV } from "@/lib/site";
import { SOLUTION_CONTENT } from "@/lib/content/solutions";
import { DetailPage } from "@/components/templates/DetailPage";

export function generateStaticParams() {
  return SOLUTIONS_NAV.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = SOLUTION_CONTENT[slug];
  if (!c) return {};
  return buildMetadata({
    title: c.metaTitle ?? `${slug} solutions`,
    description: c.metaDescription ?? "",
    path: `/solutions/${slug}`,
  });
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = SOLUTION_CONTENT[slug];
  const meta = SOLUTIONS_NAV.find((s) => s.slug === slug);
  if (!c || !meta) notFound();

  return (
    <DetailPage
      content={c}
      eyebrow={`Solutions · ${meta.name}`}
      crumb={{ href: "/solutions", label: "All solutions" }}
      frontierContext={`${meta.name} without the complexity`}
    />
  );
}
