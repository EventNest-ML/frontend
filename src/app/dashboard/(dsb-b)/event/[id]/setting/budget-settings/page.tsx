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
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div className="space-y-6 w-full">
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
                  ₦0.00
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Current Expenditure
                </span>
                <span className="font-medium p-3 py-2 rounded-md border border-[#8A3BEF]">
                  ₦0.00
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Balance</span>
                <span className="font-medium p-3 py-2 rounded-md border border-[#8A3BEF] text-green-500">
                  ₦0.00
                </span>
              </div>
            </CardContent>
          </Card>
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
