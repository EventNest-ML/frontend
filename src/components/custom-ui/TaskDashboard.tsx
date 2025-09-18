import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Calendar, MessageCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Task } from "@/lib/data";
import TaskDialog from "./TaskFormDialog";
import { CommentSectionSheet } from "./CommentSection";

type TaskDashboardProps = {
  tasks: Task[];
};

export default function TaskDashboard({ tasks }: TaskDashboardProps) {
  const grouped = {
    pending: tasks.filter((t) => t.status === "pending"),
    "in-progress": tasks.filter((t) => t.status === "in-progress"),
    completed: tasks.filter((t) => t.status === "completed"),
  };

  const allTasks = tasks; // raw list
  const myTasks = [
    ...grouped.pending,
    ...grouped["in-progress"],
    ...grouped.completed,
  ]; // sorted by priority

  const getPriorityColor = (status: string) => {
    if (status === "pending") return "bg-red-500";
    if (status === "in-progress") return "bg-blue-500";
    if (status === "completed") return "bg-green-500";
    return "bg-gray-300";
  };

  const renderTaskList = (list: Task[], emptyMsg: string) => (
    <ScrollArea className="h-fit max-h-dvh overflow-y-auto md:px-5">
      {list.length > 0 ? (
        <div className="space-y-2">
          {list.map((task) => (
            <Card
              key={task.id}
              className="flex-row items-center justify-between rounded-md bg-transparent"
            >
              <CardHeader className="flex-1 flex flex-row gap-3 items-center">
                <div
                  className={`border border-black size-[24px] rounded-full ${getPriorityColor(
                    task.status
                  )}`}
                />
                <div className="space-y-[6px]">
                  <CardTitle className="font-medium tracking-wider">
                    {task.title}
                  </CardTitle>
                  <CardDescription>
                    Due: {task.dueDate || "No date"}
                  </CardDescription>
                  <div className="flex gap-4">
                    {/* Collaborator */}
                    <div className="flex gap-3 items-center justify-center">
                      <Avatar className="rounded-lg size-[30px]">
                        <AvatarFallback className="text-[12px]">
                          ER
                        </AvatarFallback>
                      </Avatar>
                      <CardDescription>Erin Robinson</CardDescription>
                    </div>
                    {/* Due date */}
                    <div className="flex gap-3 items-center justify-center">
                      <Calendar
                        size={20}
                        className="text-black/40"
                      />
                      <CardDescription>
                        {task.dueDate || "No date"}
                      </CardDescription>
                    </div>
                    {/* Comments */}
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

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {task.status !== "completed" && (
                  <CardContent className="flex items-center gap-3">
                    <TaskDialog
                      title="Edit Task"
                      defaultValues={{
                        taskName: task.title,
                        assignee: "Amina Musa",
                        dueDate: task.dueDate,
                        status: task.status,
                        description: "Secure and pay for the event venue",
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
                      className="bg-[#b357fa6d] hover:bg-[#b357fa6d]/80 text-black border border-[#B558FA]"
                    >
                      Mark as complete
                    </Button>
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

          {/* All tasks */}
          <TabsContent
            value="All"
            className="mt-4"
          >
            {renderTaskList(allTasks, "No tasks available")}
          </TabsContent>

          {/* My tasks (priority order) */}
          <TabsContent
            value="my-tasks"
            className="mt-4"
          >
            {renderTaskList(myTasks, "No tasks available")}
          </TabsContent>

          {/* Status-specific */}
          {(["pending", "in-progress", "completed"] as const).map((status) => (
            <TabsContent
              key={status}
              value={status}
              className="mt-4"
            >
              {renderTaskList(grouped[status], `No ${status} tasks`)}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
