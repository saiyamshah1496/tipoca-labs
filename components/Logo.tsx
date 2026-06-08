export default function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
        <path d="M2 13h9" stroke="var(--red)" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
        <path d="M15 13h9" stroke="var(--blue)" strokeWidth="1.2" strokeLinecap="round" />
        <rect x="10.5" y="8.5" width="5" height="9" rx="0.5" fill="white" stroke="var(--border-strong)" />
        <line x1="13" y1="8.5" x2="13" y2="17.5" stroke="var(--blue)" strokeWidth="0.8" opacity="0.5" />
        <circle cx="13" cy="13" r="1.5" fill="var(--blue)" />
      </svg>
      <span className="text-lg font-semibold tracking-tight text-[var(--text)]">
        Tipoca<span className="font-normal text-[var(--text-secondary)]"> Labs</span>
      </span>
    </div>
  );
}
