import { NextResponse } from "next/server";
import { API_BASE } from "@/lib/env";
import { apiFetch, ApiError } from "@/lib/http";

type RegisterPayload = {
  email: string;
  password: string;
  re_password?: string;
  username?: string;
  firstname?: string;
  lastname?: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const payload: RegisterPayload = {
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      password: body.password,
      re_password: body.confirmPassword,
    };
//eslint-disable-next-line
    const resp = await apiFetch<any>(`${API_BASE}/api/auth/users/`, {
      method: "POST",
      body: payload,
    });

    return NextResponse.json({ ok: true, data: resp }, { status: 201 });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json(
        { ok: false, message: err.message, details: err.details },
        { status: err.status }
      );
    }
    return NextResponse.json(
      { ok: false, message: "Unexpected error" },
      { status: 500 }
    );
  }
}
