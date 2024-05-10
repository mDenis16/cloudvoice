import useDatabase from "@/database/use-database";

export interface ActionRegisterRequest {
  email: string;
  username: string;
  password: string;
  inviteCode: string
}
export enum EActionRegisterRepsonse {
  SUCCESS = 0,
  DUPLICATE_EMAIL = 1,
  INVALID_EMAIL = 2,
  INVALID_PASSWORD = 3,
}
export interface ActionRegisterResponse {
  result: EActionRegisterRepsonse;
}

export let registerAction = async (
  request: ActionRegisterRequest
): Promise<ActionRegisterResponse> => {
  let user = await useDatabase().user.findFirst({
    where: { email: request.email },
  });
  if (!user) return { result: EActionRegisterRepsonse.DUPLICATE_EMAIL };

  return { result: EActionRegisterRepsonse.SUCCESS };
};