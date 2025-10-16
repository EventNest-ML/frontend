import { NextResponse } from "next/server";
import { API_BASE } from "@/lib/env";
import { apiFetch, ApiError } from "@/lib/http";
import { getAccessToken } from "@/lib/auth-server";

type CreateEventPayload = {
  name: string;
  location?: string;
  type: string;
  notes?: string;
  start_date: string; // ISO
  end_date: string; // ISO
  budget_amount?: string;
  collaborators?: string[]; // emails
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CreateEventPayload;

    // Basic validation
    if (!body?.name || !body?.start_date || !body?.end_date || !body?.type) {
      return NextResponse.json(
        { ok: false, message: "Missing required fields: name, type, start_date, end_date" },
        { status: 400 }
      );
    }

    // Get access token from cookies (server-side)
    const tokenResp = await getAccessToken();
    if ("error" in tokenResp) {
      return NextResponse.json(
        { ok: false, message: tokenResp.error },
        { status: 401 }
      );
    }

    // Create the event on the backend
    const created = await apiFetch<{ id: string }>(`${API_BASE}/api/events/`, {
      method: "POST",
      body: {
        name: body.name,
        location: body.location,
        type: body.type,
        notes: body.notes,
        start_date: body.start_date,
        end_date: body.end_date,
        budget_amount: body.budget_amount,
      },
      headers: { Authorization: `Bearer ${tokenResp.access}` },
    });

    // Optionally invite collaborators
    let invited = 0;
    const inviteErrors: Array<{ email: string; message: string; status?: number }> = [];
    if (Array.isArray(body.collaborators) && body.collaborators.length > 0) {
      const invites = await Promise.allSettled(
        body.collaborators.map((email) =>
          apiFetch(`${API_BASE}/api/events/${created.id}/invite/`, {
            method: "POST",
            body: { email },
            headers: { Authorization: `Bearer ${tokenResp.access}` },
          })
        )
      );

      for (let i = 0; i < invites.length; i++) {
        const res = invites[i];
        const email = body.collaborators[i];
        if (res.status === "fulfilled") invited++;
        else {
          const reason = res.reason as unknown;
          if (reason instanceof ApiError) {
            inviteErrors.push({ email, message: reason.message, status: reason.status });
          } else {
            inviteErrors.push({ email, message: "Failed to invite collaborator" });
          }
        }
      }
    }

    return NextResponse.json({ ok: true, id: created.id, invited, inviteErrors }, { status: 201 });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json(
        { ok: false, message: err.message, details: err.details },
        { status: err.status }
      );
    }
    return NextResponse.json({ ok: false, message: "Unexpected error" }, { status: 500 });
  }
}