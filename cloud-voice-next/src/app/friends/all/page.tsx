import getDatabase from "@/database/get-database";
import { authUserMiddleware } from "@/middlewares/auth-user-middleware";
import UserJWTModel, {
  EAccessLevel,
} from "@/middlewares/models/user-jwt-model";
import { useState } from "react";
import { getFriendsAction } from "@/app/actions/friends/get-friends-action";
import {
  ActionGetFriendModel,
  ActionGetFriendsResponse,
} from "@/app/actions/friends/get-friends-action-typedef";
import { FriendDisplay } from "@/app/components/friendDisplay";

let Page = authUserMiddleware(EAccessLevel.USER, async (user: UserJWTModel) => {
  let friendsResponse: ActionGetFriendsResponse = await getFriendsAction({
    limit: 10,
  });

  let friends = friendsResponse.data;
  console.info('friends ' + JSON.stringify(friends))
  return (
    <div className="w-full h-full bg-gray-800 flex flex-col">
      <p className="text-normal p-5 font-xl">All friends</p>

      <div className="w-full h-128 bg-gray-500 p-5">
        {friends &&
          friends.map((friend: ActionGetFriendModel, index: number) => {
            return (
              <FriendDisplay
                key={index}
                friendDisplay={{
                  username: friend.friendsOf.username,
                }}
              />
            );
          })}
      </div>
    </div>
  );
});

export default Page;

export const runtime = "edge";
