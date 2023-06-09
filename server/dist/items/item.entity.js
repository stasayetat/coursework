"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
class Item {
    constructor(title, category, price, photos, characteristics, reviews) {
        this._title = title;
        this._category = category;
        this._price = price;
        this._photos = photos;
        this._characteristics = characteristics;
        this._reviews = reviews;
    }
    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
    }
    get category() {
        return this._category;
    }
    set category(value) {
        this._category = value;
    }
    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }
    get photos() {
        return this._photos;
    }
    set photos(value) {
        this._photos = value;
    }
    get characteristics() {
        return this._characteristics;
    }
    set characteristics(value) {
        this._characteristics = value;
    }
    get reviews() {
        return this._reviews;
    }
    set reviews(value) {
        this._reviews = value;
    }
}
exports.Item = Item;
//# sourceMappingURL=item.entity.js.map