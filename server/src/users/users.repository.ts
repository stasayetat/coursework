import {IUsersRepository} from "./users.repository.interface";
import {inject, injectable} from "inversify";
import 'reflect-metadata';
import {User} from "./user.entity";
import {Model, Schema} from "mongoose";
import {TYPES} from "../types";
import {IMongooseService} from "../database/mongoose.service.interface";
import {MiniItem} from "../items/mini.item.entity";
import {IItemsService} from "../items/items.service.interface";
@injectable()
export class UsersRepository implements IUsersRepository{

    private userSchema = new Schema({
        email: {type: String, required: true},
        password: {type: String, required: true},
        name: {type: String, required: false},
        surname: {type: String, required: false},
        cartItems: {type: [String], required: false},
        savedItems: {type: [String], required: false},
        orders: {type: [String], required: false}
    });

    private readonly dataUser: Model<any>;

    constructor(@inject(TYPES.IMongooseService) private mongooseService: IMongooseService,
                @inject(TYPES.IItemsService) private itemsService: IItemsService) {
        this.dataUser = this.mongooseService.mongoose.model('User', this.userSchema);
    }
    async create(user: User): Promise<User | null> {
        const newUser = new this.dataUser({
            email: user.email,
            password: user.password
        });
        return this.dataUser.create(newUser);
    }

    async find(email: string): Promise<User | null> {
        return this.dataUser.findOne({email});
    }

    async update(user: User): Promise<User | null> {
        return this.dataUser.findOneAndUpdate(
            {
                email: user.email
            },{
                name: user.name,
                surname: user.surname,
                password: user.password,
                cartItems: user.cartItems,
                savedItems: user.savedItems,
                orders: user.orders
            }
        );
    }

    findById(userId: number): Promise<User | null> {
        return this.dataUser.findById(userId);
    }

    async addCartItems(email: string, itemName: string): Promise<User | null> {
        const updatedUser = await this.dataUser.findOneAndUpdate({
            email: email
        }, {
            $push: {cartItems: itemName}
        });
        return updatedUser;
    }

    async addSavedItems(email: string, itemName: string): Promise<User | null> {
        const updatedUser = await this.dataUser.findOneAndUpdate({
            email: email
        }, {
            $push: {savedItems: itemName}
        });
        return updatedUser;
    }

    async deleteItemFromCart(email: string, itemName: string): Promise<User | null> {
        const deletedCartUsers = await this.dataUser.findOneAndUpdate({email: email}, {
           $pull: {cartItems: itemName}
        });
        return deletedCartUsers;
    }

    async deleteAllItemFromCart(email: string): Promise<User | null> {
        const deletedCartUsers = await this.dataUser.findOneAndUpdate({email: email}, {
            $unset: {cartItems: ''}
        });
        return deletedCartUsers;
    }

    async deleteItemsFromSaved(email: string, itemName: string): Promise<User | null> {
        const deletedSavedUsers = await this.dataUser.findOneAndUpdate({email: email}, {
            $pull: {savedItems: itemName}
        });
        return deletedSavedUsers;
    }

    async itemCheckFromSaved(email: string, itemName: string): Promise<boolean> {
        const ifItemSaved = await this.dataUser.findOne({
            email: email,
            savedItems: {$in: [itemName]}
        });
        if(ifItemSaved) {
            return true;
        } else {
            return false;
        }
    }
}