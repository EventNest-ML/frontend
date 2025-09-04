import { LogoIcon } from "@/components/custom-ui/Logo";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";

export default function ForgotPasswordPage() {
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
            Enter your email to receive a password reset link
          </p>
        </div>

        <ForgotPasswordForm />
      </div>
    </section>
  );
}
