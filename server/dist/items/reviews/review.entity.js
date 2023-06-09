"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
class Review {
    constructor(rate, bigComment, advantages, minuses, userName) {
        this._rate = rate;
        this._bigComment = bigComment;
        this._advantages = advantages;
        this._minuses = minuses;
        this._userName = userName;
    }
    get rate() {
        return this._rate;
    }
    set rate(value) {
        this._rate = value;
    }
    get bigComment() {
        return this._bigComment;
    }
    set bigComment(value) {
        this._bigComment = value;
    }
    get advantages() {
        return this._advantages;
    }
    set advantages(value) {
        this._advantages = value;
    }
    get minuses() {
        return this._minuses;
    }
    set minuses(value) {
        this._minuses = value;
    }
    get userName() {
        return this._userName;
    }
    set userName(value) {
        this._userName = value;
    }
}
exports.Review = Review;
//# sourceMappingURL=review.entity.js.map