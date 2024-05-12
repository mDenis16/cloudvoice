export const enum EActionFriendInviteResponseResult {
    SUCCESS = 0,
    SUCCESS_EACHOTHER = 1,
    INVALID_USERNAME = 2,
    CANNOT_INVITE_YOURSELF = 3,
    ALREADY_FRIENDS = 4,
    ALREADY_INVITED = 5,
    VALIDATION_ERROR = 6,
    UNHANDLED_EXCEPTION = 7
  };
  
  export interface ActionFriendInviteRequest {
    username: string;
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
  
  export interface ActionFriendInviteResponse {
    result: EActionFriendInviteResponseResult;
    validationErrors?: [];
    data?: ActionFriendInviteModel
  };
  
  export type ActionFriendFn = (
    request: ActionFriendInviteRequest
  ) => Promise<ActionFriendInviteResponse>;
  