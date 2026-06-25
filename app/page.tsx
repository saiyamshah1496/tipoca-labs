"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Check, X, ExternalLink } from "lucide-react";
import DifferentiationSection from "@/components/DifferentiationSection";
import HoldoutLogo from "@/components/HoldoutLogo";
import ProductHeroPanel from "@/components/ProductHeroPanel";
import DroidArmyBackdrop from "@/components/DroidArmyBackdrop";
import ProfileDimensionsSection from "@/components/ProfileDimensionsSection";
import DecisionStackSection from "@/components/DecisionStackSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import SectionBlock from "@/components/SectionBlock";
import { APP_LOGIN_URL, APP_SIGNUP_URL, CONTACT, CONTACT_BOOKING_URL, HAS_CONTACT_BOOKING, NAV_LINKS, SITE } from "@/lib/site";
import { PROBLEM_PAIN_POINTS, USE_CASES } from "@/lib/product";
import { revealRight, revealUp } from "@/lib/motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <div className="site-backdrop pointer-events-none fixed inset-0 z-0" aria-hidden />

      <header className="header-glass sticky top-0 z-50">
        <div className="header-inner mx-auto max-w-[1280px] px-6 py-4 lg:px-8">
          <div className="shrink-0">
            <HoldoutLogo />
          </div>

          <nav className="header-nav hidden lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              if ("requiresBooking" in link && link.requiresBooking && !HAS_CONTACT_BOOKING) return null;
              return (
                <a key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="header-actions flex shrink-0 items-center gap-2">
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
                Agentic governance, simulation & audit
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
        description={SITE.problemDescription}
      >
        <div className="mx-auto w-full max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="panel-accent-violet panel-dark mb-10 rounded-md border border-[var(--violet)]/20 px-5 py-4 text-center text-base font-medium leading-relaxed text-[var(--text)] md:text-lg"
          >
            {SITE.problemAiLine}
          </motion.p>
          <div className="grid w-full gap-3">
            {PROBLEM_PAIN_POINTS.map((t, i) => (
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
                {SITE.problemSolution}
              </span>
            </motion.div>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock
        id="differentiation"
        eyebrow="Why Holdout"
        title="Know before"
        titleMuted="you send."
        description={SITE.differentiationDescription}
        align="center"
        className="section-tint-warm"
      >
        <DifferentiationSection />
      </SectionBlock>

      <SectionBlock
        id="platform"
        eyebrow="Digital clones"
        title="Four signal dimensions."
        titleMuted="One clone per contact."
        description={SITE.platformDescription}
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
        description={SITE.howItWorksDescription}
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
        description={SITE.integrationsDescription}
        align="center"
        className="section-tint-teal"
      >
        <IntegrationsSection />
      </SectionBlock>

      <SectionBlock
        id="cases"
        eyebrow="Use cases"
        title="Questions Holdout answers"
        titleMuted="before and at send."
        description={SITE.useCasesDescription}
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

      {HAS_CONTACT_BOOKING && (
      <SectionBlock
        id="contact"
        eyebrow="Contact"
        eyebrowTone="teal"
        title={CONTACT.headline}
        titleMuted="before you ship."
        description={CONTACT.subhead}
        align="center"
        className="section-tint-teal"
      >
        <div className="mx-auto grid max-w-2xl gap-4">
          <motion.a
            href={CONTACT_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="panel-dark panel-interactive panel-accent-teal group flex items-center gap-4 rounded-md p-5 text-left transition-colors"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[var(--indigo)]/10 text-[var(--indigo)]">
              <Calendar className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium text-[var(--text-tertiary)]">
                {CONTACT.bookingLabel}
              </span>
              <span className="mt-0.5 block text-lg font-semibold text-[var(--text)] group-hover:text-[var(--indigo)]">
                {CONTACT.bookingDetail}
              </span>
              <span className="mt-1 block text-sm text-[var(--text-secondary)]">
                {CONTACT.bookingNote}
              </span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-[var(--text-tertiary)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--indigo)]" />
          </motion.a>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center text-sm text-[var(--text-tertiary)]"
          >
            {CONTACT.bookingHint}
          </motion.p>
        </div>
      </SectionBlock>
      )}

      <section className="section-cta relative z-10 py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="label-mono text-white/70">Open the workspace</p>
            <h2 className="mx-auto mt-4 max-w-3xl text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">
              {SITE.ctaHeadline}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/75">
              {SITE.ctaSubhead}
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
              {HAS_CONTACT_BOOKING && (
              <a
                href={CONTACT_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-white/25 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Calendar className="h-4 w-4" />
                Book a call
              </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-[var(--border)] bg-[var(--surface)] py-8">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <HoldoutLogo showTagline />
          <div className="flex flex-col items-center gap-2 sm:items-end">
            {HAS_CONTACT_BOOKING && (
            <a
              href={CONTACT_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--indigo)]"
            >
              Book a call
            </a>
            )}
            <p className="text-sm text-[var(--text-tertiary)]">
              {SITE.productName} · {SITE.tagline}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
