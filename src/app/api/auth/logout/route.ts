import { NextResponse } from "next/server";
import { clearAuthCookies } from "@/lib/auth-cookies";
import { clearSessionCache } from "@/lib/auth-server";

export async function POST() {
  await clearAuthCookies();
  await clearSessionCache();

  return NextResponse.json({ ok: true });
}
