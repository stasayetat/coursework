import {User} from "../../users/user.entity";
import {MiniItem} from "../../items/mini.item.entity";
import {Item} from "../../items/item.entity";

export interface IOrderPageService {
    addItemToCart(email: string, itemName: string): Promise<User | null>;
    getCartItems(email: string): Promise<MiniItem[] | null>;
    deleteCartItem(email: string,itemName: string): Promise<User | null>;
    deleteAllCartItem(email: string): Promise<User | null>;
}