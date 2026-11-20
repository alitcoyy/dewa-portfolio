import Image from "next/image";
import type { CSSProperties } from "react";

// Hand-placed so server and browser render the same thing:
// [left %, top %, size px, duration s, delay s]
const PARTICLES: [number, number, number, number, number][] = [
  [8, 22, 2, 13, -2], [18, 68, 3, 16, -9], [27, 40, 2, 11, -5], [36, 84, 2, 14, -12],
  [44, 14, 3, 17, -7], [52, 58, 2, 12, -1], [61, 30, 2, 15, -10], [69, 76, 3, 13, -4],
  [77, 48, 2, 18, -14], [85, 18, 2, 12, -6], [92, 62, 3, 16, -11], [14, 92, 2, 14, -3],
  [58, 96, 2, 15, -8], [33, 8, 2, 13, -13], [88, 88, 2, 17, -2], [4, 50, 3, 15, -6],
];

/**
 * Page backdrop, behind everything: the gradient (fixed, like the Figma
 * frame fill), drifting particles, and the warm glow in the top-left corner,
 * which scrolls away with the page.
 */
export function Background() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-linear-to-b from-canvas-top to-canvas-bottom"
      >
        {PARTICLES.map(([left, top, size, duration, delay], i) => (
          <span
            key={i}
            className="absolute animate-twinkle rounded-full bg-white opacity-0 shadow-[0_0_6px_var(--color-white)]"
            style={
              {
                left: `${left}%`,
                top: `${top}%`,
                width: size,
                height: size,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-82 overflow-hidden"
      >
        <Image
          src="/backgrounds/glow-warm.svg"
          alt=""
          width={802}
          height={701}
          className="absolute -top-93.25 -left-86.5 max-w-none glow-drift"
        />
      </div>
    </>
  );
}

/**
 * Violet glow pinned to the bottom of the screen. In Figma it sits above
 * the cards, so this is rendered after the page content.
 */
export function GlowOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
    >
      <Image
        src="/backgrounds/glow-violet.svg"
        alt=""
        width={824}
        height={459}
        // Offset from the warm glow so the two pulse and drift alternately
        className="absolute -bottom-80.5 left-1/2 -ml-101 max-w-none glow-drift-alt"
      />
    </div>
  );
}
