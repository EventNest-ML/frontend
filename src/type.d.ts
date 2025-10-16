export type SessionData = {
  authenticated: boolean;
  user?: User;
  message?: string;
  //eslint-disable-next-line
  details?: any;
};
export interface Collaborator {
  id: string;
  fullname: string;
  email: string;
  role: string;
  joined_at: string;
}

export interface Collab {
  collaborators: Collaborator[];
  counts: {
    total_members: number;
    active_members: number;
    pending_members: number;
  };
}

export interface Event {
  id: string;
  name: string;
  date: string;
  start_date?: string;
  end_date?: string;
  budget_amount?: number | null;
  location?: string;
  notes?: string;
  collaborators: Collaborator[];
}

export interface EventDetails {
  events: Event[];
  counts: {
    total: number;
    ongoing: number;
    completed: number;
    archived: number;
  };
}

export interface TaskFromBackend {
  id: number;
  event_name: string;
  title: string;
  description?: string;
  assignee: number;
  created_by?: number;
  due_date?: string | null;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  created_at?: string;
  updated_at?: string;
}

export interface Task {
  id: number;
  eventName: string;
  description?: string;
  assignee: number;
  createdBy?: number;
  dueDate?: string | null;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  createdAt?: string;
  updatedAt?: string;
}
