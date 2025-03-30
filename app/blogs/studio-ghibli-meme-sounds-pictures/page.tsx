"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Download, Volume2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function StudioGhibliMemeSounds() {
  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-blue-50 to-green-50">
      <div className="max-w-3xl mx-auto">
        <Card className="border-none shadow-sm overflow-hidden">
          <CardContent className="p-8 sm:p-10">
            <div className="relative w-full h-[400px] mb-6 rounded-lg overflow-hidden">
              <Image
                src="https://gqr9hsnw3t.ufs.sh/f/YviIkKSgzk0bpomtepHR29KAd0JQowS4YlW7HVM3PGOubjZU"
                alt="Studio Ghibli scene"
                fill
                className="object-cover"
                priority
              />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
              Why Studio Ghibli Sounds + Pictures
              <span className="text-teal-600 block text-xl mt-1">
                Are a Meme Match Made in Heaven
              </span>
            </h1>

            <p className="text-gray-600 leading-relaxed mb-6">
              Ghibli sounds are more than nostalgia—they're becoming meme tools.
              With expressive audio moments and iconic visuals, Ghibli gives you
              the perfect combo to create something funny, emotional, or just
              weird in the best way.
            </p>

            <div className="bg-teal-50 p-5 rounded-lg border border-teal-100 mb-8">
              <p className="text-gray-700 text-center font-medium flex items-center justify-center gap-2">
                <Download className="h-4 w-4 text-teal-600" />
                Try these Studio Ghibli meme sounds on
                <Link
                  href="/"
                  className="text-teal-600 ml-1 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instantsoundboard.com
                </Link>
              </p>
            </div>

            <Separator className="my-8 bg-teal-600/20" />

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              🎧 Featured Ghibli Meme Sounds
            </h2>

            <SoundCategory
              title="Top 3 Iconic Sounds"
              number="🎙️"
              sounds={[
                {
                  name: "Spirited Away Dragon Boy",
                  description:
                    "The classic sound of everyone's favorite forest spirit",
                  link: "/sounds/studio-ghibli-spirited-away-soundthe-dragon-boy",
                },
                {
                  name: "Sora Iro no Tane Sound",
                  description: "Weird, spooky, and meme-ready",
                  link: "/sounds/studio-ghibli-sora-iro-no-tane-sound",
                },
                {
                  name: "Days long gone sound",
                  description: "Calcifer’s sass is internet gold",
                  link: "/sounds/studio-ghibli-days-long-gone-sound",
                },
                {
                  name: "Spirited Away Sound",
                  description: "Noice internet gold",
                  link: "/sounds/studio-ghibli-spirited-away-sound",
                },
              ]}
            />

            <Separator className="my-10 bg-teal-600/20" />

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                🖼️ Why Sounds + Pictures Just Work
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Pairing a great sound with the right Ghibli screenshot creates
                instant impact.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Totoro’s roar + bus stop image = meme mood.</li>
                <li>No-Face sounds + shocked face = relatable reaction.</li>
                <li>
                  Calcifer’s line + his smirking flame = peak sass energy.
                </li>
              </ul>
              <p className="text-gray-600 mt-4">
                Even with just a few sounds, you can create scroll-stopping
                content.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                🌐 Where to Use These
              </h2>
              <p className="text-gray-600 mb-4">
                Whether it’s a TikTok, meme page, or Discord sound prank—Ghibli
                clips are perfect for adding personality. Upload a still, hit
                play on a sound, and let the meme write itself.
              </p>
              <div className="bg-teal-50 p-4 rounded-lg border border-teal-100 mb-4">
                <Link
                  href="/"
                  className="text-teal-600 inline-flex items-center hover:underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instantsoundboard.com
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
                <p className="text-gray-600 text-sm mt-1">
                  Your go-to source for anime soundboards, including Studio
                  Ghibli’s finest.
                </p>
              </div>
            </div>

            <div className="bg-teal-50 p-6 rounded-lg border border-teal-100 mt-10">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                ✨ Final Thought
              </h2>
              <p className="text-gray-600">
                You don’t need a huge sound library to make people laugh—or feel
                something. A few great Ghibli sounds and the right image go a
                long way.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SoundCategory({ title, number, sounds }) {
  return (
    <div>
      <h3 className="font-bold text-gray-900 text-xl flex items-center gap-2 mb-4">
        <span className="text-teal-600 mr-1">{number}</span>
        {title}
      </h3>
      <div className="space-y-2 pl-5">
        {sounds.map((sound, index) => (
          <div key={index} className="flex items-center">
            <Link
              target="_blank"
              href={sound.link}
              className="text-teal-600 inline-flex items-center hover:underline font-medium"
            >
              <Volume2 className="mr-2 h-3 w-3 flex-shrink-0 mt-1" />
              <span className="text-gray-800">{sound.name}</span>
            </Link>
            {sound.description && (
              <span className="text-gray-500 text-sm ml-2">
                ({sound.description})
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
