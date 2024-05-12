import { DurableObjectState } from "@cloudflare/workers-types";
import {Env} from "../env";

export class VoiceSession {
	state: DurableObjectState;
	env: any;
	clients: Array<WebSocket>;
    constructor(state: DurableObjectState, env: Env) {

    }
    async fetch(request: Request): Promise<Response> {
        return Response.json({});
    }
};
