import getDatabase from "@/database/get-database";
import type * as Prisma from "@prisma/client";
import { registerActionSchema } from "@/validators/register-action-validator";
import Joi from "joi";
import { hashPassword } from "@/app/utilities/crypto";

import {
  ActionFriendInviteRequest,
  EActionFriendInviteResponseResult,
  ActionFriendInviteResponse,
} from "./friend-invite-action-typedef";
import { friendInviteActionSchema } from "@/validators/friend-invite-validators";
import {
  authUserMiddleware,
  authUserMiddlewareAction,
} from "@/middlewares/auth-user-middleware";

import UserJWTModel, {
  EAccessLevel,
} from "@/middlewares/models/user-jwt-model";

// export async function friendInviteAction(
//   request: ActionFriendInviteRequest
// ): Promise<ActionFriendInviteResponse> {

// }
export let friendInviteAction = authUserMiddlewareAction(
  EAccessLevel.USER,
  async (
    requesterUser: UserJWTModel,
    request: ActionFriendInviteRequest
  ): Promise<ActionFriendInviteResponse> => {
    "use server";
    try {
      await friendInviteActionSchema().validateAsync(request);

      let prisma = await getDatabase();

      let invitedUser = await prisma?.user.findFirst({
        where: { username: request.username },
        include: {
          friends: {
            where: {
              friendsOfId: requesterUser.id,
            },
          },
          receivedFriendInvites: {
            where: {
              senderId: requesterUser.id,
            },
          },
          sentFriendInvites: {
            where: {
              receiverId: requesterUser.id,
            },
          },
        },
      });

      if (invitedUser == null)
        return { result: EActionFriendInviteResponseResult.INVALID_USERNAME };

      if (invitedUser.id == requesterUser.id)
        return {
          result: EActionFriendInviteResponseResult.CANNOT_INVITE_YOURSELF,
        };

      if (invitedUser.receivedFriendInvites.length > 0) {
        console.info("already invited");
        return {
          result: EActionFriendInviteResponseResult.ALREADY_INVITED,
        };
      }
      
      if (invitedUser.friends.length > 0) {
        console.info("already friends");
        return {
          result: EActionFriendInviteResponseResult.ALREADY_FRIENDS,
        };
      }

      if (invitedUser.sentFriendInvites.length > 0) {
        await prisma.friend.createMany({
          data: [
            {
              friendsId: requesterUser.id,
              friendsOfId: invitedUser.id,
            },
            {
              friendsId: invitedUser.id,
              friendsOfId: requesterUser.id,
            },
          ],
        });

        console.info(
          `Now ${invitedUser.username} is friend with ${requesterUser.username}`
        );

        await prisma.friendInvite.delete({
          where: {
            id: invitedUser.sentFriendInvites[0].id,
          },
        });

        return { result: EActionFriendInviteResponseResult.SUCCESS };
      }

      await prisma.friendInvite.create({
        data: {
          senderId: requesterUser.id,
          receiverId: invitedUser.id,
          status: 0,
        },
      });

      return { result: EActionFriendInviteResponseResult.SUCCESS };
    } catch (ex: any) {
      if (ex instanceof Joi.ValidationError && ex.details.length > 0)
        return { result: EActionFriendInviteResponseResult.VALIDATION_ERROR };

      console.error("EXCEPTION: " + ex);
      /* may log to some external provider */
      return { result: EActionFriendInviteResponseResult.UNHANDLED_EXCEPTION };
    }
  }
);
