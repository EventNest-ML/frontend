import { CalendarComp } from "@/components/custom-ui/Calender";
import CreateEventDialog from "@/components/custom-ui/EventFormDialog";
import ProgressCircle from "@/components/custom-ui/ProgressCircle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSession } from "@/lib/auth-server";
import { getCurrentDate, getGreeting } from "@/lib/utils";
import Image from "next/image";

const EventDashboard = async () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="col-span-3 overflow-hidden bg-gradient-to-r from-[#8A3BEF] to-[#B457FA] text-white rounded-xl flex flex-col items-center justify-center h-[150px] text-2xl font-bold p-[20px]">
          <p className="font-bold text-[14px] text-center">Total Events</p>
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl">0</span>
          </div>
        </Card>
        <Card className="col-span-2 flex flex-row p-0 px-10">
          <CardHeader className="flex flex-col justify-center h-full w-full p-0">
            <CardTitle className="font-bold text-[20px] whitespace-nowrap">
              Create Event
            </CardTitle>
            <CardDescription className="text-[12px] text-black/80 whitespace-nowrap">
              Create new event
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-0">
            <CreateEventDialog>
              <button className="bg-[#B558FA] hover:bg-[#ac58fa] size-[80px] rounded-[10px] shadow-md flex items-center justify-center hover:scale-105 transition-transform p-[10px] cursor-pointer">
                <div className="border-2 border-white size-[38px] rounded-md flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
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
          </CardContent>
        </Card>
      </div>

      {/* Events Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="font-bold">All Events</CardTitle>
            <CardDescription>For all active events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <div className="grid grid-cols-3 gap-4">
                <Card className="text-center py-5 h-[250px]">
                  <CardTitle className="font-semibold">Owned Events</CardTitle>
                  <CardContent className="text-2xl font-bold w-full h-full flex justify-center items-center">
                    0
                  </CardContent>
                </Card>
                <Card className="text-center py-5 h-[250px]">
                  <CardTitle className="font-semibold">
                    Collaborated Events
                  </CardTitle>
                  <CardContent className="text-2xl font-bold w-full h-full flex justify-center items-center">
                    0
                  </CardContent>
                </Card>
                <Card className="text-center py-5 h-[250px]">
                  <CardTitle className="font-semibold">Past Events</CardTitle>
                  <CardContent className="text-2xl font-bold w-full h-full flex justify-center items-center">
                    0
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
        <CalendarComp className="border-[#B457FA4D] bg-[#B457FA0D] shadow-sm" />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Created Event</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center w-full h-full min-h-[80px] justify-center">
            All created events will be displayed here
          </CardContent>
        </Card>
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>To-do List</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center w-full h-full min-h-[80px] justify-center">
            All Collaborated Events will be displayed here
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventDashboard;
