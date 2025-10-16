"use server";
import { API_BASE } from "@/lib/env";
import { apiFetch } from "@/lib/http";
import { getAccessToken } from "./auth-server";
import type { EventDetails, Collaborator, Collab, TaskFromBackend } from "@/type";
import { mapBackendTask, uiToBackendStatus, mapBackendEvent } from "./utils";

// Types for events API response to avoid `any`
type BackendEventRaw = {
  id: string;
  name: string;
  start_date?: string | null;
  end_date?: string | null;
  date?: string | null;
  budget_amount?: number | string | null;
  location?: string | null;
  notes?: string | null;
  collaborators?: Collaborator[] | null;
};

type FetchEventsResponse = {
  events?: BackendEventRaw[];
  counts?: {
    total: number;
    ongoing: number;
    completed: number;
    archived: number;
  };
};

export async function handleAuthFailure(
  message?: string
): Promise<{ shouldRedirect: boolean; message?: string }> {
  const origin = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  await fetch(`${origin}/api/auth/logout`, { method: "POST" });
  console.warn(message ?? "Session invalid or expired.");

  return { shouldRedirect: true, message };
}

export async function fetchUserEvents(): Promise<
  EventDetails | { shouldRedirect: boolean; message?: string }
> {
  const tokenResponse = await getAccessToken();
  if ("error" in tokenResponse) {
    return handleAuthFailure(tokenResponse.error);
  }

  const raw = await apiFetch<FetchEventsResponse>(`${API_BASE}/api/events/`, {
    headers: { Authorization: `Bearer ${tokenResponse.access}` },
  });

  const events = Array.isArray(raw?.events)
    ? raw.events.map(mapBackendEvent)
    : [];

  const counts = raw?.counts ?? {
    total: events.length,
    ongoing: 0,
    completed: 0,
    archived: 0,
  };

  return { events, counts } as EventDetails;
}

export async function fetchEventCollaborator(
  eventId: string
): Promise<Collab | { shouldRedirect: boolean; message?: string }> {
  const tokenResponse = await getAccessToken();
  if ("error" in tokenResponse) {
    return handleAuthFailure(tokenResponse.error);
  }

  return apiFetch<Collab>(
    `${API_BASE}/api/events/${eventId}/contributors/`,
    {
      headers: { Authorization: `Bearer ${tokenResponse.access}` },
    }
  );
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
  const tokenResponse = await getAccessToken();
  if ("error" in tokenResponse) return handleAuthFailure(tokenResponse.error);

  return apiFetch<{ id: string }>(`${API_BASE}/api/events/`, {
    method: "POST",
    body: data,
    headers: { Authorization: `Bearer ${tokenResponse.access}` },
  });
}

export async function inviteCollaborator(
  eventId: string,
  email: string
): Promise<unknown | { shouldRedirect: boolean; message?: string }> {
  const tokenResponse = await getAccessToken();
  if ("error" in tokenResponse) return handleAuthFailure(tokenResponse.error);

  return apiFetch(`${API_BASE}/api/events/${eventId}/invite/`, {
    method: "POST",
    body: { email },
    headers: { Authorization: `Bearer ${tokenResponse.access}` },
  });
}

export async function deleteEvent(id: string) {
  const tokenResponse = await getAccessToken();

  if ("error" in tokenResponse) {
    return handleAuthFailure(tokenResponse.error);
  }

  return apiFetch<{ success: boolean }>(`${API_BASE}/api/events/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${tokenResponse.access}`,
    },
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
  const tokenResponse = await getAccessToken();
  if ("error" in tokenResponse) return handleAuthFailure(tokenResponse.error);

  // Only include provided fields in the update body
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
  const tokenResp = await getAccessToken();
  if ("error" in tokenResp) return handleAuthFailure(tokenResp.error);

  const data = await apiFetch<TaskFromBackend[]>(
    `${API_BASE}/api/events/${eventId}/tasks/`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${tokenResp.access}` },
    }
  );

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
  const tokenResp = await getAccessToken();
  if ("error" in tokenResp) return handleAuthFailure(tokenResp.error);

  const body = {
    title: payload.taskName,
    description: payload.description,
    assignee: 0,
    due_date: payload.dueDate ?? null,
    status: payload.status ? uiToBackendStatus(payload.status) : undefined,
  };

  const created = await apiFetch<TaskFromBackend>(
    `${API_BASE}/api/events/${eventId}/tasks/`,
    {
      method: "POST",
      body,
      headers: { Authorization: `Bearer ${tokenResp.access}` },
    }
  );

  return mapBackendTask(created);
}

export async function updateTask(
  taskId: number | string,
  payload: {
    title?: string;
    description?: string;
    assignee?: number | null;
    dueDate?: string | null;
    status?: "pending" | "in-progress" | "completed";
  }
) {
  const tokenResp = await getAccessToken();
  if ("error" in tokenResp) return handleAuthFailure(tokenResp.error);

  //eslint-disable-next-line
  const body: any = {};
  if (payload.title !== undefined) body.title = payload.title;
  if (payload.description !== undefined) body.description = payload.description;
  if (payload.assignee !== undefined) body.assignee = payload.assignee;
  if (payload.dueDate !== undefined) body.due_date = payload.dueDate;
  if (payload.status !== undefined)
    body.status = uiToBackendStatus(payload.status);

  const updated = await apiFetch<TaskFromBackend>(`${API_BASE}/api/tasks/${taskId}/`, {
    method: "PATCH",
    body,
    headers: { Authorization: `Bearer ${tokenResp.access}` },
  });

  return mapBackendTask(updated);
}

export async function deleteTask(taskId: number | string) {
  const tokenResp = await getAccessToken();
  if ("error" in tokenResp) return handleAuthFailure(tokenResp.error);

  await apiFetch(`${API_BASE}/api/tasks/${taskId}/`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${tokenResp.access}` },
  });

  return { ok: true };
}
