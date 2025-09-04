import ActivatePageClient from "@/components/ActivatePageClient";

export default async function ActivatePage({
  searchParams,
}: {
  searchParams: { uid?: string; token?: string };
  }) {
  const { uid, token } = await searchParams;
  return (
    <ActivatePageClient
      uid={uid}
      token={token}
    />
  );
}
