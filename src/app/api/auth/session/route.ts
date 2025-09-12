import { NextResponse, NextRequest } from "next/server";
import { API_BASE, ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/lib/env";
import { apiFetch, ApiError } from "@/lib/http";
import {
  setAccessCookie,
  setAuthCookies,
  clearAuthCookies,
} from "@/lib/auth-cookies";
import type { User } from "@/types/user";
import { clearSessionCache } from "@/lib/auth-server";

// Cache in memory per server instance
//eslint-disble-next-line
let cachedSession: { data: any; expiry: number } | null = null;
const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const SHORT_ERROR_TTL = 5 * 1000;

export async function GET(req: NextRequest) {
  const now = Date.now();

  // 1) Use cache if valid
  if (cachedSession && cachedSession.expiry > now) {
    return NextResponse.json(cachedSession.data);
  }

  const access = req.cookies.get(ACCESS_TOKEN_COOKIE)?.value ?? null;
  const refresh = req.cookies.get(REFRESH_TOKEN_COOKIE)?.value ?? null;

  try {
    // 2) Try access token
    if (access) {
      try {
        const user = await apiFetch<User>(`${API_BASE}/api/auth/users/me/`, {
          method: "GET",
          headers: { Authorization: `Bearer ${access}` },
        });

        const responseData = { authenticated: true, user };
        cachedSession = { data: responseData, expiry: now + REFRESH_TTL_MS };
        return NextResponse.json(responseData);
      } catch {
        // invalid access → fallthrough to refresh
      }
    }

    // 3) No refresh token = logged out
    if (!refresh) {
      const responseData = { authenticated: false };
      cachedSession = { data: responseData, expiry: now + SHORT_ERROR_TTL };
      return NextResponse.json(responseData, { status: 401 });
    }

    // 4) Try refresh flow
    const tokens = await apiFetch<{ access: string; refresh?: string }>(
      `${API_BASE}/api/auth/jwt/refresh/`,
      { method: "POST", body: { refresh } }
    );

    if (tokens.refresh) {
      await setAuthCookies(tokens.access, tokens.refresh);
    } else {
      await setAccessCookie(tokens.access);
    }

    const user = await apiFetch<User>(`${API_BASE}/api/auth/users/me/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${tokens.access}` },
    });

    const responseData = { authenticated: true, user };
    cachedSession = { data: responseData, expiry: now + REFRESH_TTL_MS };
    return NextResponse.json(responseData);
  } catch (err) {
    if (err instanceof ApiError) {
      // If refresh token is invalid/expired
      if (
        err.details &&
        typeof err.details === "object" &&
        "code" in err.details &&
        (err.details as { code?: string }).code === "token_not_valid"
      ) {
        await clearAuthCookies();
        await clearSessionCache();
        cachedSession = null;
        return NextResponse.json(
          {
            authenticated: false,
            message: "Session expired, please log in again.",
          },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { authenticated: false, message: err.message, details: err.details },
        { status: 401 }
      );
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
