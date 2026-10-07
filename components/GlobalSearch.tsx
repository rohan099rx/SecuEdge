"use client";

import Link from "next/link";
import { Search, X, ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { FRONTIER_CAPABILITIES } from "@/data/ecosystem";
import { APPLIANCES, INDUSTRIES, SOLUTIONS_NAV } from "@/lib/site";

const pages = [
  {label:"Frontier",detail:"Available product · Next-generation firewall",href:"/frontier",terms:"ngfw firewall appliance security"},
  ...APPLIANCES.map((model)=>({label:model.model,detail:`Frontier · ${model.formFactor} model`,href:`/products/${model.model.toLowerCase()}`,terms:`${model.model} ${model.formFactor} ${model.tier} quick professional`})),
  ...FRONTIER_CAPABILITIES.map((capability)=>({label:capability.name,detail:`Frontier capability · ${capability.group}`,href:"/frontier/capabilities",terms:`${capability.summary} ${capability.details.join(" ")}`})),
  ...SOLUTIONS_NAV.map((solution)=>({label:solution.name,detail:"Solution",href:`/solutions/${solution.slug}`,terms:"deployment architecture network security"})),
  ...INDUSTRIES.map((industry)=>({label:industry.name,detail:"Industry guidance",href:`/industries/${industry.slug}`,terms:"industry solution network security"})),
  {label:"Frontier model catalog",detail:"All available SE-series appliances",href:"/products",terms:"se20 se50 se50p se100p se250p se500p se1000p models"},
  {label:"Compare Frontier models",detail:"Appliance comparison",href:"/products/compare",terms:"se20 se50 se50p se100p se250p se500p se1000p specifications"},
  {label:"Find a model shortlist",detail:"Hardware model finder",href:"/products/recommend",terms:"product finder model selection hardware sizing"},
  {label:"Frontier NGFW architecture",detail:"Network path and inspection",href:"/platform",terms:"network firewall architecture internet policy segmentation"},
  {label:"Security assessment",detail:"Interactive self-assessment",href:"/assessment",terms:"risk scan quiz"},
  {label:"Contact SecuEdge",detail:"Talk to the team",href:"/contact",terms:"demo sales"},
  {label:"Resources",detail:"Guides and articles",href:"/resources",terms:"blog documentation"},
];

export function GlobalSearch(){
  const [open,setOpen]=useState(false);const [query,setQuery]=useState("");const input=useRef<HTMLInputElement>(null);
  useEffect(()=>{if(!open)return;input.current?.focus();const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape")setOpen(false)};window.addEventListener("keydown",onKey);return()=>window.removeEventListener("keydown",onKey)},[open]);
  const results=useMemo(()=>{const q=query.trim().toLowerCase();return pages.filter(page=>!q||`${page.label} ${page.detail} ${page.terms}`.toLowerCase().includes(q)).slice(0,8)},[query]);
  return <><button type="button" className="global-search-trigger" aria-label="Search SecuEdge" onClick={()=>setOpen(true)}><Search size={16}/><span>Search</span></button>{open&&<div className="global-search-backdrop" onMouseDown={(e)=>{if(e.target===e.currentTarget)setOpen(false)}}><section className="global-search-dialog" role="dialog" aria-modal="true" aria-labelledby="global-search-title"><div className="global-search-dialog__head"><div><p className="foundation-eyebrow">SECUREDGE SEARCH</p><h2 id="global-search-title">What are you looking for?</h2></div><button type="button" aria-label="Close search" onClick={()=>setOpen(false)}><X size={19}/></button></div><label className="ecosystem-search"><Search size={17}/><span className="sr-only">Search products and pages</span><input ref={input} value={query} onChange={e=>setQuery(e.target.value)} placeholder="Products, models, capabilities…"/></label><nav className="global-search-results" aria-label="Search results">{results.map((item,index)=><Link key={item.href} href={item.href} onClick={()=>setOpen(false)}><span>0{index+1}</span><strong>{item.label}<small>{item.detail}</small></strong><ArrowUpRight size={15}/></Link>)}{results.length===0&&<p>No results found. Try a product name or capability.</p>}</nav></section></div>}</>;
}
