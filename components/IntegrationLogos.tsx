export type BrandId =
  | "salesforce"
  | "segment"
  | "kafka"
  | "braze"
  | "iterable"
  | "hubspot"
  | "adobe"
  | "agentforce"
  | "webhook"
  | "shopify"
  | "bigcommerce"
  | "stripe"
  | "woocommerce"
  | "klaviyo"
  | "rudderstack"
  | "mixpanel"
  | "amplitude"
  | "zendesk"
  | "gorgias"
  | "intercom";

const BRANDS: Record<BrandId, { label: string; color: string; bg: string; mark?: string }> = {
  salesforce: { label: "Salesforce", color: "#00A1E0", bg: "#E6F7FC" },
  segment: { label: "Segment", color: "#52BD95", bg: "#EDF9F3" },
  kafka: { label: "Kafka", color: "#231F20", bg: "#F3F3F3" },
  braze: { label: "Braze", color: "#FF5A5F", bg: "#FFF0F0" },
  iterable: { label: "Iterable", color: "#672BF5", bg: "#F3EEFF" },
  hubspot: { label: "HubSpot", color: "#FF7A59", bg: "#FFF2EE" },
  adobe: { label: "Adobe", color: "#EB1000", bg: "#FFEFEF" },
  agentforce: { label: "Agentforce", color: "#0176D3", bg: "#E8F4FD" },
  webhook: { label: "Webhooks", color: "#555550", bg: "#F0F0EC" },
  shopify: { label: "Shopify", color: "#96BF48", bg: "#F4F9EC", mark: "S" },
  bigcommerce: { label: "BigCommerce", color: "#34313F", bg: "#EEEEF0", mark: "B" },
  stripe: { label: "Stripe", color: "#635BFF", bg: "#F0EFFF", mark: "S" },
  woocommerce: { label: "WooCommerce", color: "#7F54B3", bg: "#F5F0FA", mark: "W" },
  klaviyo: { label: "Klaviyo", color: "#2B2B2B", bg: "#F3F3F3", mark: "K" },
  rudderstack: { label: "RudderStack", color: "#FA6C36", bg: "#FFF4EE", mark: "R" },
  mixpanel: { label: "Mixpanel", color: "#7856FF", bg: "#F3EEFF", mark: "M" },
  amplitude: { label: "Amplitude", color: "#1F1F59", bg: "#EEEEF5", mark: "A" },
  zendesk: { label: "Zendesk", color: "#03363D", bg: "#E8F2F3", mark: "Z" },
  gorgias: { label: "Gorgias", color: "#FF5924", bg: "#FFF0EB", mark: "G" },
  intercom: { label: "Intercom", color: "#286EFA", bg: "#EEF3FE", mark: "I" },
};

function BrandMark({ color, letter }: { color: string; letter: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden>
      <rect width="24" height="24" rx="5" fill={color} />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fill="#fff"
        fontSize="11"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
      >
        {letter}
      </text>
    </svg>
  );
}

