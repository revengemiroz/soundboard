import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const requestSound = mutation({
  args: {
    name: v.string(),
    url: v.string(),
  },
  handler: async (ctx, { name, url }) => {
    await ctx.db.insert("requests", {
      name,
      url,
      createdAt: Date.now(),
    });
  },
});
