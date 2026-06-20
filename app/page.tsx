"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, X, ExternalLink } from "lucide-react";
import HoldoutLogo from "@/components/HoldoutLogo";
import ProductHeroPanel from "@/components/ProductHeroPanel";
import DroidArmyBackdrop from "@/components/DroidArmyBackdrop";
import ProfileDimensionsSection from "@/components/ProfileDimensionsSection";
import DecisionStackSection from "@/components/DecisionStackSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import SectionBlock from "@/components/SectionBlock";
import RealityStats from "@/components/RealityStats";
import { APP_LOGIN_URL, APP_SIGNUP_URL, SITE } from "@/lib/site";
import { revealRight, revealUp } from "@/lib/motion";

const USE_CASES = [
  {
    tag: "Lifecycle · Journeys",
    metric: "−18%",
    line: "Who is about to unsubscribe?",
    detail:
      "Before Braze Canvas or Klaviyo Flow goes live, Holdout simulates cross-channel cadence against fatigue profiles - throttling at-risk users before app deletions spike.",
    accent: "panel-accent-red",
    metricColor: "text-[var(--red)]",
    tagColor: "text-[var(--red)]",
  },
  {
    tag: "Commerce · Margin",
    metric: "$847K",
    line: "Who would have bought anyway?",
    detail:
      "A promo targets high-intent users. Holdout flags organic converters to suppress - so margin isn't wasted on customers who would purchase without the discount.",
    accent: "panel-accent-blue",
    metricColor: "text-[var(--indigo)]",
    tagColor: "text-[var(--indigo)]",
  },
  {
    tag: "Support · Sentiment",
    metric: "0",
    line: "Send promos to angry customers?",
    detail:
      "Open CRITICAL tickets and CSAT ≤ 2 are the strongest unsubscribe predictors. Holdout blocks or suppresses messaging to users in active disputes.",
    accent: "panel-accent-violet",
    metricColor: "text-[var(--violet)]",
    tagColor: "text-[var(--violet)]",
  },
  {
    tag: "Dispatch · Live gate",
    metric: "100%",
    line: "Govern every user at send?",
    detail:
      "Push holdout_gate_decision back to your CEP - allow or skip each user at dispatch, not just at campaign setup. Braze & Klaviyo today.",
    accent: "panel-accent-green",
    metricColor: "text-[var(--green)]",
    tagColor: "text-[var(--green)]",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <div className="site-backdrop pointer-events-none fixed inset-0 z-0" aria-hidden />

      <header className="header-glass sticky top-0 z-50">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
          <HoldoutLogo />
          <nav className="hidden gap-8 nav-text md:flex">
            <a href="#problem" className="nav-link">Problem</a>
            <a href="#platform" className="nav-link">Agents</a>
            <a href="#how-it-works" className="nav-link">How it works</a>
            <a href="#integrations" className="nav-link">Integrations</a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={APP_LOGIN_URL}
              className="btn-ghost hidden items-center rounded-md px-4 py-2 sm:inline-flex"
            >
              Sign in
            </a>
            <a
              href={APP_SIGNUP_URL}
              className="btn-primary inline-flex items-center gap-2 rounded-md px-4 py-2.5"
            >
              Get started
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-enterprise relative z-10 overflow-hidden border-b border-[var(--border)]">
        <div className="relative mx-auto w-full max-w-[1200px] px-6 pb-20 pt-16 md:pb-28 md:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="min-w-0">
              <motion.p
                custom={0}
                variants={revealUp}
                initial="hidden"
                animate="show"
                className="eyebrow eyebrow-indigo"
              >
                Agentic simulation & governance
              </motion.p>

              <motion.h1
                custom={0.08}
                variants={revealUp}
                initial="hidden"
                animate="show"
                className="mt-4 whitespace-pre-line text-[clamp(2.25rem,4.5vw,3.25rem)] font-semibold leading-[1.08] tracking-tight text-[var(--text)]"
              >
                {SITE.heroHeadline}
              </motion.h1>

              <motion.p
                custom={0.16}
                variants={revealUp}
                initial="hidden"
                animate="show"
                className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--text-secondary)]"
              >
                {SITE.heroSubhead}
              </motion.p>

              <motion.div
                custom={0.24}
                variants={revealUp}
                initial="hidden"
                animate="show"
                className="mt-8 flex flex-wrap gap-3"
              >
                <a
                  href={APP_SIGNUP_URL}
                  className="btn-primary group inline-flex items-center gap-2 rounded-md px-6 py-3"
                >
                  Start free workspace
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href={APP_LOGIN_URL}
                  className="btn-ghost inline-flex items-center gap-2 rounded-md px-6 py-3"
                >
                  Sign in to app
                  <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                </a>
              </motion.div>
            </div>

            <motion.div variants={revealRight} initial="hidden" animate="show" className="min-w-0">
              <ProductHeroPanel />
            </motion.div>
          </div>
        </div>
      </section>

      <SectionBlock
        id="problem"
        eyebrow="The gap"
        title="Lifecycle marketing ships to millions"
        titleMuted="without a staging environment."
        description="Every engineering team gets CI/CD. Marketers get production - campaigns, journeys, triggered messages, and AI-generated copy all go live without a sandbox. As creation gets cheaper, the bottleneck moves from drafting to governing what actually ships."
        viewport
      >
        <div className="problem-split grid w-full gap-10 lg:grid-cols-2 lg:items-start lg:gap-x-16">
          <RealityStats />
          <div className="grid w-full min-w-0 gap-3">
            {[
              "Launch a journey to 100K users. Hope fatigue doesn't spike unsubscribes.",
              "Let AI draft the message. Pray it doesn't hallucinate a discount.",
              "Discover churn from unsubscribe data - three weeks later.",
            ].map((t, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className="panel-accent-red panel-dark flex gap-3 rounded-md px-4 py-3"
              >
                <X className="mt-0.5 h-4 w-4 shrink-0 text-[var(--red)]" />
                <span className="text-base text-[var(--text-secondary)]">{t}</span>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="panel-accent-green panel-dark flex gap-3 rounded-md border border-[var(--green)]/20 px-4 py-3"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--green)]" />
              <span className="text-base text-[var(--text-secondary)]">
                Simulate on audience profiles first - suppress at-risk users, push exclusions
                to your CEP, and gate every user at dispatch before anything reaches production.
              </span>
            </motion.div>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock
        id="platform"
        eyebrow="Digital agents"
        title="Four signal dimensions."
        titleMuted="One agent per user."
        description="Commerce, engagement, behavioral, and support data hydrate a per-user agent - not a segment rollup - so simulation reflects how real customers would react to any message."
        className="section-tint-blue section-twins"
        backdrop={<DroidArmyBackdrop />}
      >
        <ProfileDimensionsSection />
      </SectionBlock>

      <SectionBlock
        id="how-it-works"
        eyebrow="Decision stack"
        title="Governance for the"
        titleMuted="AI creation era."
        description="When every team can generate campaigns, journeys, and copy at scale, the bottleneck moves from creation to judgment. Holdout is the agentic layer that simulates human reaction and gates every send - before and at dispatch."
        align="center"
        className="section-tint-violet"
      >
        <DecisionStackSection />
      </SectionBlock>

      <SectionBlock
        id="integrations"
        eyebrow="Integrations"
        title="Plugs into your stack."
        titleMuted="Pushes governance back."
        description="Eight live connectors today across commerce, engagement, behavioral, and support - with CEP dispatch via Braze and Klaviyo. More platforms on the roadmap."
        align="center"
        className="section-tint-teal"
      >
        <IntegrationsSection />
      </SectionBlock>

      <SectionBlock
        id="cases"
        eyebrow="Use cases"
        title="Questions Holdout answers before anything ships."
        description="Scenarios lifecycle teams run through before production - journey fatigue, margin protection, angry-customer suppression, and live dispatch governance."
        align="center"
        className="section-tint-warm"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {USE_CASES.map((c, i) => (
            <motion.article
              key={c.tag}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`panel-dark panel-interactive ${c.accent} rounded-md p-5`}
            >
              <div className="flex items-start justify-between gap-4">
                <p className={`label-mono ${c.tagColor}`}>{c.tag}</p>
                <p className={`text-xl font-semibold tracking-tight tabular-nums ${c.metricColor}`}>
                  {c.metric}
                </p>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-[var(--text)]">{c.line}</h3>
              <p className="mt-2 text-base leading-relaxed text-[var(--text-secondary)]">{c.detail}</p>
            </motion.article>
          ))}
        </div>
      </SectionBlock>

      <section className="section-cta relative z-10 py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="label-mono text-white/70">Open the workspace</p>
            <h2 className="mx-auto mt-4 max-w-3xl text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">
              Stop learning on live customers.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/75">
              Connect your stack, simulate your next journey or campaign, and govern dispatch
              - in a workspace built for lifecycle marketing teams.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={APP_SIGNUP_URL}
                className="btn-primary inline-flex rounded-md px-8 py-3.5"
              >
                Create workspace
              </a>
              <a
                href={APP_LOGIN_URL}
                className="inline-flex items-center gap-2 rounded-md border border-white/25 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Sign in
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-[var(--border)] bg-[var(--surface)] py-8">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <HoldoutLogo showTagline />
          <p className="text-sm text-[var(--text-tertiary)]">
            {SITE.productName} · {SITE.tagline}
          </p>
        </div>
      </footer>
    </main>
  );
}
