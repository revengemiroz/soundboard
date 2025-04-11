import { Metadata } from "next";
import { convex } from "../../ConvexClientProvider"; // Import Convex client
import { fetchQuery } from "convex/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

export function generateSEOMetadata(categoryName?: string): Metadata {
  let title: string;
  let description: string;
  let keywords: string[];

  const defaultImage = "/default-thumbnail.jpg";

  switch (categoryName?.toLowerCase()) {
    case "nepali":
      title = "Nepali Meme Sounds – Viral Audio Clips from Nepal";
      description =
        "Play and download the funniest Nepali meme sounds, viral TikTok audio clips, and sound effects loved across Nepal. Create your own soundboard!";
      keywords = [
        "Nepali meme sounds",
        "Nepali TikTok sounds",
        "viral Nepali sounds",
        "Nepali funny sound clips",
        "Nepali comedy audio",
        "Nepali trending sounds",
        "Nepali meme soundboard",
        "Nepali audio memes",
        "funny Nepali TikTok audio",
        "Nepali viral meme download",
        "Eva Giri meme",
        "Thik cha bro sound",
        "Nepali laugh sound",
        "Nepali sound effects",
        "Basibiyo meme sound",
        "Aba ta jhan saro sound",
        "Nepali reaction audio",
        "Nepali meme TikTok",
        "Nepali audio for reels",
        "Nepali meme YouTube shorts",
        "Nepali Instagram sounds",
        "Nepali soundboard for TikTok",
      ];

      break;

    case "anime":
      title = " Anime Soundboard - Anime Soundboard Sound buttons";
      description =
        "Find the best anime sounds buttons in our Anime soundboard category. Listen, Share and Download the best funny anime sound buttons, hilarious audio clips and viral sounds in InstantSoundboard";
      keywords = [
        "anime soundboard",
        "anime sound buttons",
        "anime quotes",
        "famous anime lines",
        "funny anime sounds",
        "epic anime sounds",
        "anime fight sounds",
        "anime voice clips",
        "anime character quotes",
        "instant anime sounds",
        "anime sound effects",
        "anime scenes audio",
        "anime memes",
        "classic anime sounds",
        "anime opening sounds",
        "anime audio buttons",
        "soundboard for anime",
      ];
      break;

    case "music":
      title = "Music Soundboard - Music Soundboard Sound Buttons";
      description =
        "Our Music Soundboard contains all the funniest music clips and music sound buttons. Have any music or music clips you like, you will find the music sound button right here.";
      keywords = [
        "music soundboard",
        "music sound buttons",
        "instrument sounds",
        "funny music sounds",
        "epic music buttons",
        "DJ sound effects",
        "beat drops",
        "bass boosted sounds",
        "trap soundboard",
        "lofi music buttons",
        "instant music sounds",
        "music sound effects",
        "meme music sounds",
        "viral music clips",
        "music audio buttons",
        "remix soundboard",
        "soundboard for music",
      ];
      break;

    case "movies":
      title = "Movies Soundboard - Movies Soundboard Sound buttons";
      description =
        "Find the best movies sound buttons in our Movies soundboard category. Listen, Share and Download the best funny sound buttons and hilarious audio clips and viral sounds in InstantSoundboard";
      keywords = [
        "movie soundboard",
        "movie sound buttons",
        "movie quotes",
        "famous movie lines",
        "funny movie sounds",
        "epic movie sounds",
        "action movie sounds",
        "comedy movie quotes",
        "drama movie clips",
        "instant movie sounds",
        "movie sound effects",
        "cinematic sounds",
        "movie scenes audio",
        "movie memes",
        "classic movie sounds",
        "movie audio buttons",
        "soundboard for movies",
      ];
      break;

    case "funny":
      title = "Funny Sound Effects - Memes & Comedy Clips";
      description =
        "Discover a collection of funny sound effects and meme-worthy audio clips to share or use in your content.";
      keywords = [
        "funny sounds",
        "meme sounds",
        "comedy audio",
        "lol soundboard",
      ];
    case "memes":
      title = "Meme soundboard: Meme soundboard sounds button";
      description =
        "Find the best meme sounds buttons in our Meme soundboard category. Listen, Share and Download the best funny sound buttons and hilarious meme sounds and viral sounds in InstantSoundboard";
      keywords = [
        "sound buttons",
        "soundboard",
        "memes sounds",
        "free sounds",
        "memes",
        "instant sound buttons",
        "sound buttons effect",
        "sound board",
        "instant soundboard",
        "meme soundboard",
        "discord soundboard",
        "meme board sounds",
        "sound effects button",
        "viral sounds",
        "funny sounds",
        "meme sounds",
      ];
      break;

    case "sound-effects":
      title =
        "Sound effects Soundboard - Sound effects Soundboard Sound Buttons";
      description =
        "Find the best meme sounds buttons in our Meme soundboard category. Listen, Share and Download the best funny sound buttons and hilarious meme sounds and viral sounds in InstantSoundboard";
      keywords = [
        "sound effects",
        "sound effect buttons",
        "funny sound effects",
        "instant sound effects",
        "free sound effects",
        "epic sound effects",
        "meme sound effects",
        "sound fx",
        "audio effects",
        "cartoon sound effects",
        "realistic sound effects",
        "loud sound effects",
        "weird sound effects",
        "movie sound effects",
        "video game sound effects",
        "soundboard effects",
        "viral sound effects",
      ];
      break;

    case "discord":
      title =
        "Discord Soundboard - Funny Discord Sound Buttons for Memes & Trolls";
      description =
        "Discover the best Discord sound buttons for memes, trolling, and funny reactions. Play, share and download hilarious sounds perfect for your voice chats and servers at InstantSoundboard.";
      keywords = [
        "discord soundboard",
        "discord sound buttons",
        "funny discord sounds",
        "troll sound effects",
        "discord meme sounds",
        "instant discord sounds",
        "free discord sound effects",
        "discord voice chat sounds",
        "meme soundboard for discord",
        "loud discord sounds",
        "discord audio memes",
        "viral discord buttons",
        "soundboard for discord",
        "discord reaction sounds",
        "discord funny soundboard",
        "discord prank sounds",
      ];
      break;

    case "tiktok":
      title = "TikTok Soundboard - Viral TikTok Meme Sound Buttons";
      description =
        "Explore the most popular TikTok meme sounds and viral audio buttons at InstantSoundboard. Download, play and share trending TikTok sound effects that creators love.";
      keywords = [
        "tiktok soundboard",
        "tiktok meme sounds",
        "viral tiktok sounds",
        "tiktok audio buttons",
        "funny tiktok sound effects",
        "instant tiktok sounds",
        "trending tiktok audio",
        "soundboard for tiktok",
        "free tiktok sound clips",
        "tiktok reaction sounds",
        "tiktok voice clips",
        "tiktok viral buttons",
        "tiktok funny soundboard",
        "download tiktok meme sounds",
      ];
      break;

    case "viral":
      title = "Viral Soundboard - Trending Meme and Viral Sound Buttons";
      description =
        "Discover the most viral sounds and trending meme buttons at InstantSoundboard. Play, download, and share sounds that broke the internet. Updated regularly with the latest viral sound effects.";
      keywords = [
        "viral soundboard",
        "viral meme sounds",
        "trending sound buttons",
        "viral sound effects",
        "funny viral sounds",
        "tiktok viral sounds",
        "viral audio clips",
        "viral soundboard buttons",
        "internet trending sounds",
        "viral discord sounds",
        "meme viral sounds",
        "most shared sounds",
        "funniest viral audios",
      ];
      break;

    case "indian":
      title = "Indian Soundboard - Bollywood, Desi, and Meme Sound Buttons";
      description =
        "Browse the funniest and most iconic Indian sound buttons including Bollywood dialogues, viral meme sounds, and desi audio clips. Instant playback and free downloads at InstantSoundboard.";
      keywords = [
        "indian soundboard",
        "bollywood sound buttons",
        "desi meme sounds",
        "indian audio clips",
        "funny indian sounds",
        "south indian soundboard",
        "indian sound effects",
        "viral indian dialogues",
        "desi meme audio",
        "hindi movie quotes",
        "instant indian sounds",
        "download indian meme sounds",
        "tamil and telugu sounds",
        "indian funny buttons",
      ];
      break;

    default:
      title = categoryName
        ? `Listen to "${categoryName}" - Free Sound Collection`
        : "Explore Free Sounds & Audio Clips";

      description = categoryName
        ? `Discover "${categoryName}" in the ${categoryName} category. Find more sounds like this on our platform.`
        : `Listen to and explore a variety of sounds uploaded by users.`;

      keywords = categoryName
        ? [
            categoryName,
            `${categoryName} sounds`,
            `${categoryName} audio`,
            "soundboard",
          ]
        : ["free sounds", "audio clips", "sound effects"];
  }

  return {
    title,
    description,
    keywords,
    // openGraph: {
    //   title,
    //   description,
    //   type: "website",
    //   url: `https://yourwebsite.com/sounds/${categoryName}`,
    //   images: [
    //     {
    //       url: defaultImage,
    //       width: 1200,
    //       height: 630,
    //       alt: "Sound Thumbnail",
    //     },
    //   ],
    // },
    // twitter: {
    //   card: "summary_large_image",
    //   title,
    //   description,
    //   images: [defaultImage],
    // },
  };
}

export async function generateMetadata({
  params,
}: {
  params: { categoryName: string };
}): Promise<Metadata> {
  const { categoryName } = params;
  return generateSEOMetadata(categoryName);
}

export default function SoundPage({
  children,
  params,
}: {
  children: React.ReactElement;
  params: { id: string };
}) {
  return <>{children}</>;
}
