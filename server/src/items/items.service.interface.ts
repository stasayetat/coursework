import {NextFunction, Request, Response} from "express";
import {Item} from "./item.entity";
import {ItemCreateDto} from "./dto/item.create.dto";
import {MiniItem} from "./mini.item.entity";
export interface IItemsService {
    createItem: (item: ItemCreateDto)=> Promise<Item | null>;
    getItems: (name: string, findType: 'name' | 'category')=> Promise<Item | Item[] | null>;
    deleteItems: (name: string)=> Promise<Item | null>;
    getItemsLimit: (name: string, limit: number, type: string)=> Promise<MiniItem[] | null>;
    getOneItem: (itemName: string)=> Promise<Item | null>;
    itemToMiniItem: (cartItems: string[])=> Promise<MiniItem[]>;
}