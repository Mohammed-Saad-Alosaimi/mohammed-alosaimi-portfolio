import { getChatGPTUser } from "../../../chatgpt-auth";
import {
  isPortfolioContent,
  readPortfolioContent,
  writePortfolioContent,
} from "../../../portfolio-store";

const ADMIN_EMAIL = "moh.alosaimi15@gmail.com";

async function requireOwner() {
  const user = await getChatGPTUser();
  return user?.email.toLowerCase() === ADMIN_EMAIL ? user : null;
}

const noStoreHeaders = { "Cache-Control": "no-store" };

export async function GET() {
  if (!(await requireOwner())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const stored = await readPortfolioContent();
    return Response.json(
      { content: stored?.content ?? null, updatedAt: stored?.updatedAt ?? null },
      { headers: noStoreHeaders },
    );
  } catch (error) {
    console.error("Unable to read portfolio content", error);
    return Response.json(
      { error: "Content storage is temporarily unavailable" },
      { headers: noStoreHeaders, status: 503 },
    );
  }
}

export async function PUT(request: Request) {
  if (!(await requireOwner())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  let payload: { content?: unknown };
  try {
    payload = (await request.json()) as { content?: unknown };
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isPortfolioContent(payload.content)) {
    return Response.json({ error: "Invalid portfolio content" }, { status: 400 });
  }

  try {
    const updatedAt = await writePortfolioContent(payload.content);
    return Response.json({ ok: true, updatedAt }, { headers: noStoreHeaders });
  } catch (error) {
    console.error("Unable to save portfolio content", error);
    return Response.json(
      { error: "Content storage is temporarily unavailable" },
      { headers: noStoreHeaders, status: 503 },
    );
  }
}
