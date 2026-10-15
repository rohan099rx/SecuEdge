"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X, Search, ChevronDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { SOLUTIONS_NAV, SECUEDGE_PRODUCTS, STATUS_LABEL } from "@/lib/site";
import { GlobalSearch } from "@/components/GlobalSearch";

type MenuName = "Products" | "Solutions" | "Resources";
const menuNames: MenuName[] = ["Products", "Solutions", "Resources"];
type MenuEntry = { name: string; detail: string; href: string; external?: boolean };

/* Priority sectors first, then the full list (copy deck §1.7). */
const PRIORITY_INDUSTRIES = [
  { slug: "education", name: "Education" },
  { slug: "healthcare", name: "Healthcare" },
  { slug: "government", name: "Government" },
  { slug: "finance", name: "Banking and finance" },
  { slug: "manufacturing", name: "Manufacturing" },
  { slug: "retail", name: "Retail" },
  { slug: "hospitality", name: "Hospitality" },
  { slug: "technology", name: "SMB and startups" },
] as const;

const menus: Record<MenuName, { kicker: string; title: string; entries: MenuEntry[] }> = {
  Products: {
    kicker: "SecuEdge products",
    title: "One appliance family, seven products over time.",
    entries: [
      { name: "SecuEdge Frontier", detail: "The next-generation firewall — available now", href: "/products/frontier" },
      ...SECUEDGE_PRODUCTS.filter((p) => p.key !== "frontier").map((p) => ({
        name: `${p.name} · ${STATUS_LABEL[p.status]}`,
        detail: p.desc,
        href: p.href,
      })),
    ],
  },
  Solutions: {
    kicker: "How SecuEdge Frontier helps",
    title: "Protection for the way you connect.",
    entries: [
      ...SOLUTIONS_NAV.map((solution) => ({
        name: solution.name,
        detail: "Explore SecuEdge solution options",
        href: `/solutions/${solution.slug}`,
      })),
      ...PRIORITY_INDUSTRIES.map((industry) => ({
        name: industry.name,
        detail: "Security for your sector",
        href: `/industries/${industry.slug}`,
      })),
      { name: "All industries", detail: "Every sector SecuEdge Frontier serves", href: "/industries" },
    ],
  },
  Resources: {
    kicker: "Guidance & support",
    title: "Get to know SecuEdge.",
    entries: [
      { name: "Guides and articles", detail: "Practical network security articles", href: "/resources" },
      { name: "Free security assessment", detail: "Seven questions, about two minutes", href: "/assessment" },
      { name: "Appliances and sizing", detail: "Models and the sizing method", href: "/frontier/appliances" },
      { name: "SecuEdge blog", detail: "Visit the official SecuEdge blog", href: "https://blogs.secuedge.com/", external: true },
      { name: "Support and product questions", detail: "Contact the SecuEdge team", href: "/contact" },
    ],
  },
};

