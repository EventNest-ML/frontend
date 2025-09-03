"use server";

import { apiFetch } from "@/lib/http";

/**
 * Server-side helper for getting the session.
 * Calls our Next.js session API route so we don't duplicate logic.
 */
export async function getSession() {
  try {
    const session = await apiFetch<{ authenticated: boolean; user?: any }>(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/session`,
      { method: "GET" }
    );
    return session;
  } catch {
    return { authenticated: false };
  }
}
