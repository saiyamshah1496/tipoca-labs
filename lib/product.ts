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
  /** Punchy line for the AI-era buyer */
  headline: string;
  detail: string;
  /** What the team gets - outcome-oriented */
  outcome: string;
  tech: string;
  color: string;
  icon: LucideIcon;
  /** Highlight as the agentic core step */
  featured?: boolean;
}

export const GOVERNANCE_PIPELINE: PipelineStep[] = [
  {
    id: "classify",
    label: "Classify",
    title: "Classify the message",
    headline: "AI can draft a thousand variants overnight. Holdout knows what each one actually is.",
    detail:
      "Every send is tagged by type and channel - promo, winback, abandonment, transactional, and more. Human-built or agent-generated, the same taxonomy applies.",
    outcome: "One governance pipeline for campaigns, journeys, triggers, and autonomous drafts.",
    tech: "Intent & channel taxonomy",
    color: "var(--indigo)",
    icon: Tags,
  },
  {
    id: "policy",
    label: "Policy",
    title: "Policy preflight",
    headline: "Catch the hallucinated 90% discount before it reaches a single inbox.",
    detail:
      "Deterministic integrity checks run before any agent inference - discount claims, spam patterns, compliance, and brand rules. Fast, explainable, no LLM required.",
    outcome: "Hard blocks on copy that would never pass legal or brand review.",
    tech: "Integrity guardrails",
    color: "var(--red)",
    icon: Shield,
  },
  {
    id: "exposure",
    label: "Exposure",
    title: "Exposure limits",
    headline: "Fatigue isn't a segment problem. It's a per-person timing problem.",
    detail:
      "Frequency caps, burst limits, spacing rules, and journey density from real send history - measured from Braze, Klaviyo, and your behavioral stack.",
    outcome: "Stop the spam loop before unsubscribes show up in your dashboard.",
    tech: "Exposure guardrails",
    color: "var(--teal)",
    icon: Radio,
  },
  {
    id: "fit",
    label: "Fit",
    title: "Agentic fit judgment",
    headline: "Don't predict clicks. Ask each user's agent whether the message is worth their attention.",
    detail:
      "Every user gets an agent fed by commerce, fatigue, behavior, and support signals. It receives your message in full context - traits, timeline, relationship state - and judges worthiness like a person would.",
    outcome: "Simulation that answers \"would Maria unsubscribe?\" not \"what's the expected CTR?\"",
    tech: "Per-user agent inference",
    color: "var(--violet)",
    icon: Bot,
    featured: true,
  },
  {
    id: "economics",
    label: "Economics",
    title: "Economics check",
    headline: "Margin protection when AI makes it trivial to discount everything.",
    detail:
      "Full-message economics review flags organic converters, promo exploiters, and discount spend that exceeds projected return - before the send burns margin.",
    outcome: "Know who would have bought anyway before you pay them to.",
    tech: "Economics guardrails",
    color: "var(--amber)",
    icon: DollarSign,
  },
  {
    id: "verdict",
    label: "Verdict",
    title: "Verdict & dispatch",
    headline: "Simulate at cohort level. Govern at the individual. Ship with proof.",
    detail:
      "Clear, block, or skip - every decision traceable to the step that fired. Push suppression lists pre-send, or write holdout_gate_decision back to your CEP at dispatch.",
    outcome: "A staging environment for lifecycle marketing - finally.",
    tech: "Suppress API · live dispatch gate",
    color: "var(--green)",
    icon: CircleCheck,
  },
];

export const DECISION_STACK_CALLOUTS = [
  {
    stat: "∞",
    label: "AI-generated variants",
    sub: "Creation is free. Sending isn't.",
  },
  {
    stat: "1:1",
    label: "Agent per user",
    sub: "Not segment averages.",
  },
  {
    stat: "6",
    label: "Governance layers",
    sub: "Before anything ships.",
  },
] as const;

export const PROFILE_DIMENSIONS = [
  {
    id: "commerce",
    name: "Commerce",
    profile: "Commerce Profile",
    description: "LTV, RFM, discount elasticity, and refund patterns",
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
    description: "Send volume, cognitive load, opens, and unsubscribes",
    integrations: [
      { id: "braze", name: "Braze", live: true, cep: true },
      { id: "klaviyo", name: "Klaviyo", live: true, cep: true },
    ],
    signals: ["Send volume", "Open rate", "Cognitive load", "Channel affinity"],
    accent: "text-orange-600",
    border: "border-orange-200",
    bg: "bg-orange-50",
  },
  {
    id: "behavior",
    name: "Behavioral",
    profile: "Behavior Profile",
    description: "Purchase intent, cart velocity, and session depth",
    integrations: [
      { id: "segment", name: "Segment", live: true },
      { id: "amplitude", name: "Amplitude", live: true },
    ],
    signals: ["Product views", "Cart velocity", "Funnel drops", "Retention"],
    accent: "text-blue-600",
    border: "border-blue-200",
    bg: "bg-blue-50",
  },
  {
    id: "sentiment",
    name: "Support & sentiment",
    profile: "Sentiment Profile",
    description: "Open tickets, CSAT, and escalation severity",
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
    desc: "Pre-send exclusions pushed to your CEP",
    destinations: ["braze", "klaviyo"] as const,
  },
  {
    label: "Dispatch gate",
    desc: "Per-user allow / skip at send time in your CEP",
    destinations: ["braze", "klaviyo"] as const,
  },
  {
    label: "Exposure guardrails",
    desc: "Throttle rules from burst & spacing limits",
    destinations: ["braze", "klaviyo"] as const,
  },
  {
    label: "Preflight blocks",
    desc: "Policy failures before simulation runs",
    destinations: ["braze", "klaviyo"] as const,
  },
] as const;
