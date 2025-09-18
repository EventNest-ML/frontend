// components/TasksCard.tsx
import { Event } from "@/lib/data";
import { Card } from "../ui/card";
import TaskStats from "./TaskStats";

export default function TasksCard({ event }: { event: Event }) {

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Tasks</h3>
      <TaskStats event={event}/>
    </Card>
  );
}
