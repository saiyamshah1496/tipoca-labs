/** Marketing site constants - product links point at the deployed app. */
export const SITE = {
  productName: "Holdout",
  companyName: "Tipoca Labs",
  tagline: "Agentic simulation & governance for lifecycle marketing",
  description:
    "An agentic simulation and governance layer for lifecycle marketing and engagement - stress-test campaigns, journeys, and every message before send, then gate dispatch per user.",
  heroHeadline: "Simulate. Govern.\nSend with confidence.",
  heroSubhead:
    "An agentic simulation and governance layer for lifecycle marketing and engagement - not just campaigns, but every message your team ships across email, push, SMS, and in-app.",
  problemDescription:
    "Every engineering team gets CI/CD. Marketers get production — campaigns, journeys, and AI-generated copy all go live without a sandbox.",
  problemAiLine:
    "When every team can generate 1,000 variants overnight, the bottleneck isn't drafting — it's knowing which messages should never ship.",
} as const;

/** Deployed Holdout app (Vercel) */
export const APP_URL = "https://holdout-two.vercel.app";
export const APP_LOGIN_URL = `${APP_URL}/login?next=%2F`;
export const APP_SIGNUP_URL = `${APP_URL}/signup`;

/**
 * Google Workspace appointment schedule booking page.
 * Paste your link in BOOKING_URL_FALLBACK below, or set NEXT_PUBLIC_BOOKING_URL in .env.local / Vercel.
 *
 * Setup: calendar.google.com → Create → Appointment schedule → add Google Meet → Share booking page
 */
const BOOKING_URL_FALLBACK = "https://calendar.app.google/5rUw27VJ3E2mcFGh8";

export const CONTACT_BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || BOOKING_URL_FALLBACK;

export const HAS_CONTACT_BOOKING = Boolean(CONTACT_BOOKING_URL);

/** Contact — calendar booking only (no company inbox) */
export const CONTACT = {
  headline: "Talk to the team",
  subhead:
    "Piloting Holdout with your stack, enterprise rollout, or walking through a use case? Grab time on the calendar — we'll tailor the conversation to your ESP and send volume.",
  bookingLabel: "Book a call",
  bookingDetail: "30 minutes · Google Meet",
  bookingNote: "Pick a slot — you'll get a calendar invite with a Meet link.",
  bookingHint:
    "Evaluating for your team? Add your ESP (Braze, Klaviyo, etc.) and rough monthly send volume in the booking notes.",
} as const;
