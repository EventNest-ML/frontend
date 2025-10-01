"use client"
import { Event, Task } from "@/type";
import { Card } from "../ui/card";
import TaskStats from "./TaskStats";
import { useTasks } from "@/hooks/query";
import { Skeleton } from "../ui/skeleton";

export default function TasksCard({ event }: { event?: Event }) {
  const { data: tasks, isLoading, isError } = useTasks(event?.id || "");
  
  if (isError) return <div>Failed to load tasks</div>;
  
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Tasks</h3>
      {isLoading ? (
        <div className="grid grid-cols-3 gap-4 text-center">
          <Skeleton className="p-5 text-center h-[180px]" />
          <Skeleton className="p-5 text-center h-[180px]" />
          <Skeleton className="p-5 text-center h-[180px]" />
        </div>
      ) : (
        <TaskStats tasks={(tasks as Task[]) ?? []} />
      )}
    </Card>
  );
}
