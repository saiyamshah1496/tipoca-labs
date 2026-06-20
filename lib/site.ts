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
} as const;

/** Deployed Holdout app (Vercel) */
export const APP_URL = "https://holdout-two.vercel.app";
export const APP_LOGIN_URL = `${APP_URL}/login?next=%2F`;
export const APP_SIGNUP_URL = `${APP_URL}/signup`;
