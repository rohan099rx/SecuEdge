/**
 * Concept illustration for the SE-series appliance family. It avoids depicting
 * a fixed port layout while model-specific hardware specifications are pending.
 */
export function ApplianceArt({ label = "SE100P" }: { label?: string }) {
  return (
    <div className="relative mx-auto max-w-3xl">
      {/* soft neutral ground shadow (sits on the light page) */}
      <div
        className="absolute inset-x-12 -bottom-3 h-8 rounded-[50%] bg-[#0B1B33]/[0.16] blur-xl"
        aria-hidden
      />
      <svg viewBox="0 0 760 150" className="relative w-full" role="img" aria-label={`SecuEdge Frontier ${label} appliance`}>
        <defs>
          <linearGradient id="chassis" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1B2B45" />
            <stop offset="0.5" stopColor="#101E36" />
            <stop offset="1" stopColor="#0B1628" />
          </linearGradient>
          <linearGradient id="bezel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2A3F63" />
            <stop offset="1" stopColor="#16233C" />
          </linearGradient>
          <linearGradient id="vent" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#060D1A" />
            <stop offset="1" stopColor="#0A1424" />
          </linearGradient>
        </defs>

        {/* chassis */}
        <rect x="10" y="18" width="740" height="114" rx="12" fill="url(#chassis)" stroke="rgba(120,170,235,.28)" />
        {/* top light edge */}
        <rect x="10" y="18" width="740" height="2" rx="1" fill="rgba(160,200,255,.28)" />

        {/* left bezel with mark + model */}
        <rect x="26" y="32" width="170" height="86" rx="8" fill="url(#bezel)" stroke="rgba(120,170,235,.2)" />
        <circle cx="58" cy="62" r="14" fill="none" stroke="#3AA5FF" strokeWidth="2.5" opacity=".9" />
        <circle cx="58" cy="62" r="5" fill="#22D3C5" opacity=".9" />
        <text x="82" y="59" fill="#EAF1FB" fontFamily="Inter, system-ui, sans-serif" fontSize="15" fontWeight="700">
          SecuEdge
        </text>
        <text x="82" y="76" fill="#94A7C2" fontFamily="Inter, system-ui, sans-serif" fontSize="10" letterSpacing="1.5">
          FRONTIER
        </text>
        <text x="112" y="106" fill="#3AA5FF" fontFamily="Inter, system-ui, sans-serif" fontSize="13" fontWeight="600" textAnchor="middle">
          {label}
        </text>

        {/* vents */}
        {Array.from({ length: 13 }).map((_, i) => (
          <rect key={i} x={216 + i * 14} y="38" width="7" height="74" rx="3.5" fill="url(#vent)" stroke="rgba(120,170,235,.10)" />
        ))}

        {/* abstract interface panel, intentionally without a port count */}
        <rect x="414" y="48" width="264" height="54" rx="6" fill="#08111e" stroke="rgba(120,170,235,.24)" />
        <path d="M434 62h222M434 72h164M434 82h196M434 92h126" stroke="rgba(120,170,235,.12)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="650" cy="116" r="3" fill="#22D3C5" opacity=".8" />
        <circle cx="662" cy="116" r="3" fill="#3AA5FF" opacity=".8" />

        {/* status cluster */}
        <g fontFamily="Inter, system-ui, sans-serif" fontSize="8" fill="#6E83A0">
          <circle cx="712" cy="52" r="3.4" fill="#16A34A" />
          <text x="712" y="66" textAnchor="middle">PWR</text>
          <circle cx="712" cy="80" r="3.4" fill="#3AA5FF" />
          <text x="712" y="94" textAnchor="middle">SEC</text>
        </g>

        {/* rack ears */}
        <rect x="0" y="30" width="12" height="90" rx="3" fill="#101E36" stroke="rgba(120,170,235,.22)" />
        <rect x="748" y="30" width="12" height="90" rx="3" fill="#101E36" stroke="rgba(120,170,235,.22)" />
        <circle cx="6" cy="52" r="2.5" fill="#060D1A" />
        <circle cx="6" cy="98" r="2.5" fill="#060D1A" />
        <circle cx="754" cy="52" r="2.5" fill="#060D1A" />
        <circle cx="754" cy="98" r="2.5" fill="#060D1A" />
      </svg>
    </div>
  );
}
