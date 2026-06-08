"use client";

import { motion } from "framer-motion";

const SEGMENTS = [
  { id: "whale", label: "High-LTV", pct: 12, color: "#1a4fff" },
  { id: "organic", label: "Organic intent", pct: 35, color: "#16a34a" },
  { id: "churn", label: "Churn risk", pct: 18, color: "#e11d48" },
  { id: "neutral", label: "General", pct: 35, color: "#a1a1aa" },
];

interface TwinPopulationProps {
  suppressPct?: number;
  animating?: boolean;
}

export default function TwinPopulation({ suppressPct = 0, animating = false }: TwinPopulationProps) {
  return (
    <div className="panel rounded-sm p-5 md:p-6">
      <div className="flex items-baseline justify-between">
        <p className="label-mono text-[var(--text-tertiary)]">
          Twin population · N sample
        </p>
        <span className="font-[family-name:var(--mono)] text-xs text-[var(--blue)]">2.8M total</span>
      </div>

      <div className="mt-5 flex h-3 overflow-hidden rounded-sm bg-[var(--surface-dim)]">
        {SEGMENTS.map((seg, i) => (
          <motion.div
            key={seg.id}
            initial={{ width: 0 }}
            animate={{ width: `${seg.pct}%` }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            style={{ backgroundColor: seg.color }}
            className="h-full first:rounded-l-sm last:rounded-r-sm"
          />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {SEGMENTS.map((seg) => (
          <div key={seg.id} className="flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: seg.color }} />
            <div>
              <p className="text-xs text-[var(--text-secondary)]">{seg.label}</p>
              <p className="caption-mono text-[var(--text-tertiary)]">{seg.pct}%</p>
            </div>
          </div>
        ))}
      </div>

      {suppressPct > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 border-t border-[var(--border)] pt-4"
        >
          <div className="flex items-center justify-between text-xs">
            <span className="text-[var(--text-secondary)]">Organic intent · suppress</span>
            <span className="font-[family-name:var(--mono)] font-medium text-[var(--blue)]">
              {Math.round(suppressPct * 100)}% flagged
            </span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--surface-dim)]">
            <motion.div
              className="h-full rounded-full bg-[var(--blue)]"
              initial={{ width: 0 }}
              animate={{ width: `${suppressPct * 100}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </motion.div>
      )}

      {animating && (
        <motion.div
          className="pulse-line mt-4 h-px w-full bg-[var(--blue)]"
          layout
        />
      )}
    </div>
  );
}
