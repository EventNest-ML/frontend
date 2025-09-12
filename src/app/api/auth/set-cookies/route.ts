import { setAuthCookies } from "@/lib/auth-cookies";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { access, refresh } = await req.json();

  if (!access || !refresh) {
    return NextResponse.json({ error: "Missing tokens" }, { status: 400 });
  }
  setAuthCookies(access, refresh);

  return NextResponse.json({ success: true });
}
