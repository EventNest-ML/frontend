import { NextResponse } from "next/server";
import { API_BASE } from "@/lib/env";
import { apiFetch, ApiError } from "@/lib/http";

type ForgotPayload = { email: string };
type ForgotResponse = { message?: string } & Record<string, unknown>;

export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) as ForgotPayload;

    const data = await apiFetch<ForgotResponse>(
      `${API_BASE}/api/auth/users/reset_password/`,
      {
        method: "POST",
        body: { email },
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
      { message: "Unexpected error while requesting reset email." },
      { status: 500 }
    );
  }
}
