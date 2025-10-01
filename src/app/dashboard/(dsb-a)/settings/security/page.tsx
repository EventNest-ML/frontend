"use client";
import BackButton from "@/components/custom-ui/BackButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash, Upload } from "lucide-react";
import React, { useState } from "react";

const SettingsPage = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="space-y-6">
      <BackButton />
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Security</CardTitle>
          <CardDescription>
            Manage your account security and data management
          </CardDescription>
        </CardHeader>
      </Card>
      {/* Account Security */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Account Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Card className="flex-row justify-between items-center bg-transparent shadow-none">
            <CardHeader className="flex-1">
              <CardTitle>Password</CardTitle>
              <CardDescription>Last updated 2months ago</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant={"outline"}
                className="border-[#8A3BEF] bg-transparent"
                onClick={() => setShowForm(!showForm)}
              >
                Change Password
              </Button>
            </CardContent>
          </Card>
          <div className="transition-all duration-300 ease-in-out space-y-4">
            {showForm && (
              <>
                <div className="space-y-4 w-full max-w-[500px] mx-auto">
                  <Input
                    placeholder="Old Password"
                    type="password"
                    className="input-field"
                  />
                  <Input
                    placeholder="New Password"
                    type="password"
                    className="input-field"
                  />
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    className="input-field"
                  />
                </div>
                <div className="flex items-center justify-center gap-4">
                  <Button className="bg-[#8A3BEF] hover:bg-[#8A3BEF]/80 p-3">
                    Save Changes
                  </Button>
                  <Button
                    variant={"outline"}
                    className="bg-transparent border-[#8A3BEF]"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Data Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Card className="flex-row justify-between items-center bg-transparent shadow-none">
            <CardHeader className="flex-1">
              <CardTitle>Download your data</CardTitle>
              <CardDescription>
                Get a copy of all your EventNest data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant={"outline"}
                className="border-[#8A3BEF] bg-transparent"
              >
                <Upload /> Request Download
              </Button>
            </CardContent>
          </Card>
          <Card className="flex-row justify-between items-center bg-transparent shadow-none">
            <CardHeader className="flex-1">
              <CardTitle>Data Retention</CardTitle>
              <CardDescription>
                How long we keep your data after account deletion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Badge
                variant={"outline"}
                className="border-[#8A3BEF] bg-[#B457FA4D] p-3"
              >
                30 days
              </Badge>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      {/* Danger Zone */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Card className="flex-row justify-between items-center bg-transparent shadow-none">
            <CardHeader className="flex-1">
              <CardTitle>Delete Account</CardTitle>
              <CardDescription>
                Permanently delete your account and all associated data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant={"destructive"}>
                <Trash /> Delete Account
              </Button>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
