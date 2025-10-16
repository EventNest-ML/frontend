import { fetchEventCollaborator } from "@/lib/server-actions";
import { CardContent } from "../ui/card";

export default async function CollaboratorsCard({ id }: { id: string }) {
  const CollaboratorDetails = await fetchEventCollaborator(id);
  const collaborators =
    "collaborators" in CollaboratorDetails
      ? CollaboratorDetails.collaborators
      : [];
  
  return (
    <CardContent className="flex flex-wrap gap-3 h-fit min-h-[200px]">
      {collaborators?.map((c) => (
        <div
          key={c.email}
          className="flex items-center gap-3 px-3 py-2 rounded-full text-sm h-fit"
        >
          <span className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-purple-200 text-purple-700 font-bold">
            {c.fullname
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </span>

          <div>
            <p className="font-bold tracking-wide">{c.fullname}</p>
            <p className="text-xs text-gray-500">{c.role}</p>
          </div>
        </div>
      ))}
    </CardContent>
  );
}
