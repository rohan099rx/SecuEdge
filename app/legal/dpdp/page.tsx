import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LegalShell } from "@/components/premium/LegalShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "DPDP Notice",
  description: "How SecuEdge handles personal data under the DPDP Act 2023.",
  path: "/legal/dpdp",
});

export default function DpdpPage() {
  return (
    <LegalShell title="DPDP Notice">
      <p><strong>Last updated: 12 October 2026.</strong> This notice is given under India&apos;s Digital Personal Data Protection Act 2023. It will be replaced with lawyer-reviewed copy before launch.</p>
      <h2>Data fiduciary</h2>
      <p>SecuEdge, Gurugram, Haryana, India, acts as the data fiduciary for personal data collected through this website. Contact: {SITE.email}.</p>
      <h2>Purposes of processing</h2>
      <p>We process your name, work email, organisation, phone number, role and message solely to respond to your request — a demo, sizing help, a partnership inquiry or support — and for directly related follow-up.</p>
      <h2>Consent and its withdrawal</h2>
      <p>By submitting a form and ticking the consent box, you consent to SecuEdge contacting you about your request. You may withdraw consent at any time by writing to {SITE.email}. Withdrawal does not affect processing already done.</p>
      <h2>Your rights as a data principal</h2>
      <p>Under the DPDP Act 2023 you have the right to access the personal data we hold about you, to correct or erase it, to nominate another person to exercise your rights in case of your death or incapacity, and to grievance redressal.</p>
      <h2>Grievance redressal</h2>
      <p>Write to our grievance officer at {SITE.email}. If your grievance is unresolved, you may approach the Data Protection Board of India.</p>
      <h2>Data residency</h2>
      <p>Website form data is stored in India. SecuEdge Frontier appliances keep traffic, logs and policy data on Indian soil by default, with no overseas routing. The product is built with the DPDP Act 2023 in mind.</p>
    </LegalShell>
  );
}
