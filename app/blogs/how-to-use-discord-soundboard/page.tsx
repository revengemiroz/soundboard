"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, ExternalLink, Volume2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SoundboardGuide() {
  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-indigo-50 to-purple-50">
      <div className="max-w-3xl mx-auto">
        <Card className="border-none shadow-sm overflow-hidden">
          <CardContent className="p-8 sm:p-10">
            <div className="relative w-full h-[400px] mb-6 rounded-lg overflow-hidden">
              <Image
                src="https://gqr9hsnw3t.ufs.sh/f/YviIkKSgzk0bVLW94KXZ49lc2QfJ3XYSAeiCT8PgMaKsm1kO"
                alt="Using a soundboard on Discord"
                fill
                className="object-cover"
                priority
              />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
              How to Use a Soundboard Like a Pro in 2025
              <span className="text-indigo-600 block text-xl mt-1">
                The Beginner’s Guide to Memes, Gaming, and Pranks
              </span>
            </h1>

            <p className="text-gray-600 leading-relaxed mb-6">
              Soundboards are the ultimate unsung heroes of humor, gaming, and
              viral content. Whether you want to prank your friends, spice up
              your TikTok videos, or level up your gaming sessions, soundboards
              got your back. In this beginner-friendly guide, you’ll learn what
              a soundboard is, how to use one, and how to get started with
              platforms like <strong>InstantSoundBoard</strong>.
            </p>

            <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100 mb-8">
              <p className="text-gray-700 text-center font-medium flex items-center justify-center gap-2">
                <Download className="h-4 w-4 text-indigo-600" />
                Try soundboards online at
                <Link
                  href="/"
                  className="text-indigo-600 ml-1 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  InstantSoundBoard.com
                </Link>
              </p>
            </div>

            <Section
              title="🔊 What Is a Soundboard?"
              items={[
                {
                  name: "Soundboards Explained",
                  description:
                    "A soundboard is a digital or physical interface that plays audio clips with the push of a button. You can load it with meme sounds, game quotes, creepy laughs, or anything you want to use for fun or drama.",
                },
                {
                  name: "Why Use One?",
                  description:
                    "From memes to reactions, a soundboard makes your online experience more expressive and entertaining—perfect for Discord, TikTok, gaming, and more.",
                },
              ]}
            />

            <Separator className="my-10 bg-indigo-600/20" />

            <Section
              title="🛠️ How to Use a Soundboard (Step-by-Step)"
              items={[
                {
                  name: "1. Pick Your Platform",
                  description:
                    "Choose between desktop apps (like Voicemod or Resanance), web-based tools (like InstantSoundBoard), or physical devices for pros.",
                },
                {
                  name: "2. Choose Your Sounds",
                  description:
                    "From funny memes to dramatic fails, select the sounds that fit your vibe. Browse categories like ‘Gaming,’ ‘Pranks,’ or even upload custom clips.",
                },
                {
                  name: "3. Set Up Your Soundboard",
                  description:
                    "If you're on mobile or PC, launch your soundboard app and assign hotkeys. On the web, just click and play. Using a virtual mic? Set it as your input in Discord or Zoom.",
                },
              ]}
            />

            <Separator className="my-10 bg-indigo-600/20" />

            <Section
              title="🎮 Using Soundboards in Different Situations"
              items={[
                {
                  name: "Enhance Gaming",
                  description:
                    "Play epic win sounds after clutch plays or troll teammates with classic meme effects. Gaming and soundboards go hand-in-hand.",
                },
                {
                  name: "Create Viral TikToks",
                  description:
                    "Use trending audio clips or custom memes from your soundboard to make your TikToks stand out.",
                },
                {
                  name: "Pull Off Pranks",
                  description:
                    "Use doorbell sounds, creepy laughter, or awkward noises to prank your friends. Timing is everything.",
                },
              ]}
            />

            <Separator className="my-10 bg-indigo-600/20" />

            <Section
              title="✅ Tips for Soundboard Success"
              items={[
                {
                  name: "Timing Matters",
                  description:
                    "Playing a sound at the right time can turn a good moment into a great one. Practice your timing!",
                },
                {
                  name: "Stay Relevant",
                  description:
                    "Use trending meme sounds or viral audio for maximum reactions.",
                },
                {
                  name: "Customize It",
                  description:
                    "Upload your own clips to create a truly personal soundboard experience.",
                },
              ]}
            />

            <Separator className="my-10 bg-indigo-600/20" />

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                🔥 Why Choose InstantSoundBoard?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At <strong>InstantSoundBoard</strong>, we make soundboards easy,
                fun, and endlessly customizable.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>🎵 Over 100,000+ soundpad sounds available 24/7</li>
                <li>🛠️ Make custom soundboards with your own uploads</li>
                <li>⚡ One-click sound play and downloads</li>
                <li>📱 Works great on desktop and mobile</li>
              </ul>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mt-8">
              <Link
                href="/"
                className="text-indigo-600 inline-flex items-center hover:underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Start now at InstantSoundBoard.com
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
              <p className="text-gray-600 text-sm mt-1">
                Your one-stop destination for meme sounds, pranks, and custom
                audio experiences—plus full support for sonidos para Discord!
              </p>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100 mt-10">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                ✨ Final Thoughts
              </h2>
              <p className="text-gray-600">
                Soundboards aren’t just tools—they're creativity engines.
                Whether you’re adding flavor to a stream, turning up the humor
                in group chats, or building the next viral TikTok, the right
                sound at the right time makes magic. So what are you waiting
                for? <strong>Explore. Play. Prank. Create.</strong>
              </p>
            </div>

            <Separator className="my-10 bg-indigo-600/20" />

            <Section
              title="📌 Frequently Asked Questions (FAQs)"
              items={[
                {
                  name: "Can I use soundboards on my phone?",
                  description:
                    "Yes! InstantSoundBoard and many other platforms work perfectly on mobile devices.",
                },
                {
                  name: "How do I create my own soundboard?",
                  description:
                    "Upload your audio files, organize them into a layout, and save it on the platform. That’s it!",
                },
                {
                  name: "Is it free to use?",
                  description:
                    "Yes—InstantSoundBoard is completely free with access to thousands of sounds.",
                },
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Section({
  title,
  items,
}: {
  title: string;
  items: { name: string; description: string }[];
}) {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-6">{title}</h3>
      <div className="space-y-4 pl-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <Volume2 className="min-h-5 min-w-5 mt-1 text-indigo-600" />
            <div>
              <p className="font-medium text-gray-800">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
