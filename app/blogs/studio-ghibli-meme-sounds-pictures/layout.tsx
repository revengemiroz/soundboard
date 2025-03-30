import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Studio Ghibli Meme Sounds & Pictures: The Perfect Combo | InstantSoundBoard",
  description:
    "Explore the best Studio Ghibli meme sounds and pictures for your content. From Totoro's roar to Calcifer's sass, combine iconic audio clips with visuals for viral-ready memes.",
  keywords:
    "Studio Ghibli meme sounds, Ghibli soundboard, Ghibli audio clips, Anime meme sound effects, Totoro roar, Calcifer meme, No-Face ah sound, Ghibli meme images, Meme soundboard, Studio Ghibli TikTok, Funny anime sounds, Instant SoundBoard",
  alternates: {
    canonical:
      "https://www.instantsoundboard.com/blogs/studio-ghibli-meme-sounds",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
