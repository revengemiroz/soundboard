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

  soundsv1: defineTable({
    title: v.string(),
    slug: v.optional(v.string()),
    category: v.string(),
    uploadthingURL: v.string(),
    tags: v.array(v.string()),
    createdAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .searchIndex("by_title", { searchField: "title" })
    .index("by_category", ["category", "createdAt"]),

  requests: defineTable({
    name: v.string(),
    url: v.string(),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),
});
