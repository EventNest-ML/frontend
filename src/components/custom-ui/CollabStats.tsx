import React from "react";
import { Card } from "../ui/card";
import { Mail, UserCheck, Users } from "lucide-react";
import { fetchEventCollaborator } from "@/lib/server-actions";
import { Collab, Collaborator } from "@/type";

const CollabStats = async ({ id }: { id: string }) => {
  const collaboratorDetails = (await fetchEventCollaborator(id)) as Collab;

  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      <Card className="p-5 text-center h-[180px]">
        <div className="flex w-full justify-between items-center">
          <p className="text-sm font-bold">Total Members</p>
          <div className="rounded-full flex items-center justify-center size-[32px] border text-gray-400">
            <Users size={20} />
          </div>
        </div>
        <div className="h-full flex flex-col justify-center items-center -mt-4">
          <p className="text-2xl font-semibold tracking-wide">
            {collaboratorDetails.counts.total_members}
          </p>
          <p className="text-sm mt-2">All Team Members</p>
        </div>
      </Card>
      <Card className="p-5 text-center h-[180px]">
        <div className="flex w-full justify-between items-center">
          <p className="text-sm font-bold">Active Members</p>
          <div className="rounded-full flex items-center justify-center size-[32px] border text-gray-400">
            <UserCheck size={20} />
          </div>
        </div>
        <div className="h-full flex flex-col justify-center items-center -mt-4">
          <p className="text-2xl font-semibold tracking-wide">
            {collaboratorDetails.counts.active_members}
          </p>
          <p className="text-sm mt-2">Currently Participating</p>
        </div>
      </Card>
      <Card className="p-5 text-center h-[180px]">
        <div className="flex w-full justify-between items-center">
          <p className="text-sm font-bold">Pending Invites</p>
          <div className="rounded-full flex items-center justify-center size-[32px] border text-gray-400">
            <Mail size={20} />
          </div>
        </div>
        <div className="h-full flex flex-col justify-center items-center -mt-4">
          <p className="text-2xl font-semibold tracking-wide">
            {collaboratorDetails.counts.pending_members}
          </p>
          <p className="text-sm mt-2">Awaiting Response</p>
        </div>
      </Card>
    </div>
  );
};

export default CollabStats;
