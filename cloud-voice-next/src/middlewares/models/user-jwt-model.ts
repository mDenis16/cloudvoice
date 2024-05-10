export enum EAccessLevel {
    NONE,
    USER = 1,
    MODERATOR = 2,
    ADMIN = 3
}
export default interface UserJWTModel {
    id: number
    username: string
    email: string
    accessLevel: EAccessLevel
};
