import EventDetailsLayout from "@/components/custom-ui/EventDetailsLayout";
import { RouteGuard } from "@/components/custom-ui/RouteGaurd";
import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <EventDetailsLayout>
      <RouteGuard>{children} </RouteGuard>
    </EventDetailsLayout>
  );
};

export default DashboardLayout;
