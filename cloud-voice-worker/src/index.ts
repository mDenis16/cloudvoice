import "./durable-objects/VoiceSession";
import { VoiceSession } from "./durable-objects/VoiceSession";
import { Env } from "./env";

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    return Response.json({});
  },
};

export { VoiceSession, Env };
