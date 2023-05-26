import {IItemsService} from "./items.service.interface";
import {inject, injectable} from "inversify";
import 'reflect-metadata';
import {NextFunction, Request, Response} from "express";
import {Item} from "./item.entity";
import {ItemCreateDto} from "./dto/item.create.dto";
import {TYPES} from "../types";
import {IItemsRepository} from "./items.repository.interface";
import {Category} from "./category.enum";
import {MiniItem} from "./mini.item.entity";
@injectable()
export class ItemsService implements IItemsService {

    constructor(@inject(TYPES.IItemsRepository) private itemsRepository: IItemsRepository) {
    }

    async createItem(item: ItemCreateDto): Promise<Item | null> {
        console.log(`Creating item in service`)
        const newItem = new Item(item.title, item.category, item.price, item.photos, item.characteristics, item.reviews);
        const existedItemList = await this.itemsRepository.findByName(item.title);
        console.log(existedItemList);
        if(Array.isArray(existedItemList)) {
            if(existedItemList.length > 0) {
                console.log('Return null' + existedItemList);
                return null;
            }
        } else if (existedItemList === null) {
            return this.itemsRepository.create(newItem);
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

   async getItemsLimit(name: string, limit: number, type: string): Promise<MiniItem[] | null> {
       let newItems: Item | Item[] | null = [];
        if(type === 'name')
            newItems = await this.itemsRepository.findByName(name, limit);
        else {
            const catName = this.getEnumFromString(name);
            if(catName)
                newItems = await this.itemsRepository.findByCategory(catName, limit);
            else
                return null;
        }

        let newCreatedItems: MiniItem[] = [];
        if(Array.isArray(newItems)) {
            newCreatedItems = newItems.map((item)=> {
                return new MiniItem(item.title,item.photos[0],item.price);
            });
        } else if(newItems) {
            newCreatedItems.push(new MiniItem(newItems.title,newItems.photos[0],newItems.price));
        }
        return newCreatedItems;
    }

    getOneItem(itemName: string): Promise<Item | null> {
        return this.itemsRepository.findOneByName(itemName);
    }

    async itemToMiniItem(cartItems: string[]): Promise<MiniItem[]> {
        let miniItemsArr: MiniItem[] = [];
        for(let el of cartItems) {
            const mapItem = await this.getOneItem(el);
            if (mapItem)
                miniItemsArr.push(new MiniItem(el, mapItem?.photos[0], mapItem?.price));
            else
                miniItemsArr.push(new MiniItem('item', 'photo', 123));
        }
        return miniItemsArr;
    }

}