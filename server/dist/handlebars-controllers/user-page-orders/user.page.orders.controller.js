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
exports.UserPageOrdersController = void 0;
const base_controller_1 = require("../../common/base.controller");
const auth_middleware_1 = require("../../common/auth.middleware");
const lodash_1 = require("lodash");
const inversify_1 = require("inversify");
const types_1 = require("../../types");
class IUserService {
}
let UserPageOrdersController = class UserPageOrdersController extends base_controller_1.BaseController {
    constructor(userService, orderService) {
        super();
        this.userService = userService;
        this.orderService = orderService;
        this.userPageOrdersMethods = [
            {
                path: '/orders',
                func: this.userPageOrders,
                method: 'get',
                middlewares: [new auth_middleware_1.AuthMiddleware()]
            }
        ];
        this.bindRoutes(this.userPageOrdersMethods);
    }
    async userPageOrders(req, res, next) {
        req.body.email = (0, lodash_1.get)(req, 'user.email');
        let authUser = await this.userService.getInfoUser(req.body.email);
        const orders = await this.orderService.findOrders(req.body.email);
        res.render('user-page-orders', {
            userOrders: orders,
            surname: (0, lodash_1.get)(req, 'user.surname'),
            cartItems: authUser?.cartItems.length
        });
    }
};
UserPageOrdersController = __decorate([
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IUsersService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.IOrderService)),
    __metadata("design:paramtypes", [Object, Object])
], UserPageOrdersController);
exports.UserPageOrdersController = UserPageOrdersController;
//# sourceMappingURL=user.page.orders.controller.js.map