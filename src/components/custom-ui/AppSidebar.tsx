"use client";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { CustomDialog } from "./Dialog";
import { X } from "lucide-react";

export type SidebarLinkItem = {
  label: string;
  href?: string;
  action?: "logout";
  icon: React.ReactNode;
};

type AppSidebarProps = {
  children: React.ReactNode;
  links: SidebarLinkItem[];
  checker?: "strict";
};

export function AppSidebar({ children, links, checker }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div
      className={cn(
        "rounded-md flex w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden bg-white",
        "md:flex-row md:h-screen flex-col"
      )}
    >
      <Sidebar
        open={open}
        setOpen={setOpen}
      >
        <SidebarBody className="flex justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden pl-4">
            {/* Header with toggle icon, title and toggle button */}
            <div className="flex items-center justify-between mb-8 pl-3">
              <button
                className="flex items-center gap-2 cursor-pointer"
                onClick={toggleSidebar}
              >
                {open ? (
                  <X />
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
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-5 w-full h-full">
              {links.map((link, idx) => {
                const isActive =
                  checker === "strict"
                    ? pathname === link.href
                    : pathname.includes(link.href!);
                return (
                  <div
                    key={idx}
                    className={cn(
                      "relative w-full z-10 px-2 pl-3",
                      link.action === "logout" && "mt-auto"
                    )}
                  >
                    {link.action === "logout" ? (
                      <button
                        onClick={async () => {
                          await fetch("/api/auth/logout", { method: "POST" });
                          router.replace("/signin"); 
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
                          {link.label}
                        </motion.span>
                      </button>
                    ) : link.label === "Poll" ? (
                      <CustomDialog title="Poll Creation">
                        <div
                          className={cn(
                            "flex items-center justify-start gap-2 group/sidebar py-2 transition-colors duration-200 cursor-pointer"
                          )}
                        >
                          {link.icon}
                          <motion.span
                            animate={{
                              display: open ? "inline-block" : "none",
                              opacity: open ? 1 : 0,
                            }}
                            className={cn(
                              "text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0",
                              isActive
                                ? "text-white font-medium"
                                : "text-neutral-700 dark:text-neutral-200"
                            )}
                          >
                            {link.label}
                          </motion.span>
                        </div>
                      </CustomDialog>
                    ) : (
                      link.href && (
                        <>
                          <SidebarLink
                            href={link.href}
                            link={{
                              label: link.label,
                              href: link.href,
                              icon: link.icon,
                            }}
                            className={cn(
                              "transition-colors duration-200",
                              isActive
                                ? "text-white font-bold bg-transparent rounded-md z-50"
                                : "text-neutral-700/50"
                            )}
                            checker={checker}
                          />
                          <div
                            className={cn(
                              "absolute w-full h-full top-1/2 left-1/2 -translate-1/2 -z-10 rounded-l-full bg-gradient-to-r from-[#8A3BEF] to-[#B457FA] hidden",
                              isActive && "flex"
                            )}
                          />
                        </>
                      )
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
}
