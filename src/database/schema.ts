import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export * from "./auth-schema";

export const watchlist = pgTable(
  "watchlist",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    symbol: text("symbol").notNull(),
    company: text("company").notNull(),
    addedAt: timestamp("added_at").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("watchlist_user_symbol_idx").on(table.userId, table.symbol)],
);

export const watchlistRelations = relations(watchlist, ({ one }) => ({
  user: one(user, {
    fields: [watchlist.userId],
    references: [user.id],
  }),
}));
