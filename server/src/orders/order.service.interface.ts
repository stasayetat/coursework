import {OrderDto} from "./dto/order.dto";
import {Order} from "./order.entity";

export interface IOrderService {
    createOrder(createOrder: OrderDto, itemsMap: Map<string, number>): Promise<Order | null>;
    findOrders(email: string): Promise<Order[] | null>;
}