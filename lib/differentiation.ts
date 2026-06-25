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
    asks: "Is this the right message for this person right now?",
    points: [
      "Per-contact clone - commerce, fatigue, behavior, support",
      "Simulate on your CEP audience before anything ships",
      "Same playbook at dispatch - traced verdict, full audit log",
    ],
  },
];

export const DIFFERENTIATION_ROWS = [
  { label: "Unit of decision", ml: "Segment", rl: "Policy", holdout: "Per contact" },
  { label: "Learns on", ml: "Historical logs", rl: "Live sends", holdout: "Staged simulation" },
  { label: "Question", ml: "Who to target?", rl: "What maximizes reward?", holdout: "Right message now?" },
  { label: "Explainability", ml: "Feature weights", rl: "Learned policy", holdout: "Pipeline + audit" },
] as const;
