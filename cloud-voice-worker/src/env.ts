import { DurableObjectNamespace } from "@cloudflare/workers-types";

export interface Env {
	VoiceSessions: DurableObjectNamespace;
};