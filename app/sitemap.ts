import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import fs from "fs";
import { MetadataRoute } from "next";
import path from "path";

const baseUrl = "https://www.instantsoundboard.com";
const baseDir = "app";
const excludeDirs = ["api", "fonts"];

export const revalidate = 3600; // Revalidate every hour

async function getRoutes(): Promise<MetadataRoute.Sitemap> {
  const fullPath = path.join(process.cwd(), baseDir);
  const entries = fs.readdirSync(fullPath, { withFileTypes: true });

  let routes: string[] = ["/"];

  // Include static routes
  entries.forEach((entry) => {
    if (entry.isDirectory() && !excludeDirs.includes(entry.name)) {
      routes.push(`/${entry.name}`);
    }
  });

  // Fetch sound IDs dynamically from Convex API
  async function getSoundSlugs() {
    try {
      const response = await fetchQuery(api.sound.getAllSoundSlugs);

      // Map IDs to generate dynamic sound routes
      const soundRoutes: string[] = response.map(
        (sound: { id: string }) => `/sounds/${sound.id}`
      );
      routes = [...routes, ...soundRoutes];
    } catch (error) {
      console.error("Error fetching sound slugs:", error);
    }
  }

  await getSoundSlugs();

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  }));
}

export default function sitemap() {
  return getRoutes();
}
