"use client";

import Input from "@/app/components/ui/input";
import Link from "next/link";
import { useEffect, useState } from "react";
import Joi from "joi";
import { EFriendInviteType, FriendInvite } from "@/app/components/friendInvite";

import { useRouter } from "next/navigation";
import React from "react";
import {
  ActionFriendFn,
  ActionFriendInviteRequest,
  EActionFriendInviteResponseResult,
  ActionFriendInviteResponse,
} from "@/app/actions/friends/friend-invite-action-typedef";
import { friendInviteActionSchema } from "@/validators/friend-invite-validators";
import { ActionFriendRespondFn } from "../../actions/friends/friend-respond-action-typedef";
import {
  ActionFriendInviteModel,
  ActionGetFriendInvitesFn,
} from "@/app/actions/friends/get-friend-invites-action-typedef";
import UserJWTModel from "@/middlewares/models/user-jwt-model";

export default function Client({
  friendInviteAction,
  friendRespondAction,
  getFriendInvitesAction,
  userJWTData,
  friendInvitesSSR,
}: {
  friendInviteAction: ActionFriendFn;
  friendRespondAction: ActionFriendRespondFn;
  getFriendInvitesAction: ActionGetFriendInvitesFn;
  friendInvitesSSR: Array<ActionFriendInviteModel> | null;
  userJWTData: UserJWTModel;
}) {
  const router = useRouter();

  const [formState, setFormState] = useState<ActionFriendInviteRequest>({
    username: "",
  });
  const [validationMessages, setValidationMessages] =
    useState<Record<string, string>>();

  const [friendInvites, setFriendInvites] =
    useState<Array<ActionFriendInviteModel> | null>(friendInvitesSSR);

  const [actionResponseResult, setActionResponseResult] = useState<
    EActionFriendInviteResponseResult | undefined
  >();

  let onChange = (e: React.FormEvent<HTMLInputElement>) => {
    //@ts-ignore
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  let requestFriendInvite = async () => {
    try {
      // setActionResponseResult(null);
      await friendInviteActionSchema().validateAsync(formState);
      setValidationMessages({});
      let response = await friendInviteAction(formState);

      console.info("invites " + JSON.stringify(response));
      setActionResponseResult(response.result);
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
  let respondInvite = async (id: number, respond: boolean ) => {
    await friendRespondAction
  }

  let DisplayActionResult = ({
    result,
  }: {
    result: EActionFriendInviteResponseResult;
  }) => {
    switch (result) {
      case EActionFriendInviteResponseResult.SUCCESS:
        return (
          <p className="font-medium text-green-400 mt-4">
            Succesfully sent friend invite. Hope they will accept it soon!
          </p>
        );
      case EActionFriendInviteResponseResult.INVALID_USERNAME:
        return (
          <p className="font-medium text-red-400 mt-4">Username not found.</p>
        );
      case EActionFriendInviteResponseResult.UNHANDLED_EXCEPTION:
        return (
          <p className="font-medium text-red-400 mt-4">
            Unrecoverable exception happened on our end. Please try again later.
          </p>
        );
      case EActionFriendInviteResponseResult.CANNOT_INVITE_YOURSELF:
        return (
          <p className="font-medium text-red-400 mt-4">
            Please try to not invite yourself again.
          </p>
        );

      case EActionFriendInviteResponseResult.VALIDATION_ERROR:
        return (
          <p className="font-medium text-red-400 mt-4">
            Form couldn't be validated. Either was malformated or modified
            before was sent to our end.
          </p>
        );
    }
  };

  return (
    <div className="w-full flex flex-col">
      <p className="pl-5 pt-5 text-blue-300 text-bold text-xl">Add friend</p>
      <p className="pt-2 pl-5 text-gray-500">
        You can add friends by typing their username
      </p>
      <div className="pt-5 pl-5 pr-5 flex flex-row">
        <Input
          type="text"
          name={"username"}
          placeholder={"Username"}
          onChange={onChange}
          value={formState.username}
        />
        <button
          type="submit"
          onClick={requestFriendInvite}
          className="ml-5 bg-violet-950 hover:bg-violet-800 xt-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Send friend request
        </button>
       
      </div>

      <div className="pl-5">
        {actionResponseResult !== undefined ? (
          <DisplayActionResult result={actionResponseResult} />
        ) : null}
         {validationMessages && validationMessages["username"] ? (
          <p className="text-red-500 mt-2">{validationMessages["username"]}</p>
        ) : null}
      </div>
      <div className="w-full flex flex-col p-5">
        <p className="text-bold text-xl">Received invites</p>
        <div className="w-full pt-2">
          {friendInvites &&
            friendInvites
              .filter((invite) => invite.receiverId == userJWTData.id)
              .map((inviteModel) => {
                return (
                  <FriendInvite
                    key={inviteModel.id}
                    friendInviteDisplayData={{
                      username: inviteModel.receiver.username,
                      id: inviteModel.id,
                      type: EFriendInviteType.INBOUND,
                    }}
                  />
                );
              })}
        </div>
      </div>
      <div className="w-full flex flex-col p-5">
        <p className="text-bold text-xl">Sent invites</p>
        <div className="w-full pt-2">
          {friendInvites &&
            friendInvites
              .filter((invite) => invite.senderId == userJWTData.id)
              .map((inviteModel) => {
                return (
                  <FriendInvite
                    key={inviteModel.id}
                    friendInviteDisplayData={{
                      username: inviteModel.receiver.username,
                      id: inviteModel.id,
                      type: EFriendInviteType.OUTBOUND,
                    }}
                    respondInvite={respondInvite}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
}
