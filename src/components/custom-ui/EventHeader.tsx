"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useDeleteEvent, useEventCollaborators } from "@/hooks/query";
import { Collaborator, Event } from "@/type";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Link from "next/link";

export default function EventHeader({ event }: { event: Event }) {
  const {
    data: collaboratorDetails = [],
    isLoading,
    error,
  } = useEventCollaborators(event.id);

  const collaborators =
    !isLoading && !error && "collaborators" in collaboratorDetails
      ? collaboratorDetails.collaborators
      : [];

  const eventManager =
    (!isLoading &&
      !error &&
      (collaborators as Collaborator[])?.find(
        (c) => c.role.toLowerCase() === "admin"
      )?.fullname) ||
    "N/A";
  const startDate = new Date(event.date).toLocaleDateString();
  const eventId = event.id.split("-")[0].toUpperCase();

  return (
    <Card className="p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
      {/* Event Image */}
      <div className="relative h-full flex-1 min-h-40 w-[300px] rounded-md overflow-hidden bg-gradient-to-br from-purple-900/60 via-purple-700/40 to-indigo-800/60 flex items-center justify-center">
        <span className="text-white/80 font-semibold text-lg tracking-wide">
          {event.name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase()}
        </span>
      </div>

      {/* Event Details */}
      <CardContent className="flex-1 flex flex-col justify-between p-0 h-auto md:h-[180px]">
        <h2 className="text-xl md:text-2xl font-bold">{event.name}</h2>
        <p className="text-sm text-gray-500">{event.location}</p>

        <p className="text-sm text-gray-500 mt-1">
          <span className="font-semibold text-black">Event Manager:</span>{" "}
          {!isLoading ? eventManager : "Loading..."}
        </p>

        <p className="text-sm text-gray-500">
          <span className="font-semibold text-black">
            Number of Collaborators:
          </span>{" "}
          {!isLoading ? (collaborators as Collaborator[]).length : "Loading..."}
        </p>

        <p className="text-sm text-gray-500">
          <span className="font-semibold text-black">Start Date:</span>{" "}
          {startDate}
        </p>

        <p className="text-sm text-gray-500">
          <span className="font-semibold text-black">End Date:</span>{" "}
          {event.date}
        </p>
      </CardContent>

      {/* Right Section */}
      <div className="flex flex-row md:flex-col justify-between items-start md:items-end gap-4 w-full md:w-auto md:h-[180px] mt-4 md:mt-0">
        <p className="font-bold text-black">Event ID: {eventId}</p>

        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            className="py-1 rounded-md border-purple-500 bg-transparent px-5"
            asChild
          >
            <Link href={`/dashboard/event/${event.id}/setting/general-info`}>Edit</Link>
          </Button>
          <DeleteDialog
            eventName={event.name}
            eventId={event.id}
          >
            <Button
              variant="outline"
              className="py-1 rounded-md border-purple-500 bg-transparent px-5"
            >
              Delete
            </Button>
          </DeleteDialog>
        </div>
      </div>
    </Card>
  );
}

export const DeleteDialog = ({
  children,
  eventName,
  eventId,
}: {
  children: React.ReactNode;
  eventName: string;
  eventId: string;
}) => {
  const router = useRouter();
  const deleteMutation = useDeleteEvent();

  const handleDelete = () => {
    deleteMutation.mutate(eventId, {
      onSuccess: () => {
        toast("Event deleted", {
          description: `${eventName} was removed successfully.`,
          descriptionClassName: "!text-black/70",
        });
        router.push("/dashboard/events");
      },
      onError: () => {
        toast("Failed to delete", {
          description: "Something went wrong. Please try again.",
          descriptionClassName: "!text-white/80",
          className: "!bg-red-500 text-white",
        });
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger
        className="cursor-pointer"
        asChild
      >
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete{" "}
            <span className="font-semibold">{eventName}</span>?
          </DialogTitle>
        </DialogHeader>

        <DialogFooter>
          <div className="flex gap-4 w-full">
            <Button
              type="button"
              className="flex-1 !py-2 px-4 bg-black/40 border border-gray-300 rounded-md text-white hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              No
            </Button>
            <Button
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              type="button"
              className="flex-1 !py-2 px-4 bg-red-600 border border-transparent rounded-md text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {deleteMutation.isPending ? (
                <Loader className="animate-spin" />
              ) : (
                "Yes"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
