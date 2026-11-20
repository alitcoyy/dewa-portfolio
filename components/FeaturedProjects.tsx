import Link from "next/link";
import { projects } from "@/content/site";
import { stagger } from "@/lib/motion";
import { ProjectCard } from "./ProjectCard";

/** First few projects with a link to the full portfolio. */
export function FeaturedProjects({
  count = 2,
  start = 0,
  className = "",
}: {
  count?: number;
  start?: number;
  className?: string;
}) {
  return (
    <section aria-labelledby="featured-heading" className={className}>
      <div className="mb-grid flex animate-rise items-baseline justify-between stagger" style={stagger(start)}>
        <h2 id="featured-heading" className="font-display text-handle">
          Featured work
        </h2>
        <Link
          href="/portfolio"
          transitionTypes={["nav-forward"]}
          className="group text-body text-ink-muted transition-colors hover:text-ink"
        >
          View all{" "}
          <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
      <ul className="grid gap-grid md:grid-cols-2">
        {projects.slice(0, count).map((project, i) => (
          <li key={project.slug} className="animate-rise stagger" style={stagger(start + 1 + i)}>
            <ProjectCard {...project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
