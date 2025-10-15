"use client";

import Loading from "@/app/loading";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const access = searchParams.get("access");
    const refresh = searchParams.get("refresh");

    if (access && refresh) {
      // send to API route to set cookies server-side
      fetch("/api/auth/set-cookies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access, refresh }),
      })
        .then((res) => {
          if (res.ok) {
            router.replace("/dashboard/home");
          } else {
            router.replace("/signin?error=cookie_set_failed");
          }
        })
        .catch(() => {
          router.replace("/signin?error=cookie_set_failed");
        });
    } else {
      router.replace("/signin?error=oauth_failed");
    }
  }, [router, searchParams]);

  return <Loading/>;
}
