// /src/lib/auth-server.ts
"use server";

import { cookies } from "next/headers";
import { API_BASE, ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/lib/env";
import { apiFetch, ApiError } from "@/lib/http";
import { setAuthCookies, setAccessCookie } from "@/lib/auth-cookies";

type SessionData = {
  authenticated: boolean;
  //eslint-disable-next-line
  user?: any;
  message?: string;
  //eslint-disable-next-line
  details?: any;
};

// Module-level in-memory cache (per server instance)
let cachedSession: { data: SessionData; expiry: number } | null = null;

// Cache timings
const ACCESS_TTL_MS = 55 * 60 * 1000; // 55 minutes (access token is 60m)
const ERROR_TTL_MS = 60 * 1000; // 1 minute for errors/fallbacks

/**
 * getSession()
 * - Reads cookies() (server-side) and attempts:
 *   1) users/me with access
 *   2) refresh flow if access invalid
 * - Caches successful session for ACCESS_TTL_MS.
 * - Caches failure briefly for ERROR_TTL_MS.
 */
export async function getSession(): Promise<SessionData> {
  const now = Date.now();

  // Return cached if valid
  if (cachedSession && cachedSession.expiry > now) {
    return cachedSession.data;
  }

  const jar = await cookies();
  const access = jar.get(ACCESS_TOKEN_COOKIE)?.value ?? null;
  const refresh = jar.get(REFRESH_TOKEN_COOKIE)?.value ?? null;

  try {
    // 1) Try with access token
    if (access) {
      try {
        //eslint-disable-next-line
        const user = await apiFetch<any>(`${API_BASE}/api/auth/users/me/`, {
          method: "GET",
          headers: { Authorization: `Bearer ${access}` },
        });

        const responseData: SessionData = { authenticated: true, user };
        cachedSession = { data: responseData, expiry: now + ACCESS_TTL_MS };
        return responseData;
      } catch {
        // access invalid/expired -> fallthrough to refresh.
      }
    }

    // 2) If no refresh token, unauthenticated
    if (!refresh) {
      const responseData: SessionData = { authenticated: false };
      cachedSession = { data: responseData, expiry: now + ERROR_TTL_MS };
      return responseData;
    }

    // 3) Try refresh endpoint (backend returns new access [+ maybe refresh])
    const tokens = await apiFetch<{ access: string; refresh?: string }>(
      `${API_BASE}/api/auth/jwt/refresh/`,
      { method: "POST", body: { refresh } }
    );

    // 4) Persist rotated tokens as cookies for this response
    if (tokens.refresh) {
      await setAuthCookies(tokens.access, tokens.refresh);
    } else {
      await setAccessCookie(tokens.access);
    }

    // 5) Retry users/me with new access
    //eslint-disable-next-line
    const user = await apiFetch<any>(`${API_BASE}/api/auth/users/me/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${tokens.access}` },
    });

    const responseData: SessionData = { authenticated: true, user };
    cachedSession = { data: responseData, expiry: now + ACCESS_TTL_MS };
    return responseData;
  } catch (err) {
    // Save a short-lived failure result to avoid thundering
    if (err instanceof ApiError) {
      const responseData: SessionData = {
        authenticated: false,
        message: err.message,
        details: err.details,
      };
      cachedSession = { data: responseData, expiry: now + ERROR_TTL_MS };
      return responseData;
    }

    const responseData: SessionData = { authenticated: false };
    cachedSession = { data: responseData, expiry: now + ERROR_TTL_MS };
    return responseData;
  }
}

/**
 * Clear the in-memory session cache (call this on logout, profile update, etc.)
 */
export async function clearSessionCache() {
  cachedSession = null;
}
