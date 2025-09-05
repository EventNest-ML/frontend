"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import GradientButton from "@/components/ui/GradientButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PasswordInput from "./PasswordInput";
import Link from "next/link";

const resetSchema = z
  .object({
    new_password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirm_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match.",
    path: ["confirm_password"],
  });

type ResetFormValues = z.infer<typeof resetSchema>;

export default function PasswordResetForm({
  uid,
  token,
}: {
  uid?: string;
  token?: string;
}) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: { new_password: "", confirm_password: "" },
  });

  const onSubmit = async (values: ResetFormValues) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!uid || !token) {
      setErrorMessage("Invalid or missing reset link.");
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid,
          token,
          new_password: values.new_password,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setSuccessMessage(data.message ?? "Password reset successful.");
        form.reset();
      } else {
        const errorData = await res.json();
        setErrorMessage(errorData.message ?? "Something went wrong.");
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        {successMessage && (
          <div className="text-center w-full py-4 bg-green-400/10 rounded-t-lg">
            <p className="text-green-600 text-[14px]">{successMessage}</p>
          </div>
        )}
        {errorMessage && (
          <div className="text-center w-full py-4 bg-red-400/10 rounded-t-lg">
            <p className="text-red-600 text-[14px]">{errorMessage}</p>
          </div>
        )}

        <FormField
          control={form.control}
          name="new_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter new password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Confirm new password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <GradientButton
          type="submit"
          className="w-full py-[15px]"
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="size-[16px] animate-spin" />
          ) : (
            "Reset Password"
          )}
        </GradientButton>

        <p className="text-center mt-4">
          Back to Login?{" "}
          <Link
            href={"/signin"}
            className="font-semibold hover:underline "
          >
            Login
          </Link>
        </p>
      </form>
    </Form>
  );
}
