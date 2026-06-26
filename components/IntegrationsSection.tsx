"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ListX, Shield, Timer, Ban } from "lucide-react";
import { BrandChip, type BrandId } from "@/components/IntegrationLogos";
import { COMING_SOON_INTEGRATIONS, DISPATCH_OUTPUTS, PROFILE_DIMENSIONS } from "@/lib/product";

const INPUT_GROUPS = PROFILE_DIMENSIONS.map((dim) => ({
  title: dim.name,
  desc: `${dim.profile} · ${dim.signals.slice(0, 3).join(", ")}`,
  brands: dim.integrations.map((i) => i.id as BrandId),
}));

const OUTPUT_ICONS: Record<string, ReactNode> = {
  "Suppression lists": <ListX className="h-4 w-4 text-[var(--red)]" />,
  "Dispatch gate": <Shield className="h-4 w-4 text-[var(--indigo)]" />,
  "Exposure guardrails": <Timer className="h-4 w-4 text-[var(--teal)]" />,
  "Preflight blocks": <Ban className="h-4 w-4 text-[var(--red)]" />,
};

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
      <div className={centered ? "flex flex-col items-center gap-2 text-center" : "flex items-start gap-2"}>
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

function HoldoutHub({ compact }: { compact?: boolean }) {
  return (
    <div className={`integrations-hub ${compact ? "w-full" : ""}`}>
      <div className="integrations-hub-head">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="mx-auto" aria-hidden>
          <rect x="7" y="7" width="5" height="18" rx="2.5" fill="var(--indigo)" />
          <rect x="20" y="7" width="5" height="18" rx="2.5" fill="var(--indigo)" />
          <rect x="12" y="13.5" width="3.6" height="4" rx="2" fill="var(--indigo)" />
          <rect x="16.4" y="13.5" width="3.6" height="4" rx="2" fill="var(--indigo)" />
        </svg>
        <p className="mt-1.5 text-base font-semibold text-[var(--indigo)]">Holdout</p>
        <p className="label-mono text-[var(--text-tertiary)]">Governance layer</p>
      </div>
      <div className="integrations-hub-layers">
        {[
          { step: "Ingest", tech: "8 live connectors", accent: "text-[var(--indigo)]" },
          { step: "Simulate", tech: "Cohort + agentic fit", accent: "text-[var(--violet)]" },
          { step: "Govern", tech: "Suppress · gate · block", accent: "text-[var(--green)]" },
        ].map((layer) => (
          <div key={layer.step} className="integrations-hub-layer">
            <p className={`text-sm font-semibold ${layer.accent}`}>{layer.step}</p>
            <p className="mt-0.5 caption-mono text-[var(--text-tertiary)]">{layer.tech}</p>
          </div>
        ))}
      </div>
      {!compact && (
        <p className="integrations-hub-foot label-mono text-[var(--text-tertiary)]">
          Reads your stack · not a system of record
        </p>
      )}
    </div>
  );
}

export default function IntegrationsSection() {
  const outputs = DISPATCH_OUTPUTS.map((out) => ({
    ...out,
    icon: OUTPUT_ICONS[out.label],
    destinations: out.destinations as readonly BrandId[],
  }));

  return (
    <div className="integrations-flow">
      <div className="integrations-flow-desktop hidden lg:block">
        <div className="integrations-flow-grid">
          <p className="integrations-flow-label integrations-flow-label-in">Signal sources</p>
          <span aria-hidden />
          <p className="integrations-flow-label integrations-flow-label-out">Governance outputs</p>

          <div className="integrations-flow-hub-slot">
            <HoldoutHub />
          </div>

          {INPUT_GROUPS.map((group, i) => {
            const out = outputs[i];
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
          <p className="integrations-flow-label integrations-flow-label-in mb-3">Signal sources</p>
          <div className="space-y-3">
            {INPUT_GROUPS.map((group) => (
              <FlowCard key={group.title} title={group.title} desc={group.desc} brands={group.brands} />
            ))}
          </div>
        </div>

        <HoldoutHub compact />

        <div>
          <p className="integrations-flow-label integrations-flow-label-out mb-3">Governance outputs</p>
          <div className="space-y-3">
            {outputs.map((out) => (
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

      <div className="integrations-flow-foot space-y-3">
        <div className="flex items-center justify-center gap-2 text-sm text-[var(--text-secondary)] sm:justify-start">
          <Shield className="h-3.5 w-3.5 shrink-0 text-[var(--indigo)]" />
          Read-only ingest · isolated per workspace
        </div>
        <p className="text-center text-sm text-[var(--text-tertiary)] sm:text-left">
          Expanding to {COMING_SOON_INTEGRATIONS.join(", ")}, and more.
        </p>
      </div>
    </div>
  );
}
