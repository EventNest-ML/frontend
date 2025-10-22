import BackButton from "@/components/custom-ui/BackButton";
import CollaboratorsCard from "@/components/custom-ui/CollaboratorCard";
import CollabStats from "@/components/custom-ui/CollabStats";
import InviteCollabForm from "@/components/custom-ui/InviteCollabForm";
import TaskDialog from "@/components/custom-ui/TaskFormDialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchUserEvents } from "@/lib/server-actions";
import { Plus } from "lucide-react";
import { Suspense } from "react";
import { isAuthFailure } from "@/lib/utils";

export default async function CollaboratorsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, eventDetails] = await Promise.all([
    params.then((p) => p.id),
    fetchUserEvents(),
  ]);

  type EventsResponse = { events?: { id: string }[] };
  const events: { id: string }[] =
    !isAuthFailure(eventDetails) && Array.isArray((eventDetails as EventsResponse).events)
      ? ((eventDetails as EventsResponse).events as { id: string }[])
      : [];
  const event = events.find((e) => e.id === id);

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
      <BackButton />
      <Card className="gap-0 flex-row justify-between items-center">
        <CardHeader className="w-full">
          <CardTitle>Team Collaborators</CardTitle>
          <CardDescription>Invite and manage your team members</CardDescription>
        </CardHeader>
        <CardContent>
          <TaskDialog title="Create New Task">
            <Button className="bg-[#B558FA] hover:bg-[#B558FA]/80">
              Add Task <Plus />
            </Button>
          </TaskDialog>
        </CardContent>
      </Card>
      <Suspense
        fallback={
          <div className="grid grid-cols-3 gap-4 text-center">
            <Skeleton className="h-[180px] rounded-md" />
            <Skeleton className="h-[180px] rounded-md" />
            <Skeleton className="h-[180px] rounded-md" />
          </div>
        }
      >
        <CollabStats id={id} />
      </Suspense>

      <Card className="flex-1">
        <div className="w-full flex justify-between items-center">
          <CardHeader className="flex-1">
            <CardTitle className="font-semibold">All Team Members</CardTitle>
          </CardHeader>
        </div>
        <Suspense fallback={<CardContent>Loading...</CardContent>}>
          <CollaboratorsCard id={id} />
        </Suspense>
      </Card>
      {/* <InviteCollabForm eventId={id} /> */}
    </div>
  );
}
