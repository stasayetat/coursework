import {BaseController} from "../../common/base.controller";
import {inject, injectable} from "inversify";
import 'reflect-metadata';
import {IMainPageController} from "./main.page.controller.interface";
import {IControllerRoute} from "../../common/route.interface";
import {NextFunction, Request, Response} from "express";
import {get} from "lodash";
import {TYPES} from "../../types";
import {IItemsRepository} from "../../items/items.repository.interface";
import {IItemsService} from "../../items/items.service.interface";
import {MiniItem} from "../../items/mini.item.entity";
import {CheckAuthMiddleware} from "../../common/check.auth.middleware";
@injectable()
export class MainPageController extends BaseController implements IMainPageController{
    private mainPageMethod: IControllerRoute[] = [
        {
            path: '/',
            func: this.mainPageFunc,
            method: 'get',
            middlewares: [this.checkAuthMiddleware]
        }
    ];

    constructor(@inject(TYPES.IItemsRepository) private itemsRepository: IItemsRepository,
                @inject(TYPES.IItemsService) private itemsService: IItemsService,
                @inject(TYPES.CheckAuthMiddleware) private checkAuthMiddleware: CheckAuthMiddleware,
                ) {
        super();
        this.bindRoutes(this.mainPageMethod);
    }

    public async mainPageFunc (req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log('Main-page render');
        let authUser;
        if(req.body.userAuth) {
            authUser = req.body.userAuth;
        }
        let newCreatedItems = await this.itemsService.getItemsLimit('', 5, 'name');
        res.render("home-page", {
            // username: get(req, 'user.email'),
            username: authUser?.email,
            carouselImages: ['/src/carousel-images/64922.jpeg', '/src/carousel-images/2025682.jpg', '/src/carousel-images/2026232.jpg'],
            popularItems: newCreatedItems,
            cartItems: authUser?.cartItems.length
        });
    };
}