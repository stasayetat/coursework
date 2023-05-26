import {IOrderService} from "./order.service.interface";
import {inject, injectable} from "inversify";
import 'reflect-metadata';
import {OrderDto} from "./dto/order.dto";
import {Order} from "./order.entity";
import {IItemsRepository} from "../items/items.repository.interface";
import {TYPES} from "../types";
import {IOrderRepository} from "./order.repository.interface";
import {OrderRepository} from "./order.repository";
@injectable()
export class OrderService implements IOrderService {

    constructor(@inject(TYPES.IItemsRepository) private itemsRepository: IItemsRepository,
                @inject(TYPES.IOrderRepository) private orderRepository: IOrderRepository,) {
    }
    async createOrder(createOrder: OrderDto, itemsMap: Map<string, number>): Promise<Order | null> {
        let newOrder = new Order(itemsMap, createOrder.paymentMethod, createOrder.userEmail, createOrder.address);
        newOrder.price = await this.countAllPrice(newOrder.items);
        const lastOrder = await this.orderRepository.findOneOrder();
        if(lastOrder) {
            newOrder.orderNumber = lastOrder.orderNumber + 1;
        } else {
            newOrder.orderNumber = 1;
        }
        return this.orderRepository.create(newOrder);
    }

    async findOrders(email: string): Promise<Order[] | null> {
        return this.orderRepository.findOrdersByEmail(email);
    }

    private async countAllPrice(items: Map<string, number>): Promise<number> {
        let resNumber = 0;
        for(let [key, value] of items) {
            const tmpItem =  await this.itemsRepository.findOneByName(key);
            if(tmpItem) {
                console.log('Price is ' + tmpItem.price);
                resNumber += tmpItem.price * value;
            }
        }
        return resNumber;
    }

}