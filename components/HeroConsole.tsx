/**
 * Dark product panel — the SecuEdge console as a "screenshot" framed on the
 * light page (Apple product-page move). Self-contained on-dark palette; do
 * not use light-theme tokens in here.
 */
const ENGINES = [
  ["IDS", "Deep packet inspection"],
  ["IPS", "Auto-blocks threats"],
  ["Antivirus", "Quarantines"],
  ["DNS filtering", "Malware + phishing"],
  ["Firewall", "Strict allowlist"],
] as const;

export function HeroConsole() {
  return (
    <div className="panel-product overflow-hidden text-left">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-sm font-medium text-white/90">SecuEdge Console — Security</span>
        </div>
        <span className="flex items-center gap-2 text-xs text-[#35d399]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#35d399] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#35d399]" />
          </span>
          Maximum · Active
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <p className="text-xs text-[#7d90ad]">
          Choose a protection level — Frontier configures the entire stack automatically.
        </p>

        {/* Level selector */}
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {[
            ["Transparent", "Off"],
            ["Balanced", "Detect"],
            ["Maximum", "Enforce"],
          ].map(([l, s], i) => (
            <div
              key={l}
              className={`rounded-lg border px-3 py-3 text-center ${
                i === 2
                  ? "border-[#3AA5FF]/60 bg-[#016FED]/25 shadow-[0_0_24px_-6px_rgba(58,165,255,0.55)]"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <span className={`block text-sm font-semibold ${i === 2 ? "text-white" : "text-[#9db1cc]"}`}>{l}</span>
              <span className="mt-0.5 block text-[10px] uppercase tracking-wider text-[#66799a]">{s}</span>
            </div>
          ))}
        </div>

        {/* Engine grid */}
        <div className="mt-5 grid gap-2">
          {ENGINES.map(([name, desc]) => (
            <div
              key={name}
              className="flex items-center justify-between rounded-md border border-white/[0.07] bg-white/[0.04] px-4 py-2.5"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#35d399]/40 bg-[#35d399]/10">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#35d399" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <span className="text-sm font-medium text-white/90">{name}</span>
              </div>
              <span className="text-xs text-[#8b9db8]">{desc}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-xs text-[#66799a]">Five engines · one choice · correct by default</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#66799a]">v4.2 · SE100P</span>
        </div>
      </div>
    </div>
  );
}
