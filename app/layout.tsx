import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { Suspense } from "react";
import { Background, GlowOverlay } from "@/components/Background";
import { MotionProvider } from "@/components/MotionProvider";
import { Nav, NavLinks } from "@/components/Nav";
import "./globals.css";

// next/font downloads these at build time and self-hosts them,
// exposing each as a CSS variable used by the font tokens in globals.css.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: "600",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dewa Alit · Fullstack Developer",
    template: "%s · Dewa Alit",
  },
  description:
    "Dewa Alit, fullstack developer in Denpasar, Bali. Portfolio, social links and more.",
};

// "cover" lets the bottom nav respect the iPhone home-indicator area.
export const viewport: Viewport = { viewportFit: "cover" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="relative min-h-dvh">
        <MotionProvider>
          <Background />
          {/* Same column on every page: 393px wide like the Figma frame.
              Bottom padding leaves room for the floating nav. */}
          <main className="mx-auto max-w-98.25 px-gutter pt-11.25 pb-28">
            {children}
          </main>
          <GlowOverlay />
          {/* The nav reads the URL; Suspense lets pages still prerender. */}
          <Suspense fallback={<NavLinks pathname={null} />}>
            <Nav />
          </Suspense>
        </MotionProvider>
      </body>
    </html>
  );
}
