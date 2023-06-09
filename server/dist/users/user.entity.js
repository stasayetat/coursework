"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcryptjs_1 = require("bcryptjs");
class User {
    constructor(_email) {
        this._email = _email;
    }
    get password() {
        return this._password;
    }
    get email() {
        return this._email;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get surname() {
        return this._surname;
    }
    set surname(value) {
        this._surname = value;
    }
    async setPassword(pass, salt) {
        this._password = await (0, bcryptjs_1.hash)(pass, salt);
    }
    get cartItems() {
        return this._cartItems;
    }
    set cartItems(value) {
        this._cartItems = value;
    }
    get savedItems() {
        return this._savedItems;
    }
    set savedItems(value) {
        this._savedItems = value;
    }
    get orders() {
        return this._orders;
    }
    set orders(value) {
        this._orders = value;
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map