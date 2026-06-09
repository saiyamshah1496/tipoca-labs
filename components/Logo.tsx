import { DroidIcon } from "@/components/DroidIcon";

export default function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <DroidIcon size={26} />
      <span className="text-lg font-semibold tracking-tight text-[var(--text)]">
        Tipoca<span className="font-normal text-[var(--text-secondary)]"> Labs</span>
      </span>
    </div>
  );
}
