import { ViewTransition } from "react";

/**
 * Page title in the same style as the name on the profile card.
 * `transitionName` lets a matching element on another page morph into it.
 */
export function PageHeader({
  title,
  subtitle,
  transitionName,
}: {
  title: string;
  subtitle: string;
  transitionName?: string;
}) {
  const heading = <h1 className="font-display text-title text-shimmer">{title}</h1>;

  return (
    // Morphing headings skip the rise so the two movements don't fight
    <header
      className={`flex flex-col items-center gap-stack text-center tracking-title ${
        transitionName ? "" : "animate-rise"
      }`}
    >
      {transitionName ? (
        <ViewTransition name={transitionName} share="morph" default="none">
          {heading}
        </ViewTransition>
      ) : (
        heading
      )}
      <p className="text-handle text-ink-muted">{subtitle}</p>
    </header>
  );
}
