import { readPortfolioContent } from "../../portfolio-store";

const ALLOWED_ORIGIN = "https://mohammed-alosaimi.pages.dev";

function headers() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "no-store",
    Vary: "Origin",
  };
}

export async function OPTIONS() {
  return new Response(null, { headers: headers() });
}

export async function GET() {
  try {
    const stored = await readPortfolioContent();
    return Response.json(
      { content: stored?.content ?? null, updatedAt: stored?.updatedAt ?? null },
      { headers: headers() },
    );
  } catch (error) {
    console.error("Unable to read public portfolio content", error);
    return Response.json(
      { content: null, error: "Content storage is temporarily unavailable" },
      { headers: headers(), status: 503 },
    );
  }
}
