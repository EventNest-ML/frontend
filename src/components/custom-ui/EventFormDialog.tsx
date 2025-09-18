"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Plus } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

/* ----------------- Validation Schema ----------------- */
const formSchema = z.object({
  eventName: z.string().min(2, "Event name is required"),
  budget: z.string().optional(),
  venue: z.string().optional(),
  eventType: z.string().nonempty("Select an event type"),
  description: z.string().optional(),
  startDate: z.string().nonempty("Start date required"),
  endDate: z.string().nonempty("End date required"),
  collaborators: z.array(z.string().email()).optional(),
  image: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

/* ----------------- Component ----------------- */
export default function CreateEventDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [preview, setPreview] = React.useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: "",
      budget: "",
      venue: "",
      eventType: "",
      description: "",
      startDate: "",
      endDate: "",
      collaborators: [],
      image: null,
    },
  });

  function onSubmit(values: FormValues) {
    console.log("Create event payload:", values);
    setOpen(false);
  }

  const handleFileChange = (file?: File) => {
    if (!file) return;
    form.setValue("image", file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // helper to add collaborator from inline input
  const addCollaborator = (email: string) => {
    if (!email) return;
    const current = form.getValues("collaborators") ?? [];
    form.setValue("collaborators", [...current, email]);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="w-full !max-w-5xl p-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Left column */}
            <Card>
              <ScrollArea className="h-full md:max-h-[400px] overflow-auto flex flex-col gap-8 px-5">
                <DialogHeader>
                  <DialogTitle>New Event</DialogTitle>
                </DialogHeader>
                <FormField
                  control={form.control}
                  name="image"
                  render={() => (
                    <FormItem className="mb-4">
                      <FormControl>
                        <div className="flex justify-center">
                          <label className="w-32 h-32 flex items-center justify-center rounded-full border-2 border-dashed cursor-pointer bg-muted/20 overflow-hidden">
                            {preview ? (
                              <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Camera className="w-10 h-10 text-muted-foreground" />
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileChange(e.target.files?.[0])
                              }
                            />
                          </label>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="eventName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="input-field rounded-full"
                            placeholder="Event Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="input-field rounded-full"
                            type="number"
                            placeholder="Budget"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="venue"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="input-field rounded-full"
                            placeholder="Venue"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="eventType"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={(val) => field.onChange(val)}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="input-field rounded-full">
                              <SelectValue placeholder="Choose event type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="conference">
                                Conference
                              </SelectItem>
                              <SelectItem value="wedding">Wedding</SelectItem>
                              <SelectItem value="party">Party</SelectItem>
                              <SelectItem value="workshop">Workshop</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormControl>
                          <Textarea
                            className="input-field"
                            placeholder="Description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Dates row with icon positioned */}
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                            <Input
                              type="date"
                              {...field}
                              className="input-field rounded-full flex"
                            aria-label="Start date"
                            />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="date"
                              {...field}
                              className="input-field rounded-full"
                              aria-label="End date"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </ScrollArea>
            </Card>

            {/* Right column: Collaborators + actions */}
            <div className="flex flex-col gap-4">
              <Card className="rounded-lg p-4 gap-0">
                <h3 className="text-lg font-medium">Invite Collaborators</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Add people to help plan this event
                </p>

                <FormField
                  control={form.control}
                  name="collaborators"
                  render={() => (
                    <FormItem>
                      <div className="flex gap-2">
                        <Input
                          className="input-field rounded-full pr-10"
                          placeholder="Email"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              const input = e.currentTarget as HTMLInputElement;
                              const value = input.value.trim();
                              if (value) {
                                addCollaborator(value);
                                input.value = "";
                              }
                            }
                          }}
                        />
                        <Button
                          type="button"
                          className="bg-[#B558FA] hover:bg-[#B558FA]/70"
                          onClick={() => {
                            // try to grab email from the previous sibling input
                            const el = (
                              document.activeElement as HTMLElement
                            )?.querySelector("input");
                            // fallback — no reliable ref here, user can press Enter instead
                          }}
                        >
                          Invite
                        </Button>
                      </div>

                      <>
                        <h3 className="text-lg font-medium mt-2">
                          Added Collaborator
                        </h3>
                        <div className="flex gap-2 mt-2 items-center">
                          {(form.watch("collaborators") ?? []).map(
                            (email, idx) => (
                              <div
                                key={idx}
                                className="w-10 h-10 flex items-center justify-center rounded-full border-2 bg-gray-100/80 border-dashed text-sm"
                                title={email}
                              >
                                {email[0]?.toUpperCase() ?? "?"}
                              </div>
                            )
                          )}

                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="bg-gray-100/80 border-2 border-dashed rounded-full"
                            onClick={() => {
                              // quick dummy action to open a modal or similar to add people
                            }}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </>
                    </FormItem>
                  )}
                />
              </Card>

              {/* Actions area */}
              <Card className="mt-auto rounded-lg p-4 flex-row gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="input-field flex-1"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-full bg-[#B558FA] flex-1"
                >
                  Create Event
                </Button>
              </Card>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
