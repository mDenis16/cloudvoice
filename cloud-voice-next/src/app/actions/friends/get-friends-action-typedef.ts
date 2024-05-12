import { ActionFriendInviteModel } from "./friend-invite-action-typedef";

export const enum ActionGetFriendsResponseResult {
  SUCCESS = 0,
  UNHANDLED_EXCEPTION = 1,
}

export interface ActionGetFriendsRequest {
  limit: number;
}

export interface ActionGetFriendModel {
  friendsOf: {
    username: string;
  };
}

export interface ActionGetFriendsResponse {
  result: ActionGetFriendsResponseResult;
  data?: Array<ActionGetFriendModel>;
  validationErrors?: [];
}

export type ActionGetFriendInvitesFn = (
  request: ActionGetFriendsRequest
) => Promise<ActionGetFriendsResponse>;
