import ActivatePageClient from "@/components/ActivatePageClient";
import { LogoIcon } from "@/components/custom-ui/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ActivatePage({
  searchParams,
}: {
  searchParams: { uid?: string; token?: string };
  }) {
  const { uid, token } = await searchParams;
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
      <ActivatePageClient
        uid={uid}
        token={token}
      />
    </section>
  );
}
