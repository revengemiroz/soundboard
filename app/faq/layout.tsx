import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - InstantSoundboard",
  description:
    "Find answers to common questions about InstantSoundboard. Learn how to play, download, and share sounds, troubleshoot issues, and understand our policies.",
  keywords:
    "InstantSoundboard FAQ, Soundboard Help, Common Questions, How to Use Soundboard, Troubleshooting Sound Issues, Downloading Sounds, Sharing Sound Clips, Soundboard Guide, User Support",
  alternates: {
    canonical: "https://www.instantsoundboard.com/faq",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
