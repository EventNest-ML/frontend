"use client";

import { CalendarComp } from "@/components/custom-ui/Calender";
import CreateEventDialog from "@/components/custom-ui/EventFormDialog";
import EventCard from "@/components/custom-ui/EventCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { demoEvents as dummyEvents } from "@/lib/data";

const EventDashboard = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="col-span-3 bg-gradient-to-r from-[#8A3BEF] to-[#B457FA] text-white rounded-xl flex flex-col items-center justify-center h-[150px] text-2xl font-bold p-[20px]">
          <p className="font-bold text-[14px] text-center">Total Events</p>
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl">{dummyEvents.length}</span>
          </div>
        </Card>
        <Card className="col-span-2 flex flex-row p-0 px-6 items-center justify-between">
          <div>
            <CardTitle className="font-bold text-[20px]">
              Create Event
            </CardTitle>
            <CardDescription className="text-[12px] text-black/80">
              Create new event
            </CardDescription>
          </div>
          <CreateEventDialog>
            <button className="bg-[#B558FA] hover:bg-[#ac58fa] size-[70px] rounded-[10px] shadow-md flex items-center justify-center hover:scale-105 transition-transform p-[10px] cursor-pointer">
              <div className="border-2 border-white size-[32px] rounded-md flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line
                    x1="12"
                    y1="5"
                    x2="12"
                    y2="19"
                  />
                  <line
                    x1="5"
                    y1="12"
                    x2="19"
                    y2="12"
                  />
                </svg>
              </div>
            </button>
          </CreateEventDialog>
        </Card>
      </div>

      {/* Events Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="font-bold">All Events</CardTitle>
            <CardDescription>For all active events</CardDescription>
          </CardHeader>
          <CardContent className="h-full">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-full">
              <Card className="text-center py-5 h-full">
                <CardTitle className="font-semibold mt-5">Owned Events</CardTitle>
                <CardContent className="text-4xl font-bold flex items-center justify-center w-full h-full">
                  {dummyEvents.length}
                </CardContent>
              </Card>
              <Card className="text-center py-5 h-full">
                <CardTitle className="font-semibold mt-5">Collaborated</CardTitle>
                <CardContent className="text-2xl font-bold flex items-center justify-center w-full h-full">0</CardContent>
              </Card>
              <Card className="text-center py-5 h-full">
                <CardTitle className="font-semibold mt-5">Past Events</CardTitle>
                <CardContent className="text-2xl font-bold flex items-center justify-center w-full h-full">0</CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <CalendarComp className="border-[#B457FA4D] bg-[#B457FA0D] shadow-sm" />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Created Events</CardTitle>
          </CardHeader>
          <CardContent>
            {dummyEvents.length === 0 ? (
              <div className="flex flex-col items-center w-full h-full min-h-[80px] justify-center text-sm text-muted-foreground">
                All created events will be displayed here
              </div>
            ) : (
              <ScrollArea className="w-full">
                <div className="flex gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
                  {dummyEvents.map((event) => (
                    <div
                      key={event.id}
                      className="min-w-[250px] md:min-w-0"
                    >
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>
                <ScrollBar
                  orientation="horizontal"
                  className="md:hidden"
                />
              </ScrollArea>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>To-do List</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center min-h-[80px]">
            All collaborated events will be displayed here
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventDashboard;
