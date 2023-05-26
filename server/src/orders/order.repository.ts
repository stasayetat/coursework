import {IOrderRepository} from "./order.repository.interface";
import {inject, injectable} from "inversify";
import 'reflect-metadata';
import {Model, Schema} from "mongoose";
import {Item} from "../items/item.entity";
import {TYPES} from "../types";
import {IMongooseService} from "../database/mongoose.service.interface";
import {Order} from "./order.entity";
@injectable()
export class OrderRepository implements IOrderRepository {
    private orderSchema = new Schema({
        orderNumber: {type: Number, unique: true},
        date: {type: String, required: false},
        orderStatus: {type: String, required: false},
        items: {type: Map, required: true},
        price: {type: Number, required: true},
        paymentMethod: {type: String, required: true},
        userEmail: {type: String, required: true},
        address: {type: String, required: true}
    });



    private readonly dataOrder: Model<any>;

    constructor(@inject(TYPES.IMongooseService) private mongooseService: IMongooseService) {
        this.dataOrder = this.mongooseService.mongoose.model('Order', this.orderSchema);
    }

    async create(order: Order): Promise<Order | null> {
        console.log(`Create function in order repository here`);
        const newOrder = new this.dataOrder({
            orderNumber: order.orderNumber,
            date: this.formatDate(),
            orderStatus: 'В обробці',
            items: order.items,
            price: order.price,
            paymentMethod: order.paymentMethod,
            userEmail: order.userEmail,
            address: order.address
        });
        console.log(`Order created`);
        return this.dataOrder.create(newOrder);
    }

    async findOrdersByEmail(email: string): Promise<Order[] | null> {
        return this.dataOrder.find({userEmail: email});
    }

    async updateOrderStatus(status: string, orderNumber: number): Promise<Order | null> {
        return this.dataOrder.findOneAndUpdate({orderNumber: orderNumber}, {
            $set: {status: status},
        })
    }

    async findOneOrder(): Promise<Order | null> {
        return this.dataOrder.findOne({}).sort({orderNumber: -1});
    }

    private formatDate(): string {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());

        return `${day}.${month}.${year}`;
    }
}