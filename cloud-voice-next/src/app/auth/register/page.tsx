import Link from "next/link";
import Client from "./client";
import getDatabase from "@/database/get-database";

import { registerAction } from "@/app/actions/auth/register-action";
import {
  ActionRegisterRequest,
  EActionRegisterResponse,
  ActionRegisterResponse,
} from "@/app/actions/auth/register-action-typedef";

export default async function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center background-gradient">
      <div className="p-8 rounded-lg shadow-md max-w-md w-full">
        <h3 className="text-[3rem] font-semibold mb-4 text-center pb-12">Cloud Voice</h3>
        <Client registerAction={registerAction} />
      </div>
    </main>
  );
}
export const runtime = 'edge'