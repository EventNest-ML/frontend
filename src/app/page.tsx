import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-[#8A3BEF] to-[#B457FA] flex flex-col items-center justify-center px-4 relative">
      <h1 className="text-white font-bold text-3xl sm:text-4xl text-center mb-8">
        Welcome to EventNest
      </h1>
      <Button
        className="bg-white text-[#8A3BEF] hover:bg-gray-100 w-full max-w-xs sm:w-auto sm:absolute sm:top-10 sm:right-10"
        asChild
      >
        <Link href="/signup">Get Started</Link>
      </Button>
    </div>
  );
}
