"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Calendar, MessageCircle, Plus } from "lucide-react";
import { Button } from "../ui/button";
import TaskDialog from "./TaskFormDialog";
import { CommentSectionSheet } from "./CommentSection";
import { Badge } from "../ui/badge";

import { useUpdateTask, useDeleteTask, useCreateTask } from "@/hooks/query";
import { Task } from "@/type";
import { toast } from "sonner";

type TaskDashboardProps = {
  tasks: Task[];
  eventId: string;
};

export default function TaskDashboard({ tasks, eventId }: TaskDashboardProps) {
  const createMutation = useCreateTask();

  const grouped = {
    pending: tasks.filter((t) => t.status.toLowerCase() === "todo"),
    "in-progress": tasks.filter(
      (t) => t.status.toLowerCase() === "in-progress"
    ),
    completed: tasks.filter((t) => t.status.toLowerCase() === "done"),
  };

  const allTasks = tasks;
  const myTasks = [
    ...grouped.pending,
    ...grouped["in-progress"],
    ...grouped.completed,
  ];

  const updateMutation = useUpdateTask();
  const deleteMutation = useDeleteTask();

  const getPriorityColor = (status: string) => {
    if (status === "pending") return "bg-red-500";
    if (status === "in-progress") return "bg-[#9647FF]";
    if (status === "completed") return "bg-green-500";
    return "bg-gray-300";
  };

  const renderTaskList = (list: Task[], emptyMsg: string) => (
    <ScrollArea className="h-dvh md:px-5">
      {list.length > 0 ? (
        <div className="space-y-2">
          {list.map((task) => (
            <Card
              key={task.id}
              className="flex-row items-center justify-between rounded-md bg-transparent"
            >
              <CardHeader className="flex-1 flex flex-row gap-3 items-center">
                <div
                  className={`size-[24px] rounded-full ${getPriorityColor(
                    task.status
                  )}`}
                />
                <div className="space-y-[6px]">
                  <CardTitle className="font-medium tracking-wider">
                    {task.eventName}
                  </CardTitle>
                  <CardDescription>
                    Due: {task.dueDate || "No date"}
                  </CardDescription>
                  <div className="flex gap-4">
                    <div className="flex gap-3 items-center justify-center">
                      <Avatar className="rounded-lg size-[30px]">
                        <AvatarFallback className="text-[12px]">
                          ER
                        </AvatarFallback>
                      </Avatar>
                      <CardDescription>Erin Robinson</CardDescription>
                    </div>
                    <div className="flex gap-3 items-center justify-center">
                      <Calendar
                        size={20}
                        className="text-black/40"
                      />
                      <CardDescription>
                        {task.dueDate || "No date"}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2 items-center justify-center">
                      <MessageCircle
                        size={20}
                        className="text-black/40"
                      />
                      <CardDescription>0</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <div className="flex items-center gap-2">
                {task.status.toLowerCase() !== "done" ? (
                  <CardContent className="flex items-center gap-3">
                    <TaskDialog
                      title="Edit Task"
                      defaultValues={{
                        taskName: task.eventName,
                        assignee: String(task.assignee ?? ""),
                        dueDate: task.dueDate ?? "",
                        status:
                          task.status === "TODO"
                            ? "pending"
                            : task.status === "IN_PROGRESS"
                            ? "in-progress"
                            : task.status === "COMPLETED"
                            ? "completed"
                            : undefined,
                        description: task.description ?? "",
                      }}
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent border-[#8A3BEF]"
                      >
                        Edit
                      </Button>
                    </TaskDialog>

                    <CommentSectionSheet task={task}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent border-[#8A3BEF]"
                      >
                        Comment
                      </Button>
                    </CommentSectionSheet>

                    <Button
                      size="sm"
                      onClick={() =>
                        updateMutation.mutate({
                          taskId: task.id,
                          payload: { status: "completed" },
                          eventId,
                        })
                      }
                      className="bg-[#b357fa6d] hover:bg-[#b357fa6d]/80 text-black border border-[#B558FA]"
                    >
                      {updateMutation.isPending ? "..." : "Mark as complete"}
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() =>
                        deleteMutation.mutate({ taskId: task.id, eventId })
                      }
                    >
                      Delete
                    </Button>
                  </CardContent>
                ) : (
                  <CardContent className="flex items-center gap-3">
                    <Badge className="border-[#B558FA] text-[#B558FA] p-4 py-2 bg-transparent rounded-md">
                      Completed
                    </Badge>
                  </CardContent>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-[40px] text-muted-foreground">{emptyMsg}</p>
      )}
    </ScrollArea>
  );

  return (
    <Card className="w-full h-full">
      <CardContent>
        {tasks.length > 0 ? (
          <Tabs
            defaultValue="All"
            className="w-full"
          >
            <TabsList className="flex w-full gap-3 bg-transparent">
              <TabsTrigger
                value="All"
                className="bg-transparent border border-[#8A3BEF] p-4 py-5 font-semibold data-[state=active]:bg-[#B457FA4D]"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="my-tasks"
                className="bg-transparent border border-[#8A3BEF] p-4 py-5 font-semibold data-[state=active]:bg-[#B457FA4D]"
              >
                My tasks
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="bg-transparent border border-[#8A3BEF] p-4 py-5 font-semibold data-[state=active]:bg-[#B457FA4D]"
              >
                ToDo
              </TabsTrigger>
              <TabsTrigger
                value="in-progress"
                className="bg-transparent border border-[#8A3BEF] p-4 py-5 font-semibold data-[state=active]:bg-[#B457FA4D]"
              >
                In Progress
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="bg-transparent border border-[#8A3BEF] p-4 py-5 font-semibold data-[state=active]:bg-[#B457FA4D]"
              >
                Completed
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="All"
              className="mt-4"
            >
              {renderTaskList(allTasks, "No tasks available")}
            </TabsContent>
            <TabsContent
              value="my-tasks"
              className="mt-4"
            >
              {renderTaskList(myTasks, "No tasks available")}
            </TabsContent>

            {(["pending", "in-progress", "completed"] as const).map(
              (status) => (
                <TabsContent
                  key={status}
                  value={status}
                  className="mt-4"
                >
                  {renderTaskList(grouped[status], `No ${status} tasks`)}
                </TabsContent>
              )
            )}
          </Tabs>
        ) : (
          <div className="w-full h-[400px] flex flex-col items-center justify-center gap-2">
            <CardTitle>Your task board is empty.</CardTitle>
            <CardDescription>
              Create, assign, and track tasks here to plan every detail of your
              event.
            </CardDescription>
            <TaskDialog
              title="Create New Task"
              onSubmit={(payload) => {
                createMutation.mutate(
                  { eventId, payload },
                  {
                    onSuccess: (res) => {
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
          </div>
        )}
      </CardContent>
    </Card>
  );
}
