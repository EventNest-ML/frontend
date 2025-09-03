import { NextResponse } from "next/server";
import { API_BASE } from "@/lib/env";
import { apiFetch, ApiError } from "@/lib/http";
import {
  getTokensFromCookies,
  setAccessCookie,
  setAuthCookies,
} from "@/lib/auth-cookies";

// 🔹 Simple in-memory cache
let cachedSession: { data: any; expiry: number } | null = null;

/**
 * Returns { authenticated, user? }
 * Tries to use access; if invalid, uses refresh to rotate and retry.
 * Now includes a 1-minute in-memory cache.
 */
export async function GET() {
  const now = Date.now();

  // 1) If cache is still valid, returns it directly
  if (cachedSession && cachedSession.expiry > now) {
    return NextResponse.json(cachedSession.data);
  }

  try {
    let { access, refresh } = await getTokensFromCookies();

    // 2) Try users/me with access
    if (access) {
      try {
        const user = await apiFetch<any>(`${API_BASE}/api/auth/users/me/`, {
          method: "GET",
          headers: { Authorization: `Bearer ${access}` },
        });

        const responseData = { authenticated: true, user };

        // update cache (1 min)
        cachedSession = { data: responseData, expiry: now + 60_000 };

        return NextResponse.json(responseData);
      } catch (_) {
        // fallthrough to refresh
      }
    }

    // 3) Try refresh
    if (!refresh) {
      const responseData = { authenticated: false };
      cachedSession = { data: responseData, expiry: now + 60_000 };
      return NextResponse.json(responseData, { status: 401 });
    }

    const tokens = await apiFetch<{ access: string; refresh: string }>(
      `${API_BASE}/api/auth/jwt/refresh/`,
      { method: "POST", body: { refresh } }
    );

    if (tokens.refresh) setAuthCookies(tokens.access, tokens.refresh);
    else setAccessCookie(tokens.access);

    // Retry with new access
    const user = await apiFetch<any>(`${API_BASE}/api/auth/users/me/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${tokens.access}` },
    });

    const responseData = { authenticated: true, user };

    cachedSession = { data: responseData, expiry: now + 60_000 };

    return NextResponse.json(responseData);
  } catch (err) {
    const responseData = { authenticated: false };

    if (err instanceof ApiError) {
      cachedSession = {
        data: { ...responseData, message: err.message, details: err.details },
        expiry: now + 60_000,
      };
      return NextResponse.json(cachedSession.data, { status: 401 });
    }

    cachedSession = { data: responseData, expiry: now + 60_000 };
    return NextResponse.json(responseData, { status: 401 });
  }
}
