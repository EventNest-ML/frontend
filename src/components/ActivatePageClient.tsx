"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ClassicLoader from "@/components/loader";
import confetti from "canvas-confetti";
import { apiFetch, ApiError } from "@/lib/http";

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
              router.push("/login");
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
    <div className="w-full h-screen bg-gradient-to-tr from-[#8A3BEF] to-[#B457FA] flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-white font-bold text-4xl mb-6">
        Welcome to EventNest 🎉
      </h1>

      {status.startsWith("✅") ? (
        <div className="text-white text-lg">
          {status} <br />
          <span className="text-sm opacity-80">
            Redirecting in {countdown}s...
          </span>
        </div>
      ) : status.startsWith("❌") ? (
        <div className="flex flex-col items-center gap-4">
          <div className="text-red-200 text-lg max-w-md">{status}</div>

          {/* Show Resend button if token is stale */}
          {status.includes("expired") && (
            <button
              onClick={handleResend}
              disabled={loading}
              className="bg-white text-[#8A3BEF] font-semibold px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
            >
              {loading ? "Resending..." : "Resend Activation Email"}
            </button>
          )}

          {resendStatus && (
            <div
              className={`text-sm ${
                resendStatus.startsWith("✅")
                  ? "text-green-200"
                  : "text-red-200"
              }`}
            >
              {resendStatus}
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-3 text-white text-lg">
          <ClassicLoader />
          {status}
        </div>
      )}
    </div>
  );
}
