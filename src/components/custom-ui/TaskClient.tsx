"use client";

import React from "react";
import TaskDialog from "./TaskFormDialog";
import TaskStats from "./TaskStats";
import TaskDashboard from "./TaskDashboard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import Loading from "@/app/loading";
import { useCreateTask, useTasks } from "@/hooks/query";
import { Task } from "@/type";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";

export default function TasksClient({ eventId }: { eventId: string }) {
  const { data: tasks, isLoading, isError } = useTasks(eventId);
  const createMutation = useCreateTask();

  if (isError) return <div>Failed to load tasks</div>;

  return (
    <div className="space-y-6">
      <Card className="gap-0 flex-row justify-between items-center">
        <CardHeader className="w-full">
          <CardTitle>Tasks</CardTitle>
          <CardDescription>Assign, track and complete tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <TaskDialog
            title="Create New Task"
            onSubmit={(payload) => {
              createMutation.mutate(
                { eventId, payload },
                {
                  onSuccess: () => {
                    toast.success("Task created successfully 🎉", {
                      className: "!bg-green-600 !text-white",
                    });
                  },
                  onError: (err) => {
                    if (!err) {
                      toast.error(
                        "Your session has expired. Please log in again.",
                        {
                          className: "!bg-red-600 !text-white",
                        }
                      );
                    } else {
                      toast.error(
                        err instanceof Error
                          ? err.message
                          : "Something went wrong.",
                        { className: "!bg-red-600 !text-white" }
                      );
                    }
                  },
                }
              );
            }}
          >
            <Button className="bg-[#B558FA] hover:bg-[#B558FA]/80">
              Add new <Plus />
            </Button>
          </TaskDialog>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="grid grid-cols-3 gap-4 text-center">
          <Skeleton className="p-5 text-center h-[180px]" />
          <Skeleton className="p-5 text-center h-[180px]" />
          <Skeleton className="p-5 text-center h-[180px]" />
        </div>
      ) : (
        <TaskStats tasks={(tasks as Task[]) ?? []} />
      )}

      {isLoading ? (
        <Skeleton className="h-dvh w-full" />
      ) : (
        <TaskDashboard
          tasks={tasks as Task[]}
          eventId={eventId}
        />
      )}
    </div>
  );
}
