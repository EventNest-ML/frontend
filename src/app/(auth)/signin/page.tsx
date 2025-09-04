import {LogoIcon} from "@/components/custom-ui/Logo";
import SignInForm from "@/components/forms/SignInForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const SignInPage: React.FC = () => {
  return (
    <section className="flex flex-col gap-7">
      <div className="w-full flex justify-between items-center">
        <LogoIcon
          width={48}
          height={48}
        />
        <Button
          className="bg-gradient-to-r from-[#8A3BEF] to-[#B457FA] cursor-pointer hover:opacity-90"
          asChild
        >
          <Link href="/signup">Sign up</Link>
        </Button>
      </div>
      <SignInForm/>
    </section>
  );
};

export default SignInPage;
