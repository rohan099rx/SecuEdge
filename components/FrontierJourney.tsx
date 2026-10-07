"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDown, ArrowRight, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { supportsWebGL } from "@/lib/3d/performance";

const FrontierJourneyCanvas = dynamic(
  () => import("@/components/FrontierJourneyCanvas").then((module) => module.FrontierJourneyCanvas),
  { ssr: false, loading: () => <div className="frontier-journey__canvas-loading" aria-hidden="true" /> },
);

const steps = [
  {
    eyebrow: "SECUREDGE FRONTIER · NEXT-GENERATION FIREWALL",
    title: "Security at the edge.",
    accent: "Clarity in every rule.",
    body: "A next-generation firewall platform built to secure networks, applications, users and traffic from the edge to the core.",
  },
  {
    eyebrow: "01 / INTERNET → EDGE",
    title: "Traffic arrives.",
    accent: "The boundary is clear.",
    body: "Internet and WAN traffic reaches one defined security boundary before it enters the protected network.",
  },
  {
    eyebrow: "02 / POLICY + INSPECTION",
    title: "Every flow meets policy.",
    accent: "Allow. Inspect. Block.",
    body: "Frontier applies network policy and inspection controls at the edge. The diagram shows an illustrative traffic decision.",
  },
  {
    eyebrow: "03 / PROTECTED NETWORK",
    title: "The right traffic continues.",
    accent: "Zones stay organized.",
    body: "Traffic allowed by policy moves into the network. Routing and segmentation help teams define where it can go.",
  },
  {
    eyebrow: "04 / VISIBILITY",
    title: "Activity stays visible.",
    accent: "Review what matters.",
    body: "Frontier provides firewall activity and system events for network operations. This visual is a concept, not live appliance data.",
  },
] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function FrontierJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const [activeStep, setActiveStep] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneInView, setSceneInView] = useState(false);
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(motionQuery.matches);
    updateMotionPreference();
    motionQuery.addEventListener?.("change", updateMotionPreference);
    setWebgl(supportsWebGL());

    const section = sectionRef.current;
    if (!section) return () => motionQuery.removeEventListener?.("change", updateMotionPreference);

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setSceneReady(true);
      setSceneInView(entry.isIntersecting);
    }, { rootMargin: "180px 0px" });
    observer.observe(section);

    let frame = 0;
    const updateScrollProgress = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const currentSection = sectionRef.current;
        if (!currentSection) return;
        const distance = Math.max(1, currentSection.offsetHeight - window.innerHeight);
        const progress = reducedMotion ? 0 : clamp(-currentSection.getBoundingClientRect().top / distance, 0, 1);
        progressRef.current = progress;
        currentSection.style.setProperty("--journey-progress", String(progress));
        currentSection.style.setProperty("--hero-progress", String(clamp(progress * 2.5, 0, 1)));
        currentSection.style.setProperty("--frontier-progress", String(clamp((progress - 0.12) * 1.7, 0, 1)));
        const nextStep = Math.min(steps.length - 1, Math.floor(progress * steps.length));
        setActiveStep((current) => current === nextStep ? current : nextStep);
      });
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress, { passive: true });
    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
      motionQuery.removeEventListener?.("change", updateMotionPreference);
    };
  }, [reducedMotion]);

  const active = steps[activeStep];

  return (
    <section
      ref={sectionRef}
      className={`frontier-journey${reducedMotion ? " frontier-journey--reduced" : ""}`}
      data-in-view={sceneInView}
      aria-label="SecuEdge Frontier traffic journey"
      style={{ "--journey-progress": 0 } as React.CSSProperties}
    >
      <div className="frontier-journey__sticky" data-step={activeStep}>
        <div className="frontier-journey__grid" aria-hidden="true" />
        <div className="frontier-journey__network-lines" aria-hidden="true">
          <svg viewBox="0 0 900 760" preserveAspectRatio="xMidYMid meet">
            <path className="frontier-journey__route frontier-journey__route--in" d="M660 8 C660 140 530 174 555 295" />
            <path className="frontier-journey__route frontier-journey__route--out" d="M570 438 C635 515 560 588 580 752" />
            <circle className="frontier-journey__packet" r="5"><animateMotion dur="4.8s" repeatCount="indefinite" path="M660 8 C660 140 530 174 555 295" /></circle>
            <circle className="frontier-journey__packet frontier-journey__packet--trusted" r="4"><animateMotion dur="5.6s" begin="-2.4s" repeatCount="indefinite" path="M570 438 C635 515 560 588 580 752" /></circle>
            <circle className="frontier-journey__packet frontier-journey__packet--threat" r="4"><animateMotion dur="4.8s" begin="-1.2s" repeatCount="indefinite" path="M660 8 C660 140 530 174 555 295" /></circle>
          </svg>
        </div>

        <div className="frontier-journey__visual" aria-label="Illustrative SecuEdge Frontier appliance and network path">
          {sceneReady && webgl ? <div className="frontier-journey__canvas-host"><FrontierJourneyCanvas progressRef={progressRef} reducedMotion={reducedMotion} active={sceneInView} /></div> : (
            <div className="frontier-journey__static-device" aria-hidden="true">
              <span>SECUREDGE · FRONTIER</span><i /><i /><i /><i /><i /><i /><i /><i />
            </div>
          )}
          <span className="frontier-journey__endpoint frontier-journey__endpoint--internet"><i /> INTERNET / WAN</span>
          <span className="frontier-journey__endpoint frontier-journey__endpoint--firewall"><ShieldCheck size={15} /> FRONTIER NGFW</span>
          <span className="frontier-journey__endpoint frontier-journey__endpoint--network"><i /> NETWORK ZONES</span>
          <span className="frontier-journey__endpoint frontier-journey__endpoint--monitoring"><i /> EVENTS · LOGS</span>
          <div className="frontier-journey__decision" aria-hidden="true" data-step={activeStep}>
            <span>POLICY DECISION</span>
            <strong>{activeStep === 2 ? "THREAT BLOCKED" : activeStep > 2 ? "TRAFFIC ALLOWED" : "INSPECTION READY"}</strong>
          </div>
          <span className="frontier-journey__render-note">Concept hardware · port layout and dimensions illustrative</span>
        </div>

        <div className="frontier-journey__copy" aria-live="polite" aria-atomic="true">
          <p className="foundation-eyebrow"><i className="frontier-journey__live-dot" /> {active.eyebrow}</p>
          {activeStep === 0 ? (
            <h1><span>Security at</span><span>the edge.</span><em>Clarity in every rule.</em></h1>
          ) : (
            <h2 key={active.title}>{active.title}<em>{active.accent}</em></h2>
          )}
          <p className="frontier-journey__body">{active.body}</p>
          {activeStep === 0 ? (
            <div className="foundation-hero__actions">
              <Link href="#products" className="foundation-button">Explore Frontier <ArrowRight size={16} /></Link>
              <Link href="/contact" className="foundation-button foundation-button--outline">Talk to an expert</Link>
            </div>
          ) : activeStep === steps.length - 1 ? (
            <Link href="/frontier/dual-mode" className="frontier-journey__text-link">Explore the Frontier console <ArrowRight size={15} /></Link>
          ) : null}
          <div className="frontier-journey__status"><i /> Frontier NGFW <span>•</span> Quick + Professional Mode <span>•</span> 7 SE models</div>
        </div>

        <div className="frontier-journey__stage-control">
          <div className="frontier-journey__steps" aria-label="Scroll narrative stages">
            {steps.map((step, index) => (
              <span key={step.eyebrow} className={index === activeStep ? "is-active" : index < activeStep ? "is-complete" : ""} aria-current={index === activeStep ? "step" : undefined}>
                <b>0{index + 1}</b><i>{["EDGE", "TRAFFIC", "INSPECT", "NETWORK", "MONITOR"][index]}</i>
              </span>
            ))}
          </div>
          <div className="frontier-journey__scroll-hint"><span>Scroll to follow a packet</span><ArrowDown size={13} /></div>
          <div className="frontier-journey__progress" aria-hidden="true"><span /></div>
        </div>
      </div>
      {reducedMotion ? (
        <ol className="frontier-journey__reduced-list">
          {steps.slice(1).map((step) => <li key={step.eyebrow}><span>{step.eyebrow}</span><strong>{step.title} {step.accent}</strong><p>{step.body}</p></li>)}
        </ol>
      ) : null}
    </section>
  );
}
