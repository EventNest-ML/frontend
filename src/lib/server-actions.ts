"use server";

import { API_BASE, ACCESS_TOKEN_COOKIE } from "./env";
import { apiFetch } from "./http";
import { cookies } from "next/headers";
import { getAccessToken as getAccessTokenServer } from "./auth-server";
import type { EventDetails, Collab, TaskFromBackend } from "@/type";
import { mapBackendEvent, mapBackendTask, uiToBackendStatus } from "./utils";

async function getAccessToken() {
  const jar = await cookies();
  const token = jar.get(ACCESS_TOKEN_COOKIE)?.value;
  return token;
}

export async function handleAuthFailure(
  message?: string
): Promise<{ shouldRedirect: boolean; message?: string }> {
  return { shouldRedirect: true, message };
}

// Existing exports updated to use getAccessTokenServer()
export async function fetchUserEvents() {
  const tokenResponse = await getAccessTokenServer();
  if ("error" in tokenResponse) return handleAuthFailure(tokenResponse.error);
  return apiFetch(`${API_BASE}/api/events/`, {
    headers: { Authorization: `Bearer ${tokenResponse.access}` },
  });
}

export async function fetchEventById(eventId: string) {
  const tokenResponse = await getAccessTokenServer();
  if ("error" in tokenResponse) return handleAuthFailure(tokenResponse.error);
  return apiFetch(`${API_BASE}/api/events/${eventId}/`, {
    headers: { Authorization: `Bearer ${tokenResponse.access}` },
  });
}

export async function acceptInvitation(eventId: string, inviteToken?: string) {
  const tokenResponse = await getAccessTokenServer();
  if ("error" in tokenResponse) return handleAuthFailure(tokenResponse.error);
  return apiFetch(`${API_BASE}/api/events/${eventId}/contributors/accept/`, {
    method: "POST",
    headers: { Authorization: `Bearer ${tokenResponse.access}` },
    body: inviteToken ? { token: inviteToken } : undefined,
  });
}

export async function declineInvitation(eventId: string, inviteToken?: string) {
  const tokenResponse = await getAccessTokenServer();
  if ("error" in tokenResponse) return handleAuthFailure(tokenResponse.error);
  return apiFetch(`${API_BASE}/api/events/${eventId}/contributors/decline/`, {
    method: "POST",
    headers: { Authorization: `Bearer ${tokenResponse.access}` },
    body: inviteToken ? { token: inviteToken } : undefined,
  });
}

// Token-only fallbacks when eventId is not provided in the link
export async function acceptInviteByToken(inviteToken: string) {
  const tokenResponse = await getAccessTokenServer();
  if ("error" in tokenResponse) return handleAuthFailure(tokenResponse.error);
  return apiFetch(`${API_BASE}/api/invites/accept/`, {
    method: "POST",
    headers: { Authorization: `Bearer ${tokenResponse.access}` },
    body: { token: inviteToken },
  });
}

export async function declineInviteByToken(inviteToken: string) {
  const tokenResponse = await getAccessTokenServer();
  if ("error" in tokenResponse) return handleAuthFailure(tokenResponse.error);
  return apiFetch(`${API_BASE}/api/invites/decline/`, {
    method: "POST",
    headers: { Authorization: `Bearer ${tokenResponse.access}` },
    body: { token: inviteToken },
  });
}

// Restore missing exports used by hooks/query.ts
export async function fetchEventCollaborator(eventId: string): Promise<Collab | { shouldRedirect: boolean; message?: string }> {
  const tokenResponse = await getAccessTokenServer();
  if ("error" in tokenResponse) return handleAuthFailure(tokenResponse.error);
  return apiFetch<Collab>(`${API_BASE}/api/events/${eventId}/contributors/`, {
    headers: { Authorization: `Bearer ${tokenResponse.access}` },
  });
}

export async function createEvent(data: {
  name: string;
  location?: string;
  type: string;
  notes?: string;
  start_date: string;
  end_date: string;
  budget_amount?: string;
}): Promise<{ id: string } | { shouldRedirect: boolean; message?: string }> {
  const tokenResponse = await getAccessTokenServer();
  if ("error" in tokenResponse) return handleAuthFailure(tokenResponse.error);
  return apiFetch<{ id: string }>(`${API_BASE}/api/events/`, {
    method: "POST",
    body: data,
    headers: { Authorization: `Bearer ${tokenResponse.access}` },
  });
}

