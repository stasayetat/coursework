import {Item} from "./item.entity";
import {Category} from "./category.enum";

export interface IItemsRepository {
    create: (item: Item)=> Promise<Item | null>;
    findByName: (name: string)=> Promise<Item | Item[] | null>;
    findByCategory: (category: Category)=> Promise<Item | Item[] | null>;
    findById: (itemId: number)=> Promise<Item | null>;
    delete: (itemId: number)=> Promise<Item | null>;
    deleteByName: (name: string)=> Promise<Item | null>;
}