import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE, API_BASE } from "@/lib/env";
import { apiFetch, ApiError } from "@/lib/http";
import { setAuthCookies, setAccessCookie } from "@/lib/auth-cookies";

// In-memory session cache
// let cachedSession: { data: any; expiry: number } | null = null;

export async function GET() {
  const now = Date.now();

  // ✅ Use cookies() inside route handlers, not req.cookies
  const jar = await cookies();
  const refresh = jar.get(REFRESH_TOKEN_COOKIE)?.value || null;
  const access = jar.get(ACCESS_TOKEN_COOKIE)?.value || null;

  console.log("SESSION route cookies =>", { access, refresh });

  try {
    // 1) Use cached session if valid
    // if (cachedSession && cachedSession.expiry > now) {
    //   return NextResponse.json(cachedSession.data);
    // }

    // 2) Try access token
    if (access) {
      try {
        // eslint-disable-next-line
        const user = await apiFetch<any>(`${API_BASE}/api/auth/users/me/`, {
          method: "GET",
          headers: { Authorization: `Bearer ${access}` },
        });

        const responseData = { authenticated: true, user };
        // cachedSession = { data: responseData, expiry: now + 60_000 * 55 }; // ~55 mins
        return NextResponse.json(responseData);
      } catch {
        // invalid/expired access token → fallthrough to refresh
      }
    }

    // 3) If no refresh token, return unauthenticated
    if (!refresh) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    // 4) Refresh the access token
    const tokens = await apiFetch<{ access: string; refresh: string }>(
      `${API_BASE}/api/auth/jwt/refresh/`,
      { method: "POST", body: { refresh } }
    );

    if (tokens.refresh) {
      await setAuthCookies(tokens.access, tokens.refresh);
    } else {
      await setAccessCookie(tokens.access);
    }

    // 5) Retry with new access
    //eslint-disable-next-line
    const user = await apiFetch<any>(`${API_BASE}/api/auth/users/me/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${tokens.access}` },
    });

    const responseData = { authenticated: true, user };
    // cachedSession = { data: responseData, expiry: now + 60_000 * 55 };

    return NextResponse.json(responseData);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json(
        { authenticated: false, message: err.message, details: err.details },
        { status: 401 }
      );
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
