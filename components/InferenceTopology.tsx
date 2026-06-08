"use client";

import { motion } from "framer-motion";

const USERS = [
  { name: "Maria K.", userId: "usr_8f2a1c" },
  { name: "James L.", userId: "usr_3b91e0" },
];

interface InferenceTopologyProps {
  active?: boolean;
}

export default function InferenceTopology({ active = false }: InferenceTopologyProps) {
  return (
    <div className="topology-panel overflow-hidden rounded-sm">
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3 md:px-5">
        <p className="label-mono text-[var(--text-tertiary)]">
          User → clone mirror
        </p>
        <motion.span
          animate={{ opacity: active ? [0.5, 1, 0.5] : 0.75 }}
          transition={{ repeat: active ? Infinity : 0, duration: 1.6 }}
          className="label-mono text-[var(--blue)]"
        >
          {active ? "Syncing" : "1:1 mapping"}
        </motion.span>
      </div>

      <div className="divide-y divide-[var(--border)]">
        {USERS.map((user, i) => (
          <div
            key={user.userId}
            className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-3 md:gap-4 md:px-5"
          >
            <div className="rounded-sm border border-[var(--red)]/15 bg-[var(--red-soft)] px-3 py-2">
              <p className="text-base font-medium">{user.name}</p>
              <p className="caption-mono text-[var(--red)]">{user.userId}</p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <motion.div
                className="h-px w-10 bg-[var(--blue)]/40"
                animate={{ opacity: active ? [0.3, 1, 0.3] : 0.5 }}
                transition={{ repeat: active ? Infinity : 0, duration: 1.5, delay: i * 0.2 }}
              />
              <span className="caption-mono uppercase text-[var(--text-tertiary)]">1:1</span>
            </div>

            <div className="flex items-center gap-2 rounded-sm border border-[var(--blue)]/20 bg-[var(--blue-soft)] px-3 py-2">
              <MiniDroid active={active} delay={i} />
              <div>
                <p className="text-base font-medium">Clone</p>
                <p className="caption-mono text-[var(--blue)]">
                  clone_{user.userId.slice(4)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="border-t border-[var(--border)] px-4 py-3 label-mono text-[var(--text-tertiary)] md:px-5">
        × 2.8M users in your CRM
      </p>
    </div>
  );
}

function MiniDroid({ active, delay }: { active: boolean; delay: number }) {
  return (
    <motion.div
      animate={active ? { y: [0, -2, 0] } : {}}
      transition={{ repeat: active ? Infinity : 0, duration: 1.2, delay: delay * 0.1 }}
      className="shrink-0"
    >
      <svg width="20" height="28" viewBox="0 0 24 36" fill="none" aria-hidden>
        <ellipse cx="12" cy="6.5" rx="5.5" ry="6" fill="#cdd3dc" stroke="#9aa5b5" strokeWidth="0.6" />
        <rect x="9" y="5.2" width="6" height="2" rx="0.8" fill="#1a4fff" />
        <path d="M7.5 14.5h9v11h-9z" fill="#d8dee8" stroke="#9aa5b5" strokeWidth="0.5" />
      </svg>
    </motion.div>
  );
}
