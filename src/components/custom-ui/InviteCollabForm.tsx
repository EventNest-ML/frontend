"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus, Loader2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchEventCollaborator,
  inviteCollaborator,
} from "@/lib/server-actions";
import { toast } from "sonner";

type InviteCollabFormProps = {
  eventId: string;
};

export default function InviteCollabForm({ eventId }: InviteCollabFormProps) {
  const [email, setEmail] = useState("");
  const queryClient = useQueryClient();

  // Get all collaborators
  const { data: collaboratorsDetails = [], isLoading } = useQuery({
    queryKey: ["collaborators", eventId],
    queryFn: () => fetchEventCollaborator(eventId),
  });

  
  const collaborators =
    !isLoading && "collaborators" in collaboratorsDetails
      ? collaboratorsDetails.collaborators
      : [];

  // Invite mutation
  const { mutate: invite, isPending } = useMutation({
    mutationFn: (email: string) => inviteCollaborator(eventId, email),
    onSuccess: () => {
      toast.success("Collaborator invited 🎉");
      queryClient.invalidateQueries({ queryKey: ["collaborators", eventId] });
      setEmail("");
    },
    onError: () => {
      toast.error("Failed to invite collaborator");
    },
  });

  const handleInvite = () => {
    const trimmed = email.trim();
    if (!trimmed) return;
    invite(trimmed);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invite Collaborators</CardTitle>
        <CardDescription>Add people to help plan this event</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Input
            id="invite-email"
            placeholder="Email"
            className="input-field rounded-full pr-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleInvite();
              }
            }}
          />
          <Button
            type="button"
            disabled={isPending}
            className="bg-[#B558FA] hover:bg-[#B558FA]/70"
            onClick={handleInvite}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Invite"
            )}
          </Button>
        </div>

        <h4 className="text-sm font-medium mt-4">Added Collaborators</h4>
        <div className="flex gap-2 mt-3 items-center flex-wrap">
          {isLoading && (
            <p className="text-xs text-muted-foreground">Loading...</p>
          )}

          {collaborators.map((collaborator, idx) => (
            <div
              key={idx}
              className="w-10 h-10 flex items-center justify-center rounded-full border-2 bg-[#B457FA4D] text-white border-dashed text-sm font-semibold"
              title={collaborator.email}
            >
              {collaborator.email[0]?.toUpperCase()}
            </div>
          ))}

          <Button
            type="button"
            size="icon"
            variant="outline"
            className="bg-gray-100/80 border-2 border-dashed rounded-full"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
