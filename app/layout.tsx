import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Caveat } from "next/font/google";
import "./globals.css";
import { Nav } from "./_components/Nav";
import { Footer } from "./_components/Footer";
import { ScrollProgress } from "./_components/ScrollProgress";
import { PageTransition } from "./_components/PageTransition";
import { PageMarigolds } from "./_components/PageMarigolds";
import { SmoothScroll } from "./_components/SmoothScroll";
import { Cursor } from "./_components/Cursor";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mi Amor Tales — Where love meets legacy",
  description:
    "Premium wedding photography & cinematography in Jaipur, Rajasthan. Your story, crafted with patience, in the language of light.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${caveat.variable}`}
    >
      <head>
        {/* Open the TCP/TLS connection to Cloudinary early so the first
            image request lands without a cold handshake. */}
        <link
          rel="preconnect"
          href="https://res.cloudinary.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body>
        <SmoothScroll />
        <Cursor />
        <ScrollProgress />
        <Nav />
        <PageMarigolds />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
