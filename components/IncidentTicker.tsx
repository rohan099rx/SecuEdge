const INCIDENTS = [
  "Gartner: up to 99% of firewall breaches are caused by misconfiguration",
  "Thousands of firewalls exposed in a single configuration leak",
  "A hospital network held hostage for days by ransomware",
  "A broker breach leaves millions of records exposed",
  "The danger isn’t the hacker — it’s the complexity",
];

/** Edge-to-edge marquee of real-world incidents (deck slide 03). CSS-only animation. */
export function IncidentTicker() {
  const items = [...INCIDENTS, ...INCIDENTS];
  return (
    <div
      className="relative overflow-hidden border-y border-hair bg-bg-raised py-3"
      aria-label="Recent firewall incident headlines"
    >
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap pr-8">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-3 text-sm text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-status-red" aria-hidden />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
