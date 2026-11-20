import type { CSSProperties } from "react";

/** Position in an entrance cascade: pairs with the `stagger` utility. */
export const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

/** Snappy spring used for every hover / press interaction. */
export const spring = { type: "spring", stiffness: 420, damping: 26 } as const;

/** Card hover: lift up, press: squish. Children can react via variants. */
export const cardVariants = {
  rest: { y: 0, scale: 1 },
  hover: { y: -4, scale: 1 },
  tap: { y: -1, scale: 0.97 },
};

/**
 * Icon on a hovered card: hop up 2px. Whole-pixel moves only: scaling or
 * rotating the icon image resamples it and its edges go soft.
 */
export const iconVariants = {
  rest: { y: 0 },
  hover: { y: -2 },
};

/** External-link arrow on a hovered card: nudge towards the corner. */
export const arrowVariants = {
  rest: { x: 0, y: 0 },
  hover: { x: 2, y: -2 },
};
