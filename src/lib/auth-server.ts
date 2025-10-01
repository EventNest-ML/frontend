"use server";

import { setAccessCookie, setAuthCookies } from "@/lib/auth-cookies";
import { ACCESS_TOKEN_COOKIE, API_BASE, REFRESH_TOKEN_COOKIE } from "@/lib/env";
import { ApiError, apiFetch } from "@/lib/http";
import { SessionData } from "@/type";
import type { User } from "@/types/user";
import { cookies } from "next/headers";


// Module-level in-memory cache (per server instance)
let cachedSession: { data: SessionData; expiry: number } | null = null;

// Cache timing → align with refresh token validity (i.e. 7 days)
const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * getSession()
 * - Reads cookies() (server-side) and attempts:
 *   1) users/me with access token
 *   2) refresh flow if access is invalid/expired
 * - Caches session for REFRESH_TTL_MS (since refresh token is the source of truth).
 */


export async function getSession(): Promise<SessionData> {
  const now = Date.now();

  if (cachedSession && cachedSession.expiry > now) {
    return cachedSession.data;
  }

  const tokenResponse = await getAccessToken();

  if ("error" in tokenResponse) {
    const responseData: SessionData = {
      authenticated: false,
      message: tokenResponse.error,
    };
    cachedSession = { data: responseData, expiry: now + 5 * 1000 };
    return responseData;
  }

  try {
    const user = await apiFetch<User>(`${API_BASE}/api/auth/users/me/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${tokenResponse.access}` },
    });

    const responseData: SessionData = { authenticated: true, user };
    cachedSession = { data: responseData, expiry: now + REFRESH_TTL_MS };
    return responseData;
  } catch {
    return { authenticated: false, message: "Unable to fetch user profile." };
  }
}

/**
 * Clear the in-memory session cache (on logout, etc.)
 */
export async function clearSessionCache() {
  cachedSession = null;
}


export async function getAccessToken(): Promise<
  { access: string } | { error: string }
> {
  const jar = await cookies();
  const access = jar.get(ACCESS_TOKEN_COOKIE)?.value ?? null;
  const refresh = jar.get(REFRESH_TOKEN_COOKIE)?.value ?? null;

  // 1) If we still have access token, return it
  if (access) {
    return { access };
  }

  // 2) If there’s no refresh token → user not logged in
  if (!refresh) {
    return { error: "No active session. Please log in." };
  }

  // 3) Attempt refresh flow
  try {
    const tokens = await apiFetch<{ access: string; refresh?: string }>(
      `${API_BASE}/api/auth/jwt/refresh/`,
      { method: "POST", body: { refresh } }
    );

    if (tokens.refresh) {
      await setAuthCookies(tokens.access, tokens.refresh);
    } else {
      await setAccessCookie(tokens.access);
    }

    return { access: tokens.access };
  } catch (err) {
    if (
      err instanceof ApiError &&
      err.details &&
      typeof err.details === "object" &&
      "code" in err.details &&
      (err.details as { code?: string }).code === "token_not_valid"
    ) {
      return { error: "Session expired, please log in again." };
    }
    return { error: "Unable to refresh session. Please try again." };
  }
}