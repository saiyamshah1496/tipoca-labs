"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, FlaskConical, Radio, ScrollText } from "lucide-react";

const STEPS = [
  { icon: FlaskConical, label: "Predict", desc: "Cohort simulation on CEP audience", tone: "text-[var(--indigo)]" },
  { icon: Shield, label: "Apply", desc: "Per-recipient dispatch gate", tone: "text-[var(--violet)]" },
  { icon: Radio, label: "Write-back", desc: "holdout_gate_decision → CEP", tone: "text-[var(--green)]" },
  { icon: ScrollText, label: "Audit", desc: "Every verdict logged", tone: "text-[var(--teal)]" },
] as const;

export default function ProductHeroPanel() {
  return (
    <div className="product-hero-panel relative w-full overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-[0_8px_40px_-12px_rgba(15,23,42,0.12)]">
      <div className="border-b border-[var(--border)] px-5 py-3.5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-[var(--text)]">Governance console</p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--green-soft)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--green)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--green)]" />
            Armed
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 divide-x divide-[var(--border)] border-b border-[var(--border)]">
        {[
          { label: "Decisions · 90d", value: "48.2k", sub: "Simulations + dispatch gates" },
          { label: "Clones hydrated", value: "12.4k", sub: "4-profile · episodic buffer" },
        ].map((stat) => (
          <div key={stat.label} className="px-5 py-4">
            <p className="text-[11px] font-medium text-[var(--text-tertiary)]">{stat.label}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-[var(--text)]">{stat.value}</p>
            <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-px bg-[var(--border)]">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center bg-[var(--surface)] px-2 py-4 text-center"
            >
              <div className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--surface-dim)] ${step.tone}`}>
                <Icon size={16} strokeWidth={1.75} />
              </div>
              <p className="text-xs font-semibold text-[var(--text)]">{step.label}</p>
              <p className="mt-0.5 text-[10px] leading-snug text-[var(--text-secondary)]">{step.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[var(--border)] bg-[var(--surface-dim)]/50 px-5 py-3">
        <p className="text-xs text-[var(--text-secondary)]">
          WINBACK sim · 2.1% predicted unsub · 847 suppressed · firewall armed
        </p>
        <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-[var(--indigo)]">
          Open workspace <ArrowRight size={12} />
        </span>
      </div>
    </div>
  );
}
