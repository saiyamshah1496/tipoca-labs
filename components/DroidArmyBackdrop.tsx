"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BattleDroidSvg, buildArmy } from "@/lib/droids";

const DROID = 36;
const GAP = 10;
const CELL_W = DROID + GAP;
const CELL_H = DROID * 1.45 + GAP;

interface DroidArmyBackdropProps {
  active?: boolean;
}

export default function DroidArmyBackdrop({ active = false }: DroidArmyBackdropProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState({ cols: 34, rows: 14 });

  useEffect(() => {
    const section = rootRef.current?.parentElement;
    if (!section) return;

    const update = () => {
      const { width, height } = section.getBoundingClientRect();
      setGrid({
        cols: Math.max(20, Math.ceil(width / CELL_W) + 3),
        rows: Math.max(10, Math.ceil(height / CELL_H) + 3),
      });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(section);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const army = useMemo(() => buildArmy(false, grid.cols, grid.rows), [grid.cols, grid.rows]);

  return (
    <div ref={rootRef} className="droid-army-backdrop" aria-hidden>
      <div className="droid-army-backdrop-grid-wrap">
        <motion.div
          className="droid-army-backdrop-grid"
          style={{ "--droid-cols": grid.cols } as React.CSSProperties}
          animate={
            active
              ? { y: [0, -10, 0], x: [0, 6, 0] }
              : { y: [0, -14, 0], x: [0, -6, 0] }
          }
          transition={{ repeat: Infinity, duration: active ? 6 : 10, ease: "easeInOut" }}
        >
          {army.map((unit) => {
            const highlighted = unit.idx % 11 === 0;
            const waveDelay = unit.col * 0.06 + unit.row * 0.09;
            const drift = unit.col % 2 === 0 ? 2 : -2;

            return (
              <motion.div
                key={unit.idx}
                className="droid-army-backdrop-cell"
                animate={{
                  y: highlighted ? [0, -8, 0] : [0, -4, 0],
                  x: [0, drift, 0],
                  opacity: highlighted ? [0.26, 0.44, 0.26] : [0.16, 0.3, 0.16],
                  scale: highlighted ? [1, 1.06, 1] : [1, 1.03, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: highlighted ? 2.4 : 3.8,
                  delay: waveDelay,
                  ease: "easeInOut",
                }}
              >
                <BattleDroidSvg
                  colors={unit.colors}
                  lit={false}
                  sampled={highlighted}
                  suppressed={false}
                  size={DROID}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      <div className="droid-army-backdrop-fade" />
    </div>
  );
}
