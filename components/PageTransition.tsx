import { ViewTransition, type ReactNode } from "react";

// Which animation to run for each kind of navigation. Links tag themselves
// "nav-forward" or "nav-back" (see Nav and ProjectCard); anything untagged,
// like the browser back button, just swaps instantly.
const direction = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "none",
};

/**
 * Wrap each page's content in this. It has to live in page.tsx files, not
 * the layout: layouts persist between pages, so they never "enter" or "exit".
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={direction} exit={direction} default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
