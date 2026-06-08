"use client";

import { motion } from "framer-motion";

const STACK = [
  { id: "crm", label: "Live CRM", hint: "Salesforce · Braze · Iterable", color: "var(--red)" },
  { id: "mirror", label: "Mirror", hint: "pgvector twins · 1:1", color: "var(--blue)" },
  { id: "sandbox", label: "Sandbox", hint: "K-means sample · infer", color: "var(--blue)" },
  { id: "guard", label: "Guardrails", hint: "DSPy · suppress API", color: "var(--green)" },
];

export default function StagingCrossSection() {
  return (
    <div className="relative overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--surface-dim)] p-6 md:p-10">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "linear-gradient(90deg, transparent 49%, var(--border) 50%, transparent 51%)",
          backgroundSize: "48px 100%",
        }}
        aria-hidden
      />

      <div className="relative flex flex-col items-center gap-6 md:flex-row md:justify-between md:gap-0">
        {STACK.map((layer, i) => (
          <motion.div
            key={layer.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3 md:flex-col md:gap-3"
          >
            <div
              className="flex h-16 w-16 flex-col items-center justify-center rounded-sm border bg-white shadow-sm md:h-20 md:w-20"
              style={{ borderColor: `color-mix(in srgb, ${layer.color} 30%, var(--border))` }}
            >
              <span className="label-mono" style={{ color: layer.color }}>
                {layer.label}
              </span>
            </div>
            <p className="max-w-[7rem] text-center text-sm leading-snug text-[var(--text-secondary)] md:mt-0">
              {layer.hint}
            </p>
            {i < STACK.length - 1 && (
              <motion.div
                className="hidden h-px w-10 bg-[var(--blue)]/30 md:block"
                animate={{ scaleX: [0.6, 1, 0.6], opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
              />
            )}
            {i < STACK.length - 1 && (
              <span className="font-[family-name:var(--mono)] text-[var(--blue)] md:hidden">→</span>
            )}
          </motion.div>
        ))}
      </div>

      <p className="relative mt-8 text-center text-sm leading-relaxed text-[var(--text-secondary)]">
        Tipoca sits between your CRM and your send layer - mirroring every user, simulating every campaign, pushing guardrails back upstream.
      </p>
    </div>
  );
}
