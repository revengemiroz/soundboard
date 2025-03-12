import { Metadata } from "next";
import { convex } from "../../ConvexClientProvider"; // Import Convex client
import { fetchQuery } from "convex/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

export function generateSEOMetadata(sound: any): Metadata {
  // Define the title
  const title = sound?.title
    ? `Listen to "${sound.title}" - Free Sound Collection`
    : "Explore Free Sounds & Audio Clips";

  // Define the description
  const description = sound?.category
    ? `Discover "${sound.title}" in the ${sound.category} category. Find more sounds like this on our platform.`
    : `Listen to and explore a variety of sounds uploaded by users.`;

  // Fallback image
  const defaultImage = "/default-thumbnail.jpg"; // Use a real image

  return {
    title,
    description,
    // openGraph: {
    //   title,
    //   description,
    //   type: "website",
    //   url: `https://yourwebsite.com/sounds/${sound?._id}`,
    //   images: [
    //     {
    //       url: defaultImage, // Use a default image since no image is available in data
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
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;

  // Fetch sound metadata from Convex
  const sound = await fetchQuery(api.sound.getSoundById, {
    id: id as string as Id<"soundsv1">,
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
