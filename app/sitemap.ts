import type { MetadataRoute } from "next";
import { SITE, INDUSTRIES, SOLUTIONS_NAV, APPLIANCES } from "@/lib/site";
import { BLOG_POSTS } from "@/lib/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const staticRoutes = [
    "/",
    "/products",
    "/products/compare",
    "/products/recommend",
    "/products/frontier",
    "/products/frontier/custom",
    "/products/watchtower",
    "/products/secuweb",
    "/products/grid",
    "/products/secudefend",
    "/products/muster",
    "/platform",
    "/about",
    "/frontier",
    "/frontier/dual-mode",
    "/frontier/safe-environment",
    "/frontier/appliances",
    "/frontier/capabilities",
    "/solutions",
    "/compliance",
    "/assessment",
    "/get-started",
    "/why-secuedge",
    "/trust",
    "/customers",
    "/industries",
    "/resources",
    "/contact",
    "/legal/privacy",
    "/legal/dpdp",
    "/legal/terms",
  ];
  const modelRoutes = APPLIANCES.map((model) => `/products/frontier/${model.model.toLowerCase()}`);
  const solutionRoutes = SOLUTIONS_NAV.map((s) => `/solutions/${s.slug}`);
  const industryRoutes = INDUSTRIES.map((i) => `/industries/${i.slug}`);
  const blogRoutes = BLOG_POSTS.map((p) => `/resources/${p.slug}`);
  const now = new Date();

  return [...new Set([...staticRoutes, ...modelRoutes, ...solutionRoutes, ...industryRoutes, ...blogRoutes])].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
