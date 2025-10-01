"use client";

import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider
      open={open}
      setOpen={setOpen}
      animate={animate}
    >
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...props} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const { open, animate } = useSidebar();

  return (
    <motion.div
      className={cn(
        "h-full py-10 !hidden md:!flex md:flex-col bg-white shadow-lg border-r dark:bg-neutral-800 w-[300px] flex-shrink-0 relative flex-start",
        className
      )}
      animate={{
        width: animate ? (open ? "250px" : "100px") : "250px",
        paddingLeft: animate ? (open ? "10px" : "10px") : "30px",
      }}
    >
      {children}
    </motion.div>
  );
};

export const MobileSidebar = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const { open, setOpen } = useSidebar();

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <>
      <div
        className={cn(
          "h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full z-50"
        )}
      >
        <div className="flex justify-end z-20 w-full">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md transition-colors duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-700"
          >
            <Menu className="text-neutral-800 dark:text-neutral-200 w-5 h-5" />
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between",
                className
              )}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button
                  onClick={toggleSidebar}
                  className="p-2 rounded-md transition-colors duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <X className="text-neutral-800 dark:text-neutral-200 w-5 h-5" />
                </button>
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  checker,
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
  checker?: "strict";
} & LinkProps) => {
  const { open, animate } = useSidebar();
  const pathname = usePathname();
  const isActive =
    checker === "strict"
      ? pathname === link.href
      : pathname.includes(link.href!);

  return (
    <Link
      className={cn(
        "flex items-center justify-start gap-2 group/sidebar py-2 transition-colors duration-200",
        isActive && "text-white font-medium",
        className
      )}
      {...props}
    >
      {link.icon}
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
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
    </Link>
  );
};
