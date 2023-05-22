import {config} from "dotenv";
import {Container} from "inversify";
import {TYPES} from "./types";
import {App} from "./app";
import 'reflect-metadata';
import {IMainPageController} from "./handlebars-controllers/main-page/main.page.controller.interface";
import {MainPageController} from "./handlebars-controllers/main-page/main.page.controller";
import {IProductPageController} from "./handlebars-controllers/product-page/product.page.controller.interface";
import {ProductPageController} from "./handlebars-controllers/product-page/product.page.controller";
import {ReviewController} from "./handlebars-controllers/reviews/review.controller";
import {IReviewController} from "./handlebars-controllers/reviews/review.controller.interface";

config();
const myContainer = new Container();
myContainer.bind<IMainPageController>(TYPES.IMainPageController).to(MainPageController).inSingletonScope();
myContainer.bind<IProductPageController>(TYPES.IProductPageController).to(ProductPageController).inSingletonScope();
myContainer.bind<IReviewController>(TYPES.IReviewController).to(ReviewController).inSingletonScope();
myContainer.bind<App>(TYPES.App).to(App).inSingletonScope();

const app = myContainer.get<App>(TYPES.App);
app.init();

