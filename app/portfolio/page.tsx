import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PageTransition } from "@/components/PageTransition";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/content/site";
import { stagger } from "@/lib/motion";

export const metadata: Metadata = { title: "Portfolio" };

export default function PortfolioPage() {
  return (
    <PageTransition>
      <PageHeader title="Portfolio" subtitle="Things I've designed and built" />
      <ul className="mt-section grid gap-grid">
        {projects.map((project, i) => (
          <li key={project.slug} className="animate-rise stagger" style={stagger(i + 1)}>
            <ProjectCard {...project} />
          </li>
        ))}
      </ul>
    </PageTransition>
  );
}
