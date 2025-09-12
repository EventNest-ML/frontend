// /src/app/api/logout/route.ts
import { NextResponse } from "next/server";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/lib/env";
import { clearSessionCache } from "@/lib/auth-server";

export async function POST() {
  const res = NextResponse.json({ ok: true });

  res.cookies.set(ACCESS_TOKEN_COOKIE, "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  res.cookies.set(REFRESH_TOKEN_COOKIE, "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  
  await clearSessionCache();

  return res;
}
