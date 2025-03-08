import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions - InstantSoundboard",
  description:
    "Read the Terms and Conditions for using InstantSoundboard. Understand the rules, policies, and legal agreements that govern your use of our platform for playing, downloading, and sharing popular sounds, including memes, anime, TikTok, and viral clips.",
  keywords:
    "InstantSoundboard Terms, Soundboard Terms and Conditions, Meme Sound Rules, Viral Sound Sharing Policy, Anime Soundboard Guidelines, TikTok Sound Legal Info, Soundboard Usage Policy, Downloadable Sounds Terms, InstantSoundboard Legal Information",
  alternates: {
    canonical: "https://www.instantsoundboard.com/terms",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
