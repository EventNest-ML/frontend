import React from "react";
import { AppSidebar } from "@/components/custom-ui/AppSidebar";
import { LogoIcon } from "@/components/custom-ui/Logo";
import {
  Bell,
  Calendar,
  FileCheck2,
  Home,
  LogOut,
  Settings,
} from "lucide-react";
import { RouteGuard } from "@/components/custom-ui/RouteGaurd";
import { cn } from "@/lib/utils";
import { NotificationDialog } from "@/components/custom-ui/NotificationDialog";
import Image from "next/image";
import Link from "next/link";

const links = [
  {
    label: "Home",
    href: "/dashboard/home",
    icon: <Home className={cn("h-5 w-5 flex-shrink-0")} />,
  },
  {
    label: "My Events",
    href: "/dashboard/events",
    icon: <Calendar className={cn("h-5 w-5 flex-shrink-0")} />,
  },
  {
    label: "Tasks",
    href: "/dashboard/tasks",
    icon: <FileCheck2 className={cn("h-5 w-5 flex-shrink-0")} />,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className={cn("h-5 w-5 flex-shrink-0")} />,
  },
  {
    label: "Logout",
    action: "logout" as const,
    icon: <LogOut className="text-neutral-700/50 h-5 w-5 flex-shrink-0" />,
  },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar
        links={links}
      >
        <main className="flex-1 w-full p-4 md:px-20 max-w-[1200px] mx-auto bg-white py-10 h-screen overflow-auto hide-scrollbar space-y-10">
          <div className="w-full flex justify-between items-center">
            <LogoIcon
              width={36}
              height={36}
            />
            <div className="flex gap-4">
              <NotificationDialog>
                <div className="size-[46px] bg-[#B457FA0D] hover:bg-[#b357fa1f] transition-all duration-300 ease-in-out flex justify-center items-center rounded-full cursor-pointer">
                  <Bell className="animate" />
                </div>
              </NotificationDialog>
              <Link
                href={"/dashboard/settings/profile-settings"}
                className="size-[46px] bg-[#B457FA0D] hover:bg-[#b357fa1f] transition-all duration-300 ease-in-out flex justify-center items-center rounded-full"
              >
                <Image
                  src={"/avatar.png"}
                  alt="avatar"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
              </Link>
            </div>
          </div>
          <RouteGuard>{children}</RouteGuard>
        </main>
      </AppSidebar>
    </div>
  );
};

export default DashboardLayout;
