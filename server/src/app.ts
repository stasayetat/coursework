import 'reflect-metadata';
import {inject, injectable} from "inversify";
import express, {Express} from "express";
import { Server } from 'http';
import {TYPES} from "./types";
import * as path from "path";
import {IMainPageController} from "./handlebars-controllers/main-page/main.page.controller.interface";
import {MainPageController} from "./handlebars-controllers/main-page/main.page.controller";
import {ProductPageController} from "./handlebars-controllers/product-page/product.page.controller";
import {ReviewController} from "./items/reviews/review.controller";
import {IReviewController} from "./items/reviews/review.controller.interface";
import {IProductPageController} from "./handlebars-controllers/product-page/product.page.controller.interface";
import {json, urlencoded} from "body-parser";
import {SearchPageController} from "./handlebars-controllers/search-product/search.page.controller";
import {ISearchPageController} from "./handlebars-controllers/search-product/search.page.controller.interface";
import {IRegisterPageController} from "./handlebars-controllers/register-page/register.page.controller.interface";
import {ILoginPageController} from "./handlebars-controllers/login-page/login.page.controller.interface";
import {IMongooseService} from "./database/mongoose.service.interface";
import {config} from "dotenv";
import {initializePassport} from "./passport-config";
import passport from "passport";
import session from "express-session";
import {IUsersService} from "./users/users.service.interface";
import {IUserPageController} from "./handlebars-controllers/user-page/user.page.controller.interface";
import {
    IUserPageOrdersController
} from "./handlebars-controllers/user-page-orders/user.page.orders.controller.interface";
import {IUserPageSavedController} from "./handlebars-controllers/user-page-saved/user.page.saved.controller.interface";
import {IOrderPageController} from "./handlebars-controllers/order-page/order.page.controller.interface";
import {IItemController} from "./items/item.controller.interface";
@injectable()
export class App {
    public app: Express;
    public readonly PORT: number | string;

    constructor(@inject(TYPES.IMainPageController) private mainPageController: IMainPageController,
                @inject(TYPES.IProductPageController) private productPageController: IProductPageController,
                @inject(TYPES.IReviewController) private reviewController: IReviewController,
                @inject(TYPES.ISearchPageController) private searchPageController: ISearchPageController,
                @inject(TYPES.IRegisterPageController) private registerPageController: IRegisterPageController,
                @inject(TYPES.ILoginPageController) private loginPageController: ILoginPageController,
                @inject(TYPES.IMongooseService) private mongooseService: IMongooseService,
                @inject(TYPES.IUsersService) private usersService: IUsersService,
                @inject(TYPES.IUserPageController) private userPageController: IUserPageController,
                @inject(TYPES.IUserPageOrdersController) private userPageOrdersController: IUserPageOrdersController,
                @inject(TYPES.IUserPageSavedController) private userPageSavedController: IUserPageSavedController,
                @inject(TYPES.IOrderPageController) private orderPageController: IOrderPageController,
                @inject(TYPES.IItemController) private itemController: IItemController,
                ) {
        this.app = express();
        this.PORT = process.env.PORT || 3000;
    }

    private useEJS(): void {
        const projectFolderPath = path.resolve(__dirname, '..', '..');
        const clientFolderPath = path.join(projectFolderPath, 'client');
        const publicFolderPath = path.join(clientFolderPath, 'public');
        this.app.use(express.static(publicFolderPath));
        this.app.set('view engine', 'ejs');
    }

    private useMiddlewares(): void {
        this.app.use(urlencoded({extended: true}));
        this.app.use(json());
        this.app.use(session({
            secret: process.env.SESSION_SECRET as string,
            resave: false,
            saveUninitialized: false
        }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use('/', this.mainPageController.router);
        this.app.use('/product', this.productPageController.router);
        this.app.use('/reviews', this.reviewController.router);
        this.app.use('/search', this.searchPageController.router);
        this.app.use('/register', this.registerPageController.router);
        this.app.use('/login', this.loginPageController.router);
        this.app.use('/users', this.userPageController.router);
        this.app.use('/users', this.userPageController.router);
        this.app.use('/users', this.userPageOrdersController.router);
        this.app.use('/users', this.userPageSavedController.router);
        this.app.use('/orders', this.orderPageController.router);
        this.app.use('/items', this.itemController.router);
    }

    private usePassportConfig(): void {
        initializePassport(passport, async (email: string)=> {
            return this.usersService.getInfoUser(email);
        },
            async (id: number)=> {
            return this.usersService.getInfoUserById(id);
        });
    }


    public async init() {
        config();
        this.useEJS();
        this.useMiddlewares();
        this.usePassportConfig();
        console.log("Connecting to database...");
        await this.mongooseService.connect();
        this.app.listen(this.PORT, ()=> {
            console.log(`Server started on ${this.PORT} port`);
        });
    }
}