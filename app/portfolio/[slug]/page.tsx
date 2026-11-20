import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { PageTransition } from "@/components/PageTransition";
import { projectTitleTransition, Tag } from "@/components/ProjectCard";
import { projects } from "@/content/site";
import { spring, stagger } from "@/lib/motion";
import * as motion from "motion/react-client";

// Tells Next.js every project URL at build time, so each page is
// prerendered as static HTML.
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export async function generateMetadata({
  params,
}: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectPage({
  params,
}: PageProps<"/portfolio/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const { slug, title, year, description, tags, links } = project;

  return (
    <PageTransition>
      <Link
        href="/portfolio"
        transitionTypes={["nav-back"]}
        className="group mb-section inline-block text-body text-ink-muted transition-colors hover:text-ink"
      >
        <span aria-hidden="true" className="inline-block transition-transform group-hover:-translate-x-1">
          ←
        </span>{" "}
        Portfolio
      </Link>

      <PageHeader title={title} subtitle={year} transitionName={projectTitleTransition(slug)} />

      <Card
        className="mt-section flex animate-rise flex-col gap-4 bg-linear-to-b from-panel-light to-panel-dark px-card-x py-4 stagger"
        style={stagger(1)}
      >
        {description.map((paragraph) => (
          <p key={paragraph} className="text-body">
            {paragraph}
          </p>
        ))}
        <ul aria-label="Built with" className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </ul>
      </Card>

      {(links?.live || links?.source) && (
        <div className="mt-grid grid animate-rise grid-cols-2 gap-grid stagger" style={stagger(2)}>
          {links.live && <ProjectLink href={links.live} label="Live site" />}
          {links.source && <ProjectLink href={links.source} label="Source code" />}
        </div>
      )}
    </PageTransition>
  );
}

function ProjectLink({ href, label }: { href: string; label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={spring}
      className="rounded-card bg-white py-3 text-center text-body font-semibold text-ink-inverse"
    >
      {label}
      <span className="sr-only"> (opens in a new tab)</span>
    </motion.a>
  );
}
