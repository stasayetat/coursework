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
exports.OrderPageController = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const base_controller_1 = require("../../common/base.controller");
const auth_middleware_1 = require("../../common/auth.middleware");
const lodash_1 = require("lodash");
const types_1 = require("../../types");
const validate_middleware_1 = require("../../common/validate.middleware");
const order_dto_1 = require("../../orders/dto/order.dto");
let OrderPageController = class OrderPageController extends base_controller_1.BaseController {
    constructor(orderPageService, usersService, orderService) {
        super();
        this.orderPageService = orderPageService;
        this.usersService = usersService;
        this.orderService = orderService;
        this.orderPageMethods = [
            {
                path: '/',
                func: this.orderPage,
                method: 'get',
                middlewares: [new auth_middleware_1.AuthMiddleware()]
            },
            {
                path: '/',
                func: this.saveOrder,
                method: 'post',
                middlewares: [new validate_middleware_1.ValidateMiddleware(order_dto_1.OrderDto)]
            },
            {
                path: '/add',
                func: this.addOrder,
                method: 'post',
                middlewares: [new auth_middleware_1.AuthMiddleware()]
            },
            {
                path: '/delete',
                func: this.orderListDelete,
                method: 'delete'
            }
        ];
        this.bindRoutes(this.orderPageMethods);
    }
    async orderPage(req, res, next) {
        req.body.email = (0, lodash_1.get)(req, 'user.email');
        const cartItems = await this.orderPageService.getCartItems(req.body.email);
        let authUser = await this.usersService.getInfoUser(req.body.email);
        res.render('order-page', {
            surname: authUser?.surname,
            name: authUser?.name,
            email: authUser?.email,
            userOrders: cartItems,
            cartItems: authUser?.cartItems.length
        });
    }
    async saveOrder(req, res, next) {
        console.log(`Request ${req.body.userEmail} on ${req.body.address}, products - ${req.body.items}`);
        const itemsMap = JSON.parse(req.body.items);
        for (let [key, value] of itemsMap) {
            console.log(`${key} - ${value}`);
        }
        const result = await this.orderService.createOrder(req.body, itemsMap);
        await this.orderPageService.deleteAllCartItem(req.body.userEmail);
        res.send('Order created');
        return;
    }
    async addOrder(req, res, next) {
        console.log(`Request ${(0, lodash_1.get)(req, 'user.email')} on ${req.body.params.name}`);
        req.body.email = (0, lodash_1.get)(req, 'user.email');
        const result = await this.orderPageService.addItemToCart(req.body.email, req.body.params.name);
        console.log("Add item success");
        res.send(req.body.params.name);
        return;
    }
    async orderListDelete(req, res, next) {
        req.body.email = (0, lodash_1.get)(req, 'user.email');
        console.log(req.body.email + ' ' + req.query.name);
        const result = await this.orderPageService.deleteCartItem(req.body.email, req.query.name);
        res.send(req.query.name);
        return;
    }
};
OrderPageController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IOrderPageService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.IUsersService)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.IOrderService)),
    __metadata("design:paramtypes", [Object, Object, Object])
], OrderPageController);
exports.OrderPageController = OrderPageController;
//# sourceMappingURL=order.page.controller.js.map