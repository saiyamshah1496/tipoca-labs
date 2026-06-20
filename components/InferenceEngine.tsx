"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LAYERS = [
  {
    step: "01",
    title: "Continuous memory & embedding",
    tech: "Segment · Kafka · SLM · pgvector",
    body: "Event streams and CRM snapshots flow in continuously. Audience profiles are built from commerce, engagement, and support signals - Holdout reads your stack, it doesn't replace it.",
    color: "var(--blue)",
  },
  {
    step: "02",
    title: "Semantic mirror",
    tech: "pgvector · 1:1 embeddings",
    body: "Every user becomes a digital twin - same profile vector, same predicted behavior. Not a segment average. The semantic database grows richer over time than the native warehouse alone.",
    color: "var(--violet)",
  },
  {
    step: "03",
    title: "Stratified sampling",
    tech: "K-means · edge-weighted N",
    body: "You control compute by choosing N - 500 for a logic check or 50,000 for a Black Friday launch. K-means with edge-weighted bias over-indexes whales and churn risks in every sample.",
    color: "var(--teal)",
  },
  {
    step: "04",
    title: "Constrained agentic inference",
    tech: "LangGraph · DSPy · JSON schema",
    body: "Draft payloads run in a multi-agent sandbox. DSPy constrains LLM output to deterministic JSON - Buy, Unsubscribe, Exploit - simulating causal reception, not unstructured prose.",
    color: "var(--amber)",
  },
  {
    step: "05",
    title: "Bidirectional guardrails",
    tech: "Blast radius · suppress API · HTTP 406",
    body: "The engine aggregates simulated actions into a statistical blast radius, then pushes suppression lists, throttle rules, and hard HTTP 406 blocks back to Agentforce and your CRM before ship.",
    color: "var(--green)",
  },
];

export default function InferenceEngine() {
  const [active, setActive] = useState(2);

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="panel overflow-hidden rounded-sm">
        {LAYERS.map((layer, i) => (
          <button
            key={layer.step}
            type="button"
            onClick={() => setActive(i)}
            className={`grid w-full gap-2 border-b border-[var(--border)] px-5 py-4 text-left transition-colors last:border-b-0 md:grid-cols-[3rem_1fr] md:gap-4 md:px-6 ${
              active === i ? "bg-[var(--surface-dim)]" : "hover:bg-[var(--surface-dim)]/60"
            }`}
            style={{ borderLeftWidth: 3, borderLeftColor: active === i ? layer.color : "transparent" }}
          >
            <span className="font-[family-name:var(--mono)] text-sm" style={{ color: layer.color }}>
              {layer.step}
            </span>
            <div>
              <h3 className="text-lg font-semibold text-[var(--text)]">{layer.title}</h3>
              <AnimatePresence mode="wait">
                {active === i && (
                  <motion.p
                    key={layer.step}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-2 overflow-hidden text-base leading-relaxed text-[var(--text-secondary)]"
                  >
                    {layer.body}
                  </motion.p>
                )}
              </AnimatePresence>
              <p className="mt-1.5 label-mono" style={{ color: layer.color }}>
                {layer.tech}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
