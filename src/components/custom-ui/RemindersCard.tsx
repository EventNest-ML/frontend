"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Task } from "@/lib/data";
import { FileJson } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

export default function RemindersCard({ tasks }: { tasks: Task[] }) {
  const upcoming = tasks.filter((t) => new Date(t.dueDate) >= new Date());
  return (
    <Card className="gap-3 max-h-[400px]">
      <CardHeader>
        <CardTitle>Reminders</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[380px] overflow-y-scroll hide-scrollbar">
          {upcoming.length === 0 && (
            <div className="text-sm text-muted-foreground">
              No upcoming reminders
            </div>
          )}
          <div className="space-y-2">
            {upcoming.slice(0, 4).map((t) => (
              <div
                key={t.id}
                className="flex items-center gap-3 p-2 px-4 rounded-md border"
              >
                <div className="rounded-full size-[36px] flex justify-center items-center border border-gray-400">
                  <FileJson className="text-gray-400 size-[20px]" />
                </div>
                <div>
                  <div className="text-sm">{t.title}</div>
                  <div className="text-xs text-muted-foreground">
                    Due {t.dueDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
