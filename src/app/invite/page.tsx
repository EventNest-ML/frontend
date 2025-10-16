import BudgetCard from "@/components/custom-ui/BudgetCard";
import CollaboratorsCard from "@/components/custom-ui/CollaboratorCard";
import { LogoIcon } from "@/components/custom-ui/Logo";
import { NotificationDialog } from "@/components/custom-ui/NotificationDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

const page = () => {
  return (
    <section className="w-full max-w-[1000px] mx-auto flex flex-col gap-10  p-7 md:px-20">
      <div className="w-full flex justify-between items-center">
        <LogoIcon
          width={36}
          height={36}
        />
        <div className="flex gap-4">
          <NotificationDialog>
            <div className="size-[46px] bg-[#B457FA0D] hover:bg-[#b357fa1f] transition-all duration-300 ease-in-out flex justify-center items-center rounded-full cursor-pointer">
              <Bell className="animate" />
            </div>
          </NotificationDialog>
          <Link
            href={"/dashboard/settings/profile-settings"}
            className="size-[46px] bg-[#B457FA0D] hover:bg-[#b357fa1f] transition-all duration-300 ease-in-out flex justify-center items-center rounded-full"
          >
            <Image
              src={"/avatar.png"}
              alt="avatar"
              width={36}
              height={36}
              className="rounded-full"
            />
          </Link>
        </div>
      </div>

      <div className="relative h-[370px] w-full rounded-md overflow-hidden bg-gradient-to-br from-purple-900/60 via-purple-700/40 to-indigo-800/60 flex items-center justify-center">
        <ImageOff
          className="text-white/70"
          size={60}
        />

        <div className="bg-white p-8 space-y-4 max-w-[800px] rounded-xl absolute bottom-2 ">
          <h1 className="font-bold">Bola&apos;s Wedding</h1>

          <div className="grid grid-cols-5 gap-4">
            <div className="space-y-3 text-sm col-span-2">
              <p>
                <span className="font-bold">Golden Hall: </span> 8 apple street,
                Amuodofin
              </p>
              <p>
                <span className="font-bold">Golden Hall: </span> 8 apple street,
                Amuodofin
              </p>
            </div>
            <div className="space-y-3 text-sm col-span-2">
              <p>
                <span className="font-bold">Golden Hall: </span> 8 apple street,
                Amuodofin
              </p>
              <p>
                <span className="font-bold">Golden Hall: </span> 8 apple street,
                Amuodofin
              </p>
            </div>
            <Badge className="border border-[#B457FA4D] bg-transparent w-fit h-fit text-black ml-auto">
              Wedding
            </Badge>
          </div>
        </div>
      </div>
      <BudgetCard showBudgetStats={false} />
      <Card className="flex-1">
        <div className="w-full flex justify-between items-center">
          <CardHeader className="flex-1">
            <CardTitle className="font-semibold">Team Collaborators</CardTitle>
          </CardHeader>
        </div>
        <Suspense
          fallback={
            <CardContent className="text-black">Loading...</CardContent>
          }
        >
          <CollaboratorsCard id={"25f22dfd-87a4-4964-b041-0ab117cc0e37"} />
        </Suspense>
      </Card>
      <Card className="bg-transparent shadow-none">
        <CardHeader>
          <CardTitle className="text-center">
            You have been invited to collaborate on this event
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-fit mx-auto space-x-5">
            <Button className="bg-[#B558FA] hover:bg-[#B558FA]/90">
              Accept Invitation
            </Button>
            <Button
              variant={"outline"}
              className="border-[#8A3BEF] bg-transparent"
            >
              Decline Invitation
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default page;
