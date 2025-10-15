import { NextResponse } from "next/server";
import { API_BASE } from "@/lib/env";

export async function GET() {
  // Redirect the client to the backend Google OAuth login endpoint
  return NextResponse.redirect(`${API_BASE}/accounts/google/login/`, { status: 302 });
}