import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../../../chatgpt-auth";

const ADMIN_EMAIL = "moh.alosaimi15@gmail.com";

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (user?.email.toLowerCase() !== ADMIN_EMAIL) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0 || file.size > 25_000_000) return Response.json({ error: "Select a file under 25 MB" }, { status: 400 });
  const extension = file.name.split(".").pop()?.replace(/[^a-z0-9]/gi, "") || "bin";
  const safeName = file.name.replace(/[^a-z0-9._-]/gi, "-").slice(0, 90);
  const key = `portfolio/${Date.now()}-${safeName || `file.${extension}`}`;
  await env.CONTENT_FILES.put(key, file.stream(), { httpMetadata: { contentType: file.type || "application/octet-stream" } });
  return Response.json({ url: `${new URL(request.url).origin}/api/public-files/${encodeURIComponent(key)}` });
}
