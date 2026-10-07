"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { FirewallGatewayScene } from "@/components/FirewallGatewayScene";
import { CountUp, Parallax, Reveal } from "@/components/motion";

const STATES = [
  { name: "Protect", color: "#080b12", detail: "The edge is defined." },
  { name: "Detect", color: "#0b1c38", detail: "Signals become visible." },
  { name: "Analyze", color: "#0755b4", detail: "Context informs the decision." },
  { name: "Respond", color: "#087d8d", detail: "The network stays moving." },
];

function TrafficVisual() {
  return (
    <div className="traffic-visual">
      <div className="traffic-visual__top"><span>LIVE TRAFFIC ANALYSIS</span><b><i /> STREAMING</b></div>
      <div className="traffic-visual__chart">
        <span className="chart-axis chart-axis--one" /><span className="chart-axis chart-axis--two" />
        <svg viewBox="0 0 520 170" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 135 C44 122 55 148 91 106 S139 86 169 110 S219 135 244 72 S282 88 311 62 S352 35 382 75 S429 116 454 71 S491 28 520 44" />
          <path className="traffic-visual__threat-line" d="M0 145 C55 143 78 129 122 138 S176 124 220 136 S282 122 331 139 S402 126 457 140 S498 126 520 132" />
        </svg>
        <div className="traffic-visual__marker traffic-visual__marker--one">ANOMALY <b>02:14:08</b></div>
        <div className="traffic-visual__marker traffic-visual__marker--two">BLOCKED <b>02:14:22</b></div>
      </div>
      <div className="traffic-visual__rows">
        <div><span className="signal signal--blue" /><b>Encrypted traffic</b><em>Normal</em><strong>84.2%</strong></div>
        <div><span className="signal signal--amber" /><b>Unusual DNS request</b><em>Investigating</em><strong>12 events</strong></div>
        <div><span className="signal signal--red" /><b>Known threat signature</b><em>Blocked</em><strong>04 events</strong></div>
      </div>
    </div>
  );
}

function ControlCenterVisual() {
  return (
    <div className="control-visual">
      <div className="control-visual__bar"><span>SECUEDGE CONTROL CENTER</span><b>● 24 NETWORKS ONLINE</b></div>
      <div className="control-visual__body">
        <div className="control-visual__rail"><i /><i /><i /><i /><i /></div>
        <div className="control-visual__map">
          <span className="control-pip control-pip--one" /><span className="control-pip control-pip--two" /><span className="control-pip control-pip--three" />
          <span className="control-link control-link--one" /><span className="control-link control-link--two" /><span className="control-link control-link--three" />
          <div className="control-visual__hub">S<span>CORE</span></div>
        </div>
        <div className="control-visual__side"><small>POLICIES</small><b>128</b><hr /><small>EVENTS TODAY</small><b>1,842</b><hr /><small>HEALTH</small><strong>GOOD</strong></div>
      </div>
    </div>
  );
}

