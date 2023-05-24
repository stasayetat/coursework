import {IItemsService} from "./items.service.interface";
import {inject, injectable} from "inversify";
import 'reflect-metadata';
import {NextFunction, Request, Response} from "express";
import {Item} from "./item.entity";
import {ItemCreateDto} from "./dto/item.create.dto";
import {TYPES} from "../types";
import {IItemsRepository} from "./items.repository.interface";
import {Category} from "./category.enum";
@injectable()
export class ItemsService implements IItemsService {

    constructor(@inject(TYPES.IItemsRepository) private itemsRepository: IItemsRepository) {
    }

    async createItem(item: ItemCreateDto): Promise<Item | null> {
        console.log(`Creating item in service`)
        const newItem = new Item(item.title, item.category, item.price, item.photos, item.characteristics);
        const existedItemList = await this.itemsRepository.findByName(item.title);
        console.log(existedItemList);
        if(Array.isArray(existedItemList)) {
            if(existedItemList.length > 0) {
                console.log('Return null' + existedItemList);
                return null;
            }
        } else if (existedItemList === null) {
            console.log('Return null');
            return null;
        }
        return this.itemsRepository.create(newItem);
    }

    async deleteItems(name: string): Promise<Item | null> {
        return this.itemsRepository.deleteByName(name);
    }

    async getItems(name: string, findType: string): Promise<Item | Item[] | null> {
        if(findType === 'name') {
            return this.itemsRepository.findByName(name);
        } else if(findType === 'category') {
            const categoryName = this.getEnumFromString(name);
            if(categoryName)
                return this.itemsRepository.findByCategory(categoryName);
            else {
                return null;
            }
        } else {
            return null;
        }
    }

    getEnumFromString(value: string): Category | undefined {
        const enumValues = Object.values(Category);
        for(let enumKey of enumValues) {
            if(Category[enumKey] === value) {
                return Category[enumKey];
            }
        }
        return undefined;
    }

}