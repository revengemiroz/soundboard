import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Top One Piece Meme Sounds & Audio Clips (Ep. 1123 Special) | InstantSoundBoard",
  description:
    "Explore the funniest and most iconic One Piece meme sounds with audio clips from Luffy, Zoro, Sanji, and more. Updated for Episode 1123. Perfect for Discord, TikTok, YouTube edits, and more.",
  keywords:
    "one piece meme sounds, one piece audio clips, luffy laugh sound, zoro lost meme, anime soundboard, one piece soundboard, buggy laugh, episode 1123 sounds, anime meme sounds, instant soundboard, one piece sound fx, sound effects anime, meme audio one piece, sanji simp sound, brook yohoho, one piece TikTok sounds",
  alternates: {
    canonical: "https://www.instantsoundboard.com/blogs/one-piece-meme-sounds",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
