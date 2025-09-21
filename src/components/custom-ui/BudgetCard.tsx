import { Event } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import BudgetStats from "./BudgetStats";

export default function BudgetCard({ event }: { event: Event }) {
  if (!event.budget || !event.expenditure) return null;

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
              ₦{event.budget.toLocaleString()}
            </p>
            <p className="text-sm mt-2">Total Planned Cost</p>
          </div>
        </div>

        {/* Expenditure Details */}
       <BudgetStats event={event}/>
      </CardContent>
    </Card>
  );
}
