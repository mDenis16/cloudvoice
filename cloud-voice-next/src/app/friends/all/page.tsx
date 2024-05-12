import getDatabase from "@/database/get-database";
import { authUserMiddleware } from "@/middlewares/auth-user-middleware";
import UserJWTModel, {
  EAccessLevel,
} from "@/middlewares/models/user-jwt-model";
import { useState } from "react";

let Page = authUserMiddleware(EAccessLevel.USER, async (user: UserJWTModel) => {
  const friendsWithFriendsOfIdOnly = await getDatabase().friends.findMany({
    where: { friendsOfId: user.id },
  });

  return (
    <div className="w-full h-full bg-gray-800 flex flex-col">
      {JSON.stringify(friendsWithFriendsOfIdOnly)}

      <p className="text-normal p-5 font-xl">All friends</p>

      <div className="w-full h-128 bg-gray-500 p-5">
        
      </div>
    </div>
  );
});

export default Page;

export const runtime = "edge";
