import getDatabase from "@/database/get-database";
import type * as Prisma from "@prisma/client";
import { registerActionSchema } from "@/validators/register-action-validator";
import Joi from "joi";
import { verifyPassword } from "@/app/utilities/crypto";
import * as jose from "jose";

import {
  ActionLoginRequest,
  ActionLoginResponse,
  EActionLoginResponse,
} from "./login-action-typedef";
import { loginActionSchema } from "@/validators/login-action-validator";
import { cookies } from "next/headers";
import UserJWTModel from "@/middlewares/models/user-jwt-model";
import { getRequestContext } from "@cloudflare/next-on-pages";

export async function loginAction(
  request: ActionLoginRequest
): Promise<ActionLoginResponse> {
  "use server";
  try {
    await loginActionSchema().validateAsync(request);

    let prisma = await getDatabase();
    let user = await prisma?.user.findFirst({
      where: { username: request.username },
    });

    if (user == null || !verifyPassword(user.password, request.password))
      return { result: EActionLoginResponse.INVALID_USERNAME_OR_PASSWORD };

    let jwtSecureKey = getRequestContext().env.jwt_secret_key;
    const secret = new TextEncoder().encode(jwtSecureKey);

    const alg = "HS256";

    const jwtToken = await new jose.SignJWT({
      id: user.id,
      username: user.username,
      email: user.email,
      accessLevel: 0,
    })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer("https://cloudflare.com/")
      .setAudience("https://cloudflare.com/")
      .setExpirationTime("12h")
      .sign(secret);

    cookies().set("_jwt", jwtToken, { maxAge: 36503, path: "/" });

    return { result: EActionLoginResponse.SUCCESS };
  } catch (ex: any) {
    if (ex instanceof Joi.ValidationError && ex.details.length > 0)
      return { result: EActionLoginResponse.VALIDATION_ERROR };

    console.error("EXCEPTION: " + ex);
    /* may log to some external provider */
    return { result: EActionLoginResponse.UNHANDLED_EXCEPTION };
  }
}
