import { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`container-x ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  center = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="display-2 mt-3">{title}</h2>
      {lead ? <p className="mt-5 text-lg leading-relaxed text-muted">{lead}</p> : null}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`card p-6 ${className}`}>{children}</div>;
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-hair bg-bg-raised px-3 py-1 text-xs font-medium text-muted">
      {children}
    </span>
  );
}

export function TechLabel({ children }: { children: ReactNode }) {
  return <span className="tech-label">{children}</span>;
}

export function StatusPill({
  children,
  tone = "online",
}: {
  children: ReactNode;
  tone?: "online" | "warning" | "critical" | "neutral";
}) {
  const toneMap = {
    online: "status-pill status-pill--online",
    warning: "status-pill status-pill--warning",
    critical: "status-pill status-pill--critical",
    neutral: "status-pill status-pill--neutral",
  } as const;

  return <span className={toneMap[tone]}>{children}</span>;
}

export function SpecRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="spec-row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export function ProductCard({
  name,
  tag,
  summary,
  meta,
}: {
  name: string;
  tag: string;
  summary: string;
  meta: string[];
}) {
  return (
    <article className="product-card">
      <div className="product-card__header">
        <TechLabel>{tag}</TechLabel>
        <StatusPill tone="warning">Specifications pending</StatusPill>
      </div>
      <h3>{name}</h3>
      <p>{summary}</p>
      <div className="product-card__meta">
        {meta.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </article>
  );
}

/** Small status dot used across the security-console components. */
export function Dot({ tone = "green" }: { tone?: "green" | "amber" | "red" | "dim" }) {
  const map = {
    green: "bg-status-green",
    amber: "bg-status-amber",
    red: "bg-status-red",
    dim: "bg-dim",
  } as const;
  return <span className={`inline-block h-2 w-2 rounded-full ${map[tone]}`} aria-hidden />;
}
