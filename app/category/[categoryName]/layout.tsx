import { Metadata } from "next";
import { convex } from "../../ConvexClientProvider"; // Import Convex client
import { fetchQuery } from "convex/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

export function generateSEOMetadata(categoryName: any): Metadata {
  // Define the title
  const title = categoryName
    ? `Listen to "${categoryName}" - Free Sound Collection`
    : "Explore Free Sounds & Audio Clips";

  // Define the description
  const description = categoryName
    ? `Discover "${categoryName}" in the ${categoryName} category. Find more sounds like this on our platform.`
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
  params: { categoryName: string };
}): Promise<Metadata> {
  const { categoryName } = params;

  // Fetch sound metadata from Convex
\
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
  