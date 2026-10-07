import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/Logo";

const columns = [
  { title: "Products", links: [["Frontier NGFW", "/products/frontier"], ["Watchtower", "/products/watchtower"], ["SecuWeb", "/products/secuweb"], ["Grid", "/products/grid"], ["SecuDefend", "/products/secudefend"], ["Muster", "/products/muster"], ["All Products", "/products"]] },
  { title: "Solutions", links: [["Enterprise", "/solutions/enterprise"], ["Government", "/industries/government"], ["Education", "/industries/education"], ["Healthcare", "/industries/healthcare"], ["Banking & finance", "/industries/finance"], ["Manufacturing", "/industries/manufacturing"], ["SMB", "/solutions/small-medium-business"]] },
  { title: "Platform", links: [["NGFW architecture", "/platform"], ["Frontier capabilities", "/frontier/capabilities"], ["Frontier models", "/products/frontier"], ["Model comparison", "/products/compare"], ["Model finder", "/products/recommend"], ["Custom Frontier", "/products/frontier/custom"]] },
  { title: "Resources", links: [["Model comparison", "/products/compare"], ["Model finder", "/products/recommend"], ["Security guides", "/resources"], ["Security assessment", "/assessment"], ["Compliance", "/compliance"]] },
  { title: "Company", links: [["About", "/about"], ["Why SecuEdge", "/why-secuedge"], ["Customers", "/customers"], ["Contact", "/contact"]] },
];

export function SiteFooter({ tone = "light" }: { tone?: "dark" | "light" }) {
  return (
    <footer className={`foundation-footer${tone === "light" ? " foundation-footer--light" : ""}`}>
      <div className="foundation-container">
        <div className="foundation-footer__top">
          <div className="foundation-footer__brand">
            <Logo onDark={tone === "dark"} />
            <p>Secure the network. Enable the business.</p>
            <Link href="/contact" className="foundation-footer__cta">Talk to our team <ArrowUpRight size={15} /></Link>
          </div>
          {columns.map((column) => (
            <div key={column.title} className="foundation-footer__column">
              <h2>{column.title}</h2>
              {column.links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
            </div>
          ))}
        </div>
        <div className="foundation-footer__signal" aria-label="SecuEdge ecosystem summary">
          <span>SECUEdge / CONNECTED SECURITY INFRASTRUCTURE</span>
          <i /><span>06 PRODUCT FAMILIES</span><i /><span>11 FRONTIER MODELS</span><i /><span>BUILT FOR THE EDGE</span>
        </div>
        <div className="foundation-footer__bottom">
          <span>© {new Date().getFullYear()} SecuEdge. All rights reserved.</span>
          <span>Made in India · Security infrastructure for the modern edge.</span>
          <span><Link href="/legal/privacy">Privacy</Link> · <Link href="/legal/terms">Terms</Link> · <Link href="/trust">Security</Link></span>
        </div>
      </div>
    </footer>
  );
}
