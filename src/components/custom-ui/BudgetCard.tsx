import { Event } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="p-8 text-center h-[217px]">
            <div className="flex w-full justify-between items-center">
              <p className="text-sm font-bold">Current Expenditure</p>
              <div className="rounded-full border-2 flex items-center justify-center size-[34px]">
                ₦
              </div>
            </div>
            <div className="h-full flex flex-col justify-center items-center -mt-4">
              <p className="text-2xl font-semibold tracking-wide">
                ₦{event.expenditure.current.toLocaleString()}
              </p>
              <p className="text-sm mt-2">Total Planned Cost</p>
            </div>
          </Card>

          <Card className="p-8 text-center h-[217px]">
            <div className="flex w-full justify-between items-center">
              <p className="text-sm font-bold">Completed</p>
              <div className="rounded-full border-2 flex items-center justify-center size-[34px]">
                ₦
              </div>
            </div>
            <div className="h-full flex flex-col justify-center items-center -mt-4">
              <p className="text-2xl font-semibold tracking-wide text-green-400">
                ₦{event.expenditure.completed.toLocaleString()}
              </p>
              <p className="text-sm mt-2">5 expenses tracked</p>
            </div>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
