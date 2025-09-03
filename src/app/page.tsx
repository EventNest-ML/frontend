import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <div className="w-full h-screen bg-gradient-to-tr from-[#8A3BEF] to-[#B457FA] flex justify-center items-center">
      <h1 className="text-white font-bold text-4xl">Welcome to EventNest</h1>
      <Button
        className="bg-white text-[#8A3BEF] hover:bg-gray-100 absolute top-10 right-10"
        asChild
      >
        <Link href="/signup">Get Started</Link>
      </Button>
    </div>
  );
}
