import ActivatePageClient from "@/components/ActivatePageClient";

export default function ActivatePage({
  searchParams,
}: {
  searchParams: { uid?: string; token?: string };
}) {
  return (
    <ActivatePageClient
      uid={searchParams.uid}
      token={searchParams.token}
    />
  );
}
