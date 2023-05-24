import {BaseController} from "../../common/base.controller";
import {injectable} from "inversify";
import 'reflect-metadata';
import {IUserPageSavedController} from "./user.page.saved.controller.interface";
import {IControllerRoute} from "../../common/route.interface";
import {AuthMiddleware} from "../../common/auth.middleware";
import {NextFunction, Request, Response} from "express";
@injectable()
export class UserPageSavedController extends BaseController implements IUserPageSavedController {
    private userPageSavedMethods: IControllerRoute[] = [
        {
            path: '/saved',
            func: this.userPageSaved,
            method: 'get',
            middlewares: [new AuthMiddleware()]
        },

        {
            path: '/saved/refresh',
            func: this.updateSavedItems,
            method: 'get',
        }
    ];

    constructor() {
        super();
        this.bindRoutes(this.userPageSavedMethods);
    }

    userPageSaved(req: Request, res: Response, next: NextFunction): void {
        res.render('user-page-saved.ejs', {
            savedItems: [
                {
                    photoSrc: '/src/items/U0456349.webp',
                    title: 'Фрейм-перехідник Apacer 41.07185.2400B',
                    price: '899',
                },

                {
                    photoSrc: '/src/items/U0489262.webp',
                    title: 'Батарея універсальна Xiaomi Redmi',
                    price: '6487',

                },

                {
                    photoSrc: '/src/items/U0744424.webp',
                    title: 'Фрейм-перехідник Apacer 41.07185.2400B',
                    price: '173',
                }
            ]
        });
    }

    updateSavedItems(req: Request, res: Response, next: NextFunction): void {
        //Потрібно оновити лист вподобань користувача req.body.savedItemsList

    }
}