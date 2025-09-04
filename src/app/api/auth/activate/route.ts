import { API_BASE } from "@/lib/env";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { uid, token } = await req.json();

    const res = await fetch(`${API_BASE}/api/auth/users/activation/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid, token }),
    });

    if (res.status === 204) {
      // No content, return a success with your own body
      return NextResponse.json(
        { ok: true, message: "Account activated successfully" },
        { status: 200 }
      );
    }

    const isJson = res.headers
      .get("content-type")
      ?.includes("application/json");
    const data = isJson ? await res.json() : await res.text();

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Activation route error:", error);
    return NextResponse.json(
      { detail: "Internal server error" },
      { status: 500 }
    );
  }
}
