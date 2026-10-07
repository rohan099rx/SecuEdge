"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { APPLIANCES } from "@/lib/site";

const formFactors = ["All form factors", "Desktop", "Rack-mount"] as const;
const tiers = ["All deployment bands", "Branch / small office", "Mid-market", "Enterprise"] as const;

export function EcosystemDirectory() {
  const [form, setForm] = useState<(typeof formFactors)[number]>("All form factors");
  const [tier, setTier] = useState<(typeof tiers)[number]>("All deployment bands");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => APPLIANCES.filter((model) => {
    const text = `${model.model} Frontier next-generation firewall ${model.formFactor} ${model.tier} Quick Professional`.toLowerCase();
    return (form === "All form factors" || form === model.formFactor) && (tier === "All deployment bands" || tier === model.tier) && text.includes(query.trim().toLowerCase());
  }), [form, tier, query]);

  return <div className="ecosystem-directory">
    <label className="ecosystem-search"><Search size={17} aria-hidden="true"/><span className="sr-only">Search Frontier models</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search model, form factor or deployment band"/></label>
    <div className="model-directory-filters"><label>Form factor<select value={form} onChange={(event) => setForm(event.target.value as typeof form)}>{formFactors.map((option) => <option key={option}>{option}</option>)}</select></label><label>Deployment band <span className="model-directory-filters__hint">(indicative)</span><select value={tier} onChange={(event) => setTier(event.target.value as typeof tier)}>{tiers.map((option) => <option key={option}>{option}</option>)}</select></label></div>
    <div className="ecosystem-cards frontier-model-catalog">
      {filtered.map((model, index) => <article className="ecosystem-card frontier-model-card" key={model.model}>
        <span className="ecosystem-card__index">SE SERIES / 0{index + 1}</span><span className="ecosystem-card__glyph" aria-hidden="true">{model.formFactor === "Desktop" ? "D" : "P"}</span>
        <p className="ecosystem-card__category">{model.formFactor} · {model.tier} band</p><h2>{model.model}</h2><p className="ecosystem-card__summary">SecuEdge Frontier NGFW appliance</p>
        <div className="frontier-model-card__facts"><span>Two operating modes <strong>Quick + Professional</strong></span><span>Technical specification <strong>Available on request</strong></span></div>
        <Link className="ecosystem-card__link" href={`/products/frontier/${model.model.toLowerCase()}`}>Explore {model.model} <ArrowRight size={15}/></Link>
      </article>)}
      {filtered.length === 0 && <p className="ecosystem-empty">No models match those filters. Adjust the form factor or deployment band.</p>}
    </div>
  </div>;
}
