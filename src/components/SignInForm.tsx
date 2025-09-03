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
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { z } from "zod";
import GradientButton from "./ui/GradientButton";
import { Input } from "./ui/input";

// Zod schema for form validation
const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

type SignInFormValues = z.infer<typeof signInSchema>;

const SignInForm = () => {
const form = useForm<SignInFormValues>({
  resolver: zodResolver(signInSchema),
  defaultValues: {
    email: "",
    password: "",
  },
});

const onSubmit = (values: SignInFormValues) => {
  // TODO: Implement sign-in logic
  console.log(values);
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
        <GradientButton type="submit" className="w-full py-[15px]">Login</GradientButton>
        <div className="flex items-center justify-center gap-3">
          <Separator className="flex-1" />
          <p className="font-semibold">Or</p>
          <Separator className="flex-1" />
        </div>
        <SignInWithGoogleBtn />
      </form>
    </Form>
  );
}

export default SignInForm