import { LogoIcon } from "@/components/custom-ui/Logo";
import PasswordResetForm from "@/components/custom-ui/PasswordResetForm";

export default async function PasswordResetPage({
  searchParams,
}: {
  searchParams: { uid?: string; token?: string };
}) {
  const { uid, token } = await searchParams;

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
          <h1 className="text-[20px] font-bold">Set New Password</h1>
          <p className="text-[14px] text-black/70 mt-2">
            Please enter your new password below.
          </p>
        </div>

        {/* Pass uid/token down */}
        <PasswordResetForm
          uid={uid}
          token={token}
        />
      </div>
    </section>
  );
}
