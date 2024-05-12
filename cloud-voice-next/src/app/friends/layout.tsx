import getDatabase from "@/database/get-database";
import { authUserMiddleware } from "@/middlewares/auth-user-middleware";
import UserJWTModel, {
  EAccessLevel,
} from "@/middlewares/models/user-jwt-model";
import Link from "next/link";
import { useState } from "react";

// let Page = authUserMiddleware(EAccessLevel.USER, async (user: UserJWTModel) => {
//   const friendsWithFriendsOfIdOnly = await getDatabase().friends.findMany({
//     where: { friendsOfId: user.id },
//   });

//   return (

//   );
// });

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full bg-gray-800 flex flex-col">
      <div className="w-full  bg-gray-600 flex flex-row">
        <p className="text-normal font-xl font-medium mt-3 mb-3 ml-6 pr-2 border-r-2 border-gray-400">
          Friends
        </p>
        <div className="text-normal font-xl font p-3 grid grid-cols-5 gap-2 text-center">
          <Link href={"/friends/online"}>Online</Link>
          <Link href={"/friends/all"}>All</Link>
          <Link href={"/friends/requests"}>Invites</Link>
          <Link href={"/friends/blocked"}>Blocked</Link>
          <Link href={"/friends/requests"}>Add</Link>
        </div>
     
      </div>
      {children}
    </div>
  );
}

export const runtime = "edge";
