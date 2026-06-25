"use client";

import { motion } from "framer-motion";
import { DIFFERENTIATION_COLUMNS, DIFFERENTIATION_ROWS } from "@/lib/differentiation";

export default function DifferentiationSection() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Desktop / tablet comparison board */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="compare-board hidden md:block"
      >
        <div className="compare-grid compare-grid-head">
          <div className="compare-corner" />
          {DIFFERENTIATION_COLUMNS.map((col) => (
            <div
              key={col.id}
              className={col.id === "holdout" ? "compare-col compare-col-holdout compare-head-cell" : "compare-col compare-head-cell"}
            >
              <p className="compare-col-label">{col.label}</p>
              <p className="compare-col-question">{col.asks}</p>
            </div>
          ))}
        </div>

        {DIFFERENTIATION_ROWS.map((row, i) => (
          <div
            key={row.label}
            className={`compare-grid compare-grid-row ${i % 2 === 0 ? "compare-grid-row-alt" : ""}`}
          >
            <div className="compare-row-label">{row.label}</div>
            <div className="compare-col compare-cell compare-cell-muted">{row.ml}</div>
            <div className="compare-col compare-cell compare-cell-muted">{row.rl}</div>
            <div className="compare-col compare-col-holdout compare-cell compare-cell-holdout">{row.holdout}</div>
          </div>
        ))}

        <div className="compare-grid compare-grid-foot">
          <div className="compare-row-label">Strengths</div>
          {DIFFERENTIATION_COLUMNS.map((col) => (
            <div
              key={col.id}
              className={col.id === "holdout" ? "compare-col compare-col-holdout compare-foot-cell" : "compare-col compare-foot-cell"}
            >
              <ul className="compare-foot-list">
                {col.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Mobile: Holdout first, then compact alternates */}
      <div className="space-y-3 md:hidden">
        {[...DIFFERENTIATION_COLUMNS].reverse().map((col, i) => (
          <motion.article
            key={col.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={
              col.id === "holdout"
                ? "panel-dark panel-accent-violet rounded-md p-5"
                : "panel-dark rounded-md border border-[var(--border)] p-4 opacity-90"
            }
          >
            <p className={col.id === "holdout" ? "label-mono text-[var(--violet)]" : "label-mono text-[var(--text-tertiary)]"}>
              {col.label}
            </p>
            <p className="mt-2 text-base font-semibold leading-snug text-[var(--text)]">{col.asks}</p>
            <ul className="mt-3 space-y-2">
              {col.points.map((point) => (
                <li key={point} className="text-sm leading-snug text-[var(--text-secondary)]">
                  {point}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
