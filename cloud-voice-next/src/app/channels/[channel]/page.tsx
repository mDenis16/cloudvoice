import { authUserMiddleware } from "@/middlewares/auth-user-middleware";
import UserJWTModel, {
  EAccessLevel,
} from "@/middlewares/models/user-jwt-model";
import { useState } from "react";

let Page = authUserMiddleware(EAccessLevel.USER, (user: UserJWTModel) => {
  return (
    <div className="flex-1 flex flex-col">
      {/* Chat header */}
      <div className="bg-gray-950 font-medium border-b-2 border-gray-800 p-4">
        Conferinta smecherilor
      </div>
      <div className="flex flex-row h-full">
        <div className="flex flex-col w-full h-full bg-gray-950">
          <div className="w-full h-full bg-gray-800">MEssages content</div>
          <div className="w-full h-128 bg-gray-400 p-10">Send Message</div>
        </div>
        <div className="w-1/4 h-full bg-gray-900">
          {/* Sidebar content */}
          <div className="text-white p-4 text-center">Participants</div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center p-4">
              <div className="w-7 h-7 rounded-full mr-2 bg-gray-200"></div>
              <span className="text-white">denis</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Page;

export const runtime = "edge";
