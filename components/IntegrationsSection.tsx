"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Ban, ListX, Shield, Tags, Timer } from "lucide-react";
import { BrandChip, type BrandId } from "@/components/IntegrationLogos";

const INPUT_GROUPS: { title: string; desc: string; brands: readonly BrandId[] }[] = [
  {
    title: "Commerce & transactional",
    desc: "Value profile · LTV, returns, discount usage",
    brands: ["shopify", "bigcommerce", "stripe", "woocommerce"],
  },
  {
    title: "Marketing automation",
    desc: "Fatigue profile · send volume, opens, unsubs",
    brands: ["braze", "klaviyo", "iterable", "hubspot"],
  },
  {
    title: "Behavioral data",
    desc: "Intent profile · sessions, cart, category views",
    brands: ["segment", "rudderstack", "mixpanel", "amplitude"],
  },
  {
    title: "Customer support",
    desc: "Sentiment profile · tickets, CSAT, severity",
    brands: ["zendesk", "gorgias", "intercom"],
  },
];

const OUTPUTS: {
  label: string;
  desc: string;
  icon: ReactNode;
  destinations: readonly BrandId[];
}[] = [
  {
    label: "Suppression lists",
    desc: "Exclude organic converters",
    icon: <ListX className="h-4 w-4 text-[var(--red)]" />,
    destinations: ["salesforce", "braze", "iterable"],
  },
  {
    label: "Tag & cohort updates",
    desc: "Fatigue · whale · exploit flags",
    icon: <Tags className="h-4 w-4 text-[var(--blue)]" />,
    destinations: ["salesforce", "hubspot"],
  },
  {
    label: "Throttle rules",
    desc: "Journey holds & send caps",
    icon: <Timer className="h-4 w-4 text-[var(--blue)]" />,
    destinations: ["braze", "iterable", "adobe"],
  },
  {
    label: "Hard blocks",
    desc: "HTTP 406 · schema violations",
    icon: <Ban className="h-4 w-4 text-[var(--red)]" />,
    destinations: ["agentforce", "salesforce"],
  },
];

function FlowCard({
  title,
  desc,
  brands,
  icon,
  align = "left",
}: {
  title: string;
  desc: string;
  brands: readonly BrandId[];
  icon?: ReactNode;
  align?: "left" | "center";
}) {
  const centered = align === "center";

  return (
    <div className="integrations-flow-card flex h-full min-h-[88px] flex-col justify-center px-4 py-3.5">
      <div
        className={
          centered
            ? "flex flex-col items-center gap-2 text-center"
            : "flex items-start gap-2"
        }
      >
        {icon && (
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[var(--surface)]/60">
            {icon}
          </div>
        )}
        <div className={centered ? "min-w-0" : "min-w-0 flex-1"}>
          <p className="text-sm font-medium leading-tight text-[var(--text)]">{title}</p>
          <p className="mt-0.5 text-sm leading-snug text-[var(--text-secondary)]">{desc}</p>
        </div>
      </div>
      <div className="mt-2.5 flex flex-wrap justify-center gap-1.5">
        {brands.map((id) => (
          <BrandChip key={id} id={id} />
        ))}
      </div>
    </div>
  );
}

function TipocaHub({ compact }: { compact?: boolean }) {
  return (
    <div className={`integrations-hub ${compact ? "w-full" : ""}`}>
      <div className="integrations-hub-head">
        <svg width="28" height="28" viewBox="0 0 26 26" fill="none" className="mx-auto" aria-hidden>
          <path d="M2 13h9" stroke="var(--red)" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
          <path d="M15 13h9" stroke="var(--blue)" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="10.5" y="8.5" width="5" height="9" rx="0.5" fill="var(--bg)" stroke="var(--border-strong)" />
          <circle cx="13" cy="13" r="1.5" fill="var(--blue)" />
        </svg>
        <p className="headline mt-1.5 text-base text-[var(--blue)]">Tipoca</p>
        <p className="label-mono text-[var(--text-tertiary)]">Inference engine</p>
      </div>
      <div className="integrations-hub-layers">
        {[
          { step: "Mirror", tech: "pgvector · 1:1 twins", accent: "text-[var(--blue)]" },
          { step: "Sandbox", tech: "K-means · counterfactual", accent: "text-[var(--violet)]" },
          { step: "Guardrails", tech: "DSPy · suppress API", accent: "text-[var(--green)]" },
        ].map((layer) => (
          <div key={layer.step} className="integrations-hub-layer">
            <p className={`text-sm font-semibold ${layer.accent}`}>{layer.step}</p>
            <p className="mt-0.5 caption-mono text-[var(--text-tertiary)]">{layer.tech}</p>
          </div>
        ))}
      </div>
      {!compact && (
        <p className="integrations-hub-foot label-mono text-[var(--text-tertiary)]">
          Not a system of record
        </p>
      )}
    </div>
  );
}

export default function IntegrationsSection() {
  return (
    <div className="integrations-flow">
      <div className="integrations-flow-desktop hidden lg:block">
        <div className="integrations-flow-grid">
          <p className="integrations-flow-label integrations-flow-label-in">Inputs</p>
          <span aria-hidden />
          <p className="integrations-flow-label integrations-flow-label-out">Outputs</p>

          <div className="integrations-flow-hub-slot">
            <TipocaHub />
          </div>

          {INPUT_GROUPS.map((group, i) => {
            const out = OUTPUTS[i];
            const row = i + 2;

            return (
              <div key={group.title} className="contents">
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="integrations-flow-row integrations-flow-row-in"
                  style={{ gridRow: row }}
                >
                  <FlowCard title={group.title} desc={group.desc} brands={group.brands} />
                  <span className="integrations-flow-connector integrations-flow-connector-in" aria-hidden />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="integrations-flow-row integrations-flow-row-out"
                  style={{ gridRow: row }}
                >
                  <span className="integrations-flow-connector integrations-flow-connector-out" aria-hidden />
                  <FlowCard
                    title={out.label}
                    desc={out.desc}
                    brands={out.destinations}
                    icon={out.icon}
                    align="center"
                  />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="integrations-flow-mobile space-y-8 lg:hidden">
        <div>
          <p className="integrations-flow-label integrations-flow-label-in mb-3">Inputs</p>
          <div className="space-y-3">
            {INPUT_GROUPS.map((group) => (
              <FlowCard key={group.title} title={group.title} desc={group.desc} brands={group.brands} />
            ))}
          </div>
        </div>

        <TipocaHub compact />

        <div>
          <p className="integrations-flow-label integrations-flow-label-out mb-3">Outputs</p>
          <div className="space-y-3">
            {OUTPUTS.map((out) => (
              <FlowCard
                key={out.label}
                title={out.label}
                desc={out.desc}
                brands={out.destinations}
                icon={out.icon}
                align="center"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="integrations-flow-foot">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <Shield className="h-3.5 w-3.5 shrink-0 text-[var(--blue)]" />
            Read-only ingest from your existing tools
          </div>
          <p className="label-mono text-[var(--text-tertiary)]">CRM & data · Tipoca · Send layer</p>
        </div>
      </div>
    </div>
  );
}
