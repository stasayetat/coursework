"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
class Order {
    constructor(items, paymentMethod, userEmail, address) {
        this._items = items;
        this._paymentMethod = paymentMethod;
        this._userEmail = userEmail;
        this._address = address;
    }
    get orderNumber() {
        return this._orderNumber;
    }
    set orderNumber(value) {
        this._orderNumber = value;
    }
    get date() {
        return this._date;
    }
    set date(value) {
        this._date = value;
    }
    get orderStatus() {
        return this._orderStatus;
    }
    set orderStatus(value) {
        this._orderStatus = value;
    }
    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }
    get paymentMethod() {
        return this._paymentMethod;
    }
    set paymentMethod(value) {
        this._paymentMethod = value;
    }
    get userEmail() {
        return this._userEmail;
    }
    set userEmail(value) {
        this._userEmail = value;
    }
    get address() {
        return this._address;
    }
    set address(value) {
        this._address = value;
    }
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = value;
    }
}
exports.Order = Order;
//# sourceMappingURL=order.entity.js.map