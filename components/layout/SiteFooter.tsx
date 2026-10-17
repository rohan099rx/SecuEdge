import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { SITE, SUPPORT, HEADQUARTERS, SECUEDGE_PRODUCTS, STATUS_LABEL, SOLUTIONS_NAV } from "@/lib/site";

type FooterLink = { label: string; href: string; external?: boolean; meta?: string };

/* Mirrors the navbar menus exactly: all 7 products with status labels,
   all 8 solutions, the 8 priority industries, all 5 resource entries. */
const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Products",
    links: [
      ...SECUEDGE_PRODUCTS.map((p) => ({
        label: p.name,
        href: p.href,
        meta: STATUS_LABEL[p.status],
      })),
      { label: "Find your model", href: "/products/recommend" },
      { label: "Compare models", href: "/products/compare" },
      { label: "All Products", href: "/products" },
    ],
  },
  {
    title: "Solutions",
    links: SOLUTIONS_NAV.map((s) => ({ label: s.name, href: `/solutions/${s.slug}` })),
  },
  {
    title: "Industries",
    links: [
      { label: "Education", href: "/industries/education" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Government", href: "/industries/government" },
      { label: "Banking and finance", href: "/industries/finance" },
      { label: "Manufacturing", href: "/industries/manufacturing" },
      { label: "Retail", href: "/industries/retail" },
      { label: "Hospitality", href: "/industries/hospitality" },
      { label: "SMB and startups", href: "/industries/technology" },
      { label: "All industries", href: "/industries" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Guides and articles", href: "/resources" },
      { label: "Free security assessment", href: "/assessment" },
      { label: "Appliances and sizing", href: "/frontier/appliances" },
      { label: "SecuEdge blog", href: "https://blogs.secuedge.com/", external: true },
      { label: "Contact support", href: "/contact" },
      { label: "Compliance", href: "/compliance" },
    ],
  },
  { title: "About", links: [["About", "/about"], ["Why SecuEdge", "/why-secuedge"], ["Built in India", "/trust"], ["Customers", "/customers"], ["Contact", "/contact"]].map(([label, href]) => ({ label, href })) },
];

export function SiteFooter({ tone = "light" }: { tone?: "dark" | "light" }) {
  return (
    <footer className={`foundation-footer${tone === "light" ? " foundation-footer--light" : ""}`}>
      <div className="foundation-container">
        <div className="foundation-footer__top">
          <div className="foundation-footer__brand">
            <Logo onDark={tone === "dark"} />
            <p>SecuEdge. India&apos;s homegrown cybersecurity company, committed to making cybersecurity simple and accessible to all.</p>
            <p className="foundation-footer__status"><span>● SecuEdge Frontier · Available now</span><span>First of seven SecuEdge products</span></p>
            <p className="foundation-footer__status"><span>200+ installations across India</span><span>24/7 support: <a href={SUPPORT.phoneHref}>{SUPPORT.phone}</a></span></p>
            <p>{SITE.email} · {HEADQUARTERS}</p>
            <p>Made in India</p>
            <Link href="/contact" className="foundation-footer__cta">Book a free demo <ArrowUpRight size={15} /></Link>
          </div>
          {columns.map((column) => (
            <div key={column.title} className="foundation-footer__column">
              <h2>{column.title}</h2>
              {column.links.map(({ label, href, external, meta }) => (
                <Link key={label} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
                  {label}
                  {meta ? <span className="foundation-footer__meta">{meta}</span> : null}
                  {external ? <ArrowUpRight size={12} aria-hidden /> : null}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="foundation-footer__signal" aria-label="SecuEdge summary">
          <span>SECUEDGE / CYBERSECURITY, MADE EASY</span>
          <i /><span>SECUEDGE FRONTIER · AVAILABLE NOW</span><i /><span>BUILT IN INDIA</span>
        </div>
        <div className="foundation-footer__bottom">
          <span>© {new Date().getFullYear()} SecuEdge. All rights reserved.</span>
          <span>Made in India · {HEADQUARTERS}</span>
          <span><Link href="/legal/privacy">Privacy policy</Link> · <Link href="/legal/terms">Terms of use</Link> · <Link href="/legal/dpdp">DPDP notice</Link></span>
        </div>
      </div>
    </footer>
  );
}
