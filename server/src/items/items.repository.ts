import {IItemsRepository} from "./items.repository.interface";
import {Item} from "./item.entity";
import {Category} from "./category.enum";
import {inject, injectable} from "inversify";
import 'reflect-metadata';
import {Model, Schema} from "mongoose";
import {TYPES} from "../types";
import {IMongooseService} from "../database/mongoose.service.interface";
@injectable()
export class ItemsRepository implements IItemsRepository {

    private itemSchema = new Schema({
        title: {type: String, required: true},
        category: {type: String, required: true},
        price: {type: Number, required: true},
        photos: {type: [String], required: true},
        characteristics: {type: Map}
    });

    private readonly dataItem: Model<any>;

    constructor(@inject(TYPES.IMongooseService) private mongooseService: IMongooseService) {
        this.dataItem = this.mongooseService.mongoose.model('Item', this.itemSchema);
    }
    async create(item: Item): Promise<Item | null> {
        console.log(`Create function in item repository here`);
        const newItem = new this.dataItem({
            title: item.title,
            category: item.category,
            price: item.price,
            photos: item.photos,
            characteristics: item.characteristics
        });
        console.log(`Item created`);
        return this.dataItem.create(newItem);
    }

    async findByCategory(category: Category): Promise<Item | Item[] | null> {
        return this.dataItem.find({category});
    }

    async findById(itemId: number): Promise<Item | null> {
        return this.dataItem.findById(itemId);
    }

    async findByName(name: string): Promise<Item | Item[] | null> {
        console.log(`Finding by name - ${name}`);
        return this.dataItem.find({title: { $regex: name, $options: "i"} });
    }

    async delete(itemId: number): Promise<Item | null> {
        return this.dataItem.findByIdAndDelete(itemId);
    }

    async deleteByName(name: string): Promise<Item | null> {
        return this.dataItem.findOneAndDelete({title: name});
    }

}