import fs from "node:fs";
import path from "node:path";

/**
 * Blog posts restored from the old blogs.secuedge.com / site CMS.
 * Markdown files with frontmatter live in lib/content/blog-posts/.
 * Server-side only (fs) — import from server components.
 */
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  author: string;
  publishedAt: string;
  body: string;
};

const DIR = path.join(process.cwd(), "lib", "content", "blog-posts");

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (v.startsWith("[")) continue; // skip array fields (categories)
    if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
    meta[kv[1]] = v;
  }
  return { meta, body: raw.slice(m[0].length) };
}

export const BLOG_POSTS: BlogPost[] = fs
  .readdirSync(DIR)
  .filter((f) => f.endsWith(".md"))
  .map((f) => {
    const { meta, body } = parseFrontmatter(fs.readFileSync(path.join(DIR, f), "utf-8"));
    return {
      slug: meta.slug ?? f.replace(/\.md$/, ""),
      title: meta.title ?? f,
      excerpt: meta.excerpt ?? "",
      category: meta.category ?? "Security",
      readTime: meta.readTime ?? "",
      author: meta.author ?? "SecuEdge Team",
      publishedAt: meta.publishedAt ?? "",
      body,
    };
  })
  .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
