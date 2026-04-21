import { drizzle, type NeonDatabase } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import * as schema from "./schema";

neonConfig.webSocketConstructor = ws;

type DrizzleDb = NeonDatabase<typeof schema>;

let cached: DrizzleDb | null = null;

const getDb = (): DrizzleDb => {
  if (cached) return cached;
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be set");
  }
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  cached = drizzle(pool, { schema });
  return cached;
};

export const db: DrizzleDb = new Proxy({} as DrizzleDb, {
  get: (_target, prop, receiver) => Reflect.get(getDb(), prop, receiver),
});
