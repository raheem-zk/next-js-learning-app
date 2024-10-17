import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-red-400 w-full h-96">
      <h1 className="text-2xl font-bold p-10 text-green-600 ">Home</h1>

      <Link href={"/login"}>Login</Link>
    </div>
  );
}
