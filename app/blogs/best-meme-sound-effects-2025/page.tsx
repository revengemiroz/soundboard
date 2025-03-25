import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Download, Play, PlayCircle } from "lucide-react";
import Link from "next/link";

export default function MemeSoundEffects() {
  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <Card className="border-none shadow-sm overflow-hidden">
          <CardContent className="p-8 sm:p-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
              Download the Best Meme Sound Effects of 2025
              <span className="text-red-600 block text-xl mt-1">
                Free, Funny & Viral
              </span>
            </h1>

            <p className="text-gray-600 leading-relaxed mb-10">
              In 2025, meme culture isn't just surviving—it's thriving. And if
              there's one thing that's leveled up meme content across TikTok,
              YouTube, and Instagram Reels, it's sound effects. These short,
              punchy audio clips bring humor, drama, and timing to life—making a
              simple clip go from average to viral.
            </p>

            <p className="text-gray-600 leading-relaxed mb-10">
              If you're looking to download the best meme sound effects of 2025,
              we've got you. Whether you're a content creator, a Discord server
              mod, or just someone who wants to troll your friends, this curated
              list of the top 15 meme sounds will take your audio game to the
              next level.
            </p>

            <Separator className="my-8 bg-red-600/20" />

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              🔊 Top 15 Meme Sound Effects of 2025
              <span className="text-red-600 block text-lg mt-1">
                With Free Downloads
              </span>
            </h2>

            <div className="space-y-8">
              {soundEffects.map((sound, index) => (
                <div key={index} className="group">
                  <h3 className="font-medium text-gray-900 text-lg flex items-center">
                    <span className="text-red-600 mr-2 text-sm">
                      {index + 1}.
                    </span>
                    {sound.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed pl-5 mb-2">
                    {sound.description}
                  </p>
                  <a
                    href={sound.downloadLink}
                    className="text-red-600 inline-flex items-center hover:underline font-medium pl-5"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <PlayCircle className="mr-1 h-3 w-3" />
                    Download {sound.title} for Free
                  </a>
                </div>
              ))}
            </div>

            <Separator className="my-8 bg-red-600/20" />

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                ✅ Why Use Meme Sound Effects?
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Boost engagement and retention</li>
                <li>Add punchlines without saying a word</li>
                <li>Help your content stand out in noisy feeds</li>
                <li>Are essential tools for short-form creators in 2025</li>
              </ul>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                🎧 Where to Get More Meme Sounds
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Want more? Visit{" "}
                <Link
                  href="/"
                  className="text-red-600 inline-flex items-center hover:underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  InstantSoundBoard.com
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Link>{" "}
                to explore hundreds of trending meme sounds, soundboards, and
                custom buttons. Download, preview, and use them in your videos,
                streams, or even prank calls.
              </p>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-100 mt-8">
              <p className="text-gray-600 text-center font-medium">
                Final Tip: Stay updated. Meme trends move fast. The sound that's
                viral today might be old news next week. Bookmark your go-to
                soundboard, follow top creators, and keep your ear tuned to
                what's next.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const soundEffects = [
  {
    title: "VINE BOOM",
    description:
      "The internet classic. This dramatic boom adds weight, suspense, or just absurd overkill to any moment.",
    downloadLink: "https://www.instantsoundboard.com/sounds/vine-boom-sound",
  },
  {
    title: "Bruh Sound Effect",
    description:
      'Perfect for awkward pauses, dumb moments, or "did that just happen?" situations.',
    downloadLink: "https://www.instantsoundboard.com/sounds/bruh-sound-effect",
  },
  {
    title: "HE HE HE HA",
    description:
      "That goofy laugh that instantly makes any meme funnier. You've heard it. You want it.",
    downloadLink:
      "https://www.instantsoundboard.com/sounds/he-he-he-ha-clash-royale",
  },
  {
    title: "Fart Sound Effect",
    description:
      "It's immature. It's timeless. It still gets the laugh. A must-have in your sound arsenal.",
    downloadLink: "https://www.instantsoundboard.com/sounds/fart-sound-effect",
  },
  {
    title: "Zawg & Shlawg Sound",
    description:
      "New in 2025, this playful sound is perfect for chaotic pet clips or goofy friend fails.",
    downloadLink: "https://www.instantsoundboard.com/sounds/fart-sound-effect",
  },
  {
    title: "AND HIS NAME IS JOHN CENA",
    description:
      "You already heard the horns in your head. This one's perfect for surprise entrances or jump cuts.",
    downloadLink:
      "https://www.instantsoundboard.com/sounds/and-his-name-is-john-cena",
  },
  {
    title: "Fart Sound Effect #2",
    description: "A remix, a reboot, a new flavor. Same joke, different punch.",
    downloadLink: "https://www.instantsoundboard.com/sounds/wet-fart-meme",
  },
  {
    title: "DON POLLO",
    description:
      "Catchy, weird, and oddly perfect for adding flair to literally anything.",
    downloadLink:
      "https://www.instantsoundboard.com/sounds/don-pollo-meme-sound",
  },
  {
    title: "Rizz Sound Effect",
    description:
      "Symbolizing smooth talk and charisma. Drop this when someone's spitting game (or thinks they are).",
    downloadLink: "https://www.instantsoundboard.com/sounds/rizz-meme-sound",
  },
  {
    title: "Man Screaming",
    description:
      "Unfiltered chaos. Perfect for overreactions, fails, or unexpected plot twists.",
    downloadLink:
      "https://www.instantsoundboard.com/sounds/man-screaming-sound-effect",
  },
  {
    title: "Windows XP Shutdown",
    description:
      "Nostalgia meets comedy. Great for memes about crashing, quitting, or metaphorical death.",
    downloadLink:
      "https://www.instantsoundboard.com/sounds/windows-xp-shutdown-sound",
  },
  {
    title: "RAHHHH",
    description:
      "The raw scream of 2025. It's wild. It's primal. It's hilarious.",
    downloadLink: "https://www.instantsoundboard.com/sounds/rahhh-meme-sound",
  },
  {
    title: "FBI OPEN UP",
    description:
      "The classic meme raid sound. Use this when someone gets caught slipping.",
    downloadLink:
      "https://www.instantsoundboard.com/sounds/fbi-open-up-meme-sound",
  },
  {
    title: "Bababooey",
    description:
      "It makes no sense. That's the point. Great for adding absurdity or randomness to any video.",
    downloadLink: "https://www.instantsoundboard.com/sounds/baba-booey",
  },
  {
    title: "Awkward Crickets",
    description:
      "Perfect for punchlines that don't land, dead silence, or ironic pauses.",
    downloadLink:
      "https://www.instantsoundboard.com/sounds/awkward-cricket-silence",
  },
];
