import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const forwardedFor =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-vercel-forwarded-for") ||
    request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "Not available";

  return NextResponse.json(
    { ip, userAgent: request.headers.get("user-agent") || "Not available" },
    { headers: { "Cache-Control": "no-store" } },
  );
}
