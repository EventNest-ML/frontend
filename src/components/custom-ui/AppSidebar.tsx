"use client";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  Calendar,
  FileCheck2,
  Home,
  LogOut,
  Settings
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import {motion} from "framer-motion"

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    {
      label: "Home",
      href: "/dashboard",
      icon: (
        <Home
          className={cn(
            "h-5 w-5 flex-shrink-0",
            pathname === "/dashboard"
              ? "text-white font-bold"
              : "text-neutral-700/50"
          )}
        />
      ),
    },
    {
      label: "My Events",
      href: "/dashboard/events",
      icon: (
        <Calendar
          className={cn(
            "h-5 w-5 flex-shrink-0",
            pathname === "/dashboard/events"
              ? "text-white font-bold"
              : "text-neutral-700/50"
          )}
        />
      ),
    },
    {
      label: "Tasks",
      href: "/dashboard/tasks",
      icon: (
        <FileCheck2
          className={cn(
            "h-5 w-5 flex-shrink-0",
            pathname === "/dashboard/tasks"
              ? "text-white font-bold"
              : "text-neutral-700/50"
          )}
        />
      ),
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: (
        <Settings
          className={cn(
            "h-5 w-5 flex-shrink-0",
            pathname === "/dashboard/settings"
              ? "text-white font-bold"
              : "text-neutral-700/50"
          )}
        />
      ),
    },
    {
      label: "Logout",
      action: "logout",
      icon: <LogOut className="text-neutral-700/50 h-5 w-5 flex-shrink-0" />,
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden bg-white",
        "h-screen"
      )}
    >
      <Sidebar
        open={open}
        setOpen={setOpen}
      >
        <SidebarBody className=" flex justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden pl-4">
            {open ? (
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-text-align-start"
                >
                  <path d="M21 5H3" />
                  <path d="M15 12H3" />
                  <path d="M17 19H3" />
                </svg>
                <motion.span
                  animate={{
                    display: open ? "inline-block" : "none",
                    opacity: open ? 1 : 0,
                  }}
                  className={cn(
                    "group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 ml-2 font-semibold text-lg"
                  )}
                >
                  EventNest Menu
                </motion.span>
              </div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-text-align-start"
              >
                <path d="M21 5H3" />
                <path d="M15 12H3" />
                <path d="M17 19H3" />
              </svg>
            )}
            <div className="mt-16 flex flex-col gap-5 w-full">
              {links.map((link, idx) => (
                <div
                  key={idx}
                  className="relative w-full z-10 px-2 pl-3"
                >
                  {link.action === "logout" ? (
                    <button
                      onClick={async () => {
                        await fetch("/api/auth/logout", { method: "POST" });
                        router.replace("/signin"); // force redirect
                      }}
                      className="flex items-center gap-2 w-full text-left transition-colors duration-200 cursor-pointer"
                    >
                      {link.icon}
                      <motion.span
                        animate={{
                          display: open ? "inline-block" : "none",
                          opacity: open ? 1 : 0,
                        }}
                        className={cn(
                          "group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 ml-2"
                        )}
                      >
                        Logout
                      </motion.span>
                    </button>
                  ) : (
                    link.href && (
                      <>
                        <SidebarLink
                          link={link}
                          className={cn(
                            "transition-colors duration-200",
                            pathname === link.href &&
                              "bg-transparent rounded-md z-50"
                          )}
                        />
                        <div
                          className={cn(
                            "absolute w-full h-full top-1/2 left-1/2 -translate-1/2 -z-10 rounded-l-full bg-gradient-to-r from-[#8A3BEF] to-[#B457FA] hidden",
                            pathname === link.href && "flex"
                          )}
                        />
                      </>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <Image
                    src="/logo.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
}
