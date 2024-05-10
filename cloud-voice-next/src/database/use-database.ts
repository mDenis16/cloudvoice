import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client";
import { getRequestContext } from "@cloudflare/next-on-pages";

let useDatabase = () => {
  let cloudflare_db = getRequestContext().env.DB;

  const adapter = new PrismaD1(cloudflare_db);
  const prisma = new PrismaClient({ adapter });
  return prisma;
};
export default useDatabase;