export async function inviteCollaborator(eventId: string, email: string) {
  const tokenResponse = await getAccessTokenServer();
  if ("error" in tokenResponse) return handleAuthFailure(tokenResponse.error);
  return apiFetch(`${API_BASE}/api/events/${eventId}/invite/`, {
    method: "POST",
    body: { email },
    headers: { Authorization: `Bearer ${tokenResponse.access}` },
  });
}

export async function deleteEvent(id: string) {
  const tokenResponse = await getAccessTokenServer();
  if ("error" in tokenResponse) return handleAuthFailure(tokenResponse.error);
  return apiFetch<{ success: boolean }>(`${API_BASE}/api/events/${id}/`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${tokenResponse.access}` },
  });
}

export async function updateEvent(
  id: string,
  data: {
    name?: string;
    location?: string;
    type?: string;
    notes?: string;
    start_date?: string;
    end_date?: string;
    budget_amount?: number | string | null;
  }
) {
  const tokenResponse = await getAccessTokenServer();
  if ("error" in tokenResponse) return handleAuthFailure(tokenResponse.error);
  //eslint-disable-next-line
  const body: any = {};
  if (data.name !== undefined) body.name = data.name;
  if (data.location !== undefined) body.location = data.location;
  if (data.type !== undefined) body.type = data.type;
  if (data.notes !== undefined) body.notes = data.notes;
  if (data.start_date !== undefined) body.start_date = data.start_date;
  if (data.end_date !== undefined) body.end_date = data.end_date;
  if (data.budget_amount !== undefined) body.budget_amount = data.budget_amount;
  return apiFetch(`${API_BASE}/api/events/${id}/`, {
    method: "PUT",
    body,
    headers: { Authorization: `Bearer ${tokenResponse.access}` },
  });
}

export async function fetchTasks(eventId: string) {
  const tokenResponse = await getAccessTokenServer();
  if ("error" in tokenResponse) return handleAuthFailure(tokenResponse.error);
  const data = await apiFetch<TaskFromBackend[]>(`${API_BASE}/api/events/${eventId}/tasks/`, {
    method: "GET",
    headers: { Authorization: `Bearer ${tokenResponse.access}` },
  });
  return data.map(mapBackendTask);
}

export async function createTask(
  eventId: string,
  payload: {
    taskName: string;
    description?: string;
    assignee?: string | null;
    dueDate?: string | null; // ISO date
    status?: "pending" | "in-progress" | "completed";
  }
) {
  const tokenResponse = await getAccessTokenServer();
  if ("error" in tokenResponse) return handleAuthFailure(tokenResponse.error);
  const body = {
    title: payload.taskName,
    description: payload.description,
    assignee: 0,
    due_date: payload.dueDate ?? null,
    status: payload.status ? uiToBackendStatus(payload.status) : undefined,
  };
  const created = await apiFetch<TaskFromBackend>(`${API_BASE}/api/events/${eventId}/tasks/`, {
    method: "POST",
    body,
    headers: { Authorization: `Bearer ${tokenResponse.access}` },
  });
  return mapBackendTask(created);
}

export async function updateTask(
  taskId: number | string,
  //eslint-disable-next-line
  payload: any
) {
  const tokenResponse = await getAccessTokenServer();
  if ("error" in tokenResponse) return handleAuthFailure(tokenResponse.error);
  //eslint-disable-next-line
  const body: any = {};
  if (payload.title !== undefined) body.title = payload.title;
  if (payload.description !== undefined) body.description = payload.description;
  if (payload.assignee !== undefined) body.assignee = payload.assignee;
  if (payload.dueDate !== undefined) body.due_date = payload.dueDate;
  if (payload.status !== undefined) body.status = uiToBackendStatus(payload.status);
  const updated = await apiFetch<TaskFromBackend>(`${API_BASE}/api/tasks/${taskId}/`, {
    method: "PATCH",
    body,
    headers: { Authorization: `Bearer ${tokenResponse.access}` },
  });
  return mapBackendTask(updated);
}

export async function deleteTask(taskId: number | string) {
  const tokenResponse = await getAccessTokenServer();
  if ("error" in tokenResponse) return handleAuthFailure(tokenResponse.error);
  await apiFetch(`${API_BASE}/api/tasks/${taskId}/`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${tokenResponse.access}` },
  });
  return { ok: true };
}
