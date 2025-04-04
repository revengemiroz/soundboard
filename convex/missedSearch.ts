// convex/mutations/logMissedSearch.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const logMissedSearch = mutation({
  args: {
    query: v.string(),
  },
  handler: async (ctx, args) => {
    if (args.query.length == 0) return;

    await ctx.db.insert("missedSearches", {
      query: args.query,
      createdAt: Date.now(),
    });
  },
});
