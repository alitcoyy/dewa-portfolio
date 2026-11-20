import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHeader } from "@/components/PageHeader";
import { PageTransition } from "@/components/PageTransition";
import { SocialGrid } from "@/components/SocialGrid";
import { profile, socials } from "@/content/site";
import { stagger } from "@/lib/motion";

export const metadata: Metadata = { title: "Contact" };

const email = socials.find((s) => s.platform === "email")!.handle;

export default function ContactPage() {
  return (
    <PageTransition>
      <PageHeader title="Contact" subtitle={`Based in ${profile.location}`} />
      <div className="mt-section animate-rise stagger" style={stagger(1)}>
        <ContactForm to={email} />
      </div>

      <h2
        className="mt-section mb-grid animate-rise text-center text-caption tracking-meta text-ink-muted stagger"
        style={stagger(2)}
      >
        Or find me on
      </h2>
      <SocialGrid start={3} />
    </PageTransition>
  );
}
