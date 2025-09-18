// use client
"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarIcon, MapPin, MoreVertical } from "lucide-react";
import type { Event } from "@/lib/data";
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

  if (isMain) {
    return (
      <Card className="overflow-hidden">
        <div className="relative h-48 w-full">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
        <CardHeader className="flex flex-col gap-2">
          <CardTitle className="text-2xl">{event.title}</CardTitle>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{event.venue}</span>
            <Calendar className="w-4 h-4 ml-4" />
            <span>{formatDate(event.startDate)}</span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Event Manager: {event.eventManager}</p>
          <p className="text-sm">Event ID: {event.eventId}</p>
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
      <div className="relative h-full min-h-40 w-full rounded-md overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>

      <CardHeader className="flex flex-row justify-between p-0 items-center">
        <CalendarIcon className="h-4 w-4" />
        <h3 className="font-semibold text-base">{event.title}</h3>
        <MoreVertical className="h-4 w-4 cursor-pointer" />
      </CardHeader>
      <Separator />
      <CardContent className="space-y-2 text-sm p-0">
        <p>
          <span className="font-medium">Venue:</span> {event.venue}
        </p>
        <p>
          <span className="font-medium">Start Date:</span>{" "}
          {new Date(event.startDate).toLocaleDateString("en-GB", {
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
          <Link href={`/dashboard/event/${event.eventId}`}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
