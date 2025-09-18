import TaskDashboard from "@/components/custom-ui/TaskDashboard";
import TaskDialog from "@/components/custom-ui/TaskFormDialog";
import TaskStats from "@/components/custom-ui/TaskStats";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { demoEvents } from "@/lib/data";
import { Plus } from "lucide-react";

export default async function TasksPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const event = demoEvents.find((e) => e.eventId === id);

  if (!event) {
    return (
      <Card className="w-full mt-10">
        <CardHeader>
          <CardTitle>Event not found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            We couldn’t find an event with ID{" "}
            <span className="font-mono">{id}</span>.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="gap-0 flex-row justify-between items-center">
        <CardHeader className="w-full">
          <CardTitle>Tasks</CardTitle>
          <CardDescription>Assign, track and complete tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <TaskDialog title="Create New Task">
            <Button className="bg-[#B558FA] hover:bg-[#B558FA]/80">
              Add new <Plus />
            </Button>
          </TaskDialog>
        </CardContent>
      </Card>

      <TaskStats event={event} />

      <TaskDashboard tasks={event.tasks} />
    </div>
  );
}
