import React from "react";
import { AppSidebar } from "@/components/custom-ui/AppSidebar";
import { LogoIcon } from "@/components/custom-ui/Logo";
import { Bell } from "lucide-react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <AppSidebar>
        <main className="flex-1 px-8 max-w-[1100px] mx-auto bg-white py-10 h-screen overflow-auto hide-scrollbar space-y-20">
          <div className="w-full flex justify-between items-center">
            <LogoIcon
              width={36}
              height={36}
            />
            <div className="flex gap-4">
              <div className="size-[46px] bg-[#B457FA0D] flex justify-center items-center rounded-full">
                <Bell />
              </div>
              <div className="size-[46px] bg-[#B457FA0D] flex justify-center items-center rounded-full">
                <Bell />
              </div>
            </div>
          </div>
          {children}
        </main>
      </AppSidebar>
    </div>
  );
};

export default DashboardLayout;
