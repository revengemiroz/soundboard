import { paginationOptsValidator } from "convex/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// List all sounds
// export const listSounds = query({
//   args: {},
//   handler: async (ctx) => {
//     return await ctx.db.query("sounds").order("desc").collect();
//   },
// });
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

// Get sounds by category
// export const getSoundsByCategory = query({
//   args: { category: v.string() },
//   handler: async (ctx, { category }) => {
//     return await ctx.db
//       .query("sounds")
//       .withIndex("by_category", (q) => q.eq("category", category))
//       .order("desc")
//       .collect();
//   },
// });

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

// Search sounds by title (Case-Insensitive)
// export const searchSounds = query({
//   args: { searchTerm: v.string() },
//   handler: async (ctx, { searchTerm }) => {
//     const allSounds = await ctx.db.query("sounds").collect();
//     // console.log({ allSounds }, ctx.storage.getUrl());

//     if (!searchTerm) return allSounds;

//     return allSounds.filter((sound) =>
//       sound.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   },
// });
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
    return await ctx.db.insert("soundsv1", {
      title,
      category,
      tags,
      uploadthingURL,
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
  },
  handler: async (ctx, { id, title, category, tags }) => {
    return await ctx.db.patch(id, {
      ...(title !== undefined && { title }),
      ...(category !== undefined && { category }),
      ...(tags !== undefined && { tags }),
    });
  },
});
