import Input from "@/app/components/ui/input";
import Client from "./client";
import Link from "next/link";

let Page = async () => {

  return (
    <main className="min-h-screen flex items-center justify-center background-gradient">
      <div className="p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-align-center">Register</h2>
        <Client/>
      </div>
    </main>
  );
};

export default Page;
