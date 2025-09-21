import EventSettingsForm from "@/components/custom-ui/EventSettingsForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div className="space-y-5 overflow-hidden">
      <Button
        variant={"ghost"}
        asChild
      >
        <Link href={"./"}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">General Info</CardTitle>
          <CardDescription>
            Update your event&apos;s basic details and cover image
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Event Cover Image</CardTitle>
          <CardDescription>
            Upload a beautiful cover image for your event
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full bg-gray-400/20 animate-pulse rounded-md" />
        </CardContent>
      </Card>
      <EventSettingsForm />
    </div>
  );
};

export default page;
