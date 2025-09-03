import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}
const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  className = "",
  ...props
}) => (
  <Button
    className={cn(
      "bg-gradient-to-r from-[#8A3BEF] to-[#B457FA] text-white font-bold rounded-[10px] shadow-lg px-8 py-4 transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#8A3BEF] active:opacity-95",
      className
    )}
    {...props}
  >
    {children}
  </Button>
);

export default GradientButton;
