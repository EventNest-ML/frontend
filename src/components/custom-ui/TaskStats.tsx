import { CheckCircle, Clock, Loader } from "lucide-react";
import React from "react";
import { Card } from "../ui/card";
import { Event } from "@/lib/data";

const TaskStats = ({ event }: { event: Event }) => {
  const pending = event.tasks.filter((t) => t.status === "pending").length;
  const inProgress = event.tasks.filter(
    (t) => t.status === "in-progress"
  ).length;
  const completed = event.tasks.filter((t) => t.status === "completed").length;
  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      <Card className="p-5 text-center h-[180px]">
        <div className="flex w-full justify-between items-center">
          <p className="text-sm font-bold">To Do</p>
          <div className="rounded-full flex items-center justify-center size-[32px] bg-red-600 text-white">
            <Loader size={20} />
          </div>
        </div>
        <div className="h-full flex flex-col justify-center items-center -mt-4">
          <p className="text-2xl font-semibold tracking-wide">{pending}</p>
          <p className="text-sm mt-2">Task Pending</p>
        </div>
      </Card>
      <Card className="p-5 text-center h-[180px]">
        <div className="flex w-full justify-between items-center">
          <p className="text-sm font-bold">In Progress</p>
          <div className="rounded-full flex items-center justify-center size-[32px] bg-[#9647FF] text-white">
            <Clock size={20} />
          </div>
        </div>
        <div className="h-full flex flex-col justify-center items-center -mt-4">
          <p className="text-2xl font-semibold tracking-wide">{inProgress}</p>
          <p className="text-sm mt-2">Currently Working On</p>
        </div>
      </Card>
      <Card className="p-5 text-center h-[180px]">
        <div className="flex w-full justify-between items-center">
          <p className="text-sm font-bold">Completed</p>
          <div className="rounded-full flex items-center justify-center size-[32px] bg-[#0C780C] text-white">
            <CheckCircle size={20} />
          </div>
        </div>
        <div className="h-full flex flex-col justify-center items-center -mt-4">
          <p className="text-2xl font-semibold tracking-wide">{completed}</p>
          <p className="text-sm mt-2">Completed</p>
        </div>
      </Card>
    </div>
  );
};

export default TaskStats;
