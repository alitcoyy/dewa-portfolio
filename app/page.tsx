import { PageTransition } from "@/components/PageTransition";
import { ProfileCard } from "@/components/ProfileCard";
import { SocialGrid } from "@/components/SocialGrid";

export default function Home() {
  return (
    <PageTransition>
      <ProfileCard />
      {/* Cards continue the cascade after the profile (which ends at 6) */}
      <SocialGrid className="mt-grid" start={5} />
    </PageTransition>
  );
}
