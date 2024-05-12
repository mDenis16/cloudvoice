export const enum EActionFriendInviteResponseResult {
    SUCCESS = 0,
    INVALID_USERNAME = 1,
    CANNOT_INVITE_YOURSELF = 2,
    ALREADY_FRIENDS = 3,
    ALREADY_INVITED = 4,
    VALIDATION_ERROR = 5,
    UNHANDLED_EXCEPTION = 6
  };
  
  export interface ActionFriendInviteRequest {
    username: string;
  };
  
  
  export interface ActionFriendInviteResponse {
    result: EActionFriendInviteResponseResult;
    validationErrors?: [];
  };
  
  export type ActionFriendFn = (
    request: ActionFriendInviteRequest
  ) => Promise<ActionFriendInviteResponse>;
  