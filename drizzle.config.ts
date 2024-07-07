import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    port: 5432,
    host: 'ep-divine-snowflake-a7nqe1cn.ap-southeast-2.aws.neon.tech',
    user: 'lingo_owner',
    password: 'c3TjCtBkQh5a',
    database: 'lingo',
    ssl: 'require'
  },
  schema: "./db/schema.ts",
  out: "./drizzle",
});