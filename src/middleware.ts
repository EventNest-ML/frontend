import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const response = NextResponse.next();
  response.headers.set("x-url", new URL(request.url).pathname);
  return response;
}
