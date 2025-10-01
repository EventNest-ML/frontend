"use client";

import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createEvent,
  createTask,
  deleteEvent,
  deleteTask,
  fetchEventCollaborator,
  fetchTasks,
  fetchUserEvents,
  inviteCollaborator,
  updateEvent,
  updateTask,
} from "@/lib/server-actions";

function isAuthFailure(
  //eslint-disable-next-line
  res: any
): res is { shouldRedirect: boolean; message?: string } {
  return res && typeof res === "object" && "shouldRedirect" in res;
}

export function useUserEvents() {
  const router = useRouter();

  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await fetchUserEvents();

      if (isAuthFailure(res) && res.shouldRedirect) {
        await fetch("/api/auth/logout", { method: "POST" });
        router.replace("/signin");
        throw new Error(res.message || "Session expired");
      }

      return res;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      date: string;
      location?: string;
      notes?: string;
    }) => {
      const res = await createEvent(data);

      if (isAuthFailure(res) && res.shouldRedirect) {
        await fetch("/api/auth/logout", { method: "POST" });
        router.replace("/signin");
        throw new Error(res.message || "Session expired");
      }

      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}

export function useCreateEventWithInvites() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: {
      name: string;
      date: string;
      location?: string;
      notes?: string;
      collaborators: string[];
    }) => {
      // Step 1: create event
      const event = await createEvent({
        name: payload.name,
        date: payload.date,
        location: payload.location,
        notes: payload.notes,
      });

      if (isAuthFailure(event) && event.shouldRedirect) {
        await fetch("/api/auth/logout", { method: "POST" });
        router.replace("/signin");
        throw new Error(event.message || "Session expired");
      }

      // Step 2: invite collaborators
      if (payload.collaborators?.length) {
        await Promise.all(
          payload.collaborators.map((email) =>
            inviteCollaborator((event as { id: string }).id, email)
          )
        );
      }

      return event;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}

export function useEventCollaborators(eventId: string) {
  const router = useRouter();

  return useQuery({
    queryKey: ["event-collaborators", eventId],
    enabled: Boolean(eventId),
    queryFn: async () => {
      const res = await fetchEventCollaborator(eventId);

      if (isAuthFailure(res) && res.shouldRedirect) {
        await fetch("/api/auth/logout", { method: "POST" });
        router.replace("/signin");
        throw new Error(res.message || "Session expired");
      }

      return res;
    },
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteEvent(id),

    onSuccess: () => {
      // Refetch events after a delete
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      ...payload
    }: {
      id: string;
      name: string;
      date: string;
      location?: string;
      notes?: string;
    }) => updateEvent(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}


export function useTasks(eventId: string) {
  return useQuery({
    queryKey: ["tasks", eventId],
    queryFn: async () => {
      const res = await fetchTasks(eventId);
      if (isAuthFailure(res) && res.shouldRedirect) {
        if (typeof window !== "undefined") {
          window.location.href = "/signup";
        }
        throw new Error(res.message ?? "Session expired");
      }
      return res;
    },
    enabled: Boolean(eventId),
    staleTime: 1000 * 60 * 1,
  });
}

export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      eventId,
      payload,
    }: {
      eventId: string;
      payload: {
        taskName: string;
        description?: string;
        assignee?: string | null;
        dueDate?: string | null; // ISO date
        status?: "pending" | "in-progress" | "completed";
      };
    }) => {
      const res = await createTask(eventId, payload);
      if (isAuthFailure(res) && res.shouldRedirect) {
        if (typeof window !== "undefined") window.location.href = "/signup";
        throw new Error(res.message ?? "Session expired");
      }
      return res;
    },
    //eslint-disable-next-line
    onSuccess: (_data, vars: any) => {
      qc.invalidateQueries({ queryKey: ["tasks", vars.eventId] });
    },
  });
}

export function useUpdateTask() {
  const qc = useQueryClient();
  return useMutation({
    //eslint-disable-next-line
    mutationFn: async ({ taskId, payload, eventId }: { taskId: number | string; payload: any; eventId?: string }) => {
      const res = await updateTask(taskId, payload);
      if (isAuthFailure(res) && res.shouldRedirect) {
        if (typeof window !== "undefined") window.location.href = "/signup";
        throw new Error(res.message ?? "Session expired");
      }
      return res;
    },
    //eslint-disable-next-line
    onSuccess: (_data, vars: any) => {
      if (vars.eventId) qc.invalidateQueries({ queryKey: ["tasks", vars.eventId] });
      qc.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useDeleteTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ taskId }: { taskId: number | string; eventId?: string }) => {
      const res = await deleteTask(taskId);
      if (isAuthFailure(res) && res.shouldRedirect) {
        if (typeof window !== "undefined") window.location.href = "/signup";
        throw new Error(res.message ?? "Session expired");
      }
      return res;
    },
    //eslint-disable-next-line
    onSuccess: (_data, vars: any) => {
      if (vars.eventId) qc.invalidateQueries({ queryKey: ["tasks", vars.eventId] });
      qc.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}