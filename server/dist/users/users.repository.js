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
exports.UsersRepository = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const mongoose_1 = require("mongoose");
const types_1 = require("../types");
let UsersRepository = class UsersRepository {
    constructor(mongooseService, itemsService) {
        this.mongooseService = mongooseService;
        this.itemsService = itemsService;
        this.userSchema = new mongoose_1.Schema({
            email: { type: String, required: true },
            password: { type: String, required: true },
            name: { type: String, required: false },
            surname: { type: String, required: false },
            cartItems: { type: [String], required: false },
            savedItems: { type: [String], required: false },
            orders: { type: [String], required: false }
        });
        this.dataUser = this.mongooseService.mongoose.model('User', this.userSchema);
    }
    async create(user) {
        const newUser = new this.dataUser({
            email: user.email,
            password: user.password
        });
        return this.dataUser.create(newUser);
    }
    async find(email) {
        return this.dataUser.findOne({ email });
    }
    async update(user) {
        return this.dataUser.findOneAndUpdate({
            email: user.email
        }, {
            name: user.name,
            surname: user.surname,
            password: user.password,
            cartItems: user.cartItems,
            savedItems: user.savedItems,
            orders: user.orders
        });
    }
    findById(userId) {
        return this.dataUser.findById(userId);
    }
    async addCartItems(email, itemName) {
        const updatedUser = await this.dataUser.findOneAndUpdate({
            email: email
        }, {
            $push: { cartItems: itemName }
        });
        return updatedUser;
    }
    async addSavedItems(email, itemName) {
        const updatedUser = await this.dataUser.findOneAndUpdate({
            email: email
        }, {
            $push: { savedItems: itemName }
        });
        return updatedUser;
    }
    async deleteItemFromCart(email, itemName) {
        const deletedCartUsers = await this.dataUser.findOneAndUpdate({ email: email }, {
            $pull: { cartItems: itemName }
        });
        return deletedCartUsers;
    }
    async deleteAllItemFromCart(email) {
        const deletedCartUsers = await this.dataUser.findOneAndUpdate({ email: email }, {
            $unset: { cartItems: '' }
        });
        return deletedCartUsers;
    }
    async deleteItemsFromSaved(email, itemName) {
        const deletedSavedUsers = await this.dataUser.findOneAndUpdate({ email: email }, {
            $pull: { savedItems: itemName }
        });
        return deletedSavedUsers;
    }
    async itemCheckFromSaved(email, itemName) {
        const ifItemSaved = await this.dataUser.findOne({
            email: email,
            savedItems: { $in: [itemName] }
        });
        if (ifItemSaved) {
            return true;
        }
        else {
            return false;
        }
    }
};
UsersRepository = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IMongooseService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.IItemsService)),
    __metadata("design:paramtypes", [Object, Object])
], UsersRepository);
exports.UsersRepository = UsersRepository;
//# sourceMappingURL=users.repository.js.map