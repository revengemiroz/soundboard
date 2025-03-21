import { Metadata } from "next";

export function generateSEOMetadata(categoryName?: string): Metadata {
  // Define the title
  const title = categoryName
    ? `Listen to ${categoryName} - Free Sound Collection`
    : "Explore Free Sounds & Audio Clips";

  // Define a well-written description
  const description = categoryName
    ? `Explore a rich collection of ${categoryName} sounds and audio clips. From viral meme sound effects to classic soundboard buttons, find and download your favorite ${categoryName} audio. Experience the best of ${categoryName} sound culture in one place.`
    : `Discover a vast collection of sounds and audio clips. From meme sound effects to high-quality soundboard buttons, explore and download a variety of free audio clips.`;

  // Generate SEO-friendly keywords
  const keywords = categoryName
    ? [
        `${categoryName} soundboard`,
        `${categoryName} audio clips`,
        `viral ${categoryName} sounds`,
        `${categoryName} meme sound effects`,
        `${categoryName} ringtone downloads`,
        `soundboard buttons`,
        `${categoryName} music snippets`,
        `${categoryName} dialogue clips`,
        `funny ${categoryName} sounds`,
        `popular ${categoryName} memes`,
      ]
    : [
        "free soundboard",
        "audio clips",
        "meme sound effects",
        "funny ringtones",
        "soundboard buttons",
        "music snippets",
        "dialogue clips",
        "popular sound effects",
      ];

  return {
    title,
    description,
    keywords,
  };
}

export async function generateMetadata({
  params,
}: {
  params: { categoryName: string };
}): Promise<Metadata> {
  return generateSEOMetadata(params.categoryName);
}
