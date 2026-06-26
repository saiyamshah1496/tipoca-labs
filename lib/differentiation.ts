export interface DifferentiationColumn {
  id: string;
  label: string;
  asks: string;
  points: string[];
  muted?: boolean;
}

/** Compact contrast - factual, not adversarial */
export const DIFFERENTIATION_COLUMNS: DifferentiationColumn[] = [
  {
    id: "ml",
    label: "Predictive ML",
    asks: "How likely is this segment to click or convert?",
    muted: true,
    points: [
      "Strong at population-level propensity scoring",
      "Built on historical aggregates and segment features",
      "Best for ranking who to target in a campaign",
    ],
  },
  {
    id: "rl",
    label: "Reinforcement learning",
    asks: "What action maximizes long-run reward?",
    muted: true,
    points: [
      "Optimizes policies through live exploration",
      "Designed for sequential decision-making over time",
      "Best for long-horizon send-time optimization",
    ],
  },
  {
    id: "holdout",
    label: "Holdout",
    asks: "How would this person react to this message?",
    points: [
      "Agentic inference on each clone - commerce, fatigue, behavior, support",
      "Simulate on your CEP audience before anything ships",
      "Same inference at dispatch - traced verdict, full audit log",
    ],
  },
];

export const DIFFERENTIATION_ROWS = [
  { label: "Unit of decision", ml: "Segment", rl: "Policy", holdout: "Per contact" },
  { label: "Inference", ml: "Propensity scores", rl: "Policy at send time", holdout: "Agentic clone inference" },
  { label: "Learns on", ml: "Historical logs", rl: "Live sends", holdout: "Staged simulation" },
  { label: "Question", ml: "Who to target?", rl: "What maximizes reward?", holdout: "How would they react?" },
  { label: "Explainability", ml: "Feature weights", rl: "Learned policy", holdout: "Pipeline + audit" },
] as const;
