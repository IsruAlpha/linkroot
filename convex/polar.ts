import { Polar } from "@convex-dev/polar";
import { api, components } from "./_generated/api";
import { DataModel } from "./_generated/dataModel";
import { action, query } from "./_generated/server";

const config = {
  getUserInfo: async (ctx: any): Promise<{ userId: string; email: string }> => {
    const result = await ctx.runQuery(api.users.getMeForPolar);
    if (!result) {
      throw new Error("No user found");
    }
    return result;
  },
  products: {
    pro: (process.env.POLAR_PRO_PRODUCT_ID || "polar_pro_product_id").replace("product_", ""),
  },
  server: (process.env.POLAR_SERVER as "sandbox" | "production") || "sandbox",
};

export const polar = new Polar<DataModel, typeof config.products>(components.billing, config);

export const {
  changeCurrentSubscription,
  cancelCurrentSubscription,
  getConfiguredProducts,
  listAllProducts,
  listAllSubscriptions,
  generateCheckoutLink,
  generateCustomerPortalUrl,
} = polar.api();

// Sync existing products from Polar (run once after setup)
export const syncProducts = action({
  args: {},
  handler: async (ctx) => {
    await polar.syncProducts(ctx);
  },
});

export const getProductIds = query({
  args: {},
  handler: async () => {
    const proId = process.env.POLAR_PRO_PRODUCT_ID || "polar_pro_product_id";
    return {
      pro: proId.replace("product_", ""),
    };
  },
});
