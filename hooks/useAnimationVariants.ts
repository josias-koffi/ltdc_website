"use client";
import { useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

// Returns a no-op variant set when prefers-reduced-motion is active,
// ensuring WCAG 2.1 AA compliance for vestibular disorders.
export function useAnimationVariants(variants: Variants): Variants {
  const shouldReduce = useReducedMotion();

  if (!shouldReduce) return variants;

  // Replace all animated states with the visible end-state so elements
  // appear immediately without motion.
  const staticVariants: Variants = {};
  Object.keys(variants).forEach((key) => {
    const v = variants[key];
    if (typeof v === "object" && v !== null) {
      const { transition: _t, ...rest } = v as Record<string, unknown>;
      staticVariants[key] = rest as import("framer-motion").Variant;
    } else {
      staticVariants[key] = v;
    }
  });

  // Override hidden to match visible so nothing is invisible on mount
  if ("visible" in staticVariants) {
    staticVariants["hidden"] = { ...(staticVariants["visible"] as object) };
  }

  return staticVariants;
}
