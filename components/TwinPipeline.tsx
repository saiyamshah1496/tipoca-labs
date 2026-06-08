"use client";

import { motion } from "framer-motion";

const NODES = [
  { id: "ingest", label: "Ingest", tech: "Kafka" },
  { id: "mirror", label: "Mirror", tech: "pgvector" },
  { id: "sample", label: "Sample", tech: "K-means" },
  { id: "infer", label: "Infer", tech: "counterfactual" },
  { id: "guard", label: "Guard", tech: "DSPy" },
];

interface TwinPipelineProps {
  phase: "idle" | "sampling" | "simulating" | "complete";
}

export default function TwinPipeline({ phase }: TwinPipelineProps) {
  const activeIndex =
    phase === "sampling" ? 2 : phase === "simulating" ? 3 : phase === "complete" ? 4 : 0;

  return (
    <div className="panel-inset rounded-sm px-3 py-3 md:px-4">
      <p className="label-mono text-[var(--text-secondary)]">
        Inference pipeline
      </p>

      <div className="relative mt-4 flex items-center justify-between">
        <div className="absolute left-4 right-4 top-[11px] h-px bg-[var(--border)]" />
        <motion.div
          className="absolute left-4 top-[11px] h-px origin-left bg-gradient-to-r from-[var(--blue)] to-[var(--cyan)] shadow-[0_0_8px_var(--blue-glow)]"
          animate={{ width: `${(activeIndex / (NODES.length - 1)) * 100}%` }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: "calc(100% - 2rem)" }}
        />

        {NODES.map((node, i) => (
          <div key={node.id} className="relative z-10 flex flex-col items-center gap-2">
            <motion.div
              animate={{
                scale: i === activeIndex && phase !== "idle" ? [1, 1.2, 1] : 1,
                borderColor: i <= activeIndex ? "var(--cyan)" : "var(--border-strong)",
                backgroundColor: i <= activeIndex ? "var(--blue)" : "var(--surface)",
                boxShadow:
                  i === activeIndex && phase !== "idle"
                    ? ["0 0 0 rgba(0,207,232,0)", "0 0 12px rgba(0,207,232,0.5)", "0 0 0 rgba(0,207,232,0)"]
                    : i <= activeIndex
                      ? "0 0 8px rgba(26,79,255,0.25)"
                      : "none",
              }}
              transition={{
                scale: { repeat: i === activeIndex && phase !== "idle" ? Infinity : 0, duration: 1.2 },
                boxShadow: { repeat: i === activeIndex && phase !== "idle" ? Infinity : 0, duration: 1.2 },
              }}
              className="flex h-[22px] w-[22px] items-center justify-center rounded-full border-2"
            >
              {i < activeIndex && (
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4L3.5 6L6.5 2" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              )}
              {i === activeIndex && phase !== "idle" && (
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
              )}
            </motion.div>
            <div className="flex flex-col items-center gap-0.5">
              <span
                className={`label-mono ${
                  i <= activeIndex ? "text-[var(--blue)]" : "text-[var(--text-secondary)]"
                }`}
              >
                {node.label}
              </span>
              <span className="caption-mono text-[var(--text-tertiary)]">{node.tech}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
