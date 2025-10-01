import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const page = async () => {
  return (
    <div className="space-y-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Perference</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardContent className="space-y-5">
          <Card className="bg-transparent">
            <CardHeader>
              <CardTitle>
                <Link
                  href={`/dashboard/settings/profile-settings`}
                  className="hover:underline"
                >
                  Profile Settings
                </Link>
              </CardTitle>
              <CardDescription>
                Manage your personal information and account details
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-transparent">
            <CardHeader>
              <CardTitle>
                <Link
                  href={`/dashboard/settings/preference`}
                  className="hover:underline"
                >
                  Preference
                </Link>
              </CardTitle>
              <CardDescription>
                Set your language, time zone, and notification options
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-transparent">
            <CardHeader>
              <CardTitle>
                <Link
                  href={`/dashboard/settings/security`}
                  className="hover:underline"
                >
                  Security
                </Link>
              </CardTitle>
              <CardDescription>
                Protect your account and data management settings
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-transparent">
            <CardHeader>
              <CardTitle>
                <Link
                  href={`/dashboard/settings/support`}
                  className="hover:underline"
                >
                  Support
                </Link>
              </CardTitle>
              <CardDescription>
                Get help, explore FAQs, and contact support
              </CardDescription>
            </CardHeader>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
