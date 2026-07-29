"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

interface RevealProps extends HTMLMotionProps<"div"> {
  /** Stagger sibling reveals by passing an increasing delay (seconds). */
  delay?: number;
}

/**
 * Scroll-reveal wrapper — a soft fade + rise the first time the element enters
 * the viewport. The house motion style for the landing page: subtle, once, and
 * never flashy ("motion as quality, not spectacle").
 */
export function Reveal({ delay = 0, children, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
