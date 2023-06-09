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
exports.UserPageSavedService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../../types");
require("reflect-metadata");
let UserPageSavedService = class UserPageSavedService {
    constructor(itemsService, usersService, usersRepository) {
        this.itemsService = itemsService;
        this.usersService = usersService;
        this.usersRepository = usersRepository;
    }
    async addItemToSaved(email, itemName) {
        const addUser = await this.usersService.getInfoUser(email);
        const addItem = await this.itemsService.getOneItem(itemName);
        if (addUser && addItem) {
            if (!addUser.savedItems.includes(addItem.title))
                return this.usersRepository.addSavedItems(email, itemName);
            else
                return null;
        }
        else {
            return null;
        }
    }
    async deleteSavedItem(email, itemName) {
        return null;
    }
    async getSavedItems(email) {
        console.log('Getting items');
        const getSavedItemsUser = await this.usersService.getInfoUser(email);
        if (getSavedItemsUser) {
            const savedItems = getSavedItemsUser.savedItems;
            const savedMiniItems = await this.itemsService.itemToMiniItem(savedItems);
            return savedMiniItems;
        }
        else
            return null;
    }
};
UserPageSavedService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IItemsService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.IUsersService)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.IUsersRepository)),
    __metadata("design:paramtypes", [Object, Object, Object])
], UserPageSavedService);
exports.UserPageSavedService = UserPageSavedService;
//# sourceMappingURL=user.page.saved.service.js.map