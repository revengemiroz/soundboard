import { paginationOptsValidator } from "convex/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// List all sounds
export const listSounds = query({
  args: {},
  handler: async (ctx) => {
    const sounds = await ctx.db.query("sounds").order("desc").collect();

    return await Promise.all(
      sounds.map(async (sound) => ({
        ...sound,
        audioUrl: await ctx.storage.getUrl(sound.fileId),
      }))
    );
  },
});

export const getAllSoundSlugs = query({
  args: {},
  handler: async (ctx) => {
    // Query all sounds but only select the slug field
    const slugs = await ctx.db.query("soundsv1").collect();

    // Return just an array of slug strings
    return slugs.map((sound) => sound.slug);
  },
});

// Generate an upload URL for Convex Storage
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const uploadSound = mutation({
  args: {
    title: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    fileId: v.id("_storage"), // Convex Storage ID
  },
  handler: async (ctx, { title, category, tags, fileId }) => {
    return await ctx.db.insert("sounds", {
      title,
      category,
      tags,
      fileId,
      createdAt: Date.now(),
    });
  },
});

// Get a public URL for a stored file
export const getSoundUrl = query({
  args: { fileId: v.id("_storage") },
  handler: async (ctx, { fileId }) => {
    const url = await ctx.storage.getUrl(fileId);
    return url + "?raw=true"; // Ensures it plays instead of downloading
  },
});

export const searchSounds = query({
  args: {
    searchTerm: v.optional(v.string()),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, { searchTerm, paginationOpts }) => {
    // Stage 1: Start with the table query
    const preIndexQuery = ctx.db.query("soundsv1");

    // Stage 2: Apply search index or ordering
    let orderedQuery;
    if (searchTerm) {
      // Search index automatically creates an OrderedQuery (by relevance)
      orderedQuery = preIndexQuery.withSearchIndex("by_title", (q) =>
        q.search("title", searchTerm)
      );
    } else {
      // Apply descending order for non-search case
      orderedQuery = preIndexQuery.order("desc");
    }

    // Get paginated results
    const result = await orderedQuery.paginate(paginationOpts);

    // Transform results to add audio URLs
    const soundsWithUrls = result.page.map((sound) => ({
      ...sound,
      audioUrl: sound.uploadthingURL,
    }));

    // Return the transformed results with pagination info
    return {
      ...result,
      page: soundsWithUrls,
    };
  },
});

// Fetch a sound by ID
export const getSoundById = query({
  args: { id: v.id("soundsv1") },
  handler: async (ctx, { id }) => {
    const sound = await ctx.db.get(id);
    if (!sound) return null;

    // Ensure we get a valid file URL from Convex storage
    return { ...sound };
  },
});

// New function to get a sound by slug
export const getSoundBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const sound = await ctx.db
      .query("soundsv1")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();

    if (!sound) return null;

    return { ...sound };
  },
});

