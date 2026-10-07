"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import raw from "@/lib/content/data/assessment.json";

/**
 * Interactive firewall risk assessment — restored from the old site's
 * assessment tool (questions, scoring, industry threats, recommendations).
 * Unverifiable marketing stats from the original were removed; risk notes
 * are qualitative.
 */

type QA = Record<string, number | null>; // question key -> selected option index

const QUESTIONS = raw.questions as { key: string; question: string; options: string[] }[];

// Qualitative risk notes (original numeric claims were unverifiable)
const RISK_NOTES: Record<string, string> = {
  employeeSize: "As your team grows, so does your attack surface — each employee is a potential entry point.",
  customerData: "Storing customer data without adequate protection raises both breach impact and regulatory exposure.",
  remoteAccess: "Remote work creates additional access points that need proper VPN, MFA and endpoint controls.",
  previousAttack: "Organizations that have been attacked once are frequently targeted again, especially if gaps remain.",
  publicWifi: "Public Wi-Fi exposes company traffic to interception and man-in-the-middle attacks.",
  dedicatedIT: "Without dedicated security ownership, vulnerabilities can go undetected for long periods.",
};

const INDUSTRY_KEY: Record<string, keyof typeof raw.industryThreats> = {
  "eCommerce / Online Store": "ecommerce",
  "SaaS / Technology Company": "saas",
  "Healthcare / Medical": "healthcare",
  "Educational Institution": "education",
  "Financial Services": "financial",
  "Retail / Physical Store": "retail",
  Manufacturing: "manufacturing",
  Other: "default",
};

function computeScore(a: QA): number {
  let t = 5;
  if (a.customerData === 0) t += 1;
  if (a.remoteAccess === 0) t += 1;
  if (a.previousAttack === 0) t += 1.5;
  if (a.publicWifi === 0) t += 1;
  if (a.dedicatedIT === 1) t += 0.5;
  const industry = QUESTIONS[0].options[a.businessType ?? -1];
  if (industry === "Healthcare / Medical" || industry === "Financial Services") t += 1;
  const size = QUESTIONS[1].options[a.employeeSize ?? -1];
  if (size === "51-200 employees" || size === "201+ employees") t += 0.5;
  return Math.min(Math.round(t), 10);
}

