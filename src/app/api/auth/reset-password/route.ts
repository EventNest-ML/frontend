import { NextResponse } from "next/server";
import { API_BASE } from "@/lib/env";
import { apiFetch, ApiError } from "@/lib/http";

type ResetPayload = { uid: string; token: string; new_password: string };
type ResetResponse = { message?: string } & Record<string, unknown>;

export async function POST(req: Request) {
  try {
    const { uid, token, new_password } = (await req.json()) as ResetPayload;

    const data = await apiFetch<ResetResponse>(
      `${API_BASE}/api/auth/users/reset_password_confirm/`,
      {
        method: "POST",
        body: { uid, token, new_password },
      }
    );
    
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json(
        { message: err.message, details: err.details },
        { status: err.status }
      );
    }
    return NextResponse.json(
      { message: "Unexpected error while resetting password." },
      { status: 500 }
    );
  }
}
