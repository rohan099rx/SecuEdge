import type { Metadata } from "next";
import { Inter, Manrope, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { SiteFooter } from "@/components/layout/SiteFooter";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

// Editorial serif accent — used sparingly for pull-quotes and "promise" moments.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  style: ["italic", "normal"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  // Plain-string default; per-page metadata (lib/seo.ts) sets absolute titles
  // that already include the brand suffix. No `template` here — a template would
  // re-append the brand to those titles and recreate the audit's "| SecuEdge | SecuEdge" bug.
  title: "SecuEdge | Cybersecurity, made easy. Built in India.",
  description: SITE.description,
  applicationName: SITE.name,
  robots: { index: true, follow: true },
  // Re-enables pinch-zoom (fixes the audit's accessibility/viewport finding).
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

/** Organization structured data — no credentials or certificates,
 *  per the company playbook (copy deck §1.1). */
function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    foundingDate: "2025",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gurugram",
      addressRegion: "Haryana",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+9118001230966",
      contactType: "technical support",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: ["https://in.linkedin.com/company/secuedge"],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-brand-blue focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <div className="foundation-site foundation-site--light">
          <SiteNavbar tone="light" />
          <main id="main">{children}</main>
          <SiteFooter tone="light" />
        </div>
        <OrganizationJsonLd />
      </body>
    </html>
  );
}
