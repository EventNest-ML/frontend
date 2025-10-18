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
  const [pendingEmails, setPendingEmails] = useState<string[]>([]);
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

  const addPending = () => {
    const trimmed = email.trim();
    if (!trimmed) return;
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!isEmail) {
      toast.error("Please enter a valid email");
      return;
    }
    setPendingEmails((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
    setEmail("");
  };

  // Batch invite mutation
  const { mutateAsync: inviteBatch, isPending } = useMutation({
    mutationFn: async (emails: string[]) => {
      await Promise.all(emails.map((e) => inviteCollaborator(eventId, e)));
    },
    onSuccess: () => {
      toast.success("Collaborator(s) invited 🎉");
      queryClient.invalidateQueries({ queryKey: ["collaborators", eventId] });
      setPendingEmails([]);
      setEmail("");
    },
    onError: () => {
      toast.error("Failed to invite collaborator(s)");
    },
  });

  const handleInviteAll = async () => {
    const trimmed = email.trim();
    const batch = pendingEmails.length ? pendingEmails : trimmed ? [trimmed] : [];
    if (!batch.length) return;
    await inviteBatch(batch);
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
                addPending();
              }
            }}
          />
          <Button
            type="button"
            disabled={isPending}
            className="bg-[#B558FA] hover:bg-[#B558FA]/70"
            onClick={handleInviteAll}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Invite"
            )}
          </Button>
        </div>

        {pendingEmails.length > 0 && (
          <>
            <h4 className="text-sm font-medium mt-4">Pending Invites</h4>
            <div className="flex gap-2 mt-3 items-center flex-wrap">
              {pendingEmails.map((p, idx) => (
                <div
                  key={`pending-${idx}`}
                  className="w-10 h-10 flex items-center justify-center rounded-full border-2 bg-[#B457FA4D] text-white border-dashed text-sm font-semibold"
                  title={p}
                >
                  {p[0]?.toUpperCase()}
                </div>
              ))}
            </div>
          </>
        )}

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
            onClick={addPending}
            disabled={!email.trim()}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
