export const enum ActionGetFriendInvitesResponseResult {
    SUCCESS = 0,
    VALIDATION_ERROR = 3,
    UNHANDLED_EXCEPTION = 4
  };
  
  export interface ActionGetFriendInvitesRequest {
    limit: number
  };
  
  export interface ActionFriendInviteUserModel {
    username: string;
  };

  export interface ActionFriendInviteModel {
    id: number;
    sender: ActionFriendInviteUserModel;
    senderId: number;
    receiver: ActionFriendInviteUserModel;
    receiverId: number;
    status: number;
  }

  export interface ActionGetFriendInvitesResponse {
    result: ActionGetFriendInvitesResponseResult;
    data?: Array<ActionFriendInviteModel>;
    validationErrors?: [];
  };
  
  export type ActionGetFriendInvitesFn = (
    request: ActionGetFriendInvitesRequest
  ) => Promise<ActionGetFriendInvitesResponse>;
  