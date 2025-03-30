"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Volume2, ExternalLink, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SoundButtonsOnlinePresence() {
  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="max-w-3xl mx-auto">
        <Card className="border-none shadow-sm overflow-hidden">
          <CardContent className="p-8 sm:p-10">
            <div className="relative w-full h-[400px] mb-6 rounded-lg overflow-hidden">
              <Image
                src="https://gqr9hsnw3t.ufs.sh/f/YviIkKSgzk0bpomtepHR29KAd0JQowS4YlW7HVM3PGOubjZU"
                alt="Sound buttons for social content"
                fill
                className="object-cover"
                priority
              />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
              How to Use Sound Buttons to Boost Your Online Presence in 2025
              <span className="text-pink-600 block text-xl mt-1">
                Make noise. Get noticed. Leave a mark.
              </span>
            </h1>

            <p className="text-gray-600 leading-relaxed mb-6">
              Whether you're a content creator, a gamer, or just trying to bring
              life back to your feed, one thing’s for sure:{" "}
              <strong>sound buttons</strong> can help your content stand out and
              get noticed. In this guide, we’ll show you how to use sound
              buttons on social platforms, streams, and more using
              <strong> InstantSoundBoard</strong>.
            </p>

            <div className="bg-pink-50 p-5 rounded-lg border border-pink-100 mb-8">
              <p className="text-gray-700 text-center font-medium flex items-center justify-center gap-2">
                <Download className="h-4 w-4 text-pink-600" />
                Try 100,000+ meme and gaming sound buttons now on
                <Link
                  href="/"
                  className="text-pink-600 ml-1 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  InstantSoundBoard.com
                </Link>
              </p>
            </div>

            <Section
              title="🎯 Why Sound Buttons Are Your Online Secret Weapon"
              items={[
                {
                  name: "They stop the scroll",
                  description:
                    "We’re all mindlessly scrolling—but a loud 'BRUH' or dramatic gasp can stop someone in their tracks.",
                },
                {
                  name: "They boost shares",
                  description:
                    "Funny and surprising content gets shared—especially when it sounds good.",
                },
                {
                  name: "They bring your posts to life",
                  description:
                    "Add sound to your memes, clips, and reactions for instant personality.",
                },
              ]}
            />

            <Separator className="my-10 bg-pink-600/20" />

            <Section
              title="📱 How to Use Sound Buttons on Social Media"
              items={[
                {
                  name: "Use meme soundboards for viral reactions",
                  description:
                    "A well-timed sound clip can take your meme from good to viral. Add 'Oh no!' or 'WTF!?' to boost laughs and shares.",
                },
                {
                  name: "Engage with gaming soundboards",
                  description:
                    "Play a sound after a clutch win or let fans trigger sounds during your stream. It adds fun and builds community.",
                },
                {
                  name: "Slay short-form videos with sound",
                  description:
                    "On TikTok and Reels, meme sounds make your clips memorable and more likely to trend.",
                },
              ]}
            />

            <Separator className="my-10 bg-pink-600/20" />

            <Section
              title="🎛️ Build Your Own Custom Soundboard"
              items={[
                {
                  name: "Pick your sounds",
                  description:
                    "Use quotes, in-game moments, or even your voice to create your own vibe.",
                },
                {
                  name: "Upload and organize",
                  description:
                    "InstantSoundBoard lets you upload custom clips and sort them however you want.",
                },
                {
                  name: "Use across your content",
                  description:
                    "From Discord chats to TikTok videos, your custom board becomes your audio identity.",
                },
              ]}
            />

            <Separator className="my-10 bg-pink-600/20" />

            <Section
              title="🚀 How Sound Buttons Boost Engagement"
              items={[
                {
                  name: "Create interactive posts",
                  description:
                    "Ask fans what sound matches their mood or challenge them to remix your clip.",
                },
                {
                  name: "Run contests",
                  description:
                    "Let users build soundboards, then reward the funniest or most creative.",
                },
                {
                  name: "Feature user content",
                  description:
                    "Share your followers' meme sounds or button combos—they’ll love the recognition.",
                },
              ]}
            />

            <Separator className="my-10 bg-pink-600/20" />

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                🌐 Explore Sound Buttons at InstantSoundBoard
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At <strong>InstantSoundBoard</strong>, we’ve made it easy to
                find, create, and play sound buttons for every vibe.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>🎉 100,000+ meme and gaming sound buttons</li>
                <li>🛠️ Easy upload tools for custom soundboards</li>
                <li>📱 Works great on mobile, desktop, and live streams</li>
                <li>🔊 Supports Discord, TikTok, YouTube, and more</li>
              </ul>
            </div>

            <div className="bg-pink-50 p-4 rounded-lg border border-pink-100 mt-8">
              <Link
                href="/"
                className="text-pink-600 inline-flex items-center hover:underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Start now at InstantSoundBoard.com
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
              <p className="text-gray-600 text-sm mt-1">
                From sonidos para Discord to trending meme clips—you’ll find
                your sound here.
              </p>
            </div>

            <div className="bg-pink-50 p-6 rounded-lg border border-pink-100 mt-10">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                ✨ Final Thoughts
              </h2>
              <p className="text-gray-600">
                Sound makes content feel alive. Whether you're making memes,
                building a brand, or just having fun—sound buttons give your
                audience something to feel and remember.
                <strong> So get loud. Be funny. Go viral.</strong>
              </p>
            </div>
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
            <Volume2 className="min-h-5 min-w-5 mt-1 text-pink-600" />
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
