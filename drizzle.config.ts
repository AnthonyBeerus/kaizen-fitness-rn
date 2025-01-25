import type { Config } from "drizzle-kit";

export default {
  schema: "./db/FitnessData/fitnessSchema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  driver: "expo", // <---- very important
} satisfies Config;
