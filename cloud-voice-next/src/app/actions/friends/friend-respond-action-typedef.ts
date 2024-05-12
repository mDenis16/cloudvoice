export const enum EActionFriendRespondResponseResult {
    SUCCESS = 0,
    VALIDATION_ERROR = 3,
    UNHANDLED_EXCEPTION = 4
  };
  
  export interface ActionFriendRespondRequest {
    id: number,
    respond: boolean
  };
  
  
  export interface ActionFriendRespondResponse {
    result: EActionFriendRespondResponseResult;
    validationErrors?: [];
  };
  
  export type ActionFriendRespondFn = (
    request: ActionFriendRespondRequest
  ) => Promise<ActionFriendRespondRequest>;
  