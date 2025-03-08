import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - InstantSoundboard",
  description:
    "Learn how InstantSoundboard collects, uses, and protects your personal data. Read our Privacy Policy to understand your rights and choices regarding your information.",
  keywords:
    "InstantSoundboard Privacy Policy, Data Protection, Personal Information Security, Soundboard User Privacy, Cookies and Tracking, Online Privacy Practices, Information Collection Policy, User Data Protection",
  alternates: {
    canonical: "https://www.instantsoundboard.com/privacy",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
