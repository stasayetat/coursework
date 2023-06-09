"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniItem = void 0;
class MiniItem {
    constructor(title, image, price) {
        this._title = title;
        this._image = image;
        this._price = price;
    }
    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
    }
    get image() {
        return this._image;
    }
    set image(value) {
        this._image = value;
    }
    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }
}
exports.MiniItem = MiniItem;
//# sourceMappingURL=mini.item.entity.js.map