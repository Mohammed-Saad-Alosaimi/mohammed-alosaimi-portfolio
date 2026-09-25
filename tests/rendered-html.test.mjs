import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("portfolio and control panel retain the required public and protected surfaces", async () => {
  const [portfolio, content, admin, editor, adminApi, publicApi, store, migration] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/portfolio-content.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/admin/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/admin/admin-editor.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/api/admin/content/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/api/public-content/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/portfolio-store.ts", import.meta.url), "utf8"),
    readFile(new URL("../drizzle/0000_spicy_human_fly.sql", import.meta.url), "utf8"),
  ]);

  assert.match(portfolio, /CONTENT_API/);
  assert.match(portfolio, /setContent/);
  assert.match(content, /Mohammed Saad Nayaf Al-Osaimi/);
  assert.match(content, /Saudi Made Mark Qualification Project/);
  assert.match(content, /Download/);
  assert.match(admin, /requireChatGPTUser/);
  assert.match(admin, /readPortfolioContent/);
  assert.match(admin, /initialContent/);
  assert.match(editor, /Saved content loaded\. Ready to edit\./);
  assert.match(editor, /beforeunload/);
  assert.doesNotMatch(editor, /Loading your portfolio content/);
  assert.match(adminApi, /writePortfolioContent/);
  assert.doesNotMatch(adminApi, /CREATE TABLE/);
  assert.match(publicApi, /Access-Control-Allow-Origin/);
  assert.doesNotMatch(publicApi, /CREATE TABLE/);
  assert.match(store, /SELECT content, updated_at FROM portfolio_content/);
  assert.match(migration, /CREATE TABLE IF NOT EXISTS `portfolio_content`/);
});
