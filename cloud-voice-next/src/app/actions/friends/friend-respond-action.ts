import getDatabase from "@/database/get-database";
import type * as Prisma from "@prisma/client";
import { registerActionSchema } from "@/validators/register-action-validator";
import Joi from "joi";

import {
  ActionFriendRespondRequest,
  EActionFriendRespondResponseResult,
  ActionFriendRespondResponse,
} from "./friend-respond-action-typedef";
import { friendRespondActionSchema } from "@/validators/friend-respond-validators";
import { authUserMiddlewareAction } from "@/middlewares/auth-user-middleware";
import UserJWTModel, {
  EAccessLevel,
} from "@/middlewares/models/user-jwt-model";

export let friendRespondAction = authUserMiddlewareAction(
  EAccessLevel.USER,
  async (
    requesterUser: UserJWTModel,
    request: ActionFriendRespondRequest
  ): Promise<ActionFriendRespondResponse> => {
    "use server";
    try {
      await friendRespondActionSchema().validateAsync(request);
      let prisma = await getDatabase();

      let invite = await prisma?.friendInvite.findFirst({
        where: { receiverId: requesterUser.id, id: request.id },
        include: {
          receiver: true,
          sender: true
        }
      });

      if (invite == null)
        return {
          result: EActionFriendRespondResponseResult.UNHANDLED_EXCEPTION,
        };

      await prisma?.friendInvite.delete({ where: { id: invite.id } });

      await prisma.friend.createMany({
        data: [
          {
            friendsId: invite.receiverId,
            friendsOfId: invite.senderId,
          },
          {
            friendsId: invite.senderId,
            friendsOfId: invite.receiverId,
          },
        ],
      });


      console.info(
        `[DEBUG] ${invite.sender.username} is now friend with ${invite.sender.username}!`
      );
      return { result: EActionFriendRespondResponseResult.SUCCESS };
    } catch (ex: any) {
      if (ex instanceof Joi.ValidationError && ex.details.length > 0)
        return { result: EActionFriendRespondResponseResult.VALIDATION_ERROR };

      console.error("EXCEPTION: " + ex);
      /* may log to some external provider */
      return { result: EActionFriendRespondResponseResult.UNHANDLED_EXCEPTION };
    }
  }
);
