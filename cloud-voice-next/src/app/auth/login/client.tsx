"use client";

import Input from "@/app/components/ui/input";
import Link from "next/link";
import { useEffect, useState } from "react";
import Joi from "joi";

import {
  ActionLoginResponse,
  ActionLoginRequest,
  ActionLoginFn,
  EActionLoginResponse,
} from "@/app/actions/auth/login-action-typedef";
import { loginAction } from "@/app/actions/auth/login-action";
import { loginActionSchema } from "@/validators/login-action-validator";
import { useRouter } from "next/navigation";

export default function Client({
  loginAction,
}: {
  loginAction: ActionLoginFn;
}) {
  const router = useRouter();

  const [formState, setFormState] = useState<ActionLoginRequest>({
    username: "",
    password: "",
  });
  const [validationMessages, setValidationMessages] =
    useState<Record<string, string>>();

  const [actionResponseResult, setActionResponseResult] =
    useState<EActionLoginResponse | null>();

  let onChange = (e: React.FormEvent<HTMLInputElement>) => {
    //@ts-ignore
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  let requestLogin = async () => {
    try {
      // setActionResponseResult(null);
      await loginActionSchema().validateAsync(formState);
      setValidationMessages({});
      let response = await loginAction(formState);
      setActionResponseResult(response.result);
      if (response.result == EActionLoginResponse.SUCCESS) {
        console.info("success");
        setTimeout(() => {
          router.replace("/");
        }, 3000);
      }
    } catch (ex: any) {
      if (ex instanceof Joi.ValidationError && ex.details.length > 0) {
        const key = ex.details[0].context?.key as string;
        let messageErrorArray: Record<string, string>;
        setValidationMessages({
          [key]: ex.details[0].message,
        });
      }
    }
  };

  let DisplayActionResult = ({ result }: { result: EActionLoginResponse }) => {
    switch (result) {
      case EActionLoginResponse.SUCCESS:
        return (
          <p className="font-medium text-green-400 mt-4">
            Succesfully logged in. Redirecting in 3 seconds.
          </p>
        );
      case EActionLoginResponse.INVALID_USERNAME_OR_PASSWORD:
        return (
          <p className="font-medium text-red-400 mt-4">
            Invalid username or password. Click here to reset.
          </p>
        );
      case EActionLoginResponse.UNHANDLED_EXCEPTION:
        return (
          <p className="font-medium text-red-400 mt-4">
            Unrecoverable exception happened on our end. Please try again later.
          </p>
        );
      case EActionLoginResponse.VALIDATION_ERROR:
        return (
          <p className="font-medium text-red-400 mt-4">
            Form couldn't be validated. Either was malformated or modified
            before was sent to our end.
          </p>
        );
    }
  };

  return (
    <>
      <div className="mb-4">
        <Input
          type="text"
          name={"username"}
          label={"Username"}
          onChange={onChange}
          value={formState.username}
        />
        {validationMessages && validationMessages["username"] ? (
          <p className="text-red-500 mt-2">{validationMessages["username"]}</p>
        ) : null}
      </div>
      <div className="mb-4">
        <Input
          onChange={onChange}
          type="password"
          name={"password"}
          label={"Password"}
          value={formState?.password}
        />
        {validationMessages && validationMessages["password"] ? (
          <p className="text-red-500 mt-2">{validationMessages["password"]}</p>
        ) : null}
      </div>

      <Link
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        href={"/auth/register"}
      >
        Not registered? Go to register
      </Link>

      <div className="mb-4 mt-4">
        <button
          type="submit"
          onClick={requestLogin}
          className="w-full bg-violet-950 hover:bg-violet-800 xt-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Login
        </button>
        {actionResponseResult !== null ? (
          <DisplayActionResult result={actionResponseResult} />
        ) : null}
      </div>
    </>
  );
}
