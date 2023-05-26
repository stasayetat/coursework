import {Item} from "./item.entity";
import {Category} from "./category.enum";
import {Review} from "./reviews/review.entity";

export interface IItemsRepository {
    create: (item: Item)=> Promise<Item | null>;
    findByName: (name: string, limit?: number)=> Promise<Item | Item[] | null>;
    findByCategory: (category: Category, limit?: number)=> Promise<Item | Item[] | null>;
    findById: (itemId: number)=> Promise<Item | null>;
    delete: (itemId: number)=> Promise<Item | null>;
    deleteByName: (name: string)=> Promise<Item | null>;
    addReviewToItems: (review: Review, name: string)=> Promise<Item | null>;
    findOneByName: (name: string)=> Promise<Item | null>;
}