export function FeatureJourney() {
  const transitionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: transitionRef, offset: ["start start", "end end"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-4, 10]);
  const [state, setState] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (value) => setState(Math.min(3, Math.floor(value * 4))));

  return (
    <div className="feature-journey">
      <section className="feature-section feature-section--firewall">
        <Parallax distance={80} className="feature-section__backdrop"><span className="feature-backdrop-grid" /></Parallax>
        <div className="container-wide feature-section__layout feature-section__layout--split">
          <Reveal className="feature-section__copy"><p className="eyebrow">01 / Next-generation firewall</p><h2>Make the edge a decision, not a blind spot.</h2><p>Frontier inspects traffic at the boundary, applies policy in layers, and protects every device behind it without making the network harder to run.</p><div className="feature-points"><span><b>05</b> security layers</span><span><b>01</b> clear policy path</span><span><b>24/7</b> edge protection</span></div><Link href="/frontier" className="text-link">Explore Frontier <span aria-hidden>→</span></Link></Reveal>
          <Reveal delay={0.1} className="feature-section__visual feature-section__visual--gateway"><FirewallGatewayScene /></Reveal>
        </div>
      </section>

      <section className="feature-section feature-section--detection">
        <Parallax distance={110} className="feature-section__backdrop feature-section__backdrop--scan"><span /><span /><span /></Parallax>
        <div className="container-wide feature-section__layout feature-section__layout--reverse">
          <Reveal className="feature-section__visual feature-section__visual--dashboard"><TrafficVisual /></Reveal>
          <Reveal delay={0.1} className="feature-section__copy"><p className="eyebrow">02 / Intelligent threat detection</p><h2>See the signal before it becomes an incident.</h2><p>Continuous inspection turns raw network traffic into useful context: anomalies surface early, threats are identified precisely, and alerts stay actionable.</p><div className="feature-points"><span><b>12.1M+</b> URLs evaluated</span><span><b>03</b> response paths</span><span><b>0</b> noisy dashboards</span></div><Link href="/frontier/capabilities" className="text-link">View detection technology <span aria-hidden>→</span></Link></Reveal>
        </div>
      </section>

      <section className="feature-section feature-section--management">
        <Parallax distance={90} className="feature-section__backdrop feature-section__backdrop--nodes"><span /><span /><span /><span /></Parallax>
        <div className="container-wide feature-section__layout feature-section__layout--split">
          <Reveal className="feature-section__copy"><p className="eyebrow">03 / Centralized security management</p><h2>One control center for every network you own.</h2><p>Bring appliances, policies, users, and events into one operating view. Keep teams aligned from the first branch to the most complex enterprise site.</p><div className="feature-points"><span><b>24</b> networks online</span><span><b>128</b> active policies</span><span><b>01</b> source of truth</span></div><Link href="/frontier/dual-mode" className="text-link">See the operating model <span aria-hidden>→</span></Link></Reveal>
          <Reveal delay={0.1} className="feature-section__visual feature-section__visual--dashboard"><ControlCenterVisual /></Reveal>
        </div>
      </section>

      <section className="architecture-transition" ref={transitionRef}>
        <motion.div className="architecture-transition__ground" style={{ backgroundColor: useTransform(scrollYProgress, [0, 0.33, 0.66, 1], STATES.map((item) => item.color)) }} />
        <div className="architecture-transition__content">
          <div className="architecture-transition__state"><span>SECURITY ARCHITECTURE / 0{state + 1}</span><strong>{STATES[state].name}</strong><p>{STATES[state].detail}</p></div>
          <motion.div className="architecture-transition__gateway" style={{ rotate }}>
            <FirewallGatewayScene />
          </motion.div>
          <div className="architecture-transition__progress">{STATES.map((item, index) => <span key={item.name} className={index <= state ? "is-active" : ""}><i />{item.name}</span>)}</div>
        </div>
      </section>

      <section className="story-section">
        <div className="container-wide story-section__inner">
          <p className="eyebrow">The SecuEdge point of view</p>
          <div className="story-lines"><Reveal><span>Networks should feel</span></Reveal><Reveal delay={0.06}><span className="story-lines__accent">safer.</span></Reveal><Reveal delay={0.12}><span>Threats should feel</span></Reveal><Reveal delay={0.18}><span className="story-lines__accent">understood.</span></Reveal><Reveal delay={0.24}><span>Security should feel</span></Reveal><Reveal delay={0.3}><span className="story-lines__accent">manageable.</span></Reveal></div>
          <p className="story-section__close">That is the work: make the right decision visible, then make it easy to repeat.</p>
        </div>
      </section>

      <section className="proof-section">
        <div className="container-wide proof-section__layout">
          <div><p className="eyebrow">A clearer measure of protection</p><h2>Built for the networks behind the numbers.</h2><p>Every metric represents a team that can see more clearly and respond with confidence.</p></div>
          <div className="proof-stats"><div><strong><CountUp to={12400} suffix="+" /></strong><span>Protected devices</span></div><div><strong><CountUp to={891000} suffix="+" /></strong><span>Threats detected</span></div><div><strong><CountUp to={240} suffix="+" /></strong><span>Networks secured</span></div></div>
          <div className="proof-gateway"><FirewallGatewayScene /></div>
        </div>
      </section>
    </div>
  );
}
