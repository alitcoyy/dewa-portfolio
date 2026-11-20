import * as motion from "motion/react-client";
import Link from "next/link";
import { ViewTransition } from "react";
import type { Project } from "@/content/site";
import { cardVariants, spring } from "@/lib/motion";
import { cardClass } from "./Card";

export function Tag({ children }: { children: string }) {
  return (
    <li className="rounded-chip border border-line bg-surface px-2 py-0.5 text-micro tracking-meta text-ink-muted">
      {children}
    </li>
  );
}

/** Shared name: the title morphs into the heading on the project page. */
export const projectTitleTransition = (slug: string) => `project-title-${slug}`;

export function ProjectCard({ slug, title, year, summary, tags }: Project) {
  return (
    <Link href={`/portfolio/${slug}`} transitionTypes={["nav-forward"]} className="block rounded-card">
      <motion.div
        variants={cardVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        transition={spring}
        className={`${cardClass} shine flex flex-col gap-stack bg-linear-to-b from-panel-light to-panel-dark px-card-x py-3.5`}
      >
        <div className="flex items-baseline justify-between gap-3">
          <ViewTransition name={projectTitleTransition(slug)} share="morph" default="none">
            <h2 className="font-display text-handle">{title}</h2>
          </ViewTransition>
          <span className="text-caption tracking-meta text-ink-muted">{year}</span>
        </div>
        <p className="text-body text-ink-muted">{summary}</p>
        <div className="mt-1 flex items-end justify-between gap-3">
          <ul className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </ul>
          <motion.span
            aria-hidden="true"
            variants={{ rest: { x: 0 }, hover: { x: 4 } }}
            transition={spring}
            className="text-body text-ink-muted"
          >
            →
          </motion.span>
        </div>
      </motion.div>
    </Link>
  );
}
