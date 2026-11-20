// All site content lives here. Edit this file to change what the site says;
// components only decide how it looks.

export type SocialPlatform =
  | "email"
  | "facebook"
  | "github"
  | "instagram"
  | "linkedin";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  handle: string;
  href: string;
  /** Grid footprint: small = 1 cell, wide = full row, tall = 2 rows */
  size: "small" | "wide" | "tall";
  /** Shows the "Follow" pill next to the icon */
  follow?: boolean;
};

export type Project = {
  /** Used in the URL: /portfolio/<slug> */
  slug: string;
  title: string;
  year: string;
  /** One line for the project card */
  summary: string;
  /** Paragraphs for the project page */
  description: string[];
  tags: string[];
  links?: { live?: string; source?: string };
  /** Optional screenshot in /public, e.g. "/images/my-project.png".
      Without one, the card shows a gradient cover with the initials. */
  cover?: string;
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
] as const;

export const profile = {
  name: "Dewa Alit",
  handle: "@alitcoyy",
  avatar: {
    src: "/dewa-avatar.jpeg",
    alt: "3D avatar of Dewa Alit",
  },
  role: { emoji: "💻", text: "Fullstack Developer" },
  // The tagline types out, then cycles through these phrases
  tagline: {
    emoji: "⚡",
    phrases: [
      "Frontend flair. Backend brains.",
      "From pixels to databases.",
      "Clean UI, solid code underneath.",
      "Building the web, front to back.",
    ],
  },
  location: "Denpasar, Bali",
  // Scrolling strip in the profile card: edit to match your stack
  skills: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
    "PostgreSQL",
    "REST APIs",
    "Git",
  ],
};

export const socials: SocialLink[] = [
  {
    platform: "email",
    label: "Email",
    handle: "alitcoy@gmail.com",
    href: "mailto:alitcoy@gmail.com",
    size: "small",
  },
  {
    platform: "facebook",
    label: "Facebook",
    handle: "@alitcoy14",
    href: "https://www.facebook.com/alitcoy14/",
    size: "small",
  },
  {
    platform: "github",
    label: "GitHub",
    handle: "@alitcoyy",
    href: "https://github.com/alitcoyy",
    size: "wide",
    follow: true,
  },
  {
    platform: "instagram",
    label: "Instagram",
    handle: "@dwtut_",
    href: "https://www.instagram.com/dwtut_",
    size: "small",
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    handle: "@dwtut",
    href: "https://www.linkedin.com/in/dwtut",
    size: "small",
  },
];

// Replace the placeholder projects with your own work.
export const projects: Project[] = [
  {
    slug: "personal-website",
    title: "Personal Website",
    year: "2026",
    summary: "This site: a card-based portfolio built with Next.js and Tailwind CSS.",
    description: [
      "A mobile-first personal site built from a Figma design, with every colour, font size and radius defined once as a design token.",
      "Built with the Next.js App Router, React Server Components and Tailwind CSS v4, and deployed on Vercel.",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "project-two",
    title: "Project Two",
    year: "2025",
    summary: "Placeholder project. Replace it in content/site.ts.",
    description: [
      "Describe the problem, what you built and the result. Add links to the live site and source code below.",
    ],
    tags: ["React", "Node.js"],
  },
  {
    slug: "project-three",
    title: "Project Three",
    year: "2024",
    summary: "Placeholder project. Replace it in content/site.ts.",
    description: [
      "Describe the problem, what you built and the result. Add links to the live site and source code below.",
    ],
    tags: ["PostgreSQL", "API"],
  },
];
