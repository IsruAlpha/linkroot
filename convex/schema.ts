import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    name: v.optional(v.string()),
    username: v.optional(v.string()),
    email: v.optional(v.string()),
    image: v.optional(v.string()),
    bio: v.optional(v.string()),
    tokenIdentifier: v.string(),
    isPro: v.optional(v.boolean()),
    removeBranding: v.optional(v.boolean()),
    theme: v.optional(v.string()),
    chatbotEnabled: v.optional(v.boolean()),
    chatbotPrompt: v.optional(v.string()),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_username", ["username"]),

  links: defineTable({
    userId: v.id("users"),
    title: v.string(),
    url: v.string(),
    platform: v.string(),
    icon: v.optional(v.string()),
    order: v.number(),
    isActive: v.boolean(),
  }).index("by_user", ["userId"]),

  numbers: defineTable({
    value: v.number(),
  }),
});
