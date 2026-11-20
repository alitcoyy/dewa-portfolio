"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import type { PointerEvent } from "react";
import { spring } from "@/lib/motion";

const MAX_TILT = 10; // degrees

/**
 * Avatar that floats, has a glowing ring orbiting around it, and tilts in
 * 3D towards the pointer (springing back on leave).
 */
export function TiltAvatar({ src, alt }: { src: string; alt: string }) {
  // Pointer position over the avatar, from -0.5 (left/top) to 0.5 (right/bottom)
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const smooth = { stiffness: 200, damping: 18 };
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]), smooth);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]), smooth);

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    const box = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - box.left) / box.width - 0.5);
    py.set((e.clientY - box.top) / box.height - 0.5);
  }

  function reset() {
    px.set(0);
    py.set(0);
  }

  return (
    <div className="relative z-10 animate-float perspective-distant">
      {/* Glowing ring: a rotating conic gradient peeking out 4px around the
          avatar, in the two glow colours from the design. */}
      <div
        aria-hidden="true"
        className="absolute -inset-1 overflow-hidden rounded-[calc(var(--radius-panel)+4px)] blur-[1px]"
      >
        <div className="absolute top-1/2 left-1/2 size-[150%] -translate-1/2 animate-orbit bg-[conic-gradient(from_0deg,transparent_0%,var(--color-glow-warm)_14%,transparent_32%,transparent_50%,var(--color-glow-violet)_64%,transparent_82%)]" />
      </div>

      <motion.div
        onPointerMove={handleMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        transition={spring}
        className="relative size-avatar transform-3d"
      >
        <Image
          src={src}
          alt={alt}
          width={200}
          height={200}
          loading="eager"
          fetchPriority="high"
          className="size-avatar rounded-panel object-cover shadow-card"
        />
      </motion.div>
    </div>
  );
}
