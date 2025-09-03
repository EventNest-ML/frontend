import { API_BASE } from "@/lib/env";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { uid } = await req.json();

    const res = await fetch(`${API_BASE}/api/auth/users/resend_activation/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid }),
    });

    console.log(res)

    const isJson = res.headers
      .get("content-type")
      ?.includes("application/json");
    const data = isJson ? await res.json() : await res.text();

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Resend activation route error:", error);
    return NextResponse.json(
      { detail: "Internal server error" },
      { status: 500 }
    );
  }
}
