import getDatabase from "@/database/get-database";
import type * as Prisma from "@prisma/client";
import { registerActionSchema } from "@/validators/register-action-validator";
import Joi from "joi";

import { friendRespondActionSchema } from "@/validators/friend-respond-validators";
import { authUserMiddlewareAction } from "@/middlewares/auth-user-middleware";
import UserJWTModel, {
  EAccessLevel,
} from "@/middlewares/models/user-jwt-model";
import {
  ActionFriendInviteModel,
  ActionGetFriendInvitesFn,
  ActionGetFriendInvitesRequest,
  ActionGetFriendInvitesResponse,
  ActionGetFriendInvitesResponseResult,
} from "./get-friend-invites-action-typedef";

export let getFriendInvitesAction = authUserMiddlewareAction(
  EAccessLevel.USER,
  async (
    requesterUser: UserJWTModel,
    request: ActionGetFriendInvitesRequest
  ): Promise<ActionGetFriendInvitesResponse> => {
    "use server";
    try {
      let prisma = await getDatabase();
      console.info('requesterUser.id ' + requesterUser.id)
      let friendInvites = await prisma?.friendInvite.findMany({
        where: {
          OR: [
            {
              senderId: requesterUser.id,
            },
            {
              receiverId: requesterUser.id,
            },
          ],
        },
        include: {
          sender: {
            select: {
              username: true,
            },
          },
          receiver: {
            select: {
              username: true,
            },
          },
        },
      });

      return {
        result: ActionGetFriendInvitesResponseResult.SUCCESS,
        data: friendInvites as Array<ActionFriendInviteModel>,
      };
    } catch (ex: any) {
      console.error("EXCEPTION: " + ex);
      /* may log to some external provider */
      return {
        result: ActionGetFriendInvitesResponseResult.UNHANDLED_EXCEPTION,
      };
    }
  }
);
