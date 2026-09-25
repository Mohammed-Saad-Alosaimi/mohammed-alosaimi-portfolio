import { notFound } from "next/navigation";
import { requireChatGPTUser } from "../chatgpt-auth";
import { defaultPortfolioContent } from "../portfolio-content";
import { readPortfolioContent } from "../portfolio-store";
import { AdminEditor } from "./admin-editor";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await requireChatGPTUser("/admin");
  if (user.email.toLowerCase() !== "moh.alosaimi15@gmail.com") notFound();

  let initialContent = defaultPortfolioContent;
  let initialUpdatedAt: number | null = null;
  let initialLoadError = false;

  try {
    const stored = await readPortfolioContent();
    initialContent = stored?.content ?? defaultPortfolioContent;
    initialUpdatedAt = stored?.updatedAt ?? null;
  } catch (error) {
    console.error("Unable to load portfolio content for the editor", error);
    initialLoadError = true;
  }

  return (
    <AdminEditor
      ownerName={user.displayName}
      initialContent={initialContent}
      initialUpdatedAt={initialUpdatedAt}
      initialLoadError={initialLoadError}
    />
  );
}
