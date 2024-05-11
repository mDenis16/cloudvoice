
import getDatabase from "@/database/get-database";
import type * as Prisma from "@prisma/client";
import { registerActionSchema } from "@/validators/register-action-validator";
import Joi from "joi";
import {hashPassword} from '@/app/utilities/crypto'

import {
  ActionRegisterRequest,
  EActionRegisterResponse,
  ActionRegisterResponse,
} from "./register-action-typedef";

export async function registerAction(request: ActionRegisterRequest
): Promise<ActionRegisterResponse>  {
  "use server";
  try {
    await registerActionSchema().validateAsync(request);
    let prisma = await getDatabase();
    let existing = await prisma?.user.findFirst({
      where: { OR: [{ username: request.username }, { email: request.email }] },
    });

    if (existing !== null && existing?.email == request.email)
      return { result: EActionRegisterResponse.DUPLICATE_EMAIL };
    if (existing !== null && existing?.username == request.username)
      return { result: EActionRegisterResponse.DUPLICATE_USERNAME };

    const hashedPassword = await hashPassword(request.password);
 
    const user = await getDatabase().user.create({
      data: {
        email: request.email,
        username: request.username,
        password: hashedPassword,
      },
    });

    return { result: EActionRegisterResponse.SUCCESS };
  } catch (ex: any) {
    if (ex instanceof Joi.ValidationError && ex.details.length > 0)
      return { result: EActionRegisterResponse.VALIDATION_ERROR };

    console.error("EXCEPTION: " + ex);
    /* may log to some external provider */
    return { result: EActionRegisterResponse.UNHANDLED_EXCEPTION };
  }
};
