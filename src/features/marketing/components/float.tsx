"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Gentle, continuous floating (soft vertical bob) — for hero/product imagery.
 * Deliberately slow and small so it reads as premium, not distracting. Honors
 * the user's reduced-motion preference.
 */
export function Float({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      animate={reduce ? undefined : { y: [0, -12, 0] }}
      transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}
    >
      {children}
    </motion.div>
  );
}
