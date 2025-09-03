import { NextResponse } from "next/server";
import { API_BASE } from "@/lib/env";
import { apiFetch, ApiError } from "@/lib/http";
import {
  getTokensFromCookies,
  setAuthCookies,
  setAccessCookie,
} from "@/lib/auth-cookies";

export async function POST() {
  try {
    const { refresh } = await getTokensFromCookies();
    if (!refresh) {
      return NextResponse.json(
        { ok: false, message: "No refresh token" },
        { status: 401 }
      );
    }

    // backend returns both access and refresh; we honor that.
    const tokens = await apiFetch<{ access: string; refresh: string }>(
      `${API_BASE}/api/auth/jwt/refresh/`,
      { method: "POST", body: { refresh } }
    );

    // If backend rotated refresh, set both; otherwise just update access
    if (tokens.refresh) setAuthCookies(tokens.access, tokens.refresh);
    else setAccessCookie(tokens.access);

    return NextResponse.json({ ok: true });
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
