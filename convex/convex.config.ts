import { defineApp } from "convex/server";
import polar from "@convex-dev/polar/convex.config.js";

const app = defineApp();
app.use(polar, { name: "billing" });

export default app;
