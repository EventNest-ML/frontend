"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import GradientButton from "@/components/ui/GradientButton";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        const data = await res.json();
        setSuccessMessage(
          data.message ?? "Password reset link sent to your email."
        );
        form.reset();
      } else {
        const errorData = await res.json();
        setErrorMessage(
          errorData.message ?? "Something went wrong. Try again."
        );
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
            <p className="text-green-600 text-[14px] text-balance">
              {successMessage}
            </p>
          </div>
        )}
        {errorMessage && (
          <div className="text-center w-full py-4 bg-red-400/10 rounded-t-lg">
            <p className="text-red-600 text-[14px]">{errorMessage}</p>
          </div>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  className="bg-[#B457FA4D]/30 border border-[#B457FA4D] p-[10px] rounded-[10px] w-full"
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
            "Send Reset Link"
          )}
        </GradientButton>
        <p className="text-center mt-4">
          Remember your password?{" "}
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
