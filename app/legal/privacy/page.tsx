import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LegalShell } from "@/components/premium/LegalShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How SecuEdge collects, uses, stores and protects your data — and your rights.",
  path: "/legal/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy">
      <p><strong>Last updated: 12 October 2026.</strong> This policy describes how SecuEdge handles personal data collected through this website — the contact and demo forms and the free security assessment. It will be replaced with lawyer-reviewed copy before launch.</p>
      <h2>Who we are and how to contact us</h2>
      <p>SecuEdge is India&apos;s homegrown cybersecurity company, based in Gurugram, Haryana, India. For privacy questions, write to {SITE.email}.</p>
      <h2>What we collect</h2>
      <p>When you use the contact, demo or assessment forms, we collect what you type: your name, work email, organisation, phone number, role, and your message. The assessment quiz collects your answers to seven questions about your network. No account is created and no tracking profile is built.</p>
      <h2>Why we collect it</h2>
      <p>To respond to your request — a demo, sizing help, a partnership inquiry or support. We contact you about your request and nothing else, and only because you asked us to by submitting the form and giving consent.</p>
      <h2>How long we keep it</h2>
      <p>Form submissions are kept only as long as needed to handle your request and any follow-up conversation, then deleted on request. Write to {SITE.email} to ask for deletion at any time.</p>
      <h2>Where it is stored</h2>
      <p>Website form data is stored in India. SecuEdge Frontier appliances keep traffic, logs and policy data on Indian soil by default, with no overseas routing.</p>
      <h2>Who we share it with</h2>
      <p>We do not sell personal data. Form details are shared only with the SecuEdge team members and authorised channel partners who need them to respond to your request.</p>
      <h2>Your rights</h2>
      <p>You may ask to see, correct or delete your data, and to withdraw your consent at any time, by writing to {SITE.email}. Withdrawing consent does not affect anything already done with your consent.</p>
      <h2>Grievance officer</h2>
      <p>For complaints about how your data is handled, contact our grievance officer at {SITE.email}. Unresolved grievances may be taken to the Data Protection Board of India under the DPDP Act 2023.</p>
    </LegalShell>
  );
}