export function AssessmentQuiz() {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<"intro" | "quiz" | "results">("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QA>(
    Object.fromEntries(QUESTIONS.map((q) => [q.key, null]))
  );

  const q = QUESTIONS[step];
  const score = useMemo(() => computeScore(answers), [answers]);
  const level = score >= 8 ? "High" : score >= 5 ? "Medium" : "Low";
  const levelColor =
    level === "High" ? "text-status-red" : level === "Medium" ? "text-status-amber" : "text-status-green";
  const narrative = raw.scoring.levels.find((l) => l.level === level)?.narrative ?? "";

  const riskCards = useMemo(() => {
    const cards: { title: string; desc: string }[] = [];
    const rc = raw.riskFactorCards;
    if (answers.customerData === 0) cards.push(rc[0]);
    if (answers.remoteAccess === 0) cards.push(rc[1]);
    if (answers.publicWifi === 0) cards.push(rc[2]);
    if (answers.dedicatedIT === 1) cards.push(rc[3]);
    if (answers.previousAttack === 0) cards.push(rc[4]);
    let filler = 5;
    while (cards.length < 3 && filler < rc.length) cards.push(rc[filler++]);
    return cards;
  }, [answers]);

  const recommendations = useMemo(() => {
    const recs = [raw.recommendations[0]];
    const industry = QUESTIONS[0].options[answers.businessType ?? -1];
    const size = QUESTIONS[1].options[answers.employeeSize ?? -1];
    if (
      industry === "Healthcare / Medical" ||
      industry === "Financial Services" ||
      size === "51-200 employees" ||
      size === "201+ employees"
    )
      recs.push(raw.recommendations[1]);
    if (answers.remoteAccess === 0 || answers.publicWifi === 0) recs.push(raw.recommendations[2]);
    if (answers.customerData === 0) recs.push(raw.recommendations[3]);
    return recs;
  }, [answers]);

  const threats = useMemo(() => {
    const industry = QUESTIONS[0].options[answers.businessType ?? -1];
    return raw.industryThreats[INDUSTRY_KEY[industry] ?? "default"];
  }, [answers]);

  const fade = {
    initial: reduce ? undefined : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    exit: reduce ? undefined : { opacity: 0, y: -12 },
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <div className="mx-auto max-w-2xl">
      <AnimatePresence mode="wait">
        {stage === "intro" ? (
          <motion.div key="intro" {...fade} className="card p-8 sm:p-10">
            <p className="eyebrow">{raw.hero.cardTitle}</p>
            <h2 className="mt-3 text-2xl font-semibold text-ink">{raw.hero.sub}</h2>
            <p className="mt-6 text-sm font-semibold text-ink">What you&rsquo;ll discover:</p>
            <ul className="mt-3 space-y-2">
              {raw.hero.whatYoullDiscover.map((x) => (
                <li key={x} className="flex items-start gap-2.5 text-sm text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" aria-hidden />
                  {x}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button className="btn-primary" onClick={() => setStage("quiz")}>
                {raw.hero.cta}
              </button>
              <span className="text-xs text-dim">{raw.hero.estimatedTime}</span>
            </div>
          </motion.div>
        ) : null}

        {stage === "quiz" ? (
          <motion.div key={`q-${step}`} {...fade} className="card p-8 sm:p-10">
            {/* progress */}
            <div className="flex items-center justify-between text-xs text-dim">
              <span>
                Question {step + 1} of {QUESTIONS.length}
              </span>
              <span className="tabular">{Math.round(((step + 1) / QUESTIONS.length) * 100)}%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-bg-raised">
              <div
                className="h-full rounded-full bg-brand-blue transition-all duration-500"
                style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>

            <h2 className="mt-8 text-xl font-semibold text-ink sm:text-2xl">{q.question}</h2>
            <div className="mt-6 grid gap-2.5">
              {q.options.map((opt, i) => (
                <button
                  key={opt}
                  onClick={() => setAnswers((a) => ({ ...a, [q.key]: i }))}
                  className={`rounded-lg border px-5 py-3.5 text-left text-sm transition ${
                    answers[q.key] === i
                      ? "border-brand-blue bg-brand-blue/[0.06] font-medium text-ink"
                      : "border-hair bg-bg-raised text-muted hover:border-hair2"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {RISK_NOTES[q.key] ? (
              <p className="mt-5 text-xs leading-relaxed text-dim">{RISK_NOTES[q.key]}</p>
            ) : null}

            <div className="mt-8 flex justify-between">
              <button
                className="btn-secondary disabled:opacity-40"
                disabled={step === 0}
                onClick={() => setStep((s) => s - 1)}
              >
                Back
              </button>
              <button
                className="btn-primary disabled:opacity-40"
                disabled={answers[q.key] === null}
                onClick={() =>
                  step < QUESTIONS.length - 1 ? setStep((s) => s + 1) : setStage("results")
                }
              >
                {step < QUESTIONS.length - 1 ? "Next" : "See Security Report"}
              </button>
            </div>
            <p className="mt-6 text-center text-xs text-dim">{raw.hero.quizFooterNote}</p>
          </motion.div>
        ) : null}

        {stage === "results" ? (
          <motion.div key="results" {...fade}>
            <div className="card p-8 sm:p-10">
              <p className="eyebrow">{raw.resultsPage.eyebrow}</p>
              <h2 className="mt-3 text-2xl font-semibold text-ink sm:text-3xl">
                {raw.resultsPage.headline}
              </h2>
              <p className="mt-3 text-sm text-muted">{raw.resultsPage.sub}</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="card-tint p-6 text-center">
                  <p className="text-xs uppercase tracking-[0.18em] text-dim">Security risk score</p>
                  <p className="mt-2 text-5xl font-semibold text-brand-blue tabular">{score}/10</p>
                </div>
                <div className="card-tint p-6 text-center">
                  <p className="text-xs uppercase tracking-[0.18em] text-dim">Risk level</p>
                  <p className={`mt-2 text-5xl font-semibold ${levelColor}`}>{level}</p>
                </div>
              </div>

              <p className="serif-accent mt-8 text-xl leading-snug text-ink">&ldquo;{narrative}&rdquo;</p>

              <p className="mt-8 text-sm font-semibold text-ink">
                {raw.resultsPage.vulnerabilityListTitle}
              </p>
              <div className="mt-3 grid gap-3">
                {riskCards.map((c) => (
                  <div key={c.title} className="card-tint p-4">
                    <p className="text-sm font-semibold text-ink">{c.title}</p>
                    <p className="mt-1 text-sm text-muted">{c.desc}</p>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-sm font-semibold text-ink">{raw.resultsPage.industryThreatsTitle}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {threats.map((t) => (
                  <div key={t.title} className="card-tint p-4">
                    <p className="text-sm font-semibold text-ink">{t.title}</p>
                    <p className="mt-1 text-sm text-muted">{t.desc}</p>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-sm font-semibold text-ink">{raw.resultsPage.recommendationsTitle}</p>
              <div className="mt-3 grid gap-3">
                {recommendations.map((r) => (
                  <div key={r.title} className="card-tint p-5">
                    <p className="text-sm font-semibold text-brand-link">{r.title}</p>
                    <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                      {r.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-muted">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-teal" aria-hidden />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">Schedule a free consultation</Link>
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setAnswers(Object.fromEntries(QUESTIONS.map((x) => [x.key, null])));
                    setStep(0);
                    setStage("quiz");
                  }}
                >
                  Retake assessment
                </button>
              </div>
              <p className="mt-6 text-xs leading-relaxed text-dim">{raw.disclaimer}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
