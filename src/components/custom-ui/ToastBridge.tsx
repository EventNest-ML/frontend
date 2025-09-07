"use client";

import { useEffect } from "react";
import { toast } from "sonner";

type ToastBridgeProps = {
  message?: string;
  variant?: "error" | "success" | "info";
};

export function ToastBridge({ message, variant = "info" }: ToastBridgeProps) {
  useEffect(() => {
    if (message) {
      toast(message, {
        className:
          variant === "error"
            ? "!bg-red-600 !text-white"
            : variant === "success"
            ? "!bg-green-600 !text-white"
            : "!bg-gray-800 !text-white",
      });
    }
  }, [message, variant]);

  return null;
}
