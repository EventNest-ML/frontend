"use client";
import SignInWithGoogleBtn from "@/components/custom-ui/SignInWithGoogleBtn";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import GradientButton from "./ui/GradientButton";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

type SignInFormValues = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: SignInFormValues) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok || !data?.ok) {
        // surface backend validation errors if any
        const message = data?.message || "Invalid credentials";
        form.setError("email", { message: "" }); // clear
        form.setError("password", { message });
        return;
      }

      // Logged in: tokens are in httpOnly cookies; user is returned
      toast.success("Logged in successfully!");
      router.push("/dashboard");
    } catch (e) {
      form.setError("password", {
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  className="bg-[#B457FA4D]/30 border border-[#B457FA4D] p-[10px] rounded-[10px] w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Link
          href="/forgot-password"
          className="flex w-fit ml-auto text-[14px] font-black/80 hover:underline"
        >
          Forgot Password?
        </Link>

        <GradientButton
          type="submit"
          className="w-full py-[15px]"
          disabled={submitting}
        >
          {submitting ? "Logging in..." : "Login"}
        </GradientButton>

        <div className="flex items-center justify-center gap-3">
          <Separator className="flex-1" />
          <p className="font-semibold">Or</p>
          <Separator className="flex-1" />
        </div>
        <SignInWithGoogleBtn />
      </form>
    </Form>
  );
};

export default SignInForm;
