import {Router} from "express";
import {IControllerRoute} from "../../common/route.interface";
import {injectable} from "inversify";
import 'reflect-metadata';
import {BaseController} from "../../common/base.controller";
import {IOrderPageController} from "./order.page.controller.interface";
import {NextFunction, Request, Response} from "express";
import {AuthMiddleware} from "../../common/auth.middleware";
import {get} from "lodash";
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
            method: 'post'
        },

        {
            path: '/refresh',
            func: this.orderListRefresh,
            method: 'delete'
        }
    ];

    constructor() {
        super();
        this.bindRoutes(this.orderPageMethods);
    }

    orderPage(req: Request, res: Response, next: NextFunction): void {
        res.render('order-page', {
            surname: get(req, 'user.surname'),
            name: get(req, 'user.name'),
            email: get(req, 'user.email'),
            userOrders: [
                {
                    title: 'Батарея універсальна Xiaomi Redmi 1mAh',
                    price: '1'
                },

                {
                    title: 'Батарея універсальна Xiaomi Redmi 2mAh',
                    price: '2'
                },

                {
                    title: 'Батарея універсальна Xiaomi Redmi 3mAh',
                    price: '3'
                },

                {
                    title: 'Батарея універсальна Xiaomi Redmi 4mAh',
                    price: '4'
                },
            ]
        });
    }

    saveOrder(req: Request, res: Response, next: NextFunction): void {
        console.log(`Request ${req.body.email} on ${req.body.address}, products - ${req.body.products}`);
    }

    orderListRefresh(req: Request, res: Response, next: NextFunction): void {
        // Потрібно оновити кошик після закриття сторінки
    }
}