"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  /** Stagger entrances by passing an increasing delay (seconds). */
  delay?: number;
  className?: string;
}

/**
 * Soft entrance animation — the house style for motion in INVITERA. Deliberately
 * subtle (short fade + small rise) per the brand's "motion as quality, not
 * spectacle" rule. Prefer this over ad-hoc `motion.*` usage so timing/easing stay
 * consistent across the app.
 */
export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
