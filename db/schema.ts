import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const portfolioContent = sqliteTable("portfolio_content", {
  id: text("id").primaryKey(),
  content: text("content").notNull(),
  updatedAt: integer("updated_at").notNull(),
});
