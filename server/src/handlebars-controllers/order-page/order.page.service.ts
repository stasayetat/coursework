import {IOrderPageService} from "./order.page.service.interface";
import {User} from "../../users/user.entity";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";
import {IItemsService} from "../../items/items.service.interface";
import {IUsersService} from "../../users/users.service.interface";
import {IUsersRepository} from "../../users/users.repository.interface";
import 'reflect-metadata';
import {MiniItem} from "../../items/mini.item.entity";
import {Item} from "../../items/item.entity";
@injectable()
export class OrderPageService implements IOrderPageService {
    constructor(@inject(TYPES.IItemsService) private itemsService: IItemsService,
                @inject(TYPES.IUsersService) private usersService: IUsersService,
                @inject(TYPES.IUsersRepository) private usersRepository: IUsersRepository,
                ) {
    }
    async addItemToCart(email: string, itemName: string): Promise<User | null> {
        const addUser = await this.usersService.getInfoUser(email);
        const addItem = await this.itemsService.getOneItem(itemName);
        if(addUser && addItem) {
            if(!addUser.cartItems.includes(addItem.title))
                return this.usersRepository.addCartItems(email, itemName);
            else
                return null;
        } else {
            return null;
        }
    }


    async getCartItems(email: string): Promise<MiniItem[] | null> {
        console.log('Getting items');
        const getCartItemsUser = await this.usersService.getInfoUser(email);
        if(getCartItemsUser) {
            const cartItems = getCartItemsUser.cartItems;
            const cartMiniItems = await this.itemsService.itemToMiniItem(cartItems);
            return cartMiniItems;
        }
        else
            return null;

    }




    async deleteCartItem(email: string, itemName: string): Promise<User | null> {
        const addUser = await this.usersService.getInfoUser(email);
        if(addUser) {
            return this.usersRepository.deleteItemFromCart(email, itemName);
        } else {
            return null;
        }
    }

    async deleteAllCartItem(email: string): Promise<User | null> {
        const addUser = await this.usersService.getInfoUser(email);
        if(addUser) {
            return this.usersRepository.deleteAllItemFromCart(email);
        } else {
            return null;
        }
    }

}