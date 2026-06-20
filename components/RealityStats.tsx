"use client";

import { motion } from "framer-motion";
import { revealUp } from "@/lib/motion";

const STATS = [
  { label: "A/B tests", value: "Reactive", warn: false },
  { label: "Dashboards", value: "Explain the past", warn: false },
  { label: "Focus groups", value: "Distort reality", warn: false },
  { label: "Predictive ML", value: "Segment averages", warn: false },
  { label: "Corrections", value: "Burn margin", warn: true },
];

export default function RealityStats() {
  return (
    <motion.div
      custom={0.2}
      variants={revealUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="readout-table"
    >
      {STATS.map((stat) => (
        <div key={stat.label} className="readout-row">
          <span className="readout-label">{stat.label}</span>
          <span className={stat.warn ? "readout-value readout-value-warn" : "readout-value"}>
            {stat.value}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
