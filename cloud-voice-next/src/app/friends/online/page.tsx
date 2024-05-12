import getDatabase from "@/database/get-database";
import { authUserMiddleware } from "@/middlewares/auth-user-middleware";
import UserJWTModel, {
  EAccessLevel,
} from "@/middlewares/models/user-jwt-model";
import { useState } from "react";

let Page = authUserMiddleware(EAccessLevel.USER, async (user: UserJWTModel) => {


  return (
    <div className="w-full h-full bg-gray-800 flex flex-col">
   
      <p className="text-normal p-5 font-xl">Online friends</p>

      <div className="w-full h-128 bg-gray-500 p-5">
        
      </div>
    </div>
  );
});

export default Page;

export const runtime = "edge";
