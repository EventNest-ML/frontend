"use server";

import {
  setAccessCookie,
  setAuthCookies
} from "@/lib/auth-cookies";
import { ACCESS_TOKEN_COOKIE, API_BASE, REFRESH_TOKEN_COOKIE } from "@/lib/env";
import { ApiError, apiFetch } from "@/lib/http";
import type { User } from "@/types/user";
import { cookies, headers } from "next/headers";

type SessionData = {
  authenticated: boolean;
  user?: User;
  message?: string;
  //eslint-disable-next-line
  details?: any;
};

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

  // Return cached if still valid
  if (cachedSession && cachedSession.expiry > now) {
    return cachedSession.data;
  }

  const jar = await cookies();
  const access = jar.get(ACCESS_TOKEN_COOKIE)?.value ?? null;
  const refresh = jar.get(REFRESH_TOKEN_COOKIE)?.value ?? null;

  try {
    // 1) Try with access token if available
    if (access) {
      try {
        const user = await apiFetch<User>(`${API_BASE}/api/auth/users/me/`, {
          method: "GET",
          headers: { Authorization: `Bearer ${access}` },
        });

        const responseData: SessionData = { authenticated: true, user };
        cachedSession = { data: responseData, expiry: now + REFRESH_TTL_MS };
        return responseData;
      } catch {
        // access invalid → fallthrough to refresh
      }
    }

    // 2) No refresh token = unauthenticated
    if (!refresh) {
      const responseData: SessionData = { authenticated: false };
      cachedSession = { data: responseData, expiry: now + 5 * 1000 }; // short error cache
      return responseData;
    }

    // 3) Refresh flow
    const tokens = await apiFetch<{ access: string; refresh?: string }>(
      `${API_BASE}/api/auth/jwt/refresh/`,
      { method: "POST", body: { refresh } }
    );
    console.log(tokens);

    // Save new cookies
    if (tokens.refresh) {
      await setAuthCookies(tokens.access, tokens.refresh);
    } else {
      await setAccessCookie(tokens.access);
    }

    // 4) Retry with new access
    const user = await apiFetch<User>(`${API_BASE}/api/auth/users/me/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${tokens.access}` },
    });

    const responseData: SessionData = { authenticated: true, user };
    cachedSession = { data: responseData, expiry: now + REFRESH_TTL_MS };
    return responseData;
  } catch (err) {
    if (err instanceof ApiError) {
      // If refresh token is invalid/blacklisted → force logout
      if (
        err.details &&
        typeof err.details === "object" &&
        "code" in err.details &&
        (err.details as { code?: string }).code === "token_not_valid"
      ) {
        await clearSessionCache();
        const origin =
          (await headers()).get("origin") ?? process.env.NEXT_PUBLIC_APP_URL!;
        await fetch(`${origin}/api/auth/logout`, {
          method: "POST",
          cache: "no-store",
        });
        return {
          authenticated: false,
          message: "Session expired, please log in again.",
        };
      }

      return {
        authenticated: false,
        message: err.message,
        details: err.details,
      };
    }

    return { authenticated: false };
  }
}

/**
 * Clear the in-memory session cache (on logout, etc.)
 */
export async function clearSessionCache() {
  cachedSession = null;
}
