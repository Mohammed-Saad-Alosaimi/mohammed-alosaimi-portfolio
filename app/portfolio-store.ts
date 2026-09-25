import { env } from "cloudflare:workers";
import type { PortfolioContent } from "./portfolio-content";

const PRIMARY_CONTENT_ID = "primary";
const MAX_CONTENT_BYTES = 1_500_000;

export type StoredPortfolioContent = {
  content: PortfolioContent;
  updatedAt: number;
};

export async function readPortfolioContent(): Promise<StoredPortfolioContent | null> {
  const row = await env.DB.prepare(
    "SELECT content, updated_at FROM portfolio_content WHERE id = ?",
  )
    .bind(PRIMARY_CONTENT_ID)
    .first<{ content: string; updated_at: number }>();

  if (!row) return null;

  const content = JSON.parse(row.content) as unknown;
  if (!isPortfolioContent(content)) {
    throw new Error("Stored portfolio content is invalid");
  }

  return { content, updatedAt: row.updated_at };
}

export async function writePortfolioContent(
  content: PortfolioContent,
): Promise<number> {
  const serialized = JSON.stringify(content);
  if (serialized.length > MAX_CONTENT_BYTES) {
    throw new Error("Portfolio content is too large");
  }

  const updatedAt = Date.now();
  await env.DB.prepare(
    "INSERT INTO portfolio_content (id, content, updated_at) VALUES (?, ?, ?) ON CONFLICT(id) DO UPDATE SET content = excluded.content, updated_at = excluded.updated_at",
  )
    .bind(PRIMARY_CONTENT_ID, serialized, updatedAt)
    .run();

  return updatedAt;
}

export function isPortfolioContent(value: unknown): value is PortfolioContent {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;

  const content = value as Partial<PortfolioContent>;
  return (
    hasStringFields(content.site, [
      "name",
      "portfolioLabel",
      "eyebrow",
      "role",
      "intro",
      "email",
      "location",
      "heroImage",
    ]) &&
    hasStringFields(content.theme, ["background", "surface", "accent", "text"]) &&
    Array.isArray(content.navItems) &&
    Array.isArray(content.tags) &&
    Array.isArray(content.stats) &&
    typeof content.about === "string" &&
    Array.isArray(content.expertise) &&
    Array.isArray(content.projects) &&
    Array.isArray(content.trainings) &&
    Array.isArray(content.designWorks) &&
    Array.isArray(content.directCollaborations) &&
    Array.isArray(content.relations) &&
    Array.isArray(content.credentialGroups) &&
    Array.isArray(content.experiences) &&
    hasStringFields(content.recommendation, [
      "quote",
      "author",
      "authorRole",
      "href",
    ]) &&
    Array.isArray(content.downloads)
  );
}

function hasStringFields(
  value: unknown,
  fields: readonly string[],
): value is Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const record = value as Record<string, unknown>;
  return fields.every((field) => typeof record[field] === "string");
}
