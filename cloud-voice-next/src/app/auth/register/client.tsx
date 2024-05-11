"use client";

import Input from "@/app/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import Joi from "joi";

import {
  ActionRegisterResponse,
  ActionRegisterRequest,
  ActionRegisterFn,
  EActionRegisterResponse,
} from "@/app/actions/auth/register-action-typedef";
import { registerActionSchema } from "@/validators/register-action-validator";

export default function Client({registerAction}: {registerAction: ActionRegisterFn}) {
  const [formState, setFormState] = useState<ActionRegisterRequest>({
    username: "",
    password: "",
    email: "",
    inviteCode: "",
  });
  const [validationMessages, setValidationMessages] =
    useState<Record<string, string>>();

  const [actionResponseResult, setActionResponseResult] =
    useState<EActionRegisterResponse | null>();

  let onChange = (e: React.FormEvent<HTMLInputElement>) => {
    //@ts-ignore
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  let requestRegister = async () => {
    try {
       await registerActionSchema().validateAsync(formState);

      let response = await registerAction(formState);

      if (response.result == EActionRegisterResponse.DUPLICATE_EMAIL)
        setValidationMessages({ ["email"]: "Email is already registered." });
      else if (response.result == EActionRegisterResponse.DUPLICATE_USERNAME)
        setValidationMessages({ ["username"]: "Username is already in use." });

      setActionResponseResult(response.result);

      console.info("merge secundele " + JSON.stringify(response));
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

  let DisplayActionResult = ({
    result,
  }: {
    result: EActionRegisterResponse;
  }) => {
    switch (result) {
      case EActionRegisterResponse.UNHANDLED_EXCEPTION:
        return (
          <p className="font-medium text-red-400 mt-4">
            Unrecoverable exception happened on our end. Please try again later.
          </p>
        );
      case EActionRegisterResponse.VALIDATION_ERROR:
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
          type="text"
          name={"email"}
          label={"Email"}
          value={formState?.email}
        />
        {validationMessages && validationMessages["email"] ? (
          <p className="text-red-500 mt-2">{validationMessages["email"]}</p>
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
      <div className="mb-4">
        <Input
          onChange={onChange}
          type="text"
          label={"Invite code"}
          name={"inviteCode"}
          value={formState?.inviteCode}
        />
        {validationMessages && validationMessages["inviteCode"] ? (
          <p className="text-red-500 mt-2">
            {validationMessages["inviteCode"]}
          </p>
        ) : null}
      </div>

      <Link
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        href={"/auth/login"}
      >
        Already existing account?
      </Link>

      <div className="mb-4 mt-4">
        <button
          type="submit"
          onClick={requestRegister}
          className="w-full bg-violet-950 hover:bg-violet-800 xt-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Register
        </button>
        {actionResponseResult ? (
          <DisplayActionResult result={actionResponseResult} />
        ) : null}
        
      </div>
    </>
  );
}
