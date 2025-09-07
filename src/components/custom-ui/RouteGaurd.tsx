// components/RouteGuard.tsx
import { ReactNode } from "react";
import { getSession } from "@/lib/auth-server";
import { redirect, RedirectType } from "next/navigation";
import { ToastBridge } from "@/components/custom-ui/ToastBridge";

type GuardType = "auth" | "guest" | "role";
type RouteGuardProps = {
  children: ReactNode;
  type?: GuardType;
  redirectTo?: string;
  allowedRoles?: string[];
};

export async function RouteGuard({
  children,
  type = "auth",
  redirectTo,
  allowedRoles,
}: RouteGuardProps) {
  const session = await getSession();

  // 🔹 Auth Guard
  if (type === "auth" && !session.authenticated) {
    return (
      <>
        <ToastBridge
          message={session.message ?? "Please sign in"}
          variant="error"
        />
        {redirect(redirectTo ?? "/signin", RedirectType.replace)}
      </>
    );
  }

  // 🔹 Guest Guard
  if (type === "guest" && session.authenticated) {
    return redirect(redirectTo ?? "/dashboard", RedirectType.replace);
  }

  // 🔹 Role Guard
  if (type === "role" && session.authenticated) {
    const role = session.user?.role;
    if (!allowedRoles?.includes(role ?? "")) {
      return (
        <>
          <ToastBridge
            message="You don’t have permission to view this page"
            variant="error"
          />
          {redirect(redirectTo ?? "/", RedirectType.replace)}
        </>
      );
    }
  }

  return <>{children}</>;
}
