export const enum EActionRegisterResponse {
  SUCCESS = 0,
  DUPLICATE_EMAIL = 1,
  DUPLICATE_USERNAME = 2,
  VALIDATION_ERROR = 3,
  UNHANDLED_EXCEPTION = 4,
}

export interface ActionRegisterRequest {
  username: string;
  email: string;
  password: string;
  inviteCode: string;
}
export interface ActionRegisterResponse {
  result: EActionRegisterResponse;
  validationErrors?: [];
}

export type ActionRegisterFn = (
  request: ActionRegisterRequest
) => Promise<ActionRegisterResponse>;
