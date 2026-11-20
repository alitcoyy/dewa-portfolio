import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHeader } from "@/components/PageHeader";
import { PageTransition } from "@/components/PageTransition";
import { SocialGrid } from "@/components/SocialGrid";
import { profile } from "@/content/site";
import { stagger } from "@/lib/motion";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <PageTransition>
      <PageHeader title="Contact" subtitle={`Based in ${profile.location}`} />

      {/* Stacked up to tablet; side by side on desktop (form | socials) */}
      <div className="mx-auto mt-section max-w-reading lg:grid lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-column">
        <div className="animate-rise stagger" style={stagger(1)}>
          <ContactForm />
        </div>

        <section aria-labelledby="socials-heading" className="mt-section lg:mt-0">
          <h2
            id="socials-heading"
            className="mb-grid animate-rise text-center text-caption tracking-meta text-ink-muted stagger lg:text-left"
            style={stagger(2)}
          >
            Or find me on
          </h2>
          <SocialGrid start={3} />
        </section>
      </div>
    </PageTransition>
  );
}
