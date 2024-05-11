import { NextRequest, NextResponse } from "next/server";
import UserJWTModel, { EAccessLevel } from "./models/user-jwt-model";
import { cookies } from "next/headers";
import { getRequestContext } from "@cloudflare/next-on-pages";
import * as jose from "jose";
import { JWTClaimValidationFailed } from "jose/errors";
import { redirect } from "next/navigation";

export let getAuthSever = async (): Promise<UserJWTModel | null> => {
  let currentCtx = getRequestContext();

  let jwtSecureKey = currentCtx.env.jwt_secret_key;

  let token = cookies().get("_jwt");
  if (!token) return null;

  if (token?.value) {
    const secret = new TextEncoder().encode(jwtSecureKey);

    try {
      const { payload, protectedHeader } = await jose.jwtVerify(
        token?.value,
        secret,
        {
          issuer: "https://cloudflare.com/",
          audience: "https://cloudflare.com/",
        }
      );

      return payload as unknown as UserJWTModel;
    } catch (ex) {
      if (ex instanceof JWTClaimValidationFailed) console.error(ex);
    }
  }

  return null;
};
export function authUserMiddlewareAPI(
  accessLevel: EAccessLevel,
  callback: any
) {
  return async (req: NextRequest) => {
    let user: UserJWTModel | null = await getAuthSever();
    console.info(`got custom middleware api user: ${JSON.stringify(user)}`);
    if (user == null || user.accessLevel < accessLevel)
      return NextResponse.json("Not authentificated!");
    return await callback(req, user);
  };
}

export function authUserMiddleware(
  accessLevel: EAccessLevel,
  callback: any
) {
  return async () => {
    let user: UserJWTModel | null = await getAuthSever();
    console.info("user level " + user?.accessLevel);
    if (user == null || user.accessLevel <= 0) redirect("/auth/");

    return await callback(user);
  };
}
