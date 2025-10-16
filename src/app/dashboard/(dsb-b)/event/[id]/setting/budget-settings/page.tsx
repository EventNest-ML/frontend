"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
// Removed unused imports
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUpdateEvent, useUserEvents } from "@/hooks/query";
import { EventDetails } from "@/type";
import { toast } from "sonner";

const Page = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: eventDetails } = useUserEvents();
  const { mutateAsync: updateEvent, isPending } = useUpdateEvent();

  const id = String(params?.id ?? "");
  const events = (eventDetails as EventDetails)?.events ?? [];
  const event = useMemo(() => events.find((e) => e.id === id), [events, id]);

  const [budget, setBudget] = useState<string>("");

  useEffect(() => {
    if (event?.budget_amount !== undefined && event?.budget_amount !== null) {
      setBudget(String(event.budget_amount));
    }
  }, [event]);

  async function onSave() {
    try {
      const amount = budget.trim() === "" ? undefined : Number(budget);
      await updateEvent({ id, budget_amount: amount });
      toast.success("Budget updated successfully");
      router.push(`/dashboard/event/${id}/home`);
    } catch {
      toast.error("Failed to update budget");
    }
  }

  const estimatedBudget = Number(budget || event?.budget_amount || 0);
  const currentExpenditure = 0; // TODO: wire real expenditure when backend is ready
  const balance = Math.max(estimatedBudget - currentExpenditure, 0);

  if (!eventDetails) {
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Loading Budget Settings…</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Event not found</CardTitle>
            <CardDescription>We couldn’t find this event.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      <BackButton/>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Budget & Currency</CardTitle>
          <CardDescription>
            Set your event, budget, currency preferences, and enable budget
            tracking
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="flex-row items-center justify-between">
        <CardHeader className="flex-1">
          <CardTitle className="flex items-center gap-2">
            Budget Tracking
          </CardTitle>
          <CardDescription>
            Enable or disable budget tracking for this event.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Switch className="w-14 h-8 cursor-pointer" />
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
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
              <label className="text-sm font-medium mb-2">
                Estimated Budget
              </label>
              <Input
                placeholder="Estimated Budget"
                className="rounded-xl bg-gray-400/10 py-6"
                type="number"
                min={0}
                step={1}
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label className="text-sm font-medium mb-2">Currency</label>
              <Select>
                <SelectTrigger className="rounded-xl bg-gray-400/10 py-6 w-full">
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="naira">Naira ₦</SelectItem>
                  <SelectItem value="dollar">Dollar $</SelectItem>
                  <SelectItem value="euro">Euro £</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardContent>
          <Card className="bg-transparent shadow-none  ">
            <CardHeader className="flex gap-4 items-center  flex-1">
              <CardTitle>Budget Summary</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Estimated Budget
                </span>
                <span className="font-medium p-3 py-2 rounded-md bg-[#8A3BEF] text-white">
                  ₦{Number(estimatedBudget).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Current Expenditure
                </span>
                <span className="font-medium p-3 py-2 rounded-md border border-[#8A3BEF]">
                  ₦{Number(currentExpenditure).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Balance</span>
                <span className="font-medium p-3 py-2 rounded-md border border-[#8A3BEF] text-green-500">
                  ₦{Number(balance).toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      <div className="w-full flex justify-end">
        <Button
          onClick={onSave}
          disabled={isPending}
          className="w-fit py-6 bg-[#8A3BEF] text-white disabled:opacity-50"
        >
          {isPending ? "Saving…" : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default Page;
