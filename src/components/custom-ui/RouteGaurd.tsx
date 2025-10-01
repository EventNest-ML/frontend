import { ReactNode } from "react";
// import { getSession } from "@/lib/auth-server";
// import { ToastBridge } from "@/components/custom-ui/ToastBridge";

type RouteGuardProps = {
  children: ReactNode;
};

export async function RouteGuard({
  children,
}: RouteGuardProps) {
  // const session = await getSession();
  return (
    <>
      <>
        {/* <ToastBridge
          message={session.message}
          variant="error"
        />
        {session.message && (
          <div className="text-center w-full py-4 bg-red-400/10 rounded-t-lg">
            <p className="text-red-600 text-[14px] text-balance">
              {session.message}
            </p>
          </div>
        )} */}
      </>
      {children}
    </>
  );
}
