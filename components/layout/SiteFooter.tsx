import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { SITE, SUPPORT, HEADQUARTERS, SECUEDGE_PRODUCTS } from "@/lib/site";

/* Compact footer. The full product / solution / industry trees live in the
   navbar drawer and on their own pages, so the footer stays short on a phone.
   Product names are listed as plain links — no "available now" / "in
   development" status labels are repeated here. */
const HUBS = [
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Resources", href: "/resources" },
  { label: "Compliance", href: "/compliance" },
  { label: "Customers", href: "/customers" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter({ tone = "light" }: { tone?: "dark" | "light" }) {
  return (
    <footer className={`foundation-footer${tone === "light" ? " foundation-footer--light" : ""}`}>
      <div className="foundation-container">
        <div className="foundation-footer__bar">
          <div className="foundation-footer__id">
            <Logo onDark={tone === "dark"} />
            <p>{SITE.companyLine}</p>
          </div>

          <div className="foundation-footer__nav">
            <nav className="foundation-footer__mini" aria-label="Footer">
              {HUBS.map((hub) => (
                <Link key={hub.href} href={hub.href}>{hub.label}</Link>
              ))}
            </nav>

            <p className="foundation-footer__products">
              {SECUEDGE_PRODUCTS.map((product) => (
                <Link key={product.key} href={product.href}>{product.name}</Link>
              ))}
            </p>

            <div className="foundation-footer__contact">
              <a href={SUPPORT.phoneHref}>
                <Phone size={12} aria-hidden />
                {SUPPORT.phone}
                <span>24/7 toll-free</span>
              </a>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <Link href="/contact" className="foundation-footer__cta">
                Book a free demo <ArrowUpRight size={12} aria-hidden />
              </Link>
            </div>
          </div>
        </div>

        <div className="foundation-footer__bottom">
          <span>© {new Date().getFullYear()} SecuEdge. All rights reserved.</span>
          <span>{HEADQUARTERS} · Made in India</span>
          <span>
            <Link href="/legal/privacy">Privacy</Link> · <Link href="/legal/terms">Terms</Link> · <Link href="/legal/dpdp">DPDP</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
