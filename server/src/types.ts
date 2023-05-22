import {App} from "./app";
import {IMainPageController} from "./handlebars-controllers/main-page/main.page.controller.interface";
import {ReviewController} from "./handlebars-controllers/reviews/review.controller";
import {SearchPageController} from "./handlebars-controllers/search-product/search.page.controller";

export const TYPES = {
    IMainPageController: Symbol.for('IMainPageController'),
    IProductPageController: Symbol.for('IProductPageController'),
    IReviewController: Symbol.for('IReviewController'),
    ISearchPageController: Symbol.for('ISearchPageController'),
    App: Symbol.for('App')
}
