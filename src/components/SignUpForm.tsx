"use client"
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import GradientButton from './ui/GradientButton';

// Zod schema for form validation
const signUpSchema = z
  .object({
    name: z.string().min(2, { message: "Name is required." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Please confirm your password." }),
    keepSignedIn: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      keepSignedIn: false,
    },
  });

  const onSubmit = async (values: SignUpFormValues) => {
    const { name, email, confirmPassword, password } = values
    const firstname = name.split(" ")[0] || ""
    const lastname = name.split(" ").slice(1).join(" ") || ""
    const rawData = { email, confirmPassword, password, firstname, lastname, username: name }
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(rawData),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        const details = data?.details;
        if (details && typeof details === "object") {
          Object.entries(details as Record<string, string[] | string>).forEach(
            ([field, msgs]) => {
              const msg = Array.isArray(msgs) ? msgs[0] : String(msgs);
              if (field in form.getValues()) {
                //eslint-disable-next-line
                form.setError(field as any, { message: msg });
              }
            }
          );
        }
        throw new Error(data?.message || "Registration failed");
      }
      alert(
        "Account created! Please check your email to activate your account."
      );
      // router.push("/verify-email"); //
      //eslint-disable-next-line
    } catch (e: any) {
      alert(e.message ?? "Something went wrong");
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <input
                  type="text"
                  placeholder="Name"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <input
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
              <FormControl>
                <input
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <input
                  type="password"
                  placeholder="Confirm Password"
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
          name="keepSignedIn"
          render={({ field }) => (
            <FormItem className="w-full flex items-center gap-[8px]">
              <FormControl>
                <input
                  type="checkbox"
                  id="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormLabel
                htmlFor="checkbox"
                className="mb-0"
              >
                Keep me signed in
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <GradientButton
          type="submit"
          className="w-full py-[15px]"
        >
          Create Account
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

export default SignUpForm