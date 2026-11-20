import * as motion from "motion/react-client";
import Image from "next/image";
import type { SocialLink, SocialPlatform } from "@/content/site";
import { arrowVariants, cardVariants, iconVariants, spring } from "@/lib/motion";
import { cardClass } from "./Card";

// Per-platform colours, from the Figma cards.
// iconBox is the icon's layout size; the SVG itself is larger because it
// contains the long soft shadow, which the card clips.
const themes: Record<
  SocialPlatform,
  { card: string; iconBox: string; light?: boolean }
> = {
  email: { card: "bg-email", iconBox: "w-10 h-7.75" },
  facebook: {
    card: "bg-linear-to-b from-facebook-light to-facebook-dark shadow-card",
    iconBox: "size-12",
  },
  whatsapp: {
    card: "bg-linear-to-b from-whatsapp-light to-whatsapp-dark",
    iconBox: "size-12",
  },
  instagram: {
    card: "bg-linear-to-b from-instagram-light to-instagram-dark",
    iconBox: "size-12",
  },
  linkedin: {
    card: "bg-linear-to-b from-linkedin-light to-linkedin-dark text-ink-inverse",
    iconBox: "size-8.75",
    light: true,
  },
};

const heights: Record<SocialLink["size"], string> = {
  small: "h-24.5", // 98px, as in Figma
  wide: "h-24.5",
  tall: "h-full",
};

export function SocialLinkCard({
  platform,
  label,
  handle,
  href,
  size,
  badge,
}: SocialLink) {
  const theme = themes[platform];
  const external = !href.startsWith("mailto:");

  return (
    <motion.a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      transition={spring}
      className={`${cardClass} shine flex flex-col justify-between px-card-x py-card-y ${theme.card} ${heights[size]}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-1.25">
          <motion.span
            variants={iconVariants}
            transition={spring}
            className={`relative shrink-0 ${theme.iconBox}`}
          >
            {/* PNG rendered at 4x from design/social-icons/*.svg. Safari draws
                SVG filters (the bevel and shadows) at 1x, so the SVGs looked
                blurry there; a high-res PNG is sharp in every browser.
                sizes="176px" lets 3x phones pick a large enough file. */}
            <Image
              src={`/icons/social/${platform}.png`}
              alt=""
              width={176}
              height={176}
              sizes="176px"
              quality={90}
              className="absolute -top-1 -left-1 max-w-none"
            />
          </motion.span>
          {badge && (
            <span className="relative mt-2.5 rounded-chip border border-border bg-chip px-3 py-0.75 text-micro text-ink-inverse">
              {badge}
            </span>
          )}
        </div>
        <motion.span variants={arrowVariants} transition={spring} className="relative">
          <Image
            src={`/icons/ui/ext-link-${theme.light ? "dark" : "white"}.svg`}
            alt=""
            width={18}
            height={18}
          />
        </motion.span>
      </div>

      <p className="relative flex flex-col gap-0.5 whitespace-nowrap">
        <span className="text-body font-semibold">{label}</span>
        <span className="text-caption">{handle}</span>
        {external && <span className="sr-only">(opens in a new tab)</span>}
      </p>
    </motion.a>
  );
}
