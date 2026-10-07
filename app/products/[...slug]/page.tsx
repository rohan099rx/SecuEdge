import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "@/components/ProductPage";
import { getProductPage, PRODUCT_PAGES } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";
import { ECOSYSTEM_BY_SLUG, ECOSYSTEM_PRODUCTS } from "@/data/ecosystem";
import { EcosystemProductPage } from "@/components/EcosystemProductPage";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return [
    { slug: ["frontier"] },
    { slug: ["frontier", "custom"] },
    ...PRODUCT_PAGES.map((product) => ({ slug: ["frontier", product.slug] })),
    ...ECOSYSTEM_PRODUCTS.filter((product) => product.slug !== "frontier").map((product) => ({ slug: [product.slug] })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const [family, model] = (await params).slug;
  if (model === "custom" && family === "frontier") return buildMetadata({ title: "Custom Frontier configuration", description: "Discuss a SecuEdge Frontier configuration tailored to your requirements.", path: "/products/frontier/custom", brand: "SecuEdge" });
  const product = model && family === "frontier" ? getProductPage(model) : undefined;
  const ecosystemProduct = model ? undefined : ECOSYSTEM_BY_SLUG[family];
  if (ecosystemProduct) return buildMetadata({ title: `${ecosystemProduct.name} — ${ecosystemProduct.category}`, description: ecosystemProduct.summary, path: `/products/${ecosystemProduct.slug}`, brand: `SecuEdge ${ecosystemProduct.name}` });
  if (!product) return {};

  return buildMetadata({
    title: `${product.displayName} — enterprise firewall`,
    description: `${product.displayName} is a ${product.formFactor.toLowerCase()} SecuEdge Frontier appliance for ${product.tier.toLowerCase()} deployments.`,
    path: `/products/frontier/${product.slug}`,
  });
}

export default async function ProductRoute({ params }: { params: Promise<{ slug: string[] }> }) {
  const [family, model] = (await params).slug;
  if (model === "custom" && family === "frontier") {
    return <div className="ecosystem-page"><section className="ecosystem-hero"><div className="foundation-container ecosystem-hero__inner"><div><p className="foundation-eyebrow">FRONTIER / CUSTOMER REQUIREMENTS</p><p className="ecosystem-category">CUSTOM CONFIGURATION</p><h1>Custom Frontier</h1><h2>Discuss the configuration your environment requires.</h2><p>Some deployments need requirements that do not map neatly to a standard Frontier model. Share your requirements with SecuEdge so the appropriate configuration can be discussed.</p><div className="ecosystem-actions"><Link className="foundation-button" href="/contact">Discuss your requirements <ArrowRight size={16}/></Link><Link className="ecosystem-text-link" href="/products/frontier">View available models</Link></div></div><div className="ecosystem-hero__mark" aria-hidden="true"><div><span>CUSTOM / FRONTIER</span><strong>C</strong><i/></div></div></div></section><section className="ecosystem-content"><div className="foundation-container"><div className="ecosystem-content__heading"><p className="foundation-eyebrow">CUSTOM FRONTIER / REQUIREMENTS → CONFIGURATION</p><h2>A separate path from the standard model lineup.</h2><p>Custom configuration is a customer-requirement discussion, not a numbered appliance or an availability status.</p></div></div></section></div>;
  }
  const product = model && family === "frontier" ? getProductPage(model) : undefined;
  const ecosystemProduct = model ? undefined : ECOSYSTEM_BY_SLUG[family];
  if (ecosystemProduct) return <EcosystemProductPage product={ecosystemProduct} />;
  if (!product) notFound();
  return <ProductPage product={product} />;
}
