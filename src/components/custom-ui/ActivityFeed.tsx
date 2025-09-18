import { Event } from "@/lib/data";
import { Activity } from "lucide-react";
import { Card } from "../ui/card";

export default function ActivityFeed({ event }: { event: Event }) {
  return (
    <Card className="p-4 gap-3">
      <h3 className="font-semibold mb-4">Activity Feed</h3>
      <ul className="space-y-3">
        {event.activities.map((a) => (
          <li
            key={a.id}
            className="flex items-center gap-3 p-2 px-4 rounded-md border"
          >
            <div className="rounded-full size-[36px] flex justify-center items-center border border-gray-400">
              <Activity className="text-gray-400 size-[20px]" />
            </div>
            <div>
              <p className="text-sm font-medium">{a.title}</p>
              {a.description && (
                <p className="text-xs text-gray-500">{a.description}</p>
              )}
              <p className="text-xs text-gray-400">{a.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
