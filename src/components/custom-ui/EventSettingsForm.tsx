"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
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
import { CalendarIcon, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useUserEvents, useUpdateEvent } from "@/hooks/query";
import { EventDetails } from "@/type";
import { useEffect } from "react";
import { toast } from "sonner";
import { eventFormSchema } from "@/lib/schema";

type FormValues = z.infer<typeof eventFormSchema>;

const EventSettingsForm = ({ eventId }: { eventId: string }) => {
  const { data: eventDetails } = useUserEvents();
  const { mutateAsync: updateEvent, isPending } = useUpdateEvent();

  const events = (eventDetails as EventDetails)?.events ?? [];
  const event = events.find((e) => e.id === eventId);

  const form = useForm<FormValues>({
    resolver: zodResolver(eventFormSchema),
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

  useEffect(() => {
    if (event) {
      form.reset({
        eventName: event.name,
        budget: "",
        venue: event.location || "",
        eventType: "",
        description: event.notes || "",
        startDate: event.date ? event.date.split("T")[0] : "",
        endDate: event.date ? event.date.split("T")[0] : "",
        collaborators: [],
        image: null,
      });
    }
  }, [event, form]);

  if (!eventDetails) return <p>Loading...</p>;

  if (!event) return <p>Event not found</p>;

  async function onSubmit(values: FormValues) {
    try {
      await updateEvent({
        id: event?.id || "",
        name: values.eventName,
        date: values.startDate,
        location: values.venue,
        notes: values.description,
      });
      toast.success("Event updated successfully");
    } catch (err) {
      toast.error("Failed to update event");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
            <CardDescription>
              Manage your event&apos;s basic information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-5">
              {/* Event Name */}
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

              {/* Budget */}
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

              {/* Venue */}
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

              {/* Event Type */}
              <FormField
                control={form.control}
                name="eventType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="input-field rounded-full">
                          <SelectValue placeholder="Choose event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conference">Conference</SelectItem>
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

              {/* Description */}
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

              {/* Dates */}
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="date"
                          className="pr-10 [appearance:none] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full input-field rounded-full"
                          {...field}
                          {...field}
                        />
                        <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      </div>
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
                          className="pr-10 [appearance:none] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full input-field rounded-full"
                          {...field}
                        />
                        <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        <div className="w-fit ml-auto">
          <button
            type="submit"
            disabled={isPending}
            className="mt-4 bg-[#B558FA] text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {isPending ? <Loader className="animate-spin"/> : "Save Changes"}
          </button>
        </div>
      </form>
    </Form>
  );
};

export default EventSettingsForm;
