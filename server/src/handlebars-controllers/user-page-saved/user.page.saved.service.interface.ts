import {User} from "../../users/user.entity";
import {MiniItem} from "../../items/mini.item.entity";

export interface IUserPageSavedService {
    addItemToSaved(email: string, itemName: string): Promise<User | null>;
    getSavedItems(email: string): Promise<MiniItem[] | null>;
    deleteSavedItem(email: string,itemName: string): Promise<User | null>;
}