function BrandSvg({ id }: { id: BrandId }) {
  const brand = BRANDS[id];
  if (brand.mark) {
    return <BrandMark color={brand.color} letter={brand.mark} />;
  }

  switch (id) {
    case "salesforce":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden>
          <path
            fill="#00A1E0"
            d="M10.2 4.5c-1.1-1.2-2.7-1.9-4.5-1.9C2.9 2.6.5 5.1.5 8.1c0 .5.1 1 .2 1.5 1.2-.6 2.6-.9 4.1-.9 2.2 0 4.2.8 5.7 2.1-.5-1.5-1.5-2.8-2.8-3.8l2.5-.5zm8.8 2.6c-1.5 0-2.9.5-4 1.4 1.4 1.2 2.3 3 2.3 5 0 .4 0 .8-.1 1.2 1.3-.8 2.8-1.2 4.4-1.2 3.1 0 5.6 2.5 5.6 5.6s-2.5 5.6-5.6 5.6c-1.2 0-2.3-.4-3.2-1 1.1 1.5 2.9 2.5 4.9 2.5 3.4 0 6.1-2.7 6.1-6.1 0-3.7-3.2-6.7-7.4-6.7-1.7 0-3.3.6-4.6 1.6.9-1.8 2.8-3 4.9-3 3 0 5.5 2.4 5.5 5.4 0 .3 0 .6-.1.9-.8-.5-1.7-.8-2.7-.8z"
          />
        </svg>
      );
    case "segment":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden>
          <path fill="#52BD95" d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.2l7.5 3.75v7.5L12 19.2l-7.5-3.75v-7.5L12 4.2z" />
          <circle cx="12" cy="12" r="3" fill="#52BD95" />
        </svg>
      );
    case "kafka":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden>
          <circle cx="12" cy="5" r="2.5" fill="#231F20" />
          <circle cx="6" cy="12" r="2.5" fill="#231F20" />
          <circle cx="18" cy="12" r="2.5" fill="#231F20" />
          <circle cx="12" cy="19" r="2.5" fill="#231F20" />
          <path stroke="#231F20" strokeWidth="1.2" d="M12 7.5v3M9 10.5l3 1.5M15 10.5l-3 1.5M12 14.5v3M9 13.5l3 1.5M15 13.5l-3 1.5" />
        </svg>
      );
    case "braze":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden>
          <rect x="3" y="6" width="18" height="12" rx="2" fill="#FF5A5F" />
          <path fill="white" d="M8 10h8v1.5H8zm0 2.5h5.5v1.5H8z" />
        </svg>
      );
    case "iterable":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden>
          <path fill="#672BF5" d="M4 6h16v2.5H4V6zm0 5h10v2.5H4V11zm0 5h14v2.5H4V16z" />
        </svg>
      );
    case "hubspot":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden>
          <circle cx="12" cy="12" r="3" fill="#FF7A59" />
          <circle cx="12" cy="4.5" r="2" fill="#FF7A59" />
          <circle cx="12" cy="19.5" r="2" fill="#FF7A59" />
          <circle cx="4.5" cy="12" r="2" fill="#FF7A59" />
          <circle cx="19.5" cy="12" r="2" fill="#FF7A59" />
          <path stroke="#FF7A59" strokeWidth="1.2" d="M12 6.5v3M12 14.5v3M6.5 12h3M14.5 12h3" />
        </svg>
      );
    case "adobe":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="2" fill="#EB1000" />
          <path fill="white" d="M8 17l2.5-9L13 17h-1.4l-.6-2.2H9l-.6 2.2H7zm2.8-3.5h1.4L10.5 9.5 10.8 13.5zM14.5 8h1.5v9h-1.5V8z" />
        </svg>
      );
    case "agentforce":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden>
          <rect x="4" y="6" width="16" height="12" rx="2" fill="#0176D3" />
          <circle cx="9.5" cy="11" r="1.5" fill="white" />
          <circle cx="14.5" cy="11" r="1.5" fill="white" />
          <path stroke="white" strokeWidth="1.2" strokeLinecap="round" d="M9 14.5c.8.8 1.7 1 2.5 1s1.7-.2 2.5-1" />
          <path stroke="white" strokeWidth="1" d="M12 6V4M9 4.5h6" />
        </svg>
      );
    case "webhook":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden>
          <path
            fill="none"
            stroke="#555550"
            strokeWidth="1.5"
            strokeLinecap="round"
            d="M7 8.5c0-2.8 2.2-5 5-5s5 2.2 5 5M7 8.5v2M17 8.5v2M7 10.5c0 3.3 2.7 6 6 6h1c3.3 0 6-2.7 6-6"
          />
          <circle cx="12" cy="17" r="1.5" fill="#555550" />
        </svg>
      );
  }
}

export function BrandChip({ id }: { id: BrandId }) {
  const brand = BRANDS[id];
  return (
    <div
      className="flex h-8 items-center gap-1.5 rounded-md border border-[var(--border)] px-2"
      style={{ backgroundColor: brand.bg }}
    >
      <BrandSvg id={id} />
      <span className="whitespace-nowrap text-sm font-medium leading-none" style={{ color: brand.color }}>
        {brand.label}
      </span>
    </div>
  );
}
