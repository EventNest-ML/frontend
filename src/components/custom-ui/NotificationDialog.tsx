import { Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";

export function NotificationDialog({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="!w-[385px] p-4">
        <Card className="bg-transparent border-black/20 shadow-none">
          <CardHeader>
            <CardTitle>Notification</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[140px]">
              <ul className="space-y-3">
                <li className="flex items-center gap-3 p-2 px-4 rounded-md border">
                  <div className="rounded-full size-[36px] flex justify-center items-center border border-gray-400">
                    <Bell className="text-gray-400 size-[20px]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Payment Update</p>
                    <p className="text-xs text-gray-500">
                      Wedding cake status updated
                    </p>
                    <p className="text-xs text-gray-400">1 hour ago</p>
                  </div>
                </li>
              </ul>
            </ScrollArea>
            <Button variant={"outline"} className="w-full mt-4 bg-transparent">Mark all as read</Button>
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
