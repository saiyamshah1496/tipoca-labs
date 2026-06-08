export const DROID_PALETTE_LIGHT = [
  { head: "#b8c8f0", body: "#d0dcf8", limb: "#a8b8d8", eye: "#1a4fff" },
  { head: "#c0dcc8", body: "#d8ecd8", limb: "#a8c8b0", eye: "#16a34a" },
  { head: "#e8c8c8", body: "#f5dcdc", limb: "#d0a8a8", eye: "#d4183d" },
  { head: "#e0d4b8", body: "#f0e8d0", limb: "#c8b898", eye: "#c47d2a" },
  { head: "#d0c8e8", body: "#e4dcf4", limb: "#b0a8d0", eye: "#6b5b95" },
  { head: "#b8d8e0", body: "#d0ecf0", limb: "#98c0c8", eye: "#0d9488" },
  { head: "#d8d0d8", body: "#ece8ec", limb: "#b8b0b8", eye: "#5c5c58" },
  { head: "#c8d0e8", body: "#dce4f8", limb: "#a0b0d0", eye: "#3b6fd4" },
] as const;

export const DROID_PALETTE_DARK = [
  { head: "#a8bdd8", body: "#8aa0c0", limb: "#c8d8ec", eye: "#00d4ff" },
  { head: "#a0c8b0", body: "#78a890", limb: "#c8e8d4", eye: "#34d399" },
  { head: "#d8a8b0", body: "#b88898", limb: "#ecc8d0", eye: "#fb7185" },
  { head: "#d8c898", body: "#b8a878", limb: "#ece0c0", eye: "#fbbf24" },
  { head: "#c0b0d8", body: "#9888b8", limb: "#dcd0ec", eye: "#e879f9" },
  { head: "#98c8d8", body: "#70a8b8", limb: "#c0e4ec", eye: "#22d3ee" },
  { head: "#b8b8c0", body: "#9898a8", limb: "#d8d8e0", eye: "#94a3b8" },
  { head: "#a0b8d8", body: "#7898b8", limb: "#c8d8ec", eye: "#60a5fa" },
] as const;

export interface DroidColors {
  head: string;
  body: string;
  limb: string;
  eye: string;
}

export interface CloneUnit {
  idx: number;
  userId: string;
  cloneId: string;
  col: number;
  row: number;
  colors: DroidColors;
}

export function buildArmy(dark: boolean, cols: number, rows: number): CloneUnit[] {
  const palette = dark ? DROID_PALETTE_DARK : DROID_PALETTE_LIGHT;
  const units: CloneUnit[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const idx = row * cols + col;
      const seed = 10000 + idx * 7919;
      units.push({
        idx,
        userId: `usr_${seed.toString(36)}`,
        cloneId: `clone_${seed.toString(36)}`,
        col,
        row,
        colors: palette[idx % palette.length],
      });
    }
  }
  return units;
}

export function BattleDroidSvg({
  colors,
  lit,
  sampled,
  suppressed,
  size = 28,
  dark = false,
}: {
  colors: DroidColors;
  lit: boolean;
  sampled: boolean;
  suppressed: boolean;
  size?: number;
  dark?: boolean;
}) {
  const glow = lit || sampled;
  const glowId = `glow-${colors.eye.replace("#", "")}`;

  return (
    <svg width={size} height={size * 1.45} viewBox="0 0 24 36" fill="none" aria-hidden>
      {dark && glow && (
        <defs>
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      )}
      <ellipse
        cx="12"
        cy="6.5"
        rx="5.5"
        ry="6"
        fill={colors.head}
        stroke={dark ? (glow ? colors.eye : "rgba(255,255,255,0.35)") : colors.limb}
        strokeWidth={dark ? "0.9" : "0.6"}
        opacity={suppressed ? 0.55 : 1}
        filter={dark && glow ? `url(#${glowId})` : undefined}
      />
      <rect
        x="9"
        y="5.2"
        width="6"
        height="2"
        rx="0.8"
        fill={colors.eye}
        opacity={glow ? 1 : dark ? 0.9 : 0.75}
      />
      {dark && glow && (
        <rect x="9.5" y="5.5" width="5" height="1.2" rx="0.4" fill={colors.eye} opacity="0.5" />
      )}
      <rect x="10.5" y="12" width="3" height="2.5" fill={colors.limb} opacity={suppressed ? 0.5 : 1} />
      <path
        d="M7.5 14.5h9v11h-9z"
        fill={colors.body}
        stroke={dark ? "rgba(255,255,255,0.28)" : colors.limb}
        strokeWidth={dark ? "0.7" : "0.5"}
        opacity={suppressed ? 0.5 : 1}
      />
      <rect x="5" y="15.5" width="2" height="9" rx="0.8" fill={colors.limb} opacity={suppressed ? 0.5 : 1} />
      <rect x="17" y="15.5" width="2" height="9" rx="0.8" fill={colors.limb} opacity={suppressed ? 0.5 : 1} />
      <rect x="8" y="25.5" width="2.8" height="9" rx="1" fill={colors.limb} opacity={suppressed ? 0.5 : 1} />
      <rect x="13.2" y="25.5" width="2.8" height="9" rx="1" fill={colors.limb} opacity={suppressed ? 0.5 : 1} />
      {sampled && (
        <circle
          cx="20"
          cy="4"
          r="2"
          fill={colors.eye}
          opacity="0.95"
          filter={dark ? `url(#${glowId})` : undefined}
        />
      )}
      {suppressed && dark && (
        <line x1="4" y1="32" x2="20" y2="4" stroke="#f43f5e" strokeWidth="0.6" opacity="0.7" />
      )}
    </svg>
  );
}
