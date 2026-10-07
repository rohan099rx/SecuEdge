import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LegalShell } from "@/components/premium/LegalShell";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How SecuEdge collects, uses and protects your data.",
  path: "/legal/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy">
      <p>
        This page will describe what data SecuEdge collects, how it is used, retained and
        protected, and the rights available to you. It must be reviewed for DPDP compliance.
      </p>
    </LegalShell>
  );
}
