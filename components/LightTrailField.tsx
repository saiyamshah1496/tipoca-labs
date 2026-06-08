"use client";

import { motion } from "framer-motion";

export default function LightTrailField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="light-trail light-trail-a"
        animate={{ x: ["-8%", "4%", "-8%"], y: ["0%", "6%", "0%"], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="light-trail light-trail-b"
        animate={{ x: ["6%", "-4%", "6%"], y: ["4%", "-2%", "4%"], opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="light-trail light-trail-c"
        animate={{ x: ["-4%", "8%", "-4%"], opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );
}
