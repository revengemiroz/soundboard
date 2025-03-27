import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Download, Volume2 } from "lucide-react";
import Link from "next/link";

export default function MemeSoundEffectsForVideoEditing() {
  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <Card className="border-none shadow-sm overflow-hidden">
          <CardContent className="p-8 sm:p-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
              Download Popular Meme Sound Effects
              <span className="text-red-600 block text-xl mt-1">
                For Video Editing
              </span>
            </h1>

            <p className="text-gray-600 leading-relaxed mb-6">
              Are you looking for the best meme sound effects to spice up your
              videos? Whether you're a content creator, video editor, or just
              someone who loves to make funny edits, having the right meme sound
              effects can take your projects to the next level. In this post,
              we've compiled a list of the most popular and viral meme sound
              effects that you can download and use for video editing, TikTok,
              YouTube, and more!
            </p>

            <div className="bg-red-50 p-5 rounded-lg border border-red-100 mb-8">
              <p className="text-gray-700 text-center font-medium flex items-center justify-center gap-2">
                <Download className="h-4 w-4 text-red-600" />
                Click on the link to download top meme sound effects for free.
              </p>
            </div>

            <Separator className="my-8 bg-red-600/20" />

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              🎵 Top Meme Sound Effects for Video Editing
            </h2>

            <p className="text-gray-600 mb-6">
              Here's a list of the most iconic and widely used meme sound
              effects:
            </p>

            <div className="space-y-10">
              <SoundCategory
                title="Classic Meme Sounds"
                number="1️⃣"
                sounds={[
                  {
                    name: "Oof",
                    description: "Classic Roblox sound effect",
                    link: "https://www.instantsoundboard.com/sounds/roblox-oof-meme-sound",
                  },
                  {
                    name: "Windows Error",
                    description: "The sound of frustration!",
                    link: "https://www.instantsoundboard.com/sounds/windows-xp-error-sound",
                  },
                  {
                    name: "Microsoft Windows Startup",
                    description: "A nostalgic throwback",
                    link: "https://www.instantsoundboard.com/sounds/microsoft-windows-startup-sound",
                  },
                  {
                    name: "Dial-Up Internet",
                    description: "Remember the pain of slow internet?",
                    link: "https://www.instantsoundboard.com/sounds/dial-up-internet-sound",
                  },
                  {
                    name: "GTA Wasted",
                    description: "Perfect for fails and game edits",
                    link: "https://www.instantsoundboard.com/sounds/gta-v-wasted-sound",
                  },
                  {
                    name: "Distorted Windows Startup",
                    description: "For that glitchy, cursed effect",
                    link: "https://www.instantsoundboard.com/sounds/distorted-windows-startup-meme-sound",
                  },
                ]}
              />

              <SoundCategory
                title="Funny & Viral Sound Clips"
                number="2️⃣"
                sounds={[
                  {
                    name: "Legitness",
                    description: '"That was legitness!"',
                    link: "https://www.instantsoundboard.com/sounds/that-was-legitness-meme-sound",
                  },
                  {
                    name: "Okay",
                    description: "Short and effective for reactions",
                    link: "https://www.instantsoundboard.com/sounds/okay-meme-sound",
                  },
                  {
                    name: "Oh My God",
                    description: "Great for dramatic moments",
                    link: "https://www.instantsoundboard.com/sounds/oh-my-god-meme-sound",
                  },
                  {
                    name: "Sheesh",
                    description: "When something is just too cool",
                    link: "https://www.instantsoundboard.com/sounds/sheesh-meme-sound",
                  },
                  {
                    name: "Taco Bell Bong",
                    description: "The famous deep bell sound",
                    link: "https://www.instantsoundboard.com/sounds/taco-bell-bong-sound-effect",
                  },
                  {
                    name: "Dinosaur Man Scream",
                    description: "An exaggerated and hilarious scream",
                    link: "https://www.instantsoundboard.com/sounds/dinosaur-man-scream-sound-effect",
                  },
                  {
                    name: "His Name is Jeff",
                    description: "Classic meme reference",
                    link: "https://www.instantsoundboard.com/sounds/my-name-is-jeff-meme-sound",
                  },
                  {
                    name: "No God Please No!",
                    description: "Michael Scott's legendary scream",
                    link: "https://www.instantsoundboard.com/sounds/my-name-is-jeff-meme-sound",
                  },
                ]}
              />

              <SoundCategory
                title="Iconic Video Game & Movie Sounds"
                number="3️⃣"
                sounds={[
                  {
                    name: "Mario Jump",
                    description: "From the beloved plumber himself",
                    link: "https://www.instantsoundboard.com/sounds/mario-jump-sound-effect",
                  },
                  {
                    name: "FBI Open Up!",
                    description: "For dramatic entrances",
                    link: "https://www.instantsoundboard.com/sounds/fbi-open-up-meme-sound",
                  },
                  {
                    name: "Dramatic Fart",
                    description: "Because farts are always funny",
                    link: "https://www.instantsoundboard.com/sounds/dramatic-fart-meme-sound",
                  },
                  {
                    name: "We'll Be Right Back",
                    description: "Perfect for unexpected cuts",
                    link: "https://www.instantsoundboard.com/sounds/well-be-right-back-meme-sound",
                  },
                  {
                    name: "Wilhelm Scream",
                    description: "A Hollywood classic scream",
                    link: "https://www.instantsoundboard.com/sounds/wilhelm-scream-meme-sound",
                  },
                  {
                    name: "Toasty",
                    description: "From Mortal Kombat!",
                    link: "https://www.instantsoundboard.com/sounds/mortal-combat-toasty-sound-effect",
                  },
                  {
                    name: "Fatality",
                    description: "For intense gaming moments",
                    link: "https://www.instantsoundboard.com/sounds/fatality-mortal-kombat-sound-effect",
                  },
                  {
                    name: "Sniper Shot",
                    description: "For those precise moments",
                    link: "https://www.instantsoundboard.com/sounds/sniper-shot-sound-effect",
                  },
                  {
                    name: "Mission Failed",
                    description: "We'll get 'em next time!",
                    link: "https://www.instantsoundboard.com/sounds/mission-failed-well-get-em-next-time-sound-effect",
                  },
                  {
                    name: "Explosion",
                    description: "For ultimate impact",
                    link: "https://www.instantsoundboard.com/sounds/explosion-meme-sound-effect",
                  },
                ]}
              />

              <SoundCategory
                title="Comedy & Reaction Sounds"
                number="4️⃣"
                sounds={[
                  {
                    name: "Bruh",
                    description: "The ultimate meme reaction",
                    link: "https://www.instantsoundboard.com/sounds/bruh-sound-effect",
                  },
                  {
                    name: "Goat Scream",
                    description: "Hilarious and unexpected",
                    link: "https://www.instantsoundboard.com/sounds/goat-scream-meme-sound-effect",
                  },
                  {
                    name: "Anime Woah/Woww",
                    description: "For exaggerated reactions",
                    link: "https://www.instantsoundboard.com/sounds/anime-wow-meme-sound",
                  },
                  {
                    name: "Look at This Dude",
                    description: "No No No No 😂",
                    link: "https://www.instantsoundboard.com/sounds/look-at-this-dude-meme-sound",
                  },
                  {
                    name: "Skibidi Bop MM DADA",
                    description: "Instantly recognizable tune",
                    link: "https://www.instantsoundboard.com/sounds/skibidi-bop-mm-dada-meme-sound-effect",
                  },
                  {
                    name: "Why Are You Running?",
                    description: "For dramatic chases",
                    link: "https://www.instantsoundboard.com/sounds/why-are-you-running-meme-sound",
                  },
                  {
                    name: "Hey, That's Pretty Good",
                    description: "A classic approval sound",
                    link: "https://www.instantsoundboard.com/sounds/hey-thats-pretty-good",
                  },
                  {
                    name: "Noice",
                    description: "A solid meme approval",
                    link: "https://www.instantsoundboard.com/sounds/noice-meme-sound",
                  },
                  {
                    name: "Say Whatttttt",
                    description: "For shocking moments",
                    link: "https://www.instantsoundboard.com/sounds/say-what-meme-sound",
                  },
                ]}
              />
            </div>

            <Separator className="my-10 bg-red-600/20" />

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                🔥 How to Download and Use These Meme Sound Effects
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you want to download these meme sound effects, including meme
                board sounds and button noises, you can find them on platforms
                like:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                <a
                  href="https://www.instantsoundboard.com"
                  className="text-red-600 inline-flex items-center hover:underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  InstantSoundBoard.com
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
                <p className="text-gray-600 text-sm mt-1">
                  Your go-to website for meme sounds, meme soundboard, and sound
                  buttons!
                </p>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Explore a huge collection of meme sounds, sound of memes, sound
                board clips, and soundboards to download your favorite viral
                audio.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                📌 How to Add Meme Sounds to Your Videos
              </h2>
              <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                <li>Download the sound effect from a trusted source.</li>
                <li>
                  Import it into your video editing software (Adobe Premiere
                  Pro, Final Cut Pro, CapCut, DaVinci Resolve, etc.).
                </li>
                <li>Sync it with your video for maximum comedic effect.</li>
                <li>Adjust volume & effects for the best quality.</li>
                <li>Export & share your meme-filled masterpiece!</li>
              </ol>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-100 mt-10">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                🤩 Conclusion
              </h2>
              <p className="text-gray-600">
                These meme sound effects can take your video editing game to the
                next level. Whether you're making funny TikToks, YouTube videos,
                or meme edits, adding these sounds will help you enhance
                engagement and entertainment value. Download your favorite
                sounds today and let the memes roll!
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
        <span className="text-red-600 mr-1">{number}</span>
        {title}
      </h3>
      <div className="space-y-2 pl-5">
        {sounds.map((sound, index) => (
          <div key={index} className="flex items-start">
            <Link
              href={`/${sound.link}`}
              className="text-red-600 inline-flex items-center hover:underline font-medium"
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
