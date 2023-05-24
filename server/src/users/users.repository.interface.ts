import {User} from "./user.entity";

export interface IUsersRepository {
    create: (user: User)=> Promise<User | null>;
    find: (email: string)=> Promise<User | null>;
    findById: (userId: number)=> Promise<User | null>;
    update: (user: User)=> Promise<User | null>;
}