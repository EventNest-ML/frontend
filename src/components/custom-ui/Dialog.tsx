import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger
} from "@/components/ui/dialog";
import { Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function CustomDialog({children, title}: {children: React.ReactNode, title: string}) {
  return (
    <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px] p-8">
          <Card>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center rounded-full size-[100px] mx-auto border border-[#B457FA4D]">
              <Lock className="size-[50px]" />
            </CardContent>
              <DialogDescription className="text-center">{title} is currently not available</DialogDescription>
          </Card>
        </DialogContent>
    </Dialog>
  );
}
