import {BaseController} from "../../common/base.controller";
import {IProductPageController} from "./product.page.controller.interface";
import {inject, injectable} from "inversify";
import 'reflect-metadata';
import {IControllerRoute} from "../../common/route.interface";
import {NextFunction, Request, Response} from "express";
import {TYPES} from "../../types";
import {IItemsRepository} from "../../items/items.repository.interface";
import {get} from "lodash";
import {IItemsService} from "../../items/items.service.interface";
import {CheckAuthMiddleware} from "../../common/check.auth.middleware";
@injectable()
export class ProductPageController extends BaseController implements IProductPageController {
    private productPageMethod: IControllerRoute[] = [
        {
            path: '/:id',
            func: this.productPageFunc,
            method: 'get',
            middlewares: [this.checkAuthMiddleware]
        },
        // {
        //     path: '/cart/add',
        //     func: this.reviewAdd,
        //     method: 'post'
        // }
    ];

    constructor(@inject(TYPES.IItemsRepository) private itemsRepository: IItemsRepository,
                @inject(TYPES.IItemsService) private itemsService: IItemsService,
                @inject(TYPES.CheckAuthMiddleware) private checkAuthMiddleware: CheckAuthMiddleware,) {
        super();
        this.bindRoutes(this.productPageMethod);
    }

    public async productPageFunc(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log('Product-page render ' +  req.params.id);
        let authUser;
        if(req.body.userAuth) {
            authUser = req.body.userAuth;
        }
        const findItem = await this.itemsRepository.findOneByName(req.params.id);
        if(Array.isArray(findItem)) {
            res.send('Предметів забагато');
            return;
        } else if(findItem === null) {
            res.send('Предмету не знайдено');
            return;
        } else {
            let simCreatedItems = await this.itemsService.getItemsLimit(findItem.category, 5, 'category');
            res.render('product-page', {
                username: authUser?.email,
                itemName: findItem.title,
                itemPrice: findItem.price,
                itemCharacteristics: findItem.characteristics,
                reviews: findItem.reviews,
                itemCarouselImages: findItem.photos,
                simItems: simCreatedItems,
                cartItems: authUser?.cartItems.length
            });
        }

    }
}