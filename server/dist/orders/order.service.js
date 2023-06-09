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
exports.OrderService = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const order_entity_1 = require("./order.entity");
const types_1 = require("../types");
let OrderService = class OrderService {
    constructor(itemsRepository, orderRepository) {
        this.itemsRepository = itemsRepository;
        this.orderRepository = orderRepository;
    }
    async createOrder(createOrder, itemsMap) {
        let newOrder = new order_entity_1.Order(itemsMap, createOrder.paymentMethod, createOrder.userEmail, createOrder.address);
        newOrder.price = await this.countAllPrice(newOrder.items);
        const lastOrder = await this.orderRepository.findOneOrder();
        if (lastOrder) {
            newOrder.orderNumber = lastOrder.orderNumber + 1;
        }
        else {
            newOrder.orderNumber = 1;
        }
        return this.orderRepository.create(newOrder);
    }
    async findOrders(email) {
        return this.orderRepository.findOrdersByEmail(email);
    }
    async countAllPrice(items) {
        let resNumber = 0;
        for (let [key, value] of items) {
            const tmpItem = await this.itemsRepository.findOneByName(key);
            if (tmpItem) {
                console.log('Price is ' + tmpItem.price);
                resNumber += tmpItem.price * value;
            }
        }
        return resNumber;
    }
};
OrderService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IItemsRepository)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.IOrderRepository)),
    __metadata("design:paramtypes", [Object, Object])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map