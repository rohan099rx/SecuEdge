"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { BlogPost } from "@/lib/content/blog";

export function ResourceBrowser({posts}:{posts:Pick<BlogPost,"slug"|"title"|"excerpt"|"category"|"readTime">[]}){
  const categories=["All",...Array.from(new Set(posts.map((p)=>p.category)))];const[category,setCategory]=useState("All");const[query,setQuery]=useState("");
  const visible=useMemo(()=>posts.filter(p=>(category==="All"||category===p.category)&&`${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(query.trim().toLowerCase())),[posts,category,query]);
  return <><label className="ecosystem-search"><Search size={17}/><span className="sr-only">Search resources</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search security guides and resources"/></label><div className="ecosystem-filters" role="group" aria-label="Filter resources">{categories.map(item=><button type="button" key={item} aria-pressed={category===item} onClick={()=>setCategory(item)}>{item}</button>)}</div><div className="resource-browser-grid">{visible.map(post=><Link className="card card-hover group flex h-full flex-col p-7" key={post.slug} href={`/resources/${post.slug}`}><div className="flex items-center gap-3"><span className="rounded-full border border-hair px-3 py-1 text-xs font-medium text-muted">{post.category}</span><span className="text-xs text-dim">{post.readTime}</span></div><h2 className="mt-4 text-xl font-semibold leading-snug text-ink">{post.title}</h2><p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p><span className="mt-6 text-[15px] font-semibold text-brand-link">Read article →</span></Link>)}{visible.length===0&&<p className="ecosystem-empty">No resources match your search.</p>}</div></>;
}
