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
exports.OrderRepository = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const mongoose_1 = require("mongoose");
const types_1 = require("../types");
let OrderRepository = class OrderRepository {
    constructor(mongooseService) {
        this.mongooseService = mongooseService;
        this.orderSchema = new mongoose_1.Schema({
            orderNumber: { type: Number, unique: true },
            date: { type: String, required: false },
            orderStatus: { type: String, required: false },
            items: { type: Map, required: true },
            price: { type: Number, required: true },
            paymentMethod: { type: String, required: true },
            userEmail: { type: String, required: true },
            address: { type: String, required: true }
        });
        this.dataOrder = this.mongooseService.mongoose.model('Order', this.orderSchema);
    }
    async create(order) {
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
    async findOrdersByEmail(email) {
        return this.dataOrder.find({ userEmail: email });
    }
    async updateOrderStatus(status, orderNumber) {
        return this.dataOrder.findOneAndUpdate({ orderNumber: orderNumber }, {
            $set: { status: status },
        });
    }
    async findOneOrder() {
        return this.dataOrder.findOne({}).sort({ orderNumber: -1 });
    }
    formatDate() {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());
        return `${day}.${month}.${year}`;
    }
};
OrderRepository = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IMongooseService)),
    __metadata("design:paramtypes", [Object])
], OrderRepository);
exports.OrderRepository = OrderRepository;
//# sourceMappingURL=order.repository.js.map