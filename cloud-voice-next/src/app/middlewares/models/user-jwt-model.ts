export enum EAccessLevel {
    USER = 0,
    MODERATOR = 1,
    ADMIN = 2
}
export default interface UserJWTModel {
    id: number
    username: string
    email: string
    accessLevel: EAccessLevel
};
