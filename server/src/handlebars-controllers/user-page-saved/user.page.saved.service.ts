import {IUserPageSavedService} from "./user.page.saved.service.interface";
import {User} from "../../users/user.entity";
import {MiniItem} from "../../items/mini.item.entity";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";
import {IItemsService} from "../../items/items.service.interface";
import {IUsersService} from "../../users/users.service.interface";
import {IUsersRepository} from "../../users/users.repository.interface";
import 'reflect-metadata';
@injectable()
export class UserPageSavedService implements IUserPageSavedService {

    constructor(@inject(TYPES.IItemsService) private itemsService: IItemsService,
                @inject(TYPES.IUsersService) private usersService: IUsersService,
                @inject(TYPES.IUsersRepository) private usersRepository: IUsersRepository,
    ) {
    }
    async addItemToSaved(email: string, itemName: string): Promise<User | null> {
        const addUser = await this.usersService.getInfoUser(email);
        const addItem = await this.itemsService.getOneItem(itemName);
        if(addUser && addItem) {
            if(!addUser.savedItems.includes(addItem.title))
                return this.usersRepository.addSavedItems(email, itemName);
            else
                return null;
        } else {
            return null;
        }
    }

    async deleteSavedItem(email: string, itemName: string): Promise<User | null> {
        return null;
    }

    async getSavedItems(email: string): Promise<MiniItem[] | null> {
        console.log('Getting items');
        const getSavedItemsUser = await this.usersService.getInfoUser(email);
        if(getSavedItemsUser) {
            const savedItems = getSavedItemsUser.savedItems;
            const savedMiniItems = await this.itemsService.itemToMiniItem(savedItems);
            return savedMiniItems;
        }
        else
            return null;
    }

}