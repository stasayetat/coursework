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
exports.ItemsRepository = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const mongoose_1 = require("mongoose");
const types_1 = require("../types");
let ItemsRepository = class ItemsRepository {
    constructor(mongooseService) {
        this.mongooseService = mongooseService;
        this.reviewSchema = new mongoose_1.Schema({
            rate: { type: String, required: true },
            bigComment: { type: String, required: true },
            advantages: { type: String },
            minuses: { type: String },
            userName: { type: String, required: true },
        });
        this.itemSchema = new mongoose_1.Schema({
            title: { type: String, required: true },
            category: { type: String, required: true },
            price: { type: Number, required: true },
            photos: { type: [String], required: true },
            characteristics: { type: Map },
            reviews: { type: [this.reviewSchema] }
        });
        this.dataItem = this.mongooseService.mongoose.model('Item', this.itemSchema);
        this.dataReview = this.mongooseService.mongoose.model('Review', this.reviewSchema);
    }
    async create(item) {
        console.log(`Create function in item repository here`);
        const newItem = new this.dataItem({
            title: item.title,
            category: item.category,
            price: item.price,
            photos: item.photos,
            characteristics: item.characteristics,
            reviews: item.reviews
        });
        console.log(`Item created`);
        return this.dataItem.create(newItem);
    }
    async findByCategory(category, limit) {
        if (limit === undefined)
            limit = 0;
        return this.dataItem.find({ category }).limit(limit);
    }
    async findById(itemId) {
        return this.dataItem.findById(itemId);
    }
    async findByName(name, limit) {
        console.log(`Finding by name - ${name}`);
        if (limit === undefined)
            limit = 0;
        return this.dataItem.find({ title: { $regex: name, $options: "i" } }).limit(limit).sort({ createdAt: -1 });
    }
    async findOneByName(name) {
        return this.dataItem.findOne({ title: name });
    }
    async delete(itemId) {
        return this.dataItem.findByIdAndDelete(itemId);
    }
    async deleteByName(name) {
        return this.dataItem.findOneAndDelete({ title: name });
    }
    async addReviewToItems(review, name) {
        const newReview = new this.dataReview({
            rate: review.rate,
            bigComment: review.bigComment,
            advantages: review.advantages,
            minuses: review.minuses,
            userName: review.userName,
        });
        const updateItem = await this.dataItem.findOneAndUpdate({
            title: name
        }, {
            $push: { reviews: newReview }
        }, { new: true });
        return updateItem;
    }
};
ItemsRepository = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IMongooseService)),
    __metadata("design:paramtypes", [Object])
], ItemsRepository);
exports.ItemsRepository = ItemsRepository;
//# sourceMappingURL=items.repository.js.map