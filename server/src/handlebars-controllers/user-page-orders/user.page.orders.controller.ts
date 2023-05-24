import {BaseController} from "../../common/base.controller";
import {IUserPageOrdersController} from "./user.page.orders.controller.interface";
import {IControllerRoute} from "../../common/route.interface";
import {AuthMiddleware} from "../../common/auth.middleware";
import {NextFunction, Request, Response} from "express";

export class UserPageOrdersController extends BaseController implements IUserPageOrdersController{
    private userPageOrdersMethods: IControllerRoute[] = [
        {
            path: '/orders',
            func: this.userPageOrders,
            method: 'get',
            middlewares: [new AuthMiddleware()]
        }
    ];

    constructor() {
        super();
        this.bindRoutes(this.userPageOrdersMethods);
    }

    userPageOrders(req: Request, res: Response, next: NextFunction): void {
        res.render('user-page-orders', {
            userOrders: [
                {
                date: '01.01.1990',
                id: '1',
                status: 'Виконано',
                title: 'Фрейм-перехідник Apacer 41.07185.2400B',
                price: '899',
                photoSrc: '/src/items/U0456349.webp',
                amount: '2',
                paymentMethod: 'Карта'
            },

            {
                date: '01.01.1991',
                id: '2',
                status: 'Скасовано',
                title: 'Батарея універсальна Xiaomi Redmi',
                price: '14999',
                photoSrc: '/src/items/U0489262.webp',
                amount: '1',
                paymentMethod: 'Готівка'
            },

            ],
        });
    }

}