import Image from "next/image";
import type { Project } from "@/content/site";

// Cover gradients built from the site's palette; projects cycle through them.
const gradients = [
  "from-glow-warm to-glow-violet",
  "from-facebook-light to-facebook-dark",
  "from-email to-glow-violet",
];

const initials = (title: string) =>
  title
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

/** Project screenshot if there is one, otherwise a gradient with initials. */
export function ProjectCover({
  project,
  index,
  className = "",
}: {
  project: Project;
  index: number;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-inset ${className}`}>
      {project.cover ? (
        <Image
          src={project.cover}
          alt=""
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className={`flex size-full items-center justify-center bg-linear-to-br ${gradients[index % gradients.length]}`}
        >
          <span className="font-display text-title tracking-title text-white/90 drop-shadow-sm">
            {initials(project.title)}
          </span>
        </div>
      )}
    </div>
  );
}
