import { LogoIcon } from "@/components/custom-ui/Logo";
import GradientButton from "@/components/ui/GradientButton";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const page = () => {
  return (
    <section className="flex flex-col gap-14 pb-20">
      <div className="w-full flex justify-between items-center">
        <LogoIcon
          width={48}
          height={48}
        />
      </div>
      <div className="flex flex-col gap-7">
        <div>
          <h1 className="text-[20px] font-bold">Reset Password</h1>
          <p className="text-[14px] text-black/70 mt-2">
            Enter your email to recieve a password reset link
          </p>
        </div>
        <Input
          type="email"
          placeholder="Email"
          className="bg-[#B457FA4D]/30 border border-[#B457FA4D] p-[10px] rounded-[10px] w-full"
        />
        <GradientButton type="submit">Send Reset Link</GradientButton>
        <p className="flex mx-auto gap-2">
          Remembered your password?{" "}
          <Link
            href={"/signin"}
            className="font-semibold hover:underline cursor-pointer"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default page;
