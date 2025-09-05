import { cookies } from "next/headers";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_TOKEN_MAX_AGE,
  IS_PROD,
} from "./env";
import { clearSessionCache } from "./auth-server";

export async function setAuthCookies(access: string, refresh: string) {
  const jar = await cookies(); // works here in a request context
  jar.set(ACCESS_TOKEN_COOKIE, access, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "lax",
    path: "/",
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });
  jar.set(REFRESH_TOKEN_COOKIE, refresh, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "lax",
    path: "/",
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });

  clearSessionCache();
}

export async function setAccessCookie(access: string) {
  const jar = await cookies();
  jar.set(ACCESS_TOKEN_COOKIE, access, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "lax",
    path: "/",
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });
  clearSessionCache();
}

export async function clearAuthCookies() {
  const jar = await cookies();
  jar.delete(ACCESS_TOKEN_COOKIE);
  jar.delete(REFRESH_TOKEN_COOKIE);

  clearSessionCache();
}

export async function getTokensFromCookies(store = cookies()) {
  const access = (await store).get(ACCESS_TOKEN_COOKIE)?.value || null;
  const refresh = (await store).get(REFRESH_TOKEN_COOKIE)?.value || null;
  return { access, refresh };
}
