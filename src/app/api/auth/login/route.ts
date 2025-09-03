import { NextResponse } from "next/server";
import { API_BASE } from "@/lib/env";
import { apiFetch, ApiError } from "@/lib/http";
import { setAuthCookies } from "@/lib/auth-cookies";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 1) Create tokens
    const tokens = await apiFetch<{ access: string; refresh: string }>(
      `${API_BASE}/api/auth/jwt/create/`,
      { method: "POST", body: { email, password } }
    );

    // 2) Set cookies
    setAuthCookies(tokens.access, tokens.refresh);

    // 3) Fetch user profile
    const user = await apiFetch<any>(`${API_BASE}/api/auth/users/me/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${tokens.access}` },
    });

    return NextResponse.json({ ok: true, user });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json(
        { ok: false, message: err.message, details: err.details },
        { status: err.status }
      );
    }
    return NextResponse.json(
      { ok: false, message: "Unexpected error" },
      { status: 500 }
    );
  }
}
