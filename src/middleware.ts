import { REFRESH_TOKEN_COOKIE } from "@/lib/env";
import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PREFIXES = ["/dashboard", "/account"];
const AUTH_PAGES = ["/signin", "/signup"];

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  const hasRefresh = req.cookies.has(REFRESH_TOKEN_COOKIE);

  // Sanitize invite links that include encoded JSON in query
  if (pathname.startsWith("/invites")) {
    const search = url.search || "";
    // Case 1: Encoded JSON payload, e.g. ?%7B"token":"..."%7D
    if (search.startsWith("?%7B") || search.startsWith("?{")) {
      try {
        const raw = decodeURIComponent(search.slice(1)); // drop leading ?
        const payload = JSON.parse(raw);
        const token = typeof payload?.token === "string" ? payload.token : undefined;

        const dest = req.nextUrl.clone();
        dest.pathname = "/invite";
        dest.search = ""; // remove sensitive data from URL

        const res = NextResponse.redirect(dest);
        if (token) {
          res.cookies.set("invite_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: 10 * 60, // 10 minutes
          });
        }
        return res;
      } catch {
        const dest = req.nextUrl.clone();
        dest.pathname = "/invite";
        dest.search = "";
        return NextResponse.redirect(dest);
      }
    }

    // Case 2: Proper query param, e.g. /invites?token=...
    const tokenParam = url.searchParams.get("token");
    if (tokenParam) {
      const dest = req.nextUrl.clone();
      dest.pathname = "/invite";
      dest.search = "";
      const res = NextResponse.redirect(dest);
      res.cookies.set("invite_token", tokenParam, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 10 * 60,
      });
      return res;
    }
  }

  // 1) Redirect unauthenticated users away from protected pages
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (isProtected && !hasRefresh) {
    url.pathname = "/signin";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // 2) Redirect authenticated users away from signin/signup
  const isAuthPage = AUTH_PAGES.some((p) => pathname.startsWith(p));
  if (isAuthPage && hasRefresh) {
    url.pathname = "/dashboard/home";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
