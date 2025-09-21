import z from "zod";

export const eventFormSchema = z.object({
  eventName: z.string().min(2, "Event name is required"),
  budget: z.string().optional(),
  venue: z.string().optional(),
  eventType: z.string().nonempty("Select an event type"),
  description: z.string().optional(),
  startDate: z.string().nonempty("Start date required"),
  endDate: z.string().nonempty("End date required"),
  collaborators: z.array(z.string().email()).optional(),
  image: z.any().optional(),
});

export const budgetFormSchema = z.object({
  expenseName: z.string().min(2, "Task name is required"),
  assignTo: z.string().min(2, "Assignee is required"),
  estimatedCost: z.string().nonempty("Please enter the estimated cost"),
  actualCost: z.string().nonempty("Please enter the actual cost"),
  comment: z.string().optional(),
});

export const taskFormSchema = z.object({
  taskName: z.string().min(2, "Task name is required"),
  assignee: z.string().min(2, "Assignee is required"),
  dueDate: z.string().nonempty("Due date required"),
  status: z.enum(["pending", "in-progress", "completed"]),
  description: z.string().optional(),
});
