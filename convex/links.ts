import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getLinks = query({
    args: { userId: v.id("users") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("links")
            .withIndex("by_user", (q) => q.eq("userId", args.userId))
            .order("asc") // It seems order is not fully handled here natively by convex. Convex .order("asc") orders by the index.
            .collect()
            .then(links => links.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
    },
});

export const listByUsername = query({
    args: { username: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_username", (q) => q.eq("username", args.username))
            .unique();

        if (!user) return [];

        return await ctx.db
            .query("links")
            .withIndex("by_user", (q) => q.eq("userId", user._id))
            .filter((q) => q.eq(q.field("isActive"), true))
            .order("asc")
            .collect()
            .then(links => links.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
    },
});

export const addLink = mutation({
    args: {
        userId: v.id("users"),
        title: v.string(),
        url: v.string(),
        platform: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");

        const user = await ctx.db.get(args.userId);
        if (!user || user.tokenIdentifier !== identity.tokenIdentifier) {
            throw new Error("Unauthorized");
        }

        const existingLinks = await ctx.db
            .query("links")
            .withIndex("by_user", (q) => q.eq("userId", args.userId))
            .collect();

        await ctx.db.insert("links", {
            userId: args.userId,
            title: args.title,
            url: args.url,
            platform: args.platform,
            order: existingLinks.length,
            isActive: true,
        });
    },
});

export const toggleLink = mutation({
    args: {
        linkId: v.id("links"),
        isActive: v.boolean(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");

        const link = await ctx.db.get(args.linkId);
        if (!link) throw new Error("Link not found");

        const user = await ctx.db.get(link.userId);
        if (!user || user.tokenIdentifier !== identity.tokenIdentifier) {
            throw new Error("Unauthorized");
        }

        await ctx.db.patch(args.linkId, { isActive: args.isActive });
    },
});

export const deleteLink = mutation({
    args: { linkId: v.id("links") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");

        const link = await ctx.db.get(args.linkId);
        if (!link) throw new Error("Link not found");

        const user = await ctx.db.get(link.userId);
        if (!user || user.tokenIdentifier !== identity.tokenIdentifier) {
            throw new Error("Unauthorized");
        }

        await ctx.db.delete(args.linkId);
    },
});

export const updateLink = mutation({
    args: {
        linkId: v.id("links"),
        title: v.optional(v.string()),
        url: v.optional(v.string()),
        platform: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");

        const link = await ctx.db.get(args.linkId);
        if (!link) throw new Error("Link not found");

        const user = await ctx.db.get(link.userId);
        if (!user || user.tokenIdentifier !== identity.tokenIdentifier) {
            throw new Error("Unauthorized");
        }

        const { linkId, ...updates } = args;
        await ctx.db.patch(linkId, updates);
    },
});

export const reorderLinks = mutation({
    args: {
        updates: v.array(v.object({ _id: v.id("links"), order: v.number() })),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");

        for (const update of args.updates) {
            const link = await ctx.db.get(update._id);
            if (!link) continue;
            
            const user = await ctx.db.get(link.userId);
            if (!user || user.tokenIdentifier !== identity.tokenIdentifier) continue;

            await ctx.db.patch(update._id, { order: update.order });
        }
    },
});
