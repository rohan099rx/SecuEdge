import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LegalShell } from "@/components/premium/LegalShell";

export const metadata: Metadata = buildMetadata({
  title: "DPDP & data residency",
  description:
    "SecuEdge is DPDP-ready: your data stays on Indian soil, with local support and independent certification.",
  path: "/legal/dpdp",
});

export default function DpdpPage() {
  return (
    <LegalShell title="DPDP & data residency">
      <p>
        SecuEdge Frontier is built to align with India&rsquo;s Digital Personal Data Protection
        (DPDP) framework. Customer data stays on Indian soil, and support is local. This page will
        set out our data-residency commitments and processing details.
      </p>
    </LegalShell>
  );
}
