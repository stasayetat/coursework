import {Order} from "./order.entity";

export interface IOrderRepository {
    create: (order: Order)=> Promise<Order | null>;
    findOrdersByEmail: (email: string)=> Promise<Order[] | null>;
    updateOrderStatus: (status: string, orderNumber: number)=> Promise<Order | null>;
    findOneOrder: ()=> Promise<Order | null>
}