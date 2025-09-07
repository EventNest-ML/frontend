"use client";

import * as React from "react";

import { Calendar } from "@/components/ui/calendar";

export function CalendarComp() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow-sm w-full border-[#B457FA4D]"
      captionLayout="dropdown"
    />
  );
}
