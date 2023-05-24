import {NextFunction, Request, Response} from "express";
import {Item} from "./item.entity";
import {ItemCreateDto} from "./dto/item.create.dto";
export interface IItemsService {
    createItem: (item: ItemCreateDto)=> Promise<Item | null>;
    getItems: (name: string, findType: 'name' | 'category')=> Promise<Item | Item[] | null>;
    deleteItems: (name: string)=> Promise<Item | null>;
}