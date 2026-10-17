import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LegalShell } from "@/components/premium/LegalShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description: "The terms governing use of the SecuEdge website.",
  path: "/legal/terms",
});

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Use">
      <p><strong>Last updated: 12 October 2026.</strong> These terms govern your use of this website. They will be replaced with lawyer-reviewed copy before launch.</p>
      <h2>Use of the website</h2>
      <p>You may browse this website, use the model finder and free security assessment, and contact us through the forms. You agree not to misuse the site, attempt to disrupt it, or submit false or unlawful content through the forms.</p>
      <h2>Intellectual property</h2>
      <p>Everything on this website — text, diagrams, logos, product names and visuals — belongs to SecuEdge or its licensors. You may not copy, reproduce or redistribute it without written permission, except for normal browsing and sharing links to our pages.</p>
      <h2>Product information, not promises</h2>
      <p>Model ranges, feature descriptions and roadmap products are described in good faith and may change. Full specifications are available on request. Nothing on this website is a warranty of performance, availability dates or fitness for a particular purpose.</p>
      <h2>No warranty for website content</h2>
      <p>This website is provided as general information. While we work to keep it accurate, we make no warranty about its completeness or currency.</p>
      <h2>Limitation of liability</h2>
      <p>To the maximum extent permitted by law, SecuEdge is not liable for any loss arising from your use of, or reliance on, this website.</p>
      <h2>Governing law and jurisdiction</h2>
      <p>These terms are governed by the laws of India. Courts at Gurugram, Haryana, have exclusive jurisdiction. Questions: {SITE.email}.</p>
    </LegalShell>
  );
}
