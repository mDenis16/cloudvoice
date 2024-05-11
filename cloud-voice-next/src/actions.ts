'use server';

// import useDatabase from "@/database/use-database";

export async function CallOnServer() {
  console.info('CallOnServer on server')
}


// async function registerAction(
//   request: ActionRegisterRequest
// ): Promise<ActionRegisterResponse> {
//   "use server";
//   // let user = await useDatabase().user.findFirst({
//   //   where: { email: request.email },
//   // });
//   // if (!user) return { result: EActionRegisterRepsonse.DUPLICATE_EMAIL };
//   // console.info("mearas secundele");
//   console.info('called on server')
//   return { result: EActionRegisterResponse.SUCCESS };
// }