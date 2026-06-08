"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { revealUp } from "@/lib/motion";

interface SectionBlockProps {
  id?: string;
  index?: string;
  tag?: string;
  eyebrow?: string;
  eyebrowTone?: "blue" | "red" | "green" | "violet" | "teal";
  title: string;
  titleMuted?: string;
  description?: string;
  children?: ReactNode;
  backdrop?: ReactNode;
  align?: "left" | "center";
  className?: string;
  viewport?: boolean;
  ghost?: string;
  flip?: boolean;
}

export default function SectionBlock({
  id,
  index,
  tag,
  eyebrow,
  eyebrowTone = "blue",
  title,
  titleMuted,
  description,
  children,
  backdrop,
  align = "left",
  className = "",
  viewport = false,
  ghost,
  flip = false,
}: SectionBlockProps) {
  const centered = align === "center";
  const toneClass =
    eyebrowTone === "blue"
      ? "eyebrow"
      : eyebrowTone === "red"
        ? "eyebrow eyebrow-red"
        : eyebrowTone === "green"
          ? "eyebrow eyebrow-green"
          : eyebrowTone === "violet"
            ? "eyebrow eyebrow-violet"
            : "eyebrow eyebrow-teal";

  return (
    <section
      id={id}
      className={`relative z-10 overflow-hidden border-t border-[var(--border)] py-20 md:py-28 ${viewport ? "section-viewport" : ""} ${className}`}
    >
      {backdrop}

      {ghost && (
        <span className={`section-ghost ${flip ? "right-6 top-16" : "left-6 top-16"}`} aria-hidden>
          {ghost}
        </span>
      )}

      <div className={`relative z-[1] mx-auto max-w-[1400px] px-6 ${centered ? "text-center" : ""}`}>
        {index && tag && (
          <motion.p
            custom={0}
            variants={revealUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className={`section-index mb-8 ${centered ? "mx-auto max-w-fit" : ""}`}
          >
            {index} // {tag}
          </motion.p>
        )}

        {!index && eyebrow && (
          <motion.p
            custom={0}
            variants={revealUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className={toneClass}
          >
            {eyebrow}
          </motion.p>
        )}

        <motion.h2
          custom={0.08}
          variants={revealUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className={`headline-serif section-title mt-4 ${
            centered ? "mx-auto max-w-4xl" : "max-w-5xl"
          }`}
        >
          {title}
          {titleMuted && (
            <>
              <br />
              <span className="headline-muted">{titleMuted}</span>
            </>
          )}
        </motion.h2>

        {description && (
          <motion.p
            custom={0.16}
            variants={revealUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className={`section-desc mt-6 ${
              centered ? "mx-auto max-w-4xl" : flip ? "ml-auto max-w-5xl text-right" : "max-w-4xl"
            }`}
          >
            {description}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 md:mt-16"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
