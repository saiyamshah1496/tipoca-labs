"use client";

import { motion } from "framer-motion";
import { PROFILE_DIMENSIONS } from "@/lib/product";

export default function ProfileDimensionsSection() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {PROFILE_DIMENSIONS.map((dim, i) => (
        <motion.article
          key={dim.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          className="panel-dark rounded-md p-5"
        >
          <div className="flex items-start justify-between gap-3">
            <span className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] font-semibold ${dim.bg} ${dim.border} ${dim.accent}`}>
              {dim.name}
            </span>
            <span className="text-[11px] font-medium text-[var(--text-tertiary)]">{dim.profile}</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{dim.description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {dim.integrations.map((tool) => (
              <span
                key={tool.id}
                className="rounded-md border border-[var(--border)] bg-[var(--surface-dim)] px-2 py-1 text-xs font-medium text-[var(--text)]"
              >
                {tool.name}
                {"cep" in tool && tool.cep && (
                  <span className="ml-1 text-[10px] text-[var(--indigo)]">· dispatch</span>
                )}
              </span>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-1">
            {dim.signals.slice(0, 4).map((sig) => (
              <span key={sig} className="text-[10px] text-[var(--text-tertiary)]">
                {sig}{sig !== dim.signals[3] ? " ·" : ""}
              </span>
            ))}
          </div>
        </motion.article>
      ))}
    </div>
  );
}
