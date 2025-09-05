import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getSession } from "@/lib/auth-server";
import { notFound } from "next/navigation";

const DashboardHome = async () => {
  const session = await getSession();

  return (
    <div className="flex flex-col gap-8">
      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2 bg-gradient-to-r from-[#8A3BEF] to-[#B457FA] text-white shadow-lg">
          <CardHeader>
            <CardTitle>Good morning, {session?.user?.firstname} </CardTitle>
            <CardDescription className="text-white/80">
              Ready to make your next event stress-free
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Decorative circle/graphic can go here if needed */}
          </CardContent>
        </Card>
        <Card className="flex flex-col justify-between shadow-lg">
          <CardHeader>
            <CardTitle>Create Event</CardTitle>
            <CardDescription>Create new event</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-end">
            <button className="bg-gradient-to-r from-[#8A3BEF] to-[#B457FA] rounded-full p-3 shadow-md">
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
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Events Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle>All Events</CardTitle>
            <CardDescription>For all active events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="bg-gradient-to-r from-[#8A3BEF] to-[#B457FA] text-white rounded-xl flex items-center justify-center h-24 text-2xl font-bold">
                Total Events
                <span className="ml-4 text-3xl">0</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Card className="text-center py-4">
                  <CardTitle className="text-base font-semibold">
                    Owned Events
                  </CardTitle>
                  <CardContent className="text-2xl font-bold">0</CardContent>
                </Card>
                <Card className="text-center py-4">
                  <CardTitle className="text-base font-semibold">
                    Collaborated Events
                  </CardTitle>
                  <CardContent className="text-2xl font-bold">0</CardContent>
                </Card>
                <Card className="text-center py-4">
                  <CardTitle className="text-base font-semibold">
                    Past Events
                  </CardTitle>
                  <CardContent className="text-2xl font-bold">0</CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>September</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar className="rounded-xl border" />
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Tasks Completed</CardTitle>
            <CardDescription>For all active events</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Progress
              value={0}
              className="w-32 h-32 rounded-full"
            />
            <span className="mt-2 text-2xl font-bold">0%</span>
          </CardContent>
        </Card>
        <Card className="shadow-lg flex flex-col justify-between">
          <CardHeader>
            <CardTitle>To-do List</CardTitle>
            <CardDescription>No task yet</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center flex-1">
            <svg
              width="64"
              height="64"
              fill="none"
              stroke="#B457FA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mb-2"
            >
              <path d="M2 32L32 2l30 30M32 2v60" />
            </svg>
            <span className="text-center text-sm">
              Create your first event to get started
            </span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
