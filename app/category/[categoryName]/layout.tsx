import { Metadata } from "next";
import { convex } from "../../ConvexClientProvider"; // Import Convex client
import { fetchQuery } from "convex/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

export function generateSEOMetadata(
  categoryName: string | undefined
): Metadata {
  // Define the title
  const title = categoryName
    ? `Listen to "${categoryName}" - Free Sound Collection`
    : "Explore Free Sounds & Audio Clips";

  // Define the description
  const description = categoryName
    ? `Discover "${categoryName}" in the ${categoryName} category. Find more sounds like this on our platform.`
    : `Listen to and explore a variety of sounds uploaded by users.`;

  // Fallback image
  const defaultImage = "/default-thumbnail.jpg";

  // Generate dynamic keywords
  const keywords = categoryName
    ? [
        "Nepali Soundboard",
        "InstantSoundBoard",
        "Nepali meme sound effects",
        "viral Nepali meme sounds",
        "Nepali meme sounds download",
        "viral Nepali sound effects",
        "custom sound buttons",
        categoryName,
        `${categoryName} soundboard`,
        `${categoryName} meme sounds`,
      ]
    : [
        "Free soundboard",
        "InstantSoundBoard",
        "Nepali sound effects",
        "meme sounds",
        "funny audio clips",
        "custom sound buttons",
      ];

  return {
    title,
    description,
    keywords,
    // Uncomment below if you want Open Graph / Twitter metadata
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

  // You could fetch data with Convex here if needed

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
