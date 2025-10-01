import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Filter, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { CommentSectionSheet } from "./CommentSection";

const BudgetDashboard = () => {
  return (
    <Card className="w-full mt-10">
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-3 p-4 md:p-6">
        <CardHeader className="w-full p-0">
          <CardTitle>Expense Breakdown</CardTitle>
          <CardDescription>Detailed view of all event expenses</CardDescription>
        </CardHeader>
        <div className="w-full md:w-fit pt-2 md:pt-0 md:pr-6">
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-auto min-w-[140px] h-12 px-4 border border-[#B457FA4D] rounded-md shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="text-gray-800 font-medium">Filter:</span>
                <SelectValue className="text-gray-800" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl border border-gray-200 shadow-lg">
              <SelectItem
                value="all"
                className="cursor-pointer"
              >
                All
              </SelectItem>
              <SelectItem
                value="active"
                className="cursor-pointer"
              >
                Active
              </SelectItem>
              <SelectItem
                value="inactive"
                className="cursor-pointer"
              >
                Inactive
              </SelectItem>
              <SelectItem
                value="pending"
                className="cursor-pointer"
              >
                Pending
              </SelectItem>
              <SelectItem
                value="completed"
                className="cursor-pointer"
              >
                Completed
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* budget table */}
      <CardContent className="space-y-5 p-4 md:p-6">
        {/* Table headers - hidden on mobile, shown on desktop */}
        <div className="hidden md:flex w-full justify-between relative rounded-md p-4 border border-[#B457FA4D] bg-[#B457FA0D]">
          <div className="flex-1 font-semibold">Expense Item</div>
          <div className="flex-1 text-center font-semibold">Estimated Cost</div>
          <div className="flex-1 text-center font-semibold">Actual Cost</div>
          <div className="flex-1 text-center font-semibold">Status</div>
        </div>

        {/* Expense Item - Mobile optimized table layout */}
        <div className="flex flex-col md:flex-row justify-between items-stretch border rounded-lg p-4 gap-4 md:gap-0 border-[#B457FA4D] bg-[#B457FA0D] ">
          {/* Expense Item Details */}
          <div className="flex-1">
            <div className="font-medium tracking-wider mb-2">Venue Booking</div>
            <div className="flex flex-wrap gap-4">
              {/* Collaborator */}
              <div className="flex gap-3 items-center">
                <Avatar className="rounded-lg size-[30px]">
                  <AvatarFallback className="text-[12px]">ER</AvatarFallback>
                </Avatar>
                <CardDescription>Erin Robinson</CardDescription>
              </div>
              {/* Comments */}
              <div className="flex gap-2 items-center">
                <MessageCircle
                  size={20}
                  className="text-black/40"
                />
                <CardDescription>0</CardDescription>
              </div>
            </div>
          </div>

          {/* Cost columns - arranged horizontally on mobile */}
          <div className="flex flex-row md:flex-col justify-between md:justify-center md:flex-1 md:text-center">
            <div className="md:hidden text-xs text-gray-500">Estimated:</div>
            <div className="font-semibold">₦1,000,000</div>
          </div>

          <div className="flex flex-row md:flex-col justify-between md:justify-center md:flex-1 md:text-center">
            <div className="md:hidden text-xs text-gray-500">Actual:</div>
            <div className="font-semibold">₦1,200,000</div>
          </div>

          {/* Action Buttons - full width on mobile */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:flex-1 md:justify-center">
            <div className="flex md:items-center gap-3 w-full md:w-fit md:mx-auto">
              <Button
                size="sm"
                variant="outline"
                className="bg-transparent border-[#FF0000] w-full md:w-auto justify-center flex-1"
              >
                Pending
              </Button>
              <CommentSectionSheet
                task={{
                  dueDate: "2024-12-01",
                  eventName: "Venue Booking",
                  status: "TODO",
                  assignee: 1,
                  id: 1,
                }}
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-[#8A3BEF] w-full md:w-auto justify-center flex-1"
                >
                  Comment
                </Button>
              </CommentSectionSheet>
            </div>
          </div>
        </div>

        {/* Additional expense items would follow the same pattern */}
      </CardContent>
    </Card>
  );
};

export default BudgetDashboard;
