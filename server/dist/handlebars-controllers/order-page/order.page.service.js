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
exports.OrderPageService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../../types");
require("reflect-metadata");
let OrderPageService = class OrderPageService {
    constructor(itemsService, usersService, usersRepository) {
        this.itemsService = itemsService;
        this.usersService = usersService;
        this.usersRepository = usersRepository;
    }
    async addItemToCart(email, itemName) {
        const addUser = await this.usersService.getInfoUser(email);
        const addItem = await this.itemsService.getOneItem(itemName);
        if (addUser && addItem) {
            if (!addUser.cartItems.includes(addItem.title))
                return this.usersRepository.addCartItems(email, itemName);
            else
                return null;
        }
        else {
            return null;
        }
    }
    async getCartItems(email) {
        console.log('Getting items');
        const getCartItemsUser = await this.usersService.getInfoUser(email);
        if (getCartItemsUser) {
            const cartItems = getCartItemsUser.cartItems;
            const cartMiniItems = await this.itemsService.itemToMiniItem(cartItems);
            return cartMiniItems;
        }
        else
            return null;
    }
    async deleteCartItem(email, itemName) {
        const addUser = await this.usersService.getInfoUser(email);
        if (addUser) {
            return this.usersRepository.deleteItemFromCart(email, itemName);
        }
        else {
            return null;
        }
    }
    async deleteAllCartItem(email) {
        const addUser = await this.usersService.getInfoUser(email);
        if (addUser) {
            return this.usersRepository.deleteAllItemFromCart(email);
        }
        else {
            return null;
        }
    }
};
OrderPageService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IItemsService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.IUsersService)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.IUsersRepository)),
    __metadata("design:paramtypes", [Object, Object, Object])
], OrderPageService);
exports.OrderPageService = OrderPageService;
//# sourceMappingURL=order.page.service.js.map