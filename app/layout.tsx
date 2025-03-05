import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FooterSection from "./components/Footer/footerSection";
import Navbar from "./components/Navigation/Navbar";
import { ConvexClientProvider } from "./ConvexClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyInstantsSoundBoard - The Sound Buttons Website",
  keywords: [
    "soundboard, myinstants, sound board, my instant, meme soundboard",
  ],
  description:
    "Discover and share a vast collection of funny instant sound buttons at MyInstants. Explore popular sounds like VINE BOOM SOUND, Anime Wow, and more. Have fun!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <ConvexClientProvider>{children}</ConvexClientProvider>
        <FooterSection />
      </body>
    </html>
  );
}
