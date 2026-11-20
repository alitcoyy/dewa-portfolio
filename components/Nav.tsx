"use client";

// A Client Component: it needs usePathname() to highlight the current page,
// which only works in the browser-aware part of the app.
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/content/site";
import { spring } from "@/lib/motion";

const indexOf = (pathname: string | null) =>
  navigation.findLastIndex(
    ({ href }) => pathname === href || (href !== "/" && !!pathname?.startsWith(href)),
  );

export function NavLinks({ pathname }: { pathname: string | null }) {
  const current = indexOf(pathname);

  return (
    <nav
      aria-label="Main"
      // Named so it stays still while pages slide during transitions
      style={{ viewTransitionName: "site-nav" }}
      className="fixed inset-x-0 bottom-4 z-20 animate-rise px-gutter pb-[env(safe-area-inset-bottom)] stagger"
    >
      <ul className="mx-auto flex max-w-88.25 gap-1 rounded-card border border-line bg-panel-dark/80 p-1 shadow-card backdrop-blur-md">
        {navigation.map(({ href, label }, i) => {
          const active = i === current;
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                // Moving right in the nav slides pages left, and vice versa
                transitionTypes={active ? undefined : [i > current ? "nav-forward" : "nav-back"]}
                aria-current={active ? "page" : undefined}
                className={`relative block rounded-inset py-2.5 text-center text-body font-semibold transition-colors ${
                  active ? "text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                {active && (
                  // Same layoutId on every page: Motion slides it between items
                  <motion.span
                    layoutId="nav-pill"
                    transition={spring}
                    className="absolute inset-0 rounded-inset bg-surface"
                  />
                )}
                <span className="relative">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function Nav() {
  return <NavLinks pathname={usePathname()} />;
}