export function SiteNavbar({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const effectiveTone = tone;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuName | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  /* Scrollspy — the menu that owns the current route carries a
     persistent blue dot so visitors always know where they are. */
  const activeRoute = useMemo<MenuName | null>(() => {
    if (pathname.startsWith("/products")) return "Products";
    if (pathname.startsWith("/solutions")) return "Solutions";
    /* No Platform menu — /platform and /frontier pages carry no nav highlight. */
    if (pathname.startsWith("/resources")) return "Resources";
    return null;
  }, [pathname]);
  const isCustomers = pathname.startsWith("/customers");
  const isCompany =
    pathname.startsWith("/about") ||
    pathname.startsWith("/why-secuedge") ||
    pathname.startsWith("/trust");

  useEffect(() => {
    const update = () => {
      const currentScrollY = window.scrollY;
      const isScrolled = currentScrollY > 24;
      setScrolled(isScrolled);
      lastScrollY.current = currentScrollY;
    };
    
    update();
    window.addEventListener("scroll", update, { passive: true });
    
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setActiveMenu(null); setOpen(false); }
    };
    
    window.addEventListener("keydown", escape);
    
    const outsideClick = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
        setOpen(false);
      }
    };
    
    document.addEventListener("pointerdown", outsideClick);
    
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outsideClick);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  const queueClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMenu(null), 130);
  };
  
  const cancelClose = () => { if (closeTimer.current) clearTimeout(closeTimer.current); };

  const navClasses = [
    "foundation-nav",
    effectiveTone === "light" && "foundation-nav--light",
    scrolled && "foundation-nav--scrolled",
    activeMenu && "foundation-nav--menu-open",
    open && "foundation-nav--mobile-open",
  ].filter(Boolean).join(" ");

  return (
    <header 
      ref={headerRef} 
      className={navClasses}
      onMouseLeave={queueClose}
    >
      <div className="foundation-container foundation-nav__inner">
        <Link 
          href="/" 
          aria-label="SecuEdge home" 
          onClick={() => { setOpen(false); setActiveMenu(null); }}
          className="foundation-logo-link"
        >
          <Logo className="foundation-logo" onDark={effectiveTone === "dark"} />
        </Link>
        
        <nav className="foundation-nav__links" aria-label="Main navigation" onMouseEnter={cancelClose}>
          {menuNames.map((name) => (
            <button 
              key={name} 
              type="button" 
              className={[
                "foundation-nav__trigger",
                activeMenu === name && "is-active",
                activeRoute === name && "is-current",
              ].filter(Boolean).join(" ")}
              aria-controls="foundation-menu-panel" 
              aria-haspopup="true" 
              aria-expanded={activeMenu === name} 
              onMouseEnter={() => setActiveMenu(name)} 
              onFocus={() => setActiveMenu(name)} 
              onClick={() => setActiveMenu((current) => current === name ? null : name)}
            >
              <span>{name}</span>
              <i aria-hidden="true" />
              <ChevronDown size={14} aria-hidden="true" className="foundation-nav__chevron" />
            </button>
          ))}
          <Link 
            href="/customers" 
            onMouseEnter={() => setActiveMenu(null)} 
            onFocus={() => setActiveMenu(null)}
            className={["foundation-nav__link", isCustomers && "is-current"].filter(Boolean).join(" ")}
          >
            Customers
          </Link>
          <Link 
            href="/about" 
            onMouseEnter={() => setActiveMenu(null)} 
            onFocus={() => setActiveMenu(null)}
            className={["foundation-nav__link", isCompany && "is-current"].filter(Boolean).join(" ")}
          >
            Company
          </Link>
        </nav>
        
        <div className="foundation-nav__actions">
          <GlobalSearch />
          <Link href="/contact" className="foundation-button foundation-button--small">Book a free demo <ArrowUpRight size={14} /></Link>
        </div>
        
        <button
          type="button"
          className="foundation-nav__menu"
          aria-expanded={open}
          aria-controls="foundation-mobile-nav"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      <div 
        id="foundation-menu-panel" 
        data-open={Boolean(activeMenu)} 
        data-menu={activeMenu?.toLowerCase() ?? "closed"} 
        aria-hidden={!activeMenu} 
        className={`command-nav-panel${activeMenu ? ` command-nav-panel--${activeMenu.toLowerCase()} is-open` : ""}`}
        onMouseEnter={cancelClose} 
        onMouseLeave={queueClose}
      >
        <div className="command-nav-panel__intro">
          <span>{menus[activeMenu ?? "Products"].kicker}</span>
          <h2>{menus[activeMenu ?? "Products"].title}</h2>
          <Link 
            href={activeMenu === "Products" ? "/products" : activeMenu === "Solutions" ? "/solutions" : "/resources"} 
            onClick={() => setActiveMenu(null)}
          >
            Explore {activeMenu?.toLowerCase() ?? "products"} <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="command-nav-panel__entries" key={activeMenu ?? "closed"}>
          {menus[activeMenu ?? "Products"].entries.map((entry, index) => (
            <Link 
              href={entry.href} 
              key={entry.name} 
              target={entry.external ? "_blank" : undefined} 
              rel={entry.external ? "noreferrer" : undefined} 
              onClick={() => setActiveMenu(null)}
            >
              <span className="command-nav-panel__index">0{index + 1}</span>
              <span><strong>{entry.name}</strong><small>{entry.detail}</small></span>
              <ArrowUpRight size={13} />
            </Link>
          ))}
        </div>
      </div>
      
      <nav id="foundation-mobile-nav" data-open={open} aria-hidden={!open} className="foundation-mobile-nav" aria-label="Mobile navigation">
        {menuNames.map((name) => (
          <section key={name}>
            <h2>{name}</h2>
            {menus[name].entries.map((entry) => (
              <Link 
                key={entry.name} 
                href={entry.href} 
                target={entry.external ? "_blank" : undefined} 
                rel={entry.external ? "noreferrer" : undefined} 
                onClick={() => setOpen(false)}
              >
                {entry.name}<span>{entry.detail}</span>
              </Link>
            ))}
          </section>
        ))}
        <Link href="/customers" onClick={() => setOpen(false)}>Customers</Link>
        <Link href="/about" onClick={() => setOpen(false)}>Company</Link>
        <GlobalSearch />
        <Link href="/contact" className="foundation-button" onClick={() => setOpen(false)}>Book a free demo</Link>
      </nav>
    </header>
  );
}