// All site content lives here. Edit this file to change what the site says;
// components only decide how it looks.

export type SocialPlatform =
  | "whatsapp"
  | "email"
  | "facebook"
  | "instagram"
  | "linkedin";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  handle: string;
  href: string;
  /** Grid footprint on phones: small = 1 cell, wide = full row, tall = 2 rows */
  size: "small" | "wide" | "tall";
  /** Optional pill next to the icon, e.g. "Chat" */
  badge?: string;
};

// WhatsApp: number in international format without "+", and the message
// visitors start with. wa.me opens the app on phones, WhatsApp Web on desktop.
const whatsappNumber = "6287860985696";
const whatsappMessage =
  "Hi Dewa, I’m interested in consulting with you about creating a website for my [business / portfolio / wedding invitation]. Would you be available to discuss this soon?";

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
      "Websites that grow your business.",
      "Need a website? Let’s build it.",
      "WordPress, Webflow or custom code.",
      "Fast, modern sites for your brand.",
      "AI automation for your business.",
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
    "WordPress",
    "Webflow",
    "Beaver Builder",
    "Elementor",
    "AI Automation",
    "AI Integration",
    "REST APIs",
    "Git",
  ],
};

export const socials: SocialLink[] = [
  {
    platform: "whatsapp",
    label: "WhatsApp",
    handle: "+62 878-6098-5696",
    href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
    size: "wide",
    badge: "Chat",
  },
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
