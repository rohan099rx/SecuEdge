"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { SITE } from "@/lib/site";

const INTERESTS = [
  { key: "deployment", title: "Discuss a deployment", desc: "Sizing, models and rollout for your network." },
  { key: "product", title: "Product information", desc: "Capabilities, modes and documentation." },
  { key: "technical", title: "Technical question", desc: "Policy, architecture or compatibility." },
  { key: "partnership", title: "Partnership / business", desc: "Reselling, distribution or business inquiry." },
] as const;

/**
 * Stepped contact flow. Step 1 selects an interest, Step 2 captures the
 * requirement, Step 3 captures contact details. Submitting builds the same
 * mailto draft as before (plus an Interest line) — the visitor reviews and
 * sends it in their own email application. No backend, no data retention.
 */
export function ContactForm({ defaultInterest = "deployment" }: { defaultInterest?: string }) {
  const [step, setStep] = useState(1);
  const [interest, setInterest] = useState<string>(defaultInterest);
  const [draftHref, setDraftHref] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const interestLabel = INTERESTS.find((i) => i.key === interest)?.title ?? interest;
    const body = [
      `Interest: ${interestLabel}`,
      `Name: ${form.get("name") ?? ""}`,
      `Work email: ${form.get("email") ?? ""}`,
      `Organisation: ${form.get("org") ?? ""}`,
      `Phone: ${form.get("phone") ?? ""}`,
      `Role: ${form.get("role") ?? ""}`,
      "",
      "What would you like to solve?",
      String(form.get("message") ?? ""),
    ].join("\n");
    setDraftHref(`mailto:${SITE.email}?subject=${encodeURIComponent("SecuEdge demo request")}&body=${encodeURIComponent(body)}`);
  }

  if (draftHref) {
    return (
      <div className="premium-card grid gap-4 p-8" role="status" aria-live="polite">
        <p className="flex items-center gap-2 text-lg font-bold text-[#0B2239]"><Check size={20} className="text-[#15803d]" />Your request is ready.</p>
        <p className="text-sm leading-relaxed text-[#526274]">Review and send the email draft to complete your request. SecuEdge hasn&rsquo;t received it yet.</p>
        <a href={draftHref} className="premium-btn-primary w-fit">Open email draft</a>
        <button type="button" className="w-fit text-sm font-semibold text-[#016FED]" onClick={() => { setDraftHref(null); setStep(1); }}>Edit your details</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="premium-card p-7 sm:p-8">
      <ol className="flex items-center gap-2" aria-label="Contact steps">
        {["Interest", "Requirement", "Details"].map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-2" aria-current={step === i + 1 ? "step" : undefined}>
            <span className={`flex h-6 w-6 items-center justify-center rounded-full font-mono text-[10px] font-bold ${step > i + 1 ? "bg-[#15803d] text-white" : step === i + 1 ? "bg-[#016FED] text-white" : "border border-[rgba(11,34,57,0.2)] text-[#526274]"}`}>
              {step > i + 1 ? <Check size={12} /> : i + 1}
            </span>
            <span className={`text-xs font-semibold ${step === i + 1 ? "text-[#0B2239]" : "text-[#526274]"}`}>{label}</span>
            {i < 2 && <span className="h-px flex-1 bg-[rgba(11,34,57,0.12)]" aria-hidden />}
          </li>
        ))}
      </ol>

      {step === 1 && (
        <div className="mt-6">
          <p className="text-sm font-bold text-[#0B2239]">What are you interested in?</p>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2" role="radiogroup" aria-label="Interest">
            {INTERESTS.map((item) => (
              <button key={item.key} type="button" role="radio" aria-checked={interest === item.key} onClick={() => setInterest(item.key)}
                className={`rounded-xl border p-4 text-left transition-colors ${interest === item.key ? "border-[#016FED] bg-[#016FED]/[0.06]" : "border-[rgba(11,34,57,0.12)] bg-white hover:border-[rgba(11,34,57,0.3)]"}`}>
                <strong className="block text-sm font-bold text-[#0B2239]">{item.title}</strong>
                <span className="mt-1 block text-xs leading-relaxed text-[#526274]">{item.desc}</span>
              </button>
            ))}
          </div>
          <button type="button" className="premium-btn-primary mt-6" onClick={() => setStep(2)}>Continue <ArrowRight size={15} /></button>
        </div>
      )}

      {step === 2 && (
        <div className="mt-6">
          <p className="text-sm font-bold text-[#0B2239]">Tell us about your requirement.</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <Field label="Organisation" name="org" />
            <div>
              <label htmlFor="role" className="text-sm font-semibold text-[#0B2239]">I am a…</label>
              <select id="role" name="role" className="mt-1.5 w-full rounded-lg border border-[rgba(11,34,57,0.2)] bg-white px-3 py-2.5 text-sm text-[#0B2239] outline-none transition focus:border-[#016FED] focus:ring-2 focus:ring-[#016FED]/25">
                <option>Business owner / decision maker</option>
                <option>IT / network engineer</option>
                <option>Reseller / partner</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="message" className="text-sm font-semibold text-[#0B2239]">What would you like to solve?</label>
            <textarea id="message" name="message" rows={4} className="mt-1.5 w-full rounded-lg border border-[rgba(11,34,57,0.2)] bg-white px-3 py-2.5 text-sm text-[#0B2239] outline-none transition focus:border-[#016FED] focus:ring-2 focus:ring-[#016FED]/25" />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="premium-btn-ghost !min-h-[2.7rem]" onClick={() => setStep(1)}><ArrowLeft size={15} /> Back</button>
            <button type="button" className="premium-btn-primary !min-h-[2.7rem]" onClick={() => setStep(3)}>Continue <ArrowRight size={15} /></button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-6">
          <p className="text-sm font-bold text-[#0B2239]">Contact details.</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <Field label="Full name" name="name" required />
            <Field label="Work email" name="email" type="email" required />
            <Field label="Phone" name="phone" type="tel" />
          </div>
          <label className="mt-4 flex items-start gap-2.5 text-xs leading-relaxed text-[#526274]">
            <input type="checkbox" name="contactConsent" required className="mt-0.5 accent-[#016FED]" />
            <span>I agree that SecuEdge may use these details to respond to my request. See the <a href="/legal/privacy" className="font-semibold text-[#016FED]">Privacy Policy</a>.</span>
          </label>
          <p className="mt-3 text-xs text-[#526274]">Submitting prepares an email draft for you to review and send. Your request is not sent from this website.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" className="premium-btn-ghost !min-h-[2.7rem]" onClick={() => setStep(2)}><ArrowLeft size={15} /> Back</button>
            <button type="submit" className="premium-btn-primary !min-h-[2.7rem]">Prepare email request</button>
          </div>
        </div>
      )}
    </form>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold text-[#0B2239]">
        {label} {required ? <span className="text-[#b91c1c]">*</span> : null}
      </label>
      <input id={name} name={name} type={type} required={required}
        className="mt-1.5 w-full rounded-lg border border-[rgba(11,34,57,0.2)] bg-white px-3 py-2.5 text-sm text-[#0B2239] outline-none transition focus:border-[#016FED] focus:ring-2 focus:ring-[#016FED]/25" />
    </div>
  );
}
