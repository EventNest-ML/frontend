"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { budgetFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type FormValues = z.infer<typeof budgetFormSchema>;

export default function BudgetDialog({
  children,
  defaultValues,
  onSubmit,
}: {
  children: React.ReactNode;
  defaultValues?: Partial<FormValues>;
  onSubmit?: (task: FormValues) => void;
}) {
  const [open, setOpen] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(budgetFormSchema),
    defaultValues: {
      expenseName: defaultValues?.expenseName || "",
      assignTo: defaultValues?.assignTo || "",
      estimatedCost: defaultValues?.estimatedCost || "",
      actualCost: defaultValues?.actualCost || "",
      comment: defaultValues?.comment || "",
    },
  });

  function handleSubmit(values: FormValues) {
    if (onSubmit) onSubmit(values);
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="w-full !max-w-2xl rounded-2xl p-8">
        {/* <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader> */}

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Create New Expenses</CardTitle>
            <CardDescription>
              Fill in the details below to create a new budget for your event
              planning.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-4"
              >
                {/* Task Name + Assignee */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="expenseName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Expense Name"
                            className="rounded-xl bg-gray-400/10 py-6"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="assignTo"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Assign To"
                            className="rounded-xl bg-gray-400/10 py-6"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Due Date + Status */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="estimatedCost"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Estimated Cost"
                            className="rounded-xl bg-gray-400/10 py-6"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="actualCost"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Actual Cost"
                            className="rounded-xl bg-gray-400/10 py-6"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Description */}
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Comment(optional)"
                          className="rounded-xl bg-gray-400/10 p-4 h-36"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Actions */}
                <div className="flex justify-between gap-3 mt-6 min-w-[500px] mx-auto">
                  <Button
                    type="button"
                    variant="outline"
                    className="p-6 border border-[#B558FA] bg-[#B457FA4D] hover:bg-[#B457FA4D]/70 flex-1"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="p-6 bg-[#B558FA] hover:bg-[#B558FA]/70 flex-1"
                  >
                    Add Expenses
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
