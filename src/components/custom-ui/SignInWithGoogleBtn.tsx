"use client";
import React from "react";
import { Button } from "../ui/button";

const SignInWithGoogleBtn = ({
  isLoading = false,
}: {
  isLoading?: boolean;
}) => {
  const handleGoogleSignIn = () => {
    window.location.href = "/api/auth/google/login";
  };

  return (
    <Button
      type="button"
      onClick={handleGoogleSignIn}
      className="w-full gap-2 bg-transparent border border-black"
      disabled={isLoading}
      variant="outline"
    >
      {isLoading ? (
        "Signing in..."
      ) : (
        <>
          <svg
            className="h-5 w-5"
            viewBox="0 0 533.5 544.3"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M533.5 278.4c0-17.4-1.4-34.1-4-50.2H272v95h147.2c-6.4 34.2-25.7 63.2-54.9 82.7v68h88.6c51.7-47.7 80.6-118 80.6-195.5z"
              fill="#4285f4"
            />
            <path
              d="M272 544.3c73.8 0 135.7-24.5 180.9-66.5l-88.6-68c-24.6 16.5-56.2 26.4-92.3 26.4-70.9 0-131-47.9-152.5-112.5h-90.3v70.9c45.3 89.7 138.3 149.7 242.8 149.7z"
              fill="#34a853"
            />
            <path
              d="M119.5 323.7c-10.6-31.5-10.6-65.5 0-97l-90.3-70.9c-39.3 77.6-39.3 160.2 0 237.8l90.3-70.9z"
              fill="#fbbc04"
            />
            <path
              d="M272 107.7c39.9-.6 78.3 14.5 107.4 42.6l80.1-80.1C407.6 24.5 345.8 0 272 0 167.5 0 74.5 60 29.2 149.7l90.3 70.9C141 155.6 201.1 107.7 272 107.7z"
              fill="#ea4335"
            />
          </svg>
          <span>Sign in with Google</span>
        </>
      )}
    </Button>
  );
};

export default SignInWithGoogleBtn;
