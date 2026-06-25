"use client";

import { motion } from "framer-motion";
import { REALITY_STATS } from "@/lib/product";
import { revealUp } from "@/lib/motion";

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
      {REALITY_STATS.map((stat) => (
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
