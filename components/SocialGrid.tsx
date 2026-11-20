import { socials, type SocialLink } from "@/content/site";
import { stagger } from "@/lib/motion";
import { SocialLinkCard } from "./SocialLinkCard";

const spans: Record<SocialLink["size"], string> = {
  small: "",
  wide: "col-span-2",
  tall: "row-span-2",
};

/** @param start position of the first card in the page's entrance cascade */
export function SocialGrid({ className = "", start = 0 }: { className?: string; start?: number }) {
  return (
    <ul className={`grid grid-cols-socials gap-grid ${className}`}>
      {socials.map((link, i) => (
        <li
          key={link.platform}
          className={`animate-rise stagger ${spans[link.size]}`}
          style={stagger(start + i)}
        >
          <SocialLinkCard {...link} />
        </li>
      ))}
    </ul>
  );
}
