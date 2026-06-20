import { SITE } from "@/lib/site";

function HoldoutMark({ size = 28 }: { size?: number }) {
  const barW = 5;
  const barH = 18;
  const barY = 7;
  const leftX = 7;
  const rightX = 20;
  const crossY = 13.5;
  const crossH = 4;
  const gap = 2.8;
  const innerLeft = leftX + barW;
  const innerRight = rightX;
  const crossArm = (innerRight - innerLeft - gap) / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="holdout-grad" x1="6" y1="4" x2="26" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#3730A3" />
        </linearGradient>
      </defs>
      <rect x={leftX} y={barY} width={barW} height={barH} rx={barW / 2} fill="url(#holdout-grad)" />
      <rect x={rightX} y={barY} width={barW} height={barH} rx={barW / 2} fill="url(#holdout-grad)" />
      <rect x={innerLeft} y={crossY} width={crossArm} height={crossH} rx={crossH / 2} fill="url(#holdout-grad)" />
      <rect x={innerLeft + crossArm + gap} y={crossY} width={crossArm} height={crossH} rx={crossH / 2} fill="url(#holdout-grad)" />
    </svg>
  );
}

export default function HoldoutLogo({ showTagline = false }: { showTagline?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <HoldoutMark size={28} />
      <div className="flex flex-col">
        <span className="text-lg font-semibold tracking-tight text-[var(--text)]">
          {SITE.productName}
        </span>
        {showTagline && (
          <span className="text-[11px] font-medium text-[var(--text-tertiary)]">
            by {SITE.companyName}
          </span>
        )}
      </div>
    </div>
  );
}
