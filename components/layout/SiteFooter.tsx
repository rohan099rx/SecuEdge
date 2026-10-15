import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { SITE, SUPPORT, HEADQUARTERS } from "@/lib/site";

const columns = [
  { title: "Products", links: [["SecuEdge Frontier", "/products/frontier"], ["Find your model", "/products/recommend"], ["Compare models", "/products/compare"], ["SecuWeb · In development", "/products/secuweb"], ["SecuDefend · In development", "/products/secudefend"], ["GRID · In development", "/products/grid"], ["All Products", "/products"]] },
  { title: "Solutions", links: [["Enterprise", "/solutions/enterprise"], ["Government", "/industries/government"], ["Education", "/industries/education"], ["Healthcare", "/industries/healthcare"], ["Banking & finance", "/industries/finance"], ["Manufacturing", "/industries/manufacturing"], ["SMB", "/solutions/small-medium-business"]] },
  { title: "Platform", links: [["NGFW architecture", "/platform"], ["SecuEdge Frontier capabilities", "/frontier/capabilities"], ["Dual Mode", "/frontier/dual-mode"], ["Safe Environment Filter", "/frontier/safe-environment"], ["SecuEdge Frontier models", "/products/frontier"], ["Model finder", "/products/recommend"], ["Custom Frontier", "/products/frontier/custom"]] },
  { title: "Resources", links: [["Security guides", "/resources"], ["Security assessment", "/assessment"], ["Compliance", "/compliance"]] },
  { title: "Company", links: [["About", "/about"], ["Why SecuEdge", "/why-secuedge"], ["Built in India", "/trust"], ["Customers", "/customers"], ["Contact", "/contact"]] },
];

export function SiteFooter({ tone = "light" }: { tone?: "dark" | "light" }) {
  return (
    <footer className={`foundation-footer${tone === "light" ? " foundation-footer--light" : ""}`}>
      <div className="foundation-container">
        <div className="foundation-footer__top">
          <div className="foundation-footer__brand">
            <Logo onDark={tone === "dark"} />
            <p>SecuEdge. India&apos;s homegrown cybersecurity company, committed to making cybersecurity simple and accessible to all.</p>
            <p>24/7 support: <a href={SUPPORT.phoneHref}>{SUPPORT.phone}</a> · {SITE.email} · {HEADQUARTERS}</p>
            <p>Made in India</p>
            <Link href="/contact" className="foundation-footer__cta">Book a free demo <ArrowUpRight size={15} /></Link>
          </div>
          {columns.map((column) => (
            <div key={column.title} className="foundation-footer__column">
              <h2>{column.title}</h2>
              {column.links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
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
