import BackButton from "@/components/custom-ui/BackButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="space-y-6 w-full">
      <BackButton/>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Profile Settings</CardTitle>
          <CardDescription>
            Manage your personal information and account details
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Profile Picture</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row gap-4 items-center ">
          <div className="size-[150px] rounded-full bg-[#B457FA0D] flex items-center justify-center">
            <Image
              src="/avatar.png"
              alt="Avatar"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="bg-transparent"
            >
              Upload new photo
            </Button>
            <Button
              variant="outline"
              className="text-red-400 bg-transparent"
            >
              Remove Photo
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Event Budget
          </CardTitle>
          <CardDescription>
            Set your total event budget and preferred currency.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
              <label className="text-sm font-medium mb-2">Fist Name</label>
              <Input
                placeholder="First Name"
                className="input-field"
              />
            </div>
            <div className="w-full">
              <label className="text-sm font-medium mb-2">Last Name</label>
              <Input
                placeholder="Last Name"
                className="input-field"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
              <label className="text-sm font-medium mb-2">Email</label>
              <Input
                placeholder="eventnest123@gmail.com"
                className="input-field"
              />
            </div>
            <div className="w-full">
              <label className="text-sm font-medium mb-2">Phone Number (optional)</label>
              <Input
                placeholder="+123 456 7890"
                className="input-field"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="w-full flex justify-end">
        <Button className="w-fit py-6 bg-[#8A3BEF] text-white">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default page;
