"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, FlaskConical, Radio } from "lucide-react";

const STEPS = [
  { icon: FlaskConical, label: "Simulate", desc: "Messages vs. user agents", tone: "text-[var(--indigo)]" },
  { icon: Shield, label: "Govern", desc: "Agentic per-user verdicts", tone: "text-[var(--violet)]" },
  { icon: Radio, label: "Dispatch", desc: "Gate in your CEP", tone: "text-[var(--green)]" },
] as const;

export default function ProductHeroPanel() {
  return (
    <div className="product-hero-panel relative w-full overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-[0_8px_40px_-12px_rgba(15,23,42,0.12)]">
      <div className="border-b border-[var(--border)] px-5 py-3.5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-[var(--text)]">Lifecycle governance</p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--green-soft)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--green)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--green)]" />
            Armed
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 divide-x divide-[var(--border)] border-b border-[var(--border)]">
        {[
          { label: "Messages screened · 90d", value: "1,284", sub: "Campaigns, flows & journeys" },
          { label: "At-risk spared", value: "12.4k", sub: "Users flagged pre-send" },
        ].map((stat) => (
          <div key={stat.label} className="px-5 py-4">
            <p className="text-[11px] font-medium text-[var(--text-tertiary)]">{stat.label}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-[var(--text)]">{stat.value}</p>
            <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-px bg-[var(--border)]">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center bg-[var(--surface)] px-3 py-5 text-center"
            >
              <div className={`mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--surface-dim)] ${step.tone}`}>
                <Icon size={18} strokeWidth={1.75} />
              </div>
              <p className="text-sm font-semibold text-[var(--text)]">{step.label}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-[var(--text-secondary)]">{step.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[var(--border)] bg-[var(--surface-dim)]/50 px-5 py-3">
        <p className="text-xs text-[var(--text-secondary)]">
          Winback flow · 2.1% predicted unsub · 847 to suppress
        </p>
        <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-[var(--indigo)]">
          Open workspace <ArrowRight size={12} />
        </span>
      </div>
    </div>
  );
}
