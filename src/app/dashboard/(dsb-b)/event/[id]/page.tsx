import { demoEvents } from "@/lib/data";
import EventHeader from "@/components/custom-ui/EventHeader";
import BudgetCard from "@/components/custom-ui/BudgetCard";
import TasksCard from "@/components/custom-ui/TasksCard";
import CollaboratorsCard from "@/components/custom-ui/CollaboratorCard";
import ActivityFeed from "@/components/custom-ui/ActivityFeed";
import RemindersCard from "@/components/custom-ui/RemindersCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentDate } from "@/lib/utils";
import { CalendarComp } from "@/components/custom-ui/Calender";
import { Lock } from "lucide-react";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
  }) {
  const { id } = await params;
  const event = demoEvents.find((e) => e.eventId === id);

  if (!event) return <div className="p-6">Event not found</div>;

  return (
    <div className="space-y-6">
      <EventHeader event={event} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <BudgetCard event={event} />
          <TasksCard event={event} />
          <CollaboratorsCard event={event} />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="inline-block w-fit mx-auto px-4 py-2 bg-[#B558FA] font-bold text-white rounded-sm">
                {getCurrentDate()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CalendarComp />
            </CardContent>
          </Card>
          <RemindersCard tasks={event.tasks} />
          <ActivityFeed event={event} />
          <Card>
            <CardHeader>
              <CardTitle>Poll Creation</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center rounded-full size-[100px] mx-auto border border-[#B457FA4D]">
              <Lock className="size-[50px]"/>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
