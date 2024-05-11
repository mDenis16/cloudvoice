"use server";

import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { any } from "joi";

const databaseInstance = {
  adapter: null,
  client: null,
  init: false,
};

let getDatabase = (): PrismaClient => {
  let cloudflare_db = getRequestContext().env.DB;

  if (!databaseInstance.init) {
    databaseInstance.adapter = new PrismaD1(cloudflare_db) as PrismaD1 as any;

    databaseInstance.client = new PrismaClient({
      adapter: databaseInstance.adapter,
    }) as any;
    databaseInstance.init = true;
  }

  return databaseInstance.client as unknown as PrismaClient;
};
export default getDatabase;
