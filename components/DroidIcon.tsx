interface DroidIconProps {
  size?: number;
  className?: string;
}

export function DroidIcon({ size = 26, className = "" }: DroidIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Antenna stem */}
      <line x1="14" y1="3" x2="14" y2="7.5" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Antenna tip */}
      <circle cx="14" cy="2" r="1.5" fill="var(--violet)" />

      {/* Head */}
      <rect x="5" y="7" width="18" height="13" rx="4" fill="var(--surface-raised)" stroke="var(--border-strong)" strokeWidth="1" />

      {/* Left eye */}
      <circle cx="10" cy="13.5" r="2.5" fill="var(--bg)" />
      <circle cx="10" cy="13.5" r="1.6" fill="var(--blue)" />
      <circle cx="9.2" cy="12.7" r="0.7" fill="white" fillOpacity="0.7" />

      {/* Right eye */}
      <circle cx="18" cy="13.5" r="2.5" fill="var(--bg)" />
      <circle cx="18" cy="13.5" r="1.6" fill="var(--blue)" />
      <circle cx="17.2" cy="12.7" r="0.7" fill="white" fillOpacity="0.7" />

      {/* Mouth grill */}
      <rect x="10.5" y="17.5" width="7" height="1.2" rx="0.6" fill="var(--border-strong)" />

      {/* Body */}
      <rect x="7" y="21" width="14" height="7" rx="3" fill="var(--surface-raised)" stroke="var(--border-strong)" strokeWidth="1" />
      {/* Body glow dot */}
      <circle cx="14" cy="24.5" r="2" fill="var(--blue)" opacity="0.25" />
      <circle cx="14" cy="24.5" r="1.2" fill="var(--blue)" />
    </svg>
  );
}
