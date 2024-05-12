import React from "react";

export interface FriendDisplayDataInterface {
  username: string;
}

export let FriendDisplay = ({
    friendDisplay
}: {
 friendDisplay: FriendDisplayDataInterface
}) => {

  return (
    <div className="w-full p-3 border-b-2 border-slate-50 flex flex-row justify-center">
      <p className="text-bold w-full">{friendDisplay.username}</p>
      <div className="flex grid-cols-2 grid gap-2">
       
      </div>
    </div>
  );
};
