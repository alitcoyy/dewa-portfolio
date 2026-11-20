"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const TYPE_MS = 55;
const DELETE_MS = 28;
const HOLD_MS = 2200;

/**
 * Types each phrase, holds, deletes it, then moves to the next, forever.
 * The first phrase is fully rendered on the server, so it's there before
 * JavaScript loads and for search engines.
 */
export function TypeLoop({ phrases }: { phrases: readonly string[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(phrases[0].length);
  const [deleting, setDeleting] = useState(false);
  const phrase = phrases[index];

  useEffect(() => {
    if (reduce) return;
    const done = length === phrase.length;
    const empty = length === 0;
    const delay = deleting ? DELETE_MS : done ? HOLD_MS : TYPE_MS;

    const id = setTimeout(() => {
      if (!deleting && done) setDeleting(true);
      else if (deleting && empty) {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      } else setLength((l) => l + (deleting ? -1 : 1));
    }, delay);
    return () => clearTimeout(id);
  }, [length, deleting, phrase, phrases.length, reduce]);

  // Reserve the width of the longest phrase so nothing shifts while typing
  const longest = phrases.reduce((a, b) => (b.length > a.length ? b : a));

  return (
    <span className="grid">
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {longest}|
      </span>
      {/* Screen readers get the first phrase once, not every keystroke */}
      <span className="sr-only">{phrases[0]}</span>
      <span aria-hidden="true" className="col-start-1 row-start-1">
        {phrase.slice(0, length)}
        <span className="ml-px animate-blink">|</span>
      </span>
    </span>
  );
}
