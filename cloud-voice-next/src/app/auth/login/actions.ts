
import useDatabase from "@/database/use-database";

export enum EActionLoginResponse {
    SUCCESS = 0,
    INVALID_EMAIL_OR_PASSWORD = 1,
    BANNED_FROM_THIS_SERVER = 2,
};

export interface ActionLoginResponse {
    result: EActionLoginResponse;
    message?: string | null;
};
export interface ActionLoginRequest {
    email: string;
    password: string;
};

export let loginAction = async (
  request: ActionLoginRequest
): Promise<ActionLoginResponse> => {
  let user = await useDatabase().user.findFirst({
    where: { email: request.email, password: request.password },
  });
  if (!user) return { result: EActionLoginResponse.INVALID_EMAIL_OR_PASSWORD };

  return { result: EActionLoginResponse.SUCCESS };
};