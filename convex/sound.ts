import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// List all sounds
export const listSounds = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("sounds").order("desc").collect();
  },
});
// Get sounds by category
export const getSoundsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, { category }) => {
    return await ctx.db
      .query("sounds")
      .withIndex("by_category", (q) => q.eq("category", category))
      .order("desc")
      .collect();
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
    return await ctx.storage.getUrl(fileId);
  },
});
