import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "15 Best Meme Sound Effects of 2025 (Free Downloads) | InstantSoundBoard",
  description:
    "Download the most viral meme sound effects of 2025, including Vine Boom, Bruh, John Cena, and more. Get free meme soundboard buttons to level up your content.",
  keywords:
    "Meme sound, Meme soundboard, Meme sound effects, Free meme sounds, Viral meme sounds 2025, Funny sound effects, Vine boom, Bruh sound, Discord soundboard, TikTok meme sounds, John Cena meme, Download meme sounds, Instant SoundBoard",
  alternates: {
    canonical:
      "https://www.instantsoundboard.com/blogs/best-meme-sound-effects-2025",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
