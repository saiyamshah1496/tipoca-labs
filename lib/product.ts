import type { LucideIcon } from "lucide-react";
import {
  Tags,
  Shield,
  Radio,
  Bot,
  DollarSign,
  CircleCheck,
} from "lucide-react";

export interface PipelineStep {
  id: string;
  label: string;
  title: string;
  headline: string;
  detail: string;
  outcome: string;
  tech: string;
  color: string;
  icon: LucideIcon;
  featured?: boolean;
}

export const GOVERNANCE_PIPELINE: PipelineStep[] = [
  {
    id: "classify",
    label: "Classify",
    title: "Classify the message",
    headline: "Nine campaign types. Six channels. One taxonomy for human and agent-generated copy.",
    detail:
      "Nine campaign types across six channels - promo, winback, abandonment, loyalty, and more. Same taxonomy for human and agent-generated copy.",
    outcome: "The same governance pipeline for campaigns, journeys, triggers, and autonomous agent drafts.",
    tech: "9 campaign types · 6 channels · proportionality profiles",
    color: "var(--indigo)",
    icon: Tags,
  },
  {
    id: "policy",
    label: "Policy",
    title: "Integrity preflight",
    headline: "Deterministic. No LLM. Runs before a single droid spins up.",
    detail:
      "Hallucinated discounts, fake urgency, missing unsubscribe - hard-blocked in milliseconds. No LLM. Same preflight in simulation and dispatch.",
    outcome: "Catch the 90% off everything before it reaches a single inbox.",
    tech: "Integrity guardrails · CAN-SPAM · AI safety · instant block",
    color: "var(--red)",
    icon: Shield,
  },
  {
    id: "exposure",
    label: "Exposure",
    title: "Exposure limits",
    headline: "AI agents lack intuition about we emailed them four times this week. We count the sends.",
    detail:
      "Frequency caps, burst limits, and cognitive load from real CEP send history. Pre-suppress over-cap contacts before agents run.",
    outcome: "Fatigue governance from measured exposure, not segment averages.",
    tech: "Exposure guardrails · cognitive load preflight · cross-channel volume",
    color: "var(--teal)",
    icon: Radio,
  },
  {
    id: "fit",
    label: "Fit",
    title: "Agentic worthiness",
    headline: "Not will they click? Would a reasonable version of this person feel this message is justified?",
    detail:
      "Each clone gets the full message in context - commerce, fatigue, behavior, support. Responds RESPONSE, IGNORE, UNSUBSCRIBE, or SUPPRESSED.",
    outcome: "Simulation that answers would Maria unsubscribe? - not what's the expected CTR?",
    tech: "Per-clone LLM role-play · episodic buffer · pgvector cohort sampling",
    color: "var(--violet)",
    icon: Bot,
    featured: true,
  },
  {
    id: "economics",
    label: "Economics",
    title: "Economics guardrail",
    headline: "Know who would have bought anyway before you pay them to.",
    detail:
      "Flags organic converters and promo waste before send. Block when projected discount spend exceeds your risk budget.",
    outcome: "Campaign-level ROI gate before send day, not a post-mortem dashboard.",
    tech: "Economics guardrails · organic converter detection · GMV risk budget",
    color: "var(--amber)",
    icon: DollarSign,
  },
  {
    id: "verdict",
    label: "Verdict",
    title: "Verdict & write-back",
    headline: "Simulate at cohort level. Govern at the individual. Ship with proof.",
    detail:
      "Pre-send: suppression lists to your CEP. At dispatch: holdout_gate_decision on profile. Braze and Klaviyo branch on allow vs skip.",
    outcome: "Predicted vs. live CEP outcomes tracked per campaign. Every verdict in the audit log.",
    tech: "holdout_gate_decision · suppression lists · audit trail · outcomes loop",
    color: "var(--green)",
    icon: CircleCheck,
  },
];

export const DECISION_STACK_CALLOUTS = [
  {
    stat: "2",
    label: "Execution modes",
    sub: "Predict cohort · apply per user.",
  },
  {
    stat: "1:1",
    label: "Clone per contact",
    sub: "Not segment CTR averages.",
  },
  {
    stat: "6",
    label: "Pipeline layers",
    sub: "Deterministic first, LLM where needed.",
  },
] as const;

