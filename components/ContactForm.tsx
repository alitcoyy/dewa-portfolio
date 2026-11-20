"use client";

import { motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { profile } from "@/content/site";
import { spring } from "@/lib/motion";
import { cardClass } from "./Card";

const field =
  "w-full rounded-inset border border-line bg-surface px-3.5 py-3 text-body text-ink placeholder:text-ink-muted transition-colors duration-200 hover:border-white/20 focus:border-white/40 focus:bg-white/10 disabled:opacity-60";
const label = "text-caption tracking-meta text-ink-muted";

// Set in .env.local and in the Vercel project settings. NEXT_PUBLIC_ means it
// is included in the browser bundle: Web3Forms keys are public by design.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

type Status = "idle" | "sending" | "sent" | "error";

/** Contact form that delivers messages to your inbox through Web3Forms. */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    if (!ACCESS_KEY) {
      setStatus("error");
      setError("The form isn't set up yet. Please use the email card below.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          access_key: ACCESS_KEY,
          subject: `New message from ${data.name} via your portfolio`,
          from_name: `${profile.name} · Portfolio`,
        }),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      form.reset();
      setStatus("sent");
    } catch (e) {
      setStatus("error");
      setError(
        e instanceof Error && e.message
          ? `Couldn't send: ${e.message}`
          : "Couldn't send your message. Please try again.",
      );
    }
  }

  const sending = status === "sending";

  return (
    <form
      onSubmit={handleSubmit}
      className={`${cardClass} flex flex-col gap-4 bg-linear-to-b from-panel-light to-panel-dark px-card-x py-4`}
    >
      {/* Honeypot: hidden from people, bots tick it and get filtered out */}
      <input type="checkbox" name="botcheck" tabIndex={-1} aria-hidden="true" className="hidden" />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className={label}>Name</label>
        <input id="name" name="name" required disabled={sending} autoComplete="name" placeholder="Your name" className={field} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className={label}>Email</label>
        <input id="email" name="email" type="email" required disabled={sending} autoComplete="email" placeholder="you@example.com" className={field} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className={label}>Message</label>
        <textarea id="message" name="message" required disabled={sending} rows={5} placeholder="Tell me about your project" className={`${field} resize-none`} />
      </div>

      <motion.button
        type="submit"
        disabled={sending}
        whileHover={sending ? undefined : { y: -2 }}
        whileTap={sending ? undefined : { scale: 0.97 }}
        transition={spring}
        className="rounded-inset bg-white py-3 text-body font-semibold text-ink-inverse disabled:opacity-70"
      >
        {sending ? "Sending…" : "Send message"}
      </motion.button>

      <p
        role="status"
        aria-live="polite"
        className={`min-h-3 text-center text-caption ${status === "error" ? "text-glow-warm" : "text-ink-muted"}`}
      >
        {status === "sent" && "Thanks! Your message is on its way. I'll get back to you soon."}
        {status === "error" && error}
      </p>
    </form>
  );
}
