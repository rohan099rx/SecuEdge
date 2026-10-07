/**
 * Animated security radar — the hero centerpiece. Pure SVG + CSS keyframes
 * (no JS, no WebGL): concentric rings, a rotating sweep beam, threat blips
 * that appear and get neutralized, and the SecuEdge shield at the core.
 * All motion pauses under prefers-reduced-motion.
 */

/** One threat blip: red ping → intercepted → teal check flash. */
function Blip({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <g transform={`translate(${x}, ${y})`} style={{ ["--d" as string]: `${delay}s` }}>
      {/* threat appears */}
      <circle className="blip-threat" r="5" fill="#FF5A60" />
      <circle className="blip-threat-ring" r="5" fill="none" stroke="#FF5A60" strokeWidth="1.5" />
      {/* neutralized flash */}
      <circle className="blip-clear-ring" r="7" fill="none" stroke="#22D3C5" strokeWidth="1.5" />
      <path
        className="blip-clear-check"
        d="M-4 0l3 3 6-6"
        fill="none"
        stroke="#22D3C5"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

export function RadarScene() {
  return (
    <div className="radar-scene relative" aria-hidden>
      <style>{`
        .radar-scene .sweep { transform-origin: 400px 400px; animation: radar-sweep 7s linear infinite; }
        @keyframes radar-sweep { to { transform: rotate(360deg); } }

        .radar-scene .ring-pulse { transform-origin: 400px 400px; animation: ring-pulse 4.5s ease-out infinite; opacity: 0; }
        @keyframes ring-pulse {
          0% { transform: scale(0.28); opacity: 0.55; }
          80% { transform: scale(1.02); opacity: 0; }
          100% { opacity: 0; }
        }

        .radar-scene .core-glow { animation: core-glow 3.2s ease-in-out infinite; }
        @keyframes core-glow { 0%,100% { opacity: 0.55; } 50% { opacity: 1; } }

        /* Blip choreography — 14s loop, staggered via --d */
        .radar-scene .blip-threat { opacity: 0; animation: blip-threat 14s var(--d) infinite; }
        @keyframes blip-threat {
          0%, 2% { opacity: 0; }
          4% { opacity: 1; }
          10% { opacity: 1; }
          13% { opacity: 0; }
          100% { opacity: 0; }
        }
        .radar-scene .blip-threat-ring { opacity: 0; transform-box: fill-box; transform-origin: center; animation: blip-threat-ring 14s var(--d) infinite; }
        @keyframes blip-threat-ring {
          0%, 3% { opacity: 0; transform: scale(1); }
          5% { opacity: 0.9; transform: scale(1); }
          11% { opacity: 0; transform: scale(3.2); }
          100% { opacity: 0; }
        }
        .blip-clear-ring { opacity: 0; transform-box: fill-box; transform-origin: center; animation: blip-clear-ring 14s var(--d) infinite; }
        @keyframes blip-clear-ring {
          0%, 11% { opacity: 0; transform: scale(0.4); }
          13% { opacity: 1; transform: scale(1); }
          20% { opacity: 0.9; }
          24% { opacity: 0; transform: scale(1.6); }
          100% { opacity: 0; }
        }
        .blip-clear-check { opacity: 0; animation: blip-clear-check 14s var(--d) infinite; }
        @keyframes blip-clear-check {
          0%, 12% { opacity: 0; }
          14% { opacity: 1; }
          22% { opacity: 1; }
          26% { opacity: 0; }
          100% { opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .radar-scene .sweep, .radar-scene .ring-pulse, .radar-scene .core-glow,
          .radar-scene .blip-threat, .radar-scene .blip-threat-ring,
          .radar-scene .blip-clear-ring, .radar-scene .blip-clear-check { animation: none; }
          .radar-scene .blip-threat { opacity: 0; }
          .radar-scene .blip-clear-check { opacity: 0.9; }
          .radar-scene .blip-clear-ring { opacity: 0.7; transform: scale(1); }
        }
      `}</style>

      <svg viewBox="0 0 800 800" className="h-full w-full">
        <defs>
          {/* sweep beam gradient */}
          <linearGradient id="sweepGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#3AA5FF" stopOpacity="0" />
            <stop offset="0.75" stopColor="#3AA5FF" stopOpacity="0.05" />
            <stop offset="1" stopColor="#3AA5FF" stopOpacity="0.35" />
          </linearGradient>
          <radialGradient id="coreGrad" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#016FED" stopOpacity="0.5" />
            <stop offset="1" stopColor="#016FED" stopOpacity="0" />
          </radialGradient>
          {/* fine dot grid */}
          <pattern id="radarDots" width="26" height="26" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="rgba(122,165,230,0.14)" />
          </pattern>
          <radialGradient id="dotMask" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0.55" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
          <mask id="dotFade">
            <circle cx="400" cy="400" r="400" fill="url(#dotMask)" />
          </mask>
        </defs>

        {/* ambient dot grid */}
        <circle cx="400" cy="400" r="392" fill="url(#radarDots)" mask="url(#dotFade)" />

        {/* concentric rings */}
        {[110, 195, 280, 365].map((r, i) => (
          <circle
            key={r}
            cx="400"
            cy="400"
            r={r}
            fill="none"
            stroke="rgba(122,165,230,0.28)"
            strokeWidth={i === 3 ? 1 : 1.2}
            strokeDasharray={i === 3 ? "3 7" : undefined}
          />
        ))}
        {/* crosshair */}
        <path d="M400 40V760M40 400H760" stroke="rgba(122,165,230,0.12)" strokeWidth="1" />
        {/* degree ticks on outer ring */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * 15 * Math.PI) / 180;
          const x1 = 400 + Math.cos(a) * 358;
          const y1 = 400 + Math.sin(a) * 358;
          const x2 = 400 + Math.cos(a) * 372;
          const y2 = 400 + Math.sin(a) * 372;
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(122,165,230,0.3)" strokeWidth="1.2" />
          );
        })}

        {/* expanding pulse ring */}
        <circle className="ring-pulse" cx="400" cy="400" r="365" fill="none" stroke="#3AA5FF" strokeWidth="1.4" />

        {/* rotating sweep beam (60° wedge) */}
        <g className="sweep">
          <path d="M400 400 L765 400 A365 365 0 0 0 582.5 83.9 Z" fill="url(#sweepGrad)" />
          <line x1="400" y1="400" x2="765" y2="400" stroke="#3AA5FF" strokeOpacity="0.5" strokeWidth="1.4" />
        </g>

        {/* threat blips — staggered around the field */}
        <Blip x={588} y={253} delay={0} />
        <Blip x={251} y={318} delay={3.5} />
        <Blip x={520} y={568} delay={7} />
        <Blip x={303} y={528} delay={10.5} />

        {/* core */}
        <circle className="core-glow" cx="400" cy="400" r="86" fill="url(#coreGrad)" />
        <circle cx="400" cy="400" r="46" fill="#0B1424" stroke="rgba(122,165,230,0.4)" strokeWidth="1.4" />
        <g transform="translate(400, 400)">
          <path
            d="M0 -24 L19 -16.5 V-2.5 C19 10.5 11 21 0 24 C-11 21 -19 10.5 -19 -2.5 V-16.5 Z"
            fill="none"
            stroke="#3AA5FF"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M-8 -1l5.5 5.5L9 -7" fill="none" stroke="#22D3C5" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}
