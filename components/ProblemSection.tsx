"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { PROBLEM_SCENARIOS, PROBLEM_SOLUTION_STEPS } from "@/lib/product";
import { SITE } from "@/lib/site";

export default function ProblemSection() {
  return (
    <div className="problem-board mx-auto w-full max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="problem-insight"
      >
        <div className="problem-insight-icon" aria-hidden>
          <Sparkles size={14} strokeWidth={2} />
        </div>
        <p className="problem-insight-text">{SITE.problemAiLine}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="problem-grid-head"
      >
        <div className="problem-head-cell problem-head-scenario">Scenario</div>
        <div className="problem-head-cell">Without Holdout</div>
      </motion.div>

      {PROBLEM_SCENARIOS.map((scenario, i) => (
        <motion.div
          key={scenario.tag}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 + i * 0.05 }}
          className={`problem-grid-row ${i % 2 === 0 ? "problem-grid-row-alt" : ""}`}
        >
          <div className="problem-scenario-label">{scenario.tag}</div>
          <div className="problem-scenario-detail">{scenario.detail}</div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25 }}
        className="problem-grid-row problem-solution-row"
      >
        <div className="problem-scenario-label problem-solution-tag">With Holdout</div>
        <div className="problem-solution-inline">
          {PROBLEM_SOLUTION_STEPS.map((step, i) => (
            <div key={step} className="problem-solution-item">
              <span className="problem-step-index">{i + 1}</span>
              <span className="problem-step-text">{step}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
