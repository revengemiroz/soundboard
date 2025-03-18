import { Metadata } from "next";
import { convex } from "../../ConvexClientProvider"; // Import Convex client
import { fetchQuery } from "convex/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

export function generateSEOMetadata(sound: any): Metadata {
  // Extracting useful keywords from title and tags
  const keywords = sound?.tags ? sound.tags.join(", ") : "";

  // Define the title with high-ranking keywords
  const title = sound?.title
    ? `${sound.title} | Download & Listen Free Sound Effects`
    : "Free Sound Effects & Audio Clips for Download";

  // Define an engaging description with keywords
  const description =
    sound?.title && sound?.category
      ? `Listen to "${sound.title}" - a top trending sound effect in the ${sound.category} category. Perfect for memes, videos, and creative projects. Get free sound downloads now!`
      : "Discover and download free sound effects, perfect for meme creators, YouTubers, and video editors.";

  // Adding a dynamic image (use a real image URL if available)
  const imageURL = sound?.uploadthingURL || "/default-thumbnail.jpg";

  return {
    title,
    description,
    keywords,
    // openGraph: {
    //   title,
    //   description,
    //   type: "website",
    //   url: `https://yourwebsite.com/sounds/${sound?._id}`,
    //   // images: [
    //   //   {
    //   //     url: imageURL,
    //   //     width: 1200,
    //   //     height: 630,
    //   //     alt: "Sound Thumbnail",
    //   //   },
    //   // ],
    // },
    // twitter: {
    //   card: "summary_large_image",
    //   title,
    //   description,
    //   images: [imageURL],
    // },
  };
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;

  // Fetch sound metadata from Convex
  const sound = await fetchQuery(api.sound.getSoundBySlug, {
    slug: id as string,
  });
  return generateSEOMetadata(sound);
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
