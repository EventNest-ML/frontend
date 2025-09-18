"use client";

import React from "react";
import { Task } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Calendar, User } from "lucide-react";
import { Separator } from "../ui/separator";

export function CommentSectionSheet({
  children,
  task,
}: {
  children: React.ReactNode;
  task: Task;
}) {
  const [comment, setComment] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    console.log("New comment:", comment);
    // You can hook this up to API call / state management here
    setComment("");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="pt-7 flex flex-col gap-0">
        {/* Header */}
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">{task.title}</SheetTitle>
          <SheetDescription className="mt-3">
            <h1 className="text-lg font-semibold">Description</h1>
            <span>Secure the venue for the event and mak payment</span>
            <div className="flex w-full justify-between items-center mt-6">
              <div className="flex gap-2">
                <User size={18} /> <span>Assigne</span>
              </div>
              <div className="flex gap-2">
                <Calendar size={18} /> <span>Due Date</span>
              </div>
              <div className="flex gap-2">
                <span>Status</span>
              </div>
            </div>
            <div className="flex w-full justify-between items-center mt-4">
              <div className="flex gap-2">
                <span>Amina Musa</span>
              </div>
              <div className="flex gap-2">
                <span>{task.dueDate}</span>
              </div>
              <div className="flex gap-2">
                <span>{task.status}</span>
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>

        <Separator className="my-4" />

        {/* Comments Section */}
        <div className="flex-1 flex flex-col gap-6 px-2 overflow-y-auto">
          <h1 className="text-lg font-bold">Comments (0)</h1>
          <div className="flex-1 text-sm text-muted-foreground flex items-center justify-center">
            No comments yet.
          </div>
        </div>
        {/* Footer with input */}
        <SheetFooter className="mt-4">
        <Separator />
          <form
            onSubmit={handleSubmit}
            className="flex w-full items-center gap-3"
          >
            <Input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 rounded-xl bg-black/5"
            />
            <Button
              type="submit"
              className="bg-[#B558FA] hover:bg-[#B558FA]/80 text-white rounded-xl px-6"
            >
              Send
            </Button>
          </form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
