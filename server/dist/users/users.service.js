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
exports.UsersService = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const types_1 = require("../types");
const user_entity_1 = require("./user.entity");
const bcryptjs_1 = require("bcryptjs");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async createUser(userDto) {
        console.log(`CreateUser in users.service here userDTO is ${userDto.email} - ${userDto.password}`);
        const newUser = new user_entity_1.User(userDto.email);
        await newUser.setPassword(userDto.password, 10);
        const existedUser = await this.usersRepository.find(userDto.email);
        if (existedUser) {
            return null;
        }
        else {
            return this.usersRepository.create(newUser);
        }
    }
    async getInfoUser(email) {
        return this.usersRepository.find(email);
    }
    async validateUser(userDto) {
        const loginUser = await this.usersRepository.find(userDto.email);
        if (!loginUser) {
            console.log('User not find');
            return false;
        }
        else {
            console.log(`Pass - ${userDto.password}`);
            const res = await (0, bcryptjs_1.compare)(userDto.password, loginUser.password);
            if (res) {
                console.log('All is good');
                return true;
            }
            else {
                console.log('Bad password');
                return false;
            }
        }
    }
    async getInfoUserById(id) {
        return this.usersRepository.findById(id);
    }
    async updateUserInformation(userDto) {
        const updatedUser = new user_entity_1.User(userDto.email);
        updatedUser.name = userDto?.name;
        updatedUser.surname = userDto?.surname;
        if (userDto.newPassword) {
            await updatedUser.setPassword(userDto.newPassword, 10);
        }
        else {
            await updatedUser.setPassword(userDto.prevPassword, 10);
        }
        console.log(JSON.stringify(updatedUser));
        return this.usersRepository.update(updatedUser);
    }
    async checkItemSaved(email, name) {
        return this.usersRepository.itemCheckFromSaved(email, name);
    }
};
UsersService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IUsersRepository)),
    __metadata("design:paramtypes", [Object])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map