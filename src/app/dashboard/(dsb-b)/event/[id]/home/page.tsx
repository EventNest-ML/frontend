import { demoEvents } from "@/lib/data";
import EventHeader from "@/components/custom-ui/EventHeader";
import BudgetCard from "@/components/custom-ui/BudgetCard";
import TasksCard from "@/components/custom-ui/TasksCard";
import CollaboratorsCard from "@/components/custom-ui/CollaboratorCard";
import ActivityFeed from "@/components/custom-ui/ActivityFeed";
import RemindersCard from "@/components/custom-ui/RemindersCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrentDate } from "@/lib/utils";
import { CalendarComp } from "@/components/custom-ui/Calender";
import { Lock } from "lucide-react";
import { fetchEventCollaborator, fetchUserEvents } from "@/lib/server-actions";
import { Suspense } from "react";
import Link from "next/link";
import { EventDetails } from "@/type";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, eventDetails] = await Promise.all([
    params.then((p) => p.id),
    fetchUserEvents(),
  ]);

  if ("shouldRedirect" in eventDetails && eventDetails.shouldRedirect) {
    if (typeof window !== "undefined") {
      window.location.href = "/signup";
    }
    return <div className="p-6">{eventDetails.message ?? "Redirecting…"}</div>;
  }

  const events = (eventDetails as EventDetails).events ?? [];
  const event = events.find((e) => e.id === id);
  const dummyEvent = demoEvents[0];

  if (!event) {
    return <div className="p-6">Event not found</div>;
  }

  return (
    <div className="space-y-6">
      <EventHeader event={event} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 place-items-stretch">
        <div className="lg:col-span-2 space-y-6 flex flex-col">
          <BudgetCard event={event} />
          <TasksCard event={event} />
          <Card className="flex-1">
            <div className="w-full flex justify-between items-center">
              <CardHeader className="flex-1">
                <CardTitle className="font-semibold">
                  Team Collaborators
                </CardTitle>
                <CardDescription className="text-sm">
                  Add people to help plan this event
                </CardDescription>
              </CardHeader>
              <Link
                href={`/dashboard/event/${id}/home/collaborators`}
                className="text-[#B558FA] mr-6 underline"
              >
                View Details
              </Link>
            </div>
            <Suspense fallback={<CardContent>Loading...</CardContent>}>
              <CollaboratorsCard id={id} />
            </Suspense>
          </Card>
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
          <RemindersCard tasks={dummyEvent.tasks} />
          <ActivityFeed event={dummyEvent} />
          <Card>
            <CardHeader>
              <CardTitle>Poll Creation</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center rounded-full size-[100px] mx-auto border border-[#B457FA4D]">
              <Lock className="size-[50px]" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
