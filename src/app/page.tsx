import HomeProducts from "@/components/home/home";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-300 h-full overflow-scroll w-full m-10">
      <h1 className="text-2xl font-bold p-10 text-green-600 ">Home</h1>

      <Link href={"/login"}>Login</Link>
      {Date.now()}
      <HomeProducts />
    </div>
  );
}
