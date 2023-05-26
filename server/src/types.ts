import {App} from "./app";
import {IMainPageController} from "./handlebars-controllers/main-page/main.page.controller.interface";
import {IRegisterPageController} from "./handlebars-controllers/register-page/register.page.controller.interface";
import {ILoginPageController} from "./handlebars-controllers/login-page/login.page.controller.interface";
import {IMongooseService} from "./database/mongoose.service.interface";
import {IUsersService} from "./users/users.service.interface";
import {IUsersRepository} from "./users/users.repository.interface";
import {IUserPageController} from "./handlebars-controllers/user-page/user.page.controller.interface";
import {
    IUserPageOrdersController
} from "./handlebars-controllers/user-page-orders/user.page.orders.controller.interface";
import {IUserPageSavedController} from "./handlebars-controllers/user-page-saved/user.page.saved.controller.interface";
import {IOrderPageController} from "./handlebars-controllers/order-page/order.page.controller.interface";
import {IItemsService} from "./items/items.service.interface";
import {IItemsRepository} from "./items/items.repository.interface";
import {IItemController} from "./items/item.controller.interface";
import {IReviewService} from "./items/reviews/review.service.interface";
import {IOrderPageService} from "./handlebars-controllers/order-page/order.page.service.interface";
import {CheckAuthMiddleware} from "./common/check.auth.middleware";
import {IUserPageSavedService} from "./handlebars-controllers/user-page-saved/user.page.saved.service.interface";
import {IOrderService} from "./orders/order.service.interface";
import {IOrderRepository} from "./orders/order.repository.interface";

export const TYPES = {
    IMainPageController: Symbol.for('IMainPageController'),
    IProductPageController: Symbol.for('IProductPageController'),
    IReviewController: Symbol.for('IReviewController'),
    ISearchPageController: Symbol.for('ISearchPageController'),
    IRegisterPageController: Symbol.for('IRegisterPageController'),
    ILoginPageController: Symbol.for('ILoginPageController'),
    IMongooseService: Symbol.for('IMongooseService'),
    IUsersService: Symbol.for('IUsersService'),
    IUsersRepository: Symbol.for('IUsersRepository'),
    IUserPageController: Symbol.for('IUserPageController'),
    IUserPageOrdersController: Symbol.for('IUserPageOrdersController'),
    IUserPageSavedController: Symbol.for('IUserPageSavedController'),
    IOrderPageController: Symbol.for('IOrderPageController'),
    IItemsService: Symbol.for('IItemsService'),
    IItemsRepository: Symbol.for('IItemsRepository'),
    IItemController: Symbol.for('IItemController'),
    IReviewService: Symbol.for('IReviewService'),
    IOrderPageService: Symbol.for('IOrderPageService'),
    CheckAuthMiddleware: Symbol.for('CheckAuthMiddleware'),
    IUserPageSavedService: Symbol.for('IUserPageSavedService'),
    IOrderService: Symbol.for('IOrderService'),
    IOrderRepository: Symbol.for('IOrderRepository'),
    App: Symbol.for('App')
}
