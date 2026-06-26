"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, FlaskConical, Radio, ScrollText } from "lucide-react";

const STEPS = [
  { icon: FlaskConical, label: "Predict", desc: "CEP cohort simulation", tone: "text-[var(--indigo)]" },
  { icon: Shield, label: "Apply", desc: "Per-recipient gate", tone: "text-[var(--violet)]" },
  { icon: Radio, label: "Write-back", desc: "Gate decision → CEP", tone: "text-[var(--green)]" },
  { icon: ScrollText, label: "Audit", desc: "Full verdict log", tone: "text-[var(--teal)]" },
] as const;

const STATS = [
  { label: "Decisions · 90d", value: "48.2k", sub: "Sim + dispatch gates" },
  { label: "Clones hydrated", value: "12.4k", sub: "4 profiles · episodic buffer" },
] as const;

export default function ProductHeroPanel() {
  return (
    <div className="product-hero-panel relative w-full overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-[0_8px_40px_-12px_rgba(15,23,42,0.12)]">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] px-5 py-3.5">
        <p className="text-sm font-semibold text-[var(--text)]">Governance console</p>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--green-soft)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--green)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--green)]" />
          Armed
        </span>
      </div>

      <div className="grid grid-cols-2 divide-x divide-[var(--border)] border-b border-[var(--border)]">
        {STATS.map((stat) => (
          <div key={stat.label} className="min-w-0 px-5 py-4">
            <p className="truncate text-[11px] font-medium text-[var(--text-tertiary)]">{stat.label}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-[var(--text)]">{stat.value}</p>
            <p className="mt-0.5 truncate text-xs text-[var(--text-secondary)]">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 divide-x divide-[var(--border)]">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              className="flex min-w-0 flex-col items-center bg-[var(--surface)] px-3 py-4 text-center"
            >
              <div className={`mb-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-dim)] ${step.tone}`}>
                <Icon size={16} strokeWidth={1.75} />
              </div>
              <p className="text-xs font-semibold text-[var(--text)]">{step.label}</p>
              <p className="mt-1 min-h-[2rem] text-[11px] leading-snug text-[var(--text-secondary)]">{step.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-2 border-t border-[var(--border)] bg-[var(--surface-dim)]/50 px-5 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-4">
        <p className="min-w-0 truncate text-xs text-[var(--text-secondary)]">
          WINBACK sim · 2.1% unsub · 847 suppressed · armed
        </p>
        <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-[var(--indigo)]">
          Open workspace <ArrowRight size={12} />
        </span>
      </div>
    </div>
  );
}
