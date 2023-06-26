import {BaseController} from "../../common/base.controller";
import {IUserPageOrdersController} from "./user.page.orders.controller.interface";
import {IControllerRoute} from "../../common/route.interface";
import {AuthMiddleware} from "../../common/auth.middleware";
import {NextFunction, Request, Response} from "express";
import {get} from "lodash";
import {inject} from "inversify";
import {TYPES} from "../../types";
import {IUsersService} from "../../users/users.service.interface";
import {IOrderService} from "../../orders/order.service.interface";

export class UserPageOrdersController extends BaseController implements IUserPageOrdersController{
    private userPageOrdersMethods: IControllerRoute[] = [
        {
            path: '/orders',
            func: this.userPageOrders,
            method: 'get',
            middlewares: [new AuthMiddleware()]
        },

        {
            path: '/orders/update',
            func: this.updateOrderStatus,
            method: 'post',
            middlewares: []
        },
    ];

    constructor(@inject(TYPES.IUsersService) private userService: IUsersService,
                @inject(TYPES.IOrderService) private orderService: IOrderService) {
        super();
        this.bindRoutes(this.userPageOrdersMethods);
    }

    async userPageOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
        req.body.email = get(req, 'user.email');
        let authUser = await this.userService.getInfoUser(req.body.email);
        const orders = await this.orderService.findOrders(req.body.email);
        res.render('user-page-orders', {
            userOrders: orders,
            surname: get(req, 'user.surname'),
            cartItems: authUser?.cartItems.length
        });
    }

    async updateOrderStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        const orderNumber = req.body.orderNumber;
        const newStatus = req.body.newStatus;
        console.log(newStatus);
        const resOrder = await this.orderService.updateOrderStatus(newStatus, orderNumber);
        console.log(JSON.stringify(resOrder));
        if(resOrder === undefined) {
            res.status(404).send('Order not found');
        } else {
            res.status(200).send('Status changed');
        }
    }

}