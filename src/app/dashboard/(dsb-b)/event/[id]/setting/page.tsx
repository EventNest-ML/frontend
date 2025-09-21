import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div className="space-y-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Settings</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardContent className="space-y-5">
          <Card className="bg-transparent">
            <CardHeader>
              <CardTitle>
                <Link
                  href={`/dashboard/event/${id}/setting/general-info`}
                  className="hover:underline"
                >
                  General Info
                </Link>
              </CardTitle>
              <CardDescription>
                Update your event&apos;s basic details and cover image
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-transparent">
            <CardHeader>
              <CardTitle>
                <Link
                  href={`/dashboard/event/${id}/setting/collaborator-management`}
                  className="hover:underline"
                >
                  Collaborator Management
                </Link>
              </CardTitle>
              <CardDescription>
                Manage who has access to your event and their roles
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-transparent">
            <CardHeader>
              <CardTitle>
                <Link
                  href={`/dashboard/event/${id}/setting/budget-settings`}
                  className="hover:underline"
                >
                  Budget Settings
                </Link>
              </CardTitle>
              <CardDescription>
                Configure budget tracking and financial preferences for your
                event
              </CardDescription>
            </CardHeader>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
