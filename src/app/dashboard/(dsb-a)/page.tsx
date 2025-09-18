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

const DashboardHome = async () => {
  const session = await getSession();

  return (
    <div className="flex flex-col gap-8 w-full pb-10">
      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Welcome card */}
        <Card className="col-span-1 md:col-span-3 flex flex-col md:flex-row p-0 overflow-hidden">
          <CardHeader className="flex flex-col justify-center h-full px-6 md:px-10 w-full">
            <CardTitle className="font-bold text-lg md:text-2xl">
              {getGreeting()}, {session?.user?.firstname}
            </CardTitle>
            <CardDescription className="text-[13px] md:text-[15px] text-black/70">
              Ready to make your next event stress-free
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-gradient-to-r from-[#8A3BEF] to-[#B457FA] flex items-center justify-center p-4 md:w-[229px] min-h-[160px]">
            <div className="w-[140px] md:w-[167px] h-[120px] md:h-[130px] relative">
              <Image
                src={"/welcome-ellipse-design.svg"}
                alt="welcome banner"
                fill
                className="object-contain"
              />
            </div>
          </CardContent>
        </Card>

        {/* Create event card */}
        <Card className="col-span-1 md:col-span-2 flex flex-col md:flex-row items-center justify-between p-6">
          <div className="flex flex-col text-center md:text-left">
            <CardTitle className="font-bold text-lg md:text-2xl">
              Create Event
            </CardTitle>
            <CardDescription className="text-sm text-black/70">
              Create new event
            </CardDescription>
          </div>
          <CardContent className="mt-4 md:mt-0 flex items-center justify-center">
            <CreateEventDialog>
              <button className="bg-[#B558FA] hover:bg-[#ac58fa] size-[70px] md:size-[80px] rounded-xl shadow-md flex items-center justify-center hover:scale-105 transition-transform p-2 cursor-pointer">
                <div className="border-2 border-white size-[32px] md:size-[38px] rounded-md flex items-center justify-center">
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-bold">All Events</CardTitle>
            <CardDescription>For all active events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="bg-gradient-to-r from-[#8A3BEF] to-[#B457FA] text-white rounded-xl flex flex-col items-center justify-center h-[140px] md:h-[150px] text-xl md:text-2xl font-bold p-6 hover:scale-[1.02] transition-transform">
                <p className="font-semibold text-sm md:text-[15px] text-center">
                  Total Events
                </p>
                <div className="flex items-center justify-center mt-2">
                  <span className="text-4xl md:text-5xl">0</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {["Owned Events", "Collaborated Events", "Past Events"].map(
                  (title, idx) => (
                    <Card
                      key={idx}
                      className="text-center py-4 sm:py-5 h-[120px] sm:h-[150px] hover:shadow-md transition"
                    >
                      <CardTitle className="font-semibold text-sm md:text-base">
                        {title}
                      </CardTitle>
                      <CardContent className="text-xl md:text-2xl font-bold w-full h-full flex justify-center items-center">
                        0
                      </CardContent>
                    </Card>
                  )
                )}
              </div>
            </div>
          </CardContent>
        </Card>

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
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">
              Tasks Completed
            </CardTitle>
            <CardDescription>For all active events</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ProgressCircle
              value={30}
              size={110}
            />
          </CardContent>
        </Card>

        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">To-do List</CardTitle>
            <CardDescription>
              <p className="text-sm">No task yet</p>
              <span className="text-xs md:text-sm">
                Create your first event to get started
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="relative w-[70px] h-[70px] md:w-[90px] md:h-[90px] mx-auto pb-4">
            <Image
              src={"/flight-icon.svg"}
              alt="todo icon"
              fill
              className="object-contain"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
