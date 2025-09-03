'use client'
import { Lock } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const AuthSideImages = ({ url = "/signin" }: { url?: string }) => (
  <aside className="relative hidden lg:flex flex-1 items-center justify-center">
    <Image
      src="/auth-bg-without-ground.jpg"
      alt="Authentication background"
      fill
      className="object-cover object-right-top"
      priority
    />
    <Image
      src="/group-ellipse-four-five.png"
      alt="Decorative ellipse"
      width={150}
      height={250}
      className="object-cover absolute bottom-0 left-10"
      priority
    />
    <Image
      src="/design-ellipse-group-with-circle.png"
      alt="Decorative circle group"
      width={300}
      height={400}
      className="object-cover absolute top-0 left-10"
      priority
    />
    <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[50px] font-bold text-white w-full px-4 text-center text-balance">
      {url === "/signin" ? (
        <>
          Welcome Back!
        </>
      ) : url === "/signup" ? (
        <>
          Together Starts Now
        </>
      ) : (
        <div className="size-[100px] rounded-lg border border-white p-4 mx-auto">
          <Lock className="size-full" />
        </div>
      )}
    </h1>
  </aside>
);

const AuthDecorations = () => (
  <div className="relative bg-white overflow-hidden">
    <Image
      src="/ellipse-one.png"
      alt="Ellipse decoration one"
      width={250}
      height={300}
      className="absolute -right-2 top-0"
    />
    <Image
      src="/ellipse-two.png"
      alt="Ellipse decoration two"
      width={300}
      height={300}
      className="absolute -bottom-10 -right-2"
    />
  </div>
);

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname()
  return (
    <main className="relative grid h-screen w-full grid-cols-1 lg:grid-cols-2">
      {/* Centered authentication card */}
      <section className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-[960px] rounded-[20px] shadow-xl z-10 grid grid-cols-1 lg:grid-cols-2 border-2 border-black/10 overflow-hidden">
          <AuthSideImages url={pathName} />
          <div className="p-10 overflow-scroll hide-scrollbar h-fit lg:max-h-[90vh] ">
            {children}
          </div>
        </div>
      </section>

      {/* Background image for left side (visible on large screens) */}
      <aside className="relative hidden lg:block">
        <Image
          src="/auth-background.jpg"
          alt="Authentication background"
          fill
          className="object-cover object-left-top"
          priority
        />
      </aside>

      {/* Decorative ellipses on the right */}
      <AuthDecorations />
    </main>
  );
};

export default AuthLayout;
