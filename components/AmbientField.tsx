"use client";

import { motion } from "framer-motion";

const TRACES = [
  { d: "M -40 120 Q 280 60 560 140 T 1280 80", delay: 0, dur: 7 },
  { d: "M -20 200 Q 340 160 620 220 T 1240 180", delay: 0.4, dur: 8 },
  { d: "M 0 280 Q 300 240 580 300 T 1200 260", delay: 0.8, dur: 9 },
  { d: "M 40 360 Q 360 300 680 380 T 1300 320", delay: 1.2, dur: 10 },
];

const NODES = [
  { x: "18%", y: "22%", delay: 0 },
  { x: "72%", y: "35%", delay: 1.2 },
  { x: "45%", y: "58%", delay: 2.4 },
  { x: "85%", y: "68%", delay: 0.6 },
];

export default function AmbientField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="trace-blue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--blue)" stopOpacity="0" />
            <stop offset="45%" stopColor="var(--blue)" stopOpacity="0.14" />
            <stop offset="55%" stopColor="var(--cyan)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--blue)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {TRACES.map(({ d, delay, dur }) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke="url(#trace-blue)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 1],
              opacity: [0, 0.55, 0.25],
            }}
            transition={{
              pathLength: { duration: 3, delay, ease: "easeOut" },
              opacity: { duration: dur, delay, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
            }}
          />
        ))}
      </svg>

      {NODES.map(({ x, y, delay }) => (
        <motion.span
          key={`${x}-${y}`}
          className="absolute h-1 w-1 rounded-full bg-[var(--cyan)]"
          style={{ left: x, top: y, boxShadow: "0 0 10px var(--cyan)" }}
          animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 3.5, delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
