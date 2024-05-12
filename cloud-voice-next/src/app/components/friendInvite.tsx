import React from "react";

export const enum EFriendInviteType {
  INBOUND = 0,
  OUTBOUND = 1,
}

export interface FriendInviteDisplayDataInterface {
  type: EFriendInviteType;
  id: number;
  username: string;
}

export let FriendInvite = ({
  friendInviteDisplayData,
  respondInvite,
}: {
  friendInviteDisplayData: FriendInviteDisplayDataInterface;
  respondInvite?: (id: number, respond: boolean) => Promise<void> | null;
  cancelInvite?: (id: number) => Promise<void> | null;
}) => {
  let _cancelInvite = async () => {
    if (cancelInvite) await cancelInvite(friendInviteDisplayData.id);
  };
  let acceptInvite = async () => {
    if (respondInvite) await respondInvite(friendInviteDisplayData.id, true);
  };
  let rejectInvite = async () => {
    if (respondInvite) await respondInvite(friendInviteDisplayData.id, false);
  };

  let RenderActions = () => {
    if (friendInviteDisplayData.type == EFriendInviteType.INBOUND)
      return (
        <>
          <img
            onClick={acceptInvite}
            className="cursor-pointer round bg-zinc-800 w-8 h-8 p-2"
            style={{ color: "yellow" }}
            src="/assets/icons/accept-checklist.svg"
          ></img>
          <img
            className="cursor-pointer round bg-zinc-800 w-8 h-8 p-2"
            style={{ color: "yellow" }}
            src="/assets/icons/cancel-close.svg"
            onClick={rejectInvite}
          ></img>
        </>
      );
    else if (friendInviteDisplayData.type == EFriendInviteType.OUTBOUND) {
      <img
        className="cursor-pointer round bg-zinc-800 w-8 h-8 p-2"
        style={{ color: "yellow" }}
        src="/assets/icons/cancel-close.svg"
        onClick={_cancelInvite}
      ></img>;
    }
  };
  return (
    <div className="w-full p-3 border-b-2 border-slate-50 flex flex-row justify-center">
      <p className="text-bold w-full">{friendInviteDisplayData.username}</p>
      <div className="flex grid-cols-2 grid gap-2">
        <RenderActions />
      </div>
    </div>
  );
};
