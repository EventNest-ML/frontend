"use client";
import { AppSidebar } from "@/components/custom-ui/AppSidebar";
import { LogoIcon } from "@/components/custom-ui/Logo";
import { cn } from "@/lib/utils";
import {
  Bell,
  ChartNoAxesColumnIncreasing,
  DollarSign,
  FileCheck2,
  Home,
  LogOut,
  Settings,
  Slack,
} from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { NotificationDialog } from "./NotificationDialog";
import Link from "next/link";
import Image from "next/image";

const EventDetailsLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const { id } = params as { id: string };
  const links = [
    {
      label: "Event Home",
      href: `/dashboard/event/${id}/home`,
      icon: <Slack className={cn("h-5 w-5 flex-shrink-0")} />,
    },
    {
      label: "Tasks",
      href: `/dashboard/event/${id}/tasks`,
      icon: <FileCheck2 className={cn("h-5 w-5 flex-shrink-0")} />,
    },
    {
      label: "Budget",
      href: `/dashboard/event/${id}/budget`,
      icon: <DollarSign className={cn("h-5 w-5 flex-shrink-0")} />,
    },
    {
      label: "Poll",
      href: `/dashboard/event/${id}/poll`,
      icon: (
        <ChartNoAxesColumnIncreasing className={cn("h-5 w-5 flex-shrink-0")} />
      ),
    },
    {
      label: "Settings",
      href: `/dashboard/event/${id}/setting`,
      icon: <Settings className={cn("h-5 w-5 flex-shrink-0")} />,
    },
    {
      label: "Logout",
      action: "logout" as const,
      icon: <LogOut className="text-neutral-700/50 h-5 w-5 flex-shrink-0" />,
    },
  ];

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar links={links}>
        <main className="flex-1 w-full p-4 md:px-20 max-w-[1200px] mx-auto bg-white py-10 h-screen overflow-auto hide-scrollbar space-y-10">
          <div className="w-full flex justify-between items-center">
            <LogoIcon
              width={36}
              height={36}
            />
            <div className="flex gap-4">
              <Link href={"/dashboard/home"} className="size-[46px] bg-[#B457FA0D] hover:bg-[#b357fa1f] transition-all duration-300 ease-in-out flex justify-center items-center rounded-full cursor-pointer">
                <Home className="animate" />
              </Link>
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
          {children}
        </main>
      </AppSidebar>
    </div>
  );
};

export default EventDetailsLayout;
