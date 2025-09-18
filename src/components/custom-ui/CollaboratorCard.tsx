// components/CollaboratorsCard.tsx
import { Event } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function CollaboratorsCard({ event }: { event: Event }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold">Team Collaborators</CardTitle>
        <CardDescription className="text-sm">
          Add people to help plan this event
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3 h-fit min-h-[200px]">
        {event.collaborators.map((c) => (
          <div
            key={c.id}
            className="flex items-center gap-3 px-3 py-2 rounded-full text-sm h-fit"
          >
            <span className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-purple-200 text-purple-700 font-bold">
              {c.avatar}
            </span>
            <div>
              <p className="font-bold tracking-wide">{c.name}</p>
              <p className="text-xs text-gray-500">{c.role}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
