import { Event } from "@/type";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import BudgetStats from "./BudgetStats";
import { demoEvents } from "@/lib/data";

export default function BudgetCard({
  event,
  showBudgetStats = true,
}: {
  event?: Event;
  showBudgetStats?: boolean;
}) {
  const dummyEvent = demoEvents[0];
  const budgetAmount =
    typeof event?.budget_amount === "number"
      ? event?.budget_amount
      : Number(event?.budget_amount ?? 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Budget</CardTitle>
      </CardHeader>

      <CardContent>
        {/* Estimated Budget */}
        <div className="bg-[#B558FA] rounded-xl p-8 text-center mb-4 text-white h-[217px]">
          <div className="flex w-full justify-between items-center">
            <p className="text-sm font-bold">Estimated Budget</p>
            <div className="rounded-full border border-white flex items-center justify-center size-[34px]">
              ₦
            </div>
          </div>
          <div className="h-full flex flex-col justify-center items-center -mt-4">
            <p className="text-2xl font-semibold tracking-wide">
              ₦{Number(budgetAmount || 0).toLocaleString()}
            </p>
            <p className="text-sm mt-2">Total Planned Cost</p>
          </div>
        </div>

        {/* Expenditure Details */}
        {showBudgetStats && dummyEvent?.expenditure && (
          <BudgetStats event={dummyEvent} />
        )}
      </CardContent>
    </Card>
  );
}
