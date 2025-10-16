import BackButton from "@/components/custom-ui/BackButton";
import DeleteCollaboratorConfirmationDialog from "@/components/custom-ui/DeleteCollaboratorConfirmationDialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Crown, User, UserX } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="space-y-6">
      <BackButton/>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Collaborators Management</CardTitle>
          <CardDescription>
            Manage who has access to your event and their roles
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown /> Event Creator
          </CardTitle>
          <CardDescription>
            The event creator has full control over the event and cannot be
            removed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Card className="bg-transparent flex-row justify-between">
            <CardHeader className="flex gap-4 items-center  flex-1">
              <Avatar>
                <AvatarFallback className="bg-[#B558FA] text-white">
                  JA
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <CardTitle>Jumoke Adeyemi</CardTitle>
                <CardDescription>jumokeadeyem@gmail.com</CardDescription>
              </div>
            </CardHeader>
            <Badge className="bg-transparent border border-[#B457FA4D]  m-0 text-black text-[15px] mr-6">
              <Crown className="w-[24px] h-[24px]" /> Event Creator
            </Badge>
          </Card>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User /> Collaborators (1)
          </CardTitle>
          <CardDescription>
            Team members who can help plan your event
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Card className="bg-transparent flex-row justify-between">
            <CardHeader className="flex gap-4 items-center  flex-1">
              <Avatar>
                <AvatarFallback className="bg-[#B457FA4D] text-white">
                  JA
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <CardTitle>Amina Musa</CardTitle>
                <CardDescription>aminamusa@gmail.com</CardDescription>
              </div>
            </CardHeader>
            <div className="flex gap-7 items-center mr-6">
              <Badge className="bg-transparent border border-[#B457FA4D] m-0 text-black text-[15px] p-4 py-[10px]">
                Event Creator
              </Badge>
              <DeleteCollaboratorConfirmationDialog>
                <UserX />
              </DeleteCollaboratorConfirmationDialog>
            </div>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
