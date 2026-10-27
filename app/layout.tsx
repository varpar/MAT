import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Caveat } from "next/font/google";
import "./globals.css";
import { Nav } from "./_components/Nav";
import { Footer } from "./_components/Footer";
import { ScrollProgress } from "./_components/ScrollProgress";
import { PageTransition } from "./_components/PageTransition";
import { PageMarigolds } from "./_components/PageMarigolds";
import { SmoothScroll } from "./_components/SmoothScroll";
import { Cursor } from "./_components/Cursor";
import { JsonLd } from "./_components/JsonLd";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  siteJsonLd,
} from "./_lib/seo";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "wedding photographer Jaipur",
    "wedding photography Jaipur",
    "destination wedding photographer India",
    "wedding cinematography Jaipur",
    "Indian wedding films",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Wedding photography",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#4b756e",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${caveat.variable}`}
    >
      <body>
        <JsonLd data={siteJsonLd} />
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
