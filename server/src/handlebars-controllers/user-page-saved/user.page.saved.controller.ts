import {BaseController} from "../../common/base.controller";
import {inject, injectable} from "inversify";
import 'reflect-metadata';
import {IUserPageSavedController} from "./user.page.saved.controller.interface";
import {IControllerRoute} from "../../common/route.interface";
import {AuthMiddleware} from "../../common/auth.middleware";
import {NextFunction, Request, Response} from "express";
import {get} from "lodash";
import {TYPES} from "../../types";
import {IUserPageSavedService} from "./user.page.saved.service.interface";
import {IUsersRepository} from "../../users/users.repository.interface";
import {IUsersService} from "../../users/users.service.interface";
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
            method: 'delete',
        },

        {
            path: '/saved/add',
            func: this.addSavedItem,
            method: 'post',
            middlewares: [new AuthMiddleware()]
        },
    ];

    constructor(@inject(TYPES.IUserPageSavedService) private userPageSavedService: IUserPageSavedService,
                @inject(TYPES.IUsersRepository) private usersRepository: IUsersRepository,
                @inject(TYPES.IUsersService) private usersService: IUsersService,
                ) {
        super();
        this.bindRoutes(this.userPageSavedMethods);
    }

    async userPageSaved(req: Request, res: Response, next: NextFunction): Promise<void> {
        req.body.email = get(req, 'user.email');
        const savedItems = await this.userPageSavedService.getSavedItems(req.body.email);
        let authUser = await this.usersService.getInfoUser(req.body.email);
        res.render('user-page-saved.ejs', {
            savedItems: savedItems,
            email: authUser?.email,
            cartItems: authUser?.cartItems.length
        });
    }

    async updateSavedItems(req: Request, res: Response, next: NextFunction): Promise<void> {
        req.body.email = get(req, 'user.email');
        console.log('updateSavedItems', req.body.email, req.query.name);
        //Потрібно оновити лист вподобань користувача req.body.savedItemsList
        await this.userPageSavedService.deleteSavedItem(req.body.email, req.query.name as string);
        res.send('Item deleted');
        return;

    }

    async addSavedItem(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log(`Request ${get(req, 'user.email')} on ${req.body.params.name}`);
        req.body.email = get(req, 'user.email');
        const result = await this.userPageSavedService.addItemToSaved(req.body.email, req.body.params.name);
        console.log("Add item success");
        res.send(req.body.params.name);
        return;

    }
}