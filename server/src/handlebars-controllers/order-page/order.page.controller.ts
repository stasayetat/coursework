import {Router} from "express";
import {IControllerRoute} from "../../common/route.interface";
import {inject, injectable} from "inversify";
import 'reflect-metadata';
import {BaseController} from "../../common/base.controller";
import {IOrderPageController} from "./order.page.controller.interface";
import {NextFunction, Request, Response} from "express";
import {AuthMiddleware} from "../../common/auth.middleware";
import {get} from "lodash";
import {IOrderPageService} from "./order.page.service.interface";
import {TYPES} from "../../types";
import {IItemsService} from "../../items/items.service.interface";
import {IUsersService} from "../../users/users.service.interface";
import {ValidateMiddleware} from "../../common/validate.middleware";
import {OrderDto} from "../../orders/dto/order.dto";
import {IOrderService} from "../../orders/order.service.interface";
@injectable()
export class OrderPageController extends BaseController implements IOrderPageController{
    private orderPageMethods: IControllerRoute[] = [
        {
            path: '/',
            func: this.orderPage,
            method: 'get',
            middlewares: [new AuthMiddleware()]
        },

        {
            path: '/',
            func: this.saveOrder,
            method: 'post',
            middlewares: [new ValidateMiddleware(OrderDto)]
        },

        {
            path: '/add',
            func: this.addOrder,
            method: 'post',
            middlewares: [new AuthMiddleware()]
        },

        {
            path: '/delete',
            func: this.orderListDelete,
            method: 'delete'
        }
    ];

    constructor(@inject(TYPES.IOrderPageService) private orderPageService: IOrderPageService,
                @inject(TYPES.IUsersService) private usersService: IUsersService,
                @inject(TYPES.IOrderService) private orderService: IOrderService,
                ) {
        super();
        this.bindRoutes(this.orderPageMethods);
    }

    async orderPage(req: Request, res: Response, next: NextFunction): Promise<void> {
        req.body.email = get(req, 'user.email');
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

    async saveOrder(req: Request<{}, {}, OrderDto>, res: Response, next: NextFunction): Promise<void> {
        console.log(`Request ${req.body.userEmail} on ${req.body.address}, products - ${req.body.items}`);
        const itemsMap: Map<string, number> = JSON.parse(req.body.items);
        for(let [key, value] of itemsMap) {
            console.log(`${key} - ${value}`);
        }
        const result = await this.orderService.createOrder(req.body, itemsMap);
        await this.orderPageService.deleteAllCartItem(req.body.userEmail);
        res.send('Order created');

        return;
    }

    async addOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log(`Request ${get(req, 'user.email')} on ${req.body.params.name}`);
        req.body.email = get(req, 'user.email');
        const result = await this.orderPageService.addItemToCart(req.body.email, req.body.params.name);
        console.log("Add item success");
        res.send(req.body.params.name);
        return;
    }

    async orderListDelete(req: Request, res: Response, next: NextFunction): Promise<void> {
        req.body.email = get(req, 'user.email');
        console.log(req.body.email + ' ' + req.query.name);
        const result = await this.orderPageService.deleteCartItem(req.body.email, req.query.name as string);
        res.send(req.query.name);
        return;
    }
}