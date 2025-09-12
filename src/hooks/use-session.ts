"use client";
import { SessionData } from "@/type";
import { useEffect, useState } from "react";

export function useSession() {
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchSession() {
      try {
        const res = await fetch("/api/auth/session", { cache: "no-store" });
        const data = await res.json();
        if (mounted) {
          setSession(data);
          setLoading(false);
        }
        //eslint-disable-next-line
      } catch (_) {
        if (mounted) {
          setSession({ authenticated: false });
          setLoading(false);
        }
      }
    }

    fetchSession();
    // poll every 5min to auto-refresh
    const interval = setInterval(fetchSession, 5 * 60 * 1000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return { session, loading };
}
