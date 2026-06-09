"use client";

import { useMemo, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BattleDroidSvg, buildArmy, type CloneUnit } from "@/lib/droids";

const GRID = {
  default: { cols: 14, rows: 9 },
  hero: { cols: 30, rows: 12 },
} as const;

const TOTAL = 2_800_000;

interface DroidCloneFieldProps {
  active?: boolean;
  suppressRatio?: number;
  variant?: "hero" | "default";
}

const SIZES = {
  hero: {
    droid: 17,
    gap: 1,
    height: "h-[min(56vw,440px)] md:h-[480px]",
    scale: 1.22,
    rotateX: 54,
    perspective: 720,
  },
  default: { droid: 28, gap: 3, height: "h-[300px] md:h-[340px]", scale: 1, rotateX: 50, perspective: 600 },
};

export default function DroidCloneField({ active = false, suppressRatio = 0, variant = "default" }: DroidCloneFieldProps) {
  const isHero = variant === "hero";
  const sz = SIZES[variant];
  const { cols, rows } = GRID[variant];
  const visible = cols * rows;
  const army = useMemo(() => buildArmy(false, cols, rows), [cols, rows]);
  const [hovered, setHovered] = useState<CloneUnit | null>(null);
  const [sampleCount, setSampleCount] = useState(64);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ x: number; y: number; px: number; py: number } | null>(null);

  const sampleSet = useMemo(() => {
    const set = new Set<number>();
    const step = Math.max(1, Math.floor(visible / sampleCount));
    for (let i = 0; i < sampleCount && i * step < visible; i++) set.add(i * step);
    let j = 0;
    while (set.size < sampleCount && j < visible) {
      set.add(j);
      j++;
    }
    return set;
  }, [sampleCount, visible]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragRef.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [pan],
  );

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current) return;
    setPan({
      x: dragRef.current.px + (e.clientX - dragRef.current.x) * 0.35,
      y: dragRef.current.py + (e.clientY - dragRef.current.y) * 0.35,
    });
  }, []);

  const onPointerUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  const scaledSample = Math.round((sampleCount / visible) * TOTAL);

  const panelClass = isHero
    ? "clone-army-hero w-full"
    : "topology-panel relative w-full overflow-hidden rounded-sm";

  return (
    <div className={panelClass}>
      <div
        className={`px-4 py-3.5 md:px-5 ${
          isHero ? "clone-army-hero-hud" : "border-b border-[var(--border)]"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2">
            {isHero && (
              <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--blue)] opacity-70" />
            )}
            <p className={`label-mono ${isHero ? "text-[var(--text-tertiary)]" : "text-[var(--text-secondary)]"}`}>
              {isHero ? "Clone mirror · live sample" : "1:1 clone army"}
            </p>
          </div>
          <span className={`clone-army-hero-status ${active ? "active" : ""}`}>
            {active ? "Inferring on sample" : "1 user → 1 droid"}
          </span>
        </div>
      </div>

      <div
        className={`relative cursor-grab overflow-hidden active:cursor-grabbing ${sz.height} ${
          isHero ? "clone-army-hero-field" : ""
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {isHero && (
          <>
            <div className="clone-army-hero-grid" aria-hidden />
            <div className="clone-army-hero-vignette" aria-hidden />
          </>
        )}

        {!isHero && (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 50% 60%, rgba(26,79,255,0.04) 0%, transparent 65%)",
            }}
          />
        )}

        {isHero && active && (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(circle at 50% 45%, rgba(26,79,255,0.06) 0%, transparent 55%)",
            }}
          />
        )}

        <motion.div
          className="absolute left-1/2 top-1/2"
          style={{ x: pan.x, y: pan.y }}
          animate={
            active
              ? { scale: [1, 1.015, 1] }
              : isHero
                ? { scale: [1, 1.006, 1], y: [0, -2, 0] }
                : { scale: 1 }
          }
          transition={{
            repeat: Infinity,
            duration: active ? 2 : 5,
            ease: "easeInOut",
          }}
        >
          <div
            className="grid"
            style={{
              gap: sz.gap,
              gridTemplateColumns: `repeat(${cols}, ${sz.droid}px)`,
              transform: `translate(-50%, -50%) perspective(${sz.perspective}px) rotateX(${sz.rotateX}deg) scale(${sz.scale})`,
              transformOrigin: "center center",
            }}
          >
            {army.map((unit) => {
              const inSample = sampleSet.has(unit.idx);
              const isHovered = hovered?.idx === unit.idx;
              const suppressed = suppressRatio > 0 && inSample && unit.idx % 3 === 0;
              const waveDelay = (unit.col + unit.row) * 0.04;

              return (
                <motion.button
                  key={unit.idx}
                  type="button"
                  className="relative flex items-end justify-center rounded-sm border-0 bg-transparent p-0 outline-none"
                  onMouseEnter={() => setHovered(unit)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(unit)}
                  onBlur={() => setHovered(null)}
                  animate={{
                    y: active && inSample ? [0, -4, 0] : isHero && !active ? [0, -1, 0] : 0,
                    opacity: active && inSample ? [0.85, 1, 0.85] : inSample ? 1 : isHero ? 0.72 : 0.55,
                    scale: isHovered ? 1.25 : inSample ? 1.06 : 1,
                  }}
                  transition={{
                    y: {
                      repeat: (active && inSample) || (isHero && !active) ? Infinity : 0,
                      duration: active && inSample ? 1.4 : 3.2,
                      delay: waveDelay,
                    },
                    opacity: { repeat: active && inSample ? Infinity : 0, duration: 1.4, delay: waveDelay },
                    scale: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
                  }}
                  style={{
                    zIndex: isHovered ? 10 : inSample ? 2 : 1,
                    filter: isHero && inSample && !suppressed
                      ? `drop-shadow(0 2px 8px ${unit.colors.eye}44)`
                      : undefined,
                  }}
                >
                  <BattleDroidSvg
                    colors={unit.colors}
                    lit={isHovered}
                    sampled={inSample}
                    suppressed={suppressed}
                    size={sz.droid}
                    dark={false}
                  />
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute left-3 top-3 rounded-sm border border-[var(--border)] bg-[var(--bg)]/85 px-3 py-2.5 backdrop-blur-sm"
            >
              <p className="label-mono text-[var(--red)]">{hovered.userId}</p>
              <p className="mt-1 caption-mono text-[var(--blue)]">→ {hovered.cloneId}</p>
              <p className="mt-1.5 text-sm text-[var(--text-secondary)]">pgvector twin · same embedding</p>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="pointer-events-none absolute bottom-3 right-3 caption-mono text-[var(--text-tertiary)]">
          {isHero
            ? `${visible.toLocaleString()} of ${TOTAL.toLocaleString()} · drag to pan`
            : `Showing ${visible} of ${TOTAL.toLocaleString()} · drag to pan`}
        </p>
      </div>

      <div className={`px-4 py-3.5 md:px-5 ${isHero ? "clone-army-hero-hud" : "border-t border-[var(--border)]"}`}>
        <label className="block">
          <div className="mb-2 flex items-center justify-between gap-3 caption-mono">
            <span className="text-[var(--text-secondary)]">
              {isHero ? "Sample N clones" : "Pick N clones to simulate"}
            </span>
            <span className="shrink-0 font-medium text-[var(--blue)]">{scaledSample.toLocaleString()} users</span>
          </div>
          <input
            type="range"
            min={8}
            max={visible}
            step={1}
            value={sampleCount}
            onChange={(e) => setSampleCount(Number(e.target.value))}
            className="h-1 w-full cursor-pointer appearance-none rounded-full bg-[var(--border-strong)] accent-[var(--blue)]"
          />
        </label>
      </div>

      <div className={isHero ? "clone-army-hero-stats" : "grid grid-cols-3 divide-x divide-[var(--border)] border-t border-[var(--border)]"}>
        {[
          { label: isHero ? "Mirrored" : "Users mirrored", value: "2.8M" },
          { label: "In sample", value: scaledSample.toLocaleString() },
          { label: "Ratio", value: "1:1" },
        ].map((s) => (
          <div key={s.label} className={isHero ? "clone-army-hero-stat" : "px-3 py-3.5 md:px-4"}>
            <p className={isHero ? "clone-army-hero-stat-label" : "label-mono text-[var(--text-tertiary)]"}>{s.label}</p>
            <p className={isHero ? "clone-army-hero-stat-value" : "mt-1 font-[family-name:var(--mono)] text-sm font-medium text-[var(--blue)]"}>
              {s.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
