"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import type { Phase, SimResult } from "@/components/CampaignSimulator";
import Logo from "@/components/Logo";
import AmbientField from "@/components/AmbientField";
import LightTrailField from "@/components/LightTrailField";
import DroidCloneField from "@/components/DroidCloneField";
import DroidArmyBackdrop from "@/components/DroidArmyBackdrop";
import InferenceTopology from "@/components/InferenceTopology";
import InferenceEngine from "@/components/InferenceEngine";
import CampaignSimulator from "@/components/CampaignSimulator";
import IntegrationsSection from "@/components/IntegrationsSection";
import SectionBlock from "@/components/SectionBlock";
import RealityStats from "@/components/RealityStats";
import { revealRight, revealUp } from "@/lib/motion";

const CYCLING_WORDS = [
  { text: "CRM", color: "var(--blue)" },
  { text: "lifecycle marketing", color: "var(--violet)" },
  { text: "margin protection", color: "var(--green)" },
  { text: "AI decisioning", color: "var(--red)" },
] as const;

function CyclingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % CYCLING_WORDS.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const word = CYCLING_WORDS[index];

  return (
    <span
      className="hero-cycling-wrap"
      aria-label={word.text}
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="hero-cycling-word"
          style={{ color: word.color }}
          initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          {word.text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const USE_CASES = [
  {
    tag: "B2C · Margin protection",
    metric: "$847K",
    line: "Who would have bought anyway?",
    detail:
      "A 20% promo targets 100K high-intent users. Tipoca splits N clones into control and variant groups - flagging 12,847 organic converters to suppress before the CRM wastes margin on guaranteed buyers.",
    accent: "panel-accent-blue",
    metricColor: "text-[var(--blue)]",
    tagColor: "text-[var(--blue)]",
  },
  {
    tag: "Retail · Journey orchestration",
    metric: "−18%",
    line: "Who is about to unsubscribe?",
    detail:
      "Before Adobe or Braze journeys go live, Tipoca simulates cross-channel cadence against communication history - projecting spam loops and throttling fatigued cohorts before app deletions spike.",
    accent: "panel-accent-red",
    metricColor: "text-[var(--red)]",
    tagColor: "text-[var(--red)]",
  },
  {
    tag: "B2B · Lead routing",
    metric: "340",
    line: "Will this flood sales?",
    detail:
      "RevOps stress-tests a new Agentforce lead-scoring model against a synthetic Salesforce mirror - catching 340 accounts that would have closed organically or been falsely suppressed.",
    accent: "panel-accent-violet",
    metricColor: "text-[var(--violet)]",
    tagColor: "text-[var(--violet)]",
  },
  {
    tag: "AI governance",
    metric: "0",
    line: "Blast radius before publish?",
    detail:
      "An autonomous agent hallucinates a 90% discount. Tipoca returns HTTP 406 and a hard block before Agentforce ships - zero production incidents, validation instead of launch-and-pray.",
    accent: "panel-accent-green",
    metricColor: "text-[var(--green)]",
    tagColor: "text-[var(--green)]",
  },
];

export default function Home() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [suppressRatio, setSuppressRatio] = useState(0);

  const handleSimulate = useCallback((result: SimResult | null, p: Phase) => {
    setPhase(p);
    if (result) setSuppressRatio(result.suppressCount / result.sampleN);
    else if (p === "idle") setSuppressRatio(0);
  }, []);

  const simulating = phase === "sampling" || phase === "simulating";

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <div className="site-backdrop pointer-events-none fixed inset-0 z-0" aria-hidden />
      <div className="page-grid pointer-events-none fixed inset-0 z-0" aria-hidden />

      <header className="header-glass sticky top-0 z-50">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <Logo />
          <nav className="hidden gap-8 nav-text md:flex">
            <a href="#problem" className="nav-link">Problem</a>
            <a href="#twins" className="nav-link">Twins</a>
            <a href="#demo" className="nav-link">Staging bay</a>
            <a href="#engine" className="nav-link">Engine</a>
            <a href="#integrations" className="nav-link">Integrations</a>
          </nav>
          <a
            href="#demo"
            className="btn-primary hidden items-center gap-2 rounded-sm px-5 py-2.5 sm:inline-flex"
          >
            Book demo
          </a>
        </div>
      </header>

      {/* Hero - copy + interactive clone console side by side */}
      <section className="hero-cinematic relative z-10 overflow-hidden border-b border-[var(--border)]">
        <LightTrailField />
        <AmbientField />

        <div className="hero-cinematic-inner relative mx-auto w-full max-w-[1400px] pb-16 pt-28 md:pb-24 md:pt-32">
          <div className="hero-cinematic-grid grid items-center lg:grid-cols-2">
            <div className="hero-copy min-w-0">
              <motion.h1
                custom={0}
                variants={revealUp}
                initial="hidden"
                animate="show"
                className="headline-serif hero-title"
              >
                The simulation layer for
                <br />
                <CyclingWord />
              </motion.h1>

              <motion.p
                custom={0.18}
                variants={revealUp}
                initial="hidden"
                animate="show"
                className="hero-deck mt-6"
              >
                Every engineer gets a staging server.
                <span className="hero-deck-muted">
                  Marketers shouldn&apos;t only get production - Tipoca is the CI/CD inference engine that
                  simulates campaign impact, human-built or AI-generated, before it ships.
                </span>
              </motion.p>

              <motion.div custom={0.34} variants={revealUp} initial="hidden" animate="show" className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#demo"
                  className="btn-primary group inline-flex items-center gap-2 rounded-sm px-6 py-3"
                >
                  Run simulation
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </a>
                <a
                  href="#problem"
                  className="btn-ghost inline-flex items-center rounded-sm px-6 py-3"
                >
                  Why simulate
                </a>
              </motion.div>

            </div>

            <motion.div
              variants={revealRight}
              initial="hidden"
              animate="show"
              className="hero-clone-wrap relative w-full min-w-0"
            >
              <DroidCloneField active={simulating} suppressRatio={suppressRatio} variant="hero" />
            </motion.div>
          </div>
        </div>
      </section>

      <SectionBlock
        id="problem"
        index="01"
        tag="Reality check"
        title="Campaigns are too expensive"
        titleMuted="to learn live."
        description="Marketing is the only enterprise discipline deployed to millions without a staging environment - so teams burn real customers on every send, then read A/B results that explain correlation, not causal intent. As Agentforce makes creation free, the bottleneck moves from drafting campaigns to governing what actually ships."
        viewport
        ghost="01"
      >
        <div className="problem-split grid w-full gap-10 lg:grid-cols-2 lg:items-start lg:gap-x-16 xl:gap-x-20">
          <RealityStats />
          <div className="grid w-full min-w-0 gap-3">
            {[
              "Launch a 20% promo to 100K users. Hope the margin math works.",
              "Let Agentforce draft the copy. Pray it doesn't hallucinate a 90% discount.",
              "Discover fatigue from unsubscribe data - three weeks later.",
            ].map((t, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="panel-accent-red panel-dark flex gap-3 rounded-sm px-4 py-3"
              >
                <X className="mt-0.5 h-4 w-4 shrink-0 text-[var(--red)]" />
                <span className="text-base text-[var(--text-secondary)]">{t}</span>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="panel-accent-green panel-dark flex gap-3 rounded-sm border border-[var(--green)]/25 px-4 py-3"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--green)]" />
              <span className="text-base text-[var(--text-secondary)]">
                Validate on N clones first - suppress organic converters, throttle fatigued cohorts, and block bad
                drafts before anything reaches production.
              </span>
            </motion.div>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock
        id="twins"
        index="02"
        tag="Clone mirror"
        title="A living 1:1 mirror"
        titleMuted="of every user in your CRM."
        description="A synthetic clone army from the same profile vectors your CRM already uses - one continuously updated twin per contact, not a segment rollup or lookalike guess."
        ghost="02"
        className="section-tint-blue section-twins"
        backdrop={<DroidArmyBackdrop active={simulating} />}
      >
        <div className="mb-8 flex flex-wrap gap-x-10 gap-y-3 text-sm font-medium">
          {[
            { label: "Mirrored", value: "2.8M", tone: "text-[var(--blue)]" },
            { label: "Sample", value: "N clones", tone: "text-[var(--violet)]" },
            { label: "Push back", value: "Suppress API", tone: "text-[var(--green)]" },
          ].map(({ label, value, tone }) => (
            <div key={label}>
              <span className="text-[var(--text-tertiary)]">{label} · </span>
              <span className={tone}>{value}</span>
            </div>
          ))}
        </div>
        <InferenceTopology active={simulating} />
      </SectionBlock>

      <SectionBlock
        id="demo"
        index="03"
        tag="Staging bay"
        title="Run the wave on droids"
        titleMuted="not customers."
        description="Configure an exercise brief, deploy to N droid clones, and compare live cohort vs. guardrail pass — with suppress manifests ready for your CRM."
        className="section-tint-violet"
        ghost="03"
      >
        <CampaignSimulator onSimulate={handleSimulate} />
      </SectionBlock>

      <SectionBlock
        id="engine"
        index="04"
        tag="Inference stack"
        title="From ingest to CRM guardrails"
        titleMuted="in five layers."
        description="A high-throughput inference engine, not a system of record - vectors mirror users, algorithms simulate campaigns, and guardrails push suppression lists, throttle rules, and hard blocks back upstream."
        align="center"
        className="section-tint-blue"
        ghost="04"
      >
        <InferenceEngine />
      </SectionBlock>

      <SectionBlock
        id="integrations"
        index="05"
        tag="Integrations"
        title="Plugs into your stack."
        titleMuted="Pushes back to production."
        description="Read first-party commerce, automation, behavioral, and support data on the way in. Return suppression lists, throttle rules, and hard blocks on the way out."
        align="center"
        className="section-tint-teal"
      >
        <IntegrationsSection />
      </SectionBlock>

      <SectionBlock
        id="cases"
        eyebrow="Use cases"
        title="Questions only clones can answer."
        description="Scenarios RevOps and CMOs run through the sandbox before production - counterfactual margin, journey fatigue, B2B routing, and AI governance for autonomous execution."
        align="center"
        className="section-tint-warm"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {USE_CASES.map((c, i) => (
            <motion.article
              key={c.tag}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className={`panel-dark panel-interactive ${c.accent} rounded-sm p-5`}
            >
              <div className="flex items-start justify-between gap-4">
                <p className={`label-mono ${c.tagColor}`}>
                  {c.tag}
                </p>
                <p className={`font-[family-name:var(--display)] text-xl font-semibold tracking-tight tabular-nums ${c.metricColor}`}>
                  {c.metric}
                </p>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-[var(--text)]">{c.line}</h3>
              <p className="mt-2 text-base leading-relaxed text-[var(--text-secondary)]">{c.detail}</p>
            </motion.article>
          ))}
        </div>
      </SectionBlock>

      <section className="section-cta relative z-10 py-24 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="label-mono text-white/75">
              Sandbox access
            </p>
            <h2 className="headline-serif section-title mx-auto mt-4 max-w-4xl text-white">
              Stop learning on live customers.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-xl leading-relaxed text-white/80">
              Mirror your CRM. Simulate every campaign - human or AI-built. Push suppression lists and guardrails
              back before production sends.
            </p>
            <a
              href="#demo"
              className="btn-primary mt-10 inline-flex rounded-sm px-8 py-3.5"
            >
              Request sandbox access
            </a>
          </motion.div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-[var(--border)] bg-[var(--surface)] py-8">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <Logo />
          <p className="caption-mono text-[var(--text-tertiary)]">
            Tipoca Labs · Simulation layer for CRM
          </p>
        </div>
      </footer>
    </main>
  );
}
