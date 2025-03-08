import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - InstantSoundboard",
  description:
    "Learn about InstantSoundboard, the ultimate platform for soundboards, memes, viral clips, and more. Discover our mission, features, and how you can get involved in our community.",
  keywords:
    "About InstantSoundboard, Soundboard Platform, Meme Sounds, Viral Audio Clips, Custom Soundboards, Gaming Sounds, Sound Sharing Community",
  alternates: {
    canonical: "https://www.instantsoundboard.com/about",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