export const getSoundsByCategory = query({
  args: {
    category: v.string(),
    searchTerm: v.optional(v.string()), // ✅ Optional search term
    paginationOpts: paginationOptsValidator, // ✅ Pagination
  },
  handler: async (ctx, { category, searchTerm, paginationOpts }) => {
    let queryBuilder = ctx.db
      .query("soundsv1")
      .withIndex("by_category", (q) => q.eq("category", category))
      .order("desc");
    const result = await queryBuilder.paginate(paginationOpts);
    // ✅ If searchTerm exists, filter inside the query before pagination
    // ✅ Step 2: Apply search filtering AFTER pagination
    let filteredSounds = result.page;
    if (searchTerm) {
      filteredSounds = filteredSounds.filter((sound) =>
        sound.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // ✅ Step 3: Fetch audio URLs
    const soundsWithUrls = await Promise.all(
      filteredSounds.map(async (sound) => ({
        ...sound,
      }))
    );

    return {
      ...result,
      page: soundsWithUrls, // ✅ Return final filtered + paginated data
    };
  },
});

export const uploadSoundV1 = mutation({
  args: {
    title: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    uploadthingURL: v.string(),
  },
  handler: async (ctx, { title, category, tags, uploadthingURL }) => {
    // Generate a slug from the title
    let slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // Remove special chars
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .trim();

    // Check if slug already exists
    const existing = await ctx.db
      .query("soundsv1")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    // If slug exists, append a timestamp to make it unique
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    return await ctx.db.insert("soundsv1", {
      title,
      category,
      tags,
      uploadthingURL,
      slug,
      createdAt: Date.now(),
    });
  },
});

export const updateSound = mutation({
  args: {
    id: v.id("soundsv1"),
    title: v.optional(v.string()),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    slug: v.optional(v.string()),
  },
  handler: async (ctx, { id, title, category, tags, slug: providedSlug }) => {
    // Create an updates object to collect all the changes
    const updates: Record<string, any> = {};

    // If title is provided, add it to updates
    if (title !== undefined) {
      updates.title = title;
    }

    // If category is provided, add it to updates
    if (category !== undefined) {
      updates.category = category;
    }

    // If tags are provided, add them to updates
    if (tags !== undefined) {
      updates.tags = tags;
    }

    // Handle slug logic
    if (providedSlug !== undefined) {
      // If a slug is explicitly provided, check for duplicates
      const existing = await ctx.db
        .query("soundsv1")
        .withIndex("by_slug", (q) => q.eq("slug", providedSlug))
        .first();

      // If a duplicate exists and it's not the current sound, throw an error
      if (existing && existing._id.toString() !== id.toString()) {
        throw new Error(`Slug "${providedSlug}" already exists`);
      }

      updates.slug = providedSlug;
    } else if (title !== undefined) {
      // If title is updated but slug isn't, generate a new slug
      let newSlug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim();

      // Check if the generated slug already exists
      const existing = await ctx.db
        .query("soundsv1")
        .withIndex("by_slug", (q) => q.eq("slug", newSlug))
        .first();

      // If a duplicate exists and it's not the current sound, make it unique
      if (existing && existing._id.toString() !== id.toString()) {
        newSlug = `${newSlug}-${Date.now()}`;
      }

      // Add the new slug to the update
      updates.slug = newSlug;
    }

    // Only apply updates if there are any
    if (Object.keys(updates).length > 0) {
      return await ctx.db.patch(id, updates);
    }

    return await ctx.db.get(id);
  },
});

// Migration function to add slugs to existing sounds
export const migrateAddSlugsToSounds = mutation({
  args: {},
  handler: async (ctx) => {
    // Get all sounds without slugs
    const sounds = await ctx.db
      .query("soundsv1")
      .filter((q) => q.eq(q.field("slug"), undefined))
      .collect();

    // Process each sound
    for (const sound of sounds) {
      // Generate a slug from the title
      let slug = sound.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim();

      // Check if slug already exists
      const existing = await ctx.db
        .query("soundsv1")
        .withIndex("by_slug", (q) => q.eq("slug", slug))
        .first();

      // If slug exists, append a timestamp to make it unique
      if (existing) {
        slug = `${slug}-${sound._creationTime}`;
      }

      // Update the sound with the new slug
      await ctx.db.patch(sound._id, { slug });
    }

    return { success: true, processed: sounds.length };
  },
});

export const getRecommendedSounds = query({
  args: {
    soundId: v.id("soundsv1"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { soundId, limit = 6 }) => {
    const targetSound = await ctx.db.get(soundId);
    if (!targetSound) return [];

    // Step 1: Find other sounds in the same category (excluding the target sound)
    const sameCategory = await ctx.db
      .query("soundsv1")
      .withIndex("by_category", (q) => q.eq("category", targetSound.category))
      .order("desc")
      .take(20); // Get more than needed to filter later

    const filtered = sameCategory.filter((s) => s._id !== soundId);

    const shuffled = filtered.sort(() => Math.random() - 0.5);

    // Step 2: Sort by overlapping tags
    const sortedByTags = shuffled
      .map((sound) => {
        const commonTags = sound.tags.filter((tag) =>
          targetSound.tags.includes(tag)
        );
        return { ...sound, tagScore: commonTags.length };
      })
      .sort((a, b) => b.tagScore - a.tagScore)
      .slice(0, limit);

    return sortedByTags;
  },
});