export const PROFILE_DIMENSIONS = [
  {
    id: "commerce",
    name: "Commerce",
    profile: "Commerce Profile",
    description: "LTV, RFM, discount elasticity, and refund patterns from order and payment data",
    integrations: [
      { id: "shopify", name: "Shopify", live: true },
      { id: "stripe", name: "Stripe", live: true },
    ],
    signals: ["LTV", "AOV", "RFM", "Refund ratio", "Coupon usage"],
    accent: "text-emerald-600",
    border: "border-emerald-200",
    bg: "bg-emerald-50",
  },
  {
    id: "fatigue",
    name: "Engagement & fatigue",
    profile: "Fatigue Profile",
    description: "Send volume, cognitive load, and channel affinity - synced from your CEP",
    integrations: [
      { id: "braze", name: "Braze", live: true, cep: true },
      { id: "klaviyo", name: "Klaviyo", live: true, cep: true },
    ],
    signals: ["Send volume", "Cognitive load", "Channel affinity", "Open rate"],
    accent: "text-orange-600",
    border: "border-orange-200",
    bg: "bg-orange-50",
  },
  {
    id: "behavior",
    name: "Behavioral",
    profile: "Behavior Profile",
    description: "Cart velocity, funnel drops, and category affinity from event streams",
    integrations: [
      { id: "segment", name: "Segment", live: true },
      { id: "amplitude", name: "Amplitude", live: true },
    ],
    signals: ["Cart velocity", "Session depth", "Funnel drops", "Retention"],
    accent: "text-blue-600",
    border: "border-blue-200",
    bg: "bg-blue-50",
  },
  {
    id: "sentiment",
    name: "Support & sentiment",
    profile: "Sentiment Profile",
    description: "Open tickets, CSAT, escalation severity - complaint freeze before promos reach angry customers",
    integrations: [
      { id: "zendesk", name: "Zendesk", live: true },
      { id: "intercom", name: "Intercom", live: true },
    ],
    signals: ["Open tickets", "CSAT", "Escalation severity", "Resolution time"],
    accent: "text-violet-600",
    border: "border-violet-200",
    bg: "bg-violet-50",
  },
] as const;

export const COMING_SOON_INTEGRATIONS = [
  "Iterable",
  "HubSpot",
  "Mixpanel",
  "BigCommerce",
  "Gorgias",
] as const;

export const DISPATCH_OUTPUTS = [
  {
    label: "Suppression lists",
    desc: "Pre-send exclusions - Holdout Suppress (Klaviyo) · Holdout Exclusion (Braze)",
    destinations: ["braze", "klaviyo"] as const,
  },
  {
    label: "Dispatch gate",
    desc: "holdout_gate_decision + holdout_gate_reason on CEP profile at send time",
    destinations: ["braze", "klaviyo"] as const,
  },
  {
    label: "Exposure guardrails",
    desc: "Frequency caps, burst limits, cognitive load throttles from guardrails config",
    destinations: ["braze", "klaviyo"] as const,
  },
  {
    label: "Preflight blocks",
    desc: "Integrity failures before simulation or dispatch - HTTP 406 with reason code",
    destinations: ["braze", "klaviyo"] as const,
  },
] as const;

export const USE_CASES = [
  {
    tag: "Simulation · Journeys",
    metric: "−18%",
    line: "Who is about to unsubscribe?",
    detail:
      "Simulate Braze Canvas or Klaviyo Flow against fatigue profiles. Pre-suppress at-risk users with per-type blast radius thresholds.",
    accent: "panel-accent-red",
    metricColor: "text-[var(--red)]",
    tagColor: "text-[var(--red)]",
  },
  {
    tag: "Economics · Margin",
    metric: "$847K",
    line: "Who would have bought anyway?",
    detail:
      "Economics guardrail flags organic converters before the promo ships. Suppression list pushed to your CEP pre-send.",
    accent: "panel-accent-blue",
    metricColor: "text-[var(--indigo)]",
    tagColor: "text-[var(--indigo)]",
  },
  {
    tag: "Integrity · Complaint freeze",
    metric: "0",
    line: "Send promos to angry customers?",
    detail:
      "CRITICAL tickets or CSAT ≤ 2 - deterministic block before any agent runs. Same rule in simulation and dispatch.",
    accent: "panel-accent-violet",
    metricColor: "text-[var(--violet)]",
    tagColor: "text-[var(--violet)]",
  },
  {
    tag: "Dispatch · Live gate",
    metric: "100%",
    line: "Govern every user at send?",
    detail:
      "holdout_gate_decision on CEP profile. Braze Decision Split or Klaviyo conditional split branches on allow vs skip.",
    accent: "panel-accent-green",
    metricColor: "text-[var(--green)]",
    tagColor: "text-[var(--green)]",
  },
] as const;

export const PROBLEM_PAIN_POINTS = [
  "Launch a Canvas to 100K users. Discover fatigue from unsubscribe data three weeks later.",
  "Let an AI agent draft the message. Pray it doesn't hallucinate a 90% discount.",
  "A/B test on live customers. Burn margin correcting what simulation would have caught.",
] as const;

export const REALITY_STATS = [
  { label: "A/B tests", value: "Reactive · live customers", warn: false },
  { label: "Predictive ML", value: "Segment CTR averages", warn: false },
  { label: "Copy review", value: "Manual · pre-send only", warn: false },
  { label: "ESP frequency caps", value: "Channel-blind", warn: false },
  { label: "Holdout", value: "Per-clone · pre-send + dispatch", warn: true },
] as const;
