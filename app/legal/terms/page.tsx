import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LegalShell } from "@/components/premium/LegalShell";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description: "The terms governing use of the SecuEdge website and services.",
  path: "/legal/terms",
});

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Use">
      <p>This page will set out the terms governing use of the SecuEdge website and services.</p>
    </LegalShell>
  );
}
