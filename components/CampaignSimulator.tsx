"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Check, Loader2, Play, RotateCcw } from "lucide-react";
import { BrandChip } from "@/components/IntegrationLogos";
import "./sandbox-workbench.css";

export type Phase = "idle" | "sampling" | "simulating" | "complete";

const PRODUCTION_N = 100_000;

const GOAL_EVENTS = [
  { id: "purchase_completed", label: "Purchase completed" },
  { id: "trial_started", label: "Trial started" },
  { id: "subscription_renewed", label: "Subscription renewed" },
] as const;

const PIPELINE = [
  { id: "ingest", label: "Ingest" },
  { id: "mirror", label: "Mirror" },
  { id: "sample", label: "Sample" },
  { id: "infer", label: "Infer" },
  { id: "guard", label: "Guard" },
] as const;

export interface SimResult {
  sampleN: number;
  goalEvent: string;
  organicConverters: number;
  discountConverters: number;
  organicOpens: number;
  promoOpens: number;
  organicClicks: number;
  promoClicks: number;
  unsubscribes: number;
  exploiters: number;
  suppressCount: number;
  marginSaved: number;
  goalBaseline: number;
  goalIncremental: number;
  goalTotalRaw: number;
  goalTotalCleared: number;
  projectedGoalRaw: number;
  projectedGoalCleared: number;
  projectedBaseline: number;
  projectedRawOpens: number;
  projectedClearedOpens: number;
  projectedRawClicks: number;
  projectedClearedClicks: number;
  projectedClearedRecipients: number;
  projectedUnsubs: number;
  projectedSuppress: number;
  projectedMarginSaved: number;
}

function computeResult(n: number, goalEvent: string): SimResult {
  const organicConverters = Math.round(n * 0.128);
  const discountConverters = Math.round(n * 0.214);
  const organicOpens = Math.round(n * 0.274);
  const promoOpens = Math.round(n * 0.106);
  const organicClicks = Math.round(n * 0.142);
  const promoClicks = Math.round(n * 0.058);
  const unsubscribes = Math.round(n * 0.034);
  const exploiters = Math.round(n * 0.008);
  const marginSaved = Math.round(organicConverters * 47);
  const scale = PRODUCTION_N / n;

  const projectedSuppress = Math.round(organicConverters * scale);

  return {
    sampleN: n,
    goalEvent,
    organicConverters,
    discountConverters,
    organicOpens,
    promoOpens,
    organicClicks,
    promoClicks,
    unsubscribes,
    exploiters,
    suppressCount: organicConverters,
    marginSaved,
    goalBaseline: organicConverters,
    goalIncremental: discountConverters,
    goalTotalRaw: organicConverters + discountConverters,
    goalTotalCleared: discountConverters,
    projectedBaseline: Math.round(organicConverters * scale),
    projectedGoalRaw: Math.round((organicConverters + discountConverters) * scale),
    projectedGoalCleared: Math.round(discountConverters * scale),
    projectedRawOpens: Math.round((organicOpens + promoOpens) * scale),
    projectedClearedOpens: Math.round(promoOpens * scale),
    projectedRawClicks: Math.round((organicClicks + promoClicks) * scale),
    projectedClearedClicks: Math.round(promoClicks * scale),
    projectedClearedRecipients: PRODUCTION_N - projectedSuppress,
    projectedUnsubs: Math.round(unsubscribes * scale),
    projectedSuppress,
    projectedMarginSaved: Math.round(marginSaved * scale),
  };
}

interface CampaignSimulatorProps {
  onSimulate?: (result: SimResult | null, phase: Phase) => void;
}

