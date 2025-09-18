"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarComp } from "./Calender";
import { getCurrentDate } from "@/lib/utils";

export default function CalendarWrapper() {
  return (
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
  );
}
