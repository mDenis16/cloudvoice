"use client";

import Input from "@/app/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { ActionRegisterRequest } from "./actions";

let Client = async () => {
  const [formState, setFormState] = useState<ActionRegisterRequest>();
  const [validationMessages, setValidationMessages] = useState([]);

  let submitForm = async (ev: any) => {};
  return (
    <form action="#" method="POST">
      <div className="mb-4">
        <Input type="text" label={"Username"} value={formState?.username} />
        {validationMessages[0] ? (
          <p className="text-red-500 mt-2">{validationMessages[0]}</p>
        ) : null}
      </div>
      <div className="mb-4">
        <Input type="text" label={"Email"} value={formState?.email} />
        {validationMessages[0] ? (
          <p className="text-red-500 mt-2">{validationMessages[1]}</p>
        ) : null}
      </div>
      <div className="mb-4">
        <Input type="text" label={"Password"} value={formState?.password} />
          {validationMessages[0] ? (
          <p className="text-red-500 mt-2">{validationMessages[2]}</p>
        ) : null}
      </div>
      <div className="mb-4">
        <Input
          type="text"
          label={"Invite code"}
          value={formState?.inviteCode}
        />
          {validationMessages[0] ? (
          <p className="text-red-500 mt-2">{validationMessages[3]}</p>
        ) : null}
      </div>

      <Link href={"/auth/login"}>
        <p className="mb-4">Already existing account?</p>
      </Link>

      <div className="mb-4">
        <button
          type="submit"
          onClick={submitForm}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </div>
    </form>
  );
};
export default Client;
