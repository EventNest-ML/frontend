"use client";

import { ApiError, apiFetch } from "@/lib/http";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "./custom-ui/Loader";

export default function ActivatePageClient({
  uid,
  token,
}: {
  uid?: string;
  token?: string;
}) {
  const router = useRouter();

  const [status, setStatus] = useState("Activating...");
  const [countdown, setCountdown] = useState(5);
  const [resendStatus, setResendStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!uid || !token) {
      setStatus("❌ Invalid activation link.");
      return;
    }

    const activate = async () => {
      try {
        await apiFetch<{ detail: string }>("/api/auth/activate", {
          method: "POST",
          body: { uid, token },
        });

        // ✅ Success
        setStatus("✅ Account activated! Redirecting...");
        handleConfetti();

        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev === 1) {
              clearInterval(timer);
              router.push("/signin");
            }
            return prev - 1;
          });
        }, 1000);
      } catch (error) {
        if (error instanceof ApiError) {
          if (
            (error.details as { detail?: string })?.detail ===
            "Stale token for given user."
          ) {
            setStatus("❌ Your activation link has expired.");
          } else {
            setStatus(`❌ Activation failed: ${error.message}`);
          }
        } else {
          setStatus("❌ Something went wrong. Please try again.");
        }
      }
    };

    activate();
  }, [uid, token, router]);

  const handleResend = async () => {
    if (!uid) return;
    setLoading(true);
    setResendStatus(null);

    try {
      await apiFetch<{ detail: string }>("/api/auth/resend-activation", {
        method: "POST",
        body: { uid },
      });
      setResendStatus("✅ New activation email sent. Please check your inbox.");
    } catch (error) {
      if (error instanceof ApiError) {
        setResendStatus(`❌ Failed to resend: ${error.message}`);
      } else {
        setResendStatus("❌ Something went wrong. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleConfetti = () => {
    const end = Date.now() + 3 * 1000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors,
      });
      requestAnimationFrame(frame);
    };

    frame();
  };

  return (
    <div className="w-full flex flex-col justify-center items-center text-center px-2 sm:px-0">
      {status.startsWith("✅") ? (
        <>
          <div className="w-full text-center py-4 bg-green-400/10 rounded-t-lg px-2">
            <p className="text-green-600 text-[15px] sm:text-[14px] text-balance">
              {status}
            </p>
            <br />
            <span className="text-sm opacity-80">
              Redirecting in {countdown}s...
            </span>
          </div>
          <div className="flex flex-col items-center gap-4 relative w-full min-h-[180px] sm:min-h-[220px]">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Loader
                animation="none"
                size={120}
              />
            </div>
          </div>
        </>
      ) : status.startsWith("❌") ? (
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="text-center w-full py-4 bg-red-400/10 rounded-t-lg px-2">
            <p className="text-red-600 text-[15px] sm:text-[14px] text-balance">
              {status}
            </p>
            <br />
          </div>
          {/* Show Resend button if token is stale */}
          {status.includes("expired") && (
            <button
              onClick={handleResend}
              disabled={loading}
              className="bg-white text-[#8A3BEF] font-semibold px-4 py-2 rounded-lg shadow hover:opacity-90 transition w-full sm:w-auto"
            >
              {loading ? "Resending..." : "Resend Activation Email"}
            </button>
          )}

          {resendStatus && (
            <div
              className={`text-sm ${
                resendStatus.startsWith("✅")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {resendStatus}
            </div>
          )}
          <div className="flex flex-col items-center gap-4 relative w-full min-h-[180px] sm:min-h-[220px]">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Loader
                animation="none"
                size={120}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 relative w-full min-h-[200px] sm:min-h-[300px]">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Loader />
          </div>
        </div>
      )}
    </div>
  );
}
