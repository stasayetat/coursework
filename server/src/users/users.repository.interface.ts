import {User} from "./user.entity";
import {MiniItem} from "../items/mini.item.entity";

export interface IUsersRepository {
    create: (user: User)=> Promise<User | null>;
    find: (email: string)=> Promise<User | null>;
    findById: (userId: number)=> Promise<User | null>;
    update: (user: User)=> Promise<User | null>;
    addCartItems: (email: string, itemName: string)=> Promise<User | null>;
    addSavedItems: (email: string, itemName: string)=> Promise<User | null>;
    deleteItemFromCart: (email: string, itemName: string)=> Promise<User | null>;
    deleteItemsFromSaved: (email: string, itemName: string)=> Promise<User | null>;
    deleteAllItemFromCart: (email: string)=> Promise<User | null>;
    itemCheckFromSaved: (email: string, itemName: string)=> Promise<boolean>;
}