import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FooterSection from "./components/Footer/footerSection";
import Navbar from "./components/Navigation/Navbar";
import { ConvexClientProvider } from "./ConvexClientProvider";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
// import "@uploadthing/react/styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Instant Soundboard - Free meme soundboard and sound effects",
  keywords: [
    "sound buttons",
    "soundboard",
    "memes sounds",
    "free sounds",
    "memes",
    "instant sound buttons",
    "sound buttons effect",
    "sound board",
    "instant soundboard",
    "meme soundboard",
    "discord soundboard",
    "meme board sounds",
    "sound effects button",
    "viral sounds",
    "funny sounds",
  ],
  description:
    "Explore the ultimate collection of meme sounds buttons, funny sound effects, and viral audio clips. Play, share, or create your own soundboard instantly. Download for free",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="9BFR5u-YMwiU57bnNn_p03ETU6TvWJFUI-pGH3f-z7g"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-muted/90`}
      >
        <ConvexClientProvider>
          <Navbar />
          {children}
        </ConvexClientProvider>
        <FooterSection />
        <Toaster />
      </body>
      <>
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_ID}`}
        />

        <Script id="" strategy="lazyOnload">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_TAG_ID}');
          `}
        </Script>
      </>
    </html>
  );
}
