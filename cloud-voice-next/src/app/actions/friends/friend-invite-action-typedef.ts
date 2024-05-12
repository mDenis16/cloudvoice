export const enum EActionFriendInviteResponseResult {
    SUCCESS = 0,
    INVALID_USERNAME = 1,
    CANNOT_INVITE_YOURSELF = 2,
    ALREADY_FRIENDS = 3,
    VALIDATION_ERROR = 4,
    UNHANDLED_EXCEPTION = 5
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
  