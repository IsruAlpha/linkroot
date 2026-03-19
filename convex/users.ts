import { v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";

export const storeUser = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called storeUser without authentication");
        }

        // Check if we've already stored this user
        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier)
            )
            .unique();

        if (user !== null) {
            // Check if we need to update any fields that are currently missing
            const updates: any = {};
            if (!user.name && identity.name) updates.name = identity.name;
            if (!user.email && identity.email) updates.email = identity.email;
            if (!user.image && identity.pictureUrl) updates.image = identity.pictureUrl;

            if (Object.keys(updates).length > 0) {
                await ctx.db.patch(user._id, updates);
            }
            return user._id;
        }

        // If it's a new user, create it
        const userId = await ctx.db.insert("users", {
            name: identity.name,
            email: identity.email,
            image: identity.pictureUrl,
            tokenIdentifier: identity.tokenIdentifier,
        });

        return userId;
    },
});

export const getMe = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return null;
        }

        return await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier)
            )
            .unique();
    },
});

export const updateProfile = mutation({
    args: {
        name: v.optional(v.string()),
        bio: v.optional(v.string()),
        username: v.optional(v.string()),
        image: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthenticated");
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier)
            )
            .unique();

        if (!user) {
            throw new Error("User not found");
        }

        // If updating username, check for uniqueness
        if (args.username && args.username !== user.username) {
            const existing = await ctx.db
                .query("users")
                .withIndex("by_username", (q) => q.eq("username", args.username))
                .unique();
            if (existing) {
                throw new Error("Username already taken");
            }
        }

        await ctx.db.patch(user._id, args);
    },
});

export const getUserByUsername = query({
    args: { username: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("users")
            .withIndex("by_username", (q) => q.eq("username", args.username))
            .unique();
    },
});

export const upgradeToPro = mutation({
    args: { userId: v.id("users") },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.userId, { isPro: true });
    },
});

export const updateBranding = mutation({
    args: { removeBranding: v.boolean() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier)
            )
            .unique();

        if (!user) throw new Error("User not found");
        if (!user.isPro) throw new Error("Must be a Pro user to remove branding");

        await ctx.db.patch(user._id, { removeBranding: args.removeBranding });
    },
});

export const updateTheme = mutation({
    args: { theme: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier)
            )
            .unique();

        if (!user) throw new Error("User not found");

        await ctx.db.patch(user._id, { theme: args.theme });
    },
});

export const syncEmail = mutation({
    args: { email: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier)
            )
            .unique();

        if (!user) throw new Error("User not found");

        // Only update if email is missing
        if (!user.email) {
            await ctx.db.patch(user._id, { email: args.email });
        }
    },
});

export const getMeForPolar = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return null;
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier)
            )
            .unique();

        if (!user) {
            return null;
        }

        // Get email from user record, or fall back to identity email
        const email = user.email || identity.email;

        if (!email) {
            return null;
        }

        return {
            userId: user._id as string,
            email,
        };
    },
});
export const updateChatbotSettings = mutation({
    args: {
        chatbotEnabled: v.optional(v.boolean()),
        chatbotPrompt: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated");

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier)
            )
            .unique();

        if (!user) throw new Error("User not found");

        await ctx.db.patch(user._id, {
            chatbotEnabled: args.chatbotEnabled ?? user.chatbotEnabled,
            chatbotPrompt: args.chatbotPrompt ?? user.chatbotPrompt,
        });
    },
});
