import BudgetDashboard from "@/components/custom-ui/BudgetDashboard";
import BudgetDialog from "@/components/custom-ui/BudgetFormDialog";
import BudgetStats from "@/components/custom-ui/BudgetStats";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { demoEvents } from "@/lib/data";
import { Plus, Upload } from "lucide-react";

export default async function TasksPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const event = demoEvents.find((e) => e.eventId === id);

  if (!event) {
    return (
      <Card className="w-full mt-10">
        <CardHeader>
          <CardTitle>Event not found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            We couldn’t find an event with ID{" "}
            <span className="font-mono">{id}</span>.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="gap-0 flex-row justify-between items-center">
        <CardHeader className="w-full">
          <CardTitle>Budget</CardTitle>
          <CardDescription>
            Track your event spending and budget progress
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-3">
          <BudgetDialog>
            <Button className="bg-[#B558FA] hover:bg-[#B558FA]/80 py-3">
              Add Expenses <Plus />
            </Button>
          </BudgetDialog>
            <Button className="bg-[#B558FA] hover:bg-[#B558FA]/80 py-3">
              Export <Upload />
            </Button>
        </CardContent>
      </Card>

      <BudgetStats event={event} showEstimatedBudget/>

      <BudgetDashboard/>
    </div>
  );
}
