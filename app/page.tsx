import { FeaturedProjects } from "@/components/FeaturedProjects";
import { PageTransition } from "@/components/PageTransition";
import { ProfileCard } from "@/components/ProfileCard";
import { SocialGrid } from "@/components/SocialGrid";

export default function Home() {
  return (
    <PageTransition>
      {/* Phones and tablets: the Figma layout, one 393px column, centred.
          Desktop: profile card on the left (stays in view while scrolling),
          social cards and featured work on the right. */}
      {/* On desktop the whole block is centred vertically in the screen
          (100dvh minus the page's top and bottom padding). */}
      <div className="mx-auto max-w-mobile lg:grid lg:min-h-[calc(100dvh-11rem)] lg:max-w-none lg:grid-cols-home lg:content-center lg:items-start lg:gap-column">
        <div className="lg:sticky lg:top-16">
          <ProfileCard />
        </div>

        {/* pt-25 lines the right column up with the top of the panel,
            below the avatar that overlaps it by 100px */}
        <div className="lg:pt-25">
          <SocialGrid className="mt-grid lg:mt-0" start={5} />
          <FeaturedProjects className="mt-section hidden lg:block" start={10} />
        </div>
      </div>
    </PageTransition>
  );
}
