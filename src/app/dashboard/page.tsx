import { CalendarComp } from "@/components/custom-ui/Calender";
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
      <div className="flex flex-col gap-8">
        {!session.authenticated && session.message && (
          <div className="text-center w-full py-4 bg-red-400/10 rounded-t-lg">
            <p className="text-red-600 text-[14px] text-balance">
              {session.message}
            </p>
          </div>
        )}
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="col-span-3 flex flex-row p-0 overflow-hidden">
            <CardHeader className="flex flex-col justify-center h-full px-10 w-full">
              <CardTitle className="font-bold text-[20px] ">
                {getGreeting()}, {session?.user?.firstname}{" "}
              </CardTitle>
              <CardDescription className="text-[12px] text-black/80">
                Ready to make your next event stress-free
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-gradient-to-r from-[#8A3BEF] to-[#B457FA] w-[229px] flex items-center justify-center p-4">
              <div className="w-[167px] h-[130px] relative">
                <Image
                  src={"/welcome-ellipse-design.svg"}
                  alt="welcome banner"
                  fill
                />
              </div>
            </CardContent>
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
              <div className="flex flex-col gap-4">
                <div className="bg-gradient-to-r from-[#8A3BEF] to-[#B457FA] text-white rounded-xl flex flex-col items-center justify-center h-[150px] text-2xl font-bold p-[20px]">
                  <p className="font-bold text-[14px] text-center">
                    Total Events
                  </p>
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-5xl">0</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Card className="text-center py-5 h-[150px]">
                    <CardTitle className="font-semibold">
                      Owned Events
                    </CardTitle>
                    <CardContent className="text-2xl font-bold w-full h-full flex justify-center items-center">
                      0
                    </CardContent>
                  </Card>
                  <Card className="text-center py-5 h-[150px]">
                    <CardTitle className="font-semibold">
                      Collaborated Events
                    </CardTitle>
                    <CardContent className="text-2xl font-bold w-full h-full flex justify-center items-center">
                      0
                    </CardContent>
                  </Card>
                  <Card className="text-center py-5 h-[150px]">
                    <CardTitle className="font-semibold">Past Events</CardTitle>
                    <CardContent className="text-2xl font-bold w-full h-full flex justify-center items-center">
                      0
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="w-fit mx-auto p-2 bg-[#B558FA] font-bold text-white rounded-sm shadow-none">
                {getCurrentDate()}
              </CardTitle>
            </CardHeader>
            <CardContent className="my-auto w-full">
              <CalendarComp />
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Tasks Completed</CardTitle>
              <CardDescription>For all active events</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <ProgressCircle
                value={30}
                size={120}
              />
            </CardContent>
          </Card>
          <Card className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>To-do List</CardTitle>
              <CardDescription>
                <p>No task yet</p>
                <span>Create your first event to get started</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="size-[90px] relative mx-auto pb-16px">
              <Image
                src={"/flight-icon.svg"}
                alt="todo icon"
                fill
              />
            </CardContent>
          </Card>
        </div>
      </div>
    );
};

export default DashboardHome;
