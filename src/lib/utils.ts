import { Task, Event } from "@/type";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getGreeting(): string {
  const now = new Date();
  const hour = now.getHours();

  if (hour < 12) {
    return "Good morning";
  } else if (hour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}
export function getCurrentDate(): string {
  const now = new Date();

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);
}

export function backendToUIStatus(s?: string) {
  if (!s) return "pending";
  const up = s.toUpperCase();
  if (
    up.includes("IN_PROGRESS") ||
    up.includes("IN-PROGRESS") ||
    up.includes("INPROGRESS")
  )
    return "in-progress";
  if (up.includes("COMPLETED") || up.includes("DONE")) return "completed";
  if (up.includes("TODO") || up.includes("PENDING")) return "pending";
  return s.toLowerCase();
}

export function uiToBackendStatus(ui: string) {
  if (ui === "pending") return "TODO";
  if (ui === "in-progress") return "IN_PROGRESS";
  if (ui === "completed") return "DONE";
  return ui;
}

//eslint-disable-next-line
export function mapBackendTask(b: any) {
  return {
    id: b.id,
    eventName: b.event_name,
    title: b.title,
    description: b.description ?? null,
    assignee: b.assignee ?? null,
    createdBy: b.created_by ?? null,
    dueDate: b.due_date ?? null,
    status: backendToUIStatus(b.status),
    createdAt: b.created_at ?? null,
    updatedAt: b.updated_at ?? null,
  };
}

export function isAuthFailure(
  //eslint-disable-next-line
  res: any
): res is { shouldRedirect: boolean; message?: string } {
  return res && typeof res === "object" && "shouldRedirect" in res;
}

//eslint-disable-next-line
export function mapBackendEvent(b: any): Event {
  return {
    id: b.id,
    name: b.name,
    // Prefer start_date, fallback to legacy date, then end_date
    date: b.start_date ?? b.date ?? b.end_date ?? "",
    start_date: b.start_date ?? undefined,
    end_date: b.end_date ?? undefined,
    budget_amount:
      typeof b.budget_amount === "string"
        ? Number(b.budget_amount)
        : b.budget_amount ?? undefined,
    location: b.location ?? "",
    notes: b.notes ?? "",
    collaborators: Array.isArray(b.collaborators) ? b.collaborators : [],
  };
}