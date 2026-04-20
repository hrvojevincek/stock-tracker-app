"use server";

import { isNotNull } from "drizzle-orm";
import { db } from "@/database/db";
import { user } from "@/database/schema";

export const getAllUsersForNewsEmail = async () => {
  try {
    const rows = await db
      .select({
        id: user.id,
        email: user.email,
        name: user.name,
      })
      .from(user)
      .where(isNotNull(user.email));

    return rows.filter((u) => u.email && u.name);
  } catch (e) {
    console.error("Error fetching users for news email:", e);
    return [];
  }
};
