"use client";

import { motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { spring } from "@/lib/motion";
import { cardClass } from "./Card";

const field =
  "w-full rounded-inset border border-line bg-surface px-3.5 py-3 text-body text-ink placeholder:text-ink-muted transition-colors duration-200 hover:border-white/20 focus:border-white/40 focus:bg-white/10";
const label = "text-caption tracking-meta text-ink-muted";

/**
 * No backend yet: on submit this opens the visitor's email app with the
 * message filled in. Swap the handler for a Server Action + email service
 * (e.g. Resend) when you want messages delivered directly.
 */
export function ContactForm({ to }: { to: string }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Hello from ${data.get("name")}`;
    const body = `${data.get("message")}\n\n${data.get("name")} (${data.get("email")})`;
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${cardClass} flex flex-col gap-4 bg-linear-to-b from-panel-light to-panel-dark px-card-x py-4`}
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className={label}>Name</label>
        <input id="name" name="name" required autoComplete="name" placeholder="Your name" className={field} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className={label}>Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={field} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className={label}>Message</label>
        <textarea id="message" name="message" required rows={5} placeholder="Tell me about your project" className={`${field} resize-none`} />
      </div>
      <motion.button
        type="submit"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={spring}
        className="rounded-inset bg-white py-3 text-body font-semibold text-ink-inverse"
      >
        Send message
      </motion.button>
      <p role="status" className="text-center text-caption text-ink-muted">
        {sent ? "Your email app should open with the message ready to send." : null}
      </p>
    </form>
  );
}
