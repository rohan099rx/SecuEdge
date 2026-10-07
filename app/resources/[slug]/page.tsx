import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { buildMetadata } from "@/lib/seo";
import { BLOG_POSTS, getPost } from "@/lib/content/blog";
import { Reveal } from "@/components/motion";
import { PremiumCta } from "@/components/premium/PremiumSections";
import "@/components/premium/premium.css";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/resources/${slug}`,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: post.author },
    datePublished: post.publishedAt,
  };

  return (
    <div className="premium">
      <section className="relative overflow-hidden">
        <div className="premium-grid-bg absolute inset-0" aria-hidden />
        <div className="relative mx-auto w-full max-w-3xl px-6 pb-10 pt-24 sm:pt-32">
          <Reveal>
            <Link href="/resources" className="font-mono text-xs uppercase tracking-[0.14em] text-[#526274] transition hover:text-[#016FED]">
              ← All resources
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="premium-chip">{post.category}</span>
              <span className="text-xs text-[#526274]">{post.readTime}</span>
              <span className="text-xs text-[#526274]">· {post.author}</span>
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-[#0B2239] md:text-5xl">{post.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#30465C]">{post.excerpt}</p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[rgba(11,34,57,0.08)] py-14">
        <div className="mx-auto w-full max-w-3xl px-6">
          <article
            className="max-w-3xl
              [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-[#0B2239]
              [&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-[#0B2239]
              [&_p]:mt-4 [&_p]:leading-[1.75] [&_p]:text-[#30465C]
              [&_li]:mt-2 [&_li]:leading-relaxed [&_li]:text-[#30465C] [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6
              [&_strong]:font-bold [&_strong]:text-[#0B2239]
              [&_a]:font-semibold [&_a]:text-[#016FED] [&_a]:underline
              [&_blockquote]:mt-6 [&_blockquote]:rounded-xl [&_blockquote]:border [&_blockquote]:border-[rgba(11,34,57,0.12)] [&_blockquote]:bg-white [&_blockquote]:p-6 [&_blockquote]:text-[#30465C]"
          >
            <ReactMarkdown>{post.body}</ReactMarkdown>
          </article>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </div>
      </section>

      <PremiumCta
        headline="Protect your business before it's tested."
        sub="Talk to a SecuEdge expert or take the free security assessment."
      />
    </div>
  );
}
