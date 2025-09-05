"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: number; // base size in pixels (default = 80)
  ringCount?: number; // number of rings (default = 3)
  color?: string; // base color
  animation?: "ping" | "pulse" | "none"; // animation type
  spacingRatio?: number; // ratio of spacing between rings (0-1)
}

const Loader: React.FC<LoaderProps> = ({
  size = 80,
  ringCount = 3,
  color = "#B558FA",
  animation = "ping",
}) => {
  const baseRingSize = size * 0.4; 
  const maxRingSize = size;

  const spacing = (maxRingSize - baseRingSize) / (ringCount - 1);

  const ringSizes = Array.from(
    { length: ringCount },
    (_, i) => baseRingSize + i * spacing
  );

  const opacities = Array.from(
    { length: ringCount },
    (_, i) => 1 - (i / (ringCount - 1)) * 0.7
  );

  const colors = Array.from({ length: ringCount }, (_, i) => {
    if (i === 0) return color; 
    const opacity = 1 - i / ringCount;
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="relative flex items-center justify-center"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {ringSizes.map((ringSize, i) => (
          <span
            key={i}
            className={cn(
              "absolute rounded-full",
              animation === "ping" && "animate-ping",
              animation === "pulse" && "animate-pulse"
            )}
            style={{
              width: ringSize,
              height: ringSize,
              border: `${Math.min(size * 0.02, 2)}px solid ${colors[i]}`,
              animationDelay: animation !== "none" ? `${i * 0.2}s` : "0s",
              animationPlayState: animation === "none" ? "paused" : "running",
              opacity: opacities[i],
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
