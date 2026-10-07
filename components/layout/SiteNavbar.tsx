"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X, Search, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { SOLUTIONS_NAV } from "@/lib/site";
import { GlobalSearch } from "@/components/GlobalSearch";

type MenuName = "Products" | "Solutions" | "Platform" | "Resources";
const menuNames: MenuName[] = ["Products", "Solutions", "Platform", "Resources"];
type MenuEntry = { name: string; detail: string; href: string; external?: boolean };
const menus: Record<MenuName, { kicker: string; title: string; entries: MenuEntry[] }> = {
  Products: {
    kicker: "SecuEdge product portfolio",
    title: "Six products. One ecosystem.",
    entries: [
      { name: "All Products", detail: "Explore the complete SecuEdge portfolio", href: "/products" },
      { name: "Frontier", detail: "Next-Generation Firewall (NGFW)", href: "/products/frontier" },
      { name: "Watchtower", detail: "Network Monitoring System", href: "/products/watchtower" },
      { name: "SecuWeb", detail: "SD-WAN", href: "/products/secuweb" },
      { name: "Grid", detail: "SIEM / SOAR", href: "/products/grid" },
      { name: "SecuDefend", detail: "IPS / IDS", href: "/products/secudefend" },
      { name: "Muster", detail: "Log Analyzer", href: "/products/muster" },
      { name: "Frontier model portfolio", detail: "SE20 · SE50 · SE50P · SE100P · SE250P · SE500P", href: "/products/frontier" },
      { name: "Frontier high-scale models", detail: "SE1000P · SE2500P · SE5000P · SE10000P · SE15000P", href: "/products/frontier" },
      { name: "Custom Frontier configuration", detail: "Discuss requirements beyond the standard lineup", href: "/products/frontier/custom" },
    ],
  },
  Solutions: {
    kicker: "Deployment patterns",
    title: "Protection for the way you connect.",
    entries: SOLUTIONS_NAV.slice(0, 6).map((solution) => ({
      name: solution.name,
      detail: "Explore SecuEdge solution options",
      href: `/solutions/${solution.slug}`,
    })),
  },
  Platform: {
    kicker: "Frontier / product information",
    title: "Explore the NGFW.",
    entries: [
      { name: "Frontier architecture", detail: "See how firewall policy sits at the edge", href: "/platform" },
      { name: "Frontier capabilities", detail: "Firewall, VPN, policy and routing", href: "/frontier/capabilities" },
      { name: "Quick + Professional Mode", detail: "One appliance, two operating modes", href: "/frontier/dual-mode" },
      { name: "All Frontier models", detail: "Complete SE-series portfolio — 11 models", href: "/products/frontier" },
      { name: "Model comparison", detail: "Compare any Frontier models side by side", href: "/products/compare" },
      { name: "Model finder", detail: "Find the right Frontier model for your needs", href: "/products/recommend" },
      { name: "Custom Frontier", detail: "Configuration for specific requirements", href: "/products/frontier/custom" },
    ],
  },
  Resources: {
    kicker: "Guidance & support",
    title: "Get to know SecuEdge.",
    entries: [
      { name: "Security guides", detail: "Practical network security articles", href: "/resources/cybersecurity-mistakes-indian-businesses-fix" },
      { name: "Firewall buyer guide", detail: "How to evaluate a firewall", href: "/resources/why-business-needs-firewall-2025-startup" },
      { name: "Appliance comparison", detail: "Models and pending specifications", href: "/frontier/appliances" },
      { name: "Security assessment", detail: "Review your network security needs", href: "/assessment" },
      { name: "SecuEdge blog", detail: "Visit the official SecuEdge blog", href: "https://blogs.secuedge.com/", external: true },
      { name: "Support and product questions", detail: "Contact the SecuEdge team", href: "/contact" },
    ],
  },
};

export function SiteNavbar({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const effectiveTone = tone;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuName | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

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
              className={`foundation-nav__trigger${activeMenu === name ? " is-active" : ""}`}
              aria-controls="foundation-menu-panel" 
              aria-haspopup="true" 
              aria-expanded={activeMenu === name} 
              onMouseEnter={() => setActiveMenu(name)} 
              onFocus={() => setActiveMenu(name)} 
              onClick={() => setActiveMenu((current) => current === name ? null : name)}
            >
              {name}
              <ChevronDown size={14} aria-hidden="true" className="foundation-nav__chevron" />
            </button>
          ))}
          <Link 
            href="/customers" 
            onMouseEnter={() => setActiveMenu(null)} 
            onFocus={() => setActiveMenu(null)}
            className="foundation-nav__link"
          >
            Customers
          </Link>
          <Link 
            href="/about" 
            onMouseEnter={() => setActiveMenu(null)} 
            onFocus={() => setActiveMenu(null)}
            className="foundation-nav__link"
          >
            Company
          </Link>
        </nav>
        
        <div className="foundation-nav__actions">
          <GlobalSearch />
          <Link href="/contact" className="foundation-button foundation-button--small">Contact Sales <ArrowUpRight size={14} /></Link>
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
          {activeMenu === "Platform" ? <div className="command-nav-network" aria-hidden="true"><i /><i /><i /><i /><i /><b /><b /><b /><b /></div> : null}
          <Link 
            href={activeMenu === "Products" ? "/products" : activeMenu === "Solutions" ? "/solutions" : activeMenu === "Platform" ? "/platform" : "/resources"} 
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
        <Link href="/contact" className="foundation-button" onClick={() => setOpen(false)}>Contact Sales</Link>
      </nav>
    </header>
  );
}