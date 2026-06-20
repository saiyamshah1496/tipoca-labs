"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { DroidIcon } from "@/components/DroidIcon";
import { DECISION_STACK_CALLOUTS, GOVERNANCE_PIPELINE } from "@/lib/product";

function StepVisual({ stepId, color }: { stepId: string; color: string }) {
  if (stepId === "fit") {
    return (
      <div className="relative flex h-full min-h-[220px] flex-col items-center justify-center overflow-hidden rounded-lg border border-[var(--border)] bg-gradient-to-b from-[var(--violet-soft)] to-[var(--surface)] p-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 40%, var(--violet-soft) 0%, transparent 65%)",
          }}
        />
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <DroidIcon size={72} />
        </motion.div>
        <p className="relative mt-4 text-center text-sm font-medium text-[var(--text)]">
          Agent receives message + context
        </p>
        <div className="relative mt-3 flex gap-2">
          {["Worthy?", "Unsubscribe?", "Ignore?"].map((q) => (
            <span
              key={q}
              className="rounded-full border border-[var(--violet)]/25 bg-white/80 px-2.5 py-1 text-[10px] font-medium text-[var(--violet)]"
            >
              {q}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (stepId === "verdict") {
    return (
      <div className="flex h-full min-h-[220px] flex-col justify-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
        {[
          { label: "Allow", pct: "78%", tone: "border-[var(--green)]/30 bg-[var(--green-soft)] text-[var(--green)]" },
          { label: "Suppress", pct: "19%", tone: "border-[var(--amber)]/30 bg-[var(--amber-soft)] text-[var(--amber)]" },
          { label: "Block", pct: "3%", tone: "border-[var(--red)]/30 bg-[var(--red-soft)] text-[var(--red)]" },
        ].map((row, i) => (
          <div key={row.label} className="space-y-1">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-[var(--text-secondary)]">{row.label}</span>
              <span className={row.tone.split(" ").pop()}>{row.pct}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-dim)]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: row.pct }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.6 }}
                className={`h-full rounded-full ${row.tone.split(" ")[1]?.replace("bg-", "bg-")}`}
                style={{ backgroundColor: `color-mix(in srgb, ${color} ${30 + i * 20}%, transparent)` }}
              />
            </div>
          </div>
        ))}
        <p className="mt-2 text-center text-[11px] text-[var(--text-tertiary)]">
          → Suppression list · dispatch gate · audit trail
        </p>
      </div>
    );
  }

  if (stepId === "policy") {
    return (
      <div className="flex h-full min-h-[220px] flex-col items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="w-full max-w-[240px] rounded-md border border-[var(--red)]/30 bg-[var(--red-soft)] p-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--red)]">Blocked</p>
          <p className="mt-2 text-sm font-semibold text-[var(--text)]">90% off everything</p>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">Discount claim exceeds policy · HTTP 406</p>
        </div>
        <p className="mt-4 text-xs text-[var(--text-tertiary)]">Deterministic · no LLM · instant</p>
      </div>
    );
  }

  if (stepId === "exposure") {
    return (
      <div className="flex h-full min-h-[220px] flex-col justify-center gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
        {[
          { label: "48h send burst", value: 4, max: 5 },
          { label: "Hours since last touch", value: 2, max: 24 },
          { label: "Journey density", value: 3, max: 4 },
        ].map((m) => (
          <div key={m.label}>
            <div className="mb-1 flex justify-between text-xs">
              <span className="text-[var(--text-secondary)]">{m.label}</span>
              <span className="font-medium text-[var(--teal)]">
                {m.value >= m.max * 0.8 ? "Over limit" : "OK"}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[var(--surface-dim)]">
              <div
                className="h-full rounded-full bg-[var(--teal)]"
                style={{ width: `${(m.value / m.max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (stepId === "economics") {
    return (
      <div className="flex h-full min-h-[220px] flex-col items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 text-center">
        <p className="text-xs font-medium text-[var(--text-tertiary)]">Organic converters flagged</p>
        <p className="mt-2 text-4xl font-semibold tracking-tight text-[var(--amber)]">12,847</p>
        <p className="mt-2 max-w-[200px] text-xs leading-relaxed text-[var(--text-secondary)]">
          Would purchase without the promo - suppress before margin leaks
        </p>
      </div>
    );
  }

  // classify default
  return (
    <div className="flex h-full min-h-[220px] flex-wrap content-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
      {["Promo", "Winback", "Abandon", "Transactional", "Agent draft", "Journey step"].map((tag) => (
        <span
          key={tag}
          className="rounded-md border border-[var(--indigo)]/20 bg-[var(--indigo-soft)] px-3 py-1.5 text-xs font-medium text-[var(--indigo)]"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function DecisionStackSection() {
  const [active, setActive] = useState(
    GOVERNANCE_PIPELINE.findIndex((s) => s.featured) ?? 3
  );
  const step = GOVERNANCE_PIPELINE[active];
  const Icon = step.icon;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      {/* AI-era callouts */}
      <div className="grid gap-3 sm:grid-cols-3">
        {DECISION_STACK_CALLOUTS.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-center"
          >
            <p className="text-2xl font-semibold tracking-tight text-[var(--indigo)]">{c.stat}</p>
            <p className="mt-0.5 text-sm font-medium text-[var(--text)]">{c.label}</p>
            <p className="mt-0.5 text-xs text-[var(--text-tertiary)]">{c.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Pipeline rail */}
      <div className="relative hidden md:block">
        <div className="absolute left-[8%] right-[8%] top-[22px] h-px bg-[var(--border)]" aria-hidden />
        <div className="grid grid-cols-6 gap-2">
          {GOVERNANCE_PIPELINE.map((s, i) => {
            const StepIcon = s.icon;
            const isActive = i === active;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(i)}
                className="group flex flex-col items-center gap-2 text-center"
              >
                <span
                  className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all ${
                    isActive
                      ? "border-[var(--indigo)] bg-[var(--indigo)] text-white shadow-[0_0_0_4px_var(--indigo-soft)]"
                      : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-tertiary)] group-hover:border-[var(--indigo)]/40"
                  } ${s.featured && !isActive ? "ring-2 ring-[var(--violet)]/20" : ""}`}
                >
                  <StepIcon size={18} strokeWidth={isActive ? 2.25 : 1.75} />
                </span>
                <span
                  className={`text-xs font-medium ${isActive ? "text-[var(--indigo)]" : "text-[var(--text-tertiary)]"}`}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile step picker */}
      <div className="flex gap-2 overflow-x-auto pb-1 md:hidden">
        {GOVERNANCE_PIPELINE.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActive(i)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              i === active
                ? "bg-[var(--indigo)] text-white"
                : "border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)]"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Active step panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="grid overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] lg:grid-cols-2"
        >
          <div className="border-b border-[var(--border)] p-6 lg:border-b-0 lg:border-r lg:p-8">
            <div className="flex items-center gap-2">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-lg"
                style={{ backgroundColor: `color-mix(in srgb, ${step.color} 12%, white)` }}
              >
                <Icon size={18} style={{ color: step.color }} />
              </span>
              {step.featured && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[var(--violet-soft)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--violet)]">
                  <Sparkles size={10} />
                  Agentic core
                </span>
              )}
            </div>

            <h3 className="mt-4 text-xl font-semibold tracking-tight text-[var(--text)]">
              {step.title}
            </h3>
            <p className="mt-3 text-base font-medium leading-snug text-[var(--text)]">
              {step.headline}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
              {step.detail}
            </p>

            <div className="mt-6 flex items-start gap-2 rounded-md border border-[var(--indigo)]/15 bg-[var(--indigo-soft)] px-4 py-3">
              <ArrowRight size={14} className="mt-0.5 shrink-0 text-[var(--indigo)]" />
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                <span className="font-medium text-[var(--text)]">Outcome: </span>
                {step.outcome}
              </p>
            </div>

            <p className="mt-4 text-xs font-medium" style={{ color: step.color }}>
              {step.tech}
            </p>
          </div>

          <div className="bg-[var(--surface-dim)]/40 p-4 lg:p-6">
            <StepVisual stepId={step.id} color={step.color} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
