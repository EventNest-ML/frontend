// use client
"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarIcon, MapPin, MoreVertical } from "lucide-react";
import type { Event } from "@/type";
import Link from "next/link";
import { Separator } from "../ui/separator";

export default function EventCard({
  event,
  isMain = false,
  onView,
}: {
  event: Event;
  isMain?: boolean;
  onView?: (id: string) => void;
}) {
  const formatDate = (s: string) =>
    new Date(s).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  
  const eventManager = event?.collaborators?.find((c) => c.role === "admin")?.fullname || "N/A";
  const eventId = event.id.split("-")[0].toUpperCase();

  if (isMain) {
    return (
      <Card className="overflow-hidden">
        {/* <div className="relative h-48 w-full">
          <Image
            src={"/placeholder-event-image.svg"}
            alt={event.name}
            fill
            className="object-cover"
          />
        </div> */}
        <div className="relative h-full min-h-40 w-full rounded-md overflow-hidden bg-gradient-to-br from-purple-900/60 via-purple-700/40 to-indigo-800/60 flex items-center justify-center">
          <span className="text-white/80 font-semibold text-lg tracking-wide">
            {event.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase()}
          </span>
        </div>

        <CardHeader className="flex flex-col gap-2">
          <CardTitle className="text-2xl">{event.name}</CardTitle>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
            <Calendar className="w-4 h-4 ml-4" />
            <span>{formatDate(event.date)}</span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Event Manager: {eventManager}</p>
          <p className="text-sm">Event ID: {eventId}</p>
        </CardContent>
        <CardFooter>
          <div className="flex gap-2 w-full">
            <Button
              className="flex-1"
              onClick={() => onView?.(event.id)}
            >
              Open
            </Button>
            <Button variant="ghost">More</Button>
          </div>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden h-full p-5">
      {/* Event Image */}
      {/* <div className="relative h-full min-h-40 w-full rounded-md overflow-hidden">
        <Image
          src={"/placeholder-event-image.svg"}
          alt={event.name}
          fill
          className="object-cover"
        />
      </div> */}
      <div className="relative h-full min-h-40 w-full rounded-md overflow-hidden bg-gradient-to-br from-purple-900/60 via-purple-700/40 to-indigo-800/60 flex items-center justify-center">
        <span className="text-white/80 font-semibold text-lg tracking-wide">
          {event.name.charAt(0).toUpperCase()}
        </span>
      </div>

      <CardHeader className="flex flex-row justify-between p-0 items-center">
        <CalendarIcon className="h-4 w-4" />
        <h3 className="font-semibold text-base">{event.name}</h3>
        <MoreVertical className="h-4 w-4 cursor-pointer" />
      </CardHeader>
      <Separator />
      <CardContent className="space-y-2 text-sm p-0">
        <p>
          <span className="font-medium">Venue:</span> {event.location}
        </p>
        <p>
          <span className="font-medium">Start Date:</span>{" "}
          {new Date(event.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </CardContent>

      <CardFooter className="p-0">
        <Button
          className="w-full bg-[#8A3BEF] hover:bg-[#8A3BEF]/80"
          onClick={() => onView?.(event.id)}
          asChild
        >
          <Link href={`/dashboard/event/${event.id}/home`}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
