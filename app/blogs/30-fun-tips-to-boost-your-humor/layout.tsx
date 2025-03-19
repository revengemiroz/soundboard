import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "30 Fun Tips to Boost Your Humor (With Sound Effects!) | InstantSoundBoard",
  description:
    "Discover 30 tips to increase your humor using funny sound buttons, meme soundboards, and viral sound effects. Create custom sound buttons and laugh louder every day!",
  keywords:
    "Humor tips, Nepali Meme, Nepal, Meme, Nepal Sound, Funny sound effects, Meme soundboard, Viral sounds, Soundboard humor, Funny sound buttons, Discord soundboard, Custom soundboard, Laughter tricks, Instant SoundBoard",
  //   openGraph: {
  //     images:
  //       "https://qy43i5pxcq.ufs.sh/f/Ug3TBysra1dXxWwwXKDmXHRnJZFIhaSOz81NqWk2ec5xL9gP",
  //   },
  alternates: {
    canonical:
      "https://www.instantsoundboard.com/blogs/30-fun-tips-to-boost-your-humor",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
