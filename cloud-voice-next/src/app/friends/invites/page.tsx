import getDatabase from "@/database/get-database";
import { authUserMiddleware } from "@/middlewares/auth-user-middleware";
import UserJWTModel, {
  EAccessLevel,
} from "@/middlewares/models/user-jwt-model";
import React from "react";
import { useState } from "react";
import Client from "./client";
import { friendInviteAction } from "@/app/actions/friends/friend-invite-action";
import { friendRespondAction } from "@/app/actions/friends/friend-respond-action";
import { getFriendInvitesAction } from "@/app/actions/friends/get-friend-invites-action";
import { ActionFriendInviteModel, ActionGetFriendInvitesResponse } from "@/app/actions/friends/get-friend-invites-action-typedef";

let Page = authUserMiddleware(EAccessLevel.USER, async (user: UserJWTModel) => {
  console.info('user ' + JSON.stringify(user))
  let friendInvites: ActionGetFriendInvitesResponse = await getFriendInvitesAction({limit: 10});
  return (
    <Client
      friendInviteAction={friendInviteAction}
      friendRespondAction={friendRespondAction}
      getFriendInvitesAction={getFriendInvitesAction}
      friendInvitesSSR={friendInvites?.data}
      userJWTData={user}
    />
  );
});

export default Page;

export const runtime = "edge";
