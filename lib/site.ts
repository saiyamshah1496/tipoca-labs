/** Marketing site constants - product links point at the deployed app. */
export const SITE = {
  productName: "Holdout",
  companyName: "Tipoca Labs",
  tagline: "Agentic governance, simulation & audit for lifecycle marketing",
  description:
    "Governance engine for lifecycle marketing - simulate on real audiences, gate every recipient at dispatch, audit every verdict.",
  heroHeadline: "Simulate. Govern.\nSend with confidence.",
  heroSubhead:
    "An agentic simulation and governance layer for lifecycle marketing and engagement - not just campaigns, but every message your team ships across email, push, SMS, and in-app.",
  problemDescription:
    "Engineering has CI/CD. Marketers ship campaigns, journeys, and AI-generated copy straight to users - no staging, no per-user gate.",
  problemAiLine:
    "When teams can generate 1,000 variants overnight, the bottleneck isn't drafting - it's knowing what should never ship.",
  problemSolution:
    "Simulate on your CEP audience pre-send. Apply ALLOW/SKIP at dispatch. Every step logged.",
  differentiationDescription:
    "Simulate on real contacts. Ship what you've already seen.",
  platformDescription:
    "One digital clone per contact - commerce, fatigue, behavior, and support profiles hydrated from your stack. Not segment rollups.",
  howItWorksDescription:
    "Classify and preflight deterministically. Run agentic judgment only where needed. Same config for simulation and dispatch.",
  integrationsDescription:
    "Eight connectors in via Nango. Suppression lists and holdout_gate_decision out to Braze and Klaviyo at dispatch.",
  useCasesDescription:
    "Journey fatigue, margin protection, complaint freeze, and live dispatch gating - the scenarios teams run before production.",
  ctaHeadline: "Stop learning on live customers.",
  ctaSubhead:
    "Connect your stack, simulate a draft campaign, push exclusions, gate dispatch - with a full audit log.",
} as const;

/** Deployed Holdout app (Vercel) */
export const APP_URL = "https://holdout-two.vercel.app";
export const APP_LOGIN_URL = `${APP_URL}/login?next=%2F`;
export const APP_SIGNUP_URL = `${APP_URL}/signup`;

const BOOKING_URL_FALLBACK = "https://calendar.app.google/5rUw27VJ3E2mcFGh8";

export const CONTACT_BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || BOOKING_URL_FALLBACK;

export const HAS_CONTACT_BOOKING = Boolean(CONTACT_BOOKING_URL);

export const CONTACT = {
  headline: "Talk to the team",
  subhead:
    "Piloting with your stack or wiring dispatch? Book a walkthrough tailored to your CEP and send volume.",
  bookingLabel: "Book a call",
  bookingDetail: "30 minutes · Google Meet",
  bookingNote: "Pick a slot - you'll get a calendar invite with a Meet link.",
  bookingHint:
    "Add your ESP (Braze, Klaviyo, etc.) and rough monthly send volume in the booking notes.",
} as const;

export const NAV_LINKS = [
  { href: "#differentiation", label: "Why Holdout" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#integrations", label: "Integrations" },
  { href: "#contact", label: "Contact", requiresBooking: true as const },
] as const;
