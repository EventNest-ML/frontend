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

    console.log(res)
    // Try parsing JSON, fallback to text
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
