import 'reflect-metadata';
import {inject, injectable} from "inversify";
import express, {Express} from "express";
import { Server } from 'http';
import {TYPES} from "./types";
import * as path from "path";
import {IMainPageController} from "./handlebars-controllers/main-page/main.page.controller.interface";
import {MainPageController} from "./handlebars-controllers/main-page/main.page.controller";
import {ProductPageController} from "./handlebars-controllers/product-page/product.page.controller";
import {ReviewController} from "./handlebars-controllers/reviews/review.controller";
import {IReviewController} from "./handlebars-controllers/reviews/review.controller.interface";
import {IProductPageController} from "./handlebars-controllers/product-page/product.page.controller.interface";
import {json, urlencoded} from "body-parser";
import {SearchPageController} from "./handlebars-controllers/search-product/search.page.controller";
import {ISearchPageController} from "./handlebars-controllers/search-product/search.page.controller.interface";
@injectable()
export class App {
    public app: Express;
    public readonly PORT: number | string;

    constructor(@inject(TYPES.IMainPageController) private mainPageController: IMainPageController,
                @inject(TYPES.IProductPageController) private productPageController: IProductPageController,
                @inject(TYPES.IReviewController) private reviewController: IReviewController,
                @inject(TYPES.ISearchPageController) private searchPageController: ISearchPageController) {
        this.app = express();
        this.PORT = process.env.PORT || 3000;
    }

    private useEJS(): void {
        const projectFolderPath = path.resolve(__dirname, '..', '..');
        const clientFolderPath = path.join(projectFolderPath, 'client');
        const publicFolderPath = path.join(clientFolderPath, 'public');
        this.app.use(express.static(publicFolderPath));
        // this.app.use(express.static('C:\\Users\\stasy\\WebstormProjects\\coursework\\client\\public'));
        // this.app.use(express.static('C:\\Users\\stasy\\WebstormProjects\\coursework\\client\\js'));
        this.app.set('view engine', 'ejs');
    }

    private useMiddlewares(): void {
        this.app.use(urlencoded({extended: true}));
        this.app.use(json());
        this.app.use('/', this.mainPageController.router);
        this.app.use('/product', this.productPageController.router);
        this.app.use('/reviews', this.reviewController.router);
        this.app.use('/search', this.searchPageController.router);
    }

    public async init() {
        this.useEJS();
        this.useMiddlewares();
        this.app.listen(this.PORT, ()=> {
            console.log(`Server started on ${this.PORT} port`);
        });
    }
}