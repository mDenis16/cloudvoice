export const enum EActionLoginResponse {
  SUCCESS = 0,
  INVALID_USERNAME_OR_PASSWORD = 1,
  VALIDATION_ERROR = 1,
  UNHANDLED_EXCEPTION = 2,
};

export interface ActionLoginRequest {
  username: string;
  password: string;
};

export interface ActionLoginResponse {
  result: EActionLoginResponse;
  validationErrors?: [];
};

export type ActionLoginFn = (
  request: ActionLoginRequest
) => Promise<ActionLoginResponse>;
