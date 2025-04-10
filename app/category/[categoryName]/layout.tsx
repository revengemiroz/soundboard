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
      title = "Anime Soundboard - Popular Anime Quotes & Effects";
      description =
        "Listen to your favorite anime sounds and voice clips from popular shows. Ideal for fans and creators alike.";
      keywords = [
        "anime sounds",
        "anime quotes",
        "anime effects",
        "otaku soundboard",
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
