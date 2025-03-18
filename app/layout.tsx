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
  title: "InstantSoundBoard - Largest collection of instant soundboard",
  keywords: [
    "soundboard, myinstants, sound board, my instant, meme soundboard, nepali meme sound, nepal, meme sound, nepali sound, nepali movies sound",
  ],
  description:
    "Discover and share a vast collection of funny instant sound buttons at MyInstants. Explore popular sounds like NEPALI MEME, SOUND BOARD, SOUND, Anime Wow, and more. Have fun!",
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
