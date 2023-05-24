import {BaseController} from "../common/base.controller";
import {IItemController} from "./item.controller.interface";
import {inject, injectable} from "inversify";
import 'reflect-metadata';
import {IControllerRoute} from "../common/route.interface";
import {ValidateMiddleware} from "../common/validate.middleware";
import {ItemCreateDto} from "./dto/item.create.dto";
import {NextFunction, Request, Response} from "express";
import {TYPES} from "../types";
import {IItemsRepository} from "./items.repository.interface";
import {IItemsService} from "./items.service.interface";
@injectable()
export class ItemController extends BaseController implements IItemController {
    private itemsMethods: IControllerRoute[] = [
        {
            path: '/create',
            func: this.createItem,
            method: 'post',
            middlewares: [new ValidateMiddleware(ItemCreateDto)]
        },

        {
            path: '/delete',
            func: this.deleteItem,
            method: 'delete',
        },

        {
            path: '/find',
            func: this.findItems,
            method: 'get'
        }


    ];

    constructor(@inject(TYPES.IItemsService) private itemsService: IItemsService) {
        super();
        this.bindRoutes(this.itemsMethods);
    }

    async createItem({body}: Request<{}, {}, ItemCreateDto>, res: Response, next: NextFunction): Promise<void> {
        console.log(`Item ${body.title} here`);
        const createdItem = await this.itemsService.createItem(body);
        if(createdItem === null) {
            res.send('Null');
        } else {
            res.send(`Item created ${createdItem.title}`);
        }
    }

    async deleteItem(req: Request, res: Response, next: NextFunction): Promise<void> {
        const deletedItem = await this.itemsService.deleteItems(req.body.name);
        if(deletedItem === null) {
            res.send('Nothing to delete');
        } else {
            res.send(`Item deleted ${deletedItem.title}`);
        }
    }

    async findItems(req: Request, res: Response, next: NextFunction): Promise<void> {
        // const nameCat = req.query.name;
        // if(req.query.type === 'name') {
        //     const findItems = await this.itemsService.getItems(nameCat, )
        // } else {
        //     const findItems = await this.itemsService.getItems()
        // }
    }
}