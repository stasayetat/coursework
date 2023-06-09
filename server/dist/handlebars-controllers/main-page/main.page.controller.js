"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainPageController = void 0;
const base_controller_1 = require("../../common/base.controller");
const inversify_1 = require("inversify");
require("reflect-metadata");
const types_1 = require("../../types");
const check_auth_middleware_1 = require("../../common/check.auth.middleware");
let MainPageController = class MainPageController extends base_controller_1.BaseController {
    constructor(itemsService, checkAuthMiddleware) {
        super();
        this.itemsService = itemsService;
        this.checkAuthMiddleware = checkAuthMiddleware;
        this.mainPageMethod = [
            {
                path: '/',
                func: this.mainPageFunc,
                method: 'get',
                middlewares: [this.checkAuthMiddleware]
            }
        ];
        this.bindRoutes(this.mainPageMethod);
    }
    async mainPageFunc(req, res, next) {
        console.log('Main-page render');
        let authUser;
        if (req.body.userAuth) {
            authUser = req.body.userAuth;
        }
        let newCreatedItems = await this.itemsService.getItemsLimit('', 5, 'name');
        res.render("home-page", {
            username: authUser?.email,
            carouselImages: ['/src/carousel-images/64922.jpeg', '/src/carousel-images/2025682.jpg', '/src/carousel-images/2026232.jpg'],
            popularItems: newCreatedItems,
            cartItems: authUser?.cartItems.length
        });
    }
    ;
};
MainPageController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IItemsService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.CheckAuthMiddleware)),
    __metadata("design:paramtypes", [Object, check_auth_middleware_1.CheckAuthMiddleware])
], MainPageController);
exports.MainPageController = MainPageController;
//# sourceMappingURL=main.page.controller.js.map