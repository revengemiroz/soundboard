import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "How to Use a Discord Soundboard Like a Pro in 2025 | InstantSoundBoard Guide",
  description:
    "Learn how to use a soundboard on Discord, TikTok, and gaming setups. This 2025 guide from InstantSoundBoard covers setup tips, meme sounds, custom uploads, and more.",
  keywords:
    "how to use a soundboard, Discord soundboard, soundboard for Discord, Discord meme sounds, soundboard guide 2025, voicy alternatives, soundpad sounds, sonidos para Discord, prank sounds, TikTok audio memes, custom soundboards, gaming soundboard, InstantSoundBoard",
  alternates: {
    canonical:
      "https://www.instantsoundboard.com/blogs/how-to-use-a-soundboard",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
