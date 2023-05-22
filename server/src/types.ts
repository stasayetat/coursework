import {App} from "./app";
import {IMainPageController} from "./handlebars-controllers/main-page/main.page.controller.interface";
import {ReviewController} from "./handlebars-controllers/reviews/review.controller";

export const TYPES = {
    IMainPageController: Symbol.for('IMainPageController'),
    IProductPageController: Symbol.for('IProductPageController'),
    IReviewController: Symbol.for('IReviewController'),
    App: Symbol.for('App')
}
