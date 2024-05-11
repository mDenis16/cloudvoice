
import { authUserMiddleware } from "@/middlewares/auth-user-middleware";
import UserJWTModel, { EAccessLevel } from "@/middlewares/models/user-jwt-model"

let Page  = authUserMiddleware(EAccessLevel.USER, (user: UserJWTModel) =>{
    return <p>{user.email}</p>
})

export default Page;

export const runtime = 'edge';