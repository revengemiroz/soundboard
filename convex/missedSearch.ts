// convex/mutations/logMissedSearch.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const logMissedSearch = mutation({
  args: {
    query: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("missedSearches")
      .withIndex("by_createdAt")
      .collect();

    const recentDuplicate = existing.find(
      (entry) =>
        entry.query.toLowerCase() === args.query.toLowerCase() &&
        Date.now() - entry.createdAt < 1000 * 60 * 60 * 24 // 24 hours
    );

    if (recentDuplicate) return;

    await ctx.db.insert("missedSearches", {
      query: args.query,
      createdAt: Date.now(),
    });
  },
});
