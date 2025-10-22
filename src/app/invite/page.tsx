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
import { fetchEventById, acceptInvitation, declineInvitation, acceptInviteByToken, declineInviteByToken } from "@/lib/server-actions";
import type { Event } from "@/type";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const metadata = { robots: { index: false, follow: false } };

function formatDate(iso?: string | null) {
  if (!iso) return "N/A";
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "N/A";
  }
}

export default async function InvitePage({
  searchParams,
}: {
  searchParams: { eventId?: string; id?: string; token?: string; email?: string };
}) {
  const eventId = searchParams?.eventId || searchParams?.id || "";
  const cookieToken = (await cookies()).get("invite_token")?.value;
  const token = searchParams?.token || cookieToken;

  let event: Event | null = null;
  if (eventId) {
    const res: any = await fetchEventById(eventId);
    if ("shouldRedirect" in res && res.shouldRedirect) {
      redirect("/signin");
    } else {
      event = res as Event;
    }
  }

  async function acceptAction(formData: FormData) {
    "use server";
    const id = String(formData.get("eventId") || "");
    const tk = formData.get("token") ? String(formData.get("token")) : undefined;
    if (id) {
      await acceptInvitation(id, tk);
      return redirect(`/dashboard/event/${id}/home`);
    }
    if (tk) {
      await acceptInviteByToken(tk);
      return redirect(`/dashboard/home`);
    }
    return redirect("/dashboard");
  }

  async function declineAction(formData: FormData) {
    "use server";
    const id = String(formData.get("eventId") || "");
    const tk = formData.get("token") ? String(formData.get("token")) : undefined;
    if (id) {
      await declineInvitation(id, tk);
      return redirect(`/dashboard`);
    }
    if (tk) {
      await declineInviteByToken(tk);
      return redirect(`/dashboard`);
    }
    return redirect(`/dashboard`);
  }

  return (
    <section className="w-full max-w-[1000px] mx-auto flex flex-col gap-10  p-7 md:px-20">
      <div className="w-full flex justify-between items-center">
        <LogoIcon width={36} height={36} />
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
            <Image src={"/avatar.png"} alt="avatar" width={36} height={36} className="rounded-full" />
          </Link>
        </div>
      </div>

      <div className="relative h-[370px] w-full rounded-md overflow-hidden bg-gradient-to-br from-purple-900/60 via-purple-700/40 to-indigo-800/60 flex items-center justify-center">
        <ImageOff className="text-white/70" size={60} />

        <div className="bg-white p-8 space-y-4 max-w-[800px] rounded-xl absolute bottom-2 ">
          <h1 className="font-bold">{event?.name ?? "Event"}</h1>

          <div className="grid grid-cols-5 gap-4">
            <div className="space-y-3 text-sm col-span-2">
              <p>
                <span className="font-bold">Venue: </span> {event?.location || "Not set"}
              </p>
              <p>
                <span className="font-bold">Collaborators: </span> {event?.collaborators?.length ?? 0}
              </p>
            </div>
            <div className="space-y-3 text-sm col-span-2">
              <p>
                <span className="font-bold">Start Date: </span> {formatDate(event?.start_date ?? event?.date)}
              </p>
              <p>
                <span className="font-bold">End Date: </span> {formatDate(event?.end_date ?? event?.date)}
              </p>
            </div>
            <Badge className="border border-[#B457FA4D] bg-transparent w-fit h-fit text-black ml-auto">Event</Badge>
          </div>
        </div>
      </div>

      <BudgetCard event={event ?? undefined} showBudgetStats={false} />
      <Card className="flex-1">
        <div className="w-full flex justify-between items-center">
          <CardHeader className="flex-1">
            <CardTitle className="font-semibold">Team Collaborators</CardTitle>
          </CardHeader>
        </div>
        <Suspense fallback={<CardContent className="text-black">Loading...</CardContent>}>
          {eventId ? <CollaboratorsCard id={eventId} /> : <CardContent>No event selected</CardContent>}
        </Suspense>
      </Card>
      <Card className="bg-transparent shadow-none">
        <CardHeader>
          <CardTitle className="text-center">You have been invited to collaborate on this event</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="w-fit mx-auto space-x-5">
            <input type="hidden" name="eventId" value={eventId} />
            {token ? <input type="hidden" name="token" value={token} /> : null}
            <Button className="bg-[#B558FA] hover:bg-[#B558FA]/90" formAction={acceptAction}>
              Accept Invitation
            </Button>
            <Button variant={"outline"} className="border-[#8A3BEF] bg-transparent" formAction={declineAction}>
              Decline Invitation
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