export default function CampaignSimulator({ onSimulate }: CampaignSimulatorProps) {
  const [sampleN, setSampleN] = useState(10000);
  const [goalEvent, setGoalEvent] = useState<string>(GOAL_EVENTS[0].id);
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<SimResult | null>(null);

  const preview = computeResult(sampleN, goalEvent);
  const display = result && phase === "complete" ? result : preview;
  const simReady = phase === "complete" && result;
  const busy = phase === "sampling" || phase === "simulating";

  const pipelineIndex =
    phase === "sampling" ? 2 : phase === "simulating" ? 3 : phase === "complete" ? 4 : 0;

  const goalLabel = GOAL_EVENTS.find((g) => g.id === goalEvent)?.label ?? goalEvent;

  const runSimulation = useCallback(async () => {
    setResult(null);
    onSimulate?.(null, "sampling");
    setPhase("sampling");
    await delay(900);
    onSimulate?.(null, "simulating");
    setPhase("simulating");
    await delay(1200);
    const res = computeResult(sampleN, goalEvent);
    setResult(res);
    setPhase("complete");
    onSimulate?.(res, "complete");
  }, [sampleN, goalEvent, onSimulate]);

  const reset = () => {
    setPhase("idle");
    setResult(null);
    onSimulate?.(null, "idle");
  };

  const funnelSteps = [
    { key: "recipients", label: "Recipients", raw: PRODUCTION_N, cleared: display.projectedClearedRecipients },
    { key: "opens", label: "Opens", raw: display.projectedRawOpens, cleared: display.projectedClearedOpens },
    { key: "clicks", label: "Clicks", raw: display.projectedRawClicks, cleared: display.projectedClearedClicks },
    { key: "goal", label: goalLabel, raw: display.projectedGoalRaw, cleared: display.projectedGoalCleared },
  ];

  const statusLabel =
    phase === "complete" ? "Deploy authorized" : busy ? "Field active" : "Droids idle";

  return (
    <div className="sandbox-app">
      <header className="sandbox-appbar">
        <div className="sandbox-appbar-left">
          <div className="sandbox-app-icon" aria-hidden>
            BD
          </div>
          <div>
            <p className="sandbox-app-title">Clone exercise</p>
            <p className="sandbox-app-meta">exercise_kam7 · retention wave · droid batch 20%</p>
          </div>
        </div>
        <div className="sandbox-appbar-right">
          <span className="sandbox-env">Staging bay</span>
          <span
            className={`sandbox-run-status ${phase === "complete" ? "is-done" : busy ? "is-running" : ""}`}
          >
            <span className="sandbox-run-status-dot" aria-hidden />
            {statusLabel}
          </span>
        </div>
      </header>

      <div className="sandbox-steps" role="list" aria-label="Pipeline progress">
        {PIPELINE.map((step, i) => {
          const complete = i < pipelineIndex || phase === "complete";
          const active = i === pipelineIndex && busy;
          return (
            <div key={step.id} className="flex items-center" role="listitem">
              {i > 0 && (
                <div className={`sandbox-step-connector ${complete ? "is-complete" : ""}`} aria-hidden />
              )}
              <div className={`sandbox-step ${complete ? "is-complete" : active ? "is-active" : ""}`}>
                <div className="sandbox-step-marker">
                  {complete ? <Check className="h-2.5 w-2.5" strokeWidth={2.5} /> : i + 1}
                </div>
                <span className="sandbox-step-label">{step.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="sandbox-body">
        <aside className="sandbox-config">
          <h3 className="sandbox-config-heading">Exercise brief</h3>
          <p className="sandbox-config-sub">
            {PRODUCTION_N.toLocaleString()} live cohort · mirrored to droids · unsent
          </p>

          <div className="sandbox-field">
            <label className="sandbox-field-label" htmlFor="sandbox-audience">
              Audience
            </label>
            <div id="sandbox-audience" className="sandbox-field-value">
              High intent · last 90 days
            </div>
          </div>
          <div className="sandbox-field">
            <label className="sandbox-field-label" htmlFor="sandbox-offer">
              Offer
            </label>
            <div id="sandbox-offer" className="sandbox-field-value">
              20% off · email + push
            </div>
          </div>
          <div className="sandbox-field">
            <label className="sandbox-field-label" htmlFor="sandbox-goal">
              Goal event
            </label>
            <select
              id="sandbox-goal"
              value={goalEvent}
              disabled={busy}
              onChange={(e) => setGoalEvent(e.target.value)}
              className="sandbox-select"
            >
              {GOAL_EVENTS.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>
          <div className="sandbox-field">
            <div className="flex items-center justify-between">
              <label className="sandbox-field-label" htmlFor="sandbox-sample">
                Droid sample N
              </label>
              <span className="font-[family-name:var(--mono)] text-xs text-[var(--text-secondary)]">
                {sampleN.toLocaleString()}
              </span>
            </div>
            <input
              id="sandbox-sample"
              type="range"
              min={500}
              max={50000}
              step={500}
              value={sampleN}
              disabled={busy}
              onChange={(e) => setSampleN(Number(e.target.value))}
              className="sandbox-range"
            />
          </div>

          <div className="sandbox-config-actions">
            {busy ? (
              <div className="sandbox-running">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                {phase === "sampling" ? "Deploying droids…" : "Mirror inference running…"}
              </div>
            ) : phase === "complete" ? (
              <button type="button" onClick={reset} className="sandbox-btn-secondary">
                <RotateCcw className="h-3.5 w-3.5" />
                Reset field
              </button>
            ) : (
              <button type="button" onClick={runSimulation} className="sandbox-btn-run">
                <Play className="h-3.5 w-3.5" />
                Deploy to droids
              </button>
            )}
          </div>
        </aside>

        <div className="sandbox-workspace">
          <div className="sandbox-kpis">
            <KpiCard label="Cohort cleared" value={display.projectedClearedRecipients} note="Organic droids scrubbed" />
            <KpiCard
              label="Organic droids"
              value={display.projectedBaseline}
              note="Would convert without promo"
            />
            <KpiCard
              label="Incremental lift"
              value={display.projectedGoalCleared}
              note="True promo response"
              highlight
            />
            <KpiCard
              label="Margin protected"
              value={display.projectedMarginSaved}
              note="USD · full-price buyers"
              prefix="$"
              positive
            />
          </div>

          <div className="sandbox-panel">
            <div className="sandbox-panel-head">
              <div>
                <p className="sandbox-panel-title">Blast radius @ 100K send</p>
                <p className="sandbox-panel-desc">Live cohort vs. cleared droid field</p>
              </div>
              <div className="sandbox-legend">
                <span className="sandbox-legend-item">
                  <span className="sandbox-legend-dot is-baseline" />
                  Live cohort
                </span>
                <span className="sandbox-legend-item">
                  <span className="sandbox-legend-dot is-cleared" />
                  Guardrail pass
                </span>
              </div>
            </div>
            <table className="sandbox-metric-table">
              <thead>
                <tr>
                  <th>Stage</th>
                  <th>Live cohort</th>
                  <th>Guardrail pass</th>
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>
                {funnelSteps.map((step) => (
                  <MetricRow
                    key={step.key}
                    label={step.label}
                    raw={step.raw}
                    cleared={step.cleared}
                    max={PRODUCTION_N}
                    emphasize={step.key === "goal"}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className={`sandbox-panel ${!simReady ? "is-locked" : ""}`}>
            <div className="sandbox-panel-head">
              <div className="sandbox-outputs-head">
                <div>
                  <p className="sandbox-panel-title">Guardrail manifest</p>
                  <p className="sandbox-panel-desc">
                    Suppress list · scaled from {sampleN.toLocaleString()} droid clones
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="sandbox-destinations">
                    <BrandChip id="braze" />
                    <BrandChip id="salesforce" />
                  </div>
                  <button type="button" className="sandbox-export-btn" disabled={!simReady}>
                    Push manifest
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="sandbox-output-summary">
              <div className="sandbox-output-stat">
                <p className="sandbox-output-stat-label">Suppress</p>
                <p className="sandbox-output-stat-value">
                  <CountUp value={display.projectedSuppress} />
                </p>
              </div>
              <div className="sandbox-output-stat">
                <p className="sandbox-output-stat-label">Fatigue hold</p>
                <p className="sandbox-output-stat-value">
                  <CountUp value={display.projectedUnsubs} />
                </p>
              </div>
              <div className="sandbox-output-stat">
                <p className="sandbox-output-stat-label">Cleared field</p>
                <p className="sandbox-output-stat-value">
                  <CountUp value={display.projectedClearedRecipients} />
                </p>
              </div>
            </div>

            <div className="sandbox-table-wrap">
              <table className="sandbox-table">
                <thead>
                  <tr>
                    <th>Clone ID</th>
                    <th>Droid signal</th>
                    <th>Confidence</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: "clone_8f2a1c", signal: "Organic buyer", confidence: "98.2%", action: "Suppress" },
                    { id: "clone_3b91e0", signal: "Organic click", confidence: "94.7%", action: "Suppress" },
                    { id: "clone_c4d7f2", signal: "Fatigue risk", confidence: "91.1%", action: "Throttle" },
                    { id: "clone_1a9e44", signal: "Promo exploiter", confidence: "96.4%", action: "Block" },
                  ].map((row) => (
                    <tr key={row.id}>
                      <td className="cell-id">{row.id}</td>
                      <td>{row.signal}</td>
                      <td>{row.confidence}</td>
                      <td>
                        <ActionBadge action={row.action} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="sandbox-table-foot">
                Showing 4 of {display.projectedSuppress.toLocaleString()} · full list via API
              </p>
            </div>

            {!simReady && (
              <p className="sandbox-panel-placeholder">
                Deploy droids to populate the suppress manifest
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricRow({
  label,
  raw,
  cleared,
  max,
  emphasize,
}: {
  label: string;
  raw: number;
  cleared: number;
  max: number;
  emphasize?: boolean;
}) {
  const delta = cleared - raw;
  const deltaPct = raw > 0 ? ((delta / raw) * 100).toFixed(1) : "0.0";
  const rawPct = Math.min(100, (raw / max) * 100);
  const clearedPct = Math.min(100, (cleared / max) * 100);
  const isDown = delta < 0;

  return (
    <tr className={emphasize ? "is-emphasis" : undefined}>
      <td className="sandbox-metric-stage">{label}</td>
      <td>
        <div className="sandbox-metric-bar-cell">
          <div className="sandbox-metric-bar-wrap" aria-hidden>
            <motion.div
              className="sandbox-metric-bar is-baseline"
              initial={{ width: 0 }}
              animate={{ width: `${rawPct}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          {raw.toLocaleString()}
        </div>
      </td>
      <td>
        <div className="sandbox-metric-bar-cell">
          <div className="sandbox-metric-bar-wrap" aria-hidden>
            <motion.div
              className="sandbox-metric-bar is-cleared"
              initial={{ width: 0 }}
              animate={{ width: `${clearedPct}%` }}
              transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          {cleared.toLocaleString()}
        </div>
      </td>
      <td>
        <span className={`sandbox-delta ${isDown ? "is-down" : delta > 0 ? "is-up" : "is-neutral"}`}>
          {isDown ? <ArrowDown className="h-3 w-3" /> : null}
          {delta > 0 ? "+" : ""}
          {delta.toLocaleString()} ({deltaPct}%)
        </span>
      </td>
    </tr>
  );
}

function KpiCard({
  label,
  value,
  note,
  prefix,
  highlight,
  positive,
}: {
  label: string;
  value: number;
  note: string;
  prefix?: string;
  highlight?: boolean;
  positive?: boolean;
}) {
  return (
    <div className={`sandbox-kpi ${highlight ? "is-highlight" : ""} ${positive ? "is-positive" : ""}`}>
      <p className="sandbox-kpi-label">{label}</p>
      <p className="sandbox-kpi-value">
        {prefix}
        <CountUp value={value} />
      </p>
      <p className="sandbox-kpi-note">{note}</p>
    </div>
  );
}

function ActionBadge({ action }: { action: string }) {
  const tone =
    action === "Suppress" ? "is-suppress" : action === "Block" ? "is-block" : "is-throttle";
  return <span className={`sandbox-badge ${tone}`}>{action}</span>;
}

function CountUp({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 600;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);

  return <>{display.toLocaleString()}</>;
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
