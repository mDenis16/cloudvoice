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
  ActionGetFriendsResponse,
  ActionGetFriendsRequest,
  ActionGetFriendsResponseResult,
  ActionGetFriendModel,
} from "./get-friends-action-typedef";

export let getFriendsAction = authUserMiddlewareAction(
  EAccessLevel.USER,
  async (
    requesterUser: UserJWTModel,
    request: ActionGetFriendsRequest
  ): Promise<ActionGetFriendsResponse> => {
    "use server";
    try {
      let prisma = await getDatabase();

      let resp = await prisma?.user.findFirst({
        where: {
          id: requesterUser.id
        },

        select: {
          friends: {
            include: {
              friendsOf: {
                select: {
                  username: true
                }
              }
            }
          }
        }
      });
      console.info('mata  ' + JSON.stringify(resp))
      return {
        result: ActionGetFriendsResponseResult.SUCCESS,
        data: resp?.friends,
      };
    } catch (ex: any) {
      console.error("EXCEPTION: " + ex);
      /* may log to some external provider */
      return {
        result: ActionGetFriendsResponseResult.UNHANDLED_EXCEPTION,
      };
    }
  }
);
