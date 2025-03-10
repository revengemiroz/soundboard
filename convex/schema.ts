import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  sounds: defineTable({
    title: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    fileId: v.id("_storage"), // Store Convex Storage ID
    createdAt: v.number(),
  }).index("by_category", ["category", "createdAt"]),
});
