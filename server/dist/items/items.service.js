"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsService = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const item_entity_1 = require("./item.entity");
const types_1 = require("../types");
const category_enum_1 = require("./category.enum");
const mini_item_entity_1 = require("./mini.item.entity");
let ItemsService = class ItemsService {
    constructor(itemsRepository) {
        this.itemsRepository = itemsRepository;
    }
    async createItem(item) {
        console.log(`Creating item in service`);
        const newItem = new item_entity_1.Item(item.title, item.category, item.price, item.photos, item.characteristics, item.reviews);
        const existedItemList = await this.itemsRepository.findByName(item.title);
        console.log(existedItemList);
        if (Array.isArray(existedItemList)) {
            if (existedItemList.length > 0) {
                console.log('Return null' + existedItemList);
                return null;
            }
        }
        else if (existedItemList === null) {
            return this.itemsRepository.create(newItem);
        }
        return this.itemsRepository.create(newItem);
    }
    async deleteItems(name) {
        return this.itemsRepository.deleteByName(name);
    }
    async getItems(name, findType) {
        if (findType === 'name') {
            return this.itemsRepository.findByName(name);
        }
        else if (findType === 'category') {
            const categoryName = this.getEnumFromString(name);
            if (categoryName)
                return this.itemsRepository.findByCategory(categoryName);
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }
    getEnumFromString(value) {
        const enumValues = Object.values(category_enum_1.Category);
        for (let enumKey of enumValues) {
            if (category_enum_1.Category[enumKey] === value) {
                return category_enum_1.Category[enumKey];
            }
        }
        return undefined;
    }
    async getItemsLimit(name, limit, type) {
        let newItems = [];
        if (type === 'name')
            newItems = await this.itemsRepository.findByName(name, limit);
        else {
            const catName = this.getEnumFromString(name);
            if (catName)
                newItems = await this.itemsRepository.findByCategory(catName, limit);
            else
                return null;
        }
        let newCreatedItems = [];
        if (Array.isArray(newItems)) {
            newCreatedItems = newItems.map((item) => {
                return new mini_item_entity_1.MiniItem(item.title, item.photos[0], item.price);
            });
        }
        else if (newItems) {
            newCreatedItems.push(new mini_item_entity_1.MiniItem(newItems.title, newItems.photos[0], newItems.price));
        }
        return newCreatedItems;
    }
    getOneItem(itemName) {
        return this.itemsRepository.findOneByName(itemName);
    }
    async itemToMiniItem(cartItems) {
        let miniItemsArr = [];
        for (let el of cartItems) {
            const mapItem = await this.getOneItem(el);
            if (mapItem)
                miniItemsArr.push(new mini_item_entity_1.MiniItem(el, mapItem?.photos[0], mapItem?.price));
            else
                miniItemsArr.push(new mini_item_entity_1.MiniItem('item', 'photo', 123));
        }
        return miniItemsArr;
    }
};
ItemsService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IItemsRepository)),
    __metadata("design:paramtypes", [Object])
], ItemsService);
exports.ItemsService = ItemsService;
//# sourceMappingURL=items.service.js.map