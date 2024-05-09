import { useAuthUserMiddleware } from "@/app/middlewares/auth-user-middleware";
import UserJWTModel, { EAccessLevel } from "@/app/middlewares/models/user-jwt-model";

let Page  = useAuthUserMiddleware(EAccessLevel.USER, (user: UserJWTModel) =>{
    return <p>{user.email}</p>
})

export default Page;
export const runtime = 'edge';