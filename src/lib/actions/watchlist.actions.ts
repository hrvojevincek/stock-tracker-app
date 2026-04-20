"use server";

import { eq } from "drizzle-orm";
import { db } from "@/database/db";
import { user, watchlist } from "@/database/schema";

export async function getWatchlistSymbolsByEmail(
  email: string
): Promise<string[]> {
  if (!email) return [];

  try {
    const rows = await db
      .select({ symbol: watchlist.symbol })
      .from(watchlist)
      .innerJoin(user, eq(user.id, watchlist.userId))
      .where(eq(user.email, email));

    return rows.map((r) => r.symbol);
  } catch (err) {
    console.error("getWatchlistSymbolsByEmail error:", err);
    return [];
  }
}
