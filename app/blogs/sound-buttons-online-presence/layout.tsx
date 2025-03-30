import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "How to Use Sound Buttons to Boost Your Online Presence | InstantSoundBoard",
  description:
    "Learn how to use sound buttons to enhance your content, grow your audience, and make your posts more engaging. From memes and gaming to TikTok and custom soundboards, get started with InstantSoundBoard today.",
  keywords:
    "sound buttons, how to use sound buttons, meme soundboard, Discord soundboard, gaming soundboard, custom soundboard, TikTok meme sounds, sonidos para Discord, soundpad sounds, funny audio clips, InstantSoundBoard, soundboard for content creators",
  alternates: {
    canonical:
      "https://www.instantsoundboard.com/blogs/sound-buttons-online-presence",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
