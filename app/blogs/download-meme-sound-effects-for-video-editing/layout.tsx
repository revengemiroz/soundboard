import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Top Meme Sounds & Soundboard Buttons for Video Editing | InstantSoundBoard",
  description:
    "Download the most iconic meme sounds, soundboard buttons, and viral audio clips for your videos. Explore funny meme board sounds, button noises, and sound effect classics – perfect for TikTok, YouTube, and more.",
  keywords:
    "Meme sounds, Meme soundboard, Meme board sounds, Sound board, Sound effect buttons, Sound of memes, Meme sound, Sounds soundboards, Button noises, Sound buttons",
  alternates: {
    canonical:
      "https://www.instantsoundboard.com/blogs/download-meme-sound-effects-for-video-editing",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
