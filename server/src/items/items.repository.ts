import {IItemsRepository} from "./items.repository.interface";
import {Item} from "./item.entity";
import {Category} from "./category.enum";
import {inject, injectable} from "inversify";
import 'reflect-metadata';
import {Model, Schema} from "mongoose";
import {TYPES} from "../types";
import {IMongooseService} from "../database/mongoose.service.interface";
import {Review} from "./reviews/review.entity";
@injectable()
export class ItemsRepository implements IItemsRepository {

    private reviewSchema = new Schema({
        rate: {type: String, required: true},
        bigComment: {type: String, required: true},
        advantages: {type: String},
        minuses: {type: String},
        userName: {type: String, required: true},

    });

    private itemSchema = new Schema({
        title: {type: String, required: true},
        category: {type: String, required: true},
        price: {type: Number, required: true},
        photos: {type: [String], required: true},
        characteristics: {type: Map},
        reviews: {type: [this.reviewSchema]}
    });

    private readonly dataItem: Model<any>;
    private readonly dataReview: Model<any>;

    constructor(@inject(TYPES.IMongooseService) private mongooseService: IMongooseService) {
        this.dataItem = this.mongooseService.mongoose.model('Item', this.itemSchema);
        this.dataReview = this.mongooseService.mongoose.model('Review', this.reviewSchema);
    }
    async create(item: Item): Promise<Item | null> {
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

    async findByCategory(category: Category, limit?: number): Promise<Item | Item[] | null> {
        if(limit === undefined)
            limit = 0;
        return this.dataItem.find({category}).limit(limit);
    }

    async findById(itemId: number): Promise<Item | null> {
        return this.dataItem.findById(itemId);
    }

    async findByName(name: string, limit?: number): Promise<Item | Item[] | null> {
        console.log(`Finding by name - ${name}`);
        if(limit === undefined)
            limit = 0;
        return this.dataItem.find({title: {$regex: name, $options: "i"}}).limit(limit).sort({ createdAt: -1});
    }

    async findOneByName(name: string): Promise<Item | null> {
        return this.dataItem.findOne({title: name});
    }

    async delete(itemId: number): Promise<Item | null> {
        return this.dataItem.findByIdAndDelete(itemId);
    }

    async deleteByName(name: string): Promise<Item | null> {
        return this.dataItem.findOneAndDelete({title: name});
    }

    async addReviewToItems(review: Review, name: string): Promise<Item | null> {
        const newReview = new this.dataReview({
            rate: review.rate,
            bigComment: review.bigComment,
            advantages: review.advantages,
            minuses: review.minuses,
            userName: review.userName,
        });
        const updateItem = await this.dataItem.findOneAndUpdate({
            title: name
        },
            {
                $push: {reviews: newReview}
            },
            {new: true});
        return updateItem;
    }

}