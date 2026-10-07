import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/motion";
import "@/components/premium/premium.css";

/** Shared legal document shell — readable measure, placeholder warning,
 *  cross-links. Legal meaning of each page is unchanged. */
export function LegalShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="premium">
      <section className="mx-auto w-full max-w-3xl px-6 pb-24 pt-16 md:pt-24">
        <Reveal>
          <nav className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#526274]" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-[#016FED]">Home</Link>
            <ChevronRight size={12} />
            <span className="text-[#0B2239]">Legal</span>
          </nav>
          <p className="premium-eyebrow mt-8">Legal</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#0B2239] md:text-5xl">{title}</h1>
          <p className="mt-4 rounded-xl border border-[#B45309]/25 bg-[#B45309]/[0.06] px-4 py-3 text-sm font-medium text-[#30465C]">
            Placeholder — replace with reviewed legal copy before launch.
          </p>
          <div className="mt-8 space-y-4 text-[15px] leading-[1.8] text-[#30465C]">{children}</div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-[rgba(11,34,57,0.1)] pt-6">
            <Link href="/legal/privacy" className="text-sm font-bold text-[#016FED]">Privacy Policy</Link>
            <Link href="/legal/terms" className="text-sm font-bold text-[#016FED]">Terms of Use</Link>
            <Link href="/legal/dpdp" className="text-sm font-bold text-[#016FED]">DPDP & data residency</Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
