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
exports.ProductPageController = void 0;
const base_controller_1 = require("../../common/base.controller");
const inversify_1 = require("inversify");
require("reflect-metadata");
const types_1 = require("../../types");
const check_auth_middleware_1 = require("../../common/check.auth.middleware");
let ProductPageController = class ProductPageController extends base_controller_1.BaseController {
    constructor(itemsRepository, itemsService, checkAuthMiddleware) {
        super();
        this.itemsRepository = itemsRepository;
        this.itemsService = itemsService;
        this.checkAuthMiddleware = checkAuthMiddleware;
        this.productPageMethod = [
            {
                path: '/:id',
                func: this.productPageFunc,
                method: 'get',
                middlewares: [this.checkAuthMiddleware]
            },
        ];
        this.bindRoutes(this.productPageMethod);
    }
    async productPageFunc(req, res, next) {
        console.log('Product-page render ' + req.params.id);
        let authUser;
        if (req.body.userAuth) {
            authUser = req.body.userAuth;
        }
        const findItem = await this.itemsRepository.findOneByName(req.params.id);
        if (Array.isArray(findItem)) {
            res.send('Предметів забагато');
            return;
        }
        else if (findItem === null) {
            res.send('Предмету не знайдено');
            return;
        }
        else {
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
};
ProductPageController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IItemsRepository)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.IItemsService)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.CheckAuthMiddleware)),
    __metadata("design:paramtypes", [Object, Object, check_auth_middleware_1.CheckAuthMiddleware])
], ProductPageController);
exports.ProductPageController = ProductPageController;
//# sourceMappingURL=product.page.controller.js.map