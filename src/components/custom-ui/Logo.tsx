"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface LogoProps {
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
}

export const LogoIcon: React.FC<LogoProps> = ({
  width = 48,
  height = 48,
  alt = "/logo.svg",
  className = "",
}) => (
  <Image
    src="/logo.svg"
    width={width}
    height={height}
    alt={alt}
    className={className}
    priority
  />
);

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
   <LogoIcon/>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        EventNest
      </motion.span>
    </Link>
  );
};
