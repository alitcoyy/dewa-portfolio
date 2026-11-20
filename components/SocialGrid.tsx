import { socials, type SocialLink } from "@/content/site";
import { stagger } from "@/lib/motion";
import { SocialLinkCard } from "./SocialLinkCard";

// Phones: the Figma layout (2 columns, "wide" cards span both).
const spans: Record<SocialLink["size"], string> = {
  small: "",
  wide: "col-span-2",
  tall: "row-span-2",
};

// Desktop: a 6-column grid. First row holds two half-width cards,
// every row after that holds three third-width cards.
const desktopSpan = (i: number) =>
  i < 2 ? "lg:col-span-3 lg:row-span-1" : "lg:col-span-2 lg:row-span-1";

/** @param start position of the first card in the page's entrance cascade */
export function SocialGrid({ className = "", start = 0 }: { className?: string; start?: number }) {
  return (
    <ul className={`grid grid-cols-socials gap-grid lg:grid-cols-6 ${className}`}>
      {socials.map((link, i) => (
        <li
          key={link.platform}
          className={`animate-rise stagger ${spans[link.size]} ${desktopSpan(i)}`}
          style={stagger(start + i)}
        >
          <SocialLinkCard {...link} />
        </li>
      ))}
    </ul>
  );
}
