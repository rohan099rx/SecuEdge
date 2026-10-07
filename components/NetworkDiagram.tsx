/**
 * Deployment topology diagram (SVG) — the "vendor diagram" enterprise sites
 * carry: Internet → Frontier at the edge → HQ / branches / remote users.
 * Light-canvas line-work, one blue, animated traffic dashes (CSS,
 * reduced-motion safe via .diagram-flow rules in globals.css-in-file style).
 */
export function NetworkDiagram() {
  return (
    <div className="card overflow-hidden">
      <style>{`
        .flow { stroke-dasharray: 6 8; animation: flowdash 1.6s linear infinite; }
        .flow-slow { stroke-dasharray: 4 10; animation: flowdash 2.6s linear infinite; }
        @keyframes flowdash { to { stroke-dashoffset: -28; } }
        @media (prefers-reduced-motion: reduce) { .flow, .flow-slow { animation: none; } }
      `}</style>
      <svg viewBox="0 0 960 460" className="w-full" role="img" aria-label="SecuEdge Frontier deployment: internet traffic inspected at the edge, protecting headquarters, branch offices and remote users">
        {/* ——— Internet zone ——— */}
        <g>
          <rect x="30" y="26" width="900" height="86" rx="10" fill="#F5F7FA" stroke="#E3E8F0" />
          <text x="52" y="52" fill="#6B7A93" fontSize="11" fontFamily="ui-monospace, Menlo, monospace" letterSpacing="2">INTERNET</text>
          {/* cloud */}
          <g transform="translate(430, 44)">
            <path d="M25 42a14 14 0 0 1 2-27.8A18 18 0 0 1 61.5 10 13 13 0 0 1 75 42z" fill="#fff" stroke="#CBD5E4" strokeWidth="1.6" />
          </g>
          {/* threat markers */}
          <g fontSize="11" fontFamily="Inter, sans-serif">
            <g transform="translate(200, 56)">
              <circle r="11" fill="#FDF0F0" stroke="#D9323B" strokeWidth="1.4" />
              <path d="M-3.5 -3.5l7 7M3.5 -3.5l-7 7" stroke="#D9323B" strokeWidth="1.6" strokeLinecap="round" />
              <text x="18" y="4" fill="#D9323B">Malware</text>
            </g>
            <g transform="translate(700, 56)">
              <circle r="11" fill="#FDF0F0" stroke="#D9323B" strokeWidth="1.4" />
              <path d="M-3.5 -3.5l7 7M3.5 -3.5l-7 7" stroke="#D9323B" strokeWidth="1.6" strokeLinecap="round" />
              <text x="18" y="4" fill="#D9323B">Phishing</text>
            </g>
          </g>
        </g>

        {/* traffic down to Frontier */}
        <line x1="480" y1="112" x2="480" y2="176" stroke="#94A7C2" strokeWidth="1.6" className="flow" />
        {/* blocked threat attempts */}
        <path d="M211 68 C 300 120, 380 150, 448 186" stroke="#D9323B" strokeWidth="1.3" fill="none" className="flow-slow" opacity="0.55" />
        <path d="M700 68 C 620 120, 560 150, 512 186" stroke="#D9323B" strokeWidth="1.3" fill="none" className="flow-slow" opacity="0.55" />
        <g transform="translate(447, 182)">
          <circle r="9" fill="#fff" stroke="#D9323B" strokeWidth="1.5" />
          <path d="M-3 -3l6 6M3 -3l-6 6" stroke="#D9323B" strokeWidth="1.6" strokeLinecap="round" />
        </g>
        <g transform="translate(513, 182)">
          <circle r="9" fill="#fff" stroke="#D9323B" strokeWidth="1.5" />
          <path d="M-3 -3l6 6M3 -3l-6 6" stroke="#D9323B" strokeWidth="1.6" strokeLinecap="round" />
        </g>

        {/* ——— Frontier at the edge ——— */}
        <g transform="translate(370, 196)">
          <rect width="220" height="64" rx="12" fill="#081226" stroke="#016FED" strokeWidth="1.6" />
          <rect x="0.8" y="0.8" width="218.4" height="1.6" rx="0.8" fill="rgba(255,255,255,0.14)" />
          <g transform="translate(20, 18)">
            <path d="M14 0l14 5v9c0 8.4-5.7 16-14 18C5.7 30 0 22.4 0 14V5l14-5z" fill="none" stroke="#3AA5FF" strokeWidth="1.8" transform="scale(0.85)" />
            <path d="M8 12l4 4 8-8" stroke="#22D3C5" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="scale(0.85)" />
          </g>
          <text x="56" y="28" fill="#FFFFFF" fontSize="15" fontWeight="600" fontFamily="Inter, sans-serif">SecuEdge Frontier</text>
          <text x="56" y="46" fill="#7d90ad" fontSize="11" fontFamily="Inter, sans-serif">Inspecting all traffic at the edge</text>
          {/* status LEDs */}
          <circle cx="196" cy="20" r="3" fill="#35d399" />
          <circle cx="196" cy="34" r="3" fill="#3AA5FF" />
        </g>

        {/* clean traffic down */}
        <line x1="480" y1="260" x2="480" y2="308" stroke="#0FA895" strokeWidth="1.8" className="flow" />
        <g transform="translate(480, 284)">
          <circle r="9" fill="#fff" stroke="#0FA895" strokeWidth="1.5" />
          <path d="M-3.5 0l2.5 2.5 5-5" stroke="#0FA895" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* branches to protected sites */}
        <path d="M480 308 C 480 330, 200 322, 165 348" stroke="#94A7C2" strokeWidth="1.4" fill="none" className="flow-slow" />
        <path d="M480 308 L 480 348" stroke="#94A7C2" strokeWidth="1.4" className="flow-slow" />
        <path d="M480 308 C 480 330, 760 322, 795 348" stroke="#94A7C2" strokeWidth="1.4" fill="none" className="flow-slow" />

        {/* ——— Protected zone ——— */}
        <g fontFamily="Inter, sans-serif">
          {/* HQ */}
          <g transform="translate(75, 348)">
            <rect width="180" height="78" rx="10" fill="#fff" stroke="#E3E8F0" />
            <g transform="translate(18, 22)" stroke="#0166CC" strokeWidth="1.7" fill="none" strokeLinecap="round">
              <rect width="26" height="32" rx="2.5" />
              <path d="M7 8h.01M13 8h.01M19 8h.01M7 14h.01M13 14h.01M19 14h.01M10 32v-7h6v7" />
            </g>
            <text x="58" y="34" fill="#0B1B33" fontSize="14" fontWeight="600">Headquarters</text>
            <text x="58" y="52" fill="#6B7A93" fontSize="11">LAN · VLANs · servers</text>
          </g>
          {/* Branch */}
          <g transform="translate(390, 348)">
            <rect width="180" height="78" rx="10" fill="#fff" stroke="#E3E8F0" />
            <g transform="translate(18, 24)" stroke="#0166CC" strokeWidth="1.7" fill="none" strokeLinecap="round">
              <rect width="28" height="20" rx="2.5" />
              <path d="M4 26h20M9 20v6M19 20v6" />
            </g>
            <text x="58" y="34" fill="#0B1B33" fontSize="14" fontWeight="600">Branch offices</text>
            <text x="58" y="52" fill="#6B7A93" fontSize="11">Site-to-site VPN · SD-WAN</text>
          </g>
          {/* Remote */}
          <g transform="translate(705, 348)">
            <rect width="180" height="78" rx="10" fill="#fff" stroke="#E3E8F0" />
            <g transform="translate(18, 22)" stroke="#0166CC" strokeWidth="1.7" fill="none" strokeLinecap="round">
              <rect width="22" height="32" rx="3" />
              <path d="M11 28h.01" />
            </g>
            <text x="52" y="34" fill="#0B1B33" fontSize="14" fontWeight="600">Remote users</text>
            <text x="52" y="52" fill="#6B7A93" fontSize="11">Remote-access VPN · MFA</text>
          </g>
        </g>
      </svg>
    </div>
  );
}
