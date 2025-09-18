// components/EventHeader.tsx
import { Event } from "@/lib/data";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";

export default function EventHeader({ event }: { event: Event }) {
  return (
    <Card className="p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
      {/* Event Image */}
      <div className="relative overflow-hidden w-full h-48 md:w-[300px] md:h-[180px] rounded-md">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="rounded-md object-cover"
        />
      </div>

      {/* Event Details */}
      <CardContent className="flex-1 flex flex-col justify-between p-0 h-auto md:h-[180px]">
        <h2 className="text-xl md:text-2xl font-bold">{event.title}</h2>
        <p className="text-sm text-gray-500">{event.venue}</p>

        <p className="text-sm text-gray-500 mt-1">
          <span className="font-semibold text-black">Event Manager:</span>{" "}
          {event.eventManager}
        </p>

        <p className="text-sm text-gray-500">
          <span className="font-semibold text-black">
            Number of Collaborators:
          </span>{" "}
          {event.collaborators.length}
        </p>

        <p className="text-sm text-gray-500">
          <span className="font-semibold text-black">Start Date:</span>{" "}
          {event.startDate}
        </p>

        <p className="text-sm text-gray-500">
          <span className="font-semibold text-black">End Date:</span>{" "}
          {event.endDate}
        </p>
      </CardContent>

      {/* Right Section */}
      <div className="flex flex-row md:flex-col justify-between items-start md:items-end gap-4 w-full md:w-auto md:h-[180px] mt-4 md:mt-0">
        <p className="font-bold text-black">Event ID: {event.eventId}</p>

        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            className="py-1 rounded-md border-purple-500 bg-transparent px-5"
          >
            Edit
          </Button>
          <Button
            variant="outline"
            className="py-1 rounded-md border-purple-500 bg-transparent px-5"
